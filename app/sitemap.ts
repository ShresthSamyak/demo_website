/**
 * sitemap.xml — generated from the route list at build time.
 *
 * Under `output: 'export'` Next writes this to /out/sitemap.xml as a static
 * file (no runtime needed).
 */
import type { MetadataRoute } from 'next';
import { getAllEssayMeta } from '@/lib/essays';
import { absoluteUrl } from '@/lib/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: absoluteUrl('/'), lastModified: now, changeFrequency: 'monthly', priority: 1 },
    { url: absoluteUrl('/about/'), lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
  ];

  const essayRoutes: MetadataRoute.Sitemap = getAllEssayMeta().map((e) => ({
    url: absoluteUrl(`/${e.slug}/`),
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [...staticRoutes, ...essayRoutes];
}
