$(document).ready(function () {
  const navCategory = $('.nav-category');
  if (navCategory.length > 0) {
    const linkSearch = navCategory.find('.link-search');
    if (linkSearch) {
      navCategory.find('.link-search').on('click', function () {
        navCategory.find('.search-box').removeClass('d-none');
      });
      navCategory.find(".search-box__close").on('click', function() {
        $(this).parents(".search-box").addClass('d-none');
      });
    }
  }
});
