import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/page-shell";
import { buildSeo } from "@/lib/seo";
import { contentLoader } from "@/features/cms";
import { GalleryAlbumCard } from "@/features/cms/blocks";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { queryKeys } from "@/lib/query-keys";

const content = contentLoader.getSync("gallery");

export default function GalleryPage() {
  const { data: rawAlbums = [], isLoading } = useQuery({
    queryKey: queryKeys.gallery.albums,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("gallery_items")
        .select("*")
        .eq("published", true)
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return data || [];
    },
  });

  const displayAlbums = rawAlbums.length > 0 ? rawAlbums : content.albums;

  return (
    <PageShell
      eyebrow={content.meta.eyebrow ?? "Gallery"}
      title={
        <>
          Moments from the{" "}
          <span className="bg-gradient-to-r from-[var(--brand-orange)] to-[var(--brand-orange-glow)] bg-clip-text text-transparent">
            community
          </span>
        </>
      }
      description={content.meta.heroDescription ?? content.meta.description}
      breadcrumb={[{ label: "Gallery" }]}
    >
      <div className="mt-8">
        {isLoading ? (
          <div className="flex h-32 items-center justify-center text-sm font-medium text-[var(--brand-ink)]/60">
            Loading gallery...
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {displayAlbums.map((a: any, i: number) => (
              <GalleryAlbumCard key={a.id || i} album={a} index={i} />
            ))}
          </div>
        )}
      </div>
    </PageShell>
  );
}
