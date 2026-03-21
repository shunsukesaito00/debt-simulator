type TocItem = { id: string; label: string };

export function ArticleToc({ items }: { items: TocItem[] }) {
  if (items.length === 0) return null;
  return (
    <details open className="ds-subcard mt-6 p-3 sm:p-4">
      <summary className="cursor-pointer select-none text-sm font-semibold text-stone-800 [-webkit-tap-highlight-color:transparent]">
        目次
      </summary>
      <ul className="mt-2 space-y-0.5 text-sm leading-snug text-stone-700">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="block rounded-md px-2 py-2.5 text-stone-700 transition-colors hover:bg-stone-50/90 hover:text-emerald-900 hover:underline sm:py-2"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </details>
  );
}
