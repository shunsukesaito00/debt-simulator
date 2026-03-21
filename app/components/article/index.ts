/**
 * People-first 記事ページ用の共通ブロック。
 * 新規記事では types の型に沿ってデータを渡し、必要に応じてこれらのコンポーネントを配置する。
 */
export { ArticlePagePremise } from "./ArticlePagePremise";
export { ArticleReadingPoints } from "./ArticleReadingPoints";
export { ArticleEditorMemo } from "./ArticleEditorMemo";
export { ArticleAuthorCard } from "./ArticleAuthorCard";
export { ArticleProse, ArticleWideBlock } from "./ArticleProse";
export { ArticleKeyTakeaways } from "./ArticleKeyTakeaways";
export { ArticleScenarioCallout } from "./ArticleScenarioCallout";
export { ArticleChecklist } from "./ArticleChecklist";
export { ArticleFurtherReading } from "./ArticleFurtherReading";
export type { FurtherReadingItem } from "./ArticleFurtherReading";
export { ArticleStandardBlocks } from "./ArticleStandardBlocks";
export type { ArticleStandardBlocksProps } from "./ArticleStandardBlocks";
export type { ArticlePremise, ReadingPoint, ArticleReadingPoints as ArticleReadingPointsData, ArticleEditorMemo as ArticleEditorMemoData } from "./types";
