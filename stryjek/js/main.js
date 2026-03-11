document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const body = document.body;
    const overlay = document.getElementById('site-overlay');
    const headerOverlay = document.getElementById('header-overlay');
    const header = document.getElementById('site-header');
    
    // Mobile Menu Elements
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuClose = document.getElementById('mobile-menu-close');
    
    // Mega Menu Elements
    const hasMegaMenus = document.querySelectorAll('.has-mega-menu');

    // === 1. OBSŁUGA OVERLAY GŁÓWNEGO I MENU BAZOWEGO ===

    function closeAllMenus() {
        if(mobileMenu) mobileMenu.classList.remove('is-open');
        document.querySelectorAll('.mega-menu.is-open').forEach(menu => menu.classList.remove('is-open'));
        document.querySelectorAll('.nav-menu__link.is-active').forEach(target => target.classList.remove('is-active'));
        if(overlay) overlay.classList.remove('is-active');
        if(headerOverlay) headerOverlay.classList.remove('is-active');
        if(header) header.classList.remove('header--no-click');
        body.classList.remove('menu-open');
    }

    // Otwieranie Offcanvas z Hamburgera na komórce
    if (menuToggle) {
        menuToggle.addEventListener('click', (e) => {
            e.preventDefault();
            const isOpen = mobileMenu.classList.contains('is-open');
            if (isOpen) {
                closeAllMenus();
            } else {
                mobileMenu.classList.add('is-open');
                overlay.classList.add('is-active'); // Ściemnienie tła
                if(headerOverlay) headerOverlay.classList.add('is-active'); // Ściemnienie headera (tylko na komórce)
                if(header) header.classList.add('header--no-click');
                body.classList.add('menu-open');    // Blokada scrolla bazowego
            }
        });
    }

    // Zamykanie krzyżykiem Offcanvasa
    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', closeAllMenus);
    }

    // Kliknięcie w Tło (Overlay) zamyka wszystkie okna
    if (overlay) {
        overlay.addEventListener('click', closeAllMenus);
    }
    if (headerOverlay) {
        headerOverlay.addEventListener('click', closeAllMenus);
    }

    // Zamknięcie po klawiszu Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeAllMenus();
        }
    });

    // Zamknięcie Mega Menu po kliknięciu wykraczającym poza nawigację
    document.addEventListener('click', (e) => {
        // Zignoruj jeśli to kliknięcie chwycił sam overlay - ma on swój osobny zamykacz
        if (e.target === overlay) return;

        // Zignoruj jeśli to kliknięcie w sam obszar mega menu na desktopie
        if (e.target.closest('.mega-menu')) return;

        // Zignoruj jeśli klikasz w sam przycisk wywołujący nawigację
        if (e.target.closest('.nav-menu__link')) return;

        // Jeśli kliknięto gdziekolwiek indziej, a menu było otwarte - zaklasuj do zamknięcia
        const anyOpen = document.querySelector('.mega-menu.is-open');
        if (anyOpen && window.innerWidth >= 1024) {
            closeAllMenus();
        }
    });

    // === 2. OBSŁUGA MEGA MENU (Dynamiczna pętla dla wszystkich kategorii z submenu) ===

    if (hasMegaMenus.length > 0) {
        hasMegaMenus.forEach(menuItem => {
            const trigger = menuItem.querySelector('.nav-menu__link');
            const megaMenu = menuItem.querySelector('.mega-menu');
            const backBtn = menuItem.querySelector('.mega-menu__back');

            if (trigger && megaMenu) {
                trigger.addEventListener('click', (e) => {
                    e.preventDefault();
                    
                    const isOpen = megaMenu.classList.contains('is-open');

                    // Zamknij najpierw wszystkie inne mega-menu (by płynne przeskakiwanie Chemia -> Akcesoria było czyste)
                    document.querySelectorAll('.mega-menu.is-open').forEach(menu => {
                        if(menu !== megaMenu) menu.classList.remove('is-open');
                    });
                    document.querySelectorAll('.nav-menu__link.is-active').forEach(target => {
                        if(target !== trigger) target.classList.remove('is-active');
                    });

                    if (isOpen) {
                        // Zamykanie obecnego submenu
                        megaMenu.classList.remove('is-open');
                        trigger.classList.remove('is-active');
                        
                        // Zdejmij overlay tylko na desktopie, lub gdy menu mobilne jest wyłączone
                        if (!mobileMenu || !mobileMenu.classList.contains('is-open')) {
                            overlay.classList.remove('is-active');
                            body.classList.remove('menu-open');
                        }
                    } else {
                        // Otwarcie submenu
                        megaMenu.classList.add('is-open');
                        trigger.classList.add('is-active');
                        overlay.classList.add('is-active'); 
                        
                        if (window.innerWidth < 1024) {
                            body.classList.add('menu-open');
                        }
                    }
                });
            }

            if (backBtn && megaMenu) {
                backBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    megaMenu.classList.remove('is-open');
                    if (trigger) trigger.classList.remove('is-active');
                });
            }
        });
    }

    // === 3. SMART STICKY HEADER ===
    let lastScrollY = window.scrollY;
    let ticked = false;

    function updateHeader() {
        const currentScrollY = window.scrollY;

        // Zawsze reset na samej górze
        if (currentScrollY <= 0) {
            header.classList.remove('header--hidden');
            header.classList.remove('header--scrolled');
            header.classList.add('header--at-top');
            lastScrollY = currentScrollY;
        } else {
            header.classList.remove('header--at-top');
            // Ignoruj mikro ruchy - wymagany dystans przewijania (zwiększone z 50 do 150 pikseli)
            if (Math.abs(currentScrollY - lastScrollY) < 150) {
                ticked = false;
                return;
            }

            // Jeżeli jedziemy w dół i przekroczono barierę wysokości headera z zapasem
            if (currentScrollY > lastScrollY && currentScrollY > 200) {
                header.classList.add('header--hidden'); 
                header.classList.add('header--scrolled'); 
                lastScrollY = currentScrollY; // Zresetuj punkt odniesienia do kolejnego pchnięcia kółkiem
            } else if (currentScrollY < lastScrollY) {
                // Jeżeli jedziemy do góry
                header.classList.remove('header--hidden'); 
                header.classList.add('header--scrolled'); 
                lastScrollY = currentScrollY;
            }
        }

        ticked = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticked) {
            window.requestAnimationFrame(updateHeader);
            ticked = true;
        }
    });

    // === 4. CUSTOM SEARCH DROPDOWN ===
    const searchDropdownWrap = document.querySelector('.search-form__select-wrap');
    const searchDropdownToggle = document.querySelector('.search-form__select-toggle');
    const searchDropdownText = document.querySelector('.search-form__select-text');
    const searchDropdownInput = document.querySelector('.search-form__hidden-input');
    const searchDropdownOptions = document.querySelectorAll('.search-form__option');

    if (searchDropdownToggle) {
        // Toggle dropdown on click
        searchDropdownToggle.addEventListener('click', (e) => {
            e.preventDefault();
            searchDropdownWrap.classList.toggle('is-open');
            const expanded = searchDropdownWrap.classList.contains('is-open');
            searchDropdownToggle.setAttribute('aria-expanded', expanded);
        });

        // Handle option click
        searchDropdownOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Remove active class from all
                searchDropdownOptions.forEach(opt => opt.classList.remove('is-active'));
                
                // Add active to current
                option.classList.add('is-active');
                
                // Update text and hidden input
                const value = option.getAttribute('data-value');
                const text = option.textContent;
                
                searchDropdownText.textContent = text;
                searchDropdownInput.value = value;
                
                // Close dropdown
                searchDropdownWrap.classList.remove('is-open');
                searchDropdownToggle.setAttribute('aria-expanded', 'false');
            });
        });

        // Close when clicking outside of the dropdown
        document.addEventListener('click', (e) => {
            if (!searchDropdownWrap.contains(e.target) && searchDropdownWrap.classList.contains('is-open')) {
                searchDropdownWrap.classList.remove('is-open');
                searchDropdownToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }
});
