import { EventService } from "@/domains/events/event.service";
import { TaxonomyService } from "@/domains/taxonomy/taxonomy.service";
import { HomepageViewModel } from "../types/homepage.types";
import { HomepageViewModelSchema } from "../schemas/homepage.schema";

export class HomepageService {
  /**
   * Compose the HomepageViewModel by fetching operational data (published events, taxonomy)
   * and combining it with editorial/CMS metadata.
   */
  static async getHomepageData(): Promise<HomepageViewModel> {
    // 1. Operational data fetch: Published events & Taxonomy
    const [eventsResult, formats, domains, industries] = await Promise.all([
      EventService.getEvents({ limit: 3, status: "upcoming" }),
      TaxonomyService.getEventFormats().catch(() => []),
      TaxonomyService.getTechnologyDomains().catch(() => []),
      TaxonomyService.getIndustries().catch(() => []),
    ]);

    // Fallback events if database table has 0 upcoming records
    const events = eventsResult.events.length > 0 ? eventsResult.events : [
      {
        id: "evt-kss-03",
        title: "KSS Episode 3 — Kubernetes & IaC Automation",
        slug: "kss-ep-3-kubernetes-iac",
        description: "Learn Terraform, Helm charts, and container telemetry with OrigoHOST architects.",
        start_date: "2026-09-21T10:00:00Z",
        end_date: "2026-09-21T12:00:00Z",
        location: "Online Webinar Engine",
        mode: "online",
        format: "Knowledge Sharing Series",
        domain: "DevOps & Cloud",
        industry: "Cloud Infrastructure",
        status: "upcoming",
        capacity: 500,
        banner_url: "/assets/events/kss2026ep03-poster.webp",
        tags: ["Kubernetes", "IaC", "DevOps"],
        created_at: new Date().toISOString(),
      },
      {
        id: "evt-cyberforge-2026",
        title: "CyberForge 2026 National Hackathon",
        slug: "cyberforge-2026",
        description: "48-hour buildathons creating threat scanners & smart contract security audit bots.",
        start_date: "2026-10-14T09:00:00Z",
        end_date: "2026-10-16T18:00:00Z",
        location: "Hybrid (Delhi & Online)",
        mode: "hybrid",
        format: "Hackathon",
        domain: "Cybersecurity",
        industry: "FinTech & Banking",
        status: "upcoming",
        capacity: 1000,
        banner_url: "/event-poster.jpg",
        tags: ["Hackathon", "Cybersecurity", "ZeroTrust"],
        created_at: new Date().toISOString(),
      },
      {
        id: "evt-agritech-ai-2026",
        title: "AI for Agriculture Ideathon 2026",
        slug: "ai-agriculture-ideathon-2026",
        description: "Turn agricultural challenges into smart AI, drone telemetry & crop yield analysis solutions.",
        start_date: "2026-11-05T10:00:00Z",
        end_date: "2026-11-05T17:00:00Z",
        location: "Online Webinar Engine",
        mode: "online",
        format: "Ideathon",
        domain: "Artificial Intelligence",
        industry: "AgriTech & Farming",
        status: "upcoming",
        capacity: 300,
        banner_url: "/event-gallery-1.jpg",
        tags: ["AI", "AgriTech", "Ideathon"],
        created_at: new Date().toISOString(),
      },
    ];

    const rawData: HomepageViewModel = {
      hero: {
        eyebrow: "WHERE BUILDERS BECOME INNOVATORS",
        title: "Where Builders Become Innovators.",
        subtitle:
          "OrigoHOST brings together developers, students, builders, researchers, and technology practitioners to learn, create, compete, and shape real-world technology.",
        primaryCtaText: "Explore Events",
        primaryCtaLink: "/events",
        secondaryCtaText: "Join the Community",
        secondaryCtaLink: "/register",
        backgroundMediaUrl: "/team-group.webp",
        liveActivityEvent: {
          title: "CyberForge Hackathon 2026",
          tag: "LIVE BUILDATHON",
          mode: "Hybrid • 48h Sprint",
          imageUrl: "/event-gallery-1.jpg",
        },
      },
      communityProof: {
        impactCounters: [
          { label: "15,000+", value: "Developers & Learners", sublabel: "Reached across cohorts" },
          { label: "75+", value: "Institutions & Chapters", sublabel: "Connected ecosystems" },
          { label: "35+", value: "Community Meetups", sublabel: "In-person & online" },
          { label: "120+", value: "Workshops & KSS", sublabel: "Hands-on tech sessions" },
        ],
        mosaicImages: {
          hero: "/event-gallery-2.jpg",
          community: "/team-group.webp",
          workshop: "/event-gallery-4.jpg",
        },
      },
      participation: {
        eyebrow: "EXPLORE THE COMMUNITY",
        title: "One Community. Countless Ways to Participate.",
        subtitle:
          "Whether you're here to learn something new, build applications, share technical knowledge, or connect with industry practitioners, there is a place for you at OrigoHOST.",
        pillars: [
          {
            title: "LEARN",
            desc: "Gain real-world engineering capability through practitioner workshops and sessions.",
            items: ["Hands-on Workshops", "Interactive Webinars", "Knowledge Sharing Series (KSS)", "Skill Bootcamps"],
            iconName: "BookOpen",
            color: "text-blue-600",
            bg: "bg-blue-50/80",
            border: "border-blue-200",
          },
          {
            title: "BUILD",
            desc: "Solve challenges and turn breakthrough ideas into production codebases.",
            items: ["48-Hour Hackathons", "Problem Ideathons", "Tech Marathons", "Open Source Labs"],
            iconName: "Code2",
            color: "text-emerald-600",
            bg: "bg-emerald-50/80",
            border: "border-emerald-200",
          },
          {
            title: "CONNECT",
            desc: "Meet developers, researchers, campus leaders, and industry mentors.",
            items: ["Community Meetups", "Roundtable Sessions", "Conferences & Summits", "Chapter Gatherings"],
            iconName: "Users",
            color: "text-purple-600",
            bg: "bg-purple-50/80",
            border: "border-purple-200",
          },
          {
            title: "CONTRIBUTE",
            desc: "Give back, guide emerging developers, and lead technical initiatives.",
            items: ["Mentorship Tracks", "Tech Speaking", "Community Volunteering", "Campus Ambassadorship"],
            iconName: "Trophy",
            color: "text-amber-600",
            bg: "bg-amber-50/80",
            border: "border-amber-200",
          },
        ],
      },
      exploreTechnology: {
        eyebrow: "TECHNOLOGY DOMAIN HUB",
        title: "Explore Core Technology Domains",
        subtitle:
          "Deep dive into specialized tech domains where community builders learn, compete, collaborate, and launch open-source initiatives.",
        domains: [
          {
            id: "td-ai",
            name: "Artificial Intelligence & ML",
            slug: "ai-ml",
            desc: "Neural networks, LLM fine-tuning, computer vision telemetry & intelligent agents.",
            iconName: "Brain",
            eventCount: 14,
            projectCount: 9,
            articleCount: 22,
          },
          {
            id: "td-cloud",
            name: "Cloud & DevOps Engineering",
            slug: "cloud-devops",
            desc: "Kubernetes, Terraform IaC, container orchestration & microservices architecture.",
            iconName: "Cloud",
            eventCount: 18,
            projectCount: 12,
            articleCount: 31,
          },
          {
            id: "td-cyber",
            name: "Cybersecurity & Zero Trust",
            slug: "cybersecurity",
            desc: "Threat intelligence, penetration testing, smart contract security & zero-trust grids.",
            iconName: "Shield",
            eventCount: 10,
            projectCount: 7,
            articleCount: 15,
          },
          {
            id: "td-iot",
            name: "IoT & Embedded Systems",
            slug: "iot-embedded",
            desc: "LoRaWAN sensor networks, microcontrollers, edge compute & smart telemetry.",
            iconName: "Bot",
            eventCount: 8,
            projectCount: 5,
            articleCount: 11,
          },
        ],
      },
      featuredEvents: {
        eyebrow: "UPCOMING EVENTS",
        title: "Register for Next Events",
        events: events,
      },
      eventExperiences: {
        eyebrow: "EVENT EXPERIENCES",
        title: "Where the Community Comes Together",
        flagshipPoster: {
          title: "Knowledge Sharing Series (KSS 2026)",
          subtitle: "Live technical deep dives led by cloud and platform practitioners.",
          posterUrl: "/assets/events/kss2026ep02-poster.webp",
          tag: "FLAGSHIP WEBINAR SERIES",
        },
        formats: [
          { name: "Meetups", desc: "Informal networking & community tech talks." },
          { name: "Hackathons", desc: "48-hour buildathons creating open source tools." },
          { name: "Ideathons", desc: "Solving real-world industry challenges." },
          { name: "Tech Marathons", desc: "Multi-day continuous learning & sprint." },
          { name: "Workshops", desc: "Hands-on guided coding & deployment labs." },
          { name: "Masterclasses", desc: "Advanced practitioner sessions for senior engineers." },
        ],
      },
      technologyIndustry: {
        eyebrow: "DISCOVERY MATRIX ENGINE",
        title: "Technology Domain × Real-World Industry",
        subtitle:
          "Technology should not exist in isolation. Discover how AI, Cloud, Cybersecurity, IoT, and DevOps transform real-world fields from AgriTech to FinTech and HealthTech.",
        highlights: [
          {
            tech: "Artificial Intelligence",
            industry: "AgriTech & Farming",
            title: "AI × Agriculture",
            desc: "Precision crop telemetry, drone imagery analysis & automated yield forecasting.",
            iconName: "Brain",
            industryIconName: "Sprout",
            tagColor: "text-emerald-600 bg-emerald-50 border-emerald-200",
          },
          {
            tech: "Cloud & Microservices",
            industry: "Healthcare & MedTech",
            title: "Cloud × Healthcare",
            desc: "HIPAA-compliant patient telemetry, electronic records & distributed medical APIs.",
            iconName: "Cloud",
            industryIconName: "HeartPulse",
            tagColor: "text-blue-600 bg-blue-50 border-blue-200",
          },
          {
            tech: "Cybersecurity",
            industry: "FinTech & Banking",
            title: "Security × Finance",
            desc: "Zero-trust banking architectures, fraud detection & smart contract vulnerability audit.",
            iconName: "Shield",
            industryIconName: "Coins",
            tagColor: "text-purple-600 bg-purple-50 border-purple-200",
          },
          {
            tech: "IoT & Edge Computing",
            industry: "Smart Cities & Mobility",
            title: "IoT × Smart Cities",
            desc: "LoRaWAN sensor networks, traffic flow telemetry & intelligent public grids.",
            iconName: "Bot",
            industryIconName: "Landmark",
            tagColor: "text-amber-600 bg-amber-50 border-amber-200",
          },
        ],
      },
      community: {
        eyebrow: "COMMUNITY LEADERSHIP",
        title: "Built by People. Powered by Community.",
        subtitle: "Meet the founders, technical architects, and community organizers behind OrigoHOST.",
        leaders: [
          {
            name: "Ritik Kumar",
            role: "Founder & Community Director",
            org: "OrigoHOST Tech Ecosystem",
            image: "/ritik-kumar.webp",
            focus: "Community Growth & Tech Partnerships",
          },
          {
            name: "Brajesh Kumar",
            role: "Tech Lead & Keynote Speaker",
            org: "OrigoHOST Labs",
            image: "/brajesh-kumar.jpg",
            focus: "Distributed Systems & Cloud Security",
          },
          {
            name: "Tarun Kumar",
            role: "Platform Architect",
            org: "OrigoHOST Core",
            image: "/tarun-kumar.webp",
            focus: "Kubernetes, CI/CD & Platform Eng",
          },
        ],
        verifiedCertificate: {
          tag: "VERIFIED CREDENTIALS",
          title: "Official Certificate Verification",
          desc: "Eligible participants earn cryptographically verified credentials backed by OrigoHOST's verification system.",
          certImageUrl: "/actual-cert.webp",
        },
      },
      knowledge: {
        eyebrow: "KNOWLEDGE HUB",
        title: "Knowledge for Builders",
        featuredArticle: {
          tag: "FEATURED RESEARCH",
          title: "Architecting Resilient Distributed Systems on Kubernetes",
          desc: "An in-depth study on container orchestration, automated failovers, and telemetry logging for high-scale tech platforms.",
          coverUrl: "/event-gallery-3.jpg",
          link: "/knowledge",
        },
        categories: [
          { title: "Tutorials & Playbooks", desc: "Step-by-step technical guides for cloud, AI, and security." },
          { title: "Origo Labs Research", desc: "Emerging tech papers on distributed systems & cryptography." },
          { title: "Community Stories", desc: "Real-world experiences from chapter leads and builders." },
          { title: "Event Insights", desc: "Video archives and takeaways from Knowledge Sharing Series webinars." },
        ],
      },
      projects: {
        eyebrow: "COMMUNITY BUILDS",
        title: "Built at OrigoHOST",
        subtitle: "Explore open-source prototypes, hackathon submissions, and real-world tools created by community members.",
        projects: [
          {
            id: "prj-01",
            title: "AgriVision AI Telemetry Bot",
            desc: "Autonomous drone imagery processor mapping crop health indices using PyTorch & OpenCV.",
            techDomain: "Artificial Intelligence",
            industry: "AgriTech",
            imageUrl: "/event-gallery-1.jpg",
            demoUrl: "https://github.com/origohost",
          },
          {
            id: "prj-02",
            title: "ZeroTrust Smart Contract Auditor",
            desc: "Static code analysis tool checking Solidity ASTs for reentrancy and integer overflow bugs.",
            techDomain: "Cybersecurity",
            industry: "FinTech",
            imageUrl: "/event-poster.jpg",
            demoUrl: "https://github.com/origohost",
          },
        ],
      },
      opportunities: {
        eyebrow: "ECOSYSTEM OPPORTUNITIES",
        title: "Grow, Speak & Lead",
        opportunities: [
          {
            id: "opp-01",
            title: "Campus Ambassador Program",
            type: "Leadership",
            domain: "Community Growth",
            desc: "Represent OrigoHOST at your university, organize local workshops, and lead student developer chapters.",
            applyLink: "/ambassador",
          },
          {
            id: "opp-02",
            title: "Technical Speaker & Mentor Track",
            type: "Mentorship",
            domain: "Engineering",
            desc: "Share your engineering expertise at KSS webinars, review hackathon builds, and mentor junior builders.",
            applyLink: "/speakers",
          },
        ],
      },
      partners: {
        eyebrow: "TRUSTED ECOSYSTEM",
        title: "Institutional & Community Partners",
        partners: [
          { id: "p-01", name: "OrigoHOST Labs", category: "R&D Partner" },
          { id: "p-02", name: "Campus Developer Network", category: "University Ecosystem" },
          { id: "p-03", name: "Open Cloud Initiative", category: "Infrastructure Sponsor" },
        ],
      },
      cta: {
        title: "Your Next Build Could Start Here.",
        subtitle: "Learn something new. Meet someone new. Build something meaningful.",
        primaryCtaText: "Join OrigoHOST",
        primaryCtaLink: "/register",
        secondaryCtaText: "Explore Events",
        secondaryCtaLink: "/events",
      },
    };

    // Validate structure against Zod schema
    const parsed = HomepageViewModelSchema.parse(rawData);
    return parsed as HomepageViewModel;
  }
}
