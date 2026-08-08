import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowLeft, CalendarDays, Clock, MapPin, Users } from "lucide-react";

import { EventCard, formatEventDate } from "@/components/ui-kit/cards";
import { Breadcrumbs, EmptyState, SectionHeader, Tag } from "@/components/ui-kit/primitives";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { events, getEventBySlug } from "@/content/events";

export const Route = createFileRoute("/events/$slug")({
  loader: ({ params }) => {
    const event = getEventBySlug(params.slug);
    if (!event) throw notFound();
    return { event };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Event unavailable — OrigoHOST" }, { name: "robots", content: "noindex" }],
      };
    }
    const { event } = loaderData;
    return {
      meta: [
        { title: `${event.title} — OrigoHOST` },
        { name: "description", content: event.summary },
        { property: "og:title", content: event.title },
        { property: "og:description", content: event.summary },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/events/${event.slug}` },
      ],
      links: [{ rel: "canonical", href: `/events/${event.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Event",
            name: event.title,
            description: event.summary,
            startDate: event.date,
            eventAttendanceMode:
              event.mode === "online"
                ? "https://schema.org/OnlineEventAttendanceMode"
                : event.mode === "hybrid"
                  ? "https://schema.org/MixedEventAttendanceMode"
                  : "https://schema.org/OfflineEventAttendanceMode",
            location: { "@type": "Place", name: event.location },
            organizer: { "@type": "Organization", name: event.organizer },
          }),
        },
      ],
    };
  },
  component: EventDetailPage,
  notFoundComponent: EventNotFound,
});

function EventNotFound() {
  return (
    <div className="container-page py-40">
      <EmptyState
        title="This event could not be found"
        description="The event may have been renamed or removed. Browse the full calendar to find what you were looking for."
        action={
          <Button asChild className="rounded-full">
            <Link to="/events">Back to events</Link>
          </Button>
        }
      />
    </div>
  );
}

