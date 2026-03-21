/**
 * サイトの著者・運営者（個人ブログ寄せ・E-E-A-T 用）。
 * 記事の JSON-LD author を Person に統一するために使用する。
 */

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://debt-simulator-quzc.vercel.app";

/** 記事の著者として表示する名前（個人を表すペンネームまたは運営者名） */
export const AUTHOR_NAME = "借入返済シミュレーター運営者";

/** 記事用 JSON-LD の author（Person） */
export const ARTICLE_AUTHOR_JSON_LD = {
  "@type": "Person" as const,
  name: AUTHOR_NAME,
};

/** 記事用 JSON-LD の publisher（Organization）。運営者情報への導線として about を url に含める */
export const ARTICLE_PUBLISHER_JSON_LD = {
  "@type": "Organization" as const,
  name: "借入返済シミュレーター",
  url: `${BASE}/about`,
};
