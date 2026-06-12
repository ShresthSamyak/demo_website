'use client';

/**
 * Header — the only Client Component on the site (the only shipped JS).
 *
 * A minimal sticky top bar: the site name links home on the left; a "Contents"
 * menu on the right lists every chapter plus the PDF and About. On mobile the
 * menu collapses behind a hamburger button that toggles it. Active nav items
 * are highlighted via usePathname().
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
    <header className="sticky top-0 z-50 border-b border-rule bg-paper/90 backdrop-blur-sm">
      <div className="reading-column flex items-center justify-between py-3">
        {/* Masthead / home link */}
        <Link
          href="/"
          className="font-sans text-sm font-semibold uppercase tracking-[0.18em] text-ink no-underline hover:text-accent"
        >
          {site.name}
        </Link>

        {/* Hamburger — visible on mobile only */}
        <button
          type="button"
          className="font-sans text-sm text-ink sm:hidden"
          aria-expanded={open}
          aria-controls={menuId}
          aria-label={open ? 'Close contents menu' : 'Open contents menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <span aria-hidden="true" className="mr-1 inline-block">
            {open ? '✕' : '☰'}
          </span>
          Contents
        </button>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden sm:block">
          <ul className="flex items-center gap-5 font-sans text-sm">
            {navItems.map((item) => (
              <li key={item.href}>
                <NavLink item={item} active={isActive(item.href)} />
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Mobile dropdown nav */}
      <nav
        id={menuId}
        aria-label="Contents"
        hidden={!open}
        className="border-t border-rule bg-paper sm:hidden"
      >
        <ul className="reading-column flex flex-col gap-1 py-4 font-sans text-base">
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

/** A single nav link, styled for active state and external/download targets. */
function NavLink({
  item,
  active,
  block = false,
}: {
  item: NavItem;
  active: boolean;
  block?: boolean;
}) {
  const base = block ? 'block py-2' : '';
  const className = `${base} no-underline transition-colors ${
    active ? 'text-accent font-medium' : 'text-muted hover:text-ink'
  }`;

  if (item.external) {
    return (
      <a
        href={item.href}
        className={className}
        // PDF opens in a new tab; rel guards the opener.
        target="_blank"
        rel="noopener"
      >
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
