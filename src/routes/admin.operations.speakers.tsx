import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminOperationsSpeakersPage from "@/frontend/pages/admin/operations/speakers";

export const Route = createFileRoute("/admin/operations/speakers")({
  head: () =>
    buildSeo({
      title: "Admin — Speakers",
      description: "Manage Speakers",
      path: "/admin/operations/speakers",
      noindex: true,
    }),
  component: AdminOperationsSpeakersPage,
});
