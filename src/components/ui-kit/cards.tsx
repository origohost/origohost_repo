import { Link } from "@tanstack/react-router";
import { ArrowUpRight, CalendarDays, MapPin } from "lucide-react";

import { Tag } from "@/components/ui-kit/primitives";
import { Button } from "@/components/ui/button";
import type {
  BlogPost,
  OrigoEvent,
  Partner,
  Person,
  Program,
  Resource,
  Testimonial,
} from "@/content/types";

export function formatEventDate(iso: string) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

const registrationCopy: Record<OrigoEvent["registrationStatus"], { label: string; tone: "success" | "warn" | "muted" }> =
  {
    open: { label: "Registration open", tone: "success" },
    waitlist: { label: "Waitlist", tone: "warn" },
    full: { label: "Full", tone: "warn" },
    closed: { label: "Registration closed", tone: "muted" },
    "not-open": { label: "Opening soon", tone: "muted" },
  };

/* -------------------------------- Event card ------------------------------- */

export function EventCard({ event }: { event: OrigoEvent }) {
  const reg = registrationCopy[event.registrationStatus];

  return (
    <article className="surface-card surface-card-hover flex flex-col p-6">
      <div className="flex flex-wrap items-center gap-2">
        <Tag tone="brand">{event.category}</Tag>
        <Tag>{event.mode}</Tag>
        {event.status === "live" ? <Tag tone="success">Live</Tag> : null}
        {event.status === "past" ? <Tag tone="muted">Past</Tag> : null}
      </div>

      <h3 className="mt-4 font-display text-lg font-bold leading-snug tracking-tight text-navy">
        <Link
          to="/events/$slug"
          params={{ slug: event.slug }}
          className="transition-colors hover:text-primary"
        >
          {event.title}
        </Link>
      </h3>

      <p className="mt-2.5 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{event.summary}</p>

      <dl className="mt-5 space-y-2 text-sm text-muted-foreground">
        <div className="flex min-w-0 items-center gap-2">
          <CalendarDays aria-hidden="true" className="size-4 shrink-0 text-primary" />
          <dt className="sr-only">Date</dt>
          <dd className="truncate">
            {formatEventDate(event.date)} · {event.time}
          </dd>
        </div>
        <div className="flex min-w-0 items-center gap-2">
          <MapPin aria-hidden="true" className="size-4 shrink-0 text-primary" />
          <dt className="sr-only">Location</dt>
          <dd className="truncate">{event.location}</dd>
        </div>
      </dl>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-hairline pt-4">
        <Tag tone={reg.tone}>{reg.label}</Tag>
        <Button asChild variant="ghost" size="sm" className="rounded-full">
          <Link to="/events/$slug" params={{ slug: event.slug }}>
            {event.status === "past" ? "Event report" : "View event"}
            <ArrowUpRight aria-hidden="true" className="size-4" />
          </Link>
        </Button>
      </div>
    </article>
  );
}

/* ------------------------------- Program card ------------------------------ */

export function ProgramCard({ program }: { program: Program }) {
  return (
    <article className="surface-card surface-card-hover flex flex-col p-6">
      <div className="flex flex-wrap items-center gap-2">
        <Tag tone="brand">{program.category}</Tag>
        <Tag tone={program.status === "active" || program.status === "open" ? "success" : "muted"}>
          {program.status}
        </Tag>
      </div>
      <h3 className="mt-4 font-display text-lg font-bold tracking-tight text-navy">{program.title}</h3>
      <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{program.description}</p>

      <dl className="mt-5 grid gap-3 border-t border-hairline pt-4 text-sm">
        <div>
          <dt className="font-display text-[0.6875rem] font-bold uppercase tracking-[0.1em] text-muted-foreground">
            Audience
          </dt>
          <dd className="mt-1 text-foreground">{program.audience.join(", ")}</dd>
        </div>
        <div>
          <dt className="font-display text-[0.6875rem] font-bold uppercase tracking-[0.1em] text-muted-foreground">
            Format
          </dt>
          <dd className="mt-1 text-foreground">{program.format}</dd>
        </div>
      </dl>

      <ul className="mt-4 space-y-1.5 text-sm text-muted-foreground">
        {program.outcomes.map((outcome) => (
          <li key={outcome} className="flex gap-2">
            <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-cyan" />
            {outcome}
          </li>
        ))}
      </ul>

      <div className="mt-6 pt-1">
        <Button asChild variant="outline" size="sm" className="rounded-full">
          <Link to="/community">Join this program</Link>
        </Button>
      </div>
    </article>
  );
}

