/**
 * Content collection for the thesis essays.
 *
 * Essays live as .mdx files in /content/essays/. Each file carries frontmatter
 * (title, order, slug, summary, description). This module reads them at BUILD
 * time only (it touches the filesystem, so it must never be imported into a
 * Client Component) and exposes helpers used by the table of contents, the
 * dynamic essay route, and prev/next navigation.
 *
 * Adding a chapter is just dropping a new .mdx file with valid frontmatter —
 * see README.md.
 */
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

/** Directory holding the essay .mdx files. */
const ESSAYS_DIR = path.join(process.cwd(), 'content', 'essays');

/** Frontmatter contract every essay must satisfy. */
export interface EssayFrontmatter {
  /** Display title (rendered as the page <h1>). */
  title: string;
  /** 1-based position; drives TOC sorting and prev/next order. */
  order: number;
  /** URL slug, e.g. "philosophy" → /philosophy/. Defaults to the filename. */
  slug: string;
  /** One-line summary shown in the table of contents. */
  summary: string;
  /** SEO meta description. */
  description: string;
}

/** A fully loaded essay: frontmatter + raw MDX body. */
export interface Essay extends EssayFrontmatter {
  /** Raw MDX source (frontmatter stripped), compiled at render time. */
  content: string;
}

/** A lightweight essay reference used for lists, TOC, and prev/next. */
export type EssayMeta = EssayFrontmatter;

/**
 * Read, parse, and validate every essay, sorted by `order` ascending.
 * Throws on missing required frontmatter so build fails loudly, not silently.
 */
export function getAllEssays(): Essay[] {
  if (!fs.existsSync(ESSAYS_DIR)) return [];

  const files = fs.readdirSync(ESSAYS_DIR).filter((f) => f.endsWith('.mdx'));

  const essays = files.map((file) => {
    const fullPath = path.join(ESSAYS_DIR, file);
    const raw = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(raw);

    const fallbackSlug = file.replace(/\.mdx$/, '');
    const fm: EssayFrontmatter = {
      title: requireString(data.title, file, 'title'),
      order: requireNumber(data.order, file, 'order'),
      slug: typeof data.slug === 'string' && data.slug.length > 0 ? data.slug : fallbackSlug,
      summary: requireString(data.summary, file, 'summary'),
      description: requireString(data.description, file, 'description'),
    };

    return { ...fm, content };
  });

  return essays.sort((a, b) => a.order - b.order);
}

/** Frontmatter-only list (no MDX body) — cheaper for TOC / nav / params. */
export function getAllEssayMeta(): EssayMeta[] {
  return getAllEssays().map(({ content: _content, ...meta }) => meta);
}

/** Look up a single essay by slug; returns undefined if not found. */
export function getEssayBySlug(slug: string): Essay | undefined {
  return getAllEssays().find((e) => e.slug === slug);
}

/**
 * Given a slug, return the ordered-adjacent previous and next essays
 * (undefined at the ends). Used by the prev/next footer navigation.
 */
export function getAdjacentEssays(slug: string): {
  prev?: EssayMeta;
  next?: EssayMeta;
} {
  const all = getAllEssayMeta();
  const idx = all.findIndex((e) => e.slug === slug);
  if (idx === -1) return {};
  return {
    prev: idx > 0 ? all[idx - 1] : undefined,
    next: idx < all.length - 1 ? all[idx + 1] : undefined,
  };
}

// --- internal validation helpers -------------------------------------------

function requireString(value: unknown, file: string, field: string): string {
  if (typeof value !== 'string' || value.trim().length === 0) {
    throw new Error(`Essay "${file}" is missing required string frontmatter "${field}".`);
  }
  return value;
}

function requireNumber(value: unknown, file: string, field: string): number {
  if (typeof value !== 'number' || Number.isNaN(value)) {
    throw new Error(`Essay "${file}" is missing required numeric frontmatter "${field}".`);
  }
  return value;
}
