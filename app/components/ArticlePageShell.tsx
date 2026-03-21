import Link from "next/link";
import { ARTICLES_INDEX_CRUMB_LABEL } from "@/lib/article-breadcrumb";
import { CATEGORY_LABELS, getArticleListSectionIdForCategory, type ArticleCategory } from "@/lib/articles";

function formatDateLabel(iso?: string): string | null {
  if (!iso) return null;
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!m) return iso;
  return `${m[1]}年${m[2]}月${m[3]}日`;
}

type ArticlePageShellProps = {
  currentPageTitle: string;
  wide?: boolean;
  publishedAt?: string;
  category?: ArticleCategory;
  children: React.ReactNode;
};

export function ArticlePageShell({
  currentPageTitle,
  wide = false,
  publishedAt,
  category,
  children,
}: ArticlePageShellProps) {
  const shellClass = wide ? "mx-auto max-w-3xl min-w-0" : "ds-article-shell min-w-0";
  const dateLabel = formatDateLabel(publishedAt);

  return (
    <article className={shellClass}>
      <nav className="mb-4 text-sm text-stone-600" aria-label="パンくず">
        <ol className="flex flex-wrap items-center gap-1">
          <li>
            <Link href="/" className="hover:underline">
              ホーム
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li>
            <Link href="/articles" className="hover:underline">
              {ARTICLES_INDEX_CRUMB_LABEL}
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li className="max-w-[min(100%,36rem)] font-bold text-stone-900" aria-current="page">
            <span className="line-clamp-2" title={currentPageTitle}>
              {currentPageTitle}
            </span>
          </li>
        </ol>
      </nav>

      {(dateLabel || category) && (
        <div className="mb-5 flex flex-wrap items-center gap-2">
          {category && (
            <Link
              href={`/articles#${getArticleListSectionIdForCategory(category)}`}
              className="rounded-md border border-stone-200 bg-stone-50 px-2 py-0.5 text-xs font-semibold text-stone-600 transition-colors hover:border-emerald-300 hover:text-emerald-900"
            >
              {CATEGORY_LABELS[category]}
            </Link>
          )}
          {dateLabel && (
            <time className="text-xs text-stone-500" dateTime={publishedAt}>
              {dateLabel}
            </time>
          )}
        </div>
      )}

      {children}
    </article>
  );
}
