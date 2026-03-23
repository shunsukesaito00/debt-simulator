"use client";

import Link from "next/link";
import { SITE_TAGLINE } from "@/lib/site-config";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

/** サイトの主要導線（太め・先頭に配置） */
const primaryNavItems = [
  { href: "/", label: "ホーム" },
  { href: "/articles", label: "記事" },
  { href: "/articles/category/story", label: "体験記" },
  { href: "/articles/category/fixed-cost", label: "固定費見直し" },
  { href: "/articles/category/household", label: "家計管理" },
] as const;

/** カテゴリ・検索・法務など（控えめ。項目数は維持） */
const secondaryNavItems = [
  { href: "/welcome", label: "はじめての方" },
  { href: "/resources/consultation-guide", label: "相談先" },
  { href: "/income", label: "収益レポート" },
  { href: "/about", label: "運営者" },
  { href: "/search", label: "検索" },
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

function isSecondaryActive(path: string, href: string): boolean {
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
  variant,
  onNavigate,
}: {
  href: string;
  label: string;
  active: boolean;
  variant: "primary" | "secondary";
  onNavigate?: () => void;
}) {
  const tone =
    variant === "secondary"
      ? active
        ? "font-medium text-stone-800 underline decoration-stone-400 decoration-2 underline-offset-[8px]"
        : "font-normal text-stone-500 hover:text-stone-800"
      : active
        ? "font-semibold text-stone-900 underline decoration-emerald-700/80 decoration-2 underline-offset-[10px]"
        : "font-medium text-stone-700 hover:text-stone-900";
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={["whitespace-nowrap py-2 text-sm transition-colors", navFocus, "rounded-sm", tone].join(" ")}
    >
      {label}
    </Link>
  );
}

export default function HeaderNav() {
  const path = usePathname();
  return <HeaderNavInner key={path} path={path} />;
}

function HeaderNavInner({ path }: { path: string }) {
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
      <div className="border-b border-emerald-900/20 bg-gradient-to-r from-emerald-950/95 via-emerald-900/90 to-emerald-950/95 text-center">
        <p className="py-1.5 text-[10px] font-normal leading-snug text-emerald-50/95 md:text-[11px]">
          {SITE_TAGLINE}
        </p>
      </div>
      <div className="ds-header">
        <div className="ds-container flex items-center justify-between gap-3 py-3">
          <Link
            href="/"
            className={`min-w-0 shrink text-sm font-semibold leading-snug tracking-tight text-stone-900 sm:text-base ${navFocus} rounded-sm`}
          >
            <span className="line-clamp-2 sm:line-clamp-1">借金と暮らしの記録</span>
          </Link>

          {/* デスクトップ：主要 → 区切り → その他 → ツール */}
          <nav
            className="hidden md:flex flex-1 flex-wrap items-center justify-end gap-x-2 lg:gap-x-3"
            aria-label="メインメニュー"
          >
            {primaryNavItems.map((it) => (
              <NavLink
                key={it.href}
                href={it.href}
                label={it.label}
                variant="primary"
                active={isPrimaryActive(path, it.href)}
              />
            ))}

            <span className="hidden h-4 w-px shrink-0 bg-stone-200 lg:block" aria-hidden />

            {secondaryNavItems.map((it) => (
              <NavLink
                key={it.href}
                href={it.href}
                label={it.label}
                variant="secondary"
                active={isSecondaryActive(path, it.href)}
              />
            ))}

            <div className="relative flex items-center border-l border-stone-200 pl-3 lg:pl-4" ref={toolsWrapRef}>
              <button
                type="button"
                aria-expanded={toolsOpen}
                aria-haspopup="true"
                aria-controls="header-tools-menu"
                onClick={() => setToolsOpen((o) => !o)}
                className={[
                  "inline-flex items-center gap-1 rounded-lg border px-3 py-2 text-sm font-medium transition-colors",
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
                  className="absolute right-0 top-full z-50 mt-1.5 min-w-[12rem] rounded-xl border border-stone-200/70 bg-white/95 py-1 shadow-md backdrop-blur-sm"
                >
                  {toolItems.map((it) => {
                    const active = path === it.href || path.startsWith(`${it.href}/`);
                    return (
                      <Link
                        key={it.href}
                        href={it.href}
                        role="menuitem"
                        className={[
                          "block px-4 py-2.5 text-sm font-medium transition-colors",
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
            className={`md:hidden shrink-0 rounded-lg border border-stone-200/80 bg-white/90 px-3 py-2 text-sm font-medium text-stone-800 ${navFocus}`}
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
            className="relative ml-auto flex h-full w-[min(100%,20rem)] flex-col border-l border-stone-200/70 bg-[rgb(255,253,250)] shadow-lg"
          >
            <div className="overflow-y-auto p-4 pb-24">
              <p className="ds-label">主要</p>
              <nav className="mt-3 flex flex-col gap-0.5" aria-label="モバイル・主要メニュー">
                {primaryNavItems.map((it) => {
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
              <p className="mt-6 ds-label">補助メニュー</p>
              <nav className="mt-3 flex flex-col gap-0.5" aria-label="モバイル・その他メニュー">
                {secondaryNavItems.map((it) => {
                  const active = isSecondaryActive(path, it.href);
                  return (
                    <Link
                      key={it.href}
                      href={it.href}
                      onClick={closeMobile}
                      className={[
                        "rounded-lg px-3 py-2.5 text-sm font-normal text-stone-600 transition-colors",
                        navFocus,
                        active ? "bg-stone-100 font-medium text-stone-900" : "hover:bg-stone-50",
                      ].join(" ")}
                    >
                      {it.label}
                    </Link>
                  );
                })}
              </nav>
              <p className="mt-8 ds-label">ツール・詳細</p>
              <nav className="mt-3 flex flex-col gap-0.5" aria-label="モバイルツールメニュー">
                {toolItems.map((it) => {
                  const active = path === it.href || path.startsWith(`${it.href}/`);
                  return (
                    <Link
                      key={it.href}
                      href={it.href}
                      onClick={closeMobile}
                      className={[
                        "rounded-lg border border-transparent px-3 py-3 text-sm font-medium transition-colors",
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
