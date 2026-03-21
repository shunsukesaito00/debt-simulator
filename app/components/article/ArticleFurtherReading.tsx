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
export function ArticleFurtherReading({ title = "あわせて読む・参照", items }: ArticleFurtherReadingProps) {
  if (items.length === 0) return null;
  return (
    <nav
      className="ds-section-gap rounded-lg border border-stone-200 bg-white px-4 py-4 md:px-5 md:py-5"
      aria-label={title}
    >
      <h2 className="ds-label uppercase tracking-wider text-stone-600">{title}</h2>
      <ul className="mt-3 space-y-3 text-sm">
        {items.map((item) => (
          <li key={item.href}>
            {item.external ? (
              <a href={item.href} className="ds-link-prose font-medium" target="_blank" rel="noopener noreferrer">
                {item.label}
                <span className="sr-only">（新しいタブで開く）</span>
              </a>
            ) : (
              <Link href={item.href} className="ds-link-prose font-medium">
                {item.label}
              </Link>
            )}
            {item.hint ? <p className="mt-0.5 text-xs leading-relaxed text-stone-600">{item.hint}</p> : null}
          </li>
        ))}
      </ul>
    </nav>
  );
}
