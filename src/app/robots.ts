import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api'], // Adjust disallowed paths as needed
      },
    ],
    sitemap: 'https://brahmmauer.com/sitemap.xml',
  }
}
