type ArticleChecklistProps = {
  title?: string;
  items: string[];
};

export function ArticleChecklist({ title = "余裕があったら試すこと", items }: ArticleChecklistProps) {
  if (items.length === 0) return null;
  return (
    <aside
      className="ds-section-gap rounded-2xl border border-stone-200/90 bg-amber-50/50 px-4 py-4 shadow-sm md:px-5 md:py-5"
      aria-labelledby="article-checklist-heading"
    >
      <h2 id="article-checklist-heading" className="text-sm font-medium text-stone-600">
        {title}
      </h2>
      <ol className="mt-3 list-decimal space-y-2 pl-5 text-[15px] leading-[1.75] text-stone-700 marker:text-stone-400 sm:text-base sm:leading-relaxed">
        {items.map((item) => (
          <li key={item} className="pl-1">
            {item}
          </li>
        ))}
      </ol>
    </aside>
  );
}
