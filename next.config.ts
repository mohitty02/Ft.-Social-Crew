import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // SRS §21.4 / brief: static frontend, no server runtime.
  output: 'export',

  // SRS §3.2 URL patterns all end in a trailing slash (/en-us/seo-services/).
  trailingSlash: true,

  // Static export cannot run the image optimiser at request time. Stock imagery
  // is served from the Unsplash CDN, already width/quality-negotiated via the
  // query string in src/config/media.ts.
  images: {
    unoptimized: true,
    remotePatterns: [{ protocol: 'https', hostname: 'images.unsplash.com' }],
  },

  reactStrictMode: true,
  poweredByHeader: false,

  eslint: { ignoreDuringBuilds: true },
}

export default nextConfig
