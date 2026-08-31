import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Boxes, Compass, Sparkles, Users } from "lucide-react";

import { BlogCard, EventCard, PartnerCard, ProgramCard, TestimonialCard } from "@/components/ui-kit/cards";
import { CtaSection, SectionHeader, StatGrid, Tag } from "@/components/ui-kit/primitives";
import { Button } from "@/components/ui/button";
import type { BlogPost, OrigoEvent } from "@/content/types";
import { listPublicEvents, listPublicPosts } from "@/lib/public-content.functions";
import { partners, testimonials, testimonialsNote } from "@/content/people";
import { featuredProgramSlugs, programs } from "@/content/programs";
import {
  brand,
  ecosystemAudiences,
  impactStats,
  pillars,
  technologyDomains,
  technologyLine,
  whatWeDo,
} from "@/content/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "OrigoHOST — Where Builders Become Innovators" },
      {
        name: "description",
        content:
          "OrigoHOST is a professional technology community helping students, developers, professionals, researchers and founders learn, build, collaborate and grow.",
      },
      { property: "og:title", content: "OrigoHOST — Where Builders Become Innovators" },
      {
        property: "og:description",
        content:
          "A professional technology community for people who build: programs, events, open source, research, mentorship and campus chapters.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  loader: async () => {
    const [events, posts] = await Promise.all([listPublicEvents(), listPublicPosts()]);
    return { events, posts };
  },
  component: HomePage,
});

const pillarIcons = [Compass, Boxes, Users, Sparkles];

