import type { Metadata } from "next";
import Link from "next/link";
import { getSiteBaseUrl, SITE_NAME } from "@/lib/site-config";

const BASE = getSiteBaseUrl();
const URL = `${BASE}/glossary`;

export const metadata: Metadata = {
  title: "用語集｜返済・借入・家計",
  description: "元利均等・リボ払い・繰り上げ返済など、当サイトで使う用語の短い説明と関連記事への導線です。",
  alternates: { canonical: URL },
  openGraph: { title: "用語集", description: "返済・借入・家計の用語集。", url: URL, type: "website" },
};

const terms: { term: string; def: string; href?: string }[] = [
  {
    term: "元利均等返済",
    def: "毎月の返済額（元金＋利息の合計）を一定にしつつ、残債に応じて元金と利息の内訳が変わる返済方式。",
    href: "/articles/repayment-method-difference",
  },
  {
    term: "元金均等返済",
    def: "元金を毎月同額に分け、利息を加算する返済方式。初月の支払いが大きくなりやすい。",
    href: "/articles/repayment-method-difference",
  },
  {
    term: "リボ払い（リボルビング）",
    def: "クレジットカード等の残高を、毎月の支払い額を調整しながら返済していく方式。条件次第で完済が長引き利息が増えやすい。",
    href: "/articles/revo-100-interest",
  },
  {
    term: "繰り上げ返済",
    def: "約定返済に加え、まとまった金額を返済して元金を減らすこと。利息総額や完済時期に影響する。",
    href: "/articles/early-repayment-effect",
  },
  {
    term: "年利（実質年率）",
    def: "借入コストを年ベースで示す指標の一つ。契約や商品により表示方法が異なるため、契約書・公式説明を優先する。",
    href: "https://www.fsa.go.jp/",
  },
  {
    term: "固定費",
    def: "毎月おおよそ同額かかる支出（通信費・家賃・保険料など）。変動費と区別して家計を見ることがある。",
    href: "/articles/household-fixed-vs-variable",
  },
  {
    term: "副業",
    def: "本業以外の収入活動。会社規程・税務・時間管理など、個人の状況に依存する。",
    href: "/articles/repayment-improvement-guide",
  },
];

const definedTermSet = {
  "@context": "https://schema.org",
  "@type": "DefinedTermSet",
  name: `${SITE_NAME} 用語集`,
  hasDefinedTerm: terms.map((t) => ({
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
        <dl className="mt-8 space-y-8">
          {terms.map((t) => (
            <div key={t.term}>
              <dt className="ds-page-serif text-base font-bold text-stone-900">{t.term}</dt>
              <dd className="mt-2 text-base text-stone-700 leading-relaxed">{t.def}</dd>
              {t.href ? (
                <dd className="mt-2">
                  {t.href.startsWith("http") ? (
                    <a href={t.href} className="text-sm font-semibold text-emerald-900 underline" target="_blank" rel="noopener noreferrer">
                      参考（外部）→
                    </a>
                  ) : (
                    <Link href={t.href} className="text-sm font-semibold text-emerald-900 underline">
                      関連記事へ →
                    </Link>
                  )}
                </dd>
              ) : null}
            </div>
          ))}
        </dl>
        <p className="mt-10 text-sm">
          <Link href="/resources/consultation-guide" className="font-semibold text-emerald-900 underline">
            相談先・公的支援の一覧 →
          </Link>
        </p>
      </div>
    </div>
  );
}
