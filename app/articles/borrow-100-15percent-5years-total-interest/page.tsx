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

const SLUG = "borrow-100-15percent-5years-total-interest" as const;

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://debt-simulator-quzc.vercel.app";
const ARTICLE_URL = `${BASE}/articles/${SLUG}`;
const ARTICLE_TITLE = "借金100万円・金利15%で5年返済すると総利息はいくら？元利均等の目安";

export const metadata: Metadata = {
  title: ARTICLE_TITLE,
  description:
    "借金100万円を年利15%で5年（60回）・元利均等返済した場合の総利息・月々返済額・総支払額の目安を整理します。3年・7年との比較も。",
  alternates: { canonical: ARTICLE_URL },
  openGraph: {
    title: ARTICLE_TITLE,
    description: "借金100万円・年利15%・5年返済の総利息と月々の目安。元利均等の試算例です。",
    url: ARTICLE_URL,
    type: "article",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: ARTICLE_TITLE,
  description:
    "借金100万円を年利15%で5年（60回）・元利均等返済した場合の総利息・月々返済額・総支払額の目安を整理します。",
  url: ARTICLE_URL,
  datePublished: "2026-03-21",
  dateModified: "2026-03-21",
  author: ARTICLE_AUTHOR_JSON_LD,
  publisher: ARTICLE_PUBLISHER_JSON_LD,
};

const faqItems = [
  {
    question: "借金100万円・年利15%・5年返済の総利息の目安は？",
    answer:
      "元利均等返済・途中金利変更なし・利息端数切り捨ての試算では、総利息は約42.7万円（427,354円）、総支払額は約142.7万円が目安です。",
  },
  {
    question: "月々の返済額はいくらくらいですか？",
    answer: "初月の目安は約23,790円です。元利均等では毎月の返済額は原則一定です。",
  },
  {
    question: "自分の条件で試すには？",
    answer:
      "借入返済シミュレーターで「元利均等」「借入額100万円」「返済期間5年」「年利15%」を設定すると確認できます。",
  },
];

const breadcrumbJsonLd = getArticleBreadcrumbJsonLd(ARTICLE_URL, ARTICLE_TITLE);
const faqJsonLd = getArticleFaqJsonLd(faqItems);

const tocItems = [
  { id: "conclusion", label: "結論｜5年返済の総利息は約42.7万円が目安" },
  { id: "numbers", label: "5年（60回）返済の内訳" },
  { id: "compare", label: "3年・5年・7年にしたときの違い（100万円・15%）" },
  { id: "reading-points", label: "読みどころ整理" },
  { id: "simulator", label: "シミュレーターで確認する" },
  { id: "notice", label: "注意点" },
  { id: "faq", label: "よくある質問" },
  { id: "summary", label: "まとめ" },
];

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      {faqJsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />}

      <ArticlePageShell currentPageTitle={ARTICLE_TITLE} wide={articleUsesWideLayout(SLUG)}>
        <div className="ds-card ds-card-pad">
          <h1 className="text-2xl font-semibold text-stone-900 md:text-3xl">{ARTICLE_TITLE}</h1>
          <p className="mt-4 text-base text-stone-600 leading-relaxed">
            以下の数値は、当サイトの返済計算ロジック（元利均等・月次・利息は円未満切り捨て）による試算例です。
          </p>

          <ArticleStandardBlocks slug={SLUG} />

          <ArticlePagePremise
            comparisonConditions={[
              "借入額100万円・年利15%（途中金利変更なし）",
              "返済方式は元利均等返済（回数指定）",
              "返済期間は5年＝60回払い",
            ]}
            reasonForConditions="「100万円・15%・5年・総利息」というクエリに答えるため、条件を固定して試算します。"
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
            <section id="conclusion">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">結論｜5年返済の総利息は約42.7万円が目安</h2>
              <p className="mt-3">
                借入100万円・年利15%・元利均等・5年（60回）返済の試算では、
                <strong className="text-stone-900">総利息は約427,354円（約42.7万円）</strong>、
                <strong className="text-stone-900">総支払額は約1,427,354円</strong>
                が目安です。初月の返済額の目安は<strong className="text-stone-900">約23,790円</strong>です。
              </p>
            </section>

            <section id="numbers">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">5年（60回）返済の内訳</h2>
              <div className="mt-6 overflow-x-auto">
                <table className="w-full min-w-[280px] border-collapse text-left">
                  <thead>
                    <tr className="border-b-2 border-stone-200">
                      <th className="py-3 pr-4 font-semibold text-stone-900">項目</th>
                      <th className="py-3 font-semibold text-stone-900">目安</th>
                    </tr>
                  </thead>
                  <tbody className="text-stone-700">
                    <tr className="border-b border-stone-200">
                      <td className="py-3 pr-4">借入額</td>
                      <td className="py-3">1,000,000円</td>
                    </tr>
                    <tr className="border-b border-stone-200">
                      <td className="py-3 pr-4">年利</td>
                      <td className="py-3">15%</td>
                    </tr>
                    <tr className="border-b border-stone-200">
                      <td className="py-3 pr-4">返済期間</td>
                      <td className="py-3">5年（60回）</td>
                    </tr>
                    <tr className="border-b border-stone-200">
                      <td className="py-3 pr-4">初月の返済額（目安）</td>
                      <td className="py-3">約23,790円</td>
                    </tr>
                    <tr className="border-b border-stone-200">
                      <td className="py-3 pr-4">総利息</td>
                      <td className="py-3">約427,354円（約42.7万円）</td>
                    </tr>
                    <tr className="border-b border-stone-200">
                      <td className="py-3 pr-4">総支払額</td>
                      <td className="py-3">約1,427,354円</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section id="compare">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">3年・5年・7年にしたときの違い（100万円・15%）</h2>
              <div className="mt-6 overflow-x-auto">
                <table className="w-full min-w-[360px] border-collapse text-left">
                  <thead>
                    <tr className="border-b-2 border-stone-200">
                      <th className="py-3 pr-4 font-semibold text-stone-900">返済期間</th>
                      <th className="py-3 pr-4 font-semibold text-stone-900">初月返済（目安）</th>
                      <th className="py-3 font-semibold text-stone-900">総利息（目安）</th>
                    </tr>
                  </thead>
                  <tbody className="text-stone-700">
                    <tr className="border-b border-stone-200">
                      <td className="py-3 pr-4">3年（36回）</td>
                      <td className="py-3 pr-4">約34,665円</td>
                      <td className="py-3">約247,931円（約24.8万円）</td>
                    </tr>
                    <tr className="border-b border-stone-200">
                      <td className="py-3 pr-4">5年（60回）</td>
                      <td className="py-3 pr-4">約23,790円</td>
                      <td className="py-3">約427,354円（約42.7万円）</td>
                    </tr>
                    <tr className="border-b border-stone-200">
                      <td className="py-3 pr-4">7年（84回）</td>
                      <td className="py-3 pr-4">約19,297円</td>
                      <td className="py-3">約620,824円（約62.1万円）</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-3">
                <Link href="/articles/borrow-200-15percent-5years-total-interest" className="font-bold text-stone-900 hover:underline">
                  200万円・同条件
                </Link>
                ・
                <Link href="/articles/borrow-300-15percent-5years-total-interest" className="font-bold text-stone-900 hover:underline">
                  300万円・同条件
                </Link>
                もあわせて参照できます。
              </p>
            </section>

            <section id="reading-points">
              <ArticleReadingPoints
                points={[
                  {
                    label: "5年返済の総利息は約42.7万円が目安",
                    body: "100万円・年利15%・元利均等・60回の試算です。",
                  },
                  {
                    label: "月々は約2.4万円前後（初月目安）",
                    body: "元利均等では毎月の返済額は概ね一定です。",
                  },
                  {
                    label: "期間を短くすると総利息は下がる",
                    body: "3年にすると総利息は約24.8万円まで下がる目安ですが、月々の返済は重くなります。",
                  },
                ]}
                misconceptions={[
                  "「100万円なら利息は軽い」と思いがちですが、15%・5年でも総利息は数十万円規模になります。",
                ]}
              />
            </section>

            <section id="simulator">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">シミュレーターで確認する</h2>
              <p className="mt-3">
                <Link href="/simulator/cardloan" className="font-bold text-stone-900 hover:underline">
                  借入返済シミュレーター
                </Link>
                で条件を変えて試算できます。
              </p>
              <div className="mt-6">
                <Link href="/simulator/cardloan" className="ds-btn ds-btn-primary">
                  借入返済シミュレーターで試す →
                </Link>
              </div>
            </section>

            <section id="notice">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">注意点</h2>
              <p className="mt-3">本記事の数値は参考値です。契約内容・商品条件を優先してください。</p>
            </section>

            <section id="editor-memo">
              <ArticleEditorMemo
                purpose="100万円・年利15%・5年・総利息というクエリ向けの借入額別シリーズ（200万・300万と対応）。"
                reasonAxis="ロードマップ短期の条件明示記事として追加。"
                memo="数値は lib/loan-calc の元利均等で整合。"
              />
            </section>

            <section id="faq">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">よくある質問</h2>
              <div className="mt-4 space-y-6">
                {faqItems.map((f) => (
                  <div key={f.question}>
                    <h3 className="text-base font-semibold text-stone-900">{f.question}</h3>
                    <p className="mt-2 text-stone-700">{f.answer}</p>
                  </div>
                ))}
              </div>
            </section>

            <section id="summary">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">まとめ</h2>
              <p className="mt-3">
                借金100万円を年利15%で5年・元利均等返済する場合、総利息は試算上
                <strong className="text-stone-900">約42.7万円</strong>
                が目安です。
                <Link href="/articles/borrow-100-interest" className="font-bold text-stone-900 hover:underline">
                  借金100万円の利息（記事）
                </Link>
                もあわせてどうぞ。
              </p>
            </section>
          </ArticleProse>

          <ArticleFooter articleSlug={SLUG} />
        </div>
      </ArticlePageShell>
    </>
  );
}
