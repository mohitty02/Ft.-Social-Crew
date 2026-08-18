import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // NOTE — `output: 'export'` was removed deliberately (SRS §21.4 said static,
  // no server runtime). IP-based market routing needs the visitor's country at
  // request time, and static export disables middleware entirely, so there is
  // no way to have both. Every page is still prerendered at build time via
  // generateStaticParams — the only thing that runs per-request is the edge
  // middleware on `/`. See middleware.ts.

  // SRS §3.2 URL patterns all end in a trailing slash (/en-us/seo-services/).
  trailingSlash: true,

  // Stock imagery is served from the Unsplash CDN, already width/quality
  // negotiated via the query string in src/config/media.ts, so the optimiser
  // would only add a hop.
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      // Client-supplied imagery uploaded through the CMS.
      { protocol: 'https', hostname: 'lightseagreen-squirrel-340384.hostingersite.com' },
    ],
  },

  reactStrictMode: true,
  poweredByHeader: false,

  eslint: { ignoreDuringBuilds: true },

  // The www → apex redirect deliberately lives in middleware.ts, not here — a
  // `redirects()` rule rebuilds the path from a `:path*` capture and loses the
  // trailing slash, turning one hop into three.
}

export default nextConfig
