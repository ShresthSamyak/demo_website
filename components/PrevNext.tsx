/**
 * PrevNext — bottom-of-essay navigation (Server Component).
 *
 * Renders "← Previous" / "Next →" links computed from chapter order. Either
 * side may be absent (first/last chapter); the layout keeps the present link
 * aligned to its correct edge.
 */
import Link from 'next/link';
import type { EssayMeta } from '@/lib/essays';

export default function PrevNext({
  prev,
  next,
}: {
  prev?: EssayMeta;
  next?: EssayMeta;
}) {
  if (!prev && !next) return null;

  return (
    <nav
      aria-label="Chapter navigation"
      className="mt-16 flex items-stretch justify-between gap-4 border-t border-rule pt-8 font-sans"
    >
      {prev ? (
        <Link
          href={`/${prev.slug}/`}
          className="group flex max-w-[48%] flex-col text-left no-underline"
          rel="prev"
        >
          <span className="text-xs uppercase tracking-wide text-muted">← Previous</span>
          <span className="mt-1 text-ink group-hover:text-accent">{prev.title}</span>
        </Link>
      ) : (
        <span aria-hidden="true" />
      )}

      {next ? (
        <Link
          href={`/${next.slug}/`}
          className="group flex max-w-[48%] flex-col text-right no-underline"
          rel="next"
        >
          <span className="text-xs uppercase tracking-wide text-muted">Next →</span>
          <span className="mt-1 text-ink group-hover:text-accent">{next.title}</span>
        </Link>
      ) : (
        <span aria-hidden="true" />
      )}
    </nav>
  );
}
