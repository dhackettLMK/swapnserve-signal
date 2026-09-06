/**
 * The browsable signal pool. Each signal is tagged by sector (cause) and
 * geography, so the console can filter by country x sector across four lenses
 * and return real, cited results for any combination. Every item carries a
 * follow-up link: an apply/info page for funding and programmes, the official
 * text for policy, a methodology for impact, a contact route for partners.
 *
 * Gathered from Cala (knowledge_search and the entity workflow) plus primary
 * sources, 2026-09-06. "eu" geography matches every EU/EEA country (not the UK,
 * which left the EU programmes). Confidence is honest: "verified" where an
 * official source states it, "single-source" otherwise.
 */

export type Lens = "funding" | "policy" | "partners" | "impact";

export type Cause =
  | "Circular economy & reuse"
  | "Environment & climate"
  | "Social inclusion"
  | "Youth & education"
  | "Arts & culture"
  | "Health & wellbeing";

export type Confidence = "verified" | "single-source" | "inferred";

export type Signal = {
  lens: Lens;
  title: string;
  detail: string;
  causes: Cause[];
  /** Country names, or "eu" to match every EU/EEA country. */
  geographies: (string | "eu")[];
  confidence: Confidence;
  sourceLabel: string;
  sourceUrl: string;
  actionLabel: string;
  actionUrl: string;
  via: string;
};

export const COUNTRIES = [
  "Ireland",
  "United Kingdom",
  "France",
  "Germany",
  "Spain",
  "Netherlands",
  "Portugal",
  "Poland",
  "Sweden",
  "Italy",
  "Belgium",
  "Denmark",
  "Other EU / EEA",
];

export const CAUSES: Cause[] = [
  "Circular economy & reuse",
  "Environment & climate",
  "Social inclusion",
  "Youth & education",
  "Arts & culture",
  "Health & wellbeing",
];

export const LEGAL_STATUSES = [
  "Unincorporated",
  "Registered charity",
  "Company limited by guarantee",
  "Cooperative / social enterprise",
];

export const LENS_LABEL: Record<Lens, string> = {
  funding: "Funding fit",
  policy: "Regulatory exposure",
  partners: "Partner angles",
  impact: "Impact framing",
};

const ALL: Cause[] = CAUSES;

