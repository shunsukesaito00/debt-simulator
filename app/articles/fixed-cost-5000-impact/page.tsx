import type { Metadata } from "next";
import Link from "next/link";
import { ArticleFooter } from "@/app/components/ArticleFooter";
import { ArticlePagePremise, ArticleReadingPoints, ArticleEditorMemo, ArticleStandardBlocks, ArticleProse } from "@/app/components/article";
import { getArticleBreadcrumbJsonLd, getArticleFaqJsonLd } from "@/lib/article-structured-data";
import { ARTICLE_AUTHOR_JSON_LD, ARTICLE_PUBLISHER_JSON_LD } from "@/lib/site-author";
import { ArticlePageShell } from "@/app/components/ArticlePageShell";
import { articleUsesWideLayout } from "@/lib/article-layout";


const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://debt-simulator-quzc.vercel.app";
const ARTICLE_URL = `${BASE}/articles/fixed-cost-5000-impact`;
const ARTICLE_TITLE = "固定費を月5,000円見直すとどう変わる？1年・3年・5年の改善効果を比較";

export const metadata: Metadata = {
  title: ARTICLE_TITLE,
  description:
    "月5,000円の固定費改善で、1年・3年・5年にどれくらい差が出るかを具体的に整理しました。固定費改善は月額ではなく継続で見るべきことを解説します。",
  alternates: { canonical: ARTICLE_URL },
  openGraph: {
    title: ARTICLE_TITLE,
    description:
      "月5,000円の固定費改善で、1年・3年・5年にどれくらい差が出るかを具体的に整理しました。固定費改善は継続で見るべきことを解説します。",
    url: ARTICLE_URL,
    type: "article",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: ARTICLE_TITLE,
  description:
    "月5,000円の固定費改善で、1年・3年・5年にどれくらい差が出るかを具体的に整理した記事です。固定費改善は月額ではなく継続で見るべきことを解説します。",
  url: ARTICLE_URL,
  datePublished: "2025-03-11",
  dateModified: "2025-03-11",
  author: ARTICLE_AUTHOR_JSON_LD,
  publisher: ARTICLE_PUBLISHER_JSON_LD,
};

const faqItems = [
  {
    question: "月5,000円の固定費見直しは意味がありますか？",
    answer:
      "はい。月額では小さく見えても、1年で6万円、3年で18万円、5年で30万円と、継続すると無視できない差になります。固定費改善は一度見直すと毎月効果が続くため、続けるほど累計は大きくなります。",
  },
  {
    question: "固定費はどこから見直すと5,000円削減しやすいですか？",
    answer:
      "サブスクの整理・通信費プランの見直し・不要オプションの解約・保険内容の確認・光熱系契約の見直しなど、複数の項目を組み合わせると月5,000円程度の改善が見込めるケースがあります。何から手をつけるかは固定費見直しチェックリストで順番に整理できます。人によって差があるため、必ず削れると断定はできません。",
  },
  {
    question: "固定費改善と変動費節約はどちらが大事ですか？",
    answer:
      "どちらも重要ですが、固定費は一度見直すと毎月効果が続きやすく、変動費の節約より再現しやすい場合があります。固定費を先に見直して土台を整え、そのうえで変動費も見る、という順番で考えると続けやすいです。",
  },
  {
    question: "月5,000円の改善を他の節約と組み合わせるとどうなりますか？",
    answer:
      "固定費5,000円に加えて変動費の見直しや収入の工夫を組み合わせると、月の改善幅がさらに広がります。たとえば固定費5,000円＋変動費3,000円で月8,000円改善できれば、年間で約10万円近くの差になります。",
  },
  {
    question: "月5,000円の固定費改善を長期間続けるコツはありますか？",
    answer:
      "生活満足度を大きく下げない範囲で見直すことが最も重要です。無理に削りすぎると元に戻りやすいため、「なくても困らないもの」から優先して見直すと、負担感なく継続しやすくなります。",
  },
];

const breadcrumbJsonLd = getArticleBreadcrumbJsonLd(ARTICLE_URL, ARTICLE_TITLE);
const faqJsonLd = getArticleFaqJsonLd(faqItems);

const tocItems = [
  { id: "premise", label: "このページの前提" },
  { id: "conclusion", label: "結論｜月5,000円の見直しでも、続くと差は大きい" },
  { id: "reading-points", label: "読み方のポイント" },
  { id: "comparison-table", label: "月5,000円改善で、1年・3年・5年にいくら差が出るか" },
  { id: "where-to-cut", label: "月5,000円はどこを見直せば出しやすいか" },
  { id: "continuation", label: "固定費改善は「1回の達成」より「続くかどうか」が重要" },
  { id: "tool-cta", label: "固定費削減インパクト計算ツールで確認する" },
  { id: "loan-savings", label: "借入返済や貯蓄にもつながる補足" },
  { id: "editor-memo", label: "編集メモ" },
  { id: "faq", label: "よくある質問" },
  { id: "summary", label: "まとめ" },
];

const impactRows = [
  { period: "1年（12か月）", amount: 60_000, example: "まず効果を実感しやすい" },
  { period: "3年（36か月）", amount: 180_000, example: "家計改善の差が見えやすい" },
  { period: "5年（60か月）", amount: 300_000, example: "大きな固定負担との差として無視しにくい" },
];

const maxAmount = 300_000;

function formatYen(n: number): string {
  if (n >= 10000) return `${(n / 10000).toFixed(0)}万円`;
  return `${n.toLocaleString()}円`;
}

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

      
      <ArticlePageShell currentPageTitle={ARTICLE_TITLE} wide={articleUsesWideLayout("fixed-cost-5000-impact")}>
<div className="ds-card ds-card-pad">
          <h1 className="text-2xl font-semibold text-stone-900 md:text-3xl">{ARTICLE_TITLE}</h1>

          <p className="mt-4 text-base text-stone-600 leading-relaxed">
            月5,000円の固定費見直しは、月額だけ見ると小さく感じがちです。しかし固定費改善は一度見直すと毎月積み上がるため、続けるほど差が大きくなります。月額だけを見ていると効果を軽く見積もりやすいので、このページでは<strong>1年・3年・5年でどう変わるか</strong>を数字で整理します。
          </p>

          <ArticleStandardBlocks slug="fixed-cost-5000-impact" />

          <section id="premise" className="mt-6">
            <ArticlePagePremise
              comparisonConditions={[
                "このページでは「月5,000円の固定費改善」を基準に比較する",
                "1年・3年・5年で比較する（固定費見直しは継続効果が重要で、短期だけでは判断しにくいため）",
                "改善額の大きさだけでなく「続けやすさ」も見る前提で整理する",
              ]}
              reasonForConditions="月5,000円は、通信費・サブスク・保険の一部見直しなどで現実的に達成しやすいラインだからです。極端な節約額ではなく、自分ごととして想像しやすい比較単位として選んでいます。"
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
            <section id="conclusion">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">
                結論｜月5,000円の見直しでも、続くと差は大きい
              </h2>
              <p className="mt-3">
                結論から言うと、月5,000円の固定費改善を続けた場合、<strong>1年で6万円、3年で18万円、5年で30万円</strong>の累計になります。月額では「5,000円」と小さく見えても、継続すると無視できない差になります。
              </p>
              <p className="mt-3">
                固定費改善の価値は、「一発の節約」ではなく<strong>毎月の改善が続くこと</strong>にあります。一度見直せば、同じ条件で毎月その分だけ負担が減り続けるため、期間が長いほど累計は大きくなります。
              </p>
            </section>

            <section id="reading-points">
              <ArticleReadingPoints
                points={[
                  {
                    label: "月額だけで見ると小さく感じやすい",
                    body: "月5,000円は「大したことない」と感じがちですが、1年で6万円、5年で30万円と、期間で見ると判断が変わります。",
                  },
                  {
                    label: "固定費は一度見直すと継続しやすい",
                    body: "契約やプランを変えれば、同じ条件で毎月効果が続きます。変動費の節約より、再現しやすい場合があります。",
                  },
                  {
                    label: "年間・3年・5年で見ると判断しやすい",
                    body: "「月いくら」ではなく「1年・3年・5年でいくらになるか」で見ると、見直しの意味が伝わりやすくなります。",
                  },
                  {
                    label: "改善額だけでなく、続けやすさも大事",
                    body: "生活への負担が大きすぎると元に戻りやすいので、無理のない範囲で続けられる改善を優先する考え方で整理しています。",
                  },
                ]}
                misconceptions={[
                  "「月5,000円なんて大したことない」と思いがちですが、継続すると1年で6万円、5年で30万円と、貯蓄や返済に回せる額になります。",
                  "固定費改善は「一度たくさん削ればよい」と考えがちですが、実際は「小さくても続く改善」の方が総額では大きくなることがあります。",
                ]}
              />
            </section>

            <section id="comparison-table">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">
                月5,000円改善で、1年・3年・5年にいくら差が出るか
              </h2>
              <p className="mt-3">
                月5,000円の改善を続けたときの累計と、見え方の例をまとめました。
              </p>

              <div className="mt-4 overflow-x-auto">
                <table className="w-full min-w-[320px] border-collapse text-sm">
                  <thead>
                    <tr className="border-b-2 border-stone-300 bg-stone-100">
                      <th className="py-2 px-3 text-left font-semibold text-stone-900">期間</th>
                      <th className="py-2 px-3 text-right font-semibold text-stone-900">累計改善額</th>
                      <th className="py-2 px-3 text-left font-semibold text-stone-900">見え方の例</th>
                    </tr>
                  </thead>
                  <tbody>
                    {impactRows.map((row, i) => (
                      <tr key={i} className="border-b border-stone-200">
                        <td className="py-2.5 px-3 font-bold text-stone-800">{row.period}</td>
                        <td className="py-2.5 px-3 text-right font-bold text-stone-900">{formatYen(row.amount)}</td>
                        <td className="py-2.5 px-3 text-stone-700">{row.example}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 ds-subcard p-4">
                <h3 className="text-base font-semibold text-stone-900">累計改善額のイメージ（月5,000円×継続月数）</h3>
                <div className="mt-3 space-y-3" aria-hidden>
                  {impactRows.map((row, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-xs text-stone-600 mb-1">
                        <span>{row.period}</span>
                        <span className="font-bold text-stone-900">{formatYen(row.amount)}</span>
                      </div>
                      <div
                        className="h-6 rounded-lg bg-stone-200 overflow-hidden"
                        role="img"
                        aria-label={`${row.period}で${formatYen(row.amount)}`}
                      >
                        <div
                          className="h-full rounded-lg bg-stone-700 min-w-[2rem]"
                          style={{ width: `${(row.amount / maxAmount) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section id="where-to-cut">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">
                月5,000円はどこを見直せば出しやすいか
              </h2>
              <p className="mt-3">
                月5,000円程度の改善は、次のような見直しの組み合わせで現実的に達成できるケースがあります。あくまで例であり、<strong>人によって差があり、必ず削れると断定するものではありません</strong>。
              </p>
              <ul className="mt-3 list-disc pl-5 space-y-1">
                <li>サブスクの整理（使っていないものの解約・一時停止）</li>
                <li>通信費プランの見直し（スマホ・自宅回線の格安化やセット割）</li>
                <li>不要オプションの解約（保険・クレジットカード・各種サービス）</li>
                <li>保険内容の確認（重複保障の整理・必要十分なプランへ）</li>
                <li>光熱系契約の見直し（電力・ガス・水道などの会社・プラン）</li>
              </ul>
              <p className="mt-3">
                何から手をつけるかは、
                <Link href="/articles/fixed-cost-checklist" className="font-bold text-stone-900 hover:underline">固定費見直しチェックリスト</Link>
                で順番に整理できます。
                <Link href="/articles/fixed-cost-guide" className="font-bold text-stone-900 hover:underline ml-1">固定費見直しの進め方</Link>
                もあわせて参照してください。
              </p>
            </section>

            <section id="continuation">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">
                固定費改善は「1回の達成」より「続くかどうか」が重要
              </h2>
              <p className="mt-3">
                このページでは、固定費改善の効果を<strong>「月額」ではなく「継続」で見る</strong>ことを重視しています。月5,000円改善しても、すぐ元の支出に戻ってしまうなら、累計の意味は薄れます。一方で、小さくても続く改善の方が、1年・3年・5年で見たときの総額は大きくなります。
              </p>
              <p className="mt-3">
                判断するときは、金額だけでなく<strong>継続性・生活満足度</strong>も見てほしいです。無理のない範囲で続けられる見直しを優先すると、長期的な効果につながりやすくなります。
              </p>
            </section>

            <section id="tool-cta">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">
                固定費削減インパクト計算ツールで確認する
              </h2>
              <p className="mt-3">
                月5,000円以外でも、月3,000円や1万円で見直した場合に、1年・3年・5年でいくらになるかは、
                <Link href="/tools/fixed-cost-impact" className="font-bold text-stone-900 hover:underline">固定費削減インパクト計算</Link>
                でその場で試算できます。自分の想定する削減額を入力すると、累計がすぐ確認できるので、判断材料にしてください。
              </p>
              <div className="mt-6 ds-subcard p-6">
                <h3 className="text-base font-semibold text-stone-900">固定費削減インパクトを計算する</h3>
                <p className="mt-2 text-base text-stone-700">
                  毎月の削減額を続けたとき、1年・3年・5年で合計いくらになるかをすぐ確認できます。
                </p>
                <Link
                  href="/tools/fixed-cost-impact"
                  className="ds-btn ds-btn-primary mt-4"
                >
                  固定費削減インパクトを計算する →
                </Link>
              </div>
            </section>

            <section id="loan-savings">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">
                借入返済や貯蓄にもつながる補足
              </h2>
              <p className="mt-3">
                月5,000円の固定費改善で浮いたお金は、生活費に回すだけでなく、<strong>借入の返済や貯蓄</strong>にも回せます。浮いた分を返済に回すと、月々の負担の調整材料にもなります。無理のない返済計画を考えるときは、
                <Link href="/simulator/cardloan" className="font-bold text-stone-900 hover:underline">借入返済シミュレーター</Link>
                で条件を変えて試すとイメージしやすくなります。このページの主役はあくまで固定費改善ですが、返済中の方はシミュレーターとあわせて考えると、全体の負担の見え方が変わります。
              </p>
            </section>

            <section id="editor-memo">
              <ArticleEditorMemo
                purpose="「5,000円が大きいか小さいか」ではなく、「続けられる改善なら将来の差は十分大きい」という点を判断してほしい、という意図でこのページを書いています。"
                reasonAxis="月5,000円という「大きすぎず現実的な改善額」を基準にしたのは、極端な節約額よりも自分ごととして想像しやすいからです。1年・3年・5年で見せているのは、固定費改善の価値が「継続」にあるためです。"
                memo="改善効果の試算カテゴリの1本目として、月5,000円×継続月数のシンプルな比較を主役にしています。"
              />
            </section>

            <section id="faq">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">よくある質問</h2>
              <dl className="mt-4 space-y-4">
                <div>
                  <dt className="font-bold text-stone-900">月5,000円の固定費見直しは意味がありますか？</dt>
                  <dd className="mt-1 text-stone-700">
                    はい。月額では小さく見えても、1年で6万円、3年で18万円、5年で30万円と、継続すると無視できない差になります。固定費改善は一度見直すと毎月効果が続くため、続けるほど累計は大きくなります。
                  </dd>
                </div>
                <div>
                  <dt className="font-bold text-stone-900">固定費はどこから見直すと5,000円削減しやすいですか？</dt>
                  <dd className="mt-1 text-stone-700">
                    サブスクの整理・通信費プランの見直し・不要オプションの解約・保険内容の確認・光熱系契約の見直しなど、複数の項目を組み合わせると月5,000円程度の改善が見込めるケースがあります。何から手をつけるかは
                    <Link href="/articles/fixed-cost-checklist" className="font-bold text-stone-900 hover:underline">固定費見直しチェックリスト</Link>
                    で順番に整理できます。人によって差があるため、必ず削れると断定はできません。
                  </dd>
                </div>
                <div>
                  <dt className="font-bold text-stone-900">固定費改善と変動費節約はどちらが大事ですか？</dt>
                  <dd className="mt-1 text-stone-700">
                    どちらも重要ですが、固定費は一度見直すと毎月効果が続きやすく、変動費の節約より再現しやすい場合があります。固定費を先に見直して土台を整え、そのうえで変動費も見る、という順番で考えると続けやすいです。
                  </dd>
                </div>
                <div>
                  <dt className="font-bold text-stone-900">月5,000円の改善を他の節約と組み合わせるとどうなりますか？</dt>
                  <dd className="mt-1 text-stone-700">
                    固定費5,000円に加えて変動費の見直しや収入の工夫を組み合わせると、月の改善幅がさらに広がります。たとえば固定費5,000円＋変動費3,000円で月8,000円改善できれば、年間で約10万円近くの差になります。
                  </dd>
                </div>
                <div>
                  <dt className="font-bold text-stone-900">月5,000円の固定費改善を長期間続けるコツはありますか？</dt>
                  <dd className="mt-1 text-stone-700">
                    生活満足度を大きく下げない範囲で見直すことが最も重要です。無理に削りすぎると元に戻りやすいため、「なくても困らないもの」から優先して見直すと、負担感なく継続しやすくなります。
                  </dd>
                </div>
              </dl>
            </section>

            <section id="summary">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">まとめ</h2>
              <ul className="mt-3 list-disc pl-5 space-y-1">
                <li>月5,000円の固定費改善は、月額だと小さく見えますが、<strong>1年・3年・5年で見ると差が大きい</strong>です（1年6万円・3年18万円・5年30万円）。</li>
                <li>固定費改善の価値は<strong>継続効果</strong>にあります。一度見直せば毎月効果が続くので、まずは見直しやすい項目から始めるのがおすすめです。</li>
                <li>自分の改善額の累計は
                  <Link href="/tools/fixed-cost-impact" className="font-bold text-stone-900 hover:underline">固定費削減インパクト計算ツール</Link>
                  で確認できます。
                </li>
                <li>
                  <Link href="/articles/fixed-cost-checklist" className="font-bold text-stone-900 hover:underline">固定費見直しチェックリスト</Link>
                  や
                  <Link href="/articles/fixed-cost-guide" className="font-bold text-stone-900 hover:underline">固定費見直しの進め方</Link>
                  もあわせてご覧ください。
                  <Link href="/articles" className="font-bold text-stone-900 hover:underline ml-1">記事一覧</Link>
                  から他のカテゴリも探せます。
                </li>
              </ul>
            </section>
          </ArticleProse>

          <ArticleFooter articleSlug="fixed-cost-5000-impact" />
        </div>
      </ArticlePageShell>
    </>
  );
}
