import React, { useEffect, useState } from "react";
import { contactLinks, content } from "./content/index.js";
import { media } from "./mediaGallery.js";
import { storyContent } from "./storyContent.js";

const languages = { en: "EN", ar: "AR", no: "NO", fr: "FR" };
const languageNames = { en: "English", ar: "العربية", no: "Norsk", fr: "Français" };
const profileIds = ["energy", "volunteer", "media", "digital"];

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

function ArrowGlyph({ isArabic = false }) {
  return <span aria-hidden="true">{isArabic ? "←" : "→"}</span>;
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
  if (type === "whatsapp") return <svg {...common}><path d="M20.5 3.5A11.7 11.7 0 0 0 12.1 0C5.6 0 .3 5.3.3 11.8c0 2.1.6 4.1 1.6 5.9L0 24l6.5-1.7c1.7.9 3.6 1.4 5.6 1.4h.1c6.5 0 11.8-5.3 11.8-11.8 0-3.2-1.2-6.1-3.5-8.4ZM12.2 21.7h-.1c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.9 1 1-3.8-.2-.4a9.7 9.7 0 1 1 8.6 4.8Z" /></svg>;
  if (type === "email") return <svg {...common}><path d="M3 4h18a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm0 3.2V18h18V7.2l-9 6-9-6ZM4.8 6 12 10.8 19.2 6H4.8Z" /></svg>;
  return null;
}

