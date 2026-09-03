import { createFileRoute, Link } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Filter, Search, ArrowRight, MapPin, Clock, Users, Trophy } from "lucide-react";

export const Route = createFileRoute("/events")({
  head: () =>
    buildSeo({
      title: "Events — Discover. Learn. Compete. Connect",
      description:
        "Explore technology events, hackathons, ideathons, meetups, seminars, workshops, and webinars across the OrigoHOST community.",
      path: "/events",
    }),
  component: EventsPage,
});

const EVENT_FORMATS = [
  "All",
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
];

const ALL_EVENTS = [
  {
    title: "CyberForge 2026 Hackathon",
    format: "Hackathons",
    domain: "Cybersecurity",
    industry: "FinTech & Defense",
    date: "21 September 2026",
    mode: "Tech Hub & Virtual",
    desc: "48-hour intensive buildathon creating secure cloud applications & threat scanners.",
    status: "Registration Open",
  },
  {
    title: "AI for Agriculture Ideathon",
    format: "Ideathons",
    domain: "Artificial Intelligence",
    industry: "Agriculture & AgriTech",
    date: "14 October 2026",
    mode: "Online Webinar",
    desc: "Turn agricultural challenges into smart AI & drone solutions with community mentors.",
    status: "Registration Open",
  },
  {
    title: "Knowledge Sharing Series 2026 — KSS2026",
    format: "KSS",
    domain: "DevOps & Infrastructure",
    industry: "Digital Business",
    date: "7 September 2026",
    mode: "Live Webinar",
    desc: "Episode-based webinar series where tech practitioners share real-world engineering playbooks.",
    status: "Upcoming",
  },
  {
    title: "FinTech & Blockchain Security Masterclass",
    format: "Masterclasses",
    domain: "Web3 & Blockchain",
    industry: "Finance & FinTech",
    date: "28 October 2026",
    mode: "Delhi NCR Campus",
    desc: "Deep-dive session led by senior financial technology engineers on smart contract auditing.",
    status: "Upcoming",
  },
];

function EventsPage() {
  const [selectedFormat, setSelectedFormat] = useState("All");
  const [search, setSearch] = useState("");

  const filteredEvents = ALL_EVENTS.filter((ev) => {
    const matchesFormat = selectedFormat === "All" || ev.format === selectedFormat;
    const matchesSearch =
      ev.title.toLowerCase().includes(search.toLowerCase()) ||
      ev.domain.toLowerCase().includes(search.toLowerCase()) ||
      ev.industry.toLowerCase().includes(search.toLowerCase());
    return matchesFormat && matchesSearch;
  });

  return (
    <div className="relative min-h-screen bg-white text-slate-900 pt-28 pb-20 selection:bg-blue-600 selection:text-white">
      {/* HERO */}
      <section className="bg-slate-900 text-white py-20 px-6 lg:px-8 border-b border-slate-800">
        <div className="mx-auto max-w-4xl text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-400 bg-blue-500/20 px-3 py-1 rounded-full border border-blue-500/30">
            COMMUNITY EVENTS ENGINE
          </span>
          <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
            Discover. Learn. Compete. Connect.
          </h1>
          <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Explore technology events happening across the OrigoHOST community — structured by
            format, domain, and real-world industry.
          </p>
        </div>
      </section>

      {/* FILTER CONTROLS */}
      <section className="py-10 px-6 lg:px-8 max-w-7xl mx-auto border-b border-slate-100">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-3.5 h-4 w-4 text-slate-400" />
            <Input
              type="text"
              placeholder="Search by event, domain, or industry..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-11 rounded-full h-11 border-slate-300 text-xs"
            />
          </div>

          <div className="text-xs text-slate-500 font-semibold">
            Showing <strong>{filteredEvents.length}</strong> events
          </div>
        </div>

        {/* Formats Pills */}
        <div className="flex flex-wrap gap-2">
          {EVENT_FORMATS.map((fmt) => (
            <button
              key={fmt}
              onClick={() => setSelectedFormat(fmt)}
              className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all ${
                selectedFormat === fmt
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {fmt}
            </button>
          ))}
        </div>
      </section>

      {/* EVENT CARDS */}
      <section className="py-16 px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredEvents.map((ev) => (
            <div
              key={ev.title}
              className="rounded-3xl border border-slate-200 bg-slate-50/50 p-8 shadow-sm flex flex-col justify-between hover:border-blue-300 transition-colors"
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <span className="text-xs font-bold bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                    {ev.format}
                  </span>
                  <span className="text-xs font-semibold text-emerald-600">{ev.status}</span>
                </div>

                <h3 className="text-2xl font-bold text-slate-900 mb-2">{ev.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">{ev.desc}</p>

                <div className="space-y-1.5 text-xs text-slate-500 mb-6 border-t border-slate-200/80 pt-4">
                  <div>
                    Technology Domain: <strong className="text-slate-800">{ev.domain}</strong>
                  </div>
                  <div>
                    Industry Focus: <strong className="text-slate-800">{ev.industry}</strong>
                  </div>
                  <div>
                    Date & Mode:{" "}
                    <strong className="text-slate-800">
                      {ev.date} ({ev.mode})
                    </strong>
                  </div>
                </div>
              </div>

              <Button asChild className="w-full rounded-full bg-blue-600 hover:bg-blue-700">
                <Link to="/community/events">
                  Register Now <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
