import type { ArticleEditorMemo as ArticleEditorMemoType } from "./types";

export type ArticleEditorMemoProps = ArticleEditorMemoType & {
  /** 編集メモを表示するか（デフォルト true。false にすると非表示） */
  show?: boolean;
};

/**
 * 編集メモ（このページで判断してほしいこと・比較軸の理由・独自メモ）。
 * 読者に編集意図を伝えつつ、人間が追加しやすい短いメモ欄。
 */
export function ArticleEditorMemo({
  purpose,
  reasonAxis,
  memo,
  show = true,
}: ArticleEditorMemoProps) {
  if (!show) return null;

  return (
    <section
      className="ds-subcard p-4 text-sm text-gray-600"
      aria-label="編集メモ"
    >
      <h2 className="text-xs font-black text-gray-500 uppercase tracking-wide">編集メモ</h2>
      <p className="mt-2 text-sm text-gray-700 leading-relaxed">
        <span className="font-bold text-gray-800">このページで判断してほしいこと：</span>
        {purpose}
      </p>
      {reasonAxis != null && reasonAxis !== "" && (
        <p className="mt-2 text-sm text-gray-600 leading-relaxed">
          <span className="font-bold text-gray-700">この比較軸を採用した理由：</span>
          {reasonAxis}
        </p>
      )}
      {memo != null && memo !== "" && (
        <p className="mt-2 text-sm text-gray-600 leading-relaxed italic">{memo}</p>
      )}
    </section>
  );
}
