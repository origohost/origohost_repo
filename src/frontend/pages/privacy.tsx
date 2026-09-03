import { PageShell } from "@/components/layout/page-shell";
import { buildSeo } from "@/lib/seo";
import { contentLoader } from "@/features/cms";
import { LegalSectionList } from "@/features/cms/blocks";

const content = contentLoader.getSync("privacy");

export default function PrivacyPage() {
  return (
    <PageShell
      eyebrow={content.meta.eyebrow ?? "Legal"}
      title={content.meta.heroTitle ?? content.meta.title}
      description={`${content.meta.heroDescription ?? content.meta.description} · ${content.updated}.`}
      breadcrumb={[{ label: "Privacy" }]}
    >
      <LegalSectionList sections={content.sections} />
    </PageShell>
  );
}
