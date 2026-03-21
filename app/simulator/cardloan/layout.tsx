import type { Metadata } from "next";
import { getSiteBaseUrl, SITE_NAME, SIMULATOR_PRODUCT_NAME } from "@/lib/site-config";

const BASE = getSiteBaseUrl();
const URL = `${BASE}/simulator/cardloan`;

export const metadata: Metadata = {
  title: SIMULATOR_PRODUCT_NAME,
  description:
    "借入額・金利・返済方式を変えて、月々返済額・総利息・完済時期を試算。入力はブラウザ内で完結します。",
  alternates: { canonical: URL },
  openGraph: {
    title: `${SIMULATOR_PRODUCT_NAME}｜${SITE_NAME}`,
    description: "条件別に返済を試算できるツールです。",
    url: URL,
    type: "website",
  },
};

const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: SIMULATOR_PRODUCT_NAME,
  url: URL,
  applicationCategory: "FinanceApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "JPY" },
  description: "借入返済の試算。入力データはサーバーに送信されません。",
};

export default function SimulatorLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }} />
      {children}
    </>
  );
}
