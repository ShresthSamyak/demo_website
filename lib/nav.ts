/**
 * Builds the primary navigation: every chapter (in order), then About and the
 * PDF download. Server-only (reads essays from the filesystem).
 */
import { getAllEssayMeta } from './essays';
import { site } from './site';
import type { NavItem } from '@/components/Header';

export function getNavItems(): NavItem[] {
  const chapters: NavItem[] = getAllEssayMeta().map((e) => ({
    href: `/${e.slug}/`,
    label: e.title,
  }));

  return [
    ...chapters,
    { href: '/about/', label: 'About' },
    { href: site.pdfPath, label: 'PDF', external: true },
  ];
}
