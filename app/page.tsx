import Link from "next/link";
import type { Metadata } from "next";
import {
  getHomeSpotlightArticles,
  getPopularArticles,
  getRecentArticles,
  getArticlesByCategory,
  CATEGORY_LABELS,
} from "@/lib/articles";
import { TrackedLink } from "./components/TrackedLink";
import { getSiteBaseUrl, SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE } from "@/lib/site-config";
import { SITE_UPDATES } from "@/lib/updates-log";

const BASE = getSiteBaseUrl();

export const metadata: Metadata = {
  title: `${SITE_NAME}｜体験記・副業実験・節約と返済・固定費の試算`,
  description: SITE_DESCRIPTION,
  alternates: { canonical: BASE },
  openGraph: {
    title: `${SITE_NAME}｜${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    url: BASE,
    type: "website",
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: BASE,
  description: SITE_DESCRIPTION,
  publisher: { "@id": `${BASE}/#organization` },
  logo: { "@type": "ImageObject", url: `${BASE}/icon` },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${BASE}/#organization`,
  name: SITE_NAME,
  url: BASE,
  description: SITE_DESCRIPTION,
};

type Pillar = {
  icon: string;
  title: string;
  desc: string;
  href: string;
  eventLocation: string;
  categoryKey: string;
};

function formatPublishedAt(iso?: string): string | null {
  if (!iso) return null;
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!m) return iso;
  return `${m[1]}年${m[2]}月${m[3]}日`;
}

const THEME_PILLARS: Pillar[] = [
  {
    icon: "📖",
    title: "体験記・返済日記",
    desc: "個人の体験記・返済に関する日記の一覧です",
    href: "/articles#story",
    eventLocation: "top_theme_pillars",
    categoryKey: "story",
  },
  {
    icon: "💼",
    title: "副業実験・収入改善",
    desc: "返済や家計改善のための副業・個人開発・販売記録",
    href: "/articles#side-income",
    eventLocation: "top_theme_pillars",
    categoryKey: "side-income",
  },
  {
    icon: "🗓️",
    title: "月次収益レポート",
    desc: "副業実験の定点観測。月ごとのレンジ推移と次の仮説を記録",
    href: "/income",
    eventLocation: "top_theme_pillars",
    categoryKey: "income-report",
  },
  {
    icon: "🍱",
    title: "節約・生活改善",
    desc: "食費・ポイント・日用品など、暮らしの中での工夫",
    href: "/articles#saving",
    eventLocation: "top_theme_pillars",
    categoryKey: "saving",
  },
  {
    icon: "💳",
    title: "リボ・借入の負担の見え方",
    desc: "借入額別・返済方式・リボ払いなど、条件ごとに月々や利息がどう変わるか読む",
    href: "/articles#loan-comparison",
    eventLocation: "top_theme_pillars",
    categoryKey: "loan-comparison",
  },
  {
    icon: "🏠",
    title: "固定費・節約の効果",
    desc: "通信費・サブスク・保険など、毎月の固定費をどう見直すか",
    href: "/articles#fixed-cost",
    eventLocation: "top_theme_pillars",
    categoryKey: "fixed-cost",
  },
  {
    icon: "🧾",
    title: "家計の見え方",
    desc: "家計簿・収支の整理の考え方（家計管理の記事）",
    href: "/articles#household",
    eventLocation: "top_theme_pillars",
    categoryKey: "household",
  },
  {
    icon: "📈",
    title: "返済を軽くする・繰り上げ",
    desc: "繰り上げ返済や返済方式の見直しで負担がどう変わるか",
    href: "/articles#repayment-improvement",
    eventLocation: "top_theme_pillars",
    categoryKey: "repayment-improvement",
  },
  {
    icon: "🔢",
    title: "返済シミュレーター",
    desc: "4つの返済方式・A/B比較で、自分の条件に近い数字を試す（入力は送信されません）",
    href: "/simulator/cardloan",
    eventLocation: "top_theme_pillars",
    categoryKey: "simulator",
  },
  {
    icon: "📊",
    title: "固定費削減インパクト",
    desc: "月いくら削ると1年・3年・5年でいくらになるか、さっと試す",
    href: "/tools/fixed-cost-impact",
    eventLocation: "top_theme_pillars",
    categoryKey: "fixed-cost-tool",
  },
];

