// eslint-disable-next-line import/prefer-default-export
export const getShippingPrice = (totalPrice) => new Promise((resolve) => {
	const freeRate = {
		min_order_subtotal: '70.00',
		max_order_subtotal: null,
		price: 0,
	};
	if (totalPrice < 7000) {
		resolve({ shipping: 690, freeRate });
	} else {
		resolve({ shipping: 0, freeRate });
	}
});
