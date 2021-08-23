// Mocks global variables in live store

window.assetUrl = function (filename) {
	return `/images/${filename}`;
};

window.initLazyImages = () => {
	function removeBg(e) {
		const parent = e.target.parentElement;
		if (parent.classList.contains('bg-shimmer')) {
			parent.classList.remove('bg-shimmer');
		}
		e.target.removeEventListener('load', removeBg);
	}

	function loadImage(img) {
		const parent = img.parentElement;
		const hasSource = parent.tagName === 'PICTURE' && parent.querySelectorAll('source').length > 0;
		const dataSrc = img.dataset.src;
		const hasDataSrc = dataSrc && img.src !== dataSrc;
		const sources = parent.querySelectorAll('source');

		if (img.complete && !hasDataSrc) {
			removeBg({ target: img });
		} else {
			img.addEventListener('load', removeBg);
		}

		if (hasDataSrc) {
			// eslint-disable-next-line no-param-reassign
			img.src = dataSrc;
			if (hasSource && typeof sources !== 'undefined') {
				sources.forEach((source) => {
					// eslint-disable-next-line no-param-reassign
					if (source.dataset.srcset) source.srcset = source.dataset.srcset;
				});
			}
		}
	}

	const io = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				setTimeout(() => {
					loadImage(entry.target);
				}, 1000);
				entry.target.classList.remove('lazyload');
				io.unobserve(entry.target);
			}
		});
	}, {
		rootMargin: '300px 0px',
	});

	window.renderLazyImages = () => {
		document.querySelectorAll('img.lazyload').forEach((img) => {
			io.observe(img);
		});
	};
};
window.initLazyImages();
window.renderLazyImages();

window.screenLG = 992;
window.tStrings = {
	addToCart: 'Add To Cart',
	soldOut: 'Out of stock',
	waitlistTxt: 'Waitlist Me',
	unavailable: 'Unavailable',
	shopAll: 'Shop All',
	shopLabel: 'Shop',
	estimated_delivery_text: '*Estimated delivery 28 Jan',
	estimated_delivery_text_2: '',
	cart_drawer_title: 'Your Cart',
	cart_empty: 'Your cart is currently empty.',
	cart_subtotal: 'Subtotal',
	cart_bundle_discount: 'Bundle Discount',
	cart_discount: 'Discount',
	cart_update_variant: 'Update',
	cart_discount_applied: 'Promo code applied',
	cart_shipping: 'Shipping',
	cart_shipping_at_checkout: 'Shipping &amp; taxes calculated at checkout',
	cart_coupon_txt: '',
	cart_discount_text: 'Apply a promo code',
	cart_discount_input: 'Enter promo code here',
	cart_discount_apply: 'Apply',
	cart_discount_remove: 'Remove',
	cart_total: 'Total',
	cart_question: '<p>Got a question? Email us at: <a href="mailto:hello@cocoandeve.com" title="mailto:hello@cocoandeve.com">hello@cocoandeve.com</a></p>',
	cart_installment_by: 'or [num] interest-free installments of <b>[amount]</b> by',
	cart_checkout: 'Secure Checkout',
	discount_error: 'Oops, this code cannot be applied to your order.',
	discount_min_spend: 'This coupon code is eligible for orders over',
	items_selected: 'items selected',
	items_worth: 'Worth',
	items_manual_add: 'Add',
	items_manual_remove: 'Remove',
	add: 'Add',
	remove: 'Remove',
	thankyou_shipping_text: "<p>You'll get shipping and delivery updates by email.<br>In addition you can:</p>",
	shade_note: 'Shade',
	code_replacing_error: 'Limited to 1 code per order. [previous_code] is removed. [new_code] is applied.',
	discount_title: 'Discount',
	cart_code_rejection_msg: 'You’ve unlocked the best discount, so save your codes for after the sale!',
};

