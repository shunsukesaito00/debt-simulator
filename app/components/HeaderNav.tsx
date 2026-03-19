"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/", label: "トップ" },
  { href: "/simulator/cardloan", label: "カードローン" },
  { href: "/articles", label: "知っておきたいこと" },
  { href: "/how-to", label: "使い方" },
  { href: "/logic", label: "計算ロジック" },
  { href: "/faq", label: "FAQ" },
  { href: "/about", label: "運営者情報" },
  { href: "/contact", label: "お問い合わせ" },
] as const;

export default function HeaderNav() {
  const path = usePathname();

  return (
    <header className="ds-header fixed inset-x-0 top-0 z-50">
      <div className="ds-container flex items-center justify-between gap-4 py-3">
        <Link href="/" className="shrink-0 font-black tracking-tight text-slate-900">
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
                  active
                    ? "bg-slate-900 text-white"
                    : "border border-slate-200 bg-white text-slate-800 hover:bg-slate-50",
                ].join(" ")}
              >
                {it.label}
              </Link>
            );
          })}
        </nav>

      </div>
    </header>
  );
}