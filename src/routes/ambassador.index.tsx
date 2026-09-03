import { SITE_CONFIG } from "@/config/site";
import { createFileRoute } from "@tanstack/react-router";
import AmbassadorPage from "@/frontend/pages/ambassador/index";
import { buildSeo } from "@/lib/seo";
import { buildWebPageSchema } from "@/lib/structured-data";

export const Route = createFileRoute("/ambassador/")({
  head: () =>
    buildSeo({
      title: "Campus Ambassador Program — OrigoHOSTs",
      description:
        "Join the OrigoHOST Campus Ambassador program to lead communities, host events, and get exclusive rewards.",
      schemas: [
        buildWebPageSchema(
          "Campus Ambassador Program",
          "Join the OrigoHOST Campus Ambassador program.",
          `\${SITE_CONFIG.url}/ambassador`,
        ),
      ],
    }),
  component: AmbassadorPage,
});
