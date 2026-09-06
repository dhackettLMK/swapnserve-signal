import Link from "next/link";

/**
 * Dot-textured accent strip, in the spirit of a high-tech announcement bar.
 * Original copy, tied to Swap'n'Serve's actual thesis.
 */
export function AnnouncementBanner() {
  return (
    <Link
      href="/policy"
      className="banner-dots group flex items-center justify-center gap-2 rounded-[8px] border border-line px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-signal-2"
    >
      Ireland&rsquo;s textile EPR scheme is expected around 2028
      <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
    </Link>
  );
}
