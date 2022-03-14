$('#newsletterModal .newsletter-bigger-popup__form').on('submit', function (e) {
	e.preventDefault();
	$('#newsletterModal .newsletter-bigger-popup__form').addClass('d-none');
	$('#newsletterModal .newsletter-bigger-popup__completed').addClass('d-flex');
});
