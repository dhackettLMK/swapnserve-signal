import type { Metadata } from "next";
import type { ReactNode } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { StatusLine } from "@/components/StatusLine";
import { SpecList } from "@/components/SpecList";
import { loadLatestBenchmark } from "@/lib/data";
import type { BenchmarkQuestion, BenchmarkResult } from "@/lib/schema/benchmark";

export const metadata: Metadata = { title: "Benchmark" };

const DOMAINS = ["funding", "policy", "partners", "impact"] as const;
const DOMAIN_LABEL: Record<(typeof DOMAINS)[number], string> = {
  funding: "Funding",
  policy: "Policy",
  partners: "Partners",
  impact: "Impact",
};

function result(q: BenchmarkQuestion, method: BenchmarkResult["method"]) {
  return q.results.find((r) => r.method === method);
}
function tokens(q: BenchmarkQuestion, method: BenchmarkResult["method"]) {
  return result(q, method)?.tokensConsumed ?? 0;
}

export default function BenchmarkPage() {
  const run = loadLatestBenchmark();

  if (!run) {
    return (
      <div>
        <PageHeader
          index="06"
          eyebrow="Cala against web search"
          title="Benchmark"
          intro="Twenty-five domain questions put to both Cala and plain web search, measuring tokens, whether a citation came back, and correctness against a manually established ground truth. Published honestly. If Cala loses on a class of question, the row says so."
        />
        <div className="mt-8">
          <StatusLine phase="PHASE 6" state="awaiting run" />
        </div>
        <SpecList
          label="What this module delivers"
          items={[
            { k: "Fair comparison", v: "The same question to both systems, graded against a ground truth set by hand." },
            { k: "Real measures", v: "Tokens consumed, citation presence, and correctness recorded per question." },
            { k: "Reproducible", v: "The run renders from committed data, with a method anyone can repeat." },
            { k: "Honest", v: "Results unfavourable to Cala are published, not hidden." },
            { k: "Acceptance", v: "A committed run and a method stated well enough to reproduce." },
          ]}
        />
      </div>
    );
  }

  const qs = run.questions;
  const n = qs.length;
  const calaTokens = qs.reduce((a, q) => a + tokens(q, "cala"), 0);
  const webTokens = qs.reduce((a, q) => a + tokens(q, "web-search"), 0);
  const ratio = (webTokens / calaTokens).toFixed(1);
  const calaCorrect = qs.filter((q) => result(q, "cala")?.correct).length;
  const webCorrect = qs.filter((q) => result(q, "web-search")?.correct).length;
  const calaCited = qs.filter((q) => result(q, "cala")?.citationReturned).length;
  const webCited = qs.filter((q) => result(q, "web-search")?.citationReturned).length;

  const byDomain = DOMAINS.map((d) => {
    const dq = qs.filter((q) => q.domain === d);
    return {
      d,
      n: dq.length,
      cala: dq.reduce((a, q) => a + tokens(q, "cala"), 0),
      web: dq.reduce((a, q) => a + tokens(q, "web-search"), 0),
      calaCorrect: dq.filter((q) => result(q, "cala")?.correct).length,
      webCorrect: dq.filter((q) => result(q, "web-search")?.correct).length,
    };
  });

  const ranAt = new Date(run.ranAt).toISOString().slice(0, 10);

  return (
    <div>
      <PageHeader
        index="06"
        eyebrow="Cala against web search"
        title="Benchmark"
        intro="Twenty-five domain questions put to both Cala and plain web search, one call each, measuring the tokens the answering agent must read, whether a citation came back, and correctness against a ground truth set by hand from a primary source. Published honestly, losses and caveats included."
      />

      {/* Headline: the single live number is the token ratio, in signal green. */}
      <section className="mt-10 grid gap-4 sm:grid-cols-3">
        <Reveal>
          <div className="panel p-5">
            <div className="display text-5xl text-signal">{ratio}&times;</div>
            <p className="mt-2 text-sm text-dim">
              fewer tokens for Cala than web search, measured on the answer each returns
              ({calaTokens.toLocaleString()} vs {webTokens.toLocaleString()} tokens across {n} questions).
            </p>
          </div>
        </Reveal>
        <Reveal delay={60}>
          <div className="panel p-5">
            <div className="mono text-3xl text-ink">
              {calaCorrect}/{n} <span className="text-faint">&middot;</span> {webCorrect}/{n}
            </div>
            <p className="mt-2 text-sm text-dim">
              correct answers, Cala then web search. Web missed one it should have got (F4); see the table.
            </p>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div className="panel p-5">
            <div className="mono text-3xl text-ink">
              {calaCited}/{n} <span className="text-faint">&middot;</span> {webCited}/{n}
            </div>
            <p className="mt-2 text-sm text-dim">
              answers that returned a citation. Cala&rsquo;s two knowledge_query rows came back without sources.
            </p>
          </div>
        </Reveal>
      </section>

      <p className="mt-4 mono text-xs text-faint">
        run {run.runId} &middot; {ranAt} &middot; 25 Cala credits &middot; web side free
      </p>

      {/* Per-domain summary */}
      <Section n="01" title="By domain">
        <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
          <table className="w-full min-w-[34rem] border-collapse text-sm">
            <thead>
              <tr className="border-b border-line text-left mono text-[11px] uppercase tracking-[0.12em] text-faint">
                <th className="py-2 pr-4 font-normal">Domain</th>
                <th className="py-2 pr-4 font-normal">Questions</th>
                <th className="py-2 pr-4 font-normal">Cala tokens</th>
                <th className="py-2 pr-4 font-normal">Web tokens</th>
                <th className="py-2 pr-4 font-normal">Correct (Cala / web)</th>
              </tr>
            </thead>
            <tbody>
              {byDomain.map((r) => (
                <tr key={r.d} className="border-b border-line">
                  <td className="py-2.5 pr-4 text-ink">{DOMAIN_LABEL[r.d]}</td>
                  <td className="py-2.5 pr-4 mono text-dim">{r.n}</td>
                  <td className="py-2.5 pr-4 mono text-ink">{r.cala.toLocaleString()}</td>
                  <td className="py-2.5 pr-4 mono text-dim">{r.web.toLocaleString()}</td>
                  <td className="py-2.5 pr-4 mono text-dim">
                    {r.calaCorrect}/{r.n} &middot; {r.webCorrect}/{r.n}
                  </td>
                </tr>
              ))}
              <tr className="border-b-2 border-line-2">
                <td className="py-2.5 pr-4 font-medium text-ink">All</td>
                <td className="py-2.5 pr-4 mono text-dim">{n}</td>
                <td className="py-2.5 pr-4 mono font-medium text-ink">{calaTokens.toLocaleString()}</td>
                <td className="py-2.5 pr-4 mono text-dim">{webTokens.toLocaleString()}</td>
                <td className="py-2.5 pr-4 mono text-dim">
                  {calaCorrect}/{n} &middot; {webCorrect}/{n}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      {/* Full results */}
      <Section n="02" title="Every question">
        <p className="mb-5 max-w-2xl text-dim">
          One Cala call and one web search per question. Tokens are the count the answering agent
          must read to produce a cited answer, measured with one fixed tokeniser over the returned
          answer. A weak result is recorded as it came back, not retried.
        </p>
        <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
          <table className="w-full min-w-[46rem] border-collapse text-sm">
            <thead>
              <tr className="border-b border-line text-left mono text-[11px] uppercase tracking-[0.12em] text-faint">
                <th className="py-2 pr-3 font-normal">#</th>
                <th className="py-2 pr-4 font-normal">Question</th>
                <th className="py-2 pr-3 font-normal text-right">Cala tok</th>
                <th className="py-2 pr-3 font-normal">Cala</th>
                <th className="py-2 pr-3 font-normal text-right">Web tok</th>
                <th className="py-2 pr-3 font-normal">Web</th>
              </tr>
            </thead>
            <tbody>
              {qs.map((q) => {
                const c = result(q, "cala");
                const w = result(q, "web-search");
                return (
                  <tr key={q.id} className="border-b border-line align-top">
                    <td className="py-3 pr-3 mono text-xs text-faint">{q.id}</td>
                    <td className="py-3 pr-4 max-w-[22rem] text-[13px] text-ink">{q.question}</td>
                    <td className="py-3 pr-3 mono text-right text-ink">{c?.tokensConsumed ?? "—"}</td>
                    <td className="py-3 pr-3 whitespace-nowrap">
                      <Mark correct={!!c?.correct} cited={!!c?.citationReturned} />
                    </td>
                    <td className="py-3 pr-3 mono text-right text-dim">{w?.tokensConsumed ?? "—"}</td>
                    <td className="py-3 pr-3 whitespace-nowrap">
                      <Mark correct={!!w?.correct} cited={!!w?.citationReturned} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="mt-4 mono text-[11px] text-faint">
          correct / missed = graded against ground truth &middot; cited = a resolvable source came back
        </p>
      </Section>

      {/* Findings */}
      <Section n="03" title="What the run shows">
        <div className="max-w-2xl space-y-4">
          <Finding label="Leaner, but not eight times">
            On the answer each system returns, Cala used {ratio}&times; fewer tokens than web search.
            That is real, but well short of the roughly eight times sometimes claimed. The claim only
            holds against a web baseline of reading full source pages; against a modern search API
            that already returns synthesised snippets, the gap is about {ratio}&times;.
          </Finding>
          <Finding label="Provenance is not free">
            The figure above is Cala&rsquo;s slim answer payload. By default Cala also returns large
            explainability and context arrays: one sampled question came to 1,881 tokens in full
            against 331 for the answer alone, about 5.7&times;, and larger than the web result for the
            same question. Cala&rsquo;s token advantage exists only when the response is deliberately
            slimmed.
          </Finding>
          <Finding label="Cala was slightly more accurate">
            Cala answered {calaCorrect} of {n}; web search {webCorrect} of {n}. The single difference
            was Aktion Mensch&rsquo;s maximum grant (F4): web search surfaced only the small local
            tiers and reported a five to ten thousand euro ceiling, while Cala found and cited the true
            maximum of around 450,000 to 600,000 euro.
          </Finding>
          <Finding label="Structured rows drop the sources">
            The two questions asked with knowledge_query (F3, F7) returned clean structured rows but
            no citations, where every web search returned URLs. Choosing structure costs you
            provenance; that is a real trade in Cala&rsquo;s design, not a bug.
          </Finding>
          <Finding label="Current EU law was covered well">
            Policy was the domain we expected Cala to be thin on. It was not: the 2025 textile EPR
            directive, the 2026 CSRD Omnibus thresholds, and the July 2026 unsold-textiles ban all
            came back correct and cited, and the partners answers were current to the April 2026
            ABF-Primark demerger.
          </Finding>
        </div>
      </Section>

      {/* Methodology */}
      <Section n="04" title="Method, stated to reproduce">
        <p className="max-w-2xl leading-relaxed text-dim">{run.methodologyNote}</p>
      </Section>

      <SpecList
        label="To repeat this run"
        items={[
          { k: "Question set", v: "The 25 questions on this page, roughly six per domain, mixing lookup, filter and synthesis." },
          { k: "Cala side", v: "One knowledge_search or knowledge_query call per question; no retries, no duplicate inputs." },
          { k: "Web side", v: "One web search per question, answered from the returned results block only." },
          { k: "Tokens", v: "js-tiktoken cl100k_base over the returned answer, via scripts/benchmark/count-tokens.mjs." },
          { k: "Grading", v: "Blind against a ground truth set by hand from a primary source, recorded per question." },
          { k: "Cost", v: "25 Cala credits for the run; the web side spends none." },
        ]}
      />
    </div>
  );
}

function Section({ n, title, children }: { n: string; title: string; children: ReactNode }) {
  return (
    <Reveal>
      <section className="grid gap-3 border-b border-line py-9 sm:grid-cols-[3rem_1fr] sm:gap-8">
        <span className="font-mono text-sm text-faint">{n}</span>
        <div className="min-w-0">
          <h2 className="text-xl font-medium tracking-tight">{title}</h2>
          <div className="mt-4">{children}</div>
        </div>
      </section>
    </Reveal>
  );
}

function Finding({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="border-l border-line-2 pl-4">
      <p className="text-sm font-medium text-ink">{label}</p>
      <p className="mt-1 text-sm leading-relaxed text-dim">{children}</p>
    </div>
  );
}

/** Correctness + citation marker. Greyscale-legible: a miss uses the muted fail token as text only. */
function Mark({ correct, cited }: { correct: boolean; cited: boolean }) {
  return (
    <span className="mono text-xs">
      <span style={correct ? undefined : { color: "var(--status-fail)" }} className={correct ? "text-ink" : undefined}>
        {correct ? "correct" : "missed"}
      </span>
      <span className="text-faint"> &middot; </span>
      <span className={cited ? "text-dim" : "text-faint"}>{cited ? "cited" : "no cite"}</span>
    </span>
  );
}
