import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import HostSuccessPage from "@/frontend/pages/host/success";

export const Route = createFileRoute("/host/success")({
  head: () =>
    buildSeo({
      title: "Proposal Submitted",
      description: "Your event proposal has been successfully submitted.",
      path: "/host/success",
      noindex: true,
    }),
  component: HostSuccessPage,
});
