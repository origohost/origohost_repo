import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminMarketingEmailTemplatesPage from "@/frontend/pages/admin/marketing/email-templates";

export const Route = createFileRoute("/admin/marketing/email-templates")({
  head: () =>
    buildSeo({
      title: "Admin — Email Templates",
      description: "Manage Email Templates",
      path: "/admin/marketing/email-templates",
      noindex: true,
    }),
  component: AdminMarketingEmailTemplatesPage,
});
