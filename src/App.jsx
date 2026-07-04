import React, { useMemo, useState } from "react";

const languages = {
  en: "EN",
  ar: "AR",
  no: "NO",
  fr: "FR",
};

const languageNames = {
  en: "English",
  ar: "العربية",
  no: "Norsk",
  fr: "Français",
};

const copy = {
  en: {
    overview: "Overview",
    about: "About",
    contact: "Contact",
    theme: "Theme",
    language: "Language",
    intro: "Interactive portfolio portal",
    headline: "Choose a professional world to explore.",
    subline:
      "A minimal, immersive gateway into my work across energy, visual storytelling, community work, and digital systems.",
    overviewTitle: "Quick overview",
    overviewText:
      "I am Jakob Olsen, a Syrian–Norwegian renewable energy and data analyst based in Oslo. My work connects energy markets, data platforms, visual content, communities, and practical digital execution.",
    aboutTitle: "About Jakob",
    aboutText:
      "My portfolio brings together renewable energy analysis, photography and drone work, organized volunteer initiatives, digital marketing, freelancing, and website creation.",
  },
  ar: {
    overview: "نظرة عامة",
    about: "حول",
    contact: "تواصل",
    theme: "الوضع",
    language: "اللغة",
    intro: "بوابة بورتفوليو تفاعلية",
    headline: "اختر عالماً مهنياً للاستكشاف.",
    subline:
      "واجهة بسيطة وغامرة تعرض مجالات عملي في الطاقة، التصوير، العمل المجتمعي، والأنظمة الرقمية.",
    overviewTitle: "نظرة عامة سريعة",
    overviewText:
      "أنا Jakob Olsen، محلل طاقة متجددة وبيانات سوري–نرويجي مقيم في أوسلو. يربط عملي بين أسواق الطاقة، منصات البيانات، المحتوى البصري، المجتمع، والتنفيذ الرقمي العملي.",
    aboutTitle: "حول Jakob",
    aboutText:
      "يجمع هذا البورتفوليو بين تحليل الطاقة المتجددة، التصوير والفيديو والدرون، المبادرات التطوعية المنظمة، التسويق الرقمي، الفريلانس، وإنشاء المواقع.",
  },
  no: {
    overview: "Oversikt",
    about: "Om",
    contact: "Kontakt",
    theme: "Tema",
    language: "Språk",
    intro: "Interaktiv porteføljeportal",
    headline: "Velg en profesjonell verden å utforske.",
    subline:
      "En enkel og visuell inngang til mitt arbeid innen energi, foto, frivillighet og digitale systemer.",
    overviewTitle: "Kort oversikt",
    overviewText:
      "Jeg er Jakob Olsen, en syrisk-norsk analytiker innen fornybar energi og data, basert i Oslo. Arbeidet mitt kobler energimarkeder, dataplattformer, visuelt innhold, samfunn og digital gjennomføring.",
    aboutTitle: "Om Jakob",
    aboutText:
      "Porteføljen samler fornybar energianalyse, foto og drone, organisert frivillig arbeid, digital markedsføring, frilansarbeid og nettsideutvikling.",
  },
  fr: {
    overview: "Aperçu",
    about: "À propos",
    contact: "Contact",
    theme: "Mode",
    language: "Langue",
    intro: "Portail interactif de portfolio",
    headline: "Choisissez un univers professionnel à explorer.",
    subline:
      "Une porte d’entrée minimaliste vers mon travail dans l’énergie, l’image, l’engagement communautaire et les systèmes numériques.",
    overviewTitle: "Aperçu rapide",
    overviewText:
      "Je suis Jakob Olsen, analyste syro-norvégien en énergies renouvelables et données, basé à Oslo. Mon travail relie les marchés de l’énergie, les plateformes de données, le contenu visuel, les communautés et l’exécution digitale.",
    aboutTitle: "À propos de Jakob",
    aboutText:
      "Ce portfolio réunit l’analyse des énergies renouvelables, la photographie, la vidéo, le drone, le bénévolat organisé, le marketing digital, le freelancing et la création de sites web.",
  },
};

const portalLabels = {
  en: {
    energy: "Renewable Energy",
    media: "Photography / Videography / Drone",
    volunteer: "Organized & Volunteer Work",
    digital: "Digital Marketing / Freelancing / Website Creation",
  },
  ar: {
    energy: "الطاقة المتجددة",
    media: "التصوير / الفيديو / الدرون",
    volunteer: "المنظمات والعمل التطوعي",
    digital: "التسويق الرقمي / الفريلانس / إنشاء المواقع",
  },
  no: {
    energy: "Fornybar energi",
    media: "Foto / video / drone",
    volunteer: "Organisert og frivillig arbeid",
    digital: "Digital markedsføring / frilans / nettsider",
  },
  fr: {
    energy: "Énergies renouvelables",
    media: "Photo / vidéo / drone",
    volunteer: "Organisations et bénévolat",
    digital: "Marketing digital / freelance / sites web",
  },
};

const portals = [
  {
    id: "energy",
    field: "energy",
    accent: "#CFFF3E",
    glow: "rgba(207, 255, 62, 0.45)",
    gradient: "linear-gradient(135deg, #E8FFD5 0%, #9BE8D9 70%, #78C7FF 100%)",
  },
  {
    id: "media",
    field: "media",
    accent: "#B79CFF",
    glow: "rgba(183, 156, 255, 0.42)",
    gradient: "linear-gradient(135deg, #F3ECFF 0%, #DED3FF 58%, #D4F7FF 100%)",
  },
  {
    id: "volunteer",
    field: "volunteer",
    accent: "#36D99F",
    glow: "rgba(54, 217, 159, 0.42)",
    gradient: "linear-gradient(135deg, #D8FFF0 0%, #B5F7E7 60%, #E8FFF8 100%)",
  },
  {
    id: "digital",
    field: "digital",
    accent: "#FF7A4F",
    glow: "rgba(255, 122, 79, 0.43)",
    gradient: "linear-gradient(135deg, #FFE2D2 0%, #FFBCA5 38%, #8F42FF 100%)",
  },
];

