export type NavItem = { href: string; label: string; short: string };

/** Single source of truth for the site's routes (used by nav + footer). */
export const NAV: NavItem[] = [
  { href: "/partners", label: "Partners", short: "Corporate targets & cited commitments" },
  { href: "/funding", label: "Funding", short: "Pipeline, eligibility, deadlines" },
  { href: "/policy", label: "Policy", short: "Textile EPR & Irish transposition" },
  { href: "/impact", label: "Impact", short: "Cited calculator" },
  { href: "/evidence", label: "Evidence", short: "Citation library" },
  { href: "/benchmark", label: "Benchmark", short: "Cala vs web search" },
  { href: "/how-it-works", label: "How it works", short: "Architecture & entity workflow" },
  { href: "/limitations", label: "Limitations", short: "Honest coverage gaps" },
];
