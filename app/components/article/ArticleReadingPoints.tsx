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
    <section className="rounded-2xl border border-stone-200/90 bg-white p-4 shadow-sm md:p-5" aria-label={title}>
      <h2 className="border-l-[3px] border-stone-300/90 pl-3 text-sm font-medium text-stone-700">{title}</h2>
      <ul className="mt-4 space-y-3.5">
        {points.map((p, i) => (
          <li key={i}>
            <span className="text-[15px] font-medium text-stone-800 sm:text-sm">{p.label}</span>
            <p className="mt-1.5 text-[15px] leading-[1.8] text-stone-700 sm:text-sm sm:leading-relaxed">{p.body}</p>
          </li>
        ))}
      </ul>
      {misconceptions != null && misconceptions.length > 0 && (
        <div className="mt-4 border-t border-stone-200/80 pt-3">
          <span className="text-sm font-medium text-stone-600">誤解しやすい点</span>
          <ul className="mt-1.5 list-disc pl-5 space-y-1.5 text-[15px] leading-relaxed text-stone-600 sm:text-sm">
            {misconceptions.map((m, i) => (
              <li key={i}>{m}</li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
