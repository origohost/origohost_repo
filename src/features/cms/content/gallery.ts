import type { GalleryContent } from "../types";

export const galleryContent: GalleryContent = {
  meta: {
    slug: "gallery",
    title: "Gallery",
    description: "Moments from OrigoHOST meetups, hackathons, and community events across India.",
    eyebrow: "Gallery",
    heroTitle: "Moments from the community",
    heroDescription: "Photos and video from meetups, hackathons, and workshops across India.",
  },
  albums: [
    {
      id: "g1",
      category: "MEETUP",
      title: "Bengaluru Cloud Meetup",
      tone: "from-orange-500/40 to-amber-500/20",
      count: 42,
    },
    {
      id: "g2",
      category: "HACK",
      title: "Origo Infra Hackathon '25",
      tone: "from-purple-500/40 to-pink-500/20",
      count: 128,
    },
    {
      id: "g3",
      category: "SUMMIT",
      title: "Origo Summit '25",
      tone: "from-emerald-500/40 to-teal-500/20",
      count: 96,
    },
    {
      id: "g4",
      category: "WORKSHOP",
      title: "Kubernetes Bootcamp",
      tone: "from-indigo-500/40 to-blue-500/20",
      count: 34,
    },
    {
      id: "g5",
      category: "NETWORK",
      title: "Operators Roundtable",
      tone: "from-rose-500/40 to-pink-500/20",
      count: 28,
    },
    {
      id: "g6",
      category: "CAMPUS",
      title: "Ambassador Program",
      tone: "from-yellow-500/40 to-orange-500/20",
      count: 51,
    },
    {
      id: "g7",
      category: "BUILD",
      title: "Chaos Engineering Day",
      tone: "from-cyan-500/40 to-blue-500/20",
      count: 22,
    },
    {
      id: "g8",
      category: "CULTURE",
      title: "Team Collaboration",
      tone: "from-fuchsia-500/40 to-purple-500/20",
      count: 18,
    },
  ],
};
