import { createFileRoute, Link } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Calendar,
  Search,
  ArrowRight,
  MapPin,
  Clock,
  Users,
  Grid,
  List,
  CheckCircle2,
  Sparkles,
  Tag,
  Layers,
} from "lucide-react";
import { EventMode, EventStatus } from "@/modules/events/types";

export const Route = createFileRoute("/events")({
  head: () =>
    buildSeo({
      title: "Events — Technology Community & Event Ecosystem",
      description:
        "Explore tech events, hackathons, ideathons, meetups, seminars, workshops, and webinars across OrigoHOST's technology domains and real-world industries.",
      path: "/events",
    }),
  component: EventsPage,
});

const EVENT_FORMATS = [
  "All Formats",
  "Meetups",
  "Seminars",
  "Hackathons",
  "Ideathons",
  "Tech Marathons",
  "Webinars",
  "KSS",
  "Workshops",
  "Masterclasses",
  "Conferences",
  "Bootcamps",
  "Community Sessions",
];

const TECH_DOMAINS = [
  "All Domains",
  "Artificial Intelligence",
  "Cloud",
  "Cybersecurity",
  "Networking",
  "DevOps",
  "Software Engineering",
  "Data",
  "Robotics",
  "IoT",
  "Blockchain",
  "XR",
  "Open Source",
  "Emerging Technologies",
];

const INDUSTRIES = [
  "All Industries",
  "Agriculture",
  "Business",
  "Food Technology",
  "Healthcare",
  "Education",
  "Finance",
  "Manufacturing",
  "Media",
  "Environment",
  "Smart Cities",
  "Government",
  "Digital World",
];

const ALL_EVENTS = [
  {
    id: "ev-1",
    slug: "cyberforge-2026-hackathon",
    title: "CyberForge 2026 Hackathon",
    format: "Hackathons",
    domain: "Cybersecurity",
    industry: "Finance",
    date: "2026-09-21",
    formattedDate: "21 September 2026",
    time: "09:00 AM IST",
    mode: "hybrid" as EventMode,
    status: "Upcoming" as EventStatus,
    venue: "Delhi Tech Hub & Virtual",
    desc: "48-hour intensive buildathon creating secure cloud applications, threat scanners & smart contract audit bots.",
    price: 0,
    max_seats: 500,
    registeredCount: 342,
  },
  {
    id: "ev-2",
    slug: "ai-for-agriculture-ideathon",
    title: "AI for Agriculture Ideathon",
    format: "Ideathons",
    domain: "Artificial Intelligence",
    industry: "Agriculture",
    date: "2026-10-14",
    formattedDate: "14 October 2026",
    time: "10:00 AM IST",
    mode: "online" as EventMode,
    status: "Upcoming" as EventStatus,
    venue: "Online Webinar Engine",
    desc: "Turn agricultural challenges into smart AI, drone telemetry & crop yield analysis solutions with community mentors.",
    price: 0,
    max_seats: 300,
    registeredCount: 188,
  },
  {
    id: "ev-3",
    slug: "devops-kss-2026",
    title: "Knowledge Sharing Series 2026 — KSS2026",
    format: "KSS",
    domain: "DevOps",
    industry: "Digital World",
    date: "2026-09-07",
    formattedDate: "7 September 2026",
    time: "06:00 PM IST",
    mode: "online" as EventMode,
    status: "Live" as EventStatus,
    venue: "OrigoHOST Live Stream",
    desc: "Episode-based webinar series where tech practitioners share real-world Kubernetes & CI/CD engineering playbooks.",
    price: 0,
    max_seats: 1000,
    registeredCount: 820,
  },
  {
    id: "ev-4",
    slug: "fintech-blockchain-masterclass",
    title: "FinTech & Blockchain Security Masterclass",
    format: "Masterclasses",
    domain: "Blockchain",
    industry: "Finance",
    date: "2026-10-28",
    formattedDate: "28 October 2026",
    time: "02:00 PM IST",
    mode: "offline" as EventMode,
    status: "Upcoming" as EventStatus,
    venue: "NCR Engineering Campus",
    desc: "Deep-dive session led by senior financial technology engineers on EVM smart contract auditing and zero-knowledge proofs.",
    price: 499,
    max_seats: 150,
    registeredCount: 110,
  },
  {
    id: "ev-5",
    slug: "cloud-native-healthcare-workshop",
    title: "Cloud-Native Architecture in Healthcare",
    format: "Workshops",
    domain: "Cloud",
    industry: "Healthcare",
    date: "2026-11-05",
    formattedDate: "5 November 2026",
    time: "11:00 AM IST",
    mode: "hybrid" as EventMode,
    status: "Upcoming" as EventStatus,
    venue: "Bengaluru Innovation Hub",
    desc: "Hands-on lab deploying HIPAA-compliant cloud microservices using OpenTelemetry, Prometheus, and Grafana.",
    price: 0,
    max_seats: 250,
    registeredCount: 165,
  },
  {
    id: "ev-6",
    slug: "smart-cities-iot-meetup",
    title: "Smart Cities & IoT Developers Meetup",
    format: "Meetups",
    domain: "IoT",
    industry: "Smart Cities",
    date: "2026-08-12",
    formattedDate: "12 August 2026",
    time: "04:00 PM IST",
    mode: "offline" as EventMode,
    status: "Past" as EventStatus,
    venue: "Tech Park Auditorium",
    desc: "Community meetup showcasing urban sensor networks, LoRaWAN gateways, and edge computing for traffic management.",
    price: 0,
    max_seats: 200,
    registeredCount: 200,
  },
];

