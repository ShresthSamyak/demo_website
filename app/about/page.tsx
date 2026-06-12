/**
 * About page ("/about/") — fund overview + team.
 */
import type { Metadata } from 'next';
import Link from 'next/link';
import { site } from '@/lib/site';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'About',
  description: `About ${site.name} — fund overview and the team building a quantitative covered-call income strategy.`,
  path: '/about/',
});

/** The team. Add a member by appending to this array. */
const team = [
  {
    name: 'Yusuf',
    role: 'Chief Executive Officer',
    bio: '{{ FILL — short bio for Yusuf (CEO). }}',
  },
  {
    name: 'Ranjeet Kumar',
    role: 'Developer',
    bio: '{{ FILL — short bio for Ranjeet Kumar (Developer). }}',
  },
  {
    name: 'Shresth Samyak',
    role: 'Developer',
    bio: '{{ FILL — short bio for Shresth Samyak (Developer). }}',
  },
] as const;

export default function AboutPage() {
  return (
    <article className="reading-column py-12 sm:py-16">
      <header>
        <h1 className="font-serif text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl">
          About
        </h1>
      </header>

      <hr className="rule !mt-10" />

      <div className="prose">
        <h2>The fund</h2>
        <p>
          {site.name} is a quant-enhanced, systematic covered-call income strategy. We own
          productive assets — large-cap equities and the volatile compute infrastructure behind the
          AI and frontier-technology buildout — and monetize their high implied volatility through a
          disciplined, machine-learning-driven overwrite, targeting a 12–15% income yield.
        </p>
        <p>
          The strategy is being built in two phases: a systematic income strategy proven on a liquid
          core, followed by a tokenized quantitative income fund delivering institutional-style
          covered-call yield to global investors. Read the full argument starting with{' '}
          <Link href="/thesis/">The Thesis</Link>.
        </p>
      </div>

      {/* ---- Team ------------------------------------------------------- */}
      <section aria-labelledby="team-heading" className="mt-14">
        <h2
          id="team-heading"
          className="font-sans text-sm font-semibold uppercase tracking-[0.18em] text-muted"
        >
          Team
        </h2>
        <ul className="mt-8 flex flex-col gap-8">
          {team.map((member) => (
            <li key={member.name}>
              <h3 className="font-serif text-xl font-semibold text-ink">{member.name}</h3>
              <p className="font-sans text-sm uppercase tracking-wide text-accent">{member.role}</p>
              <p className="prose mt-2 !text-base">{member.bio}</p>
            </li>
          ))}
        </ul>
      </section>

      <hr className="rule" />

      <div className="prose">
        <h2>Contact</h2>
        <p>{'{{ FILL — contact details / how to get in touch. }}'}</p>
        <p>
          Download the{' '}
          <a href={site.pdfPath} target="_blank" rel="noopener">
            full thesis as a PDF
          </a>
          .
        </p>
      </div>
    </article>
  );
}
