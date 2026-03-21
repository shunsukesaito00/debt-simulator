/**
 * サイトの著者・運営者（個人ブログ寄せ・E-E-A-T 用）。
 * 記事の JSON-LD author を Person に統一するために使用する。
 */

import { getSiteBaseUrl, SITE_NAME } from "@/lib/site-config";

const BASE = getSiteBaseUrl();

const sameAsRaw = (process.env.NEXT_PUBLIC_AUTHOR_SAME_AS ?? "").trim();
const SAME_AS = sameAsRaw
  ? sameAsRaw
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
  : [];

const authorImage = (process.env.NEXT_PUBLIC_AUTHOR_IMAGE_URL ?? "").trim();

/** 記事の著者として表示する名前（ペンネーム） */
export const AUTHOR_NAME = "シオン（ペンネーム）";

/** 記事用 JSON-LD の author（Person） */
export const ARTICLE_AUTHOR_JSON_LD: Record<string, unknown> = {
  "@type": "Person",
  name: AUTHOR_NAME,
  url: `${BASE}/about`,
  ...(SAME_AS.length > 0 ? { sameAs: SAME_AS } : {}),
  ...(authorImage ? { image: authorImage } : {}),
};

/** 記事用 JSON-LD の publisher（Organization）。運営者情報への導線として about を url に含める */
export const ARTICLE_PUBLISHER_JSON_LD = {
  "@type": "Organization" as const,
  name: SITE_NAME,
  url: `${BASE}/about`,
};
