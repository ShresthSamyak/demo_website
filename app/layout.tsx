/**
 * Root layout — wraps every page.
 *
 * - Loads the two webfonts via next/font/google (self-hosted at build time,
 *   no layout shift, no render-blocking <link>). Their CSS variables feed the
 *   --font-serif / --font-sans tokens in globals.css.
 * - Renders the skip link, sticky Header, the <main> landmark, and the Footer.
 * - Default <head> metadata is built from the shared SEO helper; pages override
 *   title/description via their own `metadata` export.
 */
import type { Metadata } from 'next';
import { Newsreader, Inter } from 'next/font/google';
import './globals.css';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getNavItems } from '@/lib/nav';
import { buildMetadata, viewport } from '@/lib/seo';
import { site } from '@/lib/site';

// Reading serif for body, headings, masthead, and nav.
// Only the weights actually used are loaded (400 body, 600 headings/title)
// plus italic for emphasis — keeps the font payload small for fast loads.
const newsreader = Newsreader({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-newsreader',
  weight: ['400', '600'],
  style: ['normal', 'italic'],
});

// UI / small labels / footnotes sans (tagline, chapter labels, footer).
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['400', '500'],
});

// Default metadata for the whole site (home overrides with its own export too).
export const metadata: Metadata = buildMetadata({ title: site.name, path: '/' });

// Re-export the shared viewport (theme-color, color-scheme).
export { viewport };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const navItems = getNavItems();
  // Build year is computed at build time (static export) — fine for © line.
  const year = new Date().getFullYear();

  return (
    <html lang="en" className={`${newsreader.variable} ${inter.variable}`}>
      <body>
        {/* Accessibility: jump straight to the page content. */}
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>

        <Header navItems={navItems} />

        <main id="main-content" className="fade-in">
          {children}
        </main>

        <Footer navItems={navItems} year={year} />
      </body>
    </html>
  );
}
