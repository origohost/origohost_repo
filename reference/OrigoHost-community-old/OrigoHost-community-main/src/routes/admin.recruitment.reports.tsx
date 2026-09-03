import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminRecruitmentReportsPage from "@/frontend/pages/admin/recruitment/reports";

export const Route = createFileRoute("/admin/recruitment/reports")({
  head: () =>
    buildSeo({
      title: "Admin — Reports",
      description: "Manage Reports",
      path: "/admin/recruitment/reports",
      noindex: true,
    }),
  component: AdminRecruitmentReportsPage,
});
