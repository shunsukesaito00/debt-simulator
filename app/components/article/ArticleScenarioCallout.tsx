type ArticleScenarioCalloutProps = {
  title?: string;
  children: string;
};

/** 数値記事向け「例: こんな読み方」／体験記向けの導入補助（フィクションまたは一般化した文脈） */
export function ArticleScenarioCallout({
  title = "読み方の例",
  children,
}: ArticleScenarioCalloutProps) {
  return (
    <aside
      className="ds-section-gap rounded-lg border border-stone-200 bg-stone-50/90 px-4 py-4 md:px-5 md:py-5"
      aria-labelledby="article-scenario-heading"
    >
      <h2 id="article-scenario-heading" className="text-sm font-semibold text-stone-900">
        {title}
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-stone-700">{children}</p>
    </aside>
  );
}
