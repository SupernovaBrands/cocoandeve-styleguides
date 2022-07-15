/* global tSettings */

import React from 'react';
import PropTypes from 'prop-types';

import { formatMoney, kebabCase } from '~mod/utils';
import { gaEvent } from '~mod/analytics-event';

export default class CartUpsell extends React.Component {
	constructor(props) {
		super(props);
		this.state = { isLoading: false };
	}

	handleClick = (item, e) => {
		e.preventDefault();
		this.setState({ isLoading: item.targetId });
		this.props.onAddUpsell(item).then(() => {
			this.setState({ isLoading: false });
			gaEvent.trackingUpsell('CART');
			setTimeout(function () {
				$('#cart-drawer-form').parent().animate({ scrollTop: 0 }, 'slow');
			}, 500);
		});
		e.target.blur();
	}

	render() {
		const { upsell } = this.props;
		return (
			<div className="mt-2">
				<p className="text-center bg-primary-light m-0 py-1">{tSettings.upsell_header_title}</p>
				{upsell.map((item) => (
					<div key={item.replaceToId} className="upsell d-flex align-items-center pt-2 pb-3">
						<figure className="row mx-0 mb-0 w-100">
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
							<figcaption className="col-7 mx-0 pt-0 pl-0 font-size-base">
								<p className="font-weight-bold mb-25"><a className="text-body" href={item.url}>{item.settings.bundle_ad_product_name}</a></p>

								{item.option1 && (
									<em className="d-flex align-items-baseline">
										{`${item.optLabel} : ${item.option1}`}
										<div className={`ml-1 variant-swatch small ${kebabCase(item.option1)}`} />
									</em>
								)}
								{item.option2 && (
									<em className="d-flex align-items-baseline">
										{`${item.optLabel} : ${item.option2}`}
										<div className={`ml-1 variant-swatch small ${kebabCase(item.option2)}`} />
									</em>
								)}

								<p className="mb-25" dangerouslySetInnerHTML={{ __html: item.settings.bundle_ad_product_desc }} />

								<p className="mb-25">
									{item.comparePrice > 0 && (
										<span className="text-linethrough">{formatMoney(item.comparePrice)}</span>
									)}
									<span className={`text-primary font-weight-bold ${item.comparePrice > 0 ? 'ml-g' : ''}`}>{formatMoney(item.price)}</span>
								</p>
								<button className="btn btn-outline-primary text-nowrap" onClick={(e) => { this.handleClick(item, e); }} type="button">
									{this.state.isLoading === item.targetId ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" /> : item.settings.bundle_txt_button}
								</button>
							</figcaption>
						</figure>
					</div>
				))}
			</div>
		);
	}
}

CartUpsell.propTypes = {
	upsell: PropTypes.array.isRequired,
	onAddUpsell: PropTypes.func.isRequired,
};
