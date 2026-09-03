import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminAuditPage from "@/frontend/pages/admin/audit";

export const Route = createFileRoute("/admin/audit")({
  head: () =>
    buildSeo({
      title: "Admin — Security Audit",
      description: "Platform security and audit logs.",
      path: "/admin/audit",
      noindex: true,
    }),
  component: AdminAuditPage,
});
