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
    back: "Back",
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
    back: "رجوع",
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
    back: "Tilbake",
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
    back: "Retour",
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

const energyContent = {
  en: {
    label: "Energy profile",
    title: "Renewable Energy",
    subtitle:
      "Education, market analysis experience, and data-driven energy projects across Norway, Europe, Syria, and MENA.",
    education: "Education",
    work: "Work",
    projects: "Projects",
    educationItems: [
      {
        year: "2021",
        title: "B.Sc. Renewable Energy Engineering",
        place: "NTNU — Norwegian University of Science and Technology",
        text: "Bachelor’s degree in Renewable Energy Engineering, completed in 2021.",
      },
      {
        year: "2026",
        title: "M.Sc. Renewable Energy Systems",
        place: "University of Oslo",
        text: "Master’s degree in Renewable Energy Systems, focused on renewable energy systems, policy analysis, and the economics of renewable energy markets.",
      },
    ],
    workItems: [
      {
        year: "2 years",
        title: "Renewable Energy Market & Policy Analysis",
        place: "EU renewable energy markets",
        text: "Two years of experience analyzing renewable energy markets and renewable energy policy in the European Union.",
      },
    ],
    projectItems: [
      "Syrian Renewables — renewable energy data and intelligence platform for Syria.",
      "Granular Certificates — knowledge platform for renewable energy certificates and market transparency.",
      "Energy data tools — trackers, dashboards, and structured datasets for energy analysis.",
    ],
  },
  ar: {
    label: "ملف الطاقة",
    title: "الطاقة المتجددة",
    subtitle:
      "التعليم، الخبرة العملية، ومشاريع البيانات والتحليل في الطاقة المتجددة بين النرويج، أوروبا، سورية، ومنطقة MENA.",
    education: "التعليم",
    work: "العمل والخبرة",
    projects: "المشاريع",
    educationItems: [
      {
        year: "2021",
        title: "بكالوريوس في هندسة الطاقة المتجددة",
        place: "جامعة NTNU النرويجية",
        text: "حاصل على بكالوريوس في هندسة الطاقة المتجددة من جامعة NTNU النرويجية، وأنهيته في عام 2021.",
      },
      {
        year: "2026",
        title: "ماجستير في أنظمة الطاقة المتجددة",
        place: "University of Oslo — جامعة أوسلو",
        text: "حاصل على ماجستير من جامعة أوسلو في أنظمة الطاقة المتجددة، مع تركيز على تحليل سياسات واقتصاديات أسواق الطاقة المتجددة، وأنهيته في عام 2026.",
      },
    ],
    workItems: [
      {
        year: "سنتان",
        title: "تحليل أسواق وسياسات الطاقة المتجددة",
        place: "أسواق الطاقة المتجددة في الاتحاد الأوروبي",
        text: "لدي خبرة سنتين في تحليل أسواق الطاقة المتجددة وسياسات الطاقة المتجددة في الاتحاد الأوروبي.",
      },
    ],
    projectItems: [
      "Syrian Renewables — منصة بيانات وتحليل لقطاع الطاقة المتجددة في سورية.",
      "Granular Certificates — منصة معرفية حول شهادات الطاقة المتجددة وشفافية الأسواق.",
      "Energy data tools — أدوات تتبع ولوحات بيانات ومجموعات بيانات مهيكلة لتحليل الطاقة.",
    ],
  },
  no: {
    label: "Energiprofil",
    title: "Fornybar energi",
    subtitle:
      "Utdanning, markedserfaring og datadrevne energiprosjekter på tvers av Norge, Europa, Syria og MENA.",
    education: "Utdanning",
    work: "Arbeid",
    projects: "Prosjekter",
    educationItems: [
      {
        year: "2021",
        title: "B.Sc. Fornybar energiteknikk",
        place: "NTNU — Norges teknisk-naturvitenskapelige universitet",
        text: "Bachelorgrad i fornybar energiteknikk, fullført i 2021.",
      },
      {
        year: "2026",
        title: "M.Sc. Renewable Energy Systems",
        place: "University of Oslo",
        text: "Mastergrad i fornybare energisystemer, med fokus på systemer, politisk analyse og økonomi i fornybare energimarkeder.",
      },
    ],
    workItems: [
      {
        year: "2 år",
        title: "Analyse av fornybare energimarkeder og politikk",
        place: "EUs fornybare energimarkeder",
        text: "To års erfaring med analyse av fornybare energimarkeder og fornybar energipolitikk i EU.",
      },
    ],
    projectItems: [
      "Syrian Renewables — data- og analyseplattform for fornybar energi i Syria.",
      "Granular Certificates — kunnskapsplattform for fornybare energisertifikater og markedstransparens.",
      "Energy data tools — sporere, dashboards og strukturerte datasett for energianalyse.",
    ],
  },
  fr: {
    label: "Profil énergie",
    title: "Énergies renouvelables",
    subtitle:
      "Formation, expérience en analyse de marché et projets de données énergétiques entre la Norvège, l’Europe, la Syrie et la région MENA.",
    education: "Formation",
    work: "Expérience",
    projects: "Projets",
    educationItems: [
      {
        year: "2021",
        title: "B.Sc. Ingénierie des énergies renouvelables",
        place: "NTNU — Norwegian University of Science and Technology",
        text: "Licence en ingénierie des énergies renouvelables, terminée en 2021.",
      },
      {
        year: "2026",
        title: "M.Sc. Renewable Energy Systems",
        place: "University of Oslo",
        text: "Master en systèmes d’énergies renouvelables, avec un focus sur les systèmes, l’analyse des politiques et l’économie des marchés renouvelables.",
      },
    ],
    workItems: [
      {
        year: "2 ans",
        title: "Analyse des marchés et politiques des énergies renouvelables",
        place: "Marchés renouvelables de l’Union européenne",
        text: "Deux ans d’expérience dans l’analyse des marchés des énergies renouvelables et des politiques renouvelables dans l’Union européenne.",
      },
    ],
    projectItems: [
      "Syrian Renewables — plateforme de données et d’intelligence pour les énergies renouvelables en Syrie.",
      "Granular Certificates — plateforme de connaissance sur les certificats d’énergie renouvelable et la transparence des marchés.",
      "Energy data tools — trackers, tableaux de bord et jeux de données structurés pour l’analyse énergétique.",
    ],
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

function Topbar({ text, theme, language, setLanguage, toggleTheme, setModal, onBack, isSubpage }) {
  return (
    <header className="topbar">
      <nav className="nav-left" aria-label="Primary navigation">
        {isSubpage && (
          <button type="button" className="back-button" onClick={onBack}>
            ← {text.back}
          </button>
        )}
        <button type="button" onClick={() => setModal("overview")}>{text.overview}</button>
        <button type="button" onClick={() => setModal("about")}>{text.about}</button>
      </nav>

      <a className="brand" href="#top" aria-label="Jakob Olsen home" onClick={onBack}>JO</a>

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
  );
}

function GatewayHome({ labels, activePortal, openPortal, text }) {
  return (
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
  );
}

function EnergyPage({ content }) {
  return (
    <div className="energy-page" id="energy">
      <section className="energy-hero">
        <div>
          <p>{content.label}</p>
          <h1>{content.title}</h1>
          <span>{content.subtitle}</span>
        </div>
        <div className="energy-hero-orb" aria-hidden="true">
          <span className="sphere3d energy-page-sphere">
            <Object3D type="energy" />
          </span>
        </div>
      </section>

      <section className="energy-sections" aria-label="Energy portfolio details">
        <article className="energy-card energy-card-wide">
          <p className="energy-card-label">{content.education}</p>
          <div className="energy-timeline">
            {content.educationItems.map((item) => (
              <div className="energy-item" key={`${item.year}-${item.title}`}>
                <span className="energy-year">{item.year}</span>
                <div>
                  <h2>{item.title}</h2>
                  <h3>{item.place}</h3>
                  <p>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="energy-card">
          <p className="energy-card-label">{content.work}</p>
          <div className="energy-timeline compact">
            {content.workItems.map((item) => (
              <div className="energy-item" key={`${item.year}-${item.title}`}>
                <span className="energy-year">{item.year}</span>
                <div>
                  <h2>{item.title}</h2>
                  <h3>{item.place}</h3>
                  <p>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="energy-card">
          <p className="energy-card-label">{content.projects}</p>
          <div className="energy-projects">
            {content.projectItems.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
}

export default function App() {
  const [theme, setTheme] = useState("light");
  const [language, setLanguage] = useState("en");
  const [activePortal, setActivePortal] = useState(null);
  const [modal, setModal] = useState(null);
  const [page, setPage] = useState(() => (window.location.hash === "#energy" ? "energy" : "home"));

  const text = copy[language];
  const labels = portalLabels[language];
  const energy = energyContent[language];
  const isArabic = language === "ar";

  function openPortal(id) {
    setActivePortal(id);

    if (id === "energy") {
      setPage("energy");
      window.history.replaceState(null, "", "#energy");
      return;
    }

    window.history.replaceState(null, "", `#${id}`);
  }

  function goHome(event) {
    event?.preventDefault?.();
    setPage("home");
    setActivePortal(null);
    window.history.replaceState(null, "", window.location.pathname);
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

      <section className={`gateway-frame ${page === "energy" ? "gateway-frame-subpage" : ""}`} aria-label="Interactive portfolio gateway">
        <Topbar
          text={text}
          theme={theme}
          language={language}
          setLanguage={setLanguage}
          toggleTheme={toggleTheme}
          setModal={setModal}
          onBack={goHome}
          isSubpage={page !== "home"}
        />

        {page === "energy" ? (
          <EnergyPage content={energy} />
        ) : (
          <GatewayHome labels={labels} activePortal={activePortal} openPortal={openPortal} text={text} />
        )}
      </section>

      <Modal type={modal} text={text} onClose={() => setModal(null)} />
    </main>
  );
}
