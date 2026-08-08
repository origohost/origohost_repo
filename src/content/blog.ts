import type { BlogPost } from "./types";

export const blogPosts: BlogPost[] = [
  {
    title: "Why OrigoHOST starts with people, not platforms",
    slug: "why-origohost-starts-with-people",
    category: "Editorial",
    excerpt:
      "Technology communities fail when they optimise for attendance instead of capability. Here is the standard we are holding ourselves to.",
    author: "OrigoHOST Editorial",
    authorRole: "Community",
    date: "2026-08-02",
    readingTime: "6 min",
    tags: ["community", "editorial"],
    body: [
      "Most technology communities are measured by the size of a registration list. That number says nothing about whether anyone learned something they could use the following week.",
      "OrigoHOST is built around a different measurement: what members can do after a program that they could not do before. That standard changes how sessions are designed. It pushes us towards labs instead of lectures, checklists instead of slogans, and public write-ups instead of private notes.",
      "It also changes what we publish. Every event ends with a report — what was covered, what came out of it, what is available afterwards. If a program did not produce an outcome worth documenting, that is a signal to redesign it rather than repeat it.",
      "The community is the product. Programs, events, chapters and resources exist to serve the people inside it, and that ordering will not change as OrigoHOST grows.",
    ],
  },
  {
    title: "Learning in public: the case for community write-ups",
    slug: "learning-in-public-community-write-ups",
    category: "Community",
    excerpt:
      "A short technical write-up compounds far more than a certificate. What we ask members to publish, and why.",
    author: "OrigoHOST Editorial",
    authorRole: "Programs",
    date: "2026-08-18",
    readingTime: "5 min",
    tags: ["writing", "learning"],
    body: [
      "Writing forces precision. When a member explains a build decision in public, the gaps in their reasoning become visible — to them first.",
      "We ask for short pieces: what problem you had, what you tried, what actually worked, what you would do differently. Three hundred words of that is more useful than a long tutorial rewritten from documentation.",
      "The second effect is compounding. A member who publishes ten small write-ups over a year has a body of evidence that no certificate can substitute for, and reviewers can evaluate it in minutes.",
    ],
  },
  {
    title: "Reading a codebase you did not write",
    slug: "reading-a-codebase-you-did-not-write",
    category: "Technology",
    excerpt: "A practical order of operations for getting oriented in unfamiliar code without drowning in it.",
    author: "OrigoHOST Open Source",
    authorRole: "Open Source",
    date: "2026-07-25",
    readingTime: "7 min",
    tags: ["open-source", "engineering"],
    body: [
      "Start at the edges. Entry points, routes and configuration tell you what the system is expected to do before you look at how it does it.",
      "Read the tests next. Tests encode the behaviour maintainers care about, and they are usually shorter and more honest than documentation.",
      "Only then follow one request or one command all the way through. Depth on a single path beats a shallow survey of the whole repository.",
      "Finally, write down what you learned in the issue you plan to work on. Maintainers respond much faster to a comment that demonstrates understanding.",
    ],
  },
  {
    title: "What we look for in a hackathon project",
    slug: "what-we-look-for-in-a-hackathon-project",
    category: "Events",
    excerpt: "Judging criteria for OrigoHOST build weekends — usefulness and evaluation over demo polish.",
    author: "OrigoHOST Hackathons",
    authorRole: "Programs",
    date: "2026-08-28",
    readingTime: "4 min",
    tags: ["hackathon", "events"],
    body: [
      "A convincing demo can hide an unusable product. Our review panels ask three questions instead: who has this problem, does the prototype actually solve part of it, and how do you know?",
      "The third question is where most projects fall down. Teams that build a small evaluation — even a spreadsheet of thirty test cases — consistently defend their work better than teams that rehearsed a script.",
      "Scope is the other differentiator. A narrow, working slice earns more credit than a broad prototype that only functions on the happy path.",
    ],
  },
  {
    title: "Building a campus chapter that outlives its founders",
    slug: "campus-chapter-that-outlives-its-founders",
    category: "Builder Stories",
    excerpt: "Chapters collapse when knowledge lives in one person's head. Documentation is the fix.",
    author: "OrigoHOST Community",
    authorRole: "Community",
    date: "2026-09-01",
    readingTime: "6 min",
    tags: ["chapters", "leadership"],
    body: [
      "Student communities have a structural problem: leadership turns over every year or two. Chapters that survive it are the ones that write things down.",
      "The OrigoHOST chapter toolkit exists for exactly that reason — event runbooks, promotion templates, report formats and handover checklists that a new team can pick up.",
      "Leadership then becomes about judgment rather than recall, and each cohort starts from where the last one finished.",
    ],
  },
  {
    title: "Research is a community activity",
    slug: "research-is-a-community-activity",
    category: "Research",
    excerpt: "Reading groups, peer review and writing cohorts make technical research accessible outside labs.",
    author: "OrigoHOST Research",
    authorRole: "Research",
    date: "2026-09-05",
    readingTime: "5 min",
    tags: ["research", "community"],
    body: [
      "Reading a difficult paper alone is slow. Reading it with six people who each caught a different detail is considerably faster and far more accurate.",
      "Our research track is deliberately low-ceremony: a paper, a shared set of notes, and a short write-up of what the group concluded.",
      "Over time those notes become a genuine resource for members entering the domain, which is the whole point.",
    ],
  },
];

export const blogCategories = [
  "Technology",
  "Community",
  "Events",
  "Career",
  "Builder Stories",
  "Research",
  "Open Source",
  "Entrepreneurship",
  "Editorial",
];

export function getPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
