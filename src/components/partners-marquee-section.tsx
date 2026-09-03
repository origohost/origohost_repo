import { useState } from "react";
import { Rocket } from "lucide-react";
import { FadeIn, Marquee } from "@/components/motion/primitives";
import { cn } from "@/lib/utils";

const ROW_1 = [
  { name: "GitHub", domain: "github.com" },
  { name: "AWS", domain: "aws.amazon.com" },
  { name: "Intuit", domain: "intuit.com" },
  { name: "StackOverflow", domain: "stackoverflow.com" },
  { name: "Dell", domain: "dell.com" },
  { name: "HCLTech", domain: "hcltech.com" },
  { name: "Uber", domain: "uber.com" },
  { name: "Paytm", domain: "paytm.com" },
];

const ROW_2 = [
  { name: "Singapore Airlines", domain: "singaporeair.com" },
  { name: "IndiGo", domain: "goindigo.in" },
  { name: "Vistara", domain: "airvistara.com" },
  { name: "NASSCOM", domain: "nasscom.in" },
  { name: "MeitY", domain: "meity.gov.in" },
  { name: "NITI Aayog", domain: "niti.gov.in" },
  { name: "Digital India", domain: "digitalindia.gov.in" },
  { name: "Startup India", domain: "startupindia.gov.in" },
];

const ROW_3 = [
  { name: "Microsoft", domain: "microsoft.com" },
  { name: "Google", domain: "google.com" },
  { name: "Meta", domain: "meta.com" },
  { name: "Netflix", domain: "netflix.com" },
  { name: "NVIDIA", domain: "nvidia.com" },
  { name: "Amazon", domain: "amazon.com" },
  { name: "Sarvam", domain: "sarvam.ai" },
  { name: "Adobe", domain: "adobe.com" },
];

function TrustLogo({ company }: { company: { name: string; domain: string } }) {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <div className="flex h-20 min-w-[200px] items-center justify-center gap-3 px-8 transition-transform hover:scale-105 bg-white/50 rounded-2xl border border-[var(--brand-ink)]/5 shadow-sm mx-4">
      {!imgFailed && (
        <img
          src={`https://www.google.com/s2/favicons?domain=${company.domain}&sz=128`}
          alt={`${company.name} logo`}
          width={32}
          height={32}
          className="h-8 w-8 object-contain rounded-md"
          loading="lazy"
          decoding="async"
          onError={() => setImgFailed(true)}
        />
      )}
      <span className="font-bold text-xl text-[var(--brand-ink)]/70 tracking-tight">
        {company.name}
      </span>
    </div>
  );
}

export function PartnersMarqueeSection() {
  return (
    <section
      id="partners"
      data-testid="partners-marquee"
      className="bg-white py-16 overflow-hidden border-b border-[var(--brand-ink)]/5"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8 mb-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 id="partners-heading" className="text-sm font-bold tracking-widest text-gray-500 uppercase">
            Trusted & Loved By Tech Communities
          </h2>
        </div>
      </div>

      <div className="flex flex-col gap-12">
        <FadeIn delay={0.1}>
          <Marquee speed={35} ariaLabel="Industry partners row 1">
            {ROW_1.map((company) => (
              <TrustLogo key={company.name} company={company} />
            ))}
          </Marquee>
        </FadeIn>

        <FadeIn delay={0.2}>
          <Marquee speed={30} ariaLabel="Industry partners row 2" reverse>
            {ROW_2.map((company) => (
              <TrustLogo key={company.name} company={company} />
            ))}
          </Marquee>
        </FadeIn>

        <FadeIn delay={0.3}>
          <Marquee speed={40} ariaLabel="Industry partners row 3">
            {ROW_3.map((company) => (
              <TrustLogo key={company.name} company={company} />
            ))}
          </Marquee>
        </FadeIn>
      </div>
    </section>
  );
}
