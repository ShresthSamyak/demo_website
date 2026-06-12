/**
 * Introduction (landing page, "/").
 *
 * Masthead → author/date line → opening essay prose → Table of Contents
 * (every chapter with its one-line summary) → acknowledgments + short
 * disclaimer note → "Next:" link to chapter 1.
 */
import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllEssayMeta } from '@/lib/essays';
import { site } from '@/lib/site';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({ title: site.name, path: '/' });

export default function HomePage() {
  const chapters = getAllEssayMeta();
  const first = chapters[0];

  return (
    <article className="reading-column py-12 sm:py-16">
      {/* ---- Masthead --------------------------------------------------- */}
      <header className="text-center">
        <h1 className="font-sans text-2xl font-semibold uppercase leading-tight tracking-[0.3em] text-ink sm:text-3xl">
          Human Instinct
        </h1>
        <p className="mt-4 font-sans text-sm uppercase tracking-[0.18em] text-muted">
          {site.tagline}
        </p>
        {/* Accent masthead rule */}
        <hr
          className="mx-auto mt-6 h-px w-16 border-0"
          style={{ backgroundColor: 'var(--color-accent)' }}
        />
        <p className="mt-6 font-sans text-sm text-muted">
          {site.author} · {site.publishedDisplay}
        </p>
      </header>

      {/* ---- Opening prose --------------------------------------------- */}
      <section className="prose mt-14">
        <p className="text-xl sm:text-2xl">
          Markets are not merely collections of cash flows. Markets are collections of people.
        </p>
        <p>
          {'{{ FILL — opening essay prose. This is the introduction to the Human Instinct ' +
            'thesis. Replace with the supplied text; the structure below (table of contents, ' +
            'acknowledgments) will remain. }}'}
        </p>
      </section>

      <hr className="rule" />

      {/* ---- Table of Contents ----------------------------------------- */}
      <section aria-labelledby="toc-heading">
        <h2 id="toc-heading" className="font-sans text-sm font-semibold uppercase tracking-[0.18em] text-muted">
          Table of Contents
        </h2>
        <ol className="mt-8 flex flex-col gap-7">
          {chapters.map((chapter, i) => (
            <li key={chapter.slug} className="flex gap-4">
              <span
                aria-hidden="true"
                className="mt-1 w-6 shrink-0 font-sans text-sm tabular-nums text-muted"
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <Link
                  href={`/${chapter.slug}/`}
                  className="font-serif text-xl text-ink no-underline hover:text-accent sm:text-2xl"
                >
                  {chapter.title}
                </Link>
                <p className="mt-1 font-sans text-sm leading-relaxed text-muted">
                  {chapter.summary}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <hr className="rule" />

      {/* ---- Acknowledgments + disclaimer note ------------------------- */}
      <section aria-labelledby="ack-heading" className="prose">
        <h2 id="ack-heading">Acknowledgments</h2>
        <p>
          {'{{ FILL — acknowledgments. Thank collaborators, advisors, and readers here. }}'}
        </p>
        <p className="!text-sm text-muted">
          <em>
            A note on scope: this thesis is provided for informational purposes only and is not
            investment advice. See the full disclaimer in the footer.
          </em>
        </p>
      </section>

      {/* ---- Next link -------------------------------------------------- */}
      {first ? (
        <p className="mt-12 font-sans">
          <Link href={`/${first.slug}/`} className="text-accent">
            Next: {first.title} →
          </Link>
        </p>
      ) : null}
    </article>
  );
}
