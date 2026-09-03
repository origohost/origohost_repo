import { SITE_CONFIG } from "@/config/site";

export function buildBinarizeSchema() {
  return {
    "@type": "Organization",
    "@id": "https://binarize.io/#organization",
    name: "Binarize Technologies",
    url: "https://binarize.io",
  };
}

export function buildYennickSchema() {
  return {
    "@type": "Organization",
    "@id": "https://yennick.com/#organization",
    name: "Yennick Pharma",
  };
}

export function buildAadvickSchema() {
  return {
    "@type": "Organization",
    "@id": "https://aadvick.org/#organization",
    name: "Aadvick Foundation",
  };
}

export function buildFounderSchemaRitik() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_CONFIG.url}/about/founder#ritik-kumar`,
    name: "Ritik Kumar",
    jobTitle: [
      "Founder & Community Director",
      "Founder & CEO",
      "Executive Director",
      "President",
      "Campus Ambassador",
      "Former Co-Founder",
    ],
    worksFor: [
      { "@id": `${SITE_CONFIG.url}/#organization` },
      { "@id": "https://binarize.io/#organization" },
      { "@id": "https://yennick.com/#organization" },
      { "@id": "https://aadvick.org/#organization" },
    ],
    founderOf: [
      { "@id": `${SITE_CONFIG.url}/#organization` },
      { "@id": "https://binarize.io/#organization" },
      {
        "@type": "Organization",
        name: "MatchWith",
        alternateName: "Lesuf",
      },
    ],
    alumniOf: [
      {
        "@type": "CollegeOrUniversity",
        name: "Indian Institute of Technology Madras",
        alternateName: "IIT Madras",
      },
      {
        "@type": "CollegeOrUniversity",
        name: "Indian Institute of Technology Roorkee",
        alternateName: "IIT Roorkee",
      },
    ],
    description:
      "Enterprise SaaS Architect, Staff Frontend Engineer, AI Developer, Technology Entrepreneur, and Founder of OrigoHOST.",
    image: `${SITE_CONFIG.url}/ritik-kumar.jpg`,
    url: `${SITE_CONFIG.url}/about/founder`,
    sameAs: [
      "https://linkedin.com/in/codewithritik19",
      "https://github.com/codewithritik19",
      "https://twitter.com/codewithritik19",
      "https://instagram.com/iamritik.k",
      "https://ritik-portfolio-coral.vercel.app/",
      "https://crunchbase.com/person/ritik-kumar-origohost",
      "https://www.wikidata.org/wiki/Q_PLACEHOLDER_RITIK",
      "https://medium.com/@codewithritik19",
      "https://dev.to/codewithritik19",
      "https://youtube.com/@codewithritik19",
    ],
    knowsAbout: [
      "Enterprise Software",
      "Cloud Architecture",
      "Frontend Development",
      "Entity SEO",
      "AI Search Optimization",
      "Generative Engine Optimization",
      "Kubernetes",
      "DevOps",
      "Artificial Intelligence",
      "Software Engineering",
    ],
  };
}

export function buildDynamicPersonSchema(founder: any) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_CONFIG.url}/about/founders/${founder.slug}#person`,
    name: founder.name,
    jobTitle: founder.role,
    worksFor: [{ "@id": `${SITE_CONFIG.url}/#organization` }],
    description: founder.biography,
    image: `${SITE_CONFIG.url}${founder.avatarUrl}`,
    url: `${SITE_CONFIG.url}/about/founders/${founder.slug}`,
    sameAs: founder.links?.map((l: any) => l.href) || [],
    knowsAbout: founder.skills || [],
  };
}

export function buildFounderSchemaTarun() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_CONFIG.url}/about/founder#tarun-kumar`,
    name: "Tarun Kumar",
    jobTitle: ["Co-Founder & Community President", "Co-Founder", "Vice President"],
    worksFor: [
      { "@id": `${SITE_CONFIG.url}/#organization` },
      { "@id": "https://aadvick.org/#organization" },
    ],
    founderOf: [
      { "@id": `${SITE_CONFIG.url}/#organization` },
    ],
    description:
      "AI Engineer, Technology Entrepreneur, and Co-Founder & President of OrigoHOST Community.",
    image: `${SITE_CONFIG.url}/tarun-kumar.png`,
    url: `${SITE_CONFIG.url}/leadership`,
    sameAs: [
      "https://www.linkedin.com/in/iamtarunchaudhary",
      "https://www.instagram.com/tarunsinghchdhry",
      "https://crunchbase.com/person/tarun-kumar-origohost",
      "https://www.wikidata.org/wiki/Q_PLACEHOLDER_TARUN",
      "https://medium.com/@tarunsinghchdhry",
      "https://dev.to/tarunsinghchdhry",
    ],
    knowsAbout: [
      "Artificial Intelligence",
      "Machine Learning",
      "Software Engineering",
      "Cloud Computing",
      "Technology Entrepreneurship",
      "Entity SEO",
      "Generative Engine Optimization",
    ],
  };
}

