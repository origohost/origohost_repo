import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminRecruitmentApplicationsPage from "@/frontend/pages/admin/recruitment/applications";

export const Route = createFileRoute("/admin/recruitment/applications")({
  head: () =>
    buildSeo({
      title: "Admin — Applications",
      description: "Manage Applications",
      path: "/admin/recruitment/applications",
      noindex: true,
    }),
  component: AdminRecruitmentApplicationsPage,
});
