import { z } from "zod";

export const EventItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  description: z.string().nullable(),
  start_date: z.string(),
  end_date: z.string().nullable(),
  location: z.string().nullable(),
  mode: z.string().nullable(),
  format: z.string().nullable(),
  domain: z.string().nullable(),
  industry: z.string().nullable(),
  status: z.string().nullable(),
  capacity: z.number().nullable(),
  banner_url: z.string().nullable(),
  tags: z.array(z.string()).nullable(),
  created_at: z.string(),
});

export const HomepageViewModelSchema = z.object({
  hero: z.object({
    eyebrow: z.string(),
    title: z.string(),
    subtitle: z.string(),
    primaryCtaText: z.string(),
    primaryCtaLink: z.string(),
    secondaryCtaText: z.string(),
    secondaryCtaLink: z.string(),
    backgroundMediaUrl: z.string(),
    liveActivityEvent: z
      .object({
        title: z.string(),
        tag: z.string(),
        mode: z.string(),
        imageUrl: z.string(),
      })
      .optional(),
  }),
  communityProof: z.object({
    impactCounters: z.array(
      z.object({
        label: z.string(),
        value: z.string(),
        sublabel: z.string(),
      })
    ),
    mosaicImages: z.object({
      hero: z.string(),
      community: z.string(),
      workshop: z.string(),
    }),
  }),
  participation: z.object({
    eyebrow: z.string(),
    title: z.string(),
    subtitle: z.string(),
    pillars: z.array(
      z.object({
        title: z.string(),
        desc: z.string(),
        items: z.array(z.string()),
        iconName: z.string(),
        color: z.string(),
        bg: z.string(),
        border: z.string(),
      })
    ),
  }),
  exploreTechnology: z.object({
    eyebrow: z.string(),
    title: z.string(),
    subtitle: z.string(),
    domains: z.array(
      z.object({
        id: z.string(),
        name: z.string(),
        slug: z.string(),
        desc: z.string(),
        iconName: z.string(),
        eventCount: z.number(),
        projectCount: z.number(),
        articleCount: z.number(),
      })
    ),
  }),
  featuredEvents: z.object({
    eyebrow: z.string(),
    title: z.string(),
    events: z.array(EventItemSchema),
  }),
  eventExperiences: z.object({
    eyebrow: z.string(),
    title: z.string(),
    flagshipPoster: z.object({
      title: z.string(),
      subtitle: z.string(),
      posterUrl: z.string(),
      tag: z.string(),
    }),
    formats: z.array(
      z.object({
        name: z.string(),
        desc: z.string(),
      })
    ),
  }),
  technologyIndustry: z.object({
    eyebrow: z.string(),
    title: z.string(),
    subtitle: z.string(),
    highlights: z.array(
      z.object({
        tech: z.string(),
        industry: z.string(),
        title: z.string(),
        desc: z.string(),
        iconName: z.string(),
        industryIconName: z.string(),
        tagColor: z.string(),
      })
    ),
  }),
  community: z.object({
    eyebrow: z.string(),
    title: z.string(),
    subtitle: z.string(),
    leaders: z.array(
      z.object({
        name: z.string(),
        role: z.string(),
        org: z.string(),
        image: z.string(),
        focus: z.string(),
      })
    ),
    verifiedCertificate: z.object({
      tag: z.string(),
      title: z.string(),
      desc: z.string(),
      certImageUrl: z.string(),
    }),
  }),
  knowledge: z.object({
    eyebrow: z.string(),
    title: z.string(),
    featuredArticle: z.object({
      tag: z.string(),
      title: z.string(),
      desc: z.string(),
      coverUrl: z.string(),
      link: z.string(),
    }),
    categories: z.array(
      z.object({
        title: z.string(),
        desc: z.string(),
      })
    ),
  }),
  projects: z.object({
    eyebrow: z.string(),
    title: z.string(),
    subtitle: z.string(),
    projects: z.array(
      z.object({
        id: z.string(),
        title: z.string(),
        desc: z.string(),
        techDomain: z.string(),
        industry: z.string(),
        imageUrl: z.string(),
        demoUrl: z.string().optional(),
      })
    ),
  }),
  opportunities: z.object({
    eyebrow: z.string(),
    title: z.string(),
    opportunities: z.array(
      z.object({
        id: z.string(),
        title: z.string(),
        type: z.string(),
        domain: z.string(),
        desc: z.string(),
        applyLink: z.string(),
      })
    ),
  }),
  partners: z.object({
    eyebrow: z.string(),
    title: z.string(),
    partners: z.array(
      z.object({
        id: z.string(),
        name: z.string(),
        category: z.string(),
        logoUrl: z.string().optional(),
      })
    ),
  }),
  cta: z.object({
    title: z.string(),
    subtitle: z.string(),
    primaryCtaText: z.string(),
    primaryCtaLink: z.string(),
    secondaryCtaText: z.string(),
    secondaryCtaLink: z.string(),
  }),
});
