import Link from "next/link";
import { NAV } from "@/lib/nav";

export function SiteNav() {
  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background/85 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-5 gap-y-2 px-5 py-3">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-accent" aria-hidden />
          Signal
          <span className="mono text-xs font-normal text-muted">/ Swap&rsquo;n&rsquo;Serve</span>
        </Link>
        <div className="ml-auto flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-muted transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
