import type { Metadata } from "next";
import Link from "next/link";
import { ArticleFooter } from "@/app/components/ArticleFooter";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://debt-simulator-quzc.vercel.app";
const ARTICLE_URL = `${BASE}/articles/fixed-cost-guide`;
const ARTICLE_TITLE = "固定費見直しの進め方｜何から手をつけるか・改善効果の比較";

export const metadata: Metadata = {
  title: ARTICLE_TITLE,
  description:
    "通信費・サブスク・保険など、毎月の固定負担を見直したい方向けに、何から手をつけるべきかと改善効果を比較する考え方を整理します。",
  alternates: { canonical: ARTICLE_URL },
  openGraph: {
    title: ARTICLE_TITLE,
    description:
      "通信費・サブスク・保険など、毎月の固定負担を見直したい方向けに、何から手をつけるべきかと改善効果を比較する考え方を整理します。",
    url: ARTICLE_URL,
    type: "article",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: ARTICLE_TITLE,
  description:
    "通信費・サブスク・保険など、毎月の固定負担を見直したい方向けに、何から手をつけるべきかと改善効果を比較する考え方を整理します。",
  url: ARTICLE_URL,
  datePublished: "2025-03-11",
  dateModified: "2025-03-11",
  author: { "@type": "Organization", name: "借入返済シミュレーター" },
  publisher: { "@type": "Organization", name: "借入返済シミュレーター" },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="mx-auto max-w-3xl">
        <nav className="mb-4 text-sm text-gray-600" aria-label="パンくず">
          <ol className="flex flex-wrap items-center gap-1">
            <li><Link href="/" className="hover:underline">トップ</Link></li>
            <li aria-hidden>/</li>
            <li><Link href="/articles" className="hover:underline">知っておきたいこと</Link></li>
            <li aria-hidden>/</li>
            <li className="font-bold text-gray-900" aria-current="page">{ARTICLE_TITLE}</li>
          </ol>
        </nav>

        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-soft md:p-8">
          <h1 className="text-2xl font-black text-gray-900 md:text-3xl">{ARTICLE_TITLE}</h1>
          <p className="mt-4 text-sm text-gray-600 leading-relaxed">
            このカテゴリでは、毎月の固定負担を見直すための記事を、条件別に「いくら変わるか」が比較できる形で整理していきます。
          </p>

          <section className="mt-8 space-y-6 text-sm text-gray-700 leading-relaxed">
            <section>
              <h2 className="text-lg font-black text-gray-900 md:text-xl">このカテゴリの役割</h2>
              <p className="mt-3">
                通信費・サブスク・保険など、毎月決まった支出は「固定費」としてまとめて見直すと、何から手をつけるべきか整理しやすくなります。一般論ではなく、具体条件で「月いくら変わるか」「年間でどれくらいの改善効果か」を比較できる記事を、順次追加していく方針です。
              </p>
            </section>

            <section>
              <h2 className="text-lg font-black text-gray-900 md:text-xl">何から手をつけるか</h2>
              <p className="mt-3">
                見直しの優先順位は、削減しやすさ・効果の大きさ・自分の状況によって変わります。このカテゴリでは、項目別に「どの程度の改善が見込めるか」を条件付きで示し、判断材料にしてもらえるようにします。
              </p>
            </section>

            <section>
              <h2 className="text-lg font-black text-gray-900 md:text-xl">ツール・記事一覧</h2>
              <p className="mt-3">
                毎月の削減額を続けたとき、1年・3年・5年で合計いくらになるかは、
                <Link href="/tools/fixed-cost-impact" className="font-bold text-gray-900 hover:underline">固定費削減インパクト計算</Link>
                ですぐ確認できます。借入返済の月々負担を試算したい場合は、
                <Link href="/simulator/cardloan" className="font-bold text-gray-900 hover:underline">借入返済シミュレーター</Link>
                を、条件別の記事は
                <Link href="/articles" className="font-bold text-gray-900 hover:underline">記事一覧</Link>
                から探せます。
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link
                  href="/tools/fixed-cost-impact"
                  className="inline-flex items-center justify-center rounded-2xl bg-gray-900 px-5 py-2.5 text-sm font-black text-white hover:opacity-90"
                >
                  固定費削減インパクトを計算する →
                </Link>
                <Link
                  href="/simulator/cardloan"
                  className="inline-flex items-center justify-center rounded-2xl border border-gray-300 bg-white px-5 py-2.5 text-sm font-bold text-gray-700 hover:bg-gray-50"
                >
                  借入返済シミュレーター
                </Link>
                <Link
                  href="/articles"
                  className="inline-flex items-center justify-center rounded-2xl border border-gray-300 bg-white px-5 py-2.5 text-sm font-bold text-gray-700 hover:bg-gray-50"
                >
                  記事一覧を見る
                </Link>
              </div>
            </section>
          </section>

          <ArticleFooter articleSlug="fixed-cost-guide" />
        </div>
      </article>
    </>
  );
}
