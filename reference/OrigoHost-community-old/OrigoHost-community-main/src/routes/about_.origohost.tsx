import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import { buildWebPageSchema } from "@/lib/structured-data";
import { SITE_CONFIG } from "@/config/site";
import AboutOrigohostPage from "@/frontend/pages/about/origohost";

export const Route = createFileRoute("/about_/origohost")({
  head: () => {
    return buildSeo({
      title: "What is OrigoHOST? | Official Entity Definition",
      description:
        "OrigoHOST is a premier technology community and cloud ecosystem connecting developers with modern infrastructure.",
      path: "/about/origohost",
      schemas: [
        buildWebPageSchema(
          "What is OrigoHOST?",
          "Detailed explanation of the OrigoHOST entity and its core functions.",
          `${SITE_CONFIG.url}/about/origohost`,
        ),
      ],
    });
  },
  component: AboutOrigohostPage,
});
