export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  COMMUNITY: '/community',
  EVENTS: '/events',
  PROGRAMS: '/programs',
  RESOURCES: '/resources',
  PARTNERS: '/partners',
  SPONSORS: '/sponsors',
  TEAM: '/team',
  CONTACT: '/contact',
  JOIN: '/join',
  BLOG: '/blog',
  GALLERY: '/gallery',
  FAQ: '/faq',
  SEARCH: '/search',
  SITEMAP: '/sitemap',
  PRIVACY_POLICY: '/privacy-policy',
  TERMS: '/terms',
  event: (slug: string) => `/events/${slug}`,
  program: (slug: string) => `/programs/${slug}`,
  article: (slug: string) => `/blog/${slug}`,
} as const;

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://origohost.com';
export const SITE_NAME = 'OrigoHOST';
export const SITE_TAGLINE = 'Where Builders Become Innovators';
export const SITE_DESCRIPTION =
  'OrigoHOST is a technology and community ecosystem bridging the gap between learning technology and building with it. Workshops, hackathons, training programs and open community across India.';
