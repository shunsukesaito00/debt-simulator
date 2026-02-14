// app/sitemap.ts
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://debt-simulator-akvc.vercel.app";
  const now = new Date();

  const routes = [
    "/",
    "/simulator/cardloan",
    "/how-to",
    "/logic",
    "/faq",
    "/privacy",
    "/disclaimer",
    "/contact",
    "/about",
  ];

  return routes.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: path === "/" ? 1 : 0.7,
  }));
}