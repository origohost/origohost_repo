import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminRecruitmentRejectedPage from "@/frontend/pages/admin/recruitment/rejected";

export const Route = createFileRoute("/admin/recruitment/rejected")({
  head: () =>
    buildSeo({
      title: "Admin — Rejected",
      description: "Manage Rejected",
      path: "/admin/recruitment/rejected",
      noindex: true,
    }),
  component: AdminRecruitmentRejectedPage,
});
