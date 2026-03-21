import { articlesList, getArticle, getArticleLastModifiedIso } from "@/lib/articles";
import { getSiteBaseUrl, SITE_NAME } from "@/lib/site-config";

export async function GET() {
  const base = getSiteBaseUrl();
  const items = [...articlesList]
    .filter((a) => a.publishedAt)
    .sort((a, b) => (b.publishedAt ?? "").localeCompare(a.publishedAt ?? ""))
    .slice(0, 40);

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_NAME)}</title>
    <link>${base}</link>
    <description>借入返済・体験記・副業・節約の記事フィード</description>
    <language>ja</language>
    <atom:link href="${base}/feed.xml" rel="self" type="application/rss+xml" />
    ${items
      .map((a) => {
        const full = getArticle(a.slug);
        const link = `${base}/articles/${a.slug}`;
        const pub = a.publishedAt ?? "";
        const itemDate = full ? getArticleLastModifiedIso(full) ?? pub : pub;
        return `
    <item>
      <title>${escapeXml(a.title)}</title>
      <link>${link}</link>
      <guid>${link}</guid>
      <pubDate>${rfc822Date(itemDate)}</pubDate>
      <description>${escapeXml(a.summary)}</description>
    </item>`;
      })
      .join("")}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function rfc822Date(iso: string): string {
  const d = new Date(iso + "T12:00:00+09:00");
  return d.toUTCString();
}
