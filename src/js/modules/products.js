/* global screenLG */
import React from 'react';
import ReactDOM from 'react-dom';
import QuantityBox from '~comp/quantity-box';
import snCart from '~mod/sn-cart';
import { popopOver } from '~mod/utils';

$('.product-image-carousel__indicator__item').on('click', function () {
	const carousel = $(this).data('target');
	const selectedIndex = $(this).data('index');
	$(carousel).carousel(selectedIndex - 1);
	$('.product-image-carousel__indicator__item button').removeClass('border-primary').addClass('border-white');
	$(this).find('button').addClass('border-primary').removeClass('border-white');

	const parent = $(this).closest('.carousel');
	const index = $(this).index();
	const active = parent.find('.active').index();
	const total = parent.find('.carousel-item').length;
	if (total > 5) {
		if ((index - active === 4) && (index < total - 1)) {
			$(parent).carousel(active + 1);
		}
		if (index === active && active !== 0) {
			$(parent).carousel(active - 1);
		}
	}
});

$('.product-image-carousel__indicator').on('slide.bs.carousel', function (e) {
	const $e = $(e.relatedTarget);
	const index = $e.index();
	const totalItems = $(this).find('.carousel-item').length;

	const prevButton = $(this).children('button.chevron-up');
	const nextButton = $(this).children('button.chevron-down');

	if (index === 0) {
		prevButton.attr('disabled', 'disabled');
	} else {
		prevButton.removeAttr('disabled');
	}
	if (index + 5 === totalItems) {
		nextButton.attr('disabled', 'disabled');
	} else {
		nextButton.removeAttr('disabled');
	}
});

$('.product-form').on('submit', function (e) {
	e.preventDefault();
	const variantId = $(this).find('input[name="product-variant"]:checked ~ label .product-swatch button.border-primary').data('id');
	const quantity = parseInt($(this).find('input[name="quantity"]').val(), 10);

	if (variantId) {
		snCart.addItem(parseInt(variantId, 10), quantity);
	}
});

const mobileSwatch = $('.product-swatch-mobile');
const updateFormButton = (form) => {
	const selected = form.find('[name=product-variant]:checked ~ label .variant-swatch.border-primary');
	if (selected.hasClass('waitlist') && $('#product-waitlist-form-oos').hasClass('d-none')) {
		form.find('.product-form-submit').addClass('d-none');
		mobileSwatch.find('.scroll-to-element').removeClass('d-none');
		$('#product-waitlist-form-oos').removeClass('d-none');
		$('.product-swatch-mobile__toggle').addClass('d-none');
		$('.product-swatch-mobile__action').removeClass('d-none');
	} else {
		form.find('.product-form-submit').removeClass('d-none');
		mobileSwatch.find('.scroll-to-element').addClass('d-none');
		$('#product-waitlist-form-oos').addClass('d-none');
		$('.product-swatch-mobile__toggle').removeClass('d-none');
		$('.product-swatch-mobile__action').addClass('d-none');
	}

	if (selected.hasClass('oos')) {
		form.find('button[type=submit]').text('Out of Stock').attr('disabled', 'disabled');
	} else {
		form.find('button[type=submit]').text('Add to Cart').removeAttr('disabled');
	}
};

$('.product-form .variant-swatch').on('click', function () {
	const attrFor = $(this).data('value');
	const swatchContainers = $(this).closest('form').find('.product-swatch');
	const imageSwatch = $(this).data('image');
	const carouselIndicator = $('#product-image-carousel__indicator .product-image-carousel__indicator__item');

	const variantInventory = $(this).data('inventory');
	const variantId = $(this).data('id');
	let qty = 1;
	const qtyBoxes = document.querySelectorAll('.react-quantity-box');
	let productStock = parseInt(variantInventory, 10);
	const productId = parseInt(variantId, 10);
	const qtyEl = $('.quantity-box input[type="number"]');

	$(this).closest('.product-variant').find('input[name="product-variant"]').attr('data-id', variantId);

	if (productStock && productId) {
		const itemInCart = snCart.getItem(productId);

		if (itemInCart) {
			productStock -= itemInCart.quantity;
		}
	}
	if (qtyEl) {
		qty = parseInt(qtyEl.val(), 10);
		if (productStock <= qty) {
			qty = productStock;
		}
	}
	qtyBoxes.forEach((el) => {
		ReactDOM.render(
			React.createElement(QuantityBox, {
				name: 'quantity', quantity: qty, editable: true, allowZero: false, productStock, productId, isPdp: true,
			}, null),
			el,
		);
	});

	// connecting variant swatch with image carousel
	if (imageSwatch && carouselIndicator.length) {
		const targetIndicator = carouselIndicator.find(`button img[src='${imageSwatch}']`);
		if (targetIndicator) {
			$(targetIndicator).closest('.product-image-carousel__indicator__item').trigger('click');
		}
	}

	swatchContainers.each((i, el) => {
		const swatches = $(el).find('.variant-swatch');
		const selected = swatches.filter(`[data-value=${attrFor}]`);
		if (selected.length > 0) {
			swatches.removeClass('border-primary');
			selected.addClass('border-primary');
			$(el).find('p').addClass('d-none')
				.filter(`.swatch-label-${attrFor}`)
				.removeClass('d-none');
		}
	});
	updateFormButton($(this).closest('form'));
});

