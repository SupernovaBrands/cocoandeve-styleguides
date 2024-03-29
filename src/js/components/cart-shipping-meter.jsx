/* global tSettings */

import React from 'react';
import PropTypes from 'prop-types';

import { formatMoney } from '~mod/utils';

const CartShippingMeter = (props) => {
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
			<p className="mb-1">{text}</p>
			<div className="progress mb-3">
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

CartShippingMeter.propTypes = {
	current: PropTypes.number,
	target: PropTypes.number,
	progressText: PropTypes.string,
	finalText: PropTypes.string,
};

CartShippingMeter.defaultProps = {
	current: 0,
	target: 0,
	progressText: tSettings.cartShippingMeter.inProgressText,
	finalText: tSettings.cartShippingMeter.finalText,
};

export default CartShippingMeter;