function Object3D({ type }) {
  return (
    <span className={`object3d object-${type}`} aria-hidden="true">
      {type === "energy" && (
        <>
          <span className="energy-bolt" />
          <span className="turbine-mast" />
          <span className="turbine-hub" />
          <span className="turbine-blade blade-a" />
          <span className="turbine-blade blade-b" />
          <span className="turbine-blade blade-c" />
          <span className="energy-orbit orbit-a" />
          <span className="energy-orbit orbit-b" />
        </>
      )}

      {type === "media" && (
        <>
          <span className="camera-body" />
          <span className="camera-top" />
          <span className="camera-lens" />
          <span className="camera-glass" />
          <span className="drone-wing wing-a" />
          <span className="drone-wing wing-b" />
          <span className="drone-rotor rotor-a" />
          <span className="drone-rotor rotor-b" />
        </>
      )}

      {type === "volunteer" && (
        <>
          <span className="org-base" />
          <span className="org-roof" />
          <span className="org-column column-a" />
          <span className="org-column column-b" />
          <span className="org-column column-c" />
          <span className="org-node node-a" />
          <span className="org-node node-b" />
          <span className="org-node node-c" />
        </>
      )}

      {type === "digital" && (
        <>
          <span className="digital-window" />
          <span className="digital-grid" />
          <span className="digital-bar bar-a" />
          <span className="digital-bar bar-b" />
          <span className="digital-cursor" />
          <span className="digital-spark spark-a" />
          <span className="digital-spark spark-b" />
        </>
      )}
    </span>
  );
}

function PortalButton({ portal, title, active, onOpen, index }) {
  return (
    <button
      type="button"
      className={`portal-choice ${active ? "portal-choice-active" : ""}`}
      onClick={() => onOpen(portal.id)}
      aria-label={title}
      aria-pressed={active}
      style={{
        "--accent": portal.accent,
        "--glow": portal.glow,
        "--sphere": portal.gradient,
        animationDelay: `${index * 110}ms`,
      }}
    >
      <span className="sphere3d">
        <Object3D type={portal.id} />
      </span>
      <span className="portal-title">{title}</span>
    </button>
  );
}

function Modal({ type, text, onClose }) {
  if (!type) return null;

  const title = type === "overview" ? text.overviewTitle : text.aboutTitle;
  const body = type === "overview" ? text.overviewText : text.aboutText;

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="modal-title" onClick={onClose}>
      <div className="modal-card" onClick={(event) => event.stopPropagation()}>
        <button className="modal-close" type="button" onClick={onClose} aria-label="Close">
          ×
        </button>
        <p>{type === "overview" ? text.overview : text.about}</p>
        <h2 id="modal-title">{title}</h2>
        <span>{body}</span>
      </div>
    </div>
  );
}

export default function App() {
  const [theme, setTheme] = useState("dark");
  const [language, setLanguage] = useState("en");
  const [activePortal, setActivePortal] = useState(null);
  const [modal, setModal] = useState(null);

  const text = copy[language];
  const labels = portalLabels[language];
  const isArabic = language === "ar";

  function openPortal(id) {
    setActivePortal(id);
    window.history.replaceState(null, "", `#${id}`);
  }

  function toggleTheme() {
    setTheme((current) => (current === "dark" ? "light" : "dark"));
  }

  return (
    <main className="portfolio-gateway" data-theme={theme} dir={isArabic ? "rtl" : "ltr"}>
      <div className="ambient-bg" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      <section className="gateway-frame" aria-label="Interactive portfolio gateway">
        <header className="topbar">
          <nav className="nav-left" aria-label="Primary navigation">
            <button type="button" onClick={() => setModal("overview")}>{text.overview}</button>
            <button type="button" onClick={() => setModal("about")}>{text.about}</button>
          </nav>

          <a className="brand" href="#top" aria-label="Jakob Olsen home">JO</a>

          <div className="nav-right">
            <button
              type="button"
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={text.theme}
              title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              <span className="theme-toggle-thumb" aria-hidden="true" />
              <span className="theme-toggle-icon" aria-hidden="true">{theme === "dark" ? "☾" : "☀"}</span>
            </button>

            <label className="language-select" aria-label={text.language} title={languageNames[language]}>
              <select value={language} onChange={(event) => setLanguage(event.target.value)}>
                {Object.entries(languages).map(([code, label]) => (
                  <option key={code} value={code}>{label}</option>
                ))}
              </select>
            </label>

            <a className="contact-button" href="mailto:jakoub.k.olsen@gmail.com">{text.contact}</a>
          </div>
        </header>

        <div className="gateway-content" id="top">
          <div className="portal-stage" aria-label="Portfolio fields">
            {portals.map((portal, index) => (
              <PortalButton
                key={portal.id}
                portal={portal}
                title={labels[portal.field]}
                active={activePortal === portal.id}
                onOpen={openPortal}
                index={index}
              />
            ))}
          </div>

          <div className="intro-copy">
            <p>{text.intro}</p>
            <h1>{text.headline}</h1>
            <span>{text.subline}</span>
          </div>
        </div>
      </section>

      <Modal type={modal} text={text} onClose={() => setModal(null)} />
    </main>
  );
}
