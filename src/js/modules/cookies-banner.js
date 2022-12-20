/* global screenLG */

function initCookieBanner(el) {
	el.find('#collapseCookieBanner').on('show.bs.collapse', function () {
		const parentEl = el;
		parentEl.find('[data-toggle="collapse"]').addClass('d-none');
		parentEl.find('.use-default').removeClass('d-none');
		$('body').addClass('cookies-banner-show--expanded');
	});

	el.find('.use-default').click(function () {
		const parentEl = el;
		if (parentEl.find('#ads').prop('checked') && parentEl.find('#performance').prop('checked')) {
			parentEl.find('.accept-cookie').click();
		} else {
			parentEl.find('#ads').prop('checked', true);
			parentEl.find('#performance').prop('checked', true);
		}
	});

	el.find('.accept-cookie').click(function () {
		el.addClass('d-none');
		$('body').removeClass('cookies-banner-show cookies-banner-show--expanded');
	});

	setTimeout(function () {
		el.removeClass('d-none');
		$('body').addClass('cookies-banner-show');
	}, 2000); // same with shopify theme showing banner after 2 seconds
}

$(document).ready(function () {
	if (window.innerWidth > screenLG) {
		initCookieBanner($('.cookies-banner:not(.cookies-banner--bottom)'));
	} else {
		initCookieBanner($('.cookies-banner--bottom'));
	}
});
