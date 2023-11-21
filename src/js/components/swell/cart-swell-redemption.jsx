import React, { useEffect, useRef, useState } from 'react';
import SvgChevronPrev from '~svg/chevron-prev.svg';
import SvgChevronNext from '~svg/chevron-next.svg';
import BaliBeauty from '~svg/swell-bali-beauty.svg';
import SwellRedemptionCard from '~comp/swell/cart-swell-redemption-card';
import SwellTooltip from '~svg/swell-tooltip.svg';

import swellDummyItems from '~mod/swell-data-sample';
import { handleSwipe } from '../../modules/utils';

const CartSwellRedemption = () => {
	const swellRef = useRef(null);
	const SCROLL_ITEM = 151;
	const [itemRedeemed, setItemRedeemed] = useState(false);
	const [errorMessage, setErrorMessage] = useState(false);

	const scroll = (direction) => {
		const el = swellRef;
		const left = el.current.scrollLeft;
		const offset = direction === 'left' ? -(SCROLL_ITEM) : SCROLL_ITEM;
		el.current.scrollTo({ left: left + offset });
	};
	const itemAdded = (val) => setItemRedeemed(val);
	const showError = (val) => setErrorMessage(val);

	useEffect(() => {
		handleSwipe(document.querySelector('.cart-drawer .swell-container'), scroll);
	}, [swellRef]);

	return (
		<>
			<div className="position-relative">
				<strong className="d-block mb-1">You have ⭐ 120 points to redeem:</strong>
				{errorMessage && (
					<p className="font-size-sm text-primary mb-g">You can only redeem 1 reward per order. Remove the current reward first before swapping to another one.</p>
				)}
				<button className="position-absolute btn-unstyled text-primary arrow__left mr-3 d-none d-lg-block" aria-hidden="true" type="button" onClick={() => scroll('left')}>
					<SvgChevronPrev className="svg" />
					<span className="d-none">Left</span>
				</button>
				<button className="position-absolute btn-unstyled text-primary arrow__right d-none d-lg-block" aria-hidden="true" type="button" onClick={() => scroll('right')}>
					<SvgChevronNext className="svg" />
					<span className="d-none">Right</span>
				</button>
				<div className="manual-gwp__container swell-container d-flex mb-0 mt-2 text-center mr-ng mr-lg-n3" ref={swellRef}>
					{swellDummyItems.map((item) => (
						<SwellRedemptionCard
							key={item.id}
							item={item}
							itemAdded={itemAdded}
							itemRedeemed={itemRedeemed}
							showError={showError}
						/>
					))}
				</div>
			</div>
			<div className="cart-drawer__swell-redemption--banner d-flex align-items-center mx-ng pl-25 pr-g">
				<BaliBeauty className="position-absolute" />
				<div className="cart-drawer__swell-redemption--banner__tip-text bg-gray-400 d-block ml-2 pl-5 w-100 mr-0 rounded-lg h-100 py-1">
					<p className="pl-25 mb-0">
						Earn 52 points with this purchase
						<button type="button" className="btn-unstyled ml-25" data-toggle="tooltip" data-placement="top" title="Earn points and redeem exclusive rewards, $1 = 1 Point!">
							<SwellTooltip />
						</button>
					</p>
					<p className="pl-25 mb-0">
						<a href="/account/register" className="text-underline text-body">Sign up</a>
						{' or '}
						<a href="/account/login" className="text-underline text-body">Log in</a>
						{' to start collecting points!'}
					</p>
				</div>
			</div>
		</>
	);
};

export default CartSwellRedemption;
