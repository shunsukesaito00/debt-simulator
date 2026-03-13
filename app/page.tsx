import Link from "next/link";
import type { Metadata } from "next";
import { getFeaturedProblemArticles, CATEGORY_LABELS } from "@/lib/articles";
import { TrackedLink } from "./components/TrackedLink";
import type { TrackEventParams } from "@/lib/analytics";

export const metadata: Metadata = {
  title: "借入返済シミュレーター｜条件別に月々返済額・総利息・完済時期を比較",
  description:
    "借入額、金利、返済方式、返済期間、追加返済条件をもとに、月々返済額・総利息・完済時期を条件別に比較できる返済シミュレーターです。条件別の記事と組み合わせて返済負担を整理・判断できます。",
};

const MAIN_CARD_CLASS =
  "block rounded-3xl border border-gray-200 bg-white p-5 shadow-soft transition hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gray-900/10 md:p-6";

/** 主カード（シミュレーター・記事一覧）。計測用に event を渡すと TrackedLink でラップする */
function MainCard({
  title,
  desc,
  href,
  cta,
  primary = false,
  event,
}: {
  title: string;
  desc: string;
  href: string;
  cta: string;
  primary?: boolean;
  event?: TrackEventParams;
}) {
  const content = (
    <>
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
    </>
  );
  if (event) {
    return (
      <TrackedLink href={href} className={MAIN_CARD_CLASS} event={event}>
        {content}
      </TrackedLink>
    );
  }
  return <Link href={href} className={MAIN_CARD_CLASS}>{content}</Link>;
}

