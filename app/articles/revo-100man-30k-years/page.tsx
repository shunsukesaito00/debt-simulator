import type { Metadata } from "next";
import Link from "next/link";
import { ArticleFooter } from "@/app/components/ArticleFooter";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://debt-simulator-quzc.vercel.app";
const ARTICLE_URL = `${BASE}/articles/revo-100man-30k-years`;
const ARTICLE_TITLE =
  "リボ払い100万円を月3万円で返すと何年かかる？完済までの期間と総利息を解説";

export const metadata: Metadata = {
  title: ARTICLE_TITLE,
  description:
    "リボ払い100万円を毎月3万円で返した場合、完済まで何年・何か月かかるのか、総利息はいくらになるのかを年利15%でシミュレーションし、わかりやすく解説します。",
  alternates: { canonical: ARTICLE_URL },
  openGraph: {
    title: ARTICLE_TITLE,
    description:
      "リボ払い100万円を毎月3万円で返した場合、完済まで何年・何か月かかるのか、総利息はいくらになるのかを年利15%でシミュレーションし、わかりやすく解説します。",
    url: ARTICLE_URL,
    type: "article",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: ARTICLE_TITLE,
  description:
    "リボ払い100万円を毎月3万円で返した場合、完済まで何年・何か月かかるのか、総利息はいくらになるのかを年利15%でシミュレーションし、わかりやすく解説します。",
  url: ARTICLE_URL,
  datePublished: "2025-03-11",
  dateModified: "2025-03-11",
  author: { "@type": "Organization", name: "借入返済シミュレーター" },
  publisher: { "@type": "Organization", name: "借入返済シミュレーター" },
};

const tocItems = [
  { id: "conclusion", label: "結論｜月3万円返済だと約4年2か月・総利息は約47.5万円" },
  { id: "why", label: "なぜ月3万円だと完済まで時間がかかるのか" },
  { id: "numbers", label: "月3万円返済の具体的な数字" },
  { id: "compare", label: "月3万円と月5万円を比べるとどう違うか" },
  { id: "risk", label: "月3万円返済の注意点" },
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
            本記事の計算は、一般的な固定金利・毎月一定額返済の近似例です。実際のリボ払い商品では条件により異なる場合があります。
          </p>
          <section className="mt-6 rounded-2xl border border-gray-200 bg-gray-50 p-4">
            <h2 className="text-sm font-black text-gray-900">目次</h2>
            <ul className="mt-2 space-y-1.5 text-sm">
              {tocItems.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className="text-gray-700 hover:underline">{item.label}</a>
                </li>
              ))}
            </ul>
          </section>
          <div className="mt-8 space-y-10 text-sm text-gray-700 leading-relaxed">
            <p>
              リボ払いで100万円を利用している場合、「毎月3万円ずつ返しているけど、いつ頃完済できるのか」「総利息はどれくらいになるのか」が気になる方は多いはずです。毎月の返済額を低く設定すると一見ラクに見えますが、元本の減りが遅く、完済まで長引くうえに利息もかさみやすくなります。
            </p>
            <p>
              この記事では、リボ払い100万円・年利15%を前提に、毎月3万円で返した場合の完済までの期間と総利息をシミュレーションし、月5万円で返す場合との違いもあわせて解説します。実際の条件で確認したい方は、
              <Link href="/simulator/cardloan" className="font-bold text-gray-900 hover:underline">借入返済シミュレーター</Link>
              で試算できます。
            </p>
            <section id="conclusion">
              <h2 className="text-lg font-black text-gray-900 md:text-xl">結論｜月3万円返済だと約4年2か月・総利息は約47.5万円</h2>
              <p className="mt-3">
                結論から言うと、リボ払い100万円を年利15%で毎月3万円ずつ返済する場合、完済までの目安は約50か月（約4年2か月）、総支払額は約147.5万円、総利息は約47.5万円です。
              </p>
              <p className="mt-3">
                つまり、月3万円の返済では、元本100万円を返し終えるまでに4年以上かかり、その間に約47.5万円の利息を支払うことになります。毎月の負担は抑えられますが、完済が長引く分、利息負担は重くなりやすいです。
              </p>
            </section>
            <section id="why">
              <h2 className="text-lg font-black text-gray-900 md:text-xl">なぜ月3万円だと完済まで時間がかかるのか</h2>
              <p className="mt-3">
                リボ払いでは、毎月の返済額のうち一部が利息に充てられ、残りが元本の返済に回ります。月3万円の場合、当初は残高が100万円と大きいため、利息の占める割合が高く、元本に回る金額が少なくなります。そのため、残高がなかなか減りにくく、完済までに約50か月かかります。
              </p>
            </section>
            <section id="numbers">
              <h2 className="text-lg font-black text-gray-900 md:text-xl">月3万円返済の具体的な数字</h2>
              <p className="mt-3">リボ払い100万円・年利15%・毎月3万円返済の場合の目安は次の通りです。</p>
              <div className="mt-6 overflow-x-auto">
                <table className="w-full min-w-[280px] border-collapse text-left">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="py-3 pr-4 font-black text-gray-900">項目</th>
                      <th className="py-3 font-black text-gray-900">目安</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    <tr className="border-b border-gray-200"><td className="py-3 pr-4">完済までの期間</td><td className="py-3">約50か月（約4年2か月）</td></tr>
                    <tr className="border-b border-gray-200"><td className="py-3 pr-4">毎月の返済額</td><td className="py-3">30,000円（固定）</td></tr>
                    <tr className="border-b border-gray-200"><td className="py-3 pr-4">総支払額</td><td className="py-3">約1,475,166円</td></tr>
                    <tr className="border-b border-gray-200"><td className="py-3 pr-4">総利息</td><td className="py-3">約475,166円（約47.5万円）</td></tr>
                  </tbody>
                </table>
              </div>
            </section>
            <section id="compare">
              <h2 className="text-lg font-black text-gray-900 md:text-xl">月3万円と月5万円を比べるとどう違うか</h2>
              <p className="mt-3">同じ100万円・年利15%でも、毎月の返済額を5万円にすると、完済までの期間と総利息は大きく変わります。</p>
              <div className="mt-6 overflow-x-auto">
                <table className="w-full min-w-[320px] border-collapse text-left">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="py-3 pr-4 font-black text-gray-900">毎月返済額</th>
                      <th className="py-3 pr-4 font-black text-gray-900">完済までの目安</th>
                      <th className="py-3 font-black text-gray-900">総利息</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    <tr className="border-b border-gray-200"><td className="py-3 pr-4">30,000円</td><td className="py-3 pr-4">約50か月（約4年2か月）</td><td className="py-3">約47.5万円</td></tr>
                    <tr className="border-b border-gray-200"><td className="py-3 pr-4">50,000円</td><td className="py-3 pr-4">約24か月（約2年）</td><td className="py-3">約18.5万円</td></tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-3">毎月の返済額を2万円上げる（3万円→5万円）だけで、完済は約24か月に短縮され、総利息は約18.5万円に減ります。月2万円多く返すことで、約29万円の利息を抑えられ、完済も約2年早まります。</p>
            </section>
            <section id="risk">
              <h2 className="text-lg font-black text-gray-900 md:text-xl">月3万円返済の注意点</h2>
              <p className="mt-3">月3万円返済は、毎月の負担は軽い一方で、完済まで4年以上かかり、総利息も約47.5万円と大きくなります。可能であれば、毎月の返済額を少しでも上げる、あるいは繰り上げ返済を検討すると、総利息を抑えつつ完済を早めやすくなります。</p>
            </section>
            <section id="simulator">
              <h2 className="text-lg font-black text-gray-900 md:text-xl">自分の条件で確認するならシミュレーターが早い</h2>
              <p className="mt-3">ここまでの数値は「100万円・年利15%・毎月3万円返済」という条件での目安です。自分の条件で完済時期や総利息を確認したい場合は、
                <Link href="/simulator/cardloan" className="font-bold text-gray-900 hover:underline">借入返済シミュレーター</Link>
                で試算できます。
              </p>
              <div className="mt-6">
                <Link href="/simulator/cardloan" className="inline-flex items-center justify-center rounded-2xl bg-gray-900 px-6 py-3 text-sm font-black text-white hover:opacity-90">
                  借入返済シミュレーターで計算する →
                </Link>
              </div>
            </section>
            <section id="notice">
              <h2 className="text-lg font-black text-gray-900 md:text-xl">注意点</h2>
              <p className="mt-3">本記事の試算は、一般的な固定金利・毎月一定額返済の考え方に基づく概算です。実際のリボ払いでは、最低支払額のルール、金利の変動、手数料などが影響する場合があります。正確な返済条件は、利用中のカードやローン商品の約款・明細を確認してください。</p>
            </section>
            <section id="faq">
              <h2 className="text-lg font-black text-gray-900 md:text-xl">よくある質問</h2>
              <div className="mt-4 space-y-6">
                <div><h3 className="text-base font-black text-gray-900">リボ100万円を月3万円で返すと何年かかりますか？</h3><p className="mt-2">年利15%の目安では、完済まで約50か月（約4年2か月）です。</p></div>
                <div><h3 className="text-base font-black text-gray-900">月3万円返済だと総利息はいくらになりますか？</h3><p className="mt-2">100万円・年利15%で毎月3万円返済の場合、総利息の目安は約47.5万円です。毎月5万円にすると約18.5万円まで減らせます。</p></div>
                <div><h3 className="text-base font-black text-gray-900">早く完済するにはどうすればいいですか？</h3><p className="mt-2">毎月の返済額を増やす、あるいは繰り上げ返済をすると、完済が早まり総利息も減りやすくなります。</p></div>
              </div>
            </section>
            <section id="summary">
              <h2 className="text-lg font-black text-gray-900 md:text-xl">まとめ</h2>
              <p className="mt-3">リボ払い100万円を毎月3万円で返す場合、年利15%では完済まで約4年2か月、総利息は約47.5万円が目安です。可能であれば返済額を上げるか繰り上げ返済を検討すると、総利息を抑えつつ完済を早めやすくなります。自分の条件で試算したい場合は<Link href="/simulator/cardloan" className="font-bold text-gray-900 hover:underline">借入返済シミュレーター</Link>で確認できます。</p>
            </section>
          </div>
          <ArticleFooter articleSlug="revo-100man-30k-years" />
        </div>
      </article>
    </>
  );
}
