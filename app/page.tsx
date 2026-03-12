import Link from "next/link";
import type { Metadata } from "next";
import { getArticle } from "@/lib/articles";

export const metadata: Metadata = {
  title: "借入返済シミュレーター｜条件別に月々返済額・総利息・完済時期を比較",
  description:
    "借入額、金利、返済方式、返済期間、追加返済条件をもとに、月々返済額・総利息・完済時期を条件別に比較できる返済シミュレーターです。条件別の記事と組み合わせて返済負担を整理・判断できます。",
};

/** 主カード（シミュレーター・記事一覧） */
function MainCard({
  title,
  desc,
  href,
  cta,
  primary = false,
}: {
  title: string;
  desc: string;
  href: string;
  cta: string;
  primary?: boolean;
}) {
  return (
    <Link
      href={href}
      className="block rounded-3xl border border-gray-200 bg-white p-5 shadow-soft transition hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gray-900/10 md:p-6"
    >
      <div className="text-lg font-black text-gray-900">{title}</div>
      <div className="mt-2 text-sm text-gray-600 leading-relaxed">{desc}</div>
      <div
        className={`mt-4 inline-flex items-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-black ${
          primary
            ? "bg-gray-900 text-white"
            : "border border-gray-300 bg-gray-50 text-gray-800"
        }`}
      >
        {cta} <span aria-hidden>→</span>
      </div>
    </Link>
  );
}

/** よくある悩みから探す — 代表記事を静的に列挙 */
const FEATURED_SLUGS = [
  "loan-amount-guide",
  "borrow-100-interest",
  "borrow-300-monthly-payment",
  "monthly-50000-interest-at-15percent",
  "early-repayment-100k-effect",
  "revo-100man-30k-years",
] as const;

