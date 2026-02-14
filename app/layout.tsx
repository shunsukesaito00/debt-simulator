// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://debt-simulator-akvc.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "カードローン返済シミュレーター",
    template: "%s | カードローン返済シミュレーター",
  },
  description:
    "カードローンの返済をシミュレーション（A/B比較、CSV出力、返済表、金利ステップ、ボーナス返済）できます。結果は目安であり、最終条件は契約内容をご確認ください。",
  alternates: { canonical: "/" },
};

const links = [
  { href: "/", label: "ホーム" },
  { href: "/simulator/cardloan", label: "シミュレーター" },
  { href: "/how-to", label: "使い方" },
  { href: "/logic", label: "計算ロジック" },
  { href: "/faq", label: "FAQ" },
  { href: "/privacy", label: "プライバシー" },
  { href: "/disclaimer", label: "免責事項" },
  { href: "/contact", label: "お問い合わせ" },
  { href: "/about", label: "運営者情報" },
];

function HeaderNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4">
        <a href="/" className="text-sm font-black text-gray-900 hover:opacity-80">
          Debt Simulator
        </a>

        <nav className="hidden flex-wrap gap-x-5 gap-y-2 text-sm md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="font-bold text-gray-700 hover:text-gray-900">
              {l.label}
            </a>
          ))}
        </nav>

        {/* モバイルは「メニュー」1ボタンでフッターへ誘導（UI崩れ防止） */}
        <a
          href="#footer-nav"
          className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-black text-gray-700 hover:bg-gray-50 md:hidden"
        >
          メニュー
        </a>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer id="footer-nav" className="border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-5xl px-4 py-10">
        {/* モバイルではここに全リンクを出す（上段に詰め込みすぎない） */}
        <nav className="grid gap-2 text-sm md:hidden">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="font-bold text-gray-700 hover:text-gray-900">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="mt-8 text-xs text-gray-500 leading-relaxed">
          <p>
            ※ 本サイトの情報は参考です。最終的な返済条件（年利、手数料、遅延損害金、約定返済日など）は各社の契約内容をご確認ください。
          </p>
          <p className="mt-2">© {new Date().getFullYear()} Debt Simulator</p>
        </div>
      </div>
    </footer>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <HeaderNav />
        <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
        <Footer />
      </body>
    </html>
  );
}