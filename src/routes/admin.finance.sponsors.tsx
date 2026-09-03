import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminFinanceSponsorsPage from "@/frontend/pages/admin/finance/sponsors";

export const Route = createFileRoute("/admin/finance/sponsors")({
  head: () =>
    buildSeo({
      title: "Admin — Sponsors",
      description: "Manage Sponsors",
      path: "/admin/finance/sponsors",
      noindex: true,
    }),
  component: AdminFinanceSponsorsPage,
});
