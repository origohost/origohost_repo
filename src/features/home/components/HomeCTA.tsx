import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { HomeCtaData } from "../types/homepage.types";

interface HomeCTAProps {
  data: HomeCtaData;
}

export const HomeCTA: React.FC<HomeCTAProps> = ({ data }) => {
  return (
    <section id="final-cta" className="bg-gradient-to-br from-blue-700 via-blue-800 to-slate-900 py-24 text-white">
      <div className="mx-auto max-w-5xl px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-6">
          {data.title}
        </h2>
        <p className="text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed mb-10">
          {data.subtitle}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            asChild
            size="lg"
            className="w-full sm:w-auto h-14 rounded-full bg-white text-blue-900 hover:bg-blue-50 font-bold px-8 shadow-xl transition-all text-base"
          >
            <Link to={data.primaryCtaLink as any}>
              {data.primaryCtaText} <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Link
            to={data.secondaryCtaLink as any}
            className="inline-flex items-center justify-center w-full sm:w-auto h-14 rounded-full border border-white/30 bg-white/10 text-white text-base font-bold px-8 hover:bg-white/20 transition-all duration-200"
          >
            {data.secondaryCtaText}
          </Link>
        </div>
      </div>
    </section>
  );
};
