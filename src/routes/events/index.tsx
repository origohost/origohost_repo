import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";

import { EventCard } from "@/components/ui-kit/cards";
import { CtaSection, EmptyState, PageHero, SectionHeader } from "@/components/ui-kit/primitives";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { OrigoEvent } from "@/content/types";
import { listPublicEvents } from "@/lib/public-content.functions";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/events/")({
  head: () => ({
    meta: [
      { title: "Events — OrigoHOST community calendar" },
      {
        name: "description",
        content:
          "Upcoming, live and past OrigoHOST events: knowledge-sharing sessions, workshops, hackathons and community meetups. Filter by status, mode, category and audience.",
      },
      { property: "og:title", content: "OrigoHOST Events" },
      {
        property: "og:description",
        content:
          "The full OrigoHOST event calendar with filters for status, mode, category and audience, plus published reports for past events.",
      },
      { property: "og:url", content: "/events" },
    ],
    links: [{ rel: "canonical", href: "/events" }],
  }),
  loader: () => listPublicEvents(),
  component: EventsPage,
  errorComponent: EventsUnavailable,
});

function EventsUnavailable() {
  return (
    <div className="container-page py-40">
      <EmptyState
        title="Events could not be loaded"
        description="Something went wrong while loading the calendar. Please refresh the page or try again shortly."
      />
    </div>
  );
}

const statuses = ["all", "upcoming", "live", "past"] as const;
const modes = ["all", "online", "offline", "hybrid"] as const;

function FilterRow({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: readonly string[];
  value: string;
  onChange: (next: string) => void;
}) {
  return (
    <div role="group" aria-label={label} className="grid gap-2 sm:grid-cols-[7rem_minmax(0,1fr)] sm:items-center">
      <span className="font-display text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-muted-foreground">
        {label}
      </span>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            aria-pressed={value === option}
            className={cn(
              "min-h-9 rounded-full border px-3.5 font-display text-xs font-bold capitalize tracking-[0.04em] transition-colors",
              value === option
                ? "border-primary bg-primary text-primary-foreground"
                : "border-hairline bg-card text-muted-foreground hover:text-foreground",
            )}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

function EventsPage() {
  const events = Route.useLoaderData() as OrigoEvent[];
  const [status, setStatus] = useState<string>("all");
  const [mode, setMode] = useState<string>("all");
  const [category, setCategory] = useState<string>("all");
  const [audience, setAudience] = useState<string>("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return events
      .filter((event) => {
        if (status !== "all" && event.status !== status) return false;
        if (mode !== "all" && event.mode !== mode) return false;
        if (category !== "all" && event.category !== category) return false;
        if (audience !== "all" && !event.audience.includes(audience)) return false;
        if (q.length === 0) return true;
        const haystack = [
          event.title,
          event.location,
          event.organizer,
          ...event.speakers.map((speaker) => speaker.name),
          ...event.tags,
        ]
          .join(" ")
          .toLowerCase();
        return haystack.includes(q);
      })
      .sort((a, b) => (a.date < b.date ? 1 : -1));
  }, [events, status, mode, category, audience, query]);

  const eventCategories = useMemo(
    () => [...new Set(events.map((event) => event.category))].sort(),
    [events],
  );
  const eventAudiences = useMemo(
    () => [...new Set(events.flatMap((event) => event.audience))].sort(),
    [events],
  );

  const reset = () => {
    setStatus("all");
    setMode("all");
    setCategory("all");
    setAudience("all");
    setQuery("");
  };

  return (
    <>
      <PageHero
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Events" }]}
        eyebrow="Events"
        title="The OrigoHOST community calendar"
        description="Sessions, labs, meetups and build weekends. Past events keep a published report so the work is documented, not forgotten."
      />

      <section className="section-y border-t border-hairline">
        <div className="container-page">
          <SectionHeader eyebrow="Browse" title="Filter the calendar" />

          <div className="mt-8 space-y-5">
            <label className="sr-only" htmlFor="event-search">
              Search events by name, speaker or location
            </label>
            <Input
              id="event-search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by event name, speaker or location"
              className="h-12 max-w-md rounded-full bg-card px-5"
            />
            <FilterRow label="Status" options={statuses} value={status} onChange={setStatus} />
            <FilterRow label="Mode" options={modes} value={mode} onChange={setMode} />
            <FilterRow
              label="Category"
              options={["all", ...eventCategories]}
              value={category}
              onChange={setCategory}
            />
            <FilterRow
              label="Audience"
              options={["all", ...eventAudiences]}
              value={audience}
              onChange={setAudience}
            />
          </div>

          <div className="mt-7 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground" aria-live="polite">
              Showing {filtered.length} of {events.length} events
            </p>
            <Button variant="ghost" size="sm" className="rounded-full" onClick={reset}>
              Reset filters
            </Button>
          </div>

          {filtered.length > 0 ? (
            <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((event) => (
                <EventCard key={event.slug} event={event} />
              ))}
            </div>
          ) : (
            <div className="mt-8">
              <EmptyState
                title="No events match those filters"
                description="Nothing on the calendar matches this combination yet. Reset the filters or check back as new events are published."
                action={
                  <Button variant="outline" className="rounded-full" onClick={reset}>
                    Reset filters
                  </Button>
                }
              />
            </div>
          )}
        </div>
      </section>

      <CtaSection
        title="Bring an OrigoHOST event to your campus or company."
        description="Universities, companies and communities can propose and co-host events with our programs team."
        primary={{ label: "Organize an Event", to: "/organize-an-event" }}
        secondary={{ label: "Join Community", to: "/community" }}
      />
    </>
  );
}
