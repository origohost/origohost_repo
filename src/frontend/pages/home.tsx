import React, { useState, useEffect } from "react";
import { HomepageService } from "@/features/home/services/homepage.service";
import { HomepageViewModel } from "@/features/home/types/homepage.types";
import {
  HomeHero,
  CommunityProof,
  ParticipationSection,
  FeaturedEvents,
  EventExperiences,
  TechnologyIndustryExplorer,
  CommunityShowcase,
  KnowledgeShowcase,
  ProjectShowcase,
  OpportunitiesShowcase,
  EcosystemPartners,
  HomeCTA,
} from "@/features/home/components";

export default function HomePage() {
  const [viewModel, setViewModel] = useState<HomepageViewModel | null>(null);

  useEffect(() => {
    let isMounted = true;
    HomepageService.getHomepageData().then((data) => {
      if (isMounted) {
        setViewModel(data);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  if (!viewModel) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-mono tracking-widest text-slate-400">LOADING ORIGOHOST ECOSYSTEM...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-white text-[#0a0a0a] selection:bg-blue-600 selection:text-white">
      {/* 1. HERO SECTION */}
      <HomeHero data={viewModel.hero} />

      {/* 2. COMMUNITY PROOF METRICS */}
      <CommunityProof data={viewModel.communityProof} />

      {/* 3. PARTICIPATION PILLARS & MOSAIC */}
      <ParticipationSection
        eyebrow={viewModel.participation.eyebrow}
        title={viewModel.participation.title}
        subtitle={viewModel.participation.subtitle}
        pillars={viewModel.participation.pillars}
        mosaicImages={viewModel.communityProof.mosaicImages}
      />

      {/* 4. EVENT EXPERIENCES */}
      <EventExperiences data={viewModel.eventExperiences} />

      {/* 5. FEATURED UPCOMING EVENTS */}
      <FeaturedEvents
        eyebrow={viewModel.featuredEvents.eyebrow}
        title={viewModel.featuredEvents.title}
        events={viewModel.featuredEvents.events}
      />

      {/* 6. TAXONOMY DISCOVERY MATRIX */}
      <TechnologyIndustryExplorer data={viewModel.technologyIndustry} />

      {/* 7. COMMUNITY LEADERSHIP & CERTIFICATIONS */}
      <CommunityShowcase data={viewModel.community} />

      {/* 8. KNOWLEDGE HUB */}
      <KnowledgeShowcase data={viewModel.knowledge} />

      {/* 9. COMMUNITY BUILDS & PROJECTS */}
      <ProjectShowcase data={viewModel.projects} />

      {/* 10. ECOSYSTEM OPPORTUNITIES */}
      <OpportunitiesShowcase data={viewModel.opportunities} />

      {/* 11. PARTNERS */}
      <EcosystemPartners data={viewModel.partners} />

      {/* 12. FINAL CALL TO ACTION */}
      <HomeCTA data={viewModel.cta} />
    </div>
  );
}
