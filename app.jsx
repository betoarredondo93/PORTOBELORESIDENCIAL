// app.jsx — Porto Belo Residencial
const { useState, useEffect, useRef } = React;

/* ═══════════════════════════════════════════════════════════════
   ▼▼▼  DATOS DE CONTACTO — EDITA AQUÍ  ▼▼▼
   Cambia estos valores para actualizar WhatsApp, correo y teléfono
   en TODO el sitio (botón verde + footer). Guarda y listo.
   ═══════════════════════════════════════════════════════════════ */
const CONTACT = {
  whatsapp: "5216631197920",           // Número con lada país (52) + 10 dígitos, SIN espacios ni signos
  whatsappLabel: "+52 663 119 7920",   // Cómo se muestra el número (con formato bonito)
  email: "ventas@portobelo.mx",        // ⚠ CORREO AÚN DE EJEMPLO — reemplázalo por el real
  web: "www.portobeloresidencial.com", // Sitio web
  maps: "https://maps.app.goo.gl/Uu3wh8ybfUMmzWBZ8", // Ubicación en Google Maps (mapa clickeable)
  city: "Tijuana, Baja California",    // Ciudad / ubicación
};
/* ▲▲▲  FIN DATOS DE CONTACTO  ▲▲▲ */

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "hero": "right",
  "palette": ["#F5F0E8", "#C9BFA8", "#1A1A1A"],
  "headFont": "Playfair Display"
}/*EDITMODE-END*/;

const PALETTES = {
  "Taupe clásico": ["#F5F0E8", "#C9BFA8", "#1A1A1A"],
  "Arena cálida": ["#F3ECE0", "#D8C4A2", "#221E18"],
  "Piedra fría": ["#EFEFEC", "#BFC2B8", "#1B1D1A"],
};

/* ---------------- i18n ---------------- */
const STRINGS = {
  es: {
    nav: { models: "Modelos", video: "Video", amenities: "Amenidades", location: "Ubicación", contact: "Contacto", cta: "Solicitar info" },
    hero: {
      eyebrow: "Vida vertical · Tijuana",
      l1: "La mejor inversión",
      l2: "en la ciudad de Tijuana",
      ctaPrimary: "Solicitar información", ctaSecondary: "Ver modelos",
      sub: "Porto Belo Residencial redefine la vida urbana en Tijuana: 19 unidades de diseño contemporáneo, amenidades de autor y una plusvalía pensada para crecer contigo.",
    },
    form: {
      eyebrow: "Recibe la información",
      lead: "Déjanos tus datos y un asesor te contactará con disponibilidad y precios.",
      name: "Nombre", namePh: "Tu nombre completo", email: "Correo", submit: "Quiero más información",
      privacy: "Tus datos están protegidos. Sin spam.",
      thanksTitle: "¡Gracias!", thanksBody: "Un asesor te contactará muy pronto.",
    },
    stats: [
      { n: "19", l: "Unidades totales" },
      { n: "17", l: "Disponibles" },
      { n: "+25%", l: "Plusvalía proyectada" },
      { n: "Junio 2027", l: "Fecha entrega" },
    ],
    models: {
      eyebrow: "Tipologías",
      title: "Elige el modelo que se adapta a tu vida",
      lead: "Distribuciones eficientes con acabados premium.",
      listLabel: "Valor de venta", preventaLabel: "Preventa", cta: "Solicitar modelo", avail: "Disponible", sold: "Agotado",
      preventa: "Preventa −12.5% y −7.5% disponible",
      note: "* Precios en pesos (MXN), sujetos a cambio. El precio de preventa varía por modelo (−7.5% a −12.5%) sobre el valor de venta. Consulta el plan de pagos con un asesor. La plusvalía +25% es una proyección estimada, no garantizada.",
      items: [
        { tag: "D1", name: "Modelo D1", area: "89 m²", loc: "Frontal", hl: "Terraza en sala y recámara", img: "images/plan-d1.jpg", specs: ["2 recámaras", "2 baños", "Terraza"], price: "$4,672,500", preventa: null, status: "avail" },
        { tag: "D2", name: "Modelo D2", area: "71 m²", loc: "Intermedio frontal", hl: "Posición frontal de la torre", img: "images/plan-d2.jpg", specs: ["2 recámaras", "2 baños"], price: "$3,372,500", preventa: "$2,950,937", dcto: "Preventa −12.5%", status: "avail" },
        { tag: "D3", name: "Modelo D3", area: "71 m²", loc: "Intermedio posterior", hl: "Posición posterior de la torre", img: "images/plan-d3.jpg", specs: ["2 recámaras", "2 baños"], price: "$3,372,500", preventa: "$2,950,937", dcto: "Preventa −12.5%", status: "avail" },
        { tag: "D4", name: "Modelo D4", area: "78 m²", loc: "Posterior", hl: "La distribución más amplia disponible", img: "images/plan-d4.jpg", specs: ["2 recámaras", "2 baños"], price: "$3,705,000", preventa: "$3,427,125", dcto: "Preventa −7.5%", status: "avail" },
      ],
    },
    video: {
      eyebrow: "Video", title: "Recorre Porto Belo",
      lead: "Un recorrido por la arquitectura, las amenidades y la vida que te espera.",
      yt: "8c0UNc-c-4E",
    },
    amen: {
      eyebrow: "Amenidades", title: "Espacios diseñados para vivir mejor",
      items: [
        { t: "Sky Bar", d: "Tu espacio exclusivo para convivir, recibir invitados y disfrutar el atardecer." },
        { t: "Roof Garden", d: "Jardín en las alturas con áreas verdes y rincones para relajarte al aire libre." },
        { t: "Pet Friendly", d: "Áreas pensadas para ti y tus mascotas." },
        { t: "Elevador", d: "Acceso directo y seguro a cada nivel." },
      ],
    },
    loc: {
      eyebrow: "Ubicación", title: "En el corazón conectado de Tijuana",
      lead: "A pasos de los principales puntos de la ciudad, con accesos rápidos a vialidades clave y la frontera.",
      addrTitle: "Dirección", addr: "Calle Sierra Pinta, Ampliación Guaycura · Tijuana, B.C.", mapCta: "Ver en Google Maps",
      pois: [
        { name: "CETYS Universidad", dist: "2 min" },
        { name: "Parque Morelos", dist: "5 min" },
        { name: "C. Comercial Macroplaza", dist: "5 min" },
        { name: "Garita de Otay", dist: "13 min" },
        { name: "Aeropuerto de Tijuana", dist: "15 min" },
      ],
    },
    cta: {
      eyebrow: "Da el primer paso", title: "Agenda tu visita privada",
      lead: "Conoce el proyecto, los acabados y la disponibilidad real. Te atendemos hoy mismo.",
      contactPh: "WhatsApp o correo", send: "Enviar", or: "o", wa: "Escríbenos por WhatsApp",
      waMsg: "Hola, me interesa Porto Belo Residencial. ¿Me comparten información?",
    },
    foot: {
      contact: "Contacto", contactLines: ["Tel / WhatsApp: por definir", "ventas@portobelo.mx (placeholder)", "Tijuana, Baja California"],
      legalT: "Aviso", legal: "Imágenes ilustrativas. Las cifras de plusvalía son proyecciones estimadas y no constituyen una garantía de rendimiento.",
      rights: "Todos los derechos reservados.", made: "Grupo MÁS HUMANOS", privacy: "Aviso de privacidad", developedBy: "Un desarrollo de",
    },
  },
  en: {
    nav: { models: "Models", video: "Video", amenities: "Amenities", location: "Location", contact: "Contact", cta: "Request info" },
    hero: {
      eyebrow: "Vertical living · Tijuana",
      l1: "The best investment",
      l2: "in the city of Tijuana",
      ctaPrimary: "Request information", ctaSecondary: "View models",
      sub: "Porto Belo Residencial reimagines urban life in Tijuana: 19 contemporary residences, signature amenities, and appreciation designed to grow with you.",
    },
    form: {
      eyebrow: "Get the information",
      lead: "Leave your details and an advisor will reach out with availability and pricing.",
      name: "Name", namePh: "Your full name", email: "Email", submit: "I want more information",
      privacy: "Your data is protected. No spam.",
      thanksTitle: "Thank you!", thanksBody: "An advisor will contact you shortly.",
    },
    stats: [
      { n: "19", l: "Total units" },
      { n: "17", l: "Available" },
      { n: "+25%", l: "Projected appreciation" },
      { n: "June 2027", l: "Delivery date" },
    ],
    models: {
      eyebrow: "Layouts",
      title: "Choose the model that fits your life",
      lead: "Efficient layouts with premium finishes.",
      listLabel: "Sale price", preventaLabel: "Pre-sale", cta: "Request model", avail: "Available", sold: "Sold out",
      preventa: "Pre-sale −12.5% & −7.5% available",
      note: "* Prices in Mexican pesos (MXN), subject to change. Pre-sale price varies by model (−7.5% to −12.5%) off the sale price. Ask an advisor about payment plans. The +25% appreciation is an estimated projection, not guaranteed.",
      items: [
        { tag: "D1", name: "Model D1", area: "89 m²", loc: "Front", hl: "Terrace in living & bedroom", img: "images/plan-d1.jpg", specs: ["2 bedrooms", "2 baths", "Terrace"], price: "$4,672,500", preventa: null, status: "avail" },
        { tag: "D2", name: "Model D2", area: "71 m²", loc: "Front-middle", hl: "Front side of the tower", img: "images/plan-d2.jpg", specs: ["2 bedrooms", "2 baths"], price: "$3,372,500", preventa: "$2,950,937", dcto: "Pre-sale −12.5%", status: "avail" },
        { tag: "D3", name: "Model D3", area: "71 m²", loc: "Rear-middle", hl: "Rear side of the tower", img: "images/plan-d3.jpg", specs: ["2 bedrooms", "2 baths"], price: "$3,372,500", preventa: "$2,950,937", dcto: "Pre-sale −12.5%", status: "avail" },
        { tag: "D4", name: "Model D4", area: "78 m²", loc: "Rear", hl: "The largest layout available", img: "images/plan-d4.jpg", specs: ["2 bedrooms", "2 baths"], price: "$3,705,000", preventa: "$3,427,125", dcto: "Pre-sale −7.5%", status: "avail" },
      ],
    },
    video: {
      eyebrow: "Video", title: "Take a tour of Porto Belo",
      lead: "A walkthrough of the architecture, the amenities and the life that awaits you.",
      yt: "8c0UNc-c-4E",
    },
    amen: {
      eyebrow: "Amenities", title: "Spaces designed for better living",
      items: [
        { t: "Sky Bar", d: "Your exclusive space to gather, host guests and enjoy the sunset." },
        { t: "Roof Garden", d: "Elevated garden with green areas and quiet corners to unwind outdoors." },
        { t: "Pet Friendly", d: "Areas designed for you and your pets." },
        { t: "Elevator", d: "Direct, secure access to every floor." },
      ],
    },
    loc: {
      eyebrow: "Location", title: "In Tijuana's connected heart",
      lead: "Steps from the city's key landmarks, with quick access to main roads and the border.",
      addrTitle: "Address", addr: "Calle Sierra Pinta, Ampliación Guaycura · Tijuana, B.C.", mapCta: "Open in Google Maps",
      pois: [
        { name: "CETYS University", dist: "2 min" },
        { name: "Parque Morelos", dist: "5 min" },
        { name: "Macroplaza Mall", dist: "5 min" },
        { name: "Otay Border Crossing", dist: "13 min" },
        { name: "Tijuana Airport", dist: "15 min" },
      ],
    },
    cta: {
      eyebrow: "Take the first step", title: "Book your private tour",
      lead: "Discover the project, finishes and real availability. We'll assist you today.",
      contactPh: "WhatsApp or email", send: "Send", or: "or", wa: "Message us on WhatsApp",
      waMsg: "Hi, I'm interested in Porto Belo Residencial. Could you share more information?",
    },
    foot: {
      contact: "Contact", contactLines: ["Phone / WhatsApp: TBD", "sales@portobelo.mx (placeholder)", "Tijuana, Baja California"],
      legalT: "Notice", legal: "Illustrative images. Appreciation figures are estimated projections and do not constitute a guarantee of returns.",
      rights: "All rights reserved.", made: "Grupo MÁS HUMANOS", privacy: "Privacy policy", developedBy: "A development by",
    },
  },
};

