import { EventItem } from "@/domains/events/event.service";

export interface HeroData {
  eyebrow: string;
  title: string;
  subtitle: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
  backgroundMediaUrl: string;
  liveActivityEvent?: {
    title: string;
    tag: string;
    mode: string;
    imageUrl: string;
  };
}

export interface CommunityImpactCounter {
  label: string;
  value: string;
  sublabel: string;
}

export interface CommunityProofData {
  impactCounters: CommunityImpactCounter[];
  mosaicImages: {
    hero: string;
    community: string;
    workshop: string;
  };
}

export interface ParticipationPillar {
  title: string;
  desc: string;
  items: string[];
  iconName: string;
  color: string;
  bg: string;
  border: string;
}

export interface EventExperiencesData {
  eyebrow: string;
  title: string;
  flagshipPoster: {
    title: string;
    subtitle: string;
    posterUrl: string;
    tag: string;
  };
  formats: Array<{
    name: string;
    desc: string;
  }>;
}

export interface TechIndustryHighlight {
  tech: string;
  industry: string;
  title: string;
  desc: string;
  iconName: string;
  industryIconName: string;
  tagColor: string;
}

export interface TechnologyIndustryData {
  eyebrow: string;
  title: string;
  subtitle: string;
  highlights: TechIndustryHighlight[];
}

export interface LeaderProfile {
  name: string;
  role: string;
  org: string;
  image: string;
  focus: string;
}

export interface CommunityShowcaseData {
  eyebrow: string;
  title: string;
  subtitle: string;
  leaders: LeaderProfile[];
  verifiedCertificate: {
    tag: string;
    title: string;
    desc: string;
    certImageUrl: string;
  };
}

export interface KnowledgeShowcaseData {
  eyebrow: string;
  title: string;
  featuredArticle: {
    tag: string;
    title: string;
    desc: string;
    coverUrl: string;
    link: string;
  };
  categories: Array<{
    title: string;
    desc: string;
  }>;
}

export interface ProjectShowcaseData {
  eyebrow: string;
  title: string;
  subtitle: string;
  projects: Array<{
    id: string;
    title: string;
    desc: string;
    techDomain: string;
    industry: string;
    imageUrl: string;
    demoUrl?: string;
  }>;
}

export interface OpportunityItem {
  id: string;
  title: string;
  type: string;
  domain: string;
  desc: string;
  applyLink: string;
}

export interface OpportunitiesShowcaseData {
  eyebrow: string;
  title: string;
  opportunities: OpportunityItem[];
}

export interface PartnerData {
  id: string;
  name: string;
  category: string;
  logoUrl?: string;
}

export interface EcosystemPartnersData {
  eyebrow: string;
  title: string;
  partners: PartnerData[];
}

export interface HomeCtaData {
  title: string;
  subtitle: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
}

export interface HomepageViewModel {
  hero: HeroData;
  communityProof: CommunityProofData;
  participation: {
    eyebrow: string;
    title: string;
    subtitle: string;
    pillars: ParticipationPillar[];
  };
  featuredEvents: {
    eyebrow: string;
    title: string;
    events: EventItem[];
  };
  eventExperiences: EventExperiencesData;
  technologyIndustry: TechnologyIndustryData;
  community: CommunityShowcaseData;
  knowledge: KnowledgeShowcaseData;
  projects: ProjectShowcaseData;
  opportunities: OpportunitiesShowcaseData;
  partners: EcosystemPartnersData;
  cta: HomeCtaData;
}
