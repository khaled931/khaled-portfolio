import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { BriefcaseIcon } from "@phosphor-icons/react/dist/csr/Briefcase";
import { ChartBarIcon } from "@phosphor-icons/react/dist/csr/ChartBar";
import { UsersThreeIcon } from "@phosphor-icons/react/dist/csr/UsersThree";
import { GraduationCapIcon } from "@phosphor-icons/react/dist/csr/GraduationCap";
import { ArrowRightIcon } from "@phosphor-icons/react/dist/csr/ArrowRight";
import { ArrowLeftIcon } from "@phosphor-icons/react/dist/csr/ArrowLeft";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/csr/ArrowUpRight";
import { SunIcon } from "@phosphor-icons/react/dist/csr/Sun";
import { MoonIcon } from "@phosphor-icons/react/dist/csr/Moon";
import { ListIcon } from "@phosphor-icons/react/dist/csr/List";
import { XIcon } from "@phosphor-icons/react/dist/csr/X";
import { CaretDownIcon } from "@phosphor-icons/react/dist/csr/CaretDown";
import { CheckIcon } from "@phosphor-icons/react/dist/csr/Check";
import { PlayIcon } from "@phosphor-icons/react/dist/csr/Play";
import { CameraIcon } from "@phosphor-icons/react/dist/csr/Camera";
import { GlobeIcon } from "@phosphor-icons/react/dist/csr/Globe";
import { EnvelopeSimpleIcon } from "@phosphor-icons/react/dist/csr/EnvelopeSimple";
import { LinkedinLogoIcon } from "@phosphor-icons/react/dist/csr/LinkedinLogo";
import { YoutubeLogoIcon } from "@phosphor-icons/react/dist/csr/YoutubeLogo";
import { InstagramLogoIcon } from "@phosphor-icons/react/dist/csr/InstagramLogo";
import { TiktokLogoIcon } from "@phosphor-icons/react/dist/csr/TiktokLogo";
import { FacebookLogoIcon } from "@phosphor-icons/react/dist/csr/FacebookLogo";
import { WhatsappLogoIcon } from "@phosphor-icons/react/dist/csr/WhatsappLogo";
import { XLogoIcon } from "@phosphor-icons/react/dist/csr/XLogo";
import { LightningIcon } from "@phosphor-icons/react/dist/csr/Lightning";
import { CertificateIcon } from "@phosphor-icons/react/dist/csr/Certificate";
import HouseJourney from "./HouseJourney.jsx";
import { content, contactLinks } from "./content/index.js";
import { storyContent } from "./storyContent.js";
import { media } from "./mediaGallery.js";
import { galleryContent } from "./galleryContent.js";
import {
  roomIds,
  pageFromHash,
  languageIds,
  isPlainNavigation,
  nextRoom,
  readPreference,
  savePreference,
} from "./navigation.js";

const roomIcons = {
  experience: BriefcaseIcon,
  projects: ChartBarIcon,
  volunteering: UsersThreeIcon,
  education: GraduationCapIcon,
};
const brandIcons = {
  linkedin: LinkedinLogoIcon,
  certificate: CertificateIcon,
  energy: LightningIcon,
  x: XLogoIcon,
  youtube: YoutubeLogoIcon,
  instagram: InstagramLogoIcon,
  tiktok: TiktokLogoIcon,
  facebook: FacebookLogoIcon,
  whatsapp: WhatsappLogoIcon,
  email: EnvelopeSimpleIcon,
};
const languageNames = {
  en: "English",
  ar: "العربية",
  no: "Norsk",
  fr: "Français",
};
const photos = media.gallery.filter((item) => item.type === "image");
const artworkSizes = [480, 900, 1440];

function Icon({ icon: Component, ...props }) {
  return <Component size={22} weight="fill" aria-hidden="true" {...props} />;
}
function DirectionArrow({ rtl, back = false, ...props }) {
  return (
    <Icon icon={rtl !== back ? ArrowLeftIcon : ArrowRightIcon} {...props} />
  );
}

