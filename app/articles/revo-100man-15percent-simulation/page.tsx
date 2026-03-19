import type { Metadata } from "next";
import Link from "next/link";
import { ArticleFooter } from "@/app/components/ArticleFooter";
import { ArticlePagePremise, ArticleReadingPoints, ArticleEditorMemo } from "@/app/components/article";
import { getArticleBreadcrumbJsonLd, getArticleFaqJsonLd } from "@/lib/article-structured-data";
import {
  PayoffMonthsBarChart,
  TotalInterestBarChart,
  TotalPaymentStackedChart,
} from "./Revo100manCharts";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://debt-simulator-quzc.vercel.app";
const ARTICLE_URL = `${BASE}/articles/revo-100man-15percent-simulation`;
const ARTICLE_TITLE = "リボ払い100万円・金利15%の返済シミュレーション｜毎月返済額でどう変わる？";

export const metadata: Metadata = {
  title: ARTICLE_TITLE,
  description:
    "リボ払い100万円を年利15%で利用した場合、毎月3万円・5万円・7万円返済で完済までの期間、総支払額、総利息がどう変わるかを表とグラフでわかりやすく解説します。",
  alternates: { canonical: ARTICLE_URL },
  openGraph: {
    title: ARTICLE_TITLE,
    description:
      "リボ払い100万円を年利15%で利用した場合、毎月3万円・5万円・7万円返済で完済までの期間、総支払額、総利息がどう変わるかを表とグラフでわかりやすく解説します。",
    url: ARTICLE_URL,
    type: "article",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: ARTICLE_TITLE,
  description:
    "リボ払い100万円を年利15%で利用した場合、毎月3万円・5万円・7万円返済で完済までの期間、総支払額、総利息がどう変わるかを表とグラフでわかりやすく解説します。",
  url: ARTICLE_URL,
  datePublished: "2025-03-08",
  dateModified: "2025-03-08",
  author: { "@type": "Organization", name: "借入返済シミュレーター" },
  publisher: { "@type": "Organization", name: "借入返済シミュレーター" },
};

const faqItems = [
  {
    question: "リボ払い100万円・金利15%だと利息はいくらですか？",
    answer:
      "近似例では、毎月3万円返済なら約47.5万円、毎月5万円返済なら約18.5万円、毎月7万円返済なら約11.1万円が目安です。返済額が低いほど利息は増えやすいです。",
  },
  {
    question: "リボ払い100万円は何年で終わりますか？",
    answer: "近似例では、毎月3万円返済なら約50か月、毎月5万円返済なら約24か月、毎月7万円返済なら約16か月が目安です。",
  },
  {
    question: "リボ払いの負担を軽くするにはどうすればいいですか？",
    answer:
      "毎月返済額を増やす、追加返済をする、金利や返済条件を見直す、の3つが基本です。特に返済額を引き上げる効果は大きいです。",
  },
  {
    question: "リボ払いの最低返済額だけ払い続けるとどうなりますか？",
    answer:
      "最低返済額は利息に近い金額に設定されていることが多く、元本がほとんど減りません。その結果、完済まで非常に長い年数がかかり、最終的な総利息が元本に匹敵するほど膨らむケースもあります。",
  },
  {
    question: "リボ払い100万円を早く完済するための具体的な戦略はありますか？",
    answer:
      "まず毎月の返済額をできる限り引き上げることが最も効果的です。加えて、ボーナスや臨時収入を追加返済に回す、不要なサブスクや固定費を削って返済原資を増やす、低金利ローンへの借り換えを検討するなどの方法があります。",
  },
];

const breadcrumbJsonLd = getArticleBreadcrumbJsonLd(ARTICLE_URL, ARTICLE_TITLE);
const faqJsonLd = getArticleFaqJsonLd(faqItems);

const tocItems = [
  { id: "premise", label: "このページの前提" },
  { id: "conclusion", label: "結論｜リボ払い100万円・金利15%は返済額しだいで重さが大きく変わる" },
  { id: "reading-points", label: "読み方のポイント" },
  { id: "why", label: "なぜリボ払いは返済額しだいで差が大きくなるのか" },
  { id: "30k", label: "毎月3万円返済ならどうなるか" },
  { id: "50k", label: "毎月5万円返済ならどうなるか" },
  { id: "70k", label: "毎月7万円返済ならどうなるか" },
  { id: "compare", label: "3万円・5万円・7万円を比較するとどう違うか" },
  { id: "graph", label: "グラフで見ると差がわかりやすい" },
  { id: "risk", label: "返済額を低くしすぎるリスク" },
  { id: "point", label: "どの返済額が現実的かを考えるポイント" },
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
            本記事の比較は、一般的な固定金利・一定返済額の近似例です。実際のリボ払い商品では条件により異なる場合があります。
          </p>

          <section id="premise" className="mt-6">
            <ArticlePagePremise
              comparisonConditions={[
                "リボ払い残高100万円・年利15%を前提に比較する",
                "毎月返済額を3万円・5万円・7万円の3パターンで比較する",
                "一般的な固定金利・一定返済額の近似例で整理する",
              ]}
              reasonForConditions="リボ払いでは毎月の返済額が完済期間と総利息に大きく影響します。3万円・5万円・7万円の3段階で、返済額の差がどれだけ結果を変えるかを比較しています。"
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
              リボ払いで100万円を利用した場合、毎月の返済額をいくらに設定するかで、完済までの期間も総利息も大きく変わります。毎月の支払いが低いと一見ラクに見えますが、そのぶん元本の減りが遅くなり、利息を長く払い続けることになります。
            </p>
            <p>
              この記事では、リボ払い100万円・年利15%という条件を前提に、毎月3万円・5万円・7万円返済で何がどれだけ変わるのかを比較します。最後に、
              <Link href="/simulator/cardloan" className="font-bold text-gray-900 hover:underline">返済シミュレーター</Link>
              への導線も用意しています。
            </p>

            <section id="conclusion">
              <h2 className="text-lg font-black text-gray-900 md:text-xl">結論｜リボ払い100万円・金利15%は返済額しだいで重さが大きく変わる</h2>
              <p className="mt-3">
                結論から言うと、リボ払い100万円を年利15%で利用した場合、毎月3万円返済では総利息は約47.5万円、毎月5万円返済では約18.5万円、毎月7万円返済では約11.1万円が目安です。
              </p>
              <p className="mt-3">
                つまり、毎月の返済額を上げるだけで、完済までの期間と総利息はかなり改善します。逆に、返済額を低く抑えすぎると、完済が長引いて利息負担が重くなりやすいです。
              </p>
            </section>

            <section id="reading-points">
              <ArticleReadingPoints
                points={[
                  {
                    label: "返済額を上げると完済期間と利息が大きく改善する",
                    body: "毎月3万円では約50か月・利息約47.5万円ですが、7万円にすると約16か月・利息約11.1万円まで改善します。",
                  },
                  {
                    label: "最低限の返済額では長期化しやすい",
                    body: "返済額が低いと元本の減りが遅く、利息を長く払い続ける構造になります。",
                  },
                  {
                    label: "月額だけでなく総利息と完済時期を確認する",
                    body: "毎月の支払いが低くても、完済まで何か月かかり最終的にいくら払うかまで見ることが重要です。",
                  },
                ]}
                misconceptions={[
                  "「毎月3万円で払えているから問題ない」と思いがちですが、完済まで4年以上かかり利息だけで約47.5万円になります。",
                  "「リボ払いの利息は大したことない」と感じがちですが、残高が大きいほど利息の影響は大きくなります。",
                ]}
              />
            </section>

            <section id="why">
              <h2 className="text-lg font-black text-gray-900 md:text-xl">なぜリボ払いは返済額しだいで差が大きくなるのか</h2>
              <p className="mt-3">
                リボ払いでは、毎月の返済額の中に利息も含まれています。そのため、返済額が低いと元本に回る金額が小さくなり、残高が減りにくくなります。
              </p>
              <p className="mt-3">
                残高が大きい状態が長く続くほど利息も発生し続けるため、毎月返済額の差が、最終的な総利息の差として大きく表れます。100万円のように残高が大きいケースでは、この差が特に目立ちます。
              </p>
            </section>

            <section id="30k">
              <h2 className="text-lg font-black text-gray-900 md:text-xl">毎月3万円返済ならどうなるか</h2>
              <p className="mt-3">
                リボ払い100万円を年利15%で毎月3万円ずつ返済する場合、完済までの目安は50か月、総支払額は約147.5万円、総利息は約47.5万円です。
              </p>
              <p className="mt-3">
                月3万円なら払えそうに見えますが、返済は約4年2か月続きます。毎月の負担を抑える代わりに、利息を長く払い続ける構造になります。
              </p>
            </section>

            <section id="50k">
              <h2 className="text-lg font-black text-gray-900 md:text-xl">毎月5万円返済ならどうなるか</h2>
              <p className="mt-3">
                同じ100万円・年利15%でも、毎月5万円返済なら完済までの目安は24か月、総支払額は約118.5万円、総利息は約18.5万円です。
              </p>
              <p className="mt-3">
                毎月3万円返済と比べると負担は増えますが、完済までの期間は大きく短縮され、総利息もかなり減ります。リボ払いでは、毎月返済額を上げる効果が非常に大きいことがわかります。
              </p>
            </section>

            <section id="70k">
              <h2 className="text-lg font-black text-gray-900 md:text-xl">毎月7万円返済ならどうなるか</h2>
              <p className="mt-3">
                毎月7万円返済にすると、完済までの目安は16か月、総支払額は約111.1万円、総利息は約11.1万円です。
              </p>
              <p className="mt-3">
                月5万円よりもさらに返済負担は増えますが、完済が早くなるため、利息負担はかなり小さくなります。短期で返せるほど、リボ払いの重さは和らぎやすくなります。
              </p>
            </section>

            <section id="compare">
              <h2 className="text-lg font-black text-gray-900 md:text-xl">3万円・5万円・7万円を比較するとどう違うか</h2>
              <p className="mt-3">同じ100万円・年利15%でも、毎月返済額の違いで結果はかなり変わります。</p>
              <ul className="mt-2 list-disc pl-5 space-y-1">
                <li>毎月3万円: 約50か月 / 総利息約475,166円</li>
                <li>毎月5万円: 約24か月 / 総利息約185,022円</li>
                <li>毎月7万円: 約16か月 / 総利息約111,009円</li>
              </ul>
              <p className="mt-3">
                毎月の返済額を2万円上げるだけでも、完済までの期間と総利息は大きく改善します。リボ払いでは、「毎月いくら払うか」が特に重要です。
              </p>

              <div className="mt-6 overflow-x-auto">
                <table className="w-full min-w-[520px] border-collapse text-left">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="py-3 pr-4 font-black text-gray-900">毎月返済額</th>
                      <th className="py-3 pr-4 font-black text-gray-900">完済までの目安</th>
                      <th className="py-3 pr-4 font-black text-gray-900">総支払額</th>
                      <th className="py-3 pr-4 font-black text-gray-900">総利息</th>
                      <th className="py-3 font-black text-gray-900">特徴</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    <tr className="border-b border-gray-200">
                      <td className="py-3 pr-4">約30,000円</td>
                      <td className="py-3 pr-4">約50か月</td>
                      <td className="py-3 pr-4">約1,475,166円</td>
                      <td className="py-3 pr-4">約475,166円</td>
                      <td className="py-3 text-xs">毎月は軽いが長期化しやすい</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-3 pr-4">約50,000円</td>
                      <td className="py-3 pr-4">約24か月</td>
                      <td className="py-3 pr-4">約1,185,022円</td>
                      <td className="py-3 pr-4">約185,022円</td>
                      <td className="py-3 text-xs">バランス型</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-3 pr-4">約70,000円</td>
                      <td className="py-3 pr-4">約16か月</td>
                      <td className="py-3 pr-4">約1,111,009円</td>
                      <td className="py-3 pr-4">約111,009円</td>
                      <td className="py-3 text-xs">毎月負担は重いが早く終わりやすい</td>
                    </tr>
                  </tbody>
                </table>
                <p className="mt-2 text-xs text-gray-600">
                  毎月返済額が上がるほど、完済期間も総利息も大きく改善します。3万円・5万円・7万円の差は特に大きくなります。
                </p>
              </div>
            </section>

            <section id="graph">
              <h2 className="text-lg font-black text-gray-900 md:text-xl">グラフで見ると差がわかりやすい</h2>
              <p className="mt-3">数字だけでも違いはわかりますが、グラフにすると、返済額の差が完済期間と総利息にどう効いてくるかが見えやすくなります。</p>

              <div className="mt-6 ds-subcard p-4">
                <h3 className="text-base font-black text-gray-900">毎月返済額別の完済期間</h3>
                <div className="mt-4">
                  <PayoffMonthsBarChart />
                </div>
              </div>

              <div className="mt-8 ds-subcard p-4">
                <h3 className="text-base font-black text-gray-900">毎月返済額別の総利息</h3>
                <div className="mt-4">
                  <TotalInterestBarChart />
                </div>
              </div>

              <div className="mt-8 ds-subcard p-4">
                <h3 className="text-base font-black text-gray-900">総支払額の内訳（元本と利息）</h3>
                <div className="mt-4">
                  <TotalPaymentStackedChart />
                </div>
                <p className="mt-4 text-xs text-gray-600">
                  毎月返済額が低いと元本が減りにくく、結果的に利息負担が大きくなります。
                </p>
              </div>
            </section>

            <section id="risk">
              <h2 className="text-lg font-black text-gray-900 md:text-xl">返済額を低くしすぎるリスク</h2>
              <p className="mt-3">
                毎月返済額を低くすると、月々の負担は軽く見えます。しかしそのぶん、元本の減りが遅くなり、完済までの期間が長引きます。
              </p>
              <p className="mt-3">
                返済が長期化すると、その間に収入や生活状況が変わるリスクも増えます。今は払えても、数年後も同じ条件で払い続けられるとは限りません。
              </p>
            </section>

            <section id="point">
              <h2 className="text-lg font-black text-gray-900 md:text-xl">どの返済額が現実的かを考えるポイント</h2>
              <p className="mt-3">
                どの返済額が現実的かは、家計の余力によって変わります。毎月3万円は見た目の負担は軽いですが、長期化しやすく、利息も重くなります。
              </p>
              <p className="mt-3">
                毎月5万円は利息と完済期間のバランスが取りやすく、毎月7万円は短期で終わらせたい人向けです。重要なのは、毎月の負担だけでなく、総利息と完済時期まで含めて判断することです。
              </p>
            </section>

            <section id="simulator">
              <h2 className="text-lg font-black text-gray-900 md:text-xl">自分の条件で確認するならシミュレーターが早い</h2>
              <p className="mt-3">
                ここまでの数値は、あくまで「リボ払い100万円・年利15%」という固定条件の近似例です。実際には、利用残高、金利、返済方式、最低返済額ルール、追加返済の有無によって結果は変わります。
              </p>
              <p className="mt-3">
                そのため、最終的には自分の条件を入れて確認するのが一番確実です。
                <Link href="/simulator/cardloan" className="font-bold text-gray-900 hover:underline">返済シミュレーター</Link>
                では、借入額や金利、返済期間を入力して、月々の返済額や総利息を試算できます。
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
                本記事の比較は、一般的な固定金利・一定返済額の考え方に基づく概算です。実際のリボ払い商品では、元金定額方式、残高スライド方式、締日、支払日、手数料計算、遅延損害金などが影響する場合があります。
              </p>
              <p className="mt-3">
                正確な返済条件は、利用中または検討中のカード会社・金融会社の公式情報を確認してください。
              </p>
            </section>

            <section id="editor-memo">
              <ArticleEditorMemo
                purpose="リボ払い100万円・年利15%という条件で、毎月の返済額の違いが完済期間と総利息にどう影響するかを具体的に示す記事です。"
                reasonAxis="毎月返済額（3万円・5万円・7万円）を比較軸にして、返済額を上げることの効果を可視化しています。"
                memo="リボ払いの仕組み上、返済額が低いと元本が減りにくく利息が膨らみやすい構造を、数字で実感できるようにしています。"
              />
            </section>

            <section id="faq">
              <h2 className="text-lg font-black text-gray-900 md:text-xl">よくある質問</h2>
              <div className="mt-4 space-y-6">
                <div>
                  <h3 className="text-base font-black text-gray-900">リボ払い100万円・金利15%だと利息はいくらですか？</h3>
                  <p className="mt-2">
                    近似例では、毎月3万円返済なら約47.5万円、毎月5万円返済なら約18.5万円、毎月7万円返済なら約11.1万円が目安です。返済額が低いほど利息は増えやすいです。
                  </p>
                </div>
                <div>
                  <h3 className="text-base font-black text-gray-900">リボ払い100万円は何年で終わりますか？</h3>
                  <p className="mt-2">
                    近似例では、毎月3万円返済なら約50か月、毎月5万円返済なら約24か月、毎月7万円返済なら約16か月が目安です。
                  </p>
                </div>
                <div>
                  <h3 className="text-base font-black text-gray-900">リボ払いの負担を軽くするにはどうすればいいですか？</h3>
                  <p className="mt-2">
                    毎月返済額を増やす、追加返済をする、金利や返済条件を見直す、の3つが基本です。特に返済額を引き上げる効果は大きいです。
                  </p>
                </div>
                <div>
                  <h3 className="text-base font-black text-gray-900">リボ払いの最低返済額だけ払い続けるとどうなりますか？</h3>
                  <p className="mt-2">
                    最低返済額は利息に近い金額に設定されていることが多く、元本がほとんど減りません。その結果、完済まで非常に長い年数がかかり、最終的な総利息が元本に匹敵するほど膨らむケースもあります。
                  </p>
                </div>
                <div>
                  <h3 className="text-base font-black text-gray-900">リボ払い100万円を早く完済するための具体的な戦略はありますか？</h3>
                  <p className="mt-2">
                    まず毎月の返済額をできる限り引き上げることが最も効果的です。加えて、ボーナスや臨時収入を追加返済に回す、不要なサブスクや固定費を削って返済原資を増やす、低金利ローンへの借り換えを検討するなどの方法があります。
                  </p>
                </div>
              </div>
            </section>

            <section id="summary">
              <h2 className="text-lg font-black text-gray-900 md:text-xl">まとめ</h2>
              <p className="mt-3">
                リボ払い100万円・金利15%という条件でも、毎月返済額が3万円・5万円・7万円で完済期間と総利息は大きく変わります。毎月の返済額を低くすると、そのぶん元本が減りにくくなり、総利息は重くなります。
              </p>
              <p className="mt-3">
                大切なのは、毎月いくら払うかだけでなく、何か月かかるか、最終的にいくら払うかまで見ることです。自分の条件で試算したい場合は、
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

          <ArticleFooter articleSlug="revo-100man-15percent-simulation" />
        </div>
      </article>
    </>
  );
}
