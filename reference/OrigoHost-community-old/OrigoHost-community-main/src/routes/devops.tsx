import { createFileRoute } from "@tanstack/react-router";
import { PillarPage } from "@/components/layout/pillar-page";
import { buildSeo } from "@/lib/seo";
import { buildArticleSchema } from "@/lib/structured-data";

export const Route = createFileRoute("/devops")({
  head: () =>
    buildSeo({
      title: "DevOps & CI/CD",
      description: "Automate your workflows with OrigoHOST CI/CD pipelines.",
      path: "/devops",
      schemas: [
        buildArticleSchema({
          title: "DevOps Automation",
          image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=1000",
          datePublished: "2024-10-01",
          authorName: "OrigoHOST Team",
        }),
      ],
    }),
  component: () => (
    <PillarPage
      title="DevOps & CI/CD"
      subtitle="Automate testing, integration, and deployment to ship software faster and more reliably."
      heroImage="https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=2000&auto=format&fit=crop"
      content={`
        <h2>Continuous Integration</h2>
        <p>Run your test suites automatically on every push. Catch bugs before they reach production.</p>
        
        <h2>Automated Deployments</h2>
        <p>Deploy directly to our Kubernetes clusters or VMs with zero-downtime rolling updates.</p>
        
        <h2>Infrastructure as Code (IaC)</h2>
        <p>Define your entire infrastructure using our official Terraform provider and CLI tools.</p>
      `}
      features={[
        { title: "Terraform Provider", desc: "Manage resources declaratively." },
        { title: "GitHub Actions", desc: "First-class integration with standard CI tools." },
        { title: "Container Registry", desc: "Private, secure image hosting." },
      ]}
    />
  ),
});
