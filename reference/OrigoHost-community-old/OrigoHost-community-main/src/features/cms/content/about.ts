import type { AboutContent } from "../types";

export const aboutContent: AboutContent = {
  meta: {
    slug: "about",
    title: "About OrigoHOST | OrigoHOST Tech Community",
    description:
      "OrigoHOST, also known as OrigoHOST Tech Community, is an India-based technology community for developers, students, and professionals.",
    eyebrow: "Our Story",
    heroTitle: "About OrigoHOST",
    heroDescription:
      "More than a community — a movement empowering India's next generation of infrastructure and platform engineers.",
  },

  storyEyebrow: "Our Purpose",
  storyTitle: "Driving Infra Innovation in India",
  storyBody:
    "OrigoHOST, also known as OrigoHOST Tech Community, is an India-based technology community focused on helping students, developers, and professionals learn, build, collaborate, and grow. We operate programs covering modern hosting, cloud technologies, DevOps, and AI. Through hands-on workshops, national-level hackathons, and community meetups, we connect our members with the skills and networks needed to excel. Led by founder Ritik Kumar, our official presence spans across platforms to empower India's next generation of infrastructure and platform engineers.",

  purpose: {
    mission: {
      title: "Our Mission",
      body: "To democratize infrastructure education across India by providing accessible resources, hands-on workshops, and real-world opportunities for the next generation of operators.",
      stats: [
        { value: "90K+", label: "Students reached" },
        { value: "500+", label: "Colleges" },
      ],
    },
    vision: {
      title: "Our Vision",
      body: "To establish India as a global leader in platform engineering by nurturing a thriving ecosystem of creators, SREs, and infrastructure entrepreneurs.",
      stats: [
        { value: "2030", label: "Target year", caption: "" },
        { value: "1M+", label: "Goal members" },
      ],
    },
  },

  timeline: [
    {
      year: "2022",
      title: "The Inception",
      body: "OrigoHOST was born with a vision to democratize hosting and infrastructure education in India.",
      icon: "Rocket",
      accent: "orange",
    },
    {
      year: "2023",
      title: "Strategic Alliances",
      body: "Partnered with global cloud leaders to bring world-class curriculum to Indian students and operators.",
      icon: "Handshake",
      accent: "green",
    },
    {
      year: "2024",
      title: "National Impact",
      body: "Collaborated with the Ministry of Education and AICTE to standardize platform engineering skills across universities.",
      icon: "Award",
      accent: "yellow",
    },
    {
      year: "2025",
      title: "Community at Scale",
      body: "Crossed 90,000+ members across 20+ cities with meetups, hackathons, and ambassador chapters.",
      icon: "Users",
      accent: "blue",
    },
  ],

  values: [
    {
      icon: "Heart",
      title: "Community First",
      body: "Everything we build starts with our members. Their growth is our success.",
      accent: "orange",
    },
    {
      icon: "Lightbulb",
      title: "Innovation",
      body: "We push boundaries and explore new frontiers in cloud, edge, and platform engineering.",
      accent: "yellow",
    },
    {
      icon: "Users",
      title: "Inclusivity",
      body: "Great infrastructure knowledge should be accessible to every student, regardless of background.",
      accent: "green",
    },
    {
      icon: "Rocket",
      title: "Excellence",
      body: "We strive for the highest quality in workshops, content, and community experiences.",
      accent: "orange",
    },
    {
      icon: "Shield",
      title: "Integrity",
      body: "Transparency and honesty guide all our partnerships and interactions.",
      accent: "blue",
    },
    {
      icon: "Globe",
      title: "Impact",
      body: "Creating lasting change in India's technology landscape and beyond.",
      accent: "green",
    },
  ],

  numbers: [
    { value: "90K+", label: "Community Members", caption: "Operators across India" },
    { value: "500+", label: "Partner Colleges", caption: "Educational institutions" },
    { value: "100+", label: "Events Organized", caption: "Workshops & meetups" },
    { value: "50+", label: "Hackathons", caption: "Innovation challenges" },
    { value: "18", label: "States Covered", caption: "Pan-India presence" },
    { value: "200+", label: "Industry Partners", caption: "Corporate collaborations" },
  ],

  ctas: [
    { label: "Explore Events", href: "/events", variant: "primary" },
    { label: "Get in Touch", href: "/contact", variant: "outline" },
  ],
};
