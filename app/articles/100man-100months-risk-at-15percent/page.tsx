import type { Metadata } from "next";
import Link from "next/link";
import { ArticleFooter } from "@/app/components/ArticleFooter";
import { ArticlePagePremise, ArticleReadingPoints, ArticleEditorMemo } from "@/app/components/article";
import { getArticleBreadcrumbJsonLd, getArticleFaqJsonLd } from "@/lib/article-structured-data";
import {
  MonthlyPaymentBarChart,
  TotalInterestBarChart,
  TotalPaymentStackedChart,
} from "./RepaymentPeriodCharts";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://debt-simulator-quzc.vercel.app";
const ARTICLE_URL = `${BASE}/articles/100man-100months-risk-at-15percent`;
const ARTICLE_TITLE = "金利15%で100万円を100ヶ月返済するリスクとは？総利息と総支払額を解説";

export const metadata: Metadata = {
  title: ARTICLE_TITLE,
  description:
    "年利15%で100万円を100ヶ月かけて返済すると、毎月返済額は低く見えても総利息は大きく膨らみます。長期返済のリスクを表とグラフでわかりやすく解説します。",
  alternates: { canonical: ARTICLE_URL },
  openGraph: {
    title: ARTICLE_TITLE,
    description:
      "年利15%で100万円を100ヶ月かけて返済すると、毎月返済額は低く見えても総利息は大きく膨らみます。長期返済のリスクを表とグラフでわかりやすく解説します。",
    url: ARTICLE_URL,
    type: "article",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: ARTICLE_TITLE,
  description:
    "年利15%で100万円を100ヶ月かけて返済すると、毎月返済額は低く見えても総利息は大きく膨らみます。長期返済のリスクを表とグラフでわかりやすく解説します。",
  url: ARTICLE_URL,
  datePublished: "2025-03-08",
  dateModified: "2025-03-08",
  author: { "@type": "Organization", name: "借入返済シミュレーター" },
  publisher: { "@type": "Organization", name: "借入返済シミュレーター" },
};

const faqItems = [
  {
    question: "100万円を100ヶ月で返すと毎月いくらですか？",
    answer: "年利15%の近似例では、毎月約16,135円が目安です。実際の条件によって変わります。",
  },
  {
    question: "100万円を100ヶ月返済すると利息はいくらですか？",
    answer: "年利15%の近似例では、総利息は約613,500円が目安です。返済期間が長いため、利息負担はかなり重くなります。",
  },
  {
    question: "100ヶ月返済は危険ですか？",
    answer:
      "危険と断定はできませんが、毎月返済額が低く見える一方で、総利息と返済期間の長さが大きな負担になります。総支払額まで確認して判断することが重要です。",
  },
  {
    question: "100ヶ月より長い返済期間にするとどうなりますか？",
    answer:
      "返済期間をさらに延ばすと毎月返済額はわずかに下がりますが、総利息は加速度的に増えます。たとえば120ヶ月にすると総利息は100ヶ月の場合よりさらに数万〜十数万円増える可能性があり、完済まで10年かかる計算になります。",
  },
  {
    question: "返済期間を短くするにはどうすればいいですか？",
    answer:
      "毎月の返済額を増やす、繰り上げ返済を活用する、ボーナス月に追加返済をするなどの方法があります。たとえば100ヶ月を60ヶ月に短縮すると総利息は約18.6万円減る近似例になります。",
  },
];

const breadcrumbJsonLd = getArticleBreadcrumbJsonLd(ARTICLE_URL, ARTICLE_TITLE);
const faqJsonLd = getArticleFaqJsonLd(faqItems);

const tocItems = [
  { id: "premise", label: "このページの前提" },
  { id: "conclusion", label: "結論｜100ヶ月返済のリスクは「毎月は軽いが、総利息が重い」こと" },
  { id: "reading-points", label: "読み方のポイント" },
  { id: "why-danger", label: "なぜ100ヶ月返済は危険と言われやすいのか" },
  { id: "compare", label: "36ヶ月・60ヶ月・100ヶ月でどう違うか" },
  { id: "problem", label: "100ヶ月返済の何が問題なのか" },
  { id: "table", label: "比較表で見ると違いがわかりやすい" },
  { id: "graph", label: "グラフで見ると100ヶ月返済の重さがわかる" },
  { id: "dont-judge", label: "毎月返済額が低いことだけで判断してはいけない理由" },
  { id: "suit", label: "100ヶ月返済が向くケースはあるか" },
  { id: "reduce-risk", label: "リスクを下げるためにできること" },
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

        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-soft md:p-8">
          <h1 className="text-2xl font-black text-gray-900 md:text-3xl">{ARTICLE_TITLE}</h1>
          <p className="mt-4 text-sm text-gray-600 leading-relaxed">
            本記事の比較は、一般的な固定金利・毎月返済の近似例です。実際の商品では条件により異なる場合があります。
          </p>

          <section id="premise" className="mt-6">
            <ArticlePagePremise
              comparisonConditions={[
                "借入額100万円・年利15%・100ヶ月返済を中心に比較する",
                "36ヶ月・60ヶ月・100ヶ月の3パターンで返済期間の違いを見る",
                "一般的な固定金利・毎月返済の近似例で整理する",
              ]}
              reasonForConditions="100ヶ月（約8年4か月）は長期返済の典型例として取り上げています。36ヶ月・60ヶ月との比較で、返済期間が長くなると毎月返済額は下がる一方、総利息がどれだけ増えるかを示すためです。"
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
            <p>
              100万円を借りるとして、毎月の返済額をできるだけ低く抑えたいと考えるのは自然です。ですが、返済期間を100ヶ月のように長く設定すると、毎月の負担は軽く見える一方で、完済まで非常に長い時間がかかり、総利息も大きく膨らみます。
            </p>
            <p>
              この記事では、年利15%で100万円を借りて100ヶ月返済するケースを中心に、36ヶ月返済、60ヶ月返済と比較しながら、長期返済のリスクをわかりやすく整理します。最後に、
              <Link href="/simulator/cardloan" className="font-bold text-gray-900 hover:underline">返済シミュレーター</Link>
              への導線も用意しています。
            </p>

            <section id="conclusion">
              <h2 className="text-lg font-black text-gray-900 md:text-xl">結論｜100ヶ月返済のリスクは「毎月は軽いが、総利息が重い」こと</h2>
              <p className="mt-3">
                結論から言うと、年利15%で100万円を100ヶ月返済する場合、毎月返済額は約16,135円と低く見えますが、総利息は約613,500円まで増える近似例になります。
              </p>
              <p className="mt-3">
                つまり、毎月の負担を軽くした代わりに、返済が8年以上続き、利息だけで60万円超を支払う構造です。100万円を借りて、最終的な総支払額が約161.4万円になる点が、長期返済の大きなリスクです。
              </p>
            </section>

            <section id="reading-points">
              <ArticleReadingPoints
                points={[
                  {
                    label: "長期返済は総利息が大きく増える",
                    body: "100ヶ月返済では毎月返済額は低く見えますが、総利息は約61.4万円まで膨らみます。返済期間の長さが利息負担に直結します。",
                  },
                  {
                    label: "毎月返済額が低い＝負担が軽いとは限らない",
                    body: "月1.6万円で済むように見えても、8年以上返済が続き、総支払額は約161.4万円になります。月額だけで判断しないことが大切です。",
                  },
                  {
                    label: "短い返済期間も検討する",
                    body: "36ヶ月なら総利息は約24.8万円に抑えられます。毎月返済額は上がりますが、完済までの期間と総支払額は大きく改善します。",
                  },
                ]}
                misconceptions={[
                  "「毎月返済額が低ければ安心」と思いがちですが、返済期間が長くなるほど総利息と総支払額は大幅に増えます。",
                  "「100ヶ月は長いが少しずつ返せるからいい」と感じがちですが、利息だけで60万円超を支払う構造になります。",
                ]}
              />
            </section>

            <section id="why-danger">
              <h2 className="text-lg font-black text-gray-900 md:text-xl">なぜ100ヶ月返済は危険と言われやすいのか</h2>
              <p className="mt-3">
                100ヶ月返済が危険と言われやすい理由は、毎月返済額が低く見えるため、負担感を過小評価しやすいからです。月1.6万円程度なら払えそうに見えても、その返済が8年以上続くこと、そしてその間ずっと利息を支払い続けることを見落としやすくなります。
              </p>
              <p className="mt-3">
                また、返済期間が長いほど、収入や生活環境の変化、突発的な支出のリスクも増えます。長く返す設計は、それだけ不確実性にもさらされます。
              </p>
            </section>

            <section id="compare">
              <h2 className="text-lg font-black text-gray-900 md:text-xl">36ヶ月・60ヶ月・100ヶ月でどう違うか</h2>
              <p className="mt-3">
                同じ100万円・年利15%でも、返済期間によって毎月返済額と総利息は大きく変わります。
              </p>
              <ul className="mt-2 list-disc pl-5 space-y-1">
                <li>36ヶ月返済: 毎月約34,665円 / 総利息約247,952円</li>
                <li>60ヶ月返済: 毎月約23,790円 / 総利息約427,396円</li>
                <li>100ヶ月返済: 毎月約16,135円 / 総利息約613,500円</li>
              </ul>
              <p className="mt-3">
                100ヶ月返済にすると、36ヶ月返済より毎月返済額は約18,530円下がります。しかしその代わり、総利息は約365,548円も増える近似例になります。
              </p>
            </section>

            <section id="problem">
              <h2 className="text-lg font-black text-gray-900 md:text-xl">100ヶ月返済の何が問題なのか</h2>
              <p className="mt-3">
                100ヶ月返済の問題は、毎月返済額が低いこと自体ではなく、その条件の裏で総利息が大きくなり、完済までの期間も非常に長くなることです。
              </p>
              <p className="mt-3">
                返済が長く続けば、その間に家計状況が変わる可能性も高くなります。今は月1.6万円が払えても、数年後も同じ条件で払い続けられるとは限りません。長期返済は、将来の不確実性まで抱え込みやすい設計です。
              </p>
            </section>

            <section id="table">
              <h2 className="text-lg font-black text-gray-900 md:text-xl">比較表で見ると違いがわかりやすい</h2>
              <p className="mt-3">返済期間ごとの差を整理すると、長期返済の特徴が見えやすくなります。</p>
              <div className="mt-6 overflow-x-auto">
                <table className="w-full min-w-[520px] border-collapse text-left">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="py-3 pr-4 font-black text-gray-900">返済期間</th>
                      <th className="py-3 pr-4 font-black text-gray-900">毎月返済額</th>
                      <th className="py-3 pr-4 font-black text-gray-900">総支払額</th>
                      <th className="py-3 pr-4 font-black text-gray-900">総利息</th>
                      <th className="py-3 font-black text-gray-900">特徴</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    <tr className="border-b border-gray-200">
                      <td className="py-3 pr-4">36ヶ月</td>
                      <td className="py-3 pr-4">約34,665円</td>
                      <td className="py-3 pr-4">約1,247,952円</td>
                      <td className="py-3 pr-4">約247,952円</td>
                      <td className="py-3 text-xs">毎月負担は重いが総利息は抑えやすい</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-3 pr-4">60ヶ月</td>
                      <td className="py-3 pr-4">約23,790円</td>
                      <td className="py-3 pr-4">約1,427,396円</td>
                      <td className="py-3 pr-4">約427,396円</td>
                      <td className="py-3 text-xs">中間的</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-3 pr-4">100ヶ月</td>
                      <td className="py-3 pr-4">約16,135円</td>
                      <td className="py-3 pr-4">約1,613,500円</td>
                      <td className="py-3 pr-4">約613,500円</td>
                      <td className="py-3 text-xs">毎月は軽いが返済長期化と利息増が大きい</td>
                    </tr>
                  </tbody>
                </table>
                <p className="mt-2 text-xs text-gray-600">
                  返済期間を長くすると毎月返済額は下がりますが、総利息と総支払額は増えます。100ヶ月返済では利息だけで約61.4万円が目安です。
                </p>
              </div>
            </section>

            <section id="graph">
              <h2 className="text-lg font-black text-gray-900 md:text-xl">グラフで見ると100ヶ月返済の重さがわかる</h2>
              <p className="mt-3">数字だけでも違いはわかりますが、グラフにすると100ヶ月返済の特徴がさらに見えやすくなります。</p>

              <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-4">
                <h3 className="text-base font-black text-gray-900">返済期間別の毎月返済額</h3>
                <div className="mt-4">
                  <MonthlyPaymentBarChart />
                </div>
              </div>

              <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-4">
                <h3 className="text-base font-black text-gray-900">返済期間別の総利息</h3>
                <div className="mt-4">
                  <TotalInterestBarChart />
                </div>
              </div>

              <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-4">
                <h3 className="text-base font-black text-gray-900">総支払額の内訳（元本と利息）</h3>
                <div className="mt-4">
                  <TotalPaymentStackedChart />
                </div>
                <p className="mt-4 text-xs text-gray-600">
                  100ヶ月返済は月額だけを見ると楽に見えますが、利息負担と返済期間の長さが大きなコストになります。
                </p>
              </div>
            </section>

            <section id="dont-judge">
              <h2 className="text-lg font-black text-gray-900 md:text-xl">毎月返済額が低いことだけで判断してはいけない理由</h2>
              <p className="mt-3">
                毎月返済額が低いことは、一見メリットに見えます。しかし、その裏で返済期間が長くなり、総支払額が大きくなるなら、本当に家計に優しいとは言えません。
              </p>
              <p className="mt-3">
                借入を考えるときは、月額だけでなく、完済まで何年かかるか、最終的にいくら払うかまで確認することが重要です。
              </p>
            </section>

            <section id="suit">
              <h2 className="text-lg font-black text-gray-900 md:text-xl">100ヶ月返済が向くケースはあるか</h2>
              <p className="mt-3">
                100ヶ月返済が常に不適切とは限りません。短期返済だと家計が持たず、まずは月々の返済を抑えないと現実的に回らないケースもあります。
              </p>
              <p className="mt-3">
                ただし、その場合でも「長期返済にしたから安心」ではなく、途中で繰り上げ返済を検討する、収入改善後に返済額を増やすなど、将来的な改善余地を考えておく方が安全です。
              </p>
            </section>

            <section id="reduce-risk">
              <h2 className="text-lg font-black text-gray-900 md:text-xl">リスクを下げるためにできること</h2>
              <p className="mt-3">長期返済のリスクを下げるには、次のような考え方が有効です。</p>
              <div className="mt-4 space-y-4">
                <div>
                  <h3 className="text-base font-black text-gray-900">返済期間を必要以上に長くしない</h3>
                  <p className="mt-2">返済期間を短くできるほど、総利息は抑えやすくなります。</p>
                </div>
                <div>
                  <h3 className="text-base font-black text-gray-900">追加返済・繰り上げ返済を活用する</h3>
                  <p className="mt-2">余裕がある月に元本を多めに返すと、その後の利息を減らしやすくなります。</p>
                </div>
                <div>
                  <h3 className="text-base font-black text-gray-900">自分の条件で試算してから決める</h3>
                  <p className="mt-2">「払えそう」という感覚ではなく、総利息と完済時期を数字で確認することが大切です。</p>
                </div>
              </div>
            </section>

            <section id="simulator">
              <h2 className="text-lg font-black text-gray-900 md:text-xl">自分の条件で確認するならシミュレーターが早い</h2>
              <p className="mt-3">
                ここまでの数値は、あくまで「100万円・年利15%・100ヶ月返済」という固定条件の近似例です。実際には、借入額、金利、返済期間、返済方式、追加返済の有無によって結果は変わります。
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
                本記事の比較は、一般的な固定金利・毎月返済の考え方に基づく概算です。実際のローンやカードローンでは、日割り計算、約定返済日、最低返済額ルール、手数料、商品固有の返済仕様などが影響する場合があります。
              </p>
              <p className="mt-3">
                正確な返済条件は、契約中または検討中の金融商品の説明書や公式情報を確認してください。
              </p>
            </section>

            <section id="editor-memo">
              <ArticleEditorMemo
                purpose="100万円を100ヶ月かけて返済するリスクを具体的な数字で示し、長期返済の「見えにくいコスト」を意識してもらう記事です。"
                reasonAxis="返済期間（36ヶ月・60ヶ月・100ヶ月）を比較軸にして、毎月返済額と総利息のトレードオフを可視化しています。"
                memo="毎月返済額が低いことのメリットだけでなく、総利息と返済期間の長さが生むリスクをバランスよく伝えることを重視しています。"
              />
            </section>

            <section id="faq">
              <h2 className="text-lg font-black text-gray-900 md:text-xl">よくある質問</h2>
              <div className="mt-4 space-y-6">
                <div>
                  <h3 className="text-base font-black text-gray-900">100万円を100ヶ月で返すと毎月いくらですか？</h3>
                  <p className="mt-2">
                    年利15%の近似例では、毎月約16,135円が目安です。実際の条件によって変わります。
                  </p>
                </div>
                <div>
                  <h3 className="text-base font-black text-gray-900">100万円を100ヶ月返済すると利息はいくらですか？</h3>
                  <p className="mt-2">
                    年利15%の近似例では、総利息は約613,500円が目安です。返済期間が長いため、利息負担はかなり重くなります。
                  </p>
                </div>
                <div>
                  <h3 className="text-base font-black text-gray-900">100ヶ月返済は危険ですか？</h3>
                  <p className="mt-2">
                    危険と断定はできませんが、毎月返済額が低く見える一方で、総利息と返済期間の長さが大きな負担になります。総支払額まで確認して判断することが重要です。
                  </p>
                </div>
                <div>
                  <h3 className="text-base font-black text-gray-900">100ヶ月より長い返済期間にするとどうなりますか？</h3>
                  <p className="mt-2">
                    返済期間をさらに延ばすと毎月返済額はわずかに下がりますが、総利息は加速度的に増えます。たとえば120ヶ月にすると総利息は100ヶ月の場合よりさらに数万〜十数万円増える可能性があり、完済まで10年かかる計算になります。
                  </p>
                </div>
                <div>
                  <h3 className="text-base font-black text-gray-900">返済期間を短くするにはどうすればいいですか？</h3>
                  <p className="mt-2">
                    毎月の返済額を増やす、繰り上げ返済を活用する、ボーナス月に追加返済をするなどの方法があります。たとえば100ヶ月を60ヶ月に短縮すると総利息は約18.6万円減る近似例になります。
                  </p>
                </div>
              </div>
            </section>

            <section id="summary">
              <h2 className="text-lg font-black text-gray-900 md:text-xl">まとめ</h2>
              <p className="mt-3">
                金利15%で100万円を100ヶ月返済すると、毎月返済額は約16,135円と低く見える一方で、総利息は約613,500円まで増える近似例になります。月額だけで見ると楽に感じても、長期返済には総利息の増加と完済までの長さというリスクがあります。
              </p>
              <p className="mt-3">
                大切なのは、毎月いくら払えるかだけでなく、何年かかるか、最終的にいくら払うかまで見ることです。自分の条件で試算したい場合は、
                <Link href="/simulator/cardloan" className="font-bold text-gray-900 hover:underline">返済シミュレーター</Link>
                で確認できます。
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
          </div>

          <ArticleFooter articleSlug="100man-100months-risk-at-15percent" />
        </div>
      </article>
    </>
  );
}
