import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminFinanceDonationsPage from "@/frontend/pages/admin/finance/donations";

export const Route = createFileRoute("/admin/finance/donations")({
  head: () =>
    buildSeo({
      title: "Admin — Donations",
      description: "Manage Donations",
      path: "/admin/finance/donations",
      noindex: true,
    }),
  component: AdminFinanceDonationsPage,
});
