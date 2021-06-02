$(document).ready(function () {
	// function filter results card based of data attribute category
	const filterResults = (category) => {
		const $realResults = $('#real-results');
		$realResults.find('.nav-link.active').removeClass('active');
		$realResults.find(`.nav-link[href='${category}']`).addClass('active');

		// remove current active class on carousel item
		$realResults.find('.result-card.active').removeClass('active');

		if (category === '#all') {
			$realResults.find('.result-card.d-none').removeClass('d-none').addClass('carousel-item');
			$realResults.find('.result-card').first().addClass('active');
		} else {
			$realResults.find('.result-card.d-none').removeClass('d-none').addClass('carousel-item');
			$realResults.find(`.result-card[data-category!='${category}']`).addClass('d-none').removeClass('carousel-item');

			// make all active carousel items nears
			$realResults.find(".result-card:not('.d-none')").appendTo('#real-results .carousel-inner');
			$realResults.find(`.result-card[data-category='${category}']`).first().addClass('active');
		}
	};

	// Change tab by select on real result sections
	if ($("select[data-toggle='select']").length > 0) {
		$("select[data-toggle='select']").on('change', function () {
			const targetFilter = $(this).val();
			$(`#real-results .nav-tabs .nav-link[href='${targetFilter}']`).click();
		});
	}

	// listener tabs click to change the filter
	if ($('#real-results .nav-tabs').length > 0) {
		$('#real-results .nav-tabs .nav-link').click(function (e) {
			const href = $(this).attr('href');
			filterResults(href);
			e.preventDefault();
		});
	}
});
