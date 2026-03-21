import type { Metadata } from "next";
import Link from "next/link";
import { ArticleFooter } from "@/app/components/ArticleFooter";
import { ArticlePagePremise, ArticleReadingPoints, ArticleEditorMemo } from "@/app/components/article";
import { getArticleFaqJsonLd } from "@/lib/article-structured-data";
import { ARTICLE_AUTHOR_JSON_LD, ARTICLE_PUBLISHER_JSON_LD } from "@/lib/site-author";
import { ArticlePageShell } from "@/app/components/ArticlePageShell";
import { articleUsesWideLayout } from "@/lib/article-layout";


const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://debt-simulator-quzc.vercel.app";
const ARTICLE_URL = `${BASE}/articles/monthly-30000-how-much-can-borrow`;
const ARTICLE_TITLE =
  "月3万円返済ならいくらまで借りられる？年利15%で3年・5年・7年の目安を解説";

export const metadata: Metadata = {
  title: ARTICLE_TITLE,
  description:
    "毎月3万円返済できる場合、年利15%を前提に何万円くらいまで借りると現実的かを、3年・5年・7年返済の比較でわかりやすく解説します。",
  alternates: { canonical: ARTICLE_URL },
  openGraph: {
    title: ARTICLE_TITLE,
    description:
      "毎月3万円返済できる場合、年利15%を前提に何万円くらいまで借りると現実的かを、3年・5年・7年返済の比較でわかりやすく解説します。",
    url: ARTICLE_URL,
    type: "article",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: ARTICLE_TITLE,
  description:
    "毎月3万円返済できる場合、年利15%を前提に何万円くらいまで借りると現実的かを、3年・5年・7年返済の比較でわかりやすく解説します。",
  url: ARTICLE_URL,
  datePublished: "2025-03-11",
  dateModified: "2025-03-11",
  author: ARTICLE_AUTHOR_JSON_LD,
  publisher: ARTICLE_PUBLISHER_JSON_LD,
};

const tocItems = [
  { id: "premise", label: "このページの前提" },
  { id: "conclusion", label: "結論｜月3万円返済なら借入額の目安" },
  { id: "3years", label: "3年返済ならいくらまでが目安か" },
  { id: "5years", label: "5年返済ならいくらまでが目安か" },
  { id: "7years", label: "7年返済ならいくらまでが目安か" },
  { id: "reading-points", label: "読み方のポイント" },
  { id: "compare", label: "3年・5年・7年返済を比較するとどう違うか" },
  { id: "simulator", label: "自分の条件で確認するならシミュレーターが早い" },
  { id: "notice", label: "注意点" },
  { id: "editor-memo", label: "編集メモ" },
  { id: "summary", label: "まとめ" },
];

const faqItems = [
  {
    question: "月3万円返済ならいくらまで借りられますか？",
    answer:
      "年利15%・元利均等の目安では、3年返済で約90万円、5年返済で約126万円、7年返済で約154万円が借入額の目安です。",
  },
  {
    question: "返済期間を長くすると借入可能額はどう変わりますか？",
    answer:
      "返済期間を延ばすと借入可能額の目安は増えますが、総利息も大きく増えます。たとえば3年と7年では借入額目安は約64万円の差ですが、総利息は約80万円の差になります。",
  },
  {
    question: "金利が違うと借入可能額はどれくらい変わりますか？",
    answer:
      "年利が下がると同じ月3万円返済でも借入可能額は増えます。たとえば年利10%なら年利15%より多く借りられる計算になりますが、正確な金額はシミュレーターで確認するのが確実です。",
  },
  {
    question: "月3万円返済で総利息を抑えるにはどうすればいいですか？",
    answer:
      "返済期間をできるだけ短くするのが最も効果的です。3年返済なら総利息は約18万円ですが、7年返済では約98万円になります。余裕があれば追加返済も有効です。",
  },
  {
    question: "月3万円返済の目安は審査上の借入限度額と同じですか？",
    answer:
      "いいえ、この記事の目安は返済計画上の逆算であり、審査上の借入可能額とは異なります。実際に借りられる額は、収入や他の借入状況などにより金融機関が判断します。",
  },
];

const faqJsonLd = getArticleFaqJsonLd(faqItems);

/** 年利15%・元利均等で月3万返済時の借入額目安（概算） */
const TABLE_ROWS = [
  { years: 3, principalMan: 90, totalInterestMan: 18 },
  { years: 5, principalMan: 126, totalInterestMan: 54 },
  { years: 7, principalMan: 154, totalInterestMan: 98 },
];

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      
      <ArticlePageShell currentPageTitle={ARTICLE_TITLE} wide={articleUsesWideLayout("monthly-30000-how-much-can-borrow")}>
<div className="ds-card ds-card-pad">
          <h1 className="text-2xl font-black text-stone-900 md:text-3xl">{ARTICLE_TITLE}</h1>
          <p className="mt-4 text-sm text-stone-600 leading-relaxed">
            本記事で扱うのは返済計画上の目安であり、審査上の借入可能額を示すものではありません。年利15%・元利均等の近似例です。
          </p>

          <section id="premise" className="mt-6">
            <ArticlePagePremise
              comparisonConditions={[
                "毎月3万円返済を前提に、借入可能額を逆算している",
                "年利15%・元利均等返済の近似例で比較している",
                "3年・5年・7年の3パターンの返済期間で整理している",
              ]}
              reasonForConditions="毎月3万円は家計から返済に充てやすい現実的なラインです。年利15%はカードローンの一般的な水準であり、返済期間による借入可能額と総利息の違いを比較するために3パターンを設定しています。審査上の借入限度額とは異なります。"
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
            <p>
              毎月3万円までなら返済に充てられそうだと考えたとき、「それならいくらまで借りると現実的なのか」が気になる方は多いはずです。この記事では、毎月3万円返済を前提に、年利15%で3年・5年・7年返済した場合の借入額の目安を整理します。
            </p>

            <section id="conclusion">
              <h2 className="text-lg font-black text-stone-900 md:text-xl">結論｜月3万円返済なら借入額の目安</h2>
              <p className="mt-3">
                年利15%・元利均等の近似では、毎月3万円返済できる場合、<strong className="font-bold text-stone-900">3年返済なら約90万円、5年返済なら約126万円、7年返済なら約154万円</strong>が借入額の目安です。
              </p>
              <p className="mt-3">
                返済期間を長くすると借入額の目安は増えますが、総利息も増えます。月々の負担だけでなく、総支払額まで見て判断することが大切です。
              </p>
            </section>

            <section id="3years">
              <h2 className="text-lg font-black text-stone-900 md:text-xl">3年返済ならいくらまでが目安か</h2>
              <p className="mt-3">
                毎月3万円を3年（36回）返済する場合、年利15%では借入額の目安は約90万円です。総利息は約18万円程度です。
              </p>
            </section>

            <section id="5years">
              <h2 className="text-lg font-black text-stone-900 md:text-xl">5年返済ならいくらまでが目安か</h2>
              <p className="mt-3">
                毎月3万円を5年（60回）返済する場合、年利15%では借入額の目安は約126万円です。総利息は約54万円程度となり、3年返済より利息負担が大きくなります。
              </p>
            </section>

            <section id="7years">
              <h2 className="text-lg font-black text-stone-900 md:text-xl">7年返済ならいくらまでが目安か</h2>
              <p className="mt-3">
                毎月3万円を7年（84回）返済する場合、年利15%では借入額の目安は約154万円です。総利息は約98万円程度と、返済期間が長いほど利息が重くなります。
              </p>
            </section>

            <section id="reading-points">
              <ArticleReadingPoints
                points={[
                  {
                    label: "借入可能額だけでなく総コストを見る",
                    body: "返済期間を延ばすと借入額の目安は増えますが、総利息も大きく増えます。借りられる額だけでなく最終的にいくら払うかまで確認してください。",
                  },
                  {
                    label: "金利の違いが結果に大きく影響する",
                    body: "年利15%と年利10%では借入可能額も総利息も大きく変わります。自分の条件に近い金利でシミュレーターを使って確認するのが確実です。",
                  },
                  {
                    label: "返済期間が長いほど利息負担は重くなる",
                    body: "7年返済では借入額目安は約154万円ですが総利息は約98万円と、借入額の6割以上が利息になります。短期返済との差を意識してください。",
                  },
                ]}
                misconceptions={[
                  "「月3万円なら楽に返せる」と思いがちですが、返済期間が長くなると総利息が大きく膨らみ、実質的な負担は重くなります。",
                  "「借りられる額＝借りてよい額」と考えがちですが、総支払額まで見て判断することが大切です。",
                ]}
              />
            </section>

            <section id="compare">
              <h2 className="text-lg font-black text-stone-900 md:text-xl">3年・5年・7年返済を比較するとどう違うか</h2>
              <p className="mt-3">
                同じ月3万円返済でも、返済期間を延ばすと借入額の目安は増えますが、総利息も大きく増えます。
              </p>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full min-w-[320px] text-sm border border-stone-200">
                  <thead>
                    <tr className="bg-stone-50 border-b border-stone-200">
                      <th className="py-2 px-3 text-left font-bold text-stone-900">返済期間</th>
                      <th className="py-2 px-3 text-right font-bold text-stone-900">借入額目安</th>
                      <th className="py-2 px-3 text-right font-bold text-stone-900">総利息目安</th>
                    </tr>
                  </thead>
                  <tbody>
                    {TABLE_ROWS.map((r) => (
                      <tr key={r.years} className="border-b border-stone-100">
                        <td className="py-2 px-3">{r.years}年</td>
                        <td className="py-2 px-3 text-right">約{r.principalMan}万円</td>
                        <td className="py-2 px-3 text-right">約{r.totalInterestMan}万円</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section id="simulator">
              <h2 className="text-lg font-black text-stone-900 md:text-xl">自分の条件で確認するならシミュレーターが早い</h2>
              <p className="mt-3">
                金利や返済期間を変えた場合の目安は、
                <Link href="/simulator/cardloan" className="font-bold text-stone-900 hover:underline">借入返済シミュレーター</Link>
                の「定額元利」で毎月返済額を3万円に設定すると試せます。
              </p>
              <div className="mt-4">
                <Link
                  href="/simulator/cardloan"
                  className="ds-btn ds-btn-primary"
                >
                  借入返済シミュレーターで計算する →
                </Link>
              </div>
            </section>

            <section id="notice">
              <h2 className="text-lg font-black text-stone-900 md:text-xl">注意点</h2>
              <p className="mt-3">
                本記事の数値は試算の目安です。実際の返済額・総利息は金融機関の計算方法（端数処理・約定日等）により異なります。重要な判断は契約内容を優先し、必要に応じて専門家にご相談ください。
              </p>
            </section>

            <section id="editor-memo">
              <ArticleEditorMemo
                purpose="毎月3万円返済できる場合の借入可能額を逆算し、返済期間による違いを整理するために書いています。"
                reasonAxis="月3万円を基準にしたのは、家計から捻出しやすい現実的な返済額だからです。3年・5年・7年で比較しているのは、返済期間と総利息のトレードオフを見せるためです。"
                memo="逆算系記事のひとつです。自分の条件で試算したい場合は借入返済シミュレーターへの導線を設けています。月5万円版の記事とあわせてカテゴリを構成しています。"
              />
            </section>

            <section id="faq">
              <h2 className="text-lg font-black text-stone-900 md:text-xl">よくある質問</h2>
              <div className="mt-4 space-y-6">
                {faqItems.map((item, i) => (
                  <div key={i}>
                    <h3 className="text-base font-black text-stone-900">{item.question}</h3>
                    <p className="mt-2">{item.answer}</p>
                  </div>
                ))}
              </div>
            </section>

            <section id="summary">
              <h2 className="text-lg font-black text-stone-900 md:text-xl">まとめ</h2>
              <p className="mt-3">
                毎月3万円返済できる場合、年利15%の目安では3年で約90万円、5年で約126万円、7年で約154万円が借入額の目安です。返済期間を延ばすと借入額は増えますが総利息も増えるため、自分の条件では
                <Link href="/simulator/cardloan" className="font-bold text-stone-900 hover:underline">シミュレーター</Link>
                で確認することをおすすめします。
              </p>
            </section>
          </div>

          <ArticleFooter articleSlug="monthly-30000-how-much-can-borrow" />
        </div>
      </ArticlePageShell>
    </>
  );
}
