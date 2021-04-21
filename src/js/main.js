import '~mod/globals';

import React from 'react';
import ReactDOM from 'react-dom';
import Cart from '~comp/cart';
import QuantityBox from '~comp/quantity-box';

if ($('#cart-drawer').length > 0) {
	ReactDOM.render(
		React.createElement(Cart, {}, null),
		document.querySelector('#cart-drawer'),
		);
}

const qtyBoxes = document.querySelectorAll('.react-quantity-box');
qtyBoxes.forEach((el) => {
	ReactDOM.render(
		React.createElement(QuantityBox, { name: 'quantity', quantity: 1, editable: true }, null),
		el,
	);
});

const navCategory = $('.nav-category');
if (navCategory.length > 0) {
	import(/* webpackChunkName: 'nav-category' */ '~mod/nav-category');
}

const carouselLoop = $(".carousel--loop");
if (carouselLoop.length > 0) {
  import(/* webpackChunkName: 'carousel-loop' */ '~mod/carousel-loop');
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

	// Nav Category Sticky on Scroll
	const navSticky = $('.nav-blog--sticky');
	if (navSticky.length > 0) {
		var scrollTop = 0;
		$(window).on('scroll', function() {
			scrollTop = $(this).scrollTop();
			console.log(scrollTop)
			if (scrollTop > 100) {
				navSticky.addClass('active');
			} else {
				navSticky.removeClass('active');
			}
		})
	}

	const navBlog = $('.nav-blog');
	if (navBlog.length > 0) {
		const linkSearch = navBlog.find('.link-search');
		if (linkSearch) {
			linkSearch.on('click', function (e) {
				e.preventDefault();
				if ($(this).hasClass('opened')) {
					$(this).removeClass('opened').addClass('text-primary');
					navBlog.find('.search-box').addClass('d-none');
				} else {
					$(this).addClass('opened').removeClass('text-primary');
					navBlog.find('.search-box').removeClass('d-none');
				}
			});
			navBlog.find('.search-box__close').on('click', function () {
				linkSearch.removeClass('opened').addClass('text-primary');
				$(this).parents('.search-box').addClass('d-none');
			});
		}
	}

	// Article Proggress Bar
	let proggreeBar = $('.reading-proggress-bar');

	if (proggreeBar.length) {
		let body = document.body,
		    html = document.documentElement;

		let height = Math.max(
		    body.scrollHeight,
		    body.offsetHeight,
		    html.clientHeight,
		    html.scrollHeight,
		    html.offsetHeight
		);


		const setProgress = () => {
		    let scrollFromTop = (html.scrollTop || body.scrollTop) + html.clientHeight;
		    let width = (scrollFromTop / height) * 100 + '%';
		    console.log(width)
		    proggreeBar.find('.reading-proggress-bar__proggress').css('width',width)
		};

		window.addEventListener('scroll', setProgress);

		setProgress();
	}
});
