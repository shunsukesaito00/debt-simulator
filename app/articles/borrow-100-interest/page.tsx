import type { Metadata } from "next";
import Link from "next/link";
import { ArticleFooter } from "@/app/components/ArticleFooter";
import { ArticlePagePremise, ArticleReadingPoints, ArticleEditorMemo } from "@/app/components/article";
import { getArticleBreadcrumbJsonLd, getArticleFaqJsonLd } from "@/lib/article-structured-data";
import { ARTICLE_AUTHOR_JSON_LD, ARTICLE_PUBLISHER_JSON_LD } from "@/lib/site-author";
import { ArticlePageShell } from "@/app/components/ArticlePageShell";
import { articleUsesWideLayout } from "@/lib/article-layout";
import { MonthlyAndInterestBarCharts, TotalPaymentStackedChart } from "./InterestCharts";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://debt-simulator-quzc.vercel.app";
const ARTICLE_URL = `${BASE}/articles/borrow-100-interest`;
const ARTICLE_TITLE = "借金100万円の利息はいくら？年利15%での返済額をシミュレーション";

export const metadata: Metadata = {
  title: ARTICLE_TITLE,
  description:
    "借金100万円を年利15%で借りた場合の利息・月々の返済額・総支払額を、返済期間別にわかりやすく解説します。実際の条件は返済シミュレーターで確認できます。",
  alternates: { canonical: ARTICLE_URL },
  openGraph: {
    title: ARTICLE_TITLE,
    description:
      "借金100万円を年利15%で借りた場合の利息・月々の返済額・総支払額を、返済期間別にわかりやすく解説します。実際の条件は返済シミュレーターで確認できます。",
    url: ARTICLE_URL,
    type: "article",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: ARTICLE_TITLE,
  description:
    "借金100万円を年利15%で借りた場合の利息・月々の返済額・総支払額を、返済期間別にわかりやすく解説します。実際の条件は返済シミュレーターで確認できます。",
  url: ARTICLE_URL,
  datePublished: "2025-03-08",
  dateModified: "2025-03-08",
  author: ARTICLE_AUTHOR_JSON_LD,
  publisher: ARTICLE_PUBLISHER_JSON_LD,
};

const faqItems = [
  {
    question: "借金100万円の利息は毎月いくらですか？",
    answer:
      "毎月の利息額は残高に応じて減っていくため一定ではありません。ただし、年利15%で借りる場合、借入初期は利息負担が比較的大きく、返済が進むにつれて徐々に減っていきます。",
  },
  {
    question: "借金100万円を返すには毎月いくら必要ですか？",
    answer:
      "年利15%で3年返済なら毎月約34,665円、5年返済なら約23,790円が目安です。実際には商品条件により変動します。",
  },
  {
    question: "借金100万円を早く返すコツはありますか？",
    answer:
      "返済期間を短くする、追加返済を行う、金利条件を見直す、の3つが基本です。毎月の返済額を少し上げるだけでも総利息は下がりやすくなります。",
  },
  {
    question: "年利10%と年利15%では利息にどれくらい差が出ますか？",
    answer:
      "借金100万円を5年返済する場合、年利15%なら総利息は約42.7万円ですが、年利10%なら約27.5万円程度が目安です。金利が5%違うだけで総利息に約15万円の差が出ます。",
  },
  {
    question: "借金100万円の総利息を減らすにはどうすればいいですか？",
    answer:
      "最も効果的なのは返済期間を短くすることです。3年返済なら5年返済より総利息が約18万円少なくなります。余裕がある月に追加返済するのも有効です。",
  },
];

const breadcrumbJsonLd = getArticleBreadcrumbJsonLd(ARTICLE_URL, ARTICLE_TITLE);
const faqJsonLd = getArticleFaqJsonLd(faqItems);

const tocItems = [
  { id: "conclusion", label: "結論｜借金100万円を年利15%で借りると利息はどれくらいか" },
  { id: "how-interest", label: "そもそも利息はどう計算されるのか" },
  { id: "3years", label: "借金100万円を3年で返す場合" },
  { id: "5years", label: "借金100万円を5年で返す場合" },
  { id: "compare", label: "3年返済と5年返済の比較" },
  { id: "balance", label: "どちらを選ぶべきか｜月々の負担と総支払額のバランス" },
  { id: "reduce-interest", label: "利息を減らすための現実的な方法" },
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

      <ArticlePageShell currentPageTitle={ARTICLE_TITLE} wide={articleUsesWideLayout("borrow-100-interest")}>
        <div className="ds-card ds-card-pad">
          <h1 className="ds-page-serif text-2xl font-bold text-stone-900 md:text-3xl">{ARTICLE_TITLE}</h1>

          <p className="mt-4 text-sm text-stone-600 leading-relaxed">
            本記事の計算は、一般的な元利均等返済の近似例です。実際の返済条件は契約内容により異なります。
          </p>

          <ArticlePagePremise
            comparisonConditions={[
              "借入額100万円",
              "年利15%（固定）",
              "元利均等返済",
              "3年返済（36回）と5年返済（60回）で比較",
            ]}
            reasonForConditions="年利15%前後はカードローン・フリーローンでよく見かける水準です。100万円は借入額の目安として検索されやすいため、この条件で比較しています。"
          />

          {/* 簡易目次 */}
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
            {/* 導入 */}
            <p>
              私も気になって、年利と返済期間で“総利息がどれだけ変わるか”を確かめました。特に年利15%前後は消費者金融やカードローンでよく見かける水準なので、返済期間によって総支払額がどこまで増えるのかを把握しておくのは大事だと思っています。
            </p>
            <p>
              このページでは、私が確かめたくなった借金100万円を年利15%で借りたケースを例に、月々の返済額、総支払額、総利息の目安を整理します。実際の条件で確認したい方は、
              <Link href="/simulator/cardloan" className="font-bold text-stone-900 hover:underline">借入返済シミュレーター</Link>
              で試算できます。
            </p>

            <section id="conclusion">
              <h2 className="text-lg font-black text-stone-900 md:text-xl">結論｜借金100万円を年利15%で借りると利息はどれくらいか</h2>
              <p className="mt-3">
                結論から言うと、借金100万円を年利15%で借りた場合、返済期間が3年なら総利息は約24.8万円、5年なら約42.7万円が目安です。返済期間が長くなるほど毎月の負担は軽くなりますが、その分だけ利息総額は大きくなります。
              </p>
              <p className="mt-3">
                だから、目線を「月々（毎月いくらまでか）」か「総額（支払総額をいくらに抑えたいか）」に切り替えて選んでください。毎月の資金繰りを優先するのか、支払総額を減らしたいのかで、適切な返済期間は変わります。
              </p>
            </section>

            <section id="how-interest">
              <h2 className="text-lg font-black text-stone-900 md:text-xl">そもそも利息はどう計算されるのか</h2>
              <p className="mt-3">
                借入の利息は、一般に「借入残高 × 金利 ÷ 365 × 経過日数」のような考え方で計算されます。実際の商品では日割り計算や最低返済額ルール、手数料、初回返済日などの条件が加わることがあります。
              </p>
              <p className="mt-3">
                ただし、返済計画を考える段階では、まず「年利」「返済期間」「毎月返済額」の関係をざっくり把握することが重要です。本記事では、わかりやすさを優先し、100万円を年利15%で借りて毎月返済していく一般的なケースを例に説明します。
              </p>
            </section>

            <section id="3years">
              <h2 className="text-lg font-black text-stone-900 md:text-xl">借金100万円を3年で返す場合</h2>
              <p className="mt-3">
                借金100万円を年利15%で3年（36回）返済する場合、毎月の返済額は約34,665円、総支払額は約124万8千円、総利息は約24万8千円が目安です。
              </p>
              <p className="mt-3">
                3年返済の特徴は、5年返済と比べて毎月の負担はやや重い一方、総利息をかなり抑えられることです。毎月の返済余力があるなら、返済期間を短くした方が支払総額は小さくなります。
              </p>
            </section>

            <section id="5years">
              <h2 className="text-lg font-black text-stone-900 md:text-xl">借金100万円を5年で返す場合</h2>
              <p className="mt-3">
                借金100万円を年利15%で5年（60回）返済する場合、毎月の返済額は約23,790円、総支払額は約142万7千円、総利息は約42万7千円が目安です。
              </p>
              <p className="mt-3">
                3年返済と比べると、毎月の返済額は約1.1万円ほど軽くなります。しかし、総利息は約18万円増える計算です。月々の返済を楽にすると、そのぶん利息に長く苦しむ構造になります。
              </p>
            </section>

            <section id="compare">
              <h2 className="text-lg font-black text-stone-900 md:text-xl">3年返済と5年返済の比較</h2>
              <p className="mt-3">
                同じ100万円を借りても、返済期間が違うだけで結果は大きく変わります。比較すると次の通りです。
              </p>
              <ul className="mt-2 list-disc pl-5 space-y-1">
                <li>3年返済: 毎月約34,665円 / 総利息約247,952円</li>
                <li>5年返済: 毎月約23,790円 / 総利息約427,396円</li>
              </ul>
              <p className="mt-3">
                毎月の差額は約10,875円です。一方で、総利息の差額は約179,444円あります。この差を見ると、返済期間を延ばすコストは想像以上に大きいことがわかります。
              </p>

              {/* 比較表 */}
              <div className="mt-6 overflow-x-auto">
                <table className="w-full min-w-[320px] border-collapse text-left">
                  <thead>
                    <tr className="border-b-2 border-stone-200">
                      <th className="py-3 pr-4 font-black text-stone-900">返済期間</th>
                      <th className="py-3 pr-4 font-black text-stone-900">毎月返済額</th>
                      <th className="py-3 pr-4 font-black text-stone-900">総支払額</th>
                      <th className="py-3 font-black text-stone-900">総利息</th>
                    </tr>
                  </thead>
                  <tbody className="text-stone-700">
                    <tr className="border-b border-stone-200">
                      <td className="py-3 pr-4">3年返済</td>
                      <td className="py-3 pr-4">約34,665円</td>
                      <td className="py-3 pr-4">約1,247,952円</td>
                      <td className="py-3">約247,952円</td>
                    </tr>
                    <tr className="border-b border-stone-200">
                      <td className="py-3 pr-4">5年返済</td>
                      <td className="py-3 pr-4">約23,790円</td>
                      <td className="py-3 pr-4">約1,427,396円</td>
                      <td className="py-3">約427,396円</td>
                    </tr>
                  </tbody>
                </table>
                <p className="mt-2 text-xs text-stone-600">
                  月々の負担は5年返済の方が軽い一方、総利息は3年返済の方が約18万円少なくなります。
                </p>
              </div>

              {/* グラフ1: 毎月返済額・総利息の棒グラフ */}
              <div className="mt-8 ds-subcard p-4">
                <h3 className="text-base font-black text-stone-900">返済期間別の比較</h3>
                <div className="mt-4">
                  <MonthlyAndInterestBarCharts />
                </div>
                <p className="mt-4 text-xs text-stone-600">
                  毎月の返済額は5年返済の方が低い一方、総利息は5年返済の方が大きくなります。
                </p>
              </div>

              {/* グラフ2: 総支払額の内訳 */}
              <div className="mt-8 ds-subcard p-4">
                <h3 className="text-base font-black text-stone-900">総支払額の内訳（元本と利息）</h3>
                <div className="mt-4">
                  <TotalPaymentStackedChart />
                </div>
                <p className="mt-4 text-xs text-stone-600">
                  5年返済は毎月の負担が軽い一方で、利息の占める割合が大きくなります。
                </p>
              </div>

              <ArticleReadingPoints
                points={[
                  {
                    label: "私も最初そう思ってた：総利息の差と毎月の差",
                    body: "総利息の差（3年約24.8万円 vs 5年約42.7万円、差額約18万円）と、毎月返済額の差（約34,665円 vs 約23,790円）。月々を軽くすると総支払額は増えるトレードオフを押さえておく。",
                  },
                  {
                    label: "比較表・グラフの見方",
                    body: "表は「返済期間」「毎月返済額」「総支払額」「総利息」の4列。棒グラフは毎月返済額と総利息を並べて、期間延長で利息がどう増えるかを比較。積み上げグラフは総支払額のうち元本と利息の内訳。",
                  },
                ]}
                misconceptions={[
                  "私も最初そう思ってた。「毎月の返済額が安い方が得」と。5年返済は月々は軽いですが、総支払額・総利息は3年より大きくなります。",
                  "「100万円なら利息は少ない」と思いがち。年利15%では5年で約42.7万円の利息がかかるため、借入額の4割以上になる。",
                ]}
              />
            </section>

            <section id="balance">
              <h2 className="text-lg font-black text-stone-900 md:text-xl">どちらを選ぶべきか｜月々の負担と総支払額のバランス</h2>
              <p className="mt-3">
                どちらが正解かは、家計の余力によって変わります。毎月3万4千円台でも無理なく返済できるなら、3年返済の方が利息負担を抑えやすいです。逆に、月2万円台でないと生活が苦しい場合は、5年返済の方が現実的です。
              </p>
              <p className="mt-3">
                重要なのは、返済額を低く設定しすぎて長期化しないことです。生活防衛資金を残しつつ、無理のない範囲で返済期間を短くするのが基本戦略です。
              </p>
            </section>

            <section id="reduce-interest">
              <h2 className="text-lg font-black text-stone-900 md:text-xl">利息を減らすための現実的な方法</h2>
              <p className="mt-3">利息を減らしたいなら、次の3つが有効です。</p>
              <div className="mt-4 space-y-4">
                <div>
                  <h3 className="text-base font-black text-stone-900">返済期間を短くする</h3>
                  <p className="mt-1">最も効果が大きい方法です。毎月の返済額を少し上げるだけでも、総利息は大きく下がることがあります。</p>
                </div>
                <div>
                  <h3 className="text-base font-black text-stone-900">追加返済・繰上返済を活用する</h3>
                  <p className="mt-1">ボーナス月や臨時収入が入ったタイミングで追加返済ができれば、元本の減りが早くなり、その後の利息も軽くなります。</p>
                </div>
                <div>
                  <h3 className="text-base font-black text-stone-900">金利条件を見直す</h3>
                  <p className="mt-1">借り換えや条件見直しが可能なら、年利が下がるだけで総支払額は変わります。特に借入額が大きい場合は影響が大きいです。</p>
                </div>
              </div>
            </section>

            <section id="simulator">
              <h2 className="text-lg font-black text-stone-900 md:text-xl">自分の条件で確認するならシミュレーターが早い</h2>
              <p className="mt-3">
                ここまでの数値は、あくまで「100万円・年利15%」という固定条件で見た目安です。実際には、借入額、金利、返済方式、返済開始時期、追加返済の有無によって結果は変わります。
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
              <h2 className="text-lg font-black text-stone-900 md:text-xl">注意点</h2>
              <p className="mt-3">
                本記事の試算は、一般的な固定金利・毎月返済の考え方に基づく概算です。実際のカードローンやローン商品では、初回返済日、日割り計算、遅延損害金、最低返済額ルール、手数料などが影響する場合があります。
              </p>
              <p className="mt-3">
                正確な返済条件は、必ず契約中または検討中の金融商品の説明書や公式サイトで確認してください。
              </p>
            </section>

            <section id="faq">
              <h2 className="text-lg font-black text-stone-900 md:text-xl">よくある質問</h2>
              <div className="mt-4 space-y-6">
                <div>
                  <h3 className="text-base font-black text-stone-900">借金100万円の利息は毎月いくらですか？</h3>
                  <p className="mt-2">
                    毎月の利息額は残高に応じて減っていくため一定ではありません。ただし、年利15%で借りる場合、借入初期は利息負担が比較的大きく、返済が進むにつれて徐々に減っていきます。
                  </p>
                </div>
                <div>
                  <h3 className="text-base font-black text-stone-900">借金100万円を返すには毎月いくら必要ですか？</h3>
                  <p className="mt-2">
                    年利15%で3年返済なら毎月約34,665円、5年返済なら約23,790円が目安です。実際には商品条件により変動します。
                  </p>
                </div>
                <div>
                  <h3 className="text-base font-black text-stone-900">借金100万円を早く返すコツはありますか？</h3>
                  <p className="mt-2">
                    返済期間を短くする、追加返済を行う、金利条件を見直す、の3つが基本です。毎月の返済額を少し上げるだけでも総利息は下がりやすくなります。
                  </p>
                </div>
                <div>
                  <h3 className="text-base font-black text-stone-900">年利10%と年利15%では利息にどれくらい差が出ますか？</h3>
                  <p className="mt-2">
                    借金100万円を5年返済する場合、年利15%なら総利息は約42.7万円ですが、年利10%なら約27.5万円程度が目安です。金利が5%違うだけで総利息に約15万円の差が出ます。
                  </p>
                </div>
                <div>
                  <h3 className="text-base font-black text-stone-900">借金100万円の総利息を減らすにはどうすればいいですか？</h3>
                  <p className="mt-2">
                    最も効果的なのは返済期間を短くすることです。3年返済なら5年返済より総利息が約18万円少なくなります。余裕がある月に追加返済するのも有効です。
                  </p>
                </div>
              </div>
            </section>

            <section id="summary">
              <h2 className="text-lg font-black text-stone-900 md:text-xl">まとめ</h2>
              <p className="mt-3">
                借金100万円を年利15%で借りた場合、3年返済なら総利息は約24.8万円、5年返済なら約42.7万円が目安です。毎月の返済額を軽くすると、そのぶん総支払額は大きくなります。
              </p>
              <p className="mt-3">
                返済期間の選び方で迷う場合は、感覚ではなく数値で判断することが大切です。自分の条件で試算したい場合は、
                <Link href="/simulator/cardloan" className="font-bold text-stone-900 hover:underline">借入返済シミュレーター</Link>
                で確認できます。
              </p>
            </section>
          </div>

          <ArticleEditorMemo
            purpose="私が3年と5年で迷ったときに、判断しやすいように“月々”と“総額”のどちらを優先するかが見える順にしました。"
            reasonAxis="借入100万円・年利15%は迷いやすい前提なので、元利均等に絞って返済期間の違いが比較しやすいようにしています。"
            memo="条件を自分に近づけて確かめられるように、シミュレーターで金利・期間・追加返済を変えて試せることを本文とフッターで案内しています。"
          />

          <ArticleFooter articleSlug="borrow-100-interest" />
        </div>
      </ArticlePageShell>
    </>
  );
}
