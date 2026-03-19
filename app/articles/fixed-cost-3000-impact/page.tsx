import type { Metadata } from "next";
import Link from "next/link";
import { ArticleFooter } from "@/app/components/ArticleFooter";
import { ArticlePagePremise, ArticleReadingPoints, ArticleEditorMemo } from "@/app/components/article";
import { getArticleBreadcrumbJsonLd, getArticleFaqJsonLd } from "@/lib/article-structured-data";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://debt-simulator-quzc.vercel.app";
const ARTICLE_URL = `${BASE}/articles/fixed-cost-3000-impact`;
const ARTICLE_TITLE = "月3,000円の固定費見直しは意味がある？年間・3年・5年で検証";

export const metadata: Metadata = {
  title: ARTICLE_TITLE,
  description:
    "月3,000円の固定費見直しが年間・3年・5年でどれくらいの差になるかを具体的に整理しました。小さくても続ける効果を数字で確認できます。",
  alternates: { canonical: ARTICLE_URL },
  openGraph: {
    title: ARTICLE_TITLE,
    description:
      "月3,000円の固定費見直しが年間・3年・5年でどれくらいの差になるかを具体的に整理しました。小さくても続ける効果を数字で確認できます。",
    url: ARTICLE_URL,
    type: "article",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: ARTICLE_TITLE,
  description:
    "月3,000円の固定費見直しが年間・3年・5年でどれくらいの差になるかを具体的に整理した記事です。小さくても続ける効果を数字で確認できます。",
  url: ARTICLE_URL,
  datePublished: "2025-03-11",
  dateModified: "2025-03-11",
  author: { "@type": "Organization", name: "借入返済シミュレーター" },
  publisher: { "@type": "Organization", name: "借入返済シミュレーター" },
};

const faqItems = [
  {
    question: "月3,000円の固定費見直しは意味がありますか？",
    answer:
      "はい。月額では小さく見えても、1年で36,000円、3年で108,000円、5年で18万円と、継続すると無視できない差になります。固定費改善は一度見直すと毎月効果が続くため、小さくても続く方が総額では大きくなることがあります。",
  },
  {
    question: "月3,000円はどこから削れますか？",
    answer:
      "サブスクの整理（使っていないものの解約）、通信費のプラン見直しやオプション解約、光熱費の契約見直しなど、一つまたは複数を組み合わせると月3,000円程度の改善が見込めるケースがあります。固定費見直しチェックリストで何から手をつけるか整理できます。",
  },
  {
    question: "月5,000円と月3,000円ではどれくらい違いますか？",
    answer:
      "月3,000円なら1年で3.6万円・5年で18万円、月5,000円なら1年で6万円・5年で30万円です。月3,000円でも続けると差は大きいので、「まず月3,000円から」と始めると続けやすくなることがあります。",
  },
  {
    question: "小さな見直しから始めてよいですか？",
    answer:
      "はい。無理のない範囲で続けられる見直しの方が、大きく削ってすぐ元に戻るより、長期的には効果が大きくなることがあります。月3,000円の見直しで習慣がついたら、次の項目にも手を伸ばしやすくなります。",
  },
  {
    question: "累計を試算したいです。",
    answer:
      "月3,000円以外の金額でも、1年・3年・5年でいくらになるかは当サイトの固定費削減インパクト計算で試算できます。自分の想定する削減額を入力すると、累計がすぐ確認できます。",
  },
];

const breadcrumbJsonLd = getArticleBreadcrumbJsonLd(ARTICLE_URL, ARTICLE_TITLE);
const faqJsonLd = getArticleFaqJsonLd(faqItems);

const tocItems = [
  { id: "premise", label: "このページの前提" },
  { id: "conclusion", label: "結論｜月3,000円でも続くと差は大きい" },
  { id: "reading-points", label: "読み方のポイント" },
  { id: "comparison-table", label: "月3,000円改善で、1年・3年・5年にいくら差が出るか" },
  { id: "where-to-cut", label: "月3,000円はどこを見直せば出しやすいか" },
  { id: "tool-cta", label: "固定費削減インパクト計算ツールで確認する" },
  { id: "editor-memo", label: "編集メモ" },
  { id: "faq", label: "よくある質問" },
  { id: "summary", label: "まとめ" },
];

const impactRows = [
  { period: "1年（12か月）", amount: 36_000, example: "まず効果を実感しやすい" },
  { period: "3年（36か月）", amount: 108_000, example: "10万円超えで見え方が変わる" },
  { period: "5年（60か月）", amount: 180_000, example: "まとまった金額として無視しにくい" },
];

const maxAmount = 180_000;

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

        <div className="ds-card ds-card-pad">
          <h1 className="text-2xl font-black text-gray-900 md:text-3xl">{ARTICLE_TITLE}</h1>

          <p className="mt-4 text-sm text-gray-600 leading-relaxed">
            「月3,000円なんて大したことない」と感じがちですが、固定費改善は続けるほど累計が大きくなります。このページでは<strong>1年・3年・5年でどう変わるか</strong>を数字で整理します。
          </p>

          <section id="premise" className="mt-6">
            <ArticlePagePremise
              comparisonConditions={[
                "このページでは「月3,000円の固定費改善」を基準に比較する",
                "1年・3年・5年で比較する（固定費見直しは継続効果が重要であるため）",
                "「小さくても続く改善」を重視する前提で整理する",
              ]}
              reasonForConditions="月3,000円は、サブスクの整理や通信費の一部見直しなど、まず着手しやすいラインとして選んでいます。無理のない範囲で始めると、その後の見直しにもつなげやすくなります。"
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
            <section id="conclusion">
              <h2 className="text-lg font-black text-gray-900 md:text-xl">
                結論｜月3,000円でも続くと差は大きい
              </h2>
              <p className="mt-3">
                月3,000円の固定費改善を続けた場合、<strong>1年で3.6万円、3年で10.8万円、5年で18万円</strong>の累計になります。月額では「3,000円」と小さく見えても、継続すると無視できない差になります。固定費改善の価値は「継続」にあり、小さくても続く見直しの方が、大きく削ってすぐ元に戻るより総額では大きくなることがあります。
              </p>
            </section>

            <section id="reading-points">
              <ArticleReadingPoints
                points={[
                  {
                    label: "月額だけで見ると小さく感じやすい",
                    body: "月3,000円は「大したことない」と感じがちですが、1年で3.6万円、5年で18万円と、期間で見ると判断が変わります。",
                  },
                  {
                    label: "小さくても続く改善を優先",
                    body: "無理のない範囲で続けられる見直しの方が、長期的には効果が大きくなることがあります。まず月3,000円から始めるのも有効です。",
                  },
                  {
                    label: "次の見直しにつなげやすい",
                    body: "サブスクや通信費の一部から始めると、習慣がついたあとに他の項目にも手を伸ばしやすくなります。",
                  },
                ]}
                misconceptions={[
                  "「月3,000円なんて意味がない」と思いがちですが、継続すると1年で3.6万円、5年で18万円と、貯蓄や返済に回せる額になります。",
                  "固定費改善は「たくさん削らなければ意味がない」と考えがちですが、実際は「続くかどうか」の方が重要になることがあります。",
                ]}
              />
            </section>

            <section id="comparison-table">
              <h2 className="text-lg font-black text-gray-900 md:text-xl">
                月3,000円改善で、1年・3年・5年にいくら差が出るか
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
              <div className="mt-6 ds-subcard p-4">
                <h3 className="text-sm font-black text-gray-900">累計改善額のイメージ（月3,000円×継続月数）</h3>
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
                月3,000円はどこを見直せば出しやすいか
              </h2>
              <p className="mt-3">
                サブスクの整理、通信費のプラン・オプション見直し、光熱費の契約見直しなど、一つまたは複数を組み合わせると月3,000円程度の改善が見込めるケースがあります。何から手をつけるかは
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
                月3,000円以外でも、任意の月額で1年・3年・5年でいくらになるかは、
                <Link href="/tools/fixed-cost-impact" className="font-bold text-gray-900 hover:underline">固定費削減インパクト計算</Link>
                で試算できます。
              </p>
              <div className="mt-6 ds-subcard p-6">
                <h3 className="text-base font-black text-gray-900">固定費削減インパクトを計算する</h3>
                <Link
                  href="/tools/fixed-cost-impact"
                  className="ds-btn ds-btn-primary mt-4"
                >
                  固定費削減インパクトを計算する →
                </Link>
              </div>
            </section>

            <section id="editor-memo">
              <ArticleEditorMemo
                purpose="「月3,000円は意味がない」と思いがちな読者に、続けたときの累計を見せることで、小さくても始める判断材料にしてもらうことを目的にしています。"
                reasonAxis="月5,000円・1万円の効果記事とあわせて、自分に現実的なラインを選べるようにしています。"
                memo="改善効果の試算カテゴリの3本目として、月3,000円×継続月数の比較を主役にしています。"
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
                <li>月3,000円の固定費改善を続けると、<strong>1年で3.6万円・3年で10.8万円・5年で18万円</strong>の累計になります。</li>
                <li>月額では小さく見えても、<strong>続けると差は大きい</strong>です。小さくても続く見直しを優先するのがおすすめです。</li>
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

          <ArticleFooter articleSlug="fixed-cost-3000-impact" />
        </div>
      </article>
    </>
  );
}
