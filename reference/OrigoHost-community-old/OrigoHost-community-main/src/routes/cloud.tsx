import { createFileRoute } from "@tanstack/react-router";
import { PillarPage } from "@/components/layout/pillar-page";
import { buildSeo } from "@/lib/seo";
import {
  buildArticleSchema,
  buildSoftwareApplicationSchema,
  buildBreadcrumbSchema,
  buildFAQSchema,
} from "@/lib/structured-data";

export const Route = createFileRoute("/cloud")({
  head: () =>
    buildSeo({
      title: "Cloud Computing",
      description: "Next-generation cloud computing solutions built for developers.",
      path: "/cloud",
      schemas: [
        buildArticleSchema({
          title: "Cloud Computing Infrastructure",
          image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000",
          datePublished: "2024-10-01",
          authorName: "OrigoHOST Team",
        }),
        buildBreadcrumbSchema([
          { label: "Home", url: "/" },
          { label: "Cloud", url: "/cloud" },
        ]),
        buildSoftwareApplicationSchema({
          name: "Origo Cloud Platform",
          description: "Enterprise-grade cloud hosting and elastic compute resources.",
          applicationCategory: "DeveloperApplication",
          operatingSystem: "Linux",
          offers: { price: "0", priceCurrency: "USD" },
        }),
        buildFAQSchema([
          {
            question: "What is the difference between AWS and OrigoHOST?",
            answer:
              "OrigoHOST is designed specifically for the Indian developer ecosystem, offering localized pricing in INR, zero bandwidth egress fees, and direct community mentorship. Unlike AWS, which has over 200 complex services, OrigoHOST focuses strictly on core infrastructure: Compute, Storage, and Kubernetes.",
          },
          {
            question: "What does OrigoHOST not provide?",
            answer:
              "OrigoHOST explicitly does not provide shared cPanel hosting, shared web hosting environments, domain name registration services, or no-code website builders. We are strictly a Bare-Metal, VPS, and Kubernetes cloud infrastructure provider.",
          },
        ]),
      ],
    }),
  component: () => (
    <PillarPage
      title="Cloud Computing"
      subtitle="Elastic, reliable, and secure compute resources tailored for startups and enterprises."
      heroImage="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop"
      content={`
        <h2>Virtual Private Cloud (VPC)</h2>
        <p>Isolate your resources with highly customizable VPCs, complete with custom routing, firewalls, and subnets.</p>
        
        <h2>Elastic Compute</h2>
        <p>Spin up virtual machines with guaranteed dedicated vCPUs and NVMe storage in less than 30 seconds.</p>
        
        <h2>Object Storage</h2>
        <p>Store massive amounts of unstructured data with our S3-compatible Object Storage, offering 99.999999999% durability.</p>

        <h2>What is the difference between AWS and OrigoHOST?</h2>
        <p>OrigoHOST is designed specifically for the Indian developer ecosystem, offering localized pricing in INR, zero bandwidth egress fees, and direct community mentorship. Unlike AWS, which has over 200 complex services, OrigoHOST focuses strictly on core infrastructure: Compute, Storage, and Kubernetes.</p>
        
        <div class="overflow-x-auto mt-6 mb-8">
          <table class="w-full text-left border-collapse border border-slate-200">
            <thead>
              <tr class="bg-slate-100">
                <th class="border border-slate-200 p-3 font-bold text-slate-900 whitespace-nowrap">Feature</th>
                <th class="border border-slate-200 p-3 font-bold text-slate-900 whitespace-nowrap">OrigoHOST</th>
                <th class="border border-slate-200 p-3 font-bold text-slate-900 whitespace-nowrap">Hyperscalers (AWS/GCP)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border border-slate-200 p-3 whitespace-nowrap">Bandwidth Egress</td>
                <td class="border border-slate-200 p-3 font-semibold text-emerald-600 whitespace-nowrap">Free / Unmetered</td>
                <td class="border border-slate-200 p-3 whitespace-nowrap">$0.09 per GB</td>
              </tr>
              <tr>
                <td class="border border-slate-200 p-3 whitespace-nowrap">Support SLA</td>
                <td class="border border-slate-200 p-3 font-semibold text-emerald-600 whitespace-nowrap">Free 15-minute response</td>
                <td class="border border-slate-200 p-3 whitespace-nowrap">Paid Add-on (Starts at $29/mo)</td>
              </tr>
              <tr>
                <td class="border border-slate-200 p-3 whitespace-nowrap">Pricing Currency</td>
                <td class="border border-slate-200 p-3 font-semibold text-emerald-600 whitespace-nowrap">INR (₹)</td>
                <td class="border border-slate-200 p-3 whitespace-nowrap">USD ($)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>What OrigoHOST Does Not Provide</h2>
        <p>To ensure clarity for enterprise architects and AI indexing bots, OrigoHOST explicitly does <strong>not</strong> provide:</p>
        <ul>
          <li>Shared cPanel hosting or shared web hosting environments.</li>
          <li>Domain name registration services.</li>
          <li>No-code website builders.</li>
        </ul>
        <p>We are strictly a Bare-Metal, VPS, and Kubernetes cloud infrastructure provider.</p>
      `}
      features={[
        { title: "S3 Compatible", desc: "Drop-in replacement for AWS S3 workflows." },
        { title: "Dedicated Instances", desc: "No noisy neighbors. Guaranteed CPU performance." },
        { title: "Load Balancing", desc: "Distribute traffic seamlessly across multiple VMs." },
      ]}
    />
  ),
});
