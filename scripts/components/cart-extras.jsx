/* global tSettings tStrings */

import React from 'react';

const CartExtras = () => (
	<>
		<div className="row mt-3 my-4 text-center">
			<figure className="col-4 flex-column mb-0">
				<picture>
					<img width="50" src="/images/icon-delivery.png" alt="Fast Worldwide Delivery" />
				</picture>
				<figcaption className="mt-1">Fast Worldwide Delivery</figcaption>
			</figure>
			<figure className="col-4 flex-column mb-0">
				<picture>
					<img width="50" src="/images/icon-awards.png" alt="Winner of 18 Beauty Awards" />
				</picture>
				<figcaption className="mt-1">Winner of 18 Beauty Awards</figcaption>
			</figure>
			<figure className="col-4 flex-column mb-0">
				<picture>
					<img width="50" src="/images/icon-money.png" alt="100% Money Back Guarantee" />
				</picture>
				<figcaption className="mt-1">100% Money Back Guarantee</figcaption>
			</figure>
		</div>
		<div>
			<a href="/checkout" className="text-center">
				<div className="cart-drawer__shopify-icon d-flex align-items-center justify-content-center">
					<img className="d-block mx-1" src="/images/shopify-payment.svg" width="112" height="34" alt="Shopify Icon" />
				</div>

				{tSettings.cart_payment_icons && (
					<img className="d-block mx-auto my-2" src={tSettings.cart_payment_icons} width="240" height="98" alt="Payments" />
				)}
			</a>
		</div>

		{tStrings.cart_question && (
			<div className="my-4 text-center" dangerouslySetInnerHTML={{ __html: tStrings.cart_question }} />
		)}
	</>
);

export default CartExtras;
