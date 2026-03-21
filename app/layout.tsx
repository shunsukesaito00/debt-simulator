import "./globals.css";
import type { Metadata } from "next";
import { Noto_Serif_JP, Zen_Kaku_Gothic_New } from "next/font/google";
import HeaderNav from "./components/HeaderNav";
import FooterNav from "./components/FooterNav";
import { GoogleAnalytics } from "./components/GoogleAnalytics";
import { Analytics } from "@vercel/analytics/react";
import { getSiteBaseUrl, SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE } from "@/lib/site-config";

/** UI 本文・ナビ用ゴシック */
const zenKaku = Zen_Kaku_Gothic_New({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-ui-sans",
  display: "swap",
});

/** 記事・大見出しのセリフ */
const notoSerifJp = Noto_Serif_JP({
  weight: ["600", "700"],
  subsets: ["latin"],
  variable: "--font-heading-serif",
  display: "swap",
});

const siteBase = getSiteBaseUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteBase),
  title: {
    default: `${SITE_NAME}｜${SITE_TAGLINE}`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  robots: { index: true, follow: true },
  verification: {
    google: "068cd6d5bb52c21b",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3293510133025826"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`ds-shell ${zenKaku.variable} ${notoSerifJp.variable}`}>
        <GoogleAnalytics />
        {/* 上段固定ヘッダ（ナビをここに固定） */}
        <HeaderNav />

        {/* ヘッダ固定分の余白 */}
        <main className="ds-container pb-16 pt-[5.75rem]">
          {children}
        </main>

        <FooterNav />
        <Analytics />
      </body>
    </html>
  );
}
