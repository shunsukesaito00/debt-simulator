"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { CATEGORY_LABELS, type ArticleCategory } from "@/lib/articles";

export type SearchArticleItem = {
  slug: string;
  title: string;
  summary: string;
  category: ArticleCategory;
};

type Props = { articles: SearchArticleItem[] };

export function SiteSearchClient({ articles }: Props) {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return articles.slice(0, 30);
    return articles.filter(
      (a) =>
        a.title.toLowerCase().includes(t) ||
        a.summary.toLowerCase().includes(t) ||
        CATEGORY_LABELS[a.category].toLowerCase().includes(t) ||
        a.slug.toLowerCase().includes(t),
    );
  }, [articles, q]);

  return (
    <div>
      <label htmlFor="site-search" className="sr-only">
        キーワードで記事を検索
      </label>
      <input
        id="site-search"
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="タイトル・要約・カテゴリ名で検索"
        className="w-full rounded-lg border border-stone-200 bg-white px-4 py-3 text-sm text-stone-900 shadow-sm focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-700/25"
        autoComplete="off"
      />
      <p className="mt-2 text-xs text-stone-500">{filtered.length} 件表示</p>
      <ul className="mt-6 space-y-3">
        {filtered.map((a) => (
          <li key={a.slug}>
            <Link
              href={`/articles/${a.slug}`}
              className="block rounded-xl border border-stone-200/55 bg-white/55 p-4 shadow-sm transition hover:border-stone-300/80 hover:bg-white/90"
            >
              <span className="rounded-md border border-stone-200 bg-stone-50 px-2 py-0.5 text-[10px] font-semibold text-stone-500">
                {CATEGORY_LABELS[a.category]}
              </span>
              <span className="mt-2 block text-sm font-semibold text-stone-900 leading-snug">{a.title}</span>
              <p className="mt-1 text-xs text-stone-500 leading-relaxed line-clamp-2">{a.summary}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
