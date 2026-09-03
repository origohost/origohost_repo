import { PageShell } from "@/components/layout/page-shell";
import { buildSeo } from "@/lib/seo";
import { contentLoader } from "@/features/cms";
import { LegalSectionList } from "@/features/cms/blocks";

const content = contentLoader.getSync("refund");

export default function RefundPage() {
  return (
    <PageShell
      eyebrow={content.meta.eyebrow ?? "Legal"}
      title={content.meta.heroTitle ?? content.meta.title}
      description={`${content.meta.heroDescription ?? content.meta.description} · ${content.updated}.`}
      breadcrumb={[{ label: "Refund" }]}
    >
      <LegalSectionList sections={content.sections} />
    </PageShell>
  );
}
