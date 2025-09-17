document.addEventListener("DOMContentLoaded", () => {
	const filtersModal = document.querySelector(".shop-filters-modal");
	const filtersModalBtn = document.querySelector(
		".shop-subpage-container .products-container .mobile-btns #filters-btn"
	);
	const filtersModalCloseBtn = document.querySelector(
		".shop-filters-modal .top-container .close-btn"
	);
	const overlay = document.querySelector(".modal-overlay");

	function openFilters() {
		filtersModal.classList.add("active");
		overlay.classList.add("active");
		document.body.classList.add("modal-open");
	}

	function closeFilters() {
		filtersModal.classList.remove("active");
		overlay.classList.remove("active");
		document.body.classList.remove("modal-open");
	}

	filtersModalBtn.addEventListener("click", openFilters);

	filtersModalCloseBtn.addEventListener("click", closeFilters);
	overlay.addEventListener("click", closeFilters);
});
