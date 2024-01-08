/* global screenLG */

$(document).ready(function () {
	if ($('.carousel--loop').length > 0) {
		// moving element carousel item depending of items per slide
		// triggered by bootstrap carousel slide event (when transition started)
		$('.carousel--loop').on('slide.bs.carousel', function (e) {
			const $e = $(e.relatedTarget);
			let idx = $e.index();
			let itemsPerSlide = $(this).data('slide-number') ? $(this).data('slide-number') : 3;
			const totalItems = $(this).find('.carousel-item').length;

			// handling fix index for carousel when carousel-inner has elements with d-none
			if (totalItems < idx) {
				idx -= $(this).find('.carousel-inner .d-none').length;
			}

			if (screenLG > window.innerWidth) {
				// set 1 for mobile
				itemsPerSlide = 2;
			}

			if ($(this).find('.carousel--centered').length > 0) {
				// add 1 element for negative offset of carousel inner
				idx += 1;

				// special case for carousel centered we would need plus 1, as we have negative offset x on carousel-inner
				if (e.direction === 'right') {
					$(this).find(`.carousel-item:nth-child(${$(this).find('.carousel-item.active').index() + 1 + itemsPerSlide})`).addClass('carousel-item--last');
				}
			}

			if (idx >= totalItems - (itemsPerSlide - 1)) {
				const it = itemsPerSlide - (totalItems - idx);

				for (let i = 0; i < it; i += 1) {
					if (e.direction === 'left') {
						$(this).find('.carousel-item').eq(i).appendTo($(this).find('.carousel-inner'));
					} else {
						$(this).find('.carousel-item').eq(0).appendTo($(this).find('.carousel-inner'));
					}
				}
			}
		});

		$('.carousel--loop').on('slid.bs.carousel', function () {
			$(this).find('.carousel-item--last').removeClass('carousel-item--last');
		});
	}

	const adjustScrollThumb = (thumb, inner, scrollParent) => {
		let innerOuterWidth;
		if ($(inner).closest('.instagram-carousel').length > 0) {
			// instagram scroll bugfix: out of container
			// round to 1 decimal of item width
			const itemWidth = Math.round($(inner).find('.carousel-item').outerWidth() * 10) / 10;
			// instagram total images from instagram.js
			innerOuterWidth = itemWidth * 15;
		} else {
			innerOuterWidth = inner.scrollWidth;
		}
		// eslint-disable-next-line no-param-reassign
		thumb.style.width = `${(inner.clientWidth / innerOuterWidth) * 100}%`;
		// eslint-disable-next-line no-param-reassign
		thumb.style.left = `${(inner.scrollLeft / inner.scrollWidth) * 100}%`;

		if (inner.clientWidth === inner.scrollWidth) {
			inner.classList.add('justify-content-center');
			scrollParent.classList.add('d-none');
		} else {
			inner.classList.remove('justify-content-center');
			scrollParent.classList.remove('d-none');
		}
	};

	if ($('.carousel--scroll-single').length > 0) {
		$('.carousel--scroll:not(.carousel--scroll__featured)').each((index, carousel) => {
			const inner = carousel.querySelector('.carousel-inner');
			const scrollbar = carousel.querySelector('.scrollbar');
			const scrollThumb = carousel.querySelector('.scrollbar--thumb');

			if (scrollbar) {
				carousel.addEventListener('adjustThumb', () => { adjustScrollThumb(scrollThumb, inner, scrollbar.parentNode); });
				if (scrollThumb) adjustScrollThumb(scrollThumb, inner, scrollbar.parentNode);
			}

			let x = 0;
			let left = 0;
			let itemIndex = 0;

			const innerDrag = (e) => {
				inner.scrollLeft = left - (e.pageX || e.touches[0].pageX) + x;
				if (scrollThumb) scrollThumb.style.left = `${(inner.scrollLeft / inner.scrollWidth) * 100}%`;
				// checkButton();
			};

			const scrollDrag = (e) => {
				inner.scrollLeft = left + ((e.pageX || e.touches[0].pageX) - x) * (inner.scrollWidth / scrollbar.clientWidth);
				if (scrollThumb) scrollThumb.style.left = `${(inner.scrollLeft / inner.scrollWidth) * 100}%`;
				// checkButton();
			};

			inner.addEventListener('scroll', () => {
				if (scrollThumb) scrollThumb.style.left = `${(inner.scrollLeft / inner.scrollWidth) * 100}%`;
				// checkButton();
			});

			const eventStart = (e) => {
				e.preventDefault();
				x = (e.pageX || e.touches[0].pageX);
				left = inner.scrollLeft;

				document.addEventListener(
					e.type === 'mousedown' ? 'mousemove' : 'touchmove',
					e.target === scrollThumb ? scrollDrag : innerDrag,
				);
			};

			inner.addEventListener('mousedown', eventStart, true);
			if (scrollThumb) {
				scrollThumb.addEventListener('mousedown', eventStart, true);
				scrollThumb.addEventListener('touchstart', eventStart, true);
				scrollThumb.addEventListener('mousedown', eventStart, true);
				scrollThumb.addEventListener('touchstart', eventStart, true);
			}

			document.addEventListener('mouseup', () => {
				document.removeEventListener('mousemove', innerDrag);
				document.removeEventListener('mousemove', scrollDrag);
			});

			document.addEventListener('touchend', () => {
				document.removeEventListener('touchmove', innerDrag);
				document.removeEventListener('touchmove', scrollDrag);
			});

			const scrollItem = (direction) => (e) => {
				e.preventDefault();
				const item = carousel.querySelector('.carousel-item');
				const itemToScroll = $(carousel).parent().hasClass('review-carousel') || $(carousel).parent().hasClass('instagram-carousel') ? 1 : 2;
				itemIndex = Math.round(inner.scrollLeft / item.clientWidth) + (direction === 'left' ? -(itemToScroll) : itemToScroll);
				left = itemIndex * item.clientWidth;
				if (left < 0) left = 0;
				else if (left > inner.scrollWidth - inner.clientWidth) left = inner.scrollWidth - inner.clientWidth;
				$(inner).animate({ scrollLeft: left }, 300);
				$(scrollThumb).animate({ left: `${(left / inner.scrollWidth) * 100}%` }, 300);
			};
		});
	}
});
