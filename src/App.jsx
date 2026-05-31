import React from "react";

const profile = {
  name: "Khaled Alassad (Jakob)",
  title:
    "Syrian-Norwegian Renewable Energy Analyst, Data Specialist, Content Creator & AI Enthusiast",
  location: "Oslo, Norway",
  email: "jakoub.k.olsen@gmail.com",
  linkedin: "https://www.linkedin.com/in/jakob-k-olsen",
  cv: "https://www.linkedin.com/in/jakob-k-olsen",
};

const navItems = [
  "About",
  "Education",
  "Experience",
  "Certifications",
  "Skills",
  "Projects",
  "Contact",
];

const education = [
  {
    years: "2018-2021",
    title: "B.Sc. Renewable Energy Engineering",
    place: "NTNU, Gjovik, Norway",
    color: "bg-blue-100 text-blue-700 ring-blue-200",
  },
  {
    years: "2023-2026",
    title: "M.Sc. Renewable Energy Systems",
    place: "University of Oslo, Oslo, Norway",
    color: "bg-green-100 text-green-700 ring-green-200",
  },
];

const experience = [
  {
    years: "2021-Present",
    title: "Driver",
    place: "Posten, Oslo, Norway",
    detail:
      "Built reliability, routing discipline, customer-facing communication, and operational awareness in a high-trust logistics role.",
    color: "bg-yellow-100 text-yellow-700 ring-yellow-200",
  },
  {
    years: "2023-2025",
    title: "Intern, Renewable Power Market Analyst",
    place: "Veyt, Oslo, Norway",
    detail:
      "Worked with renewable power market data, analysis, research, and communication for energy transition decision-making.",
    color: "bg-blue-100 text-blue-700 ring-blue-200",
  },
];

const certifications = ["Drone Pilot", "BREEAM Introduction Course"];

const skills = [
  "Renewable energy systems",
  "Power market analysis",
  "Energy data storytelling",
  "Solar and wind research",
  "Guarantees of origin",
  "Carbon emissions analysis",
  "Policy and market research",
  "AI-assisted workflows",
  "Technical content creation",
  "Project communication",
];

const projects = [
  {
    title: "Granular Certificates",
    url: "https://granularcertificates.com",
    description:
      "A thesis-based platform exploring how granular guarantees of origin can enhance transparency and trust in renewable energy markets.",
    accent: "from-blue-500 to-green-500",
  },
  {
    title: "Syrian Renewables",
    url: "https://syrianrenewables.com",
    description:
      "A renewable energy data and analysis platform for Syria, documenting solar and wind projects, carbon emissions, policies, and market opportunities.",
    accent: "from-yellow-400 to-red-400",
  },
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
    sun: (
      <svg {...common}>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2.4M12 19.6V22M4.93 4.93l1.7 1.7M17.37 17.37l1.7 1.7M2 12h2.4M19.6 12H22M4.93 19.07l1.7-1.7M17.37 6.63l1.7-1.7" />
      </svg>
    ),
    map: (
      <svg {...common}>
        <path d="M9 18l-6 3V6l6-3 6 3 6-3v15l-6 3-6-3Z" />
        <path d="M9 3v15M15 6v15" />
      </svg>
    ),
    mail: (
      <svg {...common}>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </svg>
    ),
    link: (
      <svg {...common}>
        <path d="M10 13a5 5 0 0 0 7.07 0l2-2A5 5 0 0 0 12 3.93l-1.15 1.15" />
        <path d="M14 11a5 5 0 0 0-7.07 0l-2 2A5 5 0 0 0 12 20.07l1.15-1.15" />
      </svg>
    ),
    arrow: (
      <svg {...common}>
        <path d="M7 17 17 7M8 7h9v9" />
      </svg>
    ),
    spark: (
      <svg {...common}>
        <path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2Z" />
        <path d="M19 15l.8 2.7 2.7.8-2.7.8L19 23l-.8-2.7-2.7-.8 2.7-.8L19 15Z" />
      </svg>
    ),
    check: (
      <svg {...common}>
        <path d="m5 12 4 4L19 6" />
      </svg>
    ),
  };

  return icons[name] || icons.spark;
}

