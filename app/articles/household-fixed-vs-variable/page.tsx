import type { Metadata } from "next";
import Link from "next/link";
import { ArticleFooter } from "@/app/components/ArticleFooter";
import { ArticlePagePremise, ArticleReadingPoints, ArticleEditorMemo } from "@/app/components/article";
import { getArticleBreadcrumbJsonLd, getArticleFaqJsonLd } from "@/lib/article-structured-data";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://debt-simulator-quzc.vercel.app";
const ARTICLE_URL = `${BASE}/articles/household-fixed-vs-variable`;
const ARTICLE_TITLE = "固定費と変動費の分け方｜何が固定費で何が変動費か";

export const metadata: Metadata = {
  title: ARTICLE_TITLE,
  description:
    "家計を把握するときの「固定費」と「変動費」の分け方と、それぞれ何を入れるかを整理します。",
  alternates: { canonical: ARTICLE_URL },
  openGraph: {
    title: ARTICLE_TITLE,
    description:
      "家計を把握するときの「固定費」と「変動費」の分け方と、それぞれ何を入れるかを整理します。",
    url: ARTICLE_URL,
    type: "article",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: ARTICLE_TITLE,
  description:
    "家計を把握するときの「固定費」と「変動費」の分け方と、それぞれ何を入れるかを整理します。",
  url: ARTICLE_URL,
  datePublished: "2025-03-11",
  dateModified: "2025-03-11",
  author: { "@type": "Organization", name: "借入返済シミュレーター" },
  publisher: { "@type": "Organization", name: "借入返済シミュレーター" },
};

const faqItems = [
  {
    question: "固定費とは何ですか？",
    answer:
      "毎月（または毎年）ほぼ一定でかかる支出のことです。家賃・通信費・保険・ローン返済・サブスク・電気・ガス・水道などが典型的な例です。一度決まると変えにくいものが多く、見直すと効果が続きやすいという特徴があります。",
  },
  {
    question: "変動費とは何ですか？",
    answer:
      "月によって増減する支出のことです。食費・日用品・交際費・衣服・趣味・光熱費の使用量分などが該当します。節約の余地はある一方、削りすぎると生活の質が下がりやすいので、固定費を先に見直すことが多いです。",
  },
  {
    question: "光熱費は固定費ですか、変動費ですか？",
    answer:
      "基本料金は固定費、使用量に応じる部分は変動費と分ける考え方が一般的です。シンプルに「光熱費は固定費」とまとめて扱うこともあります。自分が把握しやすい方でよいです。",
  },
  {
    question: "固定費を見直すメリットは何ですか？",
    answer:
      "一度見直すと毎月効果が続きやすく、年間で見ると差が大きくなりやすいです。当サイトの固定費見直しチェックリストでは、サブスク・通信費・保険・光熱費などの順で見直しを推奨しています。",
  },
  {
    question: "借入返済は固定費に入れますか？",
    answer:
      "はい。住宅ローン・カードローン・リボ払いの毎月の返済額などは、毎月決まった額（または最低額）が出ていくため、固定費として扱うことが多いです。固定費の合計に含めると、手取りとのバランスが把握しやすくなります。",
  },
];

const breadcrumbJsonLd = getArticleBreadcrumbJsonLd(ARTICLE_URL, ARTICLE_TITLE);
const faqJsonLd = getArticleFaqJsonLd(faqItems);

const tocItems = [
  { id: "premise", label: "このページの前提" },
  { id: "conclusion", label: "結論｜固定費＝毎月ほぼ一定、変動費＝月で増減" },
  { id: "reading-points", label: "読み方のポイント" },
  { id: "fixed", label: "固定費に含めるもの" },
  { id: "variable", label: "変動費に含めるもの" },
  { id: "editor-memo", label: "編集メモ" },
  { id: "faq", label: "よくある質問" },
  { id: "summary", label: "まとめ" },
];

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

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
            家計を把握するとき、「固定費」と「変動費」に分けると見えやすくなります。このページでは、何を固定費・変動費に入れるかの分け方と、それぞれの特徴を整理します。
          </p>

          <section id="premise" className="mt-6">
            <ArticlePagePremise
              comparisonConditions={[
                "固定費＝毎月（または毎年）ほぼ一定でかかる支出、変動費＝月によって増減する支出、という整理で書いている",
                "境界が曖昧なもの（光熱費など）は、どちらに含めてもよいとしている",
              ]}
              reasonForConditions="家計の把握や固定費見直しの記事と一貫した用語で読めるようにするためです。"
            />
          </section>

          <section className="mt-6 rounded-2xl border border-gray-200 bg-gray-50 p-4">
            <h2 className="text-sm font-black text-gray-900">目次</h2>
            <ul className="mt-2 space-y-1.5 text-sm">
              {tocItems.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className="text-gray-700 hover:underline">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <div className="mt-8 space-y-10 text-sm text-gray-700 leading-relaxed">
            <section id="conclusion">
              <h2 className="text-lg font-black text-gray-900 md:text-xl">
                結論｜固定費＝毎月ほぼ一定、変動費＝月で増減
              </h2>
              <p className="mt-3">
                <strong>固定費</strong>は、家賃・通信費・保険・ローン返済・サブスク・光熱の基本料金など、毎月（または毎年）ほぼ一定でかかる支出です。一度決まると変えにくい一方、見直すと効果が続きやすいです。<strong>変動費</strong>は、食費・日用品・交際費・衣服・趣味など、月によって増減する支出です。固定費を把握すると、手取りとの差（変動費に回せる額）が見えやすくなり、固定費見直しの材料にもなります。
              </p>
            </section>

            <section id="reading-points">
              <ArticleReadingPoints
                points={[
                  {
                    label: "固定費をまず把握する",
                    body: "固定費の合計が手取りの何割かを知ると、残りで生活できるか・見直す余地があるかが判断しやすくなります。",
                  },
                  {
                    label: "境界は厳密でなくてよい",
                    body: "光熱費など、基本料金は固定・使用量分は変動と分けることも、まとめて固定費とすることもできます。自分が把握しやすい方でよいです。",
                  },
                  {
                    label: "固定費見直しにつなげる",
                    body: "固定費が一覧できたら、どこから見直すかの材料になります。固定費見直しチェックリストを参照できます。",
                  },
                ]}
                misconceptions={[
                  "「固定費と変動費は厳密に分けないといけない」と思いがちですが、大まかで十分な場合が多く、自分がわかりやすい分け方でよいです。",
                  "「変動費ばかり見がち」ですが、固定費の方が一度見直すと効果が続きやすいので、固定費から把握・見直しするのがおすすめです。",
                ]}
              />
            </section>

            <section id="fixed">
              <h2 className="text-lg font-black text-gray-900 md:text-xl">固定費に含めるもの</h2>
              <ul className="mt-3 list-disc pl-5 space-y-1">
                <li>家賃・住宅ローン（持ち家の場合の返済）</li>
                <li>通信費（スマホ・自宅回線・サブスクなど）</li>
                <li>保険料</li>
                <li>借入の返済（カードローン・リボ払いの毎月の返済など）</li>
                <li>電気・ガス・水道（基本料金、または光熱費全体をまとめて固定費とする場合も）</li>
                <li>車（ローン・保険・税金・駐車場など）</li>
                <li>その他、毎月ほぼ一定で出るもの（新聞・習い事・塾など）</li>
              </ul>
            </section>

            <section id="variable">
              <h2 className="text-lg font-black text-gray-900 md:text-xl">変動費に含めるもの</h2>
              <ul className="mt-3 list-disc pl-5 space-y-1">
                <li>食費・日用品</li>
                <li>交際費・娯楽</li>
                <li>衣服・美容</li>
                <li>光熱費の使用量分（変動費として分ける場合）</li>
                <li>その他、月によって増減する支出</li>
              </ul>
              <p className="mt-3">
                固定費を把握したあと、手取り − 固定費 ＝ 変動費に回せる額になります。月の収支のざっくり把握は
                <Link href="/articles/household-monthly-balance-check" className="font-bold text-gray-900 hover:underline">月の収支をざっくり把握する方法</Link>
                を、固定費の見直しは
                <Link href="/articles/fixed-cost-checklist" className="font-bold text-gray-900 hover:underline">固定費見直しチェックリスト</Link>
                を参照してください。
              </p>
            </section>

            <section id="editor-memo">
              <ArticleEditorMemo
                purpose="家計管理の「固定費・変動費」の定義を共有し、固定費見直しの記事へつなげるために書いています。"
                reasonAxis="当サイトでは固定費見直しを推奨しているため、固定費に何を入れるかを明確にしています。"
                memo="家計管理カテゴリの2本目。家計簿が続かない人向けの記事と、月の収支把握の記事のあいだに位置づけています。"
              />
            </section>

            <section id="faq">
              <h2 className="text-lg font-black text-gray-900 md:text-xl">よくある質問</h2>
              <dl className="mt-4 space-y-4">
                {faqItems.map((item, i) => (
                  <div key={i}>
                    <dt className="font-bold text-gray-900">{item.question}</dt>
                    <dd className="mt-1 text-gray-700">{item.answer}</dd>
                  </div>
                ))}
              </dl>
            </section>

            <section id="summary">
              <h2 className="text-lg font-black text-gray-900 md:text-xl">まとめ</h2>
              <ul className="mt-3 list-disc pl-5 space-y-1">
                <li>固定費＝毎月ほぼ一定でかかる支出（家賃・通信費・保険・ローン・サブスク・光熱など）。変動費＝月で増減する支出（食費・日用品・交際費など）。</li>
                <li>固定費の合計を把握すると、手取りとの差（変動費に回せる額）が見えやすくなります。</li>
                <li>固定費の見直しは
                  <Link href="/articles/fixed-cost-checklist" className="font-bold text-gray-900 hover:underline">固定費見直しチェックリスト</Link>
                  を参照してください。
                </li>
              </ul>
            </section>
          </div>

          <ArticleFooter articleSlug="household-fixed-vs-variable" />
        </div>
      </article>
    </>
  );
}
