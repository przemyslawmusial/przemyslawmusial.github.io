const mobileNav = document.querySelector("ul");
const burgerIcon = document.querySelector(".burger");
const offerBtn = document.querySelector(".submenu-btn");
const submenuContent = document.querySelector(".submenu-content");

burgerIcon.addEventListener("click", () => {
	mobileNav.classList.toggle("active");
	burgerIcon.classList.toggle("active");
});

offerBtn.addEventListener("click", () => {
	submenuContent.classList.toggle("opened");
});
