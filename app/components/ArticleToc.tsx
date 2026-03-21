type TocItem = { id: string; label: string };

export function ArticleToc({ items }: { items: TocItem[] }) {
  if (items.length === 0) return null;
  return (
    <details open className="ds-subcard mt-6 p-4">
      <summary className="cursor-pointer select-none text-sm font-bold text-stone-900">
        目次
      </summary>
      <ul className="mt-3 space-y-1.5 text-sm">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="text-stone-700 transition-colors hover:text-emerald-900 hover:underline"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </details>
  );
}
