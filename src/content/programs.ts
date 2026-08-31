import type { Program } from "./types";

export const programs: Program[] = [
  {
    title: "Knowledge Sharing Series 2026",
    slug: "knowledge-sharing-series-2026",
    description:
      "A recurring session series where practitioners explain how real systems, products and research are built — with time for open questions.",
    category: "Knowledge Sharing",
    audience: ["Students", "Developers", "Professionals"],
    format: "Recurring online sessions",
    status: "active",
    outcomes: ["Practical exposure to production practice", "Direct access to practitioners", "Published recordings"],
  },
  {
    title: "OrigoHOST Workshops",
    slug: "workshops",
    description:
      "Hands-on technical labs with a defined outcome: participants finish with something working, not just notes.",
    category: "Workshops",
    audience: ["Students", "Developers"],
    format: "Half-day / full-day labs, online and on campus",
    status: "active",
    outcomes: ["A completed lab artefact", "A reusable checklist", "Workshop certificate"],
  },
  {
    title: "Build Weekends & Hackathons",
    slug: "hackathons",
    description:
      "Time-boxed build challenges with mentorship, scoping reviews and a technical defence at the end.",
    category: "Hackathons",
    audience: ["Students", "Developers", "Founders"],
    format: "24–48 hour challenges",
    status: "planning",
    outcomes: ["A shipped prototype", "Mentor feedback", "Public project write-up"],
  },
  {
    title: "CyberForge",
    slug: "cyberforge",
    description:
      "The OrigoHOST cybersecurity track: application security, defensive engineering and practical lab work.",
    category: "Workshops",
    audience: ["Developers", "Professionals", "Students"],
    format: "Lab-based workshop series",
    status: "active",
    outcomes: ["Threat-modelling capability", "Secure-review checklist", "Domain specialisation path"],
  },
  {
    title: "Community Meetups",
    slug: "meetups",
    description: "Member-led gatherings — short talks followed by open discussion, online and city-level.",
    category: "Meetups",
    audience: ["Students", "Developers", "Professionals", "Founders"],
    format: "Monthly, online and offline",
    status: "recurring",
    outcomes: ["Local network", "Speaking practice", "Collaboration opportunities"],
  },
  {
    title: "Open Source Program",
    slug: "open-source",
    description:
      "Guided contribution paths, community-maintained projects and review support for first-time contributors.",
    category: "Open Source",
    audience: ["Students", "Developers"],
    format: "Continuous, mentor-supported",
    status: "open",
    outcomes: ["Merged contributions", "Public portfolio", "Maintainer mentorship"],
  },
  {
    title: "Research Track",
    slug: "research",
    description:
      "Reading groups, applied research write-ups and support for members publishing technical work.",
    category: "Research",
    audience: ["Researchers", "Students", "Professionals"],
    format: "Reading groups and writing cohorts",
    status: "planning",
    outcomes: ["Published technical writing", "Peer review practice", "Research collaborators"],
  },
  {
    title: "Career Development",
    slug: "career-development",
    description:
      "Portfolio reviews, interview preparation and role-readiness guidance from working practitioners.",
    category: "Career Development",
    audience: ["Students", "Developers"],
    format: "Sessions, clinics and reviews",
    status: "active",
    outcomes: ["Reviewed portfolio", "Interview readiness", "Referral network access"],
  },
  {
    title: "Entrepreneurship Support",
    slug: "entrepreneurship",
    description:
      "For members building products and ventures: scoping, technical feasibility and go-to-market discussion.",
    category: "Entrepreneurship",
    audience: ["Founders", "Professionals"],
    format: "Clinics and founder circles",
    status: "planning",
    outcomes: ["Sharper problem definition", "Technical feasibility review", "Founder peer group"],
  },
  {
    title: "Mentorship Program",
    slug: "mentorship",
    description:
      "Structured, time-bound mentorship with clear expectations for both mentor and member.",
    category: "Mentorship",
    audience: ["Students", "Developers", "Professionals"],
    format: "Cohort-based, 8–12 weeks",
    status: "open",
    outcomes: ["A defined growth plan", "Regular accountability", "Domain guidance"],
  },
  {
    title: "Campus Chapters",
    slug: "campus-chapters",
    description:
      "Student-led chapters running OrigoHOST programs on their own campus under shared quality standards.",
    category: "Campus Chapters",
    audience: ["Students", "Educators"],
    format: "Institution-hosted chapters",
    status: "open",
    outcomes: ["Local program calendar", "Leadership experience", "Institutional collaboration"],
  },
];

export const programCategories = [
  "Knowledge Sharing",
  "Workshops",
  "Hackathons",
  "Meetups",
  "Open Source",
  "Research",
  "Career Development",
  "Entrepreneurship",
  "Mentorship",
  "Campus Chapters",
];

export const featuredProgramSlugs = [
  "knowledge-sharing-series-2026",
  "hackathons",
  "cyberforge",
  "workshops",
  "campus-chapters",
  "meetups",
];
