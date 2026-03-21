import Link from "next/link";

const links = [
  { href: "/welcome", label: "はじめての方へ" },
  { href: "/privacy", label: "プライバシーポリシー" },
  { href: "/disclaimer", label: "免責事項" },
  { href: "/contact", label: "お問い合わせ" },
  { href: "/about", label: "運営者情報" },
] as const;

export default function FooterNav() {
  return (
    <footer className="ds-footer">
      <div className="ds-container py-8">
        <div className="flex flex-wrap items-center gap-3">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm font-black text-stone-700 hover:underline">
              {l.label}
            </Link>
          ))}
        </div>
        <div className="mt-3 text-xs text-stone-500">
          © {new Date().getFullYear()} 借入返済シミュレーター
        </div>
      </div>
    </footer>
  );
}