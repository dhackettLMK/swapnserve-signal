import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { StatusLine } from "@/components/StatusLine";
import { SpecList } from "@/components/SpecList";
import { loadLatestBenchmark } from "@/lib/data";

export const metadata: Metadata = { title: "Benchmark" };

export default function BenchmarkPage() {
  const run = loadLatestBenchmark();

  return (
    <div>
      <PageHeader
        index="06"
        eyebrow="Cala against web search"
        title="Benchmark"
        intro="Twenty-five domain questions put to both Cala and plain web search, measuring tokens, latency, whether a citation came back, and correctness against a manually established ground truth. Published honestly. If Cala loses on a class of question, the row says so."
      />

      {!run ? (
        <>
          <div className="mt-8">
            <StatusLine phase="PHASE 6" state="awaiting run" />
          </div>
          <SpecList
            label="What this module delivers"
            items={[
              { k: "Fair comparison", v: "The same question to both systems, graded against a ground truth set by hand." },
              { k: "Real measures", v: "Tokens consumed, latency, citation presence, and correctness recorded per question." },
              { k: "Reproducible", v: "The run renders from committed data, with a method anyone can repeat." },
              { k: "Honest", v: "Results unfavourable to Cala are published, not hidden." },
              { k: "Acceptance", v: "A committed run and a method stated well enough to reproduce." },
            ]}
          />
        </>
      ) : (
        <p className="mt-8 text-dim">
          Run {run.runId}, {run.questions.length} questions.
        </p>
      )}
    </div>
  );
}
