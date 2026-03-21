import type { ReactNode } from "react";

type ArticleKeyTakeawaysProps = {
  title?: string;
  items: string[];
  /** アイコン代わりの先頭記号（省略時は中黒） */
  bullet?: ReactNode;
};

export function ArticleKeyTakeaways({
  title = "この記事で分かること",
  items,
  bullet = "・",
}: ArticleKeyTakeawaysProps) {
  if (items.length === 0) return null;
  return (
    <aside
      className="ds-section-gap rounded-lg border border-emerald-200/80 bg-emerald-50/50 px-4 py-4 md:px-5 md:py-5"
      aria-labelledby="article-key-takeaways-heading"
    >
      <h2 id="article-key-takeaways-heading" className="ds-label uppercase tracking-wider text-emerald-900/90">
        {title}
      </h2>
      <ul className="mt-3 space-y-2.5 text-sm leading-relaxed text-stone-800">
        {items.map((line) => (
          <li key={line} className="flex gap-2">
            <span className="shrink-0 text-emerald-800/90" aria-hidden>
              {bullet}
            </span>
            <span>{line}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
