import type { ArticleReadingPoints as ArticleReadingPointsType } from "./types";

export type ArticleReadingPointsProps = ArticleReadingPointsType & {
  /** 見出し（省略時は「読み方のポイント」） */
  title?: string;
};

/**
 * 読み方のポイント（どの数字を見るか・誤解しやすい点）。
 * 本文の適宜の位置（結論の前後など）に置く。
 */
export function ArticleReadingPoints({
  points,
  misconceptions,
  title = "読み方のポイント",
}: ArticleReadingPointsProps) {
  return (
    <section className="ds-subcard p-4" aria-label={title}>
      <div className="border-l-4 border-stone-200 pl-4">
        <div className="text-xs font-black uppercase tracking-wide text-stone-500">ひとこと</div>
        <p className="mt-1 text-sm text-stone-700 leading-relaxed">
          数字を追いかける前に、どこを見ればいいかを揃えると迷いが減ります。
        </p>
      </div>

      <div className="ds-hr my-3" />
      <h2 className="mt-3 text-sm font-black text-stone-900">{title}</h2>
      <ul className="mt-3 space-y-3">
        {points.map((p, i) => (
          <li key={i}>
            <span className="font-bold text-stone-900 text-sm">{p.label}</span>
            <p className="mt-1 text-sm text-stone-700 leading-relaxed">{p.body}</p>
          </li>
        ))}
      </ul>
      {misconceptions != null && misconceptions.length > 0 && (
        <div className="mt-4 pt-3 border-t border-stone-200">
          <span className="text-sm font-bold text-stone-800">誤解しやすい点</span>
          <ul className="mt-1 list-disc pl-5 space-y-1 text-sm text-stone-600 leading-relaxed">
            {misconceptions.map((m, i) => (
              <li key={i}>{m}</li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
