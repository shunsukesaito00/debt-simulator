import type { Metadata } from "next";
import Link from "next/link";
import { ArticleFooter } from "@/app/components/ArticleFooter";
import { ArticlePagePremise, ArticleReadingPoints, ArticleEditorMemo } from "@/app/components/article";
import { getArticleBreadcrumbJsonLd, getArticleFaqJsonLd } from "@/lib/article-structured-data";
import { getArticle, type ArticleItem } from "@/lib/articles";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://debt-simulator-quzc.vercel.app";
const ARTICLE_URL = `${BASE}/articles/loan-amount-guide`;
const ARTICLE_TITLE =
  "借入額別に見る返済負担の違い｜100万・200万・300万で比較";

export const metadata: Metadata = {
  title: ARTICLE_TITLE,
  description:
    "借入額100万円・200万円・300万円で、月々返済額、完済までの期間、総利息がどう変わるかをわかりやすく整理して解説します。",
  alternates: { canonical: ARTICLE_URL },
  openGraph: {
    title: ARTICLE_TITLE,
    description:
      "借入額100万円・200万円・300万円で、月々返済額、完済までの期間、総利息がどう変わるかをわかりやすく整理して解説します。",
    url: ARTICLE_URL,
    type: "article",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: ARTICLE_TITLE,
  description:
    "借入額100万円・200万円・300万円で、月々返済額、完済までの期間、総利息がどう変わるかをわかりやすく整理して解説します。",
  url: ARTICLE_URL,
  datePublished: "2025-03-08",
  dateModified: "2025-03-08",
  author: { "@type": "Organization", name: "借入返済シミュレーター" },
  publisher: { "@type": "Organization", name: "借入返済シミュレーター" },
};

const faqItems = [
  {
    question: "借入額が増えると何が一番重くなりますか？",
    answer:
      "毎月返済額、総利息、完済までの期間のすべてが重くなります。特に返済期間が長引くと利息負担が増えやすくなります。",
  },
  {
    question: "100万円と200万円では返済負担はどれくらい違いますか？",
    answer:
      "年利15%・5年返済の近似例では、毎月返済額は約23,790円と約47,580円、総利息は約427,396円と約854,792円です。",
  },
  {
    question: "借入額はどう決めるのが安全ですか？",
    answer:
      "借りたい額からではなく、毎月いくら返せるかから逆算して考える方が安全です。総支払額と完済までの期間まで含めて確認することが重要です。",
  },
  {
    question: "借入額を決めるときに、金利の違いはどれくらい影響しますか？",
    answer:
      "金利が高いほど利息に回る割合が増え、同じ借入額でも総支払額が大きくなります。たとえば年利10%と15%では、借入額が同じでも総利息に数十万円の差が出ることがあります。",
  },
  {
    question: "借入額100万円と300万円で迷ったら、どう判断すればよいですか？",
    answer:
      "まず毎月無理なく返済できる額を確認し、そこから逆算して借入額を決めるのが基本です。必要最低限の額に抑え、総利息と完済期間まで比較して判断することが大切です。",
  },
];

const breadcrumbJsonLd = getArticleBreadcrumbJsonLd(ARTICLE_URL, ARTICLE_TITLE);
const faqJsonLd = getArticleFaqJsonLd(faqItems);

const tocItems = [
  { id: "premise", label: "このページの前提" },
  { id: "conclusion", label: "結論｜借入額が増えるほど返済負担は重くなる" },
  { id: "monthly-vs-total", label: "まず確認したいのは「月々」と「総額」の両方" },
  { id: "100man", label: "借入100万円の返済負担" },
  { id: "200man", label: "借入200万円の返済負担" },
  { id: "300man", label: "借入300万円の返済負担" },
  { id: "reading-points", label: "読み方のポイント" },
  { id: "compare-table", label: "借入額別に比較すると何が違うか" },
  { id: "reverse", label: "借入額を決めるときに大事なのは「逆算」" },
  { id: "category-read", label: "このカテゴリで読むべき記事" },
  { id: "simulator", label: "迷ったらシミュレーターで比較するのが早い" },
  { id: "notice", label: "注意点" },
  { id: "editor-memo", label: "編集メモ" },
  { id: "faq", label: "よくある質問" },
  { id: "summary", label: "まとめ" },
];

const CATEGORY_READ_SLUGS = [
  "borrow-100-interest",
  "borrow-200-monthly-payment",
  "monthly-50000-interest-at-15percent",
  "monthly-50000-how-much-can-borrow",
] as const;

function CategoryReadBlock() {
  const articles = CATEGORY_READ_SLUGS.map((slug) => getArticle(slug)).filter(
    (a): a is ArticleItem => a != null
  );
  if (articles.length === 0) return null;
  return (
    <section id="category-read">
      <h2 className="text-lg font-black text-gray-900 md:text-xl">
        このカテゴリで読むべき記事
      </h2>
      <p className="mt-3 text-sm text-gray-700 leading-relaxed">
        借入額別カテゴリでは、次の記事もあわせて読むと理解が深まります。
      </p>
      <ul className="mt-4 space-y-3">
        {articles.map((a) => (
          <li key={a.slug}>
            <Link
              href={`/articles/${a.slug}`}
              className="block rounded-xl border border-gray-200 bg-gray-50 p-4 transition hover:bg-gray-100"
            >
              <span className="text-sm font-bold text-gray-900">{a.title}</span>
              <p className="mt-1 text-xs text-gray-600 line-clamp-2">{a.summary}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** 5年返済比較（年利15%・元利均等の近似例） */
const table5Years = [
  { amount: "100万円", monthly: "約23,790円", interest: "約427,396円", note: "現実的に返しやすいが、利息は無視できない" },
  { amount: "200万円", monthly: "約47,580円", interest: "約854,792円", note: "毎月返済額と総利息がかなり重くなる" },
  { amount: "300万円", monthly: "約71,370円", interest: "約1,282,188円", note: "長期化しやすく、利息負担も急増しやすい" },
];

/** 毎月5万円返済固定での比較（年利15%の近似例） */
const table50kFixed = [
  { amount: "100万円", months: "約24か月", interest: "約157,947円", note: "返済額を厚くできると総利息を抑えやすい" },
  { amount: "200万円", months: "約56か月", interest: "約789,932円", note: "月5万円でも長期化しやすい" },
  { amount: "300万円", months: "約112か月", interest: "約2,579,838円", note: "返済期間が長くなり総利息が急増" },
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
            <li>
              <Link href="/" className="hover:underline">
                トップ
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link href="/articles" className="hover:underline">
                知っておきたいこと
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className="font-bold text-gray-900" aria-current="page">
              {ARTICLE_TITLE}
            </li>
          </ol>
        </nav>

        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-soft md:p-8">
          <h1 className="text-2xl font-black text-gray-900 md:text-3xl">
            {ARTICLE_TITLE}
          </h1>
          <p className="mt-4 text-sm text-gray-600 leading-relaxed">
            本記事の比較は、一般的な固定金利・毎月返済の考え方に基づく概算です。実際の商品や契約条件によって異なる場合があります。
          </p>

          <section id="premise" className="mt-6">
            <ArticlePagePremise
              comparisonConditions={[
                "年利15%・元利均等返済の近似例で比較している",
                "借入額100万円・200万円・300万円の3パターンで整理している",
                "5年返済と毎月5万円返済固定の2パターンで比較している",
              ]}
              reasonForConditions="年利15%はカードローンやリボ払いの一般的な水準です。100万・200万・300万は借入額として相談の多い金額帯であり、比較単位として選んでいます。概算値であり、実際の商品や契約条件によって異なります。"
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
              借入額が100万円なのか、200万円なのか、300万円なのかで、返済負担は大きく変わります。借入額が増えれば元本が増えるだけでなく、月々返済額、総利息、完済までの期間も重くなりやすくなります。
            </p>
            <p>
              この記事では、借入額100万円・200万円・300万円を例に、返済負担の違いを整理します。必要に応じて、詳しい個別記事へリンクしながら、借入額別カテゴリの親記事として全体像がわかる構成にしています。
            </p>

            <section id="conclusion">
              <h2 className="text-lg font-black text-gray-900 md:text-xl">
                結論｜借入額が増えるほど返済負担は重くなる
              </h2>
              <p className="mt-3">
                結論から言うと、借入額が増えるほど、月々返済額、総利息、完済までの期間は重くなります。特に、借入額が増えると利息負担は単純に元本が増える以上に重く感じやすくなります。
              </p>
              <p className="mt-3">
                つまり、借入額を見るときは「借りられるか」だけでなく、「毎月いくら返すことになるか」「最終的にいくら払うか」まで見ることが重要です。
              </p>
            </section>

            <section id="monthly-vs-total">
              <h2 className="text-lg font-black text-gray-900 md:text-xl">
                まず確認したいのは「月々」と「総額」の両方
              </h2>
              <p className="mt-3">
                借入額別の負担を考えるときに最初に整理したいのは、毎月返済額と総支払額の両方を見ることです。月々だけを見ていると、長期返済による利息の重さを見落としやすくなります。
              </p>
              <p className="mt-3">
                逆に総額だけ見ても、毎月の家計に収まるかは判断できません。借入額別の比較では、この2つをセットで見ることが大切です。返済期間が長いほど利息が重くなりやすい点は、
                <Link
                  href="/articles/100man-100months-risk-at-15percent"
                  className="font-bold text-gray-900 hover:underline"
                >
                  金利15%で100万円を100ヶ月返済するリスクとは？
                </Link>
                でも解説しています。
              </p>
            </section>

            <section id="100man">
              <h2 className="text-lg font-black text-gray-900 md:text-xl">
                借入100万円の返済負担
              </h2>
              <p className="mt-3">
                年利15%・5年返済の近似例では、借入100万円の毎月返済額は約23,790円、総利息は約427,396円です。借入額としては比較的小さいですが、それでも利息は40万円を超えます。
              </p>
              <p className="mt-3">
                また、毎月5万円返済に固定すると、完済までの目安は約24か月、総利息は約157,947円です。返済額を厚くできるなら、総利息はかなり抑えやすくなります。詳しくは
                <Link
                  href="/articles/borrow-100-interest"
                  className="font-bold text-gray-900 hover:underline"
                >
                  借金100万円の利息はいくら？年利15%での返済額をシミュレーション
                </Link>
                をご覧ください。
              </p>
            </section>

            <section id="200man">
              <h2 className="text-lg font-black text-gray-900 md:text-xl">
                借入200万円の返済負担
              </h2>
              <p className="mt-3">
                年利15%・5年返済の近似例では、借入200万円の毎月返済額は約47,580円、総利息は約854,792円です。借入100万円の約2倍の元本ですが、利息負担もかなり重く感じやすい水準になります。
              </p>
              <p className="mt-3">
                また、毎月5万円返済に固定した場合、完済までの目安は約56か月、総利息は約789,932円です。借入額が200万円になると、月5万円返済でもかなり長期化しやすくなります。詳しくは
                <Link
                  href="/articles/borrow-200-monthly-payment"
                  className="font-bold text-gray-900 hover:underline"
                >
                  借金200万円の月々返済はいくら？年利15%で3年・5年返済を比較
                </Link>
                をご覧ください。
              </p>
            </section>

            <section id="300man">
              <h2 className="text-lg font-black text-gray-900 md:text-xl">
                借入300万円の返済負担
              </h2>
              <p className="mt-3">
                年利15%・5年返済の近似例では、借入300万円の毎月返済額は約71,370円、総利息は約1,282,188円です。借入100万円や200万円と比べて、毎月返済額も総利息も一段と重くなります。
              </p>
              <p className="mt-3">
                さらに、毎月5万円返済に固定した場合、完済までの目安は約112か月、総利息は約2,579,838円です。借入額が大きいと、毎月返済額を抑えた途端に返済期間が大幅に長くなり、総利息も急増します。詳しくは
                <Link
                  href="/articles/monthly-50000-interest-at-15percent"
                  className="font-bold text-gray-900 hover:underline"
                >
                  借金返済が月5万円・金利15%なら総利息はいくら？借入額別に比較
                </Link>
                をご覧ください。
              </p>
            </section>

            <section id="reading-points">
              <ArticleReadingPoints
                points={[
                  {
                    label: "月々返済額と総支払額の両方を見る",
                    body: "月々だけ見ると長期返済の利息を見落としやすく、総額だけ見ると家計に収まるか判断できません。両方セットで確認してください。",
                  },
                  {
                    label: "借入額が増えるほど利息負担は重くなりやすい",
                    body: "元本が2倍になると利息も比例して増えます。さらに返済期間が長引くと利息が加速度的に膨らむケースがあります。",
                  },
                  {
                    label: "借りたい額ではなく返せる額から逆算する",
                    body: "「いくら借りられるか」より「毎月いくら返せるか」から考える方が、無理のない借入額を見つけやすくなります。",
                  },
                ]}
                misconceptions={[
                  "「借入額が2倍なら返済額も2倍で済む」と思いがちですが、返済期間が長くなると利息が上乗せされ、2倍以上に重く感じやすくなります。",
                  "「月々返済額が小さければ安心」と考えがちですが、返済期間が長いほど総利息は大きくなるため、総額まで確認することが重要です。",
                ]}
              />
            </section>

            <section id="compare-table">
              <h2 className="text-lg font-black text-gray-900 md:text-xl">
                借入額別に比較すると何が違うか
              </h2>
              <p className="mt-3">
                借入額別の返済負担を、5年返済と毎月5万円返済固定の2パターンで整理しました。いずれも年利15%・元利均等の近似例です。
              </p>

              <h3 className="mt-6 text-base font-black text-gray-900">5年返済での比較</h3>
              <div className="mt-3 overflow-x-auto">
                <table className="w-full min-w-[520px] border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="py-3 pr-4 font-black text-gray-900">借入額</th>
                      <th className="py-3 pr-4 font-black text-gray-900">毎月返済額</th>
                      <th className="py-3 pr-4 font-black text-gray-900">総利息</th>
                      <th className="py-3 font-black text-gray-900">特徴</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    {table5Years.map((row) => (
                      <tr key={row.amount} className="border-b border-gray-200">
                        <td className="py-3 pr-4 font-bold text-gray-900">{row.amount}</td>
                        <td className="py-3 pr-4">{row.monthly}</td>
                        <td className="py-3 pr-4">{row.interest}</td>
                        <td className="py-3">{row.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h3 className="mt-8 text-base font-black text-gray-900">毎月5万円返済固定での比較</h3>
              <div className="mt-3 overflow-x-auto">
                <table className="w-full min-w-[520px] border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="py-3 pr-4 font-black text-gray-900">借入額</th>
                      <th className="py-3 pr-4 font-black text-gray-900">完済までの目安</th>
                      <th className="py-3 pr-4 font-black text-gray-900">総利息</th>
                      <th className="py-3 font-black text-gray-900">特徴</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    {table50kFixed.map((row) => (
                      <tr key={row.amount} className="border-b border-gray-200">
                        <td className="py-3 pr-4 font-bold text-gray-900">{row.amount}</td>
                        <td className="py-3 pr-4">{row.months}</td>
                        <td className="py-3 pr-4">{row.interest}</td>
                        <td className="py-3">{row.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section id="reverse">
              <h2 className="text-lg font-black text-gray-900 md:text-xl">
                借入額を決めるときに大事なのは「逆算」
              </h2>
              <p className="mt-3">
                借入額は「いくら必要か」だけで決めると危険です。大切なのは、「毎月いくら返せるか」から逆算して考えることです。
              </p>
              <p className="mt-3">
                毎月5万円返済できるとしても、何年で返すか、金利がいくらかによって、無理のない借入額は変わります。詳しくは
                <Link
                  href="/articles/monthly-50000-how-much-can-borrow"
                  className="font-bold text-gray-900 hover:underline"
                >
                  借金返済が月5万円ならいくらまで借りられる？返済額から逆算する目安を解説
                </Link>
                や
                <Link
                  href="/articles/fixed-monthly-payment-borrowing-reverse-calculator"
                  className="font-bold text-gray-900 hover:underline"
                >
                  月々返済額を固定すると借入額はいくら？返済額から逆算する考え方を解説
                </Link>
                をご覧ください。
              </p>
            </section>

            <CategoryReadBlock />

            <section id="simulator">
              <h2 className="text-lg font-black text-gray-900 md:text-xl">
                迷ったらシミュレーターで比較するのが早い
              </h2>
              <p className="mt-3">
                借入額別の違いは、言葉だけで理解するより、実際に数字で比較した方がわかりやすいです。借入額、金利、返済期間、返済方式、追加返済の有無によって結果は大きく変わります。
              </p>
              <p className="mt-3">
                そのため、最終的には自分の条件を入れて確認するのが一番確実です。次の
                <Link href="/simulator/cardloan" className="font-bold text-gray-900 hover:underline">
                  借入返済シミュレーター
                </Link>
                では、借入額や金利、返済期間を変えながら、月々の返済額や総利息を比較できます。
              </p>
              <div className="mt-6">
                <Link
                  href="/simulator/cardloan"
                  className="inline-flex items-center justify-center rounded-2xl bg-gray-900 px-6 py-3 text-sm font-black text-white hover:opacity-90"
                >
                  借入返済シミュレーターで比較する →
                </Link>
              </div>
            </section>

            <section id="notice">
              <h2 className="text-lg font-black text-gray-900 md:text-xl">
                注意点
              </h2>
              <p className="mt-3">
                本記事で紹介する比較は、一般的な固定金利・毎月返済の考え方に基づくものです。実際のローンやカードローンでは、日割り計算、約定返済日、手数料、最低返済額ルール、商品ごとの返済仕様などが影響する場合があります。
              </p>
              <p className="mt-3">
                正確な条件は、契約中または検討中の金融商品の説明書や公式情報を確認してください。
              </p>
            </section>

            <section id="editor-memo">
              <ArticleEditorMemo
                purpose="借入額100万・200万・300万の返済負担を横並びで比較し、借入額選びの判断材料を提供するために書いています。"
                reasonAxis="年利15%・5年返済と毎月5万円返済固定の2パターンで比較しているのは、返済期間固定と返済額固定の両面から負担の違いを見せるためです。"
                memo="借入額別カテゴリのピラー記事として、個別記事（100万・200万・300万）や逆算記事への導線を担っています。"
              />
            </section>

            <section id="faq">
              <h2 className="text-lg font-black text-gray-900 md:text-xl">
                よくある質問
              </h2>
              <div className="mt-4 space-y-6">
                <div>
                  <h3 className="text-base font-black text-gray-900">
                    借入額が増えると何が一番重くなりますか？
                  </h3>
                  <p className="mt-2">
                    毎月返済額、総利息、完済までの期間のすべてが重くなります。特に返済期間が長引くと利息負担が増えやすくなります。
                  </p>
                </div>
                <div>
                  <h3 className="text-base font-black text-gray-900">
                    100万円と200万円では返済負担はどれくらい違いますか？
                  </h3>
                  <p className="mt-2">
                    年利15%・5年返済の近似例では、毎月返済額は約23,790円と約47,580円、総利息は約427,396円と約854,792円です。
                  </p>
                </div>
                <div>
                  <h3 className="text-base font-black text-gray-900">
                    借入額はどう決めるのが安全ですか？
                  </h3>
                  <p className="mt-2">
                    借りたい額からではなく、毎月いくら返せるかから逆算して考える方が安全です。総支払額と完済までの期間まで含めて確認することが重要です。
                  </p>
                </div>
                <div>
                  <h3 className="text-base font-black text-gray-900">
                    借入額を決めるときに、金利の違いはどれくらい影響しますか？
                  </h3>
                  <p className="mt-2">
                    金利が高いほど利息に回る割合が増え、同じ借入額でも総支払額が大きくなります。たとえば年利10%と15%では、借入額が同じでも総利息に数十万円の差が出ることがあります。
                  </p>
                </div>
                <div>
                  <h3 className="text-base font-black text-gray-900">
                    借入額100万円と300万円で迷ったら、どう判断すればよいですか？
                  </h3>
                  <p className="mt-2">
                    まず毎月無理なく返済できる額を確認し、そこから逆算して借入額を決めるのが基本です。必要最低限の額に抑え、総利息と完済期間まで比較して判断することが大切です。
                  </p>
                </div>
              </div>
            </section>

            <section id="summary">
              <h2 className="text-lg font-black text-gray-900 md:text-xl">
                まとめ
              </h2>
              <p className="mt-3">
                借入額100万円・200万円・300万円では、月々返済額、総利息、完済までの期間が大きく変わります。借入額が増えるほど、毎月の負担だけでなく、総支払額の重さも増していきます。
              </p>
              <p className="mt-3">
                大切なのは、「いくら借りられるか」ではなく、「その借入額を無理なく返せるか」を見ることです。自分の条件で試算したい場合は、
                <Link href="/simulator/cardloan" className="font-bold text-gray-900 hover:underline">
                  返済シミュレーター
                </Link>
                で確認できます。
              </p>
              <div className="mt-6">
                <Link
                  href="/simulator/cardloan"
                  className="inline-flex items-center justify-center rounded-2xl bg-gray-900 px-6 py-3 text-sm font-black text-white hover:opacity-90"
                >
                  借入返済シミュレーターで比較する →
                </Link>
              </div>
            </section>
          </div>

          <ArticleFooter articleSlug="loan-amount-guide" />
        </div>
      </article>
    </>
  );
}
