import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import { buildOrganizationSchema, buildWebPageSchema, buildBreadcrumbSchema } from "@/lib/structured-data";
import AboutPage from "@/frontend/pages/about";

export const Route = createFileRoute("/about")({
  head: () =>
    buildSeo({
      title: "About OrigoHOST — Technology Community & Event Ecosystem",
      description:
        "OrigoHOST brings together students, developers, engineers, researchers, founders, educators, and technology enthusiasts through events, learning experiences, competitions, and collaborative initiatives.",
      path: "/about",
      schemas: [
        buildWebPageSchema(
          "About OrigoHOST",
          "OrigoHOST brings together students, developers, engineers, researchers, founders, educators, and technology enthusiasts across India.",
          "https://www.origohost.in/about",
        ),
        buildBreadcrumbSchema([
          { label: "Home", url: "/" },
          { label: "About", url: "/about" },
        ]),
        buildOrganizationSchema(),
      ],
    }),
  component: AboutPage,
});
