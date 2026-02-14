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

function FooterNav() {
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

  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <nav className="flex flex-wrap gap-x-5 gap-y-3 text-sm">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-bold text-gray-700 hover:text-gray-900"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="mt-6 text-xs text-gray-500 leading-relaxed">
          <p>
            ※ 本サイトの情報は参考です。最終的な返済条件（年利、手数料、遅延損害金、約定返済日など）は各社の契約内容をご確認ください。
          </p>
          <p className="mt-2">
            © {new Date().getFullYear()} Debt Simulator
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <div className="min-h-screen">
          <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
          <FooterNav />
        </div>
      </body>
    </html>
  );
}