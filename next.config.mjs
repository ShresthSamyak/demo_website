// @ts-check

/**
 * Next.js configuration — fully static export.
 *
 * `output: 'export'` makes `next build` emit a static site to `/out` with no
 * Node server or runtime features. Because the static export has no image
 * optimization server, `images.unoptimized` is required so <Image> (and the
 * MDX <Figure>) emit plain <img> tags that work on any static host.
 *
 * `trailingSlash: true` produces directory-style routes (e.g. /philosophy/)
 * which matches the sitemap in the brief and is friendliest to static hosts
 * (Vercel / Netlify / Cloudflare Pages) that serve `index.html` per folder.
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Pin the workspace root to this folder (a stray lockfile in the home
  // directory otherwise makes Next infer the wrong root).
  turbopack: {
    root: import.meta.dirname,
  },
  // Surface type errors at build time rather than silently passing.
  typescript: { ignoreBuildErrors: false },
};

export default nextConfig;
