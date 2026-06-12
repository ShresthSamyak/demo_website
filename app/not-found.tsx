/**
 * Custom 404 page — styled to match the site.
 *
 * Note: with `output: 'export'`, Next emits this as /404.html, which static
 * hosts (Vercel/Netlify/Cloudflare Pages) serve for unknown routes.
 */
import Link from 'next/link';

export default function NotFound() {
  return (
    <article className="reading-column flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
      <p className="font-sans text-sm uppercase tracking-[0.18em] text-muted">404</p>
      <h1 className="mt-4 font-serif text-3xl font-medium text-ink sm:text-4xl">
        Page not found
      </h1>
      <p className="prose mt-4">
        The page you’re looking for doesn’t exist or may have moved.
      </p>
      <p className="mt-8 font-sans">
        <Link href="/" className="text-accent">
          ← Back to the introduction
        </Link>
      </p>
    </article>
  );
}
