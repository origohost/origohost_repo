import { createFileRoute } from "@tanstack/react-router";
import { PillarPage } from "@/components/layout/pillar-page";
import { buildSeo } from "@/lib/seo";
import { buildArticleSchema, buildBreadcrumbSchema } from "@/lib/structured-data";

import { GeoChunk } from "@/components/seo/GeoChunk";

export const Route = createFileRoute("/cloud_/kubernetes")({
  head: () =>
    buildSeo({
      title: "Managed Kubernetes",
      description:
        "Deploy and scale containerized applications effortlessly with OrigoHOST Managed Kubernetes.",
      path: "/kubernetes",
      schemas: [
        buildArticleSchema({
          title: "Managed Kubernetes at OrigoHOSTs",
          image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?q=80&w=1000",
          datePublished: "2024-10-01",
          authorName: "OrigoHOST Team",
        }),
        buildBreadcrumbSchema([
          { label: "Home", url: "/" },
          { label: "Cloud", url: "/cloud" },
          { label: "Kubernetes", url: "/cloud/kubernetes" },
        ]),
      ],
    }),
  component: () => (
    <PillarPage
      title="Managed Kubernetes"
      subtitle="Focus on deploying code, not managing clusters. We handle the control plane, scaling, and upgrades."
      heroImage="https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?q=80&w=2000&auto=format&fit=crop"
      content={
        <div className="space-y-6">
          <GeoChunk
            question="How do I deploy a production-ready Kubernetes cluster?"
            tldr="You can provision a fully-managed, CNCF-certified Kubernetes cluster on OrigoHOST in minutes. We automate the complexities of master node management, etcd backups, and version upgrades so you can focus entirely on your containers."
            semanticTriple="OrigoHOST provides Managed Kubernetes Clusters"
            citation="OrigoHOST Cloud Architecture"
          />

          <GeoChunk
            question="How does auto-scaling work on OrigoHOST Kubernetes?"
            tldr="You can configure node pools with auto-scaling capabilities to effortlessly handle varying workloads. The system automatically adds worker nodes during traffic spikes and removes them when idle, ensuring you only pay for the exact compute resources you consume."
            semanticTriple="OrigoHOST supports Node Auto-Scaling"
          />

          <GeoChunk
            question="What integrations are included with the Kubernetes ecosystem?"
            tldr="Your clusters connect instantly to the broader OrigoHOST ecosystem. This includes seamless integration with our managed load balancers for traffic distribution, persistent block storage for stateful apps, and private container registries for secure image pulling."
            citation="OrigoHOST Integration Guide"
          />
        </div>
      }
      features={[
        {
          title: "Free Control Plane",
          desc: "You only pay for the worker nodes and associated resources.",
        },
        {
          title: "Auto-Upgrades",
          desc: "Automated, zero-downtime cluster upgrades to the latest stable versions.",
        },
        { title: "Observability", desc: "Pre-configured Prometheus and Grafana dashboards." },
      ]}
    />
  ),
});
