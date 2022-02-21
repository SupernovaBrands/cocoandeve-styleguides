import { checkCarouselNav } from '~mod/carousel-scroll-featured';

$('.product-featured-abtest a[data-toggle="tab"]').on('shown.bs.tab', function () {
	$('.carousel--scroll__featured').each((index, carousel) => {
		const inner = carousel.querySelector('.carousel-inner');
		const prevButton = carousel.querySelector('.carousel-control-prev');
		const nextButton = carousel.querySelector('.carousel-control-next');
		carousel.dispatchEvent(new CustomEvent('adjustThumb'));
		checkCarouselNav(inner, prevButton, nextButton);
	});
});
