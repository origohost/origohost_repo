import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import { buildWebPageSchema, buildFAQSchema } from "@/lib/structured-data";
import { SITE_CONFIG } from "@/config/site";
import AboutFaqPage from "@/frontend/pages/about/faq";

const BRAND_FAQS = [
  {
    question: "What is OrigoHOST?",
    answer:
      "OrigoHOST is a highly integrated technology ecosystem providing enterprise cloud infrastructure, AI models, and technical education through the OrigoHOST Developer Community.",
  },
  {
    question: "Is OrigoHOST a developer community?",
    answer:
      "Yes, the OrigoHOST Community is our flagship developer network connecting thousands of engineers globally, operating as a sub-organization of the main OrigoHOST technology entity.",
  },
  {
    question: "Who founded OrigoHOST?",
    answer:
      "OrigoHOST was founded by technology entrepreneur Ritik Kumar (Founder & Community Director).",
  },
  {
    question: "What is Origo Host?",
    answer:
      "Origo Host is a common natural variation and search term used to refer to the official OrigoHOST brand.",
  },
  {
    question: "Is Origo Host and OrigoHOST the same?",
    answer:
      "Yes, Origo Host and OrigoHOST are the exact same entity. OrigoHOST is simply the official, stylized brand name.",
  },
  {
    question: "What is origohost.in?",
    answer: "origohost.in is the official domain name and digital home of the OrigoHOST ecosystem.",
  },
];

export const Route = createFileRoute("/about_/faq")({
  head: () => {
    return buildSeo({
      title: "Brand FAQ | OrigoHOST",
      description:
        "Frequently asked questions regarding the OrigoHOST brand, community, and ecosystem.",
      path: "/about/faq",
      schemas: [
        buildWebPageSchema(
          "OrigoHOST Brand FAQ",
          "Frequently asked questions about the OrigoHOST entity.",
          `${SITE_CONFIG.url}/about/faq`,
        ),
        buildFAQSchema(BRAND_FAQS),
      ],
    });
  },
  component: AboutFaqPage,
});
