import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminOperationsAuditLogsPage from "@/frontend/pages/admin/operations/audit-logs";

export const Route = createFileRoute("/admin/operations/audit-logs")({
  head: () =>
    buildSeo({
      title: "Admin — Audit Logs",
      description: "Manage Audit Logs",
      path: "/admin/operations/audit-logs",
      noindex: true,
    }),
  component: AdminOperationsAuditLogsPage,
});