function HomePage() {
  const { events, posts } = Route.useLoaderData() as { events: OrigoEvent[]; posts: BlogPost[] };
  const upcoming = events
    .filter((event) => event.status === "upcoming")
    .sort((a, b) => (a.date > b.date ? 1 : -1))
    .slice(0, 3);
  const live = events.filter((event) => event.status === "live");
  const homeEvents = [...live, ...upcoming].slice(0, 3);
  const blogPosts = posts;
  const featured = featuredProgramSlugs
    .map((slug) => programs.find((program) => program.slug === slug))
    .filter((program): program is (typeof programs)[number] => Boolean(program))
    .slice(0, 6);

  return (
    <>
      {/* 01 — Hero */}
      <section className="relative overflow-hidden bg-mesh-light pt-28 md:pt-36">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-grid-faint opacity-50" />
        <div className="container-page relative pb-16 md:pb-24">
          <div className="max-w-3xl">
            <p className="eyebrow reveal">OrigoHOST Technology Community</p>
            <h1 className="reveal mt-5 text-balance font-display text-[2.5rem] font-extrabold leading-[1.06] tracking-tight text-navy md:text-[4rem]">
              Where <span className="text-gradient-brand">Builders</span> Become Innovators
            </h1>
            <p className="reveal mt-4 font-display text-xl font-bold tracking-tight text-navy-soft md:text-2xl">
              {brand.motto}
            </p>
            <p className="reveal mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
              {brand.intro}
            </p>
            <div className="reveal mt-9 flex flex-wrap gap-3">
              <Button asChild size="lg" className="min-h-12 rounded-full px-6 text-[0.9375rem]">
                <Link to="/community">
                  Join Community
                  <ArrowRight aria-hidden="true" className="size-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="min-h-12 rounded-full px-6 text-[0.9375rem]">
                <Link to="/programs">Explore Programs</Link>
              </Button>
            </div>
          </div>

          <div className="mt-14 rounded-[1.5rem] border border-hairline bg-card/70 p-5 backdrop-blur-sm md:mt-20 md:p-7">
            <p className="font-display text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-muted-foreground">
              Technology focus
            </p>
            <ul className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2">
              {technologyLine.map((item) => (
                <li key={item} className="font-display text-sm font-bold text-navy md:text-base">
                  {item}
                  <span aria-hidden="true" className="ml-3 text-cyan">
                    •
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 02 — Ecosystem / trust */}
      <section className="border-y border-hairline bg-surface py-10">
        <div className="container-page">
          <div className="grid gap-6 md:grid-cols-[auto_minmax(0,1fr)] md:items-center">
            <p className="font-display text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
              Built for
            </p>
            <ul className="flex flex-wrap gap-x-6 gap-y-3">
              {ecosystemAudiences.map((audience) => (
                <li key={audience} className="font-display text-base font-bold text-navy-soft md:text-lg">
                  {audience}
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            Verified partner and community logos are published here as partnerships are confirmed.{" "}
            <Link to="/partnerships" className="font-medium text-primary underline-offset-4 hover:underline">
              Partner with OrigoHOST
            </Link>
            .
          </p>
        </div>
      </section>

      {/* 03 — Who we are */}
      <section className="section-y">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
            <div>
              <p className="eyebrow">Who we are</p>
              <h2 className="mt-3 text-balance font-display text-3xl font-extrabold tracking-tight text-navy md:text-[2.5rem] md:leading-[1.12]">
                A community built for people who build the future.
              </h2>
            </div>
            <div className="space-y-5 text-[1.0625rem] leading-relaxed text-muted-foreground">
              <p>
                OrigoHOST was founded in {brand.country} in {brand.founded} as a professional technology
                community — not a course platform and not an event series. Members join to work on real
                problems alongside people who are further along, and to help the people behind them.
              </p>
              <p>
                Everything we run is designed around one measurement: what a member can do afterwards that
                they could not do before. That pushes our programs towards hands-on labs, reviewed projects
                and published outcomes rather than passive attendance.
              </p>
              <p>
                The community spans AI, cloud, DevOps, cybersecurity, software engineering, open source and
                research — with career, leadership and entrepreneurship tracks running through all of them.
              </p>
            </div>
          </div>

          <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((pillar, index) => {
              const Icon = pillarIcons[index] ?? Compass;
              return (
                <li key={pillar.key} className="surface-card surface-card-hover p-6">
                  <span
                    aria-hidden="true"
                    className="grid size-10 place-items-center rounded-xl bg-accent text-accent-foreground"
                  >
                    <Icon className="size-5" />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-extrabold uppercase tracking-tight text-navy">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{pillar.description}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* 04 — What we do */}
      <section className="section-y border-y border-hairline bg-surface">
        <div className="container-page">
          <SectionHeader
            eyebrow="What we do"
            title="The OrigoHOST ecosystem"
            description="Ten connected activity areas that together form a full path from first workshop to leading a chapter."
            action={
              <Button asChild variant="outline" className="rounded-full">
                <Link to="/programs">All programs</Link>
              </Button>
            }
          />
          <ul className="mt-12 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
            {whatWeDo.map((item, index) => (
              <li key={item.title} className="border-t border-hairline pt-5">
                <span className="font-mono text-xs text-primary">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="mt-2 font-display text-base font-bold text-navy">{item.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 05 — Technology domains */}
      <section className="section-y">
        <div className="container-page">
          <SectionHeader
            eyebrow="Technology domains"
            title="Explore the technologies shaping tomorrow."
            description="Members choose a primary domain and cross into others through programs, projects and mentorship."
          />
          <ul className="mt-10 flex flex-wrap gap-2.5">
            {technologyDomains.map((domain) => (
              <li key={domain}>
                <span className="inline-flex min-h-11 items-center rounded-full border border-hairline bg-card px-4 font-display text-sm font-bold text-navy-soft shadow-soft transition-colors hover:border-primary/40 hover:text-primary">
                  {domain}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 06 — Featured programs */}
      <section className="section-y border-y border-hairline bg-surface">
        <div className="container-page">
          <SectionHeader
            eyebrow="Featured programs"
            title="Programs running this cycle"
            description="Each program has a defined audience, format and outcome. Status reflects what is live today."
            action={
              <Button asChild variant="outline" className="rounded-full">
                <Link to="/programs">View all programs</Link>
              </Button>
            }
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((program) => (
              <ProgramCard key={program.slug} program={program} />
            ))}
          </div>
        </div>
      </section>

      {/* 07 — Upcoming events */}
      <section className="section-y">
        <div className="container-page">
          <SectionHeader
            eyebrow="Events"
            title="What's happening next"
            description="Sessions, workshops, meetups and build weekends across the community calendar."
            action={
              <Button asChild variant="outline" className="rounded-full">
                <Link to="/events">View All Events</Link>
              </Button>
            }
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {homeEvents.map((event) => (
              <EventCard key={event.slug} event={event} />
            ))}
          </div>
        </div>
      </section>

      {/* 08 — Community impact */}
      <section className="section-y border-y border-hairline bg-surface">
        <div className="container-page">
          <SectionHeader
            eyebrow="Community impact"
            title="Only what we can verify"
            description="OrigoHOST publishes metrics from its own registries. Numbers appear here once a reporting cycle is complete — we do not estimate."
          />
          <div className="mt-12">
            <StatGrid items={impactStats} />
          </div>
        </div>
      </section>

      {/* 09 — Community stories */}
      <section className="section-y">
        <div className="container-page">
          <SectionHeader
            eyebrow="Community stories"
            title="Built with the community."
            description={testimonialsNote}
          />
          {testimonials.length > 0 ? (
            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((testimonial) => (
                <TestimonialCard key={testimonial.name} testimonial={testimonial} />
              ))}
            </div>
          ) : (
            <div className="mt-10 grid gap-5 lg:grid-cols-[1.4fr_1fr]">
              <div className="surface-card p-7">
                <Tag tone="muted">Awaiting member approval</Tag>
                <p className="mt-4 text-[1.0625rem] leading-relaxed text-foreground">
                  Rather than publishing invented quotes, this section stays empty until real members approve
                  their own words. In the meantime, our editorial writing shows how the community thinks.
                </p>
                <Button asChild variant="outline" className="mt-6 rounded-full">
                  <Link to="/blog">Read the blog</Link>
                </Button>
              </div>
              <div className="surface-card p-7">
                <h3 className="font-display text-base font-bold text-navy">Want to share your story?</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Members who have shipped something through an OrigoHOST program can submit a story for
                  review.
                </p>
                <Button asChild variant="ghost" className="mt-5 rounded-full px-0 hover:bg-transparent">
                  <Link to="/contact" className="text-primary">
                    Submit a story
                    <ArrowRight aria-hidden="true" className="size-4" />
                  </Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 10 — Partnerships */}
      <section className="section-y border-y border-hairline bg-surface">
        <div className="container-page">
          <SectionHeader
            eyebrow="Partnerships"
            title="Build meaningful partnerships with OrigoHOST."
            description="Academic, industry, community and knowledge partners shape programs alongside us — and receive a documented impact report after every collaboration."
            action={
              <Button asChild className="rounded-full">
                <Link to="/partnerships">Partner With Us</Link>
              </Button>
            }
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {partners.slice(0, 4).map((partner) => (
              <PartnerCard key={partner.name} partner={partner} />
            ))}
          </div>
        </div>
      </section>

      {/* Editorial */}
      <section className="section-y">
        <div className="container-page">
          <SectionHeader
            eyebrow="From the blog"
            title="How this community thinks"
            action={
              <Button asChild variant="outline" className="rounded-full">
                <Link to="/blog">All posts</Link>
              </Button>
            }
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.slice(0, 3).map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* 11 — Final CTA */}
      <CtaSection
        eyebrow="Join OrigoHOST"
        title="Become part of the movement."
        description="Learn. Build. Collaborate. Grow. Membership is free and open to anyone serious about building with technology."
        primary={{ label: "Join Community", to: "/community" }}
        secondary={{ label: "Explore Events", to: "/events" }}
      />
    </>
  );
}
