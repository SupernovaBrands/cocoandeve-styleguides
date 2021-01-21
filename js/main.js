$(document).ready(function () {
	// Search boxes
	const searchBox = $('.search-box');
	if (searchBox.length > 0) {
		searchBox.find('input').on('keyup', function () {
			const parent = $(this).parents('.search-box');
			if ($(this).val() !== '' && !parent.hasClass('search-box--filled')) {
				parent.addClass('search-box--filled');
			} else if ($(this).val() === '') {
				parent.removeClass('search-box--filled');
			}
		});
		searchBox.find('.search-box__close').on('click', function (e) {
			e.preventDefault();
			const parent = $(this).parents('.search-box');
			const input = parent.find('input');
			input.val('');
			parent.removeClass('search-box--filled');
		});
	}

	const debounce = (func, timeout = 300) => {
		let timer;
		return (...args) => {
			const next = () => func(...args);
			if (timer) {
				clearTimeout(timer);
			}
			timer = setTimeout(next, timeout > 0 ? timeout : 300);
		};
	};

	if ($('.comments__form').length > 0) {
		$('.comments__form__open-btn').on('click', function () {
			$(this).parent('.comments__form').addClass('comments__form--show');
		});

		$('.comments__form__close-btn').on('click', function () {
			$(this).parent('.comments__form').removeClass('comments__form--show');
		});

		const checkFormValid = debounce((formEl) => {
			const inputEl = formEl[0].querySelectorAll('input, textarea');
			const submitEl = formEl[0].querySelector('button[type="submit"]');
			let valid = 0;
			for (let i = 0; i < inputEl.length; i += 1) {
				valid += inputEl[i].checkValidity() ? 1 : 0;
			}
			if (inputEl.length === valid) {
				submitEl.disabled = false;
			} else {
				submitEl.disabled = true;
			}
		});
		$('.comments__form form input, .comments__form form textarea').on('keyup', function () {
			checkFormValid($(this).parents('form'));
		});

		$('.comments__form form').on('submit', function (e) {
			e.preventDefault();
			const container = $(this).parents('section.comments');
			const commentEl = container.find('.comments__comment').first();
			const name = $(this).find('input[name="name"]').val();
			const comment = $(this).find('textarea[name="comment"]').val();

			$(this).find('input, textarea').val('');
			$(this).parent('.comments__form').removeClass('comments__form--show');

			commentEl.before(`<div class="comments__comment d-flex align-items-start mb-20">\
				<img class="comments__comment__img" src="https://via.placeholder.com/150x150.jpg/E0F0E9" />\
				<div class="ml-15">\
					<h3 class="comments__comment__title">${name}</h3>\
					<p class="m-0">${comment.replaceAll('\n', '<br>')}</p>\
				</div>\
			</div>`);
		});
	}
});