export default function Page() {
  const featuredArticles = FEATURED_SLUGS.map((slug) => getArticle(slug)).filter(
    (a): a is NonNullable<ReturnType<typeof getArticle>> => a != null
  );

  return (
    <div className="grid gap-8 md:gap-12">
      {/* ── Hero ────────────────────────────────────────── */}
      <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-soft md:p-10">
        <div className="max-w-3xl">
          <h1 className="text-3xl font-black tracking-tight text-gray-900 md:text-4xl">
            借入返済シミュレーター
          </h1>
          <p className="mt-4 text-base text-gray-700 leading-relaxed md:text-lg">
            借入額・金利・返済方式・返済期間を変えて、月々返済額・総利息・完済時期を<strong className="font-bold text-gray-900">条件別に比較</strong>できます。一般論ではなく自分の条件で確認し、記事と組み合わせて判断に使えます。
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/simulator/cardloan"
              className="inline-flex items-center justify-center rounded-2xl bg-gray-900 px-6 py-3.5 text-base font-black text-white hover:opacity-90"
            >
              カードローン返済を試算する →
            </Link>
            <Link
              href="/how-to"
              className="inline-flex items-center justify-center rounded-2xl border border-gray-300 bg-white px-5 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50"
            >
              使い方を見る
            </Link>
          </div>

          <div className="mt-7 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-gray-200 bg-gray-50/80 p-4">
              <div className="text-xs font-bold uppercase tracking-wide text-gray-500">できること</div>
              <div className="mt-1.5 text-sm font-bold text-gray-900">月々返済額を条件別に比較</div>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-gray-50/80 p-4">
              <div className="text-xs font-bold uppercase tracking-wide text-gray-500">できること</div>
              <div className="mt-1.5 text-sm font-bold text-gray-900">総利息・完済時期を確認</div>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-gray-50/80 p-4">
              <div className="text-xs font-bold uppercase tracking-wide text-gray-500">できること</div>
              <div className="mt-1.5 text-sm font-bold text-gray-900">返済方式・追加返済の違いを理解</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 主カード: シミュレーター ＋ 記事一覧 ───────────── */}
      <section className="grid gap-5 md:grid-cols-2">
        <MainCard
          primary
          title="カードローン返済シミュレーター"
          desc="借入額・金利・返済方式を入力し、条件別に月々返済額・総利息・完済時期を比較できます。A/B比較・CSV出力に対応。"
          href="/simulator/cardloan"
          cta="シミュレーターへ"
        />
        <MainCard
          title="条件別の返済ガイド記事一覧"
          desc="借入額別・返済方式別・リボ払い・繰り上げ返済・逆算など、条件ごとに返済負担の違いを整理した記事をカテゴリ別に確認できます。"
          href="/articles"
          cta="記事一覧へ"
        />
      </section>

      {/* ── よくある悩みから探す ─────────────────────────── */}
      <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-soft md:p-8">
        <h2 className="text-xl font-black text-gray-900 md:text-2xl">よくある悩みから探す</h2>
        <p className="mt-2 text-sm text-gray-600 leading-relaxed">
          条件が近い記事から読むと、シミュレーター結果が理解しやすくなります。
        </p>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {featuredArticles.map((a) => (
            <li key={a.slug}>
              <Link
                href={`/articles/${a.slug}`}
                className="block rounded-2xl border border-gray-200 bg-gray-50/50 p-4 transition hover:border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-900/10"
              >
                <span className="text-sm font-bold text-gray-900 leading-snug">{a.title}</span>
                <p className="mt-1.5 text-xs text-gray-500 leading-relaxed line-clamp-2">{a.summary}</p>
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href="/articles"
          className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-gray-700 hover:underline"
        >
          すべての記事を見る →
        </Link>
      </section>

      {/* ── 知っておきたいこと（カテゴリ入口） ─────────────── */}
      <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-soft md:p-8">
        <h2 className="text-xl font-black text-gray-900 md:text-2xl">知っておきたいこと</h2>
        <p className="mt-3 text-sm text-gray-700 leading-relaxed">
          借入額別・返済方式別・逆算別など、カテゴリ別に返済負担の違いを体系的に確認できます。気になるカテゴリから読み、最後はシミュレーターで自分の条件を試算してください。
        </p>
        <ul className="mt-6 space-y-3">
          <li>
            <Link
              href="/articles#loan-amount"
              className="block rounded-2xl border border-gray-200 bg-gray-50/50 p-4 transition hover:bg-gray-50 hover:border-gray-300"
            >
              <span className="text-base font-bold text-gray-900">借入額別で調べる</span>
              <p className="mt-1.5 text-xs text-gray-600 leading-relaxed">借入100万・200万・300万で返済負担がどう変わるか</p>
            </Link>
          </li>
          <li>
            <Link
              href="/articles#repayment-method"
              className="block rounded-2xl border border-gray-200 bg-gray-50/50 p-4 transition hover:bg-gray-50 hover:border-gray-300"
            >
              <span className="text-base font-bold text-gray-900">返済方式を比較する</span>
              <p className="mt-1.5 text-xs text-gray-600 leading-relaxed">元利均等・元金均等・定額元利・定額元金の違い</p>
            </Link>
          </li>
          <li>
            <Link
              href="/articles#revolving"
              className="block rounded-2xl border border-gray-200 bg-gray-50/50 p-4 transition hover:bg-gray-50 hover:border-gray-300"
            >
              <span className="text-base font-bold text-gray-900">リボ払いを理解する</span>
              <p className="mt-1.5 text-xs text-gray-600 leading-relaxed">リボ払いの利息や完済期間の重さを確認する</p>
            </Link>
          </li>
          <li>
            <Link
              href="/articles#repayment-improvement"
              className="block rounded-2xl border border-gray-200 bg-gray-50/50 p-4 transition hover:bg-gray-50 hover:border-gray-300"
            >
              <span className="text-base font-bold text-gray-900">返済改善を知る</span>
              <p className="mt-1.5 text-xs text-gray-600 leading-relaxed">繰り上げ返済や追加返済の効果を見る</p>
            </Link>
          </li>
          <li>
            <Link
              href="/articles#repayment-planning"
              className="block rounded-2xl border border-gray-200 bg-gray-50/50 p-4 transition hover:bg-gray-50 hover:border-gray-300"
            >
              <span className="text-base font-bold text-gray-900">逆算・返済計画</span>
              <p className="mt-1.5 text-xs text-gray-600 leading-relaxed">毎月返せる額から借入額・返済期間を考える</p>
            </Link>
          </li>
        </ul>
        <Link
          href="/articles"
          className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-gray-900 px-5 py-3 text-sm font-black text-white hover:opacity-90"
        >
          記事一覧を見る <span aria-hidden>→</span>
        </Link>
      </section>

      {/* ── 注意事項・補助導線 ──────────────────────────── */}
      <section className="rounded-3xl border border-gray-200 bg-gray-50/70 p-6">
        <h2 className="text-sm font-bold text-gray-700">注意事項</h2>
        <ul className="mt-3 space-y-1.5 text-xs text-gray-500 leading-relaxed">
          <li>・本ツールは参考情報です。実際の返済条件は契約内容（適用金利、端数処理、約定日等）を優先してください。</li>
          <li>・表示結果は入力値に基づく試算であり、将来の金利変動や手数料等は反映されません（入力で調整してください）。</li>
          <li>・ご不明点は「お問い合わせ」ページからご連絡ください。</li>
        </ul>

        <div className="mt-5 flex flex-wrap gap-2">
          <Link href="/about" className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-bold text-gray-600 hover:bg-gray-100">
            このサイトについて
          </Link>
          <Link href="/how-to" className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-bold text-gray-600 hover:bg-gray-100">
            使い方
          </Link>
          <Link href="/logic" className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-bold text-gray-600 hover:bg-gray-100">
            計算ロジック
          </Link>
          <Link href="/faq" className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-bold text-gray-600 hover:bg-gray-100">
            FAQ
          </Link>
          <Link href="/privacy" className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-bold text-gray-600 hover:bg-gray-100">
            プライバシーポリシー
          </Link>
          <Link href="/contact" className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-bold text-gray-600 hover:bg-gray-100">
            お問い合わせ
          </Link>
        </div>
      </section>
    </div>
  );
}
