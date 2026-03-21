import type { ReactNode } from "react";

type ArticleKeyTakeawaysProps = {
  title?: string;
  items: string[];
  /** アイコン代わりの先頭記号（省略時は中黒） */
  bullet?: ReactNode;
};

export function ArticleKeyTakeaways({
  title = "まずここだけ押さえる",
  items,
  bullet = "・",
}: ArticleKeyTakeawaysProps) {
  if (items.length === 0) return null;
  return (
    <aside
      className="ds-section-gap rounded-2xl border border-stone-200/90 bg-stone-50/90 px-4 py-4 shadow-sm md:px-5 md:py-5"
      aria-labelledby="article-key-takeaways-heading"
    >
      <h2
        id="article-key-takeaways-heading"
        className="text-sm font-medium text-stone-600 [font-feature-settings:normal]"
      >
        {title}
      </h2>
      <ul className="mt-3 space-y-2.5 text-[15px] leading-[1.75] text-stone-700 sm:text-base sm:leading-relaxed">
        {items.map((line) => (
          <li key={line} className="flex gap-2.5">
            <span className="shrink-0 text-stone-400" aria-hidden>
              {bullet}
            </span>
            <span>{line}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
