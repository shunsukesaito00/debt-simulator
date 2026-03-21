import type { Metadata } from "next";
import Link from "next/link";
import { ArticleFooter } from "@/app/components/ArticleFooter";
import { ArticlePagePremise, ArticleReadingPoints, ArticleEditorMemo } from "@/app/components/article";
import { getArticleBreadcrumbJsonLd, getArticleFaqJsonLd } from "@/lib/article-structured-data";
import { ARTICLE_AUTHOR_JSON_LD, ARTICLE_PUBLISHER_JSON_LD } from "@/lib/site-author";
import { ArticlePageShell } from "@/app/components/ArticlePageShell";
import { articleUsesWideLayout } from "@/lib/article-layout";

import {
  InterestComparisonBarChart,
  MonthsComparisonBarChart,
  PaymentBreakdownCards,
} from "./EarlyRepayment100kCharts";

/** 比較表用データ（SSRで使うためクライアントモジュール外で定義） */
const comparisonTableRows = [
  {
    condition: "繰り上げ返済なし",
    monthly: "約47,580円",
    extra: "ー",
    months: "60か月",
    totalPayment: "約2,854,792円",
    totalInterest: "約854,792円",
    effect: "基準",
  },
  {
    condition: "12か月後に10万円繰り上げ返済",
    monthly: "約47,580円",
    extra: "100,000円",
    months: "約56か月",
    totalPayment: "約2,825,246円",
    totalInterest: "約725,246円",
    effect: "約4か月短縮 / 利息約129,546円減",
  },
];

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://debt-simulator-quzc.vercel.app";
const ARTICLE_URL = `${BASE}/articles/early-repayment-100k-effect`;
const ARTICLE_TITLE =
  "繰り上げ返済10万円の効果は？利息はいくら減る？完済時期の違いも解説";

