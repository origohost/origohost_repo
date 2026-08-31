import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";

import { ProgramCard } from "@/components/ui-kit/cards";
import { CtaSection, EmptyState, PageHero, SectionHeader } from "@/components/ui-kit/primitives";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { programCategories, programs } from "@/content/programs";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/programs")({
  head: () => ({
    meta: [
      { title: "Programs — OrigoHOST technology community" },
      {
        name: "description",
        content:
          "The OrigoHOST program directory: knowledge sharing, workshops, hackathons, meetups, open source, research, career development, entrepreneurship, mentorship and campus chapters.",
      },
      { property: "og:title", content: "OrigoHOST Programs" },
      {
        property: "og:description",
        content:
          "Every OrigoHOST program with its audience, format, status and outcomes — filter by category to find your track.",
      },
      { property: "og:url", content: "/programs" },
    ],
    links: [{ rel: "canonical", href: "/programs" }],
  }),
  component: ProgramsPage,
});

function ProgramsPage() {
  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return programs.filter((program) => {
      const matchesCategory = category === "all" || program.category === category;
      const matchesQuery =
        q.length === 0 ||
        program.title.toLowerCase().includes(q) ||
        program.description.toLowerCase().includes(q) ||
        program.audience.join(" ").toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  return (
    <>
      <PageHero
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Programs" }]}
        eyebrow="Programs"
        title="Programs designed around outcomes, not attendance."
        description="Each program states who it is for, how it runs, what state it is in and what you should walk away with."
      />

      <section className="section-y border-t border-hairline">
        <div className="container-page">
          <SectionHeader eyebrow="Directory" title="Find your program" />

          <div className="mt-8 flex flex-col gap-4">
            <label className="sr-only" htmlFor="program-search">
              Search programs
            </label>
            <Input
              id="program-search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by name, description or audience"
              className="h-12 max-w-md rounded-full bg-card px-5"
            />

            <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2">
              {["all", ...programCategories].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setCategory(item)}
                  aria-pressed={category === item}
                  className={cn(
                    "min-h-9 rounded-full border px-3.5 font-display text-xs font-bold uppercase tracking-[0.06em] transition-colors",
                    category === item
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-hairline bg-card text-muted-foreground hover:text-foreground",
                  )}
                >
                  {item === "all" ? "All programs" : item}
                </button>
              ))}
            </div>
          </div>

          <p className="mt-6 text-sm text-muted-foreground" aria-live="polite">
            Showing {filtered.length} of {programs.length} programs
          </p>

          {filtered.length > 0 ? (
            <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((program) => (
                <ProgramCard key={program.slug} program={program} />
              ))}
            </div>
          ) : (
            <div className="mt-8">
              <EmptyState
                title="No programs match those filters"
                description="Try clearing the search or selecting a different category. New programs are published as each cycle opens."
                action={
                  <Button
                    variant="outline"
                    className="rounded-full"
                    onClick={() => {
                      setCategory("all");
                      setQuery("");
                    }}
                  >
                    Clear filters
                  </Button>
                }
              />
            </div>
          )}
        </div>
      </section>

      <CtaSection
        title="Want to run a program with us?"
        description="Institutions, companies and communities can propose a workshop, session series or hackathon with the OrigoHOST programs team."
        primary={{ label: "Organize an Event", to: "/organize-an-event" }}
        secondary={{ label: "Join Community", to: "/community" }}
      />
    </>
  );
}
