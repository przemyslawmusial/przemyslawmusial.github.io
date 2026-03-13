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

	// === PRODUCTS SLIDER (Slick) ===
	if (typeof $ !== "undefined" && $(".products-slider").length > 0) {
		var $slider = $(".products-slider");
		var $prevBtn = $(".products-slider-prev");
		var $nextBtn = $(".products-slider-next");

		$slider.slick({
			arrows: false,       // używamy własnych przycisków
			dots: false,
			infinite: false,     // NIE zapętlaj
			speed: 400,
			slidesToShow: 5,     // desktop (domyślnie, Slick breakpoints są max-width)
			slidesToScroll: 1,
			responsive: [
				{
					breakpoint: 1024,  // < 1024px (tablet)
					settings: {
						slidesToShow: 2,  // 2 karty + peek z CSS
					},
				},
				{
					breakpoint: 768,   // < 768px (mobile)
					settings: {
						slidesToShow: 1,  // 1 karta + peek z CSS
					},
				},
			],
		});

		// --- Obsługa strzałek zewnętrznych ---
		function updateArrows() {
			var slick = $slider.slick("getSlick");
			var currentSlide = slick.currentSlide;
			var slideCount = slick.slideCount;
			var slidesToShow = slick.options.slidesToShow;

			// Prev – nieaktywny na pierwszym slide
			if (currentSlide === 0) {
				$prevBtn.addClass("is-disabled").attr("disabled", true);
			} else {
				$prevBtn.removeClass("is-disabled").attr("disabled", false);
			}

			// Next – nieaktywny gdy widać ostatnią kartę
			if (currentSlide >= slideCount - slidesToShow) {
				$nextBtn.addClass("is-disabled").attr("disabled", true);
			} else {
				$nextBtn.removeClass("is-disabled").attr("disabled", false);
			}
		}

		// Inicjalne ustawienie strzałek
		$slider.on("init reInit afterChange", updateArrows);
		updateArrows();

		$prevBtn.on("click", function () {
			$slider.slick("slickPrev");
		});
		$nextBtn.on("click", function () {
			$slider.slick("slickNext");
		});
	}

	// === BLOG SLIDER (Slick) ===
	if (typeof $ !== "undefined" && $(".blog-slider").length > 0) {
		var $blogSlider = $(".blog-slider");
		var $blogPrev = $(".blog-slider-prev");
		var $blogNext = $(".blog-slider-next");

		$blogSlider.slick({
			arrows: false,
			dots: false,
			infinite: false,
			speed: 400,
			slidesToShow: 3,    // desktop
			slidesToScroll: 1,
			responsive: [
				{
					breakpoint: 1024,  // < 1024px (tablet)
					settings: {
						slidesToShow: 2,
					},
				},
				{
					breakpoint: 768,   // < 768px (mobile)
					settings: {
						slidesToShow: 1,
					},
				},
			],
		});

		function updateBlogArrows() {
			var slick = $blogSlider.slick("getSlick");
			var current = slick.currentSlide;
			var total = slick.slideCount;
			var visible = slick.options.slidesToShow;

			if (current === 0) {
				$blogPrev.addClass("is-disabled").attr("disabled", true);
			} else {
				$blogPrev.removeClass("is-disabled").attr("disabled", false);
			}

			if (current >= total - visible) {
				$blogNext.addClass("is-disabled").attr("disabled", true);
			} else {
				$blogNext.removeClass("is-disabled").attr("disabled", false);
			}
		}

		$blogSlider.on("init reInit afterChange", updateBlogArrows);
		updateBlogArrows();

		$blogPrev.on("click", function () {
			$blogSlider.slick("slickPrev");
		});
		$blogNext.on("click", function () {
			$blogSlider.slick("slickNext");
		});
	}
});

