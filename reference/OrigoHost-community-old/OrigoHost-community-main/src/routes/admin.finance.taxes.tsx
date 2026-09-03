import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminFinanceTaxesPage from "@/frontend/pages/admin/finance/taxes";

export const Route = createFileRoute("/admin/finance/taxes")({
  head: () =>
    buildSeo({
      title: "Admin — Taxes",
      description: "Manage Taxes",
      path: "/admin/finance/taxes",
      noindex: true,
    }),
  component: AdminFinanceTaxesPage,
});
