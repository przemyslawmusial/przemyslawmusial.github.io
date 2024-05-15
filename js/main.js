document.addEventListener("DOMContentLoaded", function () {

	const burgerIcon = document.querySelector(".burger");
	const mobileNav = document.querySelector("ul");
    const nav = document.querySelector("nav");
	const aboutUs = document.querySelector(".ul-container .about-us");
	const contact = document.querySelector(".ul-container .contact-nav");

	burgerIcon.addEventListener("click", () => {
		mobileNav.classList.toggle("active");
		burgerIcon.classList.toggle("active");
        if(window.scrollY < 300){
            nav.classList.toggle("active-bg");
        }
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

    function addShadow(){
        if(window.scrollY >= 300){
            nav.classList.add("shadow-bg")
        } else {
            nav.classList.remove("shadow-bg")
        }
    } 

    window.addEventListener('scroll', addShadow)
});
