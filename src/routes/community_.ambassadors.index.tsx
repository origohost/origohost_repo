import { createFileRoute } from "@tanstack/react-router";
import BecomeAmbassadorPage from "@/frontend/pages/become-ambassador";

import { buildSeo } from "@/lib/seo";
import { buildBreadcrumbSchema } from "@/lib/structured-data";

export const Route = createFileRoute("/community_/ambassadors/")({
  head: () =>
    buildSeo({
      title: "Campus Ambassador Program",
      description:
        "Represent OrigoHOST at your university, gain leadership experience, and unlock exclusive career opportunities.",
      path: "/community/ambassadors",
      schemas: [
        buildBreadcrumbSchema([
          { label: "Home", url: "/" },
          { label: "Community", url: "/community" },
          { label: "Ambassadors", url: "/community/ambassadors" },
        ]),
      ],
    }),
  component: BecomeAmbassadorPage,
});
