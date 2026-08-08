import type { OrigoEvent } from "./types";

/**
 * Event registry. Structural placeholder content — replace via CMS/admin.
 * Every field maps 1:1 to the `OrigoEvent` model.
 */
export const events: OrigoEvent[] = [
  {
    title: "Knowledge Sharing Series: Designing Systems That Scale",
    slug: "knowledge-sharing-systems-that-scale",
    summary:
      "A practitioner walkthrough of how production systems are structured, from request path to failure handling.",
    description:
      "The Knowledge Sharing Series brings practitioners in front of the community to explain how real systems are actually built and operated. This session covers service boundaries, data flow, caching, observability and the failure modes teams meet in production.",
    category: "Software Engineering",
    audience: ["Students", "Developers", "Professionals"],
    date: "2026-09-12",
    time: "19:00 – 20:30 IST",
    mode: "online",
    location: "Online — link shared after registration",
    speakers: [
      {
        name: "Speaker to be announced",
        role: "Practitioner, systems engineering",
        bio: "Speaker profile is published once confirmed by the programs team.",
      },
    ],
    agenda: [
      { time: "19:00", title: "Welcome & community briefing" },
      { time: "19:10", title: "Session: designing for scale", detail: "Service boundaries, data flow, caching." },
      { time: "20:00", title: "Failure modes and observability" },
      { time: "20:15", title: "Open Q&A" },
    ],
    topics: ["System design", "Reliability", "Observability", "Trade-offs"],
    whoShouldAttend: [
      "Students preparing for engineering roles",
      "Developers moving into system design work",
      "Professionals reviewing architecture decisions",
    ],
    learningOutcomes: [
      "How to reason about service boundaries",
      "Where caching helps and where it hides bugs",
      "A practical checklist for reliability reviews",
    ],
    partners: [],
    organizer: "OrigoHOST Programs",
    registrationStatus: "open",
    status: "upcoming",
    certificate: "Participation certificate issued to attendees who complete the session.",
    faqs: [
      { question: "Is it free?", answer: "Yes. Community knowledge-sharing sessions are free to attend." },
      { question: "Will it be recorded?", answer: "Yes, the recording is published in Resources after the session." },
    ],
    tags: ["knowledge-sharing", "system-design"],
  },
  {
    title: "CyberForge Workshop: Practical Application Security",
    slug: "cyberforge-practical-application-security",
    summary: "A hands-on lab covering how web applications break and how to defend them.",
    description:
      "CyberForge is the OrigoHOST cybersecurity program. This workshop is a guided lab: participants work through authentication flaws, injection, access-control mistakes and secure-by-default patterns on a prepared target application.",
    category: "Cybersecurity",
    audience: ["Students", "Developers", "Professionals"],
    date: "2026-09-27",
    time: "10:00 – 16:00 IST",
    mode: "hybrid",
    location: "Host campus (to be confirmed) + online stream",
    speakers: [
      {
        name: "Speaker to be announced",
        role: "Application security practitioner",
        bio: "Speaker profile is published once confirmed by the programs team.",
      },
    ],
    agenda: [
      { time: "10:00", title: "Threat modelling a real application" },
      { time: "11:30", title: "Lab 1 — authentication and session flaws" },
      { time: "13:30", title: "Lab 2 — access control and injection" },
      { time: "15:15", title: "Secure defaults and review checklist" },
    ],
    topics: ["Threat modelling", "AuthN/AuthZ", "Injection", "Secure defaults"],
    whoShouldAttend: ["Developers shipping web applications", "Students entering security", "QA and platform engineers"],
    learningOutcomes: [
      "Run a lightweight threat model",
      "Identify the most common access-control mistakes",
      "Apply a secure-review checklist to your own project",
    ],
    partners: [],
    organizer: "OrigoHOST CyberForge",
    registrationStatus: "waitlist",
    status: "upcoming",
    certificate: "Workshop certificate issued on lab completion.",
    faqs: [
      { question: "Do I need prior security experience?", answer: "No, but basic web development experience helps." },
      { question: "What should I bring?", answer: "A laptop with a modern browser and a code editor." },
    ],
    tags: ["cyberforge", "workshop", "security"],
  },
  {
    title: "OrigoHOST Build Weekend: AI for Real Problems",
    slug: "build-weekend-ai-for-real-problems",
    summary: "A 48-hour build challenge focused on useful, evaluated AI applications.",
    description:
      "Teams pick a real problem, ship a working prototype in 48 hours and defend it in review. Mentors support scoping, evaluation and delivery. Judging weighs usefulness and evaluation quality over demo polish.",
    category: "AI",
    audience: ["Students", "Developers", "Founders"],
    date: "2026-10-17",
    time: "Starts 09:00 IST",
    mode: "offline",
    location: "Venue to be confirmed",
    speakers: [],
    agenda: [
      { time: "Day 1 · 09:00", title: "Kickoff, team formation, problem selection" },
      { time: "Day 1 · 14:00", title: "Mentor scoping reviews" },
      { time: "Day 2 · 10:00", title: "Build and evaluation checkpoints" },
      { time: "Day 2 · 16:00", title: "Final review and outcomes" },
    ],
    topics: ["Applied AI", "Evaluation", "Product scoping", "Team delivery"],
    whoShouldAttend: ["Builders comfortable shipping code", "Teams with a problem worth solving", "Early founders"],
    learningOutcomes: [
      "Scope an AI project that can ship in 48 hours",
      "Evaluate output quality instead of guessing",
      "Present technical work to a review panel",
    ],
    partners: [],
    organizer: "OrigoHOST Hackathons",
    registrationStatus: "not-open",
    status: "upcoming",
    faqs: [
      { question: "Can I join without a team?", answer: "Yes. Team formation happens during kickoff." },
      { question: "Is there a registration fee?", answer: "Fee details are published when registration opens." },
    ],
    tags: ["hackathon", "ai"],
  },
  {
    title: "Community Meetup: Cloud & DevOps Practice",
    slug: "community-meetup-cloud-devops-practice",
    summary: "An open meetup on delivery pipelines, infrastructure practice and operational habits.",
    description:
      "A member-led meetup where two short talks are followed by open discussion on delivery pipelines, environment management and the operational habits that keep teams shipping safely.",
    category: "DevOps",
    audience: ["Developers", "Professionals"],
    date: "2026-08-22",
    time: "18:30 – 20:00 IST",
    mode: "online",
    location: "Online",
    speakers: [],
    agenda: [
      { time: "18:30", title: "Two member talks" },
      { time: "19:15", title: "Open discussion" },
    ],
    topics: ["CI/CD", "Environments", "Operations"],
    whoShouldAttend: ["Developers", "Platform and infrastructure engineers"],
    learningOutcomes: ["Compare delivery practices across teams", "Meet members working in the same domain"],
    partners: [],
    organizer: "OrigoHOST Community",
    registrationStatus: "closed",
    status: "live",
    faqs: [{ question: "Can I speak at a meetup?", answer: "Yes — submit a proposal through the contact form." }],
    tags: ["meetup", "devops"],
  },
  {
    title: "Knowledge Sharing Series: Open Source Contribution Paths",
    slug: "knowledge-sharing-open-source-contribution-paths",
    summary: "How to find, scope and land a first meaningful open source contribution.",
    description:
      "A working session on choosing a project, reading a codebase, scoping a first issue and communicating with maintainers. Participants leave with a shortlist of issues to work on.",
    category: "Open Source",
    audience: ["Students", "Developers"],
    date: "2026-07-18",
    time: "19:00 – 20:15 IST",
    mode: "online",
    location: "Online",
    speakers: [],
    agenda: [
      { time: "19:00", title: "Choosing a project that fits your goals" },
      { time: "19:30", title: "Reading an unfamiliar codebase" },
      { time: "20:00", title: "Working with maintainers" },
    ],
    topics: ["Open source", "Codebase reading", "Contribution etiquette"],
    whoShouldAttend: ["First-time contributors", "Students building a public portfolio"],
    learningOutcomes: ["A shortlist of issues to contribute to", "A repeatable contribution workflow"],
    partners: [],
    organizer: "OrigoHOST Open Source",
    registrationStatus: "closed",
    status: "past",
    faqs: [],
    tags: ["open-source", "knowledge-sharing"],
    report: {
      overview:
        "The session covered how to select projects, read unfamiliar code and scope a first issue. Participants left with a shortlist of issues and a contribution workflow.",
      participants: null,
      keyDiscussions: [
        "Choosing projects by domain interest rather than popularity",
        "Reading tests before reading implementation",
        "Writing issue comments that maintainers can act on",
      ],
      outcomes: [
        "A shared contribution checklist published in Resources",
        "A community shortlist of beginner-friendly repositories",
      ],
      gallery: [{ caption: "Session recording stills — gallery pending upload." }],
      recordings: [{ label: "Session recording — publishing pending" }],
      presentations: [{ label: "Contribution paths deck — publishing pending" }],
      certificates: "Participation certificates were issued to attendees who completed the session.",
    },
  },
  {
    title: "Career Session: Engineering Portfolios That Get Read",
    slug: "career-session-engineering-portfolios",
    summary: "What reviewers actually look for in a student or early-career engineering portfolio.",
    description:
      "A career-track session on structuring projects, writing readable documentation and presenting work so that reviewers can evaluate it in minutes.",
    category: "Career",
    audience: ["Students", "Developers"],
    date: "2026-06-14",
    time: "18:00 – 19:15 IST",
    mode: "online",
    location: "Online",
    speakers: [],
    agenda: [
      { time: "18:00", title: "How reviewers scan a portfolio" },
      { time: "18:30", title: "Documenting a project well" },
      { time: "19:00", title: "Q&A" },
    ],
    topics: ["Portfolios", "Technical writing", "Interviews"],
    whoShouldAttend: ["Students", "Early-career developers"],
    learningOutcomes: ["A portfolio structure you can apply the same week"],
    partners: [],
    organizer: "OrigoHOST Career Development",
    registrationStatus: "closed",
    status: "past",
    faqs: [],
    tags: ["career"],
    report: {
      overview:
        "Attendees reviewed portfolio structure, project documentation and how technical work is evaluated during hiring.",
      participants: null,
      keyDiscussions: ["Depth over volume in project selection", "README quality as a hiring signal"],
      outcomes: ["A portfolio review checklist published in Resources"],
      gallery: [{ caption: "Gallery pending upload." }],
      recordings: [{ label: "Session recording — publishing pending" }],
      presentations: [],
    },
  },
];

export const eventCategories = [
  "AI",
  "Cloud",
  "Cybersecurity",
  "DevOps",
  "Software Engineering",
  "Robotics",
  "Career",
  "Entrepreneurship",
  "Research",
  "Community",
  "Open Source",
];

export const eventAudiences = ["Students", "Developers", "Professionals", "Researchers", "Founders"];

export function getEventBySlug(slug: string) {
  return events.find((event) => event.slug === slug);
}

export function sortedEvents(status?: string) {
  const list = status && status !== "all" ? events.filter((e) => e.status === status) : [...events];
  return list.sort((a, b) => (a.date < b.date ? 1 : -1));
}
