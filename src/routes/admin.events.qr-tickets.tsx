import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminEventsQrTicketsPage from "@/frontend/pages/admin/events/qr-tickets";

export const Route = createFileRoute("/admin/events/qr-tickets")({
  head: () =>
    buildSeo({
      title: "Admin — QR Tickets",
      description: "Manage QR Tickets",
      path: "/admin/events/qr-tickets",
      noindex: true,
    }),
  component: AdminEventsQrTicketsPage,
});
