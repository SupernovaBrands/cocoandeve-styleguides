/* global tStrings */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
	currentTime,
	encryptParam,
	decodeHtml,
	waitFor,
} from '~mod/utils';

import SvgClose from '~svg/close.svg';
import SvgChevronPrev from '~svg/chevron-prev.svg';
import SvgChevronNext from '~svg/chevron-next.svg';
import SvgCloseCircle from '~svg/close-rounded.svg';

const YotpoReviewTest = (props) => {
	const apiUrl = 'https://supernova-reviews.herokuapp.com/api';
	const localeParam = 'en';

	const [init, setInit] = useState(false);
	const { productSkus, productId } = props;
	const [totalMedia, setTotalMedia] = useState(0);
	const [allReviews, setAllReviews] = useState([]);
	const [reviewModal, setReviewModal] = useState({});
	const [carouselCount, setCarouselCount] = useState(1);

	const formatDate = (serverDate) => {
		const d = new Date(serverDate);
		const month = `${d.getMonth() + 1}`.padStart(2, '0');
		const day = `${d.getDate()}`.padStart(2, '0');
		const year = d.getFullYear();
		return [day, month, year].join('/');
	};

	const getReviews = (page = 1, limit = 10) => {
		const signature = encryptParam(`{sku:'${productSkus}',time:${currentTime()}}`);
		const param = {
			signature,
			pictured: true,
			per: limit,
			page,
			lang: localeParam,
		};
		$.get(`${apiUrl}/reviews/with_images.json?sku=${productSkus}`, param, function (data) {
			setTotalMedia(data.response.bottomline.total_review);
			setAllReviews(data.response.reviews);
			if (!init) setInit(true);
		});
	};

	const slideCarousel = (direction) => {
		if (reviewModal.images_data.length > 1) {
			window.$('#carouselYotpoImageAbtest').carousel(direction);
			window.$('#carouselYotpoImageAbtest').on('slid.bs.carousel', function (e) {
				e.preventDefault();
				setCarouselCount(() => (e.direction === 'right' ? carouselCount - 1 : carouselCount + 1));
			});
		}
	};

	const setPrevNextReview = (reviewId) => {
		// get single review
		waitFor(() => allReviews, () => {
			const reviewToShow = allReviews.find((r) => r.id === reviewId);
			setCarouselCount(1);
			setReviewModal(reviewToShow);
		});
		return false;
	};

	const onClickModal = () => {
		setCarouselCount(1);
		getReviews(1, totalMedia);
	};

	useEffect(() => {
		getReviews();
	}, [productId]);

	const isFirstReview = (allReviews.length > 0 && reviewModal.id === allReviews[0].id);
	const isLastReview = (allReviews.length > 0 && reviewModal.id === allReviews[allReviews.length - 1].id);

	return !init ? (
		<div className="d-flex justify-content-center my-2">
			<div className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
		</div>
	) : (
		<>
			<div className="row d-lg-none">
				{allReviews.slice(0, 5).map((review, index) => (
					<div key={review.id} className="col">
						<a
							href="#yotpoImageModalAbtest"
							data-toggle="modal"
							data-target="#yotpoImageModalAbtest"
							className="d-block"
							onClick={() => {
								onClickModal();
								setReviewModal(review);
							}}
						>
							<img alt={review.title} src={review.images_data[0].thumb_url} className="w-100" />
							{index + 1 === allReviews.slice(0, 5).length && (
								<span className="position-absolute text-primary text-underline">{`+${totalMedia}`}</span>
							)}
						</a>
					</div>
				))}
			</div>
			<ul className="d-none d-lg-flex list-unstyled">
				{allReviews.slice(0, 7).map((review, index) => (
					<li key={review.id} className={index + 1 === allReviews.slice(0, 7).length ? 'position-relative mr-0' : ''} data-index={index}>
						<a
							href="#yotpoImageModalAbtest"
							data-toggle="modal"
							data-target="#yotpoImageModalAbtest"
							className="d-block"
							onClick={() => {
								onClickModal();
								setReviewModal(review);
							}}
						>
							<img alt={review.title} src={review.images_data[0].thumb_url} className="w-100" />
							{index + 1 === allReviews.slice(0, 7).length && (
								<span className="position-absolute text-primary text-underline">{`+${totalMedia}`}</span>
							)}
						</a>
					</li>
				))}
			</ul>
			<div className="modal fade yotpo-widget__modal" id="yotpoImageModalAbtest" tabIndex="-1" role="dialog" aria-hidden="true">
				{!!reviewModal.id && (
					<div className="modal-dialog modal-lg modal-dialog-centered" role="document">
						<div className="modal-content mx-3 mx-lg-0 border-0 rounded-0">
							<div className="row align-items-center">
								<div className="col-lg-6 pr-lg-0">
									{reviewModal.images_data.length === 1 ? (
										<div className="position-relative">
											<div id="carouselYotpoImageAbtest" className="carousel slide" data-ride="carousel" data-wrap="false">
												<div className="carousel-inner">
													<img src={reviewModal.images_data[0].image_url.replace('https:', '')} alt="Slide 1" className="d-block w-100" />
												</div>
											</div>
											{!isFirstReview && (
												<a className="carousel-control-prev text-primary carousel-control--background" href="#None" role="button" onClick={() => { setPrevNextReview(reviewModal.prev_id); }}>
													<span className="carousel-control-prev-icon d-flex justify-content-center align-items-center bg-pink-light">
														<SvgChevronPrev className="svg" />
													</span>
													<span className="sr-only">
														Previous
													</span>
												</a>
											)}
											{!isLastReview && (
												<a className="carousel-control-next text-primary carousel-control--background" href="#None" role="button" onClick={() => { setPrevNextReview(reviewModal.next_id); }}>
													<span className="carousel-control-next-icon d-flex justify-content-center align-items-center bg-pink-light">
														<SvgChevronNext className="svg" />
													</span>
													<span className="sr-only">
														Next
													</span>
												</a>
											)}
										</div>
									) : (
										<div className="position-relative">
											<div id="carouselYotpoImageAbtest" className="carousel slide" data-ride="carousel" data-wrap="false">
												<div className="carousel-inner">
													{reviewModal.images_data.map(
														(image, i) => (
															<div key={image.id} className={`carousel-item ${(i + 1) === carouselCount ? 'active' : ''}`}>
																<img src={image.image_url.replace('https:', '')} alt={`Slide ${i + 1}`} className="d-block w-100" />
															</div>
														),
													)}
												</div>
											</div>

											{!isFirstReview && (
												<a className="carousel-control-prev text-primary carousel-control--background" href="#None" role="button" onClick={() => { setPrevNextReview(reviewModal.prev_id); }}>
													<span className="carousel-control-prev-icon d-flex justify-content-center align-items-center bg-pink-light">
														<SvgChevronPrev className="svg" />
													</span>
													<span className="sr-only">
														Previous
													</span>
												</a>
											)}

											{!isLastReview && (
												<a className="carousel-control-next text-primary carousel-control--background" href="#None" role="button" onClick={() => { setPrevNextReview(reviewModal.next_id); }}>
													<span className="carousel-control-next-icon d-flex justify-content-center align-items-center bg-pink-light">
														<SvgChevronNext className="svg" />
													</span>
													<span className="sr-only">
														Next
													</span>
												</a>
											)}

											{carouselCount > 1 && (
												<a href="#carouselYotpoImageAbtest" className="carousel-control-prev text-primary carousel-control--background" role="button" data-slide="prev" onClick={(e) => { e.preventDefault(); slideCarousel('prev'); }}>
													<span className="carousel-control-prev-icon d-flex justify-content-center align-items-center bg-pink-light">
														<SvgChevronPrev className="svg" />
													</span>
													<span className="sr-only">
														Previous
													</span>
												</a>
											)}
											{carouselCount < reviewModal.images_data.length && (
												<a href="#carouselYotpoImageAbtest" className="carousel-control-next text-primary carousel-control--background" role="button" data-slide="next" onClick={(e) => { e.preventDefault(); slideCarousel('next'); }}>
													<span className="carousel-control-next-icon d-flex justify-content-center align-items-center bg-pink-light">
														<SvgChevronNext className="svg" />
													</span>
													<span className="sr-only">
														Next
													</span>
												</a>
											)}
										</div>
									)}
									<button type="button" className="close position-absolute d-flex d-lg-none mr-25" data-dismiss="modal" aria-label="Close">
										<SvgCloseCircle className="svg" />
									</button>
								</div>
								<div className="col-lg-6 pl-lg-0 ">
									<div className="px-3 py-3">
										<div className="d-flex">
											<p className="mb-0 font-weight-bold">
												{reviewModal.user_name}
											</p>
											{reviewModal.verified_buyer && (
												<p className="ml-1">
													{tStrings.yotpo.verifiedBuyer}
												</p>
											)}
											<p className="font-size-sm ml-auto">
												{formatDate(reviewModal.created_at)}
											</p>
										</div>
										<div className="d-flex text-secondary" />
										<h4 className="mb-0 my-2 yotpo__modal-title">
											{decodeHtml(reviewModal.title)}
										</h4>
										<p className="font-size-sm yotpo__modal-content">
											{reviewModal.content}
										</p>
									</div>
								</div>
							</div>
							<button type="button" className="close position-absolute font-size-base d-none d-lg-flex" data-dismiss="modal" aria-label="Close">
								<SvgClose className="svg" />
							</button>
						</div>
					</div>
				)}
			</div>
		</>
	);
};

YotpoReviewTest.propTypes = {
	productId: PropTypes.number.isRequired,
	productSkus: PropTypes.string.isRequired,
};

export default YotpoReviewTest;
