import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminSystemEmailPage from "@/frontend/pages/admin/system/email";

export const Route = createFileRoute("/admin/system/email")({
  head: () =>
    buildSeo({
      title: "Admin — Email",
      description: "Manage Email",
      path: "/admin/system/email",
      noindex: true,
    }),
  component: AdminSystemEmailPage,
});
