$(document).ready(function () {
	$('.carousel--swipe').each((index, carousel) => {
		let xDown = null;
		let yDown = null;

		function getTouches(evt) {
			return evt.touches || evt.originalEvent.touches;
		}

		function handleTouchStart(evt) {
			const firstTouch = getTouches(evt)[0];
			xDown = firstTouch.clientX;
			yDown = firstTouch.clientY;
		}

		function handleTouchMove(evt) {
			if (!xDown || !yDown) {
				return;
			}

			const xUp = evt.touches[0].clientX;
			const yUp = evt.touches[0].clientY;

			const xDiff = xDown - xUp;
			const yDiff = yDown - yUp;

			const isProductThumb = $(carousel).hasClass('product-image-carousel__indicator');
			const thumbsLength = $(carousel).find('.product-image-carousel__indicator__item').length;
			const activeThumb = $(carousel).find('.active').data('index');
			if (Math.abs(xDiff) > Math.abs(yDiff)) {
				if (xDiff > 0) {
					if (isProductThumb) {
						if (activeThumb + 5 === thumbsLength + 1) {
							$(carousel).carousel('dispose');
						} else {
							$(carousel).carousel('cycle');
							$(carousel).carousel('next');
						}
					} else {
						$(carousel).carousel('next');
					}
				} else {
					console.log('swipe left');
					if (isProductThumb) {
						if (activeThumb === 1) {
							$(carousel).carousel('dispose');
						} else {
							$(carousel).carousel('cycle');
							$(carousel).carousel('prev');
						}
					} else {
						$(carousel).carousel('prev');
					}
				}
			} else {
				xDown = null;
				yDown = null;
			}
		}

		carousel.addEventListener('touchstart', handleTouchStart, false);
		carousel.addEventListener('touchmove', handleTouchMove, false);
	});
});
