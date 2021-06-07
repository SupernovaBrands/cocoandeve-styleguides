import {
	waitFor,
} from '~mod/utils';

waitFor(() => window.yotpo !== undefined, () => {
	if ($('.yotpo.bottomLine.show-avg-score').length > 0) {
		$('.yotpo.bottomLine.show-avg-score').each((i, el) => {
			const stars = $(el).find('.yotpo-stars');
			const rating = stars.find('.sr-only').text().split(' ')[0];
			stars.after(`<span class="font-size-sm ml-1">${rating}</span>`);
		});
	}
});
