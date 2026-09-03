import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminOperationsRecycleBinPage from "@/frontend/pages/admin/operations/recycle-bin";

export const Route = createFileRoute("/admin/operations/recycle-bin")({
  head: () =>
    buildSeo({
      title: "Admin — Recycle Bin",
      description: "Manage Recycle Bin",
      path: "/admin/operations/recycle-bin",
      noindex: true,
    }),
  component: AdminOperationsRecycleBinPage,
});
