/* global tStrings tSettings */

import React from 'react';
import PropTypes from 'prop-types';

import SvgTag from '~svg/tag.svg';
import SvgCloseCircle from '~svg/close-circle.svg';

export default class CartDiscountForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showForm: false,
			code: '',
			prevCode: '',
			error: '',
		};
	}

	componentDidMount() {
		if (this.props.code) {
			this.setState({ showForm: true, code: this.props.code, prevCode: this.props.code });
		}
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if (prevState.prevCode !== nextProps.code) {
			return {
				prevCode: nextProps.code,
				code: nextProps.code,
				showForm: prevState.code !== '' || (prevState.code === '' && !!nextProps.code),
				error: nextProps.error,
			};
		}

		return {
			error: nextProps.error,
		};
	}

	onToggleForm() {
		this.setState((prevState) => ({ showForm: !prevState.showForm }));
	}

	onTextChange = (e) => {
		const { target: { value } } = e;
		this.setState({ code: value });
	}

	onKeyUp = (e) => {
		if (e.keyCode === 13) {
			this.applyDiscount();
		}
	}

	applyDiscount = (e) => {
		e.stopPropagation();
		this.setState((prevState) => ({ code: prevState.code.trim() }), () => {
			this.props.onApply(this.state.code);
			this.state.code = this.props.code;
		});
	}

	removeDiscount = (e) => {
		e.stopPropagation();
		this.props.onRemove();
	}

	render() {
		const {
			isApplied,
			loading,
			isAutoDiscount,
			errorExtra,
		} = this.props;
		const {
			code,
			error,
		} = this.state;

		return isApplied ? (
			<div className="mt-2 d-flex flex-column align-items-start">
				<input type="hidden" name="discount" value={code} />
				<p className="font-size-xs text-muted mb-1">{tStrings.cart_discount_applied}</p>
				<div className="bg-light d-flex align-items-center d-inline-block p-1 text-black-50 rounded">
					<SvgTag className="svg mr-1" />
					{code}
					{!isAutoDiscount && (
						<button className="btn-unstyled ml-1 text-black-50" onClick={this.removeDiscount} type="button" aria-label="Remove Discount" data-cy="checkout-removepromo-icon">
							<SvgCloseCircle className="svg" />
						</button>
					)}
				</div>
				{errorExtra && (
					<p className="small text-danger mt-1 mb-0">{tSettings.custom_error_codes_msg}</p>
				)}
			</div>
		) : (
			<div className="cart-drawer__discount-form-wrapper mt-0">
				<div id="cart-drawer__discount-form" className="cart-drawer__discount-form">
					<div className="d-flex py-0">
						<input type="text" name="discount" className={`form-control text-body mr-1 ${!code ? 'bg-white border' : ''}`} placeholder={tStrings.cart_discount_input} value={code} onChange={this.onTextChange} onKeyUp={this.onKeyUp} readOnly={loading} data-cy="cart-discount" />
	                    <button className="btn btn-link font-weight-bold d-flex align-items-center" type="button" onClick={this.applyDiscount} disabled={!code} data-cy="cart-apply-btn">
							{loading ? (<div className="spinner-border" role="status" />) : tStrings.cart_discount_apply}
						</button>
					</div>
					{error && (
						<p className="small text-danger mb-0">{error}</p>
					)}
				</div>
			</div>
		);
	}
}

CartDiscountForm.propTypes = {
	isApplied: PropTypes.bool.isRequired,
	code: PropTypes.string.isRequired,
	isAutoDiscount: PropTypes.bool.isRequired,
	loading: PropTypes.bool.isRequired,
	error: PropTypes.string.isRequired,
	errorExtra: PropTypes.bool.isRequired,
	onApply: PropTypes.func.isRequired,
	onRemove: PropTypes.func.isRequired,
};
