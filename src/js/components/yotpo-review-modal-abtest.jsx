/* global tStrings */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import SvgClose from '~svg/close.svg';
import SvgChevronPrev from '~svg/chevron-prev.svg';
import SvgChevronNext from '~svg/chevron-next.svg';
import SvgCloseCircle from '~svg/close-rounded.svg';

import {
	decodeHtml,
} from '~mod/utils';

const formatDate = (serverDate) => {
	const d = new Date(serverDate);
	const month = `${d.getMonth() + 1}`.padStart(2, '0');
	const day = `${d.getDate()}`.padStart(2, '0');
	const year = d.getFullYear();
	return [day, month, year].join('/');
};

const YotpoModalComponent = (props) => {
	const { reviewModal, reviewModalIndex } = props;

	const [stateIndex, setStateIndex] = useState(0);
	const [currentReview, setCurrentReview] = useState(reviewModal);

	useEffect(() => {
		setStateIndex(reviewModalIndex);
		setCurrentReview(currentReview);
	}, [reviewModalIndex, currentReview]);

	const setPrevNextReview = (index) => {
		setStateIndex(index);
		props.modalHandle(index);
	};

	const slideCarousel = (index) => {
		window.$('#carouselYotpoImageAbtest').carousel(index);
	};

	return (
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
										<a className="carousel-control-prev text-primary carousel-control--background" href="#carouselYotpoImageAbtest" role="button" onClick={() => { setPrevNextReview(stateIndex - 1); }}>
											<span className="carousel-control-prev-icon d-flex justify-content-center align-items-center">
												<SvgChevronPrev className="svg" />
											</span>
											<span className="sr-only">
												Previous
											</span>
										</a>
										<a className="carousel-control-next text-primary carousel-control--background" href="#carouselYotpoImageAbtest" role="button" onClick={() => { setPrevNextReview(stateIndex + 1); }}>
											<span className="carousel-control-next-icon d-flex justify-content-center align-items-center">
												<SvgChevronNext className="svg" />
											</span>
											<span className="sr-only">
												Next
											</span>
										</a>
									</div>
								) : (
									<div className="position-relative">
										<div id="carouselYotpoImageAbtest" className="carousel slide" data-ride="carousel" data-wrap="false">
											<div className="carousel-inner">
												{reviewModal.images_data.map(
													(image, i) => (
														<div key={image.id} className={`carousel-item ${i === 0 ? 'active' : ''}`}>
															<img src={image.image_url.replace('https:', '')} alt={`Slide ${i + 1}`} className="d-block w-100" />
														</div>
													),
												)}
											</div>
										</div>
										<a className="carousel-control-prev text-primary carousel-control--background" role="button" onClick={() => { slideCarousel('prev'); }}>
											<span className="carousel-control-prev-icon d-flex justify-content-center align-items-center">
												<SvgChevronPrev className="svg" />
											</span>
											<span className="sr-only">
												Previous
											</span>
										</a>
										<a className="carousel-control-next text-primary carousel-control--background" role="button" onClick={() => { slideCarousel('next'); }}>
											<span className="carousel-control-next-icon d-flex justify-content-center align-items-center">
												<SvgChevronNext className="svg" />
											</span>
											<span className="sr-only">
												Next
											</span>
										</a>
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
	);
};

YotpoModalComponent.propTypes = {
	reviewModal: PropTypes.number.isRequired,
	reviewModalIndex: PropTypes.number.isRequired,
	modalHandle: PropTypes.number.isRequired,
};

export default YotpoModalComponent;
