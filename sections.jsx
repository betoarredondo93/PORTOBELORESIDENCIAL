// sections.jsx — Porto Belo Residencial sections
const { useState } = React;

/* ---------- Image placeholder ---------- */
function Placeholder({ label, className = "", style }) {
  return (
    <div className={"ph " + className} style={style}>
      <span>{label}</span>
    </div>
  );
}

/* ---------- Minimal line icons ---------- */
function Ico({ name, size = 30 }) {
  const c = { width: size, height: size, viewBox: "0 0 32 32", fill: "none",
    stroke: "currentColor", strokeWidth: 1.4, strokeLinecap: "round", strokeLinejoin: "round" };
  switch (name) {
    case "pool":
      return (<svg {...c}><path d="M3 21c2 0 2 1.5 4 1.5S11 21 13 21s2 1.5 4 1.5S21 21 23 21s2 1.5 4 1.5 2-1.5 2-1.5"/><path d="M3 26c2 0 2 1.5 4 1.5S11 26 13 26s2 1.5 4 1.5S21 26 23 26s2 1.5 4 1.5 2-1.5 2-1.5"/><path d="M10 17V7a3 3 0 0 1 6 0M16 17V8"/></svg>);
    case "garden":
      return (<svg {...c}><path d="M16 27V13"/><path d="M16 17c-1-4-5-5-8-4 0 4 4 6 8 4Z"/><path d="M16 14c1-4 5-5 8-4 0 4-4 6-8 4Z"/><path d="M7 27h18"/></svg>);
    case "pet":
      return (<svg {...c}><circle cx="11" cy="11" r="2"/><circle cx="21" cy="11" r="2"/><circle cx="7" cy="17" r="2"/><circle cx="25" cy="17" r="2"/><path d="M16 16c-3 0-6 2.5-6 5.5 0 2 1.6 3 3.4 2.2.9-.4 1.7-.6 2.6-.6s1.7.2 2.6.6c1.8.8 3.4-.2 3.4-2.2 0-3-3-5.5-6-5.5Z"/></svg>);
    case "elevator":
      return (<svg {...c}><rect x="7" y="5" width="18" height="22" rx="1"/><path d="M16 5v22"/><path d="M11 13l1.8-2.2L14.6 13M17.4 19l1.8 2.2L21 19"/></svg>);
    case "skybar":
      return (<svg {...c}><path d="M7 8h18l-9 9z"/><path d="M16 17v9M11 26h10"/><path d="M20 8l3-3"/></svg>);
    case "pin":
      return (<svg {...c}><path d="M16 28s9-7.5 9-15A9 9 0 0 0 7 13c0 7.5 9 15 9 15Z"/><circle cx="16" cy="13" r="3"/></svg>);
    default:
      return null;
  }
}

/* ---------- NAV ---------- */
function Nav({ S, lang, setLang, onCTA }) {
  const [open, setOpen] = useState(false);
  const items = [
    ["#modelos", S.nav.models],
    ["#video", S.nav.video],
    ["#amenidades", S.nav.amenities],
    ["#ubicacion", S.nav.location],
    ["#contacto", S.nav.contact],
  ];
  return (
    <header className="pb-nav" style={{ position: "sticky", top: 0, zIndex: 40, background: "color-mix(in srgb, var(--bg) 86%, transparent)", backdropFilter: "blur(10px)", borderBottom: "1px solid var(--line)", transition: "background .35s ease, border-color .35s ease" }}>
      <div className="wrap" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 76 }}>
        <a href="#top" style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
          <span style={{ fontFamily: "var(--font-head)", fontWeight: 600, fontSize: 21, letterSpacing: "0.18em" }}>PORTO BELO</span>
          <span className="pb-nav-sub" style={{ fontSize: 9, letterSpacing: "0.42em", color: "var(--accent-deep)", marginTop: 5, textTransform: "uppercase", fontWeight: 600 }}>Residencial · Tijuana</span>
        </a>
        <nav style={{ display: "flex", alignItems: "center", gap: 34 }} className="pb-navlinks">
          {items.map(([href, label]) => (
            <a key={href} href={href} style={{ fontSize: 13.5, fontWeight: 500, letterSpacing: "0.02em", color: "var(--ink-soft)" }} className="pb-navlink">{label}</a>
          ))}
        </nav>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div className="pb-lang" style={{ display: "flex", border: "1px solid var(--line)", borderRadius: 2, overflow: "hidden" }}>
            {["es", "en"].map((l) => (
              <button key={l} className="pb-langbtn" data-on={lang === l ? "1" : "0"} onClick={() => setLang(l)} style={{ fontSize: 11.5, fontWeight: 600, letterSpacing: "0.08em", padding: "7px 11px", textTransform: "uppercase", background: lang === l ? "var(--ink)" : "transparent", color: lang === l ? "var(--bg)" : "var(--ink-soft)", transition: "all .2s" }}>{l}</button>
            ))}
          </div>
          <button className="btn btn-dark" onClick={onCTA}>{S.nav.cta}</button>
        </div>
      </div>
      <style>{`
        @media (max-width: 1040px){ .pb-navlinks{ display:none !important; } }

        /* ── Nav sobre el tour virtual ─────────────────────────────
           TourVirtual pone la clase .tour-on en <html> mientras el
           video cubre la franja superior. Aquí el nav se vuelve
           transparente y su contenido pasa a crema para leerse sobre
           el video. Al salir de la sección recupera su fondo solo. */
        html.tour-on .pb-nav {
          background: transparent !important;
          border-bottom-color: transparent !important;
          backdrop-filter: none !important;
        }
        html.tour-on .pb-nav a,
        html.tour-on .pb-nav .pb-navlink { color: var(--bg) !important; }
        html.tour-on .pb-nav .pb-navlink { opacity:.82; }
        html.tour-on .pb-nav .pb-navlink:hover { opacity:1; }
        html.tour-on .pb-nav .pb-nav-sub { color: var(--accent) !important; }
        html.tour-on .pb-nav .pb-lang { border-color: color-mix(in srgb, var(--bg) 42%, transparent) !important; }
        html.tour-on .pb-nav .pb-langbtn[data-on="1"] { background: var(--bg) !important; color: var(--ink) !important; }
        html.tour-on .pb-nav .pb-langbtn[data-on="0"] { color: color-mix(in srgb, var(--bg) 72%, transparent) !important; }
        html.tour-on .pb-nav .btn-dark { background: var(--bg) !important; color: var(--ink) !important; }
        html.tour-on .pb-nav .btn-dark:hover { background:#fff !important; }
      `}</style>
    </header>
  );
}

/* ---------- HERO FORM ---------- */
function HeroForm({ S, compact }) {
  const [f, setF] = useState({ nombre: "", whatsapp: "", correo: "" });
  const [done, setDone] = useState(false);
  const upd = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const submit = (e) => { e.preventDefault(); if (f.nombre && f.whatsapp && f.correo) setDone(true); };
  if (done) {
    return (
      <div style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 3, padding: "34px 30px", textAlign: "center" }}>
        <div style={{ width: 46, height: 46, borderRadius: "50%", background: "var(--accent)", display: "grid", placeItems: "center", margin: "0 auto 16px" }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
        </div>
        <h3 style={{ fontSize: 22, marginBottom: 8 }}>{S.form.thanksTitle}</h3>
        <p style={{ color: "var(--ink-soft)", fontSize: 14.5, lineHeight: 1.5 }}>{S.form.thanksBody}</p>
      </div>
    );
  }
  return (
    <form onSubmit={submit} style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 3, padding: compact ? "24px" : "28px 30px", boxShadow: "0 24px 60px -38px rgba(40,34,20,.5)" }}>
      <div style={{ marginBottom: 18 }}>
        <div className="eyebrow" style={{ marginBottom: 6 }}>{S.form.eyebrow}</div>
        <p style={{ fontSize: 14, color: "var(--ink-soft)", lineHeight: 1.5 }}>{S.form.lead}</p>
      </div>
      <div style={{ display: "grid", gap: 14 }}>
        <div className="field"><label>{S.form.name}</label><input value={f.nombre} onChange={upd("nombre")} placeholder={S.form.namePh} required /></div>
        <div className="field"><label>WhatsApp</label><input value={f.whatsapp} onChange={upd("whatsapp")} placeholder="+52 664 000 0000" inputMode="tel" required /></div>
        <div className="field"><label>{S.form.email}</label><input value={f.correo} onChange={upd("correo")} placeholder="tu@correo.com" type="email" required /></div>
      </div>
      <button type="submit" className="btn btn-dark btn-full" style={{ marginTop: 18 }}>{S.form.submit}</button>
      <p style={{ fontSize: 11, color: "var(--accent-deep)", marginTop: 12, textAlign: "center", lineHeight: 1.4 }}>{S.form.privacy}</p>
    </form>
  );
}

/* ---------- HERO ---------- */
const HERO_IMAGES = [
  "images/render-fachada.jpg",
  "images/interior-familia.jpg",
  "images/interior-sala.jpg",
  "images/interior-cocina.jpg",
];

function Carousel({ images, height, objectPosition }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = images.length;
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI((p) => (p + 1) % n), 4800);
    return () => clearInterval(t);
  }, [n, paused]);
  const go = (d) => setI((p) => (p + d + n) % n);
  const arrow = (side) => ({
    position: "absolute", top: "50%", [side]: 14, transform: "translateY(-50%)",
    width: 42, height: 42, borderRadius: "50%", background: "rgba(26,26,26,.42)", color: "#fff",
    fontSize: 22, lineHeight: 1, display: "grid", placeItems: "center", backdropFilter: "blur(4px)",
    zIndex: 3, transition: "background .2s",
  });
  return (
    <div className="pb-carousel" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}
      style={{ position: "relative", height, borderRadius: 3, overflow: "hidden", boxShadow: "0 30px 60px -36px rgba(40,34,20,.5)" }}>
      {images.map((src, idx) => (
        <img key={idx} src={src} alt={"Render Porto Belo Residencial " + (idx + 1)} loading={idx === 0 ? "eager" : "lazy"}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: objectPosition || "center", opacity: idx === i ? 1 : 0, transition: "opacity .9s ease" }} />
      ))}
      <button onClick={() => go(-1)} aria-label="Anterior" className="pb-caro-arrow" style={arrow("left")}>‹</button>
      <button onClick={() => go(1)} aria-label="Siguiente" className="pb-caro-arrow" style={arrow("right")}>›</button>
      <div style={{ position: "absolute", bottom: 16, left: 0, right: 0, display: "flex", gap: 8, justifyContent: "center", zIndex: 3 }}>
        {images.map((_, idx) => (
          <button key={idx} onClick={() => setI(idx)} aria-label={"Imagen " + (idx + 1)}
            style={{ width: idx === i ? 22 : 8, height: 8, borderRadius: 99, background: idx === i ? "#fff" : "rgba(255,255,255,.55)", border: "none", padding: 0, cursor: "pointer", transition: "all .3s" }} />
        ))}
      </div>
    </div>
  );
}

function Hero({ S, tw, onCTA, onModels }) {
  const headline = (
    <h1 style={{ fontSize: "clamp(40px, 6vw, 78px)", letterSpacing: "-0.01em" }}>
      {S.hero.l1}<br /><em style={{ fontStyle: "italic", color: "var(--accent-deep)" }}>{S.hero.l2}</em>
    </h1>
  );
  const sub = <p style={{ fontSize: 17, lineHeight: 1.6, color: "var(--ink-soft)", maxWidth: 440, marginTop: 22 }}>{S.hero.sub}</p>;

  if (tw.hero === "bg") {
    return (
      <section id="top" style={{ position: "relative", minHeight: 680, display: "flex", alignItems: "center", overflow: "hidden" }}>
        <Placeholder label="RENDER FACHADA — full bleed (sube tu imagen)" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", alignItems: "flex-end", justifyContent: "flex-end", backgroundImage: "none" }} />
        <img src="images/render-fachada.jpg" alt="Render fachada Porto Belo Residencial" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(245,240,232,.94) 0%, rgba(245,240,232,.78) 42%, rgba(245,240,232,.12) 100%)" }} />
        <div className="wrap pb-hero-grid" style={{ position: "relative", display: "grid", gridTemplateColumns: "1.1fr .9fr", gap: 50, alignItems: "center", width: "100%" }}>
          <div className="reveal">
            <div className="eyebrow" style={{ marginBottom: 18 }}>{S.hero.eyebrow}</div>
            {headline}{sub}
          </div>
          <div className="reveal pb-heroform"><HeroForm S={S} compact /></div>
        </div>
      </section>
    );
  }

  if (tw.hero === "center") {
    return (
      <section id="top" style={{ paddingTop: 70, textAlign: "center" }}>
        <div className="wrap reveal" style={{ maxWidth: 880 }}>
          <div className="eyebrow" style={{ marginBottom: 20 }}>{S.hero.eyebrow}</div>
          <h1 style={{ fontSize: "clamp(42px, 6.6vw, 86px)", letterSpacing: "-0.01em" }}>{S.hero.l1} <em style={{ fontStyle: "italic", color: "var(--accent-deep)" }}>{S.hero.l2}</em></h1>
          <p style={{ fontSize: 18, lineHeight: 1.6, color: "var(--ink-soft)", maxWidth: 560, margin: "22px auto 0" }}>{S.hero.sub}</p>
        </div>
        <div className="wrap pb-hero-grid" style={{ display: "grid", gridTemplateColumns: "1.4fr .9fr", gap: 36, alignItems: "end", marginTop: 56 }}>
          <div className="reveal"><Carousel images={HERO_IMAGES} height={460} objectPosition="center" /></div>
          <div className="reveal pb-heroform" style={{ textAlign: "left" }}><HeroForm S={S} compact /></div>
        </div>
      </section>
    );
  }

  // default: render right
  return (
    <section id="top" style={{ paddingTop: 64, paddingBottom: 20 }}>
      <div className="wrap pb-hero-grid" style={{ display: "grid", gridTemplateColumns: "1fr .9fr", gap: 60, alignItems: "center" }}>
        <div className="reveal">
          <div className="eyebrow" style={{ marginBottom: 20 }}>{S.hero.eyebrow}</div>
          {headline}{sub}
          <div style={{ marginTop: 36, display: "flex", gap: 14, flexWrap: "wrap" }}>
            <button className="btn btn-dark" onClick={onCTA}>{S.hero.ctaPrimary}</button>
            <button className="btn btn-outline" onClick={onModels}>{S.hero.ctaSecondary}</button>
          </div>
        </div>
        <div className="reveal pb-hero-img" style={{ position: "relative" }}>
          <div style={{ position: "absolute", top: -22, right: -22, bottom: 40, left: 40, background: "var(--accent)", borderRadius: 3, zIndex: 0 }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <Carousel images={HERO_IMAGES} height={600} objectPosition="42% center" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   TOUR VIRTUAL — recorrido controlado por scroll
   ───────────────────────────────────────────────────────────────
   Cómo funciona:
   · La sección mide TOUR_SCROLL_VH de alto y adentro lleva un
     "escenario" sticky de 100vh con un solo <video> a pantalla completa.
   · El scroll NO reproduce el video: mueve su currentTime (scrub).
   · Los 11 clips se tratan como UNA sola línea de tiempo continua
     (76 s en total). El scroll se reparte proporcional a la duración
     de cada clip, así la velocidad percibida es constante.
   · Cada clip se descarga como Blob y se reproduce desde un object URL:
     muchos hosts (GitHub Pages incluido) no sirven byte-range y sin
     esto el video se queda congelado en el frame 0.
   · Se precarga el clip siguiente mientras se ve el actual.
   · El scrub se aplica dentro de un requestAnimationFrame con
     suavizado, nunca directo en el evento de scroll.
   ═══════════════════════════════════════════════════════════════ */

/* Alto total de la sección (vh). Más alto = recorrido más lento. */
const TOUR_SCROLL_VH = 1000;
/* Suavizado del scrub, 0-1. Más bajo = más inercia. */
const TOUR_EASE = 0.12;
/* Porción de cada clip usada para el fade de entrada/salida del texto. */
const TOUR_FADE = 0.18;
/* Segundos "virtuales" al final, para la tarjeta de cierre.
   No hay video nuevo aquí: el último clip se queda en su frame final. */
const TOUR_OUTRO = 5;

/* dur = duración real del archivo en segundos (medida con ffprobe).
   Si reemplazas un clip, actualiza su dur o el scrub se desfasa. */
const TOUR_CLIPS = [
  { key: "llegada",  src: "videos/01_llegada.mp4",  mob: null, dur: 8 },
  { key: "puente1",  src: "videos/02_puente1.mp4",  mob: null, dur: 6 },
  { key: "social",   src: "videos/03_social.mp4",   mob: null, dur: 10 },
  { key: "puente2",  src: "videos/04_puente2.mp4",  mob: null, dur: 6 },
  { key: "cocina",   src: "videos/05_cocina.mp4",   mob: null, dur: 8 },
  { key: "puente3",  src: "videos/06_puente3.mp4",  mob: null, dur: 6 },
  { key: "recamara", src: "videos/07_recamara.mp4", mob: null, dur: 6 },
  { key: "puente4",  src: "videos/08_puente4.mp4",  mob: null, dur: 6 },
  { key: "balcon",   src: "videos/09_balcon.mp4",   mob: null, dur: 6 },
  { key: "puente5",  src: "videos/10_puente5.mp4",  mob: null, dur: 6 },
  { key: "roof",     src: "videos/11_roof.mp4",     mob: null, dur: 8 },
];

/* ═══════════════════════════════════════════════════════════════
   ▼▼▼  FUENTE DE VIDEO SEGÚN DISPOSITIVO  ▼▼▼
   HOY: escritorio y móvil usan los MISMOS clips 16:9.

   CUANDO TENGAS LA CADENA VERTICAL 9:16:
   1. Súbela a videos/ y pon cada ruta en el campo `mob` de arriba,
      p. ej. mob: "videos/m01_llegada.mp4".
   2. Descomenta la línea marcada abajo.
   3. Si los clips verticales duran distinto, agrégales `durMob` y
      cámbialo también en tourDur().
   Nota: el corte se evalúa al montar. Cruzar el breakpoint
   redimensionando la ventana requiere recargar.
   ═══════════════════════════════════════════════════════════════ */
const TOUR_MOBILE_MAX = 760;
function tourIsMobile() {
  return typeof window !== "undefined" &&
    window.matchMedia("(max-width: " + TOUR_MOBILE_MAX + "px)").matches;
}
function tourSrc(clip) {
  // ▼▼▼ DESCOMENTA ESTA LÍNEA PARA ACTIVAR LOS VERTICALES ▼▼▼
  // if (tourIsMobile() && clip.mob) return clip.mob;
  // ▲▲▲ ▲▲▲
  return clip.src;
}
function tourDur(clip) {
  // if (tourIsMobile() && clip.mob && clip.durMob) return clip.durMob;
  return clip.dur;
}

const TOUR_TOTAL = TOUR_CLIPS.reduce((a, c) => a + c.dur, 0);
const TOUR_SPAN = TOUR_TOTAL + TOUR_OUTRO; // línea de tiempo completa, con cierre
const TOUR_STARTS = (() => {
  let acc = 0;
  return TOUR_CLIPS.map((c) => { const s = acc; acc += c.dur; return s; });
})();

/* Escenas que necesitan oscurecer el video de fondo. La capa se enciende
   y se apaga siguiendo la misma opacidad que el texto de la escena, así
   que aparece y desaparece con ella. Las demás escenas no se tocan. */
const TOUR_DIM = { balcon: true };

/* segundo global de la línea de tiempo -> [índice de clip, segundo dentro del clip] */
function tourLocate(t) {
  for (let i = TOUR_CLIPS.length - 1; i >= 0; i--) {
    if (t >= TOUR_STARTS[i]) return [i, t - TOUR_STARTS[i]];
  }
  return [0, 0];
}
const clamp01 = (n) => (n < 0 ? 0 : n > 1 ? 1 : n);

/* Opacidad + desplazamiento de un bloque de texto, escrito directo al DOM.
   Va por ref y no por estado: con estado React re-renderizaría 60 veces
   por segundo mientras se hace scroll. */
function setCapAlpha(el, a) {
  if (!el || el._a === a) return;
  el._a = a;
  el.style.opacity = a;
  el.style.transform = "translateY(" + ((1 - a) * 16).toFixed(2) + "px)";
  el.style.visibility = a > 0.001 ? "visible" : "hidden";
  // .is-in dispara las entradas escalonadas de adentro (ver .pb-poi)
  const on = a > 0.06;
  if (el._in !== on) { el._in = on; el.classList.toggle("is-in", on); }
}

function TourVirtual({ S, onModels }) {
  const T = (S && S.tour) || {};
  const caps = T.captions || {};
  const O = T.outro || {};

  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const videoRef = useRef(null);
  const barRef = useRef(null);
  const hintRef = useRef(null);
  const outroRef = useRef(null);
  const dimRef = useRef(null);
  const capRefs = useRef([]);

  const urls = useRef({});      // índice -> object URL ya descargado
  const pending = useRef({});   // índice -> promesa en vuelo
  const active = useRef(-1);    // índice actualmente montado en el <video>
  const smooth = useRef(0);     // segundo global suavizado
  const raf = useRef(0);
  const running = useRef(false);
  const unlocked = useRef(false);
  const navOn = useRef(false);  // ¿el video está tapando el nav?

  const [ready, setReady] = useState(false);
  const [error, setError] = useState(false);

  /* --- nav transparente mientras el tour cubre la pantalla --- */
  function setNav(on) {
    if (navOn.current === on) return;
    navOn.current = on;
    document.documentElement.classList.toggle("tour-on", on);
  }

  /* --- descarga del clip como Blob --- */
  function loadClip(i) {
    if (i < 0 || i >= TOUR_CLIPS.length) return Promise.resolve(null);
    if (urls.current[i]) return Promise.resolve(urls.current[i]);
    if (pending.current[i]) return pending.current[i];
    const p = fetch(tourSrc(TOUR_CLIPS[i]))
      .then((r) => { if (!r.ok) throw new Error("HTTP " + r.status); return r.blob(); })
      .then((b) => { const u = URL.createObjectURL(b); urls.current[i] = u; return u; })
      .catch(() => { pending.current[i] = null; if (i === 0) setError(true); return null; });
    pending.current[i] = p;
    return p;
  }

  /* --- monta un clip ya descargado en el <video> --- */
  function attach(i) {
    const v = videoRef.current, u = urls.current[i];
    if (!v || !u || active.current === i) return;
    active.current = i;
    v.src = u;
    try { v.load(); } catch (e) {}
  }

  /* --- iOS no permite seek en un video que nunca se tocó --- */
  function unlock() {
    if (unlocked.current) return;
    unlocked.current = true;
    const v = videoRef.current;
    if (!v) return;
    const pr = v.play();
    if (pr && pr.then) pr.then(() => v.pause()).catch(() => {});
    else { try { v.pause(); } catch (e) {} }
  }

  /* --- loop de scrub --- */
  function tick() {
    raf.current = requestAnimationFrame(tick);
    const sec = sectionRef.current, stage = stageRef.current, v = videoRef.current;
    if (!sec || !stage || !v) return;

    const rect = sec.getBoundingClientRect();
    const span = sec.offsetHeight - stage.offsetHeight;
    const p = span > 0 ? clamp01(-rect.top / span) : 0;

    // el nav se vuelve transparente mientras el video tapa la franja superior
    setNav(rect.top <= 0 && rect.bottom > 96);

    // suavizado sobre la línea de tiempo global (no se reinicia al cambiar de clip)
    const target = p * TOUR_SPAN;
    let st = smooth.current + (target - smooth.current) * TOUR_EASE;
    if (Math.abs(target - st) < 0.005) st = target;
    smooth.current = st;

    // el tramo final (TOUR_OUTRO) no tiene video: se queda en el último frame
    const vt = Math.min(st, TOUR_TOTAL);
    const loc = tourLocate(vt), i = loc[0], localSec = loc[1];

    if (barRef.current) barRef.current.style.transform = "scaleX(" + p.toFixed(4) + ")";
    if (hintRef.current) {
      const ha = clamp01(1 - p * 26);
      if (hintRef.current._a !== ha) { hintRef.current._a = ha; hintRef.current.style.opacity = ha; }
    }

    // textos: fade in / out según la posición dentro del clip visible
    let dimA = 0;
    for (let k = 0; k < TOUR_CLIPS.length; k++) {
      const el = capRefs.current[k];
      if (!el) continue;
      let a = 0;
      if (k === i && st <= TOUR_TOTAL) {
        const u = clamp01(localSec / TOUR_CLIPS[k].dur);
        a = clamp01(Math.min(u / TOUR_FADE, (1 - u) / TOUR_FADE, 1));
        if (TOUR_DIM[TOUR_CLIPS[k].key]) dimA = a;
      }
      setCapAlpha(el, a);
    }

    // capa oscura de la escena que la pida, atada a la opacidad de su texto
    const dimEl = dimRef.current;
    if (dimEl && dimEl._a !== dimA) {
      dimEl._a = dimA;
      dimEl.style.opacity = dimA;
      dimEl.style.visibility = dimA > 0.001 ? "visible" : "hidden";
    }

    // tarjeta de cierre: entra en el tramo virtual del final
    if (outroRef.current) {
      const oa = st > TOUR_TOTAL ? clamp01((st - TOUR_TOTAL) / (TOUR_OUTRO * 0.4)) : 0;
      setCapAlpha(outroRef.current, oa);
    }

    // actual + siguiente
    if (!urls.current[i] && !pending.current[i]) loadClip(i);
    if (!urls.current[i + 1] && !pending.current[i + 1]) loadClip(i + 1);
    if (urls.current[i]) attach(i);

    const cur = active.current;
    if (cur < 0 || v.readyState < 1) return;
    const dur = (idx) => (isFinite(v.duration) && v.duration > 0 ? v.duration : tourDur(TOUR_CLIPS[idx]));

    if (cur === i) {
      const d = dur(i);
      const ct = Math.min((localSec / TOUR_CLIPS[i].dur) * d, Math.max(d - 0.05, 0));
      if (!v.seeking && Math.abs(v.currentTime - ct) > 0.02) v.currentTime = Math.max(ct, 0);
    } else if (cur < i) {
      // el siguiente clip aún no baja: congelamos el último frame del actual
      const end = Math.max(dur(cur) - 0.05, 0);
      if (!v.seeking && v.currentTime < end - 0.05) v.currentTime = end;
    }
  }

  useEffect(() => {
    const sec = sectionRef.current;
    if (!sec) return;
    const start = () => { if (running.current) return; running.current = true; raf.current = requestAnimationFrame(tick); };
    const stop = () => { running.current = false; cancelAnimationFrame(raf.current); setNav(false); };

    // el rAF solo corre mientras la sección está cerca del viewport
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { loadClip(0); loadClip(1); start(); }
        else stop();
      });
    }, { rootMargin: "600px 0px" });
    io.observe(sec);

    const onFirst = () => unlock();
    window.addEventListener("touchstart", onFirst, { once: true, passive: true });
    window.addEventListener("pointerdown", onFirst, { once: true, passive: true });

    return () => {
      io.disconnect();
      stop();
      window.removeEventListener("touchstart", onFirst);
      window.removeEventListener("pointerdown", onFirst);
      const v = videoRef.current;
      if (v) { try { v.removeAttribute("src"); v.load(); } catch (e) {} }
      Object.keys(urls.current).forEach((k) => { try { URL.revokeObjectURL(urls.current[k]); } catch (e) {} });
      urls.current = {};
      pending.current = {};
    };
  }, []);

  return (
    <section id="tour" ref={sectionRef} style={{ position: "relative", height: TOUR_SCROLL_VH + "vh", background: "var(--ink)" }}>
      <div ref={stageRef} className="pb-tour-stage" style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden", background: "var(--ink)" }}>
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          controls={false}
          disablePictureInPicture
          tabIndex={-1}
          aria-hidden="true"
          onLoadedData={() => { setReady(true); const v = videoRef.current; if (v) { try { v.pause(); } catch (e) {} } }}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: ready ? 1 : 0, transition: "opacity .7s ease", pointerEvents: "none" }}
        />

        {/* oscurecimiento de escena (solo las de TOUR_DIM) */}
        <div ref={dimRef} className="pb-tour-dim" style={{ opacity: 0, visibility: "hidden" }} />

        {/* scrim superior: legibilidad del nav sobre el video */}
        <div className="pb-tour-scrim-top" />
        {/* degradado inferior: sube desde el borde hasta el 65% de la altura */}
        <div className="pb-tour-scrim" />

        {/* textos anclados por clip */}
        <div className="pb-tour-caps">
          {TOUR_CLIPS.map((c, k) => {
            const cap = caps[c.key] || {};
            if (!cap.t && !cap.d) return null;
            const cards = cap.cards || [];
            const tags = cards.length ? [] : (cap.tags || []).slice(0, 3);
            const cls = "pb-tour-cap" + (cap.layout === "center" ? " pb-tour-cap--center" : "");
            return (
              <div key={c.key} ref={(el) => { capRefs.current[k] = el; }} className={cls} style={{ opacity: 0, visibility: "hidden" }}>
                {cap.eyebrow ? <div className="pb-tour-eyebrow">{cap.eyebrow}</div> : null}
                {cap.t ? <h2 className="pb-tour-title">{cap.t}</h2> : null}
                {cap.d ? <p className="pb-tour-text">{cap.d}</p> : null}
                {cards.length ? (
                  <div className="pb-tour-pois">
                    {cards.map((cd, n) => (
                      <div key={n} className="pb-poi">
                        <div className="pb-poi-time">{cd.time}</div>
                        <div className="pb-poi-name">{cd.name}</div>
                      </div>
                    ))}
                  </div>
                ) : null}
                {tags.length ? (
                  <div className="pb-tour-tags">
                    {tags.map((tg, n) => <span key={n}>{tg}</span>)}
                  </div>
                ) : null}
              </div>
            );
          })}

          {/* cierre del recorrido */}
          {O.t ? (
            <div ref={outroRef} className="pb-tour-cap pb-tour-outro" style={{ opacity: 0, visibility: "hidden" }}>
              <h2 className="pb-tour-title">{O.t}</h2>
              {O.d ? <p className="pb-tour-text">{O.d}</p> : null}
              {O.extra ? <p className="pb-tour-extra">{O.extra}</p> : null}
              {O.cta ? (
                <a href="#modelos" className="btn pb-tour-btn"
                  onClick={(e) => { if (onModels) { e.preventDefault(); onModels(); } }}>{O.cta}</a>
              ) : null}
            </div>
          ) : null}
        </div>

        {/* estado de carga */}
        {!ready && !error ? (
          <div className="pb-tour-msg">{T.loading}</div>
        ) : null}
        {error ? <div className="pb-tour-msg">{T.error}</div> : null}

        {/* aviso de scroll, se desvanece al empezar */}
        {T.hint ? (
          <div ref={hintRef} className="pb-tour-hint">
            <span>{T.hint}</span>
            <svg width="14" height="20" viewBox="0 0 14 20" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"><path d="M7 4v9M3.5 9.5 7 13l3.5-3.5"/></svg>
          </div>
        ) : null}

        {/* progreso del recorrido */}
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 2, background: "rgba(255,255,255,.14)" }}>
          <div ref={barRef} style={{ height: "100%", background: "var(--accent)", transformOrigin: "0 50%", transform: "scaleX(0)" }} />
        </div>
      </div>

      <style>{`
        /* ── degradados de contraste ───────────────────────────── */
        .pb-tour-scrim {
          position:absolute; inset:0; pointer-events:none;
          background: linear-gradient(to top,
            color-mix(in srgb, var(--ink) 88%, transparent) 0%,
            color-mix(in srgb, var(--ink) 79%, transparent) 9%,
            color-mix(in srgb, var(--ink) 66%, transparent) 19%,
            color-mix(in srgb, var(--ink) 51%, transparent) 29%,
            color-mix(in srgb, var(--ink) 36%, transparent) 39%,
            color-mix(in srgb, var(--ink) 23%, transparent) 47%,
            color-mix(in srgb, var(--ink) 12%, transparent) 54%,
            color-mix(in srgb, var(--ink) 5%, transparent) 60%,
            color-mix(in srgb, var(--ink) 1%, transparent) 63%,
            transparent 65%);
        }
        /* Oscurecimiento de escena. Dos capas en un solo elemento:
           el color plano cubre la pantalla completa y el radial refuerza
           la zona central, donde caen el titular y las cajas.
           Compuestas dan ~0.55 en los bordes y ~0.74 en el centro. */
        .pb-tour-dim {
          position:absolute; inset:0; pointer-events:none;
          background:
            radial-gradient(ellipse 92% 66% at 50% 50%,
              rgba(0,0,0,.42) 0%,
              rgba(0,0,0,.32) 42%,
              rgba(0,0,0,.14) 68%,
              rgba(0,0,0,0) 85%),
            rgba(0,0,0,.55);
        }
        .pb-tour-scrim-top {
          position:absolute; left:0; right:0; top:0; height:22%; pointer-events:none;
          background: linear-gradient(to bottom,
            color-mix(in srgb, var(--ink) 42%, transparent) 0%,
            color-mix(in srgb, var(--ink) 22%, transparent) 40%,
            color-mix(in srgb, var(--ink) 7%, transparent) 72%,
            transparent 100%);
        }

        /* ── bloque de texto: mitad inferior izquierda ─────────── */
        .pb-tour-caps { position:absolute; inset:0; pointer-events:none; }
        .pb-tour-cap {
          position:absolute; left:0; right:0; bottom:10vh;
          max-width:1240px; margin:0 auto; padding:0 40px;
          will-change: opacity, transform;
        }
        .pb-tour-eyebrow {
          font-family: var(--font-body), sans-serif;
          font-size:12px; font-weight:600; letter-spacing:.28em; text-transform:uppercase;
          color: var(--accent); margin-bottom:20px;
          text-shadow: 0 1px 14px color-mix(in srgb, var(--ink) 70%, transparent);
        }
        .pb-tour-title {
          font-family: 'Playfair Display', var(--font-head), Georgia, serif;
          font-weight:400;
          font-size: clamp(3.5rem, 11vw, 9rem);
          line-height:.95; letter-spacing:-.03em;
          color: var(--bg); margin:0; max-width:13ch;
          text-shadow: 0 2px 30px color-mix(in srgb, var(--ink) 55%, transparent);
        }
        .pb-tour-text {
          font-family: var(--font-body), sans-serif;
          font-size: clamp(1rem, 1.6vw, 1.25rem);
          line-height:1.6; color: var(--bg); opacity:.88;
          max-width:480px; margin-top:24px;
          text-shadow: 0 1px 16px color-mix(in srgb, var(--ink) 75%, transparent);
        }
        .pb-tour-tags {
          display:flex; flex-wrap:wrap; align-items:center; margin-top:26px;
          font-family: var(--font-body), sans-serif;
          font-size:11px; font-weight:600; letter-spacing:.14em; text-transform:uppercase;
          color: var(--bg); opacity:.74;
          text-shadow: 0 1px 12px color-mix(in srgb, var(--ink) 75%, transparent);
        }
        .pb-tour-tags span + span::before { content:"·"; margin:0 11px; opacity:.55; }

        /* ── escena con layout centrado (09_balcon) ────────────────
           El titular y el texto suben al centro de la pantalla en vez
           de ir en la esquina inferior izquierda. */
        .pb-tour-cap--center {
          top:0; bottom:0; display:flex; flex-direction:column;
          align-items:center; justify-content:center; text-align:center;
        }
        .pb-tour-cap--center .pb-tour-title {
          /* más contenido que las otras escenas: titular, texto y tres
             cajas altas. A 9rem no cabría en una laptop. */
          font-size: clamp(2.5rem, 7vw, 5.5rem);
          max-width:16ch;
        }
        .pb-tour-cap--center .pb-tour-text { margin-left:auto; margin-right:auto; max-width:560px; }

        /* ── refuerzo de contraste de la escena centrada ───────────
           Va todo bajo --center: las demás escenas conservan sus
           sombras suaves originales. */
        .pb-tour-cap--center .pb-tour-eyebrow {
          color: var(--accent); opacity:1;
          text-shadow: 0 2px 10px rgba(0,0,0,.95), 0 0 28px rgba(0,0,0,.75);
        }
        .pb-tour-cap--center .pb-tour-title {
          text-shadow: 0 3px 18px rgba(0,0,0,.9), 0 0 44px rgba(0,0,0,.65);
        }
        .pb-tour-cap--center .pb-tour-text {
          opacity:.96;
          text-shadow: 0 2px 12px rgba(0,0,0,.95), 0 0 30px rgba(0,0,0,.65);
        }

        /* ── cajas de distancias ───────────────────────────────────── */
        .pb-tour-pois {
          display:flex; justify-content:center; align-items:stretch;
          gap:22px; margin-top:46px; width:100%;
        }
        .pb-poi {
          flex:1 1 0; min-width:0; max-width:320px;
          display:flex; flex-direction:column; justify-content:center;
          padding:46px 28px 38px; border-radius:4px;
          /* negro sólido, no color-mix sobre --ink: las cajas tienen que
             tapar el video, no dejarlo ver a través */
          background: rgba(0,0,0,.6);
          backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
          border:1px solid color-mix(in srgb, var(--accent) 30%, transparent);
          /* entrada escalonada: la dispara .is-in en el bloque padre */
          opacity:0; transform: translateY(20px);
          transition: opacity .55s ease, transform .55s cubic-bezier(.2,.7,.2,1);
        }
        .pb-tour-cap.is-in .pb-poi { opacity:1; transform:none; }
        .pb-tour-cap.is-in .pb-poi:nth-child(2) { transition-delay:.15s; }
        .pb-tour-cap.is-in .pb-poi:nth-child(3) { transition-delay:.3s; }
        /* al salir se van juntas, sin escalonar */
        .pb-tour-cap:not(.is-in) .pb-poi { transition-delay:0s; }
        .pb-poi-time {
          font-family:'Playfair Display', var(--font-head), Georgia, serif;
          font-weight:400; font-size: clamp(2.5rem, 6vw, 4.5rem);
          line-height:1; letter-spacing:-.02em; color: var(--bg);
          text-shadow: 0 2px 16px rgba(0,0,0,.85);
        }
        .pb-poi-name {
          font-family: var(--font-body), sans-serif;
          font-size:13px; font-weight:600; letter-spacing:.2em; text-transform:uppercase;
          color: var(--accent); line-height:1.45; margin-top:18px;
          text-shadow: 0 1px 10px rgba(0,0,0,.9);
        }
        @media (prefers-reduced-motion: reduce) {
          .pb-poi { transition:none; transition-delay:0s !important; }
        }

        /* ── cierre ────────────────────────────────────────────── */
        .pb-tour-outro .pb-tour-text { opacity:.94; margin-top:20px; }
        .pb-tour-extra {
          font-family: var(--font-body), sans-serif;
          font-size:13.5px; line-height:1.55; color: var(--bg); opacity:.66;
          max-width:420px; margin-top:14px;
          text-shadow: 0 1px 12px color-mix(in srgb, var(--ink) 75%, transparent);
        }
        .pb-tour-btn {
          pointer-events:auto; margin-top:28px;
          background: var(--bg); color: var(--ink);
        }
        .pb-tour-btn:hover { background:#fff; transform: translateY(-1px); }

        /* ── viewports bajos: el titular no debe comerse la pantalla ── */
        @media (max-height: 860px) and (min-width: 761px) {
          .pb-tour-title { font-size: clamp(2.8rem, 7vw, 5rem); }
          .pb-tour-cap { bottom:8vh; }
        }

        .pb-tour-msg {
          position:absolute; inset:0; display:grid; place-items:center;
          font-family: var(--font-body), sans-serif; font-size:11.5px; font-weight:600;
          letter-spacing:.22em; text-transform:uppercase; color:rgba(245,240,232,.62);
          text-align:center; padding:0 24px; pointer-events:none;
        }
        .pb-tour-hint {
          position:absolute; left:0; right:0; bottom:34px; display:flex; gap:9px;
          align-items:center; justify-content:center; pointer-events:none;
          font-family: var(--font-body), sans-serif; font-size:11px; font-weight:600;
          letter-spacing:.2em; text-transform:uppercase; color:rgba(245,240,232,.66);
        }
        @media (max-width: 900px){ .pb-tour-cap{ padding:0 22px; bottom:12vh; } }

        /* ── móvil: mismos videos 16:9, tipografía reescalada ──────
           El clamp de escritorio (3.5rem mínimo) desborda en pantallas
           angostas: un titular de 38 caracteres se comía la pantalla
           completa. Aquí baja a un rango que deja respirar al texto
           y a las etiquetas. */
        @media (max-width: 760px){
          .pb-tour-eyebrow { font-size:10.5px; letter-spacing:.24em; margin-bottom:14px; }
          .pb-tour-title {
            font-size: clamp(2.1rem, 9.5vw, 3.2rem);
            line-height:1.0; letter-spacing:-.02em; max-width:100%;
          }
          .pb-tour-text { font-size:15px; margin-top:16px; max-width:100%; }
          .pb-tour-tags { font-size:10px; letter-spacing:.12em; margin-top:18px; }
          .pb-tour-tags span + span::before { margin:0 8px; }
          .pb-tour-extra { font-size:12.5px; margin-top:12px; }
          .pb-tour-btn { margin-top:22px; }

          /* Escena centrada: las tres cajas se apilan en columna.
             Hay que comprimirlas o entre titular, texto y cajas se
             desborda la pantalla del celular. */
          .pb-tour-cap--center .pb-tour-title { font-size: clamp(1.9rem, 8.4vw, 2.6rem); max-width:100%; }
          .pb-tour-cap--center .pb-tour-text { font-size:14px; margin-top:12px; }
          .pb-tour-pois { flex-direction:column; gap:10px; margin-top:26px; }
          .pb-poi { max-width:none; padding:16px 20px; border-radius:3px; }
          .pb-poi-time { font-size:2rem; }
          .pb-poi-name { font-size:10.5px; letter-spacing:.16em; margin-top:8px; }
        }
        /* pantallas cortas: aprieta un poco más la escena centrada */
        @media (max-width: 760px) and (max-height: 680px) {
          .pb-poi { padding:12px 18px; }
          .pb-poi-time { font-size:1.6rem; }
          .pb-tour-cap--center .pb-tour-text { display:none; }
        }
        @media (max-width: 400px){
          .pb-tour-title { font-size: clamp(1.9rem, 8.6vw, 2.5rem); }
        }
      `}</style>
    </section>
  );
}

