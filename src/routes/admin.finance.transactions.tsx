import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminFinanceTransactionsPage from "@/frontend/pages/admin/finance/transactions";

export const Route = createFileRoute("/admin/finance/transactions")({
  head: () =>
    buildSeo({
      title: "Admin — Transactions",
      description: "Manage Transactions",
      path: "/admin/finance/transactions",
      noindex: true,
    }),
  component: AdminFinanceTransactionsPage,
});
