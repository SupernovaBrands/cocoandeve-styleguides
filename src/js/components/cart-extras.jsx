/* global tSettings tStrings */

import React from 'react';

const CartExtras = () => (
	<>
		<ul className="cart-drawer__services list-unstyled row mt-3 my-4 text-center">
			<li className="col-4 flex-column sni sni__delivery">Fast Worldwide Delivery</li>
			<li className="col-4 flex-column sni sni__awards">Winner of 18 Beauty Awards</li>
			<li className="col-4 flex-column sni sni__moneyback">100% Money Back Guarantee</li>
		</ul>

		<a href="/checkout" className="text-center">
			<div className="cart-drawer__shopify-icon d-flex align-items-center justify-content-center">
				<img className="d-block mx-1" src="/images/shopify-payment.svg" width="112" height="34" alt="Shopify Icon" />
			</div>

			{tSettings.cart_payment_icons && (
				<img className="d-block mx-auto my-2" src={tSettings.cart_payment_icons} width="240" height="98" alt="Payments" />
			)}
		</a>

		{tStrings.cart_question && (
			<div className="my-4 text-center" dangerouslySetInnerHTML={{ __html: tStrings.cart_question }} />
		)}
	</>
);

export default CartExtras;
