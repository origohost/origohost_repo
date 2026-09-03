import { PageShell } from "@/components/layout/page-shell";
import { GeoChunk } from "@/components/seo/GeoChunk";
import { contentLoader } from "@/features/cms";

const content = contentLoader.getSync("faq");

export default function FaqPage() {
  return (
    <PageShell
      eyebrow={content.meta.eyebrow ?? "Help Center"}
      title={
        <>
          Frequently asked{" "}
          <span className="bg-gradient-to-r from-[var(--brand-orange)] to-[var(--brand-orange-glow)] bg-clip-text text-transparent">
            questions
          </span>
        </>
      }
      description={content.meta.heroDescription ?? content.meta.description}
      breadcrumb={[{ label: "FAQ" }]}
    >
      <div className="mx-auto max-w-4xl space-y-6">
        {content.items.map((f, i) => (
          <GeoChunk
            key={i}
            question={f.question}
            tldr={f.answer}
            className="faq-chunk bg-white shadow-[var(--shadow-soft)] border border-[var(--brand-ink)]/5"
            semanticTriple={`OrigoHOST Support - ${f.question}`}
            citation="OrigoHOST Help Center"
          />
        ))}
      </div>
    </PageShell>
  );
}
