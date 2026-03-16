import type { MetadataRoute } from "next";
import { articlesList } from "@/lib/articles";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://debt-simulator-quzc.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = [
    "/",
    "/simulator/cardloan",
    "/articles",
    "/how-to",
    "/logic",
    "/faq",
    "/about",
    "/contact",
    "/privacy",
    "/disclaimer",
    "/quick-reference",
    "/tools/fixed-cost-impact",
  ];

  const articleRoutes = articlesList.map((a) => `/articles/${a.slug}`);

  return [...staticRoutes, ...articleRoutes].map((p) => ({
    url: `${BASE}${p}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: p === "/" ? 1 : 0.7,
  }));
}