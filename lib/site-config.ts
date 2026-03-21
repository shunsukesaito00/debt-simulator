/**
 * サイト全体のブランド・表示名（layout・ヘッダー・JSON-LD・OG で共通利用）
 * 「借入返済シミュレーター」はツール名として残し、サイト名は体験・副業・節約の発信に合わせる。
 */

export const SITE_NAME = "借金と暮らしの記録";
/** ツール・機能としての名称 */
export const SIMULATOR_PRODUCT_NAME = "借入返済シミュレーター";
/** メタデータ用の短い表記 */
export const SIMULATOR_PRODUCT_NAME_SHORT = "返済シミュレーター";
export const SITE_TAGLINE = "生活再建・改善を、体験記と数字と副業実験で記録するサイト";
export const SITE_DESCRIPTION =
  "生活再建・改善をテーマに、体験記・返済/家計/固定費の記事、試算ツール、副業実験・収益レポートを掲載しています。投資助言や借入の勧誘は行いません。";

const envBase = process.env.NEXT_PUBLIC_SITE_URL ?? "https://debt-simulator-quzc.vercel.app";

export function getSiteBaseUrl(): string {
  return envBase.replace(/\/$/, "");
}
