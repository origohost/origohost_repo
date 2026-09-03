import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminSystemSmtpPage from "@/frontend/pages/admin/system/smtp";

export const Route = createFileRoute("/admin/system/smtp")({
  head: () =>
    buildSeo({
      title: "Admin — SMTP",
      description: "Manage SMTP",
      path: "/admin/system/smtp",
      noindex: true,
    }),
  component: AdminSystemSmtpPage,
});
