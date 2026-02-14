import Link from "next/link";

const links = [
  { href: "/privacy", label: "プライバシーポリシー" },
  { href: "/disclaimer", label: "免責事項" },
  { href: "/contact", label: "お問い合わせ" },
  { href: "/about", label: "運営者情報" },
] as const;

export default function FooterNav() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto w-full max-w-6xl px-4 py-8 md:px-6">
        <div className="flex flex-wrap items-center gap-3">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm font-black text-gray-700 hover:underline">
              {l.label}
            </Link>
          ))}
        </div>
        <div className="mt-3 text-xs text-gray-500">
          © {new Date().getFullYear()} 借入返済シミュレーター
        </div>
      </div>
    </footer>
  );
}