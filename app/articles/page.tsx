import type { Metadata } from "next";
import Link from "next/link";
import {
  getArticlesByCategory,
  ARTICLE_CATEGORIES,
  CATEGORY_LABELS,
  CATEGORY_DESCRIPTIONS,
} from "@/lib/articles";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://debt-simulator-quzc.vercel.app";

export const metadata: Metadata = {
  title: "知っておきたいこと｜条件別に学ぶ借入返済の比較記事一覧",
  description:
    "借入額、返済方式、リボ払い、繰り上げ返済、逆算・返済計画など、返済負担を条件別に整理した記事一覧です。シミュレーターとあわせてご活用ください。",
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
          借入返済の一般論ではなく、条件別の違いを理解するための記事です。借入額別・返済方式別・逆算別など、気になる条件から読み、最後はシミュレーターで自分の条件を確認できます。記事とシミュレーターを行き来しながら判断する前提で整理しています。
        </p>

        <div className="mt-10 space-y-12">
          {ARTICLE_CATEGORIES.map((cat) => {
            const items = byCategory.get(cat);
            if (!items || items.length === 0) return null;

            const label = CATEGORY_LABELS[cat];
            const id = cat;

            return (
              <section key={cat} id={id} className="scroll-mt-24">
                <h2 className="text-xl font-black text-gray-900 border-b-2 border-gray-200 pb-2">
                  {label}
                </h2>
                <p className="mt-4 text-sm text-gray-700 leading-relaxed">
                  {CATEGORY_DESCRIPTIONS[cat]}
                </p>
                <ul className="mt-5 grid gap-5">
                  {items.map((article, idx) => (
                    <li key={article.slug}>
                      <Link
                        href={`/articles/${article.slug}`}
                        className={`block rounded-2xl border p-5 shadow-soft transition hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gray-900/10 ${idx === 0 ? "border-gray-300 bg-gray-50/50" : "border-gray-200 bg-white"}`}
                      >
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="rounded-full border border-gray-300 bg-gray-50 px-2.5 py-0.5 text-xs font-bold text-gray-700">
                            {label}
                          </span>
                          {(article.order === 0) && (
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
              </section>
            );
          })}
        </div>

        <section className="mt-12 rounded-2xl border-2 border-gray-200 bg-white p-6">
          <h2 className="text-lg font-black text-gray-900">自分の条件で試算する</h2>
          <p className="mt-3 text-sm text-gray-700 leading-relaxed">
            記事で理解した条件の違いを、自分の数字で確認できます。借入額・金利・返済期間・追加返済を入力して、月々返済額・総利息・完済時期を比較してください。
          </p>
          <Link
            href="/simulator/cardloan"
            className="mt-5 inline-flex items-center justify-center rounded-2xl bg-gray-900 px-6 py-3.5 text-base font-black text-white hover:opacity-90"
          >
            自分の条件で返済額を試算する →
          </Link>
        </section>
      </div>
    </div>
  );
}
