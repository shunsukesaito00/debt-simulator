import type { Metadata } from "next";
import Link from "next/link";
import { ArticleFooter } from "@/app/components/ArticleFooter";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://debt-simulator-quzc.vercel.app";
const ARTICLE_URL = `${BASE}/articles/monthly-30000-how-much-can-borrow`;
const ARTICLE_TITLE =
  "月3万円返済ならいくらまで借りられる？年利15%で3年・5年・7年の目安を解説";

export const metadata: Metadata = {
  title: ARTICLE_TITLE,
  description:
    "毎月3万円返済できる場合、年利15%を前提に何万円くらいまで借りると現実的かを、3年・5年・7年返済の比較でわかりやすく解説します。",
  alternates: { canonical: ARTICLE_URL },
  openGraph: {
    title: ARTICLE_TITLE,
    description:
      "毎月3万円返済できる場合、年利15%を前提に何万円くらいまで借りると現実的かを、3年・5年・7年返済の比較でわかりやすく解説します。",
    url: ARTICLE_URL,
    type: "article",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: ARTICLE_TITLE,
  description:
    "毎月3万円返済できる場合、年利15%を前提に何万円くらいまで借りると現実的かを、3年・5年・7年返済の比較でわかりやすく解説します。",
  url: ARTICLE_URL,
  datePublished: "2025-03-11",
  dateModified: "2025-03-11",
  author: { "@type": "Organization", name: "借入返済シミュレーター" },
  publisher: { "@type": "Organization", name: "借入返済シミュレーター" },
};

const tocItems = [
  { id: "conclusion", label: "結論｜月3万円返済なら借入額の目安" },
  { id: "3years", label: "3年返済ならいくらまでが目安か" },
  { id: "5years", label: "5年返済ならいくらまでが目安か" },
  { id: "7years", label: "7年返済ならいくらまでが目安か" },
  { id: "compare", label: "3年・5年・7年返済を比較するとどう違うか" },
  { id: "simulator", label: "自分の条件で確認するならシミュレーターが早い" },
  { id: "notice", label: "注意点" },
  { id: "summary", label: "まとめ" },
];

/** 年利15%・元利均等で月3万返済時の借入額目安（概算） */
const TABLE_ROWS = [
  { years: 3, principalMan: 90, totalInterestMan: 18 },
  { years: 5, principalMan: 126, totalInterestMan: 54 },
  { years: 7, principalMan: 154, totalInterestMan: 98 },
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
            本記事で扱うのは返済計画上の目安であり、審査上の借入可能額を示すものではありません。年利15%・元利均等の近似例です。
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
              毎月3万円までなら返済に充てられそうだと考えたとき、「それならいくらまで借りると現実的なのか」が気になる方は多いはずです。この記事では、毎月3万円返済を前提に、年利15%で3年・5年・7年返済した場合の借入額の目安を整理します。
            </p>

            <section id="conclusion">
              <h2 className="text-lg font-black text-gray-900 md:text-xl">結論｜月3万円返済なら借入額の目安</h2>
              <p className="mt-3">
                年利15%・元利均等の近似では、毎月3万円返済できる場合、<strong className="font-bold text-gray-900">3年返済なら約90万円、5年返済なら約126万円、7年返済なら約154万円</strong>が借入額の目安です。
              </p>
              <p className="mt-3">
                返済期間を長くすると借入額の目安は増えますが、総利息も増えます。月々の負担だけでなく、総支払額まで見て判断することが大切です。
              </p>
            </section>

            <section id="3years">
              <h2 className="text-lg font-black text-gray-900 md:text-xl">3年返済ならいくらまでが目安か</h2>
              <p className="mt-3">
                毎月3万円を3年（36回）返済する場合、年利15%では借入額の目安は約90万円です。総利息は約18万円程度です。
              </p>
            </section>

            <section id="5years">
              <h2 className="text-lg font-black text-gray-900 md:text-xl">5年返済ならいくらまでが目安か</h2>
              <p className="mt-3">
                毎月3万円を5年（60回）返済する場合、年利15%では借入額の目安は約126万円です。総利息は約54万円程度となり、3年返済より利息負担が大きくなります。
              </p>
            </section>

            <section id="7years">
              <h2 className="text-lg font-black text-gray-900 md:text-xl">7年返済ならいくらまでが目安か</h2>
              <p className="mt-3">
                毎月3万円を7年（84回）返済する場合、年利15%では借入額の目安は約154万円です。総利息は約98万円程度と、返済期間が長いほど利息が重くなります。
              </p>
            </section>

            <section id="compare">
              <h2 className="text-lg font-black text-gray-900 md:text-xl">3年・5年・7年返済を比較するとどう違うか</h2>
              <p className="mt-3">
                同じ月3万円返済でも、返済期間を延ばすと借入額の目安は増えますが、総利息も大きく増えます。
              </p>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full min-w-[320px] text-sm border border-gray-200">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="py-2 px-3 text-left font-bold text-gray-900">返済期間</th>
                      <th className="py-2 px-3 text-right font-bold text-gray-900">借入額目安</th>
                      <th className="py-2 px-3 text-right font-bold text-gray-900">総利息目安</th>
                    </tr>
                  </thead>
                  <tbody>
                    {TABLE_ROWS.map((r) => (
                      <tr key={r.years} className="border-b border-gray-100">
                        <td className="py-2 px-3">{r.years}年</td>
                        <td className="py-2 px-3 text-right">約{r.principalMan}万円</td>
                        <td className="py-2 px-3 text-right">約{r.totalInterestMan}万円</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section id="simulator">
              <h2 className="text-lg font-black text-gray-900 md:text-xl">自分の条件で確認するならシミュレーターが早い</h2>
              <p className="mt-3">
                金利や返済期間を変えた場合の目安は、
                <Link href="/simulator/cardloan" className="font-bold text-gray-900 hover:underline">借入返済シミュレーター</Link>
                の「定額元利」で毎月返済額を3万円に設定すると試せます。
              </p>
              <div className="mt-4">
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
                本記事の数値は試算の目安です。実際の返済額・総利息は金融機関の計算方法（端数処理・約定日等）により異なります。重要な判断は契約内容を優先し、必要に応じて専門家にご相談ください。
              </p>
            </section>

            <section id="summary">
              <h2 className="text-lg font-black text-gray-900 md:text-xl">まとめ</h2>
              <p className="mt-3">
                毎月3万円返済できる場合、年利15%の目安では3年で約90万円、5年で約126万円、7年で約154万円が借入額の目安です。返済期間を延ばすと借入額は増えますが総利息も増えるため、自分の条件では
                <Link href="/simulator/cardloan" className="font-bold text-gray-900 hover:underline">シミュレーター</Link>
                で確認することをおすすめします。
              </p>
            </section>
          </div>

          <ArticleFooter articleSlug="monthly-30000-how-much-can-borrow" />
        </div>
      </article>
    </>
  );
}
