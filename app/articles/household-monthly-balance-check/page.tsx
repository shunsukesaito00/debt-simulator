import type { Metadata } from "next";
import Link from "next/link";
import { ArticleFooter } from "@/app/components/ArticleFooter";
import { ArticlePagePremise, ArticleReadingPoints, ArticleEditorMemo } from "@/app/components/article";
import { getArticleBreadcrumbJsonLd, getArticleFaqJsonLd } from "@/lib/article-structured-data";
import { ARTICLE_AUTHOR_JSON_LD, ARTICLE_PUBLISHER_JSON_LD } from "@/lib/site-author";
import { ArticlePageShell } from "@/app/components/ArticlePageShell";
import { articleUsesWideLayout } from "@/lib/article-layout";


const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://debt-simulator-quzc.vercel.app";
const ARTICLE_URL = `${BASE}/articles/household-monthly-balance-check`;
const ARTICLE_TITLE = "月の収支をざっくり把握する方法｜手取りから逆算する考え方";

export const metadata: Metadata = {
  title: ARTICLE_TITLE,
  description:
    "家計簿をつけずに、月の収支をざっくり把握する方法と、手取りから逆算する考え方を整理します。",
  alternates: { canonical: ARTICLE_URL },
  openGraph: {
    title: ARTICLE_TITLE,
    description:
      "家計簿をつけずに、月の収支をざっくり把握する方法と、手取りから逆算する考え方を整理します。",
    url: ARTICLE_URL,
    type: "article",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: ARTICLE_TITLE,
  description:
    "家計簿をつけずに、月の収支をざっくり把握する方法と、手取りから逆算する考え方を整理します。",
  url: ARTICLE_URL,
  datePublished: "2025-03-11",
  dateModified: "2025-03-11",
  author: ARTICLE_AUTHOR_JSON_LD,
  publisher: ARTICLE_PUBLISHER_JSON_LD,
};

const faqItems = [
  {
    question: "手取りから逆算するとはどういうことですか？",
    answer:
      "「手取り（収入−税金・社会保険）− 固定費 ＝ 変動費に回せる額」という式で、毎月いくらを生活費などに使えるかを先に把握する考え方です。収入がわかっていて、固定費を把握すれば、残りがいくらかが計算できます。",
  },
  {
    question: "家計簿をつけずに収支を把握できますか？",
    answer:
      "はい。通帳・クレジットカード・電子マネーの明細を月1回確認し、固定費の合計と手取りの差を出せば、変動費に回せる額は把握できます。細かい費目がなくても、ざっくり「残りで生活しているか」は判断しやすくなります。",
  },
  {
    question: "固定費が手取りの何割が目安ですか？",
    answer:
      "一般的な目安としては、固定費が手取りの6割以内だと、残り4割で変動費や貯蓄に回しやすいと言われることがあります。あくまで目安であり、住居費や借入返済の有無で変わります。まずは自分の固定費が手取りの何割かを知ることから始めるとよいです。",
  },
  {
    question: "借入返済がある場合の収支の見方は？",
    answer:
      "借入返済は固定費に含めます。手取り − 固定費（家賃・通信費・保険・返済など）＝ 変動費に回せる額、という式は同じです。返済額が大きいと残りが少なくなるので、無理のない返済計画を立てる材料として、借入返済シミュレーターで条件を試すこともできます。",
  },
  {
    question: "固定費を見直したいです。",
    answer:
      "固定費の一覧がわかると、どこから見直すかの材料になります。当サイトの固定費見直しチェックリストでは、サブスク・通信費・保険・光熱費などの順で見直しを推奨しています。固定費削減インパクト計算で、月いくら見直したときの累計効果も試算できます。",
  },
];

const breadcrumbJsonLd = getArticleBreadcrumbJsonLd(ARTICLE_URL, ARTICLE_TITLE);
const faqJsonLd = getArticleFaqJsonLd(faqItems);

const tocItems = [
  { id: "premise", label: "このページの前提" },
  { id: "conclusion", label: "結論｜手取り−固定費で残りが見える" },
  { id: "reading-points", label: "読み方のポイント" },
  { id: "reverse-calc", label: "手取りから逆算する考え方" },
  { id: "how-to-grasp", label: "ざっくり把握する手順" },
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

      
      <ArticlePageShell currentPageTitle={ARTICLE_TITLE} wide={articleUsesWideLayout("household-monthly-balance-check")}>
<div className="ds-card ds-card-pad">
          <h1 className="text-2xl font-semibold text-stone-900 md:text-3xl">{ARTICLE_TITLE}</h1>

          <p className="mt-4 text-sm text-stone-600 leading-relaxed">
            家計簿をつけなくても、手取りと固定費がわかれば、月の収支はざっくり把握できます。このページでは、<strong>手取りから逆算する考え方</strong>と、記録を頑張らなくても収支を見る方法を整理します。
          </p>

          <section id="premise" className="mt-6">
            <ArticlePagePremise
              comparisonConditions={[
                "「手取り − 固定費 ＝ 変動費に回せる額」を前提に、家計簿をつけずに収支を把握する方法を書いている",
                "固定費・変動費の考え方は当サイトの家計管理・固定費見直しの記事と一貫させている",
              ]}
              reasonForConditions="読者が負担を増やさずに、月の収支の感覚をつかめるようにするためです。"
            />
          </section>

          <section className="mt-6 ds-subcard p-4">
            <h2 className="text-sm font-semibold text-stone-900">目次</h2>
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
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">
                結論｜手取り−固定費で残りが見える
              </h2>
              <p className="mt-3">
                月の収支をざっくり把握するには、<strong>手取り（収入−税金・社会保険）から固定費を引く</strong>と、変動費や貯蓄に回せる額が見えます。家計簿で細かくつけなくても、固定費の合計がわかれば「残りで生活しているか」は判断しやすくなります。固定費が手取りの何割かを知っておくと、見直しの材料にもなります。
              </p>
            </section>

            <section id="reading-points">
              <ArticleReadingPoints
                points={[
                  {
                    label: "手取りを把握する",
                    body: "給与明細の手取り額、または収入から税金・社会保険を引いたあとの額を確認します。",
                  },
                  {
                    label: "固定費の合計を出す",
                    body: "家賃・通信費・保険・ローン・サブスク・光熱など、毎月ほぼ一定で出るものの合計を出します。固定費と変動費の分け方は別記事で整理しています。",
                  },
                  {
                    label: "手取り − 固定費 ＝ 残り",
                    body: "残りが変動費（食費・日用品・交際費など）と貯蓄に回せる額です。残りが少ない場合は固定費の見直しを検討する材料になります。",
                  },
                ]}
                misconceptions={[
                  "「収支を把握するには家計簿が必須」と思いがちですが、手取りと固定費がわかれば、残りは計算で出せます。",
                  "「細かく分類しないと意味がない」と思いがちですが、まずは固定費の合計と手取りの関係だけ押さえるだけでも、多くの判断はできます。",
                ]}
              />
            </section>

            <section id="reverse-calc">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">手取りから逆算する考え方</h2>
              <p className="mt-3">
                「今月いくら使ったか」を足し算するのではなく、<strong>「手取り − 固定費 ＝ 変動費に回せる額」</strong>で、先に残りを把握する考え方です。収入と固定費がわかっていれば、残りがいくらかは計算で出せます。残りが少ない場合は、固定費の見直しや収入の見直しを検討する材料になります。
              </p>
              <p className="mt-3">
                固定費に何を入れるかは
                <Link href="/articles/household-fixed-vs-variable" className="font-bold text-stone-900 hover:underline">固定費と変動費の分け方</Link>
                を参照してください。
              </p>
            </section>

            <section id="how-to-grasp">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">ざっくり把握する手順</h2>
              <ol className="mt-3 list-decimal pl-5 space-y-1">
                <li>手取り（月の収入−税金・社会保険）を確認する</li>
                <li>固定費の一覧を書き、合計を出す（家賃・通信費・保険・ローン・サブスク・光熱など）</li>
                <li>手取り − 固定費 ＝ 変動費に回せる額 を計算する</li>
                <li>必要に応じて、固定費が手取りの何割かを確認する</li>
              </ol>
              <p className="mt-3">
                固定費の見直しは
                <Link href="/articles/fixed-cost-checklist" className="font-bold text-stone-900 hover:underline">固定費見直しチェックリスト</Link>
                や
                <Link href="/articles/fixed-cost-guide" className="font-bold text-stone-900 hover:underline">固定費見直しの進め方</Link>
                を、借入返済の計画は
                <Link href="/simulator/cardloan" className="font-bold text-stone-900 hover:underline">借入返済シミュレーター</Link>
                を参照してください。
              </p>
            </section>

            <section id="editor-memo">
              <ArticleEditorMemo
                purpose="家計簿をつけずに収支を把握したい人に、手取りから逆算する考え方と最低限の手順を伝え、固定費見直しや借入返済の記事へつなげるために書いています。"
                reasonAxis="「つける」負担を減らし、「見る」「計算する」だけで収支の感覚をつかめるようにしています。"
                memo="家計管理カテゴリの3本目。家計簿が続かない人向け・固定費と変動費の分け方の記事とセットで読むことを想定しています。"
              />
            </section>

            <section id="faq">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">よくある質問</h2>
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
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">まとめ</h2>
              <ul className="mt-3 list-disc pl-5 space-y-1">
                <li>月の収支は<strong>手取り − 固定費 ＝ 変動費に回せる額</strong>でざっくり把握できます。家計簿をつけなくても、固定費の合計がわかれば残りは計算できます。</li>
                <li>固定費が手取りの何割かを知っておくと、見直しの材料になります。</li>
                <li>固定費の分け方は
                  <Link href="/articles/household-fixed-vs-variable" className="font-bold text-stone-900 hover:underline">固定費と変動費の分け方</Link>
                  、見直しは
                  <Link href="/articles/fixed-cost-checklist" className="font-bold text-stone-900 hover:underline">固定費見直しチェックリスト</Link>
                  を参照してください。
                </li>
              </ul>
            </section>
          </div>

          <ArticleFooter articleSlug="household-monthly-balance-check" />
        </div>
      </ArticlePageShell>
    </>
  );
}
