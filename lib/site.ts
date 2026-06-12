/**
 * Site-wide configuration and constants.
 *
 * `url` is the production origin used to build canonical + Open Graph URLs and
 * the sitemap. Override it at build time with NEXT_PUBLIC_SITE_URL (e.g. in
 * Vercel/Netlify env settings) so previews and production resolve correctly.
 */
export const site = {
  name: 'Human Instinct',
  /** Short tagline shown under the masthead. */
  tagline: 'A Quantitative Income Fund',
  /** One-line description used as the default SEO/OG description. */
  description:
    'Human Instinct — a quantitative covered-call income fund. A long-form thesis on compounding through income, the AI infrastructure buildout, and human judgment in markets.',
  /** Production origin, no trailing slash. */
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://humaninstinct.fund').replace(/\/$/, ''),
  /** Author / byline shown on the introduction. */
  author: 'Human Instinct',
  /** Publication date shown in the author/date line (ISO + display form). */
  publishedISO: '2026-06-13',
  publishedDisplay: 'June 2026',
  /** Default social share image (placeholder lives in /public; swap for a 1200x630 PNG). */
  ogImage: '/og-image.svg',
  /** Theme color for the browser chrome (matches paper-white background). */
  themeColor: '#FCFCFA',
  /** Path to the downloadable full-thesis PDF placeholder in /public. */
  pdfPath: '/human-instinct.pdf',
} as const;

/** Absolute URL helper — joins a path onto the configured origin. */
export function absoluteUrl(path = '/'): string {
  return `${site.url}${path.startsWith('/') ? path : `/${path}`}`;
}
