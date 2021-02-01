$(document).ready(function () {
  const navCategory = $('.nav-category');
  if (navCategory.length > 0) {
    const linkSearch = navCategory.find('.link-search');
    if (linkSearch) {
      navCategory.find('.link-search').on('click', function () {
        const searchBox = navCategory.find('.search-box');
        if (searchBox.length) {
          searchBox.removeClass('d-none');
        }
      });
      navCategory.find(".search-box__close").on('click', function() {
        const parent = $(this).parents(".search-box");
        if (parent.length) {
          parent.addClass('d-none');
        }
      })
    }
  }
});
