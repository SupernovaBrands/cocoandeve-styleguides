$(document).ready(function(){
  var resultCarousel = $('.real-results .owl-carousel');
  resultCarousel.owlCarousel({
    items:1,
    stagePadding: 50,
    nav: true,
    navText: [
    '<span class="owl-prev__icon bg-sm-primary-light sni sni__chevron-prev" aria-hidden="true"></span>',
    '<span class="owl-next__icon bg-sm-primary-light sni sni__chevron-next" aria-hidden="true"></span>'
    ],
    lazyLoad:true,
    lazyLoadEager: true,
    loop:true,
    dots: false,
    margin: 15,
    center: true,
    autoHeight: true,
    responsive:{
      768:{
        items: 4,
        stagePadding: 20
      }
    }
  });

  $("select[data-toggle='tab']").on('change', function(){
    var targetTab = $(this).val();
    $(".real-results .tab-pane").removeClass('show active');
    $(`#${targetTab}[role='tabpanel']`).addClass('show active');
  })
});
