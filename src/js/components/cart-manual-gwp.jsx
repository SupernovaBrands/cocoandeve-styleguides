/* global tStrings */

import React from 'react';
import PropTypes from 'prop-types';

import { isItemIdInKey } from '~mod/utils';

const CartManualGwp = (props) => {
	const {
		title,
		maxSelected,
		selectedKey,
		items,
		onAddItem,
		onRemoveItem,
	} = props;
	return (
		<div className="border-bottom pb-1 mb-2">
			<h4 className="font-weight-bold mb-0">{title}</h4>
			<p className="text-muted">{`${selectedKey.length}/${maxSelected} ${tStrings.items_selected}`}</p>
			<ul className="list-unstyled manual-gwp__container d-flex pb-2 text-center">

				{items.map((item) => {
					const isSelected = !!(selectedKey.find((key) => isItemIdInKey(key, item.id)));
					return (
						<li key={item.id} className="manual-gwp__item d-flex flex-column mr-2">
							<figure className="mb-0">
								<picture className="d-block">
									<img src={item.image} alt={item.title} className="w-100 overflow-hidden rounded-circle" />
								</picture>
								<figcaption className="w-100 mt-n1 position-relative rounded-sm">{`Worth ${item.price}`}</figcaption>
							</figure>
							<p className="flex-grow-1 font-weight-bold my-1">{item.title}</p>
							<button
								type="button"
								className={`btn btn-sm btn-block px-1 btn-${isSelected ? 'primary' : 'outline-primary'}`}
								onClick={() => {
									if (isSelected) {
										onRemoveItem(item.id);
									} else { onAddItem(item.id); }
								}}
							>
								{isSelected ? tStrings.remove : tStrings.add}
							</button>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

CartManualGwp.propTypes = {
	title: PropTypes.string.isRequired,
	maxSelected: PropTypes.number.isRequired,
	selectedKey: PropTypes.array.isRequired,
	items: PropTypes.array.isRequired,
	onAddItem: PropTypes.func.isRequired,
	onRemoveItem: PropTypes.func.isRequired,
};

export default CartManualGwp;
