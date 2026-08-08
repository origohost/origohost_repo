import { createFileRoute } from "@tanstack/react-router";

import { PartnerCard } from "@/components/ui-kit/cards";
import { CtaSection, PageHero, SectionHeader } from "@/components/ui-kit/primitives";
import { partners, partnershipModels, partnershipProcess } from "@/content/people";

export const Route = createFileRoute("/partnerships")({
  head: () => ({
    meta: [
      { title: "Partnerships — Work with OrigoHOST" },
      {
        name: "description",
        content:
          "Partnership models for institutions, industry, communities and sponsors, plus the OrigoHOST engagement process from introduction to impact report.",
      },
      { property: "og:title", content: "Partner with OrigoHOST" },
      {
        property: "og:description",
        content:
          "Academic, industry, community, knowledge, hiring and technology partnerships with documented scope and outcome reporting.",
      },
      { property: "og:url", content: "/partnerships" },
    ],
    links: [{ rel: "canonical", href: "/partnerships" }],
  }),
  component: PartnershipsPage,
});

function PartnershipsPage() {
  return (
    <>
      <PageHero
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Partnerships" }]}
        eyebrow="Partnerships"
        title="Partnerships built on scope, delivery and reporting."
        description="We work with institutions, companies and communities who want measurable outcomes rather than logo placement. Every engagement is documented and reported."
      />

      <section className="section-y border-t border-hairline">
        <div className="container-page">
          <SectionHeader
            eyebrow="Models"
            title="Ways to work with us"
            description="Choose the model closest to your goal — we will map it to the programs where it creates real value."
          />
          <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {partnershipModels.map((model) => (
              <li key={model.title} className="surface-card surface-card-hover p-6">
                <h3 className="font-display text-base font-bold text-navy">{model.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{model.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-y border-y border-hairline bg-surface">
        <div className="container-page">
          <SectionHeader
            eyebrow="Process"
            title="How a partnership runs"
            description="Five stages, each with a clear owner and a documented output."
          />
          <ol className="mt-12 grid gap-5 md:grid-cols-3 lg:grid-cols-5">
            {partnershipProcess.map((stage) => (
              <li key={stage.step} className="surface-card p-6">
                <span className="font-mono text-xs text-primary">{stage.step}</span>
                <h3 className="mt-2 font-display text-base font-bold text-navy">{stage.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{stage.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-y">
        <div className="container-page">
          <SectionHeader
            eyebrow="Ecosystem"
            title="Partner categories"
            description="Partner organisations are listed publicly only after an agreement is signed. Categories below show where collaboration is open."
          />
          <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {partners.map((partner) => (
              <li key={partner.name}>
                <PartnerCard partner={partner} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaSection
        eyebrow="Next step"
        title="Start a partnership conversation"
        description="Tell us about your organisation and what you want to achieve. We will respond with a proposed model and scope."
        primary={{ label: "Contact Partnerships", to: "/contact" }}
        secondary={{ label: "Organize an Event", to: "/organize-an-event" }}
      />
    </>
  );
}
