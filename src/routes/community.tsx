import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";

import { CtaSection, PageHero, SectionHeader, Tag } from "@/components/ui-kit/primitives";
import { Button } from "@/components/ui/button";
import {
  communityBenefits,
  communityRoles,
  communityStructure,
  ecosystemAudiences,
} from "@/content/site";

export const Route = createFileRoute("/community")({
  head: () => ({
    meta: [
      { title: "Community — Join OrigoHOST" },
      {
        name: "description",
        content:
          "Find your place in the OrigoHOST community: membership, benefits, chapters, ambassadors, mentors and contributor pathways.",
      },
      { property: "og:title", content: "Join the OrigoHOST community" },
      {
        property: "og:description",
        content:
          "Membership, benefits, chapter structure and community roles for students, developers, professionals, researchers and founders.",
      },
      { property: "og:url", content: "/community" },
    ],
    links: [{ rel: "canonical", href: "/community" }],
  }),
  component: CommunityPage,
});

function CommunityPage() {
  return (
    <>
      <PageHero
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Community" }]}
        eyebrow="Community"
        title="Find your place in the OrigoHOST community."
        description="Membership is free, open and built around participation. You choose a domain, join programs and grow into the role you want to hold."
      >
        <div className="flex flex-wrap gap-3">
          <Button asChild size="lg" className="min-h-12 rounded-full px-6">
            <Link to="/contact">
              Join OrigoHOST
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="min-h-12 rounded-full px-6">
            <Link to="/programs">Explore Programs</Link>
          </Button>
        </div>
      </PageHero>

      <section className="section-y border-t border-hairline">
        <div className="container-page">
          <SectionHeader
            eyebrow="Who can join"
            title="Open to everyone who builds with technology"
            description="There is no entry test and no minimum experience level — only an expectation that you participate."
          />
          <ul className="mt-10 flex flex-wrap gap-2.5">
            {ecosystemAudiences.concat("Technology Enthusiasts").map((audience) => (
              <li key={audience}>
                <span className="inline-flex min-h-11 items-center rounded-full border border-hairline bg-card px-4 font-display text-sm font-bold text-navy-soft shadow-soft">
                  {audience}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-y border-y border-hairline bg-surface">
        <div className="container-page">
          <SectionHeader eyebrow="Why join" title="What membership actually gives you" />
          <ul className="mt-12 grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
            {communityBenefits.map((benefit) => (
              <li key={benefit} className="flex items-start gap-3 border-t border-hairline pt-4">
                <span
                  aria-hidden="true"
                  className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-success/12 text-success"
                >
                  <Check className="size-3.5" />
                </span>
                <span className="text-[0.9375rem] leading-relaxed text-foreground">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-y">
        <div className="container-page">
          <SectionHeader
            eyebrow="Community structure"
            title="One community, four operating levels"
            description="Standards are set nationally; programs are delivered locally by chapters and member groups."
          />
          <ol className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {communityStructure.map((level, index) => (
              <li key={level.name} className="surface-card p-6">
                <span className="font-mono text-xs text-primary">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-display text-base font-bold text-navy">{level.name}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{level.region}</p>
                <div className="mt-4">
                  <Tag tone={level.status === "active" ? "success" : "muted"}>
                    {level.status.replace("-", " ")}
                  </Tag>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-y border-y border-hairline bg-surface">
        <div className="container-page">
          <SectionHeader
            eyebrow="Community roles"
            title="Grow into a role that fits you"
            description="Every role has published expectations and a defined term, so contribution is recognised rather than assumed."
          />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {communityRoles.map((role) => (
              <li key={role.title} className="surface-card surface-card-hover p-6">
                <h3 className="font-display text-base font-bold text-navy">{role.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{role.description}</p>
                <Button asChild variant="ghost" size="sm" className="mt-4 rounded-full px-0 hover:bg-transparent">
                  <Link to="/contact" className="text-primary">
                    Apply
                    <ArrowRight aria-hidden="true" className="size-4" />
                  </Link>
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaSection
        eyebrow="Membership"
        title="Join OrigoHOST"
        description="Tell us who you are and what you want to build. Applications are reviewed by the community team and you are onboarded into your chosen domain."
        primary={{ label: "Join Community", to: "/contact" }}
        secondary={{ label: "Start a Chapter", to: "/organize-an-event" }}
      />
    </>
  );
}
