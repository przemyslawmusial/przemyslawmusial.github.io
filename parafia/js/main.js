document.addEventListener("DOMContentLoaded", () => {
	const burgerIcon = document.querySelector(".burger");
	const mobileNav = document.querySelector("ul");
	const navContainer = document.querySelector(".nav-container");
	const navSubline = document.querySelector(".nav-container .subline");
	const navLinks = document.querySelectorAll(
		"nav .ul-container .links-container .close-links"
	);

	const submenuItems = document.querySelectorAll(
		".nav-container .ul-container .links-container .submenu"
	);

	submenuItems.forEach((submenu) => {
		const offersBtn = submenu.querySelector(".submenu-btn");
		const offersBtnArrow = offersBtn.querySelector("i");
		const submenuContent = submenu.querySelector(".submenu-content");
		const submenuBackBtn = submenu.querySelector("#back-btn");

		if (offersBtn) {
			offersBtn.addEventListener("click", (event) => {
				event.stopPropagation();

				if (window.innerWidth >= 992) {
					// Najpierw zamykamy wszystkie submenu
					submenuItems.forEach((otherSubmenu) => {
						const otherContent = otherSubmenu.querySelector(".submenu-content");
						const otherArrow = otherSubmenu.querySelector(".submenu-btn i");
						if (otherContent !== submenuContent) {
							otherContent.classList.remove("active");
							otherArrow.classList.remove("open");
						}
					});

					// Otwieramy kliknięty submenu
					submenuContent.classList.toggle("active");
					offersBtnArrow.classList.toggle("open");
				} else {
					submenuContent.classList.add("active");
				}
			});
		}

		if (submenuBackBtn) {
			submenuBackBtn.addEventListener("click", () => {
				submenuContent.classList.remove("active");
				offersBtnArrow.classList.remove("open");
			});
		}

		document.addEventListener("click", (event) => {
			if (
				submenuContent.classList.contains("active") &&
				!submenu.contains(event.target)
			) {
				submenuContent.classList.remove("active");
				offersBtnArrow.classList.remove("open");
			}
		});
	});

	window.addEventListener("scroll", function () {
		const nav = document.querySelector("nav");
		if (window.scrollY > 62) {
			nav.classList.add("scrolled");
		} else {
			nav.classList.remove("scrolled");
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
