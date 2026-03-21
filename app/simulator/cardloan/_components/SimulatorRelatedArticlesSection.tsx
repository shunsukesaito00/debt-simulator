"use client";

import { useMemo } from "react";
import Link from "next/link";
import { getArticlesForSimulatorContext, type SimulatorContext } from "@/lib/articles";
import { trackEvent } from "@/lib/analytics";
import { getPrincipalBucket } from "../_lib/simulatorMappers";

export type SimulatorRelatedArticlesSectionProps = SimulatorContext;

export function SimulatorRelatedArticlesSection({
  principalMan,
  method,
  extraEnabled,
  years,
  monthlyPayment,
  monthlyPrincipal,
}: SimulatorRelatedArticlesSectionProps) {
  const articles = useMemo(
    () =>
      getArticlesForSimulatorContext({
        principalMan,
        method,
        extraEnabled,
        years,
        monthlyPayment,
        monthlyPrincipal,
      }),
    [principalMan, method, extraEnabled, years, monthlyPayment, monthlyPrincipal]
  );

  if (articles.length === 0) return null;

  const principalBucket = getPrincipalBucket(principalMan);
  const methodGroup = method as "equal_payment" | "equal_principal" | "fixed_payment" | "fixed_principal";

  return (
    <section className="ds-card ds-card-pad">
      <h2 className="text-lg font-bold text-stone-900">あわせて読みたい</h2>
      <p className="mt-1.5 text-sm text-stone-600">いまの入力条件で次に確認すると役立つ記事です。</p>
      <ul className="mt-4 space-y-3">
        {articles.map((a, i) => (
          <li key={a.slug}>
            <Link
              href={`/articles/${a.slug}`}
              className={`block rounded-ds p-4 transition ${i === 0 ? "border border-emerald-300/70 bg-emerald-50/50 shadow-ds hover:bg-emerald-50/70" : "border border-stone-200 bg-white hover:bg-stone-50/80"}`}
              onClick={() =>
                trackEvent({
                  action: "click_simulator_related_article",
                  location: "simulator_related_articles",
                  target: `/articles/${a.slug}`,
                  link_type: "contextual_article",
                  article_slug: a.slug,
                  category_key: a.category,
                  method_group: methodGroup,
                  principal_bucket: principalBucket,
                  extra_enabled: extraEnabled,
                })
              }
            >
              {i === 0 && <span className="mb-1.5 inline-block rounded bg-stone-800 px-2.5 py-0.5 text-xs font-bold text-white">おすすめ</span>}
              <span className={`font-bold text-stone-900 block ${i === 0 ? "text-base md:text-lg leading-snug" : "text-sm"}`}>{a.title}</span>
              <p className={`mt-1 text-stone-600 line-clamp-2 ${i === 0 ? "text-xs md:text-sm" : "text-xs"}`}>{a.summary}</p>
            </Link>
          </li>
        ))}
      </ul>
      <Link
        href="/articles"
        className="mt-4 inline-block text-sm font-bold text-stone-700 hover:underline"
        onClick={() =>
          trackEvent({
            action: "click_simulator_related_article",
            location: "simulator_related_articles",
            target: "/articles",
            link_type: "contextual_article",
            method_group: methodGroup,
            principal_bucket: principalBucket,
            extra_enabled: extraEnabled,
          })
        }
      >
        記事一覧を見る →
      </Link>
    </section>
  );
}
