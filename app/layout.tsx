import "./globals.css";
import type { Metadata } from "next";
import HeaderNav from "./components/HeaderNav";
import FooterNav from "./components/FooterNav";
import { GoogleAnalytics } from "./components/GoogleAnalytics";

export const metadata: Metadata = {
  title: {
    default: "借入返済シミュレーター",
    template: "%s | 借入返済シミュレーター",
  },
  description:
    "借入額・金利・返済方式・返済期間をもとに、月々返済額・総利息・完済時期を比較できる返済シミュレーター。条件別の記事とあわせて判断材料を提供します。",
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
      <body className="min-h-dvh bg-gray-50 text-gray-900">
        <GoogleAnalytics />
        {/* 上段固定ヘッダ（ナビをここに固定） */}
        <HeaderNav />

        {/* ヘッダ固定分の余白 */}
        <main className="mx-auto w-full max-w-5xl px-4 pb-12 pt-20 md:px-6">
          {children}
        </main>

        <FooterNav />
      </body>
    </html>
  );
}
