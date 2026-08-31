import type { FAQItem } from '@/types';

export const faqs: FAQItem[] = [
  {
    id: 'faq-01',
    category: 'General',
    question: 'What is OrigoHOST?',
    answer:
      'OrigoHOST is a technology and community ecosystem that bridges the gap between learning technology and participating in the technology ecosystem. We connect students, developers, professionals, institutions and opportunities through education, events, infrastructure and community.',
    order: 1,
    relatedLinks: [{ label: 'About OrigoHOST', url: '/about' }],
  },
  {
    id: 'faq-02',
    category: 'General',
    question: 'Where is OrigoHOST based?',
    answer:
      'OrigoHOST is an India-origin organization. Our operations span multiple cities and we work with institutions and communities across India.',
    order: 2,
    relatedLinks: [],
  },
  {
    id: 'faq-03',
    category: 'Community',
    question: 'Who can join the OrigoHOST community?',
    answer:
      'OrigoHOST is an open, participation-driven community. You do not need a formal invitation. Students, learners, developers, professionals, mentors, educators and technology enthusiasts are all welcome. You need curiosity, intent and the willingness to build.',
    order: 1,
    relatedLinks: [{ label: 'Get Involved', url: '/join' }],
  },
  {
    id: 'faq-04',
    category: 'Community',
    question: 'Does OrigoHOST have campus chapters?',
    answer:
      'Yes. OrigoHOST supports campus chapters at educational institutions. A campus chapter is an OrigoHOST ecosystem structure — it is not an independent brand. If your institution is interested in starting a chapter, contact us through the Join page.',
    order: 2,
    relatedLinks: [
      { label: 'Join / Get Involved', url: '/join' },
      { label: 'Contact', url: '/contact' },
    ],
  },
  {
    id: 'faq-05',
    category: 'Events',
    question: 'What types of events does OrigoHOST organize?',
    answer:
      'OrigoHOST organizes workshops, hackathons, webinars, meetups, training sessions, knowledge-sharing sessions, ideathons, buildathons and more. Events may be online, offline or hybrid.',
    order: 1,
    relatedLinks: [{ label: 'Browse Events', url: '/events' }],
  },
  {
    id: 'faq-06',
    category: 'Events',
    question: 'How is an event different from a program?',
    answer:
      'A **Program** is a sustained initiative or series — for example, Knowledge Sharing Series 2026. An **Event** is a single occurrence within a format — for example, KSS2026 Episode 03. Programs contain events; they are not the same thing.',
    order: 2,
    relatedLinks: [
      { label: 'Events', url: '/events' },
      { label: 'Programs', url: '/programs' },
    ],
  },
  {
    id: 'faq-07',
    category: 'Programs',
    question: 'What is the Knowledge Sharing Series (KSS2026)?',
    answer:
      'KSS2026 is OrigoHOST\'s flagship knowledge-sharing program for 2026. It is delivered as an episode-based online webinar series where technology practitioners share knowledge on specific domains — including cybersecurity, cloud computing, DevOps, AI/ML and open source.',
    order: 1,
    relatedLinks: [{ label: 'KSS2026 Program', url: '/programs/knowledge-sharing-series-2026' }],
  },
  {
    id: 'faq-08',
    category: 'Participation',
    question: 'How can I get involved with OrigoHOST?',
    answer:
      'There are several ways to participate: as an event attendee, volunteer, speaker, mentor, trainer, organizer or campus representative. Visit the Join / Get Involved page to find the pathway that fits you.',
    order: 1,
    relatedLinks: [{ label: 'Join / Get Involved', url: '/join' }],
  },
  {
    id: 'faq-09',
    category: 'Participation',
    question: 'Does OrigoHOST have formal membership tiers?',
    answer:
      'No. OrigoHOST does not operate a universal paid membership system. Community participation is open and contribution-based. The different roles (volunteer, speaker, mentor, organizer, campus rep) are participation pathways, not membership tiers.',
    order: 2,
    relatedLinks: [{ label: 'Community', url: '/community' }],
  },
  {
    id: 'faq-10',
    category: 'Partnerships',
    question: 'How can my institution collaborate with OrigoHOST?',
    answer:
      'Educational institutions can collaborate with OrigoHOST through joint events, campus chapters, knowledge programs and institutional partnerships. Reach out through our Contact page with details about your institution and your collaboration idea.',
    order: 1,
    relatedLinks: [{ label: 'Contact', url: '/contact' }],
  },
  {
    id: 'faq-11',
    category: 'Partnerships',
    question: 'How can my company become a partner?',
    answer:
      'Companies can engage with OrigoHOST as technology partners, knowledge partners, hiring partners, industry partners or strategic collaborators. The nature and scope of partnership varies — reach out to discuss what makes sense for your organization.',
    order: 2,
    relatedLinks: [
      { label: 'Partners', url: '/partners' },
      { label: 'Contact', url: '/contact' },
    ],
  },
  {
    id: 'faq-12',
    category: 'Sponsorship',
    question: 'How can I sponsor an OrigoHOST event or program?',
    answer:
      'Sponsorship opportunities are available for events, programs and the broader OrigoHOST ecosystem. Visit the Sponsors page for information, or reach out via the Contact page to discuss sponsorship.',
    order: 1,
    relatedLinks: [
      { label: 'Sponsors', url: '/sponsors' },
      { label: 'Contact', url: '/contact' },
    ],
  },
  {
    id: 'faq-13',
    category: 'Contact',
    question: 'How can I contact OrigoHOST?',
    answer:
      'You can reach us through the Contact page on this website. Select the appropriate inquiry category and submit your message. Someone from the OrigoHOST team will follow up.',
    order: 1,
    relatedLinks: [{ label: 'Contact', url: '/contact' }],
  },
  {
    id: 'faq-14',
    category: 'Policies',
    question: 'Where can I find the Privacy Policy and Terms & Conditions?',
    answer:
      'The Privacy Policy and Terms & Conditions are linked in the footer of this website and are accessible at all times.',
    order: 1,
    relatedLinks: [
      { label: 'Privacy Policy', url: '/privacy-policy' },
      { label: 'Terms & Conditions', url: '/terms' },
    ],
  },
  {
    id: 'faq-15',
    category: 'General',
    question: 'What are the six OrigoHOST ecosystem entities?',
    answer:
      'The six entities within the OrigoHOST ecosystem are: **OrigoHOST Cloud** (infrastructure and hosting), **OrigoHOST Academy** (education and training), **OrigoHOST Community** (developer network), **OrigoHOST Events** (hackathons and meetups), **OrigoHOST AI** (AI and ML research), and **OrigoHOST Dev** (open source and tooling). All are expressions of the OrigoHOST master brand.',
    order: 3,
    relatedLinks: [{ label: 'About', url: '/about' }],
  },
];