function EventsPage() {
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [selectedMode, setSelectedMode] = useState<string>("All");
  const [selectedFormat, setSelectedFormat] = useState("All Formats");
  const [selectedDomain, setSelectedDomain] = useState("All Domains");
  const [selectedIndustry, setSelectedIndustry] = useState("All Industries");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredEvents = useMemo(() => {
    return ALL_EVENTS.filter((ev) => {
      const matchesSearch =
        ev.title.toLowerCase().includes(search.toLowerCase()) ||
        ev.desc.toLowerCase().includes(search.toLowerCase()) ||
        ev.domain.toLowerCase().includes(search.toLowerCase()) ||
        ev.industry.toLowerCase().includes(search.toLowerCase());

      const matchesStatus = selectedStatus === "All" || ev.status === selectedStatus;
      const matchesMode = selectedMode === "All" || ev.mode === selectedMode.toLowerCase();
      const matchesFormat = selectedFormat === "All Formats" || ev.format === selectedFormat;
      const matchesDomain = selectedDomain === "All Domains" || ev.domain === selectedDomain;
      const matchesIndustry =
        selectedIndustry === "All Industries" || ev.industry === selectedIndustry;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesMode &&
        matchesFormat &&
        matchesDomain &&
        matchesIndustry
      );
    });
  }, [search, selectedStatus, selectedMode, selectedFormat, selectedDomain, selectedIndustry]);

  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-900 pt-24 pb-24 selection:bg-blue-600 selection:text-white">
      {/* HERO SECTION */}
      <section className="bg-slate-900 text-white py-20 px-6 lg:px-8 border-b border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="mx-auto max-w-5xl text-center relative z-10">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-400 bg-blue-500/20 px-4 py-1.5 rounded-full border border-blue-500/30">
            <Sparkles className="w-3.5 h-3.5" /> OFFICIAL COMMUNITY EVENT SYSTEM
          </span>
          <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
            Discover. Learn. Compete. Connect.
          </h1>
          <p className="mt-4 text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Explore technology events across India — structured by{" "}
            <strong className="text-white font-bold">
              Event Format × Technology Domain × Real-World Industry
            </strong>
            .
          </p>
        </div>
      </section>

      {/* FILTER CONTROL BAR */}
      <section className="sticky top-20 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm py-6 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Row 1: Search, Status Tabs, Mode Filters, View Mode Toggle */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-4 top-3.5 h-4 w-4 text-slate-400" />
              <Input
                type="text"
                placeholder="Search events, domains, industries..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-11 rounded-full h-11 border-slate-300 text-xs shadow-xs"
              />
            </div>

            {/* Status Tabs (Upcoming / Live / Past) */}
            <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
              <div className="bg-slate-100 p-1 rounded-full flex text-xs font-bold">
                {["All", "Live", "Upcoming", "Past"].map((st) => (
                  <button
                    key={st}
                    onClick={() => setSelectedStatus(st)}
                    className={`px-3.5 py-1.5 rounded-full transition-all ${
                      selectedStatus === st
                        ? "bg-blue-600 text-white shadow-xs"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    {st === "Live" && (
                      <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse mr-1.5" />
                    )}
                    {st}
                  </button>
                ))}
              </div>

              {/* Mode Selector (Online / Offline / Hybrid) */}
              <div className="bg-slate-100 p-1 rounded-full flex text-xs font-bold">
                {["All", "Online", "Offline", "Hybrid"].map((md) => (
                  <button
                    key={md}
                    onClick={() => setSelectedMode(md)}
                    className={`px-3 py-1.5 rounded-full transition-all ${
                      selectedMode === md
                        ? "bg-slate-900 text-white shadow-xs"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    {md}
                  </button>
                ))}
              </div>

              {/* View Mode Toggle */}
              <div className="hidden sm:flex bg-slate-100 p-1 rounded-full border border-slate-200">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-1.5 rounded-full transition-colors ${viewMode === "grid" ? "bg-white shadow-xs text-blue-600" : "text-slate-500"}`}
                  title="Grid View"
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-1.5 rounded-full transition-colors ${viewMode === "list" ? "bg-white shadow-xs text-blue-600" : "text-slate-500"}`}
                  title="List View"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Row 2: 3-Tier Taxonomy Selectors (Format, Domain, Industry) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-100">
            {/* Format Dropdown */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                Event Format
              </label>
              <select
                value={selectedFormat}
                onChange={(e) => setSelectedFormat(e.target.value)}
                className="w-full rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              >
                {EVENT_FORMATS.map((fmt) => (
                  <option key={fmt} value={fmt}>
                    {fmt}
                  </option>
                ))}
              </select>
            </div>

            {/* Domain Dropdown */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                Technology Domain
              </label>
              <select
                value={selectedDomain}
                onChange={(e) => setSelectedDomain(e.target.value)}
                className="w-full rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              >
                {TECH_DOMAINS.map((dom) => (
                  <option key={dom} value={dom}>
                    {dom}
                  </option>
                ))}
              </select>
            </div>

            {/* Industry Dropdown */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                Real-World Industry
              </label>
              <select
                value={selectedIndustry}
                onChange={(e) => setSelectedIndustry(e.target.value)}
                className="w-full rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              >
                {INDUSTRIES.map((ind) => (
                  <option key={ind} value={ind}>
                    {ind}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* EVENT RESULTS DISPLAY */}
      <section className="py-12 px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Showing <strong className="text-slate-900">{filteredEvents.length}</strong> matching
            events
          </div>

          {(selectedFormat !== "All Formats" ||
            selectedDomain !== "All Domains" ||
            selectedIndustry !== "All Industries" ||
            search ||
            selectedStatus !== "All" ||
            selectedMode !== "All") && (
            <button
              onClick={() => {
                setSearch("");
                setSelectedStatus("All");
                setSelectedMode("All");
                setSelectedFormat("All Formats");
                setSelectedDomain("All Domains");
                setSelectedIndustry("All Industries");
              }}
              className="text-xs font-bold text-blue-600 hover:underline"
            >
              Reset Filters
            </button>
          )}
        </div>

        {filteredEvents.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center border border-slate-200 shadow-xs max-w-xl mx-auto">
            <Layers className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-900 mb-2">No matching events found</h3>
            <p className="text-sm text-slate-500 mb-6">
              Try adjusting your search criteria or choosing different technology domain and
              industry filters.
            </p>
            <Button
              onClick={() => {
                setSearch("");
                setSelectedStatus("All");
                setSelectedMode("All");
                setSelectedFormat("All Formats");
                setSelectedDomain("All Domains");
                setSelectedIndustry("All Industries");
              }}
              className="rounded-full bg-blue-600 hover:bg-blue-700"
            >
              Show All Events
            </Button>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((ev) => (
              <div
                key={ev.id}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col justify-between hover:shadow-md hover:border-blue-300 transition-all group"
              >
                <div>
                  {/* Status & Format Pills */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                    <span className="text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1 rounded-full">
                      {ev.format}
                    </span>
                    <span
                      className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                        ev.status === "Live"
                          ? "bg-emerald-100 text-emerald-700 border border-emerald-300 animate-pulse"
                          : ev.status === "Upcoming"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {ev.status}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {ev.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-6 line-clamp-3">
                    {ev.desc}
                  </p>

                  {/* Taxonomy Tags */}
                  <div className="space-y-1.5 text-xs text-slate-500 mb-6 border-t border-slate-100 pt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 font-semibold">Domain:</span>
                      <strong className="text-slate-800 font-bold">{ev.domain}</strong>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 font-semibold">Industry:</span>
                      <strong className="text-slate-800 font-bold">{ev.industry}</strong>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 font-semibold">Date & Time:</span>
                      <strong className="text-slate-800 font-bold">{ev.formattedDate}</strong>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 font-semibold">Mode:</span>
                      <strong className="text-slate-800 uppercase font-bold text-[10px] bg-slate-100 px-2 py-0.5 rounded">
                        {ev.mode}
                      </strong>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                    <span>{ev.price === 0 ? "Free Ticket" : `₹${ev.price}`}</span>
                    <span className="flex items-center gap-1 text-slate-400">
                      <Users className="w-3.5 h-3.5 text-blue-600" /> {ev.registeredCount} /{" "}
                      {ev.max_seats}
                    </span>
                  </div>

                  <Button
                    asChild
                    className="w-full rounded-full bg-blue-600 hover:bg-blue-700 font-bold"
                  >
                    <Link to="/community/events/$eventId" params={{ eventId: ev.slug }}>
                      Event Details <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredEvents.map((ev) => (
              <div
                key={ev.id}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-blue-300 transition-all"
              >
                <div className="flex-1 space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold bg-blue-50 text-blue-700 px-3 py-0.5 rounded-full border border-blue-200">
                      {ev.format}
                    </span>
                    <span className="text-xs font-bold text-slate-500">{ev.domain}</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-xs font-bold text-slate-500">{ev.industry}</span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900">{ev.title}</h3>
                  <p className="text-xs text-slate-600 max-w-2xl">{ev.desc}</p>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right text-xs space-y-1 hidden lg:block">
                    <div className="font-bold text-slate-900">{ev.formattedDate}</div>
                    <div className="text-slate-500">{ev.venue}</div>
                  </div>

                  <Button asChild className="rounded-full bg-blue-600 hover:bg-blue-700 font-bold">
                    <Link to="/community/events/$eventId" params={{ eventId: ev.slug }}>
                      View Event <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
