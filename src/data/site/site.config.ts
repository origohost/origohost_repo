import type { SiteConfig } from '@/types';

export const siteConfig: SiteConfig = {
  name: 'OrigoHOST',
  tagline: 'Where Builders Become Innovators',
  description:
    'OrigoHOST is a technology and community ecosystem bridging the gap between learning technology and building with it.',
  url: 'https://origohost.com',

  nav: [
    { label: 'About', href: '/about' },
    { label: 'Community', href: '/community' },
    { label: 'Events', href: '/events' },
    { label: 'Programs', href: '/programs' },
    { label: 'Resources', href: '/resources' },
    {
      label: 'More',
      href: '#',
      children: [
        { label: 'Partners', href: '/partners' },
        { label: 'Sponsors', href: '/sponsors' },
        { label: 'Team', href: '/team' },
        { label: 'Blog & News', href: '/blog' },
        { label: 'Gallery', href: '/gallery' },
        { label: 'FAQ', href: '/faq' },
        { label: 'Contact', href: '/contact' },
      ],
    },
  ],

  footerNav: [
    {
      heading: 'Explore',
      links: [
        { label: 'About', href: '/about' },
        { label: 'Community', href: '/community' },
        { label: 'Events', href: '/events' },
        { label: 'Programs', href: '/programs' },
        { label: 'Resources', href: '/resources' },
      ],
    },
    {
      heading: 'Ecosystem',
      links: [
        { label: 'Partners', href: '/partners' },
        { label: 'Sponsors', href: '/sponsors' },
        { label: 'Team', href: '/team' },
        { label: 'Blog & News', href: '/blog' },
        { label: 'Gallery', href: '/gallery' },
      ],
    },
    {
      heading: 'Connect',
      links: [
        { label: 'Contact', href: '/contact' },
        { label: 'Join / Get Involved', href: '/join' },
        { label: 'FAQ', href: '/faq' },
      ],
    },
    {
      heading: 'Legal',
      links: [
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms & Conditions', href: '/terms' },
        { label: 'Sitemap', href: '/sitemap' },
      ],
    },
  ],

  social: [
    { platform: 'LinkedIn', href: 'https://linkedin.com/company/origohost', label: 'OrigoHOST on LinkedIn' },
    { platform: 'Instagram', href: 'https://instagram.com/origohost', label: 'OrigoHOST on Instagram' },
    { platform: 'Twitter', href: 'https://twitter.com/origohost', label: 'OrigoHOST on Twitter / X' },
    { platform: 'GitHub', href: 'https://github.com/origohost', label: 'OrigoHOST on GitHub' },
    { platform: 'YouTube', href: 'https://youtube.com/@origohost', label: 'OrigoHOST on YouTube' },
  ],
};
