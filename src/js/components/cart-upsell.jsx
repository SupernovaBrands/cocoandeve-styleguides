/* global tSettings */

import React from 'react';
import PropTypes from 'prop-types';

import { formatMoney, kebabCase } from '~mod/utils';

export default class CartUpsell extends React.Component {
	constructor(props) {
		super(props);
		this.state = { isLoading: false };
	}

	handleClick = (item) => {
		this.setState({ isLoading: item.targetId });
		this.props.onAddUpsell(item).then(() => {
			this.setState({ isLoading: false });
			setTimeout(function () {
				$('#cart-drawer').animate({ scrollTop: 0 }, 'fast');
			}, 500);
		});
	}

	render() {
		const { upsell, onAddUpsell } = this.props;
		console.log('upsell', upsell);
		return (
			<div className="mt-2">
				<p className="text-center bg-primary-light m-0 py-1">{tSettings.upsell_header_title}</p>
				{upsell.map((item) => (
					<div className="upsell d-flex align-items-center pt-2 pb-3">
						<figure key={item.replaceToId} className="row mb-0 w-100">
							<picture className="col-5">
								<img
									className="lazyload w-100"
									alt={item.productTitle}
									src={item.settings.bundle_front_image_200}
									data-src={item.settings.bundle_front_image}
									data-sizes="auto"
									data-widths="[370,270]"
								/>
							</picture>
							<figcaption className="col-7 d-flex flex-column mx-0">
								<h4><a href={item.url}>{item.settings.bundle_ad_product_name}</a></h4>

								{item.option1 && (
									<em className="d-flex align-items-baseline">
										{`${item.optLabel} : ${item.option1}`}
										<div className={`ml-1 swatch small ${kebabCase(item.option1)}`} />
									</em>
								)}
								{item.option2 && (
									<em className="d-flex align-items-baseline">
										{`${item.optLabel} : ${item.option2}`}
										<div className={`ml-1 swatch small ${kebabCase(item.option2)}`} />
									</em>
								)}

								<p className="my-1" dangerouslySetInnerHTML={{ __html: item.settings.bundle_ad_product_desc }} />

								<p className="mb-1">
									{item.comparePrice > 0 && (
										<span className="text-linethrough">{formatMoney(item.comparePrice)}</span>
									)}
									<span className="text-primary font-weight-bold ml-2">{formatMoney(item.price)}</span>
								</p>
								<button className={`btn btn-outline-primary align-self-start ${this.state.isLoading === item.targetId ? 'btn-loading' : ''}`} onClick={() => { onAddUpsell(item); }} type="button">{item.settings.bundle_txt_button}</button>
							</figcaption>
						</figure>
					</div>
					// <div key={item.replaceToId} className="cart-bundle-product">
					// 	<div className="cart-bundle-product-left">
					// 	</div>
					// 	<div className="cart-bundle-product-right">
					// 		<h4><a href={item.url}>{item.settings.bundle_ad_product_name}</a></h4>

					// 		{item.option1 && (
					// 			<em className={kebabCase(item.option1)}>{`${item.optLabel} : ${item.option1}`}</em>
					// 		)}
					// 		{item.option2 && (
					// 			<em className={kebabCase(item.option1)}>{`${item.optLabel} : ${item.option2}`}</em>
					// 		)}

					// 		<p dangerouslySetInnerHTML={{ __html: item.settings.bundle_ad_product_desc }} />

					// 		<div className="cart-bundle-product-price">
					// 			{item.comparePrice > 0 && (
					// 				<span className="shop-old-price">{formatMoney(item.comparePrice)}</span>
					// 			)}
					// 			<span>{formatMoney(item.price)}</span>
					// 		</div>
					// 		<button type="button" className={`btn btn-primary btn-border ${this.state.isLoading === item.targetId ? 'btn-loading' : ''}`} onClick={(e) => onAddUpsell(item, e)}>
					// 			{item.settings.bundle_txt_button}
					// 		</button>
					// 	</div>

					// </div>
				))}
			</div>
		);
	}
}

CartUpsell.propTypes = {
	upsell: PropTypes.array.isRequired,
	onAddUpsell: PropTypes.func.isRequired,
};
