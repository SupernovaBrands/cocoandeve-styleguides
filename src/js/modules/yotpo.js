import {
	waitFor,
} from '~mod/utils';

waitFor(() => window.yotpo !== undefined, () => {
	if ($('.yotpo.bottomLine.show-avg-score').length > 0) {
		$('.yotpo.bottomLine.show-avg-score').each((i, el) => {
			waitFor(() => $(el).find('.yotpo-display-wrapper').length > 0, () => {
				const stars = $(el).find('.yotpo-stars');
				if (stars.length > 0) {
					const rating = stars.find('.sr-only').text().split(' ')[0];
					stars.after(`<span class="mr-1 text-body">${rating}</span>`);
					const totalReviews = $(el).find('.text-m');
					totalReviews.text(`(${totalReviews.text().split(' ')[0]})`);
				} else {
					$(el).addClass('d-none');
				}
			});
		});
	}
});
