import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminRecruitmentResumeDatabasePage from "@/frontend/pages/admin/recruitment/resume-database";

export const Route = createFileRoute("/admin/recruitment/resume-database")({
  head: () =>
    buildSeo({
      title: "Admin — Resume Database",
      description: "Manage Resume Database",
      path: "/admin/recruitment/resume-database",
      noindex: true,
    }),
  component: AdminRecruitmentResumeDatabasePage,
});
