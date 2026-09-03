import type { AboutContent } from "../types";

export const aboutContent: AboutContent = {
  meta: {
    slug: "about",
    title: "About OrigoHOST — Technology Community & Event Ecosystem",
    description:
      "OrigoHOST brings together students, developers, engineers, researchers, founders, educators, and technology enthusiasts across India.",
    eyebrow: "Our Story",
    heroTitle: "About OrigoHOST",
    heroDescription:
      "A Technology Community Where Ideas, People & Possibilities Connect across technology domains and real-world industries.",
  },

  storyEyebrow: "Our Purpose",
  storyTitle: "Connecting Ideas, People & Possibilities",
  storyBody:
    "OrigoHOST is a technology community and event ecosystem connecting students, developers, engineers, researchers, founders, educators, professionals, and technology enthusiasts. Through meetups, hackathons, ideathons, workshops, and webinars, OrigoHOST bridges technology domains with real-world industry challenges across India. Led by founder Ritik Kumar and community director Tarun Kumar, OrigoHOST creates an open space where people discover, learn, discuss, compete, collaborate, and build.",

  purpose: {
    mission: {
      title: "Our Mission",
      body: "To create an open technology ecosystem where people can access knowledge, develop practical skills, collaborate with peers, and turn ideas into real-world solutions across industries.",
      stats: [
        { value: "15K+", label: "Learners reached" },
        { value: "75+", label: "Colleges" },
      ],
    },
    vision: {
      title: "Our Vision",
      body: "A future where access to technology, knowledge, mentorship, and community opportunity is open to everyone shaping the digital and physical world.",
      stats: [
        { value: "2030", label: "Target year", caption: "" },
        { value: "500K+", label: "Ecosystem goal" },
      ],
    },
  },

  timeline: [
    {
      year: "2024",
      title: "Foundation & Community Launch",
      body: "OrigoHOST was established with a vision to connect developer talent with real-world industry challenges through open events and hands-on workshops.",
      icon: "Rocket",
      accent: "orange",
    },
    {
      year: "2025",
      title: "Pan-India Expansion",
      body: "Expanded campus chapters across 75+ institutions and launched hackathons, ideathons, and knowledge-sharing series (KSS).",
      icon: "Handshake",
      accent: "green",
    },
    {
      year: "2026",
      title: "Multidimensional Ecosystem",
      body: "Pioneered the Event Format × Technology Domain × Industry taxonomy framework, empowering thousands of builders across India.",
      icon: "Award",
      accent: "yellow",
    },
  ],

  values: [
    {
      icon: "Heart",
      title: "Community First",
      body: "Everything we build starts with our members. Their growth and collaboration drive our success.",
      accent: "orange",
    },
    {
      icon: "Lightbulb",
      title: "Innovation",
      body: "We push boundaries and explore new frontiers across AI, Cloud, Cybersecurity, DevOps, and Emerging Tech.",
      accent: "yellow",
    },
    {
      icon: "Users",
      title: "Inclusivity",
      body: "Great technical knowledge and opportunities should be accessible to every builder regardless of background.",
      accent: "green",
    },
    {
      icon: "Rocket",
      title: "Excellence",
      body: "We strive for the highest quality in workshops, hackathons, mentorship, and community experiences.",
      accent: "orange",
    },
    {
      icon: "Shield",
      title: "Integrity",
      body: "Transparency and authenticity guide all our partnerships, initiatives, and community interactions.",
      accent: "blue",
    },
    {
      icon: "Globe",
      title: "Impact",
      body: "Creating lasting real-world change in India's technology ecosystem and emerging industries.",
      accent: "green",
    },
  ],

  numbers: [
    { value: "15K+", label: "Developers & Learners", caption: "Community members" },
    { value: "75+", label: "Colleges & Institutions", caption: "Campus network" },
    { value: "35+", label: "Community Meetups", caption: "Offline gatherings" },
    { value: "120+", label: "Workshops & Sessions", caption: "Learning experiences" },
    { value: "18", label: "States Covered", caption: "Pan-India footprint" },
    { value: "50+", label: "Project Collaborations", caption: "Open-source & startups" },
  ],

  ctas: [
    { label: "Explore Events", href: "/events", variant: "primary" },
    { label: "Get in Touch", href: "/contact", variant: "outline" },
  ],
};
