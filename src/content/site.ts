import type { Chapter, Statistic } from "./types";

export const brand = {
  name: "OrigoHOST",
  tagline: "Where Builders Become Innovators",
  founded: "2026",
  country: "India",
  motto: "Learn. Build. Connect. Grow.",
  intro:
    "OrigoHOST is a professional technology community helping students, developers, professionals, researchers, founders, and innovators learn, build, collaborate, and grow through real-world technology experiences.",
  email: "community@origohost.org",
  partnershipEmail: "partnerships@origohost.org",
};

export const socialLinks = [
  { label: "LinkedIn", url: "https://www.linkedin.com/company/origohost" },
  { label: "X", url: "https://x.com/origohost" },
  { label: "GitHub", url: "https://github.com/origohost" },
  { label: "Instagram", url: "https://instagram.com/origohost" },
  { label: "YouTube", url: "https://youtube.com/@origohost" },
];

export const primaryNav = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Community", to: "/community" },
  { label: "Programs", to: "/programs" },
  { label: "Events", to: "/events" },
  { label: "Resources", to: "/resources" },
  { label: "Blog", to: "/blog" },
  { label: "Partnerships", to: "/partnerships" },
] as const;

export const journey = ["Learn", "Build", "Connect", "Grow", "Innovate"];

export const technologyLine = [
  "AI",
  "Cloud",
  "DevOps",
  "Cybersecurity",
  "Software Engineering",
  "Open Source",
  "Emerging Technology",
];

export const ecosystemAudiences = [
  "Students",
  "Developers",
  "Professionals",
  "Researchers",
  "Founders",
  "Educators",
  "Industry",
];

export const pillars = [
  {
    key: "LEARN",
    title: "Learn",
    description: "Practical knowledge and technical education led by people who build in the open.",
  },
  {
    key: "BUILD",
    title: "Build",
    description: "Projects, hackathons and real-world challenges that turn theory into shipped work.",
  },
  {
    key: "CONNECT",
    title: "Connect",
    description: "Community, mentors, domain experts and industry practitioners in one network.",
  },
  {
    key: "GROW",
    title: "Grow",
    description: "Leadership, careers, entrepreneurship and long-term opportunity for every member.",
  },
];

export const whatWeDo = [
  {
    title: "Knowledge Sharing",
    description: "Recurring sessions where practitioners break down how real systems are built.",
  },
  { title: "Workshops", description: "Hands-on, outcome-driven technical labs across domains." },
  { title: "Hackathons", description: "Time-boxed build challenges with mentorship and review." },
  { title: "Meetups", description: "Local and online gatherings for members to meet and collaborate." },
  { title: "Open Source", description: "Guided contribution paths and maintained community projects." },
  { title: "Research", description: "Reading groups, technical write-ups and applied research tracks." },
  { title: "Career Development", description: "Portfolio, interview and role-readiness support." },
  { title: "Entrepreneurship", description: "Support for members building products and ventures." },
  { title: "Mentorship", description: "Structured mentor relationships with clear expectations." },
  { title: "Campus Chapters", description: "Student-led chapters running programs on their campus." },
];

export const technologyDomains = [
  "AI & Machine Learning",
  "Cloud Computing",
  "DevOps",
  "Cybersecurity",
  "Software Engineering",
  "Web & Mobile",
  "Data Science",
  "Robotics & IoT",
  "Blockchain",
  "Open Source",
  "UI/UX",
  "Product Management",
  "Entrepreneurship",
  "Research",
];

/**
 * Community impact metrics.
 * `value: null` renders as "Pending verification" — statistics are never
 * invented. Replace values from the CMS/admin once officially confirmed.
 */
export const impactStats: Statistic[] = [
  { label: "Community reach", value: null, note: "Verified reporting starts after the 2026 launch cycle." },
  { label: "Events delivered", value: null, note: "Counted from the public events registry." },
  { label: "Workshops", value: null, note: "Counted from delivered hands-on sessions." },
  { label: "Community programs", value: "10", note: "Programs currently published on this site." },
];

export const philosophy = [
  { title: "Learn by Doing", description: "Understanding is proven by what you can build, not what you memorised." },
  { title: "Build Together", description: "Collaboration produces better engineers and better outcomes." },
  { title: "Open Knowledge", description: "Sessions, notes and resources stay accessible after the event ends." },
  { title: "Create Impact", description: "Programs are measured by what members achieve afterwards." },
  { title: "Grow People", description: "Leadership is developed inside the community, not imported." },
];

