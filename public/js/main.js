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
  pantera3d: true, // Pantera del hero en 3D (false = imagen fija con ojos neón)
  projectFx: true, // Efectos al pasar el cursor por los proyectos (letras/braille, pelotas, rutas)
};

/* Correo de contacto (se usa en "Copiar correo"). */
const EMAIL = "richardandreslam@gmail.com";

/* WHATSAPP: número con código de país (57 = Colombia), sin espacios ni "+".
   El mensaje aparece ya escrito cuando el visitante abre el chat. */
/* CORREO "Enviar mensaje" (Contacto): asunto y mensaje que aparecen ya escritos al abrir el correo. */
const MAIL_MESSAGE = {
  subject: "Colaboración desde tu portafolio Panthercode",
  body: "¡Hola Richard!\n\nVi tu portafolio y me gustaría colaborar contigo.\n\nMi nombre:\nMi empresa o proyecto:\nLo que necesito:\n\n¡Gracias!",
};

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
   img: ilustración del proyecto · fx: efecto al pasar el cursor ("vta", "baseball" o "setp"; opcional)
   El orden de este array es el orden en la cuadrícula y en "Proyectos recientes".
   Los filtros se crean solos a partir de las categorías que uses aquí. */
const PROJECTS = [
  {
    t: "Visual Text Assist",
    slug: "visual-text-assist",
    img: "assets/proyectos/visual-text-assist.svg",
    fx: "vta",
    c: "UI/UX",
    d: "Propuesta de aplicación móvil para ayudar a personas con ceguera a acceder a libros físicos mediante la cámara del celular y el reconocimiento de texto. Convierte el contenido escrito en audio y permite ajustar la velocidad de reproducción y el idioma.",
    o: "Crear una experiencia digital más accesible, práctica e inclusiva.",
    g: ["Diseño UX/UI", "Accesibilidad digital"],
  },
  {
    t: "Baseball Nation",
    slug: "baseball-nation",
    img: "assets/proyectos/baseball-nation.svg",
    fx: "baseball",
    c: "UI/UX",
    d: "Propuesta de aplicación para aficionados al béisbol que reúne partidos, resultados, próximos encuentros, noticias y estadísticas de jugadores en un mismo lugar, pensada para personas de diferentes edades.",
    o: "Organizar la información deportiva en una experiencia digital atractiva y sencilla.",
    g: ["Diseño de aplicaciones", "Experiencia de usuario"],
  },
  {
    t: "SIU – SETP Santa Marta",
    slug: "siu-setp",
    img: "assets/proyectos/siu-setp.svg",
    fx: "setp",
    i: "SIU",
    c: "UI/UX",
    d: "Interfaz para el Sistema de Información al Usuario del Sistema Estratégico de Transporte Público de Santa Marta, orientada a estudiantes universitarios y trabajadores que consultan rutas, paraderos y tiempos estimados de llegada de los buses.",
    o: "Facilitar el acceso a la información del transporte público mediante una interfaz clara, intuitiva y útil para la vida cotidiana.",
    g: ["UX/UI", "Movilidad urbana", "Diseño centrado en el usuario"],
  },
];

/* CASOS DE ESTUDIO: página de detalle de cada proyecto (se abre al hacer clic en la tarjeta).
   La clave es el slug del proyecto. Reemplaza los textos [entre corchetes].
   galeria: rutas de imágenes de bocetos/pantallas (si está vacía se muestran espacios para agregarlas). */
const CASES = {
  "visual-text-assist": {
    rol: "Diseño UX/UI",
    anio: "[Año]",
    herramientas: "Figma · [Otra]",
    enfoque: "Accesibilidad digital",
    reto: "Las personas con ceguera dependen de que un libro exista en braille o en audiolibro para poder leerlo. La mayoría de libros físicos no están en esos formatos, y muchas herramientas de lectura con cámara tienen interfaces pensadas para personas que sí ven.",
    proceso: [
      { t: "Investigación", d: "Entender cómo leen hoy las personas con discapacidad visual: lectores de pantalla, braille, audiolibros y las barreras de las apps existentes." },
      { t: "Ideación", d: "Definir un flujo de tres pasos: apuntar la cámara, detectar el texto y escucharlo, con la menor cantidad de decisiones posible." },
      { t: "Wireframes", d: "Botones grandes, alto contraste, orden lógico para el lector de pantalla y controles de velocidad e idioma siempre a la mano." },
      { t: "Prototipo", d: "Prototipo navegable con los flujos de lectura, pausa, repetición y guardado." },
      { t: "Validación", d: "[Cuenta aquí las pruebas con usuarios o la retroalimentación que recibiste.]" },
    ],
    resultados: [
      { v: "3", l: "pasos para empezar a escuchar un libro" },
      { v: "[X]", l: "[Tu métrica o aprendizaje]" },
      { v: "[X]", l: "[Tu métrica o aprendizaje]" },
    ],
    galeria: [],
  },
  "baseball-nation": {
    rol: "Diseño de aplicaciones",
    anio: "[Año]",
    herramientas: "Figma · [Otra]",
    enfoque: "Experiencia de usuario",
    reto: "Los aficionados al béisbol tienen la información repartida: marcadores en un lugar, noticias en otro y calendarios en otro, muchas veces de una sola liga. Seguir el béisbol del mundo entero exige saltar entre varias apps.",
    proceso: [
      { t: "Investigación", d: "Qué consultan los aficionados de distintas edades, con qué frecuencia y en qué momentos del partido." },
      { t: "Arquitectura", d: "Tres pilares claros: partidos en vivo, próximos partidos y noticias, a un toque de distancia." },
      { t: "Diseño visual", d: "Identidad en blanco, azul, rojo y dorado; el marcador en vivo como protagonista y una jerarquía fácil de leer." },
      { t: "Prototipo", d: "Flujos de seguir un partido en vivo, programar recordatorios y leer noticias." },
      { t: "Validación", d: "[Cuenta aquí las pruebas con usuarios o la retroalimentación que recibiste.]" },
    ],
    resultados: [
      { v: "3", l: "secciones clave en un solo lugar" },
      { v: "[X]", l: "[Ligas o países incluidos]" },
      { v: "[X]", l: "[Tu métrica o aprendizaje]" },
    ],
    galeria: [],
  },
  "siu-setp": {
    rol: "UX/UI",
    anio: "[Año]",
    herramientas: "Figma · [Otra]",
    enfoque: "Movilidad urbana",
    reto: "Estudiantes y trabajadores de Santa Marta pierden tiempo en los paraderos sin saber qué ruta les sirve ni cuándo llegará el siguiente bus del SETP.",
    proceso: [
      { t: "Investigación", d: "[Describe cómo conociste a los usuarios: encuestas, observación en paraderos, entrevistas.]" },
      { t: "Mapa de viaje", d: "Del “¿a dónde voy?” al “me bajo aquí”: identificar los momentos de duda y espera." },
      { t: "Arquitectura", d: "Buscador de destino, mapa con la ubicación de los buses en tiempo real y detalle de cada ruta con paraderos." },
      { t: "Prototipo", d: "Flujos de buscar una ruta, ver el bus acercarse y recibir el tiempo estimado de llegada." },
      { t: "Validación", d: "[Cuenta aquí las pruebas con usuarios o la retroalimentación que recibiste.]" },
    ],
    resultados: [
      { v: "[X]", l: "[Minutos de espera ahorrados o similar]" },
      { v: "[X]", l: "[Rutas cubiertas]" },
      { v: "[X]", l: "[Tu métrica o aprendizaje]" },
    ],
    galeria: [],
  },
};

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
  { y: "Próxima meta", t: "Multinacional y clientes internacionales", d: "Trabajar en una empresa multinacional y colaborar como freelance con clientes del exterior, llevando mi diseño a proyectos de alcance global.", future: true },
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
  // Con imagen (img) se muestra la ilustración del proyecto; si no, la miniatura con iniciales
  if (project.img) {
    return `<div class="thumb thumb--img"><img src="${escapeHtml(project.img)}" alt="Vista de la app ${escapeHtml(project.t)}" width="800" height="500" loading="lazy"></div>`;
  }
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
  <button class="card" type="button" data-project="${index}"${project.fx ? ` data-fx="${escapeHtml(project.fx)}"` : ""} aria-label="Ver proyecto ${escapeHtml(project.t)}">
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
const VIEWS = ["inicio", "proyectos", "sobre-mi", "contacto", "proyecto"];
const VIEW_TITLES = {
  inicio: "Panthercode · Richard Díaz · Diseño Digital",
  proyectos: "Proyectos · Panthercode",
  "sobre-mi": "Sobre mí · Panthercode",
  contacto: "Contacto · Panthercode",
};
let currentView = null;
let navigating = false;
let caseSlug = null;       // caso de estudio pedido en el hash (#proyecto/slug)
let renderedCase = null;   // caso que está dibujado ahora

