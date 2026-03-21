/**
 * サイト全体のブランド・表示名（layout・ヘッダー・JSON-LD・OG で共通利用）
 * 「借入返済シミュレーター」はツール名として残し、サイト名は体験・副業・節約の発信に合わせる。
 */

export const SITE_NAME = "借金と暮らしの記録";
/** ツール・機能としての名称 */
export const SIMULATOR_PRODUCT_NAME = "借入返済シミュレーター";
/** メタデータ用の短い表記 */
export const SIMULATOR_PRODUCT_NAME_SHORT = "返済シミュレーター";
export const SITE_TAGLINE = "体験・数字・暮らしの工夫で、返済を一緒に考える";
export const SITE_DESCRIPTION =
  "借金の体験記・副業・節約による家計改善を発信。条件別の返済試算シミュレーターと記事で、自分のペースで判断材料を集められます。投資助言や借入の勧誘は行いません。";

const envBase = process.env.NEXT_PUBLIC_SITE_URL ?? "https://debt-simulator-quzc.vercel.app";

export function getSiteBaseUrl(): string {
  return envBase.replace(/\/$/, "");
}