export const storyTimeline = [
  {
    year: "2026",
    title: "Foundation",
    description: "OrigoHOST is founded in India as a professional technology community.",
    state: "current" as const,
  },
  {
    year: "2026",
    title: "Community Development",
    description: "Core team, governance structure and membership pathways established.",
    state: "current" as const,
  },
  {
    year: "2026",
    title: "Knowledge Sharing",
    description: "The recurring knowledge-sharing series begins across technology domains.",
    state: "current" as const,
  },
  {
    year: "Planned",
    title: "Hackathons & Workshops",
    description: "Build-first programs with mentorship, review and public project outcomes.",
    state: "planned" as const,
  },
  {
    year: "Planned",
    title: "Campus Expansion",
    description: "Student-led campus chapters running local programs under shared standards.",
    state: "planned" as const,
  },
  {
    year: "Planned",
    title: "National Ecosystem",
    description: "A connected national network of chapters, mentors and partners.",
    state: "planned" as const,
  },
];

export const governance = [
  {
    title: "Leadership & departments",
    description:
      "OrigoHOST operates through defined departments — community, programs, events, partnerships, content and technology — each with named ownership.",
  },
  {
    title: "Policies & standards",
    description:
      "Program quality, speaker review, code of conduct and data-handling standards apply to every chapter and event.",
  },
  {
    title: "Program review",
    description:
      "Proposals are reviewed against audience value, technical depth and delivery capacity before being published.",
  },
  {
    title: "Accountability",
    description:
      "Every event publishes an event report, so outcomes are documented rather than claimed.",
  },
];

export const communityRoles = [
  { title: "Members", description: "Join programs, events and discussions across every domain." },
  { title: "Ambassadors", description: "Represent OrigoHOST on a campus or in a local tech scene." },
  { title: "Mentors", description: "Guide members through structured, time-bound mentorship." },
  { title: "Contributors", description: "Build community projects, content, tooling and resources." },
  { title: "Chapter Leaders", description: "Run a chapter, its programs and its local partnerships." },
  { title: "Volunteers", description: "Support event delivery, operations and community moderation." },
];

export const communityBenefits = [
  "Learning tracks across technology domains",
  "Networking with practitioners and peers",
  "Structured mentorship",
  "Real projects and open source work",
  "Hackathons and build challenges",
  "Career opportunities and referrals",
  "Leadership and chapter roles",
  "Community recognition",
  "Knowledge sharing and speaking practice",
];

export const communityStructure: Chapter[] = [
  { name: "National Community", level: "National", region: "India", status: "active" },
  { name: "State Chapters", level: "State", region: "Applications open", status: "applications-open" },
  { name: "Campus Chapters", level: "Campus", region: "Applications open", status: "applications-open" },
  { name: "Local Communities", level: "Local", region: "City-level groups", status: "forming" },
];

export const contactCategories = [
  "General Inquiry",
  "Community",
  "Events",
  "Partnership",
  "Sponsorship",
  "Campus Chapter",
  "Speaking",
  "Media",
  "Technical Issue",
  "Other",
];

export const footerColumns = [
  {
    title: "Explore",
    links: [
      { label: "Home", to: "/" },
      { label: "About", to: "/about" },
      { label: "Community", to: "/community" },
      { label: "Programs", to: "/programs" },
      { label: "Events", to: "/events" },
      { label: "Resources", to: "/resources" },
      { label: "Blog", to: "/blog" },
    ],
  },
  {
    title: "Get involved",
    links: [
      { label: "Join Community", to: "/community" },
      { label: "Become an Ambassador", to: "/community" },
      { label: "Become a Mentor", to: "/community" },
      { label: "Become a Contributor", to: "/community" },
      { label: "Start a Chapter", to: "/community" },
    ],
  },
  {
    title: "Partnerships",
    links: [
      { label: "Partner With Us", to: "/partnerships" },
      { label: "Institutions", to: "/partnerships" },
      { label: "Industry", to: "/partnerships" },
      { label: "Sponsorship", to: "/partnerships" },
      { label: "Organize an Event", to: "/organize-an-event" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Contact", to: "/contact" },
      { label: "Help Center", to: "/contact" },
      { label: "Feedback", to: "/contact" },
      { label: "Report an Issue", to: "/contact" },
    ],
  },
] as const;

export const legalLinks = [
  { label: "Privacy Policy", to: "/contact" },
  { label: "Terms", to: "/contact" },
  { label: "Cookie Policy", to: "/contact" },
  { label: "Community Guidelines", to: "/contact" },
] as const;
