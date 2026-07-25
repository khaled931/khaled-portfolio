export const media = {
  // Gallery item shape: { src, type: "image" | "video", poster, alt: { en, ar, no, fr }, caption: { en, ar, no, fr } }
  gallery: [],
};

export const contactLinks = [
  { id: "linkedin", name: "LinkedIn", url: "https://www.linkedin.com/in/jakob-k-olsen/", color: "#0A66C2", icon: "linkedin" },
  { id: "granular", name: "Granular Certificates", url: "https://granularcertificates.com", color: "#CFFF3E", icon: "certificate", featured: true },
  { id: "syrian-renewables", name: "Syrian Renewables", url: "https://syrianrenewables.com", color: "#CFFF3E", icon: "energy", featured: true },
  { id: "x", name: "X", url: "https://x.com/jakobolsen2", color: "#000000", icon: "x" },
  { id: "youtube", name: "YouTube", url: "https://www.youtube.com/@Khaled-Alassad", color: "#FF0000", icon: "youtube" },
  { id: "instagram", name: "Instagram", url: "https://www.instagram.com/jakob.khaled.o/", color: "#E4405F", icon: "instagram" },
  { id: "tiktok", name: "TikTok", url: "https://www.tiktok.com/@jakob.khaled", color: "#25F4EE", icon: "tiktok" },
  { id: "facebook", name: "Facebook", url: "https://www.facebook.com/khaled.alasaad.9", color: "#1877F2", icon: "facebook" },
  { id: "whatsapp", name: "WhatsApp", url: "https://wa.me/4740381834", color: "#25D366", icon: "whatsapp" },
  { id: "email", name: "Email", url: "mailto:jakoub.k.olsen@gmail.com", color: "#CFFF3E", icon: "email" },
];

