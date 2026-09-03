import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminRecruitmentCompaniesPage from "@/frontend/pages/admin/recruitment/companies";

export const Route = createFileRoute("/admin/recruitment/companies")({
  head: () =>
    buildSeo({
      title: "Admin — Companies",
      description: "Manage Companies",
      path: "/admin/recruitment/companies",
      noindex: true,
    }),
  component: AdminRecruitmentCompaniesPage,
});
