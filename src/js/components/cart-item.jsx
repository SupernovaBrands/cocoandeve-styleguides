/* global tStrings */

import React from 'react';
import PropTypes from 'prop-types';

import ConditionWrapper from '~comp/condition-wrapper';
import QuantityBox from '~comp/quantity-box';
import snCart from '~mod/sn-cart';

import {
	formatMoney,
	kebabCase,
} from '~mod/utils';

import SvgTrash from '~svg/trash.svg';
import SvgRecurring from '~svg/recurring.svg';
import SvgChevronDown from '~svg/chevron-down.svg';

import VariantQuantity from '~mod/variant-quantity.json';

export default class CartItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			editingVariant: false,
			inventory: snCart.getItem(this.props.item.id),
			isAccordionOpen: false,
		};
	}

	onSelectVariant(variant, swatchIndex) {
		const itemProps = this.props.item;
		const lastStock = VariantQuantity.filter((item) => item.id === variant.id && itemProps.quantity > item.quantity);

		if (variant.available) {
			this.setState({
				editingVariant: variant.id !== this.props.item.id ? swatchIndex : false,
			}, () => {
				if (this.state.editingVariant !== false) {
					this.props.onChangeVariant(this.props.item, variant.id, lastStock);
				}
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

	onAccordionOpen = () => {
		this.setState((prevState) => ({
			isAccordionOpen: !prevState.isAccordionOpen,
		}));
	}

	render() {
		const { item } = this.props;
		const { editingVariant, isAccordionOpen } = this.state;
		const { models } = item;
		const { swatches, variants, selectedSwatch } = models;
		const showSwatches = variants && variants.length > 1 && !models.isFree;
		const isMultiOptions = models.swatches.length > 1;
		const showAccordion = item.handle === 'glow-essentials-bundle';

		return (
			<li className="cart-item">
				<figure className="row py-2 mb-0 align-items-start">
					<ConditionWrapper
						condition={!models.isFree}
						wrapper={(children) => <a href={item.url} className="col-3">{children}</a>}
					>
						<picture className={models.isFree ? 'col-3' : ''}>
							<img src="https://via.placeholder.com/150x150/EFADBA" className="w-100" alt={item.product_title} />
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
									<span className="text-primary mt-1 d-flex font-italic font-size-sm font-weight-normal">
										<SvgRecurring className="svg mr-1" />
										{' '}
										Recurring every 1 month
									</span>
								)}
							</p>
							{!models.isFree && (<button className="cart-item__remove btn-unstyled d-flex text-body" type="button" aria-label="Remove" onClick={this.onRemoveItem} data-cy="cart-remove-icon"><SvgTrash className="svg" /></button>)}
						</div>

						<ConditionWrapper
							condition={showAccordion}
							wrapper={(children) => (
								<div className="pb-1">
									<a onClick={this.onAccordionOpen} className="d-inline-block text-primary text-underline card-header p-0 border-bottom-0 position-relative collapsed pr-2 mb-1" data-toggle="collapse" href={`#cart-drawer__shade-${item.id}`} role="button" aria-expanded="false" aria-controls={`#cart-drawer__shade-${item.id}`}>
										{isAccordionOpen ? 'Hide details' : 'Show details'}
										<SvgChevronDown className="svg chevron-down ml-1" width="12" height="12" />
									</a>
									<div className="collapse text-body" id={`cart-drawer__shade-${item.id}`}>
										{children}
									</div>
								</div>
							)}
						>

							{swatches.map((opt, index) => {
								const selected = selectedSwatch[index];

								return (
									<div key={opt.id} className={`mb-1 ${isMultiOptions && index === 0 ? 'border-bottom' : ''}`}>

										{isMultiOptions && (
											<p className="font-size-sm mb-1">1x Bronzing Face Drops 30ml</p>
										)}

										<p className="d-flex mb-1 align-items-center">

											{!showSwatches && (
												<i className={`d-block variant-swatch ${kebabCase(selected)}`} />
											)}
											{showSwatches && opt.values.map((val) => {
												const o = [...selectedSwatch];
												o[index] = val;
												const variant = variants.find((v) => v.option.join() === o.join());
												return (
													<button
														key={`${opt.id}-${kebabCase(val)}`}
														className={`variant-swatch pr-0 mr-1 ${kebabCase(val)} ${selected === val && 'border-primary'} ${!variant.available ? 'oos' : ''}`}
														type="button"
														tabIndex="-1"
														disabled={!variant.available || editingVariant !== false}
														aria-label={kebabCase(val)}
														onClick={() => this.onSelectVariant(variant, index)}
													/>
												);
											})}

											{editingVariant === index && (
												<span className="spinner-border spinner-border-sm text-primary ml-1" role="status" />
											)}

											<span className={editingVariant === index ? 'd-none' : 'font-size-sm'}>
												{` - ${selected.replace(': limited edition!', '')} ${opt.name}`}
											</span>
										</p>
									</div>

								);
							})}

						</ConditionWrapper>

						{models.properties && Object.keys(models.properties).map((key) => (<p key={key} className="mb-1">{`${key}: ${item.properties[key]}`}</p>))}

						<div className="d-flex align-items-center justify-content-between">
							<QuantityBox
								name="updates[]"
								editable={!item.models.isFree}
								quantity={item.quantity}
								onChangeQuantity={(newQty, callback) => this.props.onChangeQuantity(item, newQty, callback)}
								isLastStock={this.props.isLastStock}
								productId={this.props.productId}
								productStock={this.props.productStock}
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
