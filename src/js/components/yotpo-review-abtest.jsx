import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
	currentTime,
	encryptParam,
} from '~mod/utils';

import YotpoModalComponent from './yotpo-review-modal-abtest';

const YotpoReviewTest = (props) => {
	const apiUrl = 'https://supernova-reviews.herokuapp.com/api';
	const localeParam = 'en';

	const { productSkus, productId } = props;
	const [totalMedia, setTotalMedia] = useState(0);
	const [mobileReviews, setMobileReviews] = useState([]);
	const [desktopReviews, setDesktopReviews] = useState([]);
	const [reviewModal, setReviewModal] = useState({});
	const [reviewModalIndex, setReviewModalIndex] = useState(0);

	const getReviews = (page = 1) => {
		const signature = encryptParam(`{sku:'${productSkus}',time:${currentTime()}}`);
		const param = {
			signature,
			pictured: true,
			per: 150,
			page,
			lang: localeParam,
		};
		$.get(`${apiUrl}/reviews/with_images.json?sku=${productSkus}`, param, function (data) {
			setTotalMedia(data.response.bottomline.total_review);
			const reviews = data.response.reviews.slice(0, 5);
			setMobileReviews(reviews);
			const desktopR = data.response.reviews.slice(0, 7);
			setDesktopReviews(desktopR);
		});
	};

	const modalHandle = (index) => {
		if (desktopReviews.indexOf(index) >= -1) {
			setReviewModal(desktopReviews[index]);
		} else {
			getReviews(2);
		}
	};

	useEffect(() => {
		getReviews();
	}, [productId]);

	return (
		<>
			<div className="row d-lg-none">
				{mobileReviews.map((review, index) => (
					<div key={review.id} className="col">
						<a
							href="#yotpoImageModalAbtest"
							data-toggle="modal"
							data-target="#yotpoImageModalAbtest"
							className="d-block"
							onClick={() => {
								setReviewModal(review);
								setReviewModalIndex(index);
							}}
						>
							<img alt={review.title} src={review.images_data[0].thumb_url} className="w-100" />
							{index + 1 === mobileReviews.length && (
								<span className="position-absolute text-primary text-underline">{`+${totalMedia}`}</span>
							)}
						</a>
					</div>
				))}
			</div>
			<ul className="d-none d-lg-flex list-unstyled">
				{desktopReviews.map((review, index) => (
					<li key={review.id} className={index + 1 === desktopReviews.length ? 'position-relative mr-0' : ''} data-index={index}>
						<a
							href="#yotpoImageModalAbtest"
							data-toggle="modal"
							data-target="#yotpoImageModalAbtest"
							className="d-block"
							onClick={() => {
								setReviewModal(review);
								setReviewModalIndex(index);
							}}
						>
							<img alt={review.title} src={review.images_data[0].thumb_url} className="w-100" />
							{index + 1 === desktopReviews.length && (
								<span className="position-absolute text-primary text-underline">{`+${totalMedia}`}</span>
							)}
						</a>
					</li>
				))}
			</ul>
			<YotpoModalComponent reviewModal={reviewModal} reviewModalIndex={reviewModalIndex} modalHandle={modalHandle} />
		</>
	);
};

YotpoReviewTest.propTypes = {
	productId: PropTypes.number.isRequired,
	productSkus: PropTypes.string.isRequired,
};

export default YotpoReviewTest;
