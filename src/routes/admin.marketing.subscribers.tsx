import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminMarketingSubscribersPage from "@/frontend/pages/admin/marketing/subscribers";

export const Route = createFileRoute("/admin/marketing/subscribers")({
  head: () =>
    buildSeo({
      title: "Admin — Subscribers",
      description: "Manage Subscribers",
      path: "/admin/marketing/subscribers",
      noindex: true,
    }),
  component: AdminMarketingSubscribersPage,
});
