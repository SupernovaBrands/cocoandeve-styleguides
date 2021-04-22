/* global tSettings */

export const get = (obj, path, defValue) => {
	if (!path) return undefined;
	const pathArray = Array.isArray(path) ? path : path.match(/([^[.\]])+/g);
	return (
		pathArray.reduce((prevObj, key) => prevObj && prevObj[key], obj) || defValue
	);
};

export const waitFor = (condition, cb) => {
	if (typeof condition === 'function' && typeof cb === 'function') {
		setTimeout(() => {
			if (condition()) { cb(); } else { waitFor(condition, cb); }
		}, 200);
	}
};

export const kebabCase = (text) => (typeof text === 'string' ? text.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
	.map((x) => x.toLowerCase())
	.join('-') : '');

export const isSameText = (text1, text2) => typeof text1 === 'string' && typeof text2 === 'string' && text1.toLowerCase() === text2.toLowerCase();

// To search for intersection of 2 array
export const intersectTwo = (a, b) => a.filter((x) => b.some((y) => Object.is(x, y)));

export const debounce = function debounce(func, wait, immediate) {
	let timeout;
	return function (...args) {
		const context = this;
		const later = function () {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		const callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

export const bindAllMethods = (instance) => {
	Object.getOwnPropertyNames(Object.getPrototypeOf(instance))
		.forEach((key) => {
			// eslint-disable-next-line no-param-reassign
			if (instance[key] instanceof Function && key !== 'constructor') instance[key] = instance[key].bind(instance);
		});
};

export const setCookie = (name, value, days = 1) => {
	let expires = '';
	if (days) {
		const date = new Date();
		date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
		expires = `; expires=${date.toUTCString()}`;
	}
	document.cookie = `${name}=${value || ''}${expires}; path=/`;
};

export const getCookie = (name) => {
	const nameEQ = `${name}=`;
	const ca = document.cookie.split(';');
	for (let i = 0; i < ca.length; i += 1) {
		let c = ca[i];
		while (c.charAt(0) === ' ') c = c.substring(1, c.length);
		if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
	}
	return null;
};

export const removeCookie = (name) => {
	setCookie(name, null);
};

export const daysToTime = (days = 1) => days * 24 * 60 * 60 * 1000;

export const setLSWithExpiry = (key, value, ttl = 60 * 60 * 1000) => {
	const now = new Date();
	const item = {
		value,
		expiry: now.getTime() + ttl,
	};
	localStorage.setItem(key, JSON.stringify(item));
};

export const getLSWithExpiry = (key) => {
	const itemStr = localStorage.getItem(key);
	if (!itemStr) { return null; }
	const item = JSON.parse(itemStr);
	const now = new Date();
	if (now.getTime() > item.expiry) {
		localStorage.removeItem(key);
		return null;
	}
	return item.value;
};

export const removeLS = (key) => {
	localStorage.removeItem(key);
};

export const ajaxPromise = (options) => new Promise((resolve, reject) => {
	$.ajax({
		...options,
		dataType: options.dataType || 'json',
		success: resolve,
		error: reject,
	});
});

export const isItemHasProp = (item, prop, value) => {
	if (!item.properties) return false;
	if (Array.isArray(item.properties)) {
		const findProp = item.properties.find((p) => p[0] === prop);
		return findProp && findProp[0] === prop && (
			!value
			|| (!!value && findProp[1] === value)
		);
	}
	return item.properties[prop] && (
		!value
		|| (!!value && item.properties[prop] === value)
	);
};

export const isFreeItem = (item) => (
	item.line_price === 0
	|| item.total_discount === item.original_price
	|| isItemHasProp(item, '_discount_code')
	|| isItemHasProp(item, '_auto_discount_code')
	|| isItemHasProp(item, '_auto_gwp')
	|| isItemHasProp(item, '_campaign_type', 'auto_gwp')
	|| isItemHasProp(item, '_campaign_type', 'manual_gwp')
	|| isItemHasProp(item, '_campaign_type', 'discount_code')
	|| isItemHasProp(item, '_campaign_type', 'auto_discount_code')
);

export const isItemIdInKey = (key, id) => (
	`${key}`.split(':')[0] === `${id}`.split(':')[0]
);

export const formatMoney = (cents) => {
	const formatString = tSettings.moneyFormat;
	if (typeof cents === 'string') {
		// eslint-disable-next-line no-param-reassign
		cents = cents.replace('.', '');
	}
	let value = '';
	const placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
	function formatWithDelimiters(number, precision = 2, thousands = ',', decimal = '.') {
		if (Number.isNaN(number) || number === null) {
			return 0;
		}
		// eslint-disable-next-line no-param-reassign
		number = (number / 100.0).toFixed(precision);
		const parts = number.split('.');
		const dollarsAmount = parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, `$1${thousands}`);
		const centsAmount = parts[1] ? (decimal + parts[1]) : '';
		return dollarsAmount + centsAmount;
	}
	// eslint-disable-next-line default-case
	switch (formatString.match(placeholderRegex)[1]) {
		case 'amount':
			value = formatWithDelimiters(cents, 2);
			break;
		case 'amount_no_decimals':
			value = formatWithDelimiters(cents, 0);
			break;
		case 'amount_with_comma_separator':
			value = formatWithDelimiters(cents, 2, '.', ',');
			break;
		case 'amount_no_decimals_with_comma_separator':
			value = formatWithDelimiters(cents, 0, '.', ',');
			break;
		case 'amount_no_decimals_with_space_separator':
			value = formatWithDelimiters(cents, 0, ' ');
			break;
	}

	return formatString.replace(placeholderRegex, value);
};

export const addXMLRequestCallback = function (callback) {
	let oldSend; let i;
	if (XMLHttpRequest.callbacks) {
		XMLHttpRequest.callbacks.push(callback);
	} else {
		XMLHttpRequest.callbacks = [callback];
		oldSend = XMLHttpRequest.prototype.send;
		XMLHttpRequest.prototype.send = function (...args) {
			for (i = 0; i < XMLHttpRequest.callbacks.length; i += 1) {
				XMLHttpRequest.callbacks[i](this, args);
			}
			oldSend.apply(this, args);
		};
	}
};
