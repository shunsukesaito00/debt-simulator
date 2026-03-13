"use client";

import { useMemo } from "react";
import Link from "next/link";
import { getArticlesForRepaymentImprovement } from "@/lib/articles";
import { trackEvent } from "@/lib/analytics";

export function SimulatorRepaymentImprovementSection() {
  const articles = useMemo(() => getArticlesForRepaymentImprovement(), []);

  if (articles.length === 0) return null;

  return (
    <section className="mt-6 rounded-xl border-2 border-emerald-300 bg-emerald-50/70 p-5" aria-label="返済改善の導線">
      <div className="flex items-center gap-2">
        <span className="rounded bg-emerald-600 px-2 py-0.5 text-xs font-bold text-white">改善</span>
        <h2 className="text-base font-bold text-emerald-900">返済を改善したい方へ</h2>
      </div>
      <p className="mt-1.5 text-sm text-emerald-800/90">
        返済負担を軽くする方法を知りたい方向けです。繰り上げ返済、返済方式の見直し、長期返済のリスク理解に役立つ記事をまとめています。シミュレーター結果を踏まえて、次の行動を考える際の読み物としてご利用ください。
      </p>
      <ul className="mt-4 space-y-3">
        {articles.map((a) => (
          <li key={a.slug}>
            <Link
              href={`/articles/${a.slug}`}
              className="block rounded-xl border border-emerald-200 bg-white p-4 transition hover:bg-emerald-50/50"
              onClick={() =>
                trackEvent({
                  action: "click_simulator_improvement_article",
                  location: "simulator_repayment_improvement",
                  target: `/articles/${a.slug}`,
                  link_type: "improvement_article",
                  article_slug: a.slug,
                  category_key: a.category,
                })
              }
            >
              <span className="text-sm font-bold text-gray-900">{a.title}</span>
              <p className="mt-1 text-xs text-gray-600 line-clamp-2">{a.summary}</p>
            </Link>
          </li>
        ))}
      </ul>
      <Link
        href="/articles"
        className="mt-4 inline-block text-sm font-bold text-gray-700 hover:underline"
        onClick={() =>
          trackEvent({
            action: "click_simulator_improvement_article",
            location: "simulator_repayment_improvement",
            target: "/articles",
            link_type: "improvement_article",
          })
        }
      >
        記事一覧を見る →
      </Link>
    </section>
  );
}
