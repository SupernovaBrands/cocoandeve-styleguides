/* global tStrings */

import React from 'react';
import PropTypes from 'prop-types';

import { isItemIdInKey } from '~mod/utils';

import SvgChevronPrev from '~svg/chevron-prev.svg';
import SvgChevronNext from '~svg/chevron-next.svg';
import { handleSwipe } from '../modules/utils';

export default class CartManualGwp extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showScroll: false,
		};
	}

	scroll = (direction) => {
		const el = this.scrollRef;
		const left = el.scrollLeft;
		const offset = direction === 'left' ? -116 : 116;
		el.scrollTo({ left: left + offset });
	}

	componentDidMount() {
		handleSwipe(document.querySelector('.manual-gwp .manual-gwp__container'), this.scroll);
	}

	render() {
		const {
			title,
			maxSelected,
			selectedKey,
			items,
			onAddItem,
			onRemoveItem,
			loading,
			processingId,
		} = this.props;
		return (
			<div className="manual-gwp position-relative">
				<p className="font-size-base font-weight-bold mb-0">{title}</p>
				<p className="font-size-base text-gray-600">{`${selectedKey.length}/${maxSelected} ${tStrings.items_selected}`}</p>
				<button className={`position-absolute btn-unstyled text-primary manual-gwp__left ${this.state.showScroll ? '' : 'd-none'}`} aria-hidden="true" type="button" onClick={() => this.scroll('left')}><SvgChevronPrev className="svg" /></button>
				<button className={`position-absolute btn-unstyled text-primary manual-gwp__right ${this.state.showScroll ? '' : 'd-none'}`} aria-hidden="true" type="button" onClick={() => this.scroll('right')}><SvgChevronNext className="svg" /></button>
				<ul className="list-unstyled manual-gwp__container d-flex mb-0 text-center mr-ng mr-lg-n3" ref={(r) => { this.scrollRef = r; }}>
					{items.map((item) => {
						const isLoading = loading && processingId === item.id;
						const isSelected = !!(selectedKey.find((key) => isItemIdInKey(key, item.id)));
						return (
							<li key={item.id} className="manual-gwp__item d-flex flex-column">
								<figure className="mb-0">
									<picture className="d-block">
										<img src={item.image} alt={item.title} className="w-100 overflow-hidden rounded-circle" />
									</picture>
									<figcaption className="position-relative mt-n1">{`${tStrings.items_worth} ${item.price}`}</figcaption>
								</figure>
								<p className="flex-grow-1 my-1 font-size-base">{item.title}</p>
								<button
									type="button"
									className={`btn btn-sm btn-block px-1 py-1 font-size-base btn-${isSelected ? 'primary' : 'outline-primary'}`}
									onClick={() => {
										if (isSelected) {
											onRemoveItem(item.id);
										} else { onAddItem(item.id); }
									}}
								>
									{isLoading && (
										<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
									)}
									{!isLoading && (isSelected ? tStrings.items_manual_remove : tStrings.items_manual_add)}
								</button>
							</li>
						);
					})}
				</ul>
			</div>
		);
	}
}

CartManualGwp.propTypes = {
	title: PropTypes.string.isRequired,
	maxSelected: PropTypes.number.isRequired,
	selectedKey: PropTypes.array.isRequired,
	items: PropTypes.array.isRequired,
	onAddItem: PropTypes.func.isRequired,
	onRemoveItem: PropTypes.func.isRequired,
	loading: PropTypes.bool.isRequired,
	processingId: PropTypes.number.isRequired,
};
