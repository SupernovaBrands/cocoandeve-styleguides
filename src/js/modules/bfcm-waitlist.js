import {
	validateEmail,
	validatePhone,
} from '~mod/utils';

$('#bfcm-waitlist__form').on('submit', function (e) {
	e.preventDefault();
	const activeTab = $(this).find('.nav-link.active').data('tab');
	let validData = false;
	let validType = 'email';
	const email = $(this).find('#bfcm-waitlist__email');
	const phone = $(this).find('#bfcm-waitlist__phone');

	$(this).find('.text-danger').addClass('d-none');

	if (activeTab === 'email') {
		if (validateEmail($(email).val())) {
			validData = true;
		}
	} else if (activeTab === 'sms') {
		validType = 'phone';
		if (validatePhone($(phone).val())) {
			validData = true;
		}
	}

	const acceptedTerm = $('#bfcm-waitlist__toc').is(':checked');

	if (acceptedTerm && validData) {
		$(this).addClass('d-none');
		$('.bfcm-waitlist__thank-you').removeClass('d-none');
		$('.bfcm-waitlist__title').text($(this).data('thank-you-message'));

		if (validType === 'email') {
			// code for send email to Backend
		} else if (validType === 'phone') {
			// code for send phone to smsbump
		}
	} else {
		if (!acceptedTerm) {
			$('#toc-error').removeClass('d-none');
		}

		if (validType === 'email' && !validData) {
			$('#email-error').removeClass('d-none');
		} else if (validType === 'phone' && !validData) {
			$('#phone-error').removeClass('d-none');
		}
	}
});

$('#bfcm-waitlist__country').on('change', function () {
	const code = $(this).find(':selected').attr('data-code');
	$('.bfcm-waitlist__country-label').html(`+${code}`);
});
