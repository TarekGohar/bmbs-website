import type { MetadataRoute } from 'next'

const SITE_URL = 'https://brahmmauer.com'
const LOCALES = ['en', 'fr'] // Supported locales

const staticPages = [
  '/about',
  '/book-now',
  '/book-now/success',
  '/espace-mila',
  '/services',
  '/services/corporate',
  '/services/festivals',
  '/services/fundraisers',
  '/services/private',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  const localizedUrls = staticPages.flatMap((page) =>
    LOCALES.map((locale) => ({
      url: `${SITE_URL}/${locale}${page}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: page === '/' ? 1.0 : 0.8,
    }))
  )

  // Include the homepage separately
  const homePages = LOCALES.map((locale) => ({
    url: `${SITE_URL}/${locale}`,
    lastModified,
    changeFrequency: 'yearly' as const,
    priority: 1,
  }))

  return [...homePages, ...localizedUrls]
}