export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_CONFIG.url}/#organization`,
    name: "OrigoHOST",
    alternateName: [
      "Origo Host",
      "OrigoHOST Community",
      "OrigoHOST India",
      "OrigoHOST Developer Community",
      "origohost.in",
    ],
    url: SITE_CONFIG.url,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_CONFIG.url}/logo.png`,
      width: "512",
      height: "512",
    },
    description:
      "OrigoHOST is an India-based technology community focused on helping students, developers, and professionals learn, build, collaborate, and grow through technical events, hackathons, workshops, open-source initiatives, and community programs.",
    foundingDate: "2023",
    email: SITE_CONFIG.emails.contact,
    sameAs: [
      "https://www.instagram.com/origohost?igsh=MWgxOWdhM2F1MGliMw==",
      "https://twitter.com/origohost",
      "https://github.com/origohost",
      "https://linkedin.com/company/origohost",
      "https://crunchbase.com/organization/origohost",
      "https://www.wikidata.org/wiki/Q_PLACEHOLDER_ORIGOHOST",
      "https://youtube.com/@origohost",
      "https://dev.to/origohost",
      "https://hashnode.com/@origohost",
      "https://medium.com/@origohost",
    ],
    founders: [
      { "@id": `${SITE_CONFIG.url}/about/founder#ritik-kumar` },
      { "@id": `${SITE_CONFIG.url}/about/founder#tarun-kumar` },
    ],
    alumni: [
      { "@id": `${SITE_CONFIG.url}/about/founder#ritik-kumar` },
      { "@id": `${SITE_CONFIG.url}/about/founder#tarun-kumar` },
    ],
    knowsAbout: [
      "Cloud Computing",
      "Artificial Intelligence",
      "DevOps",
      "Technology Community",
      "Software Engineering",
      "Hackathons",
    ],
    keywords:
      "OrigoHOST, Origo Host, OrigoHOST Community, origohost.in, Hosting, Community, Cloud, Enterprise, VPS, Dedicated Servers, DevOps, Kubernetes, AI, Hackathons",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: SITE_CONFIG.emails.support,
      availableLanguage: ["English", "Hindi"],
    },
    subOrganization: [
      {
        "@type": "Organization",
        "@id": `${SITE_CONFIG.url}/cloud#organization`,
        name: "Origo Cloud",
        description: "Enterprise-grade cloud hosting and VPS infrastructure.",
        url: `${SITE_CONFIG.url}/cloud`,
      },
      {
        "@type": "Organization",
        "@id": `${SITE_CONFIG.url}/academy#organization`,
        name: "Origo Academy",
        description: "Educational arm providing technology workshops and training.",
        url: `${SITE_CONFIG.url}/academy`,
      },
      {
        "@type": "Organization",
        "@id": `${SITE_CONFIG.url}/community#organization`,
        name: "Origo Community",
        description: "The core developer network connecting engineers globally.",
        url: `${SITE_CONFIG.url}/community`,
      },
      {
        "@type": "Organization",
        "@id": `${SITE_CONFIG.url}/community/events#organization`,
        name: "Origo Events",
        description: "Organizer of technical hackathons, summits, and meetups.",
        url: `${SITE_CONFIG.url}/community/events`,
      },
      {
        "@type": "Organization",
        "@id": `${SITE_CONFIG.url}/topics/ai#organization`,
        name: "Origo AI",
        description: "Research and deployment of generative artificial intelligence models.",
        url: `${SITE_CONFIG.url}/topics/ai`,
      },
      {
        "@type": "Organization",
        "@id": `${SITE_CONFIG.url}/open-source#organization`,
        name: "Origo Dev",
        description: "Open source developer tools and software engineering initiatives.",
        url: `${SITE_CONFIG.url}/open-source`,
      },
      {
        "@type": "Organization",
        "@id": `${SITE_CONFIG.url}/talent#organization`,
        name: "Origo Talent",
        description: "Connecting top engineers with high-growth technology startups.",
      },
      {
        "@type": "Organization",
        "@id": `${SITE_CONFIG.url}/jobs#organization`,
        name: "Origo Jobs",
        description: "The official job board for cloud and AI roles.",
      },
      {
        "@type": "Organization",
        "@id": `${SITE_CONFIG.url}/learn#organization`,
        name: "Origo Learn",
        description: "Self-paced tutorials, guides, and learning pathways for developers.",
      },
      {
        "@type": "Organization",
        "@id": `${SITE_CONFIG.url}/labs#organization`,
        name: "Origo Labs",
        description: "Incubator and research facility for experimental cloud technologies.",
      },
      {
        "@type": "Organization",
        "@id": `${SITE_CONFIG.url}/about/research#organization`,
        name: "Origo Research",
        description: "Publishing deep technical papers, industry benchmarks, and analysis.",
      },
      {
        "@type": "Organization",
        "@id": `${SITE_CONFIG.url}/foundation#organization`,
        name: "Origo Foundation",
        description:
          "Philanthropic arm supporting digital literacy and open-source sustainability.",
      },
    ],
  };
}

