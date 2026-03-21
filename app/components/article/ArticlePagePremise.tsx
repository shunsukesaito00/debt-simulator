import type { ArticlePremise } from "./types";

export type ArticlePagePremiseProps = ArticlePremise;

/**
 * このページの前提（比較条件・条件を選んだ理由）。
 * 記事冒頭または目次の直後に置くと、読者が前提を把握しやすい。
 */
export function ArticlePagePremise({
  comparisonConditions,
  reasonForConditions,
}: ArticlePagePremiseProps) {
  return (
    <section className="ds-subcard p-4" aria-label="このページの前提">
      <div className="border-l-4 border-stone-200 pl-4">
        <h2 className="text-sm font-black text-stone-900">このページの前提</h2>
        <div className="ds-hr my-3" />
        <ul className="mt-2 list-disc pl-5 space-y-1 text-sm text-stone-700 leading-relaxed">
          {comparisonConditions.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
        {reasonForConditions != null && reasonForConditions !== "" && (
          <p className="mt-3 text-sm text-stone-600 leading-relaxed border-t border-stone-200 pt-3">
            <span className="font-bold text-stone-800">条件を選んだ理由：</span>
            {reasonForConditions}
          </p>
        )}
      </div>
    </section>
  );
}
