import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";

import { BlogCard } from "@/components/ui-kit/cards";
import { CtaSection, EmptyState, PageHero, SectionHeader } from "@/components/ui-kit/primitives";
import { Button } from "@/components/ui/button";
import type { BlogPost } from "@/content/types";
import { listPublicPosts } from "@/lib/public-content.functions";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Blog & Insights — OrigoHOST" },
      {
        name: "description",
        content:
          "Editorial, technical write-ups, community updates and program reports from the OrigoHOST technology community.",
      },
      { property: "og:title", content: "OrigoHOST Blog & Insights" },
      {
        property: "og:description",
        content:
          "Long-form writing from the OrigoHOST community: engineering practice, learning in public, program reports and announcements.",
      },
      { property: "og:url", content: "/blog" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  loader: () => listPublicPosts(),
  component: BlogIndexPage,
  errorComponent: BlogUnavailable,
});

function BlogUnavailable() {
  return (
    <div className="container-page py-40">
      <EmptyState
        title="Articles could not be loaded"
        description="Something went wrong while loading the blog. Please refresh the page or try again shortly."
      />
    </div>
  );
}

function BlogIndexPage() {
  const blogPosts = Route.useLoaderData() as BlogPost[];
  const [category, setCategory] = useState("all");

  const blogCategories = useMemo(
    () => [...new Set(blogPosts.map((post) => post.category))].sort(),
    [blogPosts],
  );
  const sorted = useMemo(
    () => [...blogPosts].sort((a, b) => (a.date < b.date ? 1 : -1)),
    [blogPosts],
  );
  const filtered = useMemo(
    () => (category === "all" ? sorted : sorted.filter((post) => post.category === category)),
    [category, sorted],
  );

  return (
    <>
      <PageHero
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Blog" }]}
        eyebrow="Blog & insights"
        title="Writing that holds up a week later."
        description="Editorial positions, technical practice and program reporting from the people running and building inside OrigoHOST."
      />

      <section className="section-y border-t border-hairline">
        <div className="container-page">
          <SectionHeader eyebrow="Latest" title="All articles" />

          <div role="group" aria-label="Filter by category" className="mt-8 flex flex-wrap gap-2">
            {["all", ...blogCategories].map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                aria-pressed={category === item}
                className={cn(
                  "min-h-9 rounded-full border px-3.5 font-display text-xs font-bold tracking-[0.04em] transition-colors",
                  category === item
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-hairline bg-card text-muted-foreground hover:text-foreground",
                )}
              >
                {item === "all" ? "All categories" : item}
              </button>
            ))}
          </div>

          <p className="mt-6 text-sm text-muted-foreground" aria-live="polite">
            Showing {filtered.length} of {blogPosts.length} articles
          </p>

          {filtered.length > 0 ? (
            <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <div className="mt-8">
              <EmptyState
                title="No articles in this category yet"
                description="Pick another category — new pieces are published alongside each program cycle."
                action={
                  <Button variant="outline" className="rounded-full" onClick={() => setCategory("all")}>
                    Show all articles
                  </Button>
                }
              />
            </div>
          )}
        </div>
      </section>

      <CtaSection
        title="Write with us"
        description="Members can publish technical write-ups and community pieces under their own byline, with editorial support."
        primary={{ label: "Become a Contributor", to: "/community" }}
        secondary={{ label: "Browse Resources", to: "/resources" }}
      />
    </>
  );
}
