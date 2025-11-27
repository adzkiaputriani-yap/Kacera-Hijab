// Toggle class active untuk hamburger menu
const navbarNav = document.querySelector(".navbar-nav");
// ketika hamburger menu di klik
document.querySelector("#menu").onclick = () => {
  navbarNav.classList.toggle("active");
};

// Toggle class active untuk search form
const searchForm = document.querySelector(".search-form");
const searchBox = document.querySelector("#search-box");

document.querySelector("#search-button").onclick = (e) => {
  searchForm.classList.toggle("active");
  searchBox.focus();
  e.preventDefault();
};

// Toggle class active untuk shopping cart
const shoppingCart = document.querySelector(".shopping-cart");
document.querySelector("#shopping-cart-button").onclick = (e) => {
  shoppingCart.classList.toggle("active");
  e.preventDefault();
};

// Klik di luar sidebar elemen
const menu = document.querySelector("#menu");
const sb = document.querySelector("#search-button");
const sc = document.querySelector("#shopping-cart-button");

document.addEventListener("click", function (e) {
  if (!menu.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove("active");
  }

  if (!sb.contains(e.target) && !searchForm.contains(e.target)) {
    searchForm.classList.remove("active");
  }

  if (!sc.contains(e.target) && !shoppingCart.contains(e.target)) {
    shoppingCart.classList.remove("active");
  }
});

// Modal Box
const itemDetailModal = document.querySelector("#item-detail-modal");

// EVENT DELEGATION (karena tombol dibuat oleh Alpine)
document.addEventListener("click", function (e) {
  if (e.target.closest(".item-detail-btn")) {
    e.preventDefault();
    itemDetailModal.style.display = "flex";
  }
});

// Tombol close
document.querySelector(".close-icon").addEventListener("click", function (e) {
  e.preventDefault();
  itemDetailModal.style.display = "none";
});

// Klik di luar modal
window.addEventListener("click", function (e) {
  if (e.target === itemDetailModal) {
    itemDetailModal.style.display = "none";
  }
});
