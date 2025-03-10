document.addEventListener("DOMContentLoaded", function () {
	const burgerIcon = document.querySelector(".burger");
	const mobileNav = document.querySelector("ul");
	const offerBtn = document.querySelector(".submenu-btn");
	const submenuContent = document.querySelector(".submenu-content");
	const nav = document.querySelector("nav");
	const offersBtns = document.querySelectorAll(".offer .container i");
	const offersContainers = document.querySelectorAll(
		".offer .container .offers-container"
	);

	offersBtns.forEach((btn, index) => {
		btn.addEventListener("click", () => {
			const isActive = offersContainers[index].classList.contains("active");

			offersContainers.forEach((container) => {
				container.classList.remove("active");
			});

			offersBtns.forEach((button) => {
				button.classList.remove("active");
			});

			if (!isActive) {
				offersContainers[index].classList.add("active");
				offersBtns[index].classList.add("active");
			}
		});
	});

	burgerIcon.addEventListener("click", () => {
		mobileNav.classList.toggle("active");
		burgerIcon.classList.toggle("active");
	});

	if (offerBtn) {
		offerBtn.addEventListener("click", () => {
			if (window.innerWidth <= 992) {
				// Sprawdza, czy szerokość okna jest mniejsza lub równa 768px
				submenuContent.classList.toggle("opened");
			}
		});
	}

	function closeNavigation() {
		if (mobileNav.classList.contains("active")) {
			mobileNav.classList.remove("active");
			burgerIcon.classList.remove("active");
		}
	}

	mobileNav.addEventListener("click", () => {
		closeNavigation();
	});
});
