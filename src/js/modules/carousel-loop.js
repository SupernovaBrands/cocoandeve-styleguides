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
		const totalItems = $(inner).find('.carousel-item').length || 1;
		// eslint-disable-next-line no-param-reassign
		thumb.style.width = `${((inner.clientWidth / totalItems) / inner.clientWidth) * 100}%`;
		// eslint-disable-next-line no-param-reassign
		thumb.style.left = `${(inner.scrollLeft / inner.scrollWidth) * 100}%`;
		/*
		if (inner.clientWidth === inner.scrollWidth) {
			inner.classList.add('justify-content-center');
			scrollParent.classList.add('d-none');
		} else {
			inner.classList.remove('justify-content-center');
			scrollParent.classList.remove('d-none');
		}
		*/
	};

	if ($('.carousel--scroll-single').length > 0) {
		$('.carousel--scroll-single').each((index, carousel) => {
			const inner = carousel.querySelector('.carousel-inner');
			const scrollbar = carousel.querySelector('.scrollbar');
			const scrollThumb = carousel.querySelector('.scrollbar--thumb');
			const totalItems = $(inner).find('.carousel-item').length || 1;

			if (scrollbar) {
				carousel.addEventListener('adjustThumb', () => { adjustScrollThumb(scrollThumb, inner, scrollbar.parentNode); });
				if (scrollThumb) adjustScrollThumb(scrollThumb, inner, scrollbar.parentNode);
			}

			console.log('carousel', carousel, scrollbar);

			let x = 0;
			let left = 0;

			const scrollbarWidth = scrollbar.clientWidth;
			const gap = 15;
			const leftTh = gap + 1;
			const rightTh = scrollbar.clientWidth + gap;
			const slideWidth = scrollbarWidth / totalItems;
			let activeSlide = 0;

			const innerDrag = (e) => {
				inner.scrollLeft = left - (e.pageX || e.touches[0].pageX) + x;
				if (scrollThumb) scrollThumb.style.left = `${(inner.scrollLeft / inner.scrollWidth) * 100}%`;
				// checkButton();
			};

			const scrollDrag = (e) => {
				console.log('e.touches[0].pageX', e.touches[0].pageX);
				const pageX = (e.pageX || e.touches[0].pageX);
				let pos = pageX - leftTh;
				if (pageX < leftTh) pos = 0;
				else if (pageX > (rightTh - scrollThumb.clientWidth)) pos = scrollbarWidth - scrollThumb.clientWidth;
				const slidePos = Math.floor(pos / slideWidth);
				console.log('pos a', pos, activeSlide);
				if (scrollThumb) scrollThumb.style.left = `${(pos / scrollbarWidth) * 100}%`;
				if (activeSlide !== slidePos) {
					activeSlide = slidePos;
					$(carousel).carousel('next');
				}
				// checkButton();
			};

			inner.addEventListener('scroll', () => {
				if (scrollThumb) scrollThumb.style.left = `${(inner.scrollLeft / inner.scrollWidth) * 100}%`;
				// checkButton();
			});

			const eventStart = (e) => {
				e.preventDefault();
				x = (e.pageX || e.touches[0].pageX);
				console.log('event start x', x);
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
		});
	}
});
