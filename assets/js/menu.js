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

// Integra os principais CTAs do site ao formulário público do LeadFlow.
// O WhatsApp do menu lateral continua disponível como canal direto.
const LEADFLOW_FORM_URL = "https://leadflow.cleuzasouza866.workers.dev/f/iluminar-orcamento";

const leadflowCampaignByPath = {
  "/": "home",
  "/index.html": "home",
  "/higienizacao/": "higienizacao_ar",
  "/higienizacao/index.html": "higienizacao_ar",
  "/instalacao/": "instalacao_ar",
  "/instalacao/index.html": "instalacao_ar",
  "/instalacoes-eletricas/": "instalacoes_eletricas",
  "/instalacoes-eletricas/index.html": "instalacoes_eletricas",
  "/seguranca-eletronica/": "seguranca_eletronica",
  "/seguranca-eletronica/index.html": "seguranca_eletronica",
  "/automacao/": "automacao_residencial",
  "/automacao/index.html": "automacao_residencial",
};

function buildLeadFlowUrl(campaign) {
  const target = new URL(LEADFLOW_FORM_URL);
  const currentParams = new URLSearchParams(window.location.search);
  const trackingParams = [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_content",
    "utm_term",
    "gclid",
    "fbclid",
  ];

  trackingParams.forEach((key) => {
    const value = currentParams.get(key);
    if (value) target.searchParams.set(key, value);
  });

  if (!target.searchParams.has("utm_source")) {
    target.searchParams.set("utm_source", "site_iluminar");
  }

  if (!target.searchParams.has("utm_medium")) {
    target.searchParams.set("utm_medium", "site");
  }

  if (!target.searchParams.has("utm_campaign")) {
    target.searchParams.set("utm_campaign", campaign);
  }

  return target.toString();
}

function setupLeadFlowLinks() {
  const campaign = leadflowCampaignByPath[window.location.pathname];
  if (!campaign) return;

  const links = document.querySelectorAll(
    'main a.btn-whatsapp[href*="wa.me/5545988429228"]'
  );

  links.forEach((link) => {
    link.href = buildLeadFlowUrl(campaign);
    link.removeAttribute("target");
    link.removeAttribute("rel");
    link.removeAttribute("onclick");
    link.classList.remove("btn-whatsapp");
    link.classList.add("btn-primary");
    link.textContent = "Solicitar atendimento";
    link.setAttribute("aria-label", "Solicitar atendimento com a Iluminar");

    link.addEventListener("click", () => {
      if (typeof window.gtag === "function") {
        window.gtag("event", "leadflow_form_open", {
          source_page: window.location.pathname,
          campaign,
        });
      }
    });
  });
}

setupLeadFlowLinks();