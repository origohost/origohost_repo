import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import { buildBreadcrumbSchema } from "@/lib/structured-data";
import { contentLoader } from "@/features/cms";
import EventsPage from "@/frontend/pages/event";
import { eventApi } from "@/modules/events/api/eventApi";

const content = contentLoader.getSync("events");

export const Route = createFileRoute("/community_/events/")({
  loader: async () => {
    try {
      const data = await eventApi.getEvents();
      // Filter out drafts unless admin
      const events = data.filter((e) => e.is_published);
      return { events, isError: false };
    } catch (error) {
      console.error("Failed to load events for SSR", error);
      return { events: [], isError: true };
    }
  },
  head: () =>
    buildSeo({
      title: content.meta.title,
      description: content.meta.description,
      path: "/community/events",
      schemas: [
        buildBreadcrumbSchema([
          { label: "Home", url: "/" },
          { label: "Community", url: "/community" },
          { label: "Events", url: "/community/events" },
        ]),
        ...content.events.map((e) => ({
          "@context": "https://schema.org",
          "@type": "Event",
          name: e.title,
          startDate: e.time || new Date().toISOString(),
          eventAttendanceMode:
            e.mode === "ONLINE"
              ? "https://schema.org/OnlineEventAttendanceMode"
              : "https://schema.org/OfflineEventAttendanceMode",
          eventStatus: "https://schema.org/EventScheduled",
          location: {
            "@type": "Place",
            name: e.city,
            address: {
              "@type": "PostalAddress",
              addressLocality: e.city,
            },
          },
          description: e.description || e.title,
        })),
      ],
    }),
  component: EventsPage,
});
