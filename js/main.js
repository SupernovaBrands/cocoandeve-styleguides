$(document).ready(function () {
	window.showGrid = function () {
		jQuery('body').append('<style type="text/css">.gridoverlay{position:fixed;top:0;left:50%;transform:translateX(-50%);z-index:9999}.gridoverlay .col{height:100vh}.gridoverlay .col:before{content:"";display:block;background-color:rgba(0,123,255,0.3);height:100%}</style><div class="container gridoverlay"><div class="row"><div class="col"></div><div class="col"></div><div class="col"></div><div class="col"></div><div class="col d-none d-lg-block"></div><div class="col d-none d-lg-block"></div><div class="col d-none d-lg-block"></div><div class="col d-none d-lg-block"></div><div class="col d-none d-lg-block"></div><div class="col d-none d-lg-block"></div><div class="col d-none d-lg-block"></div><div class="col d-none d-lg-block"></div></div></div>');
	};

	if (/[?&]?show-grid=true[&]?/.test(window.location.search)) {
		window.showGrid();
	}

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

	// video modal
	// Gets the video src from the data-src on each button
	var $videoSrc;
	if ($('.video-card').length > 0) {
		$('.video-card picture').on('click',function() {
			$videoSrc = $(this).data('src');
		});
	}

	$('#videoCardModal').on('shown.bs.modal', function (e) {
		// set the video src to autoplay and not to show related video.
		$(this).find('video').find('source').attr('src', $videoSrc);
		$(this).find('video').get(0).load();
		$(this).find('video').get(0).play();
	});

	// stop playing the youtube video when I close the modal
	$('#videoCardModal').on('hide.bs.modal', function (e) {
		$(this).find('video').find('source').attr('src', '');
		$(this).find('video').get(0).load();
		$(this).find('video').get(0).pause();
	});

	//video carousel
	if ($('.carousel--centered').length > 0) {
		$('.carousel--centered').each( function() {
			if ($(this).find('.carousel-item').length > 1) {

				$(this).on('slide.bs.carousel', function () {
					$(this).find('a[data-slide]').removeClass('d-none');
				});

				var currentIndex, prevSlide, nextSlide;
				$(this).on('slid.bs.carousel', function () {
					currentIndex = $(this).find('.carousel-item.active').index();
					prevSlide = $(this).find('.carousel-item').eq(currentIndex).prev();
					nextSlide = $(this).find('.carousel-item').eq(currentIndex).next();

					$(this).find('.carousel-item-prev').removeClass('carousel-item-prev');
					$(this).find('.carousel-item-next').removeClass('carousel-item-next');

					if (prevSlide.length > 0) {
						prevSlide.addClass('carousel-item-prev');
					} else {
						$(this).find('a[data-slide="prev"]').addClass('d-none');
					}

					if (nextSlide.length > 0) {
						nextSlide.addClass('carousel-item-next');
					} else {
						$(this).find('a[data-slide="next"]').addClass('d-none');
					}
				});
			}
		});
	}

});
