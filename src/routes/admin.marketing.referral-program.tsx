import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminMarketingReferralProgramPage from "@/frontend/pages/admin/marketing/referral-program";

export const Route = createFileRoute("/admin/marketing/referral-program")({
  head: () =>
    buildSeo({
      title: "Admin — Referral Program",
      description: "Manage Referral Program",
      path: "/admin/marketing/referral-program",
      noindex: true,
    }),
  component: AdminMarketingReferralProgramPage,
});
