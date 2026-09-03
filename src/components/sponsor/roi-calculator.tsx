"use client";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Users, Mail, MousePointerClick, Eye, Target } from "lucide-react";
import { m as motion } from "framer-motion";

export function RoiCalculator() {
  const [budget, setBudget] = useState(50000);

  // Simplified multiplier logic based on budget
  const reach = Math.floor(budget * 1.8);
  const socialReach = Math.floor(budget * 4.5);
  const emailReach = Math.floor(budget * 0.8);
  const impressions = Math.floor(budget * 12);
  const leads = Math.floor(budget * 0.05);

  return (
    <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl">
      <h3 className="text-2xl font-black text-[var(--brand-ink)] mb-2">Estimate Your Impact</h3>
      <p className="text-slate-500 mb-8">
        Adjust your estimated budget to see the projected community reach and ROI.
      </p>

      <div className="mb-10">
        <div className="flex justify-between items-end mb-4">
          <label className="font-bold text-slate-700">Estimated Sponsorship Budget</label>
          <div className="text-2xl font-black text-blue-600">₹{budget.toLocaleString()}</div>
        </div>
        <Slider
          defaultValue={[50000]}
          max={1000000}
          min={10000}
          step={10000}
          onValueChange={(v) => setBudget(v[0])}
          className="py-4"
        />
        <div className="flex justify-between text-xs text-slate-400 mt-2">
          <span>₹10,000</span>
          <span>₹10,00,000+</span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {[
          { icon: <Users className="text-blue-500" />, label: "Developer Reach", value: reach },
          {
            icon: <Target className="text-emerald-500" />,
            label: "Social Media Reach",
            value: socialReach,
          },
          {
            icon: <Mail className="text-orange-500" />,
            label: "Email Subscribers",
            value: emailReach,
          },
          {
            icon: <Eye className="text-purple-500" />,
            label: "Brand Impressions",
            value: impressions,
          },
          {
            icon: <MousePointerClick className="text-pink-500" />,
            label: "Expected Leads",
            value: leads,
          },
        ].map((stat, i) => (
          <motion.div
            key={stat.value} // re-animate on change
            initial={{ scale: 0.95, opacity: 0.5 }}
            animate={{ scale: 1, opacity: 1 }}
            className="p-4 rounded-2xl bg-slate-50 border border-slate-100"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center shadow-sm">
                {stat.icon}
              </div>
            </div>
            <div className="text-sm font-semibold text-slate-500 mb-1">{stat.label}</div>
            <div className="text-2xl font-black text-[var(--brand-ink)]">
              {stat.value >= 1000 ? `${(stat.value / 1000).toFixed(1)}k+` : stat.value}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
