/**
 * サイト全体のブランド・表示名（layout・ヘッダー・JSON-LD・OG で共通利用）
 * 「借入返済シミュレーター」はツール名として残し、サイト名は体験・副業・節約の発信に合わせる。
 */

export const SITE_NAME = "借金と暮らしの記録";
/** ツール・機能としての名称 */
export const SIMULATOR_PRODUCT_NAME = "借入返済シミュレーター";
/** メタデータ用の短い表記 */
export const SIMULATOR_PRODUCT_NAME_SHORT = "返済シミュレーター";
export const SITE_TAGLINE = "借金・返済・家計の記事と、返済・固定費の試算ツール";
export const SITE_DESCRIPTION =
  "体験記・副業・節約・返済・固定費に関する記事と、条件別の返済試算・固定費の試算ツールを掲載しています。投資助言や借入の勧誘は行いません。";

const envBase = process.env.NEXT_PUBLIC_SITE_URL ?? "https://debt-simulator-quzc.vercel.app";

export function getSiteBaseUrl(): string {
  return envBase.replace(/\/$/, "");
}
