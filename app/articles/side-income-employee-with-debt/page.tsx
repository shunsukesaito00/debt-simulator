import type { Metadata } from "next";
import { ArticleFooter } from "@/app/components/ArticleFooter";
import { ArticlePagePremise, ArticleReadingPoints, ArticleEditorMemo, ArticleStandardBlocks, ArticleProse } from "@/app/components/article";
import { ArticlePageShell } from "@/app/components/ArticlePageShell";
import { getArticleBreadcrumbJsonLd } from "@/lib/article-structured-data";
import { ARTICLE_AUTHOR_JSON_LD, ARTICLE_PUBLISHER_JSON_LD } from "@/lib/site-author";
import { getArticle, getArticleLastModifiedIso, CATEGORY_LABELS } from "@/lib/articles";
import { getSiteBaseUrl } from "@/lib/site-config";

const SLUG = "side-income-employee-with-debt" as const;
const article = getArticle(SLUG)!;

const BASE = getSiteBaseUrl();
const ARTICLE_URL = `${BASE}/articles/${SLUG}`;
const ARTICLE_TITLE = article.title;
const publishedAt = article.publishedAt ?? "2025-01-01";
const modified = getArticleLastModifiedIso(article) ?? publishedAt;

export const metadata: Metadata = {
  title: ARTICLE_TITLE,
  description: article.summary,
  alternates: { canonical: ARTICLE_URL },
  openGraph: {
    title: ARTICLE_TITLE,
    description: article.summary,
    url: ARTICLE_URL,
    type: "article",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: ARTICLE_TITLE,
  description: article.summary,
  url: ARTICLE_URL,
  datePublished: publishedAt,
  dateModified: modified,
  author: ARTICLE_AUTHOR_JSON_LD,
  publisher: ARTICLE_PUBLISHER_JSON_LD,
};

const breadcrumbJsonLd = getArticleBreadcrumbJsonLd(ARTICLE_URL, ARTICLE_TITLE);

const premise = {
  comparisonConditions: ["個人の体験・整理記事（一般論の正解を示すものではありません）"],
  reasonForConditions: "借入・返済・生活の状況は人それぞれです。契約内容・税務・労務は専門家・公的機関の説明を優先してください。",
};

const readingPoints = {
  points: [
    { label: "読み方", body: "体験や考え方の一例として読み、自分の状況に合わせて判断してください。" },
    { label: "限界", body: "記事は参考情報であり、投資助言・借入勧誘・法律相談ではありません。" },
  ],
  misconceptions: ["「この通りにすればよい」とは限りません。条件や時期で最適解は変わります。"],
};

const editorMemo = {
  purpose: "この記事が、読む方の判断材料のひとつになれば幸いです。",
  reasonAxis: "同じような状況の方の参考になれば幸いです。",
  memo: "気づきがあれば内容を更新していきます。",
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <ArticlePageShell
        currentPageTitle={ARTICLE_TITLE}
        publishedAt={publishedAt}
        category={article.category}
      >
        <div className="ds-card ds-card-pad">
          <p className="text-xs font-semibold text-stone-500">
            {CATEGORY_LABELS[article.category]}
          </p>
          <h1 className="ds-page-serif mt-2 text-2xl font-bold text-stone-900 md:text-3xl">{ARTICLE_TITLE}</h1>
          <p className="mt-4 text-sm text-stone-600 leading-relaxed">{article.summary}</p>

          <ArticleStandardBlocks slug={SLUG} />

          <ArticlePagePremise {...premise} />

          <ArticleProse className="mt-8 space-y-6">
            <section>
              <h2 className="ds-page-serif text-lg font-bold text-stone-900">はじめに</h2>
              <p className="mt-3">
                この記事は、運営者個人の体験と整理のメモです。<strong>投資助言・借入勧誘・法律・税務の専門的な判断は行いません。</strong>
                契約内容・手続きは各金融機関・公的窓口・専門家の説明を優先してください。
              </p>
            </section>
            <section>
              <h2 className="ds-page-serif text-lg font-bold text-stone-900">本文</h2>
              <p className="mt-3">
                返済や家計の見直しは、数字と生活の両方を見ながら進める必要があります。このページでは、当時の状況と、あとから振り返って整理したポイントを短くまとめています。
                詳細な数値比較は関連記事やシミュレーターもあわせてご利用ください。
              </p>
              <p className="mt-3">
                状況が近い場合の参考情報として読んでください。必要に応じて
                <a href="/resources/consultation-guide" className="font-semibold text-emerald-900 underline">
                  相談先・公的支援の一覧
                </a>
                をご確認ください。
              </p>
            </section>
          </ArticleProse>

          <div className="mt-10">
            <ArticleReadingPoints {...readingPoints} />
          </div>
          <div className="mt-6">
            <ArticleEditorMemo {...editorMemo} />
          </div>

          <ArticleFooter articleSlug={SLUG} />
        </div>
      </ArticlePageShell>
    </>
  );
}
