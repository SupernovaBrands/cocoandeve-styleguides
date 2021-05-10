$(document).ready(function () {
	// function filter results card based of data attribute category
	const filterResults = (category) => {
		// create temporary element only once time
		if ($('#temporaryResults').length === 0) {
			$('<div id="temporaryResults" class="d-none"></div>').appendTo('#real-results');
			// adding index for each element
			$('#real-results .carousel-item').each(function (index, element) {
				$(element).attr('data-index', index + 1);
			});
		}

		$('#real-results .nav-link').removeClass('active');
		$(`#real-results .nav-link[href='${category}']`).addClass('active');

		// remove class carousel item active
		$('#real-results .carousel-item.active').removeClass('active');

		if (category === '#all') {
			$('#temporaryResults .carousel-item').appendTo('#real-results .carousel-inner');
			// sorting element for all selection after element filtered per category
			const sorted = $('#real-results .carousel-inner .carousel-item').sort(function (a, b) {
				const contentA = parseInt($(a).data('index'), 10);
				const contentB = parseInt($(b).data('index'), 10);
				let sorting = 0;

				if (contentA < contentB) {
					sorting = -1;
				} else if (contentA > contentB) {
					sorting = 1;
				}
				return sorting;
			});
			$(sorted).appendTo('#real-results .carousel-inner');
			// $('#real-results .carousel-inner').html(sorted);
		} else {
			$('#temporaryResults .carousel-item').appendTo('#real-results .carousel-inner');
			$(`#real-results .carousel-item[data-category!='${category}']`).appendTo('#temporaryResults');
		}

		// add Class active for element filtered
		$('#real-results .carousel-item:first-child').addClass('active');
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
