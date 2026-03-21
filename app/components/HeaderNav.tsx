"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

const primaryItems = [
  { href: "/", label: "ホーム" },
  { href: "/welcome", label: "はじめての方" },
  { href: "/articles", label: "記事" },
  { href: "/about", label: "運営者プロフィール" },
  { href: "/contact", label: "お問い合わせ" },
  { href: "/privacy", label: "プライバシー" },
] as const;

const toolItems = [
  { href: "/simulator/cardloan", label: "シミュレーター" },
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

const navLinkBase =
  "rounded-2xl px-3 py-2 text-sm font-black transition whitespace-nowrap";

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
        navLinkBase,
        active ? "bg-stone-800 text-white" : "border border-stone-200 bg-white text-stone-800 hover:bg-stone-50",
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
    <header className="ds-header fixed inset-x-0 top-0 z-50">
      <div className="ds-container flex items-center justify-between gap-3 py-3">
        <Link href="/" className="min-w-0 shrink font-black tracking-tight text-stone-900 text-sm sm:text-base">
          <span className="line-clamp-2 sm:line-clamp-1">借入返済シミュレーター</span>
        </Link>

        {/* デスクトップ：プライマリ */}
        <nav className="hidden md:flex flex-1 flex-wrap items-center justify-end gap-1.5 lg:gap-2" aria-label="メインメニュー">
          {primaryItems.map((it) => (
            <NavLink
              key={it.href}
              href={it.href}
              label={it.label}
              active={isPrimaryActive(path, it.href)}
            />
          ))}

          <div className="relative" ref={toolsWrapRef}>
            <button
              type="button"
              aria-expanded={toolsOpen}
              aria-haspopup="true"
              aria-controls="header-tools-menu"
              onClick={() => setToolsOpen((o) => !o)}
              className={[
                navLinkBase,
                "inline-flex items-center gap-1 border",
                toolsOpen || toolsActive
                  ? "border-stone-800 bg-stone-800 text-white"
                  : "border-stone-200 bg-white text-stone-800 hover:bg-stone-50",
              ].join(" ")}
            >
              ツール
              <span className="text-xs opacity-80" aria-hidden>
                ▼
              </span>
            </button>
            {toolsOpen && (
              <div
                id="header-tools-menu"
                role="menu"
                className="absolute right-0 top-full z-50 mt-1 min-w-[12rem] rounded-2xl border border-stone-200 bg-white py-1 shadow-lg"
              >
                {toolItems.map((it) => {
                  const active = path === it.href || path.startsWith(`${it.href}/`);
                  return (
                    <Link
                      key={it.href}
                      href={it.href}
                      role="menuitem"
                      className={[
                        "block px-4 py-2.5 text-sm font-bold",
                        active ? "bg-stone-100 text-stone-900" : "text-stone-700 hover:bg-stone-50",
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

        {/* モバイル：メニュー開閉 */}
        <button
          type="button"
          className="md:hidden shrink-0 rounded-2xl border border-stone-200 bg-white px-3 py-2 text-sm font-black text-stone-800"
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav-panel"
          onClick={() => setMobileOpen((o) => !o)}
        >
          {mobileOpen ? "閉じる" : "MENU"}
        </button>
      </div>

      {/* モバイル：ドロワー風パネル */}
      {mobileOpen && (
        <div className="fixed inset-x-0 top-20 bottom-0 z-[60] flex md:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-stone-900/40"
            aria-label="メニューを閉じる"
            onClick={closeMobile}
          />
          <div
            id="mobile-nav-panel"
            className="relative ml-auto flex h-full w-[min(100%,20rem)] flex-col border-l border-stone-200 bg-white shadow-xl"
          >
            <div className="overflow-y-auto p-4 pb-24">
              <p className="text-xs font-bold uppercase tracking-wide text-stone-500">サイト内</p>
              <nav className="mt-3 flex flex-col gap-2" aria-label="モバイルメインメニュー">
                {primaryItems.map((it) => (
                  <Link
                    key={it.href}
                    href={it.href}
                    onClick={closeMobile}
                    className={[
                      "rounded-xl px-3 py-3 text-sm font-black",
                      isPrimaryActive(path, it.href)
                        ? "bg-stone-800 text-white"
                        : "bg-stone-50 text-stone-900",
                    ].join(" ")}
                  >
                    {it.label}
                  </Link>
                ))}
              </nav>
              <p className="mt-8 text-xs font-bold uppercase tracking-wide text-stone-500">ツール・詳細</p>
              <nav className="mt-3 flex flex-col gap-2" aria-label="モバイルツールメニュー">
                {toolItems.map((it) => (
                  <Link
                    key={it.href}
                    href={it.href}
                    onClick={closeMobile}
                    className={[
                      "rounded-xl border border-stone-200 px-3 py-3 text-sm font-bold",
                      path === it.href || path.startsWith(`${it.href}/`)
                        ? "border-stone-800 bg-stone-100"
                        : "bg-white text-stone-800",
                    ].join(" ")}
                  >
                    {it.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
