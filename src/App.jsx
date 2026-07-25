import React, { useState } from "react";
import { contactLinks, content, media } from "./content/index.js";

const languages = { en: "EN", ar: "AR", no: "NO", fr: "FR" };
const languageNames = { en: "English", ar: "العربية", no: "Norsk", fr: "Français" };

const portals = [
  { id: "energy", field: "energy", accent: "#CFFF3E", glow: "rgba(207, 255, 62, 0.45)", gradient: "linear-gradient(135deg, #E8FFD5 0%, #9BE8D9 70%, #78C7FF 100%)" },
  { id: "volunteer", field: "volunteer", accent: "#36D99F", glow: "rgba(54, 217, 159, 0.42)", gradient: "linear-gradient(135deg, #D8FFF0 0%, #B5F7E7 60%, #E8FFF8 100%)" },
  { id: "media", field: "media", accent: "#B79CFF", glow: "rgba(183, 156, 255, 0.42)", gradient: "linear-gradient(135deg, #F3ECFF 0%, #DED3FF 58%, #D4F7FF 100%)" },
  { id: "digital", field: "digital", accent: "#FF7A4F", glow: "rgba(255, 122, 79, 0.43)", gradient: "linear-gradient(135deg, #FFE2D2 0%, #FFBCA5 38%, #8F42FF 100%)" },
];

function Object3D({ type }) {
  return (
    <span className={`object3d object-${type}`} aria-hidden="true">
      {type === "energy" && <><span className="energy-bolt" /><span className="turbine-mast" /><span className="turbine-hub" /><span className="turbine-blade blade-a" /><span className="turbine-blade blade-b" /><span className="turbine-blade blade-c" /><span className="energy-orbit orbit-a" /><span className="energy-orbit orbit-b" /></>}
      {type === "media" && <><span className="camera-body" /><span className="camera-top" /><span className="camera-lens" /><span className="camera-glass" /><span className="drone-wing wing-a" /><span className="drone-wing wing-b" /><span className="drone-rotor rotor-a" /><span className="drone-rotor rotor-b" /></>}
      {type === "volunteer" && <><span className="org-base" /><span className="org-roof" /><span className="org-column column-a" /><span className="org-column column-b" /><span className="org-column column-c" /><span className="org-node node-a" /><span className="org-node node-b" /><span className="org-node node-c" /></>}
      {type === "digital" && <><span className="digital-window" /><span className="digital-grid" /><span className="digital-bar bar-a" /><span className="digital-bar bar-b" /><span className="digital-cursor" /><span className="digital-spark spark-a" /><span className="digital-spark spark-b" /></>}
    </span>
  );
}

