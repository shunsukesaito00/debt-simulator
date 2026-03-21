import type { MetadataRoute } from "next";
import { articlesList, getArticle, getArticleLastModifiedIso } from "@/lib/articles";
import { getIncomeReports } from "@/lib/income-log";
import { getSiteBaseUrl } from "@/lib/site-config";

const BASE = getSiteBaseUrl();

function lastModForArticleSlug(slug: string): Date {
  const a = getArticle(slug);
  if (!a) return new Date();
  const iso = getArticleLastModifiedIso(a) ?? a.publishedAt;
  if (!iso) return new Date();
  return new Date(iso + "T12:00:00+09:00");
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[0]["changeFrequency"] }[] = [
    { path: "/", priority: 1, changeFrequency: "weekly" },
    { path: "/welcome", priority: 0.8, changeFrequency: "monthly" },
    { path: "/simulator/cardloan", priority: 0.9, changeFrequency: "monthly" },
    { path: "/articles", priority: 0.9, changeFrequency: "weekly" },
    { path: "/how-to", priority: 0.6, changeFrequency: "monthly" },
    { path: "/logic", priority: 0.6, changeFrequency: "monthly" },
    { path: "/faq", priority: 0.6, changeFrequency: "monthly" },
    { path: "/qa/what-can-simulator-do", priority: 0.55, changeFrequency: "monthly" },
    { path: "/about", priority: 0.7, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.5, changeFrequency: "yearly" },
    { path: "/privacy", priority: 0.4, changeFrequency: "yearly" },
    { path: "/disclaimer", priority: 0.4, changeFrequency: "yearly" },
    { path: "/quick-reference", priority: 0.7, changeFrequency: "monthly" },
    { path: "/tools/fixed-cost-impact", priority: 0.8, changeFrequency: "monthly" },
    { path: "/resources/consultation-guide", priority: 0.7, changeFrequency: "monthly" },
    { path: "/updates", priority: 0.5, changeFrequency: "weekly" },
    { path: "/income", priority: 0.6, changeFrequency: "weekly" },
    { path: "/glossary", priority: 0.6, changeFrequency: "monthly" },
    { path: "/search", priority: 0.5, changeFrequency: "monthly" },
    { path: "/stories/submit", priority: 0.4, changeFrequency: "yearly" },
    { path: "/feed.xml", priority: 0.3, changeFrequency: "daily" },
  ];

  const categoryPaths = [
    "story",
    "side-income",
    "saving",
    "fixed-cost",
    "household",
    "improvement-effect",
    "loan-amount",
    "repayment-method",
    "revolving",
    "repayment-improvement",
    "repayment-planning",
  ].map((slug) => ({
    path: `/articles/category/${slug}`,
    priority: 0.75,
    changeFrequency: "weekly" as const,
  }));

  const staticRoutes = [...staticEntries, ...categoryPaths].map((e) => ({
    url: `${BASE}${e.path}`,
    lastModified: now,
    changeFrequency: e.changeFrequency,
    priority: e.priority,
  }));

  const articleRoutes = articlesList.map((a) => ({
    url: `${BASE}/articles/${a.slug}`,
    lastModified: lastModForArticleSlug(a.slug),
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  const incomeRoutes = getIncomeReports().map((r) => ({
    url: `${BASE}/income/${r.month}`,
    lastModified: new Date(`${r.publishedAt}T12:00:00+09:00`),
    changeFrequency: "monthly" as const,
    priority: 0.55,
  }));

  return [...staticRoutes, ...articleRoutes, ...incomeRoutes];
}
