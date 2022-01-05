$('.product-carousel-tan-abtest').each((index, tabs) => {
	$(tabs).find('[data-toggle="tab"]').on('shown.bs.tab', function () {
		$('.carousel--scroll').each((index2, carousel) => {
			carousel.classList.remove('d-none');
			carousel.dispatchEvent(new CustomEvent('adjustThumb'));
		});
	});
});
