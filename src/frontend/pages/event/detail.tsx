import { getRouteApi, useNavigate } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { PageShell } from "@/components/layout/page-shell";
import { Loader2, ArrowLeft, CheckCircle2, Calendar } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { sanitizeHtml } from "@/lib/sanitize";
import { toast } from "sonner";
import { queryKeys } from "@/lib/query-keys";

// Components
import { EventHero } from "@/modules/events/components/EventHero";
import { EventAgenda } from "@/modules/events/components/EventAgenda";
import { EventSpeakers } from "@/modules/events/components/EventSpeakers";
import { EventGallery } from "@/modules/events/components/EventGallery";
import { AutoLinker } from "@/components/seo/AutoLinker";

const routeApi = getRouteApi("/community_/events/$eventId");

export default function EventDetailsPage() {
  const { event: initialEvent } = routeApi.useLoaderData();
  const { eventId: slug } = routeApi.useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: event, isLoading } = useQuery({
    queryKey: ["eventBySlug", slug],
    initialData: initialEvent, // Uses loader data directly to avoid flicker
    queryFn: async () => initialEvent,
  });

  const { data: registration, isLoading: isRegistrationLoading } = useQuery({
    queryKey: ["event_registration", event?.id, user?.id],
    enabled: !!user && !!event?.id,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("event_registrations_v2")
        .select("*")
        .eq("event_id", event!.id)
        .eq("user_id", user!.id)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  const rsvpMutation = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error("Must be logged in to RSVP.");

      // In a real application, you'd trigger a server route here to send the Resend Email automatically.
      const { error } = await supabase.from("event_registrations_v2").insert({
        event_id: event!.id,
        user_id: user.id,
        status: "confirmed",
      });

      if (error) {
        if (error.code === "23505") throw new Error("You are already registered.");
        throw error;
      }
    },
    onSuccess: () => {
      toast.success("Successfully registered for the event! Check your email.");
      queryClient.invalidateQueries({
        queryKey: ["event_registration", event?.id, user?.id],
      });
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to register.");
    },
  });

  if (isLoading || !event) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
      </div>
    );
  }

  const handleRegister = () => {
    if (!user) {
      toast.info("Please login to register for this event.");
      navigate({ to: "/login", search: { redirect: window.location.pathname } });
      return;
    }
    if (registration) {
      toast.info("You are already registered!");
      return;
    }
    rsvpMutation.mutate();
  };

  const handleExternalRegister = () => {
    if (event.registration_link) {
      window.open(event.registration_link, "_blank");
    }
  };

  const generateGoogleCalendarLink = () => {
    const start = new Date(`${event.date}T${event.start_time}`).toISOString().replace(/-|:|\.\d\d\d/g, "");
    let end = start;
    if (event.end_time) {
      end = new Date(`${event.date}T${event.end_time}`).toISOString().replace(/-|:|\.\d\d\d/g, "");
    }
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      event.title
    )}&dates=${start}/${end}&details=${encodeURIComponent(
      event.short_description || ""
    )}&location=${encodeURIComponent(event.venue_name || event.mode)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Dynamic SEO Head is handled in the Route definition */}

      {/* 1. HERO SECTION */}
      <EventHero event={event} onRegisterClick={event.registration_link ? handleExternalRegister : handleRegister} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Registration Floating Action Bar (Mobile Sticky Bottom / Desktop Sticky Top) */}
        <div className="flex flex-row items-center justify-between bg-white/95 border-t md:border border-gray-200 md:rounded-3xl p-4 md:p-6 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)] md:shadow-sm mb-0 md:mb-16 fixed bottom-[72px] left-0 right-0 md:relative md:bottom-auto md:sticky md:top-24 z-40 backdrop-blur-xl">
          <div>
            <h2 className="text-xl md:text-2xl font-black text-gray-900 mb-0 md:mb-1">
              {event.price === 0 ? "Free Entry" : `₹${event.price}`}
            </h2>
            <p className="hidden md:block text-gray-500 font-medium">
              {event.max_seats ? `Limited to ${event.max_seats} attendees` : "Open Registration"}
            </p>
          </div>

          <div className="mt-0 sm:mt-0 w-auto sm:w-auto">
            {isRegistrationLoading ? (
              <button
                disabled
                className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 bg-gray-200 text-gray-500 rounded-full font-bold flex items-center justify-center gap-2 text-sm md:text-base"
              >
                <Loader2 className="w-5 h-5 animate-spin" /> Verifying...
              </button>
            ) : registration ? (
              <button
                disabled
                className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 bg-green-100 text-green-700 border border-green-200 rounded-full font-bold flex items-center justify-center gap-2 text-sm md:text-base"
              >
                <CheckCircle2 className="w-5 h-5" /> Registered
              </button>
            ) : event.status === "Past" ? (
              <div className="flex gap-3">
                <button
                  disabled
                  className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 bg-green-100 text-green-700 border border-green-200 rounded-full font-bold flex items-center justify-center gap-2 text-sm md:text-base"
                >
                  <CheckCircle2 className="w-5 h-5" /> Event Completed
                </button>
                <button
                  onClick={() => window.scrollTo({ top: document.getElementById('details')?.offsetTop || 600, behavior: 'smooth' })}
                  className="hidden md:flex w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200 rounded-full font-bold items-center justify-center gap-2 text-sm md:text-base transition-colors"
                >
                  View Details
                </button>
              </div>
            ) : (
              <div className="flex gap-3">
                <button
                  onClick={event.registration_link ? handleExternalRegister : handleRegister}
                  disabled={rsvpMutation.isPending && !event.registration_link}
                  className="w-full sm:w-auto px-6 md:px-10 py-3 md:py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-black text-sm md:text-lg transition-colors shadow-lg shadow-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {rsvpMutation.isPending && !event.registration_link
                    ? "Registering..."
                    : event.registration_link 
                      ? "Register Now" 
                      : "Secure Your Spot"}
                </button>
                <button
                  onClick={generateGoogleCalendarLink}
                  className="hidden md:flex w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200 rounded-full font-bold items-center justify-center gap-2 text-sm md:text-base transition-colors"
                >
                  <Calendar className="w-5 h-5" /> Add to Calendar
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 2. ABOUT EVENT (Markdown) */}
        <div id="details" className="grid grid-cols-1 lg:grid-cols-3 gap-16 mb-16">
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-black text-gray-900 mb-8">About The Event</h2>
            <div className="prose prose-lg prose-blue max-w-none text-gray-600">
              {/* In production, use react-markdown here for long_description */}
              {event.long_description ? (
                <div
                  dangerouslySetInnerHTML={{
                    __html: sanitizeHtml(event.long_description.replace(/\n/g, "<br/>")),
                  }}
                />
              ) : (
                <p>
                  <AutoLinker>{event.short_description}</AutoLinker>
                </p>
              )}
            </div>
          </div>

          {/* Sidebar / Additional Info */}
          <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 h-fit">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Event Organizers</h3>
            <div className="space-y-6">
              {event.organizers && event.organizers.length > 0 ? (
                event.organizers.map((org: any) => (
                  <div key={org.id} className="flex items-center gap-4">
                    {org.logo_url ? (
                      <img
                        loading="lazy"
                        decoding="async"
                        src={org.logo_url}
                        alt={org.name}
                        className="w-12 h-12 rounded-xl object-cover border border-gray-200 bg-white"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xl">
                        {org.name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <h4 className="font-bold text-gray-900">{org.name}</h4>
                      <p className="text-sm font-medium text-gray-500">{org.role}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 font-medium">OrigoHOST Community</p>
              )}
            </div>
          </div>
        </div>

        {/* 3. SPEAKERS */}
        <EventSpeakers speakers={event.speakers || []} />

        {/* 4. AGENDA */}
        <EventAgenda agenda={event.agenda || []} />

        {/* 5. GALLERY */}
        <EventGallery gallery={event.gallery || []} />

        {/* FAQs */}
        {event.faqs && event.faqs.length > 0 && (
          <div className="py-12">
            <h2 className="text-3xl font-black text-gray-900 mb-8">Frequently Asked Questions</h2>
            <div className="space-y-4 max-w-3xl">
              {event.faqs?.map((faq: any, i: number) => (
                <div key={faq.id} className="bg-white border border-gray-200 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
