$(window).on("load", function () {
	$(".header-carousele").slick({
		mobileFirst: true,
		arrows: false,
		dots: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 6000,
		fade: true,
		cssEase: "linear",
		speed: 1000,
		pauseOnHover: false,
	});

	// Start animacji na pierwszym slajdzie po załadowaniu
	$(".header-carousele .slick-current .image img").addClass("zooming");

	// Synchronizacja animacji z każdą zmianą slajdu
	$(".header-carousele").on(
		"afterChange",
		function (event, slick, currentSlide) {
			$(".header-carousele .card .image img").removeClass("zooming");
			$(".header-carousele .slick-current .image img").addClass("zooming");
		}
	);

	$(".gallery-carousele").slick({
		mobileFirst: true,
		arrows: false,
		dots: false,
		autoplay: true,
		speed: 1000,
		cssEase: "linear",
		slidesToShow: 1,
		slidesToScroll: 1,
		infinite: true,
		centerMode: false,
		initialSlide: 0,
		responsive: [
			{
				breakpoint: 768,
				settings: {
					speed: 10000,
					autoplaySpeed: 0,
					slidesToShow: 3,
					// initialSlide: 3,
					// centerMode: true,
					speed: 600,
				},
			},
			{
				breakpoint: 992,
				settings: {
					speed: 10000,
					autoplaySpeed: 0,
					slidesToShow: 4,
					// initialSlide: 3,
					// centerMode: true,
				},
			},
		],
	});
});
