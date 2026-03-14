document.addEventListener("DOMContentLoaded", () => {
	// Elements
	const body = document.body;
	const overlay = document.getElementById("site-overlay");
	const headerOverlay = document.getElementById("header-overlay");
	const header = document.getElementById("site-header");

	// Mobile Menu Elements
	const menuToggle = document.getElementById("menu-toggle");
	const mobileMenu = document.getElementById("mobile-menu");
	const mobileMenuClose = document.getElementById("mobile-menu-close");

	// Cart Sidebar Elements
	const cartToggle = document.querySelector(".header-actions__btn--cart");
	const cartSidebar = document.getElementById("cart-sidebar");
	const cartClose = document.getElementById("cart-close");

	// Account Sidebar Elements
	const accountToggle = document.querySelector(".header-actions__btn--account");
	const accountSidebar = document.querySelector(".account-sidebar");
	const accountClose = document.querySelector(".account-sidebar__close");

	// Mega Menu Elements
	const hasMegaMenus = document.querySelectorAll(".has-mega-menu");

	// === 1. OBSŁUGA OVERLAY GŁÓWNEGO I MENU BAZOWEGO ===

	function closeAllMenus() {
		if (mobileMenu) mobileMenu.classList.remove("is-open");
		if (cartSidebar) cartSidebar.classList.remove("is-open");
		if (accountSidebar) accountSidebar.classList.remove("is-open");
		document
			.querySelectorAll(".mega-menu.is-open")
			.forEach((menu) => menu.classList.remove("is-open"));
		document
			.querySelectorAll(".nav-menu__link.is-active")
			.forEach((target) => target.classList.remove("is-active"));
		if (overlay) {
			overlay.classList.remove("is-active");
			// Opóźnienie usunięcia klasy z-index, aby overlay nie zniknął nagle z headera podczas animacji fade-out
			setTimeout(() => {
				if (!overlay.classList.contains("is-active")) {
					overlay.classList.remove("site-overlay--cart");
				}
			}, 300); // 300ms odpowiada czasowi transition w CSS
		}
		if (headerOverlay) headerOverlay.classList.remove("is-active");
		if (header) header.classList.remove("header--no-click");
		// body.classList.remove("menu-open");
	}

	// Otwieranie Offcanvas z Hamburgera na komórce
	if (menuToggle) {
		menuToggle.addEventListener("click", (e) => {
			e.preventDefault();
			const isOpen = mobileMenu.classList.contains("is-open");
			if (isOpen) {
				closeAllMenus();
			} else {
				mobileMenu.classList.add("is-open");
				overlay.classList.add("is-active"); // Ściemnienie tła
				if (headerOverlay) headerOverlay.classList.add("is-active"); // Ściemnienie headera (tylko na komórce)
				if (header) header.classList.add("header--no-click");
				// body.classList.add("menu-open"); // Blokada scrolla bazowego
			}
		});
	}

	// Zamykanie krzyżykiem Offcanvasa
	if (mobileMenuClose) {
		mobileMenuClose.addEventListener("click", closeAllMenus);
	}

	// Kliknięcie w Tło (Overlay) zamyka wszystkie okna
	if (overlay) {
		overlay.addEventListener("click", closeAllMenus);
	}
	if (headerOverlay) {
		headerOverlay.addEventListener("click", closeAllMenus);
	}

	// Zamknięcie po klawiszu Escape
	document.addEventListener("keydown", (e) => {
		if (e.key === "Escape") {
			closeAllMenus();
		}
	});

	// Zamknięcie Mega Menu po kliknięciu wykraczającym poza nawigację
	document.addEventListener("click", (e) => {
		// Zignoruj jeśli to kliknięcie chwycił sam overlay - ma on swój osobny zamykacz
		if (e.target === overlay) return;

		// Zignoruj jeśli to kliknięcie w sam obszar mega menu na desktopie
		if (e.target.closest(".mega-menu")) return;

		// Zignoruj jeśli klikasz w sam przycisk wywołujący nawigację
		if (e.target.closest(".nav-menu__link")) return;

		// Jeśli kliknięto gdziekolwiek indziej, a menu było otwarte - zaklasuj do zamknięcia
		const anyOpen = document.querySelector(".mega-menu.is-open");
		if (anyOpen && window.innerWidth >= 1024) {
			closeAllMenus();
		}
	});

	// === 2. OBSŁUGA MEGA MENU (Dynamiczna pętla dla wszystkich kategorii z submenu) ===

	if (hasMegaMenus.length > 0) {
		hasMegaMenus.forEach((menuItem) => {
			const trigger = menuItem.querySelector(".nav-menu__link");
			const megaMenu = menuItem.querySelector(".mega-menu");
			const backBtn = menuItem.querySelector(".mega-menu__back");

			if (trigger && megaMenu) {
				trigger.addEventListener("click", (e) => {
					e.preventDefault();

					const isOpen = megaMenu.classList.contains("is-open");

					// Zamknij najpierw wszystkie inne mega-menu (by płynne przeskakiwanie Chemia -> Akcesoria było czyste)
					document.querySelectorAll(".mega-menu.is-open").forEach((menu) => {
						if (menu !== megaMenu) menu.classList.remove("is-open");
					});
					document
						.querySelectorAll(".nav-menu__link.is-active")
						.forEach((target) => {
							if (target !== trigger) target.classList.remove("is-active");
						});

					if (isOpen) {
						// Zamykanie obecnego submenu
						megaMenu.classList.remove("is-open");
						trigger.classList.remove("is-active");

						// Zdejmij overlay tylko na desktopie, lub gdy menu mobilne jest wyłączone
						if (!mobileMenu || !mobileMenu.classList.contains("is-open")) {
							overlay.classList.remove("is-active");
							// body.classList.remove("menu-open");
						}
					} else {
						// Otwarcie submenu
						megaMenu.classList.add("is-open");
						trigger.classList.add("is-active");
						overlay.classList.add("is-active");

						if (window.innerWidth < 1024) {
							// body.classList.add("menu-open");
						}
					}
				});
			}

			if (backBtn && megaMenu) {
				backBtn.addEventListener("click", (e) => {
					e.preventDefault();
					megaMenu.classList.remove("is-open");
					if (trigger) trigger.classList.remove("is-active");
				});
			}
		});
	}

	// === 3. SMART STICKY HEADER ===
	let lastScrollY = window.scrollY;
	let ticked = false;
	const offerTabsBar = document.querySelector(".offer-tabs-bar");

	function updateHeader() {
		const currentScrollY = window.scrollY;

		// Zawsze reset na samej górze
		if (currentScrollY <= 0) {
			header.classList.remove("header--hidden");
			header.classList.remove("header--scrolled");
			header.classList.add("header--at-top");
			lastScrollY = currentScrollY;
		} else {
			header.classList.remove("header--at-top");

			// NOWOŚĆ: Sprawdź czy jakikolwiek menu (nawigacja lub koszyk) jest otwarte
			const isMenuOpen = document.querySelector(
				"#mobile-menu.is-open, .mega-menu.is-open, .cart-sidebar.is-open, .account-sidebar.is-open",
			);

			// Ignoruj mikro ruchy - wymagany dystans przewijania (zwiększone z 50 do 150 pikseli)
			if (Math.abs(currentScrollY - lastScrollY) < 150) {
				ticked = false;
				return;
			}

			// Jeżeli jedziemy w dół i przekroczono barierę wysokości headera z zapasem
			// ORAZ nie ma otwartego menu (jeśli menu jest otwarte, header musi zostać widoczny)
			if (currentScrollY > lastScrollY && currentScrollY > 200 && !isMenuOpen) {
				header.classList.add("header--hidden");
				header.classList.add("header--scrolled");
				lastScrollY = currentScrollY; // Zresetuj punkt odniesienia do kolejnego pchnięcia kółkiem
			} else if (currentScrollY < lastScrollY) {
				// Jeżeli jedziemy do góry
				header.classList.remove("header--hidden");
				header.classList.add("header--scrolled");
				lastScrollY = currentScrollY;
			}
		}

		// Aktualizuj offset sticky zakładek oferty (tylko mobile)
		if (offerTabsBar && window.innerWidth < 768) {
			const headerVisible = !header.classList.contains("header--hidden");
			const headerHeight = headerVisible
				? header.getBoundingClientRect().height
				: 0;
			offerTabsBar.style.top = headerHeight + "px";
		}

		ticked = false;
	}

	window.addEventListener("scroll", () => {
		if (!ticked) {
			window.requestAnimationFrame(updateHeader);
			ticked = true;
		}
	});

	// === 4. CUSTOM SEARCH DROPDOWN ===
	const searchDropdownWrap = document.querySelector(
		".search-form__select-wrap",
	);
	const searchDropdownToggle = document.querySelector(
		".search-form__select-toggle",
	);
	const searchDropdownText = document.querySelector(
		".search-form__select-text",
	);
	const searchDropdownInput = document.querySelector(
		".search-form__hidden-input",
	);
	const searchDropdownOptions = document.querySelectorAll(
		".search-form__option",
	);

	if (searchDropdownToggle) {
		// Toggle dropdown on click
		searchDropdownToggle.addEventListener("click", (e) => {
			e.preventDefault();
			searchDropdownWrap.classList.toggle("is-open");
			const expanded = searchDropdownWrap.classList.contains("is-open");
			searchDropdownToggle.setAttribute("aria-expanded", expanded);
		});

		// Handle option click
		searchDropdownOptions.forEach((option) => {
			option.addEventListener("click", (e) => {
				e.preventDefault();

				// Remove active class from all
				searchDropdownOptions.forEach((opt) =>
					opt.classList.remove("is-active"),
				);

				// Add active to current
				option.classList.add("is-active");

				// Update text and hidden input
				const value = option.getAttribute("data-value");
				const text = option.textContent;

				searchDropdownText.textContent = text;
				searchDropdownInput.value = value;

				// Close dropdown
				searchDropdownWrap.classList.remove("is-open");
				searchDropdownToggle.setAttribute("aria-expanded", "false");
			});
		});

		// Close when clicking outside of the dropdown
		document.addEventListener("click", (e) => {
			if (
				!searchDropdownWrap.contains(e.target) &&
				searchDropdownWrap.classList.contains("is-open")
			) {
				searchDropdownWrap.classList.remove("is-open");
				searchDropdownToggle.setAttribute("aria-expanded", "false");
			}
		});
	}

	// === 5. CATEGORIES TABS (Mobile) ===
	const tabBtns = document.querySelectorAll(".categories-tabs .tab-btn");
	const categoryCards = document.querySelectorAll(
		".categories-content .category-card",
	);

	if (tabBtns.length > 0 && categoryCards.length > 0) {
		tabBtns.forEach((btn) => {
			btn.addEventListener("click", (e) => {
				e.preventDefault();

				// Remove active classes
				tabBtns.forEach((b) => b.classList.remove("is-active"));
				categoryCards.forEach((card) => card.classList.remove("is-active"));

				// Add active class to clicked button
				btn.classList.add("is-active");

				// Show relative content card
				const tabId = btn.getAttribute("data-tab");
				const targetCard = document.getElementById(`tab-${tabId}`);
				if (targetCard) {
					targetCard.classList.add("is-active");
				}
			});
		});
	}

	// === 6. OFFER SECTION TABS (z fade animacją) ===
	const offerTabBtns = document.querySelectorAll(".offer-tab-btn");
	const offerPanels = document.querySelectorAll(".offer-panel");

	if (offerTabBtns.length > 0 && offerPanels.length > 0) {
		const offerSection = document.querySelector(".offer-section");

		offerTabBtns.forEach((btn) => {
			btn.addEventListener("click", () => {
				const target = btn.getAttribute("data-offer");
				const nextPanel = document.getElementById(`offer-${target}`);

				if (!nextPanel || nextPanel.classList.contains("is-active")) return;

				const currentPanel = document.querySelector(".offer-panel.is-active");

				// Przełącz aktywny przycisk
				offerTabBtns.forEach((b) => b.classList.remove("is-active"));
				btn.classList.add("is-active");

				if (currentPanel) {
					// 1. Fade OUT – usuń is-visible (opacity: 0, transition 0.35s)
					currentPanel.classList.remove("is-visible");

					setTimeout(() => {
						// 2. Ukryj stary panel (display: none)
						currentPanel.classList.remove("is-active");

						// 3. Pokaż nowy panel (display: flex, opacity jeszcze 0)
						nextPanel.classList.add("is-active");

						// 4. Fade IN – dodaj is-visible w kolejnym frame (opacity: 1, transition 0.35s)
						requestAnimationFrame(() => {
							requestAnimationFrame(() => {
								nextPanel.classList.add("is-visible");
							});
						});
					}, 350); // czekaj na zakończenie CSS transition
				} else {
					nextPanel.classList.add("is-active");
					requestAnimationFrame(() => {
						requestAnimationFrame(() => {
							nextPanel.classList.add("is-visible");
						});
					});
				}
			});
		});
	}

	// === 7. FOOTER ACCORDION (mobile + tablet) ===
	const footerAccordionBtns = document.querySelectorAll(
		".footer-nav__heading--accordion",
	);

	footerAccordionBtns.forEach((btn) => {
		btn.addEventListener("click", () => {
			// Accordion aktywny tylko poniżej desktop (< 1024px)
			if (window.innerWidth >= 1024) return;

			const column = btn.closest(".footer-nav__column--accordion");
			if (!column) return;

			const list = column.querySelector(".footer-nav__list--collapsible");
			if (!list) return;

			const isOpen = column.classList.contains("is-open");

			// Zamknij pozostałe – płynne zwijanie przez scrollHeight → 0
			document
				.querySelectorAll(".footer-nav__column--accordion.is-open")
				.forEach((col) => {
					if (col !== column) {
						const otherList = col.querySelector(
							".footer-nav__list--collapsible",
						);
						if (otherList) otherList.style.maxHeight = "0";
						col.classList.remove("is-open");
						col
							.querySelector(".footer-nav__heading--accordion")
							?.setAttribute("aria-expanded", "false");
					}
				});

			if (isOpen) {
				// Zamknij bieżący
				list.style.maxHeight = "0";
				column.classList.remove("is-open");
				btn.setAttribute("aria-expanded", "false");
			} else {
				// Otwórz bieżący – płynne rozwijanie do dokładnej wysokości zawartości
				list.style.maxHeight = list.scrollHeight + "px";
				column.classList.add("is-open");
				btn.setAttribute("aria-expanded", "true");
			}
		});
	});

	// === 8. OBSŁUGA KOSZYKA (Sidebar) ===

	if (cartToggle && cartSidebar) {
		cartToggle.addEventListener("click", (e) => {
			e.preventDefault();
			const isOpen = cartSidebar.classList.contains("is-open");

			if (isOpen) {
				closeAllMenus();
			} else {
				closeAllMenus(); // Zamknij inne menu przed otwarciem koszyka
				cartSidebar.classList.add("is-open");
				if (overlay) {
					overlay.classList.add("is-active");
					overlay.classList.add("site-overlay--cart");
				}
				// body.classList.add("menu-open");
			}
		});
	}

	if (cartClose) {
		cartClose.addEventListener("click", (e) => {
			e.preventDefault();
			closeAllMenus();
		});
	}

	// Obsługa ilości (Quantity control) - delegacja zdarzeń wewnątrz koszyka
	if (cartSidebar) {
		cartSidebar.addEventListener("click", (e) => {
			const btn = e.target.closest(".quantity-control__btn");
			if (!btn) return;

			const input = btn.parentNode.querySelector(".quantity-control__input");
			if (!input) return;

			let val = parseInt(input.value);

			if (btn.classList.contains("quantity-control__btn--plus")) {
				val++;
			} else if (btn.classList.contains("quantity-control__btn--minus")) {
				if (val > 1) val--;
			}

			input.value = val;
			// Tutaj w przyszłości można dodać wyzwalacz aktualizacji cen (AJAX/State)
		});
	}

	// === 9. OBSŁUGA KONTA (Sidebar + Password) ===

	if (accountToggle && accountSidebar) {
		accountToggle.addEventListener("click", (e) => {
			e.preventDefault();
			const isOpen = accountSidebar.classList.contains("is-open");

			if (isOpen) {
				closeAllMenus();
			} else {
				closeAllMenus();
				accountSidebar.classList.add("is-open");
				if (overlay) {
					overlay.classList.add("is-active");
					overlay.classList.add("site-overlay--cart"); // Używamy tej samej klasy z-index dla spójności
				}
			}
		});
	}

	if (accountClose) {
		accountClose.addEventListener("click", (e) => {
			e.preventDefault();
			closeAllMenus();
		});
	}

	// Przełączanie widoczności hasła
	const passwordToggles = document.querySelectorAll(".password-toggle");
	passwordToggles.forEach((btn) => {
		btn.addEventListener("click", () => {
			const input = btn.previousElementSibling;
			if (input && input.type === "password") {
				input.type = "text";
				btn.classList.add("is-visible");
			} else if (input) {
				input.type = "password";
				btn.classList.remove("is-visible");
			}
		});
	});
});