export const SIGNALS: Signal[] = [
  // ---------------- EU-wide funding ----------------
  {
    lens: "funding",
    title: "European Solidarity Corps, Solidarity Projects",
    detail:
      "Groups of at least 5 young people (18–30) run their own 2–12 month local project. Informal groups can apply, no established NGO needed. 2026 call over €129m.",
    causes: ["Youth & education", "Social inclusion", "Environment & climate", "Circular economy & reuse"],
    geographies: ["eu"],
    confidence: "verified",
    sourceLabel: "youth.europa.eu",
    sourceUrl: "https://youth.europa.eu/solidarity/organisations/solidarity-projects_en",
    actionLabel: "Apply / info",
    actionUrl: "https://youth.europa.eu/solidarity/organisations/solidarity-projects_en",
    via: "knowledge_search",
  },
  {
    lens: "funding",
    title: "Erasmus+ (Youth strand)",
    detail:
      "Youth exchanges and youth participation activities, open to informal groups of young people via the National Agency. Grants cover activity costs.",
    causes: ["Youth & education", "Social inclusion", "Arts & culture"],
    geographies: ["eu"],
    confidence: "verified",
    sourceLabel: "erasmus-plus.ec.europa.eu",
    sourceUrl: "https://erasmus-plus.ec.europa.eu/opportunities/opportunities-for-individuals/youth-participation-activities",
    actionLabel: "Apply / info",
    actionUrl: "https://erasmus-plus.ec.europa.eu/opportunities/opportunities-for-individuals/youth-participation-activities",
    via: "knowledge_search",
  },
  {
    lens: "funding",
    title: "LIFE Programme (Environment & Climate Action)",
    detail:
      "The EU's dedicated environment and climate fund. Circular Economy & Quality of Life sub-programme; open to NGOs and community groups; up to 60% co-funding.",
    causes: ["Circular economy & reuse", "Environment & climate"],
    geographies: ["eu"],
    confidence: "verified",
    sourceLabel: "cinea.ec.europa.eu",
    sourceUrl: "https://cinea.ec.europa.eu/programmes/life_en",
    actionLabel: "Apply / info",
    actionUrl: "https://ec.europa.eu/info/funding-tenders/opportunities/portal/screen/programmes/life2027",
    via: "knowledge_search",
  },
  {
    lens: "funding",
    title: "Creative Europe (Culture strand)",
    detail:
      "The EU's dedicated culture programme: cooperation projects, networks, and Culture Moves Europe mobility grants. €396m proposed for 2026. Apply via your national Creative Europe Desk.",
    causes: ["Arts & culture"],
    geographies: ["eu"],
    confidence: "verified",
    sourceLabel: "culture.ec.europa.eu",
    sourceUrl: "https://culture.ec.europa.eu/creative-europe",
    actionLabel: "Apply / info",
    actionUrl: "https://culture.ec.europa.eu/creative-europe",
    via: "knowledge_search",
  },
  {
    lens: "funding",
    title: "EU4Health",
    detail:
      "The EU's largest health programme, managed by HaDEA. Funds disease prevention, mental health and civil-society operational grants. Calls on the Funding & Tenders Portal.",
    causes: ["Health & wellbeing"],
    geographies: ["eu"],
    confidence: "verified",
    sourceLabel: "hadea.ec.europa.eu",
    sourceUrl: "https://hadea.ec.europa.eu/programmes/eu4health_en",
    actionLabel: "Apply / info",
    actionUrl: "https://ec.europa.eu/info/funding-tenders/opportunities/portal/screen/home",
    via: "knowledge_search",
  },
  {
    lens: "funding",
    title: "Citizens, Equality, Rights and Values (CERV)",
    detail:
      "Funds civic engagement, equality and rights projects by civil-society organisations. Strand grants from about €75k. Apply via the EU Funding & Tenders Portal.",
    causes: ["Social inclusion", "Arts & culture", "Health & wellbeing"],
    geographies: ["eu"],
    confidence: "verified",
    sourceLabel: "commission.europa.eu",
    sourceUrl: "https://commission.europa.eu/funding-tenders/find-funding/eu-funding-programmes/citizens-equality-rights-and-values-programme/citizens-equality-rights-and-values-programme-overview_en",
    actionLabel: "Apply / info",
    actionUrl: "https://ec.europa.eu/info/funding-tenders/opportunities/portal/screen/home",
    via: "knowledge_search",
  },
  {
    lens: "funding",
    title: "European Social Fund Plus (ESF+)",
    detail:
      "The EU's main fund for people: social inclusion, anti-poverty (with a material-deprivation strand), youth employment and health equity. Accessed through the national managing authority.",
    causes: ["Social inclusion", "Health & wellbeing", "Youth & education"],
    geographies: ["eu"],
    confidence: "verified",
    sourceLabel: "european-social-fund-plus.ec.europa.eu",
    sourceUrl: "https://european-social-fund-plus.ec.europa.eu/en",
    actionLabel: "Apply / info",
    actionUrl: "https://european-social-fund-plus.ec.europa.eu/en",
    via: "knowledge_search",
  },

  // ---------------- Ireland funding ----------------
  {
    lens: "funding",
    title: "Circular Economy Innovation Grant Scheme (CEIGS)",
    detail:
      "€40k–€50k from the Dept of Climate, Energy & Environment, administered by Community Foundation Ireland. Open to voluntary and community organisations; textiles a named priority.",
    causes: ["Circular economy & reuse", "Environment & climate"],
    geographies: ["Ireland"],
    confidence: "verified",
    sourceLabel: "gov.ie",
    sourceUrl: "https://www.gov.ie/en/department-of-climate-energy-and-the-environment/press-releases/applications-now-open-for-2025-circular-economy-innovation-grant-scheme",
    actionLabel: "Apply / info",
    actionUrl: "https://www.communityfoundation.ie",
    via: "knowledge_search",
  },
  {
    lens: "funding",
    title: "Community Climate Action Programme (CCAP) Phase II",
    detail:
      "€20k–€100k via local councils for circular-living, upcycling, library-of-things and fix-it projects. Apply through Limerick City and County Council when the round opens.",
    causes: ["Circular economy & reuse", "Environment & climate"],
    geographies: ["Ireland"],
    confidence: "verified",
    sourceLabel: "circular.ie",
    sourceUrl: "https://circular.ie/articles/community-climate-fund-phase-ii",
    actionLabel: "Apply / info",
    actionUrl: "https://www.limerick.ie",
    via: "knowledge_search",
  },
  {
    lens: "funding",
    title: "EPA Green Enterprise",
    detail:
      "Competitive EPA innovation and seed funding for circular-economy projects, including textile upcycling. Usually expects a constituted applicant.",
    causes: ["Circular economy & reuse", "Environment & climate"],
    geographies: ["Ireland"],
    confidence: "single-source",
    sourceLabel: "epa.ie",
    sourceUrl: "https://www.epa.ie/environment-and-you/circular-economy",
    actionLabel: "Apply / info",
    actionUrl: "https://www.epa.ie/our-services/research/green-enterprise",
    via: "knowledge_search",
  },

  // ---------------- UK funding ----------------
  {
    lens: "funding",
    title: "National Lottery Community Fund, Awards for All",
    detail:
      "£300–£10,000 for community projects across arts, sport, heritage, education, environment and community health. The UK's largest community funder.",
    causes: ["Social inclusion", "Arts & culture", "Environment & climate", "Health & wellbeing", "Youth & education", "Circular economy & reuse"],
    geographies: ["United Kingdom"],
    confidence: "verified",
    sourceLabel: "tnlcommunityfund.org.uk",
    sourceUrl: "https://www.tnlcommunityfund.org.uk",
    actionLabel: "Apply / info",
    actionUrl: "https://www.tnlcommunityfund.org.uk",
    via: "knowledge_search",
  },
  {
    lens: "funding",
    title: "Arts Council England, National Lottery Project Grants",
    detail:
      "£1,000–£100,000 for arts, libraries and museum projects in England, including community and individual artists. Rolling deadlines.",
    causes: ["Arts & culture"],
    geographies: ["United Kingdom"],
    confidence: "verified",
    sourceLabel: "artscouncil.org.uk",
    sourceUrl: "https://www.artscouncil.org.uk/ProjectGrants",
    actionLabel: "Apply / info",
    actionUrl: "https://www.artscouncil.org.uk/ProjectGrants",
    via: "knowledge_search",
  },
  {
    lens: "funding",
    title: "Greggs Foundation Community Grants",
    detail:
      "Up to £20,000 for local not-for-profit organisations working to strengthen their communities across the UK.",
    causes: ["Social inclusion", "Health & wellbeing"],
    geographies: ["United Kingdom"],
    confidence: "single-source",
    sourceLabel: "greggsfoundation.org.uk",
    sourceUrl: "https://www.greggsfoundation.org.uk",
    actionLabel: "Apply / info",
    actionUrl: "https://www.greggsfoundation.org.uk",
    via: "knowledge_search",
  },

  // ---------------- France funding ----------------
  {
    lens: "funding",
    title: "FDVA, Fonds pour le développement de la vie associative",
    detail:
      "State fund for associations: volunteer training (FDVA 1) and operations or innovative projects (FDVA 2), with small associations a priority. Apply on Le Compte Asso.",
    causes: ["Social inclusion", "Youth & education", "Arts & culture", "Environment & climate"],
    geographies: ["France"],
    confidence: "verified",
    sourceLabel: "associations.gouv.fr",
    sourceUrl: "https://lecompteasso.associations.gouv.fr",
    actionLabel: "Apply / info",
    actionUrl: "https://lecompteasso.associations.gouv.fr",
    via: "knowledge_search",
  },
  {
    lens: "funding",
    title: "Politique de la Ville grants (ANCT)",
    detail:
      "Annual state grants to associations working in priority urban neighbourhoods (QPV), covering education, employment, social cohesion and mediation. Apply via the Dauphin portal.",
    causes: ["Social inclusion", "Youth & education"],
    geographies: ["France"],
    confidence: "verified",
    sourceLabel: "anct.gouv.fr",
    sourceUrl: "https://agence-cohesion-territoires.gouv.fr/subventions-de-la-politique-de-la-ville-101",
    actionLabel: "Apply / info",
    actionUrl: "https://usager-dauphin.cget.gouv.fr",
    via: "knowledge_search",
  },

  // ---------------- Germany funding ----------------
  {
    lens: "funding",
    title: "Aktion Mensch",
    detail:
      "Germany's largest social-sector funder (lottery-financed). Grants up to €10,000 for inclusive community, neighbourhood and arts projects; supports up to 1,000 projects a month.",
    causes: ["Social inclusion", "Arts & culture", "Youth & education"],
    geographies: ["Germany"],
    confidence: "verified",
    sourceLabel: "aktion-mensch.de",
    sourceUrl: "https://www.aktion-mensch.de/foerderung",
    actionLabel: "Apply / info",
    actionUrl: "https://www.aktion-mensch.de/foerderung",
    via: "knowledge_search",
  },
  {
    lens: "funding",
    title: "Demokratie leben! (BMFSFJ)",
    detail:
      "The federal grant scheme for democracy promotion, civic engagement and countering hate and discrimination. Local Partnerships for Democracy fund projects up to about €10,000.",
    causes: ["Social inclusion", "Youth & education"],
    geographies: ["Germany"],
    confidence: "verified",
    sourceLabel: "demokratie-leben.de",
    sourceUrl: "https://www.demokratie-leben.de",
    actionLabel: "Apply / info",
    actionUrl: "https://www.demokratie-leben.de",
    via: "knowledge_search",
  },
  {
    lens: "funding",
    title: "Deutsche Stiftung für Engagement und Ehrenamt (DSEE)",
    detail:
      "Federal foundation strengthening volunteering: micro-grants and programme funding for associations, plus a national funding database.",
    causes: ["Social inclusion", "Environment & climate", "Health & wellbeing"],
    geographies: ["Germany"],
    confidence: "single-source",
    sourceLabel: "deutsche-stiftung-engagement-und-ehrenamt.de",
    sourceUrl: "https://www.deutsche-stiftung-engagement-und-ehrenamt.de",
    actionLabel: "Apply / info",
    actionUrl: "https://www.deutsche-stiftung-engagement-und-ehrenamt.de",
    via: "knowledge_search",
  },

  // ---------------- Spain funding ----------------
  {
    lens: "funding",
    title: "Subvenciones del 0,7% (IRPF / Impuesto de Sociedades)",
    detail:
      "The largest national fund for the Third Sector: €94m in 2025, rising in 2026. Priorities include social inclusion, disability, vulnerable groups and the environment. Calls in the BOE.",
    causes: ["Social inclusion", "Health & wellbeing", "Environment & climate"],
    geographies: ["Spain"],
    confidence: "verified",
    sourceLabel: "dsca.gob.es",
    sourceUrl: "https://www.dsca.gob.es",
    actionLabel: "Apply / info",
    actionUrl: "https://www.dsca.gob.es",
    via: "knowledge_search",
  },
  {
    lens: "funding",
    title: "Ministerio de Cultura, ayudas a entidades sin ánimo de lucro",
    detail:
      "Annual national grants for non-profit cultural action and promotion, supporting innovation and professionalisation of the creative sector. Calls published in the BOE.",
    causes: ["Arts & culture"],
    geographies: ["Spain"],
    confidence: "single-source",
    sourceLabel: "cultura.gob.es",
    sourceUrl: "https://www.cultura.gob.es",
    actionLabel: "Apply / info",
    actionUrl: "https://www.cultura.gob.es",
    via: "knowledge_search",
  },

  // ---------------- Netherlands funding ----------------
  {
    lens: "funding",
    title: "Rijksoverheid subsidies (via RVO)",
    detail:
      "National government subsidies administered by the Netherlands Enterprise Agency (RVO), open to civil-society and non-profits across nature, biodiversity and social-impact themes. Use the Subsidies and schemes tool.",
    causes: ["Environment & climate", "Circular economy & reuse", "Social inclusion"],
    geographies: ["Netherlands"],
    confidence: "single-source",
    sourceLabel: "rvo.nl",
    sourceUrl: "https://www.rvo.nl/subsidies-financiering",
    actionLabel: "Apply / info",
    actionUrl: "https://www.rvo.nl/subsidies-financiering",
    via: "knowledge_search",
  },

  // ---------------- Portugal funding ----------------
  {
    lens: "funding",
    title: "EEA Grants Portugal, Civil Society Fund",
    detail:
      "The EEA Grants 2021–2028 cycle allocates €126.3m to Portugal across five programmes, with a Civil Society Fund operated by the Calouste Gulbenkian Foundation supporting NGOs and community groups directly.",
    causes: ["Social inclusion", "Environment & climate", "Arts & culture"],
    geographies: ["Portugal"],
    confidence: "verified",
    sourceLabel: "eeagrants.org",
    sourceUrl: "https://eeagrants.org/en/portugal",
    actionLabel: "Apply / info",
    actionUrl: "https://eeagrants.org/en/portugal",
    via: "knowledge_search",
  },
  {
    lens: "funding",
    title: "Social Security cooperation agreements (IPSS)",
    detail:
      "The main ongoing state funding for Portuguese social-sector bodies: cooperation agreements between the Instituto da Segurança Social and Private Institutions of Social Solidarity (IPSS) for childcare, eldercare and social services. Requires IPSS status, so a constituted body, not an informal group.",
    causes: ["Social inclusion", "Health & wellbeing"],
    geographies: ["Portugal"],
    confidence: "single-source",
    sourceLabel: "seg-social.pt",
    sourceUrl: "https://www.seg-social.pt",
    actionLabel: "Info",
    actionUrl: "https://www.seg-social.pt",
    via: "knowledge_search",
  },

  // ---------------- Poland funding ----------------
  {
    lens: "funding",
    title: "NOWEFIO, Fundusz Inicjatyw Obywatelskich",
    detail:
      "The government Civic Initiatives Fund (2021–2030), managed by NIW-CRSO. Priority 1 backs small, local and young organisations and informal groups (through a patron operator). About 73m PLN awarded in the 2026 edition.",
    causes: ["Social inclusion", "Youth & education", "Environment & climate"],
    geographies: ["Poland"],
    confidence: "verified",
    sourceLabel: "niw.gov.pl",
    sourceUrl: "https://niw.gov.pl/en/",
    actionLabel: "Apply / info",
    actionUrl: "https://niw.gov.pl/en/",
    via: "knowledge_search",
  },
  {
    lens: "funding",
    title: "PROO, Civil Society Organisations Development Programme",
    detail:
      "The first direct institutional-development grant for Polish civil-society organisations (2018–2030), managed by NIW-CRSO. Funds long-term strategy, reserves and emergency support, with no own contribution required. 585m PLN across the programme.",
    causes: ["Social inclusion"],
    geographies: ["Poland"],
    confidence: "verified",
    sourceLabel: "niw.gov.pl",
    sourceUrl: "https://niw.gov.pl/en/our-programmes/csodp",
    actionLabel: "Apply / info",
    actionUrl: "https://niw.gov.pl/en/our-programmes/csodp",
    via: "knowledge_search",
  },
  {
    lens: "funding",
    title: "Fundusz Młodzieżowy (Youth Fund)",
    detail:
      "A government programme (2022–2033) for youth civic engagement and youth-led organisations, managed by NIW-CRSO and distributed both centrally and through regional operators in each voivodeship.",
    causes: ["Youth & education", "Social inclusion"],
    geographies: ["Poland"],
    confidence: "verified",
    sourceLabel: "niw.gov.pl",
    sourceUrl: "https://niw.gov.pl/nasze-programy/fundusz-mlodziezowy",
    actionLabel: "Apply / info",
    actionUrl: "https://niw.gov.pl/nasze-programy/fundusz-mlodziezowy",
    via: "knowledge_search",
  },

  // ---------------- Sweden funding ----------------
  {
    lens: "funding",
    title: "MUCF, state grants to youth and civil society",
    detail:
      "The Swedish Agency for Youth and Civil Society distributes state grants to nonprofit and youth organisations. Organisational grants for child and youth bodies ran to about SEK 262m for 110 organisations in 2024; only Swedish organisations qualify.",
    causes: ["Youth & education", "Social inclusion"],
    geographies: ["Sweden"],
    confidence: "verified",
    sourceLabel: "mucf.se",
    sourceUrl: "https://www.mucf.se/en/grants",
    actionLabel: "Apply / info",
    actionUrl: "https://www.mucf.se/en/grants",
    via: "knowledge_search",
  },
  {
    lens: "funding",
    title: "Allmänna arvsfonden (Swedish Inheritance Fund)",
    detail:
      "A state fund financing innovative nonprofit projects for children, young people, older people and people with disabilities. About 500 projects funded each year; a well-known launchpad for new Swedish social initiatives.",
    causes: ["Social inclusion", "Youth & education", "Health & wellbeing"],
    geographies: ["Sweden"],
    confidence: "verified",
    sourceLabel: "arvsfonden.se",
    sourceUrl: "https://www.arvsfonden.se",
    actionLabel: "Apply / info",
    actionUrl: "https://www.arvsfonden.se",
    via: "knowledge_search",
  },

  // ---------------- Italy funding ----------------
  {
    lens: "funding",
    title: "Fondo per il Terzo Settore (Art. 72)",
    detail:
      "The main national project fund for Italy's Third Sector, run by the Ministry of Labour and Social Policies: €141m for 2025–2027, awarded through periodic calls (for example Avviso 2/2025). Requires registration in the RUNTS (Third Sector register).",
    causes: ["Social inclusion", "Environment & climate", "Youth & education"],
    geographies: ["Italy"],
    confidence: "verified",
    sourceLabel: "lavoro.gov.it",
    sourceUrl: "https://www.lavoro.gov.it",
    actionLabel: "Apply / info",
    actionUrl: "https://www.lavoro.gov.it",
    via: "knowledge_search",
  },
  {
    lens: "funding",
    title: "5 per mille (Cinque per Mille)",
    detail:
      "Italian taxpayers can direct 0.5% of their income tax to a Third Sector entity, worth about €500m a year across 40,000+ organisations. Register in the RUNTS and enrol with the Ministry of Labour by 10 April to take part.",
    causes: ["Social inclusion", "Health & wellbeing", "Arts & culture", "Environment & climate"],
    geographies: ["Italy"],
    confidence: "verified",
    sourceLabel: "lavoro.gov.it",
    sourceUrl: "https://www.lavoro.gov.it/temi-e-priorita/terzo-settore-e-responsabilita-sociale-imprese/focus-on/cinque-per-mille",
    actionLabel: "Info",
    actionUrl: "https://www.lavoro.gov.it/temi-e-priorita/terzo-settore-e-responsabilita-sociale-imprese/focus-on/cinque-per-mille",
    via: "knowledge_search",
  },

  // ---------------- Belgium funding ----------------
  {
    lens: "funding",
    title: "Loterie Nationale / Nationale Loterij",
    detail:
      "The Belgian National Lottery directs about €185m a year to good causes, most of it to humanitarian and social projects, through regular open calls (recent rounds on child poverty and sustainable development).",
    causes: ["Social inclusion", "Arts & culture", "Health & wellbeing", "Environment & climate"],
    geographies: ["Belgium"],
    confidence: "verified",
    sourceLabel: "loterie-nationale.be",
    sourceUrl: "https://www.loterie-nationale.be",
    actionLabel: "Calls / info",
    actionUrl: "https://www.loterie-nationale.be",
    via: "knowledge_search",
  },
  {
    lens: "funding",
    title: "King Baudouin Foundation",
    detail:
      "Belgium's largest independent foundation and a major grant-maker across social justice and poverty, civil-society strengthening, mental health and community development, through regular calls for proposals and hundreds of named funds.",
    causes: ["Social inclusion", "Health & wellbeing", "Arts & culture", "Youth & education"],
    geographies: ["Belgium"],
    confidence: "verified",
    sourceLabel: "kbs-frb.be",
    sourceUrl: "https://kbs-frb.be/en",
    actionLabel: "Calls / info",
    actionUrl: "https://kbs-frb.be/en",
    via: "knowledge_search",
  },

  // ---------------- Denmark funding ----------------
  {
    lens: "funding",
    title: "Nordea-fonden",
    detail:
      "A large Danish foundation funding projects that promote a good life and wellbeing in Denmark, spanning community, culture, sport and nature. Open to Danish associations and community groups.",
    causes: ["Arts & culture", "Social inclusion", "Health & wellbeing", "Environment & climate"],
    geographies: ["Denmark"],
    confidence: "single-source",
    sourceLabel: "nordeafonden.dk",
    sourceUrl: "https://nordeafonden.dk",
    actionLabel: "Apply / info",
    actionUrl: "https://nordeafonden.dk",
    via: "knowledge_search",
  },
  {
    lens: "funding",
    title: "Civilsamfundspuljen (Civil Society Fund)",
    detail:
      "Denmark's main civil-society grant pool, funded by the Ministry of Foreign Affairs and managed by CISU. Small projects up to DKK 150k, large up to DKK 700k. Note: it funds rights-based development work by Danish organisations with partners in developing countries, not purely domestic activity.",
    causes: ["Social inclusion"],
    geographies: ["Denmark"],
    confidence: "verified",
    sourceLabel: "cisu.dk",
    sourceUrl: "https://www.cisu.dk/en/funding",
    actionLabel: "Apply / info",
    actionUrl: "https://www.cisu.dk/en/funding",
    via: "knowledge_search",
  },

  // ---------------- Nordic (cross-border) ----------------
  {
    lens: "funding",
    title: "Demos, Nordic Civil Society Collaboration",
    detail:
      "A Nordic programme giving up to €50,000 to nonprofits for cross-border projects involving at least three Nordic countries, for democratic engagement, exchange and joint cultural work. At least 15% co-funding required.",
    causes: ["Social inclusion", "Arts & culture", "Youth & education"],
    geographies: ["Sweden", "Denmark"],
    confidence: "single-source",
    sourceLabel: "fundsforngos.org",
    sourceUrl: "https://www2.fundsforngos.org/democracy-good-governance/demos-funding-programme-for-nordic-civil-society-collaboration",
    actionLabel: "Info",
    actionUrl: "https://www2.fundsforngos.org/democracy-good-governance/demos-funding-programme-for-nordic-civil-society-collaboration",
    via: "knowledge_search",
  },

  // ---------------- Policy (EU) ----------------
  {
    lens: "policy",
    title: "Directive (EU) 2025/1892, textile EPR",
    detail:
      "From ~2028, producers placing textiles on the market fund collection, sorting and reuse. Transpose by 17 Jun 2027, schemes live by 17 Apr 2028. Social-economy operators are exempt and served at no cost.",
    causes: ["Circular economy & reuse", "Environment & climate"],
    geographies: ["eu"],
    confidence: "verified",
    sourceLabel: "environment.ec.europa.eu",
    sourceUrl: "https://environment.ec.europa.eu/news/revised-waste-framework-directive-enters-force-2025-10-16_en",
    actionLabel: "Read the rule",
    actionUrl: "https://environment.ec.europa.eu/news/revised-waste-framework-directive-enters-force-2025-10-16_en",
    via: "primary source",
  },
  {
    lens: "policy",
    title: "Ecodesign for Sustainable Products Regulation (ESPR) + Digital Product Passport",
    detail:
      "Regulation (EU) 2024/1781. Textiles are a priority group; a delegated act (expected 2027) will require durability, recycled content and a Digital Product Passport on every garment sold in the EU. Destruction of unsold textiles banned for large firms from 2026.",
    causes: ["Circular economy & reuse"],
    geographies: ["eu"],
    confidence: "verified",
    sourceLabel: "consilium.europa.eu",
    sourceUrl: "https://www.consilium.europa.eu/en/policies/ecodesign-requirements-for-more-sustainable-products",
    actionLabel: "Read the rule",
    actionUrl: "https://www.consilium.europa.eu/en/policies/ecodesign-requirements-for-more-sustainable-products",
    via: "knowledge_search",
  },
  {
    lens: "policy",
    title: "CSRD after the 2026 Omnibus",
    detail:
      "Directive (EU) 2026/470 narrowed mandatory sustainability reporting to firms over 1,000 employees and €450m turnover, exempting ~80–90% of previously covered companies. Pitch corporate partners on voluntary or value-chain grounds, not obligation.",
    causes: ["Environment & climate", "Social inclusion", "Circular economy & reuse"],
    geographies: ["eu"],
    confidence: "verified",
    sourceLabel: "eur-lex.europa.eu",
    sourceUrl: "https://eur-lex.europa.eu",
    actionLabel: "Read the rule",
    actionUrl: "https://eur-lex.europa.eu",
    via: "knowledge_search",
  },
  {
    lens: "policy",
    title: "EU Social Economy Action Plan",
    detail:
      "A 2021–2026 Commission plan to improve framework conditions, finance and visibility for social-economy organisations, with a Council Recommendation and an EU Social Economy Gateway.",
    causes: ["Social inclusion", "Circular economy & reuse"],
    geographies: ["eu"],
    confidence: "verified",
    sourceLabel: "social-economy-gateway.ec.europa.eu",
    sourceUrl: "https://social-economy-gateway.ec.europa.eu",
    actionLabel: "Read the plan",
    actionUrl: "https://social-economy-gateway.ec.europa.eu",
    via: "knowledge_search",
  },
  {
    lens: "policy",
    title: "EU Youth Strategy 2019–2027",
    detail:
      "The framework for EU youth cooperation, built on Engage, Connect, Empower and 11 European Youth Goals. Underpins Erasmus+ Youth and the European Solidarity Corps.",
    causes: ["Youth & education"],
    geographies: ["eu"],
    confidence: "verified",
    sourceLabel: "youth.europa.eu",
    sourceUrl: "https://youth.europa.eu/strategy_en",
    actionLabel: "Read the strategy",
    actionUrl: "https://youth.europa.eu/strategy_en",
    via: "knowledge_search",
  },
  {
    lens: "policy",
    title: "New European Bauhaus",
    detail:
      "The Commission initiative linking sustainability, aesthetics and inclusion, with ~€557m via Horizon Europe and calls for community and cultural projects. Motto: beautiful, sustainable, together.",
    causes: ["Arts & culture", "Environment & climate"],
    geographies: ["eu"],
    confidence: "verified",
    sourceLabel: "new-european-bauhaus.europa.eu",
    sourceUrl: "https://new-european-bauhaus.europa.eu",
    actionLabel: "Explore + funding",
    actionUrl: "https://new-european-bauhaus.europa.eu",
    via: "knowledge_search",
  },

  // ---------------- Impact ----------------
  {
    lens: "impact",
    title: "2.4 to 25 kg CO2e avoided per kg of clothing reused",
    detail:
      "Life-cycle studies range from 2.4 kg per kg collected (full-chain system average, Refashion/Deloitte) to 25 kg per kg assuming full displacement (UPC). State your substitution rate and system boundary; never assume one-for-one.",
    causes: ["Circular economy & reuse"],
    geographies: ["eu", "United Kingdom"],
    confidence: "single-source",
    sourceLabel: "refashion / euric",
    sourceUrl: "https://pro.refashion.fr/en/news/filiere/environmental-performance-epr-sector",
    actionLabel: "Methodology",
    actionUrl: "https://euric.org/resource-hub/reports-studies/study-lca-based-assessment-of-the-management-of-european-used-textiles",
    via: "knowledge_search",
  },

  // ---------------- Partners (Ireland / circular) ----------------
  {
    lens: "partners",
    title: "Primark (Penneys)",
    detail:
      "Places large volumes of textiles on the Irish market, so becomes a fee-paying producer under textile EPR. Publishes a commitment to halve value-chain carbon by 2030. Build the relationship before 2028.",
    causes: ["Circular economy & reuse"],
    geographies: ["Ireland"],
    confidence: "verified",
    sourceLabel: "sr.primark.com",
    sourceUrl: "https://sr.primark.com/sustainability-approach",
    actionLabel: "Contact / commitments",
    actionUrl: "https://corporate.primark.com/en-us/a/primark-cares",
    via: "entity_search, introspection, retrieval",
  },
  {
    lens: "partners",
    title: "Analog Devices (Limerick)",
    detail:
      "Major Limerick employer with a 90% waste-diversion record and €2m in employee donations and foundation matching to 900+ community organisations. A natural local corporate supporter.",
    causes: ["Circular economy & reuse", "Environment & climate", "Social inclusion"],
    geographies: ["Ireland"],
    confidence: "verified",
    sourceLabel: "analog.com",
    sourceUrl: "https://www.analog.com/en/about-adi/corporate-responsibility.html",
    actionLabel: "Contact / responsibility",
    actionUrl: "https://www.analog.com/en/about-adi/corporate-responsibility.html",
    via: "knowledge_search",
  },
  {
    lens: "partners",
    title: "H&M Group",
    detail:
      "A large textile producer across European markets, so obligated under textile EPR. Its Responsible Business Conduct policy is reviewed annually. An early circular-reuse relationship pays off before the scheme is live.",
    causes: ["Circular economy & reuse"],
    geographies: ["eu", "United Kingdom"],
    confidence: "verified",
    sourceLabel: "hmgroup.com",
    sourceUrl: "https://hmgroup.com/sustainability/standards-and-policies/",
    actionLabel: "Contact / commitments",
    actionUrl: "https://hmgroup.com/sustainability/",
    via: "entity_search, retrieval",
  },
  {
    lens: "partners",
    title: "Marks & Spencer",
    detail:
      "Operates across the UK and Ireland with a net-zero value-chain target for 2040 under its Plan A programme, plus community support. A textile producer and a community-fund route.",
    causes: ["Circular economy & reuse", "Social inclusion"],
    geographies: ["United Kingdom", "Ireland"],
    confidence: "verified",
    sourceLabel: "corporate.marksandspencer.com",
    sourceUrl: "https://corporate.marksandspencer.com/sustainability/sustainability-ms",
    actionLabel: "Contact / commitments",
    actionUrl: "https://corporate.marksandspencer.com/sustainability",
    via: "entity_search, retrieval",
  },

  // ---------------- Impact framings by sector ----------------
  {
    lens: "impact",
    title: "Home energy retrofit: about 2.5 to 5 tonnes CO2e avoided per home each year",
    detail:
      "A whole-house deep retrofit typically saves 2.5–5 t CO2e per home per year; single measures (insulation, heat pump) save 0.6–3.2 t. State the retrofit depth and baseline in any claim.",
    causes: ["Environment & climate"],
    geographies: ["eu", "United Kingdom"],
    confidence: "single-source",
    sourceLabel: "theccc.org.uk / ashden.org",
    sourceUrl: "https://www.theccc.org.uk",
    actionLabel: "Methodology",
    actionUrl: "https://ashden.org/winners/the-national-energy-foundation-and-energiesprong-uk",
    via: "knowledge_search",
  },
  {
    lens: "impact",
    title: "Social Return on Investment: often £4 to £7 of social value per £1",
    detail:
      "SROI monetises social outcomes as a ratio of value to investment (real studies report about 1:4, up to £7:£1). State deadweight, attribution and drop-off; the Guide to SROI is the reference.",
    causes: ["Social inclusion"],
    geographies: ["eu", "United Kingdom"],
    confidence: "single-source",
    sourceLabel: "socialvalueint.org",
    sourceUrl: "https://www.socialvalueint.org/guide-to-sroi",
    actionLabel: "Methodology",
    actionUrl: "https://www.socialvalueint.org/guide-to-sroi",
    via: "knowledge_search",
  },
  {
    lens: "impact",
    title: "Youth skills training: small but real gains in employment and earnings",
    detail:
      "Meta-analyses find modest positive effects, largest for disadvantaged youth and integrated programmes (technical plus life skills, mentoring, placement). Report jobs-per-participants, not just attendance.",
    causes: ["Youth & education"],
    geographies: ["eu", "United Kingdom"],
    confidence: "single-source",
    sourceLabel: "youthfuturesfoundation.org",
    sourceUrl: "https://youthfuturesfoundation.org/tools/youth-employment-toolkit",
    actionLabel: "Methodology",
    actionUrl: "https://youthfuturesfoundation.org/tools/youth-employment-toolkit",
    via: "knowledge_search",
  },
  {
    lens: "impact",
    title: "Arts participation and wellbeing: attendees about 60% more likely to report good health",
    detail:
      "Group-based arts participation shows the strongest link to mental wellbeing; benefits are larger for those with lower baseline wellbeing. Distinguish group from solitary participation in any claim.",
    causes: ["Arts & culture"],
    geographies: ["eu", "United Kingdom"],
    confidence: "single-source",
    sourceLabel: "whatworkswellbeing.org",
    sourceUrl: "https://whatworkswellbeing.org/blog/participating-in-arts-and-culture-is-good-for-wellbeing",
    actionLabel: "Methodology",
    actionUrl: "https://whatworkswellbeing.org/blog/participating-in-arts-and-culture-is-good-for-wellbeing",
    via: "knowledge_search",
  },
  {
    lens: "impact",
    title: "Community health prevention: median return of about 14 to 1",
    detail:
      "A systematic review found a median ROI of 14.3:1 across public-health interventions (4.1:1 for local ones). Falls prevention and chronic-disease programmes show particularly strong, fast returns.",
    causes: ["Health & wellbeing"],
    geographies: ["eu", "United Kingdom"],
    confidence: "single-source",
    sourceLabel: "jech.bmj.com",
    sourceUrl: "https://jech.bmj.com/content/71/8/827",
    actionLabel: "Methodology",
    actionUrl: "https://jech.bmj.com/content/71/8/827",
    via: "knowledge_search",
  },
];

/** "eu" matches any EU/EEA country; the UK is excluded from EU programmes. */
export function matchesGeo(sig: Signal, country: string): boolean {
  if (sig.geographies.includes(country)) return true;
  if (sig.geographies.includes("eu") && country !== "United Kingdom") return true;
  return false;
}

export function signalsFor(country: string, cause: Cause): Record<Lens, Signal[]> {
  const out: Record<Lens, Signal[]> = { funding: [], policy: [], partners: [], impact: [] };
  for (const s of SIGNALS) {
    if (!s.causes.includes(cause)) continue;
    if (!matchesGeo(s, country)) continue;
    out[s.lens].push(s);
  }
  return out;
}

export const LENS_ORDER: Lens[] = ["funding", "policy", "partners", "impact"];
export { ALL as ALL_CAUSES };
