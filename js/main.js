$(document).ready(function () {
	window.showGrid = function () {
		jQuery('body').append('<style type="text/css">.gridoverlay{position:fixed;top:0;left:50%;transform:translateX(-50%);z-index:9999}.gridoverlay .col{height:100vh}.gridoverlay .col:before{content:"";display:block;background-color:rgba(0,123,255,0.3);height:100%}</style><div class="container gridoverlay"><div class="row"><div class="col"></div><div class="col"></div><div class="col"></div><div class="col"></div><div class="col d-none d-lg-block"></div><div class="col d-none d-lg-block"></div><div class="col d-none d-lg-block"></div><div class="col d-none d-lg-block"></div><div class="col d-none d-lg-block"></div><div class="col d-none d-lg-block"></div><div class="col d-none d-lg-block"></div><div class="col d-none d-lg-block"></div></div></div>');
	};

	if (/[?&]?show-grid=true[&]?/.test(window.location.search)) {
		window.showGrid();
	}

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
			$(this).siblings('.comments__form').removeClass('d-none');
			$(this).siblings('.comments__form__close-btn').removeClass('d-none');
			$(this).addClass('d-none');
		});

		$('.comments__form__close-btn').on('click', function () {
			$(this).siblings('.comments__form').addClass('d-none');
			$(this).siblings('.comments__form__open-btn').removeClass('d-none');
			$(this).addClass('d-none');
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
		$('.comments__form input, .comments__form textarea').on('keyup', function () {
			checkFormValid($(this).parents('form'));
		});

		$('.comments__form').on('submit', function (e) {
			e.preventDefault();
			const commentList = $(this).siblings('.comments__list');
			const name = $(this).find('input[name="name"]').val();
			const comment = $(this).find('textarea[name="comment"]').val();

			$(this).find('input, textarea').val('');
			$(this).parent('.comments__form').removeClass('comments__form--show');

			commentList.prepend(`<li class="comments__comment row align-items-start mb-20">\
				<img class="col-3" src="https://via.placeholder.com/150x150.jpg/E0F0E9" />\
				<div class="comments__comment__text col-9">\
					<h4 class="font-weight-bold">${name}</h4>\
					<p class="m-0">${comment.replaceAll('\n', '<br>')}</p>\
				</div>\
			</li>`);
		});
	}
});
