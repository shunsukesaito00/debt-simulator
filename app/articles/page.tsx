import type { Metadata } from "next";
import Link from "next/link";
import {
  getArticlesByCategory,
  ARTICLE_LIST_SECTIONS,
  CATEGORY_LABELS,
} from "@/lib/articles";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://debt-simulator-quzc.vercel.app";

export const metadata: Metadata = {
  title: "知っておきたいこと｜生活改善・固定負担を条件別に比較する記事一覧",
  description:
    "固定費見直し・借入返済・返済計画など、生活の負担を条件別に比較する記事一覧です。一般論ではなく具体条件で確認し、記事とシミュレーターを往復して判断材料としてご活用ください。",
  alternates: { canonical: `${BASE}/articles` },
};

const breadcrumbListJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "トップ", item: `${BASE}/` },
    { "@type": "ListItem", position: 2, name: "知っておきたいこと", item: `${BASE}/articles` },
  ],
};

export default function ArticlesListPage() {
  const byCategory = getArticlesByCategory();

  return (
    <div className="mx-auto max-w-3xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbListJsonLd) }}
      />

      <nav className="mb-4 text-sm text-gray-600" aria-label="パンくず">
        <ol className="flex flex-wrap items-center gap-1">
          <li>
            <Link href="/" className="hover:underline">
              トップ
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li className="font-bold text-gray-900" aria-current="page">
            知っておきたいこと
          </li>
        </ol>
      </nav>

      <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-soft md:p-8">
        <h1 className="text-2xl font-black text-gray-900 md:text-3xl">知っておきたいこと</h1>
        <p className="mt-5 text-sm text-gray-700 leading-relaxed">
          生活の固定負担を条件別に比較し、判断材料にするための記事です。固定費見直し・借入返済・返済計画などを、一般論ではなく具体条件で整理しています。気になるカテゴリから読み、シミュレーターで自分の条件を試算し、記事とツールを往復して判断に役立ててください。
        </p>
        <p className="mt-3 text-sm text-gray-600">
          返済額の目安を表で見る：<Link href="/quick-reference" className="font-bold text-gray-800 underline hover:no-underline">早見表（100万・200万・300万・年利15%・3年/5年）</Link>
        </p>

        <div className="mt-10 space-y-12">
          {ARTICLE_LIST_SECTIONS.map((section) => {
            const items = section.articleCategories.flatMap(
              (cat) => byCategory.get(cat) ?? []
            );
            return (
              <section key={section.id} id={section.id} className="scroll-mt-24">
                <h2 className="text-xl font-black text-gray-900 border-b-2 border-gray-200 pb-2">
                  {section.label}
                </h2>
                <p className="mt-4 text-sm text-gray-700 leading-relaxed">
                  {section.description}
                </p>
                {items.length > 0 ? (
                  <ul className="mt-5 grid gap-5">
                    {items.map((article, idx) => (
                      <li key={article.slug}>
                        <Link
                          href={`/articles/${article.slug}`}
                          className={`block rounded-2xl border p-5 shadow-soft transition hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gray-900/10 ${idx === 0 ? "border-gray-300 bg-gray-50/50" : "border-gray-200 bg-white"}`}
                        >
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="rounded-full border border-gray-300 bg-gray-50 px-2.5 py-0.5 text-xs font-bold text-gray-700">
                              {CATEGORY_LABELS[article.category]}
                            </span>
                            {article.order === 0 && (
                              <span className="rounded-full bg-amber-500 px-2.5 py-0.5 text-xs font-bold text-white">
                                おすすめ
                              </span>
                            )}
                            {article.badge && (
                              <span className="rounded-full bg-gray-900 px-2.5 py-0.5 text-xs font-bold text-white">
                                {article.badge}
                              </span>
                            )}
                          </div>
                          <h3 className="mt-3 text-lg font-black text-gray-900">{article.title}</h3>
                          <p className="mt-2 text-sm text-gray-600 leading-relaxed">{article.summary}</p>
                          <span className="mt-3 inline-block text-sm font-bold text-gray-700">記事を読む →</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-5 text-sm text-gray-500 leading-relaxed">
                    このカテゴリの記事は準備中です。順次追加していきます。
                  </p>
                )}
              </section>
            );
          })}
        </div>

        <section className="mt-12 rounded-2xl border-2 border-gray-200 bg-white p-6">
          <h2 className="text-lg font-black text-gray-900">自分の条件で試算する</h2>
          <p className="mt-3 text-sm text-gray-700 leading-relaxed">
            記事で理解した条件の違いを、自分の数字で確認できます。借入額・金利・返済期間・追加返済を入力し、月々返済額・総利息・完済時期を条件別に比較して、記事とシミュレーターを往復して判断に役立ててください。
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href="/simulator/cardloan"
              className="inline-flex items-center justify-center rounded-2xl bg-gray-900 px-6 py-3.5 text-base font-black text-white hover:opacity-90"
            >
              返済額を試算する（シミュレーター） →
            </Link>
            <Link
              href="/tools/fixed-cost-impact"
              className="inline-flex items-center justify-center rounded-2xl border-2 border-gray-300 bg-white px-6 py-3.5 text-base font-bold text-gray-800 hover:bg-gray-50"
            >
              固定費削減インパクトを計算する →
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
