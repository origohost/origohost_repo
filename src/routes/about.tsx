import { SITE_CONFIG } from "@/config/site";
import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import {
  buildOrganizationSchema,
  buildLocalBusinessSchema,
  buildWebPageSchema,
  buildFAQSchema,
} from "@/lib/structured-data";
import { contentLoader } from "@/features/cms/loader";
import AboutPage from "@/frontend/pages/about";

const about = contentLoader.getSync("about");

const ABOUT_FAQS = [
  {
    question: "What is OrigoHOST?",
    answer:
      "OrigoHOST is an India-based technology community focused on helping students, developers, and professionals learn, build, collaborate, and grow through technical events, hackathons, workshops, and open-source initiatives.",
  },
  {
    question: "Who founded OrigoHOST?",
    answer:
      "OrigoHOST was founded by technology entrepreneur Ritik Kumar.",
  },
  {
    question: "What is the mission of OrigoHOST?",
    answer:
      "Our mission is to build the largest developer network in India, connecting builders with modern infrastructure through massive hackathons, technical workshops, and mentorship programs.",
  },
];

export const Route = createFileRoute("/about")({
  head: () =>
    buildSeo({
      title: about.meta.title,
      description: about.meta.description,
      path: "/about",
      schemas: [
        buildOrganizationSchema(),
        buildLocalBusinessSchema(),
        buildFAQSchema(ABOUT_FAQS),
        buildWebPageSchema(about.meta.title, about.meta.description, `${SITE_CONFIG.url}/about`),
      ],
    }),
  component: AboutPage,
});
