import Link from "next/link";
import { ARTICLE_LIST_SECTIONS, getArticlesByCategory } from "@/lib/articles";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/site-config";

const siteLinks = [
  { href: "/welcome", label: "はじめての方へ" },
  { href: "/resources/consultation-guide", label: "相談先・公的支援" },
  { href: "/glossary", label: "用語集" },
  { href: "/search", label: "記事検索" },
  { href: "/updates", label: "更新ログ" },
  { href: "/income", label: "収益レポート" },
  { href: "/stories/submit", label: "体験談を送る" },
  { href: "/privacy", label: "プライバシーポリシー" },
  { href: "/disclaimer", label: "免責事項" },
  { href: "/contact", label: "お問い合わせ" },
  { href: "/about", label: "運営者情報" },
] as const;

const linkClass =
  "text-sm font-medium text-stone-600 transition-colors hover:text-emerald-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[rgb(255,253,250)] rounded-sm";

function CategoryColumn() {
  const byCategory = getArticlesByCategory();
  return (
    <div>
      <p className="ds-label">カテゴリ</p>
      <ul className="mt-3 flex flex-col gap-1.5">
        {ARTICLE_LIST_SECTIONS.map((sec) => {
          const count = sec.articleCategories.reduce(
            (n, cat) => n + (byCategory.get(cat)?.length ?? 0),
            0,
          );
          const href =
            sec.articleCategories.length === 1
              ? `/articles/category/${sec.articleCategories[0]}`
              : `/articles#${sec.id}`;
          return (
            <li key={sec.id}>
              <Link
                href={href}
                className="group flex items-center gap-2 text-sm font-medium text-stone-600 transition-colors hover:text-emerald-900"
              >
                <span>{sec.label}</span>
                <span className="rounded-full bg-stone-100 px-1.5 py-0.5 text-[10px] font-semibold text-stone-500 group-hover:bg-emerald-50 group-hover:text-emerald-900">
                  {count}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default function FooterNav() {
  return (
    <footer className="ds-footer">
      <div className="ds-container py-10">
        <p className="max-w-xl text-sm leading-relaxed text-stone-600">
          個人の生活再建・家計改善の試行錯誤を、記事と試算で整理しています。急がず、自分のペースで読んでください。
        </p>
        <div className="mt-10 grid gap-10 sm:grid-cols-2">
          {/* 左列: サイトリンク */}
          <div>
            <p className="ds-label">サイト情報</p>
            <nav className="mt-3 flex flex-col gap-1.5" aria-label="フッターリンク">
              {siteLinks.map((l) => (
                <Link key={l.href} href={l.href} className={linkClass}>
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* 右列: カテゴリ */}
          <CategoryColumn />
        </div>

        <div className="mt-10 border-t border-stone-100 pt-6">
          <p className="text-sm font-medium text-stone-500 leading-relaxed">
            {SITE_TAGLINE}
          </p>
          <p className="mt-2 text-xs text-stone-400">
            &copy; {new Date().getFullYear()} {SITE_NAME}
          </p>
        </div>
      </div>
    </footer>
  );
}
