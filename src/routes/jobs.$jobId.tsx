import { SITE_CONFIG } from "@/config/site";
import { createFileRoute } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { buildSeo } from "@/lib/seo";
import { buildJobPostingSchema, buildWebPageSchema } from "@/lib/structured-data";
import JobDetailsPage from "@/frontend/pages/jobs/detail";

export const Route = createFileRoute("/jobs/$jobId")({
  loader: async ({ params }) => {
    const { data, error } = await supabase.from("jobs").select("*").eq("id", params.jobId).single();
    if (error || !data) {
      throw new Error("Job not found");
    }
    return { job: data };
  },
  head: ({ loaderData }) => {
    if (!loaderData?.job) return buildSeo({ title: "Job Not Found" });
    const { job } = loaderData;
    const title = job.title || job.role;
    return buildSeo({
      title: `${title} at ${job.company}`,
      description: `Join ${job.company} as a ${title} in ${job.location}.`,
      path: `/jobs/${job.id}`,
      schemas: [
        buildJobPostingSchema(job),
        buildWebPageSchema(
          `${title} at ${job.company}`,
          `Join ${job.company} as a ${title}.`,
          `\${SITE_CONFIG.url}/jobs/\${job.id}`,
        ),
      ],
    });
  },
  component: JobDetailsPage,
});
