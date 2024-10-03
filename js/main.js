document.addEventListener("DOMContentLoaded", function () {
	const burgerIcon = document.querySelector(".burger");
	const mobileNav = document.querySelector("ul");
	const offerBtn = document.querySelector(".submenu-btn");
	const submenuContent = document.querySelector(".submenu-content");
	const nav = document.querySelector("nav");

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
});
