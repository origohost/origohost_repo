import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminEventsSpeakersPage from "@/frontend/pages/admin/events/speakers";

export const Route = createFileRoute("/admin/events/speakers")({
  head: () =>
    buildSeo({
      title: "Admin — Speakers",
      description: "Manage Speakers",
      path: "/admin/events/speakers",
      noindex: true,
    }),
  component: AdminEventsSpeakersPage,
});
