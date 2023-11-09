const mobileNav = document.querySelector("ul");
const burgerIcon = document.querySelector(".burger");
const offerBtn = document.querySelector(".submenu-btn");
const submenuContent = document.querySelector(".submenu-content");
const screenWidth = window.innerWidth;

burgerIcon.addEventListener("click", () => {
	mobileNav.classList.toggle("active");
	burgerIcon.classList.toggle("active");
});

// if (screenWidth < 992) {
	offerBtn.addEventListener("click", () => {
		submenuContent.classList.toggle("opened");
	});
// }
