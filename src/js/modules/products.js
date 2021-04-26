import {
	waitFor,
} from '~mod/utils';

$('.product-image-carousel__indicator__item').on('click', function () {
	const carousel = $(this).data('target');
	const index = $(this).data('index');
	$(carousel).carousel(index - 1);
});

if ($('.yotpo-main-widget').length > 0) {
	waitFor(() => window.yotpo !== undefined, () => {
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
	});
}

if ($('.product-collapse__toggle').length > 0) {
	const handleToggle = function (open, el) {
		const toggle = el.siblings('.product-collapse__toggle');
		if (open) {
			toggle.addClass('sni__minus').removeClass('sni__plus');
		} else {
			toggle.addClass('sni__plus').removeClass('sni__minus');
		}
	};
	$('.product-collapse')
		.on('show.bs.collapse', function () { handleToggle(true, $(this)); })
		.on('hide.bs.collapse', function () { handleToggle(false, $(this)); });
}
