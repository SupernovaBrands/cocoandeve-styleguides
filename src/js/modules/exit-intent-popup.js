// Exit Intent
// Reference: https://medium.com/weekly-webtips/how-to-make-an-effective-exit-intent-popup-in-javascript-bf6051b4a6d4

// import { setCookie, getCookie } from '~mod/utils';

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
	if (popup && !opened) {
		document.addEventListener('mouseout', mouseEvent);
	}
};

initExitIntent();
