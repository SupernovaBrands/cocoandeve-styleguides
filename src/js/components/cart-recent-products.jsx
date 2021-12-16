/* global tStrings */

import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { formatMoney } from '~mod/utils';

import YotpoStar from '~comp/yotpo-star';

import SvgChevronPrev from '~svg/chevron-prev.svg';
import SvgChevronNext from '~svg/chevron-next.svg';

const RecentProducts = (props) => {
	const {
		product,
		onAddToCart,
	} = props;

	const [loading, setLoading] = useState(false);

	return (
		<div className="item__third bg-white px-g">
			<figure className="product-card position-relative d-flex flex-column">
				<a href="/">
					<picture>
						<img src={product.image} className="d-block w-100 fit--cover" alt={product.title} />
					</picture>
				</a>
				<figcaption className="mt-2 flex-grow-1 d-flex flex-column">
					<YotpoStar productId={4543113265187} showTotal={false} showScore={false} extraClass="justify-content-center" />
					<p className="product-card__title flex-grow-1 d-flex flex-column justify-content-center h4 h-100 font-weight-normal">
						<a href="#" className="text-dark text-decoration-none">{product.title}</a>
					</p>
					<p className="text-center">
						{product.comparePrice > 0 && <span className="text-linethrough h4 m-1">{formatMoney(product.comparePrice)}</span>}
						<span className="text-primary h4">{formatMoney(product.price)}</span>
					</p>
					<button className="btn btn-lg btn-primary btn-block add-to-cart" type="button" onClick={() => { onAddToCart(product); setLoading(true); }} disabled={loading}>
						{loading ? (
							<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
						) : tStrings.addToCart}
					</button>
				</figcaption>
			</figure>
		</div>
	);
};

RecentProducts.propTypes = {
	product: PropTypes.object.isRequired,
	onAddToCart: PropTypes.func,
};

RecentProducts.defaultProps = {
	onAddToCart: () => {},
};

const CartRecentProducts = (props) => {
	const {
		products,
		onAddToCart,
	} = props;

	const withNext = products.length > 1;

	return (
		<div id="cart-recent-products" className="carousel--preview carousel slide cart-recent-product-carousel" data-ride="carousel" data-interval="false">
			<h4 className="mb-3">Recently Viewed</h4>
			<div className="carousel-inner">
				{products.map((p, index) => {
					const prev = index > 0 ? products[index - 1] : products.slice(-1)[0];
					const next = index < products.length - 1 ? products[index + 1] : products[0];
					return (
						// eslint-disable-next-line react/no-array-index-key
						<div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
							{withNext ? (<RecentProducts product={prev} />) : (<div className="item__third bg-white px-g" />)}
							<RecentProducts product={p} onAddToCart={onAddToCart} />
							{withNext ? (<RecentProducts product={next} />) : (<div className="item__third bg-white px-g" />)}
						</div>
					);
				})}
			</div>

			{withNext && (
				<a className="carousel-control carousel-control-prev carousel-control--background floating-out-left justify-content-start text-primary" href="#cart-recent-products" role="button" data-slide="prev">
					<span className="carousel-control-prev-icon d-flex justify-content-center align-items-center" aria-hidden="true">
						<SvgChevronPrev class="svg" />
					</span>
					<span className="sr-only">Previous</span>
				</a>
			)}
			{withNext && (
				<a className="carousel-control carousel-control-next carousel-control--background floating-out-right justify-content-end text-primary" href="#cart-recent-products" role="button" data-slide="next">
					<span className="carousel-control-next-icon d-flex justify-content-center align-items-center" aria-hidden="true">
						<SvgChevronNext class="svg" />
					</span>
					<span className="sr-only">Next</span>
				</a>
			)}
		</div>
	);
};

CartRecentProducts.propTypes = {
	products: PropTypes.array,
	onAddToCart: PropTypes.func.isRequired,
};

CartRecentProducts.defaultProps = {
	products: [],
};

export default CartRecentProducts;
