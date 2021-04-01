/* global Shopify tStrings */

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

	componentDidMount() {
		const optionsEl = document.getElementById(`cart-item__variants__${this.props.item.id}`);
		if (optionsEl) {
			optionsEl.addEventListener('show.bs.collapse', this.toggleVariantEdit);
			optionsEl.addEventListener('hidden.bs.collapse', this.toggleVariantEdit);
		}
	}

	componentWillUnmount() {
		const optionsEl = document.getElementById(`cart-item__variants__${this.props.item.id}`);
		if (optionsEl) {
			optionsEl.removeEventListener('show.bs.collapse', this.toggleVariantEdit);
			optionsEl.removeEventListener('hidden.bs.collapse', this.toggleVariantEdit);
		}
	}

	onSelectVariant(opt) {
		if (opt.available && opt.id !== this.state.selectedVariant.id) {
			this.setState({ selectedVariant: opt });
		}
	}

	onRemoveItem = () => {
		this.props.onRemoveItem(this.props.item);
	}

	toggleVariantEdit = () => {
		if (this.state.editingVariant) {
			this.setState({ editingVariant: false }, () => {
				this.props.onChangeVariant(this.props.item, this.state.selectedVariant.id);
			});
		} else {
			this.setState({ editingVariant: true });
		}
	}

	render() {
		const { item } = this.props;
		const { models } = item;
		return (
			<li className="cart-item border-bottom">
				<figure className="row py-2 mb-0 align-items-start">
					<ConditionWrapper
						condition={models.isFree}
						wrapper={(children) => <a href={item.url} className="col-3">{children}</a>}
						wrapperFalse={(children) => <div className="col-3">{children}</div>}
					>
						<picture>
							<img src={models.image} className="w-100" alt={item.product_title} />
						</picture>
					</ConditionWrapper>
					<figcaption className="col-9">
						<div className="d-flex align-items-start">
							<h4 className="flex-grow-1 mr-1">{item.product_title}</h4>
							{!models.isFree && (<button className="cart-item__remove btn-unstyled sni sni__trash" type="button" aria-label="Remove" onClick={this.onRemoveItem} />)}
						</div>

						{models.color && models.variantOptions.length > 1 && (
							<>
								<div className="d-flex flex-wrap mb-1 align-items-center">
									<i className={`swatch ${models.colorHandle}`} />
									<i className="ml-1 mr-1">{models.color}</i>
									{!models.isFree && (
										<a className="cart-item__edit" data-toggle="collapse" href={`#cart-item__variants__${item.id}`} role="button" aria-expanded="false" aria-controls={`cart-item__variants__${item.id}`}>{this.state.editingVariant ? 'Done' : 'Edit'}</a>
									)}
								</div>
								{!models.isFree && (
									<div className="cart-item__variants collapse border-top border-bottom mb-1" id={`cart-item__variants__${item.id}`}>
										<ul className="list-unstyled d-flex py-1">
											{this.state.variantOptions.map((option) => (
												<li key={option.id}>
													<button
														className={`swatch mr-2 ${option.colorHandle} ${option.id === this.state.selectedVariant.id && 'border-primary'}`}
														type="button"
														tabIndex="-1"
														disabled={!option.available}
														aria-label={option.colorHandle}
														onClick={() => this.onSelectVariant(option)}
													/>
												</li>
											))}
										</ul>
									</div>
								)}
							</>
						)}

						{models.style && (
							<div className="d-flex mb-1 align-items-center">
								<span className="mr-1">{`${models.styleTitle}: ${models.style}`}</span>
								<i className={`swatch ${models.styleHandle}`} />
							</div>
						)}

						{models.properties && Object.keys(models.properties).map((key) => (<p key={key} className="mb-1">{`${key}: ${item.properties[key]}`}</p>))}

						<div className="d-flex align-items-end">
							<QuantityBox
								name="updates[]"
								editable={!item.models.isFree}
								quantity={item.quantity}
								onChangeQuantity={(newQty, callback) => this.props.onChangeQuantity(item, newQty, callback)}
							/>
							<div className="d-flex flex-column text-right">
								{models.comparePrice > 0 && (
									<span className="text-linethrough">{formatMoney(models.comparePrice)}</span>)}
								<span className="text-primary">{formatMoney(item.original_price)}</span>
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
