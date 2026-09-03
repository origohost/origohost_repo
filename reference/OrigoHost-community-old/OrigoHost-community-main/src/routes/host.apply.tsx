import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import HostApplyPage from "@/frontend/pages/host/apply";

export const Route = createFileRoute("/host/apply")({
  head: () =>
    buildSeo({
      title: "Apply to Host an Event",
      description: "Submit your event proposal to partner with OrigoHOST.",
      path: "/host/apply",
      noindex: true, // Don't index the application form
    }),
  component: HostApplyPage,
});