export function buildWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_CONFIG.url}/#website`,
    url: SITE_CONFIG.url,
    name: "OrigoHOST",
    description: SITE_CONFIG.description,
    publisher: { "@id": `${SITE_CONFIG.url}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_CONFIG.url}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function buildLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_CONFIG.url}/#localbusiness`,
    name: "OrigoHOST HQ",
    image: `${SITE_CONFIG.url}/logo.png`,
    url: SITE_CONFIG.url,
    email: SITE_CONFIG.emails.contact,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Delhi",
      addressRegion: "Delhi",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "28.6139",
      longitude: "77.2090",
    },
    parentOrganization: {
      "@id": `${SITE_CONFIG.url}/#organization`,
    },
  };
}

export function buildWebPageSchema(title: string, description: string, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description: description,
    url: url,
    publisher: {
      "@id": `\${SITE_CONFIG.url}/#organization`,
    },
  };
}

export function buildEventSchema(event: Record<string, any>) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    "@id": `${SITE_CONFIG.url}/community/events/${event.id}#event`,
    name: event.title,
    description: event.description,
    startDate: event.starts_at,
    endDate: event.ends_at || event.starts_at,
    doorTime: event.doorTime,
    typicalAgeRange: event.typicalAgeRange,
    eventAttendanceMode:
      event.mode === "ONLINE"
        ? "https://schema.org/OnlineEventAttendanceMode"
        : "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: event.eventStatus || "https://schema.org/EventScheduled",
    performer: event.performer ? { "@type": "Person", name: event.performer } : undefined,
    sponsor: event.sponsor ? { "@type": "Organization", name: event.sponsor } : undefined,
    location:
      event.mode === "ONLINE"
        ? {
            "@type": "VirtualLocation",
            url: `${SITE_CONFIG.url}/events/${event.id}`,
          }
        : {
            "@type": "Place",
            name: event.city || "TBA",
            address: {
              "@type": "PostalAddress",
              addressLocality: event.city || "TBA",
            },
          },
    organizer: {
      "@id": `${SITE_CONFIG.url}/#organization`,
    },
  };
}

export function buildJobPostingSchema(job: Record<string, string | null | undefined>) {
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.description,
    datePosted: job.created_at,
    validThrough: new Date(
      new Date(job.created_at!).setMonth(new Date(job.created_at!).getMonth() + 2),
    ).toISOString(),
    employmentType:
      job.type === "full-time"
        ? "FULL_TIME"
        : job.type === "part-time"
          ? "PART_TIME"
          : "CONTRACTOR",
    hiringOrganization: {
      "@id": `\${SITE_CONFIG.url}/#organization`,
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: job.location || "Remote",
      },
    },
  };
}

export function buildBreadcrumbSchema(items: { label: string; url?: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: item.url ? `\${SITE_CONFIG.url}\${item.url}` : undefined,
    })),
  };
}

// ----------------------------------------------------
// NEW AISO SCHEMAS
// ----------------------------------------------------

export function buildSpeakableSchema(cssSelectors: string[] = ["h1", "h2", "h3"]) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: cssSelectors,
    },
  };
}

