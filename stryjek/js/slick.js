$(document).ready(function () {
	// === MAIN SLIDER (Slick) ===
	if (typeof $ !== "undefined" && $(".main-slider").length > 0) {
		$(".main-slider").slick({
			arrows: true,
			dots: true,
			prevArrow:
				'<button type="button" class="slick-prev" aria-label="Poprzedni"><img src="./icons/strzalka-menu-desktop.svg" alt="Wstecz"></button>',
			nextArrow:
				'<button type="button" class="slick-next" aria-label="Następny"><img src="./icons/strzalka-menu-desktop.svg" alt="Dalej"></button>',
			infinite: true,
			speed: 500,
			slidesToShow: 1,
			slidesToScroll: 1,
			// autoplay: true,
			autoplaySpeed: 4000,
		});
	}
});
