import type { Metadata } from "next";
import Link from "next/link";
import { formatIncomeMonthJa, formatPublishedDateJa, getIncomeReports } from "@/lib/income-log";
import { getSiteBaseUrl, SITE_NAME } from "@/lib/site-config";

const BASE = getSiteBaseUrl();
const URL = `${BASE}/income`;

export const metadata: Metadata = {
  title: "収益レポート（月次アーカイブ）",
  description: `${SITE_NAME} の副業実験・収入改善の月次レポート一覧です。数値はレンジ（概算）で記録しています。`,
  alternates: { canonical: URL },
  openGraph: {
    title: "収益レポート（月次アーカイブ）",
    description: "副業実験・個人開発・Web運営の月次定点観測（レンジ表示）。",
    url: URL,
    type: "website",
  },
};

export default function IncomeArchivePage() {
  const reports = getIncomeReports();

  return (
    <div className="mx-auto max-w-3xl">
      <div className="ds-card ds-card-pad">
        <h1 className="ds-page-serif text-2xl font-bold text-stone-900 md:text-3xl">収益レポート（月次アーカイブ）</h1>
        <p className="mt-3 text-sm text-stone-600 leading-relaxed">
          生活再建・改善の取り組みを支える副業実験の定点観測です。収益は厳密値ではなく、継続しやすさを優先したレンジ（概算）で記録しています。
        </p>
        <p className="mt-2 text-xs text-stone-500 leading-relaxed">
          レンジは税・手数料・確定前項目の扱いで月ごとに変動します。詳細は各月ページの注記をご確認ください。
        </p>

        {reports.length === 0 ? (
          <p className="mt-8 text-sm text-stone-600">まだレポートはありません。</p>
        ) : (
          <ol className="mt-8 space-y-5 border-t border-stone-200 pt-6">
            {reports.map((r) => (
              <li key={r.month}>
                <article className="overflow-hidden rounded-2xl border border-stone-200/90 bg-white shadow-sm">
                  {/* 月報ヘッダー */}
                  <div className="flex flex-wrap items-start justify-between gap-3 border-b border-stone-100 bg-stone-50/80 px-4 py-3 sm:px-5">
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-stone-500">月次レポート</p>
                      <p className="mt-0.5 text-lg font-semibold tracking-tight text-stone-900 tabular-nums">
                        {formatIncomeMonthJa(r.month)}
                      </p>
                    </div>
                    <time
                      className="shrink-0 text-xs text-stone-500 tabular-nums sm:text-sm"
                      dateTime={r.publishedAt}
                    >
                      公開 {formatPublishedDateJa(r.publishedAt)}
                    </time>
                  </div>

                  <div className="space-y-4 px-4 py-4 sm:px-5 sm:py-5">
                    <h2 className="text-base font-semibold leading-snug text-stone-900 sm:text-[17px]">{r.title}</h2>
                    {r.statusNote ? (
                      <p className="text-xs text-stone-500">ステータス: {r.statusNote}</p>
                    ) : null}

                    {/* 合計レンジ：月報の「今月の着地」を上段で見せる */}
                    <div className="rounded-2xl border border-emerald-200/70 bg-gradient-to-br from-emerald-50/90 to-white px-4 py-3.5 sm:px-5">
                      <p className="text-center text-xs font-medium text-emerald-900/85">今月の収益レンジ（概算）</p>
                      <p className="mt-1.5 text-center text-2xl font-bold tabular-nums text-emerald-950 sm:text-[1.65rem]">
                        {r.total.label}
                      </p>
                      {r.total.note ? (
                        <p className="mt-1.5 text-center text-xs leading-relaxed text-stone-600">{r.total.note}</p>
                      ) : null}
                    </div>

                    {/* 内訳：frontmatter の並び順をそのまま表示 */}
                    {r.breakdown.length > 0 ? (
                      <div>
                        <h3 className="text-xs font-semibold text-stone-500">内訳</h3>
                        <ul className="mt-2 divide-y divide-stone-100 rounded-xl border border-stone-100 bg-stone-50/40">
                          {r.breakdown.map((item) => (
                            <li
                              key={item.key}
                              className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 px-3 py-2.5 first:rounded-t-xl last:rounded-b-xl sm:px-3.5"
                            >
                              <span className="min-w-0 text-sm text-stone-700">{item.label}</span>
                              <span className="shrink-0 text-right text-sm font-medium tabular-nums text-stone-900">
                                {item.range.label}
                                {item.range.note ? (
                                  <span className="ml-1 text-xs font-normal text-stone-500">（{item.range.note}）</span>
                                ) : null}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}

                    <p className="text-sm leading-relaxed text-stone-700">{r.summary}</p>

                    {r.highlights && r.highlights.length > 0 ? (
                      <div>
                        <h3 className="text-xs font-semibold text-stone-500">今月の要点</h3>
                        <ul className="mt-2 space-y-1.5 text-sm text-stone-700">
                          {r.highlights.map((h) => (
                            <li key={h} className="flex gap-2 leading-relaxed">
                              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-emerald-600/70" aria-hidden />
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}

                    <div className="border-t border-stone-100 pt-3">
                      <Link
                        href={`/income/${r.month}`}
                        className="inline-flex items-center gap-1 text-sm font-medium text-emerald-900 underline decoration-emerald-300 underline-offset-2 hover:no-underline"
                      >
                        月別詳細（本文・振り返り）を見る
                        <span aria-hidden>→</span>
                      </Link>
                    </div>
                  </div>
                </article>
              </li>
            ))}
          </ol>
        )}
        <div className="mt-10 border-t border-stone-200 pt-4 text-sm text-stone-600">
          <p>
            関連する読み物は
            <Link href="/articles/category/side-income" className="ml-1 font-medium text-emerald-900 underline">
              副業実験・収入改善カテゴリ
            </Link>
            から確認できます。
          </p>
          <p className="mt-2">
            <Link href="/articles" className="underline hover:text-emerald-900">
              記事一覧へ戻る
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
