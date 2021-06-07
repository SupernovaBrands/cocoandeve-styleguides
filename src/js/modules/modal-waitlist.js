$(document).ready(function () {
	$('#productWaitlist form').on('submit', function (e) {
		$('#productWaitlist .subscribed').removeClass('d-none');
		$(this).addClass('d-none');
		$(this).parents('.modal-content').find('.modal-header p').addClass('d-none');
		e.preventDefault();
	});

	$('#productWaitlist form .custom-select').on('change', function () {
		const val = $(this).val();
		const maskingEl = $('#productWaitlist .masking-select');
		const phoneCode = $(this).find(`option[value='${val}']`).data('code');
		maskingEl.text(`+${phoneCode}`).addClass('selected');
		$(this).trigger('mouseleave');
	});
});
