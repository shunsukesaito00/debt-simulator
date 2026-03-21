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
    <section className="rounded-2xl border border-stone-200/90 bg-white p-4 shadow-sm md:p-5" aria-label="このページの前提">
      <div className="border-l-[3px] border-stone-300/90 pl-3">
        <h2 className="text-sm font-medium text-stone-700">このページの前提</h2>
        <div className="ds-hr my-3 opacity-80" />
        <ul className="mt-2 list-disc pl-5 space-y-1.5 text-[15px] leading-[1.75] text-stone-700 sm:text-sm sm:leading-relaxed">
          {comparisonConditions.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
        {reasonForConditions != null && reasonForConditions !== "" && (
          <p className="mt-3 border-t border-stone-200/80 pt-3 text-[15px] leading-[1.8] text-stone-600 sm:text-sm">
            {reasonForConditions}
          </p>
        )}
      </div>
    </section>
  );
}