function EventDetailPage() {
  const { event } = Route.useLoaderData() as { event: OrigoEvent };
  const related = events
    .filter((item) => item.slug !== event.slug && item.category === event.category)
    .slice(0, 3);
  const fallbackRelated = events.filter((item) => item.slug !== event.slug).slice(0, 3);
  const relatedEvents = related.length > 0 ? related : fallbackRelated;

  const canRegister = event.registrationStatus === "open" || event.registrationStatus === "waitlist";

  return (
    <>
      <section className="relative overflow-hidden bg-mesh-light pt-28 md:pt-36">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-grid-faint opacity-40" />
        <div className="container-page relative pb-14 md:pb-18">
          <Breadcrumbs
            items={[{ label: "Home", to: "/" }, { label: "Events", to: "/events" }, { label: event.title }]}
          />
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <Tag tone="brand">{event.category}</Tag>
            <Tag>{event.mode}</Tag>
            <Tag tone={event.status === "live" ? "success" : event.status === "past" ? "muted" : "brand"}>
              {event.status}
            </Tag>
          </div>
          <h1 className="mt-5 max-w-3xl text-balance font-display text-3xl font-extrabold tracking-tight text-navy md:text-[3rem] md:leading-[1.07]">
            {event.title}
          </h1>
          <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
            {event.summary}
          </p>

          <dl className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: CalendarDays, label: "Date", value: formatEventDate(event.date) },
              { icon: Clock, label: "Time", value: event.time },
              { icon: MapPin, label: "Location", value: event.location },
              { icon: Users, label: "Organizer", value: event.organizer },
            ].map((item) => (
              <div key={item.label} className="surface-card px-5 py-4">
                <dt className="flex items-center gap-2 font-display text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                  <item.icon aria-hidden="true" className="size-3.5 text-primary" />
                  {item.label}
                </dt>
                <dd className="mt-1.5 text-sm font-medium text-foreground">{item.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            {canRegister ? (
              <Button asChild size="lg" className="min-h-12 rounded-full px-6">
                <a href={event.registrationUrl ?? "/contact"}>
                  {event.registrationStatus === "waitlist" ? "Join the waitlist" : "Register now"}
                </a>
              </Button>
            ) : (
              <Button size="lg" disabled className="min-h-12 rounded-full px-6">
                {event.registrationStatus === "not-open" ? "Registration opens soon" : "Registration closed"}
              </Button>
            )}
            <Button asChild size="lg" variant="outline" className="min-h-12 rounded-full px-6">
              <Link to="/events">
                <ArrowLeft aria-hidden="true" className="size-4" />
                All events
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="section-y border-t border-hairline">
        <div className="container-page grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
          <div className="space-y-14">
            <div>
              <h2 className="font-display text-2xl font-extrabold tracking-tight text-navy">
                About the event
              </h2>
              <p className="mt-4 text-[1.0625rem] leading-relaxed text-muted-foreground">
                {event.description}
              </p>
            </div>

            {event.agenda.length > 0 ? (
              <div>
                <h2 className="font-display text-2xl font-extrabold tracking-tight text-navy">Agenda</h2>
                <ol className="mt-6 divide-y divide-hairline border-y border-hairline">
                  {event.agenda.map((item) => (
                    <li key={item.title} className="grid gap-1 py-4 sm:grid-cols-[9rem_minmax(0,1fr)]">
                      <span className="font-mono text-sm text-primary">{item.time}</span>
                      <div>
                        <p className="font-display text-base font-bold text-navy">{item.title}</p>
                        {item.detail ? (
                          <p className="mt-1 text-sm text-muted-foreground">{item.detail}</p>
                        ) : null}
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            ) : null}

            <div className="grid gap-8 sm:grid-cols-2">
              <div>
                <h2 className="font-display text-lg font-extrabold tracking-tight text-navy">
                  Who should attend
                </h2>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  {event.whoShouldAttend.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-cyan" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="font-display text-lg font-extrabold tracking-tight text-navy">
                  What you'll learn
                </h2>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  {event.learningOutcomes.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {event.report ? (
              <div>
                <h2 className="font-display text-2xl font-extrabold tracking-tight text-navy">
                  Event report
                </h2>
                <p className="mt-4 text-[1.0625rem] leading-relaxed text-muted-foreground">
                  {event.report.overview}
                </p>

                <div className="mt-8 grid gap-6 sm:grid-cols-2">
                  <div className="surface-card p-6">
                    <h3 className="font-display text-base font-bold text-navy">Key discussions</h3>
                    <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                      {event.report.keyDiscussions.map((item) => (
                        <li key={item} className="flex gap-2">
                          <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-cyan" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="surface-card p-6">
                    <h3 className="font-display text-base font-bold text-navy">Outcomes</h3>
                    <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                      {event.report.outcomes.map((item) => (
                        <li key={item} className="flex gap-2">
                          <span
                            aria-hidden="true"
                            className="mt-2 size-1.5 shrink-0 rounded-full bg-success"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <dl className="mt-6 grid gap-4 sm:grid-cols-3">
                  <div className="surface-card px-5 py-4">
                    <dt className="font-display text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                      Participants
                    </dt>
                    <dd className="mt-1.5 text-sm text-foreground">
                      {event.report.participants ?? "Verified count pending"}
                    </dd>
                  </div>
                  <div className="surface-card px-5 py-4">
                    <dt className="font-display text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                      Recordings
                    </dt>
                    <dd className="mt-1.5 text-sm text-foreground">
                      {event.report.recordings[0]?.label ?? "Not published"}
                    </dd>
                  </div>
                  <div className="surface-card px-5 py-4">
                    <dt className="font-display text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                      Presentations
                    </dt>
                    <dd className="mt-1.5 text-sm text-foreground">
                      {event.report.presentations[0]?.label ?? "Not published"}
                    </dd>
                  </div>
                </dl>

                <div className="mt-6">
                  <h3 className="font-display text-base font-bold text-navy">Gallery</h3>
                  <ul className="mt-3 grid gap-3 sm:grid-cols-3">
                    {event.report.gallery.map((item) => (
                      <li
                        key={item.caption}
                        className="flex aspect-video items-end rounded-xl border border-dashed border-hairline bg-surface p-3 text-xs text-muted-foreground"
                      >
                        {item.caption}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : null}

            {event.faqs.length > 0 ? (
              <div>
                <h2 className="font-display text-2xl font-extrabold tracking-tight text-navy">FAQs</h2>
                <Accordion type="single" collapsible className="mt-4">
                  {event.faqs.map((faq) => (
                    <AccordionItem key={faq.question} value={faq.question}>
                      <AccordionTrigger className="text-left font-display font-bold text-navy">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ) : null}
          </div>

          <aside className="space-y-5">
            <div className="surface-card p-6">
              <h2 className="font-display text-base font-bold text-navy">Speakers</h2>
              {event.speakers.length > 0 ? (
                <ul className="mt-4 space-y-4">
                  {event.speakers.map((speaker) => (
                    <li key={speaker.name}>
                      <p className="font-display text-sm font-bold text-navy">{speaker.name}</p>
                      <p className="text-sm text-primary">{speaker.role}</p>
                      {speaker.bio ? (
                        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{speaker.bio}</p>
                      ) : null}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-3 text-sm text-muted-foreground">
                  Speakers are announced once confirmed by the programs team.
                </p>
              )}
            </div>

            <div className="surface-card p-6">
              <h2 className="font-display text-base font-bold text-navy">Topics</h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {event.topics.map((topic) => (
                  <li key={topic}>
                    <Tag>{topic}</Tag>
                  </li>
                ))}
              </ul>
            </div>

            <div className="surface-card p-6">
              <h2 className="font-display text-base font-bold text-navy">Partners</h2>
              <p className="mt-3 text-sm text-muted-foreground">
                {event.partners.length > 0
                  ? event.partners.join(", ")
                  : "No partners confirmed for this event yet."}
              </p>
              <Button asChild variant="outline" size="sm" className="mt-4 rounded-full">
                <Link to="/partnerships">Partner with us</Link>
              </Button>
            </div>

            <div className="surface-card p-6">
              <h2 className="font-display text-base font-bold text-navy">Certificate</h2>
              <p className="mt-3 text-sm text-muted-foreground">
                {event.certificate ?? "Certificates are not issued for this format."}
              </p>
            </div>

            <div className="surface-card p-6">
              <h2 className="font-display text-base font-bold text-navy">Resources</h2>
              <p className="mt-3 text-sm text-muted-foreground">
                Session material is published in the resource library after delivery.
              </p>
              <Button asChild variant="ghost" size="sm" className="mt-3 rounded-full px-0 hover:bg-transparent">
                <Link to="/resources" className="text-primary">
                  Browse resources
                </Link>
              </Button>
            </div>
          </aside>
        </div>
      </section>

      <section className="section-y border-t border-hairline bg-surface">
        <div className="container-page">
          <SectionHeader eyebrow="Related" title="More events like this" />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {relatedEvents.map((item) => (
              <EventCard key={item.slug} event={item} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