function Topbar({ text, story, theme, language, setLanguage, toggleTheme, onBack, onContact, onNavigate, isSubpage, isArabic }) {
  return (
    <header className="topbar story-topbar">
      <nav className="nav-left story-nav" aria-label={text.nav.primaryNavigation}>
        {isSubpage ? (
          <button type="button" className="back-button" onClick={onBack}>{isArabic ? "→" : "←"} {text.nav.back}</button>
        ) : (
          <>
            <button type="button" onClick={() => onNavigate("story")}>{story.nav.story}</button>
            <button type="button" onClick={() => onNavigate("work")}>{story.nav.work}</button>
            <button type="button" onClick={() => onNavigate("journey")}>{story.nav.journey}</button>
          </>
        )}
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

function StoryHome({ story, openPage, onNavigate, onContact, isArabic }) {
  return (
    <div className="story-home" id="top">
      <section className="story-hero" aria-labelledby="story-hero-title">
        <div className="story-hero-copy">
          <p className="story-eyebrow">{story.hero.kicker}</p>
          <h1 id="story-hero-title">{story.hero.headline}</h1>
          <p className="story-lead">{story.hero.lead}</p>
          <div className="story-actions">
            <button type="button" className="story-button story-button-primary" onClick={() => onNavigate("work")}>{story.hero.primaryCta} <ArrowGlyph isArabic={isArabic} /></button>
            <button type="button" className="story-button story-button-secondary" onClick={() => onNavigate("story")}>{story.hero.secondaryCta}</button>
          </div>
          <div className="story-chips" aria-label={story.hero.kicker}>{story.hero.chips.map((chip) => <span key={chip}>{chip}</span>)}</div>
        </div>
        <div className="story-hero-visual">
          <img src="/media/photography/coastal-island.webp" alt={story.hero.imageAlt} width="560" height="386" fetchPriority="high" />
          <div className="story-signal"><strong>{story.hero.signal}</strong><span>{story.hero.formula.join(" · ")}</span></div>
          <div className="story-formula" aria-hidden="true">{story.hero.formula.map((item, index) => <React.Fragment key={item}><span>{item}</span>{index < story.hero.formula.length - 1 && <b>+</b>}</React.Fragment>)}</div>
        </div>
      </section>

      <section className="story-section story-intro" id="story" aria-labelledby="story-title">
        <header className="story-section-heading">
          <p className="story-eyebrow">{story.story.eyebrow}</p>
          <h2 id="story-title">{story.story.title}</h2>
          <p>{story.story.body}</p>
        </header>
        <div className="story-pillars">
          {story.story.pillars.map((pillar) => (
            <button type="button" className={`story-pillar story-pillar-${pillar.id}`} key={pillar.id} onClick={() => openPage(pillar.id)}>
              <span className="story-pillar-number">{pillar.number}</span>
              <span className="story-pillar-icon"><Object3D type={pillar.id} /></span>
              <strong>{pillar.title}</strong>
              <p>{pillar.text}</p>
              <span className="story-text-link">{pillar.action} <ArrowGlyph isArabic={isArabic} /></span>
            </button>
          ))}
        </div>
      </section>

      <section className="story-section selected-work" id="work" aria-labelledby="work-title">
        <header className="story-section-heading story-heading-row">
          <div><p className="story-eyebrow">{story.work.eyebrow}</p><h2 id="work-title">{story.work.title}</h2></div>
          <p>{story.work.description}</p>
        </header>
        <div className="work-grid">
          {story.work.items.map((item, index) => {
            const body = <><span className="work-index">0{index + 1}</span><span className="work-label">{item.label}</span><h3>{item.title}</h3><p>{item.text}</p><span className="story-text-link">{item.action} {item.url ? <ExternalGlyph /> : <ArrowGlyph isArabic={isArabic} />}</span></>;
            return item.url ? (
              <a className={`work-card work-card-${item.tone}`} key={item.title} href={item.url} target="_blank" rel="noopener noreferrer">{body}</a>
            ) : (
              <button type="button" className={`work-card work-card-${item.tone}`} key={item.title} onClick={() => openPage(item.target)}>{body}</button>
            );
          })}
        </div>
      </section>

      <section className="story-section journey-section" id="journey" aria-labelledby="journey-title">
        <header className="story-section-heading journey-heading">
          <p className="story-eyebrow">{story.journey.eyebrow}</p>
          <h2 id="journey-title">{story.journey.title}</h2>
          <p>{story.journey.intro}</p>
        </header>
        <div className="journey-line">
          {story.journey.steps.map((step, index) => <article className="journey-step" key={step.marker}><span className="journey-marker">{index + 1}</span><p>{step.marker}</p><h3>{step.title}</h3><span>{step.text}</span></article>)}
        </div>
      </section>

      <section className="impact-strip" aria-label={story.impact.label}>
        <p>{story.impact.label}</p>
        <div>{story.impact.items.map((item) => <span className="impact-item" key={item.label}><strong>{item.value}</strong><small>{item.label}</small></span>)}</div>
      </section>

      <section className="story-section visual-story" id="visuals" aria-labelledby="visual-title">
        <div className="visual-copy">
          <p className="story-eyebrow">{story.visual.eyebrow}</p>
          <h2 id="visual-title">{story.visual.title}</h2>
          <p>{story.visual.text}</p>
          <button type="button" className="story-button story-button-dark" onClick={() => openPage("media")}>{story.visual.action} <ArrowGlyph isArabic={isArabic} /></button>
        </div>
        <div className="visual-mosaic">
          <img className="visual-wide" src="/media/photography/emerald-beach.webp" alt={story.visual.imageAlt[0]} loading="lazy" width="500" height="198" />
          <img src="/media/photography/autumn-lake.webp" alt={story.visual.imageAlt[1]} loading="lazy" width="280" height="266" />
          <img src="/media/photography/drone-sunset.webp" alt={story.visual.imageAlt[2]} loading="lazy" width="760" height="507" />
        </div>
      </section>

      <section className="story-closing" aria-labelledby="closing-title">
        <div><p className="story-eyebrow">{story.closing.eyebrow}</p><h2 id="closing-title">{story.closing.title}</h2><span>{story.closing.text}</span></div>
        <button type="button" className="story-button story-button-lime" onClick={onContact}>{story.closing.action} <ArrowGlyph isArabic={isArabic} /></button>
      </section>
      <footer className="story-footer"><strong>Jakob Olsen</strong><span>Energy · Data · Communication</span></footer>
    </div>
  );
}

function TimelineItem({ item }) {
  return <div className={`energy-item ${item.year ? "" : "energy-item-no-year"}`}>{item.year && <span className="energy-year">{item.year}</span>}<div><h2>{item.title}</h2><h3>{item.place}</h3><p>{item.text}</p></div></div>;
}

function EnergyProjects({ items }) {
  return <div className="energy-projects">{items.map((item) => { const body = <><strong>{item.name}{item.url && <ExternalGlyph />}</strong><span>{item.description}</span></>; return item.url ? <a key={item.name} href={item.url} target="_blank" rel="noopener noreferrer" aria-label={`${item.name}: ${item.description}`}>{body}</a> : <span key={item.name}>{body}</span>; })}</div>;
}

function GalleryItem({ item, language }) {
  const [loaded, setLoaded] = useState(false);
  const alt = item.alt?.[language] || "";
  const caption = item.caption?.[language] || "";
  const width = item.width || 1200;
  const height = item.height || 800;
  const className = ["media-gallery-item", "energy-card", item.wide ? "media-gallery-item-wide" : "", item.portrait ? "media-gallery-item-portrait" : ""].filter(Boolean).join(" ");

  return (
    <figure className={className}>
      {item.type === "youtube" ? (
        loaded ? (
          <iframe src={`https://www.youtube-nocookie.com/embed/${item.youtubeId}?rel=0`} title={caption || alt} width={width} height={height} loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
        ) : (
          <button type="button" className="media-video-loader" onClick={() => setLoaded(true)} aria-label={caption || alt}>
            <img src={item.poster} alt={alt} loading="lazy" decoding="async" width={width} height={height} /><span aria-hidden="true">▶</span>
          </button>
        )
      ) : item.type === "video" ? (
        <video controls preload="metadata" poster={item.poster} width={width} height={height}><source src={item.src} /></video>
      ) : (
        <img src={item.src} alt={alt} loading="lazy" decoding="async" width={width} height={height} />
      )}
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

function MediaGallery({ language, label }) {
  if (!media.gallery.length) return null;
  return <section className="media-gallery" aria-label={label}>{media.gallery.map((item) => <GalleryItem key={item.id} item={item} language={language} />)}</section>;
}

function ProfilePage({ profile, language, detailsLabel }) {
  return (
    <div className="energy-page" id={profile.object}>
      <section className="energy-hero"><div><p>{profile.label}</p><h1>{profile.title}</h1><span>{profile.subtitle}</span></div><div className="energy-hero-orb" aria-hidden="true"><span className="sphere3d energy-page-sphere"><Object3D type={profile.object} /></span></div></section>
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
      <section className="contact-header" aria-labelledby="contact-title"><p>{text.contact.pageLabel}</p><h1 id="contact-title">{text.contact.name}</h1><h2>{text.contact.role}</h2><span>{text.contact.invitation}</span></section>
      <nav className="contact-link-tree" aria-label={text.contact.pageLabel}>
        {contactLinks.map((link) => { const subtitle = text.contact.subtitles[link.id]; const isMail = link.url.startsWith("mailto:"); return <a key={link.id} className={`contact-link ${link.featured ? "contact-link-featured" : ""}`} href={link.url} target={isMail ? undefined : "_blank"} rel={isMail ? undefined : "noopener noreferrer"} aria-label={`${text.contact.ariaPrefix} ${link.name}: ${subtitle}`} style={{ "--brand-color": link.color }} data-platform={link.id}><span className="contact-link-icon"><BrandIcon type={link.icon} /></span><span className="contact-link-copy"><strong>{link.name}</strong><small>{subtitle}</small></span><span className="contact-link-arrow" aria-hidden="true"><ExternalGlyph size={16} /></span></a>; })}
      </nav>
    </div>
  );
}

export default function App() {
  const [theme, setTheme] = useState("light");
  const [language, setLanguage] = useState("en");
  const [page, setPage] = useState(() => {
    const hash = window.location.hash.replace("#", "");
    return [...profileIds, "contact"].includes(hash) ? hash : "home";
  });

  const text = content[language];
  const story = storyContent[language];
  const isArabic = language === "ar";
  const currentProfile = profileIds.includes(page) ? text.portals[page] : null;

  useEffect(() => {
    document.documentElement.lang = language === "no" ? "nb" : language;
    document.documentElement.dir = isArabic ? "rtl" : "ltr";
  }, [language, isArabic]);

  function openPage(id) {
    setPage(id);
    window.history.replaceState(null, "", `#${id}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function goHome(event) {
    event?.preventDefault?.();
    setPage("home");
    window.history.replaceState(null, "", window.location.pathname);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function navigateHomeSection(id) {
    if (page !== "home") {
      setPage("home");
      window.history.replaceState(null, "", window.location.pathname);
      window.requestAnimationFrame(() => window.requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })));
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <main className="portfolio-gateway story-layout" data-theme={theme} dir={isArabic ? "rtl" : "ltr"}>
      <div className="ambient-bg" aria-hidden="true"><span /><span /><span /></div>
      <section className={`gateway-frame ${page !== "home" ? "gateway-frame-subpage" : "story-frame"}`} aria-label={text.nav.gateway}>
        <Topbar text={text} story={story} theme={theme} language={language} setLanguage={setLanguage} toggleTheme={() => setTheme((current) => current === "dark" ? "light" : "dark")} onBack={goHome} onContact={() => openPage("contact")} onNavigate={navigateHomeSection} isSubpage={page !== "home"} isArabic={isArabic} />
        {page === "contact" ? <ContactPage text={text} /> : currentProfile ? <ProfilePage profile={currentProfile} language={language} detailsLabel={text.nav.portfolioDetails} /> : <StoryHome story={story} openPage={openPage} onNavigate={navigateHomeSection} onContact={() => openPage("contact")} isArabic={isArabic} />}
      </section>
    </main>
  );
}
