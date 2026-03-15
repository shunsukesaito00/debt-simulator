import type { ArticleReadingPoints as ArticleReadingPointsType } from "./types";

export type ArticleReadingPointsProps = ArticleReadingPointsType;

/**
 * 読み方のポイント（どの数字を見るか・誤解しやすい点）。
 * 本文の適宜の位置（結論の前後など）に置く。
 */
export function ArticleReadingPoints({
  points,
  misconceptions,
}: ArticleReadingPointsProps) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-gray-50/80 p-4" aria-label="読み方のポイント">
      <h2 className="text-sm font-black text-gray-900">読み方のポイント</h2>
      <ul className="mt-3 space-y-3">
        {points.map((p, i) => (
          <li key={i}>
            <span className="font-bold text-gray-900 text-sm">{p.label}</span>
            <p className="mt-1 text-sm text-gray-700 leading-relaxed">{p.body}</p>
          </li>
        ))}
      </ul>
      {misconceptions != null && misconceptions.length > 0 && (
        <div className="mt-4 pt-3 border-t border-gray-200">
          <span className="text-sm font-bold text-gray-800">誤解しやすい点</span>
          <ul className="mt-1 list-disc pl-5 space-y-1 text-sm text-gray-600 leading-relaxed">
            {misconceptions.map((m, i) => (
              <li key={i}>{m}</li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