/* Cambia de vista al instante: oculta las demás, vuelve arriba y reinicia sus animaciones. */
const swapView = (name) => {
  if (name === "proyecto") renderCase(caseSlug);
  const next = $(`[data-view="${name}"]`);
  $$(".view").forEach((view) => { view.hidden = view !== next; });
  window.scrollTo(0, 0);
  armView(next);
  document.title = name === "proyecto" ? `${PROJECTS.find((p) => p.slug === caseSlug).t} · Panthercode` : VIEW_TITLES[name];

  currentView = name;
  const navName = name === "proyecto" ? "proyectos" : name;   // en un caso se marca "Proyectos"
  $$("[data-nav]").forEach((link) => {
    const active = link.dataset.nav === navName;
    link.classList.toggle("is-active", active);
    if (active) link.setAttribute("aria-current", "page"); else link.removeAttribute("aria-current");
  });
  closeMenu();
  if (name === "inicio") startAccordion(); else stopAccordion();
  onViewChange(name);
};

const showView = async (name) => {
  // Entre dos casos distintos también hay transición
  const sameCase = name === "proyecto" && caseSlug === renderedCase;
  if (!$(`[data-view="${name}"]`) || (name === currentView && (name !== "proyecto" || sameCase)) || navigating) return;
  // Primera carga o movimiento reducido: sin cortina
  if (!currentView || !ENABLE.curtain || reducedMotion.matches) { swapView(name); return; }

  navigating = true;
  await playCurtain(() => swapView(name));
  navigating = false;
  route(); // si el hash cambió durante la transición, se sincroniza al final
};

