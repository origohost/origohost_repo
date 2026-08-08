import type { Partner, Person, Testimonial } from "./types";

/** Leadership. Structural placeholders — replace with official profiles. */
export const leadership: Person[] = [
  {
    name: "Founder & President",
    role: "Founder & President",
    organization: "OrigoHOST",
    bio: "Leads the direction of the community, program standards and long-term ecosystem strategy. Official profile pending publication.",
  },
  {
    name: "Co-Founder & Community Director",
    role: "Co-Founder & Community Director",
    organization: "OrigoHOST",
    bio: "Responsible for community growth, chapters, membership pathways and member experience. Official profile pending publication.",
  },
  {
    name: "Programs Lead",
    role: "Programs Lead",
    organization: "OrigoHOST",
    bio: "Owns program design, speaker review and delivery quality across every track. Role open for appointment.",
  },
  {
    name: "Partnerships Lead",
    role: "Partnerships Lead",
    organization: "OrigoHOST",
    bio: "Manages academic, industry and community partnerships. Role open for appointment.",
  },
];

/** Partner ecosystem. `placeholder` entries render as open slots, never as claims. */
export const partners: Partner[] = [
  {
    name: "Academic partner slot",
    type: "Academic",
    description: "Universities and colleges hosting chapters, workshops and student programs.",
    status: "placeholder",
  },
  {
    name: "Industry partner slot",
    type: "Industry",
    description: "Companies contributing speakers, mentors, challenges and program support.",
    status: "placeholder",
  },
  {
    name: "Community partner slot",
    type: "Community",
    description: "Technology communities collaborating on joint events and cross-promotion.",
    status: "placeholder",
  },
  {
    name: "Knowledge partner slot",
    type: "Knowledge",
    description: "Content, curriculum and research collaborators supporting learning tracks.",
    status: "placeholder",
  },
  {
    name: "Technology partner slot",
    type: "Technology",
    description: "Platform and tooling providers supporting labs, hackathons and infrastructure.",
    status: "placeholder",
  },
  {
    name: "Hiring partner slot",
    type: "Hiring",
    description: "Organisations recruiting from the community through structured programs.",
    status: "placeholder",
  },
];

export const partnershipModels = [
  {
    title: "Industry Partner",
    description: "Contribute speakers, mentors and real-world challenges to community programs.",
  },
  { title: "Academic Partner", description: "Host chapters, workshops and student-facing programs on campus." },
  { title: "Community Partner", description: "Co-host events and share audiences with aligned communities." },
  { title: "Knowledge Partner", description: "Collaborate on curriculum, content and research output." },
  { title: "Hiring Partner", description: "Access community talent through transparent, structured pathways." },
  { title: "Technology Partner", description: "Provide platforms and tooling for labs, builds and hackathons." },
  { title: "Program Sponsor", description: "Support a named program or event series with defined visibility." },
];

export const partnershipProcess = [
  { step: "01", title: "Introduction", description: "Share your organisation, goals and the audience you want to reach." },
  { step: "02", title: "Alignment", description: "We map your goals to the programs where they create real value." },
  { step: "03", title: "Agreement", description: "Scope, deliverables, visibility and timelines are documented." },
  { step: "04", title: "Delivery", description: "We run the program with your team and the community." },
  { step: "05", title: "Impact report", description: "You receive a documented outcome report after delivery." },
];

/** Member stories. Only published once the member has approved the quote. */
export const testimonials: Testimonial[] = [];

export const testimonialsNote =
  "Member stories are published only after the member reviews and approves their quote. The first stories go live after the 2026 program cycle.";
