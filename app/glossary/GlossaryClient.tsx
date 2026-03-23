"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { GlossaryTerm } from "@/lib/glossary-terms";

interface GlossaryClientProps {
  terms: GlossaryTerm[];
}

export function GlossaryClient({ terms }: GlossaryClientProps) {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();

  const termsBySlug = useMemo(() => {
    return new Map(terms.map((term) => [term.slug, term]));
  }, [terms]);

  const filteredTerms = useMemo(() => {
    if (!q) return terms;
    return terms.filter((term) => {
      return term.term.toLowerCase().includes(q) || term.def.toLowerCase().includes(q);
    });
  }, [q, terms]);

  return (
    <>
      <section className="mt-6 ds-subcard p-4" aria-labelledby="glossary-index-heading">
        <h2 id="glossary-index-heading" className="text-base font-semibold text-stone-900">
          用語索引
        </h2>
        <nav className="mt-3 flex flex-wrap gap-2 text-sm">
          {terms.map((term) => (
            <a
              key={term.slug}
              href={`#${term.slug}`}
              className="rounded-full border border-stone-200 bg-white px-3 py-1 text-stone-700 hover:border-stone-300 hover:text-stone-900"
            >
              {term.term}
            </a>
          ))}
        </nav>
      </section>

      <section className="mt-6" aria-labelledby="glossary-search-heading">
        <h2 id="glossary-search-heading" className="text-base font-semibold text-stone-900">
          用語を探す
        </h2>
        <div className="mt-3">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="用語名・説明で検索"
            className="w-full rounded-md border border-stone-300 bg-white px-3 py-2 text-sm text-stone-900 placeholder:text-stone-400 focus:border-stone-500 focus:outline-none"
            aria-label="用語検索"
          />
        </div>
      </section>

      <dl className="mt-8 space-y-8">
        {filteredTerms.length === 0 ? (
          <div className="rounded-md border border-stone-200 bg-stone-50 p-4 text-sm text-stone-700">
            該当する用語がありません。別のキーワードで検索してください。
          </div>
        ) : (
          filteredTerms.map((term) => {
            const relatedTerms = (term.relatedSlugs ?? [])
              .map((slug) => termsBySlug.get(slug))
              .filter((item): item is GlossaryTerm => Boolean(item))
              .slice(0, 2);
            const relatedArticles = (term.relatedArticles ?? []).slice(0, 2);
            return (
              <div key={term.slug} id={term.slug} className="scroll-mt-24">
                <dt className="ds-page-serif text-base font-bold text-stone-900">{term.term}</dt>
                <dd className="mt-2 text-base text-stone-700 leading-relaxed">{term.def}</dd>

                {relatedTerms.length > 0 && (
                  <dd className="mt-3 text-sm text-stone-700">
                    <span className="font-semibold text-stone-900">関連語: </span>
                    {relatedTerms.map((item, idx) => (
                      <span key={item.slug}>
                        {idx > 0 ? " / " : ""}
                        <a href={`#${item.slug}`} className="text-emerald-900 underline">
                          {item.term}
                        </a>
                      </span>
                    ))}
                  </dd>
                )}

                {relatedArticles.length > 0 && (
                  <dd className="mt-2 text-sm text-stone-700">
                    <span className="font-semibold text-stone-900">関連記事: </span>
                    {relatedArticles.map((article, idx) => (
                      <span key={article.href}>
                        {idx > 0 ? " / " : ""}
                        <Link href={article.href} className="text-emerald-900 underline">
                          {article.label}
                        </Link>
                      </span>
                    ))}
                  </dd>
                )}

                {(term.externalReferences ?? []).length > 0 && (
                  <dd className="mt-2 text-sm text-stone-700">
                    <span className="font-semibold text-stone-900">参考（外部）: </span>
                    {term.externalReferences?.map((ref, idx) => (
                      <span key={ref.href}>
                        {idx > 0 ? " / " : ""}
                        <a href={ref.href} className="text-emerald-900 underline" target="_blank" rel="noopener noreferrer">
                          {ref.label}
                        </a>
                      </span>
                    ))}
                  </dd>
                )}
              </div>
            );
          })
        )}
      </dl>
    </>
  );
}