const route = () => {
  const [name, slug] = (location.hash.slice(1) || "inicio").split("/");
  if (name === "proyecto") {
    if (CASES[slug]) { caseSlug = slug; showView("proyecto"); }
    else if (!currentView) showView("proyectos");
    return;
  }
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

/* =========================================================
   CASO DE ESTUDIO (página de detalle de cada proyecto)
   ========================================================= */
const renderCase = (slug) => {
  const index = PROJECTS.findIndex((p) => p.slug === slug);
  const p = PROJECTS[index];
  const c = CASES[slug];
  const next = PROJECTS[(index + 1) % PROJECTS.length];
  const meta = [["Rol", c.rol], ["Año", c.anio], ["Herramientas", c.herramientas], ["Enfoque", c.enfoque]];
  const gallery = c.galeria.length
    ? c.galeria.map((src) => `<figure class="case__shot"><img src="${escapeHtml(src)}" alt="Pantalla de ${escapeHtml(p.t)}" loading="lazy"></figure>`).join("")
    : ["Bocetos", "Wireframes", "Pantallas finales"].map((label) => `<figure class="case__shot case__shot--empty"><span class="tag">[ ${label} ]</span><p>Agrega aquí tus imágenes en <b>galeria</b> (CASES en main.js)</p></figure>`).join("");

  $("#case").innerHTML = `
    <a class="case__back link" href="#proyectos">← Todos los proyectos</a>
    <!-- Información a la izquierda e imagen a la derecha: todo visible al entrar (sin efectos de hover) -->
    <div class="case__intro">
      <div class="case__info">
        <p class="tag reveal">[ Caso de estudio · ${escapeHtml(p.c)} ]</p>
        <h1 class="title title--page reveal" id="case-title">${escapeHtml(p.t)}</h1>
        <p class="case__lead reveal">${escapeHtml(p.d)}</p>
        <dl class="case__meta reveal">${meta.map(([k, v]) => `<div><dt class="tag">${k}</dt><dd>${escapeHtml(v)}</dd></div>`).join("")}</dl>
      </div>
      <figure class="case__hero reveal"><img src="${escapeHtml(p.img)}" alt="Vista de la app ${escapeHtml(p.t)}"></figure>
    </div>

    <section class="case__block case__block--split">
      <div class="reveal"><p class="tag">[ 01 ]</p><h2 class="subtitle">El reto</h2><p>${escapeHtml(c.reto)}</p></div>
      <div class="case__goal reveal"><p class="tag">[ Objetivo ]</p><p>${escapeHtml(p.o ?? "")}</p></div>
    </section>

    <section class="case__block">
      <p class="tag reveal">[ 02 ]</p><h2 class="subtitle reveal">Proceso</h2>
      <ol class="case__steps">${c.proceso.map((s, i) => `
        <li class="case__step reveal" style="transition-delay:${i * 70}ms"><span class="case__num">0${i + 1}</span><h3>${escapeHtml(s.t)}</h3><p>${escapeHtml(s.d)}</p></li>`).join("")}
      </ol>
    </section>

    <section class="case__block">
      <p class="tag reveal">[ 03 ]</p><h2 class="subtitle reveal">Bocetos y pantallas</h2>
      <div class="case__gallery reveal">${gallery}</div>
    </section>

    <section class="case__block">
      <p class="tag reveal">[ 04 ]</p><h2 class="subtitle reveal">Resultados</h2>
      <div class="case__results">${c.resultados.map((r) => `<div class="stat reveal"><strong>${escapeHtml(r.v)}</strong><span class="tag">${escapeHtml(r.l)}</span></div>`).join("")}</div>
    </section>

    <a class="case__next reveal" href="#proyecto/${escapeHtml(next.slug)}">
      <span class="tag">Siguiente proyecto</span>
      <span class="case__next-title">${escapeHtml(next.t)} <i aria-hidden="true">→</i></span>
    </a>`;
  renderedCase = slug;
};

/* Modal de proyecto (si el proyecto tiene caso de estudio, abre su página) */
const openProject = (index) => {
  const project = PROJECTS[index];
  if (!project) return;
  if (project.slug && CASES[project.slug]) { location.hash = `#proyecto/${project.slug}`; return; }
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

/* =========================================================
   PANTERA 3D (hero)
   La imagen assets/pantera.png se dibuja con WebGL usando un mapa de profundidad:
   cada píxel se desplaza según qué tan cerca está (hocico > ojos > orejas), así la
   cabeza gira en volumen hacia el cursor. Una luz fría sigue al cursor sobre el pelaje
   y un contorno neón rodea la silueta. Los ojos (SVG encima) siguen al cursor.
   ========================================================= */
const PANTERA_SIZE = 360;          // tamaño de la imagen en píxeles
const PANTERA_STRENGTH = 0.09;     // cuánto se desplaza el volumen (paralaje)

const PANTERA_VERT = `attribute vec2 p; varying vec2 vUv;
void main(){ vUv = p * .5 + .5; gl_Position = vec4(p, 0., 1.); }`;
const PANTERA_FRAG = `precision mediump float;
uniform sampler2D uImg, uDepth; uniform vec2 uMouse; uniform float uStrength, uGlow, uTime;
varying vec2 vUv;
float depthAt(vec2 uv){ return texture2D(uDepth, uv).r; }
void main(){
  // Paralaje iterativo según la profundidad
  vec2 off = vec2(0.);
  for (int i = 0; i < 4; i++) { float d = depthAt(vUv - off); off = uMouse * (d - .35) * uStrength; }
  vec2 uv = vUv - off;
  vec4 c = texture2D(uImg, uv);
  // Normal desde el mapa de profundidad y luz que viene del cursor
  float e = 1. / 360.;
  float dx = depthAt(uv + vec2(e, 0.)) - depthAt(uv - vec2(e, 0.));
  float dy = depthAt(uv + vec2(0., e)) - depthAt(uv - vec2(0., e));
  vec3 n = normalize(vec3(-dx * 9., -dy * 9., 1.));
  vec3 L = normalize(vec3(uMouse.x * .9, uMouse.y * .9, .75));
  float diff = max(dot(n, L), 0.);
  float spec = pow(max(dot(reflect(-L, n), vec3(0., 0., 1.)), 0.), 14.);
  float lum = dot(c.rgb, vec3(.3, .59, .11));
  c.rgb *= .78 + diff * .32;
  c.rgb += vec3(.55, .62, .82) * spec * .28 * (.35 + lum);
  // Contorno neón: borde de la silueta (transparencia de la imagen)
  float e3 = 3. / 360.;
  float ax = texture2D(uImg, uv + vec2(e3, 0.)).a - texture2D(uImg, uv - vec2(e3, 0.)).a;
  float ay = texture2D(uImg, uv + vec2(0., e3)).a - texture2D(uImg, uv - vec2(0., e3)).a;
  float edge = clamp(length(vec2(ax, ay)) * 2.2, 0., 1.) * c.a;
  float pulse = .75 + .25 * sin(uTime * 6.);
  c.rgb += vec3(.72, 1., .1) * edge * uGlow * pulse * 1.3;
  gl_FragColor = c;
}`;

/* Mapa de profundidad (1 = cerca, 0 = fondo) hecho con volúmenes suaves sobre la anatomía */
const buildPanteraDepth = (alpha) => {
  const S = PANTERA_SIZE;
  const raw = document.createElement("canvas");
  raw.width = raw.height = S;
  const c = raw.getContext("2d");
  c.fillStyle = "#000";
  c.fillRect(0, 0, S, S);
  const blob = (x, y, rx, ry, v, op = "lighter") => {
    c.save();
    c.globalCompositeOperation = op;
    c.translate(x, y);
    c.scale(rx, ry);
    const k = Math.round(v * 255);
    const g = c.createRadialGradient(0, 0, 0, 0, 0, 1);
    g.addColorStop(0, `rgb(${k},${k},${k})`);
    g.addColorStop(0.65, `rgba(${k},${k},${k},.7)`);
    g.addColorStop(1, "rgba(0,0,0,0)");
    c.fillStyle = g;
    c.beginPath();
    c.arc(0, 0, 1, 0, Math.PI * 2);
    c.fill();
    c.restore();
  };
  blob(40, 250, 110, 150, 0.22);                 // hombro (atrás)
  blob(215, 170, 175, 160, 0.42);                // cabeza
  blob(225, 70, 95, 50, 0.1);                    // frente
  blob(272, 250, 85, 80, 0.26);                  // hocico
  blob(220, 272, 70, 50, 0.12);                  // almohadilla de bigotes
  blob(274, 232, 40, 28, 0.2);                   // nariz
  blob(262, 310, 55, 30, 0.08);                  // mentón
  blob(181, 141, 20, 13, 0.06, "difference");    // cuencas de los ojos
  blob(304, 140, 18, 12, 0.06, "difference");

  const depth = document.createElement("canvas");
  depth.width = depth.height = S;
  const d = depth.getContext("2d");
  d.filter = "blur(7px)";
  d.drawImage(raw, 0, 0);
  d.filter = "none";
  const px = d.getImageData(0, 0, S, S);
  for (let i = 0; i < S * S; i++) {
    const v = px.data[i * 4] * (alpha[i * 4 + 3] / 255);   // recorta por la silueta
    px.data[i * 4] = px.data[i * 4 + 1] = px.data[i * 4 + 2] = v;
    px.data[i * 4 + 3] = 255;
  }
  d.putImageData(px, 0, 0);
  return { canvas: depth, data: px.data };
};

const initPantera = () => {
  const root = $("#pantera");
  const scene = $("#pantera-scene");
  const canvas = $("#pantera-gl");
  const eyes = $("#pantera-eyes");
  const bloom = $("#pantera-bloom");
  const gazes = $$(".pantera__gaze");
  const pupils = $$(".pantera__pupil");
  const lids = $$(".pantera__lid");
  const neons = $$(".pantera__neon");

  const setStatic = () => {
    root.classList.add("is-static");
    bloom.setAttribute("opacity", "0.7");
  };

  // Encendido del neón al cargar (parpadeo de letrero)
  if (!reducedMotion.matches) {
    const ignite = [{ opacity: 0 }, { opacity: 1, offset: 0.15 }, { opacity: 0.25, offset: 0.25 }, { opacity: 1, offset: 0.4 }, { opacity: 0.5, offset: 0.5 }, { opacity: 1 }];
    neons.forEach((n) => n.animate(ignite, { duration: 1200, delay: 400, fill: "backwards" }));
  }
  if (!ENABLE.pantera3d || reducedMotion.matches) { setStatic(); return; }

  const gl = canvas.getContext("webgl", { premultipliedAlpha: false, alpha: true, antialias: true });
  if (!gl) { setStatic(); return; }

  let uni = {};
  let depthData = null;
  let ready = false;

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    if (!rect.width) return;
    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);
    gl.viewport(0, 0, canvas.width, canvas.height);
  };

  const img = new Image();
  img.src = "assets/pantera.png";
  img.decode().then(() => {
    const S = PANTERA_SIZE;
    const tmp = document.createElement("canvas");
    tmp.width = tmp.height = S;
    const t = tmp.getContext("2d");
    t.drawImage(img, 0, 0, S, S);
    const depth = buildPanteraDepth(t.getImageData(0, 0, S, S).data);
    depthData = depth.data;

    const shader = (type, src) => {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s));
      return s;
    };
    const prog = gl.createProgram();
    gl.attachShader(prog, shader(gl.VERTEX_SHADER, PANTERA_VERT));
    gl.attachShader(prog, shader(gl.FRAGMENT_SHADER, PANTERA_FRAG));
    gl.linkProgram(prog);
    gl.useProgram(prog);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const texture = (unit, source) => {
      gl.activeTexture(gl.TEXTURE0 + unit);
      gl.bindTexture(gl.TEXTURE_2D, gl.createTexture());
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    };
    texture(0, img);
    texture(1, depth.canvas);
    ["uImg", "uDepth", "uMouse", "uStrength", "uGlow", "uTime"].forEach((n) => { uni[n] = gl.getUniformLocation(prog, n); });
    gl.uniform1i(uni.uImg, 0);
    gl.uniform1i(uni.uDepth, 1);
    resize();
    ready = true;
    wake();
  }).catch(setStatic);

  /* Entrada: cursor/dedo en toda la pantalla y giroscopio en celulares que lo permiten */
  let tx = 0;
  let ty = 0;
  let lastMove = 0;
  const onPointer = (e) => {
    const r = root.getBoundingClientRect();
    tx = Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width * 0.6)) / (window.innerWidth * 0.45)));
    ty = Math.max(-1, Math.min(1, (e.clientY - (r.top + r.height * 0.42)) / (window.innerHeight * 0.45)));
    lastMove = performance.now();
  };
  window.addEventListener("pointermove", onPointer, { passive: true });
  window.addEventListener("pointerdown", onPointer, { passive: true });
  window.addEventListener("deviceorientation", (e) => {
    if (e.gamma == null) return;
    tx = Math.max(-1, Math.min(1, e.gamma / 30));
    ty = Math.max(-1, Math.min(1, (e.beta - 45) / 30));
    lastMove = performance.now();
  });

  /* Parpadeo ocasional */
  const blink = () => {
    if (visible) lids.forEach((l) => l.animate([{ transform: "scaleY(0)" }, { transform: "scaleY(1)" }, { transform: "scaleY(0)" }], { duration: 220, easing: "ease-in-out" }));
    setTimeout(blink, 3200 + Math.random() * 3800);
  };
  setTimeout(blink, 2600);

  /* Bucle: solo corre con el hero visible, en Inicio y con la pestaña abierta */
  const cur = { x: 0, y: 0, ix: 0, iy: 0, near: 0, g: 0.06 };
  let glow = 0;
  let raf = 0;
  let visible = false;
  const start = performance.now();
  const S = PANTERA_SIZE;

  const frame = (now) => {
    raf = 0;
    if (!visible || currentView !== "inicio" || document.hidden) return;
    let nx = tx;
    let ny = ty;
    if (now - lastMove > 3500) { nx = Math.sin(now / 1900) * 0.7; ny = Math.sin(now / 2700) * 0.4; }   // deambula si no hay cursor
    cur.x += (nx - cur.x) * 0.07;
    cur.y += (ny - cur.y) * 0.07;
    cur.ix += (nx - cur.ix) * 0.22;
    cur.iy += (ny - cur.iy) * 0.22;
    cur.near += (Math.max(0, 1 - Math.hypot(nx, ny)) - cur.near) * 0.1;

    // Neón siempre encendido; "respira" con un pulso suave
    const pulse = 0.82 + Math.sin(now / 900) * 0.18;
    glow += ((now - start > 600 ? 1 : 0) - glow) * 0.05;
    bloom.setAttribute("opacity", (glow * (0.55 + pulse * 0.3)).toFixed(3));
    cur.g += ((0.26 + cur.near * 0.14) * glow * pulse - cur.g) * 0.08;
    root.style.setProperty("--g", cur.g.toFixed(3));

    const breathe = 1 + Math.sin(now / 1200) * 0.007;
    scene.style.transform = `rotateY(${(cur.x * 12).toFixed(2)}deg) rotateX(${(-cur.y * 9).toFixed(2)}deg) scale(${breathe.toFixed(4)})`;

    if (ready) {
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform2f(uni.uMouse, cur.x, -cur.y);   // en WebGL el eje Y apunta hacia arriba
      gl.uniform1f(uni.uStrength, PANTERA_STRENGTH);
      gl.uniform1f(uni.uGlow, glow * 0.85);
      gl.uniform1f(uni.uTime, now / 1000);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      // Los ojos acompañan el paralaje a la profundidad de la cara
      const k = (depthData[(141 * S + 240) * 4] / 255 - 0.35) * PANTERA_STRENGTH * S;
      eyes.setAttribute("transform", `translate(${(cur.x * k).toFixed(2)} ${(cur.y * k).toFixed(2)})`);
    }
    // Pupilas: siguen al cursor y se dilatan un poco al acercarse
    gazes.forEach((g) => g.setAttribute("transform", `translate(${(cur.ix * 5).toFixed(2)} ${(cur.iy * 2.6).toFixed(2)})`));
    pupils.forEach((p, i) => p.setAttribute("rx", ((i ? 2.2 : 2.4) * (0.7 + cur.near * 0.35)).toFixed(2)));
    raf = requestAnimationFrame(frame);
  };
  const wake = () => { if (!raf && visible) raf = requestAnimationFrame(frame); };
  wakePantera = wake;

  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) { resize(); wake(); }
  }).observe(root);
  document.addEventListener("visibilitychange", wake);
  window.addEventListener("resize", () => { if (ready) resize(); });
};
// Se reasigna en initPantera; onViewChange lo llama al volver a Inicio
let wakePantera = () => {};

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

/* =========================================================
   EFECTOS DE PROYECTOS (al pasar el cursor por una tarjeta con data-fx)
   vta      → del texto a la voz: letras → braille → ondas de sonido
   baseball → pelotas 3D (blanco, azul, rojo y dorado) que caen y rebotan
   setp     → rutas de bus "Caribe samario" que se despliegan con buses
   ========================================================= */
let stopProjectFx = () => {};
const initProjectFx = () => {
  if (!ENABLE.projectFx || reducedMotion.matches) return;

  const NS = "http://www.w3.org/2000/svg";
  const AC = "#b8ff1a";

  /* ---------- Capas del efecto: se ajustan al cuadro del proyecto (no bloquean clics) ---------- */
  const canvas = document.createElement("canvas");
  canvas.className = "fx-overlay";
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d");
  const routesSvg = document.createElementNS(NS, "svg");
  routesSvg.setAttribute("class", "fx-routes");
  routesSvg.innerHTML = `<defs><filter id="fx-route-glow" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="5"/></filter></defs>`;
  document.body.appendChild(routesSvg);

  let W = 0, H = 0, dpr = 1;
  let target = null;   // tarjeta sobre la que se dibuja el efecto

  /* Coloca las capas exactamente sobre la tarjeta (recortada al área visible del tablero o el carrusel) */
  const fitToCard = () => {
    if (!target) return;
    const r = target.getBoundingClientRect();
    const box = target.closest(".board, .carousel")?.getBoundingClientRect();
    const left = box ? Math.max(r.left, box.left) : r.left;
    const top = box ? Math.max(r.top, box.top) : r.top;
    const right = box ? Math.min(r.right, box.right) : r.right;
    const bottom = box ? Math.min(r.bottom, box.bottom) : r.bottom;
    const w = Math.max(1, Math.round(right - left));
    const h = Math.max(1, Math.round(bottom - top));
    for (const el of [canvas, routesSvg]) {
      el.style.left = `${left}px`;
      el.style.top = `${top}px`;
      el.style.width = `${w}px`;
      el.style.height = `${h}px`;
    }
    const nextDpr = Math.min(window.devicePixelRatio || 1, 2);
    if (w !== W || h !== H || nextDpr !== dpr) {
      W = w; H = h; dpr = nextDpr;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      routesSvg.setAttribute("viewBox", `0 0 ${W} ${H}`);
    }
  };
  window.addEventListener("resize", fitToCard);

  const rand = (a, b) => a + Math.random() * (b - a);
  // source: área del efecto en coordenadas de la propia capa (0,0 = esquina de la tarjeta)
  const state = { active: null, source: null, wave: 0, letters: [], balls: [], spawnAcc: 0 };

  /* =========================================================
     1. VISUAL TEXT ASSIST: letras que se vuelven braille y luego sonido
     ========================================================= */
  const BRAILLE = {
    a: [1], b: [1, 2], c: [1, 4], d: [1, 4, 5], e: [1, 5], f: [1, 2, 4], g: [1, 2, 4, 5], h: [1, 2, 5], i: [2, 4], j: [2, 4, 5],
    k: [1, 3], l: [1, 2, 3], m: [1, 3, 4], n: [1, 3, 4, 5], o: [1, 3, 5], p: [1, 2, 3, 4], q: [1, 2, 3, 4, 5], r: [1, 2, 3, 5],
    s: [2, 3, 4], t: [2, 3, 4, 5], u: [1, 3, 6], v: [1, 2, 3, 6], w: [2, 4, 5, 6], x: [1, 3, 4, 6], y: [1, 3, 4, 5, 6], z: [1, 3, 5, 6],
  };
  const TEXT = "visual text assist lee libros en voz alta para todos ".replace(/ /g, "");
  let textIndex = 0;

  const spawnLetter = (rect) => {
    const ch = TEXT[textIndex++ % TEXT.length];
    state.letters.push({
      ch, x: rand(rect.left + 20, rect.right - 20), y: rand(rect.top + rect.height * 0.45, rect.top + rect.height * 0.85),
      vx: rand(-40, 40), vy: rand(-110, -50), life: 0, max: rand(2.2, 3.2), size: rand(14, 26), wob: rand(0, 6.28),
    });
  };

  const drawLetter = (l) => {
    const p = l.life / l.max;
    const a = Math.min(1, l.life * 4) * (p > 0.9 ? (1 - p) / 0.1 : 1);
    ctx.save();
    ctx.globalAlpha = a;
    if (p < 0.42) {
      // Letra del libro: de blanco a verde
      const g = Math.min(1, p / 0.42);
      ctx.fillStyle = `rgb(${Math.round(241 - g * 57)},${Math.round(244 + g * 11)},${Math.round(238 - g * 212)})`;
      ctx.font = `700 ${l.size}px Georgia, serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.shadowColor = AC;
      ctx.shadowBlur = 12 * g;
      ctx.fillText(l.ch.toUpperCase(), l.x, l.y);
    } else if (p < 0.72) {
      // Celda braille real de esa letra (6 puntos)
      const dots = BRAILLE[l.ch] || [];
      const s = l.size * 0.22;
      for (let n = 1; n <= 6; n++) {
        const col = n <= 3 ? 0 : 1;
        const row = (n - 1) % 3;
        const on = dots.includes(n);
        ctx.beginPath();
        ctx.arc(l.x + (col - 0.5) * s * 2.4, l.y + (row - 1) * s * 2.4, on ? s * 0.85 : s * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = on ? AC : "rgba(184,255,26,.18)";
        ctx.shadowColor = AC;
        ctx.shadowBlur = on ? 10 : 0;
        ctx.fill();
      }
    } else {
      // Se convierte en sonido: anillo que se expande
      const q = (p - 0.72) / 0.28;
      ctx.strokeStyle = AC;
      ctx.lineWidth = 2 * (1 - q) + 0.5;
      ctx.shadowColor = AC;
      ctx.shadowBlur = 8;
      for (let k = 0; k < 2; k++) {
        ctx.beginPath();
        ctx.arc(l.x, l.y, 4 + (q + k * 0.25) * l.size * 1.6, 0, Math.PI * 2);
        ctx.globalAlpha = a * (1 - q) * (k ? 0.5 : 1);
        ctx.stroke();
      }
    }
    ctx.restore();
  };

  // Onda de voz que cruza la pantalla
  const drawWave = (t) => {
    if (state.wave < 0.01) return;
    const y0 = state.source ? state.source.top + state.source.height * 0.35 : H / 2;
    ctx.save();
    ctx.globalAlpha = state.wave * 0.9;
    ctx.strokeStyle = AC;
    ctx.shadowColor = AC;
    ctx.shadowBlur = 14;
    for (let layer = 0; layer < 3; layer++) {
      ctx.beginPath();
      ctx.lineWidth = layer === 0 ? 2.4 : 1;
      ctx.globalAlpha = state.wave * (layer === 0 ? 0.85 : 0.35);
      for (let x = 0; x <= W; x += 6) {
        const env = Math.sin((x / W) * Math.PI);                    // más alta al centro
        const y = y0 + env * state.wave * (
          Math.sin(x * 0.018 + t * 6 + layer) * 26 +
          Math.sin(x * 0.047 - t * 9) * 14 +
          Math.sin(x * 0.006 + t * 2) * 18) * (1 - layer * 0.25) * 0.6;   // más baja: cabe en el cuadro
        if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
    ctx.restore();
  };

  /* =========================================================
     2. BASEBALL NATION: pelotas 3D que caen y rebotan
     ========================================================= */
  // Colores de la app Baseball Nation: blanco, azul, rojo y dorado
  const BALL_GLOWS = ["rgba(31,75,184,.75)", "rgba(212,42,42,.7)", "rgba(230,180,40,.8)"];
  const spawnBall = () => {
    const r = rand(8, 20) * Math.min(1.3, Math.max(0.7, Math.min(W, H) / 380));   // tamaño = profundidad; proporcional al cuadro
    state.balls.push({
      glow: BALL_GLOWS[Math.floor(Math.random() * BALL_GLOWS.length)],
      gold: Math.random() < 0.18,           // algunas pelotas doradas, como trofeo
      x: rand(r, W - r), y: -r - rand(0, 80), vx: rand(-70, 70), vy: rand(80, 220),
      r, spin: rand(-6, 6), angle: rand(0, 6.28), tumble: rand(0, 6.28), tumbleV: rand(2, 5),
      bounces: 0, life: 0, fade: 1,
    });
  };

  const drawBall = (b) => {
    const { x, y, r } = b;
    ctx.save();
    ctx.globalAlpha = b.fade * (0.55 + (r / 40) * 0.45);
    // Sombra en el suelo
    const floor = H - 6;
    const near = Math.max(0, 1 - (floor - y) / 500);
    ctx.fillStyle = `rgba(0,0,0,${0.35 * near})`;
    ctx.beginPath();
    ctx.ellipse(x, floor, r * (0.6 + near * 0.5), r * 0.18, 0, 0, Math.PI * 2);
    ctx.fill();
    // Esfera con luz arriba a la izquierda
    const g = ctx.createRadialGradient(x - r * 0.35, y - r * 0.4, r * 0.1, x, y, r);
    if (b.gold) {
      g.addColorStop(0, "#fff6cf");
      g.addColorStop(0.5, "#e6b428");
      g.addColorStop(1, "#8a6410");
    } else {
      g.addColorStop(0, "#ffffff");
      g.addColorStop(0.55, "#eef0f4");
      g.addColorStop(1, "#9aa0ad");
    }
    ctx.fillStyle = g;
    ctx.shadowColor = b.glow;
    ctx.shadowBlur = 22;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
    // Costuras rojas: giran y "tumban" en 3D (escala en X con el coseno)
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.clip();
    ctx.translate(x, y);
    ctx.rotate(b.angle);
    ctx.scale(Math.cos(b.tumble) * 0.9 + 0.1, 1);
    ctx.strokeStyle = b.gold ? "#1f4bb8" : "#d42a2a";   // costuras rojas (azules en las doradas)
    ctx.lineWidth = Math.max(1, r * 0.06);
    for (const side of [-1, 1]) {
      // Cada costura es un arco de un círculo vecino que entra en la pelota
      const cx = side * r * 1.32;
      const rr = r * 0.95;
      const base = side === -1 ? 0 : Math.PI;
      ctx.beginPath();
      ctx.arc(cx, 0, rr, base - 0.75, base + 0.75, false);
      ctx.lineWidth = Math.max(1, r * 0.06);
      ctx.stroke();
      // Puntadas
      for (let k = -4; k <= 4; k++) {
        const a = base + k * 0.17;
        const px = cx + Math.cos(a) * rr;
        const py = Math.sin(a) * rr;
        const nx = Math.cos(a), ny = Math.sin(a);
        ctx.beginPath();
        ctx.moveTo(px - nx * r * 0.09 - ny * r * 0.05, py - ny * r * 0.09 + nx * r * 0.05);
        ctx.lineTo(px + nx * r * 0.09 - ny * r * 0.05, py + ny * r * 0.09 + nx * r * 0.05);
        ctx.lineWidth = Math.max(0.8, r * 0.04);
        ctx.stroke();
      }
    }
    ctx.restore();
  };

  const updateBalls = (dt) => {
    const G = 1500;
    const floor = H - 6;
    for (const b of state.balls) {
      b.life += dt;
      b.vy += G * dt * (0.6 + (b.r / 40) * 0.4);
      b.x += b.vx * dt;
      b.y += b.vy * dt;
      b.angle += b.spin * dt;
      b.tumble += b.tumbleV * dt;
      if (b.y + b.r > floor) {
        b.y = floor - b.r;
        b.vy *= -0.52;
        b.vx *= 0.82;
        b.spin *= 0.8;
        b.bounces++;
      }
      if (b.x < b.r || b.x > W - b.r) { b.vx *= -0.8; b.x = Math.max(b.r, Math.min(W - b.r, b.x)); }
      if (b.bounces >= 3 || state.active !== "baseball") b.fade -= dt * (state.active === "baseball" ? 0.8 : 1.6);
    }
    state.balls = state.balls.filter((b) => b.fade > 0);
  };

  /* =========================================================
     3. SIU – SETP: rutas de bus que se despliegan sobre la pantalla
     ========================================================= */
  // Paleta "Caribe samario": mar turquesa, coral, atardecer, arena, océano y palma
  const ROUTE_COLORS = ["#00c2c7", "#ff6b5b", "#ff9f1c", "#ffd166", "#3a86ff", "#2ec4b6"];
  let routes = [];
  let routesTimer = 0;

  // Ruta tipo plano urbano: tramos horizontales/verticales con esquinas redondeadas
  const routePath = (i) => {
    const pts = [];
    const fromLeft = i % 2 === 0;
    let x = fromLeft ? -20 : W + 20;
    let y = rand(H * 0.12, H * 0.88);
    pts.push([x, y]);
    let horizontal = true;
    while (fromLeft ? x < W + 20 : x > -20) {
      if (horizontal) x += (fromLeft ? 1 : -1) * rand(W * 0.12, W * 0.26);
      else y = Math.max(H * 0.08, Math.min(H * 0.92, y + rand(-H * 0.3, H * 0.3)));
      pts.push([x, y]);
      horizontal = !horizontal;
    }
    let d = `M${pts[0][0]},${pts[0][1]}`;
    for (let k = 1; k < pts.length - 1; k++) {
      const [px, py] = pts[k - 1], [cx, cy] = pts[k], [nx, ny] = pts[k + 1];
      const r = 18;
      const inX = cx - Math.sign(cx - px) * Math.min(r, Math.abs(cx - px) / 2);
      const inY = cy - Math.sign(cy - py) * Math.min(r, Math.abs(cy - py) / 2);
      const outX = cx + Math.sign(nx - cx) * Math.min(r, Math.abs(nx - cx) / 2);
      const outY = cy + Math.sign(ny - cy) * Math.min(r, Math.abs(ny - cy) / 2);
      d += ` L${inX},${inY} Q${cx},${cy} ${outX},${outY}`;
    }
    d += ` L${pts[pts.length - 1][0]},${pts[pts.length - 1][1]}`;
    return d;
  };

  const showRoutes = () => {
    clearTimeout(routesTimer);
    routesSvg.querySelectorAll(".fx-route").forEach((g) => g.remove());
    routes = [];
    const n = W < 420 ? 3 : 4;
    for (let i = 0; i < n; i++) {
      const color = ROUTE_COLORS[i % ROUTE_COLORS.length];
      const g = document.createElementNS(NS, "g");
      g.setAttribute("class", "fx-route");
      const d = routePath(i);
      g.innerHTML = `
        <path d="${d}" fill="none" stroke="${color}" stroke-width="12" opacity=".18" filter="url(#fx-route-glow)"/>
        <path class="fx-line" d="${d}" fill="none" stroke="${color}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>`;
      routesSvg.appendChild(g);
      const line = g.querySelector(".fx-line");
      const glow = g.firstElementChild;
      const len = line.getTotalLength();
      for (const p of [line, glow]) {
        p.style.strokeDasharray = `${len}`;
        p.style.strokeDashoffset = `${len}`;
        p.style.transition = `stroke-dashoffset 1.3s cubic-bezier(.6,0,.2,1) ${i * 0.12}s`;
      }
      // Paraderos a lo largo de la ruta
      const stops = [];
      const count = Math.max(3, Math.round(len / 170));
      for (let k = 1; k < count; k++) {
        const pt = line.getPointAtLength((len * k) / count);
        const c = document.createElementNS(NS, "circle");
        c.setAttribute("cx", pt.x);
        c.setAttribute("cy", pt.y);
        c.setAttribute("r", "5");
        c.setAttribute("fill", "#0a0c0b");
        c.setAttribute("stroke", color);
        c.setAttribute("stroke-width", "2.5");
        c.style.transformOrigin = `${pt.x}px ${pt.y}px`;
        c.style.transform = "scale(0)";
        c.style.transition = `transform .35s cubic-bezier(.3,1.6,.5,1) ${i * 0.12 + (1.3 * k) / count}s`;
        g.appendChild(c);
        stops.push(c);
      }
      // Etiqueta de la ruta
      const pt0 = line.getPointAtLength(Math.min(90, len * 0.1));
      // La etiqueta nunca se sale del cuadro del proyecto
      const start = { x: Math.max(40, Math.min(W - 40, pt0.x)), y: Math.max(40, Math.min(H - 8, pt0.y)) };
      const label = document.createElementNS(NS, "g");
      label.innerHTML = `<rect x="${start.x - 34}" y="${start.y - 34}" width="68" height="22" rx="11" fill="#0a0c0b" stroke="${color}"/>
        <text x="${start.x}" y="${start.y - 19}" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="11" font-weight="500" fill="${color}">RUTA ${[7, 12, 3, 21, 9, 15][i]}</text>`;
      label.style.opacity = "0";
      label.style.transition = `opacity .4s ${i * 0.12 + 0.3}s`;
      g.appendChild(label);
      // Buses que recorren la ruta
      const buses = [0, 0.5].slice(0, len > 900 ? 2 : 1).map((offset) => {
        const bus = document.createElementNS(NS, "g");
        bus.innerHTML = `<circle r="14" fill="${color}" opacity=".22"/><rect x="-11" y="-8" width="22" height="16" rx="4" fill="${color}" stroke="#0a0c0b" stroke-width="1.5"/><rect x="-8" y="-5" width="16" height="5" rx="1" fill="#0a0c0b"/>`;
        bus.style.opacity = "0";
        bus.style.transition = "opacity .4s";
        g.appendChild(bus);
        return { el: bus, offset, speed: rand(0.05, 0.09) };
      });
      routes.push({ g, line, glow, len, stops, label, buses });
    }
    // Siguiente cuadro: arranca el dibujo de las líneas
    requestAnimationFrame(() => requestAnimationFrame(() => {
      routes.forEach((r) => {
        r.line.style.strokeDashoffset = "0";
        r.glow.style.strokeDashoffset = "0";
        r.stops.forEach((s) => { s.style.transform = "scale(1)"; });
        r.label.style.opacity = "1";
        r.buses.forEach((b) => { setTimeout(() => { b.el.style.opacity = "1"; }, 1200); });
      });
    }));
  };

  const hideRoutes = () => {
    routes.forEach((r) => {
      r.line.style.transition = r.glow.style.transition = "stroke-dashoffset .7s cubic-bezier(.6,0,.2,1)";
      r.line.style.strokeDashoffset = r.glow.style.strokeDashoffset = `${r.len}`;
      r.stops.forEach((s) => { s.style.transition = "transform .25s"; s.style.transform = "scale(0)"; });
      r.label.style.transition = "opacity .25s";
      r.label.style.opacity = "0";
      r.buses.forEach((b) => { b.el.style.opacity = "0"; });
    });
    const old = routes;
    routesTimer = setTimeout(() => old.forEach((r) => r.g.remove()), 800);
    routes = [];
  };

  const updateBuses = (t) => {
    routes.forEach((r) => r.buses.forEach((b) => {
      const pos = ((t * b.speed + b.offset) % 1) * r.len;
      const pt = r.line.getPointAtLength(pos);
      b.el.setAttribute("transform", `translate(${pt.x.toFixed(1)} ${pt.y.toFixed(1)})`);
    }));
  };

  /* =========================================================
     BUCLE: solo corre mientras hay algo que dibujar
     ========================================================= */
  let raf = 0;
  let last = 0;
  const loop = (now) => {
    const t = now / 1000;
    const dt = Math.min(0.05, (now - (last || now)) / 1000);
    last = now;
    fitToCard();   // sigue a la tarjeta si la página se desplaza
    ctx.clearRect(0, 0, W, H);

    if (state.active === "vta" && state.source) {
      state.spawnAcc += dt * 11;
      while (state.spawnAcc > 1) { spawnLetter(state.source); state.spawnAcc--; }
    }
    if (state.active === "baseball" && state.balls.length < 16) {
      state.spawnAcc += dt * 4;
      while (state.spawnAcc > 1) { spawnBall(); state.spawnAcc--; }
    }

    state.wave += ((state.active === "vta" ? 1 : 0) - state.wave) * 0.08;
    drawWave(t);
    for (const l of state.letters) {
      l.life += dt;
      l.x += (l.vx + Math.sin(l.life * 3 + l.wob) * 30) * dt;
      l.y += l.vy * dt;
      drawLetter(l);
    }
    state.letters = state.letters.filter((l) => l.life < l.max);

    updateBalls(dt);
    state.balls.forEach(drawBall);
    updateBuses(t);

    const busy = state.active || state.letters.length || state.balls.length || state.wave > 0.01;
    raf = busy ? requestAnimationFrame(loop) : 0;
    if (!raf) { last = 0; ctx.clearRect(0, 0, W, H); }
  };
  const wake = () => { if (!raf) raf = requestAnimationFrame(loop); };

  const activate = (type, el) => {
    if (reducedMotion.matches) return;
    if (state.active === "setp" && type !== "setp") hideRoutes();
    // Al cambiar de tarjeta se limpian los restos del efecto anterior
    if (target !== el) { state.letters = []; state.balls = []; state.wave = 0; }
    target = el;
    fitToCard();
    state.active = type;
    state.source = { left: 0, top: 0, right: W, bottom: H, width: W, height: H };
    state.spawnAcc = type === "baseball" ? 2 : 0;   // las primeras pelotas salen al instante
    if (type === "setp") showRoutes();
    wake();
  };
  const deactivate = (type) => {
    if (state.active !== type) return;
    if (type === "setp") hideRoutes();
    state.active = null;
  };


  /* Delegación: sirve para las tarjetas de la cuadrícula, el carrusel y el tablero.
     Nunca en la página de detalle de un proyecto (ahí se lee la información). */
  const fxAllowed = (el) => currentView !== "proyecto" && !el.closest(".case");
  let hovered = null;
  document.addEventListener("pointerover", (e) => {
    if (e.pointerType !== "mouse") return;
    const card = e.target.closest?.("[data-fx]");
    if (card && !fxAllowed(card)) return;
    if (!card || card === hovered) return;
    if (hovered) deactivate(hovered.dataset.fx);
    hovered = card;
    activate(card.dataset.fx, card);
  });
  document.addEventListener("pointerout", (e) => {
    if (e.pointerType !== "mouse" || !hovered) return;
    if (e.relatedTarget && hovered.contains(e.relatedTarget)) return;
    deactivate(hovered.dataset.fx);
    hovered = null;
  });
  // En táctil: un toque lo muestra unos segundos
  let touchTimer = 0;
  document.addEventListener("pointerdown", (e) => {
    if (e.pointerType === "mouse") return;
    const card = e.target.closest?.("[data-fx]");
    if (!card || !fxAllowed(card)) return;
    activate(card.dataset.fx, card);
    clearTimeout(touchTimer);
    touchTimer = setTimeout(() => deactivate(card.dataset.fx), 2600);
  });
  stopProjectFx = () => { if (state.active) deactivate(state.active); hovered = null; };
};

