/* global tSettings tStrings */

import React from 'react';
import { getSizedImageUrl } from '@shopify/theme-images';

import CartShippingMeter from '~comp/cart-shipping-meter';
import CartDiscountMeter from '~comp/cart-discount-meter';
import CartItem from '~comp/cart-item';
import CartDiscountForm from '~comp/cart-discount-form';
import CartManualGwp from '~comp/cart-manual-gwp';
import CartUpsell from '~comp/cart-upsell';
import CartRecentProducts from '~comp/cart-recent-products';

import snCart from '~mod/sn-cart';
import { getShippingPrice } from '~mod/shipping';
import {
	isFreeItem,
	isItemHasProp,
	isSameText,
	intersectTwo,
	formatMoney,
} from '~mod/utils';

import SvgClose from '~svg/close.svg';
import CartSwellRedemption from '~comp/swell/cart-swell-redemption';

export default class Cart extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isLastStockKey: '',
			cart: { items: [] },
			loadingInit: true,

			itemCount: 0,
			manualGwpCount: 0,
			totalPrice: 0,
			upsellData: {},

			discountData: {},
			loadingDiscount: false,

			manualGwp: {},
			loadingManualGwp: { loading: false, id: -1 },
			shippingData: {},
			shippingMeter: {},
			discountMeter: {},
			recentProducts: [],
			pointsEarned: true,
		};
	}

	componentDidMount() {
		this.setCartData();
		this.setRecentProducts();
		document.addEventListener('snCart.requestComplete', this.setCartData);
		document.addEventListener('snCart.requestDone', this.setCartCount);
		document.addEventListener('snCart.recentProducts', this.setRecentProducts);
	}

	componentWillUnmount() {
		document.removeEventListener('snCart.requestComplete', this.setCartData);
		document.removeEventListener('snCart.requestDone', this.setCartCount);
		document.removeEventListener('snCart.recentProducts', this.setRecentProducts);
	}

	setCartCountEl = (count) => {
		$('.cart-drawer__count').text(count);
	}

	setCartCount = (e) => {
		this.setState((prevState) => {
			const { detail } = e;
			let count = prevState.itemCount;
			if (detail && detail.action === 'add') {
				const item = detail.result;
				if (!isItemHasProp(item, '_campaign_type', 'manual_gwp')) {
					count = prevState.itemCount + parseInt(detail.quantity, 10);
				}
			} else {
				count = detail.result.item_count - prevState.manualGwpCount;
			}
			count = count > 0 ? count : 0;
			this.setCartCountEl(count);

			return {
				itemCount: count,
			};
		});
	}

	/* -------------------
		Process cart data for display
	------------------- */
	setCartData = async () => {
		const { cart } = snCart;
		const models = {};
		const { items } = cart;

		let count = 0;
		let manualGwpCount = 0;
		let comparePriceDiff = 0;
		for (let i = 0; i < items.length; i += 1) {
			// eslint-disable-next-line no-await-in-loop
			items[i].models = await this.getItemModels(items[i]);
			if (items[i].models.isManualGwp) {
				manualGwpCount += items[i].quantity;
			} else {
				count += items[i].quantity;
				comparePriceDiff += items[i].models.comparePriceDiff * items[i].quantity;
			}
		}

		models.itemCount = count;
		models.manualGwpCount = manualGwpCount;
		models.comparePriceDiff = comparePriceDiff;
		this.setCartCountEl(count);

		models.upsellData = items;

		models.totalPrice = cart.original_total_price;
		models.subtotalPrice = cart.original_total_price + comparePriceDiff;

		await snCart.checkAppliedDiscount(cart).then((discountData) => {
			models.discountData = this.getDiscountDataDisplay({
				...discountData,
				errorExtra: this.getDiscountErrorExtra(discountData),
			});

			if (models.discountData.amount > 0) {
				models.totalPrice -= models.discountData.amount;
			}

			return snCart.getManualGwp(cart);
		}).then((manualGwp) => {
			models.manualGwp = manualGwp;

			return getShippingPrice(models.totalPrice);
		}).then((shippingData) => {
			models.shippingData = {
				show: shippingData.shipping !== null,
				amount: shippingData.shipping || 0,
			};

			if (shippingData.freeRate && models.totalPrice > 0) {
				const rate = shippingData.freeRate;
				models.shippingMeter = {
					enabled: true,
					target: rate.min_order_subtotal ? parseFloat(rate.min_order_subtotal) * 100 : 0,
					current: models.totalPrice,
				};
			} else {
				models.shippingMeter = {
					enabled: false,
				};
			}

			models.totalPrice += models.shippingData.amount;
			return snCart.checkTierLevel(cart);
		})
			.then((tierDiscount) => {
				const tiers = tierDiscount;
				const selectedTier = tiers[0];
				const nextTier = tiers[1] || selectedTier;
				const totalOriginal = tiers[2];

				models.discountMeter = {
					enabled: true,
					target: parseInt(nextTier.min_spend, 10) * 100,
					current: totalOriginal,
					progressText: selectedTier.text,
				};
			});

		this.setState({
			loadingInit: false,
			loadingDiscount: false,
			cart,
			...models,
		});
	}

	async getItemModels(item) {
		const productData = await snCart.getProductInfo(item.handle);

		const models = {
			isFree: isFreeItem(item),
			isManualGwp: isItemHasProp(item, '_campaign_type', 'manual_gwp'),
			image: item.image ? item.image.replace(/(\.[^.]*)$/, '_medium$1').replace('http:', '') : '//cdn.shopify.com/s/assets/admin/no-image-medium-cc9732cb976dd349a0df1d39816fbcc7.gif',
			comparePrice: productData.comparePrices[item.id],
			showPreorderNotif: tSettings.variantNotification.indexOf(item.id) !== -1 && tSettings.enable_tan_change,
			showPreorderNotif_2: tSettings.variantNotification_2.indexOf(item.id) !== -1 && tSettings.enable_tan_change,
		};

		models.url = models.free ? undefined : item.url;
		models.comparePriceDiff = models.comparePrice > 0 ? models.comparePrice - item.original_price : 0;

		models.recurring = false;

		if (item.selling_plan_allocation) {
			models.recurring = item.selling_plan_allocation.selling_plan.recurring_deliveries;
		}

		models.properties = {};
		if (item.properties) {
			Object.keys(item.properties).forEach((key) => {
				if (!key.startsWith('_') && item.properties[key]) {
					models.properties[key] = item.properties[key];
				}
			});
		}

		const options = await this.getVariantOptions(item.handle, item.id, item.variant_options);
		models.swatches = options.swatches;
		models.variants = options.variants;
		models.selectedSwatch = options.selected;

		return models;
	}

	/* -------------------
		Variant options
	------------------- */
	async getVariantOptions(handle, varId, currentOptions) {
		const { variants, options } = (await snCart.getProductInfo(handle)).product;
		const swatches = options.filter((opt) => opt.name.toLowerCase().includes('color')
			|| opt.name.toLowerCase().includes('style')
			|| opt.name.toLowerCase().includes('scent')).map((opt) => {
			let { name } = opt;
			if (name.toLowerCase().includes('drops') || name.toLowerCase().includes('foam') || name.toLowerCase().includes('color')) {
				name = 'Shade';
			} else if (name.toLowerCase().includes('style') || name.toLowerCase().includes('scent')) {
				name = 'Style';
			} else if (name.toLowerCase().includes('style')) {
				name = 'Style';
			} else if (name.toLowerCase().includes('scent')) {
				name = 'Scent';
			}
			return { ...opt, name };
		});

		const positions = swatches.map((opt) => opt.position);
		const allOptions = [];
		let selected = [];
		variants.forEach((variant) => {
			// If all option other than swatches are the same, show the variant
			let showOption = true;
			currentOptions.forEach((opt, index) => {
				if (positions.indexOf(index + 1) === -1) {
					showOption = showOption && opt === variant[`option${index + 1}`];
				}
			});
			if (showOption) {
				allOptions.push({
					id: variant.id,
					available: variant.available,
					option: positions.map((pos) => variant[`option${pos}`]),
				});
			}
			if (variant.id === varId) {
				selected = positions.map((pos) => currentOptions[pos - 1]);
			}
		});
		return {
			selected,
			swatches,
			variants: allOptions,
		};
	}

	setRecentProducts = async () => {
		const { recentProducts, productInfo } = snCart;
		const products = [];

		for (let i = 0; i < recentProducts.length; i += 1) {
			// eslint-disable-next-line no-await-in-loop
			const productData = productInfo[recentProducts[i]];
			if (productData) {
				const variant = productData.product.variants[0];
				if (variant && variant.available) {
					products.push({
						upsellId: variant.id,
						title: productData.product.title.trim(),
						image: getSizedImageUrl(productData.product.featured_image, '444x558'),
						price: variant.price,
						comparePrice: variant.compare_at_price || 0,
					});
				}
			}
		}

		this.setState({
			recentProducts: products,
		});
	}

	/* -------------------
		Upsell
	------------------- */
	async getUpsell(items) {
		const settings = tSettings.cartUpsell;
		const variantIds = items.map((item) => item.id);
		const autoUpsell = tSettings.upsell_auto;
		const upsellCollections = tSettings.cartUpsellCollection;
		const maxUpsells = tSettings.upsell_max_item;
		let upsell = false;
		const upsellItems = [];

		if (autoUpsell && upsellCollections.length > 0) {
			const handles = items.map((item) => item.handle);
			let maxItem = 0;
			for (let i = 0; i < upsellCollections.length; i += 1) {
				const targetId = upsellCollections[i].target_id;
				// eslint-disable-next-line no-await-in-loop
				const productData = await snCart.getProductInfo(upsellCollections[i].handle);
				if (handles.indexOf(upsellCollections[i].handle) < 0) {
					upsell = {
						targetId,
						replaceToId: targetId,
						productTitle: upsellCollections[i].title,
						url: upsellCollections[i].url,
						price: productData.prices[targetId],
						comparePrice: productData.comparePrices[targetId],
						settings: {
							bundle_txt_button: tSettings.upsell_btn_label,
							bundle_ad_product_name: upsellCollections[i].title,
							bundle_ad_product_desc: upsellCollections[i].variant_title,
							bundle_front_image_200: upsellCollections[i].bundle_front_image_200,
							bundle_front_image: upsellCollections[i].bundle_front_image,
						},
						option1: false,
						option2: false,
					};
					upsellItems.push(upsell);
					maxItem += 1;
				}

				if (maxItem >= maxUpsells) {
					break;
				}
			}
		} else if (settings.length > 0) {
			for (let i = 0; i < settings.length; i += 1) {
				const setting = settings[i];
				const prerequisite = setting.when_contain_product.split(',').map((v) => parseInt(v, 10));
				const upsellVariants = setting.replace_product_bundle.split(',').map((v) => parseInt(v, 10));
				const intersect = intersectTwo(prerequisite, variantIds);
				if (intersect.length > 0) {
					// eslint-disable-next-line no-await-in-loop
					const productData = await snCart.getProductInfo(setting.product_handle);
					const targetId = intersect[0];
					const replaceToId = upsellVariants[prerequisite.indexOf(targetId)];
					const upsellItemInCart = upsellVariants.filter((value) => variantIds.includes(value));
					const productVariants = productData.product.variants.filter((value) => value.id === replaceToId);
					const option1 = productVariants.length > 0 && tSettings.upsell_shade.split(',').includes(productVariants[0].option1) ? productVariants[0].option1 : false;
					const option2 = productVariants.length > 0 && tSettings.upsell_shade.split(',').includes(productVariants[0].option2) ? productVariants[0].option2 : false;

					if (productData.product.available && upsellItemInCart.length <= 0) {
						upsell = {
							targetId,
							replaceToId,
							productTitle: productData.product.title,
							url: productData.product.url,
							price: productData.prices[replaceToId],
							comparePrice: productData.comparePrices[replaceToId],
							settings: setting,
							option1,
							option2,
							optLabel: tSettings.upsell_shade_label,
						};
						upsellItems.push(upsell);
					}
				}
			}
		}

		return (upsellItems.length > 0) ? upsellItems : false;
	}

	/* -------------------
		Discounts
	------------------- */
	getDiscountErrorExtra(data = {}) {
		// to show error when items is not valid but discount applied
		const { cart } = snCart;
		const { items } = cart;

		let isItemsInCart = false;
		for (let i = 0; i < items.length; i += 1) {
			if (tSettings.custom_error_handles.includes(items[i].handle)) {
				isItemsInCart = true;
				break;
			}
		}

		if (tSettings.enable_custom_codes && isItemsInCart && isSameText(data.code, tSettings.custom_codes_code)) {
			return true;
		}

		return false;
	}

	getDiscountDataDisplay(data = {}) {
		let error = '';
		if (data.reason) {
			switch (data.reason) {
				case 'purchase':
					error = `${tStrings.discount_min_spend} ${formatMoney(data.minPurchase)}`;
					break;
				case 'product':
					error = tStrings.discount_error;
					break;
				default:
					error = data.reason;
					break;
			}
		} else if (data.error) {
			error = data.error;
		}

		// to set custom code error message from theme settings when disccode is match
		const customCodes = tSettings.custom_codes_code.toUpperCase();
		if (!data.valid && data.discode && data.discode.toUpperCase() === customCodes && tSettings.enable_custom_codes) {
			error = tSettings.custom_error_codes_msg;
		}

		if (data.reason && data.reason === 'product' && data.code && data.code.toUpperCase() === customCodes && tSettings.enable_custom_codes) {
			error = tSettings.custom_error_codes_msg;
		}

		if (data.code_reject) {
			error = tStrings.cart_code_rejection_msg;
		}

		let amount = data.discount < 0 ? (data.discount * -1) : (data.discount || 0);
		if (!amount) {
			amount = data.amount;
		}

		return {
			applied: data.valid && data.code && data.code !== '' && !error && !tSettings.cart_code_rejection,
			code: !error ? (data.code || '').toUpperCase() : '',
			isAuto: !!data.isAuto,
			amount,
			error,
			errorExtra: data.errorExtra ? data.errorExtra : false,
		};
	}

	/* -------------------
		Actions
	------------------- */

	onChangeQuantity = (item, qty, callback) => {
		this.setState({ isLastStockKey: '' }, () => {
			snCart.changeQuantity(item, qty, (newQty) => {
				this.setState({ isLastStockKey: item.key });
				callback(newQty);
			});
		});
	}

	onChangeVariant = (item, newVariantId, lastStock) => {
		const quantity = (lastStock && lastStock.length > 0) ? lastStock[0].quantity : item.quantity;
		if (item.id !== newVariantId) {
			snCart.replaceItem(item.key, newVariantId, quantity);
		}
	}

	onRemoveItem = (item) => {
		snCart.removeItem(item.id);
	}

	onAddUpsell = (upsell) => {
		return snCart.addItem(upsell.id, 1);
	}

	onApplyDiscountCode = (code) => {
		this.setState({ loadingDiscount: true }, () => {
			if (!tSettings.cart_code_rejection) {
				snCart.applyDiscountCode(code).then((discountData) => {
					if (discountData.enabled === false || discountData.isValid === false) {
						this.setState({
							loadingDiscount: false,
							discountData: this.getDiscountDataDisplay({ reason: discountData.error, discode: discountData.code }),
						});
					} else {
						this.setState({
							loadingDiscount: false,
							discountData: this.getDiscountDataDisplay({
								...discountData,
								valid: true,
								error: '',
								errorExtra: this.getDiscountErrorExtra(discountData),
							}),
						});
					}
				});
			} else {
				snCart.applyDiscountCode(code).then(() => {
					this.setState((prevState) => ({
						loadingDiscount: false,
						discountData: this.getDiscountDataDisplay({ ...prevState.discountData, code_reject: true }),
					}));
				});
			}
		});
	}

	onRemoveDiscountCode = () => {
		this.setState({ loadingDiscount: true }, () => {
			snCart.removeDiscountCode();
			this.setState({
				loadingDiscount: false,
				discountData: this.getDiscountDataDisplay(),
			});
		});
	}

	onToggleManualGwp = (id) => {
		this.setState({
			loadingManualGwp: { loading: true, id },
		}, () => {
			const newSelected = snCart.toggleManualGwp(this.state.manualGwp, id);
			this.setState((prevState) => ({
				manualGwp: {
					...prevState.manualGwp,
					selectedKey: newSelected,
				},
				loadingManualGwp: { loading: false, id: -1 },
			}));
		});
	}

	// eslint-disable-next-line arrow-body-style, camelcase
	getStock = (var_id) => {
		return snCart.getVariantInProducts(var_id).inv;
	}

	handleKeyDown = (e) => {
		if (e.keyCode === 13) {
			e.preventDefault();
		}
	}

	submitForm() {
		$('#cart-drawer-form').trigger('submit');
	}

	render() {
		const {
			cart,
			loadingInit,
			isLastStockKey,
			itemCount,
			subtotalPrice,
			totalPrice,
			comparePriceDiff,
			loadingDiscount,
			discountData,
			manualGwp,
			loadingManualGwp,
			upsellData,
			shippingData,
			shippingMeter,
			discountMeter,
			recentProducts,
			pointsEarned,
		} = this.state;
		return (
			<div className="modal-dialog modal-dialog-scrollable modal-md m-0 w-100 mh-100 float-right">
				<div className="modal-content mh-100 border-0 rounded-0">
					<div className="modal-body mobile-wrapper pt-0 px-0">
						<div className="container d-flex flex-column align-items-stretch text-center pt-2 px-g px-lg-3">
							<h4 className="font-size-lg font-weight-bold">{tStrings.cart_drawer_title}</h4>
							<button type="button" className="close text-body m-0 px-g pb-2 position-absolute" data-dismiss="modal" aria-label="Close" data-cy="cart-close-icon">
								<SvgClose className="svg" aria-hidden="true" />
							</button>

							{!tSettings.cartDiscountMeter.enable
								&& tSettings.cartShippingMeter.enable
								&& shippingMeter.enabled
								&& itemCount > 0
								&& (
									<CartShippingMeter
										target={shippingMeter.target}
										current={shippingMeter.current}
									/>
								)}
							{tSettings.cartDiscountMeter.enable && discountMeter.enabled && itemCount > 0 && (
								<CartDiscountMeter
									target={discountMeter.target}
									current={discountMeter.current}
									progressText={discountMeter.progressText}
								/>
							)}
							<hr className="w-100 m-0" />
						</div>

						{loadingInit && (
							<div className="d-flex justify-content-center p-2">
								<div className="spinner-border" role="status" />
							</div>
						)}

						{!loadingInit && (itemCount === 0 ? (
							<div className="pt-3 text-center px-g px-lg-3">
								<div className="container px-g cart-empty-shop-cta">
									<p className="my-3 text-center">{tStrings.cart_empty}</p>
									<a href="/collections" className="btn btn-primary" data-cy="shop-all-btn">Shop all products</a>
								</div>
								<div className="cart-empty-discount-form container text-left d-none">
									<CartDiscountForm
										isApplied={discountData.applied}
										code={discountData.code}
										isAutoDiscount={discountData.isAuto}
										loading={loadingDiscount}
										error={discountData.error}
										errorExtra={discountData.errorExtra}
										onApply={this.onApplyDiscountCode}
										onRemove={this.onRemoveDiscountCode}
									/>
								</div>
								{recentProducts.length > 0 && (
									<>
										<hr />
										<CartRecentProducts products={recentProducts} onAddToCart={this.onAddUpsell} />
									</>
								)}
							</div>
						) : (
							// eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
							<form
								id="cart-drawer-form"
								className="container px-g px-lg-3"
								action="/cart"
								method="post"
								noValidate
								onKeyDown={this.handleKeyDown}
							>
								<input type="hidden" name="checkout" value="Checkout" />

								<ul className="list-unstyled border-bottom">
									{cart.items.map((item) => !!item.models && !item.models.isManualGwp && (
										<CartItem
											key={item.key}
											item={item}
											isLastStock={item.key === isLastStockKey}
											onChangeVariant={this.onChangeVariant}
											onChangeQuantity={this.onChangeQuantity}
											onRemoveItem={this.onRemoveItem}
											productId={item.id}
											productStock={this.getStock(item.id)}
										/>
									))}
								</ul>

								{manualGwp.enabled && (
									<>
										<CartManualGwp
											title={manualGwp.title}
											maxSelected={manualGwp.maxSelected}
											selectedKey={manualGwp.selectedKey}
											items={manualGwp.items}
											onAddItem={this.onToggleManualGwp}
											onRemoveItem={this.onToggleManualGwp}
											loading={loadingManualGwp.loading}
											processingId={loadingManualGwp.id}
										/>
										<hr />
									</>
								)}

								<CartSwellRedemption />
								<hr className="mb-g mb-lg-2" />

								<CartDiscountForm
									isApplied={discountData.applied}
									code={discountData.code}
									isAutoDiscount={discountData.isAuto}
									loading={loadingDiscount}
									error={discountData.error}
									errorExtra={discountData.errorExtra}
									onApply={this.onApplyDiscountCode}
									onRemove={this.onRemoveDiscountCode}
								/>
								<hr className="mt-g mt-lg-2" />

								<div className="row">
									<p className="col-8 mb-1 font-weight-bold" data-cy="cart-subtotal-label">{tStrings.cart_subtotal}</p>
									<p className="col-4 mb-1 font-weight-bold text-right" data-cy="cart-subtotal-value">{formatMoney(subtotalPrice)}</p>

									{comparePriceDiff > 0 && (
										<>
											<p className="col-8 mb-1 font-weight-bold" data-cy="cart-bundledisount-label">{tStrings.cart_bundle_discount}</p>
											<p className="col-4 mb-1 font-weight-bold text-right" data-cy="cart-bundledisount-value">{`-${formatMoney(comparePriceDiff)}`}</p>
										</>
									)}

									{discountData.amount > 0 && (
										<>
											<p className="col-8 mb-1 font-weight-bold" data-cy="cart-discount-label">{tStrings.cart_discount}</p>
											<p className="col-4 mb-1 font-weight-bold text-right" data-cy="cart-discount-value">{`-${formatMoney(discountData.amount)}`}</p>
										</>
									)}

									{shippingData.show && (
										<>
											<p className="col-8 mb-1 font-weight-bold" data-cy="cart-shipping-label">{tStrings.cart_shipping}</p>
											<p className={`col-4 mb-1 font-weight-bold text-right ${shippingData.amount > 0 ? '' : 'text-primary'}`} data-cy="cart-shipping-value">{shippingData.amount > 0 ? formatMoney(shippingData.amount) : 'Free'}</p>
										</>
									)}

									{pointsEarned && (
										<>
											<p className="col-8 mb-1 font-weight-bold mt-g">Points earned</p>
											<p className="col-4 mb-1 font-weight-bold text-right mt-g">⭐ 52</p>
										</>
									)}
								</div>

								<hr />

								{upsellData && (<CartUpsell upsell={upsellData} onAddUpsell={this.onAddUpsell} />)}
							</form>
						))}
					</div>

					{!loadingInit && itemCount > 0 && (
						<div className="modal-footer px-g px-lg-3 py-2">
							<div className="row no-gutters w-100">
								<span className="col-8 font-size-lg font-weight-bold" data-cy="cart-total-label">{tStrings.cart_total}</span>
								<span className="col-4 font-size-lg font-weight-bold text-right" data-cy="cart-total-value">{formatMoney(totalPrice)}</span>
								<div className="col-12 my-1">
									<button
										type="button"
										className="btn btn-lg btn-block btn-primary px-1"
										disabled={loadingDiscount || manualGwp.loading}
										onClick={this.submitForm}
										data-cy="checkout-btn"
									>
										{tStrings.cart_checkout}
									</button>
								</div>
							</div>
							<p className="col-12 p-0 text-center" dangerouslySetInnerHTML={{ __html: tStrings.cart_shipping_at_checkout }} />
						</div>
					)}
				</div>
			</div>
		);
	}
}
