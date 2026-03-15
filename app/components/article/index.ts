/**
 * People-first 記事ページ用の共通ブロック。
 * 新規記事では types の型に沿ってデータを渡し、必要に応じてこれらのコンポーネントを配置する。
 */
export { ArticlePagePremise } from "./ArticlePagePremise";
export { ArticleReadingPoints } from "./ArticleReadingPoints";
export { ArticleEditorMemo } from "./ArticleEditorMemo";
export type { ArticlePremise, ReadingPoint, ArticleReadingPoints as ArticleReadingPointsData, ArticleEditorMemo as ArticleEditorMemoData } from "./types";
