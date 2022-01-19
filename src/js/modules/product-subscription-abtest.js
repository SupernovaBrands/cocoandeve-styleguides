$('#subscriptionCheckbox').on('change', function () {
	const subscriptionVariant = $('.product-variant--subscription');
	subscriptionVariant.find('input[type="radio"]').prop('checked', true);
	subscriptionVariant.find('label').toggleClass('bg-white', !this.checked);
	subscriptionVariant.find('.product-variant__title').toggleClass('d-none', this.checked);
	subscriptionVariant.find('.product-variant__title-subscription').toggleClass('d-none', !this.checked);
});

$('input[name="product-variant"]').on('change', function () {
	if (!$(this).closest('.product-variant').hasClass('product-variant--subscription')) {
		$('#subscriptionCheckbox').prop('checked', false);
		const subscriptionVariant = $('.product-variant--subscription');
		subscriptionVariant.find('.product-variant__title').removeClass('d-none');
		subscriptionVariant.find('.product-variant__title-subscription').addClass('d-none');
	}
});
