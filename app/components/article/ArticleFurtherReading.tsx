import Link from "next/link";

export type FurtherReadingItem = {
  href: string;
  label: string;
  /** 1行の要約（任意） */
  hint?: string;
  external?: boolean;
};

type ArticleFurtherReadingProps = {
  title?: string;
  items: FurtherReadingItem[];
};

/** サイト内関連記事・外部はリンク＋任意の1行要約（転載ではなく導線） */
export function ArticleFurtherReading({ title = "関連する記事・ページ", items }: ArticleFurtherReadingProps) {
  if (items.length === 0) return null;
  return (
    <nav
      className="ds-section-gap rounded-2xl border border-stone-200/90 bg-white px-4 py-4 shadow-sm md:px-5 md:py-5"
      aria-label={title}
    >
      <h2 className="text-sm font-medium text-stone-600">{title}</h2>
      <ul className="mt-3 space-y-2.5 text-[15px] leading-relaxed sm:text-base">
        {items.map((item) => (
          <li key={item.href}>
            {item.external ? (
              <a
                href={item.href}
                className="text-emerald-900 underline decoration-emerald-200/90 underline-offset-[3px] transition hover:decoration-emerald-700"
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.label}
                <span className="sr-only">（新しいタブで開く）</span>
              </a>
            ) : (
              <Link
                href={item.href}
                className="text-emerald-900 underline decoration-emerald-200/90 underline-offset-[3px] transition hover:decoration-emerald-700"
              >
                {item.label}
              </Link>
            )}
            {item.hint ? <p className="mt-0.5 text-sm leading-relaxed text-stone-500">{item.hint}</p> : null}
          </li>
        ))}
      </ul>
    </nav>
  );
}
