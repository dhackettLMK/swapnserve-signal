import { Reveal } from "./Reveal";

export type SpecItem = { k: string; v: string };

/**
 * A numbered, hairline-separated specification list. Used on module pages to
 * describe what the module delivers and its acceptance bar, as designed content
 * rather than a warning card.
 */
export function SpecList({ label, items }: { label: string; items: SpecItem[] }) {
  return (
    <section className="mt-12">
      <p className="tag">{label}</p>
      <div className="mt-4 border-t border-line">
        {items.map((item, i) => (
          <Reveal key={item.k} delay={i * 60}>
            <div className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-1 border-b border-line py-4 sm:grid-cols-[3rem_10rem_1fr]">
              <span className="font-mono text-xs text-faint">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-sm font-medium text-ink">{item.k}</span>
              <span className="text-sm text-dim">{item.v}</span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