export function buildFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq, index) => ({
      "@type": "Question",
      "@id": `${SITE_CONFIG.url}/#faq-${index}`,
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function buildProfilePageSchema(founder: any) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${SITE_CONFIG.url}/about/founders/${founder.slug}#profile`,
    url: `${SITE_CONFIG.url}/about/founders/${founder.slug}`,
    mainEntity: {
      "@id": `${SITE_CONFIG.url}/about/founders/${founder.slug}#person`,
    },
  };
}

export function buildImageObjectSchema(url: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    url: url,
    description: description,
  };
}

export function buildBlogPostingSchema(post: {
  title: string;
  headline: string;
  image: string;
  datePublished: string;
  authorName: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.headline,
    name: post.title,
    image: post.image,
    datePublished: post.datePublished,
    author: {
      "@type": "Person",
      name: post.authorName,
    },
    publisher: {
      "@id": `\${SITE_CONFIG.url}/#organization`,
    },
  };
}

export function buildArticleSchema(article: {
  title: string;
  image: string;
  datePublished: string;
  authorName: string;
  url?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    ...(article.url ? { "@id": `${article.url}#article` } : {}),
    headline: article.title,
    image: article.image,
    datePublished: article.datePublished,
    author: {
      "@type": "Person",
      name: article.authorName,
    },
    publisher: {
      "@id": `\${SITE_CONFIG.url}/#organization`,
    },
  };
}

export function buildSearchActionSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: SITE_CONFIG.url,
    potentialAction: {
      "@type": "SearchAction",
      target: `\${SITE_CONFIG.url}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function buildVideoObjectSchema(video: {
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  contentUrl: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: video.name,
    description: video.description,
    thumbnailUrl: video.thumbnailUrl,
    uploadDate: video.uploadDate,
    contentUrl: video.contentUrl,
    publisher: {
      "@id": `\${SITE_CONFIG.url}/#organization`,
    },
  };
}

export function buildHowToSchema(howto: {
  name: string;
  description: string;
  totalTime: string;
  steps: { name: string; text: string; url?: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: howto.name,
    description: howto.description,
    totalTime: howto.totalTime,
    step: howto.steps.map((step) => ({
      "@type": "HowToStep",
      name: step.name,
      text: step.text,
      url: step.url,
    })),
  };
}

export function buildSoftwareApplicationSchema(software: {
  name: string;
  description: string;
  applicationCategory: string;
  operatingSystem: string;
  offers?: { price: string; priceCurrency: string };
  softwareRequirements?: string;
  memoryRequirements?: string;
  releaseNotes?: string;
  featureList?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: software.name,
    description: software.description,
    applicationCategory: software.applicationCategory,
    operatingSystem: software.operatingSystem,
    softwareRequirements: software.softwareRequirements,
    memoryRequirements: software.memoryRequirements,
    releaseNotes: software.releaseNotes,
    featureList: software.featureList?.join(", "),
    offers: software.offers
      ? {
          "@type": "Offer",
          price: software.offers.price,
          priceCurrency: software.offers.priceCurrency,
        }
      : undefined,
  };
}

export function buildCourseSchema(course: {
  name: string;
  description: string;
  providerName?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.name,
    description: course.description,
    provider: {
      "@type": "Organization",
      name: course.providerName || "OrigoHOST Academy",
      sameAs: SITE_CONFIG.url,
    },
  };
}

export function buildReviewSchema(review: {
  itemReviewed: string;
  authorName: string;
  reviewRating: number;
  reviewBody: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed: {
      "@type": "Organization",
      name: review.itemReviewed,
    },
    author: {
      "@type": "Person",
      name: review.authorName,
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: review.reviewRating.toString(),
      bestRating: "5",
    },
    reviewBody: review.reviewBody,
  };
}

// ----------------------------------------------------
// EXHAUSTIVE SCHEMA SWEEP (PHASE 10 COMPLETION)
// ----------------------------------------------------

export function buildAboutPageSchema(title: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: title,
    description: description,
    publisher: { "@id": `${SITE_CONFIG.url}/#organization` },
  };
}

export function buildContactPageSchema(title: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: title,
    description: description,
    publisher: { "@id": `${SITE_CONFIG.url}/#organization` },
  };
}

export function buildCollectionPageSchema(title: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: title,
    description: description,
  };
}

export function buildItemListSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: item.url,
    })),
  };
}

