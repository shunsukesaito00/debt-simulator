import type { Metadata } from "next";
import Link from "next/link";
import { ArticleFooter } from "@/app/components/ArticleFooter";
import { MonthlyAndInterestBarCharts200, TotalPaymentStackedChart200 } from "./InterestCharts200";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://debt-simulator-quzc.vercel.app";
const ARTICLE_URL = `${BASE}/articles/borrow-200-monthly-payment`;
const ARTICLE_TITLE = "借金200万円の月々返済はいくら？年利15%で3年・5年返済を比較";

export const metadata: Metadata = {
  title: ARTICLE_TITLE,
  description:
    "借金200万円を年利15%で借りた場合の月々の返済額、総支払額、総利息を3年返済・5年返済で比較して解説します。自分の条件は返済シミュレーターで確認できます。",
  alternates: { canonical: ARTICLE_URL },
  openGraph: {
    title: ARTICLE_TITLE,
    description:
      "借金200万円を年利15%で借りた場合の月々の返済額、総支払額、総利息を3年返済・5年返済で比較して解説します。自分の条件は返済シミュレーターで確認できます。",
    url: ARTICLE_URL,
    type: "article",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: ARTICLE_TITLE,
  description:
    "借金200万円を年利15%で借りた場合の月々の返済額、総支払額、総利息を3年返済・5年返済で比較して解説します。自分の条件は返済シミュレーターで確認できます。",
  url: ARTICLE_URL,
  datePublished: "2025-03-08",
  dateModified: "2025-03-08",
  author: { "@type": "Organization", name: "借入返済シミュレーター" },
  publisher: { "@type": "Organization", name: "借入返済シミュレーター" },
};

const tocItems = [
  { id: "conclusion", label: "結論｜借金200万円の月々返済はいくらか" },
  { id: "reason", label: "借入200万円で返済額が重くなりやすい理由" },
  { id: "3years", label: "借金200万円を3年で返す場合の月々返済額" },
  { id: "5years", label: "借金200万円を5年で返す場合の月々返済額" },
  { id: "compare", label: "3年返済と5年返済の比較" },
  { id: "balance", label: "どちらを選ぶべきか｜月々の返済額と総支払額のバランス" },
  { id: "reduce-interest", label: "利息負担を減らすための現実的な方法" },
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

        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-soft md:p-8">
          <h1 className="text-2xl font-black text-gray-900 md:text-3xl">{ARTICLE_TITLE}</h1>
          <p className="mt-4 text-sm text-gray-600 leading-relaxed">
            本記事の計算は、一般的な固定金利・毎月返済の近似例です。実際の返済条件は契約内容により異なります。
          </p>

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
            <p>
              借金200万円をカードローンやフリーローンで借りた場合、毎月の返済額がどれくらいになるのかは、多くの人が最初に気になるポイントです。特に年利15%前後はよく見かける水準なので、返済期間を3年にするか5年にするかで、家計への負担や総支払額がどう変わるかを把握しておくことは重要です。
            </p>
            <p>
              この記事では、借金200万円を年利15%で借りたケースを例に、3年返済と5年返済の月々返済額、総支払額、総利息を比較してわかりやすく解説します。実際の条件で確認したい方は、
              <Link href="/simulator/cardloan" className="font-bold text-gray-900 hover:underline">借入返済シミュレーター</Link>
              で試算できます。
            </p>

            <section id="conclusion">
              <h2 className="text-lg font-black text-gray-900 md:text-xl">結論｜借金200万円の月々返済はいくらか</h2>
              <p className="mt-3">
                結論から言うと、借金200万円を年利15%で借りた場合、3年返済なら月々の返済額は約69,329円、5年返済なら約47,580円が目安です。
              </p>
              <p className="mt-3">
                5年返済にすると毎月の負担は約2.2万円軽くなりますが、その分だけ総利息は大きく増えます。月々の負担を減らしたいのか、総支払額を抑えたいのかで、適切な返済期間は変わります。
              </p>
            </section>

            <section id="reason">
              <h2 className="text-lg font-black text-gray-900 md:text-xl">借入200万円で返済額が重くなりやすい理由</h2>
              <p className="mt-3">
                借入額が200万円になると、100万円のケースと比べて当然ながら毎月の返済額も総利息も大きくなります。年利15%のような水準では、返済期間を長く取るほど利息負担が重くなりやすく、家計への影響も無視しにくくなります。
              </p>
              <p className="mt-3">
                また、毎月の返済額を抑えようとして返済期間を延ばすと、返済そのものが長期化し、結果的に支払総額が大きくなります。200万円クラスの借入では、この差がかなり目立ちます。
              </p>
            </section>

            <section id="3years">
              <h2 className="text-lg font-black text-gray-900 md:text-xl">借金200万円を3年で返す場合の月々返済額</h2>
              <p className="mt-3">
                借金200万円を年利15%で3年（36回）返済する場合、毎月の返済額は約69,329円、総支払額は約249万6千円、総利息は約49.6万円が目安です。
              </p>
              <p className="mt-3">
                月々7万円近い返済になるため、家計にある程度の余力がないと継続は簡単ではありません。ただし、返済期間を短くすることで、総利息を抑えやすいのが大きなメリットです。
              </p>
            </section>

            <section id="5years">
              <h2 className="text-lg font-black text-gray-900 md:text-xl">借金200万円を5年で返す場合の月々返済額</h2>
              <p className="mt-3">
                借金200万円を年利15%で5年（60回）返済する場合、毎月の返済額は約47,580円、総支払額は約285万5千円、総利息は約85.5万円が目安です。
              </p>
              <p className="mt-3">
                3年返済と比べると毎月の返済額はかなり軽くなりますが、総利息は約35.9万円増えます。返済を楽にしたつもりでも、長い目で見るとコストはかなり大きくなります。
              </p>
            </section>

            <section id="compare">
              <h2 className="text-lg font-black text-gray-900 md:text-xl">3年返済と5年返済の比較</h2>
              <p className="mt-3">
                同じ200万円を借りても、返済期間が違うだけで毎月返済額も総利息も大きく変わります。比較すると次の通りです。
              </p>
              <ul className="mt-2 list-disc pl-5 space-y-1">
                <li>3年返済: 毎月約69,329円 / 総利息約495,844円</li>
                <li>5年返済: 毎月約47,580円 / 総利息約854,792円</li>
              </ul>
              <p className="mt-3">
                毎月の差額は約21,749円です。一方で、総利息の差額は約358,948円あります。返済期間を延ばして毎月を軽くすると、利息負担が想像以上に増えることがわかります。
              </p>

              <div className="mt-6 overflow-x-auto">
                <table className="w-full min-w-[320px] border-collapse text-left">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="py-3 pr-4 font-black text-gray-900">返済期間</th>
                      <th className="py-3 pr-4 font-black text-gray-900">毎月返済額</th>
                      <th className="py-3 pr-4 font-black text-gray-900">総支払額</th>
                      <th className="py-3 font-black text-gray-900">総利息</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    <tr className="border-b border-gray-200">
                      <td className="py-3 pr-4">3年返済</td>
                      <td className="py-3 pr-4">約69,329円</td>
                      <td className="py-3 pr-4">約2,495,844円</td>
                      <td className="py-3">約495,844円</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-3 pr-4">5年返済</td>
                      <td className="py-3 pr-4">約47,580円</td>
                      <td className="py-3 pr-4">約2,854,792円</td>
                      <td className="py-3">約854,792円</td>
                    </tr>
                  </tbody>
                </table>
                <p className="mt-2 text-xs text-gray-600">
                  毎月の負担は5年返済の方が軽い一方、総利息は3年返済の方が約36万円少なくなります。
                </p>
              </div>

              <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-4">
                <h3 className="text-base font-black text-gray-900">返済期間別の比較</h3>
                <div className="mt-4">
                  <MonthlyAndInterestBarCharts200 />
                </div>
                <p className="mt-4 text-xs text-gray-600">
                  毎月の返済額は5年返済の方が低い一方、総利息は5年返済の方が大きくなります。
                </p>
              </div>

              <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-4">
                <h3 className="text-base font-black text-gray-900">総支払額の内訳（元本と利息）</h3>
                <div className="mt-4">
                  <TotalPaymentStackedChart200 />
                </div>
                <p className="mt-4 text-xs text-gray-600">
                  5年返済は毎月の負担を抑えられる一方で、利息負担の比率が大きくなります。
                </p>
              </div>
            </section>

            <section id="balance">
              <h2 className="text-lg font-black text-gray-900 md:text-xl">どちらを選ぶべきか｜月々の返済額と総支払額のバランス</h2>
              <p className="mt-3">
                どちらが向いているかは、毎月どこまで無理なく返済できるかで決まります。月々約6.9万円でも安定して返済できるなら、3年返済の方が総利息を抑えやすいです。逆に、月々約4.8万円程度でないと生活が苦しいなら、5年返済の方が現実的です。
              </p>
              <p className="mt-3">
                ただし、返済期間を長く取るほど利息負担は重くなります。生活防衛資金を確保しつつ、可能な範囲で短めの返済期間を選ぶ方が、支払総額は小さくなりやすいです。
              </p>
            </section>

            <section id="reduce-interest">
              <h2 className="text-lg font-black text-gray-900 md:text-xl">利息負担を減らすための現実的な方法</h2>
              <p className="mt-3">
                200万円規模の借入では、ちょっとした条件差でも利息負担が変わります。利息を減らしたい場合は、次の方法が有効です。
              </p>
              <div className="mt-4 space-y-4">
                <div>
                  <h3 className="text-base font-black text-gray-900">返済期間を短くする</h3>
                  <p className="mt-1">毎月の返済額は増えますが、総利息を抑える効果は大きいです。</p>
                </div>
                <div>
                  <h3 className="text-base font-black text-gray-900">追加返済・繰上返済を活用する</h3>
                  <p className="mt-1">余裕がある月に元本を多めに返すと、その後の利息負担も減りやすくなります。</p>
                </div>
                <div>
                  <h3 className="text-base font-black text-gray-900">金利条件を見直す</h3>
                  <p className="mt-1">借り換えや条件変更が可能なら、金利低下の効果は大きいです。借入額が200万円だと、金利差の影響も無視しにくくなります。</p>
                </div>
              </div>
            </section>

            <section id="simulator">
              <h2 className="text-lg font-black text-gray-900 md:text-xl">自分の条件で確認するならシミュレーターが早い</h2>
              <p className="mt-3">
                ここまでの数値は、あくまで「200万円・年利15%」という固定条件で見た目安です。実際には、借入額、金利、返済期間、返済方式、追加返済の有無によって結果は変わります。
              </p>
              <p className="mt-3">
                そのため、最終的には自分の条件を入れて確認するのが一番確実です。
                <Link href="/simulator/cardloan" className="font-bold text-gray-900 hover:underline">返済シミュレーター</Link>
                では、借入額や金利、返済期間を入力して、月々の返済額や総利息を試算できます。
              </p>
              <div className="mt-6">
                <Link
                  href="/simulator/cardloan"
                  className="inline-flex items-center justify-center rounded-2xl bg-gray-900 px-6 py-3 text-sm font-black text-white hover:opacity-90"
                >
                  借入返済シミュレーターで計算する →
                </Link>
              </div>
            </section>

            <section id="notice">
              <h2 className="text-lg font-black text-gray-900 md:text-xl">注意点</h2>
              <p className="mt-3">
                本記事の試算は、一般的な固定金利・毎月返済の考え方に基づく概算です。実際のカードローンやローン商品では、日割り計算、初回返済日、最低返済額ルール、遅延損害金、手数料などが影響する場合があります。
              </p>
              <p className="mt-3">
                正確な返済条件は、契約中または検討中の金融商品の説明書や公式情報を確認してください。
              </p>
            </section>

            <section id="faq">
              <h2 className="text-lg font-black text-gray-900 md:text-xl">よくある質問</h2>
              <div className="mt-4 space-y-6">
                <div>
                  <h3 className="text-base font-black text-gray-900">借金200万円の月々返済額はどれくらいですか？</h3>
                  <p className="mt-2">
                    年利15%の目安では、3年返済なら約69,329円、5年返済なら約47,580円です。実際には商品条件により変動します。
                  </p>
                </div>
                <div>
                  <h3 className="text-base font-black text-gray-900">借金200万円の利息はどれくらいかかりますか？</h3>
                  <p className="mt-2">
                    年利15%で3年返済なら総利息は約49.6万円、5年返済なら約85.5万円が目安です。返済期間が長くなると利息は大きくなります。
                  </p>
                </div>
                <div>
                  <h3 className="text-base font-black text-gray-900">借金200万円を早く返す方法はありますか？</h3>
                  <p className="mt-2">
                    返済期間を短くする、追加返済を行う、金利条件を見直す、の3つが基本です。無理のない範囲で毎月の返済額を上げられると、総利息は下がりやすくなります。
                  </p>
                </div>
              </div>
            </section>

            <section id="summary">
              <h2 className="text-lg font-black text-gray-900 md:text-xl">まとめ</h2>
              <p className="mt-3">
                借金200万円を年利15%で借りた場合、3年返済なら月々約69,329円、5年返済なら約47,580円が目安です。毎月の負担を軽くすると、そのぶん総利息は増えます。
              </p>
              <p className="mt-3">
                返済期間の選び方で迷う場合は、感覚ではなく数値で比較することが大切です。自分の条件で試算したい場合は、
                <Link href="/simulator/cardloan" className="font-bold text-gray-900 hover:underline">借入返済シミュレーター</Link>
                で確認できます。
              </p>
            </section>
          </div>

          <ArticleFooter articleSlug="borrow-200-monthly-payment" />
        </div>
      </article>
    </>
  );
}
