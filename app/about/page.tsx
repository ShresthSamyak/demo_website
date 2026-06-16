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

/** The team. Add a member by appending to this array (drop a matching photo in /public/team). */
const team = [
  {
    name: 'Yusuf',
    role: 'Chief Executive Officer',
    photo: '/team/yusuf.webp',
    bio: 'Chief Executive Officer of Mytix and a technology founder based in Phoenix, Arizona. An Arizona State University alumnus, Yusuf leads Human Instinct’s vision, strategy, and growth.',
  },
  {
    name: 'Ranjeet Kumar',
    role: 'Quantitative Researcher',
    photo: '/team/ranjeet-kumar.webp',
    bio: 'An AI and quantitative researcher specializing in machine learning, stochastic modeling, and systematic trading. Studying AI at IIT Patna with experience at Scale AI, Ranjeet develops the quantitative research and alpha strategies behind the fund.',
  },
  {
    name: 'Shresth Samyak',
    role: 'Engineering',
    photo: '/team/shresth-samyak.webp',
    bio: 'A Data Science and Artificial Intelligence engineer at Thapar Institute (TIET) and an open-source developer. Shresth builds the quantitative systems, automation, and infrastructure that power Human Instinct.',
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
          {site.name} is a quantitative covered-call income fund. We seek long-term exposure to
          innovation while generating durable cash flow through disciplined option strategies,
          combining advanced quantitative research with human judgment.
        </p>
        <p>
          Our conviction is simple: in a world increasingly dominated by algorithms, the ultimate
          edge remains understanding the people who use them. Read the full argument starting with{' '}
          <Link href="/philosophy/">A Philosophy of Markets</Link>.
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
        <ul className="mt-8 flex flex-col gap-10">
          {team.map((member) => (
            <li key={member.name} className="flex flex-col gap-5 sm:flex-row sm:items-start">
              {/* eslint-disable-next-line @next/next/no-img-element -- static export, optimizer disabled */}
              <img
                src={member.photo}
                alt={`Portrait of ${member.name}`}
                width={96}
                height={96}
                loading="lazy"
                decoding="async"
                className="h-24 w-24 shrink-0 rounded-full object-cover ring-1 ring-rule"
              />
              <div>
                <h3 className="font-serif text-xl font-semibold text-ink">{member.name}</h3>
                <p className="font-sans text-sm uppercase tracking-wide text-accent">
                  {member.role}
                </p>
                <p className="prose mt-2 !text-base">{member.bio}</p>
              </div>
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