/* =========================================================
   PANTALLA DE CARGA CINEMATOGRÁFICA
   Ojos en la oscuridad → la pantera emerge → escaneo neón → PANTHERCODE se descifra
   → la pantera se lanza y la pantalla se abre como una mandíbula.
   Devuelve una promesa que se cumple al abrirse (para la entrada de PANTHERCODE 3D).
   ========================================================= */
const LOADER_MESSAGES = ["Despertando a la pantera", "Afinando los bigotes", "Encendiendo el neón", "¡Lista!"];

const initLoader = () => new Promise((resolve) => {
  const loader = $("#loader");
  if (!loader) { resolve(); return; }
  // Solo la primera vez por visita (pestaña); al navegar o recargar no se repite
  let seen = false;
  try { seen = sessionStorage.getItem("pc-loader") === "1"; sessionStorage.setItem("pc-loader", "1"); } catch { /* sin almacenamiento: se muestra */ }
  if (seen && !new URLSearchParams(location.search).has("intro")) { loader.remove(); resolve(); return; }
  document.documentElement.classList.add("is-loading");
  const panther = $("#loader-panther");
  const bar = $("#loader-bar");
  const pct = $("#loader-pct");
  const msg = $("#loader-msg");
  const pantherTxt = $("#loader-panther-txt");
  const codeTxt = $("#loader-code-txt");
  const quick = reducedMotion.matches;
  const DURATION = quick ? 400 : 2800;

  // Chispas verdes que flotan alrededor de la pantera
  if (!quick) {
    $("#loader-sparks").innerHTML = Array.from({ length: 26 }, () => {
      const s = (2 + Math.random() * 3).toFixed(1);
      return `<i style="--x:${(15 + Math.random() * 75).toFixed(1)}%;--s:${s}px;--d:${(0.8 + Math.random() * 2.2).toFixed(2)}s;--dur:${(1.6 + Math.random() * 1.6).toFixed(2)}s;--dx:${((Math.random() - 0.5) * 60).toFixed(0)}px"></i>`;
    }).join("");
  }

  // Texto que se descifra (como código) entre "from" y "to" ms
  const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#%&/<>_0123456789";
  const decode = (el, word, t, from, to) => {
    const p = Math.max(0, Math.min(1, (t - from) / (to - from)));
    const solved = Math.floor(p * word.length);
    el.textContent = p === 0 ? "" : [...word].map((ch, i) => (i < solved ? ch : GLYPHS[Math.floor(Math.random() * GLYPHS.length)])).join("");
  };

  let loaded = document.readyState === "complete";
  window.addEventListener("load", () => { loaded = true; });
  const start = performance.now();
  let lit = false;

  const finish = () => {
    loader.classList.add("is-lunge");                        // la pantera se lanza
    setTimeout(() => {
      loader.classList.add("is-exit");                        // la pantalla se abre
      document.documentElement.classList.remove("is-loading");
      resolve();
      setTimeout(() => loader.remove(), 1300);
    }, quick ? 0 : 380);
  };

  const tick = (now) => {
    const t = now - start;
    const ease = (x) => 1 - Math.pow(1 - Math.max(0, Math.min(1, x)), 3);
    // La cara emerge desde los ojos y se ilumina
    const reveal = quick ? 1 : ease((t - 650) / 1300);
    panther.style.setProperty("--r", `${(reveal * 85).toFixed(1)}%`);
    panther.style.setProperty("--lit", (0.2 + reveal * 0.8).toFixed(3));
    // PANTHER se descifra; luego CODE se enciende como neón
    decode(pantherTxt, "PANTHER", t, quick ? 0 : 1000, quick ? 1 : 1700);
    decode(codeTxt, "CODE", t, quick ? 0 : 1500, quick ? 1 : 1950);
    if (!lit && t > (quick ? 0 : 1950)) { codeTxt.classList.add("is-lit"); lit = true; }
    // Progreso (no llega al 100% hasta que todo cargó)
    const p = loaded ? Math.min(1, t / DURATION) : Math.min(0.92, t / DURATION);
    bar.style.transform = `scaleX(${p.toFixed(3)})`;
    pct.textContent = `${Math.round(p * 100)}%`;
    msg.textContent = LOADER_MESSAGES[Math.min(LOADER_MESSAGES.length - 1, Math.floor(p * LOADER_MESSAGES.length))];
    if (p >= 1) { finish(); return; }
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
});

/* =========================================================
   FORMULARIO DE CONTACTO
   Guarda el mensaje en la tabla "mensajes" de Supabase; lo lees en el panel /admin.
   La publishable key es pública por diseño: la tabla solo permite insertar (RLS).
   ========================================================= */
const SUPABASE = {
  url: "https://eyvoslepyjtxzkqvojxn.supabase.co",
  key: "sb_publishable_5UFDTxoQDlosGQtbs8iFRQ_dB1ZksJR",
};

const saveMessage = async (row) => {
  const res = await fetch(`${SUPABASE.url}/rest/v1/mensajes`, {
    method: "POST",
    headers: { apikey: SUPABASE.key, "Content-Type": "application/json", Prefer: "return=minimal" },
    body: JSON.stringify(row),
  });
  if (!res.ok) throw new Error(`Supabase ${res.status}`);
};

const initContactForm = () => {
  const form = $("#cform");
  if (!form) return;
  const error = $("#cform-error");
  const LABELS = { nombre: "tu nombre", correo: "un correo válido", mensaje: "un mensaje (mínimo 10 caracteres)" };
  // Al escribir, el campo deja de marcarse en rojo
  form.addEventListener("input", (e) => {
    e.target.closest(".field")?.classList.remove("is-invalid");
    if (!form.querySelector(".is-invalid")) error.textContent = "";
  });
  $("#cform-again").addEventListener("click", () => {
    $("#cform-done").hidden = true;
    form.elements.nombre.focus();
  });
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = new FormData(form);
    // Campo trampa: los bots lo llenan, las personas no lo ven
    if (String(data.get("web") || "")) return;
    const nombre = String(data.get("nombre") || "").trim();
    const correo = String(data.get("correo") || "").trim();
    const mensaje = String(data.get("mensaje") || "").trim();
    form.querySelectorAll(".field").forEach((f) => f.classList.remove("is-invalid"));
    const bad = [];
    if (!nombre) bad.push("nombre");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) bad.push("correo");
    if (mensaje.length < 10) bad.push("mensaje");
    if (bad.length) {
      bad.forEach((n) => form.elements[n].closest(".field").classList.add("is-invalid"));
      error.textContent = `Falta ${bad.map((n) => LABELS[n]).join(", ")}.`;
      form.elements[bad[0]].focus();
      return;
    }
    error.textContent = "";
    const button = form.querySelector('button[type="submit"]');
    button.disabled = true;
    button.querySelector("span").textContent = "Enviando…";
    try {
      await saveMessage({ nombre, correo, tipo: String(data.get("tipo") || "Otro"), mensaje });
      $("#cform-name").textContent = nombre;
      $("#cform-mail").textContent = correo;
      $("#cform-done").hidden = false;
      showToast("Mensaje enviado");
      form.reset();
    } catch {
      error.textContent = `No se pudo enviar. Escríbeme a ${EMAIL} o por WhatsApp.`;
    } finally {
      button.disabled = false;
      button.querySelector("span").textContent = "Enviar mensaje";
    }
  });
};

