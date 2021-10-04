/* global screenLG */
const updateFormButton = (form) => {
	const selected = form.find('.variant-swatch.border-primary');
	if (selected.hasClass('waitlist')) {
		form.parent().find('.collection-swatch__waitlist').removeClass('d-none');
		form.find('.collection-swatch__price div').removeClass('d-flex').addClass('d-none');
		form.find('.collection-swatch__price button').addClass('d-none');
	} else {
		form.parent().find('.collection-swatch__waitlist').addClass('d-none');
		form.find('.collection-swatch__price div').removeClass('d-none').addClass('d-flex');
		form.find('.collection-swatch__price button').removeClass('d-none');
	}

	if (selected.hasClass('oos')) {
		form.find('button[type=submit]').text('Out of Stock').attr('disabled', 'disabled');
	} else {
		form.find('button[type=submit]').text('Add to Cart').removeAttr('disabled');
	}
};

const updateSwatchBundles = function (form, currElem) {
	const attrPairFor = form.find('.variant-swatch.border-primary');
	if (attrPairFor.length > 1) {
		const pairData = [];
		attrPairFor.each(function (i, el) {
			pairData.push($(el).data('value'));
		});

		const dataValue = currElem.attr('data-value');
		const currentBundle = currElem.data('bundle');
		let targetElem;
		if (currentBundle === 'option-2') {
			targetElem = $('.variant-swatch[data-bundle="option-1"]');
		} else {
			targetElem = $('.variant-swatch[data-bundle="option-2"]');
		}

		if (targetElem.length > 0) {
			targetElem.each(function (k, elm) {
				let pairedVal = '';
				if (currentBundle === 'option-2') {
					pairedVal = `${$(elm).attr('data-value')}-${dataValue}`;
				} else {
					pairedVal = `${dataValue}-${$(elm).attr('data-value')}`;
				}
				const varIdElem = $('#swatchBundle').find(`[data-pair=${pairedVal}]`);
				if (varIdElem.attr('data-available') === 'false') {
					$(elm).addClass('oos').addClass('waitlist');
				} else {
					$(elm).removeClass('oos').removeClass('waitlist');
				}
			});
		}
	}
};

$('.collection-swatch, .collection-swatch__modal').on('click', '.variant-swatch', function () {
	const attrFor = $(this).data('value');
	const swatchContainers = $(this).closest('form').find('.product-swatch');

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

	updateSwatchBundles($(this).closest('form'), $(this));
	updateFormButton($(this).closest('form'));
});

$('.collection-swatch').on('click', '.collection-swatch__close', function () {
	$('.collection-swatch').removeClass('show');
});

const swatchRender = function (target) {
	if (target.find('.swatch-bundle-variant').length > 0) {
		target.find('.swatch-bundle-variant').each(function (i, el) {
			const productForm = $(el).closest('.product-form');
			updateSwatchBundles(productForm, productForm.find('.variant-swatch.border-primary[data-bundle="option-1"]'));
			updateSwatchBundles(productForm, productForm.find('.variant-swatch.border-primary[data-bundle="option-2"]'));
			updateFormButton(productForm);
		});
	}
};

$('.btn-choose__swatch').click(function () {
	const btn = $(this);
	if (window.innerWidth < screenLG) {
		swatchRender($('.collection-swatch'), btn.siblings('.swatch-overlay').html());
		$('.collection-swatch').addClass('show');
		$('.collection-swatch > div').addClass('d-none');

		let className = '.collection-swatch--overlay';
		if ($(btn).hasClass('btn-choose__swatch-subscription')) className = '.collection-swatch--subscription';
		$(className).removeClass('d-none');
		popopOver();
	} else {
		swatchRender($('.collection-swatch__modal .modal-dialog'), btn.siblings('.swatch-overlay').html());
		let id = '#collectionSwatchModal';
		if ($(btn).hasClass('btn-choose__swatch-subscription')) id = '#collectionSubscriptionModal';
		$(id).modal({
			show: true,
		});
		$(id).on('shown.bs.modal', () => popopOver());
	}
});