export const content = {
  en: {
    nav: {
      overview: "Overview",
      about: "About",
      contact: "Contact",
      theme: "Theme",
      language: "Language",
      back: "Back",
      close: "Close",
      home: "Jakob Olsen home",
      brandName: "Jakob Olsen",
      switchLight: "Switch to light mode",
      switchDark: "Switch to dark mode",
      primaryNavigation: "Primary navigation",
      portfolioFields: "Portfolio fields",
      gateway: "Interactive portfolio gateway",
      portfolioDetails: "Portfolio details",
    },
    hero: {
      intro: "Jakob Olsen portfolio",
      headline: "Renewable energy & data intelligence — between Europe and MENA.",
      subline: "I am Jakob Olsen, a Syrian–Norwegian energy analyst based in Oslo. I build data platforms and publish market intelligence on renewable energy certificates — in English and Arabic.",
    },
    modals: {
      overviewTitle: "Quick overview",
      overviewText: "My work combines renewable energy market analysis, structured data products, bilingual publishing, visual communication, and community-led digital initiatives.",
      aboutTitle: "About Jakob Olsen",
      aboutText: "Jakob Olsen — also publishing as Khaled Al-Asaad. This portfolio brings together energy analysis, photography and drone work, organized volunteer initiatives, digital marketing, freelancing, and website creation.",
    },
    gatewayMeta: {
      degree: "degree",
      degrees: "degrees",
      project: "project",
      projects: "projects",
      organization: "organization",
      organizations: "organizations",
      focusArea: "focus area",
      focusAreas: "focus areas",
      serviceArea: "service area",
      serviceAreas: "service areas",
    },
    contact: {
      name: "Jakob Olsen",
      role: "Renewable Energy & Data Intelligence Analyst",
      invitation: "Connect for energy-market analysis, renewable certificate intelligence, data-platform collaboration, or professional enquiries.",
      pageLabel: "Contact links",
      subtitles: {
        linkedin: "Professional profile",
        granular: "Renewable certificate intelligence",
        "syrian-renewables": "Syria energy data platform",
        x: "Market notes · @jakobolsen2",
        youtube: "Video analysis",
        instagram: "Visual updates · @jakob.khaled.o",
        tiktok: "Short-form video · @jakob.khaled",
        facebook: "Community profile",
        whatsapp: "Direct message",
        email: "Professional enquiries",
      },
      ariaPrefix: "Open",
    },
    portals: {
      energy: {
        label: "Energy profile",
        title: "Renewable Energy",
        subtitle: "Education, market analysis experience, and data-driven energy projects across Norway, Europe, Syria, and MENA.",
        primary: "Education",
        secondary: "Work",
        tertiary: "Projects",
        object: "energy",
        primaryItems: [
          { year: "2021", title: "B.Sc. Renewable Energy Engineering", place: "NTNU — Norwegian University of Science and Technology", text: "Bachelor’s degree in Renewable Energy Engineering, completed in 2021." },
          { year: "2026", title: "M.Sc. Renewable Energy Systems", place: "University of Oslo", text: "Master’s degree in Renewable Energy Systems, focused on renewable energy systems, policy analysis, and the economics of renewable energy markets, completed in 2026." },
        ],
        secondaryItems: [
          { year: "2 years", title: "Renewable Energy Market & Policy Analysis", place: "EU renewable energy markets", text: "Two years of experience analyzing renewable energy markets and renewable energy policy in the European Union." },
        ],
        tertiaryItems: [
          { name: "Granular Certificates", description: "Knowledge platform for renewable energy certificates and market transparency.", url: "https://granularcertificates.com" },
          { name: "Syrian Renewables", description: "Renewable energy data and intelligence platform for Syria.", url: "https://syrianrenewables.com" },
          { name: "Energy data tools", description: "Trackers, dashboards, and structured datasets for energy analysis.", url: null },
        ],
      },
      volunteer: {
        label: "Community impact",
        title: "Organized & Volunteer Work",
        subtitle: "Community leadership, Arabic-speaking migrant support, media work, and organized volunteer initiatives in Norway.",
        primary: "Leadership & Organizations",
        secondary: "Media & Community Role",
        tertiary: "Focus Areas",
        object: "volunteer",
        primaryItems: [
          { year: "2019 · 2021–2023", title: "Radio Mangfold Norge", place: "Volunteer from 2019; General Manager 2021–2023", text: "Started volunteering in 2019, became General Manager in 2021, and led the organization until its work ended in 2023. The organization served Arabic-speaking immigrants and refugees in Norway." },
          { year: "2025–present", title: "Norway Now", place: "Founder & Director", text: "Founded Norway Now in 2025 to support Arabic-speaking refugees and immigrants in Norway and currently serves as its director." },
        ],
        secondaryItems: [
          { year: "2022–2025", title: "Syrian Student Organization in Norway", place: "Media Lead", text: "Joined the organization in 2022 and remained active until 2025, with responsibility for the media section and communication-related activities." },
        ],
        tertiaryItems: [
          "Supporting Arabic-speaking refugees and immigrants in Norway.",
          "Community media, communication, and public information work.",
          "Organizing volunteer initiatives and building community-oriented platforms.",
        ],
      },
      media: {
        label: "Visual storytelling",
        title: "Photography / Videography / Drone",
        subtitle: "A visual portfolio section for photography, video production, drone footage, and creative documentation.",
        primary: "Photography & Video",
        secondary: "Drone Production",
        tertiary: "Visual Focus",
        object: "media",
        galleryLabel: "Media gallery",
        primaryItems: [
          { year: "Skill", title: "Photo Production", place: "Photography and visual documentation", text: "Creating strong photographic content for places, people, projects, organizations, and digital platforms." },
          { year: "Skill", title: "Video Production", place: "Filming and visual storytelling", text: "Producing video content for campaigns, social media, events, communities, and project documentation." },
        ],
        secondaryItems: [
          { year: "Skill", title: "Drone Video Production", place: "Aerial visuals", text: "Producing drone-based video content for places, projects, events, and visual documentation." },
        ],
        tertiaryItems: [
          "Photography for projects, communities, and places.",
          "Video storytelling for social media and campaigns.",
          "Drone footage for visual identity, documentation, and promotion.",
        ],
      },
      digital: {
        label: "Digital systems",
        title: "Digital Marketing / Freelancing / Website Creation",
        subtitle: "A focused digital skill set for websites, social media, email marketing, strategy, freelancing, and AI automation.",
        primary: "Core Digital Skills",
        secondary: "Strategy & Automation",
        tertiary: "Service Areas",
        object: "digital",
        primaryItems: [
          { title: "Website Creation", place: "Web presence and landing pages", text: "Creating clean websites and landing pages for projects, organizations, services, and personal brands." },
          { title: "Social Media Management", place: "Digital communication", text: "Managing content, publishing workflows, campaigns, and communication across social media channels." },
          { title: "Email Marketing", place: "Newsletters and audience communication", text: "Planning and managing email campaigns, newsletters, subscriber communication, and audience updates." },
        ],
        secondaryItems: [
          { title: "Content Planning & Strategies", place: "Content systems", text: "Planning content calendars, campaign structures, publishing strategies, and audience-focused messaging." },
          { title: "Freelancing & AI Automation", place: "Efficient digital execution", text: "Combining freelance delivery with AI-assisted workflows, automation, research, content production, and practical digital systems." },
        ],
        tertiaryItems: [
          "Website creation and landing pages.",
          "Social media management and campaign planning.",
          "Email marketing, content strategy, freelancing, and AI automation.",
        ],
      },
    },
  },
  ar: {
    nav: {
      overview: "نظرة عامة",
      about: "حول",
      contact: "تواصل",
      theme: "الوضع",
      language: "اللغة",
      back: "رجوع",
      close: "إغلاق",
      home: "الصفحة الرئيسية لخالد الأسعد",
      brandName: "خالد الأسعد",
      switchLight: "التبديل إلى الوضع الفاتح",
      switchDark: "التبديل إلى الوضع الداكن",
      primaryNavigation: "التنقل الرئيسي",
      portfolioFields: "مجالات البورتفوليو",
      gateway: "بوابة البورتفوليو التفاعلية",
      portfolioDetails: "تفاصيل البورتفوليو",
    },
    hero: {
      intro: "بورتفوليو خالد الأسعد",
      headline: "الطاقة المتجددة وذكاء البيانات — بين أوروبا ومنطقة الشرق الأوسط وشمال أفريقيا.",
      subline: "أنا خالد الأسعد، محلل طاقة سوري–نرويجي مقيم في أوسلو. أبني منصات بيانات وأنشر تحليلات سوقية حول شهادات الطاقة المتجددة — باللغتين العربية والإنجليزية.",
    },
    modals: {
      overviewTitle: "نظرة عامة سريعة",
      overviewText: "يجمع عملي بين تحليل أسواق الطاقة المتجددة، ومنتجات البيانات المنظمة، والنشر ثنائي اللغة، والتواصل البصري، والمبادرات الرقمية المجتمعية.",
      aboutTitle: "حول خالد الأسعد",
      aboutText: "خالد الأسعد — ويُعرف مهنياً في النرويج باسم Jakob Olsen. يجمع هذا البورتفوليو بين تحليل الطاقة، والتصوير والدرون، والمبادرات التطوعية المنظمة، والتسويق الرقمي، والعمل الحر، وإنشاء المواقع.",
    },
    gatewayMeta: {
      degree: "درجة علمية",
      degrees: "درجات علمية",
      project: "مشروع",
      projects: "مشاريع",
      organization: "منظمة",
      organizations: "منظمات",
      focusArea: "مجال تركيز",
      focusAreas: "مجالات تركيز",
      serviceArea: "مجال خدمة",
      serviceAreas: "مجالات خدمة",
    },
    contact: {
      name: "خالد الأسعد",
      role: "محلل في الطاقة المتجددة وذكاء البيانات",
      invitation: "للتعاون في تحليل أسواق الطاقة، أو شهادات الطاقة المتجددة، أو منصات البيانات، أو للاستفسارات المهنية، يمكن التواصل عبر الروابط التالية.",
      pageLabel: "روابط التواصل",
      subtitles: {
        linkedin: "الملف المهني",
        granular: "تحليلات شهادات الطاقة المتجددة",
        "syrian-renewables": "منصة بيانات الطاقة في سورية",
        x: "ملاحظات سوقية · @jakobolsen2",
        youtube: "تحليلات مرئية",
        instagram: "تحديثات بصرية · @jakob.khaled.o",
        tiktok: "فيديوهات قصيرة · @jakob.khaled",
        facebook: "الملف المجتمعي",
        whatsapp: "رسالة مباشرة",
        email: "استفسارات مهنية",
      },
      ariaPrefix: "فتح",
    },
    portals: {
      energy: {
        label: "ملف الطاقة",
        title: "الطاقة المتجددة",
        subtitle: "التعليم، والخبرة في تحليل الأسواق، ومشاريع الطاقة المعتمدة على البيانات بين النرويج وأوروبا وسورية ومنطقة MENA.",
        primary: "التعليم",
        secondary: "العمل والخبرة",
        tertiary: "المشاريع",
        object: "energy",
        primaryItems: [
          { year: "2021", title: "بكالوريوس في هندسة الطاقة المتجددة", place: "جامعة NTNU النرويجية", text: "بكالوريوس في هندسة الطاقة المتجددة من جامعة NTNU، تم إكماله في عام 2021." },
          { year: "2026", title: "ماجستير في أنظمة الطاقة المتجددة", place: "جامعة أوسلو", text: "ماجستير في أنظمة الطاقة المتجددة مع تركيز على الأنظمة، وتحليل السياسات، واقتصاديات أسواق الطاقة المتجددة، تم إكماله في عام 2026." },
        ],
        secondaryItems: [
          { year: "سنتان", title: "تحليل أسواق وسياسات الطاقة المتجددة", place: "أسواق الطاقة المتجددة في الاتحاد الأوروبي", text: "لدي خبرة سنتين في تحليل أسواق الطاقة المتجددة وسياسات الطاقة المتجددة في الاتحاد الأوروبي." },
        ],
        tertiaryItems: [
          { name: "Granular Certificates", description: "منصة معرفية حول شهادات الطاقة المتجددة وشفافية الأسواق.", url: "https://granularcertificates.com" },
          { name: "Syrian Renewables", description: "منصة بيانات وتحليل لقطاع الطاقة المتجددة في سورية.", url: "https://syrianrenewables.com" },
          { name: "Energy data tools", description: "أدوات تتبع ولوحات بيانات ومجموعات بيانات مهيكلة لتحليل الطاقة.", url: null },
        ],
      },
      volunteer: {
        label: "الأثر المجتمعي",
        title: "المنظمات والعمل التطوعي",
        subtitle: "خبرة في القيادة المجتمعية، ودعم اللاجئين والمهاجرين الناطقين بالعربية في النرويج، والعمل الإعلامي، وتنظيم المبادرات التطوعية.",
        primary: "القيادة والمنظمات",
        secondary: "الإعلام والعمل المجتمعي",
        tertiary: "مجالات التركيز",
        object: "volunteer",
        primaryItems: [
          { year: "2019 · 2021–2023", title: "Radio Mangfold Norge", place: "متطوع منذ 2019؛ مدير عام 2021–2023", text: "بدأ العمل التطوعي في عام 2019، ثم أصبح مديراً عاماً في عام 2021، واستمر في قيادة المنظمة حتى انتهاء عملها في عام 2023. وكانت المنظمة تخدم المهاجرين واللاجئين الناطقين بالعربية في النرويج." },
          { year: "2025–present", title: "Norway Now", place: "المؤسس والمدير", text: "أسس Norway Now في عام 2025 لدعم اللاجئين والمهاجرين الناطقين بالعربية في النرويج، ويتولى إدارتها حتى الآن." },
        ],
        secondaryItems: [
          { year: "2022–2025", title: "منظمة الطالب السوري في النرويج", place: "مسؤول القسم الإعلامي", text: "انضم إلى المنظمة في عام 2022 واستمر حتى عام 2025، مع مسؤولية القسم الإعلامي والأنشطة المرتبطة بالتواصل." },
        ],
        tertiaryItems: [
          "دعم اللاجئين والمهاجرين الناطقين بالعربية في النرويج.",
          "الإعلام المجتمعي والتواصل والمعلومات العامة.",
          "تنظيم المبادرات التطوعية وبناء منصات تخدم المجتمع.",
        ],
      },
      media: {
        label: "السرد البصري",
        title: "التصوير / الفيديو / الدرون",
        subtitle: "قسم بصري مخصص للتصوير الفوتوغرافي، وإنتاج الفيديو، وتصوير الدرون، والتوثيق الإبداعي.",
        primary: "التصوير والفيديو",
        secondary: "تصوير الدرون",
        tertiary: "التركيز البصري",
        object: "media",
        galleryLabel: "معرض الوسائط",
        primaryItems: [
          { year: "مهارة", title: "إنتاج الصور", place: "التصوير والتوثيق البصري", text: "إنشاء محتوى فوتوغرافي قوي للأماكن، والأشخاص، والمشاريع، والمنظمات، والمنصات الرقمية." },
          { year: "مهارة", title: "إنتاج الفيديو", place: "التصوير والسرد البصري", text: "إنتاج محتوى فيديو للحملات، ووسائل التواصل الاجتماعي، والفعاليات، والمجتمعات، وتوثيق المشاريع." },
        ],
        secondaryItems: [
          { year: "مهارة", title: "إنتاج فيديو بالدرون", place: "مشاهد جوية", text: "إنتاج محتوى فيديو باستخدام الدرون للأماكن، والمشاريع، والفعاليات، والتوثيق البصري." },
        ],
        tertiaryItems: [
          "تصوير المشاريع والمجتمعات والأماكن.",
          "السرد بالفيديو لوسائل التواصل والحملات.",
          "تصوير الدرون للهوية البصرية والتوثيق والترويج.",
        ],
      },
      digital: {
        label: "الأنظمة الرقمية",
        title: "التسويق الرقمي / الفريلانس / إنشاء المواقع",
        subtitle: "مجموعة مهارات رقمية مركزة تشمل المواقع، ووسائل التواصل، والتسويق بالبريد الإلكتروني، والاستراتيجية، والعمل الحر، وأتمتة الذكاء الاصطناعي.",
        primary: "المهارات الرقمية الأساسية",
        secondary: "الاستراتيجية والأتمتة",
        tertiary: "مجالات الخدمة",
        object: "digital",
        primaryItems: [
          { title: "إنشاء المواقع", place: "الحضور الرقمي وصفحات الهبوط", text: "إنشاء مواقع وصفحات هبوط واضحة للمشاريع، والمنظمات، والخدمات، والهويات الشخصية." },
          { title: "إدارة وسائل التواصل الاجتماعي", place: "التواصل الرقمي", text: "إدارة المحتوى، ومسارات النشر، والحملات، والتواصل عبر قنوات وسائل التواصل الاجتماعي." },
          { title: "التسويق بالبريد الإلكتروني", place: "النشرات والتواصل مع الجمهور", text: "تخطيط وإدارة حملات البريد الإلكتروني، والنشرات، والتواصل مع المشتركين، وتحديثات الجمهور." },
        ],
        secondaryItems: [
          { title: "تخطيط المحتوى والاستراتيجيات", place: "أنظمة المحتوى", text: "تخطيط تقويم المحتوى، وهيكلة الحملات، واستراتيجيات النشر، وصياغة الرسائل الموجهة للجمهور." },
          { title: "العمل الحر وأتمتة الذكاء الاصطناعي", place: "تنفيذ رقمي فعّال", text: "دمج تنفيذ أعمال الفريلانس مع مسارات عمل مدعومة بالذكاء الاصطناعي، والأتمتة، والبحث، وإنتاج المحتوى، والأنظمة الرقمية العملية." },
        ],
        tertiaryItems: [
          "إنشاء المواقع وصفحات الهبوط.",
          "إدارة وسائل التواصل وتخطيط الحملات.",
          "التسويق بالبريد الإلكتروني، واستراتيجية المحتوى، والعمل الحر، وأتمتة الذكاء الاصطناعي.",
        ],
      },
    },
  },
  no: {
    nav: {
      overview: "Oversikt",
      about: "Om",
      contact: "Kontakt",
      theme: "Tema",
      language: "Språk",
      back: "Tilbake",
      close: "Lukk",
      home: "Jakob Olsen hjem",
      brandName: "Jakob Olsen",
      switchLight: "Bytt til lys modus",
      switchDark: "Bytt til mørk modus",
      primaryNavigation: "Primær navigasjon",
      portfolioFields: "Porteføljeområder",
      gateway: "Interaktiv porteføljeinngang",
      portfolioDetails: "Porteføljedetaljer",
    },
    hero: {
      intro: "Jakob Olsen-portefølje",
      headline: "Fornybar energi og dataintelligens — mellom Europa og MENA.",
      subline: "Jeg er Jakob Olsen, en syrisk-norsk energianalytiker basert i Oslo. Jeg bygger dataplattformer og publiserer markedsanalyse om fornybare energisertifikater — på engelsk og arabisk.",
    },
    modals: {
      overviewTitle: "Kort oversikt",
      overviewText: "Arbeidet mitt kombinerer analyse av fornybare energimarkeder, strukturerte dataprodukter, tospråklig publisering, visuell kommunikasjon og samfunnsdrevne digitale initiativer.",
      aboutTitle: "Om Jakob Olsen",
      aboutText: "Jakob Olsen — publiserer også som Khaled Al-Asaad. Denne porteføljen samler energianalyse, foto og dronearbeid, organiserte frivillige initiativer, digital markedsføring, frilansarbeid og nettsideutvikling.",
    },
    gatewayMeta: {
      degree: "grad",
      degrees: "grader",
      project: "prosjekt",
      projects: "prosjekter",
      organization: "organisasjon",
      organizations: "organisasjoner",
      focusArea: "fokusområde",
      focusAreas: "fokusområder",
      serviceArea: "tjenesteområde",
      serviceAreas: "tjenesteområder",
    },
    contact: {
      name: "Jakob Olsen",
      role: "Analytiker innen fornybar energi og dataintelligens",
      invitation: "Ta kontakt om energimarkedsanalyse, fornybare energisertifikater, samarbeid om dataplattformer eller andre profesjonelle henvendelser.",
      pageLabel: "Kontaktlenker",
      subtitles: {
        linkedin: "Profesjonell profil",
        granular: "Analyse av fornybare energisertifikater",
        "syrian-renewables": "Dataplattform for energisektoren i Syria",
        x: "Markedsnotater · @jakobolsen2",
        youtube: "Videoanalyse",
        instagram: "Visuelle oppdateringer · @jakob.khaled.o",
        tiktok: "Kortvideo · @jakob.khaled",
        facebook: "Samfunnsprofil",
        whatsapp: "Direktemelding",
        email: "Profesjonelle henvendelser",
      },
      ariaPrefix: "Åpne",
    },
    portals: {
      energy: {
        label: "Energiprofil",
        title: "Fornybar energi",
        subtitle: "Utdanning, markedserfaring og datadrevne energiprosjekter på tvers av Norge, Europa, Syria og MENA.",
        primary: "Utdanning",
        secondary: "Arbeid",
        tertiary: "Prosjekter",
        object: "energy",
        primaryItems: [
          { year: "2021", title: "B.Sc. Fornybar energiteknikk", place: "NTNU", text: "Bachelorgrad i fornybar energiteknikk, fullført i 2021." },
          { year: "2026", title: "M.Sc. Renewable Energy Systems", place: "Universitetet i Oslo", text: "Mastergrad i fornybare energisystemer, med fokus på systemer, politisk analyse og økonomi i fornybare energimarkeder, fullført i 2026." },
        ],
        secondaryItems: [
          { year: "2 år", title: "Analyse av fornybare energimarkeder og politikk", place: "EUs fornybare energimarkeder", text: "To års erfaring med analyse av fornybare energimarkeder og fornybar energipolitikk i EU." },
        ],
        tertiaryItems: [
          { name: "Granular Certificates", description: "Kunnskapsplattform for fornybare energisertifikater og markedstransparens.", url: "https://granularcertificates.com" },
          { name: "Syrian Renewables", description: "Data- og analyseplattform for fornybar energi i Syria.", url: "https://syrianrenewables.com" },
          { name: "Energy data tools", description: "Sporere, dashboards og strukturerte datasett for energianalyse.", url: null },
        ],
      },
      volunteer: {
        label: "Samfunnsarbeid",
        title: "Organisert og frivillig arbeid",
        subtitle: "Erfaring med samfunnsledelse, støtte til arabisktalende flyktninger og innvandrere i Norge, mediearbeid og organiserte frivillige initiativer.",
        primary: "Ledelse og organisasjoner",
        secondary: "Media og samfunnsrolle",
        tertiary: "Fokusområder",
        object: "volunteer",
        primaryItems: [
          { year: "2019 · 2021–2023", title: "Radio Mangfold Norge", place: "Frivillig fra 2019; daglig leder 2021–2023", text: "Startet som frivillig i 2019, ble daglig leder i 2021 og ledet organisasjonen til arbeidet ble avsluttet i 2023. Organisasjonen betjente arabisktalende innvandrere og flyktninger i Norge." },
          { year: "2025–present", title: "Norway Now", place: "Grunnlegger og leder", text: "Grunnla Norway Now i 2025 for å støtte arabisktalende flyktninger og innvandrere i Norge og leder plattformen i dag." },
        ],
        secondaryItems: [
          { year: "2022–2025", title: "Syrian Student Organization in Norway", place: "Medieansvarlig", text: "Ble med i organisasjonen i 2022 og var aktiv til 2025, med ansvar for medieavdelingen og kommunikasjonsrelaterte aktiviteter." },
        ],
        tertiaryItems: [
          "Støtte til arabisktalende flyktninger og innvandrere i Norge.",
          "Samfunnsmedia, kommunikasjon og offentlig informasjon.",
          "Organisering av frivillige initiativer og bygging av samfunnsplattformer.",
        ],
      },
      media: {
        label: "Visuell historiefortelling",
        title: "Foto / video / drone",
        subtitle: "En visuell seksjon for fotografi, videoproduksjon, droneopptak og kreativ dokumentasjon.",
        primary: "Foto og video",
        secondary: "Droneproduksjon",
        tertiary: "Visuelt fokus",
        object: "media",
        galleryLabel: "Mediegalleri",
        primaryItems: [
          { year: "Skill", title: "Fotoproduksjon", place: "Fotografi og visuell dokumentasjon", text: "Produksjon av sterkt fotografisk innhold for steder, mennesker, prosjekter, organisasjoner og digitale plattformer." },
          { year: "Skill", title: "Videoproduksjon", place: "Film og visuell historiefortelling", text: "Produksjon av video for kampanjer, sosiale medier, arrangementer, samfunn og prosjektdokumentasjon." },
        ],
        secondaryItems: [
          { year: "Skill", title: "Dronevideo", place: "Luftbilder", text: "Produksjon av dronebasert videoinnhold for steder, prosjekter, arrangementer og visuell dokumentasjon." },
        ],
        tertiaryItems: [
          "Foto for prosjekter, samfunn og steder.",
          "Videofortelling for sosiale medier og kampanjer.",
          "Droneopptak for visuell identitet, dokumentasjon og promotering.",
        ],
      },
      digital: {
        label: "Digitale systemer",
        title: "Digital markedsføring / frilans / nettsider",
        subtitle: "Et målrettet digitalt ferdighetssett for nettsider, sosiale medier, e-postmarkedsføring, strategi, frilans og AI-automatisering.",
        primary: "Digitale kjerneferdigheter",
        secondary: "Strategi og automatisering",
        tertiary: "Tjenesteområder",
        object: "digital",
        primaryItems: [
          { title: "Nettsideutvikling", place: "Webtilstedeværelse og landingssider", text: "Utvikling av ryddige nettsider og landingssider for prosjekter, organisasjoner, tjenester og personlige merkevarer." },
          { title: "Sosiale medier", place: "Digital kommunikasjon", text: "Håndtering av innhold, publiseringsflyt, kampanjer og kommunikasjon på tvers av sosiale medier." },
          { title: "E-postmarkedsføring", place: "Nyhetsbrev og publikumskommunikasjon", text: "Planlegging og håndtering av e-postkampanjer, nyhetsbrev, abonnentkommunikasjon og publikumsoppdateringer." },
        ],
        secondaryItems: [
          { title: "Innholdsplanlegging og strategier", place: "Innholdssystemer", text: "Planlegging av innholdskalendere, kampanjestrukturer, publiseringsstrategier og målrettede budskap." },
          { title: "Frilans og AI-automatisering", place: "Effektiv digital gjennomføring", text: "Kombinerer frilansleveranser med AI-støttede arbeidsflyter, automatisering, research, innholdsproduksjon og praktiske digitale systemer." },
        ],
        tertiaryItems: [
          "Nettsider og landingssider.",
          "Sosiale medier og kampanjeplanlegging.",
          "E-postmarkedsføring, innholdsstrategi, frilans og AI-automatisering.",
        ],
      },
    },
  },
  fr: {
    nav: {
      overview: "Aperçu",
      about: "À propos",
      contact: "Contact",
      theme: "Mode",
      language: "Langue",
      back: "Retour",
      close: "Fermer",
      home: "Accueil de Jakob Olsen",
      brandName: "Jakob Olsen",
      switchLight: "Passer en mode clair",
      switchDark: "Passer en mode sombre",
      primaryNavigation: "Navigation principale",
      portfolioFields: "Domaines du portfolio",
      gateway: "Portail interactif du portfolio",
      portfolioDetails: "Détails du portfolio",
    },
    hero: {
      intro: "Portfolio de Jakob Olsen",
      headline: "Énergies renouvelables et intelligence des données — entre l’Europe et la région MENA.",
      subline: "Je suis Jakob Olsen, analyste syro-norvégien de l’énergie basé à Oslo. Je développe des plateformes de données et publie des analyses de marché sur les certificats d’énergie renouvelable — en anglais et en arabe.",
    },
    modals: {
      overviewTitle: "Aperçu rapide",
      overviewText: "Mon travail associe l’analyse des marchés des énergies renouvelables, des produits de données structurés, la publication bilingue, la communication visuelle et des initiatives numériques portées par les communautés.",
      aboutTitle: "À propos de Jakob Olsen",
      aboutText: "Jakob Olsen — publie également sous le nom de Khaled Al-Asaad. Ce portfolio réunit l’analyse énergétique, la photographie et le drone, des initiatives bénévoles organisées, le marketing digital, le freelance et la création de sites web.",
    },
    gatewayMeta: {
      degree: "diplôme",
      degrees: "diplômes",
      project: "projet",
      projects: "projets",
      organization: "organisation",
      organizations: "organisations",
      focusArea: "axe",
      focusAreas: "axes",
      serviceArea: "service",
      serviceAreas: "services",
    },
    contact: {
      name: "Jakob Olsen",
      role: "Analyste en énergies renouvelables et intelligence des données",
      invitation: "Contactez-moi pour l’analyse des marchés de l’énergie, les certificats renouvelables, la collaboration sur des plateformes de données ou toute demande professionnelle.",
      pageLabel: "Liens de contact",
      subtitles: {
        linkedin: "Profil professionnel",
        granular: "Intelligence des certificats renouvelables",
        "syrian-renewables": "Plateforme de données énergétiques sur la Syrie",
        x: "Notes de marché · @jakobolsen2",
        youtube: "Analyses vidéo",
        instagram: "Actualités visuelles · @jakob.khaled.o",
        tiktok: "Vidéos courtes · @jakob.khaled",
        facebook: "Profil communautaire",
        whatsapp: "Message direct",
        email: "Demandes professionnelles",
      },
      ariaPrefix: "Ouvrir",
    },
    portals: {
      energy: {
        label: "Profil énergie",
        title: "Énergies renouvelables",
        subtitle: "Formation, expérience en analyse de marché et projets énergétiques fondés sur les données entre la Norvège, l’Europe, la Syrie et la région MENA.",
        primary: "Formation",
        secondary: "Expérience",
        tertiary: "Projets",
        object: "energy",
        primaryItems: [
          { year: "2021", title: "B.Sc. Ingénierie des énergies renouvelables", place: "NTNU", text: "Licence en ingénierie des énergies renouvelables, terminée en 2021." },
          { year: "2026", title: "M.Sc. Renewable Energy Systems", place: "Université d’Oslo", text: "Master en systèmes d’énergies renouvelables, axé sur les systèmes, l’analyse des politiques et l’économie des marchés renouvelables, terminé en 2026." },
        ],
        secondaryItems: [
          { year: "2 ans", title: "Analyse des marchés et politiques des énergies renouvelables", place: "Marchés renouvelables de l’Union européenne", text: "Deux ans d’expérience dans l’analyse des marchés et politiques des énergies renouvelables dans l’Union européenne." },
        ],
        tertiaryItems: [
          { name: "Granular Certificates", description: "Plateforme de connaissance sur les certificats d’énergie renouvelable et la transparence des marchés.", url: "https://granularcertificates.com" },
          { name: "Syrian Renewables", description: "Plateforme de données et d’intelligence pour les énergies renouvelables en Syrie.", url: "https://syrianrenewables.com" },
          { name: "Energy data tools", description: "Outils de suivi, tableaux de bord et jeux de données structurés pour l’analyse énergétique.", url: null },
        ],
      },
      volunteer: {
        label: "Impact communautaire",
        title: "Organisations et bénévolat",
        subtitle: "Leadership communautaire, soutien aux réfugiés et immigrés arabophones en Norvège, communication et initiatives bénévoles organisées.",
        primary: "Leadership et organisations",
        secondary: "Médias et rôle communautaire",
        tertiary: "Axes de travail",
        object: "volunteer",
        primaryItems: [
          { year: "2019 · 2021–2023", title: "Radio Mangfold Norge", place: "Bénévole dès 2019 ; directeur général 2021–2023", text: "A commencé comme bénévole en 2019, est devenu directeur général en 2021 et a dirigé l’organisation jusqu’à la fin de ses activités en 2023. L’organisation accompagnait les immigrés et réfugiés arabophones en Norvège." },
          { year: "2025–present", title: "Norway Now", place: "Fondateur et directeur", text: "A fondé Norway Now en 2025 pour soutenir les réfugiés et immigrés arabophones en Norvège et dirige actuellement la plateforme." },
        ],
        secondaryItems: [
          { year: "2022–2025", title: "Syrian Student Organization in Norway", place: "Responsable médias", text: "A rejoint l’organisation en 2022 et y est resté actif jusqu’en 2025, avec la responsabilité du département médias et des activités de communication." },
        ],
        tertiaryItems: [
          "Soutien aux réfugiés et immigrés arabophones en Norvège.",
          "Médias communautaires, communication et information publique.",
          "Organisation d’initiatives bénévoles et création de plateformes communautaires.",
        ],
      },
      media: {
        label: "Storytelling visuel",
        title: "Photo / vidéo / drone",
        subtitle: "Une section visuelle dédiée à la photographie, à la production vidéo, aux images drone et à la documentation créative.",
        primary: "Photo et vidéo",
        secondary: "Production drone",
        tertiary: "Focus visuel",
        object: "media",
        galleryLabel: "Galerie média",
        primaryItems: [
          { year: "Skill", title: "Production photo", place: "Photographie et documentation visuelle", text: "Création de contenu photographique fort pour des lieux, personnes, projets, organisations et plateformes digitales." },
          { year: "Skill", title: "Production vidéo", place: "Tournage et storytelling visuel", text: "Production de vidéos pour les campagnes, les réseaux sociaux, les événements, les communautés et la documentation de projets." },
        ],
        secondaryItems: [
          { year: "Skill", title: "Vidéo drone", place: "Images aériennes", text: "Production de contenu vidéo par drone pour des lieux, projets, événements et besoins de documentation visuelle." },
        ],
        tertiaryItems: [
          "Photographie pour les projets, les communautés et les lieux.",
          "Storytelling vidéo pour les réseaux sociaux et les campagnes.",
          "Images drone pour l’identité visuelle, la documentation et la promotion.",
        ],
      },
      digital: {
        label: "Systèmes digitaux",
        title: "Marketing digital / freelance / création de sites",
        subtitle: "Un ensemble ciblé de compétences digitales pour les sites web, les réseaux sociaux, l’email marketing, la stratégie, le freelance et l’automatisation IA.",
        primary: "Compétences digitales",
        secondary: "Stratégie et automatisation",
        tertiary: "Services",
        object: "digital",
        primaryItems: [
          { title: "Création de sites web", place: "Présence web et landing pages", text: "Création de sites et de landing pages clairs pour des projets, organisations, services et marques personnelles." },
          { title: "Gestion des réseaux sociaux", place: "Communication digitale", text: "Gestion du contenu, des workflows de publication, des campagnes et de la communication sur les réseaux sociaux." },
          { title: "Email marketing", place: "Newsletters et communication d’audience", text: "Planification et gestion de campagnes email, newsletters, communication avec les abonnés et mises à jour d’audience." },
        ],
        secondaryItems: [
          { title: "Planification et stratégies de contenu", place: "Systèmes de contenu", text: "Planification de calendriers éditoriaux, structures de campagnes, stratégies de publication et messages orientés audience." },
          { title: "Freelance et automatisation IA", place: "Exécution digitale efficace", text: "Association de prestations freelance avec des workflows assistés par IA, l’automatisation, la recherche, la production de contenu et des systèmes digitaux pratiques." },
        ],
        tertiaryItems: [
          "Création de sites et de landing pages.",
          "Gestion des réseaux sociaux et planification de campagnes.",
          "Email marketing, stratégie de contenu, freelance et automatisation IA.",
        ],
      },
    },
  },
};

function collectShape(value, path = "", shape = new Set()) {
  if (Array.isArray(value)) {
    shape.add(`${path}[]`);
    value.forEach((item) => collectShape(item, `${path}[]`, shape));
    return shape;
  }

  if (value && typeof value === "object") {
    Object.keys(value).forEach((key) => {
      const nextPath = path ? `${path}.${key}` : key;
      shape.add(nextPath);
      collectShape(value[key], nextPath, shape);
    });
  }

  return shape;
}

export function getLocaleKeyMismatches(source = content) {
  const locales = Object.keys(source);
  const baseline = locales[0];
  const baselineShape = collectShape(source[baseline]);
  const mismatches = [];

  locales.slice(1).forEach((locale) => {
    const localeShape = collectShape(source[locale]);
    const missing = [...baselineShape].filter((key) => !localeShape.has(key));
    const extra = [...localeShape].filter((key) => !baselineShape.has(key));

    if (missing.length || extra.length) {
      mismatches.push({ locale, missing, extra });
    }
  });

  return mismatches;
}

if (import.meta.env?.DEV) {
  const mismatches = getLocaleKeyMismatches();
  if (mismatches.length) {
    console.error("Portfolio locale key mismatch", mismatches);
  }
}
