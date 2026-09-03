import { getRouteApi } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { PageShell } from "@/components/layout/page-shell";
import { Button } from "@/components/ui/button";
import { Loader2, ShieldCheck } from "lucide-react";
import { buildSeo } from "@/lib/seo";
import { toast } from "sonner";
import { queryKeys } from "@/lib/query-keys";
import { format } from "date-fns";

const routeApi = getRouteApi("/certificates/$certificateId");

export default function CertificatePage() {
  const { certificateId } = routeApi.useParams();

  const { data: cert, isLoading } = useQuery({
    queryKey: queryKeys.certificates.detail(certificateId),
    queryFn: async () => {
      const { data, error } = await supabase
        .from("certificates")
        .select("*")
        .eq("id", certificateId)
        .single();
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <PageShell title="Loading..." description="">
        <div className="flex h-64 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-[var(--brand-orange)]" />
        </div>
      </PageShell>
    );
  }

  if (!cert) {
    return (
      <PageShell
        title="Certificate Not Found"
        description="This certificate is invalid or has been removed."
      >
        <div className="flex h-64 items-center justify-center text-[var(--brand-ink)]/60">
          No certificate found for this ID.
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell
      title="Verified Certificate"
      description="This is an official, verifiable credential issued by OrigoHOST."
      breadcrumb={[{ label: "Certificates" }, { label: cert.id }]}
    >
      <div className="mx-auto max-w-4xl py-12">
        <div className="relative overflow-hidden rounded-3xl border-8 border-[var(--brand-ink)] bg-[var(--brand-cream)] p-12 text-center shadow-2xl">
          <div className="absolute -left-32 -top-32 h-64 w-64 rounded-full bg-[var(--brand-orange)]/10 blur-3xl" />
          <div className="absolute -bottom-32 -right-32 h-64 w-64 rounded-full bg-[var(--brand-green)]/10 blur-3xl" />

          <div className="relative z-10">
            <ShieldCheck className="mx-auto h-16 w-16 text-[var(--brand-green)]" />

            <h1 className="mt-8 font-serif text-5xl font-black uppercase tracking-widest text-[var(--brand-ink)]">
              Certificate of Completion
            </h1>

            <p className="mt-8 text-lg font-medium text-[var(--brand-ink)]/70 uppercase tracking-widest">
              This is proudly presented to
            </p>

            <h2 className="mt-4 font-serif text-6xl font-bold text-[var(--brand-orange)]">
              {cert.recipient_name}
            </h2>

            <p className="mx-auto mt-8 max-w-xl text-xl text-[var(--brand-ink)]/80">
              For successfully completing the <span className="font-bold">{cert.event_name}</span>{" "}
              program and demonstrating excellence in the coursework.
            </p>

            <div className="mt-16 flex justify-between border-t border-[var(--brand-ink)]/10 pt-8 px-12">
              <div className="text-left">
                <p className="text-sm font-bold text-[var(--brand-ink)]">Date Issued</p>
                <p className="font-mono text-sm text-[var(--brand-ink)]/70">
                  {format(new Date(cert.issue_date || cert.created_at), "MMMM do, yyyy")}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-[var(--brand-ink)]">Credential ID</p>
                <p className="font-mono text-sm text-[var(--brand-ink)]/70">
                  {cert.id.split("-")[0]}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center flex justify-center gap-4">
          <Button
            size="lg"
            className="rounded-full bg-[var(--brand-ink)] px-8 text-white hover:bg-[var(--brand-ink)]/90"
            onClick={() => window.print()}
          >
            Download / Print
          </Button>
        </div>
      </div>
    </PageShell>
  );
}
