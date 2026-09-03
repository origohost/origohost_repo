import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import BlogPage, { POSTS } from "@/frontend/pages/blog";

export const Route = createFileRoute("/blog")({
  head: () =>
    buildSeo({
      title: "Blog",
      description:
        "Essays, playbooks, and field notes from the OrigoHOST community on hosting, cloud, and platform engineering.",
      path: "/blog",
      schemas: [
        {
          "@context": "https://schema.org",
          "@type": "Blog",
          blogPost: POSTS.map((p) => ({
            "@type": "BlogPosting",
            headline: p.title,
            author: {
              "@type": "Person",
              name: p.author,
            },
          })),
        },
      ],
    }),
  component: BlogPage,
});
