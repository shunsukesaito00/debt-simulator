import type { Metadata } from "next";
import Link from "next/link";
import { GlossaryClient } from "@/app/glossary/GlossaryClient";
import { glossaryTerms } from "@/lib/glossary-terms";
import { getSiteBaseUrl, SITE_NAME } from "@/lib/site-config";

const BASE = getSiteBaseUrl();
const URL = `${BASE}/glossary`;

export const metadata: Metadata = {
  title: "用語集｜返済・借入・家計",
  description: "元利均等・リボ払い・繰り上げ返済など、当サイトで使う用語の短い説明と関連記事への導線です。",
  alternates: { canonical: URL },
  openGraph: { title: "用語集", description: "返済・借入・家計の用語集。", url: URL, type: "website" },
};

const definedTermSet = {
  "@context": "https://schema.org",
  "@type": "DefinedTermSet",
  name: `${SITE_NAME} 用語集`,
  hasDefinedTerm: glossaryTerms.map((t) => ({
    "@type": "DefinedTerm",
    name: t.term,
    description: t.def,
  })),
};

export default function Page() {
  return (
    <div className="ds-page-width">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSet) }} />
      <div className="ds-card ds-card-pad">
        <h1 className="ds-page-serif text-2xl font-bold text-stone-900 md:text-3xl">用語集</h1>
        <p className="mt-3 text-base text-stone-600 leading-relaxed">
          一般的な説明であり、契約書・金融機関の説明を優先してください。外部リンクは公的サイトへの入口です。
        </p>
        <p className="mt-3 text-sm text-stone-600 leading-relaxed">
          迷ったら
          <Link href="/faq" className="ml-1 font-medium text-emerald-900 underline">
            FAQ
          </Link>
          、計算をすぐ試したいときは
          <Link href="/simulator/cardloan" className="ml-1 font-medium text-emerald-900 underline">
            返済シミュレーター
          </Link>
          をご利用ください。
        </p>
        <GlossaryClient terms={glossaryTerms} />
        <p className="mt-10 text-sm">
          <Link href="/articles#loan-comparison" className="font-semibold text-emerald-900 underline">
            借入・リボ比較の記事カテゴリへ戻る →
          </Link>
        </p>
        <p className="mt-3 text-sm">
          <Link href="/resources/consultation-guide" className="font-semibold text-emerald-900 underline">
            相談先・公的支援の一覧 →
          </Link>
        </p>
      </div>
    </div>
  );
}
