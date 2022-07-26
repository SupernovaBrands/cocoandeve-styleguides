$(document).ready(function () {
	$('.video-loop').each(() => {
		$(this).find('.video-loop__action').on('click', function () {
			const video = $(this).parent().find('video').get(0);
			if (video.paused) {
				video.play();
				$(this).removeClass('video-loop__action--pause').addClass('video-loop__action--play');
			} else {
				video.pause();
				$(this).removeClass('video-loop__action--play').addClass('video-loop__action--pause');
			}
		});
	});
});
