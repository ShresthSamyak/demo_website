'use client';

/**
 * Header — the only Client Component on the site (the only shipped JS).
 *
 * Modeled on situational-awareness.ai: a CENTERED masthead (serif site title +
 * tagline) with the navigation flowing/wrapping beneath it in the same reading
 * serif. Active link is rendered in the accent navy. It is not sticky — it
 * scrolls away like a print masthead.
 *
 * On mobile the wrapping nav collapses behind a single "Contents" toggle
 * (the lone piece of interactivity / JS on the site).
 *
 * Nav items are passed in from the (server) root layout so this component never
 * touches the filesystem.
 */
import { useEffect, useId, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { site } from '@/lib/site';

export interface NavItem {
  href: string;
  label: string;
  /** External / download links (the PDF) open in a new tab. */
  external?: boolean;
}

export default function Header({ navItems }: { navItems: NavItem[] }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const menuId = useId();

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Close on Escape for keyboard users.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <header className="border-b border-rule pt-12 pb-8 text-center sm:pt-16">
      {/* Masthead — the site title doubles as the home link. */}
      <div className="mx-auto max-w-4xl px-5">
        <Link href="/" className="inline-block no-underline">
          <span className="font-serif text-3xl font-semibold uppercase leading-none tracking-[0.22em] text-ink transition-colors hover:text-accent sm:text-4xl">
            {site.name}
          </span>
        </Link>
        <p className="mt-3 font-serif text-lg italic text-muted sm:text-xl">{site.tagline}</p>

        {/* Desktop / tablet: centered wrapping nav in the reading serif. */}
        <nav aria-label="Primary" className="mt-8 hidden sm:block">
          <ul className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-x-7 gap-y-3 font-serif text-[1.05rem]">
            {navItems.map((item) => (
              <li key={item.href}>
                <NavLink item={item} active={isActive(item.href)} />
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile: single toggle that reveals a stacked menu. */}
        <div className="mt-6 sm:hidden">
          <button
            type="button"
            className="nav-link font-serif text-lg text-ink"
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => setOpen((v) => !v)}
          >
            Contents{' '}
            <span aria-hidden="true" className="inline-block">
              {open ? '▴' : '▾'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile dropdown nav */}
      <nav id={menuId} aria-label="Contents" hidden={!open} className="mt-2 sm:hidden">
        <ul className="mx-auto flex max-w-sm flex-col gap-1 px-5 py-2 font-serif text-lg">
          {navItems.map((item) => (
            <li key={item.href}>
              <NavLink item={item} active={isActive(item.href)} block />
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

/** A single nav link with the animated underline + active accent styling. */
function NavLink({
  item,
  active,
  block = false,
}: {
  item: NavItem;
  active: boolean;
  block?: boolean;
}) {
  const className = `nav-link ${block ? 'block py-2' : ''} ${active ? 'is-active' : ''}`;

  if (item.external) {
    return (
      <a href={item.href} className={className} target="_blank" rel="noopener">
        {item.label}
      </a>
    );
  }

  return (
    <Link href={item.href} className={className} aria-current={active ? 'page' : undefined}>
      {item.label}
    </Link>
  );
}
