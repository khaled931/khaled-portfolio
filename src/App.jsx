import React, { useMemo, useState } from "react";

const profile = {
  name: "Jakob Olsen",
  legalName: "Khaled Alassad (Jakob)",
  title: "Renewable Energy & Data Intelligence",
  location: "Oslo, Norway",
  email: "jakoub.k.olsen@gmail.com",
  linkedin: "https://www.linkedin.com/in/jakob-k-olsen",
  github: "https://github.com/khaled931",
};

const countries = [
  {
    id: "syria",
    country: "Syria",
    city: "Damascus / National scope",
    label: "Syrian Renewables",
    headline: "A renewable energy data platform for Syria.",
    summary:
      "A practical platform tracking renewable energy projects, policies, tenders, fuel prices, EV charging infrastructure, and energy market signals in Syria.",
    url: "https://syrianrenewables.com",
    position: { x: 67, y: 62 },
    markerClass: "bg-[#F2B84B] shadow-[0_0_32px_rgba(242,184,75,0.55)]",
    ringClass: "ring-[#F2B84B]/30",
    textClass: "text-[#F2B84B]",
    gradient: "from-[#F2B84B]/20 to-[#217A8D]/10",
    achievements: [
      "Built Syria’s renewable energy data and analysis platform.",
      "Created project, policy, tender, fuel price, and EV charging trackers.",
      "Published energy reports and structured datasets for decision-makers.",
    ],
    metrics: ["Energy platform", "Data trackers", "Policy & market analysis"],
  },
  {
    id: "norway",
    country: "Norway",
    city: "Oslo",
    label: "M.Sc. Renewable Energy Systems",
    headline: "Academic foundation and Nordic energy market perspective.",
    summary:
      "Graduate studies at the University of Oslo focused on renewable energy systems, energy markets, Guarantees of Origin, and data-driven energy transition analysis.",
    url: "https://www.uio.no/english/",
    position: { x: 38, y: 20 },
    markerClass: "bg-[#3A9D5D] shadow-[0_0_32px_rgba(58,157,93,0.55)]",
    ringClass: "ring-[#3A9D5D]/30",
    textClass: "text-[#3A9D5D]",
    gradient: "from-[#3A9D5D]/20 to-[#217A8D]/10",
    achievements: [
      "Completed M.Sc. in Renewable Energy Systems at the University of Oslo.",
      "Developed analytical focus on renewable energy markets and certificates.",
      "Connected Nordic energy-market thinking with MENA transition challenges.",
    ],
    metrics: ["M.Sc. UiO", "Nordic lens", "Market analysis"],
  },
  {
    id: "morocco",
    country: "Morocco",
    city: "Rabat / Casablanca / MENA scope",
    label: "Renewable Energy Certificates",
    headline: "A knowledge platform around renewable energy certificates.",
    summary:
      "A focused knowledge initiative explaining renewable energy certificates, Guarantees of Origin, I-REC, REGO, and granular certificate systems for cleaner procurement.",
    url: "https://granularcertificates.com",
    position: { x: 28, y: 70 },
    markerClass: "bg-[#217A8D] shadow-[0_0_32px_rgba(33,122,141,0.55)]",
    ringClass: "ring-[#217A8D]/30",
    textClass: "text-[#217A8D]",
    gradient: "from-[#217A8D]/20 to-[#F2B84B]/10",
    achievements: [
      "Created a dedicated platform for renewable energy certificate literacy.",
      "Explained GO, I-REC, REGO, and granular certificate market concepts.",
      "Positioned certificate transparency as a bridge between policy and markets.",
    ],
    metrics: ["Certificates", "GO / I-REC", "Market transparency"],
  },
];

