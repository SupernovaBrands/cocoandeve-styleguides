/* global screenLG */

$('.btn-choose__swatch--abtest').click(function () {
	if (window.innerWidth < screenLG) {
		$('#collectionSwatchAbtest').modal({
			show: true,
		});
	} else {
		$('#collectionSwatchModal').modal({
			show: true,
		});
	}
});

$('.product-form .variant-swatch').on('click', function () {
	const attrFor = $(this).data('value');
	const swatchContainers = $(this).closest('form').find('.product-swatch');

	swatchContainers.each((i, el) => {
		const swatches = $(el).find('.variant-swatch');
		const selected = swatches.filter(`[data-value=${attrFor}]`);
		if (selected.length > 0) {
			swatches.removeClass('border-primary');
			selected.addClass('border-primary');
			$(el).find('p').addClass('d-none')
				.filter(`.swatch-label-${attrFor}`)
				.removeClass('d-none');
		}
	});
});
