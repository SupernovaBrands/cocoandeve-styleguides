/* global tStrings */

import React from 'react';
import PropTypes from 'prop-types';

import ConditionWrapper from '~comp/condition-wrapper';
import QuantityBox from '~comp/quantity-box';

import {
	formatMoney,
	kebabCase,
} from '~mod/utils';

import SvgTrash from '~svg/trash.svg';
import SvgRecurring from '~svg/recurring.svg';
import SvgChevronDown from '~svg/chevron-down.svg';;

export default class CartItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			editingVariant: false,
		};
	}

	onSelectVariant(variant, swatchIndex) {
		if (variant.available) {
			this.setState({
				editingVariant: variant.id !== this.props.item.id ? swatchIndex : false,
			}, () => {
				if (this.state.editingVariant !== false) {
					this.props.onChangeVariant(this.props.item, variant.id);
				}
			});
		}
	}

	onRemoveItem = () => {
		this.props.onRemoveItem(this.props.item);
	}

	render() {
		const { item } = this.props;
		const { editingVariant } = this.state;
		const { models } = item;
		const { swatches, variants, selectedSwatch } = models;
		const showSwatches = variants && variants.length > 1 && !models.isFree;
		const showAccordion = models.swatches.length > 1;

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
									<span className="text-primary mt-1 d-flex font-italic font-size-sm font-weight-normal">
										<SvgRecurring class="svg mr-1" />
										{' '}
										Recurring every 1 month
									</span>
								)}
							</p>
							{!models.isFree && (<button className="cart-item__remove btn-unstyled d-flex" type="button" aria-label="Remove" onClick={this.onRemoveItem} data-cy="cart-remove-icon"><SvgTrash className="svg" /></button>)}
						</div>

						<ConditionWrapper
							condition={showAccordion}
							wrapper={(children) =>
								<div class="cart-drawer__shade">
									<a className="d-flex align-items-center text-primary text-underline collapsed mb-2" data-toggle="collapse" href={`#cart-drawer__shade-${item.id}`} role="button" aria-expanded="false" aria-controls={`#cart-drawer__shade-${item.id}`}>
										View {models.swatchType}
										<SvgChevronDown class="svg chevron-down ml-1" width="12" height="12" />
									</a>
									<div className="collapse text-body" id={`cart-drawer__shade-${item.id}`}>
									{children}
									</div>
								</div>}
						>

						{swatches.map((opt, index) => {
							const selected = selectedSwatch[index];

							return (
								<div key={opt.id} className={`mb-1 ${showAccordion && index === 0 ? 'border-bottom' : ''}`}>

									{showAccordion && (
										<p class="font-size-sm mb-1">1x Bronzing Face Drops 30ml</p>
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
												className={`variant-swatch mr-1 ${kebabCase(val)} ${selected === val && 'border-primary'} ${!variant.available ? 'oos' : ''}`}
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
