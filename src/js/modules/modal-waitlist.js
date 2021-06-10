$(document).ready(function () {
	$('#productWaitlist form').on('submit', function (e) {
		const el = $(this);
		const email = el.find('input[name="email"]').val() || '';
		const country = el.find('select[name="country"]').val() || '';
		const phoneNum = el.find('input[name="phone"]').val() || '';
		const tos = el.find('input[name="tos"]').prop('checked');

		const emailValid = email !== '' && window.validateEmail(email);
		const countryValid = country !== '';
		const phoneValid = phoneNum !== '' && window.validatePhone(phoneNum);
		let validForm = ((emailValid || (countryValid && phoneValid)) && tos);

		if (!emailValid && !phoneValid && !countryValid) { el.find('.email-error').removeClass('d-none'); }
		if (!emailValid && !phoneValid) { el.find('.phone-error').text('Please enter a valid phone number').removeClass('d-none'); }
		if (!emailValid && phoneValid && !countryValid) { el.find('.phone-error').text('Please enter a country').removeClass('d-none'); }
		if (!tos) { el.find('.terms-error').removeClass('d-none'); }

		if (email !== '' && phoneNum !== '' && country !== '' && !phoneValid) {
			validForm = false;
			el.find('.phone-error').text('Please enter a valid phone number').removeClass('d-none');
		}

		if (!validForm) { e.preventDefault(); return; }

		if (emailValid || phoneValid) {
			// const productId = $(this).data('product-id');
			// will call function to send data to bluecore on shopify theme
		}

		$('#productWaitlist .subscribed').removeClass('d-none');
		$(this).addClass('d-none');
		$(this).parents('.modal-content').find('.modal-header p').addClass('d-none');
		e.preventDefault();
		e.preventDefault();
	});

	$('#productWaitlist form .custom-select').on('change', function () {
		const val = $(this).val();
		const maskingEl = $('#productWaitlist .masking-select');
		const phoneCode = $(this).find(`option[value='${val}']`).data('code');
		maskingEl.text(`+${phoneCode}`).addClass('selected');
		$(this).trigger('mouseleave');
	});
});
