import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminFinanceRevenuePage from "@/frontend/pages/admin/finance/revenue";

export const Route = createFileRoute("/admin/finance/revenue")({
  head: () =>
    buildSeo({
      title: "Admin — Revenue",
      description: "Manage Revenue",
      path: "/admin/finance/revenue",
      noindex: true,
    }),
  component: AdminFinanceRevenuePage,
});
