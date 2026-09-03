import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminCertificatesPage from "@/frontend/pages/admin/certificates";

export const Route = createFileRoute("/admin/certificates")({
  head: () =>
    buildSeo({
      title: "Admin — Certificates",
      description: "Issue and manage platform certificates.",
      path: "/admin/certificates",
      noindex: true,
    }),
  component: AdminCertificatesPage,
});
