import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "借金返済シミュレーター",
  description: "借入条件から、完済までの返済表・推移グラフ・比較を試算します。",
};

function AdSlot({
  id,
  height = 90,
  className = "",
}: {
  id: string;
  height?: number;
  className?: string;
}) {
  // ここを AdSense に差し替える想定（CLS対策で高さ固定）
  // 実運用では <ins className="adsbygoogle" ...> を入れて、useEffectで adsbygoogle.push({}) 等を追加
  return (
    <div
      id={id}
      className={[
        "rounded-3xl border border-gray-200 bg-white shadow-soft",
        "flex items-center justify-center text-xs font-black text-gray-400",
        className,
      ].join(" ")}
      style={{ minHeight: height }}
      aria-label="広告"
    >
      AD SPACE
    </div>
  );
}

function Header() {
  const items = [
    { href: "/", label: "トップ" },
    { href: "/simulator/cardloan", label: "シミュレーター" },
    { href: "/privacy", label: "プライバシー" },
    { href: "/disclaimer", label: "免責事項" },
    { href: "/contact", label: "お問い合わせ" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-3 py-3 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-gray-900 text-white font-black">
            ¥
          </span>
          <div className="leading-tight">
            <div className="text-sm font-black text-gray-900">Debt Tools</div>
            <div className="text-[11px] text-gray-500">返済シミュレーション</div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {items.map((it) => (
            <Link
              key={it.href}
              href={it.href}
              className="rounded-xl px-3 py-2 text-sm font-black text-gray-700 hover:bg-gray-100"
            >
              {it.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* mobile nav */}
      <div className="md:hidden border-t border-gray-200 bg-white">
        <div className="mx-auto max-w-6xl overflow-x-auto px-3 py-2">
          <div className="flex w-max gap-2">
            {items.map((it) => (
              <Link
                key={it.href}
                href={it.href}
                className="whitespace-nowrap rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-black text-gray-700"
              >
                {it.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <Header />

        {/* ✅ グローバル広告枠（上部） */}
        <div className="mx-auto max-w-6xl px-3 pt-5 md:px-6">
          <AdSlot id="ad_global_top" height={90} />
        </div>

        <main className="mx-auto max-w-6xl px-3 py-5 md:px-6 md:py-10">
          {children}
        </main>

        {/* ✅ グローバル広告枠（下部） */}
        <div className="mx-auto max-w-6xl px-3 pb-10 md:px-6">
          <AdSlot id="ad_global_bottom" height={90} />
        </div>

        <footer className="border-t border-gray-200 bg-white">
          <div className="mx-auto max-w-6xl px-3 py-6 text-xs text-gray-500 md:px-6">
            ※ 本サイトの計算結果は参考情報です。金利・手数料・日割り・締め日等により実際の返済額と異なる場合があります。
          </div>
        </footer>
      </body>
    </html>
  );
}