$(document).ready(function () {

  if ($('.carousel--loop').length > 0) {

    // moving element carousel item depending of items per slide
    // triggered by bootstrap carousel slide event (when transition started)
    $('.carousel--loop').on('slide.bs.carousel', function (e) {
      var $e = $(e.relatedTarget);
      var idx = $e.index();
      var itemsPerSlide = $(this).data('slide-number') ? $(this).data('slide-number') : 3;
      var totalItems = $(this).find('.carousel-item').length;

      if (screenLG > window.innerWidth) {
        // set 1 for mobile
        itemsPerSlide = 2;
      }

      if ($(this).find('.carousel--centered').length > 0) {
        // add 1 element for negative offset of carousel inner
        idx += 1;

        // special case for carousel centered we would need plus 1, as we have negative offset x on carousle-inner
        if (e.direction == 'right') {
          $(this).find(`.carousel-item:nth-child(${$(this).find('.carousel-item.active').index() + 1 + itemsPerSlide})`).addClass('carousel-item--last');
        }
      }
      if (idx >= totalItems-(itemsPerSlide-1)) {
        var it = itemsPerSlide - (totalItems - idx);
        for (var i=0; i<it; i++) {
          if (e.direction=="left") {
            $(this).find('.carousel-item').eq(i).appendTo($(this).find('.carousel-inner'));
          } else {
            $(this).find('.carousel-item').eq(0).appendTo($(this).find('.carousel-inner'));
          }
        }
      }
    });

    $(".carousel--loop").on('slid.bs.carousel', function(e) {
      $(this).find(".carousel-item--last").removeClass('carousel-item--last');
    });
  }

});
