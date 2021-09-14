import React, {
	useState,
} from 'react';
import PropTypes from 'prop-types';

import {
	kebabCase,
	scrollToElement,
	validateEmail,
} from '~mod/utils';

import SvgFull from '~svg/star-full.svg';

const YotpoReviewForm = (props) => {
	const {
		customQuestions,
		onSubmit,
	} = props;

	const [score, setScore] = useState(0);
	const [hoverStar, setHoverStar] = useState(0);

	const [title, setTitle] = useState('');
	const [errorTitle, setErrorTitle] = useState(false);
	const [review, setReview] = useState('');
	const [errorReview, setErrorReview] = useState(false);
	const [name, setName] = useState('');
	const [errorName, setErrorName] = useState(false);
	const [email, setEmail] = useState('');
	const [errorEmail, setErrorEmail] = useState(false);

	const onSubmitButton = () => {
		const isTitleErr = title === '';
		const isReviewErr = review === '';
		const isNameErr = name === '';
		const isEmailErr = !validateEmail(email);
		setErrorTitle(isTitleErr);
		setErrorReview(isReviewErr);
		setErrorName(isNameErr);
		setErrorEmail(isEmailErr);

		if (isTitleErr || isReviewErr || isNameErr || isEmailErr) {
			scrollToElement('#yotpoReviewForm');
		} else {
			const form = document.getElementById('yotpoReviewForm');
			const custom = {};
			customQuestions.forEach((q) => {
				const checked = form.querySelectorAll(`input[name='${q.slug}']:checked`);
				if (checked && checked.length) {
					custom[q.slug] = [...checked].map((c) => c.value);
				}
			});

			const data = {
				review_score: score,
				review_title: title,
				review_content: review,
				display_name: name,
				email,
				custom_fields: custom,
			};
			onSubmit(data);
		}
	};

	return (
		<div id="yotpoReviewForm" className="collapse mt-3" data-parent="#yotpoFormCollapse">
			<div className="yotpo__review-fields d-flex flex-column">
				<div className="form-group">
					<h4 className="mb-2">Write a Review</h4>
					<p className="font-size-sm mb-1">
						<span className="text-primary">* </span>
						Indicates a required field
					</p>
				</div>
				<div className="form-group">
					<p className="font-size-sm mb-1">
						<span className="text-primary">* </span>
						Score:
					</p>
					{[...Array(5)].map((star, index) => {
						const i = index + 1;
						return (
							<SvgFull
								role="button"
								key={i}
								className={`svg font-size-lg pr-1 mb-1 ${i <= (hoverStar || score) ? 'text-primary' : 'text-muted'}`}
								onClick={() => setScore(i)}
								onMouseEnter={() => setHoverStar(i)}
								onMouseLeave={() => setHoverStar(score)}
							/>
						);
					})}
				</div>
				<div className="form-group">
					<p className="font-size-sm mb-1">
						<span className="text-primary">* </span>
						Title:
					</p>
					<input type="text" className="form-control mb-1" id="yotpoFormTitle" value={title} onChange={(e) => setTitle(e.target.value)} required />
					{errorTitle && <small className="text-primary mb-1">Title field required</small>}
				</div>
				<div className="form-group">
					<p className="font-size-sm mb-1">
						<span className="text-primary">* </span>
						Review:
					</p>
					<textarea className="form-control mb-1" id="yotpoFormReview" value={review} onChange={(e) => setReview(e.target.value)} rows="5" />
					{errorReview && <small className="text-primary mb-1">Review field required</small>}
				</div>
				{customQuestions.map((q) => (
					<div className="form-group" key={q.slug}>
						<p className="font-size-sm mb-1">{q.question}</p>
						{q.options.map((op) => (
							<div className={`custom-control custom-${q.radio ? 'radio' : 'checkbox'} mb-1`} key={op}>
								<input className="custom-control-input" type={q.radio ? 'radio' : 'checkbox'} name={q.slug} value={op} id={`${q.slug}-${kebabCase(op)}`} />
								{/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
								<label className="custom-control-label font-size-sm" htmlFor={`${q.slug}-${kebabCase(op)}`}>{op}</label>
							</div>
						))}
					</div>
				))}
				<div className="row mx-0 mx-lg-ng mb-3 justify-content-lg-end">
					<div className="col-lg-4 px-0 px-lg-g mb-1 mb-lg-0">
						<p className="font-size-sm mb-1">
							<span className="text-primary">* </span>
							Use your name:
						</p>
						<input type="text" id="yotpoReviewName" className="form-control mb-1" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} required />
						{errorName && <small className="text-primary mb-1">Name field required</small>}
					</div>
					<div className="col-lg-4 px-0 px-lg-g">
						<p className="font-size-sm mb-1">
							<span className="text-primary">* </span>
							Email:
						</p>
						<input type="email" id="yotpoReviewEmail" className="form-control mb-1" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
						{errorEmail && <small className="text-primary mb-1">Please enter a valid email</small>}
					</div>
				</div>
				<div className="d-flex form-group justify-content-end">
					<button type="button" className="btn btn-primary" onClick={onSubmitButton}>Submit</button>
				</div>
			</div>
		</div>
	);
};

YotpoReviewForm.propTypes = {
	customQuestions: PropTypes.array.isRequired,
	onSubmit: PropTypes.func.isRequired,
};

export default YotpoReviewForm;
