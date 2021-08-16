/* global screenLG */
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

	if (targetId === '#body') {
		$('.real-result__grid').removeClass('d-lg-block');
	} else {
		$('.real-result__grid').addClass('d-lg-block');
	}

	const cardRemaining = countReviewCard(targetId);
	if (cardRemaining > 0) {
		$('#real-result__show-more').removeClass('d-none');
	} else {
		$('#real-result__show-more').addClass('d-none');
	}
};

$(document).ready(function () {
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
});
