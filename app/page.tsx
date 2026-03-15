import Link from "next/link";
import type { Metadata } from "next";
import { getFeaturedProblemArticles, CATEGORY_LABELS } from "@/lib/articles";
import { TrackedLink } from "./components/TrackedLink";
import type { TrackEventParams } from "@/lib/analytics";

export const metadata: Metadata = {
  title: "借入返済シミュレーター｜条件別に月々返済額・総利息・完済時期を比較",
  description:
    "毎月の固定負担を条件別に比較・試算するシミュレーター。借入返済を中心に、月々返済額・総利息・完済時期を具体条件で確認でき、記事とツールを往復して判断材料を提供します。",
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
            毎月の固定負担を条件別に比較・試算するためのツールです。借入返済では、数字を入れるだけで月々返済・総利息・完済時期がすぐ出ます。<strong className="font-bold text-gray-900">4つの返済方式</strong>（元利均等・元金均等・定額元利・定額元金）と<strong className="font-bold text-gray-900">A/B比較</strong>で条件の差を試せます。記事とシミュを往復しながら、気になる条件から試して判断に使えます。入力値は送信されず、ブラウザ内だけで計算します。
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
              <div className="mt-1.5 text-sm font-bold text-gray-900">月々の固定負担を条件別に比較</div>
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
          title="条件別の比較記事一覧"
          desc="借入返済・返済計画・固定費の見え方など、条件ごとに月々負担の違いを整理した記事をカテゴリ別に確認できます。記事とシミュレーターを往復して判断に役立てられます。"
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

      {/* ── その他のツール ───────────────────────────────── */}
      <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-soft md:p-8">
        <h2 className="text-xl font-black text-gray-900 md:text-2xl">その他のツール</h2>
        <p className="mt-2 text-sm text-gray-600 leading-relaxed">
          借入返済以外にも、固定負担の見直し効果を試算するツールを用意しています。
        </p>
        <TrackedLink
          href="/tools/fixed-cost-impact"
          className="mt-4 block rounded-2xl border border-gray-200 bg-gray-50/50 p-5 transition hover:border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-900/10"
          event={{
            action: "click_top_tool",
            location: "top_other_tools",
            target: "/tools/fixed-cost-impact",
            link_type: "tool_card",
            label: "fixed-cost-impact",
          }}
        >
          <div>
            <span className="text-base font-black text-gray-900">固定費削減インパクト計算</span>
            <p className="mt-1.5 text-sm text-gray-600 leading-relaxed">
              毎月の削減額を続けたとき、1年・3年・5年で合計いくらになるかをすぐ確認できます。通信費・サブスクなどの見直し効果を数字で把握するための軽量ツールです。
            </p>
            <span className="mt-3 inline-block text-sm font-bold text-gray-700">計算する →</span>
          </div>
        </TrackedLink>
      </section>

      {/* ── よくある悩みから探す（具体悩みの入口） ───────── */}
      <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-soft md:p-8">
        <h2 className="text-xl font-black text-gray-900 md:text-2xl">よくある悩みから探す</h2>
        <p className="mt-2 text-sm text-gray-600 leading-relaxed">
          一般論ではなく具体条件で違いを確認する前提で記事を整理しています。気になる条件に近い記事から読み、自分のケースはシミュレーターで試算し、記事とツールを往復して判断してください。
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
        <p className="mt-4 text-xs text-gray-500 leading-relaxed">
          固定費・家計・改善効果のカテゴリも、順次記事を追加していきます。気になるテーマがあれば記事一覧から探してください。
        </p>
      </section>

      {/* ── 知っておきたいこと（カテゴリ入口） ─────────────── */}
      <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-soft md:p-8">
        <h2 className="text-xl font-black text-gray-900 md:text-2xl">知っておきたいこと</h2>
        <p className="mt-3 text-sm text-gray-700 leading-relaxed">
          固定負担の見直し・借入返済・返済計画などを、カテゴリ別に条件ごとの違いとして整理しています。気になるカテゴリから読み、シミュレーターで自分の条件を試算し、記事とツールを往復して判断材料にしてください。
        </p>
        <ul className="mt-6 space-y-3">
          <li>
            <TrackedLink
              href="/articles#fixed-cost"
              className="block rounded-2xl border border-gray-200 bg-gray-50/50 p-4 transition hover:bg-gray-50 hover:border-gray-300"
              event={{
                action: "click_top_category_entry",
                location: "top_categories",
                target: "/articles#fixed-cost",
                link_type: "category_entry",
                category_key: "fixed-cost",
              }}
            >
              <span className="text-base font-bold text-gray-900">固定費見直し</span>
              <p className="mt-1.5 text-xs text-gray-600 leading-relaxed">通信費・サブスク・保険など、毎月の固定負担を見直す</p>
            </TrackedLink>
          </li>
          <li>
            <TrackedLink
              href="/articles#household"
              className="block rounded-2xl border border-gray-200 bg-gray-50/50 p-4 transition hover:bg-gray-50 hover:border-gray-300"
              event={{
                action: "click_top_category_entry",
                location: "top_categories",
                target: "/articles#household",
                link_type: "category_entry",
                category_key: "household",
              }}
            >
              <span className="text-base font-bold text-gray-900">家計管理</span>
              <p className="mt-1.5 text-xs text-gray-600 leading-relaxed">家計簿が続かない、支出が見えないなどの悩みを整理する</p>
            </TrackedLink>
          </li>
          <li>
            <TrackedLink
              href="/articles#improvement-effect"
              className="block rounded-2xl border border-gray-200 bg-gray-50/50 p-4 transition hover:bg-gray-50 hover:border-gray-300"
              event={{
                action: "click_top_category_entry",
                location: "top_categories",
                target: "/articles#improvement-effect",
                link_type: "category_entry",
                category_key: "improvement-effect",
              }}
            >
              <span className="text-base font-bold text-gray-900">改善効果の試算</span>
              <p className="mt-1.5 text-xs text-gray-600 leading-relaxed">月5,000円・1万円の改善で何が変わるかを比較する</p>
            </TrackedLink>
          </li>
          <li>
            <TrackedLink
              href="/articles#loan-comparison"
              className="block rounded-2xl border border-gray-200 bg-gray-50/50 p-4 transition hover:bg-gray-50 hover:border-gray-300"
              event={{
                action: "click_top_category_entry",
                location: "top_categories",
                target: "/articles#loan-comparison",
                link_type: "category_entry",
                category_key: "loan-comparison",
              }}
            >
              <span className="text-base font-bold text-gray-900">借入返済比較</span>
              <p className="mt-1.5 text-xs text-gray-600 leading-relaxed">借入額・返済方式・追加返済の違いを試算する</p>
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
              <span className="text-base font-bold text-gray-900">逆算・計画</span>
              <p className="mt-1.5 text-xs text-gray-600 leading-relaxed">毎月いくらなら無理がないかを逆算する</p>
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