$('.product-form [name=product-variant]').on('change', function () {
	let qty = 1;
	const variantInventory = $(this).data('inventory');
	const variantId = $(this).attr('data-id');
	const qtyBoxes = document.querySelectorAll('.react-quantity-box');
	let productStock = parseInt(variantInventory, 10);
	const productId = parseInt(variantId, 10);
	const qtyEl = $('.quantity-box input[type="number"]');
	if (productStock && productId) {
		const itemInCart = snCart.getItem(productId);

		if (itemInCart) {
			productStock -= itemInCart.quantity;
		}
	}
	if (qtyEl) {
		qty = (parseInt(qtyEl.val(), 10) !== 0) ? parseInt(qtyEl.val(), 10) : 1;
		if (productStock <= qty) {
			qty = productStock;
		}
	}
	qtyBoxes.forEach((el) => {
		ReactDOM.render(
			React.createElement(QuantityBox, {
				name: 'quantity', quantity: qty, editable: true, allowZero: false, productStock, productId, isPdp: true,
			}, null),
			el,
		);
	});

	const swatches = $(this).parent().find('.variant-swatch');
	if (swatches.length > 1) {
		mobileSwatch.find('.product-swatch-mobile__action').addClass('d-none');
		mobileSwatch.find('.product-swatch-mobile__toggle').removeClass('d-none');
	} else {
		mobileSwatch.find('.product-swatch-mobile__action').removeClass('d-none');
		mobileSwatch.find('.product-swatch-mobile__toggle').addClass('d-none');
	}
	updateFormButton($(this).closest('form'));
});

$('.product-swatch-mobile__collapse')
	.on('show.bs.collapse', function () {
		$(this).siblings('.product-swatch-mobile__action').removeClass('d-none');
		$(this).siblings('.product-swatch-mobile__toggle').addClass('d-none');
	})
	.on('hide.bs.collapse', function () {
		$(this).siblings('.product-swatch-mobile__action').addClass('d-none');
		$(this).siblings('.product-swatch-mobile__toggle').removeClass('d-none');
	});

const mobileSwatchTrigger = document.querySelector('.product-swatch-mobile__trigger');
if (mobileSwatchTrigger && mobileSwatch.length > 0) {
	const observerCallback = (entries) => {
		if (window.innerWidth < screenLG) {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					mobileSwatch.removeClass('show');
					$('.product-swatch-mobile__collapse').collapse('hide');
				} else {
					mobileSwatch.addClass('show');
				}
			});
		}
	};
	const observer = new IntersectionObserver(observerCallback);
	observer.observe(mobileSwatchTrigger);
}

const soldOutTooltip = $('.tooltip--sold-out');
if (soldOutTooltip.length > 0) {
	setTimeout(function () {
		soldOutTooltip.addClass('show');
		setTimeout(function () {
			soldOutTooltip.removeClass('show');
		}, 5000);
	}, 2000);
}

const productWaitlistForm = $('.product-waitlist__form');
const productWaitlistSubmitted = $('.product-waitlist__submitted');
if (productWaitlistForm.length > 0 && productWaitlistSubmitted.length > 0) {
	$('.product-waitlist__form form').on('submit', function (e) {
		e.preventDefault();
		productWaitlistForm.addClass('d-none');
		productWaitlistSubmitted.removeClass('d-none');
	});
}

popopOver();

$('#login-on-result').on('click', () => {

});
