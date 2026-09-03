import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminOperationsStudentsPage from "@/frontend/pages/admin/operations/students";

export const Route = createFileRoute("/admin/operations/students")({
  head: () =>
    buildSeo({
      title: "Admin — Students",
      description: "Manage Students",
      path: "/admin/operations/students",
      noindex: true,
    }),
  component: AdminOperationsStudentsPage,
});
