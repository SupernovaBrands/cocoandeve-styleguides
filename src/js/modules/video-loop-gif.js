$(document).ready(function () {
	$('.video-loop-gif').each(() => {
		$(this).find('.video-loop__action').on('click', function () {
			if($(this).hasClass('video-loop__action--pause')) {
				$(this).removeClass('video-loop__action--play');
				$(this).addClass('video-loop__action--pause');
				$(this).closest('.video-loop').find('video').get(0).play();
			}
		});
	});
});
