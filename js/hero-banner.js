$(document).ready(function(){
  var hero = $('.hero-carousel');
  var heroOwl = hero.find('.owl-carousel').owlCarousel({
      items:1,
      nav: false,
      navText: [],
      lazyLoad:true,
      lazyLoadEager: true,
      loop:true,
      margin:0,
      slideSpeed: 500,
      dotsContainer: '.carousel-indicators'
  });

  hero.find(".carousel-indicators li").click(function(){
    heroOwl.trigger('to.owl.carousel', [$(this).index(), 500]);
  });
});