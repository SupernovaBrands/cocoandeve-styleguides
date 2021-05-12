import snCart from '~mod/sn-cart';

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

$('.product-form').on('submit', function (e) {
	e.preventDefault();
	const data = $(this).find('.product-data').text().split('::')
		.map((t) => {
			const splits = t.split('|');
			const result = { id: splits.pop() };
			splits.forEach((element, index) => {
				result[`option${index + 1}`] = element;
			});
			return result;
		});

	const option1 = $(this).find('input[name="product-variant"]:checked').val();
	const option2 = $(this).find('input[name="product-color"]:checked').val();
	const quantity = parseInt($(this).find('input[name="quantity"]').val(), 10);

	const selected = data.find((d) => d.option1 === option1 && d.option2 === option2);

	if (selected) {
		snCart.addItem(parseInt(selected.id, 10), quantity);
	}
});

$('.product-swatch-desktop .swatch').on('click', function () {
	const attrFor = $(this).attr('for');
	$('.product-swatch-mobile .swatch').removeClass('border-primary');
	$(`.product-swatch-mobile .swatch[for=${attrFor}]`).addClass('border-primary');
});

$('.product-swatch-mobile .swatch').on('click', function () {
	$(this).siblings('.swatch').removeClass('border-primary');
	$(this).addClass('border-primary');
});

$('.product-swatch-mobile__collapse')
	.on('show.bs.collapse', function () {
		$(this).siblings('button[type=submit]').removeClass('d-none');
		$(this).siblings('button[type=button]').addClass('d-none');
	})
	.on('hide.bs.collapse', function () {
		$(this).siblings('button[type=submit]').addClass('d-none');
		$(this).siblings('button[type=button]').removeClass('d-none');
	});
