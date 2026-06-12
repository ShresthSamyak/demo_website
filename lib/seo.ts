/**
 * Shared SEO / metadata helper.
 *
 * Produces a Next.js `Metadata` object with a unique title, description,
 * canonical URL, Open Graph, and Twitter Card tags. Every page builds its
 * <head> through this so the tags stay consistent. `themeColor` is exported
 * separately via the Viewport API (Next requires it there, not in Metadata).
 */
import type { Metadata, Viewport } from 'next';
import { site, absoluteUrl } from './site';

interface BuildMetadataArgs {
  /** Page title (without the site-name suffix). */
  title: string;
  /** Meta description; falls back to the site description. */
  description?: string;
  /** Path for the canonical + OG URL, e.g. "/philosophy/". */
  path?: string;
  /** Override the social share image path. */
  image?: string;
  /** "article" for essays, "website" otherwise. */
  type?: 'website' | 'article';
}

export function buildMetadata({
  title,
  description = site.description,
  path = '/',
  image = site.ogImage,
  type = 'website',
}: BuildMetadataArgs): Metadata {
  // Home shows just the site name; inner pages get "Page — Human Instinct".
  const fullTitle = path === '/' ? `${site.name} — ${site.tagline}` : `${title} — ${site.name}`;
  const canonical = absoluteUrl(path);
  const ogImageUrl = absoluteUrl(image);

  return {
    metadataBase: new URL(site.url),
    title: fullTitle,
    description,
    alternates: { canonical },
    openGraph: {
      type,
      title: fullTitle,
      description,
      url: canonical,
      siteName: site.name,
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: site.name }],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImageUrl],
    },
  };
}

/** Shared viewport (theme-color). Re-exported by the root layout. */
export const viewport: Viewport = {
  themeColor: site.themeColor,
  colorScheme: 'light',
};
