import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminOperationsMentorsPage from "@/frontend/pages/admin/operations/mentors";

export const Route = createFileRoute("/admin/operations/mentors")({
  head: () =>
    buildSeo({
      title: "Admin — Mentors",
      description: "Manage Mentors",
      path: "/admin/operations/mentors",
      noindex: true,
    }),
  component: AdminOperationsMentorsPage,
});
