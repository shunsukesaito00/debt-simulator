import type { Metadata } from "next";
import Link from "next/link";
import { SITE_UPDATES } from "@/lib/updates-log";
import { getSiteBaseUrl, SITE_NAME } from "@/lib/site-config";

const BASE = getSiteBaseUrl();
const URL = `${BASE}/updates`;

export const metadata: Metadata = {
  title: "更新ログ",
  description: `${SITE_NAME}の主な更新履歴です。`,
  alternates: { canonical: URL },
  openGraph: { title: "更新ログ", description: "サイトの主な更新履歴。", url: URL, type: "website" },
};

export default function Page() {
  const sorted = [...SITE_UPDATES].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="ds-page-width">
      <div className="ds-card ds-card-pad">
        <h1 className="ds-page-serif text-2xl font-bold text-stone-900 md:text-3xl">更新ログ</h1>
        <p className="mt-3 text-base text-stone-600 leading-relaxed">記事追加・機能改善など、主な更新を記録しています。</p>
        <ol className="mt-8 space-y-6 border-t border-stone-200 pt-6">
          {sorted.map((u) => (
            <li key={u.date + u.title} className="text-base">
              <time className="text-xs font-semibold text-stone-500" dateTime={u.date}>
                {u.date}
              </time>
              <h2 className="mt-1 text-base font-bold text-stone-900">{u.title}</h2>
              <p className="mt-2 text-stone-700 leading-relaxed">{u.detail}</p>
              {u.href ? (
                <Link href={u.href} className="mt-2 inline-block font-semibold text-emerald-900 underline">
                  関連ページへ →
                </Link>
              ) : null}
            </li>
          ))}
        </ol>
        <p className="mt-10 text-sm">
          <Link href="/" className="text-stone-600 underline hover:text-emerald-900">
            ホームへ
          </Link>
        </p>
      </div>
    </div>
  );
}
