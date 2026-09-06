import Link from "next/link";

/** Ink keycap link, no green fill. Green is for the primary action only. */
export function AnnouncementBanner() {
  return (
    <Link
      href="/#console"
      className="keycap group inline-flex items-center gap-2 px-3 py-1.5 mono text-[11px] uppercase tracking-[0.14em] text-dim"
    >
      Worked example: Swap&rsquo;n&rsquo;Serve, Limerick
      <span className="transition-transform duration-150 group-hover:translate-x-0.5">&rarr;</span>
    </Link>
  );
}
