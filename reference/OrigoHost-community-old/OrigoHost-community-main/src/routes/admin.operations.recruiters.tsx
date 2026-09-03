import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminOperationsRecruitersPage from "@/frontend/pages/admin/operations/recruiters";

export const Route = createFileRoute("/admin/operations/recruiters")({
  head: () =>
    buildSeo({
      title: "Admin — Recruiters",
      description: "Manage Recruiters",
      path: "/admin/operations/recruiters",
      noindex: true,
    }),
  component: AdminOperationsRecruitersPage,
});
