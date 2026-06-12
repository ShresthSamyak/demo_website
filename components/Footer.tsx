/**
 * Footer — rendered on every page (Server Component, zero JS).
 *
 * Contains copyright, a compact nav, and the INVESTMENT DISCLAIMER. The
 * disclaimer text is placeholder copy to be finalized with counsel.
 */
import Link from 'next/link';
import { site } from '@/lib/site';
import type { NavItem } from './Header';

/** Investment disclaimer — placeholder copy, finalize with legal counsel. */
const DISCLAIMER =
  'Human Instinct is provided for informational purposes only. Nothing on this ' +
  'site constitutes investment advice, a recommendation, or an offer or ' +
  'solicitation to buy or sell any security. Past performance is not indicative ' +
  'of future results. Investing involves risk, including loss of principal.';

export default function Footer({
  navItems,
  year,
}: {
  navItems: NavItem[];
  year: number;
}) {
  return (
    <footer className="mt-24 border-t border-rule font-sans text-sm text-muted">
      <div className="reading-column py-12">
        {/* Footer nav */}
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {navItems.map((item) =>
              item.external ? (
                <li key={item.href}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener"
                    className="text-muted no-underline hover:text-accent"
                  >
                    {item.label}
                  </a>
                </li>
              ) : (
                <li key={item.href}>
                  <Link href={item.href} className="text-muted no-underline hover:text-accent">
                    {item.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>

        <hr className="rule !my-8" />

        {/* Investment disclaimer */}
        <p className="max-w-none text-xs leading-relaxed text-muted">
          <strong className="font-semibold uppercase tracking-wide">Investment disclaimer.</strong>{' '}
          {DISCLAIMER}
        </p>

        <p className="mt-6 text-xs text-muted">
          © {year} {site.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
