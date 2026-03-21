import type { Metadata } from "next";
import Link from "next/link";
import { getWelcomeRecommendedArticles, CATEGORY_LABELS } from "@/lib/articles";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://debt-simulator-quzc.vercel.app";
const PAGE_URL = `${BASE}/welcome`;

export const metadata: Metadata = {
  title: "はじめての方へ",
  description:
    "借入返済シミュレーターと記事の読み方。体験記・返済試算・固定費チェックのおすすめ順と、このサイトでできること・できないことをまとめています。",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "はじめての方へ | 借入返済シミュレーター",
    description:
      "まず読む記事の順番と、シミュレーター・ツールの使い方への導線です。",
    url: PAGE_URL,
    type: "website",
  },
};

const webPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "はじめての方へ",
  description:
    "借入返済シミュレーターと記事の入口。投資助言ではなく、返済・固定費の数字整理の参考です。",
  url: PAGE_URL,
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "ホーム", item: BASE },
    { "@type": "ListItem", position: 2, name: "はじめての方へ", item: PAGE_URL },
  ],
};

export default function WelcomePage() {
  const recommended = getWelcomeRecommendedArticles();

  return (
    <div className="mx-auto max-w-prose">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <nav className="mb-4 text-sm text-stone-600" aria-label="パンくず">
        <ol className="flex flex-wrap items-center gap-1">
          <li>
            <Link href="/" className="font-medium text-stone-700 hover:text-emerald-900 hover:underline">
              ホーム
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li className="font-semibold text-stone-900" aria-current="page">
            はじめての方へ
          </li>
        </ol>
      </nav>

      <div className="ds-surface-soft ds-card-pad">
        <p className="text-sm font-normal text-stone-600">サイトの案内</p>
        <h1 className="ds-page-serif mt-2 text-2xl font-bold text-stone-900 md:text-3xl">
          はじめての方へ
        </h1>
        <p className="mt-4 text-sm text-stone-700 leading-relaxed">
          このページでは、おすすめの読む順とツールへの入口をまとめています。
        </p>

        <section className="mt-8 border-t border-stone-200 pt-8" id="recommended">
          <h2 className="ds-page-serif text-lg font-semibold text-stone-900">まず読む記事（おすすめ順）</h2>
          <ol className="mt-4 list-decimal space-y-4 pl-5 text-sm text-stone-700 leading-relaxed">
            {recommended.map((a) => (
              <li key={a.slug}>
                <Link
                  href={`/articles/${a.slug}`}
                  className="font-medium text-stone-900 underline decoration-stone-300 hover:decoration-stone-800"
                >
                  {a.title}
                </Link>
                <p className="mt-1 text-stone-600">{a.summary}</p>
                <span className="mt-1 inline-block text-xs text-stone-500">
                  {CATEGORY_LABELS[a.category]}
                  {a.badge ? ` · ${a.badge}` : ""}
                </span>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-8 border-t border-stone-200 pt-8" id="tools">
          <h2 className="ds-page-serif text-lg font-semibold text-stone-900">数字を試す（ツール）</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-stone-700">
            <li>
              <Link href="/simulator/cardloan" className="font-medium text-stone-900 underline hover:no-underline">
                借入返済シミュレーター
              </Link>
              … 借入額・金利・返済方式を変えて、月々・総利息・完済時期の目安をブラウザ内で計算（入力は送信されません）。
            </li>
            <li>
              <Link href="/tools/fixed-cost-impact" className="font-medium text-stone-900 underline hover:no-underline">
                固定費削減インパクト計算
              </Link>
              … 毎月いくら削ると、1年・3年・5年でいくらになるかの目安。
            </li>
            <li>
              <Link href="/quick-reference" className="font-medium text-stone-900 underline hover:no-underline">
                早見表
              </Link>
              … 100万・200万・300万・3年/5年など、すぐ返済額のイメージを掴みたいとき向け。
            </li>
          </ul>
        </section>

        <section className="mt-8 border-t border-stone-200 pt-8" id="can-cannot">
          <h2 className="ds-page-serif text-lg font-semibold text-stone-900">このサイトでできること・できないこと</h2>
          <div className="mt-3 space-y-3 text-sm text-stone-700 leading-relaxed">
            <div className="ds-subcard p-4">
              <div className="font-semibold text-stone-900">できること</div>
              <ul className="mt-2 list-disc pl-5 space-y-1">
                <li>条件を変えたときの返済の目安を、シミュレーターで試す</li>
                <li>固定費を削ったときの累計効果のイメージをつかむ</li>
                <li>借入・返済・固定費まわりを、記事で条件別に読む</li>
                <li>運営者の体験を、参考情報として読む（投資助言ではありません）</li>
              </ul>
            </div>
            <div className="ds-subcard p-4 border-amber-200/80 bg-amber-50/40">
              <div className="font-semibold text-stone-900">できないこと・していないこと</div>
              <ul className="mt-2 list-disc pl-5 space-y-1">
                <li>個別の投資助言・銘柄推奨・「やるべき取引」の指示</li>
                <li>法律・税務の専門的なアドバイス（契約内容は必ず各社の公式情報で確認してください）</li>
                <li>診断や治療（ギャンブル依存などは専門機関の相談を推奨します）</li>
              </ul>
            </div>
          </div>
        </section>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Link href="/articles" className="ds-btn ds-btn-secondary text-center">
            記事一覧へ
          </Link>
          <Link href="/about" className="ds-btn ds-btn-secondary text-center">
            運営者情報
          </Link>
          <Link href="/" className="ds-btn ds-btn-primary text-center">
            トップへ戻る
          </Link>
        </div>
      </div>
    </div>
  );
}