export const metadata: Metadata = {
  title: ARTICLE_TITLE,
  description:
    "10万円の繰り上げ返済で、総利息や完済時期がどれだけ変わるのかを、具体例・比較表・グラフでわかりやすく解説します。",
  alternates: { canonical: ARTICLE_URL },
  openGraph: {
    title: ARTICLE_TITLE,
    description:
      "10万円の繰り上げ返済で、総利息や完済時期がどれだけ変わるのかを、具体例・比較表・グラフでわかりやすく解説します。",
    url: ARTICLE_URL,
    type: "article",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: ARTICLE_TITLE,
  description:
    "10万円の繰り上げ返済で、総利息や完済時期がどれだけ変わるのかを、具体例・比較表・グラフでわかりやすく解説します。",
  url: ARTICLE_URL,
  datePublished: "2025-03-08",
  dateModified: "2025-03-08",
  author: ARTICLE_AUTHOR_JSON_LD,
  publisher: ARTICLE_PUBLISHER_JSON_LD,
};

const faqItems = [
  {
    question: "繰り上げ返済10万円でも効果はありますか？",
    answer:
      "あります。今回の近似例では、完済まで約4か月短縮、総利息は約129,546円減ります。条件によって効果は変わります。",
  },
  {
    question: "10万円の追加返済で得する金額は10万円ですか？",
    answer:
      "10万円そのものが得になるわけではありません。元本を早く減らすことで、その後に払うはずだった利息を減らせるのが本質です。",
  },
  {
    question: "繰り上げ返済はいつやると効果が大きいですか？",
    answer:
      "一般的には、残高が大きい早い時期ほど効果が出やすいです。返済初期ほど、その後の利息を減らせる期間が長くなるためです。",
  },
  {
    question: "繰り上げ返済のタイミングは1年後と3年後でどれくらい差がありますか？",
    answer:
      "同じ10万円でも、返済初期（残高が大きい時期）に追加返済する方が、その後に減らせる利息の総額は大きくなりやすいです。3年後より1年後の方が効果が出やすい傾向があります。",
  },
  {
    question: "10万円ではなく5万円や20万円の繰り上げ返済だと効果はどう変わりますか？",
    answer:
      "追加返済額が大きいほど元本が早く減るため、利息軽減・完済短縮の効果も大きくなります。逆に5万円でも効果はゼロではなく、少額でも元本を前倒しで減らす意味はあります。自分の条件で比較したい場合はシミュレーターで試算できます。",
  },
];

const breadcrumbJsonLd = getArticleBreadcrumbJsonLd(ARTICLE_URL, ARTICLE_TITLE);
const faqJsonLd = getArticleFaqJsonLd(faqItems);

const tocItems = [
  { id: "conclusion", label: "結論｜繰り上げ返済10万円でも利息と完済時期はちゃんと変わる" },
  { id: "why", label: "なぜ10万円の繰り上げ返済で利息が減るのか" },
  { id: "no-extra", label: "繰り上げ返済なしだとどうなるか" },
  { id: "with-extra", label: "12か月後に10万円繰り上げ返済するとどうなるか" },
  { id: "compare-table", label: "比較表で見ると効果がわかりやすい" },
  { id: "chart", label: "グラフで見ると何が変わるか" },
  { id: "total-payment-note", label: "総支払額の見え方に注意" },
  { id: "who", label: "10万円の繰り上げ返済が向いている人" },
  { id: "category", label: "返済改善の中で見るとどういう位置づけか" },
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

      
      <ArticlePageShell currentPageTitle={ARTICLE_TITLE} wide={articleUsesWideLayout("early-repayment-100k-effect")}>
<div className="ds-card ds-card-pad">
          <h1 className="text-2xl font-black text-stone-900 md:text-3xl">
            {ARTICLE_TITLE}
          </h1>
          <p className="mt-4 text-sm text-stone-600 leading-relaxed">
            本記事の比較は、200万円・年利15%・5年返済を前提にした一般的な概算例です。実際の商品では条件が異なる場合があります。
          </p>

          <ArticlePagePremise
            comparisonConditions={[
              "借入額200万円・年利15%・元利均等・5年返済（60回）",
              "繰り上げ返済なし vs 返済開始12か月後に10万円を1回追加返済",
            ]}
            reasonForConditions="200万・5年返済は多くの人が検討する水準。12か月後は返済初期で残高がまだ大きいタイミングなので、10万円繰り上げの効果が出やすい例として選んだ。"
          />

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
              繰り上げ返済をした方がよいとはよく言われますが、実際に10万円だけ追加で返済した場合、どれくらいの効果があるのかは気になるところです。まとまったお金を入れても、何がどれだけ変わるのかが見えないと判断しにくいからです。
            </p>
            <p>
              この記事では、200万円・年利15%・5年返済の近似例を使って、返済開始から12か月後に10万円を繰り上げ返済した場合、完済時期、総利息、総支払額がどう変わるかを整理します。最後に、実際の条件を入力して確認できる
              <Link href="/simulator/cardloan" className="font-bold text-stone-900 hover:underline">
                返済シミュレーター
              </Link>
              への導線も用意しています。
            </p>

            <section id="conclusion">
              <h2 className="text-lg font-black text-stone-900 md:text-xl">
                結論｜繰り上げ返済10万円でも利息と完済時期はちゃんと変わる
              </h2>
              <p className="mt-3">
                結論から言うと、繰り上げ返済10万円でも効果は十分あります。今回の近似例では、200万円を年利15%で5年返済するケースで、12か月後に10万円を追加返済すると、完済までの期間は約4か月短縮され、総利息は約129,546円減ります。
              </p>
              <p className="mt-3">
                つまり、10万円を前倒しで元本返済に回すことで、その後に発生する利息を減らせるということです。少額に見えても、条件によっては効果は無視できません。
              </p>
            </section>

            <section id="why">
              <h2 className="text-lg font-black text-stone-900 md:text-xl">
                なぜ10万円の繰り上げ返済で利息が減るのか
              </h2>
              <p className="mt-3">
                繰り上げ返済の効果は、元本を早く減らせることにあります。利息は残高に対して発生するため、途中で元本を10万円減らせば、その後の残高が小さくなり、将来発生する利息も減ります。
              </p>
              <p className="mt-3">
                つまり、10万円を払うことで10万円そのものが得になるわけではなく、10万円を早く返したことで「本来払うはずだった利息」を減らせるのが本質です。
              </p>
            </section>

            <section id="no-extra">
              <h2 className="text-lg font-black text-stone-900 md:text-xl">
                繰り上げ返済なしだとどうなるか
              </h2>
              <p className="mt-3">
                繰り上げ返済をしない場合、今回の近似例では毎月返済額は約47,580円、完済までの目安は60か月、総利息は約854,792円です。
              </p>
              <p className="mt-3">
                5年で返し切る設計ですが、利息負担は80万円を超えます。まずはこの通常ケースを基準に見ることで、10万円追加返済の効果がわかりやすくなります。
              </p>
            </section>

            <section id="with-extra">
              <h2 className="text-lg font-black text-stone-900 md:text-xl">
                12か月後に10万円繰り上げ返済するとどうなるか
              </h2>
              <p className="mt-3">
                返済開始から12か月後に10万円を追加返済し、その後も毎月返済額を約47,580円のまま維持すると、完済までの目安は約56か月、総利息は約725,246円になります。
              </p>
              <p className="mt-3">
                通常ケースと比べると、完済まで約4か月短縮され、総利息は約129,546円減ります。10万円の追加返済でも、タイミング次第では十分な改善効果があります。
              </p>
            </section>

            <section id="compare-table">
              <h2 className="text-lg font-black text-stone-900 md:text-xl">
                比較表で見ると効果がわかりやすい
              </h2>
              <p className="mt-3">
                繰り上げ返済なしと、12か月後に10万円繰り上げ返済したケースを比較表で整理します。
              </p>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full min-w-[640px] border-collapse text-sm">
                  <thead>
                    <tr className="border-b-2 border-stone-200 bg-stone-50 text-left">
                      <th className="py-2.5 pr-3 font-bold text-stone-900">条件</th>
                      <th className="py-2.5 pr-3 font-bold text-stone-900">毎月返済額</th>
                      <th className="py-2.5 pr-3 font-bold text-stone-900">追加返済</th>
                      <th className="py-2.5 pr-3 font-bold text-stone-900">完済目安</th>
                      <th className="py-2.5 pr-3 font-bold text-stone-900">総支払額</th>
                      <th className="py-2.5 pr-3 font-bold text-stone-900">総利息</th>
                      <th className="py-2.5 font-bold text-stone-900">効果</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonTableRows.map((row, i) => (
                      <tr key={i} className="border-b border-stone-100">
                        <td className="py-2.5 pr-3">{row.condition}</td>
                        <td className="py-2.5 pr-3">{row.monthly}</td>
                        <td className="py-2.5 pr-3">{row.extra}</td>
                        <td className="py-2.5 pr-3">{row.months}</td>
                        <td className="py-2.5 pr-3">{row.totalPayment}</td>
                        <td className="py-2.5 pr-3">{row.totalInterest}</td>
                        <td className="py-2.5">{row.effect}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section id="chart">
              <h2 className="text-lg font-black text-stone-900 md:text-xl">
                グラフで見ると何が変わるか
              </h2>
              <p className="mt-3">
                数字だけでも違いはわかりますが、グラフにすると、繰り上げ返済10万円の効果がより直感的にわかります。
              </p>
              <div className="mt-6 space-y-8">
                <InterestComparisonBarChart />
                <MonthsComparisonBarChart />
                <div>
                  <p className="mb-2 text-sm font-bold text-stone-700">総支払額の内訳比較</p>
                  <PaymentBreakdownCards />
                </div>
              </div>
              <p className="mt-4 text-sm text-stone-600">
                10万円の追加返済は、元本を早く減らすことで、その後に払う利息を減らす効果があります。
              </p>

              <ArticleReadingPoints
                points={[
                  {
                    label: "この記事で最も見てほしい数字",
                    body: "比較表の「総利息」（なし約85.5万 vs 10万繰り上げ約72.5万）と「完済目安」（60か月 vs 56か月）。10万円の追加で利息約13万円減・完済4か月短縮という効果の大きさ。",
                  },
                  {
                    label: "グラフの見方",
                    body: "棒グラフは総利息と完済か月数を「繰り上げなし」と「12か月後に10万」で並べている。内訳カードは総支払額の元本・利息の割合を比較。追加返済すると利息部分が減る。",
                  },
                ]}
                misconceptions={[
                  "「10万を余計に払うから損では」と思いがち。追加返済は将来の利息を減らすので、総支払額に占める利息が減り、結果として負担が軽くなる。",
                  "「少額だから効果は小さい」と誤解しやすい。この例では約13万円の利息削減・4か月短縮と、10万円に対して十分な効果が出ている。",
                ]}
              />
            </section>

            <section id="total-payment-note">
              <h2 className="text-lg font-black text-stone-900 md:text-xl">
                総支払額の見え方に注意
              </h2>
              <p className="mt-3">
                繰り上げ返済では、途中で追加で10万円を払うため、「支払額が増えたのでは」と感じることがあります。ただし重要なのは、追加返済によってその後の利息が減る点です。
              </p>
              <p className="mt-3">
                つまり、途中でお金を前倒しして払う代わりに、将来払う利息を減らしている構造です。支払タイミングが前に寄るだけで、長期的には利息負担を抑えられます。
              </p>
            </section>

            <section id="who">
              <h2 className="text-lg font-black text-stone-900 md:text-xl">
                10万円の繰り上げ返済が向いている人
              </h2>
              <p className="mt-3">
                10万円程度のまとまった資金があり、すぐに使う予定がない場合は、繰り上げ返済の効果を検討する価値があります。特に、金利が高めで、残高がまだ大きい段階では効果が出やすいです。
              </p>
              <p className="mt-3">
                一方で、手元資金を減らしすぎると生活防衛資金が不足する恐れもあります。繰り上げ返済は有効ですが、無理のない範囲で考えることが重要です。
              </p>
            </section>

            <section id="category">
              <h2 className="text-lg font-black text-stone-900 md:text-xl">
                返済改善の中で見るとどういう位置づけか
              </h2>
              <p className="mt-3">
                繰り上げ返済は、返済改善策の中でも「総利息を減らしたい」「完済を早めたい」場合に特に有効です。詳しい全体像は
                <Link
                  href="/articles/repayment-improvement-guide"
                  className="font-bold text-stone-900 hover:underline"
                >
                  返済を軽くする方法｜繰り上げ返済・返済期間・返済方式の見直しを解説
                </Link>
                をご覧ください。
              </p>
              <p className="mt-3">
                また、長期返済のリスクを理解したい場合は
                <Link
                  href="/articles/100man-100months-risk-at-15percent"
                  className="font-bold text-stone-900 hover:underline"
                >
                  金利15%で100万円を100ヶ月返済するリスクとは？総利息と総支払額を解説
                </Link>
                、毎月返済額と総利息の関係を知りたい場合は
                <Link
                  href="/articles/monthly-50000-interest-at-15percent"
                  className="font-bold text-stone-900 hover:underline"
                >
                  借金返済が月5万円・金利15%なら総利息はいくら？借入額別に比較
                </Link>
                をご覧ください。
              </p>
            </section>

            <section id="simulator">
              <h2 className="text-lg font-black text-stone-900 md:text-xl">
                自分の条件で確認するならシミュレーターが早い
              </h2>
              <p className="mt-3">
                ここまでの数値は、あくまで「200万円・年利15%・5年返済・12か月後に10万円追加返済」という固定条件の近似例です。実際には、借入額、金利、返済方式、追加返済のタイミングによって効果は変わります。
              </p>
              <p className="mt-3">
                そのため、最終的には自分の条件を入れて確認するのが一番確実です。次の返済シミュレーターでは、追加返済をONにして、完済時期や総利息の変化を比較できます。
              </p>
              <div className="mt-6">
                <Link
                  href="/simulator/cardloan"
                  className="ds-btn ds-btn-primary"
                >
                  借入返済シミュレーターで比較する →
                </Link>
              </div>
            </section>

            <section id="notice">
              <h2 className="text-lg font-black text-stone-900 md:text-xl">
                注意点
              </h2>
              <p className="mt-3">
                本記事の比較は、一般的な固定金利・毎月返済の考え方に基づく概算です。実際のローンやカードローンでは、日割り計算、約定返済日、手数料、商品ごとの返済仕様などが影響する場合があります。
              </p>
              <p className="mt-3">
                正確な条件は、契約中または検討中の金融商品の説明書や公式情報を確認してください。
              </p>
            </section>

            <section id="faq">
              <h2 className="text-lg font-black text-stone-900 md:text-xl">
                よくある質問
              </h2>
              <div className="mt-4 space-y-6">
                <div>
                  <h3 className="text-base font-black text-stone-900">
                    繰り上げ返済10万円でも効果はありますか？
                  </h3>
                  <p className="mt-2">
                    あります。今回の近似例では、完済まで約4か月短縮、総利息は約129,546円減ります。条件によって効果は変わります。
                  </p>
                </div>
                <div>
                  <h3 className="text-base font-black text-stone-900">
                    10万円の追加返済で得する金額は10万円ですか？
                  </h3>
                  <p className="mt-2">
                    10万円そのものが得になるわけではありません。元本を早く減らすことで、その後に払うはずだった利息を減らせるのが本質です。
                  </p>
                </div>
                <div>
                  <h3 className="text-base font-black text-stone-900">
                    繰り上げ返済はいつやると効果が大きいですか？
                  </h3>
                  <p className="mt-2">
                    一般的には、残高が大きい早い時期ほど効果が出やすいです。返済初期ほど、その後の利息を減らせる期間が長くなるためです。
                  </p>
                </div>
                <div>
                  <h3 className="text-base font-black text-stone-900">
                    繰り上げ返済のタイミングは1年後と3年後でどれくらい差がありますか？
                  </h3>
                  <p className="mt-2">
                    同じ10万円でも、返済初期（残高が大きい時期）に追加返済する方が、その後に減らせる利息の総額は大きくなりやすいです。3年後より1年後の方が効果が出やすい傾向があります。
                  </p>
                </div>
                <div>
                  <h3 className="text-base font-black text-stone-900">
                    10万円ではなく5万円や20万円の繰り上げ返済だと効果はどう変わりますか？
                  </h3>
                  <p className="mt-2">
                    追加返済額が大きいほど元本が早く減るため、利息軽減・完済短縮の効果も大きくなります。逆に5万円でも効果はゼロではなく、少額でも元本を前倒しで減らす意味はあります。自分の条件で比較したい場合はシミュレーターで試算できます。
                  </p>
                </div>
              </div>
            </section>

            <section id="summary">
              <h2 className="text-lg font-black text-stone-900 md:text-xl">
                まとめ
              </h2>
              <p className="mt-3">
                繰り上げ返済10万円でも、完済時期や総利息には十分な変化が出ます。今回の近似例では、200万円・年利15%・5年返済の条件で、12か月後に10万円追加返済すると、完済まで約4か月短縮、総利息は約129,546円減ります。
              </p>
              <p className="mt-3">
                大切なのは、繰り上げ返済は「元本を早く減らして、将来の利息を減らす手段」だと理解することです。自分の条件で試算したい場合は、
                <Link href="/simulator/cardloan" className="font-bold text-stone-900 hover:underline">
                  返済シミュレーター
                </Link>
                で確認できます。
              </p>
              <div className="mt-6">
                <Link
                  href="/simulator/cardloan"
                  className="ds-btn ds-btn-primary"
                >
                  借入返済シミュレーターで比較する →
                </Link>
              </div>
            </section>
          </div>

          <ArticleEditorMemo
            purpose="10万円の繰り上げ返済で、利息と完済時期がどれだけ変わるかの判断材料。少額でも効果があること、総支払額の見え方（前倒しで払う代わりに利息が減る）を押さえてもらう。"
            reasonAxis="「10万の繰り上げで何が変わるか」は検索されやすい。200万・5年・12か月後は返済初期で効果が出やすい典型例として比較。"
            memo="シミュレーターで追加返済タブから自分の条件で試せることを案内。"
          />

          <ArticleFooter articleSlug="early-repayment-100k-effect" />
        </div>
      </ArticlePageShell>
    </>
  );
}
