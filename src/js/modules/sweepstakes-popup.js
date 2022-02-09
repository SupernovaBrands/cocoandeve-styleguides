/* global screenLG */

import {
	validateEmail,
	validatePhone,
} from '~mod/utils';

$(window).on('load', function () {
	$('#sweepstakesModal').modal('show');
});

$('#sweepstakes-popup__country').on('change', function () {
	const code = $(this).find(':selected').attr('data-code');
	$('.sweepstakes-popup__country-label').html(`+${code}`);
});

$('.sweepstakes-popup__form').on('submit', function (e) {
	e.preventDefault();
	let validEmail = false;
	let validPhone = false;

	const email = $(this).find('#sweepstakes-popup__email');
	const phone = $(this).find('#sweepstakes-popup__phone');

	$(this).find('.text-danger').addClass('d-none');

	if (validateEmail($(email).val())) {
		validEmail = true;
	}

	if (validatePhone($(phone).val())) {
		validPhone = true;
	}

	if (validEmail || validPhone) {
		$(this).addClass('d-none');
		$('.sweepstakes-popup__thank-you').removeClass('d-none').addClass('d-flex');
		$('.sweepstakes-popup__heading').addClass('invisible');
		if (window.innerWidth > screenLG) {
			$('.sweepstakes-popup__heading').remove();
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
