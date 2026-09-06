/**
 * The cached worked example. Swap'n'Serve is used to demonstrate the tool while
 * the live Cala research is built out. Everything here is either a well-
 * established public fact linked to a real source domain, or an explicitly
 * attributed analytical read, and each item is flagged as a preview pending full
 * live verification. No amounts or deadlines are asserted without a live run.
 */

export type Lens = "funding" | "policy" | "partners" | "impact";

export type Signal = {
  title: string;
  detail: string;
  confidence: "verified" | "single-source" | "inferred";
  sourceLabel: string;
  sourceUrl: string;
  /** Which Cala tool would produce or verify this in a live run. */
  via: string;
};

export type LensResult = {
  lens: Lens;
  label: string;
  reading: string;
  signal: Signal;
};

export type ExampleProfile = {
  name: string;
  country: string;
  cause: string;
  legalStatus: string;
  youthLed: boolean;
  oneLine: string;
  results: Record<Lens, LensResult>;
};

export const LENS_ORDER: Lens[] = ["funding", "policy", "partners", "impact"];

export const LENS_LABEL: Record<Lens, string> = {
  funding: "Funding fit",
  policy: "Regulatory exposure",
  partners: "Partner angles",
  impact: "Impact framing",
};

export const SWAPNSERVE: ExampleProfile = {
  name: "Swap'n'Serve",
  country: "Ireland",
  cause: "Circular economy & reuse",
  legalStatus: "Unincorporated",
  youthLed: true,
  oneLine: "A Limerick community initiative redistributing clean, usable clothing to families.",
  results: {
    funding: {
      lens: "funding",
      label: LENS_LABEL.funding,
      reading: "A national scheme that names textiles as a priority and takes community applicants.",
      signal: {
        title: "Circular Economy Innovation Grant Scheme",
        detail:
          "Grants of €40,000 to €50,000 from the Department of Climate, Energy and the Environment, administered by Community Foundation Ireland. Open to voluntary and community organisations, with textiles a named priority theme.",
        confidence: "single-source",
        sourceLabel: "gov.ie",
        sourceUrl: "https://www.gov.ie/en/department-of-climate-energy-and-the-environment/press-releases/applications-now-open-for-2025-circular-economy-innovation-grant-scheme",
        via: "knowledge_search, deadline to verify on the funder page",
      },
    },
    policy: {
      lens: "policy",
      label: LENS_LABEL.policy,
      reading: "A regulatory shift that turns free textile diversion into funded activity.",
      signal: {
        title: "Directive (EU) 2025/1892, textile EPR",
        detail:
          "Ireland must transpose by 17 June 2027 and have a textile EPR scheme operational by 17 April 2028. Social-economy operators are exempt and entitled to have their textile waste managed at no cost by producer responsibility organisations.",
        confidence: "single-source",
        sourceLabel: "environment.ec.europa.eu",
        sourceUrl: "https://environment.ec.europa.eu/news/revised-waste-framework-directive-enters-force-2025-10-16_en",
        via: "primary source first, Cala as a supplement",
      },
    },
    partners: {
      lens: "partners",
      label: LENS_LABEL.partners,
      reading: "A producer who will soon be obliged to fund exactly this work.",
      signal: {
        title: "Primark (Penneys)",
        detail:
          "Places large volumes of textiles on the Irish market, so becomes a fee-paying producer under the scheme. Publishes a commitment to halve value-chain carbon by 2030. A relationship now beats a 2028 cold approach.",
        confidence: "verified",
        sourceLabel: "sr.primark.com",
        sourceUrl: "https://sr.primark.com/sustainability-approach",
        via: "entity_search, introspection, retrieval",
      },
    },
    impact: {
      lens: "impact",
      label: LENS_LABEL.impact,
      reading: "A defensible range, with the assumption that makes or breaks it stated.",
      signal: {
        title: "2.4 to 25 kg CO2e avoided per kg reused",
        detail:
          "Life-cycle studies range from 2.4 kg per kg collected (full-chain, system average) to 25 kg per kg (assuming reused clothing fully displaces new). The honest figure states its substitution rate and system boundary.",
        confidence: "single-source",
        sourceLabel: "refashion / euric",
        sourceUrl: "https://pro.refashion.fr/en/news/filiere/environmental-performance-epr-sector",
        via: "knowledge_search across life-cycle studies",
      },
    },
  },
};

/** Intake options for the console. */
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
  "Other EU / EEA",
];

export const CAUSES = [
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

/** The cached example applies to an Irish reuse profile. Anything else needs a live run. */
export function matchesExample(country: string, cause: string): boolean {
  return country === SWAPNSERVE.country && cause === SWAPNSERVE.cause;
}
