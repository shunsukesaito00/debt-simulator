import type { Metadata } from "next";
import { getSiteBaseUrl } from "@/lib/site-config";

const BASE = getSiteBaseUrl();
const URL = `${BASE}/tools/fixed-cost-impact`;

export const metadata: Metadata = {
  title: "固定費削減インパクト計算",
  description:
    "毎月の削減額を続けたとき、1年・3年・5年で合計いくらになるかをすぐ確認できるツールです。通信費・サブスク・保険などの見直し効果を数字で把握できます。",
  alternates: { canonical: URL },
  openGraph: {
    title: "固定費削減インパクト計算",
    description: "固定費の削減が長期でいくら積み上がるかを試算。",
    url: URL,
    type: "website",
  },
};

const softwareJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "固定費削減インパクト計算",
  url: URL,
  applicationCategory: "FinanceApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "JPY" },
  description: "毎月の固定費削減額から累計効果を試算するツール。",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }} />
      {children}
    </>
  );
}
