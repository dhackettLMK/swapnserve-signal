import type { ReactNode } from "react";

export function PageHeader({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow?: string;
  title: string;
  intro?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className="border-b border-border pb-8">
      {eyebrow ? (
        <p className="mono mb-2 text-xs uppercase tracking-widest text-accent">{eyebrow}</p>
      ) : null}
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h1>
      {intro ? <div className="mt-3 max-w-2xl text-muted">{intro}</div> : null}
      {children}
    </div>
  );
}