/* Se llama en cada cambio de vista */
const onViewChange = (name) => {
  stopProjectFx();
  setDotsActive(name === "inicio");
  if (name === "inicio") wakePantera();
};

/* =========================================================
   10. INICIO
   ========================================================= */
const init = () => {
  loadPanther();
  renderStatic();
  renderFilters();
  renderGrid();

  // "Enviar mensaje": abre el correo personal con asunto y mensaje base
  const mailUrl = `mailto:${EMAIL}?subject=${encodeURIComponent(MAIL_MESSAGE.subject)}&body=${encodeURIComponent(MAIL_MESSAGE.body)}`;
  $$("[data-mail-message]").forEach((link) => { link.href = mailUrl; });

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
  initPantera();
  initCursor();

  // Interacciones nuevas (desactívalas en ENABLE, al inicio del archivo)
  initDots();
  initSplit();
  initBoard();
  initScramble();
  initProjectFx();
  // PANTHERCODE 3D hace su entrada cuando termina la pantalla de carga
  // Intro "La pantera de luz": página de bienvenida en cada visita y recarga; si falta intro.js, la carga clásica
  const loaderDone = window.initIntro ? initIntro({ always: true }) : initLoader();
  if (window.initWordmark3D) initWordmark3D($("#w3d"), undefined, { ready: loaderDone });
  initContactForm();

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
