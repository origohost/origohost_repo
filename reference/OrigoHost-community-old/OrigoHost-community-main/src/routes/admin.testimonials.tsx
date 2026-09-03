import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminTestimonialsPage from "@/frontend/pages/admin/testimonials";

export const Route = createFileRoute("/admin/testimonials")({
  head: () =>
    buildSeo({
      title: "Admin — Testimonials",
      description: "Manage testimonials and reviews.",
      path: "/admin/testimonials",
      noindex: true,
    }),
  component: AdminTestimonialsPage,
});
