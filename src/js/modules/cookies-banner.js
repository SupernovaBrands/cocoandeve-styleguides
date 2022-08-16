$(document).ready(function () {
	$('.cookies-banner #collapseCookieBanner').on('show.bs.collapse', function () {
		const parentEl = $('.cookies-banner');
		parentEl.find('[data-toggle="collapse"]').addClass('d-none');
		parentEl.find('.use-default').removeClass('d-none');
		$('body').addClass('cookies-banner-show--expanded');
	});

	$('.cookies-banner .use-default').click(function (event) {
		const parentEl = $('.cookies-banner');
		event.preventDefault();
		if (parentEl.find('#ads').prop('checked') && parentEl.find('#performance').prop('checked')) {
			$('.cookies-banner .accept-cookie').click();
		} else {
			parentEl.find('#ads').prop('checked', true);
			parentEl.find('#performance').prop('checked', true);
		}
	});

	$('.cookies-banner .accept-cookie').click(function () {
		$('.cookies-banner').addClass('d-none');
		$('body').removeClass('cookies-banner-show cookies-banner-show--expanded');
	});

	setTimeout(function () {
		$('.cookies-banner').removeClass('d-none');
		$('body').addClass('cookies-banner-show');
	}, 2000); // same with shopify theme showing banner after 2 seconds
});
