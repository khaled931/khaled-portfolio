import React, { useMemo, useState } from "react";

const fields = [
  {
    id: "renewable-energy",
    title: "Renewable Energy",
    label: "Energy Intelligence",
    description:
      "Renewable energy systems, power market analysis, certificates, and data platforms for Syria, MENA, and Europe.",
    accent: "#BFEA4A",
    shadow: "rgba(191, 234, 74, 0.42)",
    gradient: "from-lime-200 via-emerald-200 to-cyan-200",
    object: "energy",
    cta: "Explore energy work",
    highlights: ["Syrian Renewables", "Granular Certificates", "Energy market analysis"],
  },
  {
    id: "visual-media",
    title: "Photography / Videography / Drone",
    label: "Visual Storytelling",
    description:
      "Photography, video, drone perspectives, and visual documentation for places, people, communities, and projects.",
    accent: "#B79CFF",
    shadow: "rgba(183, 156, 255, 0.44)",
    gradient: "from-violet-200 via-fuchsia-100 to-slate-100",
    object: "camera",
    cta: "View visual work",
    highlights: ["Photography", "Videography", "Drone content"],
  },
  {
    id: "volunteer-work",
    title: "Organized & Volunteer Work",
    label: "Community Impact",
    description:
      "Community initiatives, organized volunteer work, Syrian communities, Norway Now, and cross-cultural projects.",
    accent: "#2BCB8A",
    shadow: "rgba(43, 203, 138, 0.4)",
    gradient: "from-emerald-200 via-teal-100 to-white",
    object: "community",
    cta: "Open impact work",
    highlights: ["Norway Now", "Syrian community", "Volunteer coordination"],
  },
  {
    id: "digital-work",
    title: "Digital Marketing / Freelancing / Website Creation",
    label: "Digital Systems",
    description:
      "Websites, digital marketing, content systems, freelancing workflows, AI-assisted production, and practical web tools.",
    accent: "#FF7A4F",
    shadow: "rgba(255, 122, 79, 0.42)",
    gradient: "from-orange-200 via-rose-200 to-purple-200",
    object: "digital",
    cta: "See digital work",
    highlights: ["Website creation", "Digital marketing", "AI workflows"],
  },
];

function PortalObject({ type }) {
  if (type === "energy") {
    return (
      <div className="portal-object energy-object" aria-hidden="true">
        <span className="energy-core" />
        <span className="energy-ring energy-ring-a" />
        <span className="energy-ring energy-ring-b" />
        <span className="energy-blade energy-blade-a" />
        <span className="energy-blade energy-blade-b" />
        <span className="energy-blade energy-blade-c" />
      </div>
    );
  }

  if (type === "camera") {
    return (
      <div className="portal-object camera-object" aria-hidden="true">
        <span className="lens lens-back" />
        <span className="lens lens-main" />
        <span className="lens-glow" />
        <span className="drone-arm drone-arm-a" />
        <span className="drone-arm drone-arm-b" />
        <span className="drone-dot drone-dot-a" />
        <span className="drone-dot drone-dot-b" />
      </div>
    );
  }

  if (type === "community") {
    return (
      <div className="portal-object community-object" aria-hidden="true">
        <span className="community-orb community-main" />
        <span className="community-orb community-a" />
        <span className="community-orb community-b" />
        <span className="community-orb community-c" />
        <span className="community-line community-line-a" />
        <span className="community-line community-line-b" />
      </div>
    );
  }

  return (
    <div className="portal-object digital-object" aria-hidden="true">
      <span className="digital-shell" />
      <span className="digital-grid" />
      <span className="digital-stream digital-stream-a" />
      <span className="digital-stream digital-stream-b" />
      <span className="digital-cursor" />
    </div>
  );
}

function PortalButton({ field, isActive, index, onActivate }) {
  return (
    <button
      type="button"
      onClick={() => onActivate(field.id)}
      aria-pressed={isActive}
      className={`portal-button group ${isActive ? "portal-button-active" : ""}`}
      style={{
        "--accent": field.accent,
        "--glow": field.shadow,
        animationDelay: `${index * 120}ms`,
      }}
    >
      <span className={`portal-sphere bg-gradient-to-br ${field.gradient}`}>
        <PortalObject type={field.object} />
      </span>
      <span className="portal-label">
        <span className="portal-label-small">{field.label}</span>
        <span className="portal-label-title">{field.title}</span>
      </span>
    </button>
  );
}

function SelectedPanel({ field }) {
  return (
    <section id="selected-portal" className="selected-panel" aria-live="polite">
      <div>
        <p className="panel-eyebrow" style={{ color: field.accent }}>
          {field.label}
        </p>
        <h2>{field.title}</h2>
        <p>{field.description}</p>
      </div>

      <div className="panel-highlights">
        {field.highlights.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>

      <a href={`#${field.id}`} className="panel-link">
        {field.cta}
        <span aria-hidden="true">↗</span>
      </a>
    </section>
  );
}

function WorkSection({ field }) {
  return (
    <section id={field.id} className="work-section">
      <div className="work-section-marker" style={{ backgroundColor: field.accent, boxShadow: `0 0 44px ${field.shadow}` }} />
      <div>
        <p>{field.label}</p>
        <h3>{field.title}</h3>
        <span>{field.description}</span>
      </div>
      <div className="work-tags">
        {field.highlights.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
    </section>
  );
}

export default function App() {
  const [activeId, setActiveId] = useState(fields[0].id);
  const activeField = useMemo(() => fields.find((field) => field.id === activeId) || fields[0], [activeId]);

  function activatePortal(id) {
    setActiveId(id);
    window.history.replaceState(null, "", `#${id}`);

    window.setTimeout(() => {
      document.getElementById("selected-portal")?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 80);
  }

  return (
    <main className="portfolio-gateway">
      <div className="ambient-bg" aria-hidden="true">
        <span className="ambient-band ambient-band-a" />
        <span className="ambient-band ambient-band-b" />
        <span className="ambient-band ambient-band-c" />
      </div>

      <section className="gateway-frame" aria-label="Portfolio gateway">
        <header className="gateway-nav">
          <nav aria-label="Main navigation">
            <a href="#about">About</a>
            <a href="#work">Work</a>
          </nav>

          <a className="brand-mark" href="#top" aria-label="Jakob Olsen home">
            JO
          </a>

          <a className="contact-pill" href="mailto:jakoub.k.olsen@gmail.com">
            Contact
          </a>
        </header>

        <div className="gateway-content" id="top">
          <div className="intro-copy" id="about">
            <p>Welcome to my portfolio.</p>
            <h1>Choose a world to explore.</h1>
            <span>
              Renewable energy, visual storytelling, community work, and digital systems — presented as an interactive visual portal.
            </span>
          </div>

          <div className="portal-row" role="list" aria-label="Portfolio fields">
            {fields.map((field, index) => (
              <PortalButton
                key={field.id}
                field={field}
                index={index}
                isActive={field.id === activeId}
                onActivate={activatePortal}
              />
            ))}
          </div>
        </div>
      </section>

      <SelectedPanel field={activeField} />

      <section id="work" className="work-grid" aria-label="Portfolio work sections">
        {fields.map((field) => (
          <WorkSection key={field.id} field={field} />
        ))}
      </section>
    </main>
  );
}
