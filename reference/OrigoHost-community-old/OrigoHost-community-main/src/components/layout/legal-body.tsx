import type { ReactNode } from "react";

export function LegalBody({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto max-w-3xl rounded-3xl border border-[var(--brand-ink)]/5 bg-white p-8 shadow-[var(--shadow-soft)] sm:p-12">
      <div className="space-y-8">{children}</div>
    </div>
  );
}

export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="text-lg font-bold text-[var(--brand-ink)]">{title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-[var(--brand-ink)]/70">{children}</p>
    </section>
  );
}
