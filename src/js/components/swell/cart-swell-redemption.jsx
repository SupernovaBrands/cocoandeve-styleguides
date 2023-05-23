import React, { useRef } from 'react';
import SvgChevronPrev from '~svg/chevron-prev.svg';
import SvgChevronNext from '~svg/chevron-next.svg';
import BaliBeauty from '~svg/swell-bali-beauty.svg';
import SwellRedemptionCard from '~comp/swell/cart-swell-redemption-card';

import swellDummyItems from '~mod/swell-data-sample';

const CartSwellRedemption = () => {
	const swellRef = useRef(null);
	const SCROLL_ITEM = 151;

	const scroll = (direction) => {
		const el = swellRef;
		const left = el.current.scrollLeft;
		const offset = direction === 'left' ? -(SCROLL_ITEM) : SCROLL_ITEM;
		el.current.scrollTo({ left: left + offset });
	};
	return (
		<>
			<div className="cart-drawer__swell-redemption position-relative">
				<strong className="d-block mb-1">You have ⭐ 120 points to redeem:</strong>
				<p className="font-size-sm text-primary mb-g">You can only redeem 1 reward per order. Remove the current reward first before swapping to another one.</p>
				<button className="position-absolute btn-unstyled text-primary manual-gwp__left mr-3" aria-hidden="true" type="button" onClick={() => scroll('left')}>
					<SvgChevronPrev class="svg" />
					<span className="d-none">Left</span>
				</button>
				<button className="position-absolute btn-unstyled text-primary manual-gwp__right" aria-hidden="true" type="button" onClick={() => scroll('right')}>
					<SvgChevronNext class="svg" />
					<span className="d-none">Right</span>
				</button>
				<div className="manual-gwp__container d-flex mb-0 mt-2 text-center" ref={swellRef}>
					{swellDummyItems.map((item) => (
						<SwellRedemptionCard key={item.id} item={item} />
					))}
				</div>
			</div>
			<div className="cart-drawer__swell-redemption--banner d-flex align-items-center mx-ng pl-25 pr-g">
				<BaliBeauty className="position-absolute" />
				<div className="cart-drawer__swell-redemption--banner__tip-text bg-gray-400 d-block ml-2 pl-5 w-100 mr-0 rounded-lg h-100 py-1">
					<p className="pl-25 mb-0">Earn 52 points with this purchase</p>
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