window.tSettings = {
	domain: 'dev.cocoandeve.com',
	store: 'dev',
	locale: 'en',
	currency: 'USD',
	// eslint-disable-next-line no-template-curly-in-string
	moneyFormat: '${{amount}}',
	// eslint-disable-next-line no-template-curly-in-string
	moneyWithCurrencyFormat: '${{amount}} USD',
	currencyFormat: 'money_format',
	variantNotification: [
		32068892688419,
		32068892721187,
		32068891574307,
		32363243831331,
	],
	payment: {
		klarna: true,
		klarna_installment: 4,
		afterpay: false,
	},
	variantNotification_2: [],
	launch_wl_submit_event: '',
	gdpr_performace_list: '_ga;_gid;_gat',
	gdpr_ads_list: '_gads;__cfduid;ghostmonitor_sesion_id;liveconnect;postie;_fbp',
	chk_medium: true,
	chk_dark: false,
	chk_ultra: true,
	chk_medium_bundle: false,
	chk_dark_bundle: false,
	chk_ultra_bundle: false,
	enable_tan_change: true,
	variant_color_add_to_cart: 'Add To Cart',
	tan_single_variant_id: '',
	tan_bundle_variant_id: '',
	tan_masque_glossy_bundle: '',
	tan_deluxe_travel_kit: '',
	enable_free_shipping_measure: true,
	checkout_agreeement: 'By clicking complete order, you agree to our <a href="/pages/terms-conditions">Terms and Conditions</a>',
	checkout_agreeement_de: 'Wenn Sie auf Bestellung abschließen klicken, stimmen Sie unseren <a href="/pages/terms-conditions">Geschäftsbedingungen zu</a>',
	return_link_en: 'Return to Shop',
	return_link_de: 'Zurück zum Shop',
	ab_checkout_express: '',
	upsell_header_title: 'Add these bestsellers',
	upsell_shade: 'Medium,Dark,Ultra Dark',
	upsell_shade_label: 'Shade',
	upsell_auto: true,
	upsell_max_item: 2,
	upsell_btn_label: 'Add to Cart',
	enable_custom_codes: true,
	custom_codes_code: 'SECRET25',
	custom_error_codes_msg: 'Oops, this code cannot be applied to new products and bundles.',
	custom_error_handles: 'bronzing-self-tanner-drops,glow-essentials,glowy-face-tan-set,miracle-elixir-hair-oil-treatment,clean-scalp-treatment,silky-hair-set,healthy-hair-bundle',
	cartShippingMeter: {
		enable: true,
		inProgressText: '#{shipping_price} away from free shipping',
		finalText: 'Congrats! Your order qualifies for free shipping!',
		barColor: '#f4436c',
	},
	cartDiscountMeter: {
		enable: false,
	},
	cartServicesIcon: ['delivery', 'moneyback', 'awards'],
	cartServices: ['Fast Worldwide Delivery', '100% Money Back Guarantee', 'Winner of 18 Beauty Awards'],
	cart_payment_icons: '//cdn.shopify.com/s/files/1/0286/1327/9779/files/ShopifyPaymentLogos.png?v=1599485964',
	cartUpsellCollection: [],
	cartUpsell: [
		{
			upgrade_bundle_method: 'keep',
			when_contain_product: '32068891541539,32068891607075,32068891639843',
			replace_product_bundle: '32068891246627,32068891279395,32068891312163',
			bundle_front_image_200: '//cdn.shopify.com/s/files/1/0286/1327/9779/files/unnamed-_1_200x200.jpg?v=1600406474',
			bundle_front_image: '//cdn.shopify.com/s/files/1/0286/1327/9779/files/unnamed-_1_{width}x.jpg?v=1600406474',
			product_handle: 'get-glossy-glowy-kit',
			bundle_ad_product_name: 'Get Glossy & Glow Kit',
			bundle_ad_product_desc: '1 x Like A Virgin Hair Masque <br> 1 x Bali Bronzing Foam',
			bundle_txt_button: 'Add to cart',
		},
		{
			upgrade_bundle_method: 'keep',
			when_contain_product: '32068892688419',
			replace_product_bundle: '32374478176291',
			bundle_front_image_200: '//cdn.shopify.com/s/files/1/0286/1327/9779/files/Main-pdp_200x200.jpg?v=1600406215',
			bundle_front_image: '//cdn.shopify.com/s/files/1/0286/1327/9779/files/Main-pdp_{width}x.jpg?v=1600406215',
			product_handle: 'healthy-hair-bundle',
			bundle_ad_product_name: 'Healthy Hair Bundle',
			bundle_ad_product_desc: '1 x Deep Clean Scalp Scrub <br>1 x Super Nourishing Hair Masque (212ml)',
			bundle_txt_button: 'Add to cart',
		},
		{
			upgrade_bundle_method: 'keep',
			when_contain_product: '32363243831331',
			replace_product_bundle: '32891615510563',
			bundle_front_image_200: '//cdn.shopify.com/s/files/1/0286/1327/9779/files/03--Mixing-with-Moisturiser_1000x-2_200x200.png?v=1606804632',
			bundle_front_image: '//cdn.shopify.com/s/files/1/0286/1327/9779/files/03--Mixing-with-Moisturiser_1000x-2_{width}x.png?v=1606804632',
			product_handle: 'glow-essentials',
			bundle_ad_product_name: 'Glow Essentials Bundle',
			bundle_ad_product_desc: '1x Bronzing Face Drops Medium Shade (30ml)',
			bundle_txt_button: 'Add to cart',
		},
	],
	autoGwp: {
		enabled: true,
		isBuyAny: false,
		prerequisiteIds: '32068892426275',
		freeItemIds: '32068890624035',
		freeQuantity: 1,
		minPurchase: '0',
	},
	manualGwp: {
		enabled: true,
		title: 'Select your free gift',
		minPurchase: 3000,
		maxSelected: 1,
		items: [
			{
				id: 32986612924451,
				title: 'FREE Silky Face Mask',
				price: '$11.90',
				image: '//cdn.shopify.com/s/files/1/0286/1327/9779/products/FaceMask-Productshot2_6fbd178a-651d-46f2-b0ad-aa804e876470_120x.jpg?v=1608195616',
			},
			{
				id: 39294074257443,
				title: 'FREE Satin Eye Mask - Pink',
				price: '$15.90',
				image: '//cdn.shopify.com/s/files/1/0286/1327/9779/products/C7-EyeMask-pinkprint_1_95ff7d2f-1b6d-4a2b-9175-d6971675e65f_120x.jpg?v=1618989343',
			},
			{
				id: 39295700959267,
				title: 'FREE Satin Eye Mask - Green',
				price: '$15.90',
				image: '//cdn.shopify.com/s/files/1/0286/1327/9779/products/C7-EyeMask-baliprint_1_9e4ee86a-c606-49f9-bc1f-72d22646ded5_120x.jpg?v=1619061719',
			},
		],
	},
	freeItemSKUs: {
		32068891017251: 'CE0000152080',
		32068891082787: 'CE0000152020',
		32986614300707: 'CE0000812040',
		32068890624035: 'CE0000016040',
		32986613186595: 'CE0000032020',
		32986613219363: 'CE0000032040',
		32986613252131: 'CE0000032060',
		32986613284899: 'CE0000072020',
		32986613317667: 'CE0000072040',
		32986613350435: 'CE0000072060',
		32986612301859: 'CE0000062020',
		32986612334627: 'CE0000012025',
		32986611187747: 'CE0000902020',
		33004123127843: 'CE0000822020',
		32989205069859: 'CE0000432020',
		32989205102627: 'CE0001202020',
		32989205135395: 'CE0001202040',
		32989205168163: 'CE0001202060',
		32986614497315: 'CE0001202020',
		32986614530083: 'CE0001202040',
		32986614562851: 'CE0001202060',
		32986614333475: 'CE0000302020',
		32986613088291: 'CE0000072020',
		32986613121059: 'CE0000072040',
		32986613153827: 'CE0000072060',
		32986612695075: 'CE0000482020',
		32986612367395: 'CE0000732020',
		32986612400163: 'CE0001242020',
		32985536135203: 'CE0000112020',
		32873695805475: 'CE0000014040',
		32873695838243: 'CE0000014047',
		39295700959267: 'CE0001172040',
		39294074257443: 'CE0001172020',
		32986618789923: 'XB0000132020',
		32986614169635: 'CE0000492020',
		32986614202403: 'CE0000492060',
		32986614235171: 'CE0000492040',
		32986614267939: 'CE0000492080',
		32986613383203: 'CE0000852010',
		32986613415971: 'CE0000852020',
		32986613448739: 'CE0000852030',
		32986613055523: 'CE0000042020',
		32986613022755: 'CE0000312020',
		32986612957219: 'CE0001242020',
		32986612924451: 'CE0001162020',
		32986612727843: 'CE0000482060',
		32986612760611: 'CE0000482020',
		32986612793379: 'CE0000482080',
		32986612826147: 'CE0000482040',
		32986612564003: 'CE0001042020',
		32986612498467: 'CE0000802040',
		32986612465699: 'CE0000842020',
		32986612203555: 'CE0000022040',
		32986612138019: 'CE0000052020',
		32986609614883: 'CE0000392020',
		32985536036899: 'CE0000122020',
		32983350280227: 'CE0000822040',
		32920683577379: 'CE0000282020',
		32259590389795: 'CE0000022020',
		32068891508771: 'CE0000042060',
		32068890918947: 'CE0000082020',
	},
	surveyCodes: [
		'thankyou50',
	],
};

window.validateEmail = function (t) {
	// eslint-disable-next-line no-useless-escape
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(t).toLowerCase());
};

// eslint-disable-next-line no-useless-escape
window.validatePhone = (phone) => /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g.test(phone);
