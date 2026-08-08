import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";

import { ResourceCard } from "@/components/ui-kit/cards";
import { CtaSection, EmptyState, PageHero, SectionHeader } from "@/components/ui-kit/primitives";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { resourceCategories, resourceTypes, resources } from "@/content/resources";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/resources")({
  head: () => ({
    meta: [
      { title: "Resource Library — OrigoHOST" },
      {
        name: "description",
        content:
          "Guides, presentations, recordings, research notes, templates and open projects published by the OrigoHOST community.",
      },
      { property: "og:title", content: "OrigoHOST Resource Library" },
      {
        property: "og:description",
        content:
          "Searchable community knowledge base: guides, recordings, research, templates and project write-ups.",
      },
      { property: "og:url", content: "/resources" },
    ],
    links: [{ rel: "canonical", href: "/resources" }],
  }),
  component: ResourcesPage,
});

function ResourcesPage() {
  const [type, setType] = useState<string>("all");
  const [category, setCategory] = useState<string>("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return resources.filter((resource) => {
      if (type !== "all" && resource.type !== type) return false;
      if (category !== "all" && resource.category !== category) return false;
      if (q.length === 0) return true;
      return [resource.title, resource.description, resource.author, ...resource.tags]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [type, category, query]);

  const reset = () => {
    setType("all");
    setCategory("all");
    setQuery("");
  };

  return (
    <>
      <PageHero
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Resources" }]}
        eyebrow="Resource library"
        title="Community knowledge, written down and kept."
        description="Everything the community produces — session material, guides, research notes and templates — is published here so it stays usable after the event ends."
      />

      <section className="section-y border-t border-hairline">
        <div className="container-page">
          <SectionHeader eyebrow="Library" title="Search the library" />

          <div className="mt-8 space-y-5">
            <label className="sr-only" htmlFor="resource-search">
              Search resources
            </label>
            <Input
              id="resource-search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by title, topic, author or tag"
              className="h-12 max-w-md rounded-full bg-card px-5"
            />

            <div role="group" aria-label="Filter by type" className="flex flex-wrap gap-2">
              {["all", ...resourceTypes].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setType(item)}
                  aria-pressed={type === item}
                  className={cn(
                    "min-h-9 rounded-full border px-3.5 font-display text-xs font-bold tracking-[0.04em] transition-colors",
                    type === item
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-hairline bg-card text-muted-foreground hover:text-foreground",
                  )}
                >
                  {item === "all" ? "All types" : item}
                </button>
              ))}
            </div>

            <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2">
              {["all", ...resourceCategories].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setCategory(item)}
                  aria-pressed={category === item}
                  className={cn(
                    "min-h-9 rounded-full border px-3.5 font-display text-xs font-bold tracking-[0.04em] transition-colors",
                    category === item
                      ? "border-navy bg-navy text-primary-foreground"
                      : "border-hairline bg-card text-muted-foreground hover:text-foreground",
                  )}
                >
                  {item === "all" ? "All categories" : item}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-7 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground" aria-live="polite">
              Showing {filtered.length} of {resources.length} resources
            </p>
            <Button variant="ghost" size="sm" className="rounded-full" onClick={reset}>
              Reset filters
            </Button>
          </div>

          {filtered.length > 0 ? (
            <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((resource) => (
                <ResourceCard key={resource.slug} resource={resource} />
              ))}
            </div>
          ) : (
            <div className="mt-8">
              <EmptyState
                title="Nothing matches that search"
                description="Try a broader term or clear the filters. New material is added after every program and event."
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
        title="Contribute to the library"
        description="Members can publish guides, write-ups, research notes and templates under their own name."
        primary={{ label: "Become a Contributor", to: "/community" }}
        secondary={{ label: "Read the Blog", to: "/blog" }}
      />
    </>
  );
}
