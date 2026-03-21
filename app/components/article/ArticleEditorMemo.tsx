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
      className="rounded-2xl border border-dashed border-stone-200/90 bg-stone-50/80 p-4 text-sm text-stone-600 md:p-5"
      aria-label="編集メモ"
    >
      <div className="border-l-[3px] border-stone-300/70 pl-3">
        <h2 className="text-xs font-medium text-stone-500">メモ（この記事のねらい）</h2>
        <p className="mt-2 text-[15px] leading-[1.8] text-stone-700 sm:text-sm">{purpose}</p>
        {reasonAxis != null && reasonAxis !== "" && (
          <p className="mt-2 text-[15px] leading-[1.8] text-stone-600 sm:text-sm">{reasonAxis}</p>
        )}
        {memo != null && memo !== "" && (
          <p className="mt-2 text-[15px] leading-[1.8] text-stone-600 sm:text-sm">{memo}</p>
        )}
      </div>
    </section>
  );
}
