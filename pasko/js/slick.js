$(document).ready(function () {
	$(".services-carousele").slick({
		mobileFirst: true,
		arrows: true,
		prevArrow: $(".carousele-arrows .fa-chevron-left"),
		nextArrow: $(".carousele-arrows .fa-chevron-right"),
		dots: false,
		autoplay: false,
		slidesToShow: 1,
		slidesToScroll: 1,
		responsive: [
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3,
					// initialSlide: 3,
					// centerMode: true,
				},
			},
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1,
					speed: 900,
					// initialSlide: 3,
					// centerMode: true,
				},
			},
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 4,
					slidesToScroll: 1,
				},
			},
		],
	});
	$(".reviews-carousele").slick({
		mobileFirst: true,
		arrows: true,
		prevArrow: $(".reviews-carousele-arrows .left-arrow"),
		nextArrow: $(".reviews-carousele-arrows .right-arrow"),
		dots: false,
		autoplay: false,
		slidesToShow: 1,
		slidesToScroll: 1,
		responsive: [
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
					// initialSlide: 3,
					// centerMode: true,
				},
			},
		],
	});
	$(".team-carousele").slick({
		mobileFirst: true,
		arrows: true,
		prevArrow: $(".team-carousele-arrows .fa-arrow-left-long"),
		nextArrow: $(".team-carousele-arrows .fa-arrow-right-long"),
		dots: false,
		autoplay: false,
		slidesToShow: 1,
		slidesToScroll: 1,
		responsive: [
			{
				breakpoint: 576,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
					// initialSlide: 3,
					// centerMode: true,
				},
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1,
					// initialSlide: 3,
					// centerMode: true,
				},
			},
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 4,
					slidesToScroll: 1,
					// initialSlide: 3,
					// centerMode: true,
				},
			},
		],
	});
});
