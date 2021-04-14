import React from 'react';
import PropTypes from 'prop-types';

import { debounce } from '~mod/utils';

export default class QuantityBox extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			prevQuantity: props.quantity,
			quantity: `${props.quantity}`,
		};

		this.debounceChangeQuantity = debounce(this.changeQuantity, 500);
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.quantity && prevState.prevQuantity != nextProps.quantity) {
			return {
				prevQuantity: nextProps.quantity,
				quantity: `${nextProps.quantity}`,
			};
		}
		return null;
	}

	onAddQuantity = (e) => {
		e.preventDefault();
		const qty = parseInt(this.state.quantity, 10);
		if (qty < 99) {
			this.setState(
				{ quantity: qty + 1 },
				() => {
					this.debounceChangeQuantity();
				},
			);
		}
	}

	onSubtractQuantity = (e) => {
		e.preventDefault();
		const qty = parseInt(this.state.quantity, 10);
		if (this.state.quantity > 0) {
			this.setState(
				{ quantity: qty - 1 },
				() => {
					this.debounceChangeQuantity();
				},
			);
		}
	}

	onFocus = (e) => {
		const $el = $(e.target);
		setTimeout(function () {
			$el.select();
		}, 50);
	}

	onChangeQuantity = (e) => {
		const { target: { value }, nativeEvent } = e;
		const qty = parseInt(value, 10);
		if (nativeEvent.data === 'e') return;
		if (value === '') {
			this.setState(
				{ quantity: '0' },
			);
		} else if (!Number.isNaN(qty) && qty <= 99) {
			this.setState(
				{ quantity: `${qty}` },
				() => {
					this.debounceChangeQuantity();
				},
			);
		}
	}

	changeQuantity = () => {
		this.props.onChangeQuantity(this.state.quantity, (newQty) => {
			this.setState({ quantity: `${newQty}` });
		});
	}

	render() {
		return (
			<div className="quantity-box d-flex">
				<button
					className="input-group-text bg-transparent border-right-0 rounded-right-0 sni sni__minus"
					type="button"
					aria-label="Add Subtract"
					disabled={!this.props.editable}
					onClick={this.onSubtractQuantity}
				/>
				<input
					type="number"
					name={this.props.name}
					className="form-control border-left-0 border-right-0 rounded-0 p-0 text-center flex-grow-0 bg-transparent text-body"
					value={this.state.quantity}
					onChange={this.onChangeQuantity}
					onFocus={this.onFocus}
					readOnly={!this.props.editable}
				/>
				<button
					className="input-group-text bg-transparent border-left-0 rounded-left-0 sni sni__plus"
					type="button"
					aria-label="Add Quantity"
					disabled={!this.props.editable}
					onClick={this.onAddQuantity}
				/>
			</div>
		);
	}
}

QuantityBox.propTypes = {
	editable: PropTypes.bool.isRequired,
	name: PropTypes.string.isRequired,
	quantity: PropTypes.number.isRequired,
	onChangeQuantity: PropTypes.func.isRequired,
};
