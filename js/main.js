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
	if ($('.video-card--icon').length > 0) {
		$('.video-card--icon').on('click',function() {
			$videoSrc = $(this).data('src');
		});
	}

	$('#videoCardModal').on('shown.bs.modal', function (e) {
		// set the video src to autoplay and not to show related video.
		$('#videoCardModal video source').attr('src', $videoSrc);
		$('#videoCardModal video').get(0).play();
	})
	// stop playing the youtube video when I close the modal
	$('#videoCardModal').on('hide.bs.modal', function (e) {
		$('#videoCardModal video').get(0).pause();
		$('#videoCardModal video source').attr('src', '');
	});


	//video carousel
	//3 items
	if ($('#carouselVideo3').length > 0) {

		$('#carouselVideo3').on('slide.bs.carousel', function () {
			console.log('slide event');
			$('#carouselVideo3 a[data-slide]').removeClass('d-none');
			$('#carouselVideo3 .carousel-item-prev').removeClass('carousel-item-prev');
			$('#carouselVideo3 .carousel-item-next').removeClass('carousel-item-next');

			/*//test transition
			var currentIndex = $('#carouselVideo3 .carousel-item.active').index();
			$('#carouselVideo3 .carousel-item').eq(2).addClass('carousel-item-left').addClass('carousel-item-left--out');
			//$('#carouselVideo3 .carousel-item').eq(0).addClass('carousel-item-right').addClass('carousel-item-right--out');
			*/
		});

		$('#carouselVideo3').on('slid.bs.carousel', function () {
			console.log('slid event');
			var currentIndex = $('#carouselVideo3 .carousel-item.active').index();
			var prevSlide = $('#carouselVideo3 .carousel-item').eq(currentIndex).prev();
			var nextSlide = $('#carouselVideo3 .carousel-item').eq(currentIndex).next();

			//test transition
			/*
			$('#carouselVideo3 .carousel-item').eq(2).removeClass('carousel-item-left--out').removeClass('carousel-item-left');
			//$('#carouselVideo3 .carousel-item').eq(0).removeClass('carousel-item-right--out').removeClass('carousel-item-right');
			*/

			if (prevSlide.length > 0) {
				prevSlide.addClass('carousel-item-prev');
			} else {
				$('#carouselVideo3 a[data-slide="prev"]').addClass('d-none');
			}

			if (nextSlide.length > 0) {
				nextSlide.addClass('carousel-item-next');
			} else {
				$('#carouselVideo3 a[data-slide="next"]').addClass('d-none');
			}
		});
	}

	//2 items


});
