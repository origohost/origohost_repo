import { createFileRoute } from "@tanstack/react-router";
import { ScheduleCallPage } from "@/frontend/pages/schedule-call";
import { buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/schedule-call")({
  head: () =>
    buildSeo({
      title: "Schedule a Call - OrigoHOST",
      description:
        "Schedule a call with the OrigoHOST team to discuss sponsorships, hosting, or other inquiries.",
      path: "/schedule-call",
    }),
  component: ScheduleCallPage,
});
