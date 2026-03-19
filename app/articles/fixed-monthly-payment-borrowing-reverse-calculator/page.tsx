import type { Metadata } from "next";
import Link from "next/link";
import { ArticleFooter } from "@/app/components/ArticleFooter";
import { ArticlePagePremise, ArticleReadingPoints, ArticleEditorMemo } from "@/app/components/article";
import { getArticleBreadcrumbJsonLd, getArticleFaqJsonLd } from "@/lib/article-structured-data";
import {
  PrincipalByPaymentBarChart,
  InterestByPaymentBarChart,
  BalanceCards,
} from "./ReverseCalcCharts";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://debt-simulator-quzc.vercel.app";
const ARTICLE_URL = `${BASE}/articles/fixed-monthly-payment-borrowing-reverse-calculator`;
const ARTICLE_TITLE = "月々返済額を固定すると借入額はいくら？返済額から逆算する考え方を解説";

export const metadata: Metadata = {
  title: ARTICLE_TITLE,
  description:
    "月々の返済額を固定した場合に、返済期間や金利によって借入額の目安がどう変わるかを、表とグラフでわかりやすく解説します。自分の条件は返済シミュレーターで確認できます。",
  alternates: { canonical: ARTICLE_URL },
  openGraph: {
    title: ARTICLE_TITLE,
    description:
      "月々の返済額を固定した場合に、返済期間や金利によって借入額の目安がどう変わるかを、表とグラフでわかりやすく解説します。自分の条件は返済シミュレーターで確認できます。",
    url: ARTICLE_URL,
    type: "article",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: ARTICLE_TITLE,
  description:
    "月々の返済額を固定した場合に、返済期間や金利によって借入額の目安がどう変わるかを、表とグラフでわかりやすく解説します。自分の条件は返済シミュレーターで確認できます。",
  url: ARTICLE_URL,
  datePublished: "2025-03-08",
  dateModified: "2025-03-08",
  author: { "@type": "Organization", name: "借入返済シミュレーター" },
  publisher: { "@type": "Organization", name: "借入返済シミュレーター" },
};

const faqItems = [
  {
    question: "月々返済額を固定すると借入額はどう決まりますか？",
    answer:
      "金利と返済期間を前提にして、毎月返済額から逆算した借入額の目安を求めます。返済年数が長いほど借入額の目安は増えやすいです。",
  },
  {
    question: "月々5万円ならいくらまで借りられますか？",
    answer: "年利15%の近似例では、3年返済で約144万円、5年返済で約210万円が目安です。実際の条件によって変わります。",
  },
  {
    question: "借入額を増やすには返済年数を延ばせばいいですか？",
    answer:
      "借入額の目安は増えますが、そのぶん総利息も増えます。借入額だけでなく、最終的な総支払額まで含めて考えることが重要です。",
  },
  {
    question: "月3万円と月5万円では、借入可能額にどれくらい差がありますか？",
    answer:
      "年利15%・5年返済の近似例では、月3万円なら約126万円、月5万円なら約210万円が目安です。毎月返済額を2万円増やすだけで借入額の目安は約84万円広がりますが、総支払額もそのぶん増えます。",
  },
  {
    question: "逆算で出した借入額は、そのまま借りて安全ですか？",
    answer:
      "逆算の結果はあくまで返済計画上の目安です。実際には生活費、他の固定費、緊急時の備えなども考慮し、余裕をもった借入額にすることが重要です。目安の上限ぎりぎりで借りるのはリスクが高くなります。",
  },
];

const breadcrumbJsonLd = getArticleBreadcrumbJsonLd(ARTICLE_URL, ARTICLE_TITLE);
const faqJsonLd = getArticleFaqJsonLd(faqItems);

const tocItems = [
  { id: "premise", label: "このページの前提" },
  { id: "conclusion", label: "結論｜月々返済額を固定すると借入額の目安は金利と年数で決まる" },
  { id: "reading-points", label: "読み方のポイント" },
  { id: "reverse-idea", label: "月々返済額から借入額を逆算する考え方" },
  { id: "30k", label: "毎月3万円固定ならいくらまでが目安か" },
  { id: "50k", label: "毎月5万円固定ならいくらまでが目安か" },
  { id: "70k", label: "毎月7万円固定ならいくらまでが目安か" },
  { id: "compare", label: "月額固定×返済年数で比較するとどう違うか" },
  { id: "suit", label: "どの月額設定が向いているか" },
  { id: "merit", label: "逆算で借入額を考えるメリット" },
  { id: "simulator", label: "自分の条件で確認するならシミュレーターが早い" },
  { id: "notice", label: "注意点" },
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
            <li className="text-gray-900 font-bold" aria-current="page">{ARTICLE_TITLE}</li>
          </ol>
        </nav>

        <div className="ds-card ds-card-pad">
          <h1 className="text-2xl font-black text-gray-900 md:text-3xl">{ARTICLE_TITLE}</h1>
          <p className="mt-4 text-sm text-gray-600 leading-relaxed">
            本記事で扱う借入額は返済計画上の目安であり、審査上の借入可能額や与信枠を示すものではありません。一般的な固定金利・毎月返済の近似例です。
          </p>

          <section id="premise" className="mt-6">
            <ArticlePagePremise
              comparisonConditions={[
                "月々の返済額を固定（3万円・5万円・7万円）し、借入額を逆算する",
                "年利15%・3年返済・5年返済で比較する",
                "一般的な固定金利・毎月返済の近似例で整理する",
              ]}
              reasonForConditions="「毎月いくら返せるか」を先に決め、金利と返済年数から借入額の目安を逆算する考え方です。返済額ごとに、返済年数で借入額と総利息がどう変わるかを比較しています。"
            />
          </section>

          <section className="mt-6 ds-subcard p-4">
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
            <p>
              毎月の返済額はこれくらいまでに抑えたい、と考える人は多いはずです。そのときに気になるのが、「ではその条件なら、いくらまで借りるのが現実的なのか」という点です。借入額を先に決めるのではなく、月々返済額から逆算して考える方が、無理のない返済計画を立てやすくなります。
            </p>
            <p>
              この記事では、月々3万円・5万円・7万円を固定して返済するケースを例に、年利15%で3年返済・5年返済とした場合、借入額の目安がどれくらい変わるのかを整理します。最後に、
              <Link href="/simulator/cardloan" className="font-bold text-gray-900 hover:underline">返済シミュレーター</Link>
              への導線も用意しています。
            </p>

            <section id="conclusion">
              <h2 className="text-lg font-black text-gray-900 md:text-xl">結論｜月々返済額を固定すると借入額の目安は金利と年数で決まる</h2>
              <p className="mt-3">
                結論から言うと、月々返済額を固定した場合の借入額の目安は、金利と返済期間で大きく変わります。年利15%の近似例では、毎月3万円なら3年で約86.5万円、5年で約126.1万円、毎月5万円なら3年で約144.2万円、5年で約210.1万円が目安です。
              </p>
              <p className="mt-3">
                つまり、毎月返済額を上げるか、返済期間を延ばすかで、借入額の目安は増えます。ただし、返済期間を長くすると総利息も増えるため、借入額だけで判断しないことが大切です。
              </p>
            </section>

            <section id="reading-points">
              <ArticleReadingPoints
                points={[
                  {
                    label: "総支払額まで見る",
                    body: "借入額の目安が増えても、返済年数が長いと総利息もかなり増えます。借入額だけでなく総支払額まで確認することが大切です。",
                  },
                  {
                    label: "返済年数を延ばすほど利息は増える",
                    body: "同じ月々返済額でも、返済年数を延ばすと借入額は増えますが、そのぶん総利息も増えます。",
                  },
                  {
                    label: "シミュレーターで自分の条件を試す",
                    body: "ここでの数値はあくまで近似例です。自分の金利・返済額・期間で試算するには、シミュレーターを活用してください。",
                  },
                ]}
                misconceptions={[
                  "「返済年数を延ばせばたくさん借りられるから得」と思いがちですが、そのぶん総利息は大幅に増えます。",
                  "「月々の返済額が同じなら負担は同じ」と考えがちですが、返済年数が違えば総支払額はまったく異なります。",
                ]}
              />
            </section>

            <section id="reverse-idea">
              <h2 className="text-lg font-black text-gray-900 md:text-xl">月々返済額から借入額を逆算する考え方</h2>
              <p className="mt-3">
                借入額を逆算する考え方は単純で、「毎月いくらなら返済できるか」を先に決め、その条件で金利と返済期間を当てはめて、借入額の目安を求めます。
              </p>
              <p className="mt-3">
                この方法のメリットは、返済負担の上限を先に決められることです。借入額から返済額を後で見るよりも、家計に無理のない借入を考えやすくなります。
              </p>
            </section>

            <section id="30k">
              <h2 className="text-lg font-black text-gray-900 md:text-xl">毎月3万円固定ならいくらまでが目安か</h2>
              <p className="mt-3">
                年利15%の近似例では、毎月3万円返済に固定した場合、3年返済なら借入額の目安は約86.5万円、5年返済なら約126.1万円です。
              </p>
              <p className="mt-3">
                3年返済の方が借入額の目安は小さいですが、その分だけ総利息は抑えやすくなります。5年返済にすると借入額の目安は増えますが、総利息も増えるため、借入額だけでなく総支払額も確認する必要があります。
              </p>
            </section>

            <section id="50k">
              <h2 className="text-lg font-black text-gray-900 md:text-xl">毎月5万円固定ならいくらまでが目安か</h2>
              <p className="mt-3">
                年利15%の近似例では、毎月5万円返済に固定した場合、3年返済なら借入額の目安は約144.2万円、5年返済なら約210.1万円です。
              </p>
              <p className="mt-3">
                毎月3万円と比べると、借入額の目安はかなり広がります。ただし、返済期間を5年にすると総利息は約89.9万円まで増えるため、毎月返済額だけでなく利息負担も見ておくことが重要です。
              </p>
            </section>

            <section id="70k">
              <h2 className="text-lg font-black text-gray-900 md:text-xl">毎月7万円固定ならいくらまでが目安か</h2>
              <p className="mt-3">
                年利15%の近似例では、毎月7万円返済に固定した場合、3年返済なら借入額の目安は約201.9万円、5年返済なら約294.2万円です。
              </p>
              <p className="mt-3">
                借入額の目安は大きくなりますが、5年返済では総利息も約125.8万円に達します。返済能力があるからといって借入額を最大化するのではなく、総支払額まで含めて考えるべきです。
              </p>
            </section>

            <section id="compare">
              <h2 className="text-lg font-black text-gray-900 md:text-xl">月額固定×返済年数で比較するとどう違うか</h2>
              <p className="mt-3">同じ金利でも、毎月返済額と返済年数の組み合わせ次第で、借入額の目安は大きく変わります。</p>
              <ul className="mt-2 list-disc pl-5 space-y-1">
                <li>毎月3万円 / 3年返済: 約865,000円</li>
                <li>毎月3万円 / 5年返済: 約1,261,000円</li>
                <li>毎月5万円 / 3年返済: 約1,442,000円</li>
                <li>毎月5万円 / 5年返済: 約2,101,000円</li>
                <li>毎月7万円 / 3年返済: 約2,019,000円</li>
                <li>毎月7万円 / 5年返済: 約2,942,000円</li>
              </ul>

              <div className="mt-6 overflow-x-auto">
                <table className="w-full min-w-[480px] border-collapse text-left">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="py-3 pr-4 font-black text-gray-900">毎月返済額</th>
                      <th className="py-3 pr-4 font-black text-gray-900">返済年数</th>
                      <th className="py-3 pr-4 font-black text-gray-900">借入額目安</th>
                      <th className="py-3 pr-4 font-black text-gray-900">総支払額</th>
                      <th className="py-3 font-black text-gray-900">総利息</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    <tr className="border-b border-gray-200">
                      <td className="py-3 pr-4">約30,000円</td>
                      <td className="py-3 pr-4">3年</td>
                      <td className="py-3 pr-4">約865,000円</td>
                      <td className="py-3 pr-4">約1,080,000円</td>
                      <td className="py-3">約215,000円</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-3 pr-4">約30,000円</td>
                      <td className="py-3 pr-4">5年</td>
                      <td className="py-3 pr-4">約1,261,000円</td>
                      <td className="py-3 pr-4">約1,800,000円</td>
                      <td className="py-3">約539,000円</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-3 pr-4">約50,000円</td>
                      <td className="py-3 pr-4">3年</td>
                      <td className="py-3 pr-4">約1,442,000円</td>
                      <td className="py-3 pr-4">約1,800,000円</td>
                      <td className="py-3">約358,000円</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-3 pr-4">約50,000円</td>
                      <td className="py-3 pr-4">5年</td>
                      <td className="py-3 pr-4">約2,101,000円</td>
                      <td className="py-3 pr-4">約3,000,000円</td>
                      <td className="py-3">約899,000円</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-3 pr-4">約70,000円</td>
                      <td className="py-3 pr-4">3年</td>
                      <td className="py-3 pr-4">約2,019,000円</td>
                      <td className="py-3 pr-4">約2,520,000円</td>
                      <td className="py-3">約501,000円</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-3 pr-4">約70,000円</td>
                      <td className="py-3 pr-4">5年</td>
                      <td className="py-3 pr-4">約2,942,000円</td>
                      <td className="py-3 pr-4">約4,200,000円</td>
                      <td className="py-3">約1,258,000円</td>
                    </tr>
                  </tbody>
                </table>
                <p className="mt-2 text-xs text-gray-600">
                  毎月返済額が大きいほど、同じ返済年数なら借入額目安は増えます。返済年数を延ばすと借入額目安は増えますが総利息も増えます。
                </p>
              </div>

              <div className="mt-8 ds-subcard p-4">
                <h3 className="text-base font-black text-gray-900">月々返済額別の借入額目安</h3>
                <div className="mt-4">
                  <PrincipalByPaymentBarChart />
                </div>
              </div>

              <div className="mt-8 ds-subcard p-4">
                <h3 className="text-base font-black text-gray-900">返済年数別の総利息</h3>
                <div className="mt-4">
                  <InterestByPaymentBarChart />
                </div>
              </div>

              <div className="mt-8 ds-subcard p-4">
                <h3 className="text-base font-black text-gray-900">借入額目安と総利息のバランス</h3>
                <div className="mt-4">
                  <BalanceCards />
                </div>
                <p className="mt-4 text-xs text-gray-600">
                  月々返済額を固定すると借入額の目安は逆算できますが、返済年数を延ばすほど利息負担は重くなります。
                </p>
              </div>
            </section>

            <section id="suit">
              <h2 className="text-lg font-black text-gray-900 md:text-xl">どの月額設定が向いているか</h2>
              <p className="mt-3">
                どの月額設定が向いているかは、家計の余力によって変わります。毎月3万円なら比較的安全寄りですが、借入額の目安は小さくなります。毎月5万円は借入額と返済負担のバランスが取りやすい中間的な考え方です。
              </p>
              <p className="mt-3">
                毎月7万円まで返済できる場合は、借入額の目安を大きく取れますが、そのぶん家計への圧迫も大きくなります。固定費や生活防衛資金を含めて、無理のない範囲で考える必要があります。
              </p>
            </section>

            <section id="merit">
              <h2 className="text-lg font-black text-gray-900 md:text-xl">逆算で借入額を考えるメリット</h2>
              <p className="mt-3">
                借入額から返済額を見る方法だと、後から「思ったより重い」と感じることがあります。一方、月々返済額を先に固定して逆算する方法なら、家計の許容範囲から借入額を考えやすくなります。
              </p>
              <p className="mt-3">
                また、複数の返済年数で比較することで、「借入額を増やす代わりにどれだけ利息が増えるか」も把握しやすくなります。感覚ではなく数字で判断できるのが大きなメリットです。
              </p>
            </section>

            <section id="simulator">
              <h2 className="text-lg font-black text-gray-900 md:text-xl">自分の条件で確認するならシミュレーターが早い</h2>
              <p className="mt-3">
                ここまでの数値は、あくまで「年利15%・月額固定」という近似例です。実際には、借入額、金利、返済期間、返済方式、追加返済の有無によって結果は変わります。
              </p>
              <p className="mt-3">
                そのため、最終的には自分の条件を入れて確認するのが一番確実です。
                <Link href="/simulator/cardloan" className="font-bold text-gray-900 hover:underline">返済シミュレーター</Link>
                では、借入額や金利、返済期間を入力しながら、月々の返済額に近い条件を試算できます。
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
              <h2 className="text-lg font-black text-gray-900 md:text-xl">注意点</h2>
              <p className="mt-3">
                本記事の比較は、一般的な固定金利・毎月返済の考え方に基づく概算です。実際のローンやカードローンでは、日割り計算、約定返済日、最低返済額ルール、手数料、商品固有の返済仕様などが影響する場合があります。
              </p>
              <p className="mt-3">
                また、この記事で扱う借入額は返済計画上の目安であり、金融機関の審査上の借入可能額や与信枠を示すものではありません。正確な条件は、契約中または検討中の金融商品の説明書や公式情報を確認してください。
              </p>
            </section>

            <section id="editor-memo">
              <ArticleEditorMemo
                purpose="月々返済額を先に決めて借入額を逆算する考え方を整理し、無理のない返済計画の立て方を提案する記事です。"
                reasonAxis="返済額（3万円・5万円・7万円）×返済年数（3年・5年）の組み合わせで、借入額の目安と総利息がどう変わるかを比較軸にしています。"
                memo="借入額を最大化するのではなく、家計の許容範囲から安全な借入を考えるための逆算アプローチを主役にしています。"
              />
            </section>

            <section id="faq">
              <h2 className="text-lg font-black text-gray-900 md:text-xl">よくある質問</h2>
              <div className="mt-4 space-y-6">
                <div>
                  <h3 className="text-base font-black text-gray-900">月々返済額を固定すると借入額はどう決まりますか？</h3>
                  <p className="mt-2">
                    金利と返済期間を前提にして、毎月返済額から逆算した借入額の目安を求めます。返済年数が長いほど借入額の目安は増えやすいです。
                  </p>
                </div>
                <div>
                  <h3 className="text-base font-black text-gray-900">月々5万円ならいくらまで借りられますか？</h3>
                  <p className="mt-2">
                    年利15%の近似例では、3年返済で約144万円、5年返済で約210万円が目安です。実際の条件によって変わります。
                  </p>
                </div>
                <div>
                  <h3 className="text-base font-black text-gray-900">借入額を増やすには返済年数を延ばせばいいですか？</h3>
                  <p className="mt-2">
                    借入額の目安は増えますが、そのぶん総利息も増えます。借入額だけでなく、最終的な総支払額まで含めて考えることが重要です。
                  </p>
                </div>
                <div>
                  <h3 className="text-base font-black text-gray-900">月3万円と月5万円では、借入可能額にどれくらい差がありますか？</h3>
                  <p className="mt-2">
                    年利15%・5年返済の近似例では、月3万円なら約126万円、月5万円なら約210万円が目安です。毎月返済額を2万円増やすだけで借入額の目安は約84万円広がりますが、総支払額もそのぶん増えます。
                  </p>
                </div>
                <div>
                  <h3 className="text-base font-black text-gray-900">逆算で出した借入額は、そのまま借りて安全ですか？</h3>
                  <p className="mt-2">
                    逆算の結果はあくまで返済計画上の目安です。実際には生活費、他の固定費、緊急時の備えなども考慮し、余裕をもった借入額にすることが重要です。目安の上限ぎりぎりで借りるのはリスクが高くなります。
                  </p>
                </div>
              </div>
            </section>

            <section id="summary">
              <h2 className="text-lg font-black text-gray-900 md:text-xl">まとめ</h2>
              <p className="mt-3">
                月々返済額を固定して借入額を逆算すると、無理のない返済計画を立てやすくなります。年利15%の近似例では、毎月3万円・5万円・7万円といった違い、さらに3年返済・5年返済の違いによって、借入額の目安は大きく変わります。
              </p>
              <p className="mt-3">
                ただし、返済年数を延ばすと借入額の目安は増える一方で、総利息もかなり増えます。借入額だけでなく総支払額まで含めて判断することが大切です。自分の条件で試算したい場合は、
                <Link href="/simulator/cardloan" className="font-bold text-gray-900 hover:underline">返済シミュレーター</Link>
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

          <ArticleFooter articleSlug="fixed-monthly-payment-borrowing-reverse-calculator" />
        </div>
      </article>
    </>
  );
}
