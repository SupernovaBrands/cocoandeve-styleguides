/* global tStrings */

import React from 'react';
import PropTypes from 'prop-types';

import ConditionWrapper from '~comp/condition-wrapper';
import QuantityBox from '~comp/quantity-box';

import { formatMoney } from '~mod/utils';

import SvgTrash from '~svg/trash.svg';
import SvgRecurring from '~svg/recurring.svg';

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

	onChangeVariant = (e) => {
		e.stopPropagation();
		this.setState({ editingVariant: false }, () => {
			this.props.onChangeVariant(this.props.item, this.state.selectedVariant.id);
		});
	}

	render() {
		const { item } = this.props;
		const { editingVariant, selectedVariant } = this.state;
		const { models } = item;
		const showVariantOptions = models.variantOptions && models.variantOptions.length > 1 && !models.isFree;
		return (
			<li className="cart-item">
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
						<div className="d-flex align-items-start no-gutters justify-content-between">
							<p className="mb-1 font-weight-bold col-8">
								<ConditionWrapper
									condition={!models.isFree}
									wrapper={(children) => <a href={item.url} className="link-secondary">{children}</a>}
								>
									{item.product_title}
									{`${models.recurring ? ' Subscription' : ''}`}
								</ConditionWrapper>
								{models.recurring && (
									<span className="text-primary mt-1 d-flex font-italic font-size-sm font-weight-normal"><SvgRecurring className="svg mr-1"/> Recurring every 1 month</span>
								)}
							</p>
							{!models.isFree && (<button className="cart-item__remove text-body btn-unstyled d-flex" type="button" aria-label="Remove" onClick={this.onRemoveItem} data-cy="cart-remove-icon"><SvgTrash className="svg" /></button>)}
						</div>

						{models.variantTitle && (
							<div className="mb-1">
								<p className="d-flex mb-1 align-items-end">
									<span>
										{`${models.variantType}: ${selectedVariant ? selectedVariant.variantTitle.replace(': limited edition!', '') : item.models.variantTitle.replace(': limited edition!', '')}`}
									</span>
									{editingVariant && (
										<>
											<span className="mx-1">-</span>
											<button type="button" className="btn btn-link p-0 border-0 text-underline mr-3" onClick={this.onChangeVariant}>{tStrings.cart_update_variant}</button>
										</>
									)}
								</p>
								{!showVariantOptions && (
									<i className={`d-block variant-swatch ${models.variantHandle}`} />
								)}
								{showVariantOptions && this.state.variantOptions.map((option) => (
									<button
										key={option.id}
										className={`variant-swatch mr-1 ${option.variantHandle} ${option.id === this.state.selectedVariant.id && 'border-primary'}`}
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

						<div className="d-flex align-items-center justify-content-between">
							<QuantityBox
								name="updates[]"
								editable={!item.models.isFree}
								quantity={item.quantity}
								onChangeQuantity={(newQty, callback) => this.props.onChangeQuantity(item, newQty, callback)}
							/>
							<div className="d-flex flex-column text-right">
								{models.comparePrice > 0 && (
									<span className="text-linethrough">{formatMoney(models.comparePrice)}</span>)}
								<span className="font-weight-bold">
									{formatMoney(item.original_price)}
									{models.recurring && ('/month')}
								</span>
							</div>
						</div>

						{this.props.isLastStock && (
							<p className="mt-1 mb-0 text-danger">Oh nuts! You got the last one!</p>)}
					</figcaption>
				</figure>

				{models.showPreorderNotif && (
					<span className="d-block mb-2">{tStrings.estimated_delivery_text}</span>
				)}
				{models.showPreorderNotif_2 && (
					<span className="d-block mb-2">{tStrings.estimated_delivery_text_2}</span>
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
