/* =========================================================
   PANTHERCODE · main.js
   1. CONTENIDO EDITABLE  ← edita aquí tus proyectos, habilidades y textos
   2. Utilidades
   3. Emblema (carga de assets/panther.svg)
   4. Render de contenido
   5. Router por hash y transiciones entre vistas
   6. Animaciones de scroll (reveal, contadores, barras)
   7. Interacciones (header, progreso, menú, carrusel, acordeón, modal, correo)
   8. Botones (ripple y efecto magnético) y emblema 3D
   9. Cursor personalizado y garras
   10. Inicio
   ========================================================= */

/* =========================================================
   1. CONTENIDO EDITABLE
   ========================================================= */

/* INTERACCIONES: cambia a false para desactivar cualquiera por separado. */
const ENABLE = {
  dots: true,      // 1. Fondo de puntos reactivo en Inicio
  curtain: true,   // 2. Cortina de columnas al cambiar de vista
  split: true,     // 3. Héroe dividido DISEÑO | CÓDIGO en Sobre mí (false lo oculta)
  board: true,     // 4. Modo Tablero arrastrable en Proyectos (false oculta el botón)
  scramble: true,  // 5. Texto que se descifra en la navegación
};

/* Correo de contacto (se usa en "Copiar correo"). */
const EMAIL = "richardandreslam@gmail.com";

/* WHATSAPP: número con código de país (57 = Colombia), sin espacios ni "+".
   El mensaje aparece ya escrito cuando el visitante abre el chat. */
const WHATSAPP = {
  number: "573016407222",
  label: "+57 301 640 7222",
  message: "¡Hola Richard! Vi tu portafolio Panthercode y me gustaría hablar contigo.",
};

/* CÓDIGO (Sobre mí): información que aparece después de la animación de código. */
const CODE_INFO = [
  "<b>HTML</b> semántico y accesible, pensado para todas las personas.",
  "<b>CSS</b> para layouts responsive, animaciones y detalles visuales.",
  "<b>JavaScript</b> para interacciones como las de este portafolio.",
];

/* LOGO DE LA UNIVERSIDAD
   Guarda el archivo en assets/uni-logo.png y cambia null por "assets/uni-logo.png".
   Mientras sea null se muestra el texto "UNIVERSIDAD SERGIO ARBOLEDA / Santa Marta". */
const UNI_LOGO = null;

/* PROYECTOS
   t: título · c: categoría (Branding, UI/UX, Web o Motion) · d: descripción · g: tags
   o: objetivo (opcional, se muestra en el modal) · i: iniciales de la miniatura (opcional; si no, se calculan del título)
   El orden de este array es el orden en la cuadrícula y en "Proyectos recientes".
   Los filtros se crean solos a partir de las categorías que uses aquí. */
const PROJECTS = [
  {
    t: "Visual Text Assist",
    c: "UI/UX",
    d: "Propuesta de aplicación móvil para ayudar a personas con ceguera a acceder a libros físicos mediante la cámara del celular y el reconocimiento de texto. Convierte el contenido escrito en audio y permite ajustar la velocidad de reproducción y el idioma.",
    o: "Crear una experiencia digital más accesible, práctica e inclusiva.",
    g: ["Diseño UX/UI", "Accesibilidad digital"],
  },
  {
    t: "Baseball Nation",
    c: "UI/UX",
    d: "Propuesta de aplicación para aficionados al béisbol que reúne partidos, resultados, próximos encuentros, noticias y estadísticas de jugadores en un mismo lugar, pensada para personas de diferentes edades.",
    o: "Organizar la información deportiva en una experiencia digital atractiva y sencilla.",
    g: ["Diseño de aplicaciones", "Experiencia de usuario"],
  },
  {
    t: "SIU – SETP Santa Marta",
    i: "SIU",
    c: "UI/UX",
    d: "Interfaz para el Sistema de Información al Usuario del Sistema Estratégico de Transporte Público de Santa Marta, orientada a estudiantes universitarios y trabajadores que consultan rutas, paraderos y tiempos estimados de llegada de los buses.",
    o: "Facilitar el acceso a la información del transporte público mediante una interfaz clara, intuitiva y útil para la vida cotidiana.",
    g: ["UX/UI", "Movilidad urbana", "Diseño centrado en el usuario"],
  },
];

/* HABILIDADES (n: nombre · v: nivel de 0 a 100). Se usan en las barras, el contador y la cinta. */
const SKILLS = [
  { n: "Figma", v: 85 },
  { n: "Illustrator", v: 80 },
  { n: "Photoshop", v: 75 },
  { n: "HTML y CSS", v: 65 },
  { n: "After Effects", v: 55 },
];

/* DISCIPLINAS del acordeón del inicio. c debe coincidir con una categoría de PROJECTS para filtrar. */
const DISCIPLINES = [
  { n: "Branding", c: "Branding", d: "Identidades visuales coherentes: símbolo, color, tipografía y un sistema que la marca pueda usar en cualquier soporte." },
  { n: "UI/UX", c: "UI/UX", d: "Interfaces claras que parten de entender a las personas: flujos, wireframes, prototipos y pruebas." },
  { n: "Motion", c: "Motion", d: "Movimiento con intención: logotipos animados, microinteracciones y piezas que cuentan una historia." },
];

/* PRINCIPIOS (sección 01 del inicio). */
const PRINCIPLES = [
  { t: "Claridad", d: "Si no se entiende a la primera, se rediseña." },
  { t: "Detalle", d: "Los pequeños ajustes son los que separan lo bueno de lo memorable." },
  { t: "Experimentación", d: "Probar, equivocarse rápido y quedarse con lo que funciona." },
  { t: "Constancia", d: "Mejorar un poco cada día, proyecto tras proyecto." },
];

/* ESTADÍSTICAS de "Sobre mí" (s: sufijo opcional). */
const ABOUT_STATS = [
  { v: 2, s: "+", l: "Años diseñando" },
  { v: PROJECTS.length, l: "Proyectos" },
  { v: SKILLS.length, l: "Herramientas" },
];

/* LÍNEA DE TIEMPO de "Sobre mí". Reemplaza los textos entre corchetes. future: true dibuja el punto vacío. */
const TIMELINE = [
  { y: "[2024] — Actualidad", t: "Diseño Digital · Universidad Sergio Arboleda", d: "Sede Santa Marta. [Describe tu semestre actual y lo que estás aprendiendo.]" },
  { y: "[Año]", t: "Mis primeros proyectos como diseñador digital", d: "Visual Text Assist, Baseball Nation y SIU – SETP Santa Marta: propuestas UX/UI centradas en la accesibilidad, el deporte y la movilidad urbana." },
  { y: "[Año]", t: "Bachillerato", d: "[Nombre del colegio y algún logro o interés relacionado con el diseño.]" },
  { y: "Próxima meta", t: "[Tu siguiente objetivo]", d: "[Por ejemplo: prácticas en un estudio de diseño o tu primer cliente internacional.]", future: true },
];

