$(document).ready(function(){
  var productCarousel = $('.product-carousel .owl-carousel');
  productCarousel.owlCarousel({
    items:1,
    stagePadding: 50,
    nav: true,
    navText: [
      '<span class="owl-prev__icon sni sni__chevron-prev" aria-hidden="true"></span>',
      '<span class="owl-next__icon sni sni__chevron-next" aria-hidden="true"></span>'
    ],
    lazyLoad:true,
    lazyLoadEager: true,
    loop:true,
    dots: false,
    margin: 5,
    center: true,
    autoHeight: true,
    responsive:{
      768:{
        items: 4,
        stagePadding: 20
      }
    }
  });

  // listener click on swatch element to change value and label
  $(".item-swatch .item span").click(function(){
    var parent =$(this).parent();
    var form = $(this).parents('form');
    if (parent.data('available') == 'available') {
      form.find('.item').removeClass('active');
      form.find('input[name="id"]').val($(this).data('id'));
      parent.addClass('active');
      form.find('.shop-swatch label span').text($(this).data('val'));
    }
  })
});