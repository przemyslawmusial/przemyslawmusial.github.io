document.addEventListener("DOMContentLoaded", function () {
	const burgerIcon = document.querySelector(".burger");
	const mobileNav = document.querySelector("ul");
	const offerBtn = document.querySelector(".submenu-btn");
	const submenuContent = document.querySelector(".submenu-content");
	const nav = document.querySelector("nav");
	const contact = document.querySelector(".ul-container .contact-nav");
	const navLinks = document.querySelectorAll(".ul-container li a");
	const cookieConsent = document.getElementById("cookieConsent");
	const cookieConsentOK = document.getElementById("cookieConsentOK");

	burgerIcon.addEventListener("click", () => {
		mobileNav.classList.toggle("active");
		burgerIcon.classList.toggle("active");
		if (window.scrollY < 300) {
			nav.classList.toggle("active-bg");
		}
	});

	function closeNavigation() {
		if (mobileNav.classList.contains("active")) {
			mobileNav.classList.remove("active");
			burgerIcon.classList.remove("active");
		}
	}

	contact.addEventListener("click", () => {
		closeNavigation();
	});

	function addShadow() {
		if (window.scrollY >= 100) {
			nav.classList.add("shadow-bg");
			navLinks.forEach((link) => {
				link.classList.add("change");
			});
		} else {
			nav.classList.remove("shadow-bg");
			navLinks.forEach((link) => {
				link.classList.remove("change");
			});
		}
	}

	if (offerBtn) {
		offerBtn.addEventListener("click", () => {
			if (window.innerWidth <= 768) {
				// Sprawdza, czy szerokość okna jest mniejsza lub równa 768px
				submenuContent.classList.toggle("opened");
			}
		});
	}

	window.addEventListener("scroll", addShadow);

	function hideCookieConsent() {
		cookieConsent.classList.remove("show");
		document.cookie =
			"cookieConsentAccepted=true; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/";
	}

	setTimeout(function () {
		if (document.cookie.indexOf("cookieConsentAccepted=true") === -1) {
			cookieConsent.classList.add("show");
		}
	}, 2000);

	// Sprawdzenie, czy użytkownik wcześniej zaakceptował
	// if (document.cookie.indexOf("cookieConsentAccepted=true") === -1) {
	// 	cookieConsent.style.display = "block";
	// }

	cookieConsentOK.addEventListener("click", function () {
		hideCookieConsent();
	});
});
