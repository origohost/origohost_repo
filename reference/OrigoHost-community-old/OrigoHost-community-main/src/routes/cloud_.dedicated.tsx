import { createFileRoute } from "@tanstack/react-router";
import { PillarPage } from "@/components/layout/pillar-page";
import { buildSeo } from "@/lib/seo";
import { buildArticleSchema, buildBreadcrumbSchema } from "@/lib/structured-data";

export const Route = createFileRoute("/cloud_/dedicated")({
  head: () =>
    buildSeo({
      title: "Dedicated Servers & Bare Metal",
      description: "High-performance dedicated bare-metal servers for enterprise workloads.",
      path: "/cloud/dedicated",
      schemas: [
        buildArticleSchema({
          title: "Dedicated Servers & Bare Metal Infrastructure",
          image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1000",
          datePublished: "2024-10-01",
          authorName: "OrigoHOST Team",
        }),
        buildBreadcrumbSchema([
          { label: "Home", url: "/" },
          { label: "Cloud", url: "/cloud" },
          { label: "Dedicated", url: "/cloud/dedicated" },
        ]),
      ],
    }),
  component: () => (
    <PillarPage
      title="Dedicated Bare Metal Servers"
      subtitle="Uncompromised performance. Zero virtualization overhead. 100% dedicated hardware."
      heroImage="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2000&auto=format&fit=crop"
      content={`
        <h2>Why Bare Metal?</h2>
        <p>When virtualization overhead is not an option, our dedicated bare metal servers give you direct access to the underlying hardware. Perfect for high-frequency trading, massive databases, and AI training.</p>
        
        <h2>Global Network</h2>
        <p>Deployed on a 100Gbps redundant core network with advanced DDoS protection built-in.</p>
        
        <h2>Custom Configurations</h2>
        <p>Choose your CPU (AMD EPYC or Intel Xeon), RAM configuration, and storage tiers (NVMe, SSD, HDD) to match your exact workload.</p>
      `}
      features={[
        { title: "Zero Noisy Neighbors", desc: "100% of the hardware resources are yours." },
        { title: "Advanced DDoS Protection", desc: "Enterprise-grade mitigation up to 2Tbps." },
        { title: "IPMI Access", desc: "Full out-of-band management and KVM access." },
      ]}
    />
  ),
});
