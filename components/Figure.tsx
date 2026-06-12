/**
 * Figure — a captioned image/chart for use inside MDX essays.
 *
 * Usage in .mdx:
 *   <Figure src="/figures/chart.svg" caption="…" alt="…" />
 *
 * Renders a semantic <figure>/<figcaption>. Images are lazy-loaded and
 * decoded async for performance. Because the site is a static export with the
 * image optimizer disabled, a plain <img> is used (works on any static host).
 */
interface FigureProps {
  /** Image source (absolute path from /public, e.g. "/figures/x.svg"). */
  src: string;
  /** Caption shown beneath the image (sans-serif, muted). */
  caption?: string;
  /** Alt text for screen readers; falls back to the caption. */
  alt?: string;
  /** Optional explicit dimensions to reserve layout space (avoid CLS). */
  width?: number;
  height?: number;
}

export default function Figure({ src, caption, alt, width, height }: FigureProps) {
  return (
    <figure>
      {/* eslint-disable-next-line @next/next/no-img-element -- static export, optimizer disabled */}
      <img
        src={src}
        alt={alt ?? caption ?? ''}
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
      />
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
}