/* FRASE DE CIERRE de "Sobre mí". a: inicio de la frase · b: final resaltado en verde cursiva · s: línea de apoyo. */
const ABOUT_QUOTE = {
  a: "Diseño para que la tecnología se adapte a las personas,",
  b: "no al revés.",
  s: "Cada proyecto empieza con una pregunta: ¿a quién le va a cambiar el día?",
};

/* Frases de la barra de anuncio. */
const ANNOUNCE = [
  "Disponible para prácticas y colaboraciones",
  "Diseño digital",
  "Santa Marta, Colombia",
  "Universidad Sergio Arboleda",
  EMAIL,
];

/* =========================================================
   2. UTILIDADES
   ========================================================= */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

const escapeHtml = (text) =>
  String(text).replace(/[&<>"']/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[ch]);

/* Iniciales para la miniatura generativa: "App Ruta Sierra" → "AR". */
const initials = (title) =>
  title.split(/\s+/).filter((w) => w.length > 2 || /^[A-Z0-9]/.test(w)).slice(0, 2).map((w) => w[0].toUpperCase()).join("");

/* Degradado oscuro distinto por proyecto. */
const thumbColors = (index) => {
  const hue = (120 + index * 37) % 360;
  return `--t1:hsl(${hue} 22% 12%);--t2:hsl(${(hue + 40) % 360} 18% 4%)`;
};

const thumbHtml = (project, index) => {
  const letters = project.i ?? initials(project.t);
  return `<div class="thumb" style="${thumbColors(index)}"><span>${escapeHtml(letters[0] ?? "")}<b>${escapeHtml(letters.slice(1))}</b></span></div>`;
};

/* =========================================================
   3. EMBLEMA
   Lee los trazos de assets/panther.svg y los pone en el sprite de la página,
   así el emblema grande y el del cursor comparten la misma silueta.
   ========================================================= */
const loadPanther = async () => {
  try {
    const response = await fetch("assets/panther.svg");
    if (!response.ok) return;
    const svg = new DOMParser().parseFromString(await response.text(), "image/svg+xml");
    const defs = $("#panther-defs");
    ["panther-silhouette", "panther-eye"].forEach((id) => {
      const source = svg.getElementById(id);
      if (!source) return;
      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.id = id;
      path.setAttribute("d", source.getAttribute("d"));
      defs.appendChild(path);
    });
    // Fuerza a los <use> a resolver los trazos recién insertados
    $$("use").forEach((use) => use.setAttribute("href", use.getAttribute("href")));
  } catch {
    /* Abierto con file://: usa Live Server para que el emblema cargue. */
  }
};

/* =========================================================
   4. RENDER DE CONTENIDO
   ========================================================= */
const CATEGORIES = ["Todos", ...new Set(PROJECTS.map((p) => p.c))];
let activeFilter = "Todos";

const marqueeHtml = (items) => {
  const group = items.map((item) => `<span>${escapeHtml(item)}</span>`).join("");
  return group + group; // duplicado para el bucle infinito
};

const cardHtml = (project, index) => `
  <button class="card" type="button" data-project="${index}" aria-label="Ver proyecto ${escapeHtml(project.t)}">
    ${thumbHtml(project, index)}
    <div class="card__body">
      <span class="tag">${escapeHtml(project.c)}</span>
      <h3 class="card__title">${escapeHtml(project.t)}</h3>
      <p class="card__desc">${escapeHtml(project.d)}</p>
      <ul class="tags">${project.g.map((tag) => `<li>${escapeHtml(tag)}</li>`).join("")}</ul>
    </div>
  </button>`;

const renderStatic = () => {
  $("#announce-track").innerHTML = marqueeHtml(ANNOUNCE);
  $("#ribbon-track").innerHTML = marqueeHtml([...SKILLS.map((s) => s.n), ...DISCIPLINES.map((d) => d.n), "Diseño digital"]);

  $("#home-counters").innerHTML = [
    { v: PROJECTS.length, l: "Proyectos" },
    { v: SKILLS.length, l: "Herramientas" },
    { v: 3, l: "Disciplinas" },
  ].map((c) => `<div class="counter"><strong data-count="${c.v}">0</strong><span class="tag">${c.l}</span></div>`).join("");

  $("#principles").innerHTML = PRINCIPLES.map((p, i) => `
    <article class="principle reveal" style="transition-delay:${i * 80}ms">
      <span class="tag">0${i + 1}</span>
      <h3>${escapeHtml(p.t)}</h3>
      <p>${escapeHtml(p.d)}</p>
    </article>`).join("");

  $("#accordion").innerHTML = DISCIPLINES.map((d, i) => `
    <button class="panel${i === 0 ? " is-active" : ""}" type="button" data-panel="${i}" aria-expanded="${i === 0}">
      <span class="tag">0${i + 1} / Disciplina</span>
      <span class="panel__name">${escapeHtml(d.n)}</span>
      <span class="panel__body">
        <p>${escapeHtml(d.d)}</p>
        <span class="tag panel__cta">Ver proyectos →</span>
      </span>
    </button>`).join("");

  $("#carousel").innerHTML = PROJECTS.map(cardHtml).join("");

  $("#about-stats").innerHTML = ABOUT_STATS.map((s) => `
    <div class="stat"><strong data-count="${s.v}" data-suffix="${s.s ?? ""}">0</strong><span class="tag">${escapeHtml(s.l)}</span></div>`).join("");

  $("#skills").innerHTML = SKILLS.map((s) => `
    <li class="skill" style="--v:${s.v}%">
      <div class="skill__top"><span>${escapeHtml(s.n)}</span><span>${s.v}%</span></div>
      <div class="skill__bar" role="progressbar" aria-label="${escapeHtml(s.n)}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${s.v}"><span></span></div>
    </li>`).join("");

  $("#about-quote").innerHTML = `
    <p class="tag">[ Mi forma de diseñar ]</p>
    <blockquote>${escapeHtml(ABOUT_QUOTE.a)} <em>${escapeHtml(ABOUT_QUOTE.b)}</em></blockquote>
    <p class="about-quote__sub">${escapeHtml(ABOUT_QUOTE.s)}</p>`;

  $("#timeline").innerHTML = TIMELINE.map((item) => `
    <li class="reveal${item.future ? " is-future" : ""}">
      <span class="tag">${escapeHtml(item.y)}</span>
      <h3>${escapeHtml(item.t)}</h3>
      <p>${escapeHtml(item.d)}</p>
    </li>`).join("");
};

const renderFilters = () => {
  $("#filters").innerHTML = CATEGORIES.map((cat) =>
    `<button class="filter" type="button" data-filter="${escapeHtml(cat)}" aria-pressed="${cat === activeFilter}">${escapeHtml(cat)}</button>`).join("");
};

const renderGrid = () => {
  $("#grid").innerHTML = PROJECTS
    .map((project, index) => ({ project, index }))
    .filter(({ project }) => activeFilter === "Todos" || project.c === activeFilter)
    .map(({ project, index }) => cardHtml(project, index))
    .join("");
};

const setFilter = (category) => {
  activeFilter = CATEGORIES.includes(category) ? category : "Todos";
  renderFilters();
  renderGrid();
  if (projectsMode === "board") renderBoard();
};

/* =========================================================
   5. ROUTER POR HASH
   ========================================================= */
const VIEWS = ["inicio", "proyectos", "sobre-mi", "contacto"];
const VIEW_TITLES = {
  inicio: "Panthercode · Richard Díaz · Diseño Digital",
  proyectos: "Proyectos · Panthercode",
  "sobre-mi": "Sobre mí · Panthercode",
  contacto: "Contacto · Panthercode",
};
let currentView = null;
let navigating = false;

/* Cambia de vista al instante: oculta las demás, vuelve arriba y reinicia sus animaciones. */
const swapView = (name) => {
  const next = $(`[data-view="${name}"]`);
  $$(".view").forEach((view) => { view.hidden = view !== next; });
  window.scrollTo(0, 0);
  armView(next);
  document.title = VIEW_TITLES[name];

  currentView = name;
  $$("[data-nav]").forEach((link) => {
    const active = link.dataset.nav === name;
    link.classList.toggle("is-active", active);
    if (active) link.setAttribute("aria-current", "page"); else link.removeAttribute("aria-current");
  });
  closeMenu();
  if (name === "inicio") startAccordion(); else stopAccordion();
  onViewChange(name);
};

const showView = async (name) => {
  if (!$(`[data-view="${name}"]`) || name === currentView || navigating) return;
  // Primera carga o movimiento reducido: sin cortina
  if (!currentView || !ENABLE.curtain || reducedMotion.matches) { swapView(name); return; }

  navigating = true;
  await playCurtain(() => swapView(name));
  navigating = false;
  route(); // si el hash cambió durante la transición, se sincroniza al final
};

const route = () => {
  const name = location.hash.slice(1) || "inicio";
  if (VIEWS.includes(name)) showView(name);
  else if (!currentView) showView("inicio");
};

/* Navegación desde código: go("proyectos"). Pasa por el hash para que funcione el botón Atrás. */
const go = (name) => {
  if (!VIEWS.includes(name) || navigating) return;
  if (location.hash.slice(1) === name) route();
  else location.hash = `#${name}`;
};
window.go = go;

/* =========================================================
   6. ANIMACIONES DE SCROLL
   ========================================================= */
const animateCount = (el) => {
  const target = Number(el.dataset.count);
  const suffix = el.dataset.suffix ?? "";
  if (reducedMotion.matches) { el.textContent = target + suffix; return; }
  const start = performance.now();
  const duration = 1400;
  const tick = (now) => {
    const p = Math.min((now - start) / duration, 1);
    el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))) + suffix;
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    el.classList.add("in");
    if (el.dataset.count !== undefined) animateCount(el);
    observer.unobserve(el);
  });
}, { threshold: 0.18, rootMargin: "0px 0px -40px 0px" });

