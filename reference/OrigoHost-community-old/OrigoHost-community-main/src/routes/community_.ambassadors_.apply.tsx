import { createFileRoute } from "@tanstack/react-router";
import BecomeAmbassadorApplyPage from "@/frontend/pages/become-ambassador/apply";
import { buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/community_/ambassadors_/apply")({
  head: () =>
    buildSeo({
      title: "Apply - Campus Ambassador Program",
      description: "Submit your application to become an OrigoHOST Campus Ambassador.",
    }),
  component: BecomeAmbassadorApplyPage,
});
