$(document).ready(function () {
	// handle swatch selection on product carousel
	$('.variant-swatch .variant-swatch__item span').click(function () {
		const parent = $(this).parent();
		const mainParent = $(this).parents('.swatch-overlay');

		if (parent.data('available') === 'available') {
			mainParent.find('.variant-swatch__item').removeClass('active');
			mainParent.find('button').data('variant-id', $(this).data('id'));
			parent.addClass('active');
			mainParent.find('span[data-swatch-label]').text($(this).data('val'));
		}
	});

	$('.product-carousel button.add-to-cart').click(function () {
		const _ = this;
		const prevContent = $(this).html();
		$(this).attr('disabled', 'disabled').html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>');

		// remove spinner after 1 seconds, remove spinner should be after process xhr add to cart completed;
		setTimeout(function () {
			$(_).removeAttr('disabled').html(prevContent).blur();
		}, 1000);
	});
});