/* Reinicia las animaciones de una vista cada vez que se muestra. */
const armView = (view) => {
  $$(".reveal, .skill, [data-count]", view).forEach((el) => {
    el.classList.remove("in");
    if (el.dataset.count !== undefined) el.textContent = "0" + (el.dataset.suffix ?? "");
    observer.observe(el);
  });
};

/* =========================================================
   7. INTERACCIONES
   ========================================================= */

/* Header con blur y barra de progreso de lectura */
const onScroll = () => {
  $("#header").classList.toggle("is-scrolled", window.scrollY > 10);
  const max = document.documentElement.scrollHeight - window.innerHeight;
  $("#progress-bar").style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
};

/* Menú móvil */
const closeMenu = () => {
  $("#nav").classList.remove("is-open");
  $("#menu-btn").setAttribute("aria-expanded", "false");
  $("#menu-btn").setAttribute("aria-label", "Abrir menú");
};
const toggleMenu = () => {
  const open = !$("#nav").classList.contains("is-open");
  $("#nav").classList.toggle("is-open", open);
  $("#menu-btn").setAttribute("aria-expanded", String(open));
  $("#menu-btn").setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
};

/* Toast y copiar correo */
let toastTimer;
const showToast = (message) => {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 2200);
};

const copyEmail = async () => {
  try {
    await navigator.clipboard.writeText(EMAIL);
  } catch {
    // Respaldo para navegadores sin API de portapapeles
    const field = document.createElement("textarea");
    field.value = EMAIL;
    field.setAttribute("readonly", "");
    field.style.position = "fixed";
    field.style.opacity = "0";
    document.body.appendChild(field);
    field.select();
    document.execCommand("copy");
    field.remove();
  }
  showToast("Correo copiado");
};

/* Acordeón de disciplinas: rota cada 4.5 s */
let accordionTimer = null;
let activePanel = 0;

const setPanel = (index) => {
  activePanel = index;
  $$(".panel").forEach((panel, i) => {
    panel.classList.toggle("is-active", i === index);
    panel.setAttribute("aria-expanded", String(i === index));
  });
};
const startAccordion = () => {
  stopAccordion();
  if (reducedMotion.matches) return;
  accordionTimer = setInterval(() => setPanel((activePanel + 1) % DISCIPLINES.length), 4500);
};
const stopAccordion = () => clearInterval(accordionTimer);

const initAccordion = () => {
  $$(".panel").forEach((panel) => {
    const index = Number(panel.dataset.panel);
    panel.addEventListener("mouseenter", () => {
      if (!finePointer.matches) return;
      setPanel(index);
      startAccordion();
    });
    panel.addEventListener("click", () => {
      if (panel.classList.contains("is-active")) {
        setFilter(DISCIPLINES[index].c);
        go("proyectos");
      } else {
        setPanel(index);
        startAccordion();
      }
    });
  });
};

