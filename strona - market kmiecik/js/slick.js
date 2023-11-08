$(".header-carousel").slick({
	autoplay: true,
	autoplaySpeed: 7000,
	speed:1500,
	nextArrow:
		'<button class="slick-next"><i class="fa-solid fa-chevron-right"></i></button>',
	prevArrow:
		'<button class="slick-prev"><i class="fa-solid fa-chevron-left"></i></button>',
	dots: true,
});

$(".reviews-carousel").slick({
    arrows: false,
	dots: true,
	autoplaySpeed: 10000,
	speed : 1500,
	autoplay: true,
	mobileFirst: true,
	slidesToShow: 1,
	slidesToScroll: 1,
	responsive: [
		{
			breakpoint: 768,
			settings: {
				slidesToShow: 2,
			},
		},
		{
			breakpoint: 992,
			settings: {
				slidesToShow: 2,
			},
		},
	],
});

$(".company-carousel").slick({
    arrows: false,
	autoplaySpeed: 1000,
	fade: false,
	autoplay: true,
	infinite: true,
	speed: 5000,
	mobileFirst: true,
	slidesToShow: 1,
	slidesToScroll: 1,
	responsive: [
		{
			breakpoint: 768,
			settings: {
				slidesToShow: 2,
			},
		},
		{
			breakpoint: 992,
			settings: {
				slidesToShow: 3,
			},
		},
	],
});
