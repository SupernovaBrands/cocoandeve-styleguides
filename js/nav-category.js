$(document).ready(function () {
	const navCategory = $('.nav-category');
	if (navCategory.length > 0) {
		const linkSearch = navCategory.find('.link-search');
		if (linkSearch) {
			linkSearch.on('click', function () {
				if ($(this).hasClass('opened')) {
					$(this).removeClass('opened').addClass('text-primary');
					navCategory.find('.search-box').addClass('d-none');
				} else {
					$(this).addClass('opened').removeClass('text-primary');
					navCategory.find('.search-box').removeClass('d-none');
				}
			});
			navCategory.find('.search-box__close').on('click', function () {
				linkSearch.removeClass('opened').addClass('text-primary');
				$(this).parents('.search-box').addClass('d-none');
			});
		}
	}

	const navCategorySticky = $('.nav-category--sticky');
	if (navCategorySticky.length > 0) {
		const linkSearch = navCategorySticky.find('.link-search');
		if (linkSearch) {
			linkSearch.on('click', function (e) {
				e.preventDefault();
				if ($(this).hasClass('opened')) {
					$(this).removeClass('opened')
					navCategorySticky.find('.search-box').addClass('d-none');
					navCategorySticky.find('.nav').removeClass('d-none');
				} else {
					$(this).addClass('opened')
					navCategorySticky.find('.search-box').removeClass('d-none');
					navCategorySticky.find('.nav').addClass('d-none');
				}
				
			});
			navCategorySticky.find('.search-box__close').on('click', function (e) {
				e.preventDefault();
				$(this).removeClass('opened')
				navCategorySticky.find('.search-box').addClass('d-none');
				navCategorySticky.find('.nav').removeClass('d-none');
			});
		}
	}
});
