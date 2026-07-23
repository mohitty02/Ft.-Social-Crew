import type { MetadataRoute } from 'next'
import { site } from '@/config/site'

/**
 * robots.txt — SRS §7.5: "Global, with per-path disallow rules for landing
 * pages".
 *
 * /lp/ is disallowed because campaign landing pages are noindex by default
 * (SRS §3.1, §3.4). They also carry a noindex meta tag; both are present
 * deliberately, since robots disallow alone does not prevent indexing of a URL
 * discovered through a link.
 */
// Required by `output: 'export'` — this file is emitted at build time.
export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/*/lp/'],
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  }
}
