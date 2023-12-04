/* global tSettings screenLG */

import React from 'react';
import PropTypes from 'prop-types';

import { formatMoney, handleSwipe } from '~mod/utils';
import SvgChevronPrev from '~svg/chevron-prev.svg';
import SvgChevronNext from '~svg/chevron-next.svg';

export default class CartUpsell extends React.Component {
	constructor(props) {
		super(props);
		this.state = { isLoading: false };
	}

    componentDidMount() {
        handleSwipe(document.querySelector('.cart-drawer .upsell__container'), this.scrollTo);
	}

	scrollTo = (direction) => {
		const el = document.querySelector('.cart-drawer .upsell__container');
        const mainElWidth = document.querySelector('.cart-drawer .modal-content').clientWidth;
        const left = el.scrollLeft;
        const wEl = window.innerWidth > screenLG ? 318 : 270;
        const margin = window.innerWidth > screenLG ? 30 : 15;
		const offset = direction === 'left' ? -(wEl + margin) : wEl + margin;
		el.scrollTo({ left: left + offset });
	}

	handleClick = (item, e) => {
		e.preventDefault();
		this.setState({ isLoading: item.id });
		this.props.onAddUpsell(item);
        this.setState({ isLoading: false });
        setTimeout(function () {
            $('#cart-drawer-form').parent().animate({ scrollTop: 0 }, 'slow');
        }, 500);

		e.target.blur();
	}

	render() {
		const { upsell } = this.props;
		return (
			<div className="mt-2 position-relative">
				<p className="font-size-base font-weight-bold mb-0">You may love:</p>
                <button className="position-absolute btn-unstyled text-primary d-none d-lg-block arrow__left mr-3" aria-hidden="true" type="button" onClick={() => this.scrollTo('left')}>
                    <SvgChevronPrev className="svg" />
                    <span className="d-none">Left</span>
                </button>
                <button className="position-absolute btn-unstyled text-primary d-none d-lg-block arrow__right" aria-hidden="true" type="button" onClick={() => this.scrollTo('right')}>
                    <SvgChevronNext className="svg" />
                    <span className="d-none">Right</span>
                </button>
                <div className="upsell upsell__container overflow-hidden d-flex mt-2 mx-ng mx-lg-n3 overflow-hidden">
                        {upsell.map((item) => (
                            <figure key={item.id} className="d-flex mx-0 mb-0 upsell__item ml-g ml-lg-3 mr-0">
                                <picture className="px-0 upsell__item__img mr-2">
                                    <img
                                        className="lazyload w-100 h-100 object-fit-cover"
                                        alt={item.product_title}
                                        src='https://via.placeholder.com/150/EFADBA'
                                        data-src='https://via.placeholder.com/150x150/EFADBA'
                                        data-sizes="auto"
                                        data-widths="[370,270]"
                                    />
                                </picture>
                                <figcaption className="ml-0 mr-0 pt-0 pl-0 font-size-base">
                                    <p className="font-weight-bold my-0"><a className="text-body" href={item.url}>{item.product_title}</a></p>
                                    <p className="my-1">
                                        {item.original_line_price > 0 && (
                                            <span className="text-linethrough">{formatMoney(item.original_line_price)}</span>
                                        )}
                                        <span className={`text-primary font-weight-bold ${item.original_line_price > 0 ? 'ml-g' : ''}`}>{formatMoney(item.original_line_price)}</span>
                                    </p>
                                    <button className="btn btn-outline-primary text-nowrap" onClick={(e) => { this.handleClick(item, e); }} type="button">
                                        {this.state.isLoading === item.id ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" /> : 'Add'}
                                    </button>
                                </figcaption>
                            </figure>
                        ))}
                </div>
                <hr/>
			</div>
		);
	}
}

CartUpsell.propTypes = {
	upsell: PropTypes.array.isRequired,
	onAddUpsell: PropTypes.func.isRequired,
};