const featuredProjects = [
  {
    title: "Syrian Renewables",
    geography: "Syria",
    url: "https://syrianrenewables.com",
    description:
      "A data platform for Syria’s renewable energy sector, tracking projects, policies, market opportunities, and energy indicators.",
    tags: ["Energy data", "Syria", "Dashboards"],
  },
  {
    title: "Granular Certificates",
    geography: "Morocco / MENA",
    url: "https://granularcertificates.com",
    description:
      "A knowledge platform on renewable energy certificates, Guarantees of Origin, I-REC, REGO, and hourly matching concepts.",
    tags: ["Certificates", "GO", "Market design"],
  },
  {
    title: "Renewable Energy Systems",
    geography: "Norway",
    url: "https://www.uio.no/english/",
    description:
      "M.Sc. foundation in renewable energy systems, with focus on energy transition, renewable markets, and analytical research.",
    tags: ["M.Sc.", "Norway", "Research"],
  },
];

const focusAreas = [
  "Renewable energy systems",
  "Energy market intelligence",
  "Guarantees of Origin",
  "Data platforms and dashboards",
  "Syria and MENA energy transition",
  "AI-assisted research workflows",
];

function Icon({ name, className = "h-5 w-5" }) {
  const common = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
  };

  const icons = {
    arrow: (
      <svg {...common}>
        <path d="M7 17 17 7M8 7h9v9" />
      </svg>
    ),
    mail: (
      <svg {...common}>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </svg>
    ),
    globe: (
      <svg {...common}>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c2.3 2.4 3.5 5.4 3.5 9S14.3 18.6 12 21c-2.3-2.4-3.5-5.4-3.5-9S9.7 5.4 12 3Z" />
      </svg>
    ),
    grid: (
      <svg {...common}>
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </svg>
    ),
    bolt: (
      <svg {...common}>
        <path d="M13 2 4 14h7l-1 8 10-13h-7l0-7Z" />
      </svg>
    ),
    map: (
      <svg {...common}>
        <path d="M9 18 3 21V6l6-3 6 3 6-3v15l-6 3-6-3Z" />
        <path d="M9 3v15M15 6v15" />
      </svg>
    ),
    spark: (
      <svg {...common}>
        <path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2Z" />
        <path d="M19 15l.7 2.3 2.3.7-2.3.7L19 22l-.7-2.3-2.3-.7 2.3-.7L19 15Z" />
      </svg>
    ),
  };

  return icons[name] || icons.spark;
}

