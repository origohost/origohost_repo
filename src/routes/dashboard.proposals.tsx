import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import DashboardProposalsPage from "@/frontend/pages/dashboard/proposals";

export const Route = createFileRoute("/dashboard/proposals")({
  head: () =>
    buildSeo({
      title: "My Proposals — OrigoHOST",
      description: "Track your event hosting proposals.",
      path: "/dashboard/proposals",
      noindex: true,
    }),
  component: DashboardProposalsPage,
});
