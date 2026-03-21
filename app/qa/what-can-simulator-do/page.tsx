import type { Metadata } from "next";
import Link from "next/link";
import { getQaPageBreadcrumbJsonLd, getQaPageJsonLd } from "@/lib/article-structured-data";
import { SupplementPageFooterFaq } from "@/app/components/SupplementPageFooter";

const PAGE_PATH = "/qa/what-can-simulator-do";
const PAGE_TITLE = "借入返済シミュレーターで何ができますか？";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://debt-simulator-quzc.vercel.app";
const PAGE_URL = `${BASE}${PAGE_PATH}`;

/** QAPage の Answer と本文で内容を一致させる（プレーンテキスト） */
const QA_ANSWER_PLAIN =
  "借入金額・金利（段階変更可）・返済方式（元利均等・元金均等・定額元利・定額元金）・返済開始年月・無利息期間（簡易モデル）・追加返済などを入力し、毎月の返済内訳と残高の推移、完済までの期間、利息合計、合計返済額を試算できます。A/Bで2条件を並べて比較したり、結果をCSVでダウンロードしたりできます。手取り月収を入れると返済負担率（参考）も表示されます。試算は端末内で行われ、参考情報です。契約内容を優先してください。";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description:
    "カードローン風の借入返済シミュレーターでできること（返済表・総利息・A/B比較・CSV）を簡潔に説明します。",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: PAGE_TITLE,
    description: "返済シミュレーターで試算・比較・CSV出力ができる内容の概要。",
    url: PAGE_URL,
    type: "website",
  },
};

const qaJsonLd = getQaPageJsonLd({
  question: PAGE_TITLE,
  answer: QA_ANSWER_PLAIN,
  pageUrl: PAGE_URL,
});
const breadcrumbJsonLd = getQaPageBreadcrumbJsonLd(PAGE_TITLE, PAGE_PATH);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(qaJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <div className="ds-page-width grid gap-6">
        <header className="ds-surface-soft ds-card-pad">
          <p className="text-sm font-medium text-stone-500">Q&amp;A</p>
          <h1 className="mt-2 text-2xl font-semibold text-stone-900 md:text-3xl">{PAGE_TITLE}</h1>
        </header>

        <article className="ds-surface-soft p-5 md:p-6">
          <div className="prose prose-stone max-w-none text-base leading-relaxed text-stone-800">
            <p>
              借入金額・金利（段階変更可）・返済方式（元利均等・元金均等・定額元利・定額元金）・返済開始年月・
              <strong className="text-stone-900">無利息期間（簡易モデル）</strong>
              ・追加返済などを入力し、
              <strong className="text-stone-900">毎月の返済内訳と残高の推移、完済までの期間、利息合計、合計返済額</strong>
              を試算できます。
            </p>
            <p>
              <strong className="text-stone-900">A/B 比較</strong>で2条件を並べたり、結果を
              <strong className="text-stone-900">CSV</strong>
              でダウンロードしたりできます。手取り月収を入れると
              <strong className="text-stone-900">返済負担率（参考）</strong>
              も表示されます。
            </p>
            <p className="text-stone-600">
              計算はブラウザ内で行われ、入力内容がサーバーに送信されることはありません。試算は参考であり、実際の契約・審査・適用金利とは異なる場合があります。
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/simulator/cardloan" className="ds-btn ds-btn-primary">
              シミュレーターを開く →
            </Link>
            <Link href="/how-to" className="ds-btn ds-btn-secondary">
              使い方ガイド
            </Link>
            <Link href="/faq" className="text-base font-semibold text-emerald-900 underline hover:no-underline">
              FAQ 一覧
            </Link>
          </div>
        </article>

        <SupplementPageFooterFaq />
      </div>
    </>
  );
}
