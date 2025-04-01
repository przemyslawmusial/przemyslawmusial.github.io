$(document).ready(function () {
	$(".realizations-carousele").slick({
		mobileFirst: true,
		arrows: false,
		dots: false,
		autoplay: false,
		slidesToShow: 1.1,
		slidesToScroll: 1,
		infinite: false,
		centerMode: false,
		initialSlide: 0,
		responsive: [
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 2.2,
					// initialSlide: 3,
					// centerMode: true,
					speed: 600,
					arrows: true,
					prevArrow: $(".carousele-arrows .fa-chevron-left"),
					nextArrow: $(".carousele-arrows .fa-chevron-right"),
				},
			},
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 3.5,
					// initialSlide: 3,
					// centerMode: true,
					arrows: true,
					prevArrow: $(".carousele-arrows .fa-chevron-left"),
					nextArrow: $(".carousele-arrows .fa-chevron-right"),
				},
			},
			// {
			// 	breakpoint: 2000,
			// 	settings: {
			// 		slidesToShow: 4.5,
			// 		arrows: true,
			// 		prevArrow: $(".carousele-arrows .fa-chevron-left"),
			// 		nextArrow: $(".carousele-arrows .fa-chevron-right"),
			// 	},
			// },
		],
	});
});
