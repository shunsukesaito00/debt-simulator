type ArticleChecklistProps = {
  title?: string;
  items: string[];
};

export function ArticleChecklist({ title = "次にやること（チェック）", items }: ArticleChecklistProps) {
  if (items.length === 0) return null;
  return (
    <aside
      className="ds-section-gap rounded-lg border border-amber-200/90 bg-amber-50/40 px-4 py-4 md:px-5 md:py-5"
      aria-labelledby="article-checklist-heading"
    >
      <h2 id="article-checklist-heading" className="text-sm font-semibold text-amber-950/90">
        {title}
      </h2>
      <ul className="mt-3 list-none space-y-2 text-sm leading-relaxed text-stone-800">
        {items.map((item, i) => (
          <li key={item} className="flex gap-2">
            <span className="font-mono text-xs text-amber-800/90 tabular-nums" aria-hidden>
              {String(i + 1).padStart(2, "0")}
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
