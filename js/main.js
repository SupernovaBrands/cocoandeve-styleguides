$(document).ready(function () {
	// Search boxes
	const searchBox = $('.search-box');
	if (searchBox.length > 0) {
		searchBox.find('input').on('keyup', function () {
			const parent = $(this).parents('.search-box');
			if ($(this).val() !== '' && !parent.hasClass('dirty')) {
				parent.addClass('dirty');
			} else if ($(this).val() === '') {
				parent.removeClass('dirty');
			}
		});
		searchBox.find('.search-box-close').on('click', function (e) {
			e.preventDefault();
			const parent = $(this).parents('.search-box');
			const input = parent.find('input');
			input.val('');
			parent.removeClass('dirty');
		});
	}
});
