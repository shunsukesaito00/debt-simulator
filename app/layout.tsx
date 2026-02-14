import "./globals.css";
import type { Metadata } from "next";
import HeaderNav from "./components/HeaderNav";
import FooterNav from "./components/FooterNav";

export const metadata: Metadata = {
  title: {
    default: "借入返済シミュレーター",
    template: "%s | 借入返済シミュレーター",
  },
  description:
    "カードローン等の借入返済を、金利・返済方式・ボーナス返済を加味して試算できます。サマリー/グラフ/返済表/比較/CSVに対応。",
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className="min-h-dvh bg-gray-50 text-gray-900">
        {/* 上段固定ヘッダ（ナビをここに固定） */}
        <HeaderNav />

        {/* ヘッダ固定分の余白 */}
        <main className="mx-auto w-full max-w-6xl px-4 pb-16 pt-24 md:px-6">
          {children}
        </main>

        <FooterNav />
      </body>
    </html>
  );
}