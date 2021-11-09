/* global screenLG */

import {
	validateEmail,
	validatePhone,
} from '~mod/utils';

$(window).on('load', function () {
	$('#bfcmSignupPopupModal').modal('show');
});

$('#bfcm-signup-popup__country').on('change', function () {
	const code = $(this).find(':selected').attr('data-code');
	$('.bfcm-signup-popup__country-label').html(`+${code}`);
});

$('.bfcm-signup-popup__form').on('submit', function (e) {
	e.preventDefault();
	let validEmail = false;
	let validPhone = false;

	const email = $(this).find('#bfcm-signup-popup__email');
	const phone = $(this).find('#bfcm-signup-popup__phone');

	$(this).find('.text-danger').addClass('d-none');

	if (validateEmail($(email).val())) {
		validEmail = true;
	}

	if (validatePhone($(phone).val())) {
		validPhone = true;
	}

	if (validEmail || validPhone) {
		$(this).addClass('d-none');
		$('.bfcm-signup-popup__thank-you').removeClass('d-none').addClass('d-flex');
		$('.bfcm-signup-popup__heading').addClass('invisible');
		if (window.innerWidth > screenLG) {
			$('.bfcm-signup-popup__heading').remove();
		}

		if (validEmail) {
			// code for send email to Backend
		} else if (validPhone) {
			// code for send phone to smsbump
		}
	} else {
		if (!validEmail) {
			$('#email-error').removeClass('d-none');
		}

		if (!validPhone && $(phone).val() !== '') {
			$('#phone-error').removeClass('d-none');
		}
	}
});