/* Carrusel: botones y arrastre con mouse (el táctil usa el scroll nativo) */
const initCarousel = () => {
  const track = $("#carousel");
  const step = () => (track.querySelector(".card")?.offsetWidth ?? 300) + 18;
  $("#car-prev").addEventListener("click", () => track.scrollBy({ left: -step(), behavior: "smooth" }));
  $("#car-next").addEventListener("click", () => track.scrollBy({ left: step(), behavior: "smooth" }));
  track.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") track.scrollBy({ left: step(), behavior: "smooth" });
    if (e.key === "ArrowLeft") track.scrollBy({ left: -step(), behavior: "smooth" });
  });

  let startX = 0;
  let startScroll = 0;
  let dragging = false;
  let moved = false;

  track.addEventListener("pointerdown", (e) => {
    if (e.pointerType !== "mouse") return;
    dragging = true;
    moved = false;
    startX = e.clientX;
    startScroll = track.scrollLeft;
  });
  window.addEventListener("pointermove", (e) => {
    if (!dragging) return;
    const dx = e.clientX - startX;
    if (Math.abs(dx) > 5 && !moved) { moved = true; track.classList.add("is-dragging"); }
    if (moved) track.scrollLeft = startScroll - dx;
  });
  window.addEventListener("pointerup", () => {
    if (!dragging) return;
    dragging = false;
    if (!moved) return;
    track.classList.remove("is-dragging");
    // Ajusta a la tarjeta más cercana tras soltar
    track.scrollTo({ left: Math.round(track.scrollLeft / step()) * step(), behavior: "smooth" });
  });
  // Evita abrir el modal si el gesto fue un arrastre
  track.addEventListener("click", (e) => {
    if (moved) { e.stopPropagation(); e.preventDefault(); moved = false; }
  }, true);
};

/* Modal de proyecto */
const openProject = (index) => {
  const project = PROJECTS[index];
  if (!project) return;
  $("#modal-thumb").innerHTML = thumbHtml(project, index);
  $("#modal-cat").textContent = `[ ${project.c} ]`;
  $("#modal-title").textContent = project.t;
  $("#modal-tags").innerHTML = project.g.map((tag) => `<li>${escapeHtml(tag)}</li>`).join("");
  $("#modal-desc").textContent = project.d;
  $("#modal-goal").hidden = !project.o;
  $("#modal-goal-text").textContent = project.o ?? "";
  // El <dialog> se pinta en la capa superior: el cursor debe vivir dentro para seguir visible
  $("#modal").appendChild($(".cursor"));
  $("#modal").showModal();
};

const initModal = () => {
  const modal = $("#modal");
  modal.addEventListener("close", () => document.body.appendChild($(".cursor")));
  $("#modal-close").addEventListener("click", () => modal.close());
  // Clic fuera de la caja: el objetivo es el propio <dialog>
  modal.addEventListener("click", (e) => { if (e.target === modal) modal.close(); });
};

/* Spotlight dentro de las tarjetas */
const onCardMove = (e) => {
  const card = e.target.closest?.(".card");
  if (!card) return;
  const rect = card.getBoundingClientRect();
  card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
  card.style.setProperty("--my", `${e.clientY - rect.top}px`);
};

/* =========================================================
   8. BOTONES Y EMBLEMA 3D
   ========================================================= */
const addRipple = (e) => {
  const button = e.target.closest(".btn");
  if (!button || reducedMotion.matches) return;
  const rect = button.getBoundingClientRect();
  const ripple = document.createElement("span");
  ripple.className = "ripple";
  ripple.style.left = `${e.clientX - rect.left}px`;
  ripple.style.top = `${e.clientY - rect.top}px`;
  button.appendChild(ripple);
  ripple.addEventListener("animationend", () => ripple.remove());
};

const initMagnetic = () => {
  if (!finePointer.matches || reducedMotion.matches) return;
  $$(".btn--main").forEach((button) => {
    button.addEventListener("mousemove", (e) => {
      const rect = button.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * 0.18;
      const y = (e.clientY - rect.top - rect.height / 2) * 0.3;
      button.style.transform = `translate(${x}px, ${y}px)`;
    });
    button.addEventListener("mouseleave", () => { button.style.transform = ""; });
  });
};

const initEmblemTilt = () => {
  if (!finePointer.matches || reducedMotion.matches) return;
  const emblem = $("#emblem");
  window.addEventListener("mousemove", (e) => {
    if (currentView !== "inicio" || window.scrollY > window.innerHeight) return;
    const x = e.clientX / window.innerWidth - 0.5;
    const y = e.clientY / window.innerHeight - 0.5;
    emblem.style.transform = `rotateX(${(-y * 16).toFixed(2)}deg) rotateY(${(x * 22).toFixed(2)}deg)`;
  });
};

/* =========================================================
   9. CURSOR PERSONALIZADO Y GARRAS (solo con mouse)
   ========================================================= */
