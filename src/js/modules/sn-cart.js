/* global tSettings */

/*
	DO NOT COPY THIS FILE TO THEME
*/

import {
	isItemIdInKey,
	bindAllMethods,
	isSameText,
} from '~mod/utils';

import products from '~mod/products.json';

const productInfo = {};
const productQuantities = {};
const varIdtoHandle = {};
window.heros_bundles = [];

products.forEach((product) => {
	const prices = {};
	const comparePrices = {};
	// eslint-disable-next-line no-param-reassign
	product.available = false;
	product.featured_image = product.image ? product.image.src : '';
	product.variants.forEach((variant) => {
		prices[variant.id] = typeof variant.price === 'string' ? parseInt(variant.price.replace('.', ''), 10) : 0;
		comparePrices[variant.id] = typeof variant.compare_at_price === 'string' ? parseInt(variant.compare_at_price.replace('.', ''), 10) : 0;
		productQuantities[variant.id] = variant.inventory_quantity;
		varIdtoHandle[variant.id] = product.handle;
		// eslint-disable-next-line no-param-reassign
		variant.available = variant.inventory_quantity > 0;
		// eslint-disable-next-line no-param-reassign
		product.available = product.available || variant.available;

		if (product.product_type === 'HERO' || product.product_type === 'BUNDLE') {
			if (!(!product.title.toLowerCase().includes('bundle') && variant.title.toLowerCase().includes('bundle'))) {
				const splits = variant.title.split('/');
				let option = splits.pop().trim();
				if (option.toLowerCase().includes('default')) {
					option = '';
				} else {
					option = ` - ${option}`;
				}
				if (splits.length && splits[0].toLowerCase().includes('besties')) {
					option = ` - Besties ${option}`;
				}
				$('#product-select').append(`<option value="${variant.id}">${product.title}${option}</option>`);
			}
		}
	});
	productInfo[product.handle] = {
		product,
		prices,
		comparePrices,
	};
});

class SNCart {
	constructor() {
		bindAllMethods(this);

		this.cart = {
			items: [],
			item_count: 0,
			items_subtotal_price: 0,
			original_total_price: 0,
		};

		this.productInfo = productInfo;
		this.recentProducts = ['sunny-honey-bali-bronzing-self-tan-set', 'bali-buffing-sugar-scrub', 'bali-hair-ways-travel-kit'];

		this.manualGwpSelected = [];

		this.appliedCode = '';
	}

	calculateCart() {
		const { items } = this.cart;
		let count = 0;
		let subtotal = 0;
		items.forEach((item) => {
			count += item.quantity;
			subtotal += item.original_price * item.quantity;
		});
		this.cart.item_count = count;
		this.cart.items_subtotal_price = subtotal;
		this.cart.original_total_price = subtotal;
		document.dispatchEvent(new CustomEvent('snCart.requestDone', { detail: { result: this.cart } }));
		document.dispatchEvent(new CustomEvent('snCart.requestComplete'));
	}

	removeItem(id) {
		const { items } = this.cart;
		const index = items.findIndex((item) => item.key === id || item.id === id);
		items.splice(index, 1);
		this.calculateCart();
	}

	updateItemQuantities(updates) {
		const { items } = this.cart;
		Object.keys(updates).forEach((key) => {
			const index = items.findIndex((item) => item.key === key || item.id === key);
			if (index > -1) {
				items[index].quantity = updates[key];
			}
		});
		this.calculateCart();
	}

	addItem(id, quantity = 1, properties) {
		const { items } = this.cart;
		const sameIds = items.filter((item) => item.id === id);
		let updated = false;
		if (sameIds) {
			for (let i = 0; i < sameIds.length; i += 1) {
				if (sameIds[i].properties === properties) {
					sameIds[i].quantity += quantity;
					sameIds[i].original_line_price = sameIds[i].original_price * sameIds[i].quantity;
					updated = true;
					break;
				}
			}
		}
		if (!updated) {
			const handle = varIdtoHandle[id];
			const pInfo = productInfo[handle];
			if (pInfo) {
				const { product } = pInfo;
				const variant = product.variants.find((v) => v.id === id);
				const options = [];
				// eslint-disable-next-line camelcase
				const options_with_values = [];
				if (variant.option1) {
					options.push(variant.option1);
					options_with_values.push({ name: product.options[0].name, value: variant.option1 });
				}
				if (variant.option2) {
					options.push(variant.option2);
					options_with_values.push({ name: product.options[1].name, value: variant.option2 });
				}
				if (variant.option3) {
					options.push(variant.option3);
					options_with_values.push({ name: product.options[2].name, value: variant.option3 });
				}
				items.splice(0, 0, {
					id,
					key: `${id}:abcd`,
					product_title: pInfo.product.title,
					url: `https://dev.cocoandeve.com/products/${pInfo.product.handle}`,
					image: product.image.src,
					handle: pInfo.product.handle,
					product_id: product.id,
					variant_id: id,
					sku: variant.sku,
					variant_options: options,
					options_with_values,
					quantity,
					original_price: pInfo.prices[id],
					original_line_price: pInfo.prices[id] * quantity,
					properties,
					selling_plan_allocation: product.selling_plan_allocation,
				});
			}
		}
		this.calculateCart();
	}

	changeQuantity(item, qty, callback) {
		const maxQty = productQuantities[item.id];
		if (qty === 0) {
			this.removeItem(item.id);
			return;
		}
		if (qty > maxQty) {
			// eslint-disable-next-line no-param-reassign
			item.quantity = maxQty;
			if (typeof callback === 'function') {
				callback(maxQty);
			}
		} else {
			// eslint-disable-next-line no-param-reassign
			item.quantity = qty;
		}
		this.calculateCart();
	}

	replaceItem(oldId, newId, quantity) {
		setTimeout(() => {
			this.removeItem(oldId);
			this.addItem(newId, quantity);
			this.calculateCart();
		}, 1000);
	}

	getProductInfo(handle) {
		return Promise.resolve(productInfo[handle]);
	}

	getVariantInProducts(varId) {
		if (window.heros_bundles.length > 0) {
			const product = window.heros_bundles.find((item) => item.variants.find((variant) => variant.var_id === varId));
			if (product && product.variants.length > 0) {
				return product.variants.find((variant) => variant.var_id === varId);
			}
			return false;
		}
		return false;
	}

	getItem(id) {
		return this.cart.items.find((item) => item.id === id);
	}

	/* -------------------
		Manual Gwp
	------------------- */
	async getManualGwp(cart) {
		const { manualGwp } = tSettings;
		if (cart.items_subtotal_price >= manualGwp.minPurchase) {
			if (this.manualGwpSelected.length > manualGwp.maxSelected) {
				this.manualGwpSelected = this.toggleManualGwp({
					maxSelected: manualGwp.maxSelected,
				});
			}
			return {
				enabled: manualGwp.items.length > 0,
				title: manualGwp.title,
				selectedKey: this.manualGwpSelected,
				maxSelected: manualGwp.maxSelected,
				items: manualGwp.items,
			};
		}
		this.manualGwpSelected = [];
		return { enabled: false };
	}

	toggleManualGwp(data, id) {
		const { maxSelected } = data;
		const toRemove = {};
		if (id) {
			const selectedKey = this.manualGwpSelected.find((key) => isItemIdInKey(key, id));
			if (selectedKey) {
				toRemove[selectedKey] = 0;
				this.manualGwpSelected = this.manualGwpSelected.filter((key) => key !== selectedKey);
			} else {
				this.manualGwpSelected.push(`${id}`);
				this.addItem(id, 1, { _campaign_type: 'manual_gwp' });
			}
		}
		while (this.manualGwpSelected.length > maxSelected) {
			toRemove[this.manualGwpSelected.shift()] = 0;
		}
		this.updateItemQuantities(toRemove);
		return this.manualGwpSelected;
	}

	/* -------------------
		Discounts
	------------------- */
	removeDiscountCode = () => {
		this.appliedCode = '';
		this.calculateCart();
	}

	applyDiscountCode = (discountCode = '') => new Promise((resolve) => {
		this.appliedCode = discountCode;
		if (isSameText(discountCode, 'minimal50')) {
			if (this.cart.items_subtotal_price >= 5000) {
				resolve({ enabled: true, code: this.appliedCode });
				this.calculateCart();
			} else {
				resolve({
					enabled: false, code: this.appliedCode, error: 'Server return error: min purhcase $50.00',
				});
				this.appliedCode = '';
			}
		} else if (isSameText(discountCode, 'valid')) {
			resolve({ enabled: true, code: discountCode });
			this.calculateCart();
		} else {
			this.appliedCode = '';
			resolve({ enabled: false, code: discountCode, error: 'Discount code not valid' });
		}
	})

	checkAppliedDiscount = (cart) => new Promise((resolve) => {
		const pillowCase = cart.items.find((item) => item.id === 33007919595555);
		if (pillowCase) {
			resolve({
				valid: true, isAuto: true, code: 'testauto', discount: 500,
			});
		} else if (isSameText(this.appliedCode, 'minimal50')) {
			if (cart.items_subtotal_price >= 5000) {
				resolve({ valid: true, code: this.appliedCode, discount: 1000 });
			} else {
				resolve({
					valid: false, code: this.appliedCode, reason: 'purchase', minPurchase: 5000,
				});
				this.appliedCode = '';
			}
		} else if (isSameText(this.appliedCode, 'valid')) {
			resolve({ valid: true, code: this.appliedCode, discount: 1500 });
		} else {
			resolve({ valid: false, code: '' });
			this.appliedCode = '';
		}
	})

	async checkTierLevel(cart) {
		return [{}, {}, cart.items_subtotal_price];
	}
}

const snCart = new SNCart();
window.snCart = snCart;

$('#product-add').on('click', function () {
	snCart.addItem(parseInt($('#product-select').val(), 10), 1);
});

snCart.addItem(39456765050915, 99);
snCart.addItem(39449113788451, 1);
snCart.addItem(32346434732067, 1);
snCart.addItem(32068891541539, 1);
snCart.addItem(32068893048867, 1);

export default snCart;
