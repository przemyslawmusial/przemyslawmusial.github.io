const burgerIcon = document.querySelector(".burger");
const mobileNav = document.querySelector("ul");
const offerBtn = document.querySelector(".submenu-btn");
const submenuContent = document.querySelector(".submenu-content");
const aboutUs = document.querySelector(".ul-container .about-us");
const contact = document.querySelector(".ul-container .contact-nav");
const selectBox = document.querySelectorAll(".select-box");
const selectAdvanced = document.querySelectorAll(".select-advanced");
const showSearchBtn = document.querySelector(".show-search");
const searchBox = document.querySelector(".search-box");
const offersMap = document.querySelector(".offers-map");
const showMapBtn = document.querySelector(".show-map");
const offersContainer = document.querySelector(".offers-container");





burgerIcon.addEventListener("click", () => {
	mobileNav.classList.toggle("active");
	burgerIcon.classList.toggle("active");
});

for (let i = 0; i < selectBox.length; i++) {
    selectBox[i].addEventListener("click", () => {
        const isActive = selectBox[i].classList.contains("active");

        if (!isActive) {
            selectAdvanced.forEach((singleSelectAdvanced) => {
                singleSelectAdvanced.classList.remove("active");
            });

            selectBox.forEach((singleSelectBox) => {
                singleSelectBox.classList.remove("active");
            });

            selectAdvanced[i].classList.add("active");
            selectBox[i].classList.add("active");
        } else {
            selectAdvanced[i].classList.remove("active");
            selectBox[i].classList.remove("active");
        }
    });

    selectAdvanced[i].addEventListener("click", (event) => {
        event.stopPropagation();
    });
}

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

document.querySelectorAll(".input-container input").forEach((input) => {
	input.addEventListener("focus", () => {
		input.parentNode.querySelector("label").style.top = "-10px";
		input.parentNode.querySelector("label").style.fontSize = "12px";
	});

	input.addEventListener("blur", () => {
		if (!input.value.trim()) {
			input.parentNode.querySelector("label").style.top = "5px";
			input.parentNode.querySelector("label").style.fontSize = "";
		}
	});
});

showMapBtn.addEventListener("click", () => {
	offersMap.classList.toggle("active");
	offersContainer.classList.toggle("disable");
});

showSearchBtn.addEventListener("click", () => {
	searchBox.classList.toggle("active");
});
