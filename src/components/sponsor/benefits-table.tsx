"use client";
import { Check, Minus, ChevronDown } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";

const features = [
  { name: "Website Logo Placement", tiers: [true, true, true, true] },
  { name: "Social Media Shoutouts", tiers: [true, true, true, true] },
  { name: "Stage Mention at Events", tiers: [false, true, true, true] },
  { name: "Distribute Swag/Coupons", tiers: [false, true, true, true] },
  { name: "Dedicated Physical Booth", tiers: [false, false, true, true] },
  { name: "Keynote Speaking Slot", tiers: [false, false, true, true] },
  { name: "Access to Opt-in Resumes", tiers: [false, false, true, true] },
  { name: "Custom API Integration Challenge", tiers: [false, false, true, true] },
  { name: "Hiring Pipeline Support", tiers: [false, false, false, true] },
  { name: "Exclusive VIP Dinner", tiers: [false, false, false, true] },
  { name: "Year-Round Title Sponsorship", tiers: [false, false, false, true] },
];

const tiers = [
  { name: "Bronze", index: 0 },
  { name: "Silver", index: 1 },
  { name: "Gold", index: 2, isPopular: true },
  { name: "Platinum", index: 3 },
];

export function BenefitsTable() {
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);

  return (
    <>
      <div className="hidden md:block overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-xl">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50 hover:bg-slate-50">
              <TableHead className="w-[300px] font-bold text-slate-800 text-base py-6">
                Features
              </TableHead>
              <TableHead className="text-center font-bold text-slate-800 text-base py-6">
                Bronze
              </TableHead>
              <TableHead className="text-center font-bold text-slate-800 text-base py-6">
                Silver
              </TableHead>
              <TableHead className="text-center font-bold text-blue-600 text-base py-6 bg-blue-50/50">
                Gold
              </TableHead>
              <TableHead className="text-center font-bold text-slate-800 text-base py-6">
                Platinum
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {features.map((feature, i) => (
              <TableRow key={i} className="hover:bg-slate-50/50 transition-colors">
                <TableCell className="font-medium text-slate-700 py-4">{feature.name}</TableCell>
                {feature.tiers.map((hasFeature, j) => (
                  <TableCell
                    key={j}
                    className={`text-center py-4 ${j === 2 ? "bg-blue-50/20" : ""}`}
                  >
                    {hasFeature ? (
                      <Check className="mx-auto h-5 w-5 text-emerald-500" />
                    ) : (
                      <Minus className="mx-auto h-5 w-5 text-slate-300" />
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="md:hidden space-y-4 text-left">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className="rounded-2xl border border-slate-700 bg-slate-800/50 backdrop-blur-md shadow-sm overflow-hidden"
          >
            <button
              onClick={() => setOpenAccordion(openAccordion === tier.index ? null : tier.index)}
              className="flex w-full items-center justify-between p-5 text-left font-bold text-white"
            >
              <span className={tier.isPopular ? "text-blue-400" : ""}>{tier.name} Benefits</span>
              <ChevronDown
                className={`h-5 w-5 text-slate-400 transition-transform ${openAccordion === tier.index ? "rotate-180" : ""}`}
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${openAccordion === tier.index ? "max-h-[1000px] border-t border-slate-700" : "max-h-0"}`}
            >
              <div className="p-5 space-y-4">
                {features.map((feature, i) => (
                  <div key={i} className="flex items-center justify-between text-sm gap-4">
                    <span className="text-slate-300">{feature.name}</span>
                    {feature.tiers[tier.index] ? (
                      <Check className="h-5 w-5 text-emerald-400 shrink-0" />
                    ) : (
                      <Minus className="h-5 w-5 text-slate-600 shrink-0" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
