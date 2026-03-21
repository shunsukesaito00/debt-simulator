import type { Metadata } from "next";
import Link from "next/link";
import { ArticleFooter } from "@/app/components/ArticleFooter";
import { ArticlePagePremise, ArticleReadingPoints, ArticleEditorMemo, ArticleStandardBlocks, ArticleProse } from "@/app/components/article";
import { getArticleBreadcrumbJsonLd, getArticleFaqJsonLd } from "@/lib/article-structured-data";
import { ARTICLE_AUTHOR_JSON_LD, ARTICLE_PUBLISHER_JSON_LD } from "@/lib/site-author";
import { ArticlePageShell } from "@/app/components/ArticlePageShell";
import { articleUsesWideLayout } from "@/lib/article-layout";

import { PrincipalBarChart, TotalInterestBarChart, TotalPaymentStackedChart } from "./ChartsLazy";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://debt-simulator-quzc.vercel.app";
const ARTICLE_URL = `${BASE}/articles/monthly-50000-how-much-can-borrow`;
const ARTICLE_TITLE = "借金返済が月5万円ならいくらまで借りられる？返済額から逆算する目安を解説";

export const metadata: Metadata = {
  title: ARTICLE_TITLE,
  description:
    "毎月5万円返済できる場合、年利15%を前提に何万円くらいまで借りると現実的かを、3年・5年・7年返済の比較表とグラフでわかりやすく解説します。",
  alternates: { canonical: ARTICLE_URL },
  openGraph: {
    title: ARTICLE_TITLE,
    description:
      "毎月5万円返済できる場合、年利15%を前提に何万円くらいまで借りると現実的かを、3年・5年・7年返済の比較表とグラフでわかりやすく解説します。",
    url: ARTICLE_URL,
    type: "article",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: ARTICLE_TITLE,
  description:
    "毎月5万円返済できる場合、年利15%を前提に何万円くらいまで借りると現実的かを、3年・5年・7年返済の比較表とグラフでわかりやすく解説します。",
  url: ARTICLE_URL,
  datePublished: "2025-03-08",
  dateModified: "2025-03-08",
  author: ARTICLE_AUTHOR_JSON_LD,
  publisher: ARTICLE_PUBLISHER_JSON_LD,
};

const faqItems = [
  {
    question: "月5万円返済なら何万円くらいまで借りられますか？",
    answer:
      "年利15%の近似例では、3年返済で約144万円、5年返済で約210万円、7年返済で約255万円が目安です。実際の条件によって変わります。",
  },
  {
    question: "月5万円返済なら200万円借りても大丈夫ですか？",
    answer:
      "年利15%の近似例では、5年返済前後を前提にすると200万円台前半が一つの目安になります。ただし、生活費や他の支出も踏まえて無理のない返済計画かを確認する必要があります。",
  },
  {
    question: "月5万円返済で借入額を増やす方法はありますか？",
    answer:
      "返済期間を延ばせば借入額の目安は増えますが、そのぶん総利息も増えます。借入額だけでなく総支払額とのバランスを見ることが重要です。",
  },
  {
    question: "月5万円返済で安全に借りられる目安はどのくらいですか？",
    answer:
      "一概には言えませんが、生活費や他の固定費を差し引いたうえで無理なく返せる範囲が前提です。年利15%の場合、3年返済の約144万円は比較的総利息を抑えやすい目安になります。",
  },
  {
    question: "返済期間を長くすると、借入額以外に何が変わりますか？",
    answer:
      "返済期間が長くなると、総利息が大幅に増えます。たとえば3年返済と7年返済では、借入額の目安は約111万円の差ですが、総利息は約129万円も差が出ます。完済までに払う総額が大きく変わる点に注意が必要です。",
  },
];

const breadcrumbJsonLd = getArticleBreadcrumbJsonLd(ARTICLE_URL, ARTICLE_TITLE);
const faqJsonLd = getArticleFaqJsonLd(faqItems);

const tocItems = [
  { id: "conclusion", label: "結論｜月5万円返済なら借入額の目安は返済年数で大きく変わる" },
  { id: "point", label: "「月5万円ならいくらまで借りられる？」を考えるときのポイント" },
  { id: "3years", label: "3年返済ならいくらまでが目安か" },
  { id: "5years", label: "5年返済ならいくらまでが目安か" },
  { id: "7years", label: "7年返済ならいくらまでが目安か" },
  { id: "compare", label: "3年・5年・7年返済を比較するとどう違うか" },
  { id: "choose", label: "月5万円返済ならどの返済期間を選ぶべきか" },
  { id: "reason", label: "借入額を決めるときに毎月返済額だけで判断しない方がよい理由" },
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

      
      <ArticlePageShell currentPageTitle={ARTICLE_TITLE} wide={articleUsesWideLayout("monthly-50000-how-much-can-borrow")}>
<div className="ds-card ds-card-pad">
          <h1 className="text-2xl font-semibold text-stone-900 md:text-3xl">{ARTICLE_TITLE}</h1>
          <p className="mt-4 text-base text-stone-600 leading-relaxed">
            本記事で扱うのは返済計画上の目安であり、審査上の借入可能額や与信枠を示すものではありません。一般的な固定金利・毎月返済の近似例です。
          </p>

          <ArticleStandardBlocks slug="monthly-50000-how-much-can-borrow" />

          <section id="premise" className="mt-6">
            <ArticlePagePremise
              comparisonConditions={[
                "このページでは「毎月5万円返済」を基準に借入可能額を逆算する",
                "年利15%を前提に、3年・5年・7年の返済期間で比較する",
                "一般的な固定金利・毎月返済の近似例で整理する",
              ]}
              reasonForConditions="毎月5万円という返済額を固定し、金利と返済期間の違いによって借入額の目安がどう変わるかを見るための条件設定です。実際の借入可能額は審査や商品仕様によって異なります。"
            />
          </section>

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
              毎月5万円までなら返済できそうだと考えたとき、逆に「それならいくらまで借りると現実的なのか」が気になる方は多いはずです。借入額だけを先に決めてしまうと、あとから毎月の返済負担が重く感じることがあります。
            </p>
            <p>
              この記事では、毎月5万円返済できるケースを前提に、年利15%で3年・5年・7年返済した場合、それぞれどれくらいの借入額が目安になるのかをわかりやすく整理します。最後に、
              <Link href="/simulator/cardloan" className="font-bold text-stone-900 hover:underline">返済シミュレーター</Link>
              への導線も用意しています。
            </p>

            <section id="conclusion">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">結論｜月5万円返済なら借入額の目安は返済年数で大きく変わる</h2>
              <p className="mt-3">
                結論から言うと、毎月5万円返済できるとしても、何年で返すかによって借入額の目安は大きく変わります。年利15%の近似例では、3年返済なら約144万円、5年返済なら約210万円、7年返済なら約255万円が目安です。
              </p>
              <p className="mt-3">
                ただし、返済期間を長くすると借入可能額は大きく見える一方で、総利息も大きく増えます。毎月返済額だけを見て借入額を決めると、総支払額が想像以上に膨らむ点には注意が必要です。
              </p>
            </section>

            <section id="reading-points">
              <ArticleReadingPoints
                points={[
                  {
                    label: "金利が高いほど借入可能額の目安は小さくなる",
                    body: "同じ月5万円でも、金利が高いと利息に回る割合が増えるため、元本として借りられる額は減ります。",
                  },
                  {
                    label: "返済期間を延ばすと借入額は増えるが総利息も増える",
                    body: "7年返済なら約255万円まで借りられる目安ですが、総利息は3年返済の約4.6倍になります。",
                  },
                  {
                    label: "毎月返済額だけでなく総支払額まで見ることが重要",
                    body: "「月5万円で返せる」だけで判断すると、最終的に支払う総額が想像以上に膨らむことがあります。",
                  },
                ]}
                misconceptions={[
                  "「月5万円返せるなら200万円以上借りても問題ない」と考えがちですが、返済期間によっては総利息だけで100万円を超えることもあります。",
                  "「返済期間を長くした方が有利」とは限りません。借入額の目安は増えますが、総支払額は大きくなります。",
                ]}
              />
            </section>

            <section id="point">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">「月5万円ならいくらまで借りられる？」を考えるときのポイント</h2>
              <p className="mt-3">
                この問いに対して重要なのは、「金融機関が審査上いくら貸してくれるか」と「返済計画上、毎月5万円で無理なく返せる借入額」は別だということです。
              </p>
              <p className="mt-3">
                本記事で扱うのは後者です。つまり、毎月5万円返済する前提で、金利と返済期間から逆算したときに、どの程度の借入額なら収まりやすいか、という目安を示します。
              </p>
            </section>

            <section id="3years">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">3年返済ならいくらまでが目安か</h2>
              <p className="mt-3">
                年利15%で毎月5万円返済し、3年で完済したい場合、借入額の目安は約144.2万円です。総支払額は約180万円、総利息は約35.8万円になります。
              </p>
              <p className="mt-3">
                3年返済は借入可能額の目安こそ小さめですが、その分だけ利息負担は抑えやすいのが特徴です。毎月5万円をしっかり返済に回せるなら、総支払額を小さくしやすい選択肢です。
              </p>
            </section>

            <section id="5years">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">5年返済ならいくらまでが目安か</h2>
              <p className="mt-3">
                同じく年利15%・毎月5万円返済で、5年返済を前提にすると、借入額の目安は約210.1万円です。総支払額は約300万円、総利息は約89.9万円になります。
              </p>
              <p className="mt-3">
                3年返済より毎月の負担は同じでも、返済期間を延ばすことで借入可能額の目安は増えます。ただし、その代わりに利息負担は大きくなります。借入額と総利息のバランスを取りたい人向けの考え方です。
              </p>
            </section>

            <section id="7years">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">7年返済ならいくらまでが目安か</h2>
              <p className="mt-3">
                さらに7年返済まで延ばすと、毎月5万円返済で借入額の目安は約255.3万円になります。総支払額は約420万円、総利息は約164.7万円です。
              </p>
              <p className="mt-3">
                借入額の目安は大きくなりますが、総利息もかなり増えます。毎月5万円で返せるからといって、長期返済を前提に借入額を増やしすぎると、最終的な支払総額が重くなりやすい点には注意が必要です。
              </p>
            </section>

            <section id="compare">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">3年・5年・7年返済を比較するとどう違うか</h2>
              <p className="mt-3">毎月5万円返済という条件は同じでも、返済期間が違うだけで、借入額の目安と総利息はかなり変わります。</p>
              <ul className="mt-2 list-disc pl-5 space-y-1">
                <li>3年返済: 借入額目安約1,442,000円 / 総利息約358,000円</li>
                <li>5年返済: 借入額目安約2,101,000円 / 総利息約899,000円</li>
                <li>7年返済: 借入額目安約2,553,000円 / 総利息約1,647,000円</li>
              </ul>
              <p className="mt-3">
                借入額だけを見ると7年返済が有利に見えますが、総利息は3年返済より約129万円も多くなります。借入可能額の目安だけでなく、最終的にいくら払うかまで含めて考えることが重要です。
              </p>

              <div className="mt-6 overflow-x-auto">
                <table className="w-full min-w-[420px] border-collapse text-left">
                  <thead>
                    <tr className="border-b-2 border-stone-200">
                      <th className="py-3 pr-4 font-semibold text-stone-900">返済期間</th>
                      <th className="py-3 pr-4 font-semibold text-stone-900">借入額目安</th>
                      <th className="py-3 pr-4 font-semibold text-stone-900">毎月返済額</th>
                      <th className="py-3 pr-4 font-semibold text-stone-900">総支払額</th>
                      <th className="py-3 font-semibold text-stone-900">総利息</th>
                    </tr>
                  </thead>
                  <tbody className="text-stone-700">
                    <tr className="border-b border-stone-200">
                      <td className="py-3 pr-4">3年返済</td>
                      <td className="py-3 pr-4">約1,442,000円</td>
                      <td className="py-3 pr-4">約50,000円</td>
                      <td className="py-3 pr-4">約1,800,000円</td>
                      <td className="py-3">約358,000円</td>
                    </tr>
                    <tr className="border-b border-stone-200">
                      <td className="py-3 pr-4">5年返済</td>
                      <td className="py-3 pr-4">約2,101,000円</td>
                      <td className="py-3 pr-4">約50,000円</td>
                      <td className="py-3 pr-4">約3,000,000円</td>
                      <td className="py-3">約899,000円</td>
                    </tr>
                    <tr className="border-b border-stone-200">
                      <td className="py-3 pr-4">7年返済</td>
                      <td className="py-3 pr-4">約2,553,000円</td>
                      <td className="py-3 pr-4">約50,000円</td>
                      <td className="py-3 pr-4">約4,200,000円</td>
                      <td className="py-3">約1,647,000円</td>
                    </tr>
                  </tbody>
                </table>
                <p className="mt-2 text-xs text-stone-600">
                  返済期間を延ばすと借入額の目安は増えますが、総支払額と総利息も大きくなります。
                </p>
              </div>

              <div className="mt-8 ds-subcard p-4">
                <h3 className="text-base font-semibold text-stone-900">返済期間別の借入額目安</h3>
                <div className="mt-4">
                  <PrincipalBarChart />
                </div>
              </div>

              <div className="mt-8 ds-subcard p-4">
                <h3 className="text-base font-semibold text-stone-900">総利息の比較</h3>
                <div className="mt-4">
                  <TotalInterestBarChart />
                </div>
              </div>

              <div className="mt-8 ds-subcard p-4">
                <h3 className="text-base font-semibold text-stone-900">総支払額の内訳（元本と利息）</h3>
                <div className="mt-4">
                  <TotalPaymentStackedChart />
                </div>
                <p className="mt-4 text-xs text-stone-600">
                  返済期間を延ばすと借入額の目安は増えますが、そのぶん総支払額と総利息も大きくなります。
                </p>
              </div>
            </section>

            <section id="choose">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">月5万円返済ならどの返済期間を選ぶべきか</h2>
              <p className="mt-3">
                どれが向いているかは、何を優先するかで変わります。総支払額を抑えたいなら3年返済、借入額と返済負担のバランスを取りたいなら5年返済、毎月5万円の中でより大きな借入額を確保したいなら7年返済という考え方になります。
              </p>
              <p className="mt-3">
                ただし、返済期間を長くするほど利息負担は重くなります。毎月5万円返せるからといって、単純に長期返済で借入額を増やすのが最適とは限りません。
              </p>
            </section>

            <section id="reason">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">借入額を決めるときに毎月返済額だけで判断しない方がよい理由</h2>
              <p className="mt-3">
                毎月5万円という数字だけを見ると、返済できそうに感じるかもしれません。しかし実際には、生活費、他の固定費、突発的な支出、生活防衛資金の確保なども考える必要があります。
              </p>
              <p className="mt-3">
                また、返済額が同じでも、返済期間が長いと総支払額は大きく増えます。そのため、借入額を決めるときは「毎月いくら払えるか」だけでなく、「総額でいくら払うことになるか」も見ることが重要です。
              </p>
            </section>

            <section id="simulator">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">自分の条件で確認するならシミュレーターが早い</h2>
              <p className="mt-3">
                ここまでの数値は、あくまで「毎月5万円・年利15%」という固定条件の近似例です。実際には、借入額、金利、返済期間、返済方式、追加返済の有無によって結果は変わります。
              </p>
              <p className="mt-3">
                そのため、最終的には自分の条件を入れて確認するのが一番確実です。
                <Link href="/simulator/cardloan" className="font-bold text-stone-900 hover:underline">返済シミュレーター</Link>
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
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">注意点</h2>
              <p className="mt-3">
                本記事の比較は、一般的な固定金利・毎月返済の考え方に基づく概算です。実際のローンやカードローンでは、日割り計算、約定返済日、最低返済額ルール、手数料、商品固有の返済仕様などが影響する場合があります。
              </p>
              <p className="mt-3">
                また、この記事で扱う「いくらまで借りられるか」は返済計画上の目安であり、金融機関の審査上の借入可能額や与信枠を示すものではありません。正確な条件は、契約中または検討中の金融商品の説明書や公式情報を確認してください。
              </p>
            </section>

            <section id="editor-memo">
              <ArticleEditorMemo
                purpose="「月5万円なら安全に借りられる額はいくらか」という逆算の疑問に、具体的な数字で答えることを目的にしています。"
                reasonAxis="返済期間（3年・5年・7年）を軸に、借入額の目安と総利息の違いを比較できる構成にしています。"
                memo="毎月返済額から逆算する記事の一つとして、月5万円を基準にしています。借入額だけでなく総支払額まで含めて判断する重要性を伝えています。"
              />
            </section>

            <section id="faq">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">よくある質問</h2>
              <div className="mt-4 space-y-6">
                <div>
                  <h3 className="text-base font-semibold text-stone-900">月5万円返済なら何万円くらいまで借りられますか？</h3>
                  <p className="mt-2">
                    年利15%の近似例では、3年返済で約144万円、5年返済で約210万円、7年返済で約255万円が目安です。実際の条件によって変わります。
                  </p>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-stone-900">月5万円返済なら200万円借りても大丈夫ですか？</h3>
                  <p className="mt-2">
                    年利15%の近似例では、5年返済前後を前提にすると200万円台前半が一つの目安になります。ただし、生活費や他の支出も踏まえて無理のない返済計画かを確認する必要があります。
                  </p>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-stone-900">月5万円返済で借入額を増やす方法はありますか？</h3>
                  <p className="mt-2">
                    返済期間を延ばせば借入額の目安は増えますが、そのぶん総利息も増えます。借入額だけでなく総支払額とのバランスを見ることが重要です。
                  </p>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-stone-900">月5万円返済で安全に借りられる目安はどのくらいですか？</h3>
                  <p className="mt-2">
                    一概には言えませんが、生活費や他の固定費を差し引いたうえで無理なく返せる範囲が前提です。年利15%の場合、3年返済の約144万円は比較的総利息を抑えやすい目安になります。
                  </p>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-stone-900">返済期間を長くすると、借入額以外に何が変わりますか？</h3>
                  <p className="mt-2">
                    返済期間が長くなると、総利息が大幅に増えます。たとえば3年返済と7年返済では、借入額の目安は約111万円の差ですが、総利息は約129万円も差が出ます。完済までに払う総額が大きく変わる点に注意が必要です。
                  </p>
                </div>
              </div>
            </section>

            <section id="summary">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">まとめ</h2>
              <p className="mt-3">
                毎月5万円返済できる場合でも、何年で返すかによって借入額の目安は大きく変わります。年利15%の近似例では、3年で約144万円、5年で約210万円、7年で約255万円が目安です。
              </p>
              <p className="mt-3">
                ただし、返済期間を長くすると借入額の目安は増える一方で、総利息も大きく増えます。借入額を考えるときは、毎月返済額だけでなく、総支払額まで含めて判断することが大切です。自分の条件で試算したい場合は、
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

          <ArticleFooter articleSlug="monthly-50000-how-much-can-borrow" />
        </div>
      </ArticlePageShell>
    </>
  );
}