const initCursor = () => {
  if (!finePointer.matches) return;
  document.documentElement.classList.add("has-cursor");

  const arrow = $("#cur-arrow");
  const panther = $("#cur-panther");
  const HOVER = "a, button, .card, .panel, [data-copy], input, label";
  const PANTHER_W = 38;
  const PANTHER_H = PANTHER_W * (375 / 390);

  let mouseX = -100;
  let mouseY = -100;
  let px = -100;
  let py = -100;
  let tilt = 0;
  let scale = 1;
  let targetScale = 1;
  let visible = false;

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    // La punta de la flecha (1,1 en su viewBox) va exacta sobre el puntero
    arrow.style.transform = `translate(${mouseX - 1}px, ${mouseY - 1}px)`;
    targetScale = e.target.closest?.(HOVER) ? 1.45 : 1;
    if (!visible) { visible = true; px = mouseX; py = mouseY; arrow.style.opacity = panther.style.opacity = "1"; }
  });
  document.addEventListener("mouseleave", () => { visible = false; arrow.style.opacity = panther.style.opacity = "0"; });

  const loop = () => {
    const lerp = reducedMotion.matches ? 1 : 0.3;
    const prevX = px;
    px += (mouseX - px) * lerp;
    py += (mouseY - py) * lerp;
    const velocity = px - prevX;
    tilt += (Math.max(-18, Math.min(18, velocity * 1.2)) - tilt) * 0.2;
    scale += (targetScale - scale) * 0.2;
    // Pantera arriba a la izquierda de la flecha; escala desde su esquina inferior derecha
    panther.style.transformOrigin = "100% 100%";
    panther.style.transform =
      `translate(${px - PANTHER_W - 2}px, ${py - PANTHER_H - 2}px) rotate(${tilt.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
    requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);

  /* Garras: tres cuchillas inclinadas -22° y un anillo que se expande */
  window.addEventListener("mousedown", (e) => {
    if (e.button !== 0 || reducedMotion.matches) return;
    const burst = document.createElement("div");
    burst.className = "claw-burst";
    burst.style.left = `${e.clientX}px`;
    burst.style.top = `${e.clientY}px`;
    burst.innerHTML = '<span class="claw-ring"></span><div class="claw-set"><span class="claw"></span><span class="claw"></span><span class="claw"></span></div>';
    ($("dialog[open]") ?? document.body).appendChild(burst);
    setTimeout(() => burst.remove(), 650);
  });
};

/* =========================================================
   INTERACCIÓN 1 · FONDO DE PUNTOS REACTIVO
   Cuadrícula de puntos cada 28px que se apartan del puntero (radio 120px)
   y vuelven con lerp 0.15. Solo se dibuja en Inicio y con la pestaña visible;
   el bucle se detiene cuando todos los puntos están quietos.
   ========================================================= */
const DOT_GAP = 28;
const DOT_RADIUS = 120;
const DOT_PUSH = 26;
const DOT_LERP = 0.15;

const dotsState = { canvas: null, ctx: null, dots: [], w: 0, h: 0, px: -9999, py: -9999, raf: 0, active: false };

const buildDots = () => {
  const s = dotsState;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  s.w = window.innerWidth;
  s.h = window.innerHeight;
  s.canvas.width = Math.round(s.w * dpr);
  s.canvas.height = Math.round(s.h * dpr);
  s.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  s.dots = [];
  for (let y = DOT_GAP / 2; y < s.h; y += DOT_GAP) {
    for (let x = DOT_GAP / 2; x < s.w; x += DOT_GAP) s.dots.push({ ox: x, oy: y, x, y, glow: 0 });
  }
};

const drawDots = () => {
  const s = dotsState;
  const { ctx, dots, px, py } = s;
  ctx.clearRect(0, 0, s.w, s.h);
  let moving = false;

  // Puntos grises en un solo trazo (barato); los iluminados se dibujan después
  ctx.fillStyle = "rgba(241, 244, 238, 0.13)";
  const lit = [];
  for (const d of dots) {
    const dx = d.ox - px;
    const dy = d.oy - py;
    const dist = Math.hypot(dx, dy);
    let tx = d.ox;
    let ty = d.oy;
    let targetGlow = 0;
    if (dist < DOT_RADIUS) {
      const force = 1 - dist / DOT_RADIUS;
      const angle = Math.atan2(dy, dx);
      tx += Math.cos(angle) * force * DOT_PUSH;
      ty += Math.sin(angle) * force * DOT_PUSH;
      targetGlow = force;
    }
    d.x += (tx - d.x) * DOT_LERP;
    d.y += (ty - d.y) * DOT_LERP;
    d.glow += (targetGlow - d.glow) * DOT_LERP;
    if (Math.abs(tx - d.x) > 0.05 || Math.abs(ty - d.y) > 0.05 || d.glow > 0.01) moving = true;
    if (d.glow > 0.04) lit.push(d);
    else ctx.fillRect(d.x - 0.75, d.y - 0.75, 1.5, 1.5);
  }
  for (const d of lit) {
    ctx.fillStyle = `rgba(184, 255, 26, ${0.25 + d.glow * 0.75})`;
    ctx.beginPath();
    ctx.arc(d.x, d.y, 0.9 + d.glow * 2.2, 0, Math.PI * 2);
    ctx.fill();
  }
  return moving;
};

const dotsLoop = () => {
  const keepGoing = drawDots();
  dotsState.raf = keepGoing ? requestAnimationFrame(dotsLoop) : 0;
};

const wakeDots = () => {
  if (dotsState.active && !dotsState.raf && !document.hidden) dotsState.raf = requestAnimationFrame(dotsLoop);
};

const sleepDots = () => {
  cancelAnimationFrame(dotsState.raf);
  dotsState.raf = 0;
};

const setDotsActive = (active) => {
  const s = dotsState;
  if (!s.canvas) return;
  s.active = active;
  s.canvas.classList.toggle("is-on", active);
  if (active) { drawDots(); wakeDots(); } else sleepDots();
};

const initDots = () => {
  if (!ENABLE.dots || reducedMotion.matches) return;
  const canvas = $("#bg-dots");
  dotsState.canvas = canvas;
  dotsState.ctx = canvas.getContext("2d");
  buildDots();

  const onPointer = (e) => {
    dotsState.px = e.clientX;
    dotsState.py = e.clientY;
    wakeDots();
  };
  window.addEventListener("pointermove", onPointer, { passive: true });
  window.addEventListener("pointerdown", onPointer, { passive: true });
  // Al soltar el dedo los puntos vuelven a su sitio
  window.addEventListener("pointerup", (e) => { if (e.pointerType !== "mouse") { dotsState.px = dotsState.py = -9999; wakeDots(); } });
  document.addEventListener("mouseleave", () => { dotsState.px = dotsState.py = -9999; wakeDots(); });

  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => { buildDots(); if (dotsState.active) { drawDots(); wakeDots(); } }, 120);
  });
  // Pausa con la pestaña oculta
  document.addEventListener("visibilitychange", () => { if (document.hidden) sleepDots(); else wakeDots(); });
};

/* =========================================================
   INTERACCIÓN 2 · CORTINA DE COLUMNAS
   6 columnas suben escalonadas (60ms, 0.5s); con la pantalla cubierta se cambia
   la vista y se vuelve arriba; luego bajan. La cortina bloquea clics mientras dura.
   ========================================================= */
const CURTAIN_EASE = "cubic-bezier(.7, 0, .3, 1)";
const CURTAIN_MS = 500;
const CURTAIN_STAGGER = 60;

const animateColumns = (from, to) => Promise.all($$("#curtain span").map((col, i) =>
  col.animate([{ transform: `scaleY(${from})` }, { transform: `scaleY(${to})` }], {
    duration: CURTAIN_MS,
    delay: i * CURTAIN_STAGGER,
    easing: CURTAIN_EASE,
    fill: "forwards",
  }).finished));

const playCurtain = async (onCovered) => {
  const curtain = $("#curtain");
  curtain.classList.add("is-active");
  try {
    $$("#curtain span").forEach((col) => { col.style.transformOrigin = "bottom"; });
    await animateColumns(0, 1);            // suben desde abajo
    onCovered();
    $$("#curtain span").forEach((col) => { col.style.transformOrigin = "top"; });
    await animateColumns(1, 0);            // se recogen hacia arriba
  } finally {
    $$("#curtain span").forEach((col) => col.getAnimations().forEach((a) => a.cancel()));
    curtain.classList.remove("is-active");
  }
};

/* =========================================================
   INTERACCIÓN 3 · HÉROE DIVIDIDO DISEÑO | CÓDIGO
   Hover (o foco) expande una mitad a flex 2.6; en táctil, tocar alterna.
   ========================================================= */
/* --- DISEÑO: letras en ola + estallido de formas, luego baja al texto de Sobre mí --- */
const FX_COLORS = ["#b8ff1a", "#d4ff6a", "#f1f4ee", "#98a095"];
const FX_TYPES = ["circle", "square", "tri", "ring", "line"];

const playDesignBurst = (half, x, y) => {
  const fx = $(".split__fx", half);
  // Onda expansiva
  const wave = document.createElement("span");
  wave.className = "fx-wave";
  wave.style.left = `${x}px`;
  wave.style.top = `${y}px`;
  fx.appendChild(wave);
  wave.animate([{ transform: "scale(.2)", opacity: 1 }, { transform: "scale(9)", opacity: 0 }], { duration: 750, easing: "cubic-bezier(.2,.7,.2,1)" })
    .finished.then(() => wave.remove());

  // Formas geométricas que salen disparadas en todas direcciones
  for (let i = 0; i < 18; i++) {
    const shape = document.createElement("span");
    const type = FX_TYPES[i % FX_TYPES.length];
    const size = 8 + Math.random() * 18;
    shape.className = `fx-shape fx-shape--${type}`;
    shape.style.cssText = `left:${x}px;top:${y}px;--s:${size}px;--c:${FX_COLORS[i % FX_COLORS.length]}`;
    if (type === "line") shape.style.width = `${size * 2}px`;
    fx.appendChild(shape);
    const angle = (i / 18) * Math.PI * 2 + Math.random() * 0.4;
    const dist = 90 + Math.random() * 170;
    const spin = (Math.random() - 0.5) * 540;
    shape.animate([
      { transform: "translate(0, 0) rotate(0deg) scale(.2)", opacity: 1 },
      { transform: `translate(${Math.cos(angle) * dist * 0.6}px, ${Math.sin(angle) * dist * 0.6}px) rotate(${spin * 0.6}deg) scale(1)`, opacity: 1, offset: 0.55 },
      { transform: `translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist + 40}px) rotate(${spin}deg) scale(.6)`, opacity: 0 },
    ], { duration: 850 + Math.random() * 250, easing: "cubic-bezier(.2,.7,.2,1)" }).finished.then(() => shape.remove());
  }

  // Ola en las letras de DISEÑO
  $$(".split__word .ch", half).forEach((ch, i) => {
    ch.animate([
      { transform: "translateY(0) rotate(0)", color: "" },
      { transform: "translateY(-26px) rotate(-8deg)", color: "#b8ff1a", offset: 0.4 },
      { transform: "translateY(0) rotate(0)", color: "" },
    ], { duration: 600, delay: i * 55, easing: "cubic-bezier(.3,1.6,.5,1)" });
  });
};

const goToAboutText = () => {
  const anchor = $("#sobre-texto");
  anchor.scrollIntoView({ behavior: reducedMotion.matches ? "auto" : "smooth", block: "start" });
  const title = $("#t-sobre");
  title.classList.remove("about-flash");
  void title.offsetWidth; // reinicia la animación si se repite
  title.classList.add("about-flash");
};

/* --- CÓDIGO: líneas de código que se escriben hasta llenar el botón --- */
const CODE_LINES = [
  "<span class=\"cm\">// panthercode.js</span>",
  "<span class=\"kw\">const</span> idea = <span class=\"kw\">await</span> escuchar(usuario);",
  "<span class=\"kw\">const</span> boceto = diseñar(idea, { claridad: <span class=\"kw\">true</span> });",
  "&lt;section class=\"experiencia\"&gt;",
  "  &lt;h1&gt;Diseño que deja huella&lt;/h1&gt;",
  "&lt;/section&gt;",
  ".pantera { color: #b8ff1a; glow: on; }",
  "<span class=\"kw\">function</span> prototipar(boceto) {",
  "  <span class=\"kw\">return</span> iterar(boceto).hasta(<span class=\"kw\">\"funcione\"</span>);",
  "}",
  "document.querySelector(<span class=\"kw\">\"#portafolio\"</span>)",
  "  .addEventListener(<span class=\"kw\">\"click\"</span>, sorprender);",
  "@media (max-width: 390px) { .todo { encaja: <span class=\"kw\">true</span>; } }",
  "<span class=\"kw\">export default</span> { html, css, javascript };",
];

let codeRaf = 0;

/* Corta un HTML de línea a n caracteres visibles sin romper las etiquetas */
const sliceHtml = (html, n) => {
  let out = "";
  let visible = 0;
  for (let i = 0; i < html.length && visible < n; i++) {
    if (html[i] === "<") { const end = html.indexOf(">", i); out += html.slice(i, end + 1); i = end; continue; }
    if (html[i] === "&") { const end = html.indexOf(";", i); out += html.slice(i, end + 1); i = end; visible++; continue; }
    out += html[i];
    visible++;
  }
  // Cierra un <span> que haya quedado abierto
  const opened = (out.match(/<span/g) || []).length - (out.match(/<\/span>/g) || []).length;
  return out + "</span>".repeat(Math.max(0, opened));
};
const visibleLength = (html) => html.replace(/<[^>]+>/g, "").replace(/&[a-z]+;/g, "_").length;

const playCodeFill = (half, onDone) => {
  const layer = $(".split__code", half);
  cancelAnimationFrame(codeRaf);
  half.classList.remove("is-revealed");
  const rows = Math.ceil((half.clientHeight - 36) / 18) + 1;
  const lines = Array.from({ length: rows }, (_, i) => CODE_LINES[i % CODE_LINES.length]);
  const total = lines.reduce((sum, line) => sum + visibleLength(line), 0);
  const DURATION = 1100;
  const start = performance.now();
  layer.classList.add("is-typing");

  const frame = (now) => {
    const progress = Math.min((now - start) / DURATION, 1);
    let budget = Math.floor(total * progress);
    const html = [];
    for (const line of lines) {
      const len = visibleLength(line);
      if (budget <= 0) break;
      html.push(sliceHtml(line, Math.min(len, budget)));
      budget -= len;
    }
    layer.innerHTML = html.join("\n") + (progress < 1 ? '<span class="caret"></span>' : "");
    if (progress < 1) {
      codeRaf = requestAnimationFrame(frame);
    } else {
      // Pausa breve con el botón lleno de código y luego se revela la información
      setTimeout(() => {
        layer.classList.remove("is-typing");
        onDone();
      }, 250);
    }
  };
  codeRaf = requestAnimationFrame(frame);
};

const initSplit = () => {
  const split = $("#split");
  if (!ENABLE.split) { split.remove(); return; }
  const halves = $$(".split__half", split);

  // Letras de DISEÑO separadas para la ola; información de CÓDIGO desde CODE_INFO
  const designWord = $(".split__word", halves[0]);
  designWord.innerHTML = [...designWord.textContent].map((ch) => `<span class="ch">${ch}</span>`).join("");
  $("#split-info").innerHTML = CODE_INFO.map((item) => `<span>${item}</span>`).join("");
  const codeHalf = halves[1];
  let codeBusy = false;

  const open = (index) => {
    split.classList.toggle("has-open", index >= 0);
    // Si se abre otra mitad, CÓDIGO vuelve a su estado inicial (la animación se repite al presionarlo)
    if (index !== 1 && !codeBusy) codeHalf.classList.remove("is-revealed");
    halves.forEach((half, i) => {
      const isOpen = i === index;
      half.classList.toggle("is-open", isOpen);
      half.setAttribute("aria-pressed", String(isOpen));
    });
  };

  halves.forEach((half, i) => {
    half.addEventListener("pointerenter", (e) => { if (e.pointerType === "mouse" && !codeBusy) open(i); });
    // Solo el foco con teclado abre; un toque también enfoca y no debe abrir dos veces
    half.addEventListener("focus", () => { if (half.matches(":focus-visible") && !codeBusy) open(i); });

    half.addEventListener("click", (e) => {
      if (codeBusy) return;
      open(i);
      // Punto de origen del efecto: donde se tocó, o el centro si fue con teclado
      const rect = half.getBoundingClientRect();
      const fromKeyboard = e.detail === 0;
      const x = fromKeyboard ? rect.width / 2 : e.clientX - rect.left;
      const y = fromKeyboard ? rect.height / 2 : e.clientY - rect.top;

      if (i === 0) {
        // DISEÑO: interacción y luego baja al texto de Sobre mí
        if (reducedMotion.matches) { goToAboutText(); return; }
        playDesignBurst(half, x, y);
        setTimeout(goToAboutText, 750);
      } else {
        // CÓDIGO: el código llena el botón y después se ve la información
        if (reducedMotion.matches) { half.classList.add("is-revealed"); return; }
        codeBusy = true;
        // Espera a que la mitad termine de expandirse para llenarla completa
        setTimeout(() => playCodeFill(half, () => {
          half.classList.add("is-revealed");
          codeBusy = false;
        }), 350);
      }
    });
  });
  // Al salir con el mouse se cierra, salvo que CÓDIGO esté mostrando su información
  split.addEventListener("pointerleave", (e) => {
    if (e.pointerType === "mouse" && !codeBusy) open(codeHalf.classList.contains("is-revealed") ? 1 : -1);
  });
};

/* =========================================================
   INTERACCIÓN 4 · TABLERO ARRASTRABLE DE PROYECTOS
   Lienzo de 1300x760 dentro de un marco de 480px. Arrastre con pointer events,
   límites para no salirse e inercia al soltar (fricción 0.93).
   ========================================================= */
const BOARD_W = 1300;
const BOARD_H = 760;
const BOARD_FRICTION = 0.93;
/* Posiciones y alturas de miniatura para cada tarjeta (se repiten si hay más proyectos) */
const BOARD_SLOTS = [
  { x: 60, y: 60, w: 290, th: 170 },
  { x: 430, y: 130, w: 270, th: 120 },
  { x: 790, y: 50, w: 300, th: 180 },
  { x: 150, y: 440, w: 280, th: 110 },
  { x: 520, y: 455, w: 290, th: 100 },
  { x: 900, y: 430, w: 300, th: 120 },
];
const BOARD_NOTES = [
  { x: 40, y: 660, text: "Panthercode", big: true },
  { x: 790, y: 22, text: "[ Proyectos / Tablero ]" },
  { x: 430, y: 100, text: "✦ Idea → Prototipo → Detalle" },
  { x: 1090, y: 728, text: "Santa Marta · 2026" },
];

let projectsMode = "grid";
const board = { x: 0, y: 0, vx: 0, vy: 0, raf: 0, dragging: false, moved: false, lastX: 0, lastY: 0, lastT: 0 };

const boardBounds = () => {
  const frame = $("#board");
  return {
    minX: Math.min(0, frame.clientWidth - BOARD_W),
    minY: Math.min(0, frame.clientHeight - BOARD_H),
  };
};

const placeBoard = () => {
  const { minX, minY } = boardBounds();
  board.x = Math.max(minX, Math.min(0, board.x));
  board.y = Math.max(minY, Math.min(0, board.y));
  $("#board-canvas").style.transform = `translate3d(${board.x}px, ${board.y}px, 0)`;
};

const renderBoard = () => {
  const visible = PROJECTS
    .map((project, index) => ({ project, index }))
    .filter(({ project }) => activeFilter === "Todos" || project.c === activeFilter);
  const notes = BOARD_NOTES.map((n) =>
    `<span class="board__note${n.big ? " board__note--big" : ""}" style="left:${n.x}px;top:${n.y}px">${escapeHtml(n.text)}</span>`).join("");
  const cards = visible.map(({ project, index }, i) => {
    const slot = BOARD_SLOTS[i % BOARD_SLOTS.length];
    const html = cardHtml(project, index);
    return html.replace('class="card"', `class="card" style="left:${slot.x}px;top:${slot.y}px;width:${slot.w}px;--th:${slot.th}px"`);
  }).join("");
  $("#board-canvas").innerHTML = notes + cards;
};

const centerBoard = () => {
  const { minX, minY } = boardBounds();
  board.x = minX / 2;
  board.y = minY / 2;
  placeBoard();
};

const setProjectsMode = (mode) => {
  projectsMode = mode;
  $$("[data-mode]").forEach((btn) => btn.setAttribute("aria-pressed", String(btn.dataset.mode === mode)));
  $("#grid").hidden = mode !== "grid";
  $("#board").hidden = mode !== "board";
  if (mode === "board") { renderBoard(); centerBoard(); }
  else cancelAnimationFrame(board.raf);
};

const boardInertia = () => {
  board.vx *= BOARD_FRICTION;
  board.vy *= BOARD_FRICTION;
  board.x += board.vx;
  board.y += board.vy;
  placeBoard();
  board.raf = Math.abs(board.vx) > 0.1 || Math.abs(board.vy) > 0.1 ? requestAnimationFrame(boardInertia) : 0;
};

const initBoard = () => {
  if (!ENABLE.board) { $(".view-toggle").remove(); return; }
  const frame = $("#board");
  $$("[data-mode]").forEach((btn) => btn.addEventListener("click", () => setProjectsMode(btn.dataset.mode)));

  // Sin setPointerCapture: así el clic sigue llegando a la tarjeta cuando no hubo arrastre
  frame.addEventListener("pointerdown", (e) => {
    if (e.button !== 0) return;
    cancelAnimationFrame(board.raf);
    board.dragging = true;
    board.moved = false;
    board.suppressClick = false;
    board.downCard = e.pointerType === "mouse" ? null : e.target.closest("[data-project]");
    board.vx = board.vy = 0;
    board.lastX = e.clientX;
    board.lastY = e.clientY;
    board.lastT = performance.now();
  });
  window.addEventListener("pointermove", (e) => {
    if (!board.dragging) return;
    const dx = e.clientX - board.lastX;
    const dy = e.clientY - board.lastY;
    if (!board.moved && Math.hypot(dx, dy) < 4) return;
    if (!board.moved) { board.moved = true; frame.classList.add("is-grabbing"); }
    const now = performance.now();
    const dt = Math.max(now - board.lastT, 1);
    // Velocidad en px por frame (~16ms) para la inercia
    board.vx = (dx / dt) * 16;
    board.vy = (dy / dt) * 16;
    board.x += dx;
    board.y += dy;
    board.lastX = e.clientX;
    board.lastY = e.clientY;
    board.lastT = now;
    placeBoard();
  });
  const release = (e) => {
    if (!board.dragging) return;
    board.dragging = false;
    frame.classList.remove("is-grabbing");
    if (board.moved && !reducedMotion.matches) board.raf = requestAnimationFrame(boardInertia);
    // Toque sin arrastre: en táctil Chrome manda el click al lienzo y no a la tarjeta,
    // así que la tarjeta se abre aquí y se descarta ese click
    if (!board.moved && board.downCard && e.type === "pointerup") {
      openProject(Number(board.downCard.dataset.project));
      board.suppressClick = true;
    }
    board.downCard = null;
  };
  window.addEventListener("pointerup", release);
  window.addEventListener("pointercancel", release);
  // Si hubo arrastre (o el toque ya abrió la tarjeta), el clic no abre el modal
  frame.addEventListener("click", (e) => {
    if (board.moved || board.suppressClick) {
      e.stopPropagation();
      e.preventDefault();
      board.moved = false;
      board.suppressClick = false;
    }
  }, true);
  // Con teclado: al enfocar una tarjeta, el tablero se desplaza para mostrarla
  frame.addEventListener("focusin", (e) => {
    const card = e.target.closest(".card");
    if (!card) return;
    board.x = frame.clientWidth / 2 - (card.offsetLeft + card.offsetWidth / 2);
    board.y = frame.clientHeight / 2 - (card.offsetTop + card.offsetHeight / 2);
    placeBoard();
  });
  window.addEventListener("resize", () => { if (projectsMode === "board") placeBoard(); });
};

/* =========================================================
   INTERACCIÓN 5 · TEXTO QUE SE DESCIFRA
   En hover o foco, las letras se mezclan y se resuelven de izquierda a derecha (~0.5s).
   El ancho se fija durante el efecto y siempre se restaura el texto original.
   ========================================================= */
const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#%&/<>_";
const SCRAMBLE_MS = 500;

const scramble = (el) => {
  const original = el.dataset.text;
  cancelAnimationFrame(el._scrambleRaf);
  el.style.width = `${el.getBoundingClientRect().width}px`;
  el.classList.add("is-scrambling");
  const start = performance.now();

  const frame = (now) => {
    const progress = Math.min((now - start) / SCRAMBLE_MS, 1);
    const solved = Math.floor(progress * original.length);
    el.textContent = [...original].map((ch, i) => {
      if (i < solved || ch === " ") return ch;
      return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
    }).join("");
    if (progress < 1) {
      el._scrambleRaf = requestAnimationFrame(frame);
    } else {
      el.textContent = original;
      el.style.width = "";
      el.classList.remove("is-scrambling");
    }
  };
  el._scrambleRaf = requestAnimationFrame(frame);
};

const initScramble = () => {
  if (!ENABLE.scramble || reducedMotion.matches) return;
  $$(".nav a, .footer nav a").forEach((link) => {
    link.dataset.text = link.textContent.trim();
    link.setAttribute("aria-label", link.dataset.text); // el lector de pantalla lee siempre el texto real
    link.addEventListener("mouseenter", () => scramble(link));
    link.addEventListener("focus", () => scramble(link));
  });
};

/* Se llama en cada cambio de vista */
const onViewChange = (name) => {
  setDotsActive(name === "inicio");
};

/* =========================================================
   10. INICIO
   ========================================================= */
const init = () => {
  loadPanther();
  renderStatic();
  renderFilters();
  renderGrid();

  // Enlaces de WhatsApp con el número y el mensaje de WHATSAPP
  const waUrl = `https://wa.me/${WHATSAPP.number}?text=${encodeURIComponent(WHATSAPP.message)}`;
  $$("[data-whatsapp]").forEach((link) => { link.href = waUrl; });
  $$("[data-whatsapp-label]").forEach((label) => { label.textContent = WHATSAPP.label; });

  // Logo de la universidad: se muestra solo cuando carga; si falla, queda el texto
  if (UNI_LOGO) {
    const logo = $(".uni__logo");
    logo.addEventListener("load", () => $(".uni").classList.remove("is-fallback"));
    logo.src = UNI_LOGO;
  }

  initAccordion();
  initCarousel();
  initModal();
  initMagnetic();
  initEmblemTilt();
  initCursor();

  // Interacciones nuevas (desactívalas en ENABLE, al inicio del archivo)
  initDots();
  initSplit();
  initBoard();
  initScramble();

  document.addEventListener("click", (e) => {
    const target = e.target;
    const card = target.closest("[data-project]");
    if (card) openProject(Number(card.dataset.project));
    const filter = target.closest("[data-filter]");
    if (filter) setFilter(filter.dataset.filter);
    if (target.closest("[data-copy]")) copyEmail();
    if (target.closest("[data-skip]")) { e.preventDefault(); $("#app").focus(); }
    // Enlace a la vista actual: no hay hashchange, así que vuelve arriba
    const link = target.closest('a[href^="#"]:not([data-skip])');
    if (link && link.getAttribute("href").slice(1) === currentView) {
      e.preventDefault();
      closeMenu();
      window.scrollTo({ top: 0, behavior: reducedMotion.matches ? "auto" : "smooth" });
    }
    addRipple(e);
  });
  document.addEventListener("pointermove", onCardMove, { passive: true });
  $("#menu-btn").addEventListener("click", toggleMenu);
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeMenu(); });
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("hashchange", route);

  onScroll();
  route();
};

init();
