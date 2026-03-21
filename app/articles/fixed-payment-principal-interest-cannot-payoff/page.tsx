import type { Metadata } from "next";
import Link from "next/link";
import { ArticleFooter } from "@/app/components/ArticleFooter";
import { ArticlePagePremise, ArticleReadingPoints, ArticleEditorMemo, ArticleStandardBlocks, ArticleProse } from "@/app/components/article";
import { getArticleBreadcrumbJsonLd, getArticleFaqJsonLd } from "@/lib/article-structured-data";
import { ARTICLE_AUTHOR_JSON_LD, ARTICLE_PUBLISHER_JSON_LD } from "@/lib/site-author";
import { ArticlePageShell } from "@/app/components/ArticlePageShell";
import { articleUsesWideLayout } from "@/lib/article-layout";

import { CannotPayoffWarningCard } from "./FixedPaymentCharts";
import { PayoffMonthsBarChart, TotalInterestBarChart } from "./ChartsLazy";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://debt-simulator-quzc.vercel.app";
const ARTICLE_URL = `${BASE}/articles/fixed-payment-principal-interest-cannot-payoff`;
const ARTICLE_TITLE = "定額元利で完済できないのはなぜ？返済額が足りないケースをわかりやすく解説";

export const metadata: Metadata = {
  title: ARTICLE_TITLE,
  description:
    "定額元利返済で完済できないのは、返済額が利息以下または元本の減りが極端に遅いケースがあるためです。具体例・表・グラフで仕組みを整理し、シミュレーターへの導線も用意します。",
  alternates: { canonical: ARTICLE_URL },
  openGraph: {
    title: ARTICLE_TITLE,
    description:
      "定額元利返済で完済できないのは、返済額が利息以下または元本の減りが極端に遅いケースがあるためです。具体例・表・グラフで仕組みを整理し、シミュレーターへの導線も用意します。",
    url: ARTICLE_URL,
    type: "article",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: ARTICLE_TITLE,
  description:
    "定額元利返済で完済できないのは、返済額が利息以下または元本の減りが極端に遅いケースがあるためです。具体例・表・グラフで仕組みを整理し、シミュレーターへの導線も用意します。",
  url: ARTICLE_URL,
  datePublished: "2025-03-08",
  dateModified: "2025-03-08",
  author: ARTICLE_AUTHOR_JSON_LD,
  publisher: ARTICLE_PUBLISHER_JSON_LD,
};

const faqItems = [
  {
    question: "定額元利で完済できないことは本当にありますか？",
    answer:
      "毎月返済額が利息以下だと、少なくとも一般的な考え方では元本が減らず、完済できない条件に近くなります。返済額設定が重要です。",
  },
  {
    question: "利息より返済額が少ないとどうなりますか？",
    answer:
      "その月の返済が利息に吸収され、元本が減りません。条件次第では、返済しているつもりでも借金がほとんど減らない状態になります。",
  },
  {
    question: "定額元利でも完済しやすくする方法はありますか？",
    answer:
      "毎月返済額を引き上げる、追加返済を行う、金利条件を見直す、といった方法が有効です。特に返済額が低すぎる場合は見直しが重要です。",
  },
  {
    question: "完済できない状態に近づいている兆候はありますか？",
    answer:
      "毎月返済しているのに残高がほとんど減らない、または明細の元本充当額が極端に小さい場合は注意が必要です。返済額の大部分が利息に消えている可能性があるため、明細で元本と利息の内訳を確認してみてください。",
  },
  {
    question: "返済が追いつかないと感じたらどうすればいいですか？",
    answer:
      "まずは現状の返済額が利息を上回っているかを確認し、可能であれば返済額の引き上げや追加返済を検討してください。それでも難しい場合は、金融機関への相談や、公的な相談窓口（消費生活センターなど）への早めの相談が重要です。",
  },
];

const breadcrumbJsonLd = getArticleBreadcrumbJsonLd(ARTICLE_URL, ARTICLE_TITLE);
const faqJsonLd = getArticleFaqJsonLd(faqItems);

const tocItems = [
  { id: "conclusion", label: "結論｜定額元利で完済できないのは返済額が利息に負けるから" },
  { id: "what-is", label: "定額元利とは何か" },
  { id: "cannot-payoff", label: "完済できない状態とはどういうことか" },
  { id: "why-danger", label: "なぜ返済額が低いと危険なのか" },
  { id: "case-a", label: "ケースA｜毎月1万円では完済できないに近い" },
  { id: "case-b", label: "ケースB｜毎月1万5千円なら完済はするが非常に遅い" },
  { id: "case-c", label: "ケースC｜毎月3万円なら現実的に完済しやすい" },
  { id: "compare", label: "3つのケースを比較すると何が違うか" },
  { id: "suit", label: "定額元利が向いているケース・向いていないケース" },
  { id: "avoid", label: "完済できない状態を避けるにはどうすればいいか" },
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

      
      <ArticlePageShell currentPageTitle={ARTICLE_TITLE} wide={articleUsesWideLayout("fixed-payment-principal-interest-cannot-payoff")}>
<div className="ds-card ds-card-pad">
          <h1 className="text-2xl font-semibold text-stone-900 md:text-3xl">{ARTICLE_TITLE}</h1>
          <p className="mt-4 text-base text-stone-600 leading-relaxed">
            本記事の比較は、100万円・年利15%を前提にした一般的な概算例です。実際の金融商品では条件が異なる場合があります。
          </p>

          <ArticleStandardBlocks slug="fixed-payment-principal-interest-cannot-payoff" />

          <ArticlePagePremise
            comparisonConditions={[
              "借入額100万円・年利15%",
              "定額元利返済（毎月の支払額を固定）",
              "毎月1万円・1万5千円・3万円の3パターンで比較",
            ]}
            reasonForConditions="定額元利で「完済できない」と言われる典型は、返済額が利息以下になるケース。100万・年利15%では初月利息が約1.25万円なので、1万・1.5万・3万の3段階で比較すると理解しやすい。"
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
              定額元利返済は、毎月の支払額を一定にできるため、一見すると家計管理がしやすい返済方式に見えます。しかし、返済額の設定次第では「なかなか元本が減らない」「想定していた年数で終わらない」「場合によっては完済できないに近い状態になる」といった問題が起こりえます。
            </p>
            <p>
              この記事では、定額元利で完済できないと言われるのはなぜかを、利息と返済額の関係からわかりやすく整理します。100万円・年利15%の例を使って、返済額が低すぎるケースと、現実的に完済できるケースを比較しながら説明し、最後に
              <Link href="/simulator/cardloan" className="font-bold text-stone-900 hover:underline">シミュレーター</Link>
              への導線も用意しています。
            </p>

            <section id="conclusion">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">結論｜定額元利で完済できないのは返済額が利息に負けるから</h2>
              <p className="mt-3">
                結論から言うと、定額元利で完済できない最大の理由は、毎月の返済額が利息以下、または利息に近すぎて元本がほとんど減らないからです。
              </p>
              <p className="mt-3">
                定額元利は毎月の支払総額を一定にする方式ですが、その内訳は「利息」と「元本返済」に分かれます。返済額の大部分が利息に消えてしまうと、元本が減らず、完済まで極端に長い時間がかかります。
              </p>
            </section>

            <section id="what-is">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">定額元利とは何か</h2>
              <p className="mt-3">
                定額元利とは、毎月支払う返済総額を一定額に設定する返済方式です。毎月の支出がほぼ一定になるため、予算を立てやすいのが特徴です。
              </p>
              <p className="mt-3">
                ただし、毎月の返済額の中には利息も含まれます。借入残高が大きい返済初期は利息負担も大きいため、返済額を低く設定しすぎると、元本への充当が非常に少なくなることがあります。
              </p>
            </section>

            <section id="cannot-payoff">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">完済できない状態とはどういうことか</h2>
              <p className="mt-3">
                ここでいう「完済できない」とは、毎月返済しているのに元本が実質的に減らない、または減り方が極端に遅く、現実的な期間で終わらない状態を指します。
              </p>
              <p className="mt-3">
                典型的なのは、毎月返済額がその月の利息以下になっているケースです。この場合、返済しているつもりでも元本が減らず、条件によっては残高がほぼ横ばいになったり、不足分の扱いによっては問題が大きくなったりします。
              </p>
            </section>

            <section id="why-danger">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">なぜ返済額が低いと危険なのか</h2>
              <p className="mt-3">
                100万円を年利15%で借りた場合、初月の利息の目安は約12,500円です。つまり、毎月返済額が1万円なら、その月の利息にも届きません。
              </p>
              <p className="mt-3">
                このような条件では、返済額が利息を下回っているため、元本に回るお金がありません。定額元利は毎月の支払額が固定されている分、「払えているように見える」のに、実際には完済に近づいていない、という状況が起こりえます。
              </p>
            </section>

            <section id="case-a">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">ケースA｜毎月1万円では完済できないに近い</h2>
              <p className="mt-3">
                100万円を年利15%で借りて、毎月返済額を1万円に設定した場合、初月利息の目安は約12,500円なので、返済額が利息を下回ります。
              </p>
              <p className="mt-3">
                このケースでは、少なくとも一般的な考え方では元本が減らず、完済できない条件に近いと言えます。毎月支払っているのに借金が減らない、というのは定額元利の設定ミスとして最も危険なパターンです。
              </p>
            </section>

            <section id="case-b">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">ケースB｜毎月1万5千円なら完済はするが非常に遅い</h2>
              <p className="mt-3">
                毎月返済額を15,000円にすると、初月利息約12,500円を差し引いた残りの約2,500円が元本返済に回ります。つまり、元本は一応減り始めます。
              </p>
              <p className="mt-3">
                ただし、減るペースは非常に遅く、完済までの目安は約154か月、総利息は約131万円に達します。100万円借りて利息が130万円超になるのは、返済額を低く設定しすぎた典型例です。
              </p>
            </section>

            <section id="case-c">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">ケースC｜毎月3万円なら現実的に完済しやすい</h2>
              <p className="mt-3">
                毎月返済額を3万円にすると、初月利息約12,500円を差し引いた約17,500円が元本返済に回るため、返済の進み方がかなり改善します。
              </p>
              <p className="mt-3">
                この場合、完済までの目安は約50か月、総利息は約47.5万円です。まだ利息負担は大きいものの、毎月1万5千円返済のケースに比べると、完済までの期間も総支払額も大きく改善します。
              </p>
            </section>

            <section id="compare">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">3つのケースを比較すると何が違うか</h2>
              <p className="mt-3">同じ100万円・年利15%でも、毎月返済額が違うだけで結果は大きく変わります。</p>
              <ul className="mt-2 list-disc pl-5 space-y-1">
                <li>毎月1万円: 利息に届かず、完済不可に近い</li>
                <li>毎月1万5千円: 完済はするが約154か月かかる</li>
                <li>毎月3万円: 約50か月で完済の目安</li>
              </ul>

              <div className="mt-6 overflow-x-auto">
                <table className="w-full min-w-[480px] border-collapse text-left">
                  <thead>
                    <tr className="border-b-2 border-stone-200">
                      <th className="py-3 pr-4 font-semibold text-stone-900">毎月返済額</th>
                      <th className="py-3 pr-4 font-semibold text-stone-900">初月利息</th>
                      <th className="py-3 pr-4 font-semibold text-stone-900">初月元本充当</th>
                      <th className="py-3 pr-4 font-semibold text-stone-900">完済目安</th>
                      <th className="py-3 pr-4 font-semibold text-stone-900">総利息</th>
                      <th className="py-3 font-semibold text-stone-900">評価</th>
                    </tr>
                  </thead>
                  <tbody className="text-stone-700">
                    <tr className="border-b border-stone-200">
                      <td className="py-3 pr-4">約10,000円</td>
                      <td className="py-3 pr-4">約12,500円</td>
                      <td className="py-3 pr-4">0円</td>
                      <td className="py-3 pr-4">完済不可に近い</td>
                      <td className="py-3 pr-4">—</td>
                      <td className="py-3">利息に届かない</td>
                    </tr>
                    <tr className="border-b border-stone-200">
                      <td className="py-3 pr-4">約15,000円</td>
                      <td className="py-3 pr-4">約12,500円</td>
                      <td className="py-3 pr-4">約2,500円</td>
                      <td className="py-3 pr-4">約154か月</td>
                      <td className="py-3 pr-4">約1,310,000円</td>
                      <td className="py-3">非常に遅い</td>
                    </tr>
                    <tr className="border-b border-stone-200">
                      <td className="py-3 pr-4">約30,000円</td>
                      <td className="py-3 pr-4">約12,500円</td>
                      <td className="py-3 pr-4">約17,500円</td>
                      <td className="py-3 pr-4">約50か月</td>
                      <td className="py-3 pr-4">約475,166円</td>
                      <td className="py-3">現実的</td>
                    </tr>
                  </tbody>
                </table>
                <p className="mt-2 text-xs text-stone-600">
                  返済額が利息を上回り、かつ元本が十分減る水準にすることが重要です。
                </p>
              </div>

              <div className="mt-8 ds-subcard p-4">
                <h3 className="text-base font-semibold text-stone-900">毎月1万円のケース（注意）</h3>
                <div className="mt-4">
                  <CannotPayoffWarningCard />
                </div>
              </div>

              <div className="mt-8 ds-subcard p-4">
                <h3 className="text-base font-semibold text-stone-900">完済目安の比較（毎月1万5千円 vs 毎月3万円）</h3>
                <div className="mt-4">
                  <PayoffMonthsBarChart />
                </div>
              </div>

              <div className="mt-8 ds-subcard p-4">
                <h3 className="text-base font-semibold text-stone-900">総利息の比較</h3>
                <div className="mt-4">
                  <TotalInterestBarChart />
                </div>
                <p className="mt-4 text-xs text-stone-600">
                  返済額を少し上げるだけでも、完済までの期間と総利息は大きく変わります。
                </p>
              </div>

              <ArticleReadingPoints
                points={[
                  {
                    label: "この記事で最も見てほしい数字",
                    body: "比較表の「初月利息」（約12,500円）と「初月元本充当」。返済額が利息を上回っているか、元本が十分減る水準か。毎月1万円は利息に届かず、1万5千円でも完済まで約154か月・総利息約131万円と重い。",
                  },
                  {
                    label: "グラフの見方",
                    body: "「毎月1万円のケース」は完済不可に近い注意カード。棒グラフは完済目安（か月）と総利息を1.5万 vs 3万で比較。3万円にすると約50か月・総利息約47.5万円と現実的になる。",
                  },
                ]}
                misconceptions={[
                  "「毎月払っているから大丈夫」と思いがち。定額元利は払い額が固定でも、その中身が利息ばかりだと元本が減らない。",
                  "「1万5千円なら利息を上回っている」は正しいが、元本の減りが遅く、総利息が借入額を超える（約131万円）。少し上げるだけでは不十分な例として示している。",
                ]}
              />
            </section>

            <section id="suit">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">定額元利が向いているケース・向いていないケース</h2>
              <p className="mt-3">
                定額元利は、毎月の支払額を一定にしたい人には向いています。家計管理がしやすく、月ごとの支出見通しを立てやすいからです。
              </p>
              <p className="mt-3">
                一方で、返済額を低く設定しすぎると、元本が減らず、完済までの期間が極端に長くなります。つまり、定額元利そのものが悪いのではなく、返済額の設定を間違えると危険になりやすい方式だと言えます。
              </p>
            </section>

            <section id="avoid">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">完済できない状態を避けるにはどうすればいいか</h2>
              <p className="mt-3">
                完済できない状態を避けるには、まず毎月返済額が利息を上回っていることを確認する必要があります。それだけでなく、元本が十分に減る設定かどうかも重要です。
              </p>
              <p className="mt-3">
                現実的には、毎月返済額を見直す、追加返済を活用する、金利条件を見直す、といった対策が考えられます。特に、返済額が低すぎる場合は、少し引き上げるだけでも完済時期と総利息が大きく変わります。
              </p>
            </section>

            <section id="simulator">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">自分の条件で確認するならシミュレーターが早い</h2>
              <p className="mt-3">
                ここまでの数値は、あくまで「100万円・年利15%」という固定条件の近似例です。実際には、借入額、金利、返済額、返済方式、追加返済の有無によって結果は変わります。
              </p>
              <p className="mt-3">
                そのため、最終的には自分の条件を入れて確認するのが一番確実です。
                <Link href="/simulator/cardloan" className="font-bold text-stone-900 hover:underline">返済シミュレーター</Link>
                では、定額元利を含む返済方式や返済額を変えながら、完済までの期間や総利息を試算できます。
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
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">注意点</h2>
              <p className="mt-3">
                本記事の比較は、一般的な固定金利・毎月返済の考え方に基づく概算です。実際のローンやカードローンでは、日割り計算、約定返済日、最低返済額ルール、手数料、商品固有の返済仕様などが影響する場合があります。
              </p>
              <p className="mt-3">
                正確な返済条件は、契約中または検討中の金融商品の説明書や公式情報を確認してください。
              </p>
            </section>

            <section id="faq">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">よくある質問</h2>
              <div className="mt-4 space-y-6">
                <div>
                  <h3 className="text-base font-semibold text-stone-900">定額元利で完済できないことは本当にありますか？</h3>
                  <p className="mt-2">
                    毎月返済額が利息以下だと、少なくとも一般的な考え方では元本が減らず、完済できない条件に近くなります。返済額設定が重要です。
                  </p>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-stone-900">利息より返済額が少ないとどうなりますか？</h3>
                  <p className="mt-2">
                    その月の返済が利息に吸収され、元本が減りません。条件次第では、返済しているつもりでも借金がほとんど減らない状態になります。
                  </p>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-stone-900">定額元利でも完済しやすくする方法はありますか？</h3>
                  <p className="mt-2">
                    毎月返済額を引き上げる、追加返済を行う、金利条件を見直す、といった方法が有効です。特に返済額が低すぎる場合は見直しが重要です。
                  </p>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-stone-900">完済できない状態に近づいている兆候はありますか？</h3>
                  <p className="mt-2">
                    毎月返済しているのに残高がほとんど減らない、または明細の元本充当額が極端に小さい場合は注意が必要です。返済額の大部分が利息に消えている可能性があるため、明細で元本と利息の内訳を確認してみてください。
                  </p>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-stone-900">返済が追いつかないと感じたらどうすればいいですか？</h3>
                  <p className="mt-2">
                    まずは現状の返済額が利息を上回っているかを確認し、可能であれば返済額の引き上げや追加返済を検討してください。それでも難しい場合は、金融機関への相談や、公的な相談窓口（消費生活センターなど）への早めの相談が重要です。
                  </p>
                </div>
              </div>
            </section>

            <section id="summary">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">まとめ</h2>
              <p className="mt-3">
                定額元利で完済できないと言われるのは、返済額が利息以下、または利息に近すぎて元本がほとんど減らないケースがあるからです。毎月1万円のように利息を下回る設定は危険で、毎月1万5千円でも完済まで非常に長くなる場合があります。
              </p>
              <p className="mt-3">
                大切なのは、毎月の返済額が「払える額」かどうかだけでなく、「ちゃんと元本を減らせる額かどうか」を見ることです。自分の条件で試算したい場合は、
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
          </ArticleProse>

          <ArticleEditorMemo
            purpose="定額元利を選ぶときに、返済額が「利息を上回っているか」「元本を十分減らせる水準か」を確認する判断材料。完済できない・遅すぎる設定を避けてもらう。"
            reasonAxis="定額元利は家計管理しやすいが、返済額設定を誤ると危険。100万・15%で初月利息約1.25万という具体数値で、1万・1.5万・3万の差を見せる。"
            memo="シミュレーターの定額元利で自分の借入額・金利・返済額を入れて試せることを案内。"
          />

          <ArticleFooter articleSlug="fixed-payment-principal-interest-cannot-payoff" />
        </div>
      </ArticlePageShell>
    </>
  );
}
