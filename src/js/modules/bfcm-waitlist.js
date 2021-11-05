$('#bfcm-waitlist__form').on('submit', function () {
	$(this).addClass('d-none');
	$('.bfcm-waitlist__thank-you').removeClass('d-none');
	$('.bfcm-waitlist__title').text('You are in!');
});
