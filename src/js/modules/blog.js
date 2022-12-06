$('.blog-nav-tags a').on('click', function (e) {
	if (e.target.id === 'how-to') {
		e.preventDefault();
		$('.how-to-wrapper').removeClass('d-none');
		$('.article-list-wrapper').addClass('d-none');
	}
});
