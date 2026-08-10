const body = document.body;
const menu = document.querySelector(".side-menu");
const toggle = document.querySelector(".menu-toggle");
const closeButton = document.querySelector(".menu-close");
const overlay = document.querySelector(".menu-overlay");

let lastFocusedElement = null;

function openMenu() {
  lastFocusedElement = document.activeElement;
  body.classList.add("menu-open");
  toggle?.setAttribute("aria-expanded", "true");
  menu?.setAttribute("aria-hidden", "false");
  closeButton?.focus();
}

function closeMenu() {
  body.classList.remove("menu-open");
  toggle?.setAttribute("aria-expanded", "false");
  menu?.setAttribute("aria-hidden", "true");
  lastFocusedElement?.focus();
}

toggle?.addEventListener("click", openMenu);
closeButton?.addEventListener("click", closeMenu);
overlay?.addEventListener("click", closeMenu);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && body.classList.contains("menu-open")) {
    closeMenu();
  }

  // Trap focus dentro do menu quando aberto
  if (event.key === "Tab" && body.classList.contains("menu-open")) {
    const focusableElements = menu?.querySelectorAll(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );

    if (!focusableElements || focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  }
});

menu?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});