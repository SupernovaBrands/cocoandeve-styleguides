/* global screenLG */

const initExitIntent = () => {
	const showPopup = () => {
		$('#exit-intent-popup').modal('show');
		// setCookie('exitIntentShown', true, 30);
	};

	const mouseEvent = (e) => {
		const shouldShowExitIntent = !e.toElement && !e.relatedTarget && e.clientY < 10;

		if (shouldShowExitIntent) {
			// document.removeEventListener('mouseout', mouseEvent);
			showPopup();
		}
	};

	const popup = document.getElementById('exit-intent-popup');
	// const opened = getCookie('exitIntentShown');
	const opened = false;
	if (popup && !opened && screenLG <= window.innerWidth) {
		document.addEventListener('mouseout', mouseEvent);
	}
};

initExitIntent();