/* ---------- STATS ---------- */
function Stats({ S }) {
  return (
    <section style={{ background: "var(--ink)", color: "var(--bg)", marginTop: 70 }}>
      <div className="wrap pb-stats" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0 }}>
        {S.stats.map((s, i) => (
          <div key={i} className="reveal" style={{ padding: "44px 28px", borderLeft: i === 0 ? "none" : "1px solid rgba(255,255,255,.12)", textAlign: "center" }}>
            <div style={{ fontFamily: "var(--font-head)", fontSize: "clamp(34px,4vw,52px)", lineHeight: 1, color: "var(--accent)" }}>{s.n}</div>
            <div style={{ fontSize: 12.5, letterSpacing: "0.14em", textTransform: "uppercase", marginTop: 12, color: "rgba(245,240,232,.74)" }}>{s.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- MODELOS ---------- */
function Modelos({ S, contact }) {
  // Mensaje precargado de WhatsApp, distinto por modelo
  const waFor = (m) => "https://wa.me/" + contact.whatsapp + "?text=" + encodeURIComponent(
    (S.models.waModel || "").replace("{model}", m.name).replace("{area}", m.area)
  );
  return (
    <section id="modelos" style={{ padding: "110px 0 100px" }}>
      <div className="wrap">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 20, marginBottom: 52 }}>
          <div className="reveal">
            <div className="eyebrow" style={{ marginBottom: 14 }}>{S.models.eyebrow}</div>
            <h2 style={{ fontSize: "clamp(32px,4vw,50px)", maxWidth: 560 }}>{S.models.title}</h2>
          </div>
          <p className="reveal" style={{ fontSize: 15, color: "var(--ink-soft)", maxWidth: 320, lineHeight: 1.6 }}>{S.models.lead}</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 26 }} className="pb-modelgrid">
          {S.models.items.map((m, i) => {
            const sold = m.status === "sold";
            return (
            <article key={i} className="reveal pb-modelcard" style={{ display: "flex", background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 3, overflow: "hidden", transition: "transform .3s, box-shadow .3s" }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 30px 60px -40px rgba(40,34,20,.45)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "none"; }}>
              <div className="pb-modelimg" style={{ position: "relative", flex: "0 0 43%", background: "#FBF8F2", borderRight: "1px solid var(--line)" }}>
                <img src={m.img} alt={"Plano " + m.name} loading="lazy" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain", padding: 12, filter: sold ? "grayscale(.5) opacity(.7)" : "none" }} />
                <span style={{ position: "absolute", top: 12, left: 12, fontFamily: "var(--font-body)", fontSize: 10.5, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", padding: "5px 10px", borderRadius: 2, background: sold ? "rgba(26,26,26,.8)" : "var(--ink)", color: "var(--bg)" }}>{sold ? S.models.sold : S.models.avail}</span>
              </div>
              <div style={{ flex: 1, padding: "24px 24px 24px", display: "flex", flexDirection: "column", minWidth: 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 8 }}>
                  <h3 style={{ fontSize: 24, whiteSpace: "nowrap" }}>{m.name}</h3>
                  <span style={{ fontFamily: "var(--font-head)", fontSize: 22, color: "var(--accent-deep)", whiteSpace: "nowrap" }}>{m.area}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10 }}>
                  <span style={{ fontFamily: "var(--font-body)", fontSize: 10.5, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", background: "var(--accent)", color: "var(--ink)", padding: "4px 10px", borderRadius: 2 }}>{m.loc}</span>
                </div>
                <p style={{ fontSize: 13.5, color: "var(--ink-soft)", lineHeight: 1.5, marginTop: 12 }}>{m.hl}</p>
                <div style={{ display: "flex", gap: 7, margin: "14px 0 18px", flexWrap: "wrap" }}>
                  {m.specs.map((sp, j) => (
                    <span key={j} style={{ fontSize: 11.5, color: "var(--ink-soft)", border: "1px solid var(--line)", padding: "4px 9px", borderRadius: 2 }}>{sp}</span>
                  ))}
                </div>
                <div style={{ borderTop: "1px solid var(--line)", paddingTop: 16, marginTop: "auto", display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 8 }}>
                  {/* Solo precio de preventa: ya no hay valor de lista tachado
                      ni etiqueta de porcentaje. El descuento es 7.5% parejo. */}
                  <div>
                    <div style={{ fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--ink)", fontWeight: 700 }}>{S.models.preventaLabel}</div>
                    <div style={{ fontFamily: "var(--font-head)", fontSize: 24, marginTop: 2 }}>{m.price}</div>
                  </div>
                  <a href={waFor(m)} target="_blank" rel="noopener" className="btn btn-outline" style={{ padding: "10px 15px", fontSize: 12 }}>{S.models.cta}</a>
                </div>
              </div>
            </article>
          );})}
        </div>
        <div className="reveal" style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 28, flexWrap: "wrap" }}>
          <span style={{ fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--ink)", border: "1px solid var(--ink)", padding: "6px 13px", borderRadius: 2 }}>{S.models.summary}</span>
          <p style={{ fontSize: 11.5, color: "var(--accent-deep)", maxWidth: 720, lineHeight: 1.5 }}>{S.models.note}</p>
        </div>
        {/* nota al pie de la preventa, debajo de la línea de disponibilidad */}
        <p className="reveal" style={{ fontFamily: "var(--font-body)", fontSize: 13, lineHeight: 1.55, color: "var(--ink-soft)", maxWidth: 600, margin: "22px auto 0", textAlign: "center" }}>{S.models.discountNote}</p>
      </div>
      <style>{`
        @media (max-width: 900px){ .pb-modelgrid{ grid-template-columns:1fr !important; } }
        @media (max-width: 460px){ .pb-modelcard{ flex-direction:column !important; } .pb-modelcard .pb-modelimg{ flex:0 0 240px !important; border-right:none !important; border-bottom:1px solid var(--line) !important; } }
      `}</style>
    </section>
  );
}

/* ---------- VIDEO ---------- */
function Video({ S }) {
  return (
    <section id="video" style={{ padding: "104px 0", background: "var(--bg)" }}>
      <div className="wrap" style={{ maxWidth: 1080 }}>
        <div className="reveal" style={{ textAlign: "center", marginBottom: 44 }}>
          <div className="eyebrow" style={{ marginBottom: 14 }}>{S.video.eyebrow}</div>
          <h2 style={{ fontSize: "clamp(32px,4vw,50px)" }}>{S.video.title}</h2>
          <p style={{ fontSize: 16, color: "var(--ink-soft)", lineHeight: 1.6, maxWidth: 520, margin: "18px auto 0" }}>{S.video.lead}</p>
        </div>
        <div className="reveal" style={{ position: "relative" }}>
          <div style={{ position: "absolute", top: -18, left: -18, right: 36, bottom: 36, background: "var(--accent)", borderRadius: 3, zIndex: 0 }} />
          <div style={{ position: "relative", zIndex: 1, aspectRatio: "16 / 9", borderRadius: 3, overflow: "hidden", boxShadow: "0 36px 70px -40px rgba(40,34,20,.55)", border: "1px solid var(--line)", background: "#000" }}>
            <iframe
              src={"https://www.youtube-nocookie.com/embed/" + S.video.yt + "?rel=0&modestbranding=1"}
              title={S.video.title}
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- AMENIDADES ---------- */
function Amenidades({ S }) {
  const icons = ["skybar", "garden", "pet", "elevator"];
  return (
    <section id="amenidades" style={{ background: "var(--accent)", padding: "104px 0" }}>
      <div className="wrap">
        <div className="reveal" style={{ textAlign: "center", marginBottom: 60 }}>
          <div className="eyebrow" style={{ marginBottom: 14, color: "#5a5238" }}>{S.amen.eyebrow}</div>
          <h2 style={{ fontSize: "clamp(32px,4vw,50px)" }}>{S.amen.title}</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 1, background: "rgba(26,26,26,.12)", border: "1px solid rgba(26,26,26,.12)" }} className="pb-amengrid">
          {S.amen.items.map((a, i) => (
            <div key={i} className="reveal" style={{ background: "var(--bg)", padding: "46px 30px", textAlign: "center" }}>
              <div style={{ color: "var(--ink)", display: "flex", justifyContent: "center", marginBottom: 20 }}><Ico name={icons[i]} size={38} /></div>
              <h3 style={{ fontSize: 20, marginBottom: 8 }}>{a.t}</h3>
              <p style={{ fontSize: 13.5, color: "var(--ink-soft)", lineHeight: 1.55 }}>{a.d}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media (max-width: 820px){ .pb-amengrid{ grid-template-columns:1fr 1fr !important; } }`}</style>
    </section>
  );
}

/* ---------- UBICACION ---------- */
function Ubicacion({ S, contact }) {
  return (
    <section id="ubicacion" style={{ padding: "110px 0" }}>
      <div className="wrap" style={{ display: "grid", gridTemplateColumns: "1fr 1.05fr", gap: 60, alignItems: "center" }} >
        <a href={contact.maps} target="_blank" rel="noopener" className="reveal pb-ubic-map pb-maplink" style={{ position: "relative", display: "block", borderRadius: 3, overflow: "hidden", border: "1px solid var(--line)", boxShadow: "0 30px 60px -42px rgba(40,34,20,.5)" }}>
          <img src="images/mapa-ubicacion.jpg" alt="Mapa de ubicación de Porto Belo Residencial en Ampliación Guaycura, Tijuana" loading="lazy" style={{ width: "100%", height: "auto", display: "block" }} />
          <span className="pb-maphint" style={{ position: "absolute", bottom: 14, right: 14, background: "rgba(26,26,26,.84)", color: "var(--bg)", fontSize: 12, fontWeight: 600, letterSpacing: "0.04em", padding: "9px 14px", borderRadius: 2, display: "inline-flex", gap: 7, alignItems: "center", backdropFilter: "blur(4px)" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0Z"/><circle cx="12" cy="10" r="3"/></svg>
            {S.loc.mapCta}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7M9 7h8v8"/></svg>
          </span>
        </a>
        <div className="reveal">
          <div className="eyebrow" style={{ marginBottom: 14 }}>{S.loc.eyebrow}</div>
          <h2 style={{ fontSize: "clamp(30px,3.6vw,46px)", marginBottom: 16 }}>{S.loc.title}</h2>
          <p style={{ fontSize: 15.5, color: "var(--ink-soft)", lineHeight: 1.6, maxWidth: 460 }}>{S.loc.lead}</p>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 12, margin: "26px 0 30px", paddingBottom: 26, borderBottom: "1px solid var(--line)" }}>
            <span style={{ color: "var(--accent-deep)", marginTop: 2 }}><Ico name="pin" size={22} /></span>
            <div>
              <div style={{ fontWeight: 600, fontSize: 15 }}>{S.loc.addrTitle}</div>
              <div style={{ fontSize: 14, color: "var(--ink-soft)", marginTop: 3 }}>{S.loc.addr}</div>
            </div>
          </div>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 0 }}>
            {S.loc.pois.map((p, i) => (
              <li key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "13px 0", borderBottom: i < S.loc.pois.length - 1 ? "1px solid var(--line)" : "none" }}>
                <span style={{ fontSize: 15, fontWeight: 500 }}>{p.name}</span>
                <span style={{ fontFamily: "var(--font-head)", fontSize: 16, color: "var(--accent-deep)", whiteSpace: "nowrap" }}>{p.dist}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <style>{`
        @media (max-width: 880px){ #ubicacion .wrap{ grid-template-columns:1fr !important; } }
        .pb-maplink{ transition: box-shadow .3s; cursor:pointer; }
        .pb-maplink img{ transition: transform .55s ease; }
        .pb-maplink:hover img{ transform: scale(1.035); }
        .pb-maplink:hover .pb-maphint{ background: rgba(26,26,26,.96); }
      `}</style>
    </section>
  );
}

/* ---------- CTA FINAL ---------- */
function CTAFinal({ S, contact }) {
  const [f, setF] = useState({ nombre: "", whatsapp: "", correo: "" });
  const [done, setDone] = useState(false);
  const upd = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const wa = "https://wa.me/" + contact.whatsapp + "?text=" + encodeURIComponent(S.cta.waMsg);
  return (
    <section id="contacto" style={{ background: "var(--ink)", color: "var(--bg)", padding: "100px 0" }}>
      <div className="wrap" style={{ maxWidth: 760, textAlign: "center" }}>
        <div className="reveal">
          <div className="eyebrow" style={{ marginBottom: 18, color: "var(--accent)" }}>{S.cta.eyebrow}</div>
          <h2 style={{ fontSize: "clamp(34px,4.6vw,58px)", color: "var(--bg)" }}>{S.cta.title}</h2>
          <p style={{ fontSize: 17, color: "rgba(245,240,232,.72)", lineHeight: 1.6, maxWidth: 520, margin: "20px auto 40px" }}>{S.cta.lead}</p>
        </div>
        {done ? (
          <div className="reveal" style={{ fontSize: 18, color: "var(--accent)" }}>{S.form.thanksTitle} — {S.form.thanksBody}</div>
        ) : (
          <form className="reveal" onSubmit={(e) => { e.preventDefault(); if (f.nombre && f.whatsapp && f.correo) setDone(true); }} style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 620, margin: "0 auto" }}>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <input value={f.nombre} onChange={upd("nombre")} placeholder={S.form.namePh} required style={{ flex: "1 1 160px", padding: "15px 16px", borderRadius: 2, border: "1px solid rgba(255,255,255,.2)", background: "rgba(255,255,255,.06)", color: "var(--bg)", fontSize: 15 }} />
              <input value={f.whatsapp} onChange={upd("whatsapp")} placeholder="WhatsApp" inputMode="tel" required style={{ flex: "1 1 160px", padding: "15px 16px", borderRadius: 2, border: "1px solid rgba(255,255,255,.2)", background: "rgba(255,255,255,.06)", color: "var(--bg)", fontSize: 15 }} />
              <input value={f.correo} onChange={upd("correo")} placeholder={S.form.email} type="email" required style={{ flex: "1 1 160px", padding: "15px 16px", borderRadius: 2, border: "1px solid rgba(255,255,255,.2)", background: "rgba(255,255,255,.06)", color: "var(--bg)", fontSize: 15 }} />
            </div>
            <button type="submit" className="btn" style={{ background: "var(--accent)", color: "var(--ink)", width: "100%", padding: "15px" }}>{S.cta.send}</button>
          </form>
        )}
        <div style={{ display: "flex", alignItems: "center", gap: 16, justifyContent: "center", margin: "34px 0 0" }} className="reveal">
          <span style={{ flex: 1, maxWidth: 90, height: 1, background: "rgba(255,255,255,.18)" }} />
          <span style={{ fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(245,240,232,.5)" }}>{S.cta.or}</span>
          <span style={{ flex: 1, maxWidth: 90, height: 1, background: "rgba(255,255,255,.18)" }} />
        </div>
        <a href={wa} target="_blank" rel="noopener" className="btn btn-wa reveal" style={{ marginTop: 24, padding: "16px 30px" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2Zm5.8 14.04c-.24.68-1.42 1.32-1.95 1.36-.5.05-.96.24-3.22-.67-2.72-1.07-4.46-3.84-4.6-4.02-.13-.18-1.1-1.46-1.1-2.79 0-1.33.7-1.98.94-2.25.24-.27.53-.34.71-.34.18 0 .35 0 .51.01.16.01.39-.06.6.46.24.59.82 2.03.89 2.18.07.15.12.32.02.5-.09.18-.14.29-.27.45-.13.15-.28.34-.4.46-.13.13-.27.28-.12.54.15.27.67 1.1 1.43 1.78.98.87 1.8 1.14 2.07 1.27.27.13.42.11.58-.07.16-.18.67-.78.85-1.05.18-.27.35-.22.59-.13.24.09 1.52.72 1.78.85.27.13.44.2.51.31.07.12.07.66-.17 1.34Z"/></svg>
        {S.cta.wa}</a>
      </div>
    </section>
  );
}

/* ---------- FOOTER ---------- */
function Footer({ S, contact }) {
  const waLink = "https://wa.me/" + contact.whatsapp;
  return (
    <footer style={{ background: "var(--bg)", padding: "60px 0 40px", borderTop: "1px solid var(--line)" }}>
      <div className="wrap" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 30 }}>
        <div>
          <div style={{ fontFamily: "var(--font-head)", fontWeight: 600, fontSize: 20, letterSpacing: "0.18em" }}>PORTO BELO</div>
          <div style={{ fontSize: 12, letterSpacing: "0.34em", color: "var(--accent-deep)", marginTop: 6, textTransform: "uppercase" }}>Residencial · Tijuana, B.C.</div>
          <div style={{ marginTop: 26 }}>
            <div className="eyebrow" style={{ marginBottom: 10 }}>{S.foot.developedBy}</div>
            <img src="images/procapital-dark.png" alt="Procapital — Impulsamos tu patrimonio" style={{ height: 58, width: "auto", display: "block" }} />
          </div>
        </div>
        <div style={{ display: "flex", gap: 60, flexWrap: "wrap" }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 12 }}>{S.foot.contact}</div>
            <a href={waLink} target="_blank" rel="noopener" style={{ display: "block", fontSize: 14, color: "var(--ink-soft)", marginBottom: 5 }}>WhatsApp: {contact.whatsappLabel}</a>
            <a href={"https://" + contact.web} target="_blank" rel="noopener" style={{ display: "block", fontSize: 14, color: "var(--ink-soft)", marginBottom: 5 }}>{contact.web}</a>
            <div style={{ fontSize: 14, color: "var(--ink-soft)" }}>{contact.city}</div>
          </div>
          <div>
            <div className="eyebrow" style={{ marginBottom: 12 }}>{S.foot.legalT}</div>
            <p style={{ fontSize: 12, color: "var(--ink-soft)", maxWidth: 260, lineHeight: 1.5 }}>{S.foot.legal}</p>
          </div>
        </div>
      </div>
      <div className="wrap" style={{ marginTop: 44, paddingTop: 22, borderTop: "1px solid var(--line)", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10, alignItems: "center" }}>
        <span style={{ fontSize: 12, color: "var(--accent-deep)" }}>© 2026 Porto Belo Residencial. {S.foot.rights}</span>
        <div style={{ display: "flex", gap: 22, alignItems: "center" }}>
          <a href="Aviso de Privacidad.html" style={{ fontSize: 12, color: "var(--accent-deep)", borderBottom: "1px solid var(--line)" }}>{S.foot.privacy}</a>
          <span style={{ fontSize: 12, color: "var(--accent-deep)" }}>{S.foot.made}</span>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { Placeholder, Ico, Nav, Hero, HeroForm, TourVirtual, Stats, Modelos, Video, Amenidades, Ubicacion, CTAFinal, Footer });
