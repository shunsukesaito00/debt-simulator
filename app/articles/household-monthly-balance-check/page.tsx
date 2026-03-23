import type { Metadata } from "next";
import Link from "next/link";
import { ArticleFooter } from "@/app/components/ArticleFooter";
import { ArticleProse } from "@/app/components/article";
import { getArticleBreadcrumbJsonLd, getArticleFaqJsonLd } from "@/lib/article-structured-data";
import { ARTICLE_AUTHOR_JSON_LD, ARTICLE_PUBLISHER_JSON_LD } from "@/lib/site-author";
import { ArticlePageShell } from "@/app/components/ArticlePageShell";
import { articleUsesWideLayout } from "@/lib/article-layout";


const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://debt-simulator-quzc.vercel.app";
const ARTICLE_URL = `${BASE}/articles/household-monthly-balance-check`;
const ARTICLE_TITLE = "月の収支をざっくり把握する方法｜手取りから逆算して家計の全体像をつかむ";

export const metadata: Metadata = {
  title: ARTICLE_TITLE,
  description:
    "家計簿が続かない人でも、手取りから逆算して月の収支をざっくり把握する方法を解説。固定費・変動費・特別費の見える化で家計の全体像をつかみます。",
  alternates: { canonical: ARTICLE_URL },
  openGraph: {
    title: ARTICLE_TITLE,
    description:
      "月の収支は手取り逆算でざっくり把握できる。家計簿が続かない人向けに、最小限チェックと次の見直し順を整理しました。",
    url: ARTICLE_URL,
    type: "article",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: ARTICLE_TITLE,
  description:
    "手取りから逆算して月の収支をざっくり把握する方法を整理した家計管理記事。",
  url: ARTICLE_URL,
  datePublished: "2025-03-11",
  dateModified: "2026-03-22",
  author: ARTICLE_AUTHOR_JSON_LD,
  publisher: ARTICLE_PUBLISHER_JSON_LD,
};

const faqItems = [
  {
    question: "月の収支をざっくり把握するには何を見ればいいですか？",
    answer:
      "最初は3つで十分です。毎月の手取り収入、毎月ほぼ固定で出るお金、月末残高の増減を確認してください。これで黒字か赤字かの輪郭が見えます。",
  },
  {
    question: "なぜ手取りから逆算するのですか？",
    answer:
      "年収や額面ではなく、実際に使えるのは手取りだからです。家計管理の基準を手取りに置くと、生活実感とのズレが小さくなります。",
  },
  {
    question: "変動費は細かく記録しないと意味がありませんか？",
    answer:
      "最初は細かくなくて大丈夫です。生活費・その他の変動費・特別費の3分類程度でも、改善判断には十分役立ちます。",
  },
  {
    question: "固定費と変動費はどちらから見直すべきですか？",
    answer:
      "基本は固定費からです。一度見直すと継続効果が出やすく、変動費だけで頑張るより負担が軽くなります。",
  },
  {
    question: "ざっくり把握のあと、次に何をすればいいですか？",
    answer:
      "固定費見直し、不足額の確認、返済条件の整理、特別費の年単位計画の順で進めると実務的です。",
  },
];

const breadcrumbJsonLd = getArticleBreadcrumbJsonLd(ARTICLE_URL, ARTICLE_TITLE);
const faqJsonLd = getArticleFaqJsonLd(faqItems);

const tocItems = [
  { id: "intro", label: "導入" },
  { id: "conclusion", label: "先に結論｜この3つだけ見れば分かる" },
  { id: "why-net", label: "なぜ手取りから逆算するのか" },
  { id: "step-net", label: "まず確認すること｜毎月の手取り収入" },
  { id: "step-fixed", label: "次に確認すること｜毎月ほぼ固定で出るお金" },
  { id: "step-variable", label: "変動費はざっくりでいい" },
  { id: "formula", label: "ざっくり収支の計算式" },
  { id: "quick-check", label: "3分でできる収支チェック" },
  { id: "pitfalls", label: "見えなくなる人のよくあるパターン" },
  { id: "fit", label: "この方法が向いている人" },
  { id: "next", label: "把握したあとにやること" },
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

      <ArticlePageShell currentPageTitle={ARTICLE_TITLE} wide={articleUsesWideLayout("household-monthly-balance-check")}>
        <div className="ds-card ds-card-pad">
          <h1 className="text-2xl font-semibold text-stone-900 md:text-3xl">{ARTICLE_TITLE}</h1>
          <section className="mt-6 ds-subcard p-4 not-prose">
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
            <section id="intro">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">導入</h2>
              <p className="mt-3">
                家計を整えたいと思っても、「毎月いくら足りていて、いくら足りていないのか分からない」という状態で止まりやすいです。家計簿アプリが続かない、レシートを見返さない、決済手段が分散して全体が見えない、というのはよくあります。
              </p>
              <p className="mt-3">
                ただ、月の収支は最初から1円単位で合わせなくて大丈夫です。まずは手取りから逆算して、家計の全体像をつかむことが重要です。
              </p>
            </section>

            <section id="conclusion">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">
                先に結論｜月の収支はこの3つだけ見ればざっくり分かる
              </h2>
              <ol className="mt-3 list-decimal pl-5 space-y-1 text-stone-800">
                <li>毎月の手取り収入</li>
                <li>毎月ほぼ固定で出ていくお金</li>
                <li>月末に残るお金が増えているか減っているか</li>
              </ol>
              <p className="mt-3">この3つが見えれば、黒字か赤字か、どこが重いかはかなり見えてきます。</p>
            </section>

            <section id="why-net">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">なぜ「手取りから逆算」なのか</h2>
              <p className="mt-3">
                家計を考えるときに年収や額面で見てしまうと、生活実感とのズレが起きやすくなります。実際に使えるのは税金・社会保険料が引かれた後の手取りです。家計管理の基準は「毎月現実に入ってくる手取り額」に置く方が実務的です。
              </p>
            </section>

            <section id="step-net">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">まず確認すること｜毎月の手取り収入</h2>
              <ul className="mt-3 list-disc pl-5 space-y-1 text-stone-800">
                <li>給与明細の手取り額</li>
                <li>ボーナスを除いた通常月の手取り</li>
                <li>副収入は安定分だけを計上</li>
              </ul>
            </section>

            <section id="step-fixed">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">次に確認すること｜毎月ほぼ固定で出ていくお金</h2>
              <p className="mt-3">次は、毎月ほぼ自動で出ていく支出を一覧にします。</p>
              <ul className="mt-3 list-disc pl-5 space-y-1 text-stone-800">
                <li>家賃・通信費・保険・サブスク・ローン返済</li>
                <li>駐車場代</li>
                <li>毎月ほぼ一定の水道光熱費</li>
              </ul>
              <p className="mt-3">月の収支が見えない人ほど、まず固定費合計を押さえた方が効率よく改善できます。</p>
            </section>

            <section id="step-variable">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">変動費は「細かく」ではなく「ざっくり」でいい</h2>
              <p className="mt-3">最初から細かく分類すると止まりやすいので、次の3分類で十分です。</p>
              <ul className="mt-3 list-disc pl-5 space-y-1 text-stone-800">
                <li>生活費（食費・日用品・交通費）</li>
                <li>その他の変動費（交際費・娯楽費・美容・被服）</li>
                <li>特別費（税金・帰省・冠婚葬祭・家電買い替え・年払い保険・車検）</li>
              </ul>
            </section>

            <section id="formula">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">月の収支をざっくり出す計算式</h2>
              <p className="mt-3"><strong>手取り収入 - 固定費 - ざっくり変動費 = 月の余り</strong> です。</p>
              <ul className="mt-3 list-disc pl-5 space-y-1 text-stone-800">
                <li>手取り 25万円</li>
                <li>固定費 13万円</li>
                <li>ざっくり変動費 10万円</li>
              </ul>
              <p className="mt-3">この場合の残りは2万円です。この残りが毎月本当に残るかを確認していきます。</p>
            </section>

            <section id="quick-check">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">3分でできる「ざっくり収支チェック」</h2>
              <ol className="mt-3 list-decimal pl-5 space-y-1 text-stone-800">
                <li>手取り額を決める</li>
                <li>固定費を全部書き出す</li>
                <li>カード明細・口座明細を1〜3か月見る</li>
                <li>月末残高が増減しているかを見る</li>
                <li>年に数回の支出（特別費）をメモする</li>
              </ol>
            </section>

            <section id="pitfalls">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">家計が見えなくなる人のよくあるパターン</h2>
              <ol className="mt-3 list-decimal pl-5 space-y-2 text-stone-800">
                <li>収入を額面で見ている</li>
                <li>固定費を把握しないまま変動費だけ節約している</li>
                <li>特別費を月の外に置いている</li>
                <li>細かく記録しないと意味がないと思って止まる</li>
              </ol>
            </section>

            <section id="fit">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">こんな人は、この方法が向いている</h2>
              <ul className="mt-3 list-disc pl-5 space-y-1 text-stone-800">
                <li>家計簿アプリが続かない</li>
                <li>何となくお金が残らない</li>
                <li>毎月のカード請求が重い</li>
                <li>返済があり、まず全体をつかみたい</li>
                <li>固定費と変動費の区別があいまい</li>
              </ul>
            </section>

            <section id="next">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">月の収支を把握したあと、次にやること</h2>
              <ol className="mt-3 list-decimal pl-5 space-y-1 text-stone-800">
                <li>固定費を見直す</li>
                <li>赤字なら不足額を把握する</li>
                <li>返済があるなら返済条件を整理する</li>
                <li>特別費を年単位で置く</li>
              </ol>
              <p className="mt-3">
                固定費の見直しは
                <Link href="/articles/fixed-cost-checklist" className="font-bold text-stone-900 hover:underline">固定費見直しチェックリスト</Link>
                や
                <Link href="/articles/fixed-cost-guide" className="font-bold text-stone-900 hover:underline">固定費見直しの進め方</Link>
                を、借入返済の計画は
                <Link href="/simulator/cardloan" className="font-bold text-stone-900 hover:underline">借入返済シミュレーター</Link>
                を参照してください。
              </p>
            </section>

            <section id="faq">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">よくある質問</h2>
              <dl className="mt-4 space-y-4">
                {faqItems.map((item, i) => (
                  <div key={i}>
                    <dt className="font-bold text-stone-900">{item.question}</dt>
                    <dd className="mt-1 text-stone-700">{item.answer}</dd>
                  </div>
                ))}
              </dl>
            </section>

            <section id="summary">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">まとめ</h2>
              <ul className="mt-3 list-disc pl-5 space-y-1">
                <li>手取り収入を見る</li>
                <li>固定費を出す</li>
                <li>変動費はざっくりでよい</li>
                <li>月末残高の増減を見る</li>
                <li>特別費を忘れない</li>
              </ul>
            </section>
          </ArticleProse>

          <ArticleFooter articleSlug="household-monthly-balance-check" showCta={false} />
        </div>
      </ArticlePageShell>
    </>
  );
}
