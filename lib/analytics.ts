/**
 * クリック計測（GA4 カスタムイベント）用の最小ユーティリティ。
 * 個人情報・生の入力値（金額・金利・年数など）は送らない。
 * 送るのは action / location / target / link_type / article_slug / category_key 等の非個人情報に限定。
 */

export type TrackEventParams = {
  /** イベント種別（例: click_top_primary_cta） */
  action: string;
  /** 導線の位置（例: top_hero, top_main_cards） */
  location: string;
  /** 遷移先パス（例: /simulator/cardloan） */
  target: string;
  /** 導線種別（例: simulator_cta, related_article） */
  link_type: string;
  /** 任意: ラベル（例: simulator / articles） */
  label?: string;
  /** 任意: 記事 slug（遷移先または現在の記事） */
  article_slug?: string;
  /** 任意: カテゴリキー（例: loan-amount） */
  category_key?: string;
  /** 任意: 記事からの遷移時、元記事の slug */
  source_article_slug?: string;
  /** 任意: シミュレーター用。返済方式グループ（生の金額は送らない） */
  method_group?: "equal_payment" | "equal_principal" | "fixed_payment" | "fixed_principal";
  /** 任意: シミュレーター用。借入額バケット（万円単位の範囲のみ） */
  principal_bucket?: "<=120" | "121-250" | "251+";
  /** 任意: シミュレーター用。追加返済ON/OFF */
  extra_enabled?: boolean;
};

declare global {
  interface Window {
    gtag?: (
      command: "event",
      eventName: string,
      params?: Record<string, unknown>
    ) => void;
  }
}

/**
 * GA4 にカスタムイベントを送信する。
 * - gtag 未定義・開発環境でも no-op で安全に動作する。
 * - 送信するのは action / location / target / link_type および任意パラメータのみ（生の入力値は含めない）。
 */
export function trackEvent(params: TrackEventParams): void {
  if (typeof window === "undefined") return;
  const gtag = window.gtag;
  if (!gtag) return;

  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  if (!gaId) return;

  const payload: Record<string, string | boolean | undefined> = {
    event_category: "engagement",
    event_action: params.action,
    location: params.location,
    target: params.target,
    link_type: params.link_type,
  };
  if (params.label !== undefined) payload.label = params.label;
  if (params.article_slug !== undefined) payload.article_slug = params.article_slug;
  if (params.category_key !== undefined) payload.category_key = params.category_key;
  if (params.source_article_slug !== undefined)
    payload.source_article_slug = params.source_article_slug;
  if (params.method_group !== undefined) payload.method_group = params.method_group;
  if (params.principal_bucket !== undefined)
    payload.principal_bucket = params.principal_bucket;
  if (params.extra_enabled !== undefined) payload.extra_enabled = params.extra_enabled;

  gtag("event", params.action, payload as Record<string, unknown>);
}
