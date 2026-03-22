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

  const quickRefCategories: ArticleCategory[] = [
    "loan-amount",
    "repayment-method",
    "revolving",
    "repayment-planning",
    "repayment-improvement",
  ];
  const showQuickReference = quickRefCategories.includes(cat);

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
        <p className="mt-3 text-base text-stone-600 leading-relaxed">{desc}</p>
        <p className="mt-2 text-xs text-stone-500">{SITE_NAME} のカテゴリ別一覧です。</p>
      </header>

      <section
        className="mb-10 rounded-xl border border-emerald-200/60 bg-emerald-50/40 p-5 shadow-sm"
        aria-labelledby="category-sim-heading"
      >
        <h2 id="category-sim-heading" className="text-base font-semibold text-stone-900">
          条件を変えて試算する
        </h2>
        <p className="mt-2 text-sm text-stone-600 leading-relaxed">
          記事の数値は一例です。借入額・金利・返済期間を自分の前提で確認するには、返済シミュレーターが便利です。
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <TrackedLink
            href="/simulator/cardloan"
            className="ds-btn ds-btn-primary"
            event={{
              action: "click_category_simulator_cta",
              location: "category_page",
              target: "/simulator/cardloan",
              link_type: "simulator_cta",
              category_key: cat,
            }}
          >
            借入返済シミュレーター →
          </TrackedLink>
          {showQuickReference && (
            <TrackedLink
              href="/quick-reference"
              className="ds-btn ds-btn-secondary"
              event={{
                action: "click_category_quick_reference",
                location: "category_page",
                target: "/quick-reference",
                link_type: "quick_reference",
                category_key: cat,
              }}
            >
              早見表（100万〜） →
            </TrackedLink>
          )}
        </div>
      </section>

      {items.length === 0 ? (
        <p className="text-base text-stone-600 leading-relaxed">このカテゴリにはまだ記事がありません。</p>
      ) : (
        <ul className="divide-y divide-stone-200/75 overflow-hidden rounded-xl border border-stone-200/50 bg-white/45">
          {items.map((article) => (
            <li key={article.slug}>
              <TrackedLink
                href={`/articles/${article.slug}`}
                className="block px-4 py-4 transition first:rounded-t-xl last:rounded-b-xl hover:bg-stone-50/85"
                event={{
                  action: "click_category_article",
                  location: "category_page",
                  target: `/articles/${article.slug}`,
                  link_type: "category_article",
                  article_slug: article.slug,
                  category_key: article.category,
                }}
              >
                <span className="rounded-md border border-stone-200/80 bg-stone-50/90 px-2 py-0.5 text-xs font-medium text-stone-600">
                  {CATEGORY_LABELS[article.category as ArticleCategory]}
                </span>
                <span className="mt-2 block text-base font-semibold text-stone-900 leading-snug">{article.title}</span>
                <p className="mt-1.5 text-base text-stone-600 leading-relaxed line-clamp-2">{article.summary}</p>
              </TrackedLink>
            </li>
          ))}
        </ul>
      )}

      <p className="mt-10 text-base leading-relaxed">
        <Link href="/articles" className="font-semibold text-emerald-900 underline">
          全カテゴリの記事一覧へ →
        </Link>
      </p>
    </div>
  );
}
