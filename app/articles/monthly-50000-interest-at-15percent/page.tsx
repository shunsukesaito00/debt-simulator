import type { Metadata } from "next";
import Link from "next/link";
import { ArticleFooter } from "@/app/components/ArticleFooter";
import { ArticlePagePremise, ArticleReadingPoints, ArticleEditorMemo } from "@/app/components/article";
import { getArticleBreadcrumbJsonLd, getArticleFaqJsonLd } from "@/lib/article-structured-data";
import { ARTICLE_AUTHOR_JSON_LD, ARTICLE_PUBLISHER_JSON_LD } from "@/lib/site-author";
import { ArticlePageShell } from "@/app/components/ArticlePageShell";
import { articleUsesWideLayout } from "@/lib/article-layout";

import {
  TotalInterestBarChart,
  PayoffMonthsBarChart,
  TotalPaymentStackedChart,
} from "./Monthly50kInterestCharts";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://debt-simulator-quzc.vercel.app";
const ARTICLE_URL = `${BASE}/articles/monthly-50000-interest-at-15percent`;
const ARTICLE_TITLE = "借金返済が月5万円・金利15%なら総利息はいくら？借入額別に比較";

export const metadata: Metadata = {
  title: ARTICLE_TITLE,
  description:
    "毎月5万円返済・年利15%を前提に、借入額100万円・200万円・300万円で総利息と完済期間がどう変わるかを表とグラフでわかりやすく解説します。",
  alternates: { canonical: ARTICLE_URL },
  openGraph: {
    title: ARTICLE_TITLE,
    description:
      "毎月5万円返済・年利15%を前提に、借入額100万円・200万円・300万円で総利息と完済期間がどう変わるかを表とグラフでわかりやすく解説します。",
    url: ARTICLE_URL,
    type: "article",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: ARTICLE_TITLE,
  description:
    "毎月5万円返済・年利15%を前提に、借入額100万円・200万円・300万円で総利息と完済期間がどう変わるかを表とグラフでわかりやすく解説します。",
  url: ARTICLE_URL,
  datePublished: "2025-03-08",
  dateModified: "2025-03-08",
  author: ARTICLE_AUTHOR_JSON_LD,
  publisher: ARTICLE_PUBLISHER_JSON_LD,
};

const faqItems = [
  {
    question: "月5万円返済・金利15%なら100万円の利息はいくらですか？",
    answer: "近似例では、完済まで約24か月、総利息は約157,947円です。条件によって変わります。",
  },
  {
    question: "月5万円返済で200万円借りると総利息はいくらですか？",
    answer: "近似例では、完済まで約56か月、総利息は約789,932円です。借入額が増えると利息も大きく増えます。",
  },
  {
    question: "月5万円返済で300万円借りるのは危険ですか？",
    answer:
      "危険と断定はできませんが、近似例では完済まで約112か月、総利息は約257.9万円となり、負担はかなり重くなります。毎月返済額だけでなく、完済時期と総支払額まで見るべきです。",
  },
  {
    question: "月5万円返済の場合、元本と利息の内訳はどう変わりますか？",
    answer:
      "返済初期は利息の占める割合が大きく、元本がなかなか減りません。返済が進むにつれて利息分が減り、元本への充当割合が増えていきます。借入額が大きいほどこの初期の利息割合が高い期間が長く続きます。",
  },
  {
    question: "金利が10%なら、月5万円返済の総利息はどれくらい変わりますか？",
    answer:
      "金利が下がると総利息はかなり減ります。たとえば借入200万円・月5万円返済の場合、年利15%では総利息が約79万円ですが、年利10%なら総利息は大幅に軽くなります。金利の違いは長期返済ほど大きな差になります。",
  },
];

const breadcrumbJsonLd = getArticleBreadcrumbJsonLd(ARTICLE_URL, ARTICLE_TITLE);
const faqJsonLd = getArticleFaqJsonLd(faqItems);

const tocItems = [
  { id: "conclusion", label: "結論｜月5万円・金利15%でも借入額が増えると総利息は急増する" },
  { id: "why", label: "なぜ毎月返済額が同じでも総利息が大きく変わるのか" },
  { id: "100man", label: "借入100万円なら総利息はいくらか" },
  { id: "200man", label: "借入200万円なら総利息はいくらか" },
  { id: "300man", label: "借入300万円なら総利息はいくらか" },
  { id: "compare", label: "100万円・200万円・300万円を比較するとどう違うか" },
  { id: "not-safe", label: "月5万円返済なら安心とは言い切れない理由" },
  { id: "point", label: "どの借入額が現実的かを考えるポイント" },
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

      
      <ArticlePageShell currentPageTitle={ARTICLE_TITLE} wide={articleUsesWideLayout("monthly-50000-interest-at-15percent")}>
<div className="ds-card ds-card-pad">
          <h1 className="text-2xl font-black text-stone-900 md:text-3xl">{ARTICLE_TITLE}</h1>
          <p className="mt-4 text-sm text-stone-600 leading-relaxed">
            本記事の比較は、一般的な固定金利・毎月返済の近似例です。実際の商品では条件により異なる場合があります。
          </p>

          <ArticlePagePremise
            comparisonConditions={[
              "毎月返済額5万円（固定）",
              "年利15%",
              "定額元利の考え方",
              "借入額100万円・200万円・300万円で比較",
            ]}
            reasonForConditions="「月5万なら返せる」という前提で、借入額を変えたときの総利息・完済期間の差を見たい読者向け。同じ月5万でも借入額が増えると負担が急増するため、100・200・300万の3段階で比較している。"
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
              毎月5万円までなら返済できそうだと考えたとき、気になるのは「その条件で借りた場合、総利息はいくらになるのか」という点です。毎月返済額が同じでも、借入額が増えると完済までの期間が長くなり、そのぶん利息負担も大きくなります。
            </p>
            <p>
              この記事では、毎月5万円返済・年利15%という条件を固定して、借入額100万円・200万円・300万円で総利息と完済期間がどう変わるかを比較します。最後に、
              <Link href="/simulator/cardloan" className="font-bold text-stone-900 hover:underline">返済シミュレーター</Link>
              への導線も用意しています。
            </p>

            <section id="conclusion">
              <h2 className="text-lg font-black text-stone-900 md:text-xl">結論｜月5万円・金利15%でも借入額が増えると総利息は急増する</h2>
              <p className="mt-3">
                結論から言うと、毎月5万円返済・年利15%という同じ条件でも、借入額が増えると総利息は大きく増えます。100万円なら総利息は約15.8万円ですが、200万円では約79.0万円、300万円では約257.9万円が目安です。
              </p>
              <p className="mt-3">
                つまり、毎月5万円払えるからといって、借入額を増やしても安心とは限りません。借入額が大きくなるほど完済までの期間も長くなり、総支払額の重さが目立つようになります。
              </p>
            </section>

            <section id="why">
              <h2 className="text-lg font-black text-stone-900 md:text-xl">なぜ毎月返済額が同じでも総利息が大きく変わるのか</h2>
              <p className="mt-3">
                毎月返済額が同じでも、借入額が大きくなると元本の残高が長く残りやすくなります。残高が大きい期間が長いほど、その間に発生する利息も増えます。
              </p>
              <p className="mt-3">
                そのため、同じ月5万円返済でも、借入100万円と借入300万円では結果が大きく違います。毎月返済額だけでなく、完済まで何か月かかるかを見ることが重要です。
              </p>
            </section>

            <section id="100man">
              <h2 className="text-lg font-black text-stone-900 md:text-xl">借入100万円なら総利息はいくらか</h2>
              <p className="mt-3">
                借入100万円を年利15%で借りて、毎月5万円ずつ返済する場合、完済までの目安は24か月、総支払額は約115.8万円、総利息は約15.8万円です。
              </p>
              <p className="mt-3">
                約2年で完済できるため、総利息は比較的抑えやすい水準です。毎月5万円返済という条件なら、100万円は現実的に返しやすい金額帯だと考えやすいです。
              </p>
            </section>

            <section id="200man">
              <h2 className="text-lg font-black text-stone-900 md:text-xl">借入200万円なら総利息はいくらか</h2>
              <p className="mt-3">
                借入200万円を年利15%で借りて、毎月5万円ずつ返済する場合、完済までの目安は56か月、総支払額は約279.0万円、総利息は約79.0万円です。
              </p>
              <p className="mt-3">
                100万円のケースと比べると、借入額は2倍ですが、総利息は約5倍に近い水準まで増えます。完済まで約4年8か月かかるため、利息負担の重さがかなり目立ちます。
              </p>
            </section>

            <section id="300man">
              <h2 className="text-lg font-black text-stone-900 md:text-xl">借入300万円なら総利息はいくらか</h2>
              <p className="mt-3">
                借入300万円を年利15%で借りて、毎月5万円ずつ返済する場合、完済までの目安は112か月、総支払額は約558.0万円、総利息は約257.9万円です。
              </p>
              <p className="mt-3">
                毎月5万円返済でも、完済まで約9年4か月かかる計算です。借入額が大きくなると、返済期間が長期化し、そのぶん利息負担が一気に重くなります。
              </p>
            </section>

            <section id="compare">
              <h2 className="text-lg font-black text-stone-900 md:text-xl">100万円・200万円・300万円を比較するとどう違うか</h2>
              <p className="mt-3">同じ毎月5万円返済・年利15%でも、借入額の違いで結果はかなり変わります。</p>
              <ul className="mt-2 list-disc pl-5 space-y-1">
                <li>100万円: 約24か月 / 総利息約157,947円</li>
                <li>200万円: 約56か月 / 総利息約789,932円</li>
                <li>300万円: 約112か月 / 総利息約2,579,838円</li>
              </ul>
              <p className="mt-3">
                借入額が増えると、単純に元本が増えるだけでなく、完済までの期間が延びることで利息がさらに膨らみます。特に300万円では、利息だけで250万円超になる点は見落としにくいポイントです。
              </p>

              <div className="mt-6 overflow-x-auto">
                <table className="w-full min-w-[480px] border-collapse text-left">
                  <thead>
                    <tr className="border-b-2 border-stone-200">
                      <th className="py-3 pr-4 font-black text-stone-900">借入額</th>
                      <th className="py-3 pr-4 font-black text-stone-900">毎月返済額</th>
                      <th className="py-3 pr-4 font-black text-stone-900">完済目安</th>
                      <th className="py-3 pr-4 font-black text-stone-900">総支払額</th>
                      <th className="py-3 font-black text-stone-900">総利息</th>
                    </tr>
                  </thead>
                  <tbody className="text-stone-700">
                    <tr className="border-b border-stone-200">
                      <td className="py-3 pr-4">約1,000,000円</td>
                      <td className="py-3 pr-4">約50,000円</td>
                      <td className="py-3 pr-4">約24か月</td>
                      <td className="py-3 pr-4">約1,157,947円</td>
                      <td className="py-3">約157,947円</td>
                    </tr>
                    <tr className="border-b border-stone-200">
                      <td className="py-3 pr-4">約2,000,000円</td>
                      <td className="py-3 pr-4">約50,000円</td>
                      <td className="py-3 pr-4">約56か月</td>
                      <td className="py-3 pr-4">約2,789,932円</td>
                      <td className="py-3">約789,932円</td>
                    </tr>
                    <tr className="border-b border-stone-200">
                      <td className="py-3 pr-4">約3,000,000円</td>
                      <td className="py-3 pr-4">約50,000円</td>
                      <td className="py-3 pr-4">約112か月</td>
                      <td className="py-3 pr-4">約5,579,838円</td>
                      <td className="py-3">約2,579,838円</td>
                    </tr>
                  </tbody>
                </table>
                <p className="mt-2 text-xs text-stone-600">
                  100万円は約2年、200万円は約4年8か月、300万円は約9年4か月で完済する目安です。借入額が増えるほど総利息と完済期間は大きく伸びます。
                </p>
              </div>

              <div className="mt-8 ds-subcard p-4">
                <h3 className="text-base font-black text-stone-900">借入額別の総利息</h3>
                <div className="mt-4">
                  <TotalInterestBarChart />
                </div>
              </div>

              <div className="mt-8 ds-subcard p-4">
                <h3 className="text-base font-black text-stone-900">借入額別の完済期間</h3>
                <div className="mt-4">
                  <PayoffMonthsBarChart />
                </div>
              </div>

              <div className="mt-8 ds-subcard p-4">
                <h3 className="text-base font-black text-stone-900">総支払額の内訳（元本と利息）</h3>
                <div className="mt-4">
                  <TotalPaymentStackedChart />
                </div>
                <p className="mt-4 text-xs text-stone-600">
                  毎月返済額が同じでも、借入額が増えると完済までの期間が延び、そのぶん利息負担も急増します。
                </p>
              </div>

              <ArticleReadingPoints
                points={[
                  {
                    label: "この記事で最も見てほしい数字",
                    body: "総利息の差（100万約15.8万・200万約79万・300万約257.9万）と完済目安（24か月・56か月・112か月）。同じ月5万でも借入額が増えると利息が非線形に増える。",
                  },
                  {
                    label: "比較表・グラフの見方",
                    body: "表は借入額・毎月返済額・完済目安・総支払額・総利息の5列。棒グラフは総利息と完済期間を借入額別に比較。積み上げは総支払額の元本と利息の内訳。",
                  },
                ]}
                misconceptions={[
                  "「月5万払えるから借入額を増やしても大丈夫」と思いがち。300万では総利息が約258万円になり、完済まで約9年かかる。",
                  "借入額が2倍・3倍になっても総利息は比例しない。期間が延びる分、利息が膨らむ。",
                ]}
              />
            </section>

            <section id="not-safe">
              <h2 className="text-lg font-black text-stone-900 md:text-xl">月5万円返済なら安心とは言い切れない理由</h2>
              <p className="mt-3">
                毎月5万円返済できるという条件だけを見ると、返済可能に感じるかもしれません。しかし、借入額が大きいと返済期間が長くなり、総支払額はかなり重くなります。
              </p>
              <p className="mt-3">
                特に300万円のようなケースでは、毎月の返済額は一定でも、返済が10年近く続く計算になります。月額だけでなく、返済総額と完済時期まで確認することが重要です。
              </p>
            </section>

            <section id="point">
              <h2 className="text-lg font-black text-stone-900 md:text-xl">どの借入額が現実的かを考えるポイント</h2>
              <p className="mt-3">
                どの借入額が現実的かは、毎月5万円返済できるかどうかだけでは決まりません。生活費、他の固定費、緊急時の備え、家計の余力なども考える必要があります。
              </p>
              <p className="mt-3">
                一般的には、総利息と完済期間まで含めて無理がないかを見ることが大切です。借入額を増やせるからといって、それが最適とは限りません。
              </p>
            </section>

            <section id="simulator">
              <h2 className="text-lg font-black text-stone-900 md:text-xl">自分の条件で確認するならシミュレーターが早い</h2>
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
              <h2 className="text-lg font-black text-stone-900 md:text-xl">注意点</h2>
              <p className="mt-3">
                本記事の比較は、一般的な固定金利・毎月返済の考え方に基づく概算です。実際のローンやカードローンでは、日割り計算、約定返済日、最低返済額ルール、手数料、商品固有の返済仕様などが影響する場合があります。
              </p>
              <p className="mt-3">
                また、この記事で扱う内容は返済計画上の比較であり、金融機関の審査上の借入可能額や与信枠を示すものではありません。正確な条件は、契約中または検討中の金融商品の説明書や公式情報を確認してください。
              </p>
            </section>

            <section id="faq">
              <h2 className="text-lg font-black text-stone-900 md:text-xl">よくある質問</h2>
              <div className="mt-4 space-y-6">
                <div>
                  <h3 className="text-base font-black text-stone-900">月5万円返済・金利15%なら100万円の利息はいくらですか？</h3>
                  <p className="mt-2">
                    近似例では、完済まで約24か月、総利息は約157,947円です。条件によって変わります。
                  </p>
                </div>
                <div>
                  <h3 className="text-base font-black text-stone-900">月5万円返済で200万円借りると総利息はいくらですか？</h3>
                  <p className="mt-2">
                    近似例では、完済まで約56か月、総利息は約789,932円です。借入額が増えると利息も大きく増えます。
                  </p>
                </div>
                <div>
                  <h3 className="text-base font-black text-stone-900">月5万円返済で300万円借りるのは危険ですか？</h3>
                  <p className="mt-2">
                    危険と断定はできませんが、近似例では完済まで約112か月、総利息は約257.9万円となり、負担はかなり重くなります。毎月返済額だけでなく、完済時期と総支払額まで見るべきです。
                  </p>
                </div>
                <div>
                  <h3 className="text-base font-black text-stone-900">月5万円返済の場合、元本と利息の内訳はどう変わりますか？</h3>
                  <p className="mt-2">
                    返済初期は利息の占める割合が大きく、元本がなかなか減りません。返済が進むにつれて利息分が減り、元本への充当割合が増えていきます。借入額が大きいほどこの初期の利息割合が高い期間が長く続きます。
                  </p>
                </div>
                <div>
                  <h3 className="text-base font-black text-stone-900">金利が10%なら、月5万円返済の総利息はどれくらい変わりますか？</h3>
                  <p className="mt-2">
                    金利が下がると総利息はかなり減ります。たとえば借入200万円・月5万円返済の場合、年利15%では総利息が約79万円ですが、年利10%なら総利息は大幅に軽くなります。金利の違いは長期返済ほど大きな差になります。
                  </p>
                </div>
              </div>
            </section>

            <section id="summary">
              <h2 className="text-lg font-black text-stone-900 md:text-xl">まとめ</h2>
              <p className="mt-3">
                毎月5万円返済・年利15%という同じ条件でも、借入額が100万円・200万円・300万円と増えるにつれて、完済期間と総利息は大きく増えます。特に300万円では、利息負担がかなり重くなります。
              </p>
              <p className="mt-3">
                毎月返済額だけで借入額を判断すると、総支払額の重さを見落としやすくなります。自分の条件で試算したい場合は、
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

          <ArticleEditorMemo
            purpose="月5万円返済できる前提で、借入額をどこまでにするかの判断材料。借入額が増えると総利息・完済期間が急増するので、月々の額だけでなく総額を見て決めてもらう。"
            reasonAxis="「月5万なら返せる」はよくある前提。同じ返済額でも借入額で結果が大きく変わるため、100・200・300万の3段階で比較。定額元利の考え方で試算。"
            memo="シミュレーターで定額元利・毎月返済額を変えて自分の条件を試せることを案内。"
          />

          <ArticleFooter articleSlug="monthly-50000-interest-at-15percent" />
        </div>
      </ArticlePageShell>
    </>
  );
}