export default function Page() {
  const featuredArticles = getFeaturedProblemArticles();

  return (
    <div className="grid gap-8 md:gap-12">
      {/* ── Hero ────────────────────────────────────────── */}
      <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-soft md:p-10">
        <div className="max-w-3xl">
          <h1 className="text-3xl font-black tracking-tight text-gray-900 md:text-4xl">
            借入返済シミュレーター
          </h1>
          <p className="mt-4 text-base text-gray-700 leading-relaxed md:text-lg">
            数字を入れるだけで月々返済・総利息・完済時期がすぐ出ます。<strong className="font-bold text-gray-900">4つの返済方式</strong>（元利均等・元金均等・定額元利・定額元金）と<strong className="font-bold text-gray-900">A/B比較</strong>で条件の差を試せます。記事とシミュが連動しているので、気になる条件から試して判断に使えます。入力値は送信されず、ブラウザ内だけで計算します。
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
            <TrackedLink
              href="/simulator/cardloan"
              className="inline-flex items-center justify-center rounded-2xl bg-gray-900 px-6 py-3.5 text-base font-black text-white hover:opacity-90"
              event={{
                action: "click_top_primary_cta",
                location: "top_hero",
                target: "/simulator/cardloan",
                link_type: "simulator_cta",
              }}
            >
              カードローン返済を試算する →
            </TrackedLink>
            <TrackedLink
              href="/how-to"
              className="inline-flex items-center justify-center rounded-2xl border border-gray-300 bg-white px-5 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50"
              event={{
                action: "click_top_secondary_cta",
                location: "top_hero",
                target: "/how-to",
                link_type: "support_cta",
              }}
            >
              使い方を見る
            </TrackedLink>
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
          <p className="mt-4 text-sm text-gray-600">
            返済額の目安をすぐ見る：<Link href="/quick-reference" className="font-bold text-gray-800 underline hover:no-underline">早見表（100万・200万・300万・3年/5年）</Link>
          </p>
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
          event={{
            action: "click_top_main_card",
            location: "top_main_cards",
            target: "/simulator/cardloan",
            link_type: "main_card",
            label: "simulator",
          }}
        />
        <MainCard
          title="条件別の返済ガイド記事一覧"
          desc="借入額別・返済方式別・リボ払い・繰り上げ返済・逆算など、条件ごとに返済負担の違いを整理した記事をカテゴリ別に確認できます。"
          href="/articles"
          cta="記事一覧へ"
          event={{
            action: "click_top_main_card",
            location: "top_main_cards",
            target: "/articles",
            link_type: "main_card",
            label: "articles",
          }}
        />
      </section>

      {/* ── よくある悩みから探す（具体悩みの入口） ───────── */}
      <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-soft md:p-8">
        <h2 className="text-xl font-black text-gray-900 md:text-2xl">よくある悩みから探す</h2>
        <p className="mt-2 text-sm text-gray-600 leading-relaxed">
          条件が近い記事から読むと、シミュレーター結果が理解しやすくなります。気になる条件に近い記事から読み、自分のケースはシミュレーターで確認してください。
        </p>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {featuredArticles.map((a) => (
            <li key={a.slug}>
              <TrackedLink
                href={`/articles/${a.slug}`}
                className="block rounded-2xl border border-gray-200 bg-gray-50/50 p-4 transition hover:border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-900/10"
                event={{
                  action: "click_top_problem_article",
                  location: "top_problem_articles",
                  target: `/articles/${a.slug}`,
                  link_type: "featured_problem_article",
                  article_slug: a.slug,
                  category_key: a.category,
                }}
              >
                <span className="rounded-full border border-gray-200 bg-white px-2 py-0.5 text-xs font-bold text-gray-600">
                  {CATEGORY_LABELS[a.category]}
                </span>
                <span className="mt-2 block text-sm font-bold text-gray-900 leading-snug">{a.title}</span>
                <p className="mt-1.5 text-xs text-gray-500 leading-relaxed line-clamp-2">{a.summary}</p>
                <span className="mt-2 inline-block text-xs font-bold text-gray-700">記事を読む →</span>
              </TrackedLink>
            </li>
          ))}
        </ul>
        <TrackedLink
          href="/articles"
          className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-gray-700 hover:underline"
          event={{
            action: "click_top_problem_article",
            location: "top_problem_articles",
            target: "/articles",
            link_type: "featured_problem_article",
          }}
        >
          すべての記事を見る →
        </TrackedLink>
      </section>

      {/* ── 知っておきたいこと（カテゴリ入口） ─────────────── */}
      <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-soft md:p-8">
        <h2 className="text-xl font-black text-gray-900 md:text-2xl">知っておきたいこと</h2>
        <p className="mt-3 text-sm text-gray-700 leading-relaxed">
          借入額別・返済方式別・逆算別など、カテゴリ別に返済負担の違いを体系的に確認できます。気になるカテゴリから読み、最後はシミュレーターで自分の条件を試算してください。
        </p>
        <ul className="mt-6 space-y-3">
          <li>
            <TrackedLink
              href="/articles#loan-amount"
              className="block rounded-2xl border border-gray-200 bg-gray-50/50 p-4 transition hover:bg-gray-50 hover:border-gray-300"
              event={{
                action: "click_top_category_entry",
                location: "top_categories",
                target: "/articles#loan-amount",
                link_type: "category_entry",
                category_key: "loan-amount",
              }}
            >
              <span className="text-base font-bold text-gray-900">借入額別で調べる</span>
              <p className="mt-1.5 text-xs text-gray-600 leading-relaxed">借入100万・200万・300万で返済負担がどう変わるか</p>
            </TrackedLink>
          </li>
          <li>
            <TrackedLink
              href="/articles#repayment-method"
              className="block rounded-2xl border border-gray-200 bg-gray-50/50 p-4 transition hover:bg-gray-50 hover:border-gray-300"
              event={{
                action: "click_top_category_entry",
                location: "top_categories",
                target: "/articles#repayment-method",
                link_type: "category_entry",
                category_key: "repayment-method",
              }}
            >
              <span className="text-base font-bold text-gray-900">返済方式を比較する</span>
              <p className="mt-1.5 text-xs text-gray-600 leading-relaxed">元利均等・元金均等・定額元利・定額元金の違い</p>
            </TrackedLink>
          </li>
          <li>
            <TrackedLink
              href="/articles#revolving"
              className="block rounded-2xl border border-gray-200 bg-gray-50/50 p-4 transition hover:bg-gray-50 hover:border-gray-300"
              event={{
                action: "click_top_category_entry",
                location: "top_categories",
                target: "/articles#revolving",
                link_type: "category_entry",
                category_key: "revolving",
              }}
            >
              <span className="text-base font-bold text-gray-900">リボ払いを理解する</span>
              <p className="mt-1.5 text-xs text-gray-600 leading-relaxed">リボ払いの利息や完済期間の重さを確認する</p>
            </TrackedLink>
          </li>
          <li>
            <TrackedLink
              href="/articles#repayment-improvement"
              className="block rounded-2xl border border-gray-200 bg-gray-50/50 p-4 transition hover:bg-gray-50 hover:border-gray-300"
              event={{
                action: "click_top_category_entry",
                location: "top_categories",
                target: "/articles#repayment-improvement",
                link_type: "category_entry",
                category_key: "repayment-improvement",
              }}
            >
              <span className="text-base font-bold text-gray-900">返済改善を知る</span>
              <p className="mt-1.5 text-xs text-gray-600 leading-relaxed">繰り上げ返済や追加返済の効果を見る</p>
            </TrackedLink>
          </li>
          <li>
            <TrackedLink
              href="/articles#repayment-planning"
              className="block rounded-2xl border border-gray-200 bg-gray-50/50 p-4 transition hover:bg-gray-50 hover:border-gray-300"
              event={{
                action: "click_top_category_entry",
                location: "top_categories",
                target: "/articles#repayment-planning",
                link_type: "category_entry",
                category_key: "repayment-planning",
              }}
            >
              <span className="text-base font-bold text-gray-900">逆算・返済計画</span>
              <p className="mt-1.5 text-xs text-gray-600 leading-relaxed">毎月返せる額から借入額・返済期間を考える</p>
            </TrackedLink>
          </li>
        </ul>
        <TrackedLink
          href="/articles"
          className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-gray-900 px-5 py-3 text-sm font-black text-white hover:opacity-90"
          event={{
            action: "click_top_category_entry",
            location: "top_categories",
            target: "/articles",
            link_type: "category_entry",
          }}
        >
          記事一覧を見る <span aria-hidden>→</span>
        </TrackedLink>
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
          <TrackedLink
            href="/about"
            className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-bold text-gray-600 hover:bg-gray-100"
            event={{ action: "click_top_support_link", location: "top_footer_support", target: "/about", link_type: "support_link" }}
          >
            このサイトについて
          </TrackedLink>
          <TrackedLink
            href="/how-to"
            className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-bold text-gray-600 hover:bg-gray-100"
            event={{ action: "click_top_support_link", location: "top_footer_support", target: "/how-to", link_type: "support_link" }}
          >
            使い方
          </TrackedLink>
          <TrackedLink
            href="/logic"
            className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-bold text-gray-600 hover:bg-gray-100"
            event={{ action: "click_top_support_link", location: "top_footer_support", target: "/logic", link_type: "support_link" }}
          >
            計算ロジック
          </TrackedLink>
          <TrackedLink
            href="/faq"
            className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-bold text-gray-600 hover:bg-gray-100"
            event={{ action: "click_top_support_link", location: "top_footer_support", target: "/faq", link_type: "support_link" }}
          >
            FAQ
          </TrackedLink>
          <TrackedLink
            href="/privacy"
            className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-bold text-gray-600 hover:bg-gray-100"
            event={{ action: "click_top_support_link", location: "top_footer_support", target: "/privacy", link_type: "support_link" }}
          >
            プライバシーポリシー
          </TrackedLink>
          <TrackedLink
            href="/contact"
            className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-bold text-gray-600 hover:bg-gray-100"
            event={{ action: "click_top_support_link", location: "top_footer_support", target: "/contact", link_type: "support_link" }}
          >
            お問い合わせ
          </TrackedLink>
        </div>
      </section>
    </div>
  );
}
