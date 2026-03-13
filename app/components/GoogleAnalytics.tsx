"use client";

import Script from "next/script";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

/**
 * GA4 の最小導入。NEXT_PUBLIC_GA_ID が未設定の場合は何も出力しない。
 * イベント計測は lib/analytics.ts の trackEvent() で送信する。
 */
export function GoogleAnalytics() {
  if (!GA_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-config" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){ dataLayer.push(arguments); }
          gtag('js', new Date());
          gtag('config', '${GA_ID}', { send_page_view: true });
          window.gtag = gtag;
        `}
      </Script>
    </>
  );
}