function Art({
  name,
  alt,
  className = "",
  priority = false,
  sizes = "(max-width: 760px) 100vw, 60vw",
  onError,
  onLoad,
}) {
  return (
    <img
      className={className}
      src={`/media/gallery/${name}-900.webp`}
      srcSet={artworkSizes
        .map((size) => `/media/gallery/${name}-${size}.webp ${size}w`)
        .join(", ")}
      sizes={sizes}
      width={name === "overview" ? 1536 : 1448}
      height={name === "overview" ? 1024 : 1086}
      alt={alt}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
      draggable={false}
      onError={onError}
      onLoad={onLoad}
    />
  );
}

function PageLink({ page, onNavigate, children, ...props }) {
  return (
    <a
      href={`#${page}`}
      onClick={(event) => {
        if (isPlainNavigation(event)) {
          event.preventDefault();
          onNavigate(page, event);
        }
      }}
      {...props}
    >
      {children}
    </a>
  );
}

function Modal({ children, label, onClose, className = "", onKeyDown }) {
  const ref = useRef(null);
  useEffect(() => {
    const previous = document.activeElement;
    const dialog = ref.current;
    dialog.showModal();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      const current = document.activeElement;
      dialog.close();
      document.body.style.overflow = overflow;
      // A menu destination has already focused its heading; preserve that focus.
      const target =
        current?.isConnected &&
        current !== document.body &&
        !dialog.contains(current)
          ? current
          : previous;
      if (target?.isConnected) target.focus({ preventScroll: true });
    };
  }, []);
  return (
    <dialog
      ref={ref}
      aria-label={label}
      className={`modal ${className}`}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === ref.current) onClose();
      }}
      onKeyDown={onKeyDown}
    >
      {children}
    </dialog>
  );
}

function Header({
  t,
  text,
  page,
  theme,
  language,
  setLanguage,
  toggleTheme,
  onNavigate,
  rtl,
}) {
  const [menu, setMenu] = useState(false);
  const navigate = (id, event) => {
    setMenu(false);
    onNavigate(id, event);
  };
  const labelFor = (id) => t.rooms[id] || t[id];
  return (
    <>
      <header className="site-header">
        <nav className="desktop-nav" aria-label={text.nav.primaryNavigation}>
          {["story", ...roomIds].map((id) => (
            <PageLink
              key={id}
              page={id}
              onNavigate={onNavigate}
              aria-current={page === id ? "page" : undefined}
            >
              {labelFor(id)}
            </PageLink>
          ))}
        </nav>
        <PageLink
          className="brand"
          page="gallery"
          onNavigate={onNavigate}
          aria-label={text.nav.home}
        >
          <strong dir="ltr">Jakob Olsen</strong>
          <span lang="ar" dir="rtl">
            خالد الأسعد
          </span>
        </PageLink>
        <div className="header-tools">
          <button
            className="theme-toggle"
            type="button"
            onClick={toggleTheme}
            aria-label={
              theme === "dark" ? text.nav.switchLight : text.nav.switchDark
            }
            aria-pressed={theme === "dark"}
          >
            <span>
              <Icon icon={theme === "dark" ? MoonIcon : SunIcon} size={16} />
            </span>
          </button>
          <label className="language-picker">
            <span className="sr-only">{text.nav.language}</span>
            <select
              value={language}
              onChange={(event) => setLanguage(event.target.value)}
            >
              {languageIds.map((id) => (
                <option key={id} value={id}>
                  {id.toUpperCase()} · {languageNames[id]}
                </option>
              ))}
            </select>
            <Icon icon={CaretDownIcon} size={12} />
          </label>
          <PageLink
            className="button header-contact"
            page="contact"
            onNavigate={onNavigate}
          >
            {text.nav.contact}
          </PageLink>
          <button
            className="icon-button menu-trigger"
            type="button"
            aria-label={t.menu}
            aria-haspopup="dialog"
            aria-expanded={menu}
            onClick={() => setMenu(true)}
          >
            <Icon icon={ListIcon} />
          </button>
        </div>
      </header>
      {menu && (
        <Modal
          label={text.nav.primaryNavigation}
          className="menu-modal"
          onClose={() => setMenu(false)}
        >
          <div className="modal-top">
            <span className="eyebrow">{t.allRooms}</span>
            <button
              className="icon-button"
              type="button"
              aria-label={t.closeMenu}
              onClick={() => setMenu(false)}
            >
              <Icon icon={XIcon} />
            </button>
          </div>
          <nav aria-label={text.nav.primaryNavigation}>
            <PageLink page="gallery" onNavigate={navigate}>
              <span>{t.overview}</span>
              <DirectionArrow rtl={rtl} />
            </PageLink>
            {roomIds.map((id, index) => (
              <PageLink
                key={id}
                page={id}
                onNavigate={navigate}
                aria-current={page === id ? "page" : undefined}
              >
                <span className="menu-number">0{index + 1}</span>
                <Icon icon={roomIcons[id]} />
                <span>{t.rooms[id]}</span>
                <DirectionArrow rtl={rtl} />
              </PageLink>
            ))}
            <div className="menu-secondary">
              {["story", "visuals", "digital", "contact"].map((id) => (
                <PageLink key={id} page={id} onNavigate={navigate}>
                  {labelFor(id)}
                  <Icon icon={ArrowUpRightIcon} size={18} mirrored={rtl} />
                </PageLink>
              ))}
            </div>
          </nav>
          <p className="menu-caption">
            {t.footer}
            <br />
            {t.based}
          </p>
        </Modal>
      )}
    </>
  );
}

