/**
 * サイト更新ログ。/updates とトップの「最近の更新」で利用。
 */
export type SiteUpdateEntry = {
  date: string; // YYYY-MM-DD
  title: string;
  detail: string;
  href?: string;
};

export const SITE_UPDATES: SiteUpdateEntry[] = [
  {
    date: "2026-03-19",
    title: "体験記・副業・節約の記事セクションを拡充",
    detail: "体験記・副業・節約の記事を増やし、カテゴリ別の一覧、相談先ガイド、用語集、更新のお知らせなどを追加しました。",
    href: "/articles",
  },
  {
    date: "2026-03-16",
    title: "借金500万円・リボ50万円などの記事を追加",
    detail: "条件別の返済比較記事を追加しました。",
    href: "/articles",
  },
  {
    date: "2025-03-11",
    title: "固定費・家計カテゴリの記事を公開",
    detail: "固定費チェックリストや家計の把握方法などを追加しました。",
    href: "/articles#fixed-cost",
  },
];
