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



	//video modal
	// Gets the video src from the data-src on each button
	var $videoSrc;
	$('.video-card--icon').on('click',function() {
		$videoSrc = $(this).data('src');
	});

	$('#videoCardModal').on('shown.bs.modal', function (e) {
		// set the video src to autoplay and not to show related video.
		$('#videoCardModal video source').attr('src', $videoSrc);
		$('#videoCardModal video').get(0).play();
	})
	// stop playing the youtube video when I close the modal
	$('#videoCardModal').on('hide.bs.modal', function (e) {
		$('#videoCardModal video source').attr('src', $videoSrc);
		$('#videoCardModal video').get(0).pause();
	})



});
