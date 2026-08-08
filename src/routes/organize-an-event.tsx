import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

import { CtaSection, PageHero, SectionHeader } from "@/components/ui-kit/primitives";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/organize-an-event")({
  head: () => ({
    meta: [
      { title: "Organize an Event with OrigoHOST" },
      {
        name: "description",
        content:
          "Propose a workshop, session series, hackathon or campus event with OrigoHOST. See the process, what we provide, what we ask from hosts, and submit an enquiry.",
      },
      { property: "og:title", content: "Organize an event with OrigoHOST" },
      {
        property: "og:description",
        content:
          "The hosting process, responsibilities and enquiry form for institutions, companies and communities co-hosting OrigoHOST programs.",
      },
      { property: "og:url", content: "/organize-an-event" },
    ],
    links: [{ rel: "canonical", href: "/organize-an-event" }],
  }),
  component: OrganizeEventPage,
});

const steps = [
  { step: "01", title: "Enquiry", description: "You share the format, audience and rough timeline." },
  { step: "02", title: "Scoping call", description: "We agree objectives, level and the outcome to aim for." },
  { step: "03", title: "Program design", description: "Our team builds the agenda, speakers and material." },
  { step: "04", title: "Delivery", description: "We run the event with your team on the ground or online." },
  { step: "05", title: "Report", description: "You receive a documented report with outcomes and material." },
];

const weProvide = [
  "Program design and agenda structure",
  "Speakers, facilitators and mentors from the community",
  "Registration handling and participant communication",
  "Session material, templates and post-event resources",
  "A published event report with outcomes",
];

const weAskFor = [
  "A venue or platform confirmed for the agreed date",
  "A named coordinator from your side",
  "Basic logistics — access, seating, network, power",
  "Permission to document the session for the community report",
];

function OrganizeEventPage() {
  const [submitting, setSubmitting] = useState(false);

  return (
    <>
      <PageHero
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Organize an Event" }]}
        eyebrow="Host with us"
        title="Bring an OrigoHOST program to your campus or company."
        description="We co-design and deliver sessions, labs, hackathons and meetups with hosts who want their people to leave with something usable."
      />

      <section className="section-y border-t border-hairline">
        <div className="container-page">
          <SectionHeader eyebrow="Process" title="How hosting works" />
          <ol className="mt-12 grid gap-5 md:grid-cols-3 lg:grid-cols-5">
            {steps.map((item) => (
              <li key={item.step} className="surface-card p-6">
                <span className="font-mono text-xs text-primary">{item.step}</span>
                <h3 className="mt-2 font-display text-base font-bold text-navy">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-y border-y border-hairline bg-surface">
        <div className="container-page grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="font-display text-2xl font-extrabold tracking-tight text-navy">What we provide</h2>
            <ul className="mt-6 space-y-3">
              {weProvide.map((item) => (
                <li key={item} className="flex gap-3 border-t border-hairline pt-3 text-sm text-muted-foreground">
                  <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-2xl font-extrabold tracking-tight text-navy">
              What we ask from hosts
            </h2>
            <ul className="mt-6 space-y-3">
              {weAskFor.map((item) => (
                <li key={item} className="flex gap-3 border-t border-hairline pt-3 text-sm text-muted-foreground">
                  <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-cyan" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="container-page">
          <div className="mx-auto max-w-2xl">
            <SectionHeader
              align="center"
              eyebrow="Enquiry"
              title="Submit a hosting enquiry"
              description="Share the essentials and the programs team will follow up to scope the event."
            />
            <form
              className="surface-card mt-10 space-y-5 p-6 md:p-8"
              onSubmit={(event) => {
                event.preventDefault();
                setSubmitting(true);
                const form = event.currentTarget;
                setTimeout(() => {
                  setSubmitting(false);
                  form.reset();
                  toast.success("Enquiry received", {
                    description: "The programs team will get back to you with next steps.",
                  });
                }, 400);
              }}
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="host-org">Organisation</Label>
                  <Input id="host-org" name="organisation" required placeholder="Institution or company" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="host-name">Contact person</Label>
                  <Input id="host-name" name="name" required placeholder="Full name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="host-email">Email</Label>
                  <Input id="host-email" name="email" type="email" required placeholder="you@organisation.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="host-format">Event format</Label>
                  <Input id="host-format" name="format" required placeholder="Workshop, hackathon, meetup…" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="host-audience">Expected audience</Label>
                  <Input id="host-audience" name="audience" placeholder="Who will attend, and roughly how many" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="host-date">Preferred timeline</Label>
                  <Input id="host-date" name="timeline" placeholder="Month or date range" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="host-details">What do you want participants to walk away with?</Label>
                <Textarea id="host-details" name="details" rows={5} required placeholder="Describe the outcome you have in mind." />
              </div>
              <Button type="submit" size="lg" disabled={submitting} className="min-h-12 w-full rounded-full">
                {submitting ? "Sending…" : "Submit enquiry"}
              </Button>
              <p className="text-xs text-muted-foreground">
                Enquiries are reviewed by the programs team. You will receive a reply at the email address provided.
              </p>
            </form>
          </div>
        </div>
      </section>

      <CtaSection
        title="Looking for a longer-term collaboration?"
        description="Recurring programs, chapter hosting and sponsorship are handled through our partnership models."
        primary={{ label: "See Partnership Models", to: "/partnerships" }}
        secondary={{ label: "Contact Us", to: "/contact" }}
      />
    </>
  );
}
