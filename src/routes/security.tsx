import { SITE_CONFIG } from "@/config/site";
import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/layout/legal-page";
import { buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/security")({
  head: () =>
    buildSeo({
      title: "Security Policy",
      description: "How OrigoHOST secures your data and infrastructure.",
      path: "/security",
    }),
  component: () => (
    <LegalPage
      title="Security Policy"
      lastUpdated="October 2024"
      content={`
        <h2 id="tl-dr">Security Overview (TL;DR)</h2>
        <p><strong>OrigoHOST Security Posture:</strong> We encrypt all data at rest using AES-256 and in transit via TLS 1.3. We employ zero-trust network architecture, DDoS mitigation, and continuous vulnerability scanning. For critical security issues, contact \${SITE_CONFIG.emails.security}.</p>

        <h2>Infrastructure Security</h2>
        <p>OrigoHOST is built on top of enterprise-grade cloud providers. We utilize strict network isolation, encrypted VPCs, and automated DDoS mitigation to ensure maximum uptime.</p>
        
        <h2>Data Protection</h2>
        <p>All data at rest is encrypted using AES-256. Data in transit is secured using TLS 1.3.</p>
        
        <h2>Vulnerability Reporting</h2>
        <p>If you believe you have found a security vulnerability, please contact us immediately at \${SITE_CONFIG.emails.security}. We offer a bug bounty program for responsibly disclosed critical vulnerabilities.</p>
      `}
    />
  ),
});
