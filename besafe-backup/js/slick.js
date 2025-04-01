$(document).ready(function () {
	$(".reviews-carousele").slick({
		mobileFirst: true,
		arrows: false,
		dots: true,
		autoplay: false,
		slidesToShow: 1,
		slidesToScroll: 1,
		responsive: [
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
					// initialSlide: 3,
					// centerMode: true,
				},
			},
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3,
					speed: 900,
					// initialSlide: 3,
					// centerMode: true,
				},
			},
		],
	});
});
