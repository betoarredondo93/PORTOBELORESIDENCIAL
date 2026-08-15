// app.jsx — Porto Belo Residencial
const { useState, useEffect, useRef } = React;

/* ═══════════════════════════════════════════════════════════════
   ▼▼▼  DATOS DE CONTACTO — EDITA AQUÍ  ▼▼▼
   Cambia estos valores para actualizar WhatsApp y teléfono
   en TODO el sitio (botón verde + footer + tarjetas de modelo).
   Guarda y listo.
   No hay correo: cuando tengas el definitivo, agrégalo aquí como
   email: "..." y añádelo al Footer.
   ═══════════════════════════════════════════════════════════════ */
const CONTACT = {
  whatsapp: "5216631197920",           // Número con lada país (52) + 10 dígitos, SIN espacios ni signos
  whatsappLabel: "+52 663 119 7920",   // Cómo se muestra el número (con formato bonito)
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
      { n: "16", l: "Disponibles" },
      { n: "+25%", l: "Plusvalía proyectada" },
      { n: "Agosto 2027", l: "Fecha entrega" },
    ],
    /* ═══ TOUR VIRTUAL ═══
       Cada clave corresponde a un clip de TOUR_CLIPS en sections.jsx.
       Los "puente" van vacíos a propósito: son las transiciones y no
       llevan texto. Para quitar el texto de una escena, deja t y d en "".
       tags: máximo 3, se muestran separadas por punto medio. */
    tour: {
      loading: "Cargando el recorrido…",
      error: "No se pudo cargar el recorrido.",
      hint: "Desliza para recorrer",
      captions: {
        llegada: {
          eyebrow: "AMP Guaycura · Tijuana",
          t: "Llegas antes que el resto",
          d: "Primer desarrollo vertical de Amp. Guaycura. Entrar primero a una zona en consolidación es distinto a entrar tarde a una zona saturada.",
          tags: ["19 unidades", "5 niveles", "Entrega agosto 2027"],
        },
        puente1: { t: "", d: "" },
        social: {
          eyebrow: "Modelo FARO · 89 m²",
          t: "Un espacio amplio para tus necesidades",
          d: "Planta libre sin muros entre sala, comedor y cocina. La misma superficie, mejor aprovechada.",
          tags: ["Planta libre", "Ventanal de gran formato", "Terraza en sala"],
        },
        puente2: { t: "", d: "" },
        cocina: {
          eyebrow: "Cocina",
          t: "Una cocina que invita a quedarse",
          d: "Barra desayunadora de piedra, carpintería en madera y luz bajo gabinete. Acabados que no se cambian a los dos años.",
          tags: ["Barra desayunadora", "Cubierta de piedra", "Carpintería en madera"],
        },
        puente3: { t: "", d: "" },
        recamara: {
          eyebrow: "Recámaras",
          t: "Dos recámaras, dos baños completos",
          d: "En todos los modelos, sin excepción. Y el lambrín de madera que le da identidad al interior.",
          tags: ["2 recámaras", "2 baños", "Terraza en recámara"],
        },
        puente4: { t: "", d: "" },
        /* Escena con tratamiento propio: layout "center" sube el titular y
           el texto al centro de la pantalla, y `cards` reemplaza la línea
           de etiquetas por tres cajas grandes. Si una escena trae `cards`,
           sus `tags` se ignoran. */
        balcon: {
          eyebrow: "Ubicación",
          t: "A minutos de todo",
          d: "CETYS a 3 minutos, Plaza Monarca a 5, Macroplaza a 8. Conectado a Blvd Cucapah y Clouthier.",
          layout: "center",
          cards: [
            { time: "3 MIN", name: "CETYS Universidad" },
            { time: "5 MIN", name: "Plaza Monarca" },
            { time: "8 MIN", name: "Macroplaza Insurgentes" },
          ],
        },
        puente5: { t: "", d: "" },
        roof: {
          eyebrow: "Áreas comunes",
          t: "El piso que es de todos",
          d: "Roof Garden con pérgola, sala lounge y cocina-bar. Para recibir sin abrir tu departamento.",
          tags: ["Roof Garden", "Pérgola", "Pet friendly"],
        },
      },
      /* Cierre: aparece al final del recorrido, después de la escena 6. */
      outro: {
        t: "Desde $3,119,562",
        d: "Preventa activa. 16 unidades disponibles.",
        extra: "Recorriste el modelo FARO de 89 m². Hay tres distribuciones más.",
        cta: "Ver los cuatro modelos",
      },
    },
    models: {
      eyebrow: "Tipologías",
      title: "Elige el modelo que se adapta a tu vida",
      lead: "Distribuciones eficientes con acabados de calidad.",
      preventaLabel: "Preventa", cta: "Solicitar modelo", avail: "Disponible", sold: "Agotado",
      summary: "19 unidades · 16 disponibles · Entrega agosto 2027",
      discountNote: "Precios de preventa con 7.5% de descuento sobre valor de venta. Aplica mientras dure el inventario de esta etapa.",
      /* {model} y {area} se reemplazan con los datos de la tarjeta */
      waModel: "Hola, me interesa el modelo {model} de {area} en Porto Belo.",
      note: "* Precios en pesos (MXN), sujetos a cambio. El precio mostrado es de preventa, con 7.5% de descuento sobre el valor de venta. Consulta el plan de pagos con un asesor. La plusvalía +25% es una proyección estimada, no garantizada.",
      items: [
        { name: "FARO", area: "89 m²", loc: "Frontal", hl: "Terraza en sala y recámara", img: "images/plan-d1.jpg", specs: ["2 recámaras", "2 baños", "Terraza"], price: "$4,672,500", status: "avail" },
        { name: "HABAL", area: "71 m²", loc: "Intermedio frontal", hl: "Posición frontal de la torre", img: "images/plan-d2.jpg", specs: ["2 recámaras", "2 baños"], price: "$3,119,562", status: "avail" },
        { name: "ROBLE", area: "71 m²", loc: "Intermedio posterior", hl: "Posición posterior de la torre", img: "images/plan-d3.jpg", specs: ["2 recámaras", "2 baños"], price: "$3,119,562", status: "avail" },
        { name: "QUELITE", area: "78 m²", loc: "Posterior", hl: "La distribución más amplia disponible", img: "images/plan-d4.jpg", specs: ["2 recámaras", "2 baños"], price: "$3,427,125", status: "avail" },
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
      contact: "Contacto",
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
      { n: "16", l: "Available" },
      { n: "+25%", l: "Projected appreciation" },
      { n: "August 2027", l: "Delivery date" },
    ],
    /* ═══ VIRTUAL TOUR ═══ Keys match TOUR_CLIPS in sections.jsx.
       The "puente" clips are the transitions and carry no copy. */
    tour: {
      loading: "Loading the tour…",
      error: "The tour could not be loaded.",
      hint: "Scroll to explore",
      captions: {
        llegada: {
          eyebrow: "Amp. Guaycura · Tijuana",
          t: "You get here before everyone else",
          d: "The first vertical development in Amp. Guaycura. Getting into a neighborhood while it is still taking shape is not the same as arriving late to a saturated one.",
          tags: ["19 units", "5 floors", "Delivery August 2027"],
        },
        puente1: { t: "", d: "" },
        social: {
          eyebrow: "FARO model · 89 m²",
          t: "Room enough for what you need",
          d: "An open plan with no walls between living room, dining room and kitchen. The same floor area, better used.",
          tags: ["Open plan", "Large-format window", "Terrace off the living room"],
        },
        puente2: { t: "", d: "" },
        cocina: {
          eyebrow: "Kitchen",
          t: "A kitchen that makes you stay",
          d: "Stone breakfast bar, wood cabinetry and under-cabinet lighting. Finishes you won't be replacing in two years.",
          tags: ["Breakfast bar", "Stone countertop", "Wood cabinetry"],
        },
        puente3: { t: "", d: "" },
        recamara: {
          eyebrow: "Bedrooms",
          t: "Two bedrooms, two full bathrooms",
          d: "In every model, without exception. Plus the wood paneling that gives the interior its character.",
          tags: ["2 bedrooms", "2 bathrooms", "Terrace off the bedroom"],
        },
        puente4: { t: "", d: "" },
        /* Scene with its own treatment: layout "center" moves the headline
           and copy to the middle of the screen, and `cards` replaces the
           small tag line with three large boxes. If a scene has `cards`,
           its `tags` are ignored. */
        balcon: {
          eyebrow: "Location",
          t: "Minutes from everything",
          d: "CETYS 3 minutes away, Plaza Monarca 5, Macroplaza 8. Connected to Blvd Cucapah and Clouthier.",
          layout: "center",
          cards: [
            { time: "3 MIN", name: "CETYS Universidad" },
            { time: "5 MIN", name: "Plaza Monarca" },
            { time: "8 MIN", name: "Macroplaza Insurgentes" },
          ],
        },
        puente5: { t: "", d: "" },
        roof: {
          eyebrow: "Common areas",
          t: "The floor that belongs to everyone",
          d: "Roof Garden with a pergola, lounge and kitchen-bar. To host without opening up your apartment.",
          tags: ["Roof Garden", "Pergola", "Pet friendly"],
        },
      },
      /* Closing card: shows at the end of the tour, after scene 6. */
      outro: {
        t: "From $3,119,562",
        d: "Pre-sale open. 16 units available.",
        extra: "You just toured the FARO model, 89 m². There are three more layouts.",
        cta: "See all four models",
      },
    },
    models: {
      eyebrow: "Layouts",
      title: "Choose the model that fits your life",
      lead: "Efficient layouts with quality finishes.",
      preventaLabel: "Pre-sale", cta: "Request model", avail: "Available", sold: "Sold out",
      summary: "19 units · 16 available · Delivery August 2027",
      discountNote: "Pre-sale prices with 7.5% off the sale price. Valid while this phase's inventory lasts.",
      /* {model} and {area} are replaced with the card's data */
      waModel: "Hi, I'm interested in the {model} model, {area}, at Porto Belo.",
      note: "* Prices in Mexican pesos (MXN), subject to change. The price shown is the pre-sale price, 7.5% off the sale price. Ask an advisor about payment plans. The +25% appreciation is an estimated projection, not guaranteed.",
      items: [
        { name: "FARO", area: "89 m²", loc: "Front", hl: "Terrace in living room & bedroom", img: "images/plan-d1.jpg", specs: ["2 bedrooms", "2 baths", "Terrace"], price: "$4,672,500", status: "avail" },
        { name: "HABAL", area: "71 m²", loc: "Front-middle", hl: "Front side of the tower", img: "images/plan-d2.jpg", specs: ["2 bedrooms", "2 baths"], price: "$3,119,562", status: "avail" },
        { name: "ROBLE", area: "71 m²", loc: "Rear-middle", hl: "Rear side of the tower", img: "images/plan-d3.jpg", specs: ["2 bedrooms", "2 baths"], price: "$3,119,562", status: "avail" },
        { name: "QUELITE", area: "78 m²", loc: "Rear", hl: "The largest layout available", img: "images/plan-d4.jpg", specs: ["2 bedrooms", "2 baths"], price: "$3,427,125", status: "avail" },
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
      contact: "Contact",
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

  // Salto instantáneo a propósito: con el tour de 1000vh en medio, un scroll
  // animado atravesaría todo el recorrido y dispararía cientos de seeks al video.
  const scrollTo = (id) => { const el = document.querySelector(id); if (el) window.scrollTo({ top: el.offsetTop - 60, behavior: "auto" }); };

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
      <TourVirtual S={S} onModels={() => scrollTo("#modelos")} />
      <Stats S={S} />
      <Modelos S={S} contact={CONTACT} />
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
