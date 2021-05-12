import {
	waitFor,
} from '~mod/utils';

waitFor(() => window.yotpo !== undefined, () => {
	if ($('.yotpo-main-widget').length > 0) {
		const title = $('.yotpo-main-widget').siblings('h2').detach();
		$('.yotpo-main-widget .font-color-gray-darker').removeClass('font-color-gray-darker');
		$('.write-review-button .yotpo-icon').remove();
		$('.write-review-button').addClass('btn btn-lg btn-primary').removeClass('yotpo-default-button yotpo-icon-btn write-question-review-button write-button write-review-button');
		$('.write-question-review-button-text').addClass('text-white');
		$('.write-question-button').addClass('d-none');

		$('.main-widget').addClass('row');
		$('.bottom-line-items-container')
			.closest('.yotpo-display-wrapper')
			.addClass('col-12 col-lg-5 px-lg-g')
			.prepend(title)
			.append($('.write-question-review-buttons-container').detach())
			.append($('.write-review-wrapper.write-form').closest('form').detach());

		$('.yotpo-nav-content').addClass('col-12 col-lg-7 px-lg-g');

		$('.write-review-wrapper.write-form .yotpo-default-button')
			.addClass('bg-primary rounded');
	}

	if ($('.yotpo.bottomLine.show-avg-score').length > 0) {
		$('.yotpo.bottomLine.show-avg-score').each((i, el) => {
			const stars = $(el).find('.yotpo-stars');
			const rating = stars.find('.sr-only').text().split(' ')[0];
			stars.after(`<span class="font-size-sm ml-1">${rating}</span>`);
		});
	}
});
