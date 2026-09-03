import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminFinancePaymentsPage from "@/frontend/pages/admin/finance/payments";

export const Route = createFileRoute("/admin/finance/payments")({
  head: () =>
    buildSeo({
      title: "Admin — Payments",
      description: "Manage Payments",
      path: "/admin/finance/payments",
      noindex: true,
    }),
  component: AdminFinancePaymentsPage,
});
