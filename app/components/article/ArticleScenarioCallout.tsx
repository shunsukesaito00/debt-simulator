type ArticleScenarioCalloutProps = {
  title?: string;
  children: string;
};

/** 数値記事向け「例: こんな読み方」／体験記向けの導入補助（フィクションまたは一般化した文脈） */
export function ArticleScenarioCallout({
  title = "こんな読み方でもOK",
  children,
}: ArticleScenarioCalloutProps) {
  return (
    <aside
      className="ds-section-gap rounded-2xl border border-stone-200/80 bg-white px-4 py-4 shadow-sm md:px-5 md:py-5"
      aria-labelledby="article-scenario-heading"
    >
      <h2 id="article-scenario-heading" className="text-sm font-medium text-stone-600">
        {title}
      </h2>
      <p className="mt-2.5 text-[15px] leading-[1.85] text-stone-700 sm:text-base">{children}</p>
    </aside>
  );
}
