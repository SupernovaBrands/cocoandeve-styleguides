/* global tStrings */

import React from 'react';
import PropTypes from 'prop-types';

export default class CartDiscountForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			code: '',
			prevCode: '',
			error: '',
		};
	}

	componentDidMount() {
		if (this.props.code) {
			this.setState({ code: this.props.code, prevCode: this.props.code }, () => {
				$(this.collapseRef).collapse('show');
			});
		}
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if (prevState.prevCode !== nextProps.code) {
			return {
				prevCode: nextProps.code,
				code: nextProps.code,
				error: nextProps.error,
			};
		}
		return {
			error: nextProps.error,
		};
	}

	onTextChange = (e) => {
		const { target: { value } } = e;
		this.setState({ code: value });
	}

	onKeyUp = (e) => {
		if (e.keyCode === 13) {
			this.applyDiscount(e);
		}
	}

	applyDiscount = (e) => {
		e.stopPropagation();
		this.setState((prevState) => ({ code: prevState.code.trim() }), () => {
			this.props.onApply(this.state.code);
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
		} = this.props;
		const {
			code,
			error,
		} = this.state;

		return (
			<div className="mt-1">
				<a className="text-body text-underline collapsed cart-drawer__discount-toggle" data-toggle="collapse" href="#cart-drawer__discount-form" role="button" aria-expanded="false" aria-controls="cart-drawer__discount-form">{tStrings.cart_discount_text}</a>
				<div className="collapse" id="cart-drawer__discount-form" ref={(r) => { this.collapseRef = r; }}>
					<div className="input-group py-1">
						<input type="text" name="discount" className="form-control text-body" placeholder={tStrings.cart_discount_input} value={code} onChange={this.onTextChange} onKeyUp={this.onKeyUp} readOnly={isApplied || loading} />
						{!isApplied && (
							<div className="input-group-append">
								<button className="btn btn-primary" type="button" onClick={this.applyDiscount}>
									{loading ? (<div className="spinner-border" role="status" />) : tStrings.cart_discount_apply}
								</button>
							</div>
						)}
					</div>
					{isApplied && (
						<button className="btn btn-lg btn-block btn-primary" type="button" onClick={this.removeDiscount} disabled={isAutoDiscount}>
							{loading ? (<div className="spinner-border" role="status" />) : tStrings.cart_discount_remove}
						</button>
					)}
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
	onApply: PropTypes.func.isRequired,
	onRemove: PropTypes.func.isRequired,
};
