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

const SLUG = "fixed-principal-payment-schedule" as const;

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://debt-simulator-quzc.vercel.app";
const ARTICLE_URL = `${BASE}/articles/${SLUG}`;
const ARTICLE_TITLE = "定額元金返済の返済額は月ごとにどう変わる？推移の見方と数値例";

export const metadata: Metadata = {
  title: ARTICLE_TITLE,
  description:
    "定額元金返済では毎月の元本が一定でも、利息が残高に応じて減るため支払総額は下がっていきます。100万円・年利15%・毎月元金3万円の目安を表で整理します。",
  alternates: { canonical: ARTICLE_URL },
  openGraph: {
    title: ARTICLE_TITLE,
    description:
      "定額元金返済では毎月の元本が一定でも、利息が残高に応じて減るため支払総額は下がっていきます。100万円・年利15%・毎月元金3万円の目安を表で整理します。",
    url: ARTICLE_URL,
    type: "article",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: ARTICLE_TITLE,
  description:
    "定額元金返済では毎月の元本が一定でも、利息が残高に応じて減るため支払総額は下がっていきます。100万円・年利15%・毎月元金3万円の目安を表で整理します。",
  url: ARTICLE_URL,
  datePublished: "2026-03-21",
  dateModified: "2026-03-21",
  author: ARTICLE_AUTHOR_JSON_LD,
  publisher: ARTICLE_PUBLISHER_JSON_LD,
};

const faqItems = [
  {
    question: "定額元金返済では毎月の返済額は下がりますか？",
    answer:
      "一般的には下がります。毎月の元本返済額を固定している一方で、利息は残高に対して計算されるため、残高が減るほど利息負担が軽くなり、支払総額（元本＋利息）も下がっていきます。",
  },
  {
    question: "元本は毎月同じなのに、なぜ支払総額が変わるのですか？",
    answer:
      "支払総額は「元本返済分」と「利息」の合計です。定額元金では元本部分は毎月同じでも、利息はその時点の残高に比例するため、月によって合計額が変わります。",
  },
  {
    question: "定額元利との違いは何ですか？",
    answer:
      "定額元利は毎月の返済総額を一定に近づける方式で、元本と利息の内訳は月ごとに変わります。定額元金は毎月の元本返済額を固定し、利息が残高に応じて変わるため、支払総額の推移の形が異なります。",
  },
  {
    question: "最終月だけ支払額が小さくなることはありますか？",
    answer:
      "残高が毎月の元本返済額より小さい最終月では、元本に上乗せする利息も小さくなり、完済に必要な額だけの支払いになることがあります。商品の端数処理によって表示は異なります。",
  },
  {
    question: "自分の条件で推移を見るには？",
    answer:
      "本サイトの借入返済シミュレーターで「定額元金（金額指定）」を選び、毎月の元本額を入力すると、返済表で月ごとの支払いと残高を確認できます。",
  },
];

const breadcrumbJsonLd = getArticleBreadcrumbJsonLd(ARTICLE_URL, ARTICLE_TITLE);
const faqJsonLd = getArticleFaqJsonLd(faqItems);

const tocItems = [
  { id: "conclusion", label: "結論｜元本は固定、利息が減るので支払総額は下がる" },
  { id: "mechanism", label: "仕組み｜なぜ月によって合計が変わるか" },
  { id: "numbers", label: "数値例｜100万円・年利15%・毎月元金3万円" },
  { id: "reading-points", label: "読みどころ整理" },
  { id: "simulator", label: "返済表で推移を確認する" },
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
            以下の数値は、当サイトの返済計算（利息は残高×月利を切り捨て）による概算です。実際の契約では端数・日割り・手数料で異なる場合があります。
          </p>

          <ArticleStandardBlocks slug={SLUG} />

          <ArticlePagePremise
            comparisonConditions={[
              "借入額100万円・年利15%（月利は年利÷12、利息は毎月切り捨て）",
              "定額元金返済で、毎月の元本返済額を3万円に固定",
              "追加返済・ボーナス返済なし",
            ]}
            reasonForConditions="定額元金の「支払総額の推移」を分かりやすく見せるため、シミュレーターと同じ考え方にそろえた例です。"
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
              定額元金返済は、「毎月いくら<strong className="font-semibold text-stone-900">元本</strong>を返すか」をあらかじめ決める方式です。名前に「定額」とつくので、
              <strong className="font-semibold text-stone-900">毎月の支払い総額も一定</strong>
              と誤解しやすいですが、実際には<strong className="font-semibold text-stone-900">月ごとに減っていく</strong>ことが多いです。
            </p>

            <section id="conclusion">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">結論｜元本は固定、利息が減るので支払総額は下がる</h2>
              <p className="mt-3">
                定額元金では、毎月の<strong className="font-semibold text-stone-900">元本返済分は同じ</strong>でも、その月の
                <strong className="font-semibold text-stone-900">利息は残高に対して計算</strong>されます。返済が進んで残高が減るほど利息も小さくなるため、
                <strong className="font-semibold text-stone-900">支払総額（元本＋利息）は時間とともに下がりやすい</strong>、という整理です。
              </p>
            </section>

            <section id="mechanism">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">仕組み｜なぜ月によって合計が変わるか</h2>
              <p className="mt-3">
                各月の支払いは、ざっくり「
                <strong className="font-semibold text-stone-900">決めた元本額</strong>」＋「
                <strong className="font-semibold text-stone-900">その時点の残高に対する利息</strong>
                」です。元本額が毎月同じでも、残高が減れば利息が減るので、合計の支払額は下がっていきます。
              </p>
              <p className="mt-3">
                最終回付近では、残高が毎月の元本額より小さくなることがあり、その月は元本に上乗せする利息も小さくなり、
                <strong className="font-semibold text-stone-900">支払総額が特に低く</strong>出ることがあります。
              </p>
            </section>

            <section id="numbers">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">数値例｜100万円・年利15%・毎月元金3万円</h2>
              <p className="mt-3">
                上記条件では、完済まで<strong className="font-semibold text-stone-900">34か月</strong>・総利息の目安は約
                <strong className="font-semibold text-stone-900">21.5万円</strong>
                です（当サイトの計算ロジックによる試算）。
              </p>

              <div className="mt-6 overflow-x-auto rounded-lg border border-stone-200">
                <table className="min-w-[320px] w-full text-sm">
                  <caption className="sr-only">定額元金返済の月次支払いの目安（抜粋）</caption>
                  <thead className="bg-stone-50 text-left">
                    <tr>
                      <th scope="col" className="px-3 py-2 font-semibold text-stone-900">
                        回
                      </th>
                      <th scope="col" className="px-3 py-2 font-semibold text-stone-900">
                        支払総額（円）
                      </th>
                      <th scope="col" className="px-3 py-2 font-semibold text-stone-900">
                        うち利息（円）
                      </th>
                      <th scope="col" className="px-3 py-2 font-semibold text-stone-900">
                        返済後残高（円）
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    <tr>
                      <td className="px-3 py-2">1</td>
                      <td className="px-3 py-2">42,499</td>
                      <td className="px-3 py-2">12,499</td>
                      <td className="px-3 py-2">970,000</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">2</td>
                      <td className="px-3 py-2">42,124</td>
                      <td className="px-3 py-2">12,124</td>
                      <td className="px-3 py-2">940,000</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">3</td>
                      <td className="px-3 py-2">41,749</td>
                      <td className="px-3 py-2">11,749</td>
                      <td className="px-3 py-2">910,000</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">12</td>
                      <td className="px-3 py-2">38,375</td>
                      <td className="px-3 py-2">8,375</td>
                      <td className="px-3 py-2">640,000</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">33</td>
                      <td className="px-3 py-2">30,499</td>
                      <td className="px-3 py-2">499</td>
                      <td className="px-3 py-2">10,000</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">34（最終）</td>
                      <td className="px-3 py-2">10,124</td>
                      <td className="px-3 py-2">124</td>
                      <td className="px-3 py-2">0</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-sm text-stone-600">
                1〜3回目では支払総額が4.2万円台から4.1万円台へ下がり、最終回は残高が小さいため1万円台まで下がるイメージです。
              </p>
            </section>

            <section id="reading-points">
              <ArticleReadingPoints
                title="読みどころ整理"
                points={[
                  {
                    label: "「定額＝毎月同じ支払い」とは限らない",
                    body: "定額元金は「元本の定額」が主役で、利息が残高連動のため、支払総額は月ごとに変わります。",
                  },
                  {
                    label: "推移は「残高が減るほど利息が減る」で理解しやすい",
                    body: "グラフや返済表にすると、支払総額が右肩下がりになるイメージが掴みやすいです。",
                  },
                  {
                    label: "比較はシミュレーターが早い",
                    body: "定額元利・元利均等などとの違いは、同じ借入額で方式を切り替えると比較しやすいです。",
                  },
                ]}
              />
            </section>

            <section id="simulator">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">返済表で推移を確認する</h2>
              <p className="mt-3">
                <Link href="/simulator/cardloan" className="font-bold text-stone-900 hover:underline">
                  借入返済シミュレーター
                </Link>
                で返済方式に「定額元金（金額指定）」を選び、毎月の元本額を入力すると、月ごとの支払額・利息・残高を返済表で確認できます。
              </p>
              <p className="mt-3">
                4方式の違いは
                <Link href="/articles/repayment-method-difference" className="font-bold text-stone-900 hover:underline">
                  返済方式の比較記事
                </Link>
                もあわせて参照してください。
              </p>
            </section>

            <section id="notice">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">注意点</h2>
              <p className="mt-3">
                金融機関・商品によっては、端数処理、日割り、引き落とし日、手数料、金利の種類（固定・変動）などで表示が異なります。契約書・明細・公式試算を優先してください。
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
                定額元金返済では、毎月の元本返済額を固定しつつ、利息は残高に応じて減るため、
                <strong className="font-semibold text-stone-900">支払総額は月ごとに下がっていく</strong>
                ことが多いです。推移をイメージしたいときは、返済表がついたシミュレーターで自分の条件を試すのが確実です。
              </p>
            </section>
          </ArticleProse>

          <ArticleEditorMemo
            purpose="「定額だから毎月同じ」と誤解されやすい点を、残高連動の利息で整理すること"
            reasonAxis="100万・15%・月元金3万で、当サイトの計算と一致する表を掲載する。"
            memo="定額元金の返済額の推移を扱うテーマ向け。"
          />

          <ArticleFooter articleSlug={SLUG} />
        </div>
      </ArticlePageShell>
    </>
  );
}
