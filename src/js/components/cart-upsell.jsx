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
		return (
			<div className="mt-2">
				<p className="text-center bg-primary-light m-0 py-1">{tSettings.upsell_header_title}</p>
				{upsell.map((item) => (
					<div key={item.replaceToId} className="upsell d-flex align-items-center pt-2 pb-3">
						<figure className="row mb-0 w-100">
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

								<p className="mb-1" dangerouslySetInnerHTML={{ __html: item.settings.bundle_ad_product_desc }} />

								<p className="mb-1">
									{item.comparePrice > 0 && (
										<span className="text-linethrough">{formatMoney(item.comparePrice)}</span>
									)}
									<span className="text-primary font-weight-bold ml-2">{formatMoney(item.price)}</span>
								</p>
								<button className={`btn btn-outline-primary align-self-start col-8`} onClick={() => { onAddUpsell(item); }} type="button">{this.state.isLoading === item.targetId ? <span class='spinner-border spinner-border-sm' role='status' aria-hidden='true'></span> : item.settings.bundle_txt_button}</button>
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
