$(document).ready(function () {
  const navCategory = $('.nav-category');
  if (navCategory.length > 0) {
    navCategory.find('.link-search').on('click', function () {
      const searchBox = $('.search-box');
      if (searchBox.length) {
        searchBox.removeClass('d-none');
      }
    });
    $(".search-box__close").on('click', function() {
      const parent = $(this).parents(".search-box");
      if (parent.length) {
        parent.addClass('d-none');
      }
    })
  }
});
