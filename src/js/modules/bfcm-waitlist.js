$('#bfcm-waitlist__form').on('submit', function (e) {
	$(this).addClass('d-none');
	$('.bfcm-waitlist__thank-you').removeClass('d-none');
	$('.bfcm-waitlist__title').text('You are in!');
	e.preventDefault();
});
