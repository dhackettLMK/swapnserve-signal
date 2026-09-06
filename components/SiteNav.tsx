"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV } from "@/lib/nav";

export function SiteNav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 px-4 pt-4">
      <nav className="mx-auto flex max-w-[1180px] items-center gap-x-6 rounded-[10px] border border-line bg-panel px-4 py-3 sm:px-5">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="relative flex h-2 w-2">
            <span className="pulse absolute inline-flex h-2 w-2 rounded-full bg-signal" />
          </span>
          <span className="text-[15px] font-semibold tracking-[0.14em]">SIGNAL</span>
        </Link>

        <div className="ml-auto hidden flex-wrap items-center gap-x-5 gap-y-1 text-[13px] lg:flex">
          {NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                data-active={active}
                className="link-underline text-dim transition-colors hover:text-ink data-[active=true]:text-ink"
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <Link
          href="/policy"
          className="ml-auto rounded-[6px] bg-signal px-3.5 py-1.5 text-[13px] font-medium text-bg transition-colors hover:bg-signal-2 lg:ml-6"
        >
          The 2028 case
        </Link>
      </nav>

      {/* Compact link row for small screens */}
      <div className="mx-auto mt-2 flex max-w-[1180px] flex-wrap gap-x-4 gap-y-1 px-2 text-[12px] lg:hidden">
        {NAV.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              data-active={active}
              className="text-dim data-[active=true]:text-signal"
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </header>
  );
}
