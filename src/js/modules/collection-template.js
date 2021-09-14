const updateFormButton = (form) => {
	const selected = form.find('.variant-swatch.border-primary');
	if (selected.hasClass('waitlist') && $('.collection-swatch__waitlist').hasClass('d-none')) {
		$('.collection-swatch__waitlist').removeClass('d-none');
		form.find('.collection-swatch__price div').removeClass('d-flex').addClass('d-none');
		form.find('.collection-swatch__price button').addClass('d-none');
	} else {
		$('.collection-swatch__waitlist').addClass('d-none');
		form.find('.collection-swatch__price div').removeClass('d-none').addClass('d-flex');
		form.find('.collection-swatch__price button').removeClass('d-none');
	}

	if (selected.hasClass('oos')) {
		form.find('button[type=submit]').text('Out of Stock').attr('disabled', 'disabled');
	} else {
		form.find('button[type=submit]').text('Add to Cart').removeAttr('disabled');
	}
};

$('.variant-swatch').on('click', function () {
	const attrFor = $(this).data('value');
	const swatchContainers = $(this).closest('form').find('.product-swatch');

	swatchContainers.each((i, el) => {
		const swatches = $(el).find('.variant-swatch');
		const selected = swatches.filter(`[data-value=${attrFor}]`);
		console.log('selected', selected);
		if (selected.length > 0) {
			swatches.removeClass('border-primary');
			selected.addClass('border-primary');
			$(el).find('p').addClass('d-none')
				.filter(`.swatch-label-${attrFor}`)
				.removeClass('d-none');
		}
	});

	updateFormButton($(this).closest('form'));
});
