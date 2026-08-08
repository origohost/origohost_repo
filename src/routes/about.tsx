import { createFileRoute } from "@tanstack/react-router";

import { PersonCard } from "@/components/ui-kit/cards";
import { CtaSection, PageHero, SectionHeader, StatGrid, Timeline } from "@/components/ui-kit/primitives";
import { governance, leadership } from "@/content/people";
import { brand, impactStats, philosophy, storyTimeline } from "@/content/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About OrigoHOST — A professional technology community" },
      {
        name: "description",
        content:
          "OrigoHOST was founded in India in 2026 as a professional technology community. Read our story, mission, vision, philosophy, leadership and governance.",
      },
      { property: "og:title", content: "About OrigoHOST" },
      {
        property: "og:description",
        content:
          "Our story, mission, vision, philosophy, leadership and governance — the institution behind the OrigoHOST community.",
      },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <PageHero
        breadcrumb={[{ label: "Home", to: "/" }, { label: "About" }]}
        eyebrow="About OrigoHOST"
        title="About OrigoHOST"
        description={`${brand.tagline} — a professional technology community founded in ${brand.country} in ${brand.founded}, built around programs that produce real capability.`}
      />

      <section className="section-y border-t border-hairline">
        <div className="container-page grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <SectionHeader
            eyebrow="Our story"
            title="Built deliberately, from the first program forward."
            description="OrigoHOST is young by design. Instead of claiming history we do not have, we publish the path we are on and update it as each stage is delivered."
          />
          <Timeline items={storyTimeline} />
        </div>
      </section>

      <section className="section-y border-y border-hairline bg-surface">
        <div className="container-page grid gap-6 md:grid-cols-2">
          <div className="surface-card p-8">
            <p className="eyebrow">Mission</p>
            <p className="mt-4 text-pretty text-lg leading-relaxed text-foreground">
              To create accessible, practical, and collaborative technology experiences that help people
              learn, build meaningful solutions, and develop the capabilities required for the future.
            </p>
          </div>
          <div className="surface-card p-8">
            <p className="eyebrow">Vision</p>
            <p className="mt-4 text-pretty text-lg leading-relaxed text-foreground">
              To build a globally connected technology ecosystem where builders become innovators, leaders,
              and problem solvers.
            </p>
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="container-page">
          <SectionHeader
            eyebrow="Our philosophy"
            title="Five principles that decide how we run programs"
          />
          <ul className="mt-12 grid gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
            {philosophy.map((item, index) => (
              <li key={item.title} className="border-t border-hairline pt-5">
                <span className="font-mono text-xs text-primary">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="mt-2 font-display text-lg font-bold text-navy">{item.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-y border-y border-hairline bg-surface">
        <div className="container-page">
          <SectionHeader
            eyebrow="Leadership"
            title="Who is accountable"
            description="Leadership profiles are published from the central people registry. Roles open for appointment are marked as such rather than filled with placeholder names."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {leadership.map((person) => (
              <PersonCard key={person.role} person={person} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="container-page">
          <SectionHeader
            eyebrow="Governance"
            title="Structured, documented, reviewable"
            description="OrigoHOST operates through departments, policies, review processes and named responsibilities. Internal operational detail stays internal; the standards themselves are public."
          />
          <ul className="mt-12 grid gap-5 md:grid-cols-2">
            {governance.map((item) => (
              <li key={item.title} className="surface-card p-7">
                <h3 className="font-display text-base font-bold text-navy">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-y border-t border-hairline bg-surface">
        <div className="container-page">
          <SectionHeader
            eyebrow="Impact"
            title="Measured, not estimated"
            description="Every metric below comes from our own event, program and membership registries."
          />
          <div className="mt-12">
            <StatGrid items={impactStats} />
          </div>
        </div>
      </section>

      <CtaSection
        title="Join the community behind the work."
        description="Membership is open to students, developers, professionals, researchers, founders and educators."
        primary={{ label: "Join Community", to: "/community" }}
        secondary={{ label: "Explore Programs", to: "/programs" }}
      />
    </>
  );
}
