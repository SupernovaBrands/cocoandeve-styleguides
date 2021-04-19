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

  // carousel components with multiple items
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

      if ($(this).hasClass('carousel--centered')) {
        // add 1 element for negative offset of carousel inner
        idx += 1;
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

      // special case for carousel centered we would need plus 1, as we have negative offset x on carousle-inner
      if ($(this).hasClass('carousel--centered')) {
        if (e.direction == 'right') {
          $(this).find(`.carousel-item:nth-child(${$(this).find('.carousel-item.active').index() + 1 + itemsPerSlide})`).addClass('carousel-item--last');
        }
      }
    });

    $(".carousel--loop").on('slid.bs.carousel', function(e) {
      $(this).find(".carousel-item--last").removeClass('carousel-item--last');
    });
  }

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
      if (!$(this).hasClass('carousel--loop')) {
  			if ($(this).find('.carousel-item').length > 1) {
  				const loop = $(this).find('.carousel-item').length > 5;
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
  					}
  				});

  				let currentIndex;
  				let prevSlide;
  				let nextSlide;
  				let prev2Slide;
  				let next2Slide;
  				let carouselLength;
  				$(this).on('slid.bs.carousel', function () {
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
});
