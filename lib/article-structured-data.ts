/**
 * 構造化データ（BreadcrumbList, FAQPage, QAPage）を生成するヘルパー。
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

/** /faq 用 BreadcrumbList */
export function getFaqPageBreadcrumbJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "ホーム", item: BASE },
      { "@type": "ListItem", position: 2, name: "FAQ", item: `${BASE}/faq` },
    ],
  };
}

/**
 * 単一の質問に答えるページ用（schema.org/QAPage）。
 * FAQPage とは別枠。本文と同じ文言を渡すこと。
 */
export function getQaPageJsonLd(params: { question: string; answer: string; pageUrl: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "QAPage",
    url: params.pageUrl,
    mainEntity: {
      "@type": "Question",
      name: params.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: params.answer,
      },
    },
  };
}

/** Q&A 単体ページ用 BreadcrumbList（ホーム → 当該ページ） */
export function getQaPageBreadcrumbJsonLd(pageTitle: string, pagePath: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "ホーム", item: BASE },
      { "@type": "ListItem", position: 2, name: pageTitle, item: `${BASE}${pagePath}` },
    ],
  };
}
