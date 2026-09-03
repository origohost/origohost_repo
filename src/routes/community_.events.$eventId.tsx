import { SITE_CONFIG } from "@/config/site";
import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import { buildEventSchema, buildWebPageSchema, buildBreadcrumbSchema } from "@/lib/structured-data";
import EventDetailsPage from "@/frontend/pages/event/detail";
import { eventApi } from "@/modules/events/api/eventApi";

export const Route = createFileRoute("/community_/events/$eventId")({
  loader: async ({ params }) => {
    // We are treating $eventId as the slug
    try {
      const event = await eventApi.getEventBySlug(params.eventId);
      if (!event) {
        throw new Error("Event not found");
      }
      return { event };
    } catch (e) {
      throw new Error("Event not found");
    }
  },
  head: ({ loaderData }) => {
    if (!loaderData?.event) return buildSeo({ title: "Event Not Found" });
    const { event } = loaderData;
    
    const bannerUrl = event.banner_url 
      ? `${SITE_CONFIG.url}${event.banner_url}` 
      : `${SITE_CONFIG.url}/default-banner.jpg`;
      
    return buildSeo({
      title: event.title,
      description: event.short_description || `Join us for ${event.title}`,
      path: `/community/events/${event.slug}`,
      image: bannerUrl,
      schemas: [
        buildWebPageSchema(
          event.title,
          event.short_description || "",
          `${SITE_CONFIG.url}/community/events/${event.slug}`,
        ),
        buildBreadcrumbSchema([
          { label: "Home", url: "/" },
          { label: "Community", url: "/community" },
          { label: "Events", url: "/community/events" },
          { label: event.title, url: `/community/events/${event.slug}` }
        ]),
        {
          "@context": "https://schema.org",
          "@type": "Event",
          "@id": `${SITE_CONFIG.url}/community/events/${event.slug}#event`,
          name: event.title,
          description: event.short_description,
          startDate: `${event.date}T${event.start_time}`,
          endDate: `${event.date}T${event.end_time}`,
          eventAttendanceMode: event.mode.toLowerCase() === "online" 
            ? "https://schema.org/OnlineEventAttendanceMode" 
            : "https://schema.org/OfflineEventAttendanceMode",
          eventStatus: event.status === "Past" ? "https://schema.org/EventCompleted" : "https://schema.org/EventScheduled",
          location: event.mode.toLowerCase() === "online" ? {
            "@type": "VirtualLocation",
            url: event.registration_link || `${SITE_CONFIG.url}/community/events/${event.slug}`
          } : {
            "@type": "Place",
            name: event.venue_name || "TBA",
            address: { "@type": "PostalAddress", addressLocality: event.venue_name || "TBA" }
          },
          image: [bannerUrl],
          organizer: {
            "@type": "Organization",
            name: "OrigoHOST",
            url: SITE_CONFIG.url
          },
          performer: event.speakers?.map(s => ({
            "@type": "Person",
            name: s.name,
            jobTitle: s.designation,
            worksFor: { "@type": "Organization", name: s.organization }
          }))
        }
      ],
    });
  },
  component: EventDetailsPage,
});
