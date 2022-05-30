/* global Handlebars */
const searchNode = $('input[name=q]');
const searchClear = $('.search-panel__clear');
const searchNoResult = $('.search-panel__no-result');
const searchHome = $('.search-panel__home');
const searchResult = $('.search-panel__result');
const searchTag = $('.search-panel__tag');
const SearchBox = {
	init() {
		this.inputEventListener();
	},
	inputEventListener() {
		const input = searchNode;
		input.on('keyup', SearchBox.debounce(function (evt) {
			if (evt.target.value === '') {
				searchClear.addClass('disabled');
				searchNoResult.hide();
			} else {
				searchClear.removeClass('disabled');
			}
			SearchBox.search(evt.target.value);
		}, 500));
		SearchBox.keywordListener(input);
		searchClear.on('click', function () {
			SearchBox.clear();
		});

		$('.search-panel__open, .search-panel__close').on('click', function (e) {
			e.preventDefault();
			SearchBox.searchBoxToggle();
		});

		$('.nav-item--mega-menu').hover(function () {
			if (SearchBox.isSearchOpen()) {
				SearchBox.searchBoxToggle();
			}
		});
	},
	isSearchOpen() {
		return $('.search-panel').hasClass('show');
	},
	searchBoxToggle() {
		$('header').removeClass('overflow-hidden');
		$('.search-panel').toggleClass('show');
		$('body').toggleClass('search-panel-active');
		if (SearchBox.isSearchOpen()) {
			$('.search-panel input[name="q"]').focus();
			$('.main-header').addClass('scrolled-up').removeClass('scrolled-down');
		}
	},
	keywordListener(input) {
		searchTag.on('click', function (evt) {
			input.val(evt.target.textContent);
			SearchBox.search(evt.target.textContent);
			searchClear.removeClass('disabled');
		});
	},
	search(keyword) {
		SearchBox.loading(true);
		searchNoResult.hide();
		searchHome.hide();
		searchResult.hide();
		if (keyword === '') {
			SearchBox.loading(false);
			searchResult.hide();
			if (!$('body').hasClass('search-feature-without-suggestion-abtest-active')) {
				searchHome.show();
			}
			return;
		}

		searchResult.show();
		SearchBox.loading(false);

		/*
		jQuery.getJSON('/search/suggest.json', {
			q: keyword,
			resources: {
				type: 'product',
				options: {
					unavailable_products: 'last',
					fields: 'tag,title',
				},
			},
		}).done(function (response) {
			const productSuggestions = response.resources.results.products;
			if (productSuggestions.length > 0) {
				SearchBox.buildResult(productSuggestions);
				searchResult.show();
				SearchBox.loading(false);
				// ga('send', 'event', 'ProductSearch', 'SearchKeyword', keyword);
				// if (dataLayer) {
				// 	dataLayer.push({event: 'ProductSearch', search_term: keyword});
				// }
			} else {
				searchNoResult.show();
				searchHome.show();
				SearchBox.loading(false);
			}
		});
		*/
	},
	buildResult(results) {
		const $searchContainer = $('#search-products .carousel-inner');
		$searchContainer.empty();

		const items = [];
		const source = $('#searchRowTemplate').html();
		const template = Handlebars.compile(source);

		const resultsFiltered = results.filter(function (i) {
			return i.type === 'HERO' || i.type === 'BUNDLE';
		});
		$.each(resultsFiltered, function (index, item) {
			let range = 'Aussie Skincare Essentials';
			if (item.title.includes('Tasmanian Spring Water')) {
				range = 'Tasmanian Spring Water';
			} else if (item.title.includes('Australian Pink Clay')) {
				range = 'Australian Pink Clay';
			} else if (item.title.includes('Australian Emu Apple')) {
				range = 'Australian Emu Apple';
			}

			const itemRow = {
				product_id: item.id,
				img: item.image,
				title: item.title.replace(range, ''),
				handle: item.handle,
				price: item.price,
				url: item.url,
				range,
			};

			items.push(itemRow);
		});
		let info = 0;
		const resultHeading = $searchContainer.attr('data-heading');
		if (resultsFiltered.length > 0) {
			info = resultHeading.replace('_total_', results.length);
		}

		const data = {
			items,
		};

		SearchBox.loading(false);
		$searchContainer.append(template(data));
		$('#search-result-heading').html(info);
	},
	debounce(func, wait, immediate) {
		let timeout;
		return function () {
			const context = this;
			// eslint-disable-next-line prefer-rest-params
			const args = arguments;
			clearTimeout(timeout);
			timeout = setTimeout(function () {
				timeout = null;
				if (!immediate) func.apply(context, args);
			}, wait);
			if (immediate && !timeout) func.apply(context, args);
		};
	},
	loading(state) {
		if (state) {
			$('.lds-ring').addClass('active');
			$('.search-nav__footer').hide();
		} else {
			$('.lds-ring').removeClass('active');
			$('.search-nav__footer').show();
		}
	},
	clear() {
		searchNode.val('');
		searchResult.hide();
		searchClear.addClass('disabled');
		searchNoResult.hide();
		if (!$('body').hasClass('search-feature-without-suggestion-abtest-active')) {
			searchHome.show();
		}
	},
	panelToggle() {
		$('.mega-search-wrapper').toggleClass('active');
		$('body').toggleClass('body-search-open');
		if ($('.mega-search-wrapper').hasClass('active')) {
			document.getElementById('searchq').focus();
		}
	},
};

