$(".header-carousel").slick({
	mobileFirst: true,
	autoplay: true,
	autoplaySpeed: 7000,
	nextArrow:
		'<button class="slick-next"><i class="fa-solid fa-chevron-right"></i></button>',
	prevArrow:
		'<button class="slick-prev"><i class="fa-solid fa-chevron-left"></i></button>',
	dots: true,
	responsive: [
		{
			breakpoint: 992,
			settings: {
				speed: 1500,
			},
		},
	],
});