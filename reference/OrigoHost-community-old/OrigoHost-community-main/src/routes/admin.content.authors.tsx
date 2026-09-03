import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminContentAuthorsPage from "@/frontend/pages/admin/content/authors";

export const Route = createFileRoute("/admin/content/authors")({
  head: () =>
    buildSeo({
      title: "Admin — Authors",
      description: "Manage Authors",
      path: "/admin/content/authors",
      noindex: true,
    }),
  component: AdminContentAuthorsPage,
});
