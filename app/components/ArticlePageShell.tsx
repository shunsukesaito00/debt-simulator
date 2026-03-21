import Link from "next/link";
import { ARTICLES_INDEX_CRUMB_LABEL } from "@/lib/article-breadcrumb";

type ArticlePageShellProps = {
  /** パンくず末尾・aria 用の記事タイトル */
  currentPageTitle: string;
  /** true のとき表・グラフ向けに max-w-3xl */
  wide?: boolean;
  children: React.ReactNode;
};

export function ArticlePageShell({ currentPageTitle, wide = false, children }: ArticlePageShellProps) {
  const shellClass = wide ? "mx-auto max-w-3xl min-w-0" : "ds-article-shell min-w-0";

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
      {children}
    </article>
  );
}
