import type { ContactContent } from "../types";

export const contactContent: ContactContent = {
  meta: {
    slug: "contact",
    title: "Contact OrigoHOST | Technology Community",
    description:
      "Get in touch with OrigoHOST Community — partnerships, events, press, and general enquiries.",
    eyebrow: "Contact",
    heroTitle: "Let's build the future of hosting together",
    heroDescription:
      "Partnerships, events, press, or general enquiries — reach out and our team responds within two business days.",
  },
  responseTime: "Typically replies within 24 hours",
  channels: [
    {
      icon: "Headphones",
      eyebrow: "Support",
      title: "Contact a Specialist",
      body: "Get guidance on workshops, bootcamps, cloud sessions, and general enquiries.",
      cta: { label: "Contact us", href: "#contact-form" },
      accent: "orange",
    },
    {
      icon: "Users",
      eyebrow: "Community",
      title: "Community / Campus Events",
      body: "Host OrigoHOST events at your college, run student initiatives, or organize workshops.",
      cta: { label: "Contact us", href: "#contact-form" },
      accent: "blue",
    },
    {
      icon: "Handshake",
      eyebrow: "Partnerships",
      title: "Partnership Inquiry Centre",
      body: "Explore collaboration opportunities for brands, institutions, and long-term partnerships.",
      cta: { label: "Become a partner", href: "/partners" },
      accent: "green",
    },
    {
      icon: "Building2",
      eyebrow: "Enterprise",
      title: "Enterprise / Custom Programs",
      body: "Custom cloud & platform programs, large-scale initiatives, and corporate training solutions.",
      cta: { label: "Contact us", href: "#contact-form" },
      accent: "purple",
    },
  ],
  offices: [
    {
      id: "office-blr",
      kind: "Headquarters",
      city: "Bengaluru",
      country: "India",
      address:
        "WeWork Prestige Central, Ground Floor, 36 Infantry Road, Bengaluru, Karnataka 560001",
      email: "origohostscommunity@gmail.com",
      phone: "+91 90000 00000",
      mapsUrl: "https://maps.google.com/?q=WeWork+Prestige+Central+Bengaluru",
    },
    {
      id: "office-mum",
      kind: "Creative Studio",
      city: "Mumbai",
      country: "India",
      address:
        "WeWork Enam Sambhav, C-20, G Block BKC, Bandra Kurla Complex, Bandra East, Mumbai 400051",
      email: "origohostscommunity@gmail.com",
      phone: "+91 93546 25765",
      mapsUrl: "https://maps.google.com/?q=WeWork+Enam+Sambhav+Mumbai",
    },
  ],
  formTitle: "Build Something",
  formAccentWord: "Extraordinary Together",
  formDescription:
    "Whether you're hosting a cloud event, planning a workshop, or exploring ideas — drop us a message. We're always up for meaningful conversations.",
  formNote: "We typically respond within 24–48 hours",
  socials: [
    {
      icon: "Briefcase",
      label: "LinkedIn",
      handle: "origohost",
      href: "https://www.linkedin.com/company/origohost",
    },
    {
      icon: "InstagramIcon",
      label: "Instagram",
      handle: "@origohost",
      href: "https://www.instagram.com/origohost?igsh=MWgxOWdhM2F1MGliMw==",
    },
    {
      icon: "Mail",
      label: "Email",
      handle: "origohostscommunity@gmail.com",
      href: "mailto:origohostscommunity@gmail.com",
    },
    {
      icon: "WhatsAppIcon",
      label: "WhatsApp",
      handle: "OrigoHOST",
      href: "https://wa.me/919354625765",
    },
  ],
};
