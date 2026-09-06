import Link from "next/link";
import { loadCreditLedger } from "@/lib/data";

export function SiteFooter() {
  const ledger = loadCreditLedger();
  return (
    <footer className="mt-24 border-t border-line">
      <div className="mx-auto max-w-[1180px] px-6 py-10">
        <div className="grid gap-8 sm:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="h-2 w-2 rounded-full bg-signal" />
              <span className="text-sm font-semibold tracking-[0.14em]">SIGNAL</span>
            </div>
            <p className="mt-3 max-w-sm text-sm text-dim">
              A research layer for Swap&rsquo;n&rsquo;Serve, a Limerick community initiative for
              clothing reuse. Companies shown are research targets, not partners.
            </p>
          </div>

          <div>
            <p className="tag">System</p>
            <ul className="mt-3 space-y-1.5 text-sm text-dim">
              <li>
                <Link href="/how-it-works" className="link-underline hover:text-ink">
                  How it works
                </Link>
              </li>
              <li>
                <Link href="/limitations" className="link-underline hover:text-ink">
                  Limitations
                </Link>
              </li>
              <li>
                <Link href="/evidence" className="link-underline hover:text-ink">
                  Evidence
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="tag">Credits</p>
            <p className="mt-3 font-mono text-sm">
              <span className="text-ink">{ledger.totalCredits}</span>
              <span className="text-faint"> / {ledger.budgetPerMonth}</span>
            </p>
            <p className="mt-1.5 text-xs text-faint">
              Powered by{" "}
              <a href="https://cala.ai" target="_blank" rel="noreferrer" className="text-signal">
                Cala
              </a>
              . A page view costs none.
            </p>
          </div>
        </div>

        <p className="mt-10 border-t border-line pt-6 text-xs text-faint">
          Swap&rsquo;n&rsquo;Serve is an unincorporated community initiative. It is not a registered
          charity, has no charity registration number, and cannot issue tax-deductible receipts.
        </p>
      </div>
    </footer>
  );
}
