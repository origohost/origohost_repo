import type { Metadata } from 'next';
import { Inter, Montserrat } from 'next/font/google';
import '@/styles/globals/globals.css';
import { Header } from '@/components/navigation/Header';
import { Footer } from '@/components/navigation/Footer';
import { generateOrganizationSchema, generateWebSiteSchema } from '@/lib/schema';

// Load brand-aligned typography subsets
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'OrigoHOST — Where Builders Become Innovators',
    template: '%s — OrigoHOST',
  },
  description:
    'OrigoHOST is an enterprise-grade developer ecosystem and community platform bridging the gap between learning technology and building production systems across India.',
  metadataBase: new URL('https://origohost.com'),
  alternates: {
    canonical: '/',
  },
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/favicon/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/favicon/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  openGraph: {
    title: 'OrigoHOST — Where Builders Become Innovators',
    description:
      'OrigoHOST is an enterprise-grade developer ecosystem and community platform bridging the gap between learning technology and building production systems across India.',
    url: 'https://origohost.com',
    siteName: 'OrigoHOST',
    images: [
      {
        url: '/images/brand/origohost_transparent.png',
        width: 1200,
        height: 630,
        alt: 'OrigoHOST Technology Ecosystem',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OrigoHOST — Where Builders Become Innovators',
    description:
      'OrigoHOST is an enterprise-grade developer ecosystem and community platform bridging the gap between learning technology and building production systems across India.',
    creator: '@origohost',
    images: ['/images/brand/origohost_transparent.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const orgSchema = generateOrganizationSchema();
  const siteSchema = generateWebSiteSchema();

  return (
    <html lang="en" suppressHydrationWarning className={`dark ${inter.variable} ${montserrat.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var stored = localStorage.getItem('theme');
                  if (stored === 'light') {
                    document.documentElement.classList.remove('dark');
                  } else {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="flex flex-col min-h-screen">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify([orgSchema, siteSchema]) }}
        />
        <Header />
        <main className="flex-grow flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