export function buildEventSeriesSchema(
  name: string,
  description: string,
  performer?: string,
  sponsor?: string,
  typicalAgeRange?: string,
) {
  return {
    "@context": "https://schema.org",
    "@type": "EventSeries",
    name: name,
    description: description,
    typicalAgeRange: typicalAgeRange,
    performer: performer ? { "@type": "Person", name: performer } : undefined,
    sponsor: sponsor ? { "@type": "Organization", name: sponsor } : undefined,
    organizer: { "@id": `${SITE_CONFIG.url}/#organization` },
  };
}

export function buildTechArticleSchema(article: {
  title: string;
  description: string;
  datePublished: string;
  authorName: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: article.title,
    description: article.description,
    datePublished: article.datePublished,
    author: {
      "@type": "Person",
      name: article.authorName,
    },
    publisher: { "@id": `${SITE_CONFIG.url}/#organization` },
  };
}

export function buildAggregateRatingSchema(ratingValue: number, reviewCount: number) {
  return {
    "@context": "https://schema.org",
    "@type": "AggregateRating",
    ratingValue: ratingValue.toString(),
    reviewCount: reviewCount.toString(),
    bestRating: "5",
  };
}

export function buildOfferCatalogSchema(
  name: string,
  items: {
    name: string;
    url: string;
    priceValidUntil?: string;
    eligibleRegion?: string;
    warrantyPromise?: string;
  }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: name,
    itemListElement: items.map((item, index) => ({
      "@type": "Offer",
      name: item.name,
      url: item.url,
      priceValidUntil: item.priceValidUntil,
      eligibleRegion: item.eligibleRegion
        ? { "@type": "Country", name: item.eligibleRegion }
        : undefined,
      warrantyPromise: item.warrantyPromise
        ? { "@type": "WarrantyPromise", durationOfWarranty: item.warrantyPromise }
        : undefined,
    })),
  };
}

export function buildServiceSchema(name: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: name,
    description: description,
    provider: { "@id": `${SITE_CONFIG.url}/#organization` },
  };
}

export function buildDatasetSchema(name: string, description: string, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: name,
    description: description,
    url: url,
    creator: { "@id": `${SITE_CONFIG.url}/#organization` },
  };
}

export function buildEducationalOrganizationSchema(alumni?: string[], teaches?: string[]) {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "Origo Academy",
    parentOrganization: { "@id": `${SITE_CONFIG.url}/#organization` },
    alumni: alumni ? alumni.map((a) => ({ "@type": "Person", name: a })) : undefined,
    teaches: teaches,
  };
}

export function buildLearningResourceSchema(
  name: string,
  description: string,
  educationalAlignment?: string,
  teaches?: string,
  assesses?: string,
  competencyRequired?: string,
) {
  return {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    name: name,
    description: description,
    educationalAlignment: educationalAlignment
      ? {
          "@type": "AlignmentObject",
          alignmentType: "educationalSubject",
          targetName: educationalAlignment,
        }
      : undefined,
    teaches: teaches,
    assesses: assesses,
    competencyRequired: competencyRequired,
  };
}

export function buildDiscussionForumPostingSchema(
  title: string,
  authorName: string,
  datePublished: string,
  upvoteCount?: number,
  interactionStatistic?: { interactionType: string; userInteractionCount: number }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "DiscussionForumPosting",
    headline: title,
    author: {
      "@type": "Person",
      name: authorName,
    },
    datePublished: datePublished,
    upvoteCount: upvoteCount,
    interactionStatistic: interactionStatistic,
  };
}

export function buildQAPageSchema(
  mainQuestion: string,
  answer: string,
  upvoteCount?: number,
  suggestedAnswer?: string,
) {
  return {
    "@context": "https://schema.org",
    "@type": "QAPage",
    mainEntity: {
      "@type": "Question",
      name: mainQuestion,
      upvoteCount: upvoteCount,
      acceptedAnswer: {
        "@type": "Answer",
        text: answer,
        upvoteCount: upvoteCount,
      },
      suggestedAnswer: suggestedAnswer
        ? [
            {
              "@type": "Answer",
              text: suggestedAnswer,
            },
          ]
        : undefined,
    },
  };
}

export function buildSiteNavigationElementSchema(links: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "SiteNavigationElement",
    name: links.map((l) => l.name),
    url: links.map((l) => l.url),
  };
}

export function buildDefinedTermSchema(
  term: string,
  definition: string,
  inDefinedTermSet?: string,
) {
  const schema: any = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name: term,
    description: definition,
  };

  if (inDefinedTermSet) {
    schema.inDefinedTermSet = inDefinedTermSet;
  }

  return schema;
}
