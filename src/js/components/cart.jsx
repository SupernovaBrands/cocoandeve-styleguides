/* global tSettings tStrings */

import React from 'react';

import CartItem from '~comp/cart-item';
import CartDiscountMeter from '~comp/cart-discount-meter';
import CartDiscountForm from '~comp/cart-discount-form';
import CartManualGwp from '~comp/cart-manual-gwp';
import CartUpsell from '~comp/cart-upsell';
import CartExtras from '~comp/cart-extras';

import snCart from '~mod/sn-cart';
import { getShippingPrice } from '~mod/shipping';
import {
	isFreeItem,
	isItemHasProp,
	isSameText,
	kebabCase,
	intersectTwo,
	formatMoney,
} from '~mod/utils';

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
			discountMeter: {},
		};
	}

	componentDidMount() {
		this.setCartData();
		document.addEventListener('snCart.requestComplete', this.setCartData);
		document.addEventListener('snCart.requestDone', this.setCartCount);
	}

	componentWillUnmount() {
		document.removeEventListener('snCart.requestComplete', this.setCartData);
		document.removeEventListener('snCart.requestDone', this.setCartCount);
	}

	setCartCount = (e) => {
		this.setState((prevState) => {
			const { detail } = e;
			let count = prevState.itemCount;
			if (detail && detail.action === 'add') {
				const item = detail.result;
				if (!isItemHasProp(item, '_campaign_type', 'manual_gwp')) {
					count = prevState.itemCount + detail.quantity;
				}
			} else {
				count = detail.result.item_count - prevState.manualGwpCount;
			}
			count = count > 0 ? count : 0;
			$('.cart-drawer__count').text(count);

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
		for (let i = 0; i < items.length; i += 1) {
			// eslint-disable-next-line no-await-in-loop
			items[i].models = await this.getItemModels(items[i]);
			if (items[i].models.isManualGwp) {
				manualGwpCount += items[i].quantity;
			} else {
				count += items[i].quantity;
			}
		}
		models.itemCount = count;
		models.manualGwpCount = manualGwpCount;
		$('.cart-drawer__count').text(count);

		models.upsellData = await this.getUpsell(items);

		models.totalPrice = cart.items_subtotal_price;

		await snCart.checkAppliedDiscount(cart).then((discountData) => {
			models.discountData = this.getDiscountDataDisplay(discountData);

			if (models.discountData.amount > 0) {
				models.totalPrice -= models.discountData.amount;
			}

			return snCart.getManualGwp(cart);
		}).then((manualGwp) => {
			models.manualGwp = manualGwp;

			return getShippingPrice(models.totalPrice);
		}).then((shippingData) => {
			models.shippingData = {
				show: shippingData.shipping != null,
				amount: shippingData.shipping || 0,
			};

			if (shippingData.freeRate && models.totalPrice > 0) {
				const rate = shippingData.freeRate;
				models.discountMeter = {
					enabled: true,
					target: rate.min_order_subtotal ? parseFloat(rate.min_order_subtotal) * 100 : 0,
					current: models.totalPrice,
				};
			} else {
				models.discountMeter = {
					enabled: false,
				};
			}
			models.totalPrice += models.shippingData.amount;
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
			color: (item.options_with_values.find((opt) => isSameText(opt.name, 'color')) || { value: false }).value,
			style: (item.options_with_values.find((opt) => isSameText(opt.name, 'style')) || { value: false }).value,
			showPreorderNotif: tSettings.variantNotification.indexOf(item.id) !== -1 && tSettings.enable_tan_change,
		};

		models.url = models.free ? undefined : item.url;

		models.properties = {};
		if (item.properties) {
			Object.keys(item.properties).forEach((key) => {
				if (!key.startsWith('_') && item.properties[key]) {
					models.properties[key] = item.properties[key];
				}
			});
		}

		if (models.color) {
			models.colorHandle = kebabCase(models.color);
			models.variantOptions = await this.getColorOptions(item.handle, item.variant_options);
		}

		if (models.style) {
			const handle = kebabCase(models.style);
			const label = handle.includes('leaf-print') || handle.includes('girl-print') ? 'Hair Wrap' : 'Style';
			models.styleHandle = handle;
			models.styleTitle = label;
		}

		return models;
	}

	/* -------------------
		Variant options
	------------------- */
	async getColorOptions(handle, variantOptions) {
		const { variants, options } = (await snCart.getProductInfo(handle)).product;
		const allOptions = [];
		const optionPos = options.find((opt) => isSameText(opt.name, 'color')).position;
		const option = `option${optionPos}`;
		variants.forEach((variant) => {
			// If all option other than color is the same, show the variant
			let showOption = true;
			variantOptions.forEach((opt, index) => {
				if (index + 1 !== optionPos) {
					showOption = showOption && opt === variant[`option${index + 1}`];
				}
			});
			if (showOption) {
				allOptions.push({
					id: variant.id,
					available: variant.available,
					color: variant[option],
					colorHandle: kebabCase(variant[option]),
				});
			}
		});
		return allOptions;
	}

	/* -------------------
		Upsell
	------------------- */
	async getUpsell(items) {
		const settings = tSettings.cartUpsell;
		const variantIds = items.map((item) => item.id);
		let upsell = false;
		if (settings.length > 0) {
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
					upsell = {
						targetId,
						replaceToId,
						productTitle: productData.product.title,
						url: productData.product.url,
						price: productData.prices[replaceToId],
						comparePrice: productData.comparePrices[replaceToId],
						settings: setting,
					};
					break;
				}
			}
		}
		return upsell;
	}

	/* -------------------
		Discounts
	------------------- */
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
		return {
			applied: data.valid === true && data.code && data.code !== '' && !error,
			code: !error ? (data.code || '').toUpperCase() : '',
			isAuto: !!data.isAuto,
			amount: data.discount < 0 ? (data.discount * -1) : (data.discount || 0),
			error,
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

	onChangeVariant = (item, newVariantId) => {
		if (item.id !== newVariantId) {
			snCart.replaceItem(item.key, newVariantId, item.quantity);
		}
	}

	onRemoveItem = (item) => {
		snCart.removeItem(item.id);
	}

	onAddUpsell = (upsell) => {
		if (upsell.upgrade_bundle_method === 'replace') {
			snCart.replaceItem(upsell.targetId, upsell.replaceToId, 1);
		} else {
			snCart.addItem(upsell.replaceToId, 1);
		}
	}

	onApplyDiscountCode = (code) => {
		this.setState({ loadingDiscount: true }, () => {
			snCart.applyDiscountCode(code).then((discountData) => {
				if (discountData.enabled === false || discountData.isValid === false) {
					this.setState({
						loadingDiscount: false,
						discountData: this.getDiscountDataDisplay({ reason: discountData.error }),
					});
				} else {
					this.setState({
						loadingDiscount: false,
						discountData: this.getDiscountDataDisplay({
							...discountData,
							valid: true,
							error: '',
						}),
					});
				}
			});
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

	handleKeyDown = (e) => {
		if (e.keyCode === 13) {
			e.preventDefault();
		}
	}

	submitForm() {
		if (this.formRef) {
			this.formRef.submit();
		}
	}

	render() {
		const {
			cart,
			loadingInit,
			isLastStockKey,
			itemCount,
			totalPrice,
			loadingDiscount,
			discountData,
			manualGwp,
			loadingManualGwp,
			upsellData,
			shippingData,
			discountMeter,
		} = this.state;
		return (
			<div className="modal-dialog modal-md m-0 w-100 float-right">
				<div className="modal-content vh-100 border-0 rounded-0">
					<div className="modal-body mobile-wrapper pt-0 px-lg-0">
						<div className="container d-flex flex-column align-items-stretch text-center pt-2">
							<h2>{tStrings.cart_drawer_title}</h2>
							<button type="button" className="close m-0 p-1 position-absolute" data-dismiss="modal" aria-label="Close">
								<span className="sni sni__close" aria-hidden="true" />
							</button>

							{tSettings.cartShippingMeter.enable && discountMeter.enabled && (
								<CartDiscountMeter
									target={discountMeter.target}
									current={discountMeter.current}
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
							<h4 className="mt-2 text-center">{tStrings.cart_empty}</h4>
						) : (
							// eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
							<form
								className="container"
								action="/cart"
								method="post"
								noValidate
								onKeyDown={this.handleKeyDown}
								ref={(r) => { this.formRef = r; }}
							>
								<ul className="list-unstyled">
									{cart.items.map((item) => !!item.models && !item.models.isManualGwp && (
										<CartItem
											key={item.key}
											item={item}
											isLastStock={item.key === isLastStockKey}
											onChangeVariant={this.onChangeVariant}
											onChangeQuantity={this.onChangeQuantity}
											onRemoveItem={this.onRemoveItem}
										/>
									))}
								</ul>

								{manualGwp.enabled && (
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
								)}

								<div className="row">
									<h4 className="col-8 font-weight-bold">{tStrings.cart_subtotal}</h4>
									<h4 className="col-4 text-right">{formatMoney(cart.items_subtotal_price)}</h4>

									{shippingData.show && (
										<>
											<h4 className="col-8">{tStrings.cart_shipping}</h4>
											<h4 className="col-4 text-right text-primary">{shippingData.amount > 0 ? formatMoney(shippingData.amount) : 'Free'}</h4>
										</>
									)}

									{discountData.amount > 0 && (
										<>
											<h4 className="col-8">Discount</h4>
											<h4 className="col-4 text-right">{`-${formatMoney(discountData.amount)}`}</h4>
										</>
									)}
								</div>

								<CartDiscountForm
									isApplied={discountData.applied}
									code={discountData.code}
									isAutoDiscount={discountData.isAuto}
									loading={loadingDiscount}
									error={discountData.error}
									onApply={this.onApplyDiscountCode}
									onRemove={this.onRemoveDiscountCode}
								/>
								<hr />

								<div className="row">
									<h2 className="col-8 m-0">{tStrings.cart_total}</h2>
									<h2 className="col-4 text-right m-0">{formatMoney(totalPrice)}</h2>
								</div>
								<hr />

								{upsellData && (<CartUpsell upsell={upsellData} onAddUpsell={this.onAddUpsell} />)}

								<CartExtras />
							</form>
						))}
					</div>

					{!loadingInit && (
						<div className="modal-footer">
							<button
								type="button"
								className="btn btn-lg btn-block btn-primary"
								disabled={loadingDiscount || manualGwp.loading}
								onClick={this.submitForm}
							>
								{tStrings.cart_checkout}
							</button>
						</div>
					)}
				</div>
			</div>
		);
	}
}
