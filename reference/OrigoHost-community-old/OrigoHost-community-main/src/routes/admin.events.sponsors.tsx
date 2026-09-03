import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminEventsSponsorsPage from "@/frontend/pages/admin/events/sponsors";

export const Route = createFileRoute("/admin/events/sponsors")({
  head: () =>
    buildSeo({
      title: "Admin — Sponsors",
      description: "Manage Sponsors",
      path: "/admin/events/sponsors",
      noindex: true,
    }),
  component: AdminEventsSponsorsPage,
});
