import type { Metadata } from "next";
import Link from "next/link";
import { ArticleFooter } from "@/app/components/ArticleFooter";
import { ArticleProse } from "@/app/components/article";
import { getArticleBreadcrumbJsonLd, getArticleFaqJsonLd } from "@/lib/article-structured-data";
import { ARTICLE_AUTHOR_JSON_LD, ARTICLE_PUBLISHER_JSON_LD } from "@/lib/site-author";
import { ArticlePageShell } from "@/app/components/ArticlePageShell";
import { articleUsesWideLayout } from "@/lib/article-layout";


const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://debt-simulator-quzc.vercel.app";
const ARTICLE_URL = `${BASE}/articles/household-fixed-vs-variable`;
const ARTICLE_TITLE = "固定費と変動費の分け方｜何が固定費で何が変動費か、迷いやすい支出も整理";

export const metadata: Metadata = {
  title: ARTICLE_TITLE,
  description:
    "固定費と変動費の違いを、定義・迷いやすい費目・見直しの順番で整理。水道光熱費やスマホ代など判断に迷う支出も実務目線で解説します。",
  alternates: { canonical: ARTICLE_URL },
  openGraph: {
    title: ARTICLE_TITLE,
    description:
      "固定費と変動費の分け方を、迷いやすい支出まで整理。家計見直しでどちらから着手するべきかもまとめました。",
    url: ARTICLE_URL,
    type: "article",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: ARTICLE_TITLE,
  description:
    "固定費と変動費の違い、迷いやすい費目の分け方、見直し順を整理した家計管理記事。",
  url: ARTICLE_URL,
  datePublished: "2025-03-11",
  dateModified: "2026-03-21",
  author: ARTICLE_AUTHOR_JSON_LD,
  publisher: ARTICLE_PUBLISHER_JSON_LD,
};

const faqItems = [
  {
    question: "固定費と変動費はどう違いますか？",
    answer:
      "固定費は毎月ほぼ自動で出る支出、変動費は月ごとに上下する支出です。最初は厳密さより、改善に使える分け方で十分です。",
  },
  {
    question: "水道光熱費は固定費ですか、変動費ですか？",
    answer:
      "実務では固定費寄りで扱うと整理しやすいです。厳密には基本料金は固定、使用量分は変動要素があります。",
  },
  {
    question: "スマホ代やサブスクはどちらに入れますか？",
    answer:
      "基本は固定費です。契約を見直さない限り毎月出ていくため、家計管理では固定費側に入れると分かりやすくなります。",
  },
  {
    question: "固定費と変動費、どちらから見直すべきですか？",
    answer:
      "基本は固定費からです。一度下げると継続効果が出やすく、変動費だけで頑張るより疲れにくくなります。",
  },
  {
    question: "家計簿が続かない人でもこの分け方は有効ですか？",
    answer:
      "有効です。まず固定費と変動費の2分類だけでも、どこが重いか・どこから直すかが見えやすくなります。",
  },
];

const breadcrumbJsonLd = getArticleBreadcrumbJsonLd(ARTICLE_URL, ARTICLE_TITLE);
const faqJsonLd = getArticleFaqJsonLd(faqItems);

const tocItems = [
  { id: "intro", label: "導入" },
  { id: "conclusion", label: "先に結論｜固定費と変動費の違い" },
  { id: "fixed", label: "固定費とは何か" },
  { id: "variable", label: "変動費とは何か" },
  { id: "borderline", label: "迷いやすい費目の分け方" },
  { id: "order", label: "どちらから見直すべきか" },
  { id: "for-non-bookkeepers", label: "家計簿が続かない人ほど効く理由" },
  { id: "mistakes", label: "よくある間違い" },
  { id: "quick", label: "3分でできる分け方" },
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

      <ArticlePageShell currentPageTitle={ARTICLE_TITLE} wide={articleUsesWideLayout("household-fixed-vs-variable")}>
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
                家計を見直そうと思ったとき、最初に出てきやすい言葉が「固定費」と「変動費」です。言葉は知っていても、何がどちらかで迷う人は多いと思います。
              </p>
              <p className="mt-3">
                この記事では、固定費と変動費の違いを「定義 → 迷いやすい費目 → 見直しの順番」の順で整理します。
              </p>
            </section>

            <section id="conclusion">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">
                先に結論｜固定費は「毎月ほぼ自動で出るお金」、変動費は「月によって上下するお金」
              </h2>
              <ul className="mt-3 list-disc pl-5 space-y-1 text-stone-800">
                <li>固定費: 毎月ほぼ決まって出ていく支出</li>
                <li>変動費: 月によって金額が変わる支出</li>
              </ul>
              <p className="mt-3">
                実務では「毎月ほぼ自動で出るか」「止めない限り続くか」「月ごとのブレが小さいか」で見ると整理しやすくなります。
              </p>
            </section>

            <section id="fixed">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">固定費とは何か</h2>
              <p className="mt-3">固定費は、毎月ほぼ一定額が出ていく支出です。完全に同額でなくても、継続して発生するなら固定費として扱って問題ありません。</p>
              <ul className="mt-3 list-disc pl-5 space-y-1 text-stone-800">
                <li>家賃・住宅費</li>
                <li>通信費</li>
                <li>水道光熱費</li>
                <li>保険料</li>
                <li>自動車関連費</li>
                <li>教育費</li>
              </ul>
            </section>

            <section id="variable">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">変動費とは何か</h2>
              <p className="mt-3">変動費は、月によって支出額が変わるものです。生活行動やイベントで上下しやすいのが特徴です。</p>
              <ul className="mt-3 list-disc pl-5 space-y-1 text-stone-800">
                <li>食費・日用品</li>
                <li>被服費・美容費</li>
                <li>娯楽費・交際費</li>
                <li>医療費</li>
              </ul>
            </section>

            <section id="borderline">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">迷いやすい費目はどう分けるか</h2>
              <h3 className="mt-4 text-base font-semibold text-stone-900">水道光熱費</h3>
              <p className="mt-2">基本は固定費寄りで扱うのがおすすめです。厳密には、基本料金は固定費、使用量分は変動要素と考えるのが自然です。</p>
              <h3 className="mt-4 text-base font-semibold text-stone-900">スマホ代・通信費</h3>
              <p className="mt-2">固定費でよいです。見直さない限り毎月出ていきます。通話料や追加データの上振れだけ変動要素として見ても構いません。</p>
              <h3 className="mt-4 text-base font-semibold text-stone-900">サブスク</h3>
              <p className="mt-2">固定費です。自動更新で続きやすく、自分で解約しない限り止まらないためです。</p>
              <h3 className="mt-4 text-base font-semibold text-stone-900">保険料</h3>
              <p className="mt-2">固定費です。毎月または年払いで継続して発生し、見直すまで変わりにくい支出です。</p>
              <h3 className="mt-4 text-base font-semibold text-stone-900">医療費</h3>
              <p className="mt-2">変動費です。体調や突発要因で増減しやすく、毎月一定ではありません。</p>
              <h3 className="mt-4 text-base font-semibold text-stone-900">教育費</h3>
              <p className="mt-2">定期的な月謝や学費は固定費寄り、教材費や行事費は変動要素として扱うと整理しやすくなります。</p>
            </section>

            <section id="order">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">固定費と変動費、どちらから見直すべきか</h2>
              <p className="mt-3">基本は固定費からです。一度見直すと、その後も自動的に効果が続きやすいからです。</p>
              <ul className="mt-3 list-disc pl-5 space-y-1 text-stone-800">
                <li>スマホ代を月2,000円下げる</li>
                <li>使っていないサブスクを月1,500円止める</li>
                <li>保険料を月3,000円見直す</li>
              </ul>
              <p className="mt-3">変動費の節約は大切ですが、毎月の意識が必要で疲れやすいため、最初は固定費優先の方が進めやすくなります。</p>
            </section>

            <section id="for-non-bookkeepers">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">家計簿が続かない人ほど、この分け方が効く</h2>
              <p className="mt-3">細かい分類より、まず固定費と変動費の2つに分けるだけでも十分です。</p>
              <p className="mt-3">
                固定費全体の見直し順は
                <Link href="/articles/fixed-cost-checklist" className="font-bold text-stone-900 hover:underline"> 固定費見直しチェックリスト </Link>
                を参照してください。
              </p>
            </section>

            <section id="mistakes">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">よくある間違い</h2>
              <ol className="mt-3 list-decimal pl-5 space-y-2 text-stone-800">
                <li>1円単位できれいに分けようとする</li>
                <li>変動費ばかり気にする</li>
                <li>特別費を放置する</li>
              </ol>
            </section>

            <section id="quick">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">3分でできる分け方</h2>
              <ol className="mt-3 list-decimal pl-5 space-y-1 text-stone-800">
                <li>口座・カード明細を1〜3か月分見る</li>
                <li>毎月ほぼ同じ支払いを固定費に入れる</li>
                <li>月ごとに上下するものを変動費に入れる</li>
                <li>年に数回しか来ないものは特別費としてメモする</li>
              </ol>
              <p className="mt-3">
                月の収支を記録せず把握する方法は
                <Link href="/articles/household-monthly-balance-check" className="font-bold text-stone-900 hover:underline"> 家計簿が続かない人のための最低限チェック </Link>
                もあわせて確認してください。
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
                <li>固定費 = 毎月ほぼ自動で出ていくお金</li>
                <li>変動費 = 月によって上下するお金</li>
                <li>見直しは基本的に固定費から始める方が進めやすい</li>
              </ul>
            </section>
          </ArticleProse>

          <ArticleFooter articleSlug="household-fixed-vs-variable" showCta={false} />
        </div>
      </ArticlePageShell>
    </>
  );
}
