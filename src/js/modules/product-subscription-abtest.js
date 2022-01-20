const subscriptionVariant = $('.product-variant--subscription');

$('#subscriptionCheckbox').on('change', function () {
	subscriptionVariant.toggleClass('product-variant--subscription-selected', this.checked);
	subscriptionVariant.find('input[type="radio"]').prop('checked', true);
});

$('input[name="product-variant"]').on('change', function () {
	subscriptionVariant.removeClass('product-variant--subscription-selected');
	if (!$(this).closest('.product-variant').hasClass('product-variant--subscription')) {
		$('#subscriptionCheckbox').prop('checked', false);
	}
});
