import type { Metadata } from "next";
import Link from "next/link";
import { ArticleFooter } from "@/app/components/ArticleFooter";
import { ArticlePagePremise, ArticleReadingPoints, ArticleEditorMemo } from "@/app/components/article";
import { getArticleBreadcrumbJsonLd, getArticleFaqJsonLd } from "@/lib/article-structured-data";
import { ARTICLE_AUTHOR_JSON_LD, ARTICLE_PUBLISHER_JSON_LD } from "@/lib/site-author";
import { ArticlePageShell } from "@/app/components/ArticlePageShell";
import { articleUsesWideLayout } from "@/lib/article-layout";

import { TotalInterestBarChart, RepaymentBurdenComparisonChart } from "./RepaymentMethodCharts";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://debt-simulator-quzc.vercel.app";
const ARTICLE_URL = `${BASE}/articles/repayment-method-difference`;
const ARTICLE_TITLE = "元利均等返済と元金均等返済の違いは？4つの返済方式を比較して解説";

export const metadata: Metadata = {
  title: ARTICLE_TITLE,
  description:
    "元利均等返済と元金均等返済の違いを中心に、定額元利・定額元金も含めた4つの返済方式の特徴、向いている人、メリット・デメリットを比較してわかりやすく解説します。",
  alternates: { canonical: ARTICLE_URL },
  openGraph: {
    title: ARTICLE_TITLE,
    description:
      "元利均等返済と元金均等返済の違いを中心に、定額元利・定額元金も含めた4つの返済方式の特徴、向いている人、メリット・デメリットを比較してわかりやすく解説します。",
    url: ARTICLE_URL,
    type: "article",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: ARTICLE_TITLE,
  description:
    "元利均等返済と元金均等返済の違いを中心に、定額元利・定額元金も含めた4つの返済方式の特徴、向いている人、メリット・デメリットを比較してわかりやすく解説します。",
  url: ARTICLE_URL,
  datePublished: "2025-03-08",
  dateModified: "2025-03-08",
  author: ARTICLE_AUTHOR_JSON_LD,
  publisher: ARTICLE_PUBLISHER_JSON_LD,
};

const faqItems = [
  {
    question: "元利均等返済と元金均等返済はどっちが得ですか？",
    answer:
      "総利息だけを見ると元金均等返済の方が有利になりやすいですが、返済開始当初の負担は重くなります。どちらが適切かは家計の余力によります。",
  },
  {
    question: "毎月の返済額が一定なのはどれですか？",
    answer: "一般的には元利均等返済と定額元利が、毎月の支払額を一定に近い形で管理しやすい方式です。",
  },
  {
    question: "返済方式は後から変えられますか？",
    answer: "商品によって異なります。後から変更できない場合もあるため、契約前に確認が必要です。",
  },
  {
    question: "返済途中で返済方式を切り替えるとどうなりますか？",
    answer:
      "切り替えが可能な商品の場合、残高や残り返済回数をもとに再計算されます。切り替え前後で毎月返済額や総利息が変わるため、事前にシミュレーションで確認することをおすすめします。",
  },
  {
    question: "カードローンやリボ払いにはどの返済方式が多いですか？",
    answer:
      "カードローンやリボ払いでは、毎月の支払額が一定の定額元利方式が多く採用されています。毎月の負担が安定する反面、返済額が低いと元本がなかなか減らず、完済が長引く場合があります。",
  },
];

const breadcrumbJsonLd = getArticleBreadcrumbJsonLd(ARTICLE_URL, ARTICLE_TITLE);
const faqJsonLd = getArticleFaqJsonLd(faqItems);

const tocItems = [
  { id: "conclusion", label: "結論｜元利均等と元金均等の一番大きな違い" },
  { id: "equal-payment", label: "元利均等返済とは" },
  { id: "equal-principal", label: "元金均等返済とは" },
  { id: "compare-two", label: "元利均等返済と元金均等返済の違いを比較" },
  { id: "four-methods", label: "4つの返済方式を一覧で比較" },
  { id: "numeric", label: "数値で比較するとどれがどう違うか" },
  { id: "suit", label: "どの返済方式が向いているか" },
  { id: "simulator", label: "迷ったらシミュレーターで比較するのが早い" },
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

      
      <ArticlePageShell currentPageTitle={ARTICLE_TITLE} wide={articleUsesWideLayout("repayment-method-difference")}>
<div className="ds-card ds-card-pad">
          <h1 className="text-2xl font-black text-stone-900 md:text-3xl">{ARTICLE_TITLE}</h1>
          <p className="mt-4 text-sm text-stone-600 leading-relaxed">
            本記事の比較は、100万円・年利15%を前提にした一般的な概算例です。実際の金融商品では条件が異なる場合があります。
          </p>

          <section id="premise" className="mt-6">
            <ArticlePagePremise
              comparisonConditions={[
                "借入額100万円・年利15%を共通条件として4つの返済方式を比較する",
                "元利均等・元金均等は36回返済、定額元利は月35,000円、定額元金は月30,000円で試算する",
                "固定金利・毎月返済の考え方に基づく概算値を使用する",
              ]}
              reasonForConditions="同じ借入条件で返済方式だけを変えることで、方式ごとの「毎月の返済額の出方」「総利息」「完済期間」の違いを純粋に比較できるようにしています。"
            />
          </section>

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
              ローンや借入の返済方式を選ぶ場面で、「元利均等返済と元金均等返済の違いがよくわからない」と感じる方は多いはずです。毎月の返済額が一定なのか、最初の負担が大きいのか、総利息はどちらが少ないのか。この違いを理解しないまま返済計画を立てると、後から想定より負担が重いと感じることがあります。
            </p>
            <p>
              この記事では、まず「元利均等返済と元金均等返済の違い」をわかりやすく整理し、そのうえで当サイトのシミュレーターに対応する4つの返済方式（元利均等・元金均等・定額元利・定額元金）を比較して解説します。実際の条件で確認したい方は、
              <Link href="/simulator/cardloan" className="font-bold text-stone-900 hover:underline">返済シミュレーター</Link>
              で比較できます。
            </p>

            <section id="conclusion">
              <h2 className="text-lg font-black text-stone-900 md:text-xl">結論｜元利均等と元金均等の一番大きな違い</h2>
              <p className="mt-3">
                結論から言うと、元利均等返済は毎月の返済額がほぼ一定で家計管理がしやすく、元金均等返済は返済開始当初の負担が重い代わりに、総利息を抑えやすい方式です。
              </p>
              <p className="mt-3">
                つまり、毎月の支出を安定させたい人には元利均等返済、総支払額を少しでも減らしたい人には元金均等返済が向いています。ただし、どちらが絶対に正解というわけではなく、家計の余力や返済計画によって向き不向きが変わります。
              </p>
              <p className="mt-3 text-stone-600">
                自分が返済計画を立てるときは、最初の数年でどれだけ負担できるかをまず見て、そのうえで方式を選ぶようにしています。
              </p>
            </section>

            <section id="reading-points">
              <ArticleReadingPoints
                points={[
                  {
                    label: "元利均等 = 毎月一定で管理しやすいが総利息はやや多め",
                    body: "毎月の返済額がほぼ一定なので家計管理がしやすい反面、同条件なら元金均等より総利息が多くなる傾向があります。",
                  },
                  {
                    label: "元金均等 = 総利息を抑えやすいが初期負担が重い",
                    body: "毎月返す元本が一定で残高の減りが早いため総利息は抑えやすいですが、返済開始当初の負担は大きくなります。",
                  },
                  {
                    label: "どちらが正解ではなく、優先するものによって選ぶ",
                    body: "毎月の支出を安定させたいか、総支払額を抑えたいかで向いている方式が変わります。定額元利・定額元金も含め、状況に合った選び方を整理しています。",
                  },
                ]}
                misconceptions={[
                  "「元金均等の方が必ず得」と思いがちですが、初期の返済負担に耐えられないと家計を圧迫し逆効果になることがあります。",
                  "「返済方式はどれも同じようなもの」と思いがちですが、同じ条件でも総利息に数万円の差が出ることがあります。",
                ]}
              />
            </section>

            <section id="equal-payment">
              <h2 className="text-lg font-black text-stone-900 md:text-xl">元利均等返済とは</h2>
              <p className="mt-3">
                元利均等返済は、毎月支払う返済額の合計がほぼ一定になる方式です。毎月の返済額が固定に近いため、家計管理がしやすく、将来の支出計画を立てやすいのが大きな特徴です。
              </p>
              <p className="mt-3">
                一方で、返済初期は利息の占める割合が大きく、元本の減りが比較的ゆるやかです。そのため、同じ借入条件なら元金均等返済より総利息がやや多くなる傾向があります。
              </p>
            </section>

            <section id="equal-principal">
              <h2 className="text-lg font-black text-stone-900 md:text-xl">元金均等返済とは</h2>
              <p className="mt-3">
                元金均等返済は、毎月返す元本の額が一定になる方式です。借入残高が減るにつれて利息も減るため、毎月の返済総額は返済開始当初が最も大きく、徐々に軽くなっていきます。
              </p>
              <p className="mt-3">
                特徴は、元利均等返済よりも総利息を抑えやすいことです。ただし、返済開始直後の負担が重くなるため、当初の家計に余裕が必要です。
              </p>
            </section>

            <section id="compare-two">
              <h2 className="text-lg font-black text-stone-900 md:text-xl">元利均等返済と元金均等返済の違いを比較</h2>
              <p className="mt-3">両者の違いを端的にまとめると次の通りです。</p>
              <ul className="mt-2 list-disc pl-5 space-y-1">
                <li>元利均等返済: 毎月返済額がほぼ一定 / 家計管理しやすい / 総利息はやや多め</li>
                <li>元金均等返済: 初回返済額が大きい / 徐々に返済額が減る / 総利息は抑えやすい</li>
              </ul>

              <div className="mt-6 overflow-x-auto">
                <table className="w-full min-w-[400px] border-collapse text-left">
                  <thead>
                    <tr className="border-b-2 border-stone-200">
                      <th className="py-3 pr-4 font-black text-stone-900">返済方式</th>
                      <th className="py-3 pr-4 font-black text-stone-900">毎月返済額の特徴</th>
                      <th className="py-3 pr-4 font-black text-stone-900">総利息の傾向</th>
                      <th className="py-3 font-black text-stone-900">向いている人</th>
                    </tr>
                  </thead>
                  <tbody className="text-stone-700">
                    <tr className="border-b border-stone-200">
                      <td className="py-3 pr-4">元利均等</td>
                      <td className="py-3 pr-4">ほぼ一定</td>
                      <td className="py-3 pr-4">やや多め</td>
                      <td className="py-3">毎月の支出を安定させたい人</td>
                    </tr>
                    <tr className="border-b border-stone-200">
                      <td className="py-3 pr-4">元金均等</td>
                      <td className="py-3 pr-4">初回が大きく徐々に減る</td>
                      <td className="py-3 pr-4">抑えやすい</td>
                      <td className="py-3">総支払額を減らしたい人（当初負担に余裕がある人）</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="mt-4">同じ100万円・年利15%・36回返済で数値比較すると次の通りです。</p>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full min-w-[360px] border-collapse text-left">
                  <thead>
                    <tr className="border-b-2 border-stone-200">
                      <th className="py-3 pr-4 font-black text-stone-900">返済方式</th>
                      <th className="py-3 pr-4 font-black text-stone-900">初回または毎月返済額</th>
                      <th className="py-3 pr-4 font-black text-stone-900">総支払額</th>
                      <th className="py-3 font-black text-stone-900">総利息</th>
                    </tr>
                  </thead>
                  <tbody className="text-stone-700">
                    <tr className="border-b border-stone-200">
                      <td className="py-3 pr-4">元利均等（36回）</td>
                      <td className="py-3 pr-4">約34,665円</td>
                      <td className="py-3 pr-4">約1,247,952円</td>
                      <td className="py-3">約247,952円</td>
                    </tr>
                    <tr className="border-b border-stone-200">
                      <td className="py-3 pr-4">元金均等（36回）</td>
                      <td className="py-3 pr-4">初回約40,278円、最終回約28,125円</td>
                      <td className="py-3 pr-4">約1,231,250円</td>
                      <td className="py-3">約231,250円</td>
                    </tr>
                  </tbody>
                </table>
                <p className="mt-2 text-xs text-stone-600">
                  元金均等の方が総利息は少ない一方、初回の返済負担は重くなります。
                </p>
              </div>
            </section>

            <section id="four-methods">
              <h2 className="text-lg font-black text-stone-900 md:text-xl">4つの返済方式を一覧で比較</h2>
              <p className="mt-3">
                当サイトのシミュレーターでは、元利均等、元金均等、定額元利、定額元金の4方式を比較できます。返済方式ごとに、返済額の決まり方と向いている使い方が異なります。
              </p>
              <div className="mt-6 overflow-x-auto">
                <table className="w-full min-w-[420px] border-collapse text-left">
                  <thead>
                    <tr className="border-b-2 border-stone-200">
                      <th className="py-3 pr-4 font-black text-stone-900">返済方式</th>
                      <th className="py-3 pr-4 font-black text-stone-900">返済額の特徴</th>
                      <th className="py-3 pr-4 font-black text-stone-900">利息の傾向</th>
                      <th className="py-3 font-black text-stone-900">向いているケース</th>
                    </tr>
                  </thead>
                  <tbody className="text-stone-700">
                    <tr className="border-b border-stone-200">
                      <td className="py-3 pr-4">元利均等</td>
                      <td className="py-3 pr-4">毎月の支払総額がほぼ一定</td>
                      <td className="py-3 pr-4">やや多めになりやすい</td>
                      <td className="py-3">家計管理をしやすくしたい</td>
                    </tr>
                    <tr className="border-b border-stone-200">
                      <td className="py-3 pr-4">元金均等</td>
                      <td className="py-3 pr-4">初回が大きく徐々に減る</td>
                      <td className="py-3 pr-4">抑えやすい</td>
                      <td className="py-3">総利息を抑えたい（当初負担に余裕がある）</td>
                    </tr>
                    <tr className="border-b border-stone-200">
                      <td className="py-3 pr-4">定額元利</td>
                      <td className="py-3 pr-4">毎月の支払総額を一定額で設定</td>
                      <td className="py-3 pr-4">返済額次第で変動</td>
                      <td className="py-3">月々の支出を一定額で管理したい</td>
                    </tr>
                    <tr className="border-b border-stone-200">
                      <td className="py-3 pr-4">定額元金</td>
                      <td className="py-3 pr-4">毎月返す元本額を一定にし、利息を上乗せ</td>
                      <td className="py-3 pr-4">返済が進むほど利息は減りやすい</td>
                      <td className="py-3">元本を計画的に減らしたい</td>
                    </tr>
                  </tbody>
                </table>
                <p className="mt-2 text-xs text-stone-600">
                  4方式とも「どれが絶対に優れている」ではなく、何を優先するかで選ぶとよいです。
                </p>
              </div>
            </section>

            <section id="numeric">
              <h2 className="text-lg font-black text-stone-900 md:text-xl">数値で比較するとどれがどう違うか</h2>
              <p className="mt-3">
                同じ100万円・年利15%でも、返済方式が違うと、毎月の負担の出方や総利息は変わります。概算比較では次のようになります。
              </p>
              <ul className="mt-2 list-disc pl-5 space-y-1">
                <li>元利均等（36回）: 毎月約34,665円 / 総利息約247,952円</li>
                <li>元金均等（36回）: 初回約40,278円、最終回約28,125円 / 総利息約231,250円</li>
                <li>定額元利（月35,000円）: 完済まで約35か月 / 総利息約220,284円</li>
                <li>定額元金（月30,000円）: 完済まで約34か月 / 初回約42,500円、最終回約30,375円 / 総利息約212,500円</li>
              </ul>
              <p className="mt-3">
                毎月の返済額が安定しているか、最初の負担が重いか、完済までのスピードがどうかによって、向いている人が変わります。
              </p>

              <div className="mt-6 overflow-x-auto">
                <table className="w-full min-w-[380px] border-collapse text-left">
                  <thead>
                    <tr className="border-b-2 border-stone-200">
                      <th className="py-3 pr-4 font-black text-stone-900">返済方式</th>
                      <th className="py-3 pr-4 font-black text-stone-900">返済額の特徴</th>
                      <th className="py-3 pr-4 font-black text-stone-900">完済目安</th>
                      <th className="py-3 font-black text-stone-900">総利息</th>
                    </tr>
                  </thead>
                  <tbody className="text-stone-700">
                    <tr className="border-b border-stone-200">
                      <td className="py-3 pr-4">元利均等（36回）</td>
                      <td className="py-3 pr-4">毎月約34,665円</td>
                      <td className="py-3 pr-4">36か月</td>
                      <td className="py-3">約247,952円</td>
                    </tr>
                    <tr className="border-b border-stone-200">
                      <td className="py-3 pr-4">元金均等（36回）</td>
                      <td className="py-3 pr-4">初回約40,278円→最終回約28,125円</td>
                      <td className="py-3 pr-4">36か月</td>
                      <td className="py-3">約231,250円</td>
                    </tr>
                    <tr className="border-b border-stone-200">
                      <td className="py-3 pr-4">定額元利（月35,000円）</td>
                      <td className="py-3 pr-4">毎月35,000円</td>
                      <td className="py-3 pr-4">約35か月</td>
                      <td className="py-3">約220,284円</td>
                    </tr>
                    <tr className="border-b border-stone-200">
                      <td className="py-3 pr-4">定額元金（月30,000円）</td>
                      <td className="py-3 pr-4">初回約42,500円→最終回約30,375円</td>
                      <td className="py-3 pr-4">約34か月</td>
                      <td className="py-3">約212,500円</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-8 ds-subcard p-4">
                <h3 className="text-base font-black text-stone-900">総利息の比較</h3>
                <div className="mt-4">
                  <TotalInterestBarChart />
                </div>
              </div>

              <div className="mt-8 ds-subcard p-4">
                <h3 className="text-base font-black text-stone-900">返済負担のイメージ（初回 vs 最終回）</h3>
                <div className="mt-4">
                  <RepaymentBurdenComparisonChart />
                </div>
                <p className="mt-4 text-xs text-stone-600">
                  毎月の負担を安定させたいなら元利均等や定額元利、総利息を抑えやすい傾向を重視するなら元金均等や定額元金が候補になります。
                </p>
              </div>
            </section>

            <section id="suit">
              <h2 className="text-lg font-black text-stone-900 md:text-xl">どの返済方式が向いているか</h2>
              <p className="mt-3">
                毎月の家計管理をしやすくしたいなら、元利均等返済や定額元利が向いています。毎月の支払額が把握しやすく、予算を立てやすいからです。
              </p>
              <p className="mt-3">
                一方で、返済初期の負担に耐えられるなら、元金均等返済や定額元金の方が元本の減りが早く、総利息を抑えやすい傾向があります。つまり、何を優先するかで選ぶべき方式は変わります。
              </p>
            </section>

            <section id="simulator">
              <h2 className="text-lg font-black text-stone-900 md:text-xl">迷ったらシミュレーターで比較するのが早い</h2>
              <p className="mt-3">
                返済方式の違いは、言葉だけで理解するより、実際に数値を入れて比較した方が圧倒的にわかりやすいです。借入額、金利、返済期間を変えるだけでも結果は大きく動きます。
              </p>
              <p className="mt-3">
                そのため、最終的には自分の条件を入れて確認するのが一番確実です。
                <Link href="/simulator/cardloan" className="font-bold text-stone-900 hover:underline">返済シミュレーター</Link>
                では、返済方式を切り替えながら、毎月の返済額や総利息を比較できます。
              </p>
              <div className="mt-6">
                <Link
                  href="/simulator/cardloan"
                  className="ds-btn ds-btn-primary"
                >
                  返済方式をシミュレーターで比較する →
                </Link>
              </div>
            </section>

            <section id="notice">
              <h2 className="text-lg font-black text-stone-900 md:text-xl">注意点</h2>
              <p className="mt-3">
                本記事の比較は、一般的な固定金利・毎月返済の考え方に基づく概算です。実際の金融商品では、日割り計算、最低返済額ルール、初回返済日、手数料、商品固有の返済仕様などが影響する場合があります。
              </p>
              <p className="mt-3">
                正確な返済条件は、契約中または検討中の金融商品の説明書や公式情報を確認してください。
              </p>
            </section>

            <section id="editor-memo">
              <ArticleEditorMemo
                purpose="返済方式ごとの違いを整理し、読者が自分の状況に合った方式を選べるようにする比較記事です。"
                reasonAxis="「毎月の負担を安定させたいか」「総支払額を抑えたいか」という判断軸で4つの方式を整理しています。"
                memo="元利均等と元金均等の2方式比較を軸に、定額元利・定額元金も加えた4方式比較へ自然に広げる構成にしています。シミュレーターで方式を切り替えて試算できることへの導線も意識しています。"
              />
            </section>

            <section id="faq">
              <h2 className="text-lg font-black text-stone-900 md:text-xl">よくある質問</h2>
              <div className="mt-4 space-y-6">
                <div>
                  <h3 className="text-base font-black text-stone-900">元利均等返済と元金均等返済はどっちが得ですか？</h3>
                  <p className="mt-2">
                    総利息だけを見ると元金均等返済の方が有利になりやすいですが、返済開始当初の負担は重くなります。どちらが適切かは家計の余力によります。
                  </p>
                </div>
                <div>
                  <h3 className="text-base font-black text-stone-900">毎月の返済額が一定なのはどれですか？</h3>
                  <p className="mt-2">
                    一般的には元利均等返済と定額元利が、毎月の支払額を一定に近い形で管理しやすい方式です。
                  </p>
                </div>
                <div>
                  <h3 className="text-base font-black text-stone-900">返済方式は後から変えられますか？</h3>
                  <p className="mt-2">
                    商品によって異なります。後から変更できない場合もあるため、契約前に確認が必要です。
                  </p>
                </div>
                <div>
                  <h3 className="text-base font-black text-stone-900">返済途中で返済方式を切り替えるとどうなりますか？</h3>
                  <p className="mt-2">
                    切り替えが可能な商品の場合、残高や残り返済回数をもとに再計算されます。切り替え前後で毎月返済額や総利息が変わるため、事前にシミュレーションで確認することをおすすめします。
                  </p>
                </div>
                <div>
                  <h3 className="text-base font-black text-stone-900">カードローンやリボ払いにはどの返済方式が多いですか？</h3>
                  <p className="mt-2">
                    カードローンやリボ払いでは、毎月の支払額が一定の定額元利方式が多く採用されています。毎月の負担が安定する反面、返済額が低いと元本がなかなか減らず、完済が長引く場合があります。
                  </p>
                </div>
              </div>
            </section>

            <section id="summary">
              <h2 className="text-lg font-black text-stone-900 md:text-xl">まとめ</h2>
              <p className="mt-3">
                元利均等返済は毎月の負担を安定させやすく、元金均等返済は総利息を抑えやすいのが大きな違いです。さらに、定額元利や定額元金も含めると、返済方式ごとに向いている人が変わります。
              </p>
              <p className="mt-3">
                返済方式を選ぶときは、「毎月の支出を安定させたいのか」「総支払額を抑えたいのか」を先に決めることが重要です。自分の条件で比較したい場合は、
                <Link href="/simulator/cardloan" className="font-bold text-stone-900 hover:underline">返済シミュレーター</Link>
                で確認できます。
              </p>
            </section>
          </div>

          <ArticleFooter articleSlug="repayment-method-difference" />
        </div>
      </ArticlePageShell>
    </>
  );
}
