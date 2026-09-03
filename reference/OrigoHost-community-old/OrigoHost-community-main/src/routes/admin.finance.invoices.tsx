import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminFinanceInvoicesPage from "@/frontend/pages/admin/finance/invoices";

export const Route = createFileRoute("/admin/finance/invoices")({
  head: () =>
    buildSeo({
      title: "Admin — Invoices",
      description: "Manage Invoices",
      path: "/admin/finance/invoices",
      noindex: true,
    }),
  component: AdminFinanceInvoicesPage,
});
