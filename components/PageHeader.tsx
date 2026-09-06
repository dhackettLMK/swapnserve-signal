import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function PageHeader({
  index,
  eyebrow,
  title,
  intro,
}: {
  index?: string;
  eyebrow?: string;
  title: string;
  intro?: ReactNode;
}) {
  return (
    <header className="border-b border-line pb-10">
      <Reveal>
        <div className="flex items-center gap-3">
          {index ? <span className="font-mono text-sm text-signal">{index}</span> : null}
          {eyebrow ? <span className="tag">{eyebrow}</span> : null}
        </div>
        <h1 className="display mt-4 text-4xl sm:text-5xl">{title}</h1>
        {intro ? <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-dim">{intro}</p> : null}
      </Reveal>
    </header>
  );
}
