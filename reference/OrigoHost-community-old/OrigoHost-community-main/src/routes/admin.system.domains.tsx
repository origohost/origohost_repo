import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminSystemDomainsPage from "@/frontend/pages/admin/system/domains";

export const Route = createFileRoute("/admin/system/domains")({
  head: () =>
    buildSeo({
      title: "Admin — Domains",
      description: "Manage Domains",
      path: "/admin/system/domains",
      noindex: true,
    }),
  component: AdminSystemDomainsPage,
});
