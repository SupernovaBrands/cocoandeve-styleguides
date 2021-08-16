/* global screenLG */

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

const carouselLoop = $('.carousel--loop');
if (carouselLoop.length > 0) {
	import(/* webpackChunkName: 'carousel-loop' */ '~mod/carousel-loop');
}

if ($('.carousel--swipe').length > 0) {
	import(/* webpackChunkName: 'carousel-swipe' */ '~mod/carousel-swipe');
}

const modalWaitlist = $('#productWaitlist');
if (modalWaitlist.length > 0) {
	import(/* webpackChunkName: 'modal-waitlist' */ '~mod/modal-waitlist');
}

const variantSwatch = $('.product-card');
if (variantSwatch.length > 0) {
	import(/* webpackChunkName: 'carousel-loop' */ '~mod/product-card');
}

const realResults = $('#real-results');
if (realResults.length > 0) {
	import(/* webpackChunkName: 'carousel-loop' */ '~mod/real-results');
}

const cookieBanner = $('.cookies-banner');
if (cookieBanner.length > 0) {
	import(/* webpackChunkName: 'carousel-loop' */ '~mod/cookies-banner.js');
}

if ($('body').hasClass('template-product')) {
	import(/* webpackChunkName: 'products' */ '~mod/products');
}

const yotpo = $('.yotpo');
if (yotpo.length > 0) {
	import(/* webpackChunkName: 'yotpo' */ '~mod/yotpo');
}

