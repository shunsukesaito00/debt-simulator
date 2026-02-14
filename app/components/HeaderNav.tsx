"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/", label: "トップ" },
  { href: "/simulator/cardloan", label: "カードローン" },
  { href: "/how-to", label: "使い方" },
  { href: "/logic", label: "計算ロジック" },
  { href: "/faq", label: "FAQ" },
  { href: "/about", label: "運営者情報" },
  { href: "/contact", label: "お問い合わせ" },
] as const;

export default function HeaderNav() {
  const path = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-6">
        <Link href="/" className="shrink-0 font-black text-gray-900">
          借入返済シミュレーター
        </Link>

        {/* PCナビ（上段に常設） */}
        <nav className="hidden flex-wrap items-center gap-2 md:flex">
          {items.map((it) => {
            const active = it.href === "/" ? path === "/" : path.startsWith(it.href);
            return (
              <Link
                key={it.href}
                href={it.href}
                className={[
                  "rounded-2xl px-3 py-2 text-sm font-black transition",
                  active ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800 hover:bg-gray-200",
                ].join(" ")}
              >
                {it.label}
              </Link>
            );
          })}
        </nav>

        {/* モバイルはヘッダ右に最低限（スマホは「とりあえずいい」方針） */}
        <div className="md:hidden text-xs font-black text-gray-500">MenuはPC最適</div>
      </div>
    </header>
  );
}