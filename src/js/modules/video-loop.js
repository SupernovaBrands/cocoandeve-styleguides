$(document).ready(function () {
	$('.video-loop').each(() => {
		$(this).find('.video-loop__action').on('click', function () {
			const video = $(this).parent().find('video').eq(0)[0];
			if (video.paused) {
				video.play();
				$(this).attr('aria-label', 'Pause');
			} else {
				video.pause();
				$(this).attr('aria-label', 'Play');
			}
		});
	});
});
