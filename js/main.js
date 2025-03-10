document.addEventListener("DOMContentLoaded", () => {
	const burgerIcon = document.querySelector(".burger");
	const mobileNav = document.querySelector("ul");
	const navSubline = document.querySelector(".nav-container .subline");

	// console.log(mobileNav);

	if (burgerIcon) {
		burgerIcon.addEventListener("click", () => {
			mobileNav.classList.toggle("active");
			burgerIcon.classList.toggle("active");
			navSubline.classList.toggle("active");
		});
	}
});
