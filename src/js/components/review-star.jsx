import React from 'react';
import PropTypes from 'prop-types';

import SvgFull from '~svg/star-full.svg';
import SvgHalf from '~svg/star-half.svg';
import SvgLine from '~svg/star-line.svg';
import SvgSharpFull from '~svg/star-sharp-full.svg';

const ReviewStar = (props) => {
	const full = Math.floor(props.score);
	const line = 5 - Math.ceil(props.score);
	const half = 5 - full - line;

	const stars = [];
	if (props.sharp) {
		for (let x = 0; x < full; x += 1) {
			stars.push(<SvgSharpFull key={`full-${x}`} role="presentation" className={`svg text-primary ${stars.length === 0 ? '' : 'ml-25'}`} />);
		}
		for (let x = 0; x < half; x += 1) {
			stars.push(<SvgHalf key={`half-${x}`} role="presentation" className={`svg text-primary ${stars.length === 0 ? '' : 'ml-25'}`} />);
		}
		for (let x = 0; x < line; x += 1) {
			stars.push(<SvgLine key={`line-${x}`} role="presentation" className={`svg text-primary ${stars.length === 0 ? '' : 'ml-25'}`} />);
		}
	} else {
		for (let x = 0; x < full; x += 1) {
			stars.push(<SvgFull key={`full-${x}`} role="presentation" className={`svg text-primary ${stars.length === 0 ? '' : 'ml-25'}`} />);
		}
		for (let x = 0; x < half; x += 1) {
			stars.push(<SvgHalf key={`half-${x}`} role="presentation" className={`svg text-primary ${stars.length === 0 ? '' : 'ml-25'}`} />);
		}
		for (let x = 0; x < line; x += 1) {
			stars.push(<SvgLine key={`line-${x}`} role="presentation" className={`svg text-primary ${stars.length === 0 ? '' : 'ml-25'}`} />);
		}
	}

	return (
		<div className="d-flex">
			{stars}
		</div>
	);
};

ReviewStar.propTypes = {
	score: PropTypes.number.isRequired,
	sharp: PropTypes.bool.isRequired,
};

export default ReviewStar;
