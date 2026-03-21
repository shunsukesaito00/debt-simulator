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
      className="ds-subcard p-4 text-sm text-stone-600"
      aria-label="編集メモ"
    >
      <div className="border-l-4 border-stone-200 pl-4">
        <h2 className="ds-label text-stone-500">メモ</h2>
        <p className="mt-2 text-sm text-stone-700 leading-relaxed">{purpose}</p>
        {reasonAxis != null && reasonAxis !== "" && (
          <p className="mt-2 text-sm text-stone-600 leading-relaxed">{reasonAxis}</p>
        )}
        {memo != null && memo !== "" && (
          <p className="mt-2 text-sm text-stone-600 leading-relaxed italic">{memo}</p>
        )}
      </div>
    </section>
  );
}
