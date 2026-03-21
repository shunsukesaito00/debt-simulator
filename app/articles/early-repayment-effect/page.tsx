import type { Metadata } from "next";
import Link from "next/link";
import { ArticleFooter } from "@/app/components/ArticleFooter";
import { ArticlePagePremise, ArticleReadingPoints, ArticleEditorMemo } from "@/app/components/article";
import { getArticleBreadcrumbJsonLd, getArticleFaqJsonLd } from "@/lib/article-structured-data";
import { ARTICLE_AUTHOR_JSON_LD, ARTICLE_PUBLISHER_JSON_LD } from "@/lib/site-author";
import { ArticlePageShell } from "@/app/components/ArticlePageShell";
import { articleUsesWideLayout } from "@/lib/article-layout";

import { EarlyRepaymentInterestBarChart, EarlyRepaymentEffectCards } from "./EarlyRepaymentCharts";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://debt-simulator-quzc.vercel.app";
const ARTICLE_URL = `${BASE}/articles/early-repayment-effect`;
const ARTICLE_TITLE = "繰り上げ返済の効果とは？利息はいくら減る？返済期間短縮との違いも解説";

export const metadata: Metadata = {
  title: ARTICLE_TITLE,
  description:
    "繰り上げ返済をすると何が変わるのかを、利息軽減、完済時期、毎月返済額の違いからわかりやすく解説します。期間短縮型と返済額軽減型の考え方も整理し、シミュレーターへの導線も用意します。",
  alternates: { canonical: ARTICLE_URL },
  openGraph: {
    title: ARTICLE_TITLE,
    description:
      "繰り上げ返済をすると何が変わるのかを、利息軽減、完済時期、毎月返済額の違いからわかりやすく解説します。期間短縮型と返済額軽減型の考え方も整理し、シミュレーターへの導線も用意します。",
    url: ARTICLE_URL,
    type: "article",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: ARTICLE_TITLE,
  description:
    "繰り上げ返済をすると何が変わるのかを、利息軽減、完済時期、毎月返済額の違いからわかりやすく解説します。期間短縮型と返済額軽減型の考え方も整理し、シミュレーターへの導線も用意します。",
  url: ARTICLE_URL,
  datePublished: "2025-03-08",
  dateModified: "2025-03-08",
  author: ARTICLE_AUTHOR_JSON_LD,
  publisher: ARTICLE_PUBLISHER_JSON_LD,
};

const faqItems = [
  {
    question: "繰り上げ返済をすると利息は必ず減りますか？",
    answer:
      "一般的には、元本を早く減らせるため、その後に発生する利息は減りやすくなります。ただし、手数料や商品仕様によって実際の効果は異なる場合があります。",
  },
  {
    question: "繰り上げ返済は期間短縮型と返済額軽減型のどちらが得ですか？",
    answer:
      "利息軽減の効果を重視するなら、一般には期間短縮型の方が有利に見えやすいです。一方、毎月の返済負担を軽くしたい場合は返済額軽減型が考えやすいです。",
  },
  {
    question: "繰り上げ返済はいつやると効果が大きいですか？",
    answer: "一般には、残高が大きい早い段階で元本を減らせるほど、その後の利息軽減効果は出やすくなります。",
  },
  {
    question: "繰り上げ返済は返済期間の短縮と毎月返済額の軽減、どちらを選ぶべきですか？",
    answer:
      "総利息をできるだけ減らしたいなら期間短縮型、毎月の家計に余裕を作りたいなら返済額軽減型が向いています。どちらが正解というものではなく、自分の優先度に合わせて選ぶのが基本です。",
  },
  {
    question: "繰り上げ返済にデメリットはありますか？",
    answer:
      "手元資金が減るため、急な出費に備える生活防衛資金が不足するリスクがあります。また、商品によっては繰り上げ返済に手数料がかかる場合もあるため、実行前に契約内容を確認することが大切です。",
  },
];

const breadcrumbJsonLd = getArticleBreadcrumbJsonLd(ARTICLE_URL, ARTICLE_TITLE);
const faqJsonLd = getArticleFaqJsonLd(faqItems);

const tocItems = [
  { id: "conclusion", label: "結論｜繰り上げ返済は利息軽減と完済前倒しに効果がある" },
  { id: "what-is", label: "繰り上げ返済とは" },
  { id: "base-case", label: "まずは追加返済しない場合の基準を確認する" },
  { id: "effect-10man", label: "1年後に10万円を追加返済した場合の効果" },
  { id: "period-short", label: "期間短縮型の効果｜完済が早まり、利息軽減も大きい" },
  { id: "amount-reduce", label: "返済額軽減型の効果｜毎月の負担を下げやすい" },
  { id: "compare", label: "繰り上げ返済の比較" },
  { id: "priority", label: "どちらを優先すべきか｜期間短縮型と返済額軽減型の違い" },
  { id: "before", label: "繰り上げ返済をする前に考えたいこと" },
  { id: "simulator", label: "自分の条件で確認するならシミュレーターが早い" },
  { id: "notice", label: "注意点" },
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

      
      <ArticlePageShell currentPageTitle={ARTICLE_TITLE} wide={articleUsesWideLayout("early-repayment-effect")}>
<div className="ds-card ds-card-pad">
          <h1 className="text-2xl font-black text-stone-900 md:text-3xl">{ARTICLE_TITLE}</h1>
          <p className="mt-4 text-sm text-stone-600 leading-relaxed">
            本記事の比較は、100万円・年利15%・5年返済を前提にした一般的な概算例です。実際の商品では条件が異なる場合があります。
          </p>

          <section id="premise" className="mt-6">
            <ArticlePagePremise
              comparisonConditions={[
                "このページでは「100万円・年利15%・5年返済」を前提に繰り上げ返済の効果を比較する",
                "1年後に10万円を追加返済したケースを例にする",
                "期間短縮型と返済額軽減型の2パターンで整理する",
              ]}
              reasonForConditions="繰り上げ返済の効果は条件によって変わるため、具体的な数字を固定して比較しています。ここでの試算は概算であり、実際の商品仕様や手数料によって結果は異なります。"
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
              繰り上げ返済をすると本当に得なのか、どれくらい利息が減るのか気になる方は多いはずです。特に借入額が大きい場合や、金利がそれなりに高い場合は、少しの追加返済でも総支払額に差が出ることがあります。
            </p>
            <p>
              この記事では、100万円を年利15%で5年返済するケースを例に、繰り上げ返済の効果をわかりやすく整理します。追加返済をしない場合との比較に加えて、「期間短縮型」と「返済額軽減型」の考え方の違いも紹介し、最後に
              <Link href="/simulator/cardloan" className="font-bold text-stone-900 hover:underline">返済シミュレーター</Link>
              への導線も用意しています。
            </p>

            <section id="conclusion">
              <h2 className="text-lg font-black text-stone-900 md:text-xl">結論｜繰り上げ返済は利息軽減と完済前倒しに効果がある</h2>
              <p className="mt-3">
                結論から言うと、繰り上げ返済は総利息を減らし、完済時期を早める効果が期待できます。特に、追加返済後も毎月の返済額を変えずに返済期間を短くする考え方では、利息軽減効果が見えやすくなります。
              </p>
              <p className="mt-3">
                一方で、返済期間をそのままにして毎月の返済額を軽くする考え方もあります。この場合は家計の毎月負担を下げやすい反面、利息軽減効果は期間短縮型ほど大きくなりにくいです。
              </p>
            </section>

            <section id="reading-points">
              <ArticleReadingPoints
                points={[
                  {
                    label: "繰り上げ返済は総利息を減らしやすい",
                    body: "元本を早く減らすことで、その後に発生する利息が軽くなります。追加返済額が小さくても効果は出やすいです。",
                  },
                  {
                    label: "少額の追加返済でも差が出る",
                    body: "10万円の追加返済でも、利息は数万円単位で変わることがあります。まとまった金額でなくても始める価値があります。",
                  },
                  {
                    label: "期間短縮型と返済額軽減型で効果が異なる",
                    body: "利息軽減を重視するなら期間短縮型、毎月の負担を軽くしたいなら返済額軽減型と、目的で選び方が変わります。",
                  },
                ]}
                misconceptions={[
                  "「繰り上げ返済はまとまったお金がないと意味がない」と思われがちですが、少額でも元本が減れば利息軽減の効果は出ます。",
                  "「期間短縮型の方が常に得」とは限りません。家計の安定を優先するなら返済額軽減型が適切な場合もあります。",
                ]}
              />
            </section>

            <section id="what-is">
              <h2 className="text-lg font-black text-stone-900 md:text-xl">繰り上げ返済とは</h2>
              <p className="mt-3">
                繰り上げ返済とは、毎月の通常返済とは別に、まとまった金額を前倒しで返済することです。追加で返済した金額は元本の圧縮に効きやすいため、その後に発生する利息も減りやすくなります。
              </p>
              <p className="mt-3">
                つまり、借入残高を早く減らせるほど、将来支払う利息を抑えやすくなるのが繰り上げ返済の基本的な考え方です。
              </p>
            </section>

            <section id="base-case">
              <h2 className="text-lg font-black text-stone-900 md:text-xl">まずは追加返済しない場合の基準を確認する</h2>
              <p className="mt-3">
                比較の基準として、100万円を年利15%で5年返済するケースを見ておきます。この場合、毎月返済額は約23,790円、総支払額は約142万7千円、総利息は約42.7万円が目安です。
              </p>
              <p className="mt-3">
                この「追加返済なし」のケースを基準にすると、繰り上げ返済をしたときに何がどれだけ変わるかがわかりやすくなります。
              </p>
            </section>

            <section id="effect-10man">
              <h2 className="text-lg font-black text-stone-900 md:text-xl">1年後に10万円を追加返済した場合の効果</h2>
              <p className="mt-3">
                返済開始から1年後に10万円を追加返済すると、元本がそのぶん早く減るため、その後に発生する利息が軽くなります。追加返済しない場合と比べると、利息軽減や完済前倒しの効果が見えやすくなります。
              </p>
              <p className="mt-3">
                本記事では、追加返済後も毎月返済額を維持して完済を早めるケースと、完済時期をほぼ維持しながら毎月返済額を軽くするケースの2つに分けて比較します。
              </p>
            </section>

            <section id="period-short">
              <h2 className="text-lg font-black text-stone-900 md:text-xl">期間短縮型の効果｜完済が早まり、利息軽減も大きい</h2>
              <p className="mt-3">
                返済開始から1年後に10万円を追加返済し、その後も毎月返済額を約23,790円のまま維持する場合、完済時期は約5か月短縮され、総利息は約38.2万円になります。
              </p>
              <p className="mt-3">
                追加返済なしの総利息約42.7万円と比べると、利息は約4.5万円減る計算です。毎月の返済額は変わりませんが、返済終了が早まるため、トータルで見ると利息軽減効果が出やすいのが特徴です。
              </p>
            </section>

            <section id="amount-reduce">
              <h2 className="text-lg font-black text-stone-900 md:text-xl">返済額軽減型の効果｜毎月の負担を下げやすい</h2>
              <p className="mt-3">
                同じく1年後に10万円を追加返済しても、完済時期をほぼ5年のままにして、その後の毎月返済額を軽くする考え方もあります。この場合、毎月返済額は約21,870円まで下がり、総利息は約39.2万円が目安です。
              </p>
              <p className="mt-3">
                追加返済なしと比べると、利息は約3.5万円減り、毎月負担は約1,920円軽くなります。家計に余裕を作りやすいのがメリットですが、利息軽減だけを重視するなら、期間短縮型の方が効果は出やすいです。
              </p>
            </section>

            <section id="compare">
              <h2 className="text-lg font-black text-stone-900 md:text-xl">繰り上げ返済の比較</h2>
              <p className="mt-3">3つのケースを比較すると、繰り上げ返済の効果がかなり見やすくなります。</p>
              <ul className="mt-2 list-disc pl-5 space-y-1">
                <li>追加返済なし: 毎月約23,790円 / 総利息約427,396円</li>
                <li>期間短縮型イメージ: 毎月約23,790円 / 総利息約382,080円 / 完済約5か月短縮</li>
                <li>返済額軽減型イメージ: 毎月約21,870円 / 総利息約392,200円 / 毎月負担約1,920円軽減</li>
              </ul>

              <div className="mt-6 overflow-x-auto">
                <table className="w-full min-w-[420px] border-collapse text-left">
                  <thead>
                    <tr className="border-b-2 border-stone-200">
                      <th className="py-3 pr-4 font-black text-stone-900">ケース</th>
                      <th className="py-3 pr-4 font-black text-stone-900">毎月返済額</th>
                      <th className="py-3 pr-4 font-black text-stone-900">総支払額</th>
                      <th className="py-3 pr-4 font-black text-stone-900">総利息</th>
                      <th className="py-3 font-black text-stone-900">効果</th>
                    </tr>
                  </thead>
                  <tbody className="text-stone-700">
                    <tr className="border-b border-stone-200">
                      <td className="py-3 pr-4">追加返済なし</td>
                      <td className="py-3 pr-4">約23,790円</td>
                      <td className="py-3 pr-4">約1,427,396円</td>
                      <td className="py-3 pr-4">約427,396円</td>
                      <td className="py-3">基準ケース</td>
                    </tr>
                    <tr className="border-b border-stone-200">
                      <td className="py-3 pr-4">期間短縮型イメージ</td>
                      <td className="py-3 pr-4">約23,790円</td>
                      <td className="py-3 pr-4">約1,382,080円</td>
                      <td className="py-3 pr-4">約382,080円</td>
                      <td className="py-3">約5か月短縮・利息約45,316円減</td>
                    </tr>
                    <tr className="border-b border-stone-200">
                      <td className="py-3 pr-4">返済額軽減型イメージ</td>
                      <td className="py-3 pr-4">約21,870円</td>
                      <td className="py-3 pr-4">約1,392,200円</td>
                      <td className="py-3 pr-4">約392,200円</td>
                      <td className="py-3">毎月約1,920円軽減・利息約35,196円減</td>
                    </tr>
                  </tbody>
                </table>
                <p className="mt-2 text-xs text-stone-600">
                  同じ10万円の追加返済でも、使い方によって利息軽減額や毎月の負担の出方が変わります。
                </p>
              </div>

              <div className="mt-8 ds-subcard p-4">
                <h3 className="text-base font-black text-stone-900">総利息の比較</h3>
                <div className="mt-4">
                  <EarlyRepaymentInterestBarChart />
                </div>
              </div>

              <div className="mt-8 ds-subcard p-4">
                <h3 className="text-base font-black text-stone-900">効果の違い</h3>
                <div className="mt-4">
                  <EarlyRepaymentEffectCards />
                </div>
                <p className="mt-4 text-xs text-stone-600">
                  利息軽減を重視するなら期間短縮型、毎月の家計負担を軽くしたいなら返済額軽減型が考えやすいです。
                </p>
              </div>
            </section>

            <section id="priority">
              <h2 className="text-lg font-black text-stone-900 md:text-xl">どちらを優先すべきか｜期間短縮型と返済額軽減型の違い</h2>
              <p className="mt-3">
                どちらが向いているかは、何を優先したいかで決まります。できるだけ総支払額を減らしたいなら、期間短縮型の方が向いています。毎月の返済額を維持するため負担感は変わりませんが、そのぶん早く終わりやすく、利息軽減効果も見えやすいです。
              </p>
              <p className="mt-3">
                一方で、毎月の家計に余裕を作りたいなら、返済額軽減型の考え方が合っています。利息軽減効果はありますが、期間短縮型ほど大きくはなりにくいです。
              </p>
            </section>

            <section id="before">
              <h2 className="text-lg font-black text-stone-900 md:text-xl">繰り上げ返済をする前に考えたいこと</h2>
              <p className="mt-3">
                繰り上げ返済は有効な手段ですが、手元資金を減らしすぎると生活防衛資金が足りなくなることがあります。急な出費や収入減に備えるお金を残したうえで、無理のない範囲で行うことが重要です。
              </p>
              <p className="mt-3">
                また、商品によっては繰り上げ返済の手数料や条件が異なる場合があります。実行前に契約内容を確認しておく必要があります。
              </p>
            </section>

            <section id="simulator">
              <h2 className="text-lg font-black text-stone-900 md:text-xl">自分の条件で確認するならシミュレーターが早い</h2>
              <p className="mt-3">
                ここまでの数値は、あくまで「100万円・年利15%・5年返済・1年後に10万円追加返済」という固定条件で見た目安です。実際には、借入額、金利、返済方式、追加返済の金額やタイミングによって結果は変わります。
              </p>
              <p className="mt-3">
                そのため、最終的には自分の条件を入れて確認するのが一番確実です。
                <Link href="/simulator/cardloan" className="font-bold text-stone-900 hover:underline">返済シミュレーター</Link>
                では、借入額や金利、返済期間、追加返済の有無を入れて、月々の返済額や総利息を試算できます。
              </p>
              <div className="mt-6">
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
                本記事の比較は、一般的な固定金利・毎月返済の考え方に基づく概算です。実際のローンやカードローンでは、日割り計算、約定返済日、最低返済額ルール、手数料、商品固有の返済仕様などが影響する場合があります。
              </p>
              <p className="mt-3">
                正確な返済条件は、契約中または検討中の金融商品の説明書や公式情報を確認してください。
              </p>
            </section>

            <section id="editor-memo">
              <ArticleEditorMemo
                purpose="繰り上げ返済の効果を具体的な数字で示すことで、「追加返済にはどれくらい意味があるのか」を判断できるようにすることを目的にしています。"
                reasonAxis="期間短縮型と返済額軽減型の比較を軸に、利息軽減と家計負担のバランスを読者が選べる構成にしています。"
                memo="返済改善カテゴリの中心記事の一つとして、繰り上げ返済の基本的な効果を整理しています。個別の金額シミュレーション記事への導線としても機能します。"
              />
            </section>

            <section id="faq">
              <h2 className="text-lg font-black text-stone-900 md:text-xl">よくある質問</h2>
              <div className="mt-4 space-y-6">
                <div>
                  <h3 className="text-base font-black text-stone-900">繰り上げ返済をすると利息は必ず減りますか？</h3>
                  <p className="mt-2">
                    一般的には、元本を早く減らせるため、その後に発生する利息は減りやすくなります。ただし、手数料や商品仕様によって実際の効果は異なる場合があります。
                  </p>
                </div>
                <div>
                  <h3 className="text-base font-black text-stone-900">繰り上げ返済は期間短縮型と返済額軽減型のどちらが得ですか？</h3>
                  <p className="mt-2">
                    利息軽減の効果を重視するなら、一般には期間短縮型の方が有利に見えやすいです。一方、毎月の返済負担を軽くしたい場合は返済額軽減型が考えやすいです。
                  </p>
                </div>
                <div>
                  <h3 className="text-base font-black text-stone-900">繰り上げ返済はいつやると効果が大きいですか？</h3>
                  <p className="mt-2">
                    一般には、残高が大きい早い段階で元本を減らせるほど、その後の利息軽減効果は出やすくなります。
                  </p>
                </div>
                <div>
                  <h3 className="text-base font-black text-stone-900">繰り上げ返済は返済期間の短縮と毎月返済額の軽減、どちらを選ぶべきですか？</h3>
                  <p className="mt-2">
                    総利息をできるだけ減らしたいなら期間短縮型、毎月の家計に余裕を作りたいなら返済額軽減型が向いています。どちらが正解というものではなく、自分の優先度に合わせて選ぶのが基本です。
                  </p>
                </div>
                <div>
                  <h3 className="text-base font-black text-stone-900">繰り上げ返済にデメリットはありますか？</h3>
                  <p className="mt-2">
                    手元資金が減るため、急な出費に備える生活防衛資金が不足するリスクがあります。また、商品によっては繰り上げ返済に手数料がかかる場合もあるため、実行前に契約内容を確認することが大切です。
                  </p>
                </div>
              </div>
            </section>

            <section id="summary">
              <h2 className="text-lg font-black text-stone-900 md:text-xl">まとめ</h2>
              <p className="mt-3">
                繰り上げ返済は、総利息を減らし、完済を早めたり、毎月の負担を軽くしたりするのに役立ちます。利息軽減を優先するなら期間短縮型、家計の余裕を優先するなら返済額軽減型、という考え方が基本です。
              </p>
              <p className="mt-3">
                何を優先するかは人によって違うため、感覚ではなく数値で比較することが大切です。自分の条件で試算したい場合は、
                <Link href="/simulator/cardloan" className="font-bold text-stone-900 hover:underline">返済シミュレーター</Link>
                で確認できます。
              </p>
              <div className="mt-6">
                <Link
                  href="/simulator/cardloan"
                  className="ds-btn ds-btn-primary"
                >
                  借入返済シミュレーターで計算する →
                </Link>
              </div>
            </section>
          </div>

          <ArticleFooter articleSlug="early-repayment-effect" />
        </div>
      </ArticlePageShell>
    </>
  );
}
