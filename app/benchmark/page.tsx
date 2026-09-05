import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { EmptyState } from "@/components/EmptyState";
import { loadLatestBenchmark } from "@/lib/data";

export const metadata: Metadata = { title: "Benchmark" };

export default function BenchmarkPage() {
  const run = loadLatestBenchmark();

  return (
    <div>
      <PageHeader
        eyebrow="Cala vs web search"
        title="Benchmark"
        intro={
          <>
            25 domain questions asked of both Cala and plain web search, measuring tokens, latency,
            whether a citation was returned, and correctness against a manually established ground
            truth. Published honestly — if Cala loses on a question class, the row says so.
          </>
        }
      />
      {!run ? (
        <EmptyState
          phase="Phase 6"
          building="Cala's public claim is ~8× fewer tokens than web search. This module tests it on this project's actual domain and publishes what it finds, including any result that does not replicate."
        >
          Acceptance bar: the run renders from committed JSON; methodology stated well enough to
          reproduce.
        </EmptyState>
      ) : (
        <p className="mt-8 text-muted">Run {run.runId} — {run.questions.length} questions.</p>
      )}
    </div>
  );
}
