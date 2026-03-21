import type { Metadata } from "next";
import Link from "next/link";
import { ArticleFooter } from "@/app/components/ArticleFooter";
import { ArticlePagePremise, ArticleReadingPoints, ArticleEditorMemo } from "@/app/components/article";
import { getArticleBreadcrumbJsonLd, getArticleFaqJsonLd } from "@/lib/article-structured-data";
import { ARTICLE_AUTHOR_JSON_LD, ARTICLE_PUBLISHER_JSON_LD } from "@/lib/site-author";
import { ArticlePageShell } from "@/app/components/ArticlePageShell";
import { articleUsesWideLayout } from "@/lib/article-layout";


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
  author: ARTICLE_AUTHOR_JSON_LD,
  publisher: ARTICLE_PUBLISHER_JSON_LD,
};

const faqItems = [
  {
    question: "リボ100万円を月3万円で返すと何年かかりますか？",
    answer: "年利15%の目安では、完済まで約50か月（約4年2か月）です。",
  },
  {
    question: "月3万円返済だと総利息はいくらになりますか？",
    answer:
      "100万円・年利15%で毎月3万円返済の場合、総利息の目安は約47.5万円です。毎月5万円にすると約18.5万円まで減らせます。",
  },
  {
    question: "早く完済するにはどうすればいいですか？",
    answer: "毎月の返済額を増やす、あるいは繰り上げ返済をすると、完済が早まり総利息も減りやすくなります。",
  },
  {
    question: "月3万円から月5万円に増やすと総利息はどれくらい変わりますか？",
    answer:
      "100万円・年利15%の場合、月3万円では総利息約47.5万円ですが、月5万円にすると約18.5万円まで減ります。月2万円の増額で総利息が約29万円も減り、完済も約2年早まります。",
  },
  {
    question: "途中で返済額を増やした場合、効果はありますか？",
    answer:
      "途中からでも返済額を増やせば、その時点から元本の減りが早くなるため効果はあります。残高が大きい時期ほど利息への影響が大きいため、できるだけ早い段階で増額するほど総利息を抑えやすくなります。",
  },
];

const breadcrumbJsonLd = getArticleBreadcrumbJsonLd(ARTICLE_URL, ARTICLE_TITLE);
const faqJsonLd = getArticleFaqJsonLd(faqItems);

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

      
      <ArticlePageShell currentPageTitle={ARTICLE_TITLE} wide={articleUsesWideLayout("revo-100man-30k-years")}>
