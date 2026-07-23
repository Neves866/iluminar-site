const body = document.body;
const menu = document.querySelector(".side-menu");
const toggle = document.querySelector(".menu-toggle");
const closeButton = document.querySelector(".menu-close");
const overlay = document.querySelector(".menu-overlay");

function openMenu() {
  body.classList.add("menu-open");
  toggle?.setAttribute("aria-expanded", "true");
  menu?.setAttribute("aria-hidden", "false");
  closeButton?.focus();
}

function closeMenu() {
  body.classList.remove("menu-open");
  toggle?.setAttribute("aria-expanded", "false");
  menu?.setAttribute("aria-hidden", "true");
}

toggle?.addEventListener("click", openMenu);
closeButton?.addEventListener("click", closeMenu);
overlay?.addEventListener("click", closeMenu);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && body.classList.contains("menu-open")) {
    closeMenu();
    toggle?.focus();
  }
});

menu?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});
