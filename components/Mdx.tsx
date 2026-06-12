/**
 * Mdx — compiles and renders an essay's MDX body at build time (RSC).
 *
 * Uses next-mdx-remote's RSC entrypoint so compilation happens on the server
 * during the static export (no client runtime). Plugins:
 *   - remark-gfm           → GitHub-flavored Markdown incl. footnotes
 *   - rehype-slug          → id="" on headings (anchor targets)
 *   - rehype-autolink      → wraps headings in self-links for deep-linking
 *
 * The `components` map exposes <Figure> to MDX authors.
 */
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import Figure from './Figure';

const components = {
  Figure,
};

export default function Mdx({ source }: { source: string }) {
  return (
    <MDXRemote
      source={source}
      components={components}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [
            rehypeSlug,
            [rehypeAutolinkHeadings, { behavior: 'wrap' }],
          ],
        },
      }}
    />
  );
}
