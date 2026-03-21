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
      <h2 className="border-l-4 border-stone-200 pl-4 text-sm font-semibold text-stone-900">{title}</h2>
      <ul className="mt-4 space-y-3">
        {points.map((p, i) => (
          <li key={i}>
            <span className="text-sm font-medium text-stone-800">{p.label}</span>
            <p className="mt-1 text-sm text-stone-700 leading-relaxed">{p.body}</p>
          </li>
        ))}
      </ul>
      {misconceptions != null && misconceptions.length > 0 && (
        <div className="mt-4 border-t border-stone-200 pt-3">
          <span className="text-sm font-medium text-stone-700">誤解しやすい点</span>
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
