/* global tSettings tStrings assetUrl Afterpay */

import React from 'react';
import PropTypes from 'prop-types';

import {
	formatMoney,
} from '~mod/utils';

import SvgDelivery from '~svg/fast-delivery.svg';
import SvgAwards from '~svg/winner-award.svg';
import SvgMoneyback from '~svg/moneyback.svg';

let currency;
let locale;
if (window.Afterpay !== undefined) {
	currency = 'USD';
	locale = 'en_US';
	if (tSettings.store === 'au') {
		currency = Afterpay.currency.AUD;
		locale = 'en_AU';
	} else if (tSettings.store === 'ca') {
		currency = Afterpay.currency.CAD;
		locale = 'en_CA';
	}
}

export default class CartExtras extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			totalPrice: props.totalPrice,
			afterpay: tSettings.payment.afterpay,
			klarna: tSettings.payment.klarna,
			klarna_installment: tSettings.payment.klarna_installment,
		};

		$('#modal-klarna').on('show.bs.modal', function () {
			$('body').addClass('show-modal-klarna');
		});

		$('#modal-klarna').on('hidden.bs.modal', function () {
			if ($('.cart-drawer').hasClass('show')) {
				$('body').removeClass('show-modal-klarna').addClass('modal-open');
			} else {
				$('body').removeClass('show-modal-klarna');
			}
		});
	}

	componentDidMount() {
		if (this.afterpayRef) {
			this.injectCss();
		}
	}

	componentDidUpdate() {
		if (this.afterpayRef) {
			this.injectCss();
		}
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.totalPrice !== prevState.totalPrice) {
			return {
				totalPrice: nextProps.totalPrice,
			};
		}

		return null;
	}

	injectCss = () => {
		const toBeInjected = '.afterpay-logo-badge-background { display: none; } .afterpay-logo-badge-lockup { transform: scale(1.2); transform-origin: center; } .afterpay-logo { margin-top: -2px !important; margin-bottom: 0 !important; } .afterpay-logo-link { display: block; }';
		const existing = this.afterpayRef.shadowRoot.querySelector('style').innerHTML;
		if (!existing.includes(toBeInjected)) {
			this.afterpayRef.shadowRoot.querySelector('style').innerHTML = existing + toBeInjected;
		}
	}

	render() {
		const klarnaIns = tStrings.cart_installment_by
			.replace('[amount]', formatMoney(Math.ceil(this.state.totalPrice / this.state.klarna_installment)))
			.replace('[num]', this.state.klarna_installment);
		return (
			<>
				<ul className="cart-drawer__services list-unstyled row mt-3 my-4 text-center">
					{tSettings.cartServices.map((t, index) => (
						<li key={t} className="col-4 d-flex flex-column">
							{tSettings.cartServicesIcon[index] === 'delivery' && <SvgDelivery className="svg svg--secondary" />}
							{tSettings.cartServicesIcon[index] === 'awards' && <SvgAwards className="svg svg--secondary" />}
							{tSettings.cartServicesIcon[index] === 'moneyback' && <SvgMoneyback className="svg svg--secondary" />}
							{t}
						</li>
					))}
				</ul>

				{this.state.afterpay && (
					<afterpay-placement ref={(r) => { this.afterpayRef = r; }} class="text-center border-top m-0 pt-2" data-locale={locale} data-currency={currency} data-amount={this.state.totalPrice / 100} data-size="sm" />
				)}

				{this.state.klarna && (
					<p className="font-size-sm text-center border-top mt-2 pt-2 text center">
						<span dangerouslySetInnerHTML={{ __html: klarnaIns }} />
						<br />
						<img className="mr-1" height="15" src={assetUrl('logo-klarna.svg')} alt="Klarna" />
						<svg data-toggle="modal" href="#modal-klarna" role="button" data-price={this.state.totalPrice} className="svg-info modal-klarna-trigger cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="12" height="12"><path d="M7.2 5.6h1.6V4H7.2M8 14.4A6.4 6.4 0 1114.4 8 6.408 6.408 0 018 14.4M8 0a8 8 0 105.657 2.343A8 8 0 008 0m-.8 12h1.6V7.2H7.2z" /></svg>
					</p>
				)}

				{!this.state.afterpay && !this.state.klarna && (
					<a href="/checkout" className="text-center">
						<div className="cart-drawer__shopify-icon d-flex align-items-center justify-content-center">
							<img className="d-block mx-1" src={assetUrl('shopify-payment.svg')} width="112" alt="Shopify Icon" />
						</div>

						{tSettings.cart_payment_icons && (
							<img className="d-block mx-auto my-2" src={tSettings.cart_payment_icons} width="240" alt="Payments" />
						)}
					</a>
				)}
			</>
		);
	}
}

CartExtras.propTypes = {
	totalPrice: PropTypes.number,
};

CartExtras.defaultProps = {
	totalPrice: 0,
};
