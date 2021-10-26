/* global screenLG */
<<<<<<< HEAD
import { popopOver } from '~mod/utils';

$('.collection-swatch').on('click', '.collection-swatch__close', function () {
	$('.collection-swatch').removeClass('show');
=======
$('.collection-swatch-abtest').on('click', '.collection-swatch__close', function () {
	$('.collection-swatch-abtest').removeClass('show');
>>>>>>> e003cd5 (fix rename file)
});

const swatchRender = function (target, content) {
	if (content !== '') {
		target.html(content);
	}
};

<<<<<<< HEAD
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
=======
$('.btn-choose__swatch-abtest').click(function () {
	const btn = $(this);
	if (window.innerWidth < screenLG) {
		swatchRender($('.collection-swatch-abtest'), btn.siblings('.swatch-overlay').html());
		$('.collection-swatch-abtest').addClass('show');
		$('.collection-swatch-abtest > div').addClass('d-none');
	} else if ($('html').hasClass('au-store')) {
		swatchRender($('.collection-swatch-abtest__modal .modal-dialog'), btn.siblings('.swatch-overlay').html());
		$('#collectionSwatchModal').modal({
			show: true,
		});
>>>>>>> e003cd5 (fix rename file)
	}
});
