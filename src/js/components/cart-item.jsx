/* global tStrings */

import React from 'react';
import PropTypes from 'prop-types';

import ConditionWrapper from '~comp/condition-wrapper';
import QuantityBox from '~comp/quantity-box';

import { formatMoney } from '~mod/utils';

export default class CartItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			editingVariant: false,
		};

		if (props.item.models && props.item.models.variantOptions) {
			this.state.variantOptions = props.item.models.variantOptions;
			this.state.selectedVariant = this.state.variantOptions.find((opt) => opt.id === props.item.id);
		}
	}

	onSelectVariant(opt) {
		if (opt.available) {
			this.setState({
				selectedVariant: opt,
				editingVariant: opt.id !== this.props.item.id,
			});
		}
	}

	onRemoveItem = () => {
		this.props.onRemoveItem(this.props.item);
	}

	onChangeVariant = () => {
		this.setState({ editingVariant: false }, () => {
			this.props.onChangeVariant(this.props.item, this.state.selectedVariant.id);
		});
	}

	render() {
		const { item } = this.props;
		const { editingVariant } = this.state;
		const { models } = item;
		const showVariantOptions = models.variantOptions && models.variantOptions.length > 1 && !models.isFree;
		return (
			<li className="cart-item border-bottom">
				<figure className="row py-2 mb-0 align-items-start">
					<ConditionWrapper
						condition={!models.isFree}
						wrapper={(children) => <a href={item.url} className="col-3">{children}</a>}
					>
						<picture className={models.isFree ? 'col-3' : ''}>
							<img src={models.image} className="w-100" alt={item.product_title} />
						</picture>
					</ConditionWrapper>
					<figcaption className="col-9">
						<div className="d-flex align-items-start">
							<h4 className="flex-grow-1 mr-1">
								<ConditionWrapper
									condition={!models.isFree}
									wrapper={(children) => <a href={item.url} className="link-secondary">{children}</a>}
								>
									{item.product_title}
								</ConditionWrapper>
							</h4>
							{!models.isFree && (<button className="cart-item__remove btn-unstyled sni sni__trash" type="button" aria-label="Remove" onClick={this.onRemoveItem} />)}
						</div>

						{models.variantTitle && (
							<div className="mb-1">
								<p className="d-flex mb-1 align-items-end">
									{`${models.variantType}: ${models.variantTitle}`}
									{editingVariant && (
										<>
											<span className="mx-1">-</span>
											<button type="button" className="btn btn-link p-0 border-0" onClick={this.onChangeVariant}>Update</button>
										</>
									)}
								</p>
								{!showVariantOptions && (
									<i className={`d-block variant-swatch ${models.variantHandle}`} />
								)}
								{showVariantOptions && this.state.variantOptions.map((option) => (
									<button
										key={option.id}
										className={`variant-swatch mr-2 ${option.variantHandle} ${option.id === this.state.selectedVariant.id && 'border-primary'}`}
										type="button"
										tabIndex="-1"
										disabled={!option.available}
										aria-label={option.variantHandle}
										onClick={() => this.onSelectVariant(option)}
									/>
								))}
							</div>
						)}

						{models.properties && Object.keys(models.properties).map((key) => (<p key={key} className="mb-1">{`${key}: ${item.properties[key]}`}</p>))}

						<div className="d-flex align-items-end justify-content-between">
							<QuantityBox
								name="updates[]"
								editable={!item.models.isFree}
								quantity={item.quantity}
								onChangeQuantity={(newQty, callback) => this.props.onChangeQuantity(item, newQty, callback)}
							/>
							<div className="d-flex flex-column text-right">
								{models.comparePrice > 0 && (
									<span className="text-linethrough">{formatMoney(models.comparePrice)}</span>)}
								<span className="font-weight-bold">{formatMoney(item.original_price)}</span>
							</div>
						</div>

						{this.props.isLastStock && (
							<p className="mt-1 mb-0 text-danger">Oh nuts! You got the last one!</p>)}
					</figcaption>
				</figure>

				{models.showPreorderNotif && (
					<span className="d-block mb-2">{tStrings.estimated_delivery_text}</span>
				)}
			</li>
		);
	}
}

CartItem.propTypes = {
	item: PropTypes.object.isRequired,
	isLastStock: PropTypes.bool.isRequired,
	onChangeVariant: PropTypes.func.isRequired,
	onChangeQuantity: PropTypes.func.isRequired,
	onRemoveItem: PropTypes.func.isRequired,
};
