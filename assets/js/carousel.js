/**
 * CARROSSEL — SERVIÇOS REALIZADOS
 * Iluminar
 *
 * Renderização dinâmica a partir de array, autoplay com loop infinito,
 * drag/swipe, teclado, prefers-reduced-motion.
 */

document.addEventListener("DOMContentLoaded", () => {

  /* ================================================================
     DADOS DOS CARDS
     ================================================================ */

  /**
   * Adicione ou remova itens livremente neste array.
   * Cada objeto precisa de:
   *   · imagem — nome do arquivo dentro de assets/images/
   *   · titulo — frase curta exibida no card
   *
   * Exemplo:
   *   { imagem: "minha-foto.webp", titulo: "Instalação elétrica" }
   */
  const servicos = [
    { imagem: "foto-ar1.jpeg",       titulo: "Instalação de ar-condicionado" },
    { imagem: "foto-ar2.jpeg",       titulo: "Ar-condicionado instalado" },
    { imagem: "foto-ele1.jpeg",      titulo: "Instalação elétrica" },
    { imagem: "foto-ilu1.jpeg",      titulo: "Iluminação residencial" },
    { imagem: "foto-ilu2.jpeg",      titulo: "Projeto de iluminação" },
    { imagem: "foto-ilu3.jpeg",      titulo: "Iluminação decorativa" },
    { imagem: "foto-ilu4.jpeg",      titulo: "Luminárias instaladas" },
    { imagem: "foto-ilu5.jpeg",      titulo: "Iluminação profissional" },
    { imagem: "foto-ilu6.jpeg",      titulo: "Instalação de luminárias" },
    { imagem: "foto-ilu7.jpeg",      titulo: "Iluminação integrada" },
  ];

  const IMG_BASE = "./assets/images/";
  const SCROLL_SPEED = 1.2;

  /* ================================================================
     REFERÊNCIAS DOM
     ================================================================ */

  const container = document.querySelector(".services-carousel");
  const track     = document.querySelector(".services-track");

  if (!container || !track) return;

  const motionMedia = window.matchMedia("(prefers-reduced-motion: reduce)");
  const reducedMotion = motionMedia.matches;

  let originalCount = 0;
  let cardGap       = 0;
  let cardWidth     = 0;
  let loopLength    = 0;
  let animId        = null;
  let running       = false;
  let isHovering    = false;
  let isDragging    = false;
  let dragStart     = 0;
  let scrollStart   = 0;

  /* ================================================================
     RENDER
     ================================================================ */

  function createCard(item) {
    const card = document.createElement("figure");
    card.className = "service-work-card";
    card.setAttribute("role", "group");
    card.setAttribute("aria-label", "Servi\u00e7o: " + item.titulo);

    const img = document.createElement("img");
    img.src       = IMG_BASE + item.imagem;
    img.alt       = "Servi\u00e7o realizado \u2014 " + item.titulo;
    img.loading   = "lazy";
    img.decoding  = "async";

    const caption = document.createElement("figcaption");
    caption.textContent = item.titulo;

    card.appendChild(img);
    card.appendChild(caption);
    return card;
  }

  function renderCards() {
    const fragment = document.createDocumentFragment();

    servicos.forEach(function (item) {
      fragment.appendChild(createCard(item));
    });

    servicos.forEach(function (item) {
      var clone = createCard(item);
      clone.setAttribute("aria-hidden", "true");
      fragment.appendChild(clone);
    });

    track.appendChild(fragment);
    originalCount = servicos.length;
  }

  /* ================================================================
     DIMENSÕES
     ================================================================ */

  function updateDimensions() {
    if (originalCount === 0) return;

    var firstCard = track.querySelector(".service-work-card");
    if (!firstCard) return;

    // Lê o valor computado da custom property no container,
    // considerando os breakpoints responsivos do CSS
    var style = getComputedStyle(container);
    cardGap   = parseFloat(style.getPropertyValue("--card-gap")) || 18;
    cardWidth = firstCard.offsetWidth;

    // Largura de um conjunto completo (todos os cards originais
    // + os gaps entre eles + o gap que separa da duplicata).
    // Ao atingir este scrollLeft, o conteúdo é idêntico ao inicial,
    // permitindo reset invisível do loop infinito.
    loopLength = originalCount * cardWidth + originalCount * cardGap;
  }

  /* ================================================================
     AUTOPLAY
     ================================================================ */

  function tick() {
    if (motionMedia.matches || isHovering || isDragging) {
      running = false;
      animId  = null;
      return;
    }

    container.scrollLeft += SCROLL_SPEED;

    if (container.scrollLeft >= loopLength) {
      container.scrollLeft -= loopLength;
    }

    running = true;
    animId  = requestAnimationFrame(tick);
  }

  function startLoop() {
    if (running || motionMedia.matches) return;
    running = true;
    animId  = requestAnimationFrame(tick);
  }

  function stopLoop() {
    if (animId !== null) {
      cancelAnimationFrame(animId);
      animId = null;
    }
    running = false;
  }

  /* ================================================================
     DRAG
     ================================================================ */

  function onPointerDown(clientX) {
    isDragging  = true;
    dragStart   = clientX;
    scrollStart = container.scrollLeft;
    container.classList.add("dragging");
    stopLoop();
  }

  function onPointerMove(clientX) {
    if (!isDragging) return;
    container.scrollLeft = scrollStart - (clientX - dragStart);
  }

  function onPointerUp() {
    if (!isDragging) return;
    isDragging = false;
    container.classList.remove("dragging");
    if (!isHovering) startLoop();
  }

  // Mouse
  container.addEventListener("mousedown", function (e) {
    if (e.button !== 0) return;
    onPointerDown(e.clientX);
  });

  document.addEventListener("mousemove", function (e) {
    onPointerMove(e.clientX);
  });

  document.addEventListener("mouseup", onPointerUp);

  // Touch
  container.addEventListener("touchstart", function (e) {
    onPointerDown(e.touches[0].clientX);
  }, { passive: true });

  container.addEventListener("touchmove", function (e) {
    onPointerMove(e.touches[0].clientX);
  }, { passive: true });

  container.addEventListener("touchend", onPointerUp, { passive: true });

  /* ================================================================
     HOVER / FOCUS
     ================================================================ */

  container.addEventListener("mouseenter", function () {
    isHovering = true;
    stopLoop();
  });

  container.addEventListener("mouseleave", function () {
    isHovering = false;
    if (!isDragging) startLoop();
  });

  // Pausa o autoplay enquanto o teclado estiver navegando no carrossel
  container.addEventListener("focusin", function () {
    stopLoop();
  });

  // Retoma o autoplay quando o foco sai do carrossel
  container.addEventListener("focusout", function () {
    if (!isHovering && !isDragging) startLoop();
  });

  /* ================================================================
     TECLADO
     ================================================================ */

  container.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      container.scrollBy({ left: -(cardWidth + cardGap), behavior: "smooth" });
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      container.scrollBy({ left: cardWidth + cardGap, behavior: "smooth" });
    }
  });

  /* ================================================================
     PREFERS-REDUCED-MOTION
     ================================================================ */

  motionMedia.addEventListener("change", function (e) {
    if (e.matches) {
      stopLoop();
    } else if (!isHovering && !isDragging) {
      startLoop();
    }
  });

  /* ================================================================
     RESIZE + VISIBILITY
     ================================================================ */

  function handleResize() {
    updateDimensions();
    // Evita que o autoplay fique preso em scrollLeft inválido
    if (container.scrollLeft > loopLength) {
      container.scrollLeft = 0;
    }
  }

  var resizeObs = new ResizeObserver(handleResize);
  resizeObs.observe(container);

  window.addEventListener("resize", handleResize);

  var visibilityObs = new IntersectionObserver(function (entries) {
    var entry = entries[0];
    if (entry.isIntersecting) {
      updateDimensions();
      if (!reducedMotion && !isHovering && !isDragging) startLoop();
    } else {
      stopLoop();
    }
  }, { threshold: 0.01 });
  visibilityObs.observe(container);

  /* ================================================================
     INIT
     ================================================================ */

  renderCards();
  updateDimensions();

  if (!reducedMotion) {
    startLoop();
  }
});