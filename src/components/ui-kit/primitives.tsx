import { Link } from "@tanstack/react-router";
import { ArrowRight, ChevronRight } from "lucide-react";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/* ------------------------------ Section header ----------------------------- */

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  as: Heading = "h2",
  action,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  as?: "h1" | "h2" | "h3";
  action?: ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6 md:flex-row md:items-end md:justify-between",
        align === "center" && "md:flex-col md:items-center md:text-center",
      )}
    >
      <div className={cn("max-w-2xl", align === "center" && "mx-auto")}>
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <Heading
          className={cn(
            "mt-3 text-balance font-display font-extrabold tracking-tight text-navy",
            Heading === "h1" ? "text-4xl md:text-5xl" : "text-2xl md:text-[2.125rem]",
          )}
        >
          {title}
        </Heading>
        {description ? (
          <p className="mt-4 text-pretty text-[1.0625rem] leading-relaxed text-muted-foreground">
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

/* -------------------------------- Page hero -------------------------------- */

export function PageHero({
  eyebrow,
  title,
  description,
  children,
  breadcrumb,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  children?: ReactNode;
  breadcrumb?: { label: string; to?: string }[];
}) {
  return (
    <section className="relative overflow-hidden bg-mesh-light pt-28 md:pt-36">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-grid-faint opacity-45" />
      <div className="container-page relative pb-14 md:pb-20">
        {breadcrumb ? <Breadcrumbs items={breadcrumb} /> : null}
        <p className="eyebrow mt-6">{eyebrow}</p>
        <h1 className="mt-4 max-w-4xl text-balance font-display text-4xl font-extrabold tracking-tight text-navy md:text-[3.25rem] md:leading-[1.05]">
          {title}
        </h1>
        {description ? (
          <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
            {description}
          </p>
        ) : null}
        {children ? <div className="mt-8">{children}</div> : null}
      </div>
    </section>
  );
}

/* ------------------------------- Breadcrumbs ------------------------------- */

export function Breadcrumbs({ items }: { items: { label: string; to?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1 text-xs text-muted-foreground">
        {items.map((item, index) => (
          <li key={item.label} className="flex items-center gap-1">
            {index > 0 ? <ChevronRight aria-hidden="true" className="size-3.5 opacity-60" /> : null}
            {item.to ? (
              <Link to={item.to} className="transition-colors hover:text-primary">
                {item.label}
              </Link>
            ) : (
              <span className="font-medium text-foreground">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/* ---------------------------------- Chips --------------------------------- */

export function Tag({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: "neutral" | "brand" | "success" | "warn" | "muted";
}) {
  const tones = {
    neutral: "border-hairline bg-secondary text-secondary-foreground",
    brand: "border-primary/25 bg-accent text-accent-foreground",
    success: "border-success/30 bg-success/10 text-success",
    warn: "border-destructive/25 bg-destructive/10 text-destructive",
    muted: "border-hairline bg-muted text-muted-foreground",
  } as const;

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 font-display text-[0.6875rem] font-bold uppercase tracking-[0.08em]",
        tones[tone],
      )}
    >
      {children}
    </span>
  );
}

/* ------------------------------- Empty state ------------------------------ */

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="surface-card flex flex-col items-center px-6 py-14 text-center">
      <div
        aria-hidden="true"
        className="grid size-11 place-items-center rounded-xl border border-hairline bg-surface text-primary"
      >
        <ArrowRight className="size-5" />
      </div>
      <h3 className="mt-4 font-display text-lg font-bold text-navy">{title}</h3>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">{description}</p>
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}

/* -------------------------------- CTA band -------------------------------- */

export function CtaSection({
  eyebrow = "Get involved",
  title,
  description,
  primary,
  secondary,
}: {
  eyebrow?: string;
  title: string;
  description: string;
  primary: { label: string; to: string };
  secondary?: { label: string; to: string };
}) {
  return (
    <section className="section-y">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-[1.75rem] bg-navy-deep px-6 py-14 md:px-14 md:py-18">
          <div className="relative max-w-2xl">
            <p className="font-display text-xs font-bold uppercase tracking-[0.14em] text-cyan">{eyebrow}</p>
            <h2 className="mt-4 text-balance font-display text-3xl font-extrabold tracking-tight text-navy-foreground md:text-[2.5rem]">
              {title}
            </h2>
            <p className="mt-4 text-pretty text-[1.0625rem] leading-relaxed text-navy-foreground/75">
              {description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" variant="secondary" className="rounded-full px-6">
                <Link to={primary.to}>{primary.label}</Link>
              </Button>
              {secondary ? (
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="rounded-full border-navy-foreground/25 bg-transparent px-6 text-navy-foreground hover:bg-navy-foreground/10 hover:text-navy-foreground"
                >
                  <Link to={secondary.to}>{secondary.label}</Link>
                </Button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- Stat blocks ------------------------------ */

export function StatGrid({ items }: { items: { label: string; value: string | null; note?: string }[] }) {
  return (
    <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((stat) => (
        <div key={stat.label} className="surface-card px-6 py-7">
          <dd className="font-display text-3xl font-extrabold tracking-tight text-navy md:text-[2.5rem]">
            {stat.value ?? <span className="text-muted-foreground">—</span>}
          </dd>
          <dt className="mt-2 font-display text-sm font-bold text-foreground">{stat.label}</dt>
          {stat.note ? (
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{stat.note}</p>
          ) : null}
        </div>
      ))}
    </dl>
  );
}

/* --------------------------------- Timeline -------------------------------- */

export function Timeline({
  items,
}: {
  items: { year: string; title: string; description: string; state: "current" | "planned" }[];
}) {
  return (
    <ol className="relative space-y-8 border-l border-hairline pl-6 md:pl-8">
      {items.map((item) => (
        <li key={`${item.year}-${item.title}`} className="relative">
          <span
            aria-hidden="true"
            className={cn(
              "absolute -left-[1.9rem] top-1.5 size-3 rounded-full border-2 border-background md:-left-[2.4rem]",
              item.state === "current" ? "bg-primary" : "bg-muted-foreground/40",
            )}
          />
          <div className="flex flex-wrap items-center gap-3">
            <Tag tone={item.state === "current" ? "brand" : "muted"}>{item.year}</Tag>
            <h3 className="font-display text-lg font-bold text-navy">{item.title}</h3>
          </div>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">{item.description}</p>
        </li>
      ))}
    </ol>
  );
}