export default function Page() {
  const spotlight = getHomeSpotlightArticles();
  const popular = getPopularArticles();
  const recent = getRecentArticles(5);
  const byCat = getArticlesByCategory();
  const pillarStories = (byCat.get("story") ?? []).slice(0, 3);
  const pillarSide = (byCat.get("side-income") ?? []).slice(0, 3);
  const pillarSaving = (byCat.get("saving") ?? []).slice(0, 3);
  const noteUrl = (process.env.NEXT_PUBLIC_NOTE_URL ?? "").trim();
  const xUrl = (process.env.NEXT_PUBLIC_X_URL ?? "").trim();

  return (
    <div className="grid gap-8 md:gap-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />

      {/* 1. ヒーロー */}
      <section className="ds-hero p-6 md:p-10">
        <div className="max-w-3xl">
          <p className="text-sm font-normal text-stone-600">{SITE_TAGLINE}</p>
          <p className="ds-meta mt-2 max-w-xl text-stone-500">
            体験と試算の両方から、自分のペースで比べられるようにしています。
          </p>
          <h1 className="ds-page-serif mt-4 text-3xl font-bold tracking-tight text-stone-900 md:text-4xl">
            {SITE_NAME}
          </h1>
          <p className="mt-3 text-base text-stone-700 leading-relaxed md:text-lg">
            体験記・副業・節約の記事と、返済・固定費の試算ツールを掲載しています。読み方の例は
            <Link href="/welcome" className="ml-0.5 font-medium text-emerald-900 underline decoration-emerald-300 hover:no-underline">
              はじめての方へ
            </Link>
            を参照してください。
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <TrackedLink
              href="/welcome"
              className="ds-btn ds-btn-primary px-6 py-3.5 text-base"
              event={{
                action: "click_top_primary_cta",
                location: "top_hero",
                target: "/welcome",
                link_type: "welcome_cta",
              }}
            >
              はじめての方へ →
            </TrackedLink>
            <TrackedLink
              href="/simulator/cardloan"
              className="ds-btn ds-btn-ghost px-6 py-3.5 text-base"
              event={{
                action: "click_top_secondary_cta",
                location: "top_hero",
                target: "/simulator/cardloan",
                link_type: "simulator_cta",
              }}
            >
              返済を試算する
            </TrackedLink>
          </div>
          <p className="mt-4 text-sm text-stone-600">
            早見表：
            <Link href="/quick-reference" className="font-medium text-stone-800 underline decoration-stone-300 hover:decoration-emerald-700">
              100万・200万・300万・3年/5年
            </Link>
          </p>
        </div>
      </section>

      {/* 1a. 最近の更新（更新ログ・収益レポートへの入口） */}
      <section
        className="rounded-xl border border-stone-200/55 bg-white/50 px-4 py-4 shadow-sm md:px-6 md:py-5"
        aria-labelledby="top-recent-updates-heading"
      >
        <h2 id="top-recent-updates-heading" className="sr-only">
          最近の更新
        </h2>
        <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-start sm:justify-between">
          <div className="min-w-0 max-w-2xl">
            <p className="ds-label">最近の更新</p>
            {SITE_UPDATES[0] && (
              <p className="mt-2 text-sm leading-relaxed text-stone-700">
                <time className="ds-meta text-stone-500" dateTime={SITE_UPDATES[0].date}>
                  {formatPublishedAt(SITE_UPDATES[0].date)}
                </time>
                <span className="mx-1.5 text-stone-400" aria-hidden>
                  ·
                </span>
                <span>{SITE_UPDATES[0].title}</span>
              </p>
            )}
          </div>
          <div className="flex shrink-0 flex-wrap gap-2 sm:justify-end">
            <TrackedLink
              href="/updates"
              className="ds-btn ds-btn-secondary px-4 py-2.5 text-sm"
              event={{
                action: "click_top_recent_updates_strip",
                location: "top_recent_updates_strip",
                target: "/updates",
                link_type: "updates_log",
              }}
            >
              更新ログを見る
            </TrackedLink>
            <TrackedLink
              href="/income"
              className="ds-btn ds-btn-ghost px-4 py-2.5 text-sm"
              event={{
                action: "click_top_income_from_updates_strip",
                location: "top_recent_updates_strip",
                target: "/income",
                link_type: "income_report",
              }}
            >
              収益レポート →
            </TrackedLink>
          </div>
        </div>
      </section>

      {/* 1b. 3本柱：体験記・副業実験・節約 */}
      <section className="ds-surface-soft ds-card-pad">
        <h2 className="ds-section-title text-xl md:text-2xl">体験記・副業実験・節約の最新</h2>
        <p className="mt-3 text-sm text-stone-600 leading-relaxed">
          カテゴリ別の新着記事です。
        </p>
        <div className="mt-6 grid gap-8 lg:grid-cols-3">
          <div>
            <h3 className="text-sm font-semibold text-stone-800">体験記・返済日記</h3>
            <ul className="mt-3 space-y-2">
              {pillarStories.map((a) => (
                <li key={a.slug}>
                  <TrackedLink
                    href={`/articles/${a.slug}`}
                    className="text-sm font-medium text-stone-800 underline decoration-stone-300 hover:decoration-emerald-700"
                    event={{
                      action: "click_top_pillar_story",
                      location: "top_three_pillars",
                      target: `/articles/${a.slug}`,
                      link_type: "pillar_article",
                      article_slug: a.slug,
                    }}
                  >
                    {a.title}
                  </TrackedLink>
                </li>
              ))}
            </ul>
            <TrackedLink
              href="/articles/category/story"
              className="mt-3 inline-block text-xs font-semibold text-emerald-900"
              event={{ action: "click_top_pillar_more", location: "top_three_pillars", target: "/articles/category/story", link_type: "pillar_more" }}
            >
              体験記をもっと見る →
            </TrackedLink>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-stone-800">副業実験・収入改善</h3>
            <ul className="mt-3 space-y-2">
              {pillarSide.map((a) => (
                <li key={a.slug}>
                  <TrackedLink
                    href={`/articles/${a.slug}`}
                    className="text-sm font-medium text-stone-800 underline decoration-stone-300 hover:decoration-emerald-700"
                    event={{
                      action: "click_top_pillar_side",
                      location: "top_three_pillars",
                      target: `/articles/${a.slug}`,
                      link_type: "pillar_article",
                      article_slug: a.slug,
                    }}
                  >
                    {a.title}
                  </TrackedLink>
                </li>
              ))}
            </ul>
            <TrackedLink
              href="/articles/category/side-income"
              className="mt-3 inline-block text-xs font-semibold text-emerald-900"
              event={{ action: "click_top_pillar_more", location: "top_three_pillars", target: "/articles/category/side-income", link_type: "pillar_more" }}
            >
              副業実験の記事をもっと見る →
            </TrackedLink>
            <TrackedLink
              href="/income"
              className="mt-1 inline-block text-xs font-semibold text-emerald-900"
              event={{ action: "click_top_pillar_income", location: "top_three_pillars", target: "/income", link_type: "income_archive" }}
            >
              月次の収益レポートを見る →
            </TrackedLink>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-stone-800">節約・生活改善</h3>
            <ul className="mt-3 space-y-2">
              {pillarSaving.map((a) => (
                <li key={a.slug}>
                  <TrackedLink
                    href={`/articles/${a.slug}`}
                    className="text-sm font-medium text-stone-800 underline decoration-stone-300 hover:decoration-emerald-700"
                    event={{
                      action: "click_top_pillar_saving",
                      location: "top_three_pillars",
                      target: `/articles/${a.slug}`,
                      link_type: "pillar_article",
                      article_slug: a.slug,
                    }}
                  >
                    {a.title}
                  </TrackedLink>
                </li>
              ))}
            </ul>
            <TrackedLink
              href="/articles/category/saving"
              className="mt-3 inline-block text-xs font-semibold text-emerald-900"
              event={{ action: "click_top_pillar_more", location: "top_three_pillars", target: "/articles/category/saving", link_type: "pillar_more" }}
            >
              節約の記事をもっと見る →
            </TrackedLink>
          </div>
        </div>
      </section>

      {/* 2. おすすめ・スポットライト */}
      <section className="ds-surface-soft ds-card-pad">
        <h2 className="ds-section-title text-xl md:text-2xl">おすすめの記事</h2>
        <p className="mt-3 text-sm text-stone-600 leading-relaxed">
          体験記から条件別の記事まで、よく参照されるものを先に並べています。
        </p>
        <ul className="mt-5 divide-y divide-stone-200/70 rounded-xl border border-stone-200/50 bg-white/50">
          {spotlight.map((a) => (
            <li key={a.slug}>
              <TrackedLink
                href={`/articles/${a.slug}`}
                className="block px-4 py-4 transition first:rounded-t-xl last:rounded-b-xl hover:bg-stone-50/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700/30 focus-visible:ring-inset"
                event={{
                  action: "click_top_spotlight_article",
                  location: "top_spotlight",
                  target: `/articles/${a.slug}`,
                  link_type: "spotlight_article",
                  article_slug: a.slug,
                  category_key: a.category,
                }}
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-md border border-stone-200/80 bg-stone-50/90 px-2 py-0.5 text-xs font-medium text-stone-600">
                    {CATEGORY_LABELS[a.category]}
                  </span>
                  {a.badge && (
                    <span className="rounded-md bg-emerald-900 px-2 py-0.5 text-xs font-semibold text-white">
                      {a.badge}
                    </span>
                  )}
                </div>
                <span className="mt-2 block text-sm font-semibold text-stone-900 leading-snug">{a.title}</span>
                <p className="mt-1.5 text-xs text-stone-500 leading-relaxed line-clamp-2">{a.summary}</p>
                <span className="ds-meta mt-2 inline-block text-emerald-900">記事を読む →</span>
              </TrackedLink>
            </li>
          ))}
        </ul>
      </section>

      {/* 2b. 最近の記事（日付順） */}
      <section className="ds-surface-soft ds-card-pad">
        <h2 className="ds-section-title text-xl md:text-2xl">最近の記事</h2>
        <p className="mt-3 text-sm text-stone-600 leading-relaxed">
          公開日が新しい記事です。「おすすめの記事」と重なる場合もあります。
        </p>
        <ul className="mt-5 divide-y divide-stone-200/80 border-y border-stone-200/70">
          {recent.map((a) => {
            const dateLabel = formatPublishedAt(a.publishedAt);
            return (
              <li key={a.slug} className="py-3 first:pt-0 last:pb-0">
                <TrackedLink
                  href={`/articles/${a.slug}`}
                  className="group block rounded-lg px-0 py-0.5 transition hover:bg-stone-50/80"
                  event={{
                    action: "click_top_recent_article",
                    location: "top_recent_articles",
                    target: `/articles/${a.slug}`,
                    link_type: "recent_article",
                    article_slug: a.slug,
                    category_key: a.category,
                  }}
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-md border border-stone-200/80 bg-stone-50/90 px-2 py-0.5 text-xs font-medium text-stone-600">
                      {CATEGORY_LABELS[a.category]}
                    </span>
                    {dateLabel && (
                      <time className="ds-meta text-stone-500" dateTime={a.publishedAt}>
                        {dateLabel}
                      </time>
                    )}
                  </div>
                  <span className="mt-1 block text-sm font-semibold text-stone-900 group-hover:underline">{a.title}</span>
                </TrackedLink>
              </li>
            );
          })}
        </ul>
      </section>

      {/* 3. 運営者一言 + 自己紹介 */}
      <section className="ds-section-alt border border-stone-200/60">
        <p className="ds-label">運営者より一言</p>
        <blockquote className="ds-page-serif mt-3 text-base font-semibold leading-relaxed text-stone-900 md:text-lg">
          数字が先に来ると、もっとしんどくなることがあります。体験と試算の両方を置いて、自分のペースで比べられるようにしています。
        </blockquote>
        <p className="mt-4 text-sm text-stone-700 leading-relaxed">
          投資助言や借入の勧誘はしていません。経緯やスタンスの詳細は
          <TrackedLink
            href="/about"
            className="ml-1 font-semibold text-emerald-900 underline decoration-emerald-300 hover:no-underline"
            event={{
              action: "click_top_operator_voice",
              location: "top_operator_voice",
              target: "/about",
              link_type: "about_from_voice",
            }}
          >
            運営者プロフィール
          </TrackedLink>
          へ。
        </p>
      </section>

      {/* 4. テーマ別ピラー */}
      <section className="ds-surface-soft ds-card-pad">
        <h2 className="ds-section-title text-xl md:text-2xl">テーマ別に読む</h2>
        <p className="mt-3 text-sm text-stone-600 leading-relaxed">
          記事一覧のセクションへジャンプするか、ツールでその場で試せます。
        </p>
        <ul className="mt-6 divide-y divide-stone-200/70 overflow-hidden rounded-2xl border border-stone-200/50 bg-white/45">
          {THEME_PILLARS.map((p) => (
            <li key={p.categoryKey}>
              <TrackedLink
                href={p.href}
                className="flex gap-3 px-4 py-4 transition first:rounded-t-2xl last:rounded-b-2xl hover:bg-stone-50/80 sm:gap-4 sm:px-5"
                event={{
                  action: "click_top_theme_pillar",
                  location: p.eventLocation,
                  target: p.href,
                  link_type: "theme_pillar",
                  category_key: p.categoryKey,
                }}
              >
                <span className="text-2xl leading-none" aria-hidden>
                  {p.icon}
                </span>
                <div className="min-w-0 flex-1">
                  <span className="block text-base font-medium text-stone-900">{p.title}</span>
                  <p className="mt-1 text-sm text-stone-600 leading-relaxed">{p.desc}</p>
                  <span className="ds-meta mt-2 inline-block text-emerald-900">開く →</span>
                </div>
              </TrackedLink>
            </li>
          ))}
        </ul>
      </section>

      {/* 5. よく読まれている */}
      <section className="ds-surface-soft ds-card-pad">
        <h2 className="ds-section-title text-xl md:text-2xl">よく読まれている記事</h2>
        <p className="mt-3 text-sm text-stone-600 leading-relaxed">
          はじめに読む方におすすめの記事を、テーマ別に並べています。
        </p>
        <ol className="mt-5 list-decimal space-y-3 pl-5 text-sm text-stone-800">
          {popular.map((a) => (
            <li key={a.slug}>
              <TrackedLink
                href={`/articles/${a.slug}`}
                className="font-medium text-stone-900 underline decoration-stone-300 hover:decoration-emerald-700"
                event={{
                  action: "click_top_popular_article",
                  location: "top_popular",
                  target: `/articles/${a.slug}`,
                  link_type: "popular_article",
                  article_slug: a.slug,
                }}
              >
                {a.title}
              </TrackedLink>
            </li>
          ))}
        </ol>
      </section>

      {/* 6. はじめての方（3カード） */}
      <section className="ds-surface-soft ds-card-pad">
        <h2 className="ds-section-title text-xl md:text-2xl">はじめての方へ</h2>
        <p className="mt-3 text-sm text-stone-600 leading-relaxed">
          次の順で案内しています。
        </p>
        <ul className="mt-6 grid gap-4 md:grid-cols-3">
          <li>
            <TrackedLink
              href="/welcome#recommended"
              className="block h-full rounded-xl border border-stone-200/50 bg-white/60 p-5 shadow-sm transition hover:border-stone-300/80 hover:bg-white/90"
              event={{
                action: "click_top_welcome_card",
                location: "top_welcome_cards",
                target: "/welcome#recommended",
                link_type: "welcome_card",
                label: "reading_order",
              }}
            >
              <div className="ds-meta text-emerald-900/90">Step 1</div>
              <div className="mt-2 text-base font-semibold text-stone-900">読む順番を決める</div>
              <p className="mt-2 text-xs text-stone-600 leading-relaxed">
                体験記と解説記事のおすすめ順を「はじめての方へ」にまとめました。
              </p>
              <span className="mt-3 inline-block text-sm font-semibold text-emerald-900">開く →</span>
            </TrackedLink>
          </li>
          <li>
            <TrackedLink
              href="/simulator/cardloan"
              className="block h-full rounded-xl border border-stone-200/50 bg-white/60 p-5 shadow-sm transition hover:border-stone-300/80 hover:bg-white/90"
              event={{
                action: "click_top_welcome_card",
                location: "top_welcome_cards",
                target: "/simulator/cardloan",
                link_type: "welcome_card",
                label: "simulator",
              }}
            >
              <div className="ds-meta text-emerald-900/90">Step 2</div>
              <div className="mt-2 text-base font-semibold text-stone-900">返済を数字で試す</div>
              <p className="mt-2 text-xs text-stone-600 leading-relaxed">
                借入額・金利・期間を変えて、月々と総額のイメージを掴みます。
              </p>
              <span className="mt-3 inline-block text-sm font-semibold text-emerald-900">シミュレーターへ →</span>
            </TrackedLink>
          </li>
          <li>
            <TrackedLink
              href="/articles#household"
              className="block h-full rounded-xl border border-stone-200/50 bg-white/60 p-5 shadow-sm transition hover:border-stone-300/80 hover:bg-white/90"
              event={{
                action: "click_top_welcome_card",
                location: "top_welcome_cards",
                target: "/articles#household",
                link_type: "welcome_card",
                label: "stories",
              }}
            >
              <div className="ds-meta text-emerald-900/90">Step 3</div>
              <div className="mt-2 text-base font-semibold text-stone-900">体験記・家計の記事</div>
              <p className="mt-2 text-xs text-stone-600 leading-relaxed">
                家計カテゴリで体験記や家計の整理の記事に進めます。
              </p>
              <span className="mt-3 inline-block text-sm font-semibold text-emerald-900">記事一覧へ →</span>
            </TrackedLink>
          </li>
        </ul>
      </section>

      {/* 7. お問い合わせ */}
      <section className="ds-section-alt border border-stone-200/60">
        <h2 className="ds-section-title text-lg">ご相談・お問い合わせ</h2>
        <p className="mt-2 text-sm text-stone-600 leading-relaxed">
          内容によっては返信にお時間がかかる場合があります。緊急の金融トラブルは取引先や専門窓口へご相談ください。
        </p>
        <TrackedLink
          href="/contact"
          className="ds-btn ds-btn-secondary mt-4"
          event={{
            action: "click_top_contact",
            location: "top_contact_block",
            target: "/contact",
            link_type: "contact",
          }}
        >
          お問い合わせページへ →
        </TrackedLink>
        {(noteUrl || xUrl) && (
          <div className="mt-6 border-t border-stone-200 pt-5">
            <p className="text-xs font-semibold text-stone-600">更新・発信（外部）</p>
            <div className="mt-3 flex flex-wrap gap-3">
              {noteUrl ? (
                <TrackedLink
                  href={noteUrl}
                  className="text-sm font-medium text-stone-800 underline decoration-stone-300 hover:decoration-emerald-700"
                  rel="noopener noreferrer"
                  target="_blank"
                  event={{
                    action: "click_top_social_note",
                    location: "top_contact_social",
                    target: noteUrl,
                    link_type: "external_note",
                  }}
                >
                  note で読む →
                </TrackedLink>
              ) : null}
              {xUrl ? (
                <TrackedLink
                  href={xUrl}
                  className="text-sm font-medium text-stone-800 underline decoration-stone-300 hover:decoration-emerald-700"
                  rel="noopener noreferrer"
                  target="_blank"
                  event={{
                    action: "click_top_social_x",
                    location: "top_contact_social",
                    target: xUrl,
                    link_type: "external_x",
                  }}
                >
                  X（旧Twitter）→
                </TrackedLink>
              ) : null}
            </div>
          </div>
        )}
      </section>

      {/* 8. このサイトについて */}
      <section className="ds-surface-soft ds-card-pad bg-gradient-to-br from-white/90 to-emerald-50/25">
        <h2 className="ds-section-title text-lg">このサイトについて</h2>
        <p className="mt-3 text-sm text-stone-700 leading-relaxed">
          借入返済・固定費の見直し・返済計画を、一般論ではなく<strong>条件を変えたときの数字</strong>で確認できるようにしています。
          シミュレーターと記事を行き来しながら、自分の判断材料にしていただければ幸いです。
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          <TrackedLink href="/articles" className="ds-btn ds-btn-primary ds-btn-sm" event={{ action: "click_top_site_about", location: "top_site_about", target: "/articles", link_type: "support_link" }}>
            記事一覧
          </TrackedLink>
          <TrackedLink href="/how-to" className="ds-btn ds-btn-secondary ds-btn-sm" event={{ action: "click_top_site_about", location: "top_site_about", target: "/how-to", link_type: "support_link" }}>
            使い方
          </TrackedLink>
          <TrackedLink href="/faq" className="ds-btn ds-btn-secondary ds-btn-sm" event={{ action: "click_top_site_about", location: "top_site_about", target: "/faq", link_type: "support_link" }}>
            FAQ
          </TrackedLink>
          <TrackedLink href="/logic" className="ds-btn ds-btn-secondary ds-btn-sm" event={{ action: "click_top_site_about", location: "top_site_about", target: "/logic", link_type: "support_link" }}>
            計算ロジック
          </TrackedLink>
          <TrackedLink href="/privacy" className="ds-btn ds-btn-secondary ds-btn-sm" event={{ action: "click_top_site_about", location: "top_site_about", target: "/privacy", link_type: "support_link" }}>
            プライバシー
          </TrackedLink>
        </div>
      </section>

      {/* 注意事項 */}
      <section className="ds-subcard p-6">
        <h2 className="text-sm font-semibold text-stone-700">注意事項</h2>
        <ul className="mt-3 space-y-1.5 text-xs text-stone-500 leading-relaxed">
          <li>・本ツールは参考情報です。実際の返済条件は契約内容を優先してください。</li>
          <li>・表示は入力に基づく試算であり、将来の金利変動等は反映されません。</li>
        </ul>
      </section>
    </div>
  );
}
