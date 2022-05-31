const Shopify = { queryParams: { sort_by: 'manual' } };

window.pageTemplate = 'list-collections';
const shopAll = 'Shop all';
const shopLabel = 'Shop';

const setCollectionTitle = function () {
	let collectiontitle;
	const collection1 = $('.collection-sidebar li a.active').parent().data('collection');
	if (collection1 === 'all') {
		collectiontitle = shopAll;
	} else {
		collectiontitle = `${shopLabel} ${$('.collection-sidebar li a.active').parent().data('title')}`;
	}
	return collectiontitle;
};

const updateCollectionGrid = function (colParam = {}) {
	console.log(colParam, Object.keys(colParam).length, 'colParam');
	let collectionSelected = $('.collection-sidebar li a.active').parent().data('collection');
	let collectionTitle = setCollectionTitle;
	if (Object.keys(colParam).length > 0) {
		collectionSelected = colParam.collection;
		collectionTitle = colParam.title;
	}
	$('.collection-grid > .loading').collapse('show');

	if (Shopify.queryParams.sort_by === '' || Shopify.queryParams.sort_by === null) {
		Shopify.queryParams.sort_by = 'manual';
	}

	$('.SortBy, select[name=sort_by]').val(Shopify.queryParams.sort_by);

	// Replace with ajax request on shopify stores
	$('.collection-grid > h2').html(collectionTitle);
	$('.collection-grid > .loading').collapse('hide');
	setTimeout(() => {
		$('.collection-grid > .loading').collapse('hide');
	}, 1000);
};

$('.collection-sidebar li').click(function () {
	const dataCol = $(this).attr('data-collection');
	if (dataCol) {
		$('.collection-sidebar li a').removeClass('active');
		$(this).addClass('active');
		$(this).find('a').addClass('active');
		$('select[name=sort_by]').val($(this).attr('data-collection'));

		updateCollectionGrid();
	}
});

$('.collection-grid__tags span').click(function () {
	const dataCol = $(this).attr('data-collection');
	const dataTitle = $(this).attr('data-title');
	console.log('data', dataCol);
	if (dataCol) {
		$('.collection-grid__tags span').removeClass('active');
		$(this).addClass('active');
		$(this).find('a').addClass('active');
		$('select[name=sort_by]').val($(this).attr('data-collection'));

		updateCollectionGrid({ collection: dataCol, title: dataTitle });
	}
});

$(document).ready(function () {
	if (window.pageTemplate === 'list-collections') {
		$('.collection-sidebar a.active').trigger('click');
	}

	$('.SortBy, select[name=sort_by]')
		.bind('change', function () {
			Shopify.queryParams.sort_by = $(this).val();
			// window.location.search = $.param(Shopify.queryParams);
			updateCollectionGrid();
		});
});

window.filterchange = (activeli) => {
	$(`.collection-sidebar li[data-collection="${activeli}"]`).trigger('click');
};
