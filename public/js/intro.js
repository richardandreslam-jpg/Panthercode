/* =========================================================
   INTRO "LA PANTERA DE LUZ"
   1. Polvo de partículas verdes flotando + contador técnico
   2. Las partículas se ensamblan en la pantera (muestreada de assets/pantera.png)
   3. El cursor/dedo aparta las partículas; vuelven a su sitio
   4. PANTHERCODE se descifra y el botón ENTRAR se carga
   5. Al entrar: las partículas salen disparadas hacia el visitante (warp) y se revela el sitio
   Devuelve una promesa que se cumple al revelarse el sitio.
   ========================================================= */
(() => {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

  window.initIntro = ({ image = "assets/pantera.png", always = false } = {}) => new Promise((resolve) => {
    const root = document.getElementById("intro");
    if (!root) { resolve(); return; }
    // Solo la primera vez por visita (salvo ?intro o always)
    let seen = false;
    try { seen = sessionStorage.getItem("pc-intro") === "1"; sessionStorage.setItem("pc-intro", "1"); } catch { /* sin almacenamiento */ }
    if (!always && seen && !new URLSearchParams(location.search).has("intro")) { root.remove(); resolve(); return; }

    document.documentElement.classList.add("is-intro", "pantera-wait");
    const canvas = root.querySelector(".intro__canvas");
    const ctx = canvas.getContext("2d");
    const counter = root.querySelector(".intro__count");
    const brand = root.querySelector(".intro__brand");
    const enterBtn = root.querySelector(".intro__enter");
    const ring = root.querySelector(".intro__ring-fg");
    const hint = root.querySelector(".intro__hint");
    const skip = root.querySelector(".intro__skip");

    let W = 0, H = 0, dpr = 1;
    let particles = [];
    let phase = "dust";            // dust → form → ready → travel
    let start = performance.now();
    let formStart = 0, warpStart = 0;
    let mx = -9999, my = -9999;
    let ready = false, done = false;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth; H = window.innerHeight;
      canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      layoutTargets();
    };

    /* ---------- Muestreo de la imagen: cada partícula sabe dónde va y qué tan brillante es ---------- */
    let samples = [];
    const EYES = [[181, 140, 13], [302, 140, 11]];   // ojos en coordenadas de la imagen (x, y, radio)
    const loadSamples = () => new Promise((ok) => {
      const img = new Image();
      img.onload = () => {
        const S = 360;
        const c = document.createElement("canvas");
        c.width = c.height = S;
        const g = c.getContext("2d");
        g.drawImage(img, 0, 0, S, S);
        const d = g.getImageData(0, 0, S, S).data;
        const step = W < 700 ? 4 : 3;
        for (let y = 0; y < S; y += step) {
          for (let x = 0; x < S; x += step) {
            const i = (y * S + x) * 4;
            const a = d[i + 3] / 255;
            if (a < 0.4) continue;
            const lum = (d[i] * 0.3 + d[i + 1] * 0.59 + d[i + 2] * 0.11) / 255;
            // Desvanece los bordes de la foto (igual que en el hero)
            const ex = (x / S - 0.62) / 0.62, ey = (y / S - 0.44) / 0.64;
            const edge = Math.max(0, 1 - Math.max(0, Math.hypot(ex, ey) - 0.62) / 0.38);
            if (edge <= 0.02) continue;
            const eye = EYES.some(([ex2, ey2, r]) => Math.hypot(x - ex2, y - ey2) < r);
            // Las zonas oscuras casi no se ven; los brillos del pelaje sí
            if (!eye && lum < 0.09 && Math.random() > 0.35) continue;
            samples.push({ sx: x / S, sy: y / S, lum, eye, edge });
          }
        }
        ok();
      };
      img.onerror = () => ok();
      img.src = image;
    });

    const layoutTargets = () => {
      const size = Math.min(W * 0.86, H * 0.62, 560);
      introSize = size;
      const ox = W / 2 - size * 0.58, oy = H * 0.43 - size * 0.46;
      particles.forEach((p) => {
        if (!p.s) return;
        p.tx = ox + p.s.sx * size;
        p.ty = oy + p.s.sy * size;
      });
    };

    const build = () => {
      particles = samples.map((s) => ({
        s, x: Math.random() * W, y: Math.random() * H, vx: 0, vy: 0, tx: 0, ty: 0,
        delay: Math.random() * 0.9, size: s.eye ? 1.9 : 0.8 + s.lum * 1.4, seed: Math.random() * 6.28,
      }));
      // Polvo extra que no forma parte de la pantera (ambiente)
      for (let k = 0; k < 220; k++) particles.push({ s: null, x: Math.random() * W, y: Math.random() * H, vx: 0, vy: 0, size: 0.6 + Math.random() * 1.2, seed: Math.random() * 6.28, delay: 0 });
      layoutTargets();
    };

    /* ---------- Interacción ---------- */
    const onMove = (e) => { mx = e.clientX; my = e.clientY; };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onMove, { passive: true });
    window.addEventListener("pointerleave", () => { mx = my = -9999; });

    const scramble = (el, word, from, to, t) => {
      const G = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#%&/<>_01";
      const p = Math.max(0, Math.min(1, (t - from) / (to - from)));
      const n = Math.floor(p * word.length);
      el.textContent = p === 0 ? "" : [...word].map((ch, i) => (i < n ? ch : G[Math.floor(Math.random() * G.length)])).join("");
    };

    /* ---------- Transición: la pantera de luz viaja a su lugar en el inicio ----------
       El fondo se desvanece, las partículas vuelan y se encogen hasta la pantera del hero,
       la pantera 3D se materializa debajo y el resto de la página aparece en cascada. */
    let heroScale = 1;
    let introSize = 1;
    const TRAVEL = 1.25, LAND_FADE = 0.8;
    const html = document.documentElement;
    const enter = () => {
      if (phase === "travel" || done) return;
      phase = "travel";
      warpStart = performance.now();
      root.classList.add("is-travel");
      window.scrollTo(0, 0);
      // La página aparece en cascada mientras la pantera viaja
      html.classList.add("intro-cascade");
      html.classList.remove("is-intro");
      const hero = document.getElementById("pantera");
      const r = hero ? hero.getBoundingClientRect() : { left: W * 0.6, top: H * 0.2, width: W * 0.3, height: W * 0.3 };
      heroScale = r.width / introSize;
      particles.forEach((p) => {
        p.ox = p.x; p.oy = p.y;
        if (p.s) { p.hx = r.left + p.s.sx * r.width; p.hy = r.top + p.s.sy * r.height; }
      });
      setTimeout(resolve, 450);                                   // PANTHERCODE 3D entra volando
      setTimeout(() => html.classList.remove("pantera-wait"), TRAVEL * 1000 - 150);   // la pantera real aparece al aterrizar
      setTimeout(() => {
        done = true;
        root.remove();
        html.classList.remove("intro-cascade");
      }, (TRAVEL + LAND_FADE) * 1000 + 150);
    };
    enterBtn.addEventListener("click", () => { if (ready) enter(); });
    skip.addEventListener("click", enter);
    window.addEventListener("keydown", (e) => { if ((e.key === "Enter" || e.key === " ") && ready && !done) { e.preventDefault(); enter(); } });

    /* ---------- Bucle ---------- */
    const ease = (x) => 1 - Math.pow(1 - Math.max(0, Math.min(1, x)), 3);
    const loop = (now) => {
      if (done) return;
      const t = (now - start) / 1000;
      ctx.clearRect(0, 0, W, H);

      // Contador técnico 000 → 100 mientras se forma
      const pct = Math.min(100, Math.floor(ease((t - 0.2) / 3.4) * 100));
      counter.textContent = String(pct).padStart(3, "0");
      if (phase === "dust" && t > 0.9) { phase = "form"; formStart = now; root.classList.add("is-form"); }
      if (phase === "form" && t > 3.9) { phase = "ready"; root.classList.add("is-ready"); }
      scramble(brand.querySelector("span"), "PANTHER", 3.0, 3.7, t);
      scramble(brand.querySelector("b"), "CODE", 3.5, 4.0, t);
      // El botón se "carga" y queda listo
      const ringP = Math.max(0, Math.min(1, (t - 3.9) / 1.2));
      ring.style.strokeDashoffset = String(1 - ringP);
      if (!ready && ringP >= 1) { ready = true; root.classList.add("is-enter-ready"); enterBtn.disabled = false; hint.textContent = "Mueve el cursor sobre la pantera · Presiona Entrar"; }

      const formT = phase === "dust" ? 0 : (now - formStart) / 1000;
      const travelT = phase === "travel" ? (now - warpStart) / 1000 : 0;

      for (const p of particles) {
        if (phase === "travel") {
          if (!p.s) {
            // El polvo de ambiente se apaga
            const a = Math.max(0, 0.3 - travelT * 0.5);
            if (a > 0) { ctx.fillStyle = `rgba(184,255,26,${a.toFixed(3)})`; ctx.fillRect(p.x, p.y, p.size, p.size); }
            continue;
          }
          // Viaje en arco hacia la pantera del inicio, con un leve escalonado
          const k = ease((travelT - p.delay * 0.25) / TRAVEL);
          const arc = Math.sin(k * Math.PI) * -60;
          p.x = p.ox + (p.hx - p.ox) * k;
          p.y = p.oy + (p.hy - p.oy) * k + arc;
          const fade = travelT > TRAVEL ? Math.max(0, 1 - (travelT - TRAVEL) / LAND_FADE) : 1;
          const size = p.size * (1 + (heroScale - 1) * k);
          if (p.s.eye) {
            ctx.fillStyle = `rgba(184,255,26,${(0.95 * fade).toFixed(3)})`;
            ctx.shadowColor = "#b8ff1a"; ctx.shadowBlur = 12 + k * 8;
            ctx.fillRect(p.x - 0.5, p.y - 0.5, size + 1, size + 1);
            ctx.shadowBlur = 0;
          } else {
            const g = Math.round(200 + p.s.lum * 55);
            const a = (0.18 + p.s.lum * 0.95) * p.s.edge * fade;
            ctx.fillStyle = `rgba(${g},${Math.min(255, g + 8)},${g},${a.toFixed(3)})`;
            ctx.fillRect(p.x, p.y, size, size);
          }
          continue;
        }
        if (!p.s || phase === "dust") {
          // Polvo: flota despacio
          p.x += Math.sin(t * 0.6 + p.seed) * 0.35;
          p.y -= 0.18 + (p.seed % 1) * 0.25;
          if (p.y < -5) { p.y = H + 5; p.x = Math.random() * W; }
          const a = p.s ? 0.35 : 0.25 + Math.sin(t * 2 + p.seed) * 0.15;
          ctx.fillStyle = `rgba(184,255,26,${a.toFixed(3)})`;
          ctx.fillRect(p.x, p.y, p.size, p.size);
          continue;
        }
        // Ensamblado: resorte hacia su lugar, con retraso individual
        const k = ease((formT - p.delay) / 1.6);
        const breathe = Math.sin(t * 1.6 + p.seed) * 0.6;
        let tx = p.tx + breathe, ty = p.ty + Math.cos(t * 1.3 + p.seed) * 0.6;
        // El cursor aparta las partículas
        const dx = p.x - mx, dy = p.y - my;
        const d2 = dx * dx + dy * dy;
        const R = 95;
        if (d2 < R * R && k > 0.6) {
          const d = Math.sqrt(d2) || 1;
          const f = (1 - d / R) * 38;
          tx += (dx / d) * f; ty += (dy / d) * f;
        }
        const pull = 0.04 + k * 0.14;
        p.vx = (p.vx + (tx - p.x) * pull) * 0.72;
        p.vy = (p.vy + (ty - p.y) * pull) * 0.72;
        if (k <= 0) { p.x += Math.sin(t * 0.6 + p.seed) * 0.35; p.y -= 0.2; }
        else { p.x += p.vx; p.y += p.vy; }
        if (p.s.eye) {
          const glow = 0.75 + Math.sin(t * 3 + p.seed) * 0.25;
          ctx.fillStyle = `rgba(184,255,26,${(glow * Math.max(0.3, k)).toFixed(3)})`;
          ctx.shadowColor = "#b8ff1a"; ctx.shadowBlur = 10;
          ctx.fillRect(p.x - 0.4, p.y - 0.4, p.size + 0.8, p.size + 0.8);
          ctx.shadowBlur = 0;
        } else {
          // Durante el viaje son verdes; al llegar toman el tono de la foto
          const g = Math.round(200 + p.s.lum * 55);
          const a = (0.18 + p.s.lum * 0.95) * p.s.edge;
          ctx.fillStyle = k < 0.95 ? `rgba(184,255,26,${(0.55 * (1 - k) + a * k).toFixed(3)})` : `rgba(${g},${Math.min(255, g + 8)},${g},${a.toFixed(3)})`;
          ctx.fillRect(p.x, p.y, p.size, p.size);
        }
      }
      requestAnimationFrame(loop);
    };

    resize();
    window.addEventListener("resize", resize);
    if (reduced.matches) {
      // Movimiento reducido: entrada breve y sin partículas en movimiento
      root.classList.add("is-form", "is-ready", "is-enter-ready");
      setTimeout(enter, 600);
      return;
    }
    loadSamples().then(() => { build(); start = performance.now(); requestAnimationFrame(loop); });
  });
})();
