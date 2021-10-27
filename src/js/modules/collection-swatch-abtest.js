/* global screenLG */
$('.collection-swatch-abtest').on('click', '.collection-swatch__close', function () {
	$('.collection-swatch-abtest').removeClass('show');
});

const swatchRender = function (target, content) {
	if (content !== '') {
		target.html(content);
	}
};

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
	}
});
