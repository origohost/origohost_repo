import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminFinanceReportsPage from "@/frontend/pages/admin/finance/reports";

export const Route = createFileRoute("/admin/finance/reports")({
  head: () =>
    buildSeo({
      title: "Admin — Reports",
      description: "Manage Reports",
      path: "/admin/finance/reports",
      noindex: true,
    }),
  component: AdminFinanceReportsPage,
});
