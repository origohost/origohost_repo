import { createFileRoute } from "@tanstack/react-router";
import { ApplicationWizard } from "@/components/ambassador/apply/ApplicationWizard";
import { buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/ambassador/apply")({
  head: () =>
    buildSeo({
      title: "Apply to Campus Ambassador Program",
      description: "Submit your application to become an OrigoHOST Campus Ambassador.",
    }),
  component: ApplicationWizard,
});