<div className="ds-card ds-card-pad">
          <h1 className="text-2xl font-semibold text-stone-900 md:text-3xl">{ARTICLE_TITLE}</h1>
          <p className="mt-4 text-sm text-stone-600 leading-relaxed">
            本記事の計算は、一般的な固定金利・毎月一定額返済の近似例です。実際のリボ払い商品では条件により異なる場合があります。
          </p>

          <section id="premise" className="mt-6">
            <ArticlePagePremise
              comparisonConditions={[
                "リボ払い残高100万円・年利15%・毎月3万円返済を前提に計算する",
                "固定金利・毎月一定額返済（定額元利方式）の近似で試算する",
                "比較対象として毎月5万円返済のケースも併記する",
              ]}
              reasonForConditions="年利15%はリボ払いで一般的な水準であり、月3万円は最低返済額に近い設定として選んでいます。月5万円との比較で、返済額の違いが完済期間・総利息にどう影響するかを示します。"
            />
          </section>

          <section className="mt-6 ds-subcard p-4">
            <h2 className="text-sm font-semibold text-stone-900">目次</h2>
            <ul className="mt-2 space-y-1.5 text-sm">
              {tocItems.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className="text-stone-700 hover:underline">{item.label}</a>
                </li>
              ))}
            </ul>
          </section>
          <div className="mt-8 space-y-10 text-sm text-stone-700 leading-relaxed">
            <p>
              リボ払いで100万円を利用している場合、「毎月3万円ずつ返しているけど、いつ頃完済できるのか」「総利息はどれくらいになるのか」が気になる方は多いはずです。毎月の返済額を低く設定すると一見ラクに見えますが、元本の減りが遅く、完済まで長引くうえに利息もかさみやすくなります。
            </p>
            <p>
              この記事では、リボ払い100万円・年利15%を前提に、毎月3万円で返した場合の完済までの期間と総利息をシミュレーションし、月5万円で返す場合との違いもあわせて解説します。実際の条件で確認したい方は、
              <Link href="/simulator/cardloan" className="font-bold text-stone-900 hover:underline">借入返済シミュレーター</Link>
              で試算できます。
            </p>
            <section id="conclusion">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">結論｜月3万円返済だと約4年2か月・総利息は約47.5万円</h2>
              <p className="mt-3">
                結論から言うと、リボ払い100万円を年利15%で毎月3万円ずつ返済する場合、完済までの目安は約50か月（約4年2か月）、総支払額は約147.5万円、総利息は約47.5万円です。
              </p>
              <p className="mt-3">
                つまり、月3万円の返済では、元本100万円を返し終えるまでに4年以上かかり、その間に約47.5万円の利息を支払うことになります。毎月の負担は抑えられますが、完済が長引く分、利息負担は重くなりやすいです。
              </p>
            </section>

            <section id="reading-points">
              <ArticleReadingPoints
                points={[
                  {
                    label: "月3万円だと完済まで約4年2か月かかる",
                    body: "毎月の返済額が低いと、元本の減りが遅く完済まで長引きます。月3万円では約50か月・総利息約47.5万円が目安です。",
                  },
                  {
                    label: "返済初期ほど利息の割合が大きい",
                    body: "残高が大きい初期は、返済額のうち利息が占める割合が高く、元本に充当される金額が少なくなります。",
                  },
                  {
                    label: "返済額を月2万円上げるだけで総利息が約29万円減る",
                    body: "月5万円に引き上げると、完済は約24か月に短縮され、総利息は約18.5万円まで下がります。",
                  },
                ]}
                misconceptions={[
                  "「月3万円返していれば問題ない」と思いがちですが、完済まで4年以上かかり総利息は約47.5万円に達します。",
                  "「利息はそこまで大きくならない」と思いがちですが、リボ払いでは返済期間が長いほど利息が累積します。",
                ]}
              />
            </section>

            <section id="why">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">なぜ月3万円だと完済まで時間がかかるのか</h2>
              <p className="mt-3">
                リボ払いでは、毎月の返済額のうち一部が利息に充てられ、残りが元本の返済に回ります。月3万円の場合、当初は残高が100万円と大きいため、利息の占める割合が高く、元本に回る金額が少なくなります。そのため、残高がなかなか減りにくく、完済までに約50か月かかります。
              </p>
            </section>
            <section id="numbers">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">月3万円返済の具体的な数字</h2>
              <p className="mt-3">リボ払い100万円・年利15%・毎月3万円返済の場合の目安は次の通りです。</p>
              <div className="mt-6 overflow-x-auto">
                <table className="w-full min-w-[280px] border-collapse text-left">
                  <thead>
                    <tr className="border-b-2 border-stone-200">
                      <th className="py-3 pr-4 font-semibold text-stone-900">項目</th>
                      <th className="py-3 font-semibold text-stone-900">目安</th>
                    </tr>
                  </thead>
                  <tbody className="text-stone-700">
                    <tr className="border-b border-stone-200"><td className="py-3 pr-4">完済までの期間</td><td className="py-3">約50か月（約4年2か月）</td></tr>
                    <tr className="border-b border-stone-200"><td className="py-3 pr-4">毎月の返済額</td><td className="py-3">30,000円（固定）</td></tr>
                    <tr className="border-b border-stone-200"><td className="py-3 pr-4">総支払額</td><td className="py-3">約1,475,166円</td></tr>
                    <tr className="border-b border-stone-200"><td className="py-3 pr-4">総利息</td><td className="py-3">約475,166円（約47.5万円）</td></tr>
                  </tbody>
                </table>
              </div>
            </section>
            <section id="compare">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">月3万円と月5万円を比べるとどう違うか</h2>
              <p className="mt-3">同じ100万円・年利15%でも、毎月の返済額を5万円にすると、完済までの期間と総利息は大きく変わります。</p>
              <div className="mt-6 overflow-x-auto">
                <table className="w-full min-w-[320px] border-collapse text-left">
                  <thead>
                    <tr className="border-b-2 border-stone-200">
                      <th className="py-3 pr-4 font-semibold text-stone-900">毎月返済額</th>
                      <th className="py-3 pr-4 font-semibold text-stone-900">完済までの目安</th>
                      <th className="py-3 font-semibold text-stone-900">総利息</th>
                    </tr>
                  </thead>
                  <tbody className="text-stone-700">
                    <tr className="border-b border-stone-200"><td className="py-3 pr-4">30,000円</td><td className="py-3 pr-4">約50か月（約4年2か月）</td><td className="py-3">約47.5万円</td></tr>
                    <tr className="border-b border-stone-200"><td className="py-3 pr-4">50,000円</td><td className="py-3 pr-4">約24か月（約2年）</td><td className="py-3">約18.5万円</td></tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-3">毎月の返済額を2万円上げる（3万円→5万円）だけで、完済は約24か月に短縮され、総利息は約18.5万円に減ります。月2万円多く返すことで、約29万円の利息を抑えられ、完済も約2年早まります。</p>
            </section>
            <section id="risk">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">月3万円返済の注意点</h2>
              <p className="mt-3">月3万円返済は、毎月の負担は軽い一方で、完済まで4年以上かかり、総利息も約47.5万円と大きくなります。可能であれば、毎月の返済額を少しでも上げる、あるいは繰り上げ返済を検討すると、総利息を抑えつつ完済を早めやすくなります。</p>
            </section>
            <section id="simulator">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">自分の条件で確認するならシミュレーターが早い</h2>
              <p className="mt-3">ここまでの数値は「100万円・年利15%・毎月3万円返済」という条件での目安です。自分の条件で完済時期や総利息を確認したい場合は、
                <Link href="/simulator/cardloan" className="font-bold text-stone-900 hover:underline">借入返済シミュレーター</Link>
                で試算できます。
              </p>
              <div className="mt-6">
                <Link href="/simulator/cardloan" className="ds-btn ds-btn-primary">
                  借入返済シミュレーターで計算する →
                </Link>
              </div>
            </section>
            <section id="notice">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">注意点</h2>
              <p className="mt-3">本記事の試算は、一般的な固定金利・毎月一定額返済の考え方に基づく概算です。実際のリボ払いでは、最低支払額のルール、金利の変動、手数料などが影響する場合があります。正確な返済条件は、利用中のカードやローン商品の約款・明細を確認してください。</p>
            </section>
            <section id="editor-memo">
              <ArticleEditorMemo
                purpose="リボ払い100万円を月3万円で返す場合の完済期間と総利息を具体的に示し、返済額の設定が結果にどう影響するかを伝える記事です。"
                reasonAxis="月3万円という最低返済額に近い設定をメインに据え、月5万円との比較で返済額の違いによるインパクトを可視化しています。"
                memo="「毎月いくら返しているか」だけでなく「いつ終わるか・総利息はいくらか」まで把握することの重要性を伝えるシナリオ記事として位置づけています。"
              />
            </section>

            <section id="faq">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">よくある質問</h2>
              <div className="mt-4 space-y-6">
                <div><h3 className="text-base font-semibold text-stone-900">リボ100万円を月3万円で返すと何年かかりますか？</h3><p className="mt-2">年利15%の目安では、完済まで約50か月（約4年2か月）です。</p></div>
                <div><h3 className="text-base font-semibold text-stone-900">月3万円返済だと総利息はいくらになりますか？</h3><p className="mt-2">100万円・年利15%で毎月3万円返済の場合、総利息の目安は約47.5万円です。毎月5万円にすると約18.5万円まで減らせます。</p></div>
                <div><h3 className="text-base font-semibold text-stone-900">早く完済するにはどうすればいいですか？</h3><p className="mt-2">毎月の返済額を増やす、あるいは繰り上げ返済をすると、完済が早まり総利息も減りやすくなります。</p></div>
                <div><h3 className="text-base font-semibold text-stone-900">月3万円から月5万円に増やすと総利息はどれくらい変わりますか？</h3><p className="mt-2">100万円・年利15%の場合、月3万円では総利息約47.5万円ですが、月5万円にすると約18.5万円まで減ります。月2万円の増額で総利息が約29万円も減り、完済も約2年早まります。</p></div>
                <div><h3 className="text-base font-semibold text-stone-900">途中で返済額を増やした場合、効果はありますか？</h3><p className="mt-2">途中からでも返済額を増やせば、その時点から元本の減りが早くなるため効果はあります。残高が大きい時期ほど利息への影響が大きいため、できるだけ早い段階で増額するほど総利息を抑えやすくなります。</p></div>
              </div>
            </section>
            <section id="summary">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">まとめ</h2>
              <p className="mt-3">リボ払い100万円を毎月3万円で返す場合、年利15%では完済まで約4年2か月、総利息は約47.5万円が目安です。可能であれば返済額を上げるか繰り上げ返済を検討すると、総利息を抑えつつ完済を早めやすくなります。自分の条件で試算したい場合は<Link href="/simulator/cardloan" className="font-bold text-stone-900 hover:underline">借入返済シミュレーター</Link>で確認できます。</p>
            </section>
          </div>
          <ArticleFooter articleSlug="revo-100man-30k-years" />
        </div>
      </ArticlePageShell>
    </>
  );
}
