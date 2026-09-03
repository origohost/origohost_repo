import { SITE_CONFIG } from "@/config/site";
import { getRouteApi, useNavigate } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { PageShell } from "@/components/layout/page-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { buildSeo } from "@/lib/seo";
import { buildJobPostingSchema, buildWebPageSchema } from "@/lib/structured-data";
import {
  Loader2,
  Building,
  MapPin,
  Clock,
  Briefcase,
  FileText,
  Upload,
  ArrowLeft,
  Building2,
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useState } from "react";

import { queryKeys } from "@/lib/query-keys";

const routeApi = getRouteApi("/jobs/$jobId");

export default function JobDetailsPage() {
  const { jobId } = routeApi.useParams();
  const { job: initialJob } = routeApi.useLoaderData();
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [portfolioUrl, setPortfolioUrl] = useState("");

  const { data: job, isLoading } = useQuery({
    queryKey: queryKeys.jobs.detail(jobId),
    initialData: initialJob,
    queryFn: async () => {
      const { data, error } = await supabase.from("jobs").select("*").eq("id", jobId).single();
      if (error) throw error;
      return data;
    },
  });

  const { data: application, isLoading: isAppLoading } = useQuery({
    queryKey: [...queryKeys.jobs.detail(jobId), "application", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("job_applications")
        .select("*")
        .eq("job_id", jobId)
        .eq("user_id", user!.id)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  const applyMutation = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error("Must be logged in to apply.");
      const { error } = await supabase.from("job_applications").insert({
        job_id: jobId,
        user_id: user.id,
        status: "pending",
        portfolio_url: portfolioUrl,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Successfully applied for this role!");
      queryClient.invalidateQueries({
        queryKey: [...queryKeys.jobs.detail(jobId), "application", user?.id],
      });
    },
    onError: (err: unknown) => {
      const message = err instanceof Error ? err.message : "Failed to apply.";
      toast.error(message);
    },
  });

  if (isLoading) {
    return (
      <PageShell title="Loading..." description="">
        <div className="flex h-64 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-[var(--brand-green)]" />
        </div>
      </PageShell>
    );
  }

  if (!job) {
    return (
      <PageShell title="Job Not Found" description="The requested job does not exist.">
        <Button onClick={() => navigate({ to: "/" })} variant="outline" className="mt-6">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Jobs
        </Button>
      </PageShell>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "JobPosting",
            title: job.title,
            description: job.description,
            datePosted: job.created_at,
            employmentType:
              job.type === "full-time"
                ? "FULL_TIME"
                : job.type === "contract"
                  ? "CONTRACTOR"
                  : "INTERN",
            hiringOrganization: {
              "@type": "Organization",
              name: "OrigoHOST",
              sameAs: SITE_CONFIG.url,
            },
            jobLocation: {
              "@type": "Place",
              address: {
                "@type": "PostalAddress",
                addressLocality: job.location,
              },
            },
          }),
        }}
      />
      <PageShell
        title={job.title}
        description={`Join our ${job.department} team in ${job.location}`}
        breadcrumb={[{ label: "Jobs", to: "/" }, { label: job.title || job.role }]}
      >
        <article className="mx-auto max-w-3xl space-y-8 py-8">
          <div className="flex flex-col gap-6 rounded-3xl border border-[var(--brand-ink)]/10 bg-white p-6 shadow-sm sm:p-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-lg font-medium text-[var(--brand-ink)]/80">
                <Building2 className="h-5 w-5 text-[var(--brand-orange)]" />
                {job.company}
              </div>
              <address className="not-italic flex items-center gap-2 text-lg font-medium text-[var(--brand-ink)]/80">
                <MapPin className="h-5 w-5 text-[var(--brand-green)]" />
                {job.location}
              </address>
              <div className="flex items-center gap-2 text-lg font-medium text-[var(--brand-ink)]/80">
                <Briefcase className="h-5 w-5 text-[var(--brand-ink)]/50" />
                {job.type}
              </div>
            </div>

            <div className="mt-4 shrink-0 rounded-2xl bg-[var(--brand-cream)] p-6">
              {!user ? (
                <div className="text-center">
                  <p className="mb-4 text-sm text-[var(--brand-ink)]/60">
                    You must be logged in to apply.
                  </p>
                  <Button
                    size="lg"
                    onClick={() =>
                      navigate({ to: "/login", search: { redirect: window.location.pathname } })
                    }
                    className="w-full sm:w-auto"
                  >
                    Log in to Apply
                  </Button>
                </div>
              ) : isAppLoading ? (
                <Button size="lg" disabled className="w-full sm:w-auto">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Checking Application
                </Button>
              ) : application ? (
                <div className="text-center">
                  <Button
                    size="lg"
                    variant="outline"
                    disabled
                    className="w-full border-green-500 text-green-600 sm:w-auto opacity-100"
                  >
                    Application Submitted
                  </Button>
                  <p className="mt-2 text-xs text-[var(--brand-ink)]/50">
                    Current Status: {application.status}
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    applyMutation.mutate();
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label
                      htmlFor="portfolioUrl"
                      className="mb-1 block text-sm font-medium text-[var(--brand-ink)]"
                    >
                      Portfolio / LinkedIn URL (Optional)
                    </label>
                    <Input
                      id="portfolioUrl"
                      type="url"
                      value={portfolioUrl}
                      onChange={(e) => setPortfolioUrl(e.target.value)}
                      placeholder="https://linkedin.com/in/..."
                      className="bg-white"
                    />
                  </div>
                  <Button
                    size="lg"
                    type="submit"
                    disabled={applyMutation.isPending}
                    className="w-full bg-gradient-to-r from-[var(--brand-green)] to-[var(--brand-green-glow)] text-white shadow-lg shadow-green-500/20"
                  >
                    {applyMutation.isPending ? "Submitting..." : "Submit Application"}
                  </Button>
                </form>
              )}
            </div>
          </div>

          <div className="prose prose-lg max-w-none prose-headings:font-bold prose-a:text-[var(--brand-green)]">
            <h3>Job Description</h3>
            <p>{job.description}</p>

            {job.requirements && (
              <>
                <h3>Requirements</h3>
                <p>{job.requirements}</p>
              </>
            )}
          </div>
        </article>
      </PageShell>
    </div>
  );
}
