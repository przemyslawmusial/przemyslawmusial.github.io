document.addEventListener("DOMContentLoaded", () => {
	const burgerIcon = document.querySelector(".burger");
	const mobileNav = document.querySelector("ul");
	const navSubline = document.querySelector(".nav-container .subline");
	const navLinks = document.querySelectorAll(
		"nav .ul-container .links-container .close-links"
	);

	// console.log(mobileNav);

	if (burgerIcon) {
		burgerIcon.addEventListener("click", () => {
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
