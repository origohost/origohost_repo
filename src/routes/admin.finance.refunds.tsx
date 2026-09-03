import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminFinanceRefundsPage from "@/frontend/pages/admin/finance/refunds";

export const Route = createFileRoute("/admin/finance/refunds")({
  head: () =>
    buildSeo({
      title: "Admin — Refunds",
      description: "Manage Refunds",
      path: "/admin/finance/refunds",
      noindex: true,
    }),
  component: AdminFinanceRefundsPage,
});