function LogoMark() {
  return (
    <div className="flex items-center gap-3">
      <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-white shadow-soft backdrop-blur">
        <span className="text-lg font-black tracking-tight">JO</span>
        <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-[#F2B84B]" />
      </div>
      <div>
        <p className="text-sm font-black uppercase tracking-[0.22em] text-white">Jakob Olsen</p>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/55">
          Nordic Energy Intelligence
        </p>
      </div>
    </div>
  );
}

function Section({ id, eyebrow, title, children }) {
  return (
    <section id={id} className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
      <div className="mb-8 max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#217A8D]">{eyebrow}</p>
        <h2 className="mt-3 text-3xl font-black tracking-tight text-[#0B1F2A] sm:text-4xl">
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

function EnergyMap({ selectedId, onSelect }) {
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#071923] p-4 shadow-soft ring-1 ring-white/10 sm:p-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_32%_22%,rgba(33,122,141,0.38),transparent_30rem),radial-gradient(circle_at_72%_64%,rgba(242,184,75,0.2),transparent_24rem)]" />
      <div className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:34px_34px]" />

      <div className="relative mb-5 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#F2B84B]">
            Interactive map
          </p>
          <h3 className="mt-1 text-xl font-black text-white sm:text-2xl">Three places. One energy story.</h3>
        </div>
        <Icon name="globe" className="h-7 w-7 text-white/55" />
      </div>

      <div className="relative aspect-[1.05/1] min-h-[330px] sm:aspect-[1.65/1] sm:min-h-[390px]">
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 640 390" role="img" aria-label="Abstract map connecting Norway, Morocco and Syria">
          <defs>
            <linearGradient id="connection" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="#3A9D5D" />
              <stop offset="50%" stopColor="#217A8D" />
              <stop offset="100%" stopColor="#F2B84B" />
            </linearGradient>
          </defs>

          <path
            d="M133 218 C190 138 274 84 365 81 C444 78 505 131 545 202"
            stroke="url(#connection)"
            strokeWidth="2"
            strokeDasharray="8 10"
            fill="none"
            opacity="0.85"
          />
          <path
            d="M133 218 C218 272 364 277 446 242"
            stroke="url(#connection)"
            strokeWidth="2"
            strokeDasharray="8 10"
            fill="none"
            opacity="0.75"
          />
          <path
            d="M244 78 C273 161 340 225 446 242"
            stroke="url(#connection)"
            strokeWidth="2"
            strokeDasharray="8 10"
            fill="none"
            opacity="0.65"
          />

          <path d="M219 55 255 42 290 64 282 101 252 116 219 95Z" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.12)" />
          <path d="M112 198 171 177 212 203 198 250 143 265 97 238Z" fill="rgba(255,255,255,0.055)" stroke="rgba(255,255,255,0.12)" />
          <path d="M413 217 464 203 506 229 494 266 439 272 401 247Z" fill="rgba(255,255,255,0.055)" stroke="rgba(255,255,255,0.12)" />
          <path d="M250 118 C314 135 365 174 402 218" stroke="rgba(255,255,255,0.1)" strokeWidth="1" fill="none" />
          <path d="M205 205 C267 198 333 212 402 238" stroke="rgba(255,255,255,0.1)" strokeWidth="1" fill="none" />
        </svg>

        {countries.map((place) => {
          const active = place.id === selectedId;
          return (
            <button
              key={place.id}
              type="button"
              onClick={() => onSelect(place.id)}
              aria-pressed={active}
              className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-2xl p-1 text-left transition duration-300 hover:scale-[1.03] focus:outline-none focus:ring-4 ${place.ringClass} ${
                active ? "scale-[1.04]" : "opacity-90"
              }`}
              style={{ left: `${place.position.x}%`, top: `${place.position.y}%` }}
            >
              <span className={`absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full ${place.markerClass} opacity-20 blur-xl`} />
              <span className="relative block rounded-2xl border border-white/20 bg-white/10 px-3 py-2 shadow-soft backdrop-blur-md sm:px-4 sm:py-3">
                <span className="flex items-center gap-2">
                  <span className={`h-3 w-3 rounded-full ${place.markerClass}`} />
                  <span className="text-xs font-black uppercase tracking-[0.18em] text-white">
                    {place.country}
                  </span>
                </span>
                <span className="mt-1 hidden max-w-[11rem] text-xs font-semibold text-white/65 sm:block">
                  {place.label}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <div className="relative mt-4 grid grid-cols-3 gap-2">
        {countries.map((place) => (
          <button
            key={`tab-${place.id}`}
            type="button"
            onClick={() => onSelect(place.id)}
            className={`rounded-2xl border px-3 py-3 text-center text-xs font-black uppercase tracking-[0.12em] transition ${
              selectedId === place.id
                ? "border-white/30 bg-white/20 text-white"
                : "border-white/10 bg-white/5 text-white/55 hover:bg-white/10 hover:text-white"
            }`}
          >
            {place.country}
          </button>
        ))}
      </div>
    </div>
  );
}

function AchievementPanel({ activePlace }) {
  return (
    <div className="rounded-[2rem] border border-[#217A8D]/20 bg-white p-5 shadow-soft sm:p-7">
      <div className={`mb-6 rounded-3xl bg-gradient-to-br ${activePlace.gradient} p-5 ring-1 ring-black/5`}>
        <p className={`text-sm font-black uppercase tracking-[0.2em] ${activePlace.textClass}`}>
          {activePlace.country}
        </p>
        <h3 className="mt-3 text-2xl font-black tracking-tight text-[#0B1F2A]">
          {activePlace.label}
        </h3>
        <p className="mt-2 text-sm font-semibold text-[#232B2B]/65">{activePlace.city}</p>
        <p className="mt-5 text-base leading-8 text-[#232B2B]/80">{activePlace.summary}</p>
      </div>

      <div className="space-y-3">
        {activePlace.achievements.map((item) => (
          <div key={item} className="flex gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <span className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${activePlace.markerClass}`} />
            <p className="text-sm font-semibold leading-6 text-[#232B2B]/75">{item}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {activePlace.metrics.map((metric) => (
          <span
            key={metric}
            className="rounded-full border border-[#217A8D]/20 bg-[#217A8D]/5 px-3 py-1.5 text-xs font-black uppercase tracking-[0.12em] text-[#217A8D]"
          >
            {metric}
          </span>
        ))}
      </div>

      <a
        href={activePlace.url}
        target="_blank"
        rel="noreferrer"
        className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#0B1F2A] px-5 py-3.5 text-sm font-black text-white transition hover:bg-[#217A8D] sm:w-auto"
      >
        Open related link
        <Icon name="arrow" className="h-4 w-4" />
      </a>
    </div>
  );
}

function App() {
  const [selectedId, setSelectedId] = useState("syria");

  const activePlace = useMemo(
    () => countries.find((place) => place.id === selectedId) || countries[0],
    [selectedId],
  );

  return (
    <div className="min-h-screen overflow-hidden bg-[#F7FAF9] text-[#232B2B]">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#0B1F2A]/90 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <a href="#home" aria-label="Go to top">
            <LogoMark />
          </a>
          <div className="hidden items-center gap-6 text-sm font-bold text-white/65 lg:flex">
            <a className="transition hover:text-white" href="#map">Map</a>
            <a className="transition hover:text-white" href="#projects">Projects</a>
            <a className="transition hover:text-white" href="#focus">Focus</a>
            <a className="transition hover:text-white" href="#contact">Contact</a>
          </div>
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2.5 text-sm font-black text-white transition hover:bg-white hover:text-[#0B1F2A]"
          >
            <Icon name="mail" className="h-4 w-4" />
            <span className="hidden sm:inline">Contact</span>
          </a>
        </nav>
      </header>

      <main id="home" className="pt-20">
        <section className="relative overflow-hidden bg-[#0B1F2A]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(33,122,141,0.52),transparent_26rem),radial-gradient(circle_at_78%_14%,rgba(242,184,75,0.20),transparent_24rem),radial-gradient(circle_at_72%_82%,rgba(58,157,93,0.22),transparent_28rem)]" />
          <div className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(255,255,255,.16)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.16)_1px,transparent_1px)] [background-size:42px_42px]" />

          <div className="relative mx-auto grid min-h-[calc(100vh-5rem)] max-w-7xl items-center gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-bold text-white/75 backdrop-blur">
                <Icon name="spark" className="h-4 w-4 text-[#F2B84B]" />
                Renewable energy · Data platforms · Certificates
              </div>

              <h1 className="mt-7 text-5xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
                {profile.name}
              </h1>
              <p className="mt-5 text-2xl font-semibold text-[#F2B84B] sm:text-3xl">
                {profile.title}
              </p>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">
                I build clean, data-driven tools and research outputs for renewable energy markets,
                certificates, and energy transition intelligence across Norway, Syria, Morocco, and MENA.
              </p>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#map"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#217A8D] px-5 py-3.5 text-sm font-black text-white shadow-soft transition hover:bg-[#1a6979]"
                >
                  Explore the map
                  <Icon name="map" className="h-4 w-4" />
                </a>
                <a
                  href="#projects"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-5 py-3.5 text-sm font-black text-white transition hover:bg-white hover:text-[#0B1F2A]"
                >
                  View projects
                  <Icon name="arrow" className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/10 p-4 shadow-soft backdrop-blur-xl sm:p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  ["Syria", "Data platform", "Syrian Renewables"],
                  ["Morocco", "Certificates", "Renewable energy certificates"],
                  ["Norway", "Education", "M.Sc. Renewable Energy Systems"],
                  ["MENA / EU", "Bridge", "Markets, policy, and data"],
                ].map(([place, type, text]) => (
                  <div key={place} className="rounded-3xl border border-white/10 bg-white/10 p-5">
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-[#F2B84B]">{place}</p>
                    <h2 className="mt-2 text-xl font-black text-white">{type}</h2>
                    <p className="mt-3 text-sm leading-6 text-white/60">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <Section
          id="map"
          eyebrow="Geographic story"
          title="An interactive portfolio map linking Syria, Norway, and Morocco."
        >
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <EnergyMap selectedId={selectedId} onSelect={setSelectedId} />
            <AchievementPanel activePlace={activePlace} />
          </div>
        </Section>

        <Section id="projects" eyebrow="Featured work" title="Three clear pillars for the portfolio.">
          <div className="grid gap-5 lg:grid-cols-3">
            {featuredProjects.map((project) => (
              <a
                key={project.title}
                href={project.url}
                target="_blank"
                rel="noreferrer"
                className="group flex min-h-[22rem] flex-col rounded-[2rem] border border-[#217A8D]/10 bg-white p-6 shadow-soft transition duration-300 hover:-translate-y-1 hover:border-[#217A8D]/30"
              >
                <div className="mb-6 flex items-center justify-between">
                  <span className="rounded-full bg-[#217A8D]/10 px-3 py-1.5 text-xs font-black uppercase tracking-[0.16em] text-[#217A8D]">
                    {project.geography}
                  </span>
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0B1F2A] text-white transition group-hover:bg-[#217A8D]">
                    <Icon name="arrow" className="h-5 w-5" />
                  </span>
                </div>
                <h3 className="text-2xl font-black text-[#0B1F2A]">{project.title}</h3>
                <p className="mt-4 flex-1 text-base leading-8 text-[#232B2B]/70">{project.description}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-[#232B2B]/65"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </Section>

        <Section id="focus" eyebrow="Focus areas" title="A practical mix of energy, data, markets, and communication.">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {focusAreas.map((item, index) => (
              <div key={item} className="rounded-3xl border border-[#217A8D]/10 bg-white p-5 shadow-sm">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#217A8D]/10 text-[#217A8D]">
                  <Icon name={index % 3 === 0 ? "bolt" : index % 3 === 1 ? "grid" : "globe"} />
                </div>
                <p className="text-lg font-black text-[#0B1F2A]">{item}</p>
              </div>
            ))}
          </div>
        </Section>

        <section id="contact" className="mx-auto max-w-7xl px-5 pb-16 sm:px-8 lg:pb-24">
          <div className="rounded-[2rem] bg-[#0B1F2A] p-7 shadow-soft sm:p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.22em] text-[#F2B84B]">Contact</p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">
                  Open to energy, data, and research conversations.
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-8 text-white/65">
                  Best fit: renewable energy markets, certificate systems, data platforms, Syria/MENA energy
                  intelligence, and practical AI-supported research workflows.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3.5 text-sm font-black text-[#0B1F2A] transition hover:bg-[#F2B84B]"
                >
                  Email me
                  <Icon name="mail" className="h-4 w-4" />
                </a>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/20 px-5 py-3.5 text-sm font-black text-white transition hover:bg-white hover:text-[#0B1F2A]"
                >
                  LinkedIn
                  <Icon name="arrow" className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#217A8D]/10 bg-white px-5 py-8 text-center text-sm font-bold text-[#232B2B]/55">
        © {new Date().getFullYear()} {profile.name}. Built with React, Tailwind CSS, GitHub, and Vercel.
      </footer>
    </div>
  );
}

export default App;
