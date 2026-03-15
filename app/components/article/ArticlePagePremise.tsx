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
    <section className="rounded-2xl border border-gray-200 bg-gray-50/80 p-4" aria-label="このページの前提">
      <h2 className="text-sm font-black text-gray-900">このページの前提</h2>
      <ul className="mt-2 list-disc pl-5 space-y-1 text-sm text-gray-700 leading-relaxed">
        {comparisonConditions.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
      {reasonForConditions != null && reasonForConditions !== "" && (
        <p className="mt-3 text-sm text-gray-600 leading-relaxed border-t border-gray-200 pt-3">
          <span className="font-bold text-gray-800">条件を選んだ理由：</span>
          {reasonForConditions}
        </p>
      )}
    </section>
  );
}
