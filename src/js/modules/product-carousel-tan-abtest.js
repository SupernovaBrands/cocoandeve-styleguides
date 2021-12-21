$('.product-carousel-tan-abtest').each((index, tabs) => {
	$(tabs).find('[data-toggle="tab"]').on('shown.bs.tab', function (event) {
		$('.carousel--scroll').each((index, carousel) => {
			carousel.classList.remove('d-none');
			carousel.dispatchEvent(new CustomEvent('adjustThumb'));
		});
	});
});
