import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminRecruitmentAnalyticsPage from "@/frontend/pages/admin/recruitment/analytics";

export const Route = createFileRoute("/admin/recruitment/analytics")({
  head: () =>
    buildSeo({
      title: "Admin — Analytics",
      description: "Manage Analytics",
      path: "/admin/recruitment/analytics",
      noindex: true,
    }),
  component: AdminRecruitmentAnalyticsPage,
});
