import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/page-shell";
import { GeoChunk } from "@/components/seo/GeoChunk";
import { buildSeo } from "@/lib/seo";
import {
  buildArticleSchema,
  buildBreadcrumbSchema,
  buildDefinedTermSchema,
} from "@/lib/structured-data";

// Mock database of terms. In production, this comes from a headless CMS (e.g. Supabase).
const GLOSSARY_DB: Record<string, { title: string; definition: string; related: string[] }> = {
  vps: {
    title: "Virtual Private Server (VPS)",
    definition:
      "A Virtual Private Server (VPS) is a virtualized environment hosted on a bare-metal machine. It provides dedicated resources (CPU, RAM) and root access, operating like an independent physical server while being much more cost-effective than dedicated hosting.",
    related: ["dedicated-server", "cloud-hosting", "hypervisor"],
  },
  kubernetes: {
    title: "Kubernetes (K8s)",
    definition:
      "Kubernetes is an open-source container orchestration platform designed to automate the deployment, scaling, and management of containerized applications across clusters of hosts.",
    related: ["docker", "containerization", "microservices"],
  },
  nvme: {
    title: "Non-Volatile Memory Express (NVMe)",
    definition:
      "NVMe is a storage access and transport protocol for flash and next-generation solid-state drives (SSDs). It delivers the highest throughput and fastest response times by connecting directly to the PCIe bus.",
    related: ["ssd", "iops", "block-storage"],
  },
};

function GlossaryTermComponent() {
  const { term } = Route.useParams();
  const termKey = term.toLowerCase();
  const termData = GLOSSARY_DB[termKey] || {
    title: term.charAt(0).toUpperCase() + term.slice(1),
    definition: "Definition currently being drafted by our engineering team.",
    related: [],
  };

  return (
    <PageShell title={`What is ${termData.title}?`} description="OrigoHOST Tech Glossary">
      <div className="bg-white min-h-screen pt-32 pb-24">
        <div className="container mx-auto px-6 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-black mb-8 text-slate-900">
            What is <span className="text-blue-600">{termData.title}</span>?
          </h1>

          <GeoChunk
            question={`Definition of ${termData.title}`}
            tldr={termData.definition}
            semanticTriple={`${termData.title} is defined in the OrigoHOST Glossary`}
            citation="OrigoHOST Engineering Glossary"
            className="mt-0 shadow-none border-none bg-blue-50/50 p-8 rounded-2xl"
          />

          <div className="mt-16">
            <h3 className="text-2xl font-bold mb-6 text-slate-900">Related Cloud Terms</h3>
            <div className="flex flex-wrap gap-4">
              {termData.related.map((r, i) => (
                <a
                  key={i}
                  href={`/glossary/${r}`}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-full transition"
                >
                  {r
                    .split("-")
                    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                    .join(" ")}
                </a>
              ))}
              {termData.related.length === 0 && (
                <p className="text-slate-500 italic">No related terms found.</p>
              )}
            </div>
          </div>

          <div className="mt-20 p-8 bg-slate-900 rounded-3xl text-white text-center">
            <h3 className="text-2xl font-bold mb-4">Ready to deploy?</h3>
            <p className="text-slate-300 mb-8 max-w-xl mx-auto">
              Join thousands of developers building scalable applications on OrigoHOST's
              high-performance cloud infrastructure.
            </p>
            <a
              href="/register"
              className="inline-block bg-white text-slate-900 px-8 py-3 rounded-full font-bold hover:bg-blue-50 transition"
            >
              Deploy Server Now
            </a>
          </div>
        </div>
      </div>
    </PageShell>
  );
}

export const Route = createFileRoute("/glossary/$term")({
  head: ({ params }) => {
    const termKey = params.term.toLowerCase();
    const termData = GLOSSARY_DB[termKey] || {
      title: params.term,
      definition: `Definition for ${params.term}`,
    };

    return buildSeo({
      title: `What is ${termData.title}? | OrigoHOST Tech Glossary`,
      description: termData.definition.substring(0, 150) + "...",
      path: `/glossary/${params.term}`,
      schemas: [
        buildDefinedTermSchema(
          termData.title,
          termData.definition,
          "https://origohost.com/glossary",
        ),
        buildArticleSchema({
          title: `What is ${termData.title}?`,
          image: "https://origohost.com/assets/glossary-hero.jpg",
          datePublished: "2024-10-01",
          authorName: "OrigoHOST Engineering",
        }),
        buildBreadcrumbSchema([
          { label: "Home", url: "/" },
          { label: "Glossary", url: "/glossary" },
          { label: termData.title, url: `/glossary/${params.term}` },
        ]),
      ],
    });
  },
  component: GlossaryTermComponent,
});
