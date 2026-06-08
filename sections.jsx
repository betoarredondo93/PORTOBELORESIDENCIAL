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
    <header style={{ position: "sticky", top: 0, zIndex: 40, background: "color-mix(in srgb, var(--bg) 86%, transparent)", backdropFilter: "blur(10px)", borderBottom: "1px solid var(--line)" }}>
      <div className="wrap" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 76 }}>
        <a href="#top" style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
          <span style={{ fontFamily: "var(--font-head)", fontWeight: 600, fontSize: 21, letterSpacing: "0.18em" }}>PORTO BELO</span>
          <span style={{ fontSize: 9, letterSpacing: "0.42em", color: "var(--accent-deep)", marginTop: 5, textTransform: "uppercase", fontWeight: 600 }}>Residencial · Tijuana</span>
        </a>
        <nav style={{ display: "flex", alignItems: "center", gap: 34 }} className="pb-navlinks">
          {items.map(([href, label]) => (
            <a key={href} href={href} style={{ fontSize: 13.5, fontWeight: 500, letterSpacing: "0.02em", color: "var(--ink-soft)" }} className="pb-navlink">{label}</a>
          ))}
        </nav>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ display: "flex", border: "1px solid var(--line)", borderRadius: 2, overflow: "hidden" }}>
            {["es", "en"].map((l) => (
              <button key={l} onClick={() => setLang(l)} style={{ fontSize: 11.5, fontWeight: 600, letterSpacing: "0.08em", padding: "7px 11px", textTransform: "uppercase", background: lang === l ? "var(--ink)" : "transparent", color: lang === l ? "var(--bg)" : "var(--ink-soft)", transition: "all .2s" }}>{l}</button>
            ))}
          </div>
          <button className="btn btn-dark" onClick={onCTA}>{S.nav.cta}</button>
        </div>
      </div>
      <style>{`
        @media (max-width: 1040px){ .pb-navlinks{ display:none !important; } }
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
function Hero({ S, tw }) {
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
          <img src="images/render-fachada.jpg" alt="Render fachada Porto Belo Residencial" className="reveal" style={{ height: 460, width: "100%", objectFit: "cover", objectPosition: "center", borderRadius: 3, display: "block" }} />
          <div className="reveal pb-heroform" style={{ textAlign: "left" }}><HeroForm S={S} compact /></div>
        </div>
      </section>
    );
  }

  // default: render right
  return (
    <section id="top" style={{ paddingTop: 64, paddingBottom: 20 }}>
      <div className="wrap pb-hero-grid" style={{ display: "grid", gridTemplateColumns: "1fr .82fr", gap: 60, alignItems: "center" }}>
        <div className="reveal">
          <div className="eyebrow" style={{ marginBottom: 20 }}>{S.hero.eyebrow}</div>
          {headline}{sub}
          <div style={{ marginTop: 34, maxWidth: 430 }}><HeroForm S={S} compact /></div>
        </div>
        <div className="reveal pb-hero-img" style={{ position: "relative" }}>
          <div style={{ position: "absolute", top: -22, right: -22, bottom: 40, left: 40, background: "var(--accent)", borderRadius: 3, zIndex: 0 }} />
          <img src="images/render-fachada.jpg" alt="Render fachada Porto Belo Residencial" style={{ position: "relative", zIndex: 1, height: 600, width: "100%", objectFit: "cover", objectPosition: "42% center", borderRadius: 3, display: "block", boxShadow: "0 30px 60px -36px rgba(40,34,20,.5)" }} />
        </div>
      </div>
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
function Modelos({ S, onPick }) {
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
                  {!sold && m.preventa ? (
                    <div>
                      <div style={{ fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--ink)", fontWeight: 700 }}>{S.models.preventaLabel}</div>
                      <div style={{ fontFamily: "var(--font-head)", fontSize: 24, marginTop: 2 }}>{m.preventa}</div>
                      <div style={{ fontSize: 11.5, color: "var(--accent-deep)", textDecoration: "line-through", marginTop: 1 }}>{m.price}</div>
                    </div>
                  ) : (
                    <div>
                      <div style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent-deep)" }}>{S.models.listLabel}</div>
                      <div style={{ fontFamily: "var(--font-head)", fontSize: 24, marginTop: 2 }}>{m.price}</div>
                    </div>
                  )}
                  <button className="btn btn-outline" style={{ padding: "10px 15px", fontSize: 12 }} onClick={onPick}>{S.models.cta}</button>
                </div>
              </div>
            </article>
          );})}
        </div>
        <div className="reveal" style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 28, flexWrap: "wrap" }}>
          <span style={{ fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--ink)", border: "1px solid var(--ink)", padding: "6px 13px", borderRadius: 2 }}>{S.models.preventa}</span>
          <p style={{ fontSize: 11.5, color: "var(--accent-deep)", maxWidth: 720, lineHeight: 1.5 }}>{S.models.note}</p>
        </div>
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
  const icons = ["pool", "garden", "pet", "elevator"];
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
function Ubicacion({ S }) {
  return (
    <section id="ubicacion" style={{ padding: "110px 0" }}>
      <div className="wrap" style={{ display: "grid", gridTemplateColumns: "1fr 1.05fr", gap: 60, alignItems: "center" }} >
        <div className="reveal pb-ubic-map">
          <img src="images/mapa-ubicacion.jpg" alt="Mapa de ubicación de Porto Belo Residencial en Colinas del Alamar, Tijuana" loading="lazy" style={{ width: "100%", height: "auto", borderRadius: 3, display: "block", border: "1px solid var(--line)", boxShadow: "0 30px 60px -42px rgba(40,34,20,.5)" }} />
        </div>
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
      <style>{`@media (max-width: 880px){ #ubicacion .wrap{ grid-template-columns:1fr !important; } }`}</style>
    </section>
  );
}

/* ---------- CTA FINAL ---------- */
function CTAFinal({ S, contact }) {
  const [f, setF] = useState({ nombre: "", contacto: "" });
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
          <form className="reveal" onSubmit={(e) => { e.preventDefault(); if (f.nombre && f.contacto) setDone(true); }} style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", maxWidth: 600, margin: "0 auto" }}>
            <input value={f.nombre} onChange={upd("nombre")} placeholder={S.form.namePh} required style={{ flex: "1 1 180px", padding: "15px 16px", borderRadius: 2, border: "1px solid rgba(255,255,255,.2)", background: "rgba(255,255,255,.06)", color: "var(--bg)", fontSize: 15 }} />
            <input value={f.contacto} onChange={upd("contacto")} placeholder={S.cta.contactPh} required style={{ flex: "1 1 180px", padding: "15px 16px", borderRadius: 2, border: "1px solid rgba(255,255,255,.2)", background: "rgba(255,255,255,.06)", color: "var(--bg)", fontSize: 15 }} />
            <button type="submit" className="btn" style={{ background: "var(--accent)", color: "var(--ink)", flex: "0 0 auto" }}>{S.cta.send}</button>
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

Object.assign(window, { Placeholder, Ico, Nav, Hero, HeroForm, Stats, Modelos, Video, Amenidades, Ubicacion, CTAFinal, Footer });