/* -------------------------------- Person card ------------------------------ */

export function PersonCard({ person }: { person: Person }) {
  const initials = person.role
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <article className="surface-card p-6">
      <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-4">
        <span
          aria-hidden="true"
          className="grid size-12 shrink-0 place-items-center rounded-xl bg-navy-deep font-display text-sm font-extrabold text-navy-foreground"
        >
          {initials}
        </span>
        <div className="min-w-0">
          <h3 className="truncate font-display text-base font-bold text-navy">{person.name}</h3>
          <p className="truncate text-sm text-primary">{person.role}</p>
        </div>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{person.bio}</p>
    </article>
  );
}

/* ------------------------------- Partner card ------------------------------ */

export function PartnerCard({ partner }: { partner: Partner }) {
  return (
    <article className="surface-card p-6">
      <Tag tone="brand">{partner.type}</Tag>
      <h3 className="mt-4 font-display text-base font-bold text-navy">
        {partner.status === "placeholder" ? `${partner.type} partners` : partner.name}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{partner.description}</p>
      {partner.status === "placeholder" ? (
        <p className="mt-4 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-muted-foreground">
          Open for partnership
        </p>
      ) : null}
    </article>
  );
}

/* ------------------------------ Resource card ----------------------------- */

export function ResourceCard({ resource }: { resource: Resource }) {
  return (
    <article className="surface-card surface-card-hover flex flex-col p-6">
      <div className="flex flex-wrap items-center gap-2">
        <Tag tone="brand">{resource.type}</Tag>
        <Tag>{resource.category}</Tag>
      </div>
      <h3 className="mt-4 font-display text-base font-bold leading-snug text-navy">{resource.title}</h3>
      <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{resource.description}</p>
      <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-hairline pt-4 text-xs text-muted-foreground">
        <span>{resource.author}</span>
        <span aria-hidden="true">·</span>
        <span>{formatEventDate(resource.date)}</span>
        <span aria-hidden="true">·</span>
        <span>{resource.readingTime}</span>
      </div>
    </article>
  );
}

/* -------------------------------- Blog card ------------------------------- */

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="surface-card surface-card-hover flex flex-col overflow-hidden">
      <div aria-hidden="true" className="h-28 bg-navy-deep" />
      <div className="flex flex-1 flex-col p-6">
        <Tag tone="brand">{post.category}</Tag>
        <h3 className="mt-4 font-display text-lg font-bold leading-snug tracking-tight text-navy">
          <Link to="/blog/$slug" params={{ slug: post.slug }} className="transition-colors hover:text-primary">
            {post.title}
          </Link>
        </h3>
        <p className="mt-2.5 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
        <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 pt-5 text-xs text-muted-foreground">
          <span className="text-foreground">{post.author}</span>
          <span aria-hidden="true">·</span>
          <span>{formatEventDate(post.date)}</span>
          <span aria-hidden="true">·</span>
          <span>{post.readingTime}</span>
        </div>
      </div>
    </article>
  );
}

/* ------------------------------ Testimonial ------------------------------- */

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="surface-card p-6">
      <blockquote className="text-[1.0625rem] leading-relaxed text-foreground">
        “{testimonial.quote}”
      </blockquote>
      <figcaption className="mt-5 border-t border-hairline pt-4 text-sm">
        <span className="font-display font-bold text-navy">{testimonial.name}</span>
        <span className="block text-muted-foreground">
          {testimonial.role} · {testimonial.context}
        </span>
      </figcaption>
    </figure>
  );
}
