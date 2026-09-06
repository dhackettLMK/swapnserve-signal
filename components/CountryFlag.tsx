/**
 * Small inline SVG flags for the console's country selector. Hand-drawn and
 * simplified (20x14), rendered reliably on every platform (unlike emoji flags,
 * which show as letter codes on Windows). A deliberate splash of colour that
 * the user asked for; kept small so the ink system still leads.
 */

const W = 20;
const H = 14;

function flagBody(country: string) {
  switch (country) {
    case "Ireland":
      return (
        <>
          <rect width="6.67" height={H} fill="#169b62" />
          <rect x="6.67" width="6.67" height={H} fill="#fff" />
          <rect x="13.33" width="6.67" height={H} fill="#ff883e" />
        </>
      );
    case "France":
      return (
        <>
          <rect width="6.67" height={H} fill="#0055A4" />
          <rect x="6.67" width="6.67" height={H} fill="#fff" />
          <rect x="13.33" width="6.67" height={H} fill="#EF4135" />
        </>
      );
    case "Germany":
      return (
        <>
          <rect width={W} height="4.67" fill="#1a1a1a" />
          <rect y="4.67" width={W} height="4.67" fill="#DD0000" />
          <rect y="9.33" width={W} height="4.67" fill="#FFCE00" />
        </>
      );
    case "Spain":
      return (
        <>
          <rect width={W} height={H} fill="#AA151B" />
          <rect y="3.5" width={W} height="7" fill="#F1BF00" />
        </>
      );
    case "Netherlands":
      return (
        <>
          <rect width={W} height="4.67" fill="#AE1C28" />
          <rect y="4.67" width={W} height="4.67" fill="#fff" />
          <rect y="9.33" width={W} height="4.67" fill="#21468B" />
        </>
      );
    case "Portugal":
      return (
        <>
          <rect width="8" height={H} fill="#006600" />
          <rect x="8" width="12" height={H} fill="#FF0000" />
          <circle cx="8" cy="7" r="2" fill="#FFD700" stroke="#c00" strokeWidth="0.4" />
        </>
      );
    case "Poland":
      return (
        <>
          <rect width={W} height="7" fill="#fff" />
          <rect y="7" width={W} height="7" fill="#DC143C" />
        </>
      );
    case "Sweden":
      return (
        <>
          <rect width={W} height={H} fill="#006AA7" />
          <rect x="6" width="2.5" height={H} fill="#FECC00" />
          <rect y="5.75" width={W} height="2.5" fill="#FECC00" />
        </>
      );
    case "United Kingdom":
      return (
        <>
          <rect width={W} height={H} fill="#012169" />
          <path d="M0,0 L20,14 M20,0 L0,14" stroke="#fff" strokeWidth="2.4" />
          <path d="M0,0 L20,14 M20,0 L0,14" stroke="#C8102E" strokeWidth="1.2" />
          <rect x="7.5" width="5" height={H} fill="#fff" />
          <rect y="4.5" width={W} height="5" fill="#fff" />
          <rect x="8.5" width="3" height={H} fill="#C8102E" />
          <rect y="5.5" width={W} height="3" fill="#C8102E" />
        </>
      );
    default:
      // Other EU / EEA — EU flag, ring of stars simplified to dots.
      return (
        <>
          <rect width={W} height={H} fill="#003399" />
          {Array.from({ length: 12 }).map((_, i) => {
            const a = (i / 12) * Math.PI * 2 - Math.PI / 2;
            return (
              <circle
                key={i}
                cx={10 + Math.cos(a) * 4}
                cy={7 + Math.sin(a) * 4}
                r="0.7"
                fill="#FFCC00"
              />
            );
          })}
        </>
      );
  }
}

export function CountryFlag({ country, className = "" }: { country: string; className?: string }) {
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width={W}
      height={H}
      className={className}
      style={{ borderRadius: 2, display: "block" }}
      aria-hidden="true"
    >
      <clipPath id={`fl-${country.replace(/[^a-z]/gi, "")}`}>
        <rect width={W} height={H} rx="2" />
      </clipPath>
      <g clipPath={`url(#fl-${country.replace(/[^a-z]/gi, "")})`}>{flagBody(country)}</g>
      <rect width={W} height={H} rx="2" fill="none" stroke="#00000022" strokeWidth="0.75" />
    </svg>
  );
}
