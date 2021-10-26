/* global screenLG */
import { popopOver } from '~mod/utils';

$('.collection-swatch').on('click', '.collection-swatch__close', function () {
	$('.collection-swatch').removeClass('show');
});

const swatchRender = function (target, content) {
	if (content !== '') {
		target.html(content);
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
	} else if ($('html').hasClass('au-store')) {
		swatchRender($('.collection-swatch__modal .modal-dialog'), btn.siblings('.swatch-overlay').html());
		let id = '#collectionSwatchModal';
		if ($(btn).hasClass('btn-choose__swatch-subscription')) id = '#collectionSubscriptionModal';
		$(id).modal({
			show: true,
		});
		$(id).on('shown.bs.modal', () => popopOver());
	}
});