function paletteName(arr) {
  for (const [k, v] of Object.entries(PALETTES)) if (v.join() === arr.join()) return k;
  return "Taupe clásico";
}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [lang, setLang] = useState("es");
  const S = STRINGS[lang];
  const rootRef = useRef(null);

  const [bg, accent, ink] = t.palette;
  const deep = mix(accent, ink, 0.34);

  // reveal-on-scroll (entrance is enhancement only — base state is visible)
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: no-preference)").matches) {
      document.documentElement.classList.add("js-anim");
    }
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [t.hero, lang]);

  const scrollTo = (id) => { const el = document.querySelector(id); if (el) window.scrollTo({ top: el.offsetTop - 60, behavior: "smooth" }); };

  const themeVars = {
    "--bg": bg, "--accent": accent, "--ink": ink,
    "--accent-deep": deep, "--line": mix(bg, ink, 0.12), "--ink-soft": mix(ink, bg, 0.42),
    "--font-head": `'${t.headFont}'`,
  };

  useEffect(() => {
    Object.entries(themeVars).forEach(([k, v]) => document.documentElement.style.setProperty(k, v));
    document.body.style.background = bg;
  }, [t.palette, t.headFont]);

  return (
    <div ref={rootRef} style={themeVars}>
      <Nav S={S} lang={lang} setLang={setLang} onCTA={() => scrollTo("#contacto")} />
      <Hero S={S} tw={t} onCTA={() => scrollTo("#contacto")} onModels={() => scrollTo("#modelos")} />
      <Stats S={S} />
      <Modelos S={S} onPick={() => scrollTo("#contacto")} />
      <Video S={S} />
      <Amenidades S={S} />
      <Ubicacion S={S} contact={CONTACT} />
      <CTAFinal S={S} contact={CONTACT} />
      <Footer S={S} contact={CONTACT} />

      <TweaksPanel>
        <TweakSection label="Hero" />
        <TweakRadio label="Layout" value={t.hero} options={["right", "bg", "center"]} onChange={(v) => setTweak("hero", v)} />
        <TweakSection label="Paleta" />
        <TweakColor label="Tono" value={t.palette}
          options={Object.values(PALETTES)}
          onChange={(v) => setTweak("palette", v)} />
        <div style={{ fontSize: 11, color: "#8a8275", margin: "-4px 4px 4px", letterSpacing: ".02em" }}>{paletteName(t.palette)}</div>
        <TweakSection label="Tipografía de títulos" />
        <TweakSelect label="Serif" value={t.headFont}
          options={["Playfair Display", "Cormorant Garamond", "DM Serif Display"]}
          onChange={(v) => setTweak("headFont", v)} />
      </TweaksPanel>
    </div>
  );
}

/* tiny color mixer (hex) */
function mix(a, b, amt) {
  const pa = hx(a), pb = hx(b);
  const r = Math.round(pa[0] + (pb[0] - pa[0]) * amt);
  const g = Math.round(pa[1] + (pb[1] - pa[1]) * amt);
  const bl = Math.round(pa[2] + (pb[2] - pa[2]) * amt);
  return "#" + [r, g, bl].map((x) => x.toString(16).padStart(2, "0")).join("");
}
function hx(h) { const n = h.replace("#", ""); return [parseInt(n.slice(0, 2), 16), parseInt(n.slice(2, 4), 16), parseInt(n.slice(4, 6), 16)]; }

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