$(document).ready(function () {
	SearchBox.init();
});

// SEARCH BOX CAROUSEL SCROLL
const carousels = [];

const adjustScrollThumb = (thumb, inner, scrollParent) => {
	let innerOuterWidth;
	if ($(inner).closest('.instagram-carousel').length > 0) {
		// instagram scroll bugfix: out of container
		// round to 1 decimal of item width
		const itemWidth = Math.round($(inner).find('.carousel-item').outerWidth() * 10) / 10;
		// instagram total images from instagram.js
		innerOuterWidth = itemWidth * 15;
	} else {
		innerOuterWidth = inner.scrollWidth;
	}
	// eslint-disable-next-line no-param-reassign
	thumb.style.width = `${(inner.clientWidth / innerOuterWidth) * 100}%`;
	// eslint-disable-next-line no-param-reassign
	thumb.style.left = `${(inner.scrollLeft / inner.scrollWidth) * 100}%`;

	if (inner.clientWidth === inner.scrollWidth) {
		inner.classList.add('justify-content-center');
		scrollParent.classList.add('d-none');
	} else {
		inner.classList.remove('justify-content-center');
		scrollParent.classList.remove('d-none');
	}
};

window.addEventListener('resize', () => {
	carousels.forEach((s) => s.dispatchEvent(new CustomEvent('adjustThumb')));
});