function ExternalGlyph({ size = 14 }) {
  return (
    <svg className="external-glyph" width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M14 5h5v5M19 5l-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M19 13v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BrandIcon({ type }) {
  const common = { width: 24, height: 24, viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": true };

  if (type === "linkedin") return <svg {...common}><path d="M5.2 3.5A2.2 2.2 0 1 1 5.2 8a2.2 2.2 0 0 1 0-4.5ZM3.3 9.5h3.8V21H3.3V9.5Zm6.1 0H13v1.6h.1c.5-.9 1.7-2 3.6-2 3.8 0 4.5 2.5 4.5 5.8V21h-3.8v-5.4c0-1.3 0-3-1.9-3s-2.2 1.4-2.2 2.9V21H9.4V9.5Z" /></svg>;
  if (type === "certificate") return <svg {...common}><path d="M12 2 4.5 5v6.1c0 4.7 3.2 9 7.5 10.9 4.3-1.9 7.5-6.2 7.5-10.9V5L12 2Zm0 3.1 4.5 1.8v4.2c0 3.1-1.9 6.3-4.5 7.8-2.6-1.5-4.5-4.7-4.5-7.8V6.9L12 5.1Zm-.9 3.1h1.8v3l2.5 1.5-.9 1.5-3.4-2V8.2Z" /></svg>;
  if (type === "energy") return <svg {...common}><path d="M13.4 1 5 13h5.7L9.8 23 19 9h-5.8L13.4 1Z" /></svg>;
  if (type === "x") return <svg {...common}><path d="M4.2 3h4.6l4 5.4L17.5 3h2.2l-5.9 7 6.3 11h-4.6l-4.4-6-5 6H3.9l6.2-7.5L4.2 3Zm3.4 1.8L16.4 19h2L9.6 4.8h-2Z" /></svg>;
  if (type === "youtube") return <svg {...common}><path d="M21.6 7.1a3 3 0 0 0-2.1-2.1C17.7 4.5 12 4.5 12 4.5s-5.7 0-7.5.5a3 3 0 0 0-2.1 2.1A31 31 0 0 0 2 12a31 31 0 0 0 .4 4.9A3 3 0 0 0 4.5 19c1.8.5 7.5.5 7.5.5s5.7 0 7.5-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 22 12a31 31 0 0 0-.4-4.9ZM10 15.5v-7l6 3.5-6 3.5Z" /></svg>;
  if (type === "instagram") return <svg {...common}><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm10.5 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" /></svg>;
  if (type === "tiktok") return <svg {...common}><path d="M14.5 2h3a5.7 5.7 0 0 0 4.5 4.5v3a8.5 8.5 0 0 1-4.5-1.3V15a7 7 0 1 1-7-7c.5 0 1 .1 1.5.2v3.1a4 4 0 1 0 2.5 3.7V2Z" /></svg>;
  if (type === "facebook") return <svg {...common}><path d="M14 8h4V3.2c-.7-.1-2.1-.2-3.8-.2-3.7 0-6.2 2.3-6.2 6.4V13H4v5h4v6h5v-6h4.2l.8-5H13V9.8c0-1.2.3-1.8 1-1.8Z" /></svg>;
  if (type === "whatsapp") return <svg {...common}><path d="M20.5 3.5A11.7 11.7 0 0 0 12.1 0C5.6 0 .3 5.3.3 11.8c0 2.1.6 4.1 1.6 5.9L0 24l6.5-1.7c1.7.9 3.6 1.4 5.6 1.4h.1c6.5 0 11.8-5.3 11.8-11.8 0-3.2-1.2-6.1-3.5-8.4ZM12.2 21.7h-.1c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.9 1 1-3.8-.2-.4a9.7 9.7 0 1 1 8.6 4.8Zm5.3-7.3c-.3-.2-1.7-.9-2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-.9 1.2-.2.2-.3.2-.7.1-1.8-.9-3-1.7-4.2-3.8-.3-.6.3-.5.9-1.7.1-.2.1-.4 0-.6l-.9-2c-.2-.5-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.2-1.2 2.9s1.2 3.3 1.4 3.5c.2.2 2.4 3.7 5.9 5.2.8.4 1.5.6 2 .7.8.3 1.6.2 2.2.1.7-.1 1.7-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.4Z" /></svg>;
  if (type === "email") return <svg {...common}><path d="M3 4h18a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm0 3.2V18h18V7.2l-9 6-9-6ZM4.8 6 12 10.8 19.2 6H4.8Z" /></svg>;
  return null;
}

function getCountLabel(count, singular, plural) {
  return `${count} ${count === 1 ? singular : plural}`;
}

function getPortalMeta(portalId, portalContent, labels) {
  if (portalId === "energy") {
    return [
      getCountLabel(portalContent.primaryItems.length, labels.degree, labels.degrees),
      getCountLabel(portalContent.tertiaryItems.length, labels.project, labels.projects),
    ].join(" · ");
  }

  if (portalId === "volunteer") {
    const organizations = portalContent.primaryItems.length + portalContent.secondaryItems.length;
    return getCountLabel(organizations, labels.organization, labels.organizations);
  }

  if (portalId === "media") {
    return getCountLabel(portalContent.tertiaryItems.length, labels.focusArea, labels.focusAreas);
  }

  const services = portalContent.primaryItems.length + portalContent.secondaryItems.length;
  return getCountLabel(services, labels.serviceArea, labels.serviceAreas);
}

function PortalButton({ portal, title, meta, active, onOpen, index }) {
  return (
    <button
      type="button"
      className={`portal-choice ${portal.id === "energy" ? "portal-choice-featured" : ""} ${active ? "portal-choice-active" : ""}`}
      onClick={() => onOpen(portal.id)}
      aria-label={`${title}: ${meta}`}
      aria-pressed={active}
      style={{ "--accent": portal.accent, "--glow": portal.glow, "--sphere": portal.gradient, animationDelay: `${index * 110}ms` }}
    >
      <span className="sphere3d"><Object3D type={portal.id} /></span>
      <span className="portal-copy">
        <span className="portal-title">{title}</span>
        <span className="portal-meta">{meta}</span>
      </span>
    </button>
  );
}

function Modal({ type, text, onClose }) {
  if (!type) return null;
  const title = type === "overview" ? text.modals.overviewTitle : text.modals.aboutTitle;
  const body = type === "overview" ? text.modals.overviewText : text.modals.aboutText;
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="modal-title" onClick={onClose}>
      <div className="modal-card" onClick={(event) => event.stopPropagation()}>
        <button className="modal-close" type="button" onClick={onClose} aria-label={text.nav.close}>×</button>
        <p>{type === "overview" ? text.nav.overview : text.nav.about}</p>
        <h2 id="modal-title">{title}</h2>
        <span>{body}</span>
      </div>
    </div>
  );
}

function Topbar({ text, theme, language, setLanguage, toggleTheme, setModal, onBack, onContact, isSubpage, isArabic }) {
  return (
    <header className="topbar">
      <nav className="nav-left" aria-label={text.nav.primaryNavigation}>
        {isSubpage && <button type="button" className="back-button" onClick={onBack}>{isArabic ? "→" : "←"} {text.nav.back}</button>}
        <button type="button" onClick={() => setModal("overview")}>{text.nav.overview}</button>
        <button type="button" onClick={() => setModal("about")}>{text.nav.about}</button>
      </nav>
      <a className="brand" href="#top" aria-label={text.nav.home} onClick={onBack}>{text.nav.brandName}</a>
      <div className="nav-right">
        <button type="button" className="theme-toggle" onClick={toggleTheme} aria-label={text.nav.theme} title={theme === "dark" ? text.nav.switchLight : text.nav.switchDark}>
          <span className="theme-toggle-thumb" aria-hidden="true" />
          <span className="theme-toggle-icon" aria-hidden="true">{theme === "dark" ? "☾" : "☀"}</span>
        </button>
        <label className="language-select" aria-label={text.nav.language} title={languageNames[language]}>
          <select value={language} onChange={(event) => setLanguage(event.target.value)}>
            {Object.entries(languages).map(([code, label]) => <option key={code} value={code}>{label}</option>)}
          </select>
        </label>
        <button type="button" className="contact-button" onClick={onContact}>{text.nav.contact}</button>
      </div>
    </header>
  );
}

function GatewayHome({ activePortal, openPortal, text }) {
  return (
    <div className="gateway-content" id="top">
      <div className="portal-stage" aria-label={text.nav.portfolioFields}>
        {portals.map((portal, index) => {
          const portalContent = text.portals[portal.field];
          const meta = getPortalMeta(portal.id, portalContent, text.gatewayMeta);
          return <PortalButton key={portal.id} portal={portal} title={portalContent.title} meta={meta} active={activePortal === portal.id} onOpen={openPortal} index={index} />;
        })}
      </div>
      <div className="intro-copy"><p>{text.hero.intro}</p><h1>{text.hero.headline}</h1><span>{text.hero.subline}</span></div>
    </div>
  );
}

function TimelineItem({ item }) {
  return (
    <div className={`energy-item ${item.year ? "" : "energy-item-no-year"}`}>
      {item.year && <span className="energy-year">{item.year}</span>}
      <div><h2>{item.title}</h2><h3>{item.place}</h3><p>{item.text}</p></div>
    </div>
  );
}

function EnergyProjects({ items }) {
  return (
    <div className="energy-projects">
      {items.map((item) => {
        const body = <><strong>{item.name}{item.url && <ExternalGlyph />}</strong><span>{item.description}</span></>;
        return item.url ? (
          <a key={item.name} href={item.url} target="_blank" rel="noopener noreferrer" aria-label={`${item.name}: ${item.description}`}>{body}</a>
        ) : (
          <span key={item.name}>{body}</span>
        );
      })}
    </div>
  );
}

function GalleryItem({ item, language }) {
  const [loaded, setLoaded] = useState(false);
  const alt = item.alt?.[language] || "";
  const caption = item.caption?.[language] || "";
  const width = item.width || 1200;
  const height = item.height || 800;

  return (
    <figure className="media-gallery-item energy-card">
      {item.type === "video" ? (
        loaded ? (
          <video controls preload="metadata" poster={item.poster} width={width} height={height}>
            <source src={item.src} />
          </video>
        ) : (
          <button type="button" className="media-video-loader" onClick={() => setLoaded(true)} aria-label={caption || alt}>
            <img src={item.poster} alt={alt} loading="lazy" width={width} height={height} />
            <span aria-hidden="true">▶</span>
          </button>
        )
      ) : (
        <img src={item.src} alt={alt} loading="lazy" width={width} height={height} />
      )}
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

function MediaGallery({ language, label }) {
  if (!media.gallery.length) return null;
  return <section className="media-gallery" aria-label={label}>{media.gallery.map((item) => <GalleryItem key={`${item.type}-${item.src}`} item={item} language={language} />)}</section>;
}

function ProfilePage({ profile, language, detailsLabel }) {
  return (
    <div className="energy-page" id={profile.object}>
      <section className="energy-hero">
        <div><p>{profile.label}</p><h1>{profile.title}</h1><span>{profile.subtitle}</span></div>
        <div className="energy-hero-orb" aria-hidden="true"><span className="sphere3d energy-page-sphere"><Object3D type={profile.object} /></span></div>
      </section>
      <section className="energy-sections" aria-label={`${profile.title} — ${detailsLabel}`}>
        <article className="energy-card energy-card-wide"><p className="energy-card-label">{profile.primary}</p><div className="energy-timeline">{profile.primaryItems.map((item) => <TimelineItem key={`${item.year || "item"}-${item.title}`} item={item} />)}</div></article>
        <article className="energy-card"><p className="energy-card-label">{profile.secondary}</p><div className="energy-timeline compact">{profile.secondaryItems.map((item) => <TimelineItem key={`${item.year || "item"}-${item.title}`} item={item} />)}</div></article>
        <article className="energy-card"><p className="energy-card-label">{profile.tertiary}</p>{profile.object === "energy" ? <EnergyProjects items={profile.tertiaryItems} /> : <div className="energy-projects">{profile.tertiaryItems.map((item) => <span key={item}>{item}</span>)}</div>}</article>
      </section>
      {profile.object === "media" && <MediaGallery language={language} label={profile.galleryLabel} />}
    </div>
  );
}

function ContactPage({ text }) {
  return (
    <div className="contact-page" id="contact">
      <section className="contact-header" aria-labelledby="contact-title">
        <p>{text.contact.pageLabel}</p>
        <h1 id="contact-title">{text.contact.name}</h1>
        <h2>{text.contact.role}</h2>
        <span>{text.contact.invitation}</span>
      </section>
      <nav className="contact-link-tree" aria-label={text.contact.pageLabel}>
        {contactLinks.map((link) => {
          const subtitle = text.contact.subtitles[link.id];
          const isMail = link.url.startsWith("mailto:");
          return (
            <a
              key={link.id}
              className={`contact-link ${link.featured ? "contact-link-featured" : ""}`}
              href={link.url}
              target={isMail ? undefined : "_blank"}
              rel={isMail ? undefined : "noopener noreferrer"}
              aria-label={`${text.contact.ariaPrefix} ${link.name}: ${subtitle}`}
              style={{ "--brand-color": link.color }}
              data-platform={link.id}
            >
              <span className="contact-link-icon"><BrandIcon type={link.icon} /></span>
              <span className="contact-link-copy"><strong>{link.name}</strong><small>{subtitle}</small></span>
              <span className="contact-link-arrow" aria-hidden="true"><ExternalGlyph size={16} /></span>
            </a>
          );
        })}
      </nav>
    </div>
  );
}

export default function App() {
  const [theme, setTheme] = useState("light");
  const [language, setLanguage] = useState("en");
  const [activePortal, setActivePortal] = useState(null);
  const [modal, setModal] = useState(null);
  const [page, setPage] = useState(() => {
    const hash = window.location.hash.replace("#", "");
    return [...portals.map((portal) => portal.id), "contact"].includes(hash) ? hash : "home";
  });

  const text = content[language];
  const isArabic = language === "ar";
  const currentProfile = portals.some((portal) => portal.id === page) ? text.portals[page] : null;

  function openPage(id) {
    setPage(id);
    window.history.replaceState(null, "", `#${id}`);
  }

  function openPortal(id) {
    setActivePortal(id);
    openPage(id);
  }

  function goHome(event) {
    event?.preventDefault?.();
    setPage("home");
    setActivePortal(null);
    window.history.replaceState(null, "", window.location.pathname);
  }

  return (
    <main className="portfolio-gateway" data-theme={theme} dir={isArabic ? "rtl" : "ltr"}>
      <div className="ambient-bg" aria-hidden="true"><span /><span /><span /></div>
      <section className={`gateway-frame ${page !== "home" ? "gateway-frame-subpage" : ""}`} aria-label={text.nav.gateway}>
        <Topbar text={text} theme={theme} language={language} setLanguage={setLanguage} toggleTheme={() => setTheme((current) => (current === "dark" ? "light" : "dark"))} setModal={setModal} onBack={goHome} onContact={() => openPage("contact")} isSubpage={page !== "home"} isArabic={isArabic} />
        {page === "contact" ? <ContactPage text={text} /> : currentProfile ? <ProfilePage profile={currentProfile} language={language} detailsLabel={text.nav.portfolioDetails} /> : <GatewayHome activePortal={activePortal} openPortal={openPortal} text={text} />}
      </section>
      <Modal type={modal} text={text} onClose={() => setModal(null)} />
    </main>
  );
}
