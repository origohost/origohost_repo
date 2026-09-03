import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminNewsletterPage from "@/frontend/pages/admin/newsletter";

export const Route = createFileRoute("/admin/newsletter")({
  head: () =>
    buildSeo({
      title: "Admin — Newsletter",
      description: "Manage subscribers and campaigns.",
      path: "/admin/newsletter",
      noindex: true,
    }),
  component: AdminNewsletterPage,
});
