import React, { useState } from 'react';
import PropTypes from 'prop-types';

const SwellRedemptionCard = (props) => {
	const [itemAdded, setItemAdded] = useState(0);
	const { item, itemRedeemed } = props;
	const resetBtn = () => {
		document.querySelectorAll('.cart-drawer__swell-redemption-item .btn')?.forEach((btn) => {
			btn.classList.remove('btn-primary');
			btn.classList.add('bg-white');
			// eslint-disable-next-line no-param-reassign
			btn.textContent = 'Add';
		});
	};
	const redeemItem = (e) => {
		const { itemId } = e.target.dataset;
		const id = parseInt(itemId, 10);
		if (itemRedeemed && item.id !== itemAdded) {
			props.showError(true);
			return;
		}
		resetBtn();
		e.target.classList.add('btn-primary');
		e.target.classList.remove('bg-white');
		e.target.textContent = 'Remove';
		if (id === itemAdded) {
			resetBtn();
		}
		setItemAdded((prevId) => (prevId === id ? 0 : id));
		props.itemAdded(id !== itemAdded);
		props.showError(false);
	};
	return (
		<figure className="col-3 px-0 cart-drawer__swell-redemption-item bg-gray-400 rounded-lg mr-1 d-flex justify-content-start align-items-center flex-column">
			<picture className="w-100 pb-25">
				<img alt={item.name} src="https://via.placeholder.com/80x80" className="w-100" />
			</picture>
			<figcaption className="d-flex px-25 align-items-center flex-column h-100 w-100 justify-content-between">
				<div className="d-flex align-items-center">{`⭐️ ${item.cost_in_points}`}</div>
				<button type="button" data-item-id={item.id} className="btn btn-sm rounded-pill bg-white w-100 px-1 my-1 font-weight-normal" onClick={redeemItem}>
					Add
				</button>
			</figcaption>
		</figure>
	);
};

SwellRedemptionCard.propTypes = {
	item: PropTypes.object.isRequired,
	itemRedeemed: PropTypes.bool.isRequired,
	itemAdded: PropTypes.func.isRequired,
	showError: PropTypes.func.isRequired,
};

export default SwellRedemptionCard;
