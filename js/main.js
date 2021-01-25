$(document).ready(function () {
	// Search boxes
	const searchBox = $('.search-box');
	if (searchBox.length > 0) {
		searchBox.find('input').on('keyup', function () {
			const parent = $(this).parents('.search-box');
			if ($(this).val() !== '' && !parent.hasClass('search-box--filled')) {
				parent.addClass('search-box--filled');
			} else if ($(this).val() === '') {
				parent.removeClass('search-box--filled');
			}
		});
		searchBox.find('.search-box__close').on('click', function (e) {
			e.preventDefault();
			const parent = $(this).parents('.search-box');
			const input = parent.find('input');
			input.val('');
			parent.removeClass('search-box--filled');
		});
	}

	// Carousel Post Card
	const postCardCarousel = $('#postCardCarousel')
	const postCardCarouselCaptions = $('#postCardCarouselCaptions')
	if (postCardCarousel.length > 0) {
		postCardCarouselCaptions.carousel('pause')
		postCardCarousel.on('slid.bs.carousel', function(evt) {
			postCardCarouselCaptions.carousel(evt.to)
		})
	}

	// Carousel Sidebar
	const sidebarCarousel = $('#sidebarCarousel')
	sidebarCarousel.find('.carousel-item').each(function(){
	  	var next = $(this).next();
	  	if (!next.length) {
	    	next = $(this).siblings(':first');
	  	}
	  	next.children(':first-child').clone().appendTo($(this));

	  	if (window.innerWidth > 992) {
			sidebarCarousel.carousel('pause')
		}
	});
});
