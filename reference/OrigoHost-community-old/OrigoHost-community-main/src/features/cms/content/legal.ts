import type { LegalContent } from "../types";

export const privacyContent: LegalContent = {
  meta: {
    slug: "privacy",
    title: "Privacy Policy",
    description:
      "How OrigoHOST Community collects, uses, and safeguards your personal information.",
    eyebrow: "Legal",
    heroTitle: "Privacy Policy",
    heroDescription:
      "This page explains how we handle personal information across the OrigoHOST platform.",
  },
  updated: "Recently updated",
  sections: [
    {
      title: "1. Information we collect",
      body: "We collect information you provide when you register, join events, apply for jobs, or contact us — such as your name, email, organization, and any messages you send.",
    },
    {
      title: "2. How we use information",
      body: "To deliver community services, personalize event and job recommendations, send transactional and product communication, and improve the platform.",
    },
    {
      title: "3. Sharing",
      body: "We do not sell personal information. We share limited data with partners strictly to deliver services you've requested (e.g. event registration confirmations).",
    },
    {
      title: "4. Data security",
      body: "We follow industry-standard controls appropriate to the sensitivity of the data. No system is perfectly secure — you can help by using a strong password.",
    },
    {
      title: "5. Your rights",
      body: "You can request access, correction, or deletion of your personal information by contacting us via the Contact page.",
    },
    {
      title: "6. Changes to this policy",
      body: "We may update this policy. Material changes will be announced on the platform.",
    },
  ],
};

export const termsContent: LegalContent = {
  meta: {
    slug: "terms",
    title: "Terms & Conditions",
    description: "The terms governing your use of the OrigoHOST Community platform.",
    eyebrow: "Legal",
    heroTitle: "Terms & Conditions",
    heroDescription: "These terms govern your use of OrigoHOST services and community programs.",
  },
  updated: "Recently updated",
  sections: [
    {
      title: "1. Acceptance",
      body: "By using OrigoHOST, you agree to these terms. If you don't agree, please don't use the platform.",
    },
    {
      title: "2. Community conduct",
      body: "Be respectful. Harassment, discrimination, spamming, and abusive behavior are not welcome and will lead to removal from the community.",
    },
    {
      title: "3. Content",
      body: "You retain ownership of content you post. You grant OrigoHOST a non-exclusive license to display it within the platform.",
    },
    {
      title: "4. Events",
      body: "Event registration is subject to individual event terms, including capacity and eligibility.",
    },
    {
      title: "5. Termination",
      body: "We may suspend or terminate accounts that violate these terms.",
    },
    { title: "6. Contact", body: "Questions about these terms? Reach out via the Contact page." },
  ],
};

export const refundContent: LegalContent = {
  meta: {
    slug: "refund",
    title: "Refund Policy",
    description: "OrigoHOST refund policy for paid workshops, bootcamps, and events.",
    eyebrow: "Legal",
    heroTitle: "Refund Policy",
    heroDescription: "Applies to paid programs — workshops, bootcamps, and ticketed events.",
  },
  updated: "Recently updated",
  sections: [
    {
      title: "1. Eligibility",
      body: "Refund requests must be submitted at least 7 days before the program start date.",
    },
    {
      title: "2. Process",
      body: "Email us with your order details. Approved refunds are issued to the original payment method within 7–10 business days.",
    },
    {
      title: "3. Exceptions",
      body: "Certain programs marked as non-refundable at checkout are not eligible.",
    },
  ],
};

export const cookiesContent: LegalContent = {
  meta: {
    slug: "cookies",
    title: "Cookies Policy",
    description: "How OrigoHOST uses cookies and similar technologies on the platform.",
    eyebrow: "Legal",
    heroTitle: "Cookies Policy",
    heroDescription: "Small text files that help us keep you signed in and improve the experience.",
  },
  updated: "Recently updated",
  sections: [
    {
      title: "1. What are cookies",
      body: "Cookies are small files stored on your device that help websites remember you and your preferences.",
    },
    {
      title: "2. How we use them",
      body: "For authentication, preferences (like theme), and anonymized analytics to improve the platform.",
    },
    {
      title: "3. Your choices",
      body: "You can manage cookies in your browser settings. Disabling certain cookies may impact functionality.",
    },
  ],
};
