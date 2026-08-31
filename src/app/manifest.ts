import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'OrigoHOST — Where Builders Become Innovators',
    short_name: 'OrigoHOST',
    description:
      'OrigoHOST is an enterprise-grade developer ecosystem and community platform bridging the gap between learning technology and building production systems.',
    start_url: '/',
    display: 'standalone',
    background_color: '#07101f',
    theme_color: '#07101f',
    icons: [
      {
        src: '/images/brand/origohost_monogram_transparent.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/images/brand/origohost_transparent.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
