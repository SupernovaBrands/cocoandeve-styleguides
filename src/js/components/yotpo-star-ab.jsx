/* global tSettings */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import ReviewStar from '~comp/review-star';

const { yotpoKey } = tSettings;

const YotpoStarAb = (props) => {
	const [init, setInit] = useState(false);
	const [score, setScore] = useState(0);
	const [total, setTotal] = useState(0);

	useEffect(() => {
		$.get(`https://api-cdn.yotpo.com/products/${yotpoKey}/${props.productId}/bottomline`).done(function (data) {
			setScore(data.response.bottomline.average_score);
			setTotal(data.response.bottomline.total_reviews);
			if (!init) {
				setInit(true);
			}
		});
	}, [props.productId]);

	return init ? (
		<div className={`d-flex ${props.extraClass}`}>
			<ReviewStar sharp score={score} />
			{props.showScore && <span className="ml-25">{`${score.toFixed(1)} stars`}</span>}
			{props.showTotal && (
				<span className="ml-25">
					(
					<a className="link-secondary text-underline" href={`${props.productUrl}#write-a-review`}>{total}</a>
					)
				</span>
			)}
		</div>
	) : (<div />);
};

YotpoStarAb.propTypes = {
	productId: PropTypes.number.isRequired,
	productUrl: PropTypes.string,
	showScore: PropTypes.bool,
	showTotal: PropTypes.bool,
	extraClass: PropTypes.string,
};

YotpoStarAb.defaultProps = {
	productUrl: '',
	showScore: false,
	showTotal: true,
	extraClass: '',
};

export default YotpoStarAb;