$(document).ready(function () {
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
			sidebarCarousel.find('.rounded-circle.active').click();
		}

		$(window).on('resize', function () {
			if (window.innerWidth >= screenLG) {
				sidebarCarousel.removeClass('carousel');
			} else {
				sidebarCarousel.addClass('carousel');
				sidebarCarousel.find('.rounded-circle.active').click();
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
			if ($(this).hasClass('carousel') || !$(this).parent('.carousel').hasClass('carousel--loop')) {
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

	// mobile menu toggle

	function mobileMenuToggler() {
		$('.mobile-nav').toggleClass('show');
		$('body').toggleClass('offcanvas-active');
	}

	$('.navbar-toggler').on('click', function () {
		mobileMenuToggler();
	});

	$('.mobile-nav').click(function (e) {
		if (e.target !== e.currentTarget) return;
		mobileMenuToggler();
	});

	// header navbar detect scroll top or down
	let lastScrollTop;
	let scrollTop = 0;
	const navbarEl = $('.main-header');
	const announceBar = $('.announcement-bar');
	const navbarHeight = navbarEl.height();
	const cookiesBanner = $('.cookies-banner');

	$(window).on('scroll', function () {
		scrollTop = $(this).scrollTop();

		if ($('.cookies-banner:not(.d-none)').length > 0) {
			// if (scrollTop <= 50) {
			// 	cookiesBanner.removeClass('fixed-top');
			// } else {
			// 	cookiesBanner.addClass('fixed-top');
			// }

			if (cookiesBanner.find('.collapse:not(.show)').length > 0) {
				$('body').addClass('cookies-banner-show');
			} else if (cookiesBanner.find('.collapse.show').length > 0) {
				$('body').addClass('cookies-banner-show--expanded');
			}
			navbarEl.removeClass('position-fixed').removeClass('scrolled-up').removeClass('scrolled-down');
			announceBar.removeClass('d-none');
		} else {
			navbarEl.addClass('position-fixed');
			if (scrollTop < lastScrollTop) {
				navbarEl.removeClass('scrolled-down').addClass('scrolled-up');
				if (scrollTop <= 0) {
					// remove scrolled up for mobile menu show properly
					navbarEl.removeClass('position-fixed').removeClass('scrolled-up');
					if (announceBar.length > 0) {
						announceBar.removeClass('d-none');
					}
				}
			} else if (scrollTop <= 0) {
				// safari fix bounce effect
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

	// stockist
	if ($('.stockist').length > 0) {
		const stockistPlace = $('.stockist__select').val();
		$(`.stockist figure[data-toggle*="${stockistPlace}"]`).removeClass('d-none');
		$('.stockist__select').on('change', function () {
			const selectedPlace = $(this).find('option:selected').text();
			$('.stockist__location').html(selectedPlace);
			$('.stockist figure').addClass('d-none');
			$(`.stockist figure[data-toggle*="${$(this).val()}"]`).removeClass('d-none');
		});
	}

	// Nav Category Sticky on Scroll
	const navSticky = $('.nav-blog--sticky');
	if (navSticky.length > 0) {
		$(window).on('scroll', function () {
			scrollTop = $(this).scrollTop();
			if (scrollTop > 100) {
				navSticky.addClass('active');
			} else {
				navSticky.removeClass('active');
			}
		});
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

	const proggreeBar = $('.reading-proggress-bar');
	if (proggreeBar.length) {
		const { body, documentElement: html } = document;

		const height = Math.max(
			body.scrollHeight,
			body.offsetHeight,
			html.clientHeight,
			html.scrollHeight,
			html.offsetHeight,
		);

		const setProgress = () => {
			const scrollFromTop = (html.scrollTop || body.scrollTop) + html.clientHeight;
			const width = `${(scrollFromTop / height) * 100}%`;
			proggreeBar.find('.reading-proggress-bar__proggress').css('width', width);
		};

		window.addEventListener('scroll', setProgress);

		setProgress();
	}

	// custom checkbox
	if ($('.custom-checkbox')) {
		$('.custom-checkbox').on('click', function () {
			$(this).toggleClass('sni__check').toggleClass('checked');
			if ($(this).hasClass('checked')) {
				$('.custom-checkbox input[type="checkbox"]').prop('checked', true);
			} else {
				$('.custom-checkbox input[type="checkbox"]').prop('checked', false);
			}
		});
	}

	// sweepstakes page
	if ($('.sweepstakes').length > 0) {
		$('#sweepstakes__form').on('submit', function () {
			const el = $(this);
			const email = el.find('#sweepstakes__email').val() || '';
			const country = el.find('#sweepstakes__country').val() || '';
			const phoneNum = el.find('#sweepstakes__phone').val() || '';

			const tocAgree = el.find('#sweepstakes__toc').hasClass('checked');
			const emailValid = email !== '' && window.validateEmail(email);
			const countryValid = country !== '';
			const phoneValid = phoneNum !== '' && window.validatePhone(phoneNum);
			const validForm = tocAgree && (emailValid || (countryValid && phoneValid));

			el.find('.input-error').addClass('d-none');
			if (!emailValid && !phoneValid && !countryValid) {
				el.find('.email-error').removeClass('d-none');
			}
			if (!emailValid && !phoneValid) {
				el.find('.phone-error').text('Please enter a valid phone number').removeClass('d-none');
			}
			if (!emailValid && phoneValid && !countryValid) {
				el.find('.phone-error').text('Please enter a country').removeClass('d-none');
			}
			if (!tocAgree) {
				el.find('.toc-error').removeClass('d-none');
			}
			if (!validForm) {
				return false;
			}

			$('.sweepstakes__thank-you').removeClass('d-none');
			$(this).addClass('d-none');
			return false;
			// proceed ajax call to bluecore
		});

		$('.sweepstakes select').on('change', function () {
			const code = $(this).find(':selected').attr('data-code');
			$('.sweepstakes__country-label').html(`+${code}`);
		});
	}

	const countReviewCard = (categoryId) => {
		let cardRemaining = $(`.result-card.result-card__more.d-none[data-category="${categoryId}"]`);
		if (categoryId === '#all') {
			cardRemaining = $('.result-card.result-card__more.d-none');
		}
		return cardRemaining.length;
	};

	const filterReview = (targetId) => {
		$('.result-card').addClass('d-none');
		$(`.result-card[data-category="${targetId}"]`).not('.result-card__more').removeClass('d-none');
		if (targetId === '#all') {
			$('.result-card').not('.result-card__more').removeClass('d-none');
		}

		const cardRemaining = countReviewCard(targetId);
		if (cardRemaining > 0) {
			$('#real-result__show-more').removeClass('d-none');
		}
	};

	if ($('.real-result').length > 0) {
		// review filter
		$('#real-result__main-tab li').on('click', function () {
			filterReview($(this).find('a').attr('href'));
		});

		$('#real-result__select').on('change', function () {
			filterReview($(this).val());
		});

		$('#real-result__show-more').on('click', function (e) {
			e.preventDefault();
			const loadMoreItem = $(this).data('load-more');
			let filterVal = $('#real-result__select').val();

			if (window.innerWidth > screenLG) {
				filterVal = $('#real-result__main-tab .active').attr('href');
			}

			let loadMoreElem = $(`.result-card.result-card__more.d-none[data-category="${filterVal}"]`);
			if (filterVal === '#all') {
				loadMoreElem = $('.result-card.result-card__more.d-none');
			}

			if (loadMoreElem.length > 0) {
				loadMoreElem.each(function (k, v) {
					if ((k + 1) === loadMoreItem) return false;
					return $(v).removeClass('result-card__more').removeClass('d-none');
				});
			}

			const cardRemaining = countReviewCard(filterVal);
			if (cardRemaining <= 0) {
				$(this).addClass('d-none');
			}
		});
	}

	// tooltip
	$('#tooltip__close').on('click', function () {
		$(this).parent().removeClass('show');
	});

	$('#tooltip__show').on('click', function () {
		$('.navbar > .container').addClass('position-relative');
		$('.tooltip').addClass('show');
	});
});
