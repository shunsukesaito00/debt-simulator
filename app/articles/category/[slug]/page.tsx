import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CATEGORY_DESCRIPTIONS,
  CATEGORY_LABELS,
  CATEGORY_URL_SLUGS,
  getArticlesByCategory,
  getCategoryFromUrlSlug,
  type ArticleCategory,
} from "@/lib/articles";
import { TrackedLink } from "@/app/components/TrackedLink";
import { getSiteBaseUrl, SITE_NAME } from "@/lib/site-config";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return CATEGORY_URL_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cat = getCategoryFromUrlSlug(slug);
  if (!cat) return { title: "Not Found" };
  const BASE = getSiteBaseUrl();
  const url = `${BASE}/articles/category/${slug}`;
  const title = `${CATEGORY_LABELS[cat]}の記事一覧`;
  return {
    title,
    description: CATEGORY_DESCRIPTIONS[cat],
    alternates: { canonical: url },
    openGraph: { title, description: CATEGORY_DESCRIPTIONS[cat], url, type: "website" },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const cat = getCategoryFromUrlSlug(slug);
  if (!cat) notFound();

  const byCat = getArticlesByCategory();
  const items = byCat.get(cat) ?? [];
  const label = CATEGORY_LABELS[cat];
  const desc = CATEGORY_DESCRIPTIONS[cat];

  return (
    <div className="mx-auto max-w-3xl">
      <nav className="mb-6 text-sm text-stone-600" aria-label="パンくず">
        <ol className="flex flex-wrap items-center gap-1">
          <li>
            <Link href="/" className="hover:underline">
              ホーム
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li>
            <Link href="/articles" className="hover:underline">
              記事一覧
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li className="font-bold text-stone-900">{label}</li>
        </ol>
      </nav>

      <header className="mb-8">
        <h1 className="ds-page-serif text-2xl font-bold text-stone-900 md:text-3xl">{label}の記事</h1>
        <p className="mt-3 text-sm text-stone-600 leading-relaxed">{desc}</p>
        <p className="mt-2 text-xs text-stone-500">{SITE_NAME} のカテゴリ別一覧です。</p>
      </header>

      {items.length === 0 ? (
        <p className="text-sm text-stone-600">このカテゴリにはまだ記事がありません。</p>
      ) : (
        <ul className="space-y-3">
          {items.map((article) => (
            <li key={article.slug}>
              <TrackedLink
                href={`/articles/${article.slug}`}
                className="block ds-subcard p-4 transition hover:border-emerald-200/80 hover:shadow-ds"
                event={{
                  action: "click_category_article",
                  location: "category_page",
                  target: `/articles/${article.slug}`,
                  link_type: "category_article",
                  article_slug: article.slug,
                  category_key: article.category,
                }}
              >
                <span className="rounded-md border border-stone-200 bg-stone-50 px-2 py-0.5 text-xs font-semibold text-stone-600">
                  {CATEGORY_LABELS[article.category as ArticleCategory]}
                </span>
                <span className="mt-2 block text-sm font-semibold text-stone-900 leading-snug">{article.title}</span>
                <p className="mt-1.5 text-xs text-stone-500 leading-relaxed line-clamp-2">{article.summary}</p>
              </TrackedLink>
            </li>
          ))}
        </ul>
      )}

      <p className="mt-10 text-sm">
        <Link href="/articles" className="font-semibold text-emerald-900 underline">
          全カテゴリの記事一覧へ →
        </Link>
      </p>
    </div>
  );
}
