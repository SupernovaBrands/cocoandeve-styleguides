import React from 'react';
import PropTypes from 'prop-types';

const SwellRedemptionCard = (props) => {
	const { item } = props;
	const redeemItem = (e) => {
		document.querySelectorAll('.cart-drawer__swell-redemption-item .btn')?.forEach((btn) => {
			btn.classList.remove('btn-primary');
			btn.classList.add('bg-white');
			// eslint-disable-next-line no-param-reassign
			btn.textContent = 'Add';
		});
		e.target.classList.add('btn-primary');
		e.target.classList.remove('bg-white');
		e.target.textContent = 'Remove';
	};
	return (
		<figure className="cart-drawer__swell-redemption-item bg-gray-400 rounded-lg mr-1 d-flex justify-content-start align-items-center flex-column">
			<picture className="w-100 pb-25 rounded-top">
				<img alt={item.name} src="https://via.placeholder.com/80x80" className="w-100 rounded-top" />
			</picture>
			<figcaption className="d-flex px-25 align-items-center flex-column h-100 w-100 justify-content-between">
				<div className="d-flex align-items-center">{`⭐️ ${item.cost_in_points}`}</div>
				<button type="button" className="btn rounded-pill bg-white d-flex align-items-center w-100 py-1 justify-content-center my-1" onClick={redeemItem}>
					Add
				</button>
			</figcaption>
		</figure>
	);
};

SwellRedemptionCard.propTypes = {
	item: PropTypes.object.isRequired,
};

export default SwellRedemptionCard;
