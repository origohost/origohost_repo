import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

import { BlogCard } from "@/components/ui-kit/cards";
import { Breadcrumbs, EmptyState, SectionHeader, Tag } from "@/components/ui-kit/primitives";
import { Button } from "@/components/ui/button";
import { blogPosts, getPostBySlug } from "@/content/blog";
import type { BlogPost } from "@/content/types";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPostBySlug(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Article unavailable — OrigoHOST" }, { name: "robots", content: "noindex" }],
      };
    }
    const { post } = loaderData;
    return {
      meta: [
        { title: `${post.title} — OrigoHOST` },
        { name: "description", content: post.excerpt },
        { property: "og:title", content: post.title },
        { property: "og:description", content: post.excerpt },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/blog/${post.slug}` },
      ],
      links: [{ rel: "canonical", href: `/blog/${post.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.excerpt,
            datePublished: post.date,
            author: { "@type": "Person", name: post.author },
            publisher: { "@type": "Organization", name: "OrigoHOST" },
          }),
        },
      ],
    };
  },
  component: BlogPostPage,
  notFoundComponent: PostNotFound,
});

function PostNotFound() {
  return (
    <div className="container-page py-40">
      <EmptyState
        title="This article could not be found"
        description="It may have been renamed or unpublished. Browse the blog index to find current writing."
        action={
          <Button asChild className="rounded-full">
            <Link to="/blog">Back to the blog</Link>
          </Button>
        }
      />
    </div>
  );
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function BlogPostPage() {
  const { post } = Route.useLoaderData() as { post: BlogPost };
  const related = blogPosts
    .filter((item) => item.slug !== post.slug && item.category === post.category)
    .slice(0, 3);
  const fallback = blogPosts.filter((item) => item.slug !== post.slug).slice(0, 3);
  const relatedPosts = related.length > 0 ? related : fallback;

  return (
    <>
      <article>
        <header className="relative overflow-hidden bg-mesh-light pt-28 md:pt-36">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-grid-faint opacity-40" />
          <div className="container-page relative pb-14">
            <Breadcrumbs
              items={[{ label: "Home", to: "/" }, { label: "Blog", to: "/blog" }, { label: post.title }]}
            />
            <div className="mt-6">
              <Tag tone="brand">{post.category}</Tag>
            </div>
            <h1 className="mt-5 max-w-3xl text-balance font-display text-3xl font-extrabold tracking-tight text-navy md:text-[2.75rem] md:leading-[1.1]">
              {post.title}
            </h1>
            <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
              {post.excerpt}
            </p>
            <p className="mt-6 text-sm text-muted-foreground">
              <span className="font-medium text-foreground">{post.author}</span> · {post.authorRole} ·{" "}
              {formatDate(post.date)} · {post.readingTime} read
            </p>
          </div>
        </header>

        <div className="section-y border-t border-hairline">
          <div className="container-page">
            <div className="mx-auto max-w-2xl space-y-6">
              {post.body.map((paragraph) => (
                <p key={paragraph.slice(0, 40)} className="text-[1.0625rem] leading-[1.8] text-foreground">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mx-auto mt-12 max-w-2xl border-t border-hairline pt-6">
              <ul className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <li key={tag}>
                    <Tag>#{tag}</Tag>
                  </li>
                ))}
              </ul>
              <Button asChild variant="outline" className="mt-6 rounded-full">
                <Link to="/blog">
                  <ArrowLeft aria-hidden="true" className="size-4" />
                  All articles
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </article>

      <section className="section-y border-t border-hairline bg-surface">
        <div className="container-page">
          <SectionHeader eyebrow="Keep reading" title="Related articles" />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {relatedPosts.map((item) => (
              <BlogCard key={item.slug} post={item} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