function Section({ id, eyebrow, title, children }) {
  return (
    <section
      id={id}
      className="portfolio-section mx-auto w-full max-w-6xl px-5 py-14 sm:px-8 lg:py-18"
    >
      <div className="mb-8 max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
          {eyebrow}
        </p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

function Timeline({ items }) {
  return (
    <div className="relative space-y-6 before:absolute before:left-4 before:top-3 before:h-[calc(100%-1.5rem)] before:w-px before:bg-slate-200 sm:before:left-5">
      {items.map((item) => (
        <div key={`${item.years}-${item.title}`} className="relative pl-12 sm:pl-16">
          <div className="absolute left-0 top-1 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-soft ring-1 ring-slate-200 sm:h-10 sm:w-10">
            <span className="h-3 w-3 rounded-full bg-blue-500" />
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <span
              className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ring-1 ${item.color}`}
            >
              {item.years}
            </span>
            <h3 className="mt-4 text-xl font-bold text-slate-950">{item.title}</h3>
            <p className="mt-1 text-slate-600">{item.place}</p>
            {item.detail && <p className="mt-4 leading-7 text-slate-700">{item.detail}</p>}
          </div>
        </div>
      ))}
    </div>
  );
}

function App() {
  return (
    <div className="min-h-screen overflow-hidden text-slate-800">
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/88 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          <a href="#hero" className="flex items-center gap-3 font-bold text-slate-950">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
              <Icon name="sun" />
            </span>
            <span className="hidden sm:inline">Khaled Alassad</span>
          </a>
          <div className="hidden items-center gap-5 text-sm font-medium text-slate-600 lg:flex">
            {navItems.map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="transition hover:text-blue-700">
                {item}
              </a>
            ))}
          </div>
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-2 rounded-lg bg-slate-950 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700"
          >
            <Icon name="mail" className="h-4 w-4" />
            Contact
          </a>
        </nav>
      </header>

      <main>
        <section id="hero" className="mx-auto grid min-h-[calc(100vh-73px)] max-w-6xl items-center gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="animate-fade-up">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
              <Icon name="spark" className="h-4 w-4" />
              Renewable energy, data, and AI
            </div>
            <h1 className="mt-7 max-w-4xl text-5xl font-black tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
              {profile.name}
            </h1>
            <p className="mt-6 max-w-2xl text-xl leading-8 text-slate-700">{profile.title}</p>
            <div className="mt-7 flex flex-wrap items-center gap-3 text-sm font-semibold text-slate-600">
              <span className="inline-flex items-center gap-2 rounded-full bg-green-50 px-4 py-2 text-green-700 ring-1 ring-green-200">
                <Icon name="map" className="h-4 w-4" />
                {profile.location}
              </span>
              <a
                className="inline-flex items-center gap-2 rounded-full bg-yellow-50 px-4 py-2 text-yellow-700 ring-1 ring-yellow-200"
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                <Icon name="link" className="h-4 w-4" />
                LinkedIn
              </a>
            </div>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 font-bold text-white shadow-soft transition hover:bg-blue-700"
              >
                View Projects
                <Icon name="arrow" className="h-4 w-4" />
              </a>
              <a
                href={profile.cv}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-3 font-bold text-slate-950 transition hover:border-green-300 hover:text-green-700"
              >
                View CV
                <Icon name="arrow" className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="relative animate-scale-in">
            <div className="grid gap-4 rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
              <div className="rounded-lg bg-blue-50 p-5 ring-1 ring-blue-100">
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-blue-700">
                  Focus
                </p>
                <p className="mt-3 text-2xl font-black text-slate-950">
                  Turning renewable energy data into practical insight.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg bg-green-50 p-4 ring-1 ring-green-100">
                  <p className="text-3xl font-black text-green-700">2</p>
                  <p className="mt-1 text-sm font-semibold text-slate-700">Energy platforms</p>
                </div>
                <div className="rounded-lg bg-yellow-50 p-4 ring-1 ring-yellow-100">
                  <p className="text-3xl font-black text-yellow-700">AI</p>
                  <p className="mt-1 text-sm font-semibold text-slate-700">Workflow mindset</p>
                </div>
                <div className="rounded-lg bg-red-50 p-4 ring-1 ring-red-100">
                  <p className="text-3xl font-black text-red-600">NO</p>
                  <p className="mt-1 text-sm font-semibold text-slate-700">Based in Oslo</p>
                </div>
                <div className="rounded-lg bg-slate-50 p-4 ring-1 ring-slate-100">
                  <p className="text-3xl font-black text-slate-950">RE</p>
                  <p className="mt-1 text-sm font-semibold text-slate-700">Renewable energy</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Section id="about" eyebrow="About" title="A cross-cultural energy analyst with a data-first lens.">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <p className="text-lg leading-8 text-slate-700">
                Khaled combines renewable energy engineering, market analysis, data communication,
                and AI curiosity to make complex energy transition topics easier to understand and
                act on.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {["Energy systems", "Market intelligence", "Content creation"].map((item, index) => (
                <div key={item} className="rounded-lg bg-white p-5 shadow-sm ring-1 ring-slate-200">
                  <div
                    className={`mb-5 h-2 w-16 rounded-full ${
                      index === 0 ? "bg-blue-400" : index === 1 ? "bg-green-400" : "bg-yellow-400"
                    }`}
                  />
                  <p className="font-bold text-slate-950">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        <Section id="education" eyebrow="Education" title="Academic foundation in renewable energy.">
          <Timeline items={education} />
        </Section>

        <Section id="experience" eyebrow="Experience" title="Operational reliability meets energy market analysis.">
          <Timeline items={experience} />
        </Section>

        <Section id="certifications" eyebrow="Certifications" title="Credentials that broaden the energy toolkit.">
          <div className="grid gap-4 sm:grid-cols-2">
            {certifications.map((cert, index) => (
              <div key={cert} className="flex items-center gap-4 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                <span
                  className={`flex h-11 w-11 items-center justify-center rounded-lg ${
                    index === 0 ? "bg-red-50 text-red-600" : "bg-green-50 text-green-700"
                  }`}
                >
                  <Icon name="check" />
                </span>
                <p className="text-lg font-bold text-slate-950">{cert}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section id="skills" eyebrow="Skills" title="A practical mix of energy, data, and communication.">
          <div className="flex flex-wrap gap-3">
            {skills.map((skill, index) => {
              const colors = [
                "bg-blue-50 text-blue-700 ring-blue-200",
                "bg-green-50 text-green-700 ring-green-200",
                "bg-yellow-50 text-yellow-700 ring-yellow-200",
                "bg-red-50 text-red-600 ring-red-200",
              ];
              return (
                <span
                  key={skill}
                  className={`rounded-full px-4 py-2 text-sm font-bold ring-1 ${colors[index % colors.length]}`}
                >
                  {skill}
                </span>
              );
            })}
          </div>
        </Section>

        <Section id="projects" eyebrow="Projects" title="Platforms for cleaner energy markets and better data.">
          <div className="grid gap-6 lg:grid-cols-2">
            {projects.map((project) => (
              <a
                key={project.title}
                href={project.url}
                target="_blank"
                rel="noreferrer"
                className="group rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-soft"
              >
                <div className={`h-2 w-28 rounded-full bg-gradient-to-r ${project.accent}`} />
                <h3 className="mt-6 text-2xl font-black text-slate-950">{project.title}</h3>
                <p className="mt-4 leading-7 text-slate-700">{project.description}</p>
                <span className="mt-6 inline-flex items-center gap-2 font-bold text-blue-700">
                  Visit project
                  <Icon name="arrow" className="h-4 w-4 transition group-hover:translate-x-1 group-hover:-translate-y-1" />
                </span>
              </a>
            ))}
          </div>
        </Section>

        <Section id="contact" eyebrow="Contact" title="Open to renewable energy, data, and AI-focused conversations.">
          <div className="grid gap-5 rounded-lg border border-slate-200 bg-white p-6 shadow-soft sm:grid-cols-3">
            <a href={`mailto:${profile.email}`} className="flex items-center gap-4 rounded-lg bg-blue-50 p-4 text-blue-700 ring-1 ring-blue-100 transition hover:bg-blue-100">
              <Icon name="mail" />
              <span className="font-bold break-all">{profile.email}</span>
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-4 rounded-lg bg-green-50 p-4 text-green-700 ring-1 ring-green-100 transition hover:bg-green-100">
              <Icon name="link" />
              <span className="font-bold">LinkedIn</span>
            </a>
            <div className="flex items-center gap-4 rounded-lg bg-yellow-50 p-4 text-yellow-700 ring-1 ring-yellow-100">
              <Icon name="map" />
              <span className="font-bold">{profile.location}</span>
            </div>
          </div>
        </Section>
      </main>

      <footer className="border-t border-slate-200 bg-white px-5 py-8 text-center text-sm font-semibold text-slate-500">
        Copyright {new Date().getFullYear()} {profile.name}. Built with React and Tailwind CSS.
      </footer>
    </div>
  );
}

export default App;
