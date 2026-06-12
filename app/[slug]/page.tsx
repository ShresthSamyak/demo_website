/**
 * Dynamic essay route ("/[slug]/").
 *
 * - generateStaticParams() enumerates every essay slug so the static export
 *   prerenders one HTML file per chapter.
 * - generateMetadata() builds per-page <head> tags from frontmatter.
 * - The page renders the H1 title, the compiled MDX body, and prev/next nav.
 */
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllEssayMeta, getEssayBySlug, getAdjacentEssays } from '@/lib/essays';
import { buildMetadata } from '@/lib/seo';
import Mdx from '@/components/Mdx';
import PrevNext from '@/components/PrevNext';

interface PageProps {
  // In Next 15+, params is async.
  params: Promise<{ slug: string }>;
}

/** Pre-render every essay at build time. */
export function generateStaticParams() {
  return getAllEssayMeta().map((e) => ({ slug: e.slug }));
}

/** Per-essay <head> metadata. */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const essay = getEssayBySlug(slug);
  if (!essay) return {};
  return buildMetadata({
    title: essay.title,
    description: essay.description,
    path: `/${essay.slug}/`,
    type: 'article',
  });
}

export default async function EssayPage({ params }: PageProps) {
  const { slug } = await params;
  const essay = getEssayBySlug(slug);
  if (!essay) notFound();

  const { prev, next } = getAdjacentEssays(slug);

  return (
    <article className="reading-column py-12 sm:py-16">
      {/* Title */}
      <header>
        <p className="font-sans text-sm uppercase tracking-[0.18em] text-muted">
          Chapter {essay.order}
        </p>
        <h1 className="mt-3 font-serif text-3xl font-medium leading-tight tracking-tight text-ink sm:text-4xl">
          {essay.title}
        </h1>
      </header>

      <hr className="rule !mt-10" />

      {/* MDX body (footnotes, figures, headings) */}
      <div className="prose">
        <Mdx source={essay.content} />
      </div>

      {/* Prev / next chapter navigation */}
      <PrevNext prev={prev} next={next} />
    </article>
  );
}