function Dock({ t, page, visited, onNavigate }) {
  return (
    <nav className="room-dock" aria-label={t.allRooms}>
      {roomIds.map((id) => (
        <PageLink
          key={id}
          page={id}
          onNavigate={onNavigate}
          className={`dock-link ${page === id ? "active" : ""}`}
          aria-current={page === id ? "page" : undefined}
        >
          <span className="dock-icon">
            <Icon icon={roomIcons[id]} />
            {visited.has(id) && page !== id && (
              <Icon icon={CheckIcon} size={10} className="visited-dot" />
            )}
          </span>
          <span>{t.shortRooms[id]}</span>
        </PageLink>
      ))}
    </nav>
  );
}

function BeyondRooms({ t, onNavigate, rtl }) {
  return (
    <section className="beyond-rooms">
      <p className="eyebrow">{t.more}</p>
      <nav aria-label={t.more}>
        {["story", "visuals", "digital", "contact"].map((id) => (
          <PageLink key={id} page={id} onNavigate={onNavigate}>
            <span>{t[id]}</span>
            <DirectionArrow rtl={rtl} size={18} />
          </PageLink>
        ))}
      </nav>
    </section>
  );
}
function Breadcrumb({ t, page, onNavigate, rtl }) {
  return (
    <div className="breadcrumb">
      <PageLink page="gallery" onNavigate={onNavigate}>
        <DirectionArrow rtl={rtl} back size={17} />
        {t.overview}
      </PageLink>
      {roomIds.includes(page) && (
        <span>
          {t.room} <b dir="ltr">0{roomIds.indexOf(page) + 1}</b> {t.of}{" "}
          <b>04</b>
        </span>
      )}
    </div>
  );
}
function TimelineCard({ item, featured = false }) {
  return (
    <article className={`info-card ${featured ? "featured-card" : ""}`}>
      {item.year && (
        <span className="card-meta" dir="auto">
          {item.year}
        </span>
      )}
      <h2 dir="auto">{item.title}</h2>
      <p className="card-subtitle" dir="auto">
        {item.place}
      </p>
      <p>{item.text}</p>
    </article>
  );
}
function ExternalLink({ href, children, t, className = "button", rtl }) {
  return (
    <a
      className={className}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${children} · ${t.external}`}
    >
      {children}
      <Icon icon={ArrowUpRightIcon} size={18} mirrored={rtl} />
    </a>
  );
}

function RoomPage({ t, text, story, page, onNavigate, rtl }) {
  const energy = text.portals.energy;
  const community = text.portals.volunteer;
  const next = nextRoom(page);
  return (
    <section className={`room-layout room-${page}`}>
      <div className="room-hero" key={`${page}-art`}>
        <Art name={page} alt={t.roomAlt[page]} priority />
        <span className="room-hero-index" aria-hidden="true">
          0{roomIds.indexOf(page) + 1}
        </span>
        {page === "experience" && (
          <PageLink
            page={next}
            onNavigate={onNavigate}
            className="hero-next"
            aria-label={`${t.enter} · ${t.rooms[next]}`}
          >
            <DirectionArrow rtl={rtl} size={24} />
            <span className="hero-next-label">{t.rooms[next]}</span>
          </PageLink>
        )}
      </div>
      <div className="room-content route-enter" key={page}>
        <div className="room-heading">
          <p className="eyebrow">
            {t.room} 0{roomIds.indexOf(page) + 1}
          </p>
          <h1 id="page-title" tabIndex={-1}>
            {t.rooms[page]}
          </h1>
          <p>{t.descriptions[page]}</p>
        </div>
        {page === "experience" && (
          <>
            <article className="info-card featured-card">
              <h2 dir="ltr">Veyt</h2>
              <p className="card-subtitle">{t.role}</p>
              <p>{energy.secondaryItems[0].text}</p>
            </article>
          </>
        )}
        {page === "projects" && (
          <>
            {[story.work.items[1], story.work.items[0]].map((item, index) => (
              <article
                className={`info-card project-card ${index === 0 ? "featured-card" : ""}`}
                key={item.title}
              >
                {index === 0 ? (
                  <>
                    <span className="card-meta">{item.label}</span>
                    <h2 dir="ltr">{item.title}</h2>
                    <p>{item.text}</p>
                    <ExternalLink href={item.url} t={t} rtl={rtl}>
                      {t.openProject}
                    </ExternalLink>
                  </>
                ) : (
                  <a
                    className="secondary-project"
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${t.openProject}: ${item.title} · ${t.external}`}
                  >
                    <div className="secondary-project-copy">
                      <span className="card-meta">{item.label}</span>
                      <h2 dir="ltr">{item.title}</h2>
                      <p>{item.text}</p>
                    </div>
                    <Icon icon={ArrowUpRightIcon} size={22} mirrored={rtl} />
                  </a>
                )}
              </article>
            ))}
            <details className="disclosure">
              <summary>
                {story.work.items[2].title}
                <Icon icon={CaretDownIcon} size={17} />
              </summary>
              <p>{story.work.items[2].text}</p>
              <PageLink
                className="quiet-link"
                page="digital"
                onNavigate={onNavigate}
              >
                {t.digital}
                <DirectionArrow rtl={rtl} size={17} />
              </PageLink>
            </details>
          </>
        )}
        {page === "volunteering" && (
          <>
            <TimelineCard
              item={{
                ...community.primaryItems[1],
                year: community.primaryItems[1].year.replace(
                  "present",
                  t.present,
                ),
              }}
              featured
            />
            <TimelineCard item={community.primaryItems[0]} />
            {community.secondaryItems.map((item) => (
              <TimelineCard key={item.title} item={item} />
            ))}
            <details className="disclosure">
              <summary>
                {community.tertiary}
                <Icon icon={CaretDownIcon} size={17} />
              </summary>
              <ul>
                {community.tertiaryItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </details>
          </>
        )}
        {page === "education" && (
          <div className="degree-list">
            {[...energy.primaryItems].reverse().map((item) => (
              <TimelineCard
                key={item.year}
                item={item}
                featured={item.year === "2026"}
              />
            ))}
          </div>
        )}
        <PageLink
          page={next}
          onNavigate={onNavigate}
          className="button continue-button"
        >
          <span>
            {t.next} {t.rooms[next]}
          </span>
          <DirectionArrow rtl={rtl} size={20} />
        </PageLink>
        <PageLink
          page="gallery"
          onNavigate={onNavigate}
          className="quiet-link overview-return"
        >
          {t.backGallery}
          <DirectionArrow rtl={rtl} back size={17} />
        </PageLink>
        {page === "experience" && (
          <details className="disclosure">
            <summary>
              {t.focus}
              <Icon icon={CaretDownIcon} size={17} />
            </summary>
            <div className="focus-panel">
              <ul>
                {story.story.pillars.map((item) => (
                  <li key={item.id}>
                    <Icon icon={CheckIcon} size={16} />
                    {item.title}
                  </li>
                ))}
              </ul>
            </div>
          </details>
        )}
      </div>
    </section>
  );
}

