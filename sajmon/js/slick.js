$(document).ready(function () {
	$(".reviews-carousele").slick({
		mobileFirst: true,
		arrows: true,
		prevArrow: $(".arrow.left"),
		nextArrow: $(".arrow.right"),
		dots: false,
		autoplay: false,
		slidesToShow: 1,
		slidesToScroll: 1,
	});
});
