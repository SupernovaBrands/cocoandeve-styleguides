const getUtcTime = (date) => {
	const now = new Date(date);
	const utcTimestamp = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(),
		now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds());
	return utcTimestamp - (8 * 60 * 60 * 1000);
};

const nowUtcTime = () => {
	const now = new Date();
	const utcTimestamp = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(),
		now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds());
	return utcTimestamp - (8 * 60 * 60 * 1000);
};

const startCount = (endAt) => {
	const end = new Date(getUtcTime(endAt));
	const second = 1000;
	const minute = second * 60;
	const hour = minute * 60;
	const day = hour * 24;
	let timer;

	const showRemaining = () => {
		const now = new Date();

		const distance = end - now;
		if (distance < 0) {
			clearInterval(timer);
			$('.announcement-bar__timer').addClass('d-none');
			return;
		}
		const days = Math.floor(distance / day);
		const hours = Math.floor((distance % day) / hour);
		const minutes = Math.floor((distance % hour) / minute);
		const seconds = Math.floor((distance % minute) / second);

		$('#timerDays').html(`${days} ${days > 1 ? '<span>Days</span>' : '<span>Day</span>'}`);
		$('#timerHrs').html(`${hours} ${hours > 1 ? '<span>Hours</span>' : '<span>Hour</span>'}`);
		$('#timerMin').html(`${minutes}<span>Minutes</span>`);
		$('#timerSec').html(`${seconds}<span>Seconds</span>`);
	};

	timer = setInterval(showRemaining, 1000);
};

$(document).ready(function () {
	// start & end from settings
	const startDate = '2022-10-15 00:00:00';
	const endDate = '2022-12-02 23:59:00';
	const startAt = getUtcTime(`${startDate.replace(' ', 'T')}Z`);
	const endAt = getUtcTime(`${endDate.replace(' ', 'T')}Z`);
	const now = nowUtcTime();

	if (now > startAt && now < endAt) {
		startCount(`${endDate.replace(' ', 'T')}Z`);
	} else {
		console.log('expired');
		$('.announcement-bar__timer').addClass('d-none');
	}
});
