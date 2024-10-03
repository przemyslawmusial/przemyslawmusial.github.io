document.addEventListener("DOMContentLoaded", function () {
	const mobileNav = document.querySelector("ul");
	const burgerIcon = document.querySelector("nav .nav-container i");
	const nav = document.querySelector("nav");

	burgerIcon.addEventListener("click", () => {
		mobileNav.classList.toggle("active");
		burgerIcon.classList.toggle("active");

		if (mobileNav.classList.contains("active")) {
			burgerIcon.classList.remove("fa-bars");
			burgerIcon.classList.add("fa-xmark");
		} else {
			burgerIcon.classList.add("fa-bars");
			burgerIcon.classList.remove("fa-xmark");
		}
	});

	function closeNavigation() {
		if (mobileNav.classList.contains("active")) {
			mobileNav.classList.remove("active");
			burgerIcon.classList.remove("fa-xmark");
			burgerIcon.classList.add("fa-bars");
		}
	}

	mobileNav.addEventListener("click", () => {
		closeNavigation();
	});

	const bar = document.querySelector(".scroll-bar");
	const statusBar = () => {
		currentScroll = Math.round(
			(window.scrollY /
				(document.documentElement.offsetHeight - window.innerHeight)) *
				100
		);
		bar.style.width = currentScroll + "%";
	};

	window.addEventListener("scroll", statusBar);
});