function StoryPage({ t, story, onNavigate, rtl }) {
  return (
    <div className="editorial-page route-enter">
      <header className="editorial-heading">
        <p className="eyebrow">{t.journey}</p>
        <h1 id="page-title" tabIndex={-1}>
          {story.hero.headline}
        </h1>
        <p>{story.hero.lead}</p>
      </header>
      <div className="story-spread">
        <img
          src="/media/photography/coastal-island.webp"
          alt={story.hero.imageAlt}
          width="560"
          height="386"
        />
        <div>
          <span className="eyebrow">{story.story.eyebrow}</span>
          <h2>{story.story.title}</h2>
          <p>{story.story.body}</p>
          <div className="tags">
            {story.hero.chips.map((chip) => (
              <span key={chip}>{chip}</span>
            ))}
          </div>
        </div>
      </div>
      <ol className="journey-steps">
        {story.journey.steps.map((step, index) => (
          <li key={step.marker}>
            <span className="journey-index">0{index + 1}</span>
            <div>
              <span className="eyebrow">{step.marker}</span>
              <h2>{step.title}</h2>
              <p>{step.text}</p>
            </div>
          </li>
        ))}
      </ol>
      <BeyondRooms t={t} onNavigate={onNavigate} rtl={rtl} />
    </div>
  );
}

