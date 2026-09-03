"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, MapPin, Users } from "lucide-react";

const upcomingEvents = [
  {
    id: 1,
    name: "Cloud Native Hackathon 2026",
    date: "Aug 15-17, 2026",
    location: "Bangalore (Hybrid)",
    attendees: "2000+",
    sponsorships: [
      { tier: "Gold Sponsor", status: "Available", price: "₹1L" },
      { tier: "Silver Sponsor", status: "Booked", price: "₹50K" },
      { tier: "API Partner", status: "Available", price: "₹25K" },
    ],
  },
  {
    id: 2,
    name: "AI Builders Meetup",
    date: "Sep 13, 2026",
    location: "Delhi NCR",
    attendees: "500+",
    sponsorships: [
      { tier: "Title Sponsor", status: "Booked", price: "₹75K" },
      { tier: "Food Partner", status: "Available", price: "₹20K" },
    ],
  },
  {
    id: 3,
    name: "Web3 Developer Bootcamp",
    date: "Oct 05, 2026",
    location: "Online",
    attendees: "1000+",
    sponsorships: [
      { tier: "Platinum Sponsor", status: "Available", price: "₹2L" },
      { tier: "Gold Sponsor", status: "Available", price: "₹1L" },
    ],
  },
];

export function EventCalendar() {
  return (
    <div className="space-y-6">
      {upcomingEvents.map((event) => (
        <div
          key={event.id}
          className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-lg shadow-slate-200/20 flex flex-col lg:flex-row gap-8 items-start lg:items-center"
        >
          <div className="flex-1 space-y-4">
            <h3 className="text-2xl font-bold text-[var(--brand-ink)]">{event.name}</h3>
            <div className="flex flex-wrap gap-4 text-sm text-slate-500 font-medium">
              <div className="flex items-center gap-1.5">
                <CalendarIcon className="w-4 h-4" /> {event.date}
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4" /> {event.location}
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4" /> {event.attendees} Expected
              </div>
            </div>
          </div>

          <div className="w-full lg:w-auto bg-slate-50 p-4 rounded-2xl border border-slate-100 min-w-[300px]">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Sponsorship Slots
            </h4>
            <div className="space-y-2">
              {event.sponsorships.map((slot, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between bg-white p-2.5 rounded-lg border border-slate-200 text-sm"
                >
                  <span className="font-semibold text-slate-700">{slot.tier}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-slate-400 text-xs font-medium">{slot.price}</span>
                    <Badge
                      variant={slot.status === "Available" ? "default" : "secondary"}
                      className={
                        slot.status === "Available"
                          ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-0"
                          : "bg-slate-100 text-slate-400 border-0"
                      }
                    >
                      {slot.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            <Button
              className="w-full mt-4 bg-blue-600 hover:bg-blue-700 rounded-xl"
              onClick={() =>
                document.getElementById("apply")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Reserve a Slot
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
