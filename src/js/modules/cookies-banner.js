$(document).ready(function () {
	$('.cookies-banner #collapseCookieBanner').on('show.bs.collapse', function (e) {
		const parentEl = $('.cookies-banner');
		const navEl = $('.mobile-nav');
		parentEl.find('[data-toggle="collapse"]').addClass('d-none');
		parentEl.find('.use-default').removeClass('d-none');
		navEl.addClass('cookies-banner-show--expanded');
	});

	$('.cookies-banner .use-default').click(function () {
		const parentEl = $('.cookies-banner');
		const navEl = $('.mobile-nav');
		parentEl.find('#ads').prop('checked', true);
		parentEl.find('#performance').prop('checked', true);
		parentEl.addClass('d-none');
		navEl.removeClass('cookies-banner-show cookies-banner-show--expanded');
	});

	$('.cookies-banner .accept-cookie').click(function () {
		const parentEl = $('.cookies-banner');
		const navEl = $('.mobile-nav');
		parentEl.addClass('d-none');
		navEl.removeClass('cookies-banner-show cookies-banner-show--expanded');
	});
});
