/**
 * People-first 記事ページで使うブロックの型定義。
 * 新規記事作成時にこの型に沿ってデータを渡すと、共通ブロックで表示できる。
 */

/** このページの前提：比較条件と選んだ理由 */
export type ArticlePremise = {
  /** この記事で採用している比較条件（例: 年利15%、元利均等、3年・5年返済） */
  comparisonConditions: string[];
  /** その条件を選んだ理由（省略可） */
  reasonForConditions?: string;
};

/** 読み方のポイント：1項目 */
export type ReadingPoint = {
  /** 見出し（例: どの数字を見るか） */
  label: string;
  /** 本文 */
  body: string;
};

/** 読み方のポイントブロック用 */
export type ArticleReadingPoints = {
  /** どの数字を見るべきか・読み方のポイント一覧 */
  points: ReadingPoint[];
  /** 誤解しやすい点（省略可） */
  misconceptions?: string[];
};

/** 編集メモ：判断してほしいこと・比較軸の理由・独自メモ */
export type ArticleEditorMemo = {
  /** このページで何を判断してほしいか */
  purpose: string;
  /** この比較軸を採用した理由（省略可） */
  reasonAxis?: string;
  /** 人間が追加する短いメモ（省略可） */
  memo?: string;
};