$('.carousel--scroll').each((index, carousel) => {
	const inner = carousel.querySelector('.carousel-inner');
	const scrollbar = carousel.querySelector('.scrollbar');
	const scrollThumb = carousel.querySelector('.scrollbar--thumb');
	const prevButton = carousel.querySelector('.carousel-control-prev');
	const nextButton = carousel.querySelector('.carousel-control-next');

	if (scrollbar) {
		carousel.addEventListener('adjustThumb', () => { adjustScrollThumb(scrollThumb, inner, scrollbar.parentNode); });
		if (scrollThumb) adjustScrollThumb(scrollThumb, inner, scrollbar.parentNode);
	}
	carousels.push(carousel);

	let x = 0;
	let left = 0;
	let itemIndex = 0;

	const checkButton = () => {
		if (inner.scrollLeft === 0) {
			if (!$(prevButton).hasClass('carousel-control-prev--always-show')) {
				$(prevButton).addClass('d-none');
			} else {
				$(prevButton).addClass('disabled');
			}
		} else if (!$(prevButton).hasClass('carousel-control-prev--always-show')) {
			$(prevButton).removeClass('d-none');
		} else {
			$(prevButton).removeClass('disabled');
		}

		if (inner.scrollLeft + inner.clientWidth === inner.scrollWidth) {
			if (!$(nextButton).hasClass('carousel-control-prev--always-show')) {
				$(nextButton).addClass('d-none');
			} else {
				$(nextButton).addClass('disabled');
			}
		} else if (!$(nextButton).hasClass('carousel-control-prev--always-show')) {
			$(nextButton).removeClass('d-none');
		} else {
			$(nextButton).removeClass('disabled');
		}
	};
	if (scrollThumb) {
		checkButton();
	}

	const innerDrag = (e) => {
		inner.scrollLeft = left - (e.pageX || e.touches[0].pageX) + x;
		if (scrollThumb) scrollThumb.style.left = `${(inner.scrollLeft / inner.scrollWidth) * 100}%`;
		checkButton();
	};

	const scrollDrag = (e) => {
		inner.scrollLeft = left + ((e.pageX || e.touches[0].pageX) - x) * (inner.scrollWidth / scrollbar.clientWidth);
		if (scrollThumb) scrollThumb.style.left = `${(inner.scrollLeft / inner.scrollWidth) * 100}%`;
		checkButton();
	};

	inner.addEventListener('scroll', () => {
		if (scrollThumb) scrollThumb.style.left = `${(inner.scrollLeft / inner.scrollWidth) * 100}%`;
		checkButton();
	});

	const eventStart = (e) => {
		e.preventDefault();
		x = (e.pageX || e.touches[0].pageX);
		left = inner.scrollLeft;

		document.addEventListener(
			e.type === 'mousedown' ? 'mousemove' : 'touchmove',
			e.target === scrollThumb ? scrollDrag : innerDrag,
		);
	};

	inner.addEventListener('mousedown', eventStart, true);
	if (scrollThumb) {
		scrollThumb.addEventListener('mousedown', eventStart, true);
		scrollThumb.addEventListener('touchstart', eventStart, true);
		scrollThumb.addEventListener('mousedown', eventStart, true);
		scrollThumb.addEventListener('touchstart', eventStart, true);
	}

	document.addEventListener('mouseup', () => {
		document.removeEventListener('mousemove', innerDrag);
		document.removeEventListener('mousemove', scrollDrag);
	});

	document.addEventListener('touchend', () => {
		document.removeEventListener('touchmove', innerDrag);
		document.removeEventListener('touchmove', scrollDrag);
	});

	const scrollItem = (direction) => (e) => {
		e.preventDefault();
		const item = carousel.querySelector('.carousel-item');
		const itemToScroll = $(carousel).parent().hasClass('review-carousel') || $(carousel).parent().hasClass('instagram-carousel') ? 1 : 2;
		itemIndex = Math.round(inner.scrollLeft / item.clientWidth) + (direction === 'left' ? -(itemToScroll) : itemToScroll);
		left = itemIndex * item.clientWidth;
		if (left < 0) left = 0;
		else if (left > inner.scrollWidth - inner.clientWidth) left = inner.scrollWidth - inner.clientWidth;
		$(inner).animate({ scrollLeft: left }, 300);
		$(scrollThumb).animate({ left: `${(left / inner.scrollWidth) * 100}%` }, 300);
	};

	if (prevButton) {
		prevButton.addEventListener('mousedown', scrollItem('left'));
	}

	if (nextButton) {
		nextButton.addEventListener('mousedown', scrollItem('right'));
	}
});

const searchPanelScroll = document.getElementById('searchPanel');

const addScrollPixel = () => {
	if (searchPanelScroll.scrollTop === 0) {
		// element is at the top of its scroll position, so scroll 1 pixel down
		searchPanelScroll.scrollTop = 1;
	}

	if (searchPanelScroll.scrollHeight - searchPanelScroll.scrollTop === searchPanelScroll.clientHeight) {
		// element is at the bottom of its scroll position, so scroll 1 pixel up
		searchPanelScroll.scrollTop -= 1;
	}
};

if (window.addEventListener) {
	// Avoid just launching a function on every scroll event as it could affect performance.
	// You should add a "debounce" to limit how many times the function is fired
	searchPanelScroll.addEventListener('scroll', addScrollPixel, true);
} else if (window.attachEvent) {
	searchPanelScroll.attachEvent('scroll', addScrollPixel);
}