function DigitalPage({ t, profile }) {
  return (
    <div className="editorial-page route-enter">
      <header className="editorial-heading">
        <p className="eyebrow">{profile.label}</p>
        <h1 id="page-title" tabIndex={-1}>
          {t.digital}
        </h1>
        <p>{profile.subtitle}</p>
      </header>
      <div className="digital-columns">
        {[
          { title: profile.primary, items: profile.primaryItems },
          { title: profile.secondary, items: profile.secondaryItems },
        ].map((group) => (
          <section key={group.title}>
            <h2 className="section-title">{group.title}</h2>
            {group.items.map((item) => (
              <TimelineCard key={item.title} item={item} />
            ))}
          </section>
        ))}
      </div>
      <section className="focus-panel">
        <h2>{profile.tertiary}</h2>
        <ul>
          {profile.tertiaryItems.map((item) => (
            <li key={item}>
              <Icon icon={CheckIcon} size={16} />
              {item}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function PhotoViewer({
  index,
  setIndex,
  language,
  t,
  rtl,
  onClose,
  closeLabel,
}) {
  const item = photos[index];
  const move = (delta) =>
    setIndex((current) => (current + delta + photos.length) % photos.length);
  return (
    <Modal
      label={item.caption[language]}
      className="photo-modal"
      onClose={onClose}
      onKeyDown={(event) => {
        if (["ArrowRight", "ArrowLeft"].includes(event.key)) {
          event.preventDefault();
          move(event.key === "ArrowRight" ? (rtl ? -1 : 1) : rtl ? 1 : -1);
        }
      }}
    >
      <div className="modal-top">
        <span>
          {t.imageCount} <b>{index + 1}</b> / {photos.length}
        </span>
        <button
          className="icon-button"
          type="button"
          aria-label={closeLabel}
          onClick={onClose}
        >
          <Icon icon={XIcon} />
        </button>
      </div>
      <figure>
        <img
          src={item.src}
          alt={item.alt[language]}
          width={item.width}
          height={item.height}
        />
        <figcaption>{item.caption[language]}</figcaption>
      </figure>
      <div className="photo-controls">
        <button
          className="icon-button"
          type="button"
          aria-label={t.previousImage}
          onClick={() => move(-1)}
        >
          <DirectionArrow rtl={rtl} back />
        </button>
        <button
          className="icon-button"
          type="button"
          aria-label={t.nextImage}
          onClick={() => move(1)}
        >
          <DirectionArrow rtl={rtl} />
        </button>
      </div>
    </Modal>
  );
}

function VisualsPage({ t, text, story, language, rtl }) {
  const [photoIndex, setPhotoIndex] = useState(null);
  const video = media.gallery.find((item) => item.type === "youtube");
  return (
    <div className="editorial-page route-enter">
      <header className="editorial-heading">
        <p className="eyebrow">{story.visual.eyebrow}</p>
        <h1 id="page-title" tabIndex={-1}>
          {t.visuals}
        </h1>
        <p>{story.visual.text}</p>
      </header>
      <div className="photo-grid">
        {photos.map((item, index) => (
          <button
            key={item.id}
            className={`photo-item ${item.wide ? "wide" : ""}`}
            type="button"
            aria-label={`${t.enlarge}: ${item.caption[language]}`}
            onClick={() => setPhotoIndex(index)}
          >
            <img
              src={item.src}
              width={item.width}
              height={item.height}
              alt={item.alt[language]}
              loading="lazy"
            />
            <span>
              {item.caption[language]}
              <Icon icon={CameraIcon} size={18} />
            </span>
          </button>
        ))}
      </div>
      {video && (
        <a
          className="video-link"
          href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${t.video} · ${t.external}`}
        >
          <img
            src={video.poster}
            alt=""
            width="760"
            height="507"
            loading="lazy"
          />
          <span>
            <Icon icon={PlayIcon} size={30} />
            <strong>{t.video}</strong>
            <Icon icon={ArrowUpRightIcon} mirrored={rtl} />
          </span>
        </a>
      )}
      <div className="digital-columns visual-skills">
        {[
          ...text.portals.media.primaryItems,
          ...text.portals.media.secondaryItems,
        ].map((item) => (
          <TimelineCard
            key={item.title}
            item={{
              ...item,
              year: item.year === "Skill" ? t.skill : item.year,
            }}
          />
        ))}
      </div>
      {photoIndex !== null && (
        <PhotoViewer
          index={photoIndex}
          setIndex={setPhotoIndex}
          language={language}
          t={t}
          rtl={rtl}
          closeLabel={text.nav.close}
          onClose={() => setPhotoIndex(null)}
        />
      )}
    </div>
  );
}

function ContactPage({ t, text, rtl }) {
  const email = contactLinks.find((item) => item.id === "email");
  const linkedin = contactLinks.find((item) => item.id === "linkedin");
  return (
    <div className="editorial-page contact-page route-enter">
      <header className="editorial-heading">
        <p className="eyebrow">{t.based}</p>
        <h1 id="page-title" tabIndex={-1}>
          {t.contact}
        </h1>
        <p>{text.contact.invitation}</p>
      </header>
      <div className="contact-primary">
        <a className="button" href={email.url}>
          <Icon icon={EnvelopeSimpleIcon} />
          {t.email}
          <DirectionArrow rtl={rtl} size={18} />
        </a>
        <ExternalLink
          href={linkedin.url}
          className="button button-secondary"
          t={t}
          rtl={rtl}
        >
          {t.linkedin}
        </ExternalLink>
      </div>
      <nav className="contact-grid" aria-label={text.contact.pageLabel}>
        {contactLinks.map((item) => (
          <a
            href={item.url}
            key={item.id}
            target={item.url.startsWith("mailto:") ? undefined : "_blank"}
            rel={
              item.url.startsWith("mailto:") ? undefined : "noopener noreferrer"
            }
          >
            <span className="contact-icon">
              <Icon icon={brandIcons[item.icon] || GlobeIcon} />
            </span>
            <span>
              <strong>{item.name}</strong>
              <small>{text.contact.subtitles[item.id]}</small>
            </span>
            <Icon icon={ArrowUpRightIcon} size={18} mirrored={rtl} />
          </a>
        ))}
      </nav>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState(() => pageFromHash(window.location.hash));
  const [language, setLanguage] = useState(() =>
    readPreference(
      () => window.localStorage,
      "portfolio-language",
      languageIds,
      "en",
    ),
  );
  const [theme, setTheme] = useState(() =>
    readPreference(
      () => window.localStorage,
      "portfolio-theme",
      ["light", "dark"],
      "light",
    ),
  );
  const [visited, setVisited] = useState(
    () => new Set(roomIds.includes(page) ? [page] : []),
  );
  const didNavigate = useRef(false);
  const rtl = language === "ar";
  const text = content[language],
    story = storyContent[language],
    t = galleryContent[language];
  useEffect(() => {
    const sync = () => {
      didNavigate.current = true;
      setPage(pageFromHash(window.location.hash));
    };
    window.addEventListener("popstate", sync);
    window.addEventListener("hashchange", sync);
    return () => {
      window.removeEventListener("popstate", sync);
      window.removeEventListener("hashchange", sync);
    };
  }, []);
  useEffect(() => {
    document.documentElement.lang = language === "no" ? "nb" : language;
    document.documentElement.dir = rtl ? "rtl" : "ltr";
    document.documentElement.dataset.theme = theme;
    savePreference(() => window.localStorage, "portfolio-language", language);
    savePreference(() => window.localStorage, "portfolio-theme", theme);
  }, [language, theme, rtl]);
  useEffect(() => {
    document.title = `${t.rooms[page] || t[page] || t.overview} | Jakob Olsen · خالد الأسعد`;
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = theme === "light" ? "#f5f7f3" : "#0b242c";
  }, [page, language, theme, t]);
  useLayoutEffect(() => {
    if (roomIds.includes(page))
      setVisited((old) => (old.has(page) ? old : new Set([...old, page])));
    if (didNavigate.current) {
      window.scrollTo({ top: 0, behavior: "instant" });
      document.getElementById("page-title")?.focus({ preventScroll: true });
    }
  }, [page]);
  function navigate(id, event) {
    if (id === page) {
      if (id === "gallery") {
        window.scrollTo({ top: 0, behavior: "instant" });
        document.getElementById("page-title")?.focus({ preventScroll: true });
      }
      return;
    }
    didNavigate.current = true;
    try {
      window.history.pushState(null, "", `#${id}`);
    } catch {
      // Downloaded HTML previews can restrict History API writes on file URLs.
      window.location.hash = id;
    }
    setPage(id);
  }
  return (
    <div
      className="portfolio"
      data-page={page}
      data-theme={theme}
      dir={rtl ? "rtl" : "ltr"}
    >
      <a
        className="skip-link"
        href="#main-content"
        onClick={(event) => {
          event.preventDefault();
          document
            .getElementById(
              page === "gallery" ? "house-directory-title" : "page-title",
            )
            ?.focus();
        }}
      >
        {t.skip}
      </a>
      <div className="portfolio-frame">
        <Header
          t={t}
          text={text}
          page={page}
          theme={theme}
          language={language}
          setLanguage={setLanguage}
          toggleTheme={() =>
            setTheme((old) => (old === "light" ? "dark" : "light"))
          }
          onNavigate={navigate}
          rtl={rtl}
        />
        <main
          id="main-content"
          className={`main-content ${page === "gallery" ? "overview-page" : ""}`}
        >
          {page !== "gallery" && (
            <Breadcrumb t={t} page={page} onNavigate={navigate} rtl={rtl} />
          )}
          {page === "gallery" && (
            <HouseJourney
              language={language}
              theme={theme}
              t={t}
              onNavigate={navigate}
              visited={visited}
              rtl={rtl}
            />
          )}
          {roomIds.includes(page) && (
            <RoomPage
              t={t}
              text={text}
              story={story}
              page={page}
              onNavigate={navigate}
              rtl={rtl}
            />
          )}
          {page === "story" && (
            <StoryPage t={t} story={story} onNavigate={navigate} rtl={rtl} />
          )}
          {page === "digital" && (
            <DigitalPage t={t} profile={text.portals.digital} />
          )}
          {page === "visuals" && (
            <VisualsPage
              t={t}
              text={text}
              story={story}
              language={language}
              rtl={rtl}
            />
          )}
          {page === "contact" && <ContactPage t={t} text={text} rtl={rtl} />}
        </main>
        <footer className="site-footer">
          <span>
            Jakob Olsen <span lang="ar">· خالد الأسعد</span>
          </span>
          <span>{t.footer}</span>
          <PageLink page="contact" onNavigate={navigate}>
            {text.nav.contact}
            <Icon icon={ArrowUpRightIcon} size={15} mirrored={rtl} />
          </PageLink>
        </footer>
      </div>
      {page !== "gallery" && (
        <Dock t={t} page={page} visited={visited} onNavigate={navigate} />
      )}
      <div className="sr-only" role="status" aria-live="polite">
        {t.rooms[page] || t[page] || t.overview}
      </div>
    </div>
  );
}
