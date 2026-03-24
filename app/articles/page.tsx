import type { Metadata } from "next";
import Link from "next/link";
import {
  getArticlesByCategory,
  ARTICLE_LIST_SECTIONS,
  CATEGORY_LABELS,
  getStoryArticles,
} from "@/lib/articles";
import { ARTICLES_INDEX_CRUMB_LABEL } from "@/lib/article-breadcrumb";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://debt-simulator-quzc.vercel.app";

export const metadata: Metadata = {
  title: "テーマ別記事一覧｜借金と暮らしの記録",
  description:
    "返済・固定費・家計・体験記など、テーマ別に記事を並べています。条件別の解説や試算ツールへのリンクもあります。",
  alternates: { canonical: `${BASE}/articles` },
};

const breadcrumbListJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "ホーム", item: `${BASE}/` },
    { "@type": "ListItem", position: 2, name: ARTICLES_INDEX_CRUMB_LABEL, item: `${BASE}/articles` },
  ],
};

function formatPublishedAt(iso?: string): string | null {
  if (!iso) return null;
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!m) return iso;
  return `${m[1]}年${m[2]}月${m[3]}日`;
}

export default function ArticlesListPage() {
  const byCategory = getArticlesByCategory();
  const storyArticles = getStoryArticles();

  return (
    <div className="mx-auto max-w-3xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbListJsonLd) }}
      />

      <nav className="mb-4 text-sm text-stone-600" aria-label="パンくず">
        <ol className="flex flex-wrap items-center gap-1">
          <li>
            <Link href="/" className="font-medium text-stone-600 hover:text-emerald-900 hover:underline">
              ホーム
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li className="font-semibold text-stone-900" aria-current="page">
            {ARTICLES_INDEX_CRUMB_LABEL}
          </li>
        </ol>
      </nav>

      <div className="ds-surface-soft ds-card-pad">
        <h1 className="ds-page-serif text-2xl font-bold text-stone-900 md:text-3xl">
          テーマ別記事一覧
        </h1>
        <p className="mt-5 text-base text-stone-700 leading-relaxed">
          返済・固定費・家計・体験記など、テーマ別に記事を並べています。関心のある見出しから開いてください。
        </p>
        <p className="mt-3 text-base text-stone-600 leading-relaxed">
          返済額の目安を表で見る：
          <Link href="/quick-reference" className="font-medium text-emerald-900 underline decoration-emerald-200 hover:decoration-emerald-700">
            早見表（100万・200万・300万・年利15%・3年/5年）
          </Link>
        </p>
        <p className="mt-3 text-sm text-stone-600 leading-relaxed">
          迷ったら
          <Link href="/faq" className="ml-1 font-medium text-emerald-900 underline decoration-emerald-200 hover:decoration-emerald-700">
            FAQ
          </Link>
          、用語の意味を確認したいときは
          <Link href="/glossary" className="ml-1 font-medium text-emerald-900 underline decoration-emerald-200 hover:decoration-emerald-700">
            用語集
          </Link>
          を先に見ると読み進めやすくなります。
        </p>

        {storyArticles.length > 0 && (
          <section className="mt-10 border-t border-stone-200/80 pt-10" aria-labelledby="articles-story-heading">
            <h2 id="articles-story-heading" className="ds-section-title">
              体験記・ストーリー
            </h2>
            <p className="mt-3 text-base text-stone-600 leading-relaxed">
              体験記・ストーリー形式の記事です。
            </p>
            <ul className="mt-5 divide-y divide-stone-200/70 rounded-xl border border-stone-200/50 bg-white/45">
              {storyArticles.map((article) => {
                const dateLabel = formatPublishedAt(article.publishedAt);
                return (
                  <li key={article.slug}>
                    <Link
                      href={`/articles/${article.slug}`}
                      className="block px-4 py-4 transition first:rounded-t-xl last:rounded-b-xl hover:bg-stone-50/85 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700/25 focus-visible:ring-inset"
                    >
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-md border border-stone-200/80 bg-stone-50/90 px-2 py-0.5 text-xs font-medium text-stone-600">
                          {CATEGORY_LABELS[article.category]}
                        </span>
                        {article.badge && (
                          <span className="rounded-md bg-emerald-900 px-2 py-0.5 text-xs font-semibold text-white">
                            {article.badge}
                          </span>
                        )}
                        {dateLabel && (
                          <time className="ds-meta text-stone-500" dateTime={article.publishedAt}>
                            {dateLabel}
                          </time>
                        )}
                      </div>
                      <span className="mt-2 block text-base font-semibold text-stone-900 leading-snug">{article.title}</span>
                      <p className="mt-1.5 text-base text-stone-600 leading-relaxed line-clamp-2">{article.summary}</p>
                      <span className="ds-meta mt-2 inline-block text-emerald-900">読む →</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        )}

        <div className="mt-10 space-y-12">
          {ARTICLE_LIST_SECTIONS.map((section) => {
            const items = section.articleCategories.flatMap(
              (cat) => byCategory.get(cat) ?? []
            );
            return (
              <section key={section.id} id={section.id} className="scroll-mt-24">
                <h2 className="ds-section-title flex flex-wrap items-center gap-2 text-xl md:text-2xl">
                  <span>{section.label}</span>
                  <span className="rounded-full bg-stone-100/90 px-2 py-0.5 text-xs font-medium text-stone-500 tabular-nums">
                    {items.length}
                  </span>
                </h2>
                <p className="mt-3 text-base text-stone-700 leading-relaxed">
                  {section.description}
                </p>
                {items.length > 0 ? (
                  <ul className="mt-5 divide-y divide-stone-200/75 border-y border-stone-200/65">
                    {items.map((article) => {
                      const dateLabel = formatPublishedAt(article.publishedAt);
                      return (
                      <li key={article.slug}>
                        <Link
                          href={`/articles/${article.slug}`}
                          className="block py-5 first:pt-0 transition hover:bg-stone-50/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700/20 focus-visible:ring-inset -mx-3 rounded-lg px-3"
                        >
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="rounded-md border border-stone-200/80 bg-stone-50/90 px-2 py-0.5 text-xs font-medium text-stone-600">
                              {CATEGORY_LABELS[article.category]}
                            </span>
                            {article.order === 0 && (
                              <span className="rounded-md bg-emerald-800 px-2 py-0.5 text-xs font-semibold text-white">
                                おすすめ
                              </span>
                            )}
                            {article.badge && (
                              <span className="rounded-md bg-emerald-900 px-2 py-0.5 text-xs font-semibold text-white">
                                {article.badge}
                              </span>
                            )}
                            {dateLabel && (
                              <time className="ds-meta text-stone-500" dateTime={article.publishedAt}>
                                {dateLabel}
                              </time>
                            )}
                          </div>
                          <h3 className="ds-page-serif mt-3 text-lg font-semibold text-stone-900">{article.title}</h3>
                          <p className="mt-2 text-base text-stone-600 leading-relaxed">{article.summary}</p>
                          <span className="ds-meta mt-3 inline-block text-emerald-900">記事を読む →</span>
                        </Link>
                      </li>
                    );
                    })}
                  </ul>
                ) : (
                  <p className="mt-5 text-base text-stone-500 leading-relaxed">
                    このカテゴリの記事は準備中です。順次追加していきます。
                  </p>
                )}
              </section>
            );
          })}
        </div>

        <section className="mt-12 rounded-xl border border-stone-200/55 bg-white/50 p-6 shadow-sm">
          <h2 className="ds-h2">自分の条件で試算する</h2>
          <p className="mt-3 text-base text-stone-700 leading-relaxed">
            記事で理解した条件の違いを、自分の数字で確認できます。借入額・金利・返済期間・追加返済を入力し、月々返済額・総利息・完済時期を条件別に比較して、記事とシミュレーターを往復して判断に役立ててください。
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href="/simulator/cardloan"
              className="ds-btn ds-btn-primary"
            >
              返済額を試算する（シミュレーター） →
            </Link>
            <Link
              href="/tools/fixed-cost-impact"
              className="ds-btn ds-btn-secondary text-base"
            >
              固定費削減インパクトを計算する →
            </Link>
          </div>
        </section>

        <section className="mt-6 rounded-xl border border-stone-200/55 bg-white/50 p-6 shadow-sm">
          <h2 className="ds-h2">迷ったときの補助ページ</h2>
          <p className="mt-3 text-base text-stone-700 leading-relaxed">
            迷ったら FAQ、用語の意味を確認したい場合は用語集を活用してください。
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link href="/faq" className="ds-btn ds-btn-secondary text-base">
              FAQを見る →
            </Link>
            <Link href="/glossary" className="ds-btn ds-btn-secondary text-base">
              用語集を見る →
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
