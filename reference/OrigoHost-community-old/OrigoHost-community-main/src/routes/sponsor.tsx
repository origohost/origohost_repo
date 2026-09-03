import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import { buildOrganizationSchema, buildWebPageSchema } from "@/lib/structured-data";
import { SITE_CONFIG } from "@/config/site";
import SponsorPage from "@/frontend/pages/sponsor/index";

export const Route = createFileRoute("/sponsor")({
  head: () =>
    buildSeo({
      title: "Sponsor OrigoHOST Technology Community Events",
      description:
        "Partner with one of India's fastest-growing developer communities. Connect with thousands of students, developers, and tech leaders.",
      path: "/sponsor",
      image: "https://www.origohost.in/sponsor_hero.png",
      schemas: [
        buildOrganizationSchema(),
        buildWebPageSchema(
          "Sponsor OrigoHOST | Elevate Your Tech Brand",
          "Partner with India's fastest-growing developer community.",
          `${SITE_CONFIG.url}/sponsor`,
        ),
        {
          "@context": "https://schema.org",
          "@type": "Offer",
          name: "Sponsorship Packages",
          url: "https://www.origohost.in",
          logo: "https://www.origohost.in/logo.png",
          sameAs: ["https://twitter.com/origohost", "https://linkedin.com/company/origohost"],
        },
      ],
    }),
  component: SponsorPage,
  errorComponent: ({ error }) => (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-3xl shadow-xl max-w-lg w-full text-center border border-red-100">
        <h2 className="text-2xl font-black text-slate-800 mb-4">Temporarily Unavailable</h2>
        <p className="text-slate-600 mb-6">
          We're unable to load the sponsorship page right now. Please try again later or reach out
          directly at{" "}
          <a href="mailto:origohostscommunity@gmail.com" className="text-blue-600 hover:underline">
            origohostscommunity@gmail.com
          </a>
          .
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700"
        >
          Try Again
        </button>
      </div>
    </div>
  ),
});
