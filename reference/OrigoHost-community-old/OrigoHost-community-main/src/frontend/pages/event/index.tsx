import { useMemo, useState } from "react";
import { Search, X, Filter } from "lucide-react";
import { PageShell } from "@/components/layout/page-shell";
import { Input } from "@/components/ui/input";
import { useDebouncedValue } from "@/hooks/use-debounced-value";
import type { EventV2 } from "@/modules/events/types";
import { EventCard } from "@/modules/events/components/EventCard";
import { getRouteApi } from "@tanstack/react-router";

const routeApi = getRouteApi("/community_/events/");

const STATUS_FILTERS = ["All", "Upcoming", "Live", "Past"];
const MODE_FILTERS = ["All", "Online", "Offline", "Hybrid"];

export default function EventsPage() {
  const { events: rawEvents, isError } = routeApi.useLoaderData();
  const events = (rawEvents || []) as EventV2[];

  const [query, setQuery] = useState("");
  const debouncedQuery = useDebouncedValue(query, 300);

  const [statusFilter, setStatusFilter] = useState("All");
  const [modeFilter, setModeFilter] = useState("All");

  const filteredEvents = useMemo(() => {
    let result = events;

    // Apply Search
    if (debouncedQuery) {
      const q = debouncedQuery.toLowerCase();
      result = result.filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          e.short_description.toLowerCase().includes(q) ||
          e.venue_name?.toLowerCase().includes(q),
      );
    }

    // Apply Status
    if (statusFilter !== "All") {
      result = result.filter((e) => e.status === statusFilter);
    }

    // Apply Mode
    if (modeFilter !== "All") {
      result = result.filter((e) => e.mode.toLowerCase() === modeFilter.toLowerCase());
    }

    // Apply Sorting: Upcoming/Live first (date ascending), Past second (date descending)
    result = [...result].sort((a, b) => {
      const aIsPast = a.status === "Past";
      const bIsPast = b.status === "Past";

      if (aIsPast && !bIsPast) return 1;
      if (!aIsPast && bIsPast) return -1;

      const timeA = new Date(`${a.date}T${a.start_time || "00:00"}`).getTime();
      const timeB = new Date(`${b.date}T${b.start_time || "00:00"}`).getTime();

      if (aIsPast) {
        // Both are past, sort descending
        return timeB - timeA;
      } else {
        // Both are upcoming/live, sort ascending
        return timeA - timeB;
      }
    });

    return result;
  }, [events, debouncedQuery, statusFilter, modeFilter]);

  const clearFilters = () => {
    setQuery("");
    setStatusFilter("All");
    setModeFilter("All");
  };

  const hasActiveFilters = debouncedQuery !== "" || statusFilter !== "All" || modeFilter !== "All";

  return (
    <PageShell
      eyebrow="OrigoHOST Events"
      title={
        <>
          Discover the Future of <br className="hidden sm:block" />
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Tech & Community
          </span>
        </>
      }
      description="Join our world-class events, hands-on workshops, and exclusive networking sessions. Experience learning like never before."
      breadcrumb={[{ label: "Events" }]}
    >
      {/* Filters & Search Bar */}
      <div className="bg-white/80 backdrop-blur-xl border border-gray-200 rounded-3xl p-6 shadow-xl shadow-gray-200/50 relative mb-12">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by event name, speaker, or location..."
              className="w-full h-14 pl-12 pr-12 rounded-2xl border-gray-200 bg-gray-50 focus:bg-white text-lg focus:ring-blue-500"
              aria-label="Search events"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-col sm:flex-row gap-4 sm:items-center mt-6 pt-6 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">
              Status
            </span>
          </div>
          <div className="flex overflow-x-auto hide-scrollbar gap-2 pb-2 sm:pb-0 sm:flex-wrap snap-x">
            {STATUS_FILTERS.map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`snap-center shrink-0 px-4 py-2 rounded-full text-sm font-bold transition-all ${
                  statusFilter === status
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          <div className="hidden sm:block w-px h-6 bg-gray-200 mx-2" />

          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">Mode</span>
          </div>
          <div className="flex overflow-x-auto hide-scrollbar gap-2 pb-2 sm:pb-0 sm:flex-wrap snap-x">
            {MODE_FILTERS.map((mode) => (
              <button
                key={mode}
                onClick={() => setModeFilter(mode)}
                className={`snap-center shrink-0 px-4 py-2 rounded-full text-sm font-bold transition-all ${
                  modeFilter === mode
                    ? "bg-gray-900 text-white shadow-md shadow-black/20"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {mode}
              </button>
            ))}
          </div>

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="ml-auto text-sm font-bold text-red-500 hover:text-red-600"
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* Events Grid */}
      <div className="mb-20">
        {isError ? (
          <div className="text-center py-32 bg-white rounded-3xl border border-dashed border-red-200">
            <h3 className="text-2xl font-black text-red-900 mb-2">
              Service Temporarily Unavailable
            </h3>
            <p className="text-gray-500 mb-6 max-w-sm mx-auto">
              We're having trouble connecting to our events database right now. Please check back
              later to discover upcoming hackathons, workshops, and exclusive networking sessions.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-white rounded-3xl border border-dashed border-gray-200">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-10 h-10 text-gray-300" />
            </div>
            <h3 className="text-2xl font-black text-gray-900 mb-2">No Scheduled Events</h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              We couldn't find any events matching your criteria. OrigoHOST regularly hosts premium
              developer meetups, coding workshops, and hackathons. Check back soon for exciting
              announcements!
            </p>
            {hasActiveFilters ? (
              <button
                onClick={clearFilters}
                className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors"
              >
                Clear All Filters
              </button>
            ) : (
              <a
                href="/blog"
                className="inline-block px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors"
              >
                Read Our Blog
              </a>
            )}
          </div>
        )}
      </div>
    </PageShell>
  );
}
