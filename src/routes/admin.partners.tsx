import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminPartnersPage from "@/frontend/pages/admin/partners";

export const Route = createFileRoute("/admin/partners")({
  head: () =>
    buildSeo({
      title: "Admin — Partners",
      description: "Manage platform partners and sponsors.",
      path: "/admin/partners",
      noindex: true,
    }),
  component: AdminPartnersPage,
});
