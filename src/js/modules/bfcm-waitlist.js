import {
	validateEmail,
	validatePhone,
	copyToClipboard,
} from '~mod/utils';

$('#bfcm-waitlist__form').on('submit', function (e) {
	e.preventDefault();
	let validEmail = false;
	let validPhone = false;

	const email = $(this).find('#bfcm-waitlist__email');
	const phone = $(this).find('#bfcm-waitlist__phone');

	$(this).find('.text-danger').addClass('d-none');

	if (validateEmail($(email).val())) {
		validEmail = true;
	}

	if (validatePhone($(phone).val())) {
		validPhone = true;
	}

	const acceptedTerm = $('#bfcm-waitlist__toc').is(':checked');

	if (acceptedTerm && (validEmail || validPhone)) {
		$(this).addClass('d-none');
		$('.bfcm-waitlist__thank-you').removeClass('d-none');
		$('.bfcm-waitlist__title').text($(this).data('thank-you-message'));

		if (validEmail) {
			// code for send email to Backend
		} else if (validPhone) {
			// code for send phone to smsbump
		}
	} else {
		if (!acceptedTerm) {
			$('#toc-error').removeClass('d-none');
		}

		if (!validEmail && $(email).val() !== '') {
			$('#email-error').removeClass('d-none');
		}

		if (!validPhone && $(phone).val() !== '') {
			$('#phone-error').removeClass('d-none');
		}
	}
});

$('#bfcm-waitlist__country').on('change', function () {
	const code = $(this).find(':selected').attr('data-code');
	$('.bfcm-waitlist__country-label').html(`+${code}`);
});

$('.bfcm-waitlist__shares--copy').on('click', function () {
	copyToClipboard(this, $(this).data('copy'));
});
