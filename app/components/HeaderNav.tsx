"use client";

import Link from "next/link";
import { SITE_TAGLINE } from "@/lib/site-config";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

const primaryItems = [
  { href: "/", label: "ホーム" },
  { href: "/welcome", label: "はじめての方" },
  { href: "/articles", label: "記事" },
  { href: "/articles/category/story", label: "体験記" },
  { href: "/articles/category/side-income", label: "副業" },
  { href: "/articles/category/saving", label: "節約" },
  { href: "/resources/consultation-guide", label: "相談先" },
  { href: "/search", label: "検索" },
  { href: "/about", label: "運営者" },
  { href: "/contact", label: "お問い合わせ" },
  { href: "/privacy", label: "プライバシー" },
] as const;

const toolItems = [
  { href: "/simulator/cardloan", label: "返済シミュレーター" },
  { href: "/tools/fixed-cost-impact", label: "固定費インパクト" },
  { href: "/glossary", label: "用語集" },
  { href: "/how-to", label: "使い方" },
  { href: "/faq", label: "FAQ" },
  { href: "/logic", label: "計算ロジック" },
] as const;

function isPrimaryActive(path: string, href: string): boolean {
  if (href === "/") return path === "/";
  return path === href || path.startsWith(`${href}/`);
}

function isToolActive(path: string): boolean {
  return toolItems.some((it) => path === it.href || path.startsWith(`${it.href}/`));
}

const navFocus =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white";

function NavLink({
  href,
  label,
  active,
  onNavigate,
}: {
  href: string;
  label: string;
  active: boolean;
  onNavigate?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={[
        "whitespace-nowrap py-2 text-sm font-semibold transition-colors",
        navFocus,
        "rounded-sm",
        active
          ? "text-stone-900 underline decoration-emerald-700 decoration-2 underline-offset-8"
          : "text-stone-600 hover:text-stone-900",
      ].join(" ")}
    >
      {label}
    </Link>
  );
}

export default function HeaderNav() {
  const path = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const toolsWrapRef = useRef<HTMLDivElement>(null);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!toolsOpen) return;
    const onDoc = (e: MouseEvent) => {
      if (toolsWrapRef.current && !toolsWrapRef.current.contains(e.target as Node)) {
        setToolsOpen(false);
      }
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [toolsOpen]);

  useEffect(() => {
    setMobileOpen(false);
    setToolsOpen(false);
  }, [path]);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  const toolsActive = isToolActive(path);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* タグライン帯 */}
      <div className="bg-emerald-950 text-center">
        <p className="py-1 text-[10px] font-normal leading-snug tracking-wide text-emerald-100/85 md:text-[11px]">
          {SITE_TAGLINE}
        </p>
      </div>
      <div className="ds-header">
      <div className="ds-container flex items-center justify-between gap-3 py-3">
        <Link
          href="/"
          className={`min-w-0 shrink text-sm font-bold leading-snug tracking-tight text-stone-900 sm:text-base ${navFocus} rounded-sm`}
        >
          <span className="line-clamp-2 sm:line-clamp-1">借金と暮らしの記録</span>
        </Link>

        {/* デスクトップ：プライマリ（テキストリンク＋アクティブは下線） */}
        <nav className="hidden md:flex flex-1 flex-wrap items-center justify-end gap-x-4 lg:gap-x-5" aria-label="メインメニュー">
          {primaryItems.map((it) => (
            <NavLink
              key={it.href}
              href={it.href}
              label={it.label}
              active={isPrimaryActive(path, it.href)}
            />
          ))}

          <div className="relative flex items-center border-l border-stone-200 pl-4 lg:pl-5" ref={toolsWrapRef}>
            <button
              type="button"
              aria-expanded={toolsOpen}
              aria-haspopup="true"
              aria-controls="header-tools-menu"
              onClick={() => setToolsOpen((o) => !o)}
              className={[
                "inline-flex items-center gap-1 rounded-lg border px-3 py-2 text-sm font-semibold transition-colors",
                navFocus,
                toolsOpen || toolsActive
                  ? "border-emerald-800 bg-emerald-50 text-emerald-950"
                  : "border-stone-200 bg-white text-stone-700 hover:border-stone-300 hover:bg-stone-50",
              ].join(" ")}
            >
              ツール
              <span className="text-[10px] opacity-70" aria-hidden>
                ▼
              </span>
            </button>
            {toolsOpen && (
              <div
                id="header-tools-menu"
                role="menu"
                className="absolute right-0 top-full z-50 mt-1.5 min-w-[12rem] rounded-lg border border-stone-200 bg-white py-1 shadow-ds"
              >
                {toolItems.map((it) => {
                  const active = path === it.href || path.startsWith(`${it.href}/`);
                  return (
                    <Link
                      key={it.href}
                      href={it.href}
                      role="menuitem"
                      className={[
                        "block px-4 py-2.5 text-sm font-semibold transition-colors",
                        navFocus,
                        active ? "bg-emerald-50/80 text-emerald-950" : "text-stone-700 hover:bg-stone-50",
                      ].join(" ")}
                      onClick={() => setToolsOpen(false)}
                    >
                      {it.label}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </nav>

        {/* モバイル */}
        <button
          type="button"
          className={`md:hidden shrink-0 rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm font-semibold text-stone-800 ${navFocus}`}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav-panel"
          onClick={() => setMobileOpen((o) => !o)}
        >
          {mobileOpen ? "閉じる" : "MENU"}
        </button>
      </div>
      </div>

      {mobileOpen && (
        <div className="fixed inset-x-0 top-[5.5rem] bottom-0 z-[60] flex md:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-stone-900/35"
            aria-label="メニューを閉じる"
            onClick={closeMobile}
          />
          <div
            id="mobile-nav-panel"
            className="relative ml-auto flex h-full w-[min(100%,20rem)] flex-col border-l border-stone-200 bg-white shadow-ds-md"
          >
            <div className="overflow-y-auto p-4 pb-24">
              <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">サイト内</p>
              <nav className="mt-3 flex flex-col gap-0.5" aria-label="モバイルメインメニュー">
                {primaryItems.map((it) => {
                  const active = isPrimaryActive(path, it.href);
                  return (
                    <Link
                      key={it.href}
                      href={it.href}
                      onClick={closeMobile}
                      className={[
                        "rounded-lg px-3 py-3 text-sm font-semibold transition-colors",
                        navFocus,
                        active
                          ? "border-l-4 border-emerald-700 bg-emerald-50/60 pl-2 text-emerald-950"
                          : "text-stone-800 hover:bg-stone-50",
                      ].join(" ")}
                    >
                      {it.label}
                    </Link>
                  );
                })}
              </nav>
              <p className="mt-8 text-xs font-semibold uppercase tracking-wide text-stone-500">ツール・詳細</p>
              <nav className="mt-3 flex flex-col gap-0.5" aria-label="モバイルツールメニュー">
                {toolItems.map((it) => {
                  const active = path === it.href || path.startsWith(`${it.href}/`);
                  return (
                    <Link
                      key={it.href}
                      href={it.href}
                      onClick={closeMobile}
                      className={[
                        "rounded-lg border border-transparent px-3 py-3 text-sm font-semibold transition-colors",
                        navFocus,
                        active
                          ? "border-emerald-200 bg-emerald-50/50 text-emerald-950"
                          : "text-stone-800 hover:border-stone-200 hover:bg-stone-50",
                      ].join(" ")}
                    >
                      {it.label}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
