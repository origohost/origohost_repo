import { Shield, Lock, Server, CheckCircle2 } from "lucide-react";
import { PageShell } from "@/components/layout/page-shell";

export default function TrustCenterPage() {
  return (
    <PageShell
      eyebrow="Security & Compliance"
      title="Trust Center"
      description="Security, compliance, and privacy are the foundation of everything we build. We are committed to maintaining the highest standards of data protection and reliability for our community and enterprise partners."
      breadcrumb={[{ label: "Trust Center" }]}
    >
      <div>
        {/* Main Content */}
        <section className="pt-8">
          <div className="mx-auto max-w-5xl">
            <div className="mb-12 rounded-3xl border border-[var(--brand-ink)]/5 bg-white p-8 shadow-[var(--shadow-soft)] sm:p-10">
              <h2 id="tl-dr" className="mb-3 text-2xl font-bold text-[var(--brand-ink)]">
                TL;DR: OrigoHOST Trust Posture
              </h2>
              <p className="text-lg font-medium leading-relaxed text-[var(--brand-ink)]/70">
                OrigoHOST guarantees 99.99% enterprise uptime, employs AES-256 encryption at rest,
                uses TLS 1.3 in transit, and is fully GDPR & DPDP Act compliant. We perform
                continuous vulnerability scanning and strict IAM auditing to protect all client
                data.
              </p>
            </div>

            <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-6 -mx-4 px-4 md:mx-0 md:px-0 md:pb-0 md:grid md:grid-cols-2 hide-scrollbar">
              {/* Security */}
              <div className="flex h-full w-[85vw] shrink-0 snap-center flex-col rounded-3xl border border-[var(--brand-ink)]/5 bg-white p-8 shadow-[var(--shadow-soft)] md:w-auto hover:shadow-[var(--shadow-elevated)] transition-shadow">
                <div className="mb-6 grid h-14 w-14 place-items-center rounded-2xl bg-[var(--brand-mint)]">
                  <Lock className="h-6 w-6 text-[var(--brand-green)]" />
                </div>
                <h2 className="mb-4 text-2xl font-bold text-[var(--brand-ink)]">Security First</h2>
                <p className="mb-6 flex-grow text-[var(--brand-ink)]/70">
                  Our infrastructure is designed with security as a core primitive. We employ
                  defense-in-depth strategies to protect your data at rest and in transit.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle2 className="mr-2 mt-0.5 h-5 w-5 shrink-0 text-[var(--brand-green)]" />
                    <span className="text-[var(--brand-ink)]/80">
                      End-to-end encryption for all data in transit
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="mr-2 mt-0.5 h-5 w-5 shrink-0 text-[var(--brand-green)]" />
                    <span className="text-[var(--brand-ink)]/80">
                      Strict Identity and Access Management (IAM)
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="mr-2 mt-0.5 h-5 w-5 shrink-0 text-[var(--brand-green)]" />
                    <span className="text-[var(--brand-ink)]/80">
                      Continuous vulnerability scanning
                    </span>
                  </li>
                </ul>
              </div>

              {/* Reliability */}
              <div className="flex h-full w-[85vw] shrink-0 snap-center flex-col rounded-3xl border border-[var(--brand-ink)]/5 bg-white p-8 shadow-[var(--shadow-soft)] md:w-auto hover:shadow-[var(--shadow-elevated)] transition-shadow">
                <div className="mb-6 grid h-14 w-14 place-items-center rounded-2xl bg-orange-100">
                  <Server className="h-6 w-6 text-[var(--brand-orange)]" />
                </div>
                <h2 className="mb-4 text-2xl font-bold text-[var(--brand-ink)]">
                  Enterprise Reliability
                </h2>
                <p className="mb-6 flex-grow text-[var(--brand-ink)]/70">
                  OrigoHOST is built for scale. Our globally distributed architecture ensures high
                  availability and resilience against failures.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle2 className="mr-2 mt-0.5 h-5 w-5 shrink-0 text-[var(--brand-orange)]" />
                    <span className="text-[var(--brand-ink)]/80">
                      99.99% Uptime SLA for Enterprise instances
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="mr-2 mt-0.5 h-5 w-5 shrink-0 text-[var(--brand-orange)]" />
                    <span className="text-[var(--brand-ink)]/80">
                      Multi-region redundancy and failover
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="mr-2 mt-0.5 h-5 w-5 shrink-0 text-[var(--brand-orange)]" />
                    <span className="text-[var(--brand-ink)]/80">
                      Automated daily backups and point-in-time recovery
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Compliance */}
            <div className="mt-16 rounded-3xl border border-[var(--brand-ink)]/5 bg-white p-8 shadow-[var(--shadow-soft)] sm:p-12">
              <h2 className="mb-6 text-3xl font-black text-[var(--brand-ink)]">
                Compliance & Privacy
              </h2>
              <p className="mb-8 max-w-3xl text-lg text-[var(--brand-ink)]/70">
                We respect your privacy and process data in accordance with global regulations. We
                do not sell your personal data.
              </p>
              <div className="flex flex-wrap gap-3">
                <div className="rounded-full bg-[var(--brand-cream)] px-5 py-2 font-bold tracking-wide text-[var(--brand-ink)]/80">
                  GDPR Compliant
                </div>
                <div className="rounded-full bg-[var(--brand-cream)] px-5 py-2 font-bold tracking-wide text-[var(--brand-ink)]/80">
                  DPDP Act Ready
                </div>
                <div className="rounded-full bg-[var(--brand-cream)] px-5 py-2 font-bold tracking-wide text-[var(--brand-ink)]/80">
                  SOC 2 Type II (Pending)
                </div>
              </div>

              <div className="mt-10 flex flex-wrap gap-6 border-t border-[var(--brand-ink)]/5 pt-8">
                <a
                  href="/privacy"
                  className="font-bold text-[var(--brand-orange)] transition-colors hover:text-[var(--brand-orange-glow)]"
                >
                  Read our Privacy Policy &rarr;
                </a>
                <a
                  href="/terms"
                  className="font-bold text-[var(--brand-orange)] transition-colors hover:text-[var(--brand-orange-glow)]"
                >
                  Read our Terms of Service &rarr;
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
