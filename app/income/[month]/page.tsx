import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  formatIncomeMonthJa,
  getIncomeReport,
  getIncomeReports,
  getIncomeReportUrl,
} from "@/lib/income-log";
type Props = { params: Promise<{ month: string }> };

export function generateStaticParams() {
  return getIncomeReports().map((r) => ({ month: r.month }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { month } = await params;
  const report = getIncomeReport(month);
  if (!report) return { title: "Not Found" };
  const url = getIncomeReportUrl(month);

  const monthJa = formatIncomeMonthJa(report.month);
  return {
    title: `${monthJa} 収益レポート`,
    description: report.summary,
    alternates: { canonical: url },
    openGraph: {
      title: `${monthJa} 収益レポート`,
      description: report.summary,
      url,
      type: "article",
    },
  };
}

export default async function IncomeDetailPage({ params }: Props) {
  const { month } = await params;
  const report = getIncomeReport(month);
  if (!report) notFound();

  return (
    <div className="mx-auto max-w-3xl">
      <nav className="mb-4 text-sm text-stone-600" aria-label="パンくず">
        <ol className="flex flex-wrap items-center gap-1">
          <li>
            <Link href="/" className="hover:underline">
              ホーム
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li>
            <Link href="/income" className="hover:underline">
              収益レポート
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li className="font-semibold text-stone-900">{formatIncomeMonthJa(report.month)}</li>
        </ol>
      </nav>

      <article className="ds-card ds-card-pad">
        <h1 className="ds-page-serif text-2xl font-bold text-stone-900 md:text-3xl">{report.title}</h1>
        <p className="mt-2 text-sm text-stone-600 leading-relaxed">{report.summary}</p>
        <div className="mt-4 rounded-lg border border-stone-200 bg-stone-50 p-4">
          <p className="text-sm text-stone-700">
            合計レンジ: <span className="font-semibold text-stone-900">{report.total.label}</span>
            {report.total.note ? <span className="ml-1 text-xs text-stone-500">（{report.total.note}）</span> : null}
          </p>
          <ul className="mt-3 space-y-1.5 text-sm text-stone-700">
            {report.breakdown.map((item) => (
              <li key={item.key}>
                <span className="font-medium text-stone-800">{item.label}</span>: {item.range.label}
                {item.range.note ? <span className="ml-1 text-xs text-stone-500">（{item.range.note}）</span> : null}
              </li>
            ))}
          </ul>
        </div>

        {report.highlights && report.highlights.length > 0 ? (
          <section className="mt-6">
            <h2 className="text-base font-semibold text-stone-900">今月の要点</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-stone-700 leading-relaxed">
              {report.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </section>
        ) : null}

        <section className="ds-article-body mt-8 prose prose-stone max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h2: ({ ...props }) => <h2 className="mt-8 text-lg font-semibold text-stone-900 md:text-xl" {...props} />,
              p: ({ ...props }) => <p className="mt-3 text-stone-700 leading-relaxed" {...props} />,
              ul: ({ ...props }) => <ul className="mt-3 list-disc space-y-1.5 pl-5 text-stone-700" {...props} />,
              ol: ({ ...props }) => <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-stone-700" {...props} />,
              li: ({ ...props }) => <li className="leading-relaxed" {...props} />,
              a: ({ ...props }) => <a className="ds-link-prose" {...props} />,
            }}
          >
            {report.content}
          </ReactMarkdown>
        </section>

        <div className="mt-8 border-t border-stone-200 pt-4 text-sm">
          <p className="text-stone-600">
            このレポートは「副業実験・収入改善」の定点観測です。関連する読み物は
            <Link href="/articles/category/side-income" className="ml-1 font-medium text-emerald-900 underline">
              副業実験・収入改善カテゴリ
            </Link>
            から確認できます。
          </p>
          <p className="mt-2">
            <Link href="/income" className="text-stone-600 underline hover:text-emerald-900">
              月次アーカイブへ戻る
            </Link>
          </p>
        </div>
      </article>
    </div>
  );
}
