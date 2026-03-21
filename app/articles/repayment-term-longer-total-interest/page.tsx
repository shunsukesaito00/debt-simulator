import type { Metadata } from "next";
import Link from "next/link";
import { ArticleFooter } from "@/app/components/ArticleFooter";
import {
  ArticlePagePremise,
  ArticleReadingPoints,
  ArticleEditorMemo,
  ArticleStandardBlocks,
  ArticleProse,
} from "@/app/components/article";
import { getArticleBreadcrumbJsonLd, getArticleFaqJsonLd } from "@/lib/article-structured-data";
import { ARTICLE_AUTHOR_JSON_LD, ARTICLE_PUBLISHER_JSON_LD } from "@/lib/site-author";
import { ArticlePageShell } from "@/app/components/ArticlePageShell";
import { articleUsesWideLayout } from "@/lib/article-layout";

const SLUG = "repayment-term-longer-total-interest" as const;

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://debt-simulator-quzc.vercel.app";
const ARTICLE_URL = `${BASE}/articles/${SLUG}`;
const ARTICLE_TITLE = "返済期間を延ばすと総利息はどれだけ増える？100万円・年利15%・元利均等の比較";

export const metadata: Metadata = {
  title: ARTICLE_TITLE,
  description:
    "借入100万円・年利15%・元利均等返済で、3年・5年・7年にしたときの月々返済額と総利息の違いを整理。期間を延ばすほど利息が増えやすい理由とシミュでの比較のコツ。",
  alternates: { canonical: ARTICLE_URL },
  openGraph: {
    title: ARTICLE_TITLE,
    description:
      "借入100万円・年利15%・元利均等返済で、3年・5年・7年にしたときの月々返済額と総利息の違いを整理。期間を延ばすほど利息が増えやすい理由とシミュでの比較のコツ。",
    url: ARTICLE_URL,
    type: "article",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: ARTICLE_TITLE,
  description:
    "借入100万円・年利15%・元利均等返済で、3年・5年・7年にしたときの月々返済額と総利息の違いを整理。期間を延ばすほど利息が増えやすい理由とシミュでの比較のコツ。",
  url: ARTICLE_URL,
  datePublished: "2026-03-21",
  dateModified: "2026-03-21",
  author: ARTICLE_AUTHOR_JSON_LD,
  publisher: ARTICLE_PUBLISHER_JSON_LD,
};

const faqItems = [
  {
    question: "返済期間を延ばすとなぜ総利息が増えますか？",
    answer:
      "返済期間が長いほど、元本が減るまでの時間が長くなり、その間に支払う利息の回数・金額が積み上がりやすいからです。月々の返済額は下がりやすい一方で、トータルの利息は増えやすい、というトレードオフがあります。",
  },
  {
    question: "月々の返済を楽にしたい場合は期間を延ばすべきですか？",
    answer:
      "家計のキャッシュフローを優先するなら期間を延ばす選択もありますが、総利息は増えやすいです。余裕が出たら繰り上げ返済や期間の再設定を検討する、という使い分けが現実的です。",
  },
  {
    question: "同じ条件で自分の場合を試すには？",
    answer:
      "借入返済シミュレーターで元利均等を選び、返済年数（回数）を変えてA/B比較すると、月々・総利息・完済時期の違いを一度に確認しやすいです。",
  },
];

const breadcrumbJsonLd = getArticleBreadcrumbJsonLd(ARTICLE_URL, ARTICLE_TITLE);
const faqJsonLd = getArticleFaqJsonLd(faqItems);

const tocItems = [
  { id: "conclusion", label: "結論｜期間が長いほど「利息の積み上げ」が増えやすい" },
  { id: "why", label: "なぜ期間と総利息はトレードオフになりやすいか" },
  { id: "table", label: "数値例｜3年・5年・7年（100万円・年利15%・元利均等）" },
  { id: "reading-points", label: "読みどころ整理" },
  { id: "simulator", label: "シミュレーターで期間を変えて比較する" },
  { id: "notice", label: "注意点" },
  { id: "faq", label: "よくある質問" },
  { id: "summary", label: "まとめ" },
];

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      {faqJsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      )}

      <ArticlePageShell currentPageTitle={ARTICLE_TITLE} wide={articleUsesWideLayout(SLUG)}>
        <div className="ds-card ds-card-pad">
          <h1 className="text-2xl font-semibold text-stone-900 md:text-3xl">{ARTICLE_TITLE}</h1>
          <p className="mt-4 text-base text-stone-600 leading-relaxed">
            以下の数値は、当サイトの返済計算ロジックによる試算例です。実際の契約では端数・日割り等で異なる場合があります。
          </p>

          <ArticleStandardBlocks slug={SLUG} />

          <ArticlePagePremise
            comparisonConditions={[
              "借入額100万円・年利15%（途中金利変更なし）",
              "返済方式は元利均等返済",
              "返済期間のみ3年（36回）・5年（60回）・7年（84回）で比較",
            ]}
            reasonForConditions="「期間を延ばすと総利息がどう変わるか」を同じ借入条件で並べるため、金利と借入額は固定しています。"
          />

          <section className="mt-6 ds-subcard p-4">
            <h2 className="text-base font-semibold text-stone-900">目次</h2>
            <ul className="mt-2 space-y-1.5 text-base leading-relaxed">
              {tocItems.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className="text-stone-700 hover:underline">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <ArticleProse className="mt-8 space-y-10">
            <p>
              「月々の返済を少しでも楽にしたい」と思って返済期間を延ばすと、
              <strong className="font-semibold text-stone-900">毎月の支払いは下がりやすい</strong>
              のですが、その代わりに
              <strong className="font-semibold text-stone-900">総利息は増えやすい</strong>
              です。ここでは、100万円・年利15%・元利均等の例で、3年・5年・7年の違いを数字で整理します。
            </p>

            <section id="conclusion">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">結論｜期間が長いほど「利息の積み上げ」が増えやすい</h2>
              <p className="mt-3">
                元利均等返済では、返済期間が長いほど毎月の返済額は小さくなりやすい反面、
                <strong className="font-semibold text-stone-900">借入残高に利息が付く期間が長くなる</strong>
                ため、支払う利息の合計（総利息）は大きくなりやすいです。
              </p>
            </section>

            <section id="why">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">なぜ期間と総利息はトレードオフになりやすいか</h2>
              <p className="mt-3">
                毎月の返済のうち、利息はその時点の残高に対して発生します。期間を延ばすと月々の元本返済ペースが緩むため、
                <strong className="font-semibold text-stone-900">残高がゼロになるまでの月数が増え</strong>、
                利息が発生する回数も増えます。結果として、総利息は増えやすい、というイメージです。
              </p>
            </section>

            <section id="table">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">数値例｜3年・5年・7年（100万円・年利15%・元利均等）</h2>
              <p className="mt-3">
                当サイトの計算（月次・一般的な近似）による目安です。
              </p>
              <div className="mt-6 overflow-x-auto rounded-lg border border-stone-200">
                <table className="min-w-[360px] w-full text-sm">
                  <caption className="sr-only">返済期間別の月々返済額と総利息</caption>
                  <thead className="bg-stone-50 text-left">
                    <tr>
                      <th scope="col" className="px-3 py-2 font-semibold text-stone-900">
                        返済期間
                      </th>
                      <th scope="col" className="px-3 py-2 font-semibold text-stone-900">
                        初月の返済額（目安）
                      </th>
                      <th scope="col" className="px-3 py-2 font-semibold text-stone-900">
                        総利息（目安）
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    <tr>
                      <td className="px-3 py-2">3年（36回）</td>
                      <td className="px-3 py-2">約34,665円</td>
                      <td className="px-3 py-2">約247,931円</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">5年（60回）</td>
                      <td className="px-3 py-2">約23,790円</td>
                      <td className="px-3 py-2">約427,354円</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">7年（84回）</td>
                      <td className="px-3 py-2">約19,297円</td>
                      <td className="px-3 py-2">約620,824円</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-sm text-stone-600">
                7年にすると初月の負担は3年より約1.5万円/月軽くなる一方、総利息は3年より約37万円多いイメージです（試算値）。
              </p>
            </section>

            <section id="reading-points">
              <ArticleReadingPoints
                title="読みどころ整理"
                points={[
                  {
                    label: "月々が楽＝トータルが得、とは限らない",
                    body: "期間延長で月々は下がりやすいが、総利息は増えやすい。どちらを優先するかは家計の余力次第です。",
                  },
                  {
                    label: "「何年払うか」は利息の積み上がり方を変える",
                    body: "同じ金利でも、完済までの月数が増えるほど利息の合計は大きくなりやすいです。",
                  },
                  {
                    label: "あとから繰り上げや期間見直しも選択肢",
                    body: "一度長めに設定しても、余裕が出たら繰り上げ返済で利息を抑える考え方もあります。",
                  },
                ]}
              />
            </section>

            <section id="simulator">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">シミュレーターで期間を変えて比較する</h2>
              <p className="mt-3">
                <Link href="/simulator/cardloan" className="font-bold text-stone-900 hover:underline">
                  借入返済シミュレーター
                </Link>
                で「元利均等（回数指定）」を選び、返済年数だけ変えてA案・B案を並べると、月々・総利息・完済時期の差が一覧で比較しやすいです。
              </p>
              <p className="mt-3">
                あわせて
                <Link href="/articles/repayment-improvement-guide" className="font-bold text-stone-900 hover:underline">
                  返済を軽くする方法
                </Link>
                や
                <Link href="/articles/100man-100months-risk-at-15percent" className="font-bold text-stone-900 hover:underline">
                  長期返済のリスク
                </Link>
                も参照してください。
              </p>
            </section>

            <section id="notice">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">注意点</h2>
              <p className="mt-3">
                実際の借入では、金利の種類、手数料、遅延損害金、ボーナス併用などで結果が変わります。記事の数値は教育・比較のための概算です。
              </p>
            </section>

            <section id="faq">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">よくある質問</h2>
              <div className="mt-4 space-y-6">
                {faqItems.map((f) => (
                  <div key={f.question}>
                    <h3 className="text-base font-semibold text-stone-900">{f.question}</h3>
                    <p className="mt-2">{f.answer}</p>
                  </div>
                ))}
              </div>
            </section>

            <section id="summary">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">まとめ</h2>
              <p className="mt-3">
                返済期間を延ばすと月々の負担は軽くなりやすい一方、
                <strong className="font-semibold text-stone-900">総利息は増えやすい</strong>
                です。100万円・年利15%・元利均等の例では、7年は3年に比べ総利息が大きく増える試算になりました。自分の条件ではシミュレーターで期間だけ変えて比較するのがおすすめです。
              </p>
            </section>
          </ArticleProse>

          <ArticleEditorMemo
            purpose="「期間を伸ばすと楽に見えるが利息は増える」というトレードオフを、同条件の数値表で示すこと"
            reasonAxis="GROWTH 3.2 の「返済期間延ばす 総利息」に対応。3/5/7年で並べる。"
            memo="元利均等・固定金利・追加返済なしのシンプル例。"
          />

          <ArticleFooter articleSlug={SLUG} />
        </div>
      </ArticlePageShell>
    </>
  );
}
