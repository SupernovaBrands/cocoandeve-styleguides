import '~mod/globals';

import React from 'react';
import ReactDOM from 'react-dom';
import Cart from '~comp/cart';

if ($('#cart-drawer').length > 0) {
	ReactDOM.render(
		React.createElement(Cart, {}, null),
		document.querySelector('#cart-drawer'),
		);
}

const navCategory = $('.nav-category');
if (navCategory.length > 0) {
	import(/* webpackChunkName: 'nav-category' */ '~mod/nav-category');
}

$(document).ready(function () {
	const screenLG = 992;

	window.showGrid = function () {
		jQuery('body').append('<style type="text/css">.gridoverlay{position:fixed;top:0;left:50%;transform:translateX(-50%);z-index:9999}.gridoverlay .col{height:100vh}.gridoverlay .col:before{content:"";display:block;background-color:rgba(0,123,255,0.3);height:100%}</style><div class="container gridoverlay"><div class="row"><div class="col"></div><div class="col"></div><div class="col"></div><div class="col"></div><div class="col d-none d-lg-block"></div><div class="col d-none d-lg-block"></div><div class="col d-none d-lg-block"></div><div class="col d-none d-lg-block"></div><div class="col d-none d-lg-block"></div><div class="col d-none d-lg-block"></div><div class="col d-none d-lg-block"></div><div class="col d-none d-lg-block"></div></div></div>');
	};

	if (/[?&]?show-grid=true[&]?/.test(window.location.search)) {
		window.showGrid();
	}

	const scrollToElement = (targetSelector) => {
		$('html, body').animate({ scrollTop: $(targetSelector).offset().top - 70 }, 600);
	};

	$('.scroll-to-element').on('click', function (e) {
		e.preventDefault();
		scrollToElement($(this).attr('href'));
	});

	if (window.location.hash === '#how-to' && $('#blog__how-to').length > 0) {
		scrollToElement('#blog__how-to');
	}

	// Search boxes
	const searchBox = $('.search-box');
	if (searchBox.length > 0) {
		searchBox.find('input').on('keyup', function () {
			const parent = $(this).parents('.search-box');
			if ($(this).val() !== '' && !parent.hasClass('search-box--filled')) {
				parent.addClass('search-box--filled');
			} else if ($(this).val() === '') {
				parent.removeClass('search-box--filled');
			}
		});
		searchBox.find('.search-box__close').on('click', function (e) {
			e.preventDefault();
			const parent = $(this).parents('.search-box');
			const input = parent.find('input');
			input.val('');
			parent.removeClass('search-box--filled');
		});
	}

	const sidebarCarousel = $('.carousel--sidebar');
	if (sidebarCarousel.length > 0) {
		if (window.innerWidth < screenLG) {
			sidebarCarousel.addClass('carousel');
		}

		$(window).on('resize', function () {
			if (window.innerWidth >= screenLG) {
				sidebarCarousel.removeClass('carousel');
			} else {
				sidebarCarousel.addClass('carousel');
			}
		});
	}

	// video modal
	// Gets the video src from the data-src on each button
	let $videoSrc;
	if ($('.video-card').length > 0) {
		$('.video-card picture').on('click', function () {
			$videoSrc = $(this).data('src');
		});
	}

	const toggleHTMLVideo = (videoEl, show, source) => {
		if (show) {
			videoEl.find('source').attr('src', source);
			videoEl.get(0).load();
			videoEl.get(0).play();
			videoEl.removeClass('d-none');
		} else {
			videoEl.find('source').attr('src', '');
			videoEl.get(0).load();
			videoEl.get(0).pause();
			videoEl.addClass('d-none');
		}
	};

	const toggleiFrameVideo = (iframeEl, show, source) => {
		if (show) {
			iframeEl.attr('src', source).removeClass('d-none');
		} else {
			iframeEl.attr('src', '').addClass('d-none');
		}
	};

	$('#videoCardModal').on('shown.bs.modal', function () {
		// set the video src to autoplay and not to show related video.
		if ($videoSrc.includes('.mp4')) {
			toggleiFrameVideo($(this).find('iframe'), false);
			toggleHTMLVideo($(this).find('video'), true, $videoSrc);
		} else {
			toggleHTMLVideo($(this).find('video'), false);
			toggleiFrameVideo($(this).find('iframe'), true, $videoSrc);
		}
	});

	// stop playing the youtube video when I close the modal
	$('#videoCardModal').on('hide.bs.modal', function () {
		toggleHTMLVideo($(this).find('video'), false);
		toggleiFrameVideo($(this).find('iframe'), false);
	});

	// video carousel
	if ($('.carousel--centered').length > 0) {
		$('.carousel--centered').each(function () {
			var _this = this;

			if ($(this).find('.carousel-item').length > 1) {
				const loop = $(this).find('.carousel-item').length > 5;
				const fourItems = $(this).hasClass('carousel--centered-four-items');

        // hide prev/next nav when no item prev class on page load
        if ($(this).find('.carousel-item-prev').length === 0) {
        	$(this).find('a[data-slide="prev"]').addClass('d-none');
        }

        if ($(this).find('.carousel-item-next').length === 0) {
        	$(this).find('a[data-slide="next"]').addClass('d-none');
        }

        $(this).on('slide.bs.carousel', function (e) {
        	$(this).find('a[data-slide]').removeClass('d-none');
        	if (e.direction === 'left') {
        		if (!fourItems || window.innerWidth < screenLG) {
        			$(this).find('.carousel-item-prev').addClass('carousel-item-prev').addClass('carousel-item-prev--out');

        			if ($(this).find('.carousel-item-next').next().length > 0) {
        				$(this).find('.carousel-item-next').next()
        				.addClass('carousel-item-next')
        				.removeClass('carousel-item-prev--out carousel-item-next--out');
        			} else if (loop) {
        				$(this).find('.carousel-item').first()
        				.addClass('carousel-item-next')
        				.removeClass('carousel-item-prev--out carousel-item-next--out');
        				$(this).find('.carousel-item').first().next()
        				.addClass('carousel-item-next--out')
        				.removeClass('carousel-item-prev--out');
        			}
        		} else {
              // Behaviour desktop carousel with 4 items left direction
              // current active element was changed to the next element so need to replace this element as prev
              var preActive = $(this).find(".carousel-item.active");
              var currentPrev = $(this).find(".carousel-item-prev--out");
              // removing all class unneeded before transition
              $(this).find(".carousel-item.carousel-item-prev--out, .carousel-item.carousel-item-next--out").removeClass('carousel-item-prev--out carousel-item-next--out carousel-item-right carousel-item-left');

              currentPrev.addClass('carousel-item-prev--out carousel-item-right');

              // remove class after transition bootstrap default transition is 0.6s
              setTimeout(function(){
              	currentPrev.removeClass('carousel-item-prev--out carousel-item-right');
              }, 600);

              preActive.removeClass('carousel-item-prev carousel-item-prev--out').addClass('carousel-item-prev');

              // handle detection previous element
              if (preActive.prev().length > 0){
              	preActive.prev().removeClass('carousel-item-prev carousel-item-prev--out').addClass('carousel-item-prev--out');
              } else {
              	$(this).find(".carousel-item").last().removeClass('carousel-item-prev carousel-item-prev--out').addClass('carousel-item-prev--out');
              }

              // handle detection next element
              preActive.next().removeClass('carousel-item-next--out carousel-item-prev--out');

              // checking for next 2 level, tried with nextAll(':lt(2)') doesn't work properly
              if (preActive.next().next().length > 0){
              	preActive.next().next().removeClass('carousel-item-next--out carousel-item-prev carousel-item-next carousel-item-prev--out').addClass('carousel-item-next');

                // checking for next 3 level, tried with nextAll(':lt(3)') doesn't work properly
                if (preActive.next().next().next().length > 0) {
                	preActive.next().next().next().removeClass('carousel-item-next--out carousel-item-prev carousel-item-next carousel-item-prev--out').addClass('carousel-item-next--out carousel-item-left');
                } else {
                	$(this).find(".carousel-item").first().removeClass('carousel-item-next--out carousel-item-prev carousel-item-next carousel-item-prev--out').addClass('carousel-item-next--out carousel-item-left');
                }
              } else if (preActive.next().length > 0) {
              	$(this).find(".carousel-item").first().removeClass('carousel-item-next--out carousel-item-prev carousel-item-next carousel-item-prev--out').addClass('carousel-item-next');
              	$(this).find(".carousel-item").first().next().removeClass('carousel-item-next--out carousel-item-prev carousel-item-next carousel-item-prev--out').addClass('carousel-item-next--out carousel-item-left');
              } else {
              	$(this).find(".carousel-item").first().next().removeClass('carousel-item-next--out carousel-item-prev carousel-item-next carousel-item-prev--out').addClass('carousel-item-next');
              	$(this).find(".carousel-item").first().next().next().removeClass('carousel-item-next--out carousel-item-prev carousel-item-next carousel-item-prev--out').addClass('carousel-item-next--out carousel-item-left');
              }

              // removing carousel-item-right class after transition invoked, remove from slide.bs.carousel event too late
              setTimeout(function(){
              	$(_this).find(".carousel-item-next--out.carousel-item-left, .carousel-item-next--out.carousel-item-right").removeClass('carousel-item-left carousel-item-right');
              }, 1);
            }
          } else {
          	if (!fourItems || window.innerWidth < screenLG) {
          		$(this).find('.carousel-item-next').addClass('carousel-item-next').addClass('carousel-item-next--out');
          		if ($(this).find('.carousel-item-prev').prev().length > 0) {
          			$(this).find('.carousel-item-prev').prev()
          			.addClass('carousel-item-prev')
          			.removeClass('carousel-item-prev--out carousel-item-next--out');
          		} else if (loop) {
          			$(this).find('.carousel-item').last()
          			.addClass('carousel-item-prev')
          			.removeClass('carousel-item-prev--out carousel-item-next--out');
          			$(this).find('.carousel-item').last().prev()
          			.addClass('carousel-item-prev--out')
          			.removeClass('carousel-item-next--out');
          		}
          	} else {
              // Behaviour desktop carousel with 4 items left direction
              // current active element was changed to the next element so need to replace this element as prev
              var preActive = $(this).find(".carousel-item.active");
              var currentNext = $(this).find(".carousel-item-next--out");
              // removing all class unneeded before transition
              $(this).find(".carousel-item.carousel-item-prev--out, .carousel-item.carousel-item-next--out").removeClass('carousel-item-prev--out carousel-item-next--out carousel-item-right carousel-item-left');

              currentNext.addClass('carousel-item-next--out carousel-item-left');

              // remove class after transition bootstrap default transition is 0.6s
              setTimeout(function(){
              	currentNext.removeClass('carousel-item-next--out carousel-item-left');
              }, 600);

              preActive.removeClass('carousel-item-next carousel-item-next--out').addClass('carousel-item-next');

              // handle detection next element
              if (preActive.next().length > 0){
              	preActive.next().removeClass('carousel-item-next carousel-item-next--out').addClass('carousel-item-next--out');
              } else {
              	$(this).find(".carousel-item").first().removeClass('carousel-item-next carousel-item-next--out').addClass('carousel-item-next--out');
              }

              // handle detection prev element
              preActive.prev().removeClass('carousel-item-prev--out carousel-item-next--out');

              if (preActive.prev().prev().length > 0){
              	preActive.prev().prev().removeClass('carousel-item-next--out carousel-item-prev carousel-item-next carousel-item-prev--out').addClass('carousel-item-prev');

              	if (preActive.prev().prev().prev().length > 0) {
              		preActive.prev().prev().prev().removeClass('carousel-item-next--out carousel-item-prev carousel-item-next carousel-item-prev--out').addClass('carousel-item-prev--out carousel-item-right');
              	} else {
              		$(this).find(".carousel-item").last().removeClass('carousel-item-next--out carousel-item-prev carousel-item-next carousel-item-prev--out').addClass('carousel-item-prev--out carousel-item-right');
              	}
              } else if (preActive.prev().length > 0) {
              	$(this).find(".carousel-item").last().removeClass('carousel-item-next--out carousel-item-prev carousel-item-next carousel-item-prev--out').addClass('carousel-item-prev');
              	$(this).find(".carousel-item").last().prev().removeClass('carousel-item-next--out carousel-item-prev carousel-item-next carousel-item-prev--out').addClass('carousel-item-prev--out carousel-item-right');
              } else {
              	$(this).find(".carousel-item").last().prev().removeClass('carousel-item-next--out carousel-item-prev carousel-item-next carousel-item-prev--out').addClass('carousel-item-prev');
              	$(this).find(".carousel-item").last().prev().prev().removeClass('carousel-item-next--out carousel-item-prev carousel-item-next carousel-item-prev--out').addClass('carousel-item-prev--out carousel-item-right');
              }

              // removing carousel-item-right class after transition invoked, remove from slide.bs.carousel event too late
              setTimeout(function(){
              	$(_this).find(".carousel-item-prev--out.carousel-item-right, .carousel-item-next--out.carousel-item-right").removeClass('carousel-item-left carousel-item-right');
              }, 1);
            }
          }
        });

let currentIndex;
let prevSlide;
let nextSlide;
let prev2Slide;
let next2Slide;
let carouselLength;

$(this).on('slid.bs.carousel', function () {
	if (fourItems && window.innerWidth >= screenLG) {
            // don't need to customisation for desktop for 4 items box as already handled on slide.bs.carousel
            return;
          }

          carouselLength = $(this).find('.carousel-item').length;
          currentIndex = $(this).find('.carousel-item.active').index();

          if (loop) {
          	prevSlide = $(this).find('.carousel-item').eq(currentIndex > 0 ? currentIndex - 1 : carouselLength - 1);
          	nextSlide = $(this).find('.carousel-item').eq(currentIndex < (carouselLength - 1) ? currentIndex + 1 : 0);
          	prev2Slide = $(this).find('.carousel-item').eq(currentIndex - 2 + (currentIndex < 1 ? carouselLength : 0));
          	next2Slide = $(this).find('.carousel-item').eq(currentIndex + 2 - (currentIndex > (carouselLength - 2) ? carouselLength : 0));

          	prevSlide.addClass('carousel-item-prev');
          	$(this).find('.carousel-item').not(prevSlide).removeClass('carousel-item-prev');
          	nextSlide.addClass('carousel-item-next');
          	$(this).find('.carousel-item').not(nextSlide).removeClass('carousel-item-next');
          	prev2Slide.addClass('carousel-item-prev--out');
          	$(this).find('.carousel-item').not(prev2Slide).removeClass('carousel-item-prev--out');
          	next2Slide.addClass('carousel-item-next--out');
          	$(this).find('.carousel-item').not(next2Slide).removeClass('carousel-item-next--out');
          	if (!next2Slide.length) {
          		$(this).find('.carousel-item:first-child').addClass('carousel-item-next--out');
          	}
          } else {
          	prevSlide = $(this).find('.carousel-item').eq(currentIndex).prev();
          	nextSlide = $(this).find('.carousel-item').eq(currentIndex).next();

          	$(this).find('.carousel-item-prev').removeClass('carousel-item-prev');
          	$(this).find('.carousel-item-next').removeClass('carousel-item-next');

          	if (prevSlide.length > 0) {
          		prevSlide.addClass('carousel-item-prev');
          		prevSlide.removeClass('carousel-item-prev--out');
          	} else {
          		$(this).find('a[data-slide="prev"]').addClass('d-none');
          	}

          	if (nextSlide.length > 0) {
          		nextSlide.addClass('carousel-item-next');
          		nextSlide.removeClass('carousel-item-next--out');
          	} else {
          		$(this).find('a[data-slide="next"]').addClass('d-none');
          	}
          }
        });
} else {
	$(this).find('a[data-slide]').addClass('d-none');
}
});
}

	//mobile menu toggle
	function mobileMenuToggler() {
		$('.mobile-nav').toggleClass('show');
		$('body').toggleClass('offcanvas-active');
	}

	$('.navbar-toggler').on('click', function(){
		mobileMenuToggler();
	});

	$('.mobile-nav').click(function(e){
		if (e.target !== e.currentTarget) return;
		mobileMenuToggler();
	});

	// header navbar detect scroll top or down
	var lastScrollTop, scrollTop = 0;
	var navbarEl = $('.main-header');
	var announceBar = $('.announcement-bar');
	var navbarHeight = navbarEl.height();

	$(window).on('scroll', function() {
		navbarEl.addClass('position-fixed');
		scrollTop = $(this).scrollTop();
		if (scrollTop < lastScrollTop) {
			navbarEl.removeClass('scrolled-down').addClass('scrolled-up');
			if (scrollTop <= 0) {
				//remove scrolled up for mobile menu show properly
				navbarEl.removeClass('position-fixed').removeClass('scrolled-up');
				if (announceBar.length > 0) {
					announceBar.removeClass('d-none');
				}
			}
		} else {
			if (scrollTop <= 0) {
				//safari fix bounce effect
				navbarEl.removeClass('position-fixed').removeClass('scrolled-up');
			} else {
				navbarEl.removeClass('scrolled-up').addClass('scrolled-down');
				if (announceBar.length > 0 && scrollTop > navbarHeight) {
					announceBar.addClass('d-none');
				}
			}
		}
		lastScrollTop = scrollTop;
	});

	// Cart drawer
	$('.manual-gwp__item .btn').on('click', function () {
		if ($(this).hasClass('btn-primary')) {
			$(this).removeClass('btn-primary');
			$(this).addClass('btn-outline-primary');
			$(this).text('Add');
		} else {
			$(this).addClass('btn-primary');
			$(this).removeClass('btn-outline-primary');
			$(this).text('Remove');
		}
	});

	// Change tab by select on real result sections
	$("select[data-toggle='tab']").on('change', function(){
		var targetTab = $(this).val();
		$(".real-results .tab-pane").removeClass('show active');
		$(`#${targetTab}[role='tabpanel']`).addClass('show active');
	});

  // handle swatch selection on product carousel
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
