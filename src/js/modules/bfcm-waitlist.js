import {
	validateEmail,
	validatePhone,
	copyToClipboard,
} from '~mod/utils';

const validForm = {
	email: false,
	phone: false,
};

const validateForm = () => {
	const $form = $('#bfcm-waitlist__form');
	const email = $form.find('#bfcm-waitlist__email');
	const phone = $form.find('#bfcm-waitlist__phone');
	const acceptedTerm = $('#bfcm-waitlist__toc').is(':checked');
	validForm.email = false;
	validForm.phone = false;

	if (validateEmail($(email).val())) {
		validForm.email = true;
	}

	if (validatePhone($(phone).val())) {
		validForm.phone = true;
	}

	$form.find('.text-danger').addClass('d-none');

	if (acceptedTerm && (validForm.email || validForm.phone)) {
		$('#bfcm-waitlist__submit').prop('disabled', false);
		return true;
	}

	$('#bfcm-waitlist__submit').prop('disabled', true);
	if (!acceptedTerm) {
		$('#toc-error').removeClass('d-none');
	}

	if (!validForm.email && $(email).val() !== '') {
		$('#email-error').removeClass('d-none');
	}

	if (!validForm.phone && $(phone).val() !== '') {
		$('#phone-error').removeClass('d-none');
	}
	return false;
};

$('#bfcm-waitlist__form').on('submit', function (e) {
	e.preventDefault();

	if (validateForm()) {
		$(this).addClass('d-none');
		$('.bfcm-waitlist__thank-you').removeClass('d-none');
		$('.bfcm-waitlist__title').text($(this).data('thank-you-message'));

		if (validateForm.email) {
			// send email to bluecore and internal backend
		}

		if (validateForm.phone) {
			// send phone to bluecore
		}
	}
});

// listener of elements
$('#bfcm-waitlist__country').on('change', function () {
	const code = $(this).find(':selected').attr('data-code');
	$('.bfcm-waitlist__country-label').html(`+${code}`);
});

$('.bfcm-waitlist__shares--copy').on('click', function () {
	copyToClipboard(this, $(this).data('copy'));
});

$('#bfcm-waitlist__phone, #bfcm-waitlist__email, #bfcm-waitlist__toc').on('change', function () {
	validateForm();
});
