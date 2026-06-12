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
    <article className="reading-column py-10 sm:py-14">
      {/* Author / date line (the masthead now lives in the site header). */}
      <p className="text-center font-sans text-sm text-muted">
        {site.author} · {site.publishedDisplay}
      </p>

      {/* ---- Opening prose --------------------------------------------- */}
      <section className="prose mt-12">
        <p className="!mt-0 text-2xl !leading-snug sm:text-[1.75rem]">
          Markets are not merely collections of cash flows. Markets are collections of people.
        </p>
        <p>
          And people, in aggregate, pay dearly to avoid uncertainty. Human Instinct is a
          quant-enhanced, systematic covered-call income strategy — enhanced with machine learning
          and automation — built to harvest that premium and distribute it as income.
        </p>
        <p>
          Our approach is to own productive assets, and specifically the volatile compute
          infrastructure behind the AI and frontier-technology buildout, then monetize their high
          implied volatility through a disciplined, model-driven overwrite. The strategy targets a
          12–15% yield tied to large-cap equities, validated by back-testing and executed by
          software.
        </p>
        <p>
          We are building it in two phases: first, a systematic income strategy proven on a liquid
          core; then a tokenized quantitative income fund delivering institutional-style
          covered-call yield to investors worldwide. What follows is the thesis, the blueprint, and
          the machine that runs it.
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
                  className="font-serif text-xl text-ink no-underline transition-colors hover:text-accent sm:text-2xl"
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
