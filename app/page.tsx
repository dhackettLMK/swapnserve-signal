import Link from "next/link";
import { NAV } from "@/lib/nav";
import { CreditMeter } from "@/components/CreditMeter";

export default function Home() {
  return (
    <div className="space-y-16">
      {/* Hero */}
      <section className="pt-6">
        <p className="mono mb-4 text-xs uppercase tracking-widest text-accent">
          Swap&rsquo;n&rsquo;Serve · Limerick, Ireland
        </p>
        <h1 className="max-w-3xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
          The intelligence layer for a clothing-reuse initiative that intends to still be here in
          2028.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted">
          From ~2028, EU law obliges clothing producers to fund exactly the textile diversion
          Swap&rsquo;n&rsquo;Serve already does for free — and explicitly protects social-economy
          operators. Signal exists to make Swap&rsquo;n&rsquo;Serve the organisation that is already
          measuring, already known, and already at the table when Ireland stands up its textile
          scheme.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/policy"
            className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-fg transition-opacity hover:opacity-90"
          >
            The 2028 argument
          </Link>
          <Link
            href="/how-it-works"
            className="rounded-lg border border-border px-4 py-2 text-sm font-medium transition-colors hover:border-accent"
          >
            How it&rsquo;s built
          </Link>
        </div>
      </section>

      {/* Thesis / provenance promise */}
      <section className="grid gap-6 sm:grid-cols-3">
        <ThesisCard title="Every fact carries its source">
          Nothing renders without provenance: the source URL, the timestamp, which Cala tool
          produced it, and — for companies — the entity UUID. If it can&rsquo;t be traced, it
          isn&rsquo;t here.
        </ThesisCard>
        <ThesisCard title="No invented numbers">
          Swap&rsquo;n&rsquo;Serve&rsquo;s own figures are shown as self-reported estimates. Impact
          is a calculator with cited factors and honest uncertainty ranges — never a fabricated
          total.
        </ThesisCard>
        <ThesisCard title="Built to a credit budget">
          The site serves committed, cached data, so a page view costs zero Cala credits. Spend is
          metered and shown in the open.
        </ThesisCard>
      </section>

      {/* Module grid */}
      <section>
        <h2 className="mono text-xs uppercase tracking-widest text-muted">Modules</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {NAV.filter((n) => !["/how-it-works", "/limitations"].includes(n.href)).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="card group p-5 transition-colors hover:border-accent"
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">{item.label}</span>
                <span className="text-muted transition-transform group-hover:translate-x-0.5">
                  →
                </span>
              </div>
              <p className="mt-2 text-sm text-muted">{item.short}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Credit meter */}
      <section className="max-w-md">
        <CreditMeter />
      </section>
    </div>
  );
}

function ThesisCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="card p-5">
      <h3 className="font-medium">{title}</h3>
      <p className="mt-2 text-sm text-muted">{children}</p>
    </div>
  );
}
