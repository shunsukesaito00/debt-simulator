import type { Metadata } from "next";
import Link from "next/link";
import { ArticleFooter } from "@/app/components/ArticleFooter";
import { ArticlePagePremise, ArticleReadingPoints, ArticleEditorMemo } from "@/app/components/article";
import { getArticleBreadcrumbJsonLd, getArticleFaqJsonLd } from "@/lib/article-structured-data";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://debt-simulator-quzc.vercel.app";
const ARTICLE_URL = `${BASE}/articles/revo-50man-simulation`;
const ARTICLE_TITLE = "リボ払い50万円の返済シミュレーション｜毎月の返済額でどう変わる？";

export const metadata: Metadata = {
  title: ARTICLE_TITLE,
  description:
    "リボ払い50万円を年利15%で返済する場合、月1万・2万・3万円でどう変わるかを比較します。完済までの期間、総支払額、総利息の違いを表でわかりやすく解説します。",
  alternates: { canonical: ARTICLE_URL },
  openGraph: {
    title: ARTICLE_TITLE,
    description:
      "リボ払い50万円を年利15%で返済する場合、月1万・2万・3万円でどう変わるかを比較します。完済までの期間、総支払額、総利息の違いを表でわかりやすく解説します。",
    url: ARTICLE_URL,
    type: "article",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: ARTICLE_TITLE,
  description:
    "リボ払い50万円を年利15%で返済する場合、月1万・2万・3万円でどう変わるかを比較します。完済までの期間、総支払額、総利息の違いを表でわかりやすく解説します。",
  url: ARTICLE_URL,
  datePublished: "2026-03-16",
  dateModified: "2026-03-16",
  author: { "@type": "Organization", name: "借入返済シミュレーター" },
  publisher: { "@type": "Organization", name: "借入返済シミュレーター" },
};

const faqItems = [
  {
    question: "リボ払い50万円・金利15%だと利息はいくらですか？",
    answer:
      "近似例では、毎月1万円返済なら約29万円、毎月2万円返済なら約12万円、毎月3万円返済なら約7万円が目安です。返済額が低いほど利息は増えやすいです。",
  },
  {
    question: "リボ払い50万円は何年で終わりますか？",
    answer:
      "近似例では、毎月1万円返済なら約79か月（6年7か月）、毎月2万円返済なら約31か月（2年7か月）、毎月3万円返済なら約19か月（1年7か月）が目安です。",
  },
  {
    question: "リボ払い50万円を早く完済するにはどうすればいいですか？",
    answer:
      "毎月返済額をできる限り引き上げることが最も効果的です。加えて、ボーナスや臨時収入を追加返済に回す、不要な固定費を削って返済原資を増やすなどの方法があります。",
  },
  {
    question: "月1万円の返済だけ続けるとどうなりますか？",
    answer:
      "月1万円返済では完済まで約79か月かかり、総利息は約29万円になります。元本50万円に対して利息だけで半分以上の金額を支払うことになります。",
  },
  {
    question: "リボ払い50万円と100万円では利息の差はどのくらいですか？",
    answer:
      "残高が大きいほど毎月発生する利息も大きくなります。同じ年利15%でも、100万円の場合は50万円の場合より利息総額が大幅に増えます。詳しくはリボ100万円のシミュレーション記事で比較できます。",
  },
];

const breadcrumbJsonLd = getArticleBreadcrumbJsonLd(ARTICLE_URL, ARTICLE_TITLE);
const faqJsonLd = getArticleFaqJsonLd(faqItems);

const tocItems = [
  { id: "premise", label: "このページの前提" },
  { id: "conclusion", label: "結論｜リボ払い50万円・金利15%は返済額しだいで重さが大きく変わる" },
  { id: "reading-points", label: "読み方のポイント" },
  { id: "why", label: "なぜリボ払いは返済額しだいで差が大きくなるのか" },
  { id: "10k", label: "毎月1万円返済ならどうなるか" },
  { id: "20k", label: "毎月2万円返済ならどうなるか" },
  { id: "30k", label: "毎月3万円返済ならどうなるか" },
  { id: "compare", label: "1万円・2万円・3万円を比較するとどう違うか" },
  { id: "risk", label: "返済額を低くしすぎるリスク" },
  { id: "point", label: "どの返済額が現実的かを考えるポイント" },
  { id: "simulator", label: "自分の条件で確認するならシミュレーターが早い" },
  { id: "notice", label: "注意点" },
  { id: "editor-memo", label: "編集メモ" },
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

        <div className="ds-card ds-card-pad">
          <h1 className="text-2xl font-black text-gray-900 md:text-3xl">{ARTICLE_TITLE}</h1>
          <p className="mt-4 text-sm text-gray-600 leading-relaxed">
            本記事の比較は、一般的な固定金利・一定返済額の近似例です。実際のリボ払い商品では条件により異なる場合があります。
          </p>

          <section id="premise" className="mt-6">
            <ArticlePagePremise
              comparisonConditions={[
                "リボ払い残高50万円・年利15%を前提に比較する",
                "毎月返済額を1万円・2万円・3万円の3パターンで比較する",
                "一般的な固定金利・一定返済額の近似例で整理する",
              ]}
              reasonForConditions="リボ払いでは毎月の返済額が完済期間と総利息に大きく影響します。1万円・2万円・3万円の3段階で、返済額の差がどれだけ結果を変えるかを比較しています。"
            />
          </section>

          <section className="mt-6 ds-subcard p-4">
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
              リボ払いで50万円を利用した場合、毎月の返済額をいくらに設定するかで、完済までの期間も総利息も大きく変わります。毎月の支払いが低いと一見ラクに見えますが、そのぶん元本の減りが遅くなり、利息を長く払い続けることになります。
            </p>
            <p>
              この記事では、リボ払い50万円・年利15%という条件を前提に、毎月1万円・2万円・3万円返済で何がどれだけ変わるのかを比較します。最後に、
              <Link href="/simulator/cardloan" className="font-bold text-gray-900 hover:underline">返済シミュレーター</Link>
              への導線も用意しています。
            </p>

            <section id="conclusion">
              <h2 className="text-lg font-black text-gray-900 md:text-xl">結論｜リボ払い50万円・金利15%は返済額しだいで重さが大きく変わる</h2>
              <p className="mt-3">
                結論から言うと、リボ払い50万円を年利15%で利用した場合、毎月1万円返済では総利息は約29万円、毎月2万円返済では約12万円、毎月3万円返済では約7万円が目安です。
              </p>
              <p className="mt-3">
                つまり、毎月の返済額を上げるだけで、完済までの期間と総利息はかなり改善します。逆に、返済額を低く抑えすぎると、完済が長引いて利息負担が重くなりやすいです。
              </p>
            </section>

            <section id="reading-points">
              <ArticleReadingPoints
                points={[
                  {
                    label: "返済額を上げると完済期間と利息が大きく改善する",
                    body: "毎月1万円では約79か月・利息約29万円ですが、3万円にすると約19か月・利息約7万円まで改善します。",
                  },
                  {
                    label: "最低限の返済額では長期化しやすい",
                    body: "返済額が低いと元本の減りが遅く、利息を長く払い続ける構造になります。",
                  },
                  {
                    label: "月額だけでなく総利息と完済時期を確認する",
                    body: "毎月の支払いが低くても、完済まで何か月かかり最終的にいくら払うかまで見ることが重要です。",
                  },
                ]}
                misconceptions={[
                  "「毎月1万円で払えているから問題ない」と思いがちですが、完済まで6年以上かかり利息だけで約29万円になります。",
                  "「50万円なら大した利息にならない」と感じがちですが、返済額が低いと利息が元本の半分以上になることもあります。",
                ]}
              />
            </section>

            <section id="why">
              <h2 className="text-lg font-black text-gray-900 md:text-xl">なぜリボ払いは返済額しだいで差が大きくなるのか</h2>
              <p className="mt-3">
                リボ払いでは、毎月の返済額の中に利息も含まれています。そのため、返済額が低いと元本に回る金額が小さくなり、残高が減りにくくなります。
              </p>
              <p className="mt-3">
                残高が大きい状態が長く続くほど利息も発生し続けるため、毎月返済額の差が、最終的な総利息の差として大きく表れます。50万円でも返済額が低いと、利息の累積は無視できません。
              </p>
            </section>

            <section id="10k">
              <h2 className="text-lg font-black text-gray-900 md:text-xl">毎月1万円返済ならどうなるか</h2>
              <p className="mt-3">
                リボ払い50万円を年利15%で毎月1万円ずつ返済する場合、完済までの目安は約79か月（6年7か月）、総支払額は約79万円、総利息は約29万円です。
              </p>
              <p className="mt-3">
                月1万円なら払えそうに見えますが、返済は約6年半も続きます。毎月の負担を抑える代わりに、利息を長く払い続ける構造になります。元本50万円に対して、利息だけで約29万円と半分以上の金額を支払うことになります。
              </p>
            </section>

            <section id="20k">
              <h2 className="text-lg font-black text-gray-900 md:text-xl">毎月2万円返済ならどうなるか</h2>
              <p className="mt-3">
                同じ50万円・年利15%でも、毎月2万円返済なら完済までの目安は約31か月（2年7か月）、総支払額は約62万円、総利息は約12万円です。
              </p>
              <p className="mt-3">
                毎月1万円返済と比べると負担は増えますが、完済までの期間は大きく短縮され、総利息もかなり減ります。リボ払いでは、毎月返済額を上げる効果が非常に大きいことがわかります。
              </p>
            </section>

            <section id="30k">
              <h2 className="text-lg font-black text-gray-900 md:text-xl">毎月3万円返済ならどうなるか</h2>
              <p className="mt-3">
                毎月3万円返済にすると、完済までの目安は約19か月（1年7か月）、総支払額は約57万円、総利息は約7万円です。
              </p>
              <p className="mt-3">
                月2万円よりもさらに返済負担は増えますが、完済が早くなるため、利息負担はかなり小さくなります。短期で返せるほど、リボ払いの重さは和らぎやすくなります。
              </p>
            </section>

            <section id="compare">
              <h2 className="text-lg font-black text-gray-900 md:text-xl">1万円・2万円・3万円を比較するとどう違うか</h2>
              <p className="mt-3">同じ50万円・年利15%でも、毎月返済額の違いで結果はかなり変わります。</p>
              <ul className="mt-2 list-disc pl-5 space-y-1">
                <li>毎月1万円: 約79か月 / 総利息約29万円</li>
                <li>毎月2万円: 約31か月 / 総利息約12万円</li>
                <li>毎月3万円: 約19か月 / 総利息約7万円</li>
              </ul>
              <p className="mt-3">
                毎月の返済額を1万円上げるだけでも、完済までの期間と総利息は大きく改善します。リボ払いでは、「毎月いくら払うか」が特に重要です。
              </p>

              <div className="mt-6 overflow-x-auto">
                <table className="w-full min-w-[520px] border-collapse text-left">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="py-3 pr-4 font-black text-gray-900">毎月返済額</th>
                      <th className="py-3 pr-4 font-black text-gray-900">完済までの目安</th>
                      <th className="py-3 pr-4 font-black text-gray-900">総支払額</th>
                      <th className="py-3 pr-4 font-black text-gray-900">総利息</th>
                      <th className="py-3 font-black text-gray-900">特徴</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    <tr className="border-b border-gray-200">
                      <td className="py-3 pr-4">約10,000円</td>
                      <td className="py-3 pr-4">約79か月</td>
                      <td className="py-3 pr-4">約790,000円</td>
                      <td className="py-3 pr-4">約290,000円</td>
                      <td className="py-3 text-xs">毎月は軽いが長期化しやすい</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-3 pr-4">約20,000円</td>
                      <td className="py-3 pr-4">約31か月</td>
                      <td className="py-3 pr-4">約620,000円</td>
                      <td className="py-3 pr-4">約120,000円</td>
                      <td className="py-3 text-xs">バランス型</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-3 pr-4">約30,000円</td>
                      <td className="py-3 pr-4">約19か月</td>
                      <td className="py-3 pr-4">約570,000円</td>
                      <td className="py-3 pr-4">約70,000円</td>
                      <td className="py-3 text-xs">毎月負担は重いが早く終わりやすい</td>
                    </tr>
                  </tbody>
                </table>
                <p className="mt-2 text-xs text-gray-600">
                  毎月返済額が上がるほど、完済期間も総利息も大きく改善します。1万円→2万円の差は特に大きくなります。
                </p>
              </div>
            </section>

            <section id="risk">
              <h2 className="text-lg font-black text-gray-900 md:text-xl">返済額を低くしすぎるリスク</h2>
              <p className="mt-3">
                毎月返済額を低くすると、月々の負担は軽く見えます。しかしそのぶん、元本の減りが遅くなり、完済までの期間が長引きます。
              </p>
              <p className="mt-3">
                月1万円返済の場合、毎月の利息は初月で約6,250円です。つまり返済額1万円のうち元本に回るのは約3,750円しかありません。残高がなかなか減らず、利息を長く払い続ける構造になります。
              </p>
              <p className="mt-3">
                返済が長期化すると、その間に収入や生活状況が変わるリスクも増えます。今は払えても、数年後も同じ条件で払い続けられるとは限りません。
              </p>
            </section>

            <section id="point">
              <h2 className="text-lg font-black text-gray-900 md:text-xl">どの返済額が現実的かを考えるポイント</h2>
              <p className="mt-3">
                どの返済額が現実的かは、家計の余力によって変わります。毎月1万円は見た目の負担は軽いですが、長期化しやすく、利息も重くなります。
              </p>
              <p className="mt-3">
                毎月2万円は利息と完済期間のバランスが取りやすく、毎月3万円は短期で終わらせたい人向けです。重要なのは、毎月の負担だけでなく、総利息と完済時期まで含めて判断することです。
              </p>
            </section>

            <section id="simulator">
              <h2 className="text-lg font-black text-gray-900 md:text-xl">自分の条件で確認するならシミュレーターが早い</h2>
              <p className="mt-3">
                ここまでの数値は、あくまで「リボ払い50万円・年利15%」という固定条件の近似例です。実際には、利用残高、金利、返済方式、最低返済額ルール、追加返済の有無によって結果は変わります。
              </p>
              <p className="mt-3">
                そのため、最終的には自分の条件を入れて確認するのが一番確実です。
                <Link href="/simulator/cardloan" className="font-bold text-gray-900 hover:underline">返済シミュレーター</Link>
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
              <h2 className="text-lg font-black text-gray-900 md:text-xl">注意点</h2>
              <p className="mt-3">
                本記事の比較は、一般的な固定金利・一定返済額の考え方に基づく概算です。実際のリボ払い商品では、元金定額方式、残高スライド方式、締日、支払日、手数料計算、遅延損害金などが影響する場合があります。
              </p>
              <p className="mt-3">
                正確な返済条件は、利用中または検討中のカード会社・金融会社の公式情報を確認してください。
              </p>
            </section>

            <section id="editor-memo">
              <ArticleEditorMemo
                purpose="リボ払い50万円・年利15%という条件で、毎月の返済額の違いが完済期間と総利息にどう影響するかを具体的に示す記事です。"
                reasonAxis="毎月返済額（1万円・2万円・3万円）を比較軸にして、返済額を上げることの効果を可視化しています。"
                memo="50万円はリボ払いで現実的に起こりやすい残高帯です。100万円の記事と合わせて読むことで、残高規模による利息負担の違いも把握できます。"
              />
            </section>

            <section id="faq">
              <h2 className="text-lg font-black text-gray-900 md:text-xl">よくある質問</h2>
              <div className="mt-4 space-y-6">
                <div>
                  <h3 className="text-base font-black text-gray-900">リボ払い50万円・金利15%だと利息はいくらですか？</h3>
                  <p className="mt-2">
                    近似例では、毎月1万円返済なら約29万円、毎月2万円返済なら約12万円、毎月3万円返済なら約7万円が目安です。返済額が低いほど利息は増えやすいです。
                  </p>
                </div>
                <div>
                  <h3 className="text-base font-black text-gray-900">リボ払い50万円は何年で終わりますか？</h3>
                  <p className="mt-2">
                    近似例では、毎月1万円返済なら約79か月（6年7か月）、毎月2万円返済なら約31か月（2年7か月）、毎月3万円返済なら約19か月（1年7か月）が目安です。
                  </p>
                </div>
                <div>
                  <h3 className="text-base font-black text-gray-900">リボ払い50万円を早く完済するにはどうすればいいですか？</h3>
                  <p className="mt-2">
                    毎月返済額をできる限り引き上げることが最も効果的です。加えて、ボーナスや臨時収入を追加返済に回す、不要な固定費を削って返済原資を増やすなどの方法があります。
                  </p>
                </div>
                <div>
                  <h3 className="text-base font-black text-gray-900">月1万円の返済だけ続けるとどうなりますか？</h3>
                  <p className="mt-2">
                    月1万円返済では完済まで約79か月かかり、総利息は約29万円になります。元本50万円に対して利息だけで半分以上の金額を支払うことになります。
                  </p>
                </div>
                <div>
                  <h3 className="text-base font-black text-gray-900">リボ払い50万円と100万円では利息の差はどのくらいですか？</h3>
                  <p className="mt-2">
                    残高が大きいほど毎月発生する利息も大きくなります。同じ年利15%でも、100万円の場合は50万円の場合より利息総額が大幅に増えます。詳しくは
                    <Link href="/articles/revo-100man-15percent-simulation" className="font-bold text-gray-900 hover:underline">リボ100万円のシミュレーション</Link>
                    で比較できます。
                  </p>
                </div>
              </div>
            </section>

            <section id="summary">
              <h2 className="text-lg font-black text-gray-900 md:text-xl">まとめ</h2>
              <p className="mt-3">
                リボ払い50万円・金利15%という条件でも、毎月返済額が1万円・2万円・3万円で完済期間と総利息は大きく変わります。毎月の返済額を低くすると、そのぶん元本が減りにくくなり、総利息は重くなります。
              </p>
              <p className="mt-3">
                大切なのは、毎月いくら払うかだけでなく、何か月かかるか、最終的にいくら払うかまで見ることです。
                リボ100万円の場合の比較は
                <Link href="/articles/revo-100man-15percent-simulation" className="font-bold text-gray-900 hover:underline">リボ100万円のシミュレーション</Link>
                で確認できます。
              </p>
              <p className="mt-3">
                自分の条件で試算したい場合は、
                <Link href="/simulator/cardloan" className="font-bold text-gray-900 hover:underline">返済シミュレーター</Link>
                で確認できます。他の記事は
                <Link href="/articles" className="font-bold text-gray-900 hover:underline">記事一覧</Link>
                からご覧いただけます。
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

          <ArticleFooter articleSlug="revo-50man-simulation" />
        </div>
      </article>
    </>
  );
}
