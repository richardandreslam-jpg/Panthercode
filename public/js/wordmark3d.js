/* =========================================================
   WORDMARK "PANTHERCODE" EN 3D
   Cada letra es un bloque de capas apiladas en Z:
   PANTHER → frente cromado, canto que termina en verde neón
   CODE    → frente verde neón, canto verde oscuro con resplandor
   - Entrada: las letras llegan volando desde el fondo, girando, una por una.
   - La palabra se inclina siguiendo el cursor; una ola suave las hace flotar.
   - Al pasar el cursor por una letra, salta hacia ti y da un giro completo.
   - Cada pocos segundos un destello de luz recorre el frente de las letras.
   ========================================================= */
(() => {
  // Respeta "reducir animaciones" del sistema solo si PC_REDUCE_MOTION = true (index.html)
  const reduced = window.PC_REDUCE_MOTION ? window.matchMedia("(prefers-reduced-motion: reduce)") : { matches: false };
  const LAYERS = 12;   // grosor de cada letra

  // Color del canto según la variante (t: 0 = junto al frente, 1 = fondo)
  const sideColor = {
    chrome: (t) => `rgb(${Math.round(18 + t * 120)},${Math.round(28 + t * 140)},${Math.round(16 + t * 10)})`,
    neon: (t) => `rgb(${Math.round(20 + t * 60)},${Math.round(40 + t * 110)},${Math.round(4 + t * 6)})`,
  };

  // ready: promesa opcional; la entrada de las letras espera a que se cumpla (p. ej. fin de la pantalla de carga)
  window.initWordmark3D = (el, segments = [{ text: "PANTHER", variant: "chrome" }, { text: "CODE", variant: "neon" }], { ready = Promise.resolve() } = {}) => {
    el.setAttribute("aria-label", segments.map((s) => s.text).join("").replace(/^(.)(.*)$/, (m, a, b) => a + b.toLowerCase()));
    const depth = parseFloat(getComputedStyle(el).fontSize) * 0.016;   // grosor proporcional al tamaño
    const letters = [];

    segments.forEach(({ text, variant }) => {
      const seg = document.createElement("span");
      seg.className = `w3d__seg w3d__seg--${variant}`;
      seg.setAttribute("aria-hidden", "true");
      [...text].forEach((ch) => {
        const l = document.createElement("span");
        l.className = "w3d__l";
        l.textContent = ch;                        // da el tamaño (invisible)
        for (let i = LAYERS - 1; i >= 0; i--) {
          const layer = document.createElement("span");
          layer.textContent = ch;
          if (i === 0) {
            layer.className = "w3d__face";
          } else if (i === LAYERS - 1) {
            layer.className = "w3d__back";
          } else {
            layer.className = "w3d__side";
            layer.style.color = sideColor[variant](i / (LAYERS - 1));
          }
          layer.style.transform = `translateZ(${(-i * depth).toFixed(2)}px)`;
          l.appendChild(layer);
        }
        seg.appendChild(l);
        letters.push({ el: l, spin: -1 });
      });
      el.appendChild(seg);
    });

    if (reduced.matches) return;

    /* Entrada: llegan volando desde el fondo, girando (cuando "ready" se cumple) */
    let introEnd = Infinity;
    letters.forEach((l) => { l.el.style.opacity = "0"; });
    ready.then(() => {
      letters.forEach((l, i) => {
        l.el.style.opacity = "";
        const from = `translate3d(${(Math.random() - 0.5) * 800}px, ${(Math.random() - 0.5) * 500}px, -1000px) rotateX(${(Math.random() - 0.5) * 540}deg) rotateY(${(Math.random() - 0.5) * 720}deg)`;
        l.el.animate(
          [{ transform: from, opacity: 0 }, { opacity: 1, offset: 0.35 }, { transform: "translate3d(0,0,50px) rotateX(0) rotateY(0)", offset: 0.82 }, { transform: "translate3d(0,0,0)", opacity: 1 }],
          { duration: 1300, delay: 150 + i * 80, easing: "cubic-bezier(.2,.75,.25,1)", fill: "backwards" }
        );
      });
      introEnd = performance.now() + 150 + letters.length * 80 + 1300;
      setTimeout(sweep, introEnd - performance.now() + 300);
    });

    /* Al pasar el cursor por una letra: salto y giro completo */
    letters.forEach((l) => {
      l.el.addEventListener("pointerenter", () => {
        if (performance.now() < introEnd || l.spin >= 0) return;
        l.spin = performance.now();
      });
    });

    /* Inclinación con el cursor */
    let tx = 0, ty = 0, cx = 0, cy = 0;
    window.addEventListener("pointermove", (e) => {
      const r = el.getBoundingClientRect();
      tx = Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / (window.innerWidth * 0.5)));
      ty = Math.max(-1, Math.min(1, (e.clientY - (r.top + r.height / 2)) / (window.innerHeight * 0.5)));
    }, { passive: true });

    /* Destello de luz que recorre el frente */
    const faces = [...el.querySelectorAll(".w3d__face")];
    const sweep = () => {
      faces.forEach((f, i) => f.animate(
        [{ backgroundPosition: "180% 0, 0 0" }, { backgroundPosition: "-80% 0, 0 0" }],
        { duration: 900, delay: i * 55, easing: "ease-in-out" }
      ));
      setTimeout(sweep, 4800);
    };

    /* Bucle: ola + inclinación + giros. Se pausa fuera de pantalla. */
    let visible = true;
    let raf = 0;
    const loop = (now) => {
      raf = 0;
      if (!visible || document.hidden) return;
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      el.style.transform = `rotateX(${(-cy * 14).toFixed(2)}deg) rotateY(${(cx * 22).toFixed(2)}deg)`;
      if (now > introEnd) {
        const t = now / 1000;
        letters.forEach((l, i) => {
          let z = Math.sin(t * 2.2 + i * 0.55) * 8;
          let ry = Math.sin(t * 1.6 + i * 0.5) * 6;
          let rx = 0;
          if (l.spin >= 0) {
            const p = Math.min(1, (now - l.spin) / 850);
            const e = 1 - Math.pow(1 - p, 3);
            ry += e * 360;
            z += Math.sin(p * Math.PI) * 70;
            rx = Math.sin(p * Math.PI) * -18;
            if (p >= 1) l.spin = -1;
          }
          l.el.style.transform = `translateZ(${z.toFixed(1)}px) rotateY(${ry.toFixed(1)}deg) rotateX(${rx.toFixed(1)}deg)`;
        });
      }
      raf = requestAnimationFrame(loop);
    };
    const tick = () => { if (!raf) raf = requestAnimationFrame(loop); };
    new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) tick(); }).observe(el);
    document.addEventListener("visibilitychange", tick);
    tick();
  };
})();
