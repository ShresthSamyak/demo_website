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

/** LinkedIn glyph (brand blue) used beside contact links. */
function LinkedInIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      className={className}
      fill="#0A66C2"
    >
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

/** The team. Add a member by appending to this array (drop a matching photo in /public/team). */
const team = [
  {
    name: 'Yusuf',
    role: 'Chief Executive Officer',
    photo: '/team/yusuf.webp',
    linkedin: 'https://www.linkedin.com/in/yusuf-saleem/',
    bio: 'Chief Executive Officer of Mytix and a technology founder based in Phoenix, Arizona. An Arizona State University alumnus, Yusuf leads Human Instinct’s vision, strategy, and growth.',
  },
  {
    name: 'Ranjeet Kumar',
    role: 'Quantitative Researcher',
    photo: '/team/ranjeet-kumar.webp',
    linkedin: 'https://www.linkedin.com/in/ranjeet-kumar-1293731b3/',
    bio: 'An AI and quantitative researcher specializing in machine learning, stochastic modeling, and systematic trading. Studying AI at IIT Patna with experience at Scale AI, Ranjeet develops the quantitative research and alpha strategies behind the fund.',
  },
  {
    name: 'Shresth Samyak',
    role: 'Engineering',
    photo: '/team/shresth-samyak.webp',
    linkedin: 'https://www.linkedin.com/in/shresthsamyak/',
    bio: 'A Data Science and Artificial Intelligence engineer and an open-source developer. Shresth builds the quantitative systems, automation, and infrastructure that power Human Instinct.',
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
                <h3 className="font-serif text-xl font-semibold text-ink">
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener"
                    className="no-underline hover:text-accent"
                  >
                    {member.name}
                  </a>
                </h3>
                <p className="font-sans text-sm uppercase tracking-wide text-accent">
                  {member.role}
                </p>
                <p className="prose mt-2 !text-base">{member.bio}</p>
                <p className="mt-2">
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener"
                    className="inline-flex items-center gap-1.5 font-sans text-sm text-muted no-underline hover:text-accent"
                  >
                    <LinkedInIcon className="h-4 w-4" />
                    LinkedIn
                  </a>
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <hr className="rule" />

      <div className="prose">
        <h2>Contact</h2>
        <p>Reach the team on LinkedIn:</p>
        <ul className="!list-none !pl-0">
          {team.map((member) => (
            <li key={member.name} className="!my-2 flex items-center gap-3">
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener"
                aria-label={`${member.name} on LinkedIn`}
                className="inline-flex shrink-0"
              >
                <LinkedInIcon className="h-5 w-5" />
              </a>
              <span>
                <a href={member.linkedin} target="_blank" rel="noopener">
                  {member.name}
                </a>{' '}
                — {member.role}
              </span>
            </li>
          ))}
        </ul>
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
