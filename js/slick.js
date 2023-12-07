$(".offer-carousel").slick({
	arrows: false,
	autoplaySpeed: 10000,
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
				slidesToShow: 3,
				speed: 1500,
			},
		},
	],
});

$(".reviews-carousel").slick({
	arrows: false,
	autoplaySpeed: 10000,
	dots: true,
	autoplay: false,
	mobileFirst: true,
	slidesToShow: 1,
	slidesToScroll: 1,
});
