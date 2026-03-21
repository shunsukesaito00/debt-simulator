import type { Metadata } from "next";
import Link from "next/link";
import { ArticleFooter } from "@/app/components/ArticleFooter";
import { ArticlePagePremise, ArticleReadingPoints, ArticleEditorMemo } from "@/app/components/article";
import { getArticleBreadcrumbJsonLd, getArticleFaqJsonLd } from "@/lib/article-structured-data";
import { ARTICLE_AUTHOR_JSON_LD, ARTICLE_PUBLISHER_JSON_LD } from "@/lib/site-author";
import { ArticlePageShell } from "@/app/components/ArticlePageShell";
import { articleUsesWideLayout } from "@/lib/article-layout";


const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://debt-simulator-quzc.vercel.app";
const ARTICLE_URL = `${BASE}/articles/household-budget-starter`;
const ARTICLE_TITLE = "家計簿が続かない人のための最低限チェック｜記録せずに把握する方法";

export const metadata: Metadata = {
  title: ARTICLE_TITLE,
  description:
    "家計簿が続かない方向けに、記録せずに支出を把握する方法と、最低限チェックするポイントを整理します。",
  alternates: { canonical: ARTICLE_URL },
  openGraph: {
    title: ARTICLE_TITLE,
    description:
      "家計簿が続かない方向けに、記録せずに支出を把握する方法と、最低限チェックするポイントを整理します。",
    url: ARTICLE_URL,
    type: "article",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: ARTICLE_TITLE,
  description:
    "家計簿が続かない方向けに、記録せずに支出を把握する方法と、最低限チェックするポイントを整理します。",
  url: ARTICLE_URL,
  datePublished: "2025-03-11",
  dateModified: "2025-03-11",
  author: ARTICLE_AUTHOR_JSON_LD,
  publisher: ARTICLE_PUBLISHER_JSON_LD,
};

const faqItems = [
  {
    question: "家計簿が続かないのですが、どうすればよいですか？",
    answer:
      "まず「毎日つける」ことをやめて、通帳やクレジットカードの明細を月1回見るだけでも、お金の流れはある程度把握できます。記録するなら「固定費だけ」「食費だけ」など、項目を絞ると続けやすくなります。",
  },
  {
    question: "記録せずに支出を把握する方法はありますか？",
    answer:
      "銀行口座・クレジットカード・電子マネーの利用明細を定期的に確認し、「何にいくら出ているか」をざっくり把握する方法があります。明細の費目やメモで十分で、細かい家計簿がなくても、固定費と変動費の大まかな割合は見えやすくなります。",
  },
  {
    question: "最低限チェックすべき項目は何ですか？",
    answer:
      "毎月必ず出る「固定費」（家賃・通信費・保険・ローンなど）の合計と、手取りとの差を確認するのがおすすめです。固定費が手取りの何割かを知っておくと、残りで生活できるかが判断しやすくなります。",
  },
  {
    question: "固定費を見直したいです。",
    answer:
      "固定費の一覧がわかると、どこから見直すかの材料になります。当サイトの固定費見直しチェックリストでは、サブスク・通信費・保険・光熱費などの順番で見直しを推奨しています。",
  },
  {
    question: "借入返済と家計の関係を知りたいです。",
    answer:
      "固定費のなかには借入の返済も含まれます。月々の返済額が手取りの何割か、他の固定費とあわせて把握すると、無理のない返済計画を立てやすくなります。借入返済シミュレーターで条件を試すこともできます。",
  },
];

const breadcrumbJsonLd = getArticleBreadcrumbJsonLd(ARTICLE_URL, ARTICLE_TITLE);
const faqJsonLd = getArticleFaqJsonLd(faqItems);

const tocItems = [
  { id: "premise", label: "このページの前提" },
  { id: "conclusion", label: "結論｜記録を減らして「見る」だけでも把握できる" },
  { id: "reading-points", label: "読み方のポイント" },
  { id: "minimal-check", label: "最低限チェックするポイント" },
  { id: "no-diary-method", label: "記録せずに把握する方法" },
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

      
      <ArticlePageShell currentPageTitle={ARTICLE_TITLE} wide={articleUsesWideLayout("household-budget-starter")}>
<div className="ds-card ds-card-pad">
          <h1 className="text-2xl font-black text-stone-900 md:text-3xl">{ARTICLE_TITLE}</h1>

          <p className="mt-4 text-sm text-stone-600 leading-relaxed">
            家計簿をつけたいけれど続かない、という方は多いです。このページでは、<strong>記録を頑張らなくても</strong>支出を把握する方法と、最低限チェックするポイントを整理します。
          </p>

          <section id="premise" className="mt-6">
            <ArticlePagePremise
              comparisonConditions={[
                "「家計簿＝毎日細かくつける」ではなく、記録のハードルを下げて把握する方法を中心に書いている",
                "固定費・変動費の考え方は当サイトの他の記事（固定費見直しなど）とつなげて読めるようにしている",
              ]}
              reasonForConditions="続かない家計簿より、続く・負担の少ない把握の仕方の方が、長期的に役立つと考えているためです。"
            />
          </section>

          <section className="mt-6 ds-subcard p-4">
            <h2 className="text-sm font-black text-stone-900">目次</h2>
            <ul className="mt-2 space-y-1.5 text-sm">
              {tocItems.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className="text-stone-700 hover:underline">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <div className="mt-8 space-y-10 text-sm text-stone-700 leading-relaxed">
            <section id="conclusion">
              <h2 className="text-lg font-black text-stone-900 md:text-xl">
                結論｜記録を減らして「見る」だけでも把握できる
              </h2>
              <p className="mt-3">
                家計簿が続かない場合は、<strong>「つける」ことをやめて「見る」だけ</strong>にすると負担が減ります。通帳・クレジットカード・電子マネーの明細を月1回確認し、何にいくら出ているかをざっくり把握するだけでも、固定費と変動費の感覚はつかめます。そのうえで、固定費の合計が手取りの何割かを最低限チェックすると、見直しの材料にもなります。
              </p>
            </section>

            <section id="reading-points">
              <ArticleReadingPoints
                points={[
                  {
                    label: "記録のハードルを下げる",
                    body: "毎日・全項目をつけなくても、明細を「見る」だけでもお金の流れは把握できます。",
                  },
                  {
                    label: "固定費をまず把握する",
                    body: "毎月必ず出る固定費の合計がわかると、手取りとの差（変動費に回せる額）が見えやすくなります。",
                  },
                  {
                    label: "固定費見直しにつなげる",
                    body: "固定費が把握できたら、どこから見直すかの材料になります。当サイトの固定費見直しチェックリストを参照できます。",
                  },
                ]}
                misconceptions={[
                  "「家計簿は毎日つけないと意味がない」と思いがちですが、月1回の明細確認だけでも、多くの人は支出の傾向を把握できます。",
                  "「細かく分類しないとダメ」と思いがちですが、まずは固定費の合計と手取りの関係だけ押さえるだけでも十分な場合があります。",
                ]}
              />
            </section>

            <section id="minimal-check">
              <h2 className="text-lg font-black text-stone-900 md:text-xl">最低限チェックするポイント</h2>
              <ul className="mt-3 list-disc pl-5 space-y-1">
                <li>手取り（月の収入から税金・社会保険を引いたあと）</li>
                <li>固定費の合計（家賃・通信費・保険・ローン・サブスクなど、毎月必ず出るもの）</li>
                <li>手取り − 固定費 ＝ 変動費に回せる額</li>
              </ul>
              <p className="mt-3">
                固定費が手取りの何割かを知っておくと、「残りで生活できるか」「見直す余地があるか」が判断しやすくなります。固定費と変動費の分け方の詳細は
                <Link href="/articles/household-fixed-vs-variable" className="font-bold text-stone-900 hover:underline">固定費と変動費の分け方</Link>
                を参照してください。
              </p>
            </section>

            <section id="no-diary-method">
              <h2 className="text-lg font-black text-stone-900 md:text-xl">記録せずに把握する方法</h2>
              <p className="mt-3">
                銀行口座・クレジットカード・キャリア決済・電子マネーの利用明細を、月1回程度確認します。費目がついている場合はそのまま、ついていなければ「食費」「日用品」「交際費」など自分でざっくりメモするだけでも構いません。細かい数字より「何に多く出ているか」の感覚がつかめれば、固定費の見直しや支出の調整の材料になります。
              </p>
              <p className="mt-3">
                月の収支を手取りから逆算する考え方は
                <Link href="/articles/household-monthly-balance-check" className="font-bold text-stone-900 hover:underline">月の収支をざっくり把握する方法</Link>
                で整理しています。固定費を見直すときは
                <Link href="/articles/fixed-cost-checklist" className="font-bold text-stone-900 hover:underline">固定費見直しチェックリスト</Link>
                を参照してください。
              </p>
            </section>

            <section id="editor-memo">
              <ArticleEditorMemo
                purpose="家計簿が続かない人に「記録しなくても把握できる」方法を伝え、固定費見直しや借入返済の記事へつなげる入口にしたいと考えています。"
                reasonAxis="完璧な家計簿より、続く・負担の少ない把握の仕方を優先して書いています。"
                memo="家計管理カテゴリの1本目として、最低限のチェックと記録しない方法に絞っています。"
              />
            </section>

            <section id="faq">
              <h2 className="text-lg font-black text-stone-900 md:text-xl">よくある質問</h2>
              <dl className="mt-4 space-y-4">
                {faqItems.map((item, i) => (
                  <div key={i}>
                    <dt className="font-bold text-stone-900">{item.question}</dt>
                    <dd className="mt-1 text-stone-700">{item.answer}</dd>
                  </div>
                ))}
              </dl>
            </section>

            <section id="summary">
              <h2 className="text-lg font-black text-stone-900 md:text-xl">まとめ</h2>
              <ul className="mt-3 list-disc pl-5 space-y-1">
                <li>家計簿が続かない場合は、<strong>「つける」より「見る」</strong>にすると負担が減ります。明細の確認だけでも支出の傾向は把握できます。</li>
                <li>最低限、手取りと固定費の合計、その差（変動費に回せる額）をチェックすると、見直しの材料になります。</li>
                <li>固定費・変動費の分け方は
                  <Link href="/articles/household-fixed-vs-variable" className="font-bold text-stone-900 hover:underline">固定費と変動費の分け方</Link>
                  、固定費の見直しは
                  <Link href="/articles/fixed-cost-checklist" className="font-bold text-stone-900 hover:underline">固定費見直しチェックリスト</Link>
                  を参照してください。
                </li>
              </ul>
            </section>
          </div>

          <ArticleFooter articleSlug="household-budget-starter" />
        </div>
      </ArticlePageShell>
    </>
  );
}
