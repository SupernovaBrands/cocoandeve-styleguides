/* global screenLG */

const carousels = [];

const adjustScrollThumb = (thumb, inner, scrollParent) => {
	// eslint-disable-next-line no-param-reassign
	thumb.style.width = `${(inner.clientWidth / inner.scrollWidth) * 100}%`;
	// eslint-disable-next-line no-param-reassign
	thumb.style.left = `${(inner.scrollLeft / inner.scrollWidth) * 100}%`;

	if (inner.clientWidth === inner.scrollWidth) {
		// inner.classList.add('justify-content-center');
		scrollParent.classList.add('d-none');
	} else {
		// inner.classList.remove('justify-content-center');
		scrollParent.classList.remove('d-none');
	}
};

const checkNavButton = (inner, prevButton, nextButton) => {
	if (inner.scrollLeft === 0) {
		$(prevButton).removeClass('d-lg-flex');
	} else {
		$(prevButton).addClass('d-lg-flex');
	}

	if (inner.scrollLeft + inner.clientWidth === inner.scrollWidth) {
		$(nextButton).removeClass('d-lg-flex');
	} else {
		$(nextButton).addClass('d-lg-flex');
	}
};

$('.carousel--sfw').each((index, carousel) => {
	const inner = carousel.querySelector('.carousel-inner');
	const scrollbar = carousel.querySelector('.scrollbar');
	const scrollThumb = carousel.querySelector('.scrollbar--thumb');
	const prevButton = carousel.querySelector('.carousel-control-prev');
	const nextButton = carousel.querySelector('.carousel-control-next');
	const checkButton = () => {
		checkNavButton(inner, prevButton, nextButton);
	};

	if (scrollbar) {
		carousel.addEventListener('adjustThumb', () => {
			adjustScrollThumb(scrollThumb, inner, scrollbar.parentNode);
			checkButton();
		});
		if (scrollThumb) adjustScrollThumb(scrollThumb, inner, scrollbar.parentNode);
	}
	carousels.push(carousel);

	let x = 0;
	let left = 0;
	let itemIndex = 0;

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
		if (window.innerWidth >= screenLG) return;

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
		const itemToScroll = 1;
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

$('.carousel--sfw__tabs').each((index, tabs) => {
	$(tabs).find('[data-toggle="tab"]').on('shown.bs.tab', function (event) {
		const carousel = document.querySelector(`${event.target.getAttribute('href')} .carousel--sfw`);
		carousel.dispatchEvent(new CustomEvent('adjustThumb'));
	});
});
