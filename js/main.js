const burgerIcon = document.querySelector(".burger");
const mobileNav = document.querySelector("ul");
const offerBtn = document.querySelector(".submenu-btn");
const submenuContent = document.querySelector(".submenu-content");
const aboutUs = document.querySelector(".ul-container .about-us");
const contact = document.querySelector(".ul-container .contact-nav");

burgerIcon.addEventListener("click", () => {
	mobileNav.classList.toggle("active");
	burgerIcon.classList.toggle("active");
});

offerBtn.addEventListener("click", () => {
	submenuContent.classList.toggle("opened");
});

function closeNavigation() {
	if (mobileNav.classList.contains("active")) {
		mobileNav.classList.remove("active");
		burgerIcon.classList.remove("active");
	}
}

aboutUs.addEventListener("click", () => {
	closeNavigation();
});

contact.addEventListener("click", () => {
	closeNavigation();
});
