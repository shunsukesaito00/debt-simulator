import type { Metadata } from "next";
import Link from "next/link";
import { ArticleFooter } from "@/app/components/ArticleFooter";
import { ArticlePagePremise, ArticleReadingPoints, ArticleEditorMemo } from "@/app/components/article";
import { getArticleBreadcrumbJsonLd, getArticleFaqJsonLd } from "@/lib/article-structured-data";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://debt-simulator-quzc.vercel.app";
const ARTICLE_URL = `${BASE}/articles/fixed-cost-10000-impact`;
const ARTICLE_TITLE = "固定費を月1万円見直すとどう変わる？1年・3年・5年の改善効果を比較";

export const metadata: Metadata = {
  title: ARTICLE_TITLE,
  description:
    "月1万円の固定費改善で、1年・3年・5年にどれくらい差が出るかを具体的に整理しました。継続したときの累計効果を数字で確認できます。",
  alternates: { canonical: ARTICLE_URL },
  openGraph: {
    title: ARTICLE_TITLE,
    description:
      "月1万円の固定費改善で、1年・3年・5年にどれくらい差が出るかを具体的に整理しました。継続したときの累計効果を数字で確認できます。",
    url: ARTICLE_URL,
    type: "article",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: ARTICLE_TITLE,
  description:
    "月1万円の固定費改善で、1年・3年・5年にどれくらい差が出るかを具体的に整理した記事です。継続したときの累計効果を数字で確認できます。",
  url: ARTICLE_URL,
  datePublished: "2025-03-11",
  dateModified: "2025-03-11",
  author: { "@type": "Organization", name: "借入返済シミュレーター" },
  publisher: { "@type": "Organization", name: "借入返済シミュレーター" },
};

const faqItems = [
  {
    question: "月1万円の固定費見直しは現実的に達成できますか？",
    answer:
      "サブスク・通信費・保険・光熱費などを複数組み合わせて見直すと、月1万円程度の改善が見込めるケースがあります。人によって差があり、必ず達成できると断定はできませんが、固定費見直しチェックリストの順番で複数項目に手をつけると、現実的な目標になりやすいです。",
  },
  {
    question: "月1万円改善を続けると1年・3年・5年でいくらになりますか？",
    answer:
      "月1万円を続けた場合、1年で12万円、3年で36万円、5年で60万円の累計になります。月額では「1万円」と感じていても、継続すると大きな差になります。",
  },
  {
    question: "月5,000円と月1万円ではどれくらい違いますか？",
    answer:
      "月5,000円なら1年で6万円・5年で30万円、月1万円なら1年で12万円・5年で60万円です。月1万円は月5,000円の2倍なので、同じ期間なら累計も2倍になります。固定費削減インパクト計算で、任意の月額で試算できます。",
  },
  {
    question: "固定費はどこから見直すと1万円削減しやすいですか？",
    answer:
      "通信費（スマホ・自宅回線）の見直し、サブスクの整理、保険の重複・過剰保障の見直し、電気・ガスなどの契約見直しを組み合わせると、月1万円程度になるケースがあります。何から手をつけるかは固定費見直しチェックリストを参照してください。",
  },
  {
    question: "浮いたお金は返済に回してもよいですか？",
    answer:
      "はい。固定費で浮いたお金は、借入の返済や貯蓄に回せます。返済に回すと月々の負担の調整材料にもなります。借入返済シミュレーターで条件を変えて試すと、返済計画のイメージがしやすくなります。",
  },
];

const breadcrumbJsonLd = getArticleBreadcrumbJsonLd(ARTICLE_URL, ARTICLE_TITLE);
const faqJsonLd = getArticleFaqJsonLd(faqItems);

const tocItems = [
  { id: "premise", label: "このページの前提" },
  { id: "conclusion", label: "結論｜月1万円の見直しで、続くと差は大きい" },
  { id: "reading-points", label: "読み方のポイント" },
  { id: "comparison-table", label: "月1万円改善で、1年・3年・5年にいくら差が出るか" },
  { id: "where-to-cut", label: "月1万円はどこを見直せば出しやすいか" },
  { id: "tool-cta", label: "固定費削減インパクト計算ツールで確認する" },
  { id: "editor-memo", label: "編集メモ" },
  { id: "faq", label: "よくある質問" },
  { id: "summary", label: "まとめ" },
];

const impactRows = [
  { period: "1年（12か月）", amount: 120_000, example: "まとまった金額として実感しやすい" },
  { period: "3年（36か月）", amount: 360_000, example: "大きな出費との比較がしやすい" },
  { period: "5年（60か月）", amount: 600_000, example: "借入返済や貯蓄の差として無視しにくい" },
];

const maxAmount = 600_000;

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

      <article className="mx-auto max-w-3xl">
        <nav className="mb-4 text-sm text-gray-600" aria-label="パンくず">
          <ol className="flex flex-wrap items-center gap-1">
            <li><Link href="/" className="hover:underline">トップ</Link></li>
            <li aria-hidden>/</li>
            <li><Link href="/articles" className="hover:underline">知っておきたいこと</Link></li>
            <li aria-hidden>/</li>
            <li className="font-bold text-gray-900" aria-current="page">{ARTICLE_TITLE}</li>
          </ol>
        </nav>

        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-soft md:p-8">
          <h1 className="text-2xl font-black text-gray-900 md:text-3xl">{ARTICLE_TITLE}</h1>

          <p className="mt-4 text-sm text-gray-600 leading-relaxed">
            月1万円の固定費見直しは、月額では「1万円」と感じがちですが、続けると累計が大きくなります。このページでは<strong>1年・3年・5年でどう変わるか</strong>を数字で整理します。
          </p>

          <section id="premise" className="mt-6">
            <ArticlePagePremise
              comparisonConditions={[
                "このページでは「月1万円の固定費改善」を基準に比較する",
                "1年・3年・5年で比較する（固定費見直しは継続効果が重要であるため）",
                "「小さくても続く改善」を重視する前提で整理する",
              ]}
              reasonForConditions="月1万円は、通信費・サブスク・保険・光熱費などを複数組み合わせて見直したときに現実的にあり得るラインとして選んでいます。月5,000円の効果とあわせて比較できるようにしています。"
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
            <section id="conclusion">
              <h2 className="text-lg font-black text-gray-900 md:text-xl">
                結論｜月1万円の見直しで、続くと差は大きい
              </h2>
              <p className="mt-3">
                月1万円の固定費改善を続けた場合、<strong>1年で12万円、3年で36万円、5年で60万円</strong>の累計になります。月額では「1万円」と感じていても、継続すると無視できない差になります。固定費改善の価値は「継続」にあり、小さくても続く見直しの方が、大きく削ってすぐ元に戻るより総額では大きくなることがあります。
              </p>
            </section>

            <section id="reading-points">
              <ArticleReadingPoints
                points={[
                  {
                    label: "月額より累計で見る",
                    body: "月1万円は「大したことない」と感じがちですが、1年で12万円、5年で60万円と、期間で見ると判断が変わります。",
                  },
                  {
                    label: "固定費は一度見直すと継続しやすい",
                    body: "契約やプランを変えれば、同じ条件で毎月効果が続きます。変動費の節約より再現しやすい場合があります。",
                  },
                  {
                    label: "無理のない範囲で続ける",
                    body: "生活への負担が大きすぎると元に戻りやすいので、無理のない範囲で続けられる改善を優先する考え方で整理しています。",
                  },
                ]}
                misconceptions={[
                  "「月1万円は難しい」と思いがちですが、複数項目の見直しを組み合わせると現実的に達成できるケースがあります。",
                  "固定費改善は「一度たくさん削ればよい」と考えがちですが、実際は「続く改善」の方が総額では大きくなることがあります。",
                ]}
              />
            </section>

            <section id="comparison-table">
              <h2 className="text-lg font-black text-gray-900 md:text-xl">
                月1万円改善で、1年・3年・5年にいくら差が出るか
              </h2>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full min-w-[320px] border-collapse text-sm">
                  <thead>
                    <tr className="border-b-2 border-gray-300 bg-gray-100">
                      <th className="py-2 px-3 text-left font-black text-gray-900">期間</th>
                      <th className="py-2 px-3 text-right font-black text-gray-900">累計改善額</th>
                      <th className="py-2 px-3 text-left font-black text-gray-900">見え方の例</th>
                    </tr>
                  </thead>
                  <tbody>
                    {impactRows.map((row, i) => (
                      <tr key={i} className="border-b border-gray-200">
                        <td className="py-2.5 px-3 font-bold text-gray-800">{row.period}</td>
                        <td className="py-2.5 px-3 text-right font-bold text-gray-900">{formatYen(row.amount)}</td>
                        <td className="py-2.5 px-3 text-gray-700">{row.example}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-6 rounded-2xl border border-gray-200 bg-gray-50/80 p-4">
                <h3 className="text-sm font-black text-gray-900">累計改善額のイメージ（月1万円×継続月数）</h3>
                <div className="mt-3 space-y-3" aria-hidden>
                  {impactRows.map((row, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-xs text-gray-600 mb-1">
                        <span>{row.period}</span>
                        <span className="font-bold text-gray-900">{formatYen(row.amount)}</span>
                      </div>
                      <div
                        className="h-6 rounded-lg bg-gray-200 overflow-hidden"
                        role="img"
                        aria-label={`${row.period}で${formatYen(row.amount)}`}
                      >
                        <div
                          className="h-full rounded-lg bg-gray-700 min-w-[2rem]"
                          style={{ width: `${(row.amount / maxAmount) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section id="where-to-cut">
              <h2 className="text-lg font-black text-gray-900 md:text-xl">
                月1万円はどこを見直せば出しやすいか
              </h2>
              <p className="mt-3">
                月1万円程度の改善は、サブスク・通信費・保険・光熱費などを複数組み合わせることで現実的に達成できるケースがあります。人によって差があり、必ず削れると断定するものではありません。
              </p>
              <p className="mt-3">
                <Link href="/articles/fixed-cost-checklist" className="font-bold text-gray-900 hover:underline">固定費見直しチェックリスト</Link>
                で順番に整理でき、
                <Link href="/articles/fixed-cost-5000-impact" className="font-bold text-gray-900 hover:underline">月5,000円の効果比較</Link>
                もあわせて参照してください。
              </p>
            </section>

            <section id="tool-cta">
              <h2 className="text-lg font-black text-gray-900 md:text-xl">
                固定費削減インパクト計算ツールで確認する
              </h2>
              <p className="mt-3">
                月1万円以外でも、任意の月額で1年・3年・5年でいくらになるかは、
                <Link href="/tools/fixed-cost-impact" className="font-bold text-gray-900 hover:underline">固定費削減インパクト計算</Link>
                で試算できます。
              </p>
              <div className="mt-6 rounded-2xl border border-gray-200 bg-gray-50 p-6">
                <h3 className="text-base font-black text-gray-900">固定費削減インパクトを計算する</h3>
                <Link
                  href="/tools/fixed-cost-impact"
                  className="mt-4 inline-flex items-center justify-center rounded-2xl bg-gray-900 px-5 py-3 text-sm font-black text-white hover:opacity-90"
                >
                  固定費削減インパクトを計算する →
                </Link>
              </div>
            </section>

            <section id="editor-memo">
              <ArticleEditorMemo
                purpose="月5,000円の効果記事の次に、月1万円でどう変わるかを比較できるようにしています。"
                reasonAxis="月1万円は複数項目の見直しを組み合わせたときの現実的なラインとして選んでいます。"
                memo="改善効果の試算カテゴリの2本目として、月1万円×継続月数の比較を主役にしています。"
              />
            </section>

            <section id="faq">
              <h2 className="text-lg font-black text-gray-900 md:text-xl">よくある質問</h2>
              <dl className="mt-4 space-y-4">
                {faqItems.map((item, i) => (
                  <div key={i}>
                    <dt className="font-bold text-gray-900">{item.question}</dt>
                    <dd className="mt-1 text-gray-700">{item.answer}</dd>
                  </div>
                ))}
              </dl>
            </section>

            <section id="summary">
              <h2 className="text-lg font-black text-gray-900 md:text-xl">まとめ</h2>
              <ul className="mt-3 list-disc pl-5 space-y-1">
                <li>月1万円の固定費改善を続けると、<strong>1年で12万円・3年で36万円・5年で60万円</strong>の累計になります。</li>
                <li>固定費改善の価値は<strong>継続効果</strong>にあります。一度見直せば毎月効果が続くので、複数項目から無理のない範囲で見直すのがおすすめです。</li>
                <li>自分の改善額の累計は
                  <Link href="/tools/fixed-cost-impact" className="font-bold text-gray-900 hover:underline">固定費削減インパクト計算</Link>
                  で確認できます。
                </li>
                <li>
                  <Link href="/articles/fixed-cost-checklist" className="font-bold text-gray-900 hover:underline">固定費見直しチェックリスト</Link>
                  や
                  <Link href="/articles/fixed-cost-5000-impact" className="font-bold text-gray-900 hover:underline">月5,000円の効果比較</Link>
                  もあわせてご覧ください。
                </li>
              </ul>
            </section>
          </div>

          <ArticleFooter articleSlug="fixed-cost-10000-impact" />
        </div>
      </article>
    </>
  );
}
