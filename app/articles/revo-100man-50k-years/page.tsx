import type { Metadata } from "next";
import Link from "next/link";
import { ArticleFooter } from "@/app/components/ArticleFooter";
import { ArticlePagePremise, ArticleReadingPoints, ArticleEditorMemo, ArticleStandardBlocks, ArticleProse } from "@/app/components/article";
import { getArticleBreadcrumbJsonLd, getArticleFaqJsonLd } from "@/lib/article-structured-data";
import { ARTICLE_AUTHOR_JSON_LD, ARTICLE_PUBLISHER_JSON_LD } from "@/lib/site-author";
import { ArticlePageShell } from "@/app/components/ArticlePageShell";
import { articleUsesWideLayout } from "@/lib/article-layout";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://debt-simulator-quzc.vercel.app";
const ARTICLE_URL = `${BASE}/articles/revo-100man-50k-years`;
const ARTICLE_TITLE =
  "リボ払い100万円を月5万円で返すと何年かかる？完済までの期間と総利息を解説";

export const metadata: Metadata = {
  title: ARTICLE_TITLE,
  description:
    "リボ払い100万円を毎月5万円で返した場合、完済まで何年・何か月かかるのか、総利息はいくらになるのかを年利15%でシミュレーションし、わかりやすく解説します。",
  alternates: { canonical: ARTICLE_URL },
  openGraph: {
    title: ARTICLE_TITLE,
    description:
      "リボ払い100万円を毎月5万円で返した場合、完済まで何年・何か月かかるのか、総利息はいくらになるのかを年利15%でシミュレーションし、わかりやすく解説します。",
    url: ARTICLE_URL,
    type: "article",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: ARTICLE_TITLE,
  description:
    "リボ払い100万円を毎月5万円で返した場合、完済まで何年・何か月かかるのか、総利息はいくらになるのかを年利15%でシミュレーションし、わかりやすく解説します。",
  url: ARTICLE_URL,
  datePublished: "2026-03-19",
  dateModified: "2026-03-19",
  author: ARTICLE_AUTHOR_JSON_LD,
  publisher: ARTICLE_PUBLISHER_JSON_LD,
};

const faqItems = [
  {
    question: "リボ100万円を月5万円で返すと何年かかりますか？",
    answer: "年利15%の目安では、完済まで24か月（約2年）です。",
  },
  {
    question: "月5万円返済だと総利息はいくらになりますか？",
    answer:
      "100万円・年利15%で毎月5万円返済（定額元利の近似）の場合、総利息の目安は約15.8万円です。",
  },
  {
    question: "月3万円と月5万円では総利息はどれくらい変わりますか？",
    answer:
      "同じ100万円・年利15%でも、月3万円では総利息の目安は約30.2万円、月5万円では約15.8万円です。月2万円多く返すだけで、利息負担が大きく下がり、完済も約1年8か月早まります。",
  },
  {
    question: "早く完済するにはどうすればいいですか？",
    answer: "毎月の返済額を増やす、あるいは繰り上げ返済をすると、完済が早まり総利息も減りやすくなります。",
  },
];

const breadcrumbJsonLd = getArticleBreadcrumbJsonLd(ARTICLE_URL, ARTICLE_TITLE);
const faqJsonLd = getArticleFaqJsonLd(faqItems);

const tocItems = [
  { id: "conclusion", label: "結論｜月5万円返済だと約2年・総利息は約15.8万円" },
  { id: "why", label: "なぜ月5万円なら月3万円より早く終わるのか" },
  { id: "numbers", label: "月5万円返済の具体的な数字" },
  { id: "compare", label: "月3万円・月5万円・月7万円を比べると" },
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

      <ArticlePageShell currentPageTitle={ARTICLE_TITLE} wide={articleUsesWideLayout("revo-100man-50k-years")}>
        <div className="ds-card ds-card-pad">
          <h1 className="text-2xl font-semibold text-stone-900 md:text-3xl">{ARTICLE_TITLE}</h1>
          <p className="mt-4 text-base text-stone-600 leading-relaxed">
            本記事の計算は、一般的な固定金利・毎月一定額返済（定額元利）の近似例です。実際のリボ払い商品では条件により異なる場合があります。
          </p>

          <ArticleStandardBlocks slug="revo-100man-50k-years" />

          <section id="premise" className="mt-6">
            <ArticlePagePremise
              comparisonConditions={[
                "リボ払い残高100万円・年利15%・毎月5万円返済を前提に計算する",
                "固定金利・毎月一定額返済（定額元利方式）の近似で試算する",
                "比較対象として毎月3万円・7万円返済のケースも併記する",
              ]}
              reasonForConditions="年利15%はリボ払いでよく参照される水準の一例です。月5万円は「最低返済より上げたいが、無理のないライン」をイメージしやすい設定として選んでいます。"
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
              リボ払いで100万円を利用している場合、「毎月5万円返していれば、あと何年で完済できるのか」「総利息はどれくらいか」が気になる方は多いはずです。毎月の返済額を上げるほど元本の減りが早まり、完済までの期間と総利息は大きく短縮されます。
            </p>
            <p>
              この記事では、リボ払い100万円・年利15%を前提に、毎月5万円で返した場合の完済までの期間と総利息をシミュレーションし、月3万円・月7万円との違いもあわせて解説します。実際の条件で確認したい方は、
              <Link href="/simulator/cardloan" className="font-bold text-stone-900 hover:underline">
                借入返済シミュレーター
              </Link>
              で試算できます。
            </p>
            <section id="conclusion">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">
                結論｜月5万円返済だと約2年・総利息は約15.8万円
              </h2>
              <p className="mt-3">
                結論から言うと、リボ払い100万円を年利15%で毎月5万円ずつ返済する場合、完済までの目安は<strong className="text-stone-900">24か月（約2年）</strong>
                、総支払額は約115.8万円、総利息は<strong className="text-stone-900">約15.8万円</strong>です（端数処理込みの試算値）。
              </p>
              <p className="mt-3">
                月3万円返済と比べると、完済が約1年8か月早まり、総利息は約14.4万円ほど抑えられます。月5万円は家計への負担は増えますが、利息の累積を抑えつつ完済を早めやすい設定です。
              </p>
            </section>

            <section id="reading-points">
              <ArticleReadingPoints
                points={[
                  {
                    label: "月5万円だと完済まで約2年（24か月）",
                    body: "100万円・年利15%・毎月5万円返済の目安では、24か月で完済し、総利息は約15.8万円です。",
                  },
                  {
                    label: "返済初期ほど利息の割合が大きい",
                    body: "残高が大きいうちは、返済額のうち利息が占める割合が高く、元本に回る金額は相対的に小さくなります。",
                  },
                  {
                    label: "月3万円より月2万円多く返すと、総利息が大きく減る",
                    body: "同条件で月3万円だと完済まで約44か月・総利息約30.2万円が目安です。月5万円にすると期間と利息の両方が大きく改善します。",
                  },
                ]}
                misconceptions={[
                  "「月5万円ならすぐ終わる」と思いがちですが、100万円・年利15%でも約2年かかり、利息は十数万円単位で発生します。",
                  "「リボは最低返済だけで十分」と思いがちですが、返済額が低いほど期間が伸び、利息が累積しやすくなります。",
                ]}
              />
            </section>

            <section id="why">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">なぜ月5万円なら月3万円より早く終わるのか</h2>
              <p className="mt-3">
                定額元利では、毎月の返済のうちまず利息が差し引かれ、残りが元本に充当されます。返済額が大きいほど元本の減りが速く、次月以降の利息の土台である残高も早く小さくなります。そのため、月5万円は月3万円より完済までの期間が短く、総利息も抑えやすくなります。
              </p>
            </section>
            <section id="numbers">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">月5万円返済の具体的な数字</h2>
              <p className="mt-3">リボ払い100万円・年利15%・毎月5万円返済の場合の目安は次の通りです。</p>
              <div className="mt-6 overflow-x-auto">
                <table className="w-full min-w-[280px] border-collapse text-left">
                  <thead>
                    <tr className="border-b-2 border-stone-200">
                      <th className="py-3 pr-4 font-semibold text-stone-900">項目</th>
                      <th className="py-3 font-semibold text-stone-900">目安</th>
                    </tr>
                  </thead>
                  <tbody className="text-stone-700">
                    <tr className="border-b border-stone-200">
                      <td className="py-3 pr-4">完済までの期間</td>
                      <td className="py-3">24か月（約2年）</td>
                    </tr>
                    <tr className="border-b border-stone-200">
                      <td className="py-3 pr-4">毎月の返済額</td>
                      <td className="py-3">50,000円（固定）</td>
                    </tr>
                    <tr className="border-b border-stone-200">
                      <td className="py-3 pr-4">総支払額</td>
                      <td className="py-3">約1,157,934円</td>
                    </tr>
                    <tr className="border-b border-stone-200">
                      <td className="py-3 pr-4">総利息</td>
                      <td className="py-3">約157,934円（約15.8万円）</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
            <section id="compare">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">月3万円・月5万円・月7万円を比べると</h2>
              <p className="mt-3">同じ100万円・年利15%でも、毎月の返済額を変えると完済までの期間と総利息は次のように変わります。</p>
              <div className="mt-6 overflow-x-auto">
                <table className="w-full min-w-[360px] border-collapse text-left">
                  <thead>
                    <tr className="border-b-2 border-stone-200">
                      <th className="py-3 pr-4 font-semibold text-stone-900">毎月返済額</th>
                      <th className="py-3 pr-4 font-semibold text-stone-900">完済までの目安</th>
                      <th className="py-3 font-semibold text-stone-900">総利息（目安）</th>
                    </tr>
                  </thead>
                  <tbody className="text-stone-700">
                    <tr className="border-b border-stone-200">
                      <td className="py-3 pr-4">30,000円</td>
                      <td className="py-3 pr-4">44か月（約3年8か月）</td>
                      <td className="py-3">約30.2万円</td>
                    </tr>
                    <tr className="border-b border-stone-200">
                      <td className="py-3 pr-4">50,000円</td>
                      <td className="py-3 pr-4">24か月（約2年）</td>
                      <td className="py-3">約15.8万円</td>
                    </tr>
                    <tr className="border-b border-stone-200">
                      <td className="py-3 pr-4">70,000円</td>
                      <td className="py-3 pr-4">16か月（約1年4か月）</td>
                      <td className="py-3">約10.9万円</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-3">
                月5万円は、月3万円より総利息を約14.4万円抑えつつ、完済を約20か月早められるイメージです。さらに返済額を上げられるなら、月7万円では総利息は約10.9万円まで下がる目安になります。
              </p>
            </section>
            <section id="simulator">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">自分の条件で確認するならシミュレーターが早い</h2>
              <p className="mt-3">
                ここまでの数値は「100万円・年利15%・毎月5万円返済」という条件での目安です。自分の残高・金利・毎月返済額で完済時期や総利息を確認したい場合は、
                <Link href="/simulator/cardloan" className="font-bold text-stone-900 hover:underline">
                  借入返済シミュレーター
                </Link>
                で「定額元利（金額指定）」を選んで試算できます。
              </p>
              <div className="mt-6">
                <Link href="/simulator/cardloan" className="ds-btn ds-btn-primary">
                  借入返済シミュレーターで計算する →
                </Link>
              </div>
            </section>
            <section id="notice">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">注意点</h2>
              <p className="mt-3">
                本記事の試算は、一般的な固定金利・毎月一定額返済の考え方に基づく概算です。実際のリボ払いでは、最低支払額のルール、金利の変動、手数料などが影響する場合があります。正確な返済条件は、利用中のカードやローン商品の約款・明細を確認してください。
              </p>
            </section>
            <section id="editor-memo">
              <ArticleEditorMemo
                purpose="リボ払い100万円を月5万円で返す場合の完済期間と総利息を具体的に示し、月3万円・月7万円との比較で返済額の効果を伝える記事です。"
                reasonAxis="GROWTH戦略の『リボ100万 月5万 何年』に対応する専用記事として、定額元利の近似で数値を一本化しています。"
                memo="数値は lib/loan-calc の定額元利（端数切り捨て）と整合するよう試算しています。"
              />
            </section>

            <section id="faq">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">よくある質問</h2>
              <div className="mt-4 space-y-6">
                <div>
                  <h3 className="text-base font-semibold text-stone-900">リボ100万円を月5万円で返すと何年かかりますか？</h3>
                  <p className="mt-2">年利15%の目安では、完済まで24か月（約2年）です。</p>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-stone-900">月5万円返済だと総利息はいくらになりますか？</h3>
                  <p className="mt-2">
                    100万円・年利15%で毎月5万円返済（定額元利の近似）の場合、総利息の目安は約15.8万円です。
                  </p>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-stone-900">月3万円と月5万円では総利息はどれくらい変わりますか？</h3>
                  <p className="mt-2">
                    同じ100万円・年利15%でも、月3万円では総利息の目安は約30.2万円、月5万円では約15.8万円です。月2万円多く返すだけで、利息負担が大きく下がり、完済も約1年8か月早まります。
                  </p>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-stone-900">早く完済するにはどうすればいいですか？</h3>
                  <p className="mt-2">毎月の返済額を増やす、あるいは繰り上げ返済をすると、完済が早まり総利息も減りやすくなります。</p>
                </div>
              </div>
            </section>
            <section id="summary">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">まとめ</h2>
              <p className="mt-3">
                リボ払い100万円を毎月5万円で返す場合、年利15%では完済まで約2年（24か月）、総利息は約15.8万円が目安です。月3万円と比べると期間と利息の両方でメリットが大きくなります。自分の条件で試算したい場合は
                <Link href="/simulator/cardloan" className="font-bold text-stone-900 hover:underline">
                  借入返済シミュレーター
                </Link>
                で確認できます。あわせて
                <Link href="/articles/revo-100man-30k-years" className="font-bold text-stone-900 hover:underline">
                  月3万円で返す場合の試算
                </Link>
                や
                <Link href="/articles/revo-100man-15percent-simulation" className="font-bold text-stone-900 hover:underline">
                  返済額別の比較記事
                </Link>
                も参照してください。
              </p>
            </section>
          </ArticleProse>
          <ArticleFooter articleSlug="revo-100man-50k-years" />
        </div>
      </ArticlePageShell>
    </>
  );
}
