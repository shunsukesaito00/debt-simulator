import type { Metadata } from "next";
import Link from "next/link";
import { ArticleFooter } from "@/app/components/ArticleFooter";
import { ArticlePagePremise, ArticleReadingPoints, ArticleEditorMemo } from "@/app/components/article";
import { getArticleBreadcrumbJsonLd, getArticleFaqJsonLd } from "@/lib/article-structured-data";
import { ARTICLE_AUTHOR_JSON_LD, ARTICLE_PUBLISHER_JSON_LD } from "@/lib/site-author";
import { ArticlePageShell } from "@/app/components/ArticlePageShell";
import { articleUsesWideLayout } from "@/lib/article-layout";

import { RevoMonthsAndInterestBarCharts, RevoTotalPaymentStackedChart } from "./RevoCharts";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://debt-simulator-quzc.vercel.app";
const ARTICLE_URL = `${BASE}/articles/revo-100-interest`;
const ARTICLE_TITLE = "リボ払い100万円の利息はいくら？完済までの総支払額をシミュレーション";

export const metadata: Metadata = {
  title: ARTICLE_TITLE,
  description:
    "リボ払いで100万円を利用した場合の利息、毎月の返済額、完済までの総支払額をわかりやすく解説します。返済期間が長引くほど利息が増える仕組みも整理します。",
  alternates: { canonical: ARTICLE_URL },
  openGraph: {
    title: ARTICLE_TITLE,
    description:
      "リボ払いで100万円を利用した場合の利息、毎月の返済額、完済までの総支払額をわかりやすく解説します。返済期間が長引くほど利息が増える仕組みも整理します。",
    url: ARTICLE_URL,
    type: "article",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: ARTICLE_TITLE,
  description:
    "リボ払いで100万円を利用した場合の利息、毎月の返済額、完済までの総支払額をわかりやすく解説します。返済期間が長引くほど利息が増える仕組みも整理します。",
  url: ARTICLE_URL,
  datePublished: "2025-03-08",
  dateModified: "2025-03-08",
  author: ARTICLE_AUTHOR_JSON_LD,
  publisher: ARTICLE_PUBLISHER_JSON_LD,
};

const faqItems = [
  {
    question: "リボ払い100万円の利息はいくらですか？",
    answer:
      "年利15%を目安にすると、毎月3万円返済では総利息約47.5万円、毎月5万円返済では約18.5万円が目安です。返済額が低いほど利息は増えやすくなります。",
  },
  {
    question: "リボ払い100万円は何年で終わりますか？",
    answer: "毎月3万円返済なら約50か月、毎月5万円返済なら約24か月が目安です。返済条件によって変わります。",
  },
  {
    question: "リボ払いの利息を減らす方法はありますか？",
    answer:
      "毎月の返済額を増やす、追加返済を行う、金利や返済条件を見直す、の3つが基本です。特に返済額を増やす効果は大きいです。",
  },
  {
    question: "リボ払いの利息はどうやって計算されていますか？",
    answer:
      "一般的には、利用残高に対して年利を日割りで計算し、毎月の支払日に請求されます。残高が大きいほど利息額も大きくなるため、元本を早く減らすことが利息軽減の鍵になります。",
  },
  {
    question: "リボ払いの利息負担を一括返済以外で大きく減らす方法はありますか？",
    answer:
      "毎月の返済額を現状より1〜2万円でも上げるだけで、完済期間の短縮と利息の削減効果は大きくなります。また、ボーナス月などに追加返済をまとめて行う方法も有効です。低金利のローンへ借り換えできる場合は、利息そのものを減らせる可能性もあります。",
  },
];

const breadcrumbJsonLd = getArticleBreadcrumbJsonLd(ARTICLE_URL, ARTICLE_TITLE);
const faqJsonLd = getArticleFaqJsonLd(faqItems);

const tocItems = [
  { id: "conclusion", label: "結論｜リボ払い100万円の利息はかなり大きくなりやすい" },
  { id: "reason", label: "リボ払いで利息が増えやすい理由" },
  { id: "30k", label: "毎月3万円で返す場合" },
  { id: "50k", label: "毎月5万円で返す場合" },
  { id: "compare", label: "毎月3万円と5万円の比較" },
  { id: "danger", label: "リボ払い100万円は危険なのか" },
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

      
      <ArticlePageShell currentPageTitle={ARTICLE_TITLE} wide={articleUsesWideLayout("revo-100-interest")}>
<div className="ds-card ds-card-pad">
          <h1 className="text-2xl font-semibold text-stone-900 md:text-3xl">{ARTICLE_TITLE}</h1>
          <p className="mt-4 text-sm text-stone-600 leading-relaxed">
            本記事の計算は、一般的な固定金利・毎月返済の近似例です。実際のリボ払いの条件は商品により異なります。
          </p>

          <section id="premise" className="mt-6">
            <ArticlePagePremise
              comparisonConditions={[
                "リボ払い残高100万円・年利15%を前提に試算する",
                "毎月3万円返済と毎月5万円返済の2パターンで利息を比較する",
                "固定金利・毎月一定額返済（定額元利方式）の近似で計算する",
              ]}
              reasonForConditions="年利15%はリボ払いの一般的な金利水準です。返済額を変えたときに利息がどれだけ変わるかを比較することで、返済額の設定が総コストに与える影響を具体的に示しています。"
            />
          </section>

          <section className="mt-6 ds-subcard p-4">
            <h2 className="text-sm font-semibold text-stone-900">目次</h2>
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
              リボ払いで100万円を利用した場合、毎月の支払いは一見そこまで高く見えなくても、実際には利息負担が大きくなりやすい点に注意が必要です。特に毎月の返済額を低く設定すると、元本の減りが遅くなり、そのぶん利息を長く払い続けることになります。
            </p>
            <p>
              この記事では、リボ払い100万円・年利15%を例に、毎月3万円で返す場合と毎月5万円で返す場合を比較しながら、完済までの期間、総支払額、総利息の違いをわかりやすく整理します。実際の条件で確認したい方は、
              <Link href="/simulator/cardloan" className="font-bold text-stone-900 hover:underline">借入返済シミュレーター</Link>
              で試算できます。
            </p>

            <section id="conclusion">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">結論｜リボ払い100万円の利息はかなり大きくなりやすい</h2>
              <p className="mt-3">
                結論から言うと、リボ払いで100万円を年利15%で利用した場合、毎月3万円返済だと総利息は約47.5万円、毎月5万円返済でも約18.5万円が目安です。
              </p>
              <p className="mt-3">
                毎月の返済額を下げると家計の負担は軽く見えますが、その代わりに完済までの期間が長くなり、総支払額が大きく増えます。リボ払いの怖さは、毎月の支払額が一定でも、元本が思ったほど減らない点にあります。
              </p>
            </section>

            <section id="reading-points">
              <ArticleReadingPoints
                points={[
                  {
                    label: "利息は残高に対して毎月発生する",
                    body: "リボ払いの利息は利用残高に対して計算されるため、残高が大きいほど・返済期間が長いほど利息総額は増えます。",
                  },
                  {
                    label: "返済額が低いと利息の割合が高くなる",
                    body: "月3万円返済では総利息約47.5万円、月5万円では約18.5万円と、返済額の差で総利息が約29万円変わります。",
                  },
                  {
                    label: "最低返済額のまま放置すると総コストが膨らむ",
                    body: "毎月の支払いが一定でラクに見えても、元本がなかなか減らず、支払い総額が借入額の1.5倍近くになることがあります。",
                  },
                ]}
                misconceptions={[
                  "「毎月ちゃんと払っているから大丈夫」と思いがちですが、返済額が低いと元本がほとんど減らず利息を払い続ける状態になります。",
                  "「利息はそこまで大きくない」と思いがちですが、100万円・年利15%・月3万円返済だと利息だけで約47.5万円に達します。",
                ]}
              />
            </section>

            <section id="reason">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">リボ払いで利息が増えやすい理由</h2>
              <p className="mt-3">
                リボ払いは、毎月の支払額をほぼ一定にできるため、月々の負担が見えやすい反面、利用残高が大きいと元本が減りにくくなります。支払額の中には利息も含まれるため、返済初期は特に元本への充当額が小さくなりがちです。
              </p>
              <p className="mt-3">
                その結果、完済までの期間が長引き、総支払額が膨らみやすくなります。特に100万円のように利用残高が大きいケースでは、この構造がはっきり表れます。
              </p>
            </section>

            <section id="30k">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">毎月3万円で返す場合</h2>
              <p className="mt-3">
                リボ払い100万円を年利15%で毎月3万円ずつ返す場合、完済までの期間は約50か月、総支払額は約147.5万円、総利息は約47.5万円が目安です。
              </p>
              <p className="mt-3">
                月々3万円なら払えそうに見えても、完済まで4年以上かかる計算です。返済期間が長くなるため、利息負担もかなり重くなります。
              </p>
            </section>

            <section id="50k">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">毎月5万円で返す場合</h2>
              <p className="mt-3">
                同じ100万円・年利15%でも、毎月5万円ずつ返す場合は、完済までの期間は約24か月、総支払額は約118.5万円、総利息は約18.5万円が目安です。
              </p>
              <p className="mt-3">
                毎月の負担は増えますが、完済期間が短くなるため、総利息は大きく減ります。毎月の返済額を増やす効果が、リボ払いでは特に大きく出ます。
              </p>
            </section>

            <section id="compare">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">毎月3万円と5万円の比較</h2>
              <p className="mt-3">
                同じ100万円のリボ払いでも、毎月の返済額が違うだけで結果は大きく変わります。比較すると次の通りです。
              </p>
              <ul className="mt-2 list-disc pl-5 space-y-1">
                <li>毎月3万円返済: 約50か月 / 総利息約475,166円</li>
                <li>毎月5万円返済: 約24か月 / 総利息約185,022円</li>
              </ul>
              <p className="mt-3">
                毎月の返済額の差は2万円ですが、総利息の差は約29万円あります。返済額を低くしすぎると、利息の支払いが長く続いてしまうことがよくわかります。
              </p>

              <div className="mt-6 overflow-x-auto">
                <table className="w-full min-w-[320px] border-collapse text-left">
                  <thead>
                    <tr className="border-b-2 border-stone-200">
                      <th className="py-3 pr-4 font-semibold text-stone-900">毎月返済額</th>
                      <th className="py-3 pr-4 font-semibold text-stone-900">完済までの期間</th>
                      <th className="py-3 pr-4 font-semibold text-stone-900">総支払額</th>
                      <th className="py-3 font-semibold text-stone-900">総利息</th>
                    </tr>
                  </thead>
                  <tbody className="text-stone-700">
                    <tr className="border-b border-stone-200">
                      <td className="py-3 pr-4">約30,000円</td>
                      <td className="py-3 pr-4">約50か月</td>
                      <td className="py-3 pr-4">約1,475,166円</td>
                      <td className="py-3">約475,166円</td>
                    </tr>
                    <tr className="border-b border-stone-200">
                      <td className="py-3 pr-4">約50,000円</td>
                      <td className="py-3 pr-4">約24か月</td>
                      <td className="py-3 pr-4">約1,185,022円</td>
                      <td className="py-3">約185,022円</td>
                    </tr>
                  </tbody>
                </table>
                <p className="mt-2 text-xs text-stone-600">
                  毎月返済額を上げると完済が早まり、総利息も大きく減ります。
                </p>
              </div>

              <div className="mt-8 ds-subcard p-4">
                <h3 className="text-base font-semibold text-stone-900">毎月返済額別の比較</h3>
                <div className="mt-4">
                  <RevoMonthsAndInterestBarCharts />
                </div>
                <p className="mt-4 text-xs text-stone-600">
                  毎月返済額を下げると、完済まで長引き、総利息が増えます。
                </p>
              </div>

              <div className="mt-8 ds-subcard p-4">
                <h3 className="text-base font-semibold text-stone-900">総支払額の内訳（元本と利息）</h3>
                <div className="mt-4">
                  <RevoTotalPaymentStackedChart />
                </div>
                <p className="mt-4 text-xs text-stone-600">
                  毎月3万円返済では、支払総額に占める利息の割合がかなり大きくなります。
                </p>
              </div>
            </section>

            <section id="danger">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">リボ払い100万円は危険なのか</h2>
              <p className="mt-3">
                リボ払い100万円が必ず危険というわけではありませんが、返済額を低く設定したまま長期間利用すると、家計への負担が見えにくくなります。特に「毎月の支払額が一定だから大丈夫」と考えてしまうと、元本がなかなか減らないまま時間だけが経ってしまいます。
              </p>
              <p className="mt-3">
                重要なのは、毎月いくら払っているかだけでなく、あと何か月で終わるのか、総利息はいくらになるのかを数字で把握することです。
              </p>
            </section>

            <section id="reduce-interest">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">利息を減らすための現実的な方法</h2>
              <p className="mt-3">リボ払いの利息を減らしたいなら、次の方法が有効です。</p>
              <div className="mt-4 space-y-4">
                <div>
                  <h3 className="text-base font-semibold text-stone-900">毎月の返済額を増やす</h3>
                  <p className="mt-1">返済額を増やすと元本の減りが早くなり、その後の利息も減りやすくなります。</p>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-stone-900">追加返済を活用する</h3>
                  <p className="mt-1">臨時収入やボーナスがある月に追加返済できれば、完済までの期間短縮に役立ちます。</p>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-stone-900">金利や返済条件を見直す</h3>
                  <p className="mt-1">借り換えや条件変更が可能なら、支払総額の圧縮につながることがあります。</p>
                </div>
              </div>
            </section>

            <section id="simulator">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">自分の条件で確認するならシミュレーターが早い</h2>
              <p className="mt-3">
                ここまでの数値は、あくまで「100万円・年利15%・一定返済額」という条件で見た目安です。実際のリボ払いは、商品ごとに返済方式や最低返済額ルールが違う場合があります。
              </p>
              <p className="mt-3">
                そのため、最終的には自分の条件を入れて確認するのが一番確実です。
                <Link href="/simulator/cardloan" className="font-bold text-stone-900 hover:underline">返済シミュレーター</Link>
                では、借入額、金利、返済期間などを入力して、月々の返済額や総利息を試算できます。
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
                本記事の試算は、一般的な固定金利・毎月返済の考え方に基づく概算です。実際のリボ払い商品では、元金定額方式、残高スライド方式、締日と支払日の関係、手数料計算、遅延損害金などが影響する場合があります。
              </p>
              <p className="mt-3">
                正確な条件は、利用中または検討中のカード会社・金融会社の公式情報を確認してください。
              </p>
            </section>

            <section id="editor-memo">
              <ArticleEditorMemo
                purpose="リボ払い100万円の利息がどれだけかかるかを具体的に示し、返済額の設定が総コストに与える影響を伝える記事です。"
                reasonAxis="「利息の総額」を主軸に、返済額の違い（月3万円 vs 月5万円）で総利息・完済期間がどう変わるかを比較しています。"
                memo="リボ払いの利息コストにフォーカスした記事として、完済期間よりも「いくら余分に払うことになるか」を前面に出しています。利息を減らす現実的な方法も併記し、行動につなげやすい構成にしています。"
              />
            </section>

            <section id="faq">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">よくある質問</h2>
              <div className="mt-4 space-y-6">
                <div>
                  <h3 className="text-base font-semibold text-stone-900">リボ払い100万円の利息はいくらですか？</h3>
                  <p className="mt-2">
                    年利15%を目安にすると、毎月3万円返済では総利息約47.5万円、毎月5万円返済では約18.5万円が目安です。返済額が低いほど利息は増えやすくなります。
                  </p>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-stone-900">リボ払い100万円は何年で終わりますか？</h3>
                  <p className="mt-2">
                    毎月3万円返済なら約50か月、毎月5万円返済なら約24か月が目安です。返済条件によって変わります。
                  </p>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-stone-900">リボ払いの利息を減らす方法はありますか？</h3>
                  <p className="mt-2">
                    毎月の返済額を増やす、追加返済を行う、金利や返済条件を見直す、の3つが基本です。特に返済額を増やす効果は大きいです。
                  </p>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-stone-900">リボ払いの利息はどうやって計算されていますか？</h3>
                  <p className="mt-2">
                    一般的には、利用残高に対して年利を日割りで計算し、毎月の支払日に請求されます。残高が大きいほど利息額も大きくなるため、元本を早く減らすことが利息軽減の鍵になります。
                  </p>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-stone-900">リボ払いの利息負担を一括返済以外で大きく減らす方法はありますか？</h3>
                  <p className="mt-2">
                    毎月の返済額を現状より1〜2万円でも上げるだけで、完済期間の短縮と利息の削減効果は大きくなります。また、ボーナス月などに追加返済をまとめて行う方法も有効です。低金利のローンへ借り換えできる場合は、利息そのものを減らせる可能性もあります。
                  </p>
                </div>
              </div>
            </section>

            <section id="summary">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">まとめ</h2>
              <p className="mt-3">
                リボ払い100万円を年利15%で利用した場合、毎月3万円返済では総利息は約47.5万円、毎月5万円返済でも約18.5万円が目安です。毎月の支払額を低くすると、そのぶん完済まで長引き、総支払額は大きくなります。
              </p>
              <p className="mt-3">
                リボ払いは「毎月の支払額」だけで判断せず、「完済までの期間」と「総利息」まで含めて考えることが重要です。自分の条件で試算したい場合は、
                <Link href="/simulator/cardloan" className="font-bold text-stone-900 hover:underline">借入返済シミュレーター</Link>
                で確認できます。
              </p>
            </section>
          </div>

          <ArticleFooter articleSlug="revo-100-interest" />
        </div>
      </ArticlePageShell>
    </>
  );
}
