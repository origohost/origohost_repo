import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminFinanceSubscriptionsPage from "@/frontend/pages/admin/finance/subscriptions";

export const Route = createFileRoute("/admin/finance/subscriptions")({
  head: () =>
    buildSeo({
      title: "Admin — Subscriptions",
      description: "Manage Subscriptions",
      path: "/admin/finance/subscriptions",
      noindex: true,
    }),
  component: AdminFinanceSubscriptionsPage,
});
