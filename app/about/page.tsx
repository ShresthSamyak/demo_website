/**
 * About page ("/about/") — short bio / fund overview placeholder.
 */
import type { Metadata } from 'next';
import Link from 'next/link';
import { site } from '@/lib/site';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'About',
  description: `About ${site.name} — fund overview and background.`,
  path: '/about/',
});

export default function AboutPage() {
  return (
    <article className="reading-column py-12 sm:py-16">
      <header>
        <h1 className="font-serif text-3xl font-medium leading-tight tracking-tight text-ink sm:text-4xl">
          About
        </h1>
      </header>

      <hr className="rule !mt-10" />

      <div className="prose">
        <h2>The fund</h2>
        <p>
          {'{{ FILL — fund overview: strategy, structure, and mandate of Human Instinct, ' +
            'a quantitative covered-call income fund. }}'}
        </p>

        <h2>Background</h2>
        <p>{'{{ FILL — short bio of the principal(s) and the origin of the strategy. }}'}</p>

        <h2>Contact</h2>
        <p>{'{{ FILL — contact details / how to get in touch. }}'}</p>

        <p>
          Read the argument in full beginning with{' '}
          <Link href="/philosophy/">A Philosophy of Markets</Link>, or download the{' '}
          <a href={site.pdfPath} target="_blank" rel="noopener">
            full thesis as a PDF
          </a>
          .
        </p>
      </div>
    </article>
  );
}
