/* global tSettings */

import React from 'react';
import PropTypes from 'prop-types';

import { formatMoney } from '~mod/utils';

const CartDiscountMeter = (props) => {
	const {
		target,
		current,
		progressText,
		finalText,
	} = props;

	const remaining = target - current;
	const progress = remaining <= 0 ? 100 : Math.floor((current / target) * 100);
	const amount = formatMoney(remaining);
	const text = remaining <= 0 ? finalText : progressText.replace('#{shipping_price}', amount).replace('#{amount}', amount);

	return (
		<>
			<h4>{text}</h4>
			<div className="progress">
				<div
					className="progress-bar"
					style={{ width: `${progress}%` }}
					role="progressbar"
					aria-label="progress"
					aria-valuenow={progress}
					aria-valuemin="0"
					aria-valuemax="100"
				/>
			</div>
		</>
	);
};

CartDiscountMeter.propTypes = {
	target: PropTypes.number,
	current: PropTypes.number,
	progressText: PropTypes.string,
	finalText: PropTypes.string,
};

CartDiscountMeter.defaultProps = {
	target: 0,
	current: 0,
	progressText: tSettings.cartShippingMeter.inProgressText,
	finalText: tSettings.cartShippingMeter.finalText,
};

export default CartDiscountMeter;
