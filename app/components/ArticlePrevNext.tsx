import Link from "next/link";
import { getAdjacentArticles } from "@/lib/articles";

export function ArticlePrevNext({ slug }: { slug: string }) {
  const { prev, next } = getAdjacentArticles(slug);
  if (!prev && !next) return null;

  return (
    <nav className="mt-8 grid gap-3 sm:grid-cols-2" aria-label="前後の記事">
      {prev ? (
        <Link
          href={`/articles/${prev.slug}`}
          className="ds-subcard flex items-start gap-3 p-4 transition-colors hover:border-emerald-200/80 hover:shadow-ds"
        >
          <span className="mt-0.5 text-lg text-stone-400" aria-hidden>
            &larr;
          </span>
          <div className="min-w-0">
            <span className="text-[10px] font-semibold uppercase tracking-wide text-stone-500">前の記事</span>
            <span className="mt-1 block text-sm font-semibold text-stone-900 line-clamp-2">{prev.title}</span>
          </div>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link
          href={`/articles/${next.slug}`}
          className="ds-subcard flex items-start justify-end gap-3 p-4 text-right transition-colors hover:border-emerald-200/80 hover:shadow-ds"
        >
          <div className="min-w-0">
            <span className="text-[10px] font-semibold uppercase tracking-wide text-stone-500">次の記事</span>
            <span className="mt-1 block text-sm font-semibold text-stone-900 line-clamp-2">{next.title}</span>
          </div>
          <span className="mt-0.5 text-lg text-stone-400" aria-hidden>
            &rarr;
          </span>
        </Link>
      ) : (
        <div />
      )}
    </nav>
  );
}
