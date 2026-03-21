import "./globals.css";
import type { Metadata } from "next";
import { Noto_Serif_JP } from "next/font/google";
import HeaderNav from "./components/HeaderNav";
import FooterNav from "./components/FooterNav";
import { GoogleAnalytics } from "./components/GoogleAnalytics";

const notoSerifJp = Noto_Serif_JP({
  weight: ["600", "700"],
  subsets: ["latin"],
  variable: "--font-heading-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "借入返済シミュレーター",
    template: "%s | 借入返済シミュレーター",
  },
  description:
    "毎月の固定負担を条件別に比較・試算するシミュレーターと記事。借入返済・返済計画を中心に、月々負担の違いを具体条件で確認し、記事とツールを往復して判断材料を提供します。",
  robots: { index: true, follow: true },
  verification: {
    google: "068cd6d5bb52c21b",
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
      <body className={`ds-shell ${notoSerifJp.variable}`}>
        <GoogleAnalytics />
        {/* 上段固定ヘッダ（ナビをここに固定） */}
        <HeaderNav />

        {/* ヘッダ固定分の余白 */}
        <main className="ds-container pb-12 pt-20">
          {children}
        </main>

        <FooterNav />
      </body>
    </html>
  );
}
