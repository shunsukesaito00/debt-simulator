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
  title: "知っておきたいこと｜借入返済の知識とシミュレーション記事一覧",
  description:
    "借入返済、利息、返済期間、返済計画に関する解説記事一覧です。借入返済シミュレーターとあわせてご活用ください。",
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
        <p className="mt-4 text-sm text-gray-700 leading-relaxed">
          借入返済、利息、返済方式、リボ払い、繰り上げ返済など、返済計画に役立つ記事をカテゴリ別にまとめています。気になるテーマからご覧ください。
        </p>

        <div className="mt-8 space-y-10">
          {ARTICLE_CATEGORIES.map((cat) => {
            const items = byCategory.get(cat);
            if (!items || items.length === 0) return null;

            const label = CATEGORY_LABELS[cat];
            const id = cat;

            return (
              <section key={cat} id={id} className="scroll-mt-24">
                <h2 className="text-lg font-black text-gray-900 border-b border-gray-200 pb-2">
                  {label}
                </h2>
                <p className="mt-3 text-sm text-gray-700 leading-relaxed">
                  {CATEGORY_DESCRIPTIONS[cat]}
                </p>
                <ul className="mt-4 grid gap-5">
                  {items.map((article) => (
                    <li key={article.slug}>
                      <Link
                        href={`/articles/${article.slug}`}
                        className="block rounded-2xl border border-gray-200 bg-white p-5 shadow-soft transition hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gray-900/10"
                      >
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="rounded-full border border-gray-300 bg-gray-50 px-2.5 py-0.5 text-xs font-bold text-gray-700">
                            {label}
                          </span>
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

        <section className="mt-10 rounded-2xl border border-gray-200 bg-gray-50 p-6">
          <h2 className="text-base font-black text-gray-900">自分の条件で試算する</h2>
          <p className="mt-2 text-sm text-gray-700 leading-relaxed">
            借入額・金利・返済期間を入力して、月々の返済額や総利息をシミュレーションできます。
          </p>
          <Link
            href="/simulator/cardloan"
            className="mt-4 inline-flex items-center justify-center rounded-2xl bg-gray-900 px-5 py-3 text-sm font-black text-white hover:opacity-90"
          >
            自分の条件で返済額を試算する →
          </Link>
        </section>
      </div>
    </div>
  );
}
