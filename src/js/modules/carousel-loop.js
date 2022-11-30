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
				// move the last carousel item to the first element when direction left and active element is first index
				if (e.direction === 'right' && idx === 1) {
					$(this).find('.carousel-item:last-child').prependTo($(this).find('.carousel-inner'));
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

		/*
			fix direction left
			moving carousel item to the before active element when active element is on first index when load page
		*/
		$('.carousel--loop').each(function () {
			const activeIndex = $(this).find('.carousel-item.active').index();
			if (activeIndex === 0) {
				$(this).find('.carousel-item:last-child').prependTo($(this).find('.carousel-inner'));
			}
		});
	}
});
