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
	const accordionItems = document.querySelectorAll(".faq-container .card");

	accordionItems.forEach((item) => {
		const header = item.querySelector(".accordion-header");
		const content = item.querySelector(".accordion-content");

		header.addEventListener("click", function () {
			const isActive = item.classList.contains("active");

			accordionItems.forEach((otherItem) => {
				otherItem.classList.remove("active");

				const otherContent = otherItem.querySelector(".accordion-content");
				if (otherContent) {
					otherContent.classList.remove("active");
				}
			});

			if (!isActive) {
				item.classList.add("active");
				content.classList.add("active");
			}
		});
	});

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
		const lines = document.querySelectorAll("nav .nav-container .burger .line");
		const logo = document.querySelector("nav .nav-container img");
		if (window.scrollY > 62) {
			nav.classList.add("scrolled");
			lines.forEach((line) => {
				line.classList.add("scrolled");
			});
			logo.classList.add("scrolled");
		} else {
			nav.classList.remove("scrolled");
			lines.forEach((line) => {
				line.classList.remove("scrolled");
			});
			logo.classList.remove("scrolled");
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
