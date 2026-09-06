"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV } from "@/lib/nav";

export function SiteNav() {
  const pathname = usePathname();

  return (
    <header
      className="sticky top-0 z-30 border-b border-line bg-panel"
      style={{ boxShadow: "var(--panel-top)" }}
    >
      <nav className="mx-auto flex max-w-[1120px] flex-wrap items-center gap-x-6 gap-y-2 px-6 py-3">
        <Link href="/" className="flex items-baseline gap-1.5">
          <span className="display text-[15px] font-medium tracking-[-0.02em]">Signal</span>
          <sup className="mono text-[9px] uppercase tracking-[0.14em] text-faint">SNS</sup>
        </Link>

        <div className="ml-auto flex flex-wrap items-center gap-x-5 gap-y-1 text-[13px]">
          {NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={
                  active
                    ? "font-medium text-ink"
                    : "text-dim transition-colors hover:text-ink"
                }
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/#console"
            className="keycap px-3 py-1.5 text-[13px] font-medium text-ink"
          >
            Run analysis
          </Link>
        </div>
      </nav>
    </header>
  );
}
