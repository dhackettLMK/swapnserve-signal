/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { loadCreditLedger } from "@/lib/data";

export function SiteFooter() {
  const ledger = loadCreditLedger();
  const hasLogo = existsSync(join(process.cwd(), "public", "swapnserve-logo.png"));

  return (
    <footer className="mt-24 border-t border-line bg-panel" style={{ boxShadow: "var(--panel-top)" }}>
      <div className="mx-auto max-w-[1120px] px-6 py-10">
        <div className="grid gap-8 sm:grid-cols-[1.6fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              {hasLogo ? (
                <img src="/swapnserve-logo.png" alt="Swap'n'Serve" width={36} height={36} className="rounded-[6px]" style={{ width: 36, height: 36, objectFit: "cover" }} />
              ) : null}
              <span className="display text-sm font-medium tracking-[-0.02em]">Swap&rsquo;n&rsquo;Serve</span>
            </div>
            <p className="mt-3 max-w-sm text-sm text-dim">
              A Limerick community initiative for clothing reuse and opportunity, founded 2025.
              Signal is its research tool, and a demonstration of what any European nonprofit could
              run. Companies shown are research targets, not partners.
            </p>
          </div>

          <div>
            <p className="tag">System</p>
            <ul className="mt-3 space-y-1.5 text-sm text-dim">
              <li><Link href="/how-it-works" className="hover:text-ink">How it works</Link></li>
              <li><Link href="/limitations" className="hover:text-ink">Limitations</Link></li>
              <li><Link href="/styleguide" className="hover:text-ink">Style guide</Link></li>
            </ul>
          </div>

          <div>
            <p className="tag">Credits</p>
            <p className="mt-3 mono text-sm">
              <span className="text-signal">{ledger.totalCredits}</span>
              <span className="text-faint"> / {ledger.budgetPerMonth}</span>
            </p>
            <p className="mt-1.5 text-xs text-faint">
              Powered by{" "}
              <a href="https://cala.ai" target="_blank" rel="noreferrer" className="text-ink underline underline-offset-2">Cala</a>. A page view costs none.
            </p>
          </div>
        </div>

        <p className="mt-10 border-t border-line pt-6 text-xs text-faint">
          Swap&rsquo;n&rsquo;Serve is incorporating as a company limited by guarantee (CLG, pending).
          It is not a registered charity, has no charity registration number, and cannot issue
          tax-deductible receipts.
        </p>
      </div>
    </footer>
  );
}
