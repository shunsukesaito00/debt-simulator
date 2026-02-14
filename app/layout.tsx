import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "Debt Simulator",
  description: "借入・金利・期間から返済額の目安を算出するシンプルな返済シミュレーター。",
};

const nav = [
  { href: "/", label: "トップ" },
  { href: "/simulator/cardloan", label: "カードローン" },
  { href: "/how-to", label: "使い方" },
  { href: "/logic", label: "計算ロジック" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "お問い合わせ" },
  { href: "/privacy", label: "プライバシー" },
  { href: "/disclaimer", label: "免責事項" },
  { href: "/about", label: "運営者情報" },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className="min-h-screen bg-white text-gray-900">
        <header className="border-b">
          <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
            <Link href="/" className="text-lg font-bold">
              Debt Simulator
            </Link>

            <nav className="flex flex-wrap justify-end gap-x-4 gap-y-2 text-sm">
              {nav.map((x) => (
                <Link key={x.href} href={x.href} className="text-gray-700 hover:text-gray-900">
                  {x.label}
                </Link>
              ))}
            </nav>
          </div>
        </header>

        <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>

        <footer className="border-t">
          <div className="mx-auto flex max-w-5xl flex-col gap-2 px-4 py-6 text-xs text-gray-600">
            <div>© {new Date().getFullYear()} Debt Simulator</div>
            <div>※ 本サイトは情報提供を目的としており、個別の助言ではありません。</div>
          </div>
        </footer>
      </body>
    </html>
  );
}