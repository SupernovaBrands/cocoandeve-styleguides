/*
$(document).ready(function () {
	if ($('.carousel--swipe').length > 0) {
		$('.carousel--swipe').each((index, carousel) => {
			let touchstartX = 0;
			let touchendX = 0;

			function handleGesture() {
				console.log('touchstartX', touchstartX);
				console.log('touchendX', touchendX);
				if (touchendX < touchstartX) $(carousel).carousel('next');
				if (touchendX > touchstartX) $(carousel).carousel('prev');
			}

			carousel.addEventListener('touchstart', (e) => {
				touchstartX = e.changedTouches[0].screenX;
			});

			carousel.addEventListener('touchend', (e) => {
				touchendX = e.changedTouches[0].screenX;
				handleGesture();
			});
		});
	}
});
*/

$(document).ready(function () {
	if ($('.carousel--swipe').length > 0) {
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

				if (Math.abs(xDiff) > Math.abs(yDiff)) {
					if (xDiff > 0) {
						$(carousel).carousel('next');
					} else {
						$(carousel).carousel('prev');
					}
				} else {
					xDown = null;
					yDown = null;
				}
			}

			carousel.addEventListener('touchstart', handleTouchStart, false);
			carousel.addEventListener('touchmove', handleTouchMove, false);
		});
	}
});
