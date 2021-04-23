$('.product-image-carousel__indicator__item').on('click', function () {
	const carousel = $(this).data('target');
	const selectedIndex = $(this).data('index');
	$(carousel).carousel(selectedIndex - 1);
	$('.product-image-carousel__indicator__item button').removeClass('border-primary').addClass('border-white');
	$(this).find('button').addClass('border-primary').removeClass('border-white');

	const parent = $(this).closest('.carousel');
	const index = $(this).index();
	const active = parent.find('.active').index();
	const total = parent.find('.carousel-item').length;
	if (total > 5) {
		if ((index - active === 4) && (index < total - 1)) {
			$(parent).carousel(active + 1);
		}
		if (index === active && active !== 0) {
			$(parent).carousel(active - 1);
		}
	}
});

$('.product-image-carousel__indicator').on('slide.bs.carousel', function (e) {
	const $e = $(e.relatedTarget);
	const index = $e.index();
	const totalItems = $(this).find('.carousel-item').length;

	const prevButton = $(this).children('button.sni__chevron-up');
	const nextButton = $(this).children('button.sni__chevron-down');

	if (index === 0) {
		prevButton.attr('disabled', 'disabled');
	} else {
		prevButton.removeAttr('disabled');
	}
	if (index + 5 === totalItems) {
		nextButton.attr('disabled', 'disabled');
	} else {
		nextButton.removeAttr('disabled');
	}
});

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
