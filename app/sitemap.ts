import type { MetadataRoute } from "next";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://debt-simulator-quzc.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const routes = [
    "/",
    "/simulator/cardloan",
    "/how-to",
    "/logic",
    "/faq",
    "/about",
    "/contact",
    "/privacy",
    "/disclaimer",
  ];

  return routes.map((p) => ({
    url: `${BASE}${p}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: p === "/" ? 1 : 0.7,
  }));
}