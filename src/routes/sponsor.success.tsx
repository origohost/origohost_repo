import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import SponsorSuccessPage from "@/frontend/pages/sponsor/success";

export const Route = createFileRoute("/sponsor/success")({
  head: () =>
    buildSeo({
      title: "Application Submitted - OrigoHOST Sponsor",
      description: "Thank you for applying to sponsor OrigoHOST. We will get back to you shortly.",
      path: "/sponsor/success",
    }),
  component: SponsorSuccessPage,
});
