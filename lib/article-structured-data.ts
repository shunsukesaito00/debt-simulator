/**
 * 記事ページ用の構造化データ（BreadcrumbList, FAQPage）を生成するヘルパー。
 * SEO・リッチリザルト用。
 */

import { ARTICLES_INDEX_CRUMB_LABEL } from "@/lib/article-breadcrumb";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://debt-simulator-quzc.vercel.app";

export type FaqItem = { question: string; answer: string };

export function getArticleBreadcrumbJsonLd(articleUrl: string, articleTitle: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "ホーム", item: BASE },
      { "@type": "ListItem", position: 2, name: ARTICLES_INDEX_CRUMB_LABEL, item: `${BASE}/articles` },
      { "@type": "ListItem", position: 3, name: articleTitle, item: articleUrl },
    ],
  };
}

export function getArticleFaqJsonLd(faqItems: FaqItem[]) {
  if (faqItems.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}
