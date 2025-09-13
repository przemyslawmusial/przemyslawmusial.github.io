document.addEventListener("DOMContentLoaded", () => {
	const burgerIcon = document.querySelector(".burger");
	const mobileNav = document.querySelector(".mobile-nav ul");
	const navContainer = document.querySelector(".mobile-nav .nav-container");
	const navSubline = document.querySelector(".nav-container .subline");
	const navLinks = document.querySelectorAll(
		"nav .ul-container .links-container .close-links"
	);
	const basketModal = document.querySelector(".shop-basket-modal");
	const basketModalBtn = document.querySelectorAll(".shopping-cart");
	const basketModalCloseBtn = document.querySelector(
		".shop-basket-modal .top-container .close-btn"
	);
	const overlay = document.querySelector(".modal-overlay");

	function openBasket() {
		basketModal.classList.add("active");
		overlay.classList.add("active");
		document.body.classList.add("modal-open");
	}

	function closeBasket() {
		basketModal.classList.remove("active");
		overlay.classList.remove("active");
		document.body.classList.remove("modal-open");
	}

	basketModalBtn.forEach((btn) => {
		btn.addEventListener("click", openBasket);
	});

	basketModalCloseBtn.addEventListener("click", closeBasket);
	overlay.addEventListener("click", closeBasket);

	window.addEventListener("scroll", function () {
		const mobileNav = document.querySelector(".mobile-nav");
		const desktopNav = document.querySelector(".desktop-nav");
		if (window.scrollY > 62) {
			if (window.innerWidth <= 992) {
				mobileNav.classList.add("scrolled");
			} else if (window.innerWidth > 992) {
				desktopNav.classList.add("scrolled");
			}
		} else {
			if (window.innerWidth <= 992) {
				mobileNav.classList.remove("scrolled");
			} else if (window.innerWidth > 992) {
				desktopNav.classList.remove("scrolled");
			}
		}
	});

	if (burgerIcon) {
		burgerIcon.addEventListener("click", () => {
			navContainer.classList.toggle("active");
			mobileNav.classList.toggle("active");
			burgerIcon.classList.toggle("active");
			navSubline.classList.toggle("active");
		});
	}

	navLinks.forEach((link) => {
		link.addEventListener("click", () => {
			if (mobileNav.classList.contains("active")) {
				mobileNav.classList.remove("active");
				burgerIcon.classList.remove("active");
				navSubline.classList.remove("active");
			}
		});
	});
});
