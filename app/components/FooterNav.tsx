import Link from "next/link";

const links = [
  { href: "/welcome", label: "はじめての方へ" },
  { href: "/privacy", label: "プライバシーポリシー" },
  { href: "/disclaimer", label: "免責事項" },
  { href: "/contact", label: "お問い合わせ" },
  { href: "/about", label: "運営者情報" },
] as const;

const linkClass =
  "text-sm font-semibold text-stone-600 transition-colors hover:text-stone-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white rounded-sm";

export default function FooterNav() {
  return (
    <footer className="ds-footer">
      <div className="ds-container py-10">
        <nav className="flex flex-wrap items-center gap-x-1 gap-y-2" aria-label="フッターリンク">
          {links.map((l, i) => (
            <span key={l.href} className="flex items-center gap-x-1">
              {i > 0 ? <span className="hidden text-stone-300 sm:inline" aria-hidden>|</span> : null}
              <Link href={l.href} className={linkClass}>
                {l.label}
              </Link>
            </span>
          ))}
        </nav>
        <div className="mt-6 border-t border-stone-100 pt-6 text-xs font-medium text-stone-500">
          © {new Date().getFullYear()} 借入返済シミュレーター
        </div>
      </div>
    </footer>
  );
}
