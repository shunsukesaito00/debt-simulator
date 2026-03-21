import Link from "next/link";
import type { Metadata } from "next";
import {
  getHomeSpotlightArticles,
  getPopularArticles,
  getRecentArticles,
  CATEGORY_LABELS,
} from "@/lib/articles";
import { TrackedLink } from "./components/TrackedLink";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://debt-simulator-quzc.vercel.app";

export const metadata: Metadata = {
  title: "借入返済シミュレーター｜条件別に月々返済額・総利息・完済時期を比較",
  description:
    "金欠や返済で悩む方向けに、体験記と数字のツールを並べています。借入返済シミュレーターで条件別に月々・総利息・完済時期を試算できます。",
  alternates: { canonical: BASE },
  openGraph: {
    title: "借入返済シミュレーター｜条件別に月々返済額・総利息・完済時期を比較",
    description:
      "体験記とシミュレーターで、返済と固定費の見え方を整理するサイトです。",
    url: BASE,
    type: "website",
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "借入返済シミュレーター",
  url: BASE,
  description:
    "借入返済の試算シミュレーターと、固定費・返済まわりの記事。金欠や返済で悩む方の判断材料になります。",
  publisher: { "@id": `${BASE}/#organization` },
  logo: { "@type": "ImageObject", url: `${BASE}/favicon.ico` },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${BASE}/#organization`,
  name: "借入返済シミュレーター",
  url: BASE,
  description:
    "返済・固定費の数字を試せるツールと、条件別の記事・体験記を載せています。投資助言や借入の勧誘は行いません。",
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
    icon: "📖",
    title: "体験記・家計の話",
    desc: "運営者の体験や、家計簿・収支の整理の考え方",
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
  const noteUrl = (process.env.NEXT_PUBLIC_NOTE_URL ?? "").trim();
  const xUrl = (process.env.NEXT_PUBLIC_X_URL ?? "").trim();

  return (
    <div className="grid gap-8 md:gap-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />

      {/* 1. ヒーロー */}
      <section className="ds-card p-6 md:p-10">
        <div className="max-w-3xl">
          <p className="text-sm font-bold text-stone-600">悩んでいる方へ</p>
          <h1 className="ds-page-serif mt-2 text-3xl font-bold tracking-tight text-stone-900 md:text-4xl">
            借入返済シミュレーター
          </h1>
          <p className="mt-3 text-base text-stone-700 leading-relaxed md:text-lg">
            返済や金欠で気持ちが沈んでいるとき、数字だけが先に来るサイトだと負けます。このサイトでは
            <strong className="text-stone-900">体験の記録</strong>と
            <strong className="text-stone-900">試算できるツール</strong>
            の両方を置いています。まずは
            <Link href="/welcome" className="font-bold text-stone-900 underline decoration-stone-400 hover:no-underline">
              はじめての方へ
            </Link>
            から読む順番を決めても大丈夫です。
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
              className="ds-btn ds-btn-secondary px-6 py-3.5 text-base"
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
            <Link href="/quick-reference" className="font-bold text-stone-800 underline hover:no-underline">
              100万・200万・300万・3年/5年
            </Link>
          </p>
        </div>
      </section>

      {/* 2. おすすめ・スポットライト */}
      <section className="ds-card ds-card-pad">
        <h2 className="ds-page-serif text-xl font-bold text-stone-900 md:text-2xl">おすすめの記事</h2>
        <p className="mt-2 text-sm text-stone-600 leading-relaxed">
          体験記から条件別の記事まで、よく参照されるものを先に並べています。
        </p>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {spotlight.map((a) => (
            <li key={a.slug}>
              <TrackedLink
                href={`/articles/${a.slug}`}
                className="block ds-subcard p-4 transition hover:shadow-md focus:outline-none focus:ring-2 focus:ring-stone-900/10"
                event={{
                  action: "click_top_spotlight_article",
                  location: "top_spotlight",
                  target: `/articles/${a.slug}`,
                  link_type: "spotlight_article",
                  article_slug: a.slug,
                  category_key: a.category,
                }}
              >
                <span className="rounded-full border border-stone-200 bg-stone-50 px-2 py-0.5 text-xs font-bold text-stone-600">
                  {CATEGORY_LABELS[a.category]}
                </span>
                {a.badge && (
                  <span className="ml-1 rounded-full bg-stone-800 px-2 py-0.5 text-xs font-bold text-white">
                    {a.badge}
                  </span>
                )}
                <span className="mt-2 block text-sm font-bold text-stone-900 leading-snug">{a.title}</span>
                <p className="mt-1.5 text-xs text-stone-500 leading-relaxed line-clamp-2">{a.summary}</p>
                <span className="mt-2 inline-block text-xs font-bold text-stone-700">記事を読む →</span>
              </TrackedLink>
            </li>
          ))}
        </ul>
      </section>

      {/* 2b. 最近の記事（日付順） */}
      <section className="ds-card ds-card-pad">
        <h2 className="ds-page-serif text-xl font-bold text-stone-900 md:text-2xl">最近の記事</h2>
        <p className="mt-2 text-sm text-stone-600 leading-relaxed">
          公開日が新しい記事です。「おすすめの記事」と重なる場合もあります。
        </p>
        <ul className="mt-5 divide-y divide-stone-200 border-y border-stone-200">
          {recent.map((a) => {
            const dateLabel = formatPublishedAt(a.publishedAt);
            return (
              <li key={a.slug} className="py-3 first:pt-0 last:pb-0">
                <TrackedLink
                  href={`/articles/${a.slug}`}
                  className="group block"
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
                    <span className="rounded-full border border-stone-200 bg-stone-50 px-2 py-0.5 text-xs font-bold text-stone-600">
                      {CATEGORY_LABELS[a.category]}
                    </span>
                    {dateLabel && (
                      <time className="text-xs text-stone-500" dateTime={a.publishedAt}>
                        {dateLabel}
                      </time>
                    )}
                  </div>
                  <span className="mt-1 block text-sm font-bold text-stone-900 group-hover:underline">{a.title}</span>
                </TrackedLink>
              </li>
            );
          })}
        </ul>
      </section>

      {/* 3. 運営者一言 + 自己紹介 */}
      <section className="ds-subcard border-stone-200 bg-stone-50/80 p-6">
        <p className="text-xs font-bold uppercase tracking-wide text-stone-500">運営者より一言</p>
        <blockquote className="ds-page-serif mt-3 text-base font-bold leading-relaxed text-stone-900 md:text-lg">
          数字が先に来ると、もっとしんどくなることがあります。体験と試算の両方を置いて、自分のペースで比べられるようにしています。
        </blockquote>
        <p className="mt-4 text-sm text-stone-700 leading-relaxed">
          投資助言や借入の勧誘はしていません。経緯やスタンスの詳細は
          <TrackedLink
            href="/about"
            className="ml-1 font-bold text-stone-900 underline hover:no-underline"
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
      <section className="ds-card ds-card-pad">
        <h2 className="ds-page-serif text-xl font-bold text-stone-900 md:text-2xl">悩み別に読む</h2>
        <p className="mt-2 text-sm text-stone-600 leading-relaxed">
          記事一覧のセクションへジャンプするか、ツールでその場で試せます。
        </p>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {THEME_PILLARS.map((p) => (
            <li key={p.categoryKey}>
              <TrackedLink
                href={p.href}
                className="block h-full ds-subcard p-4 transition hover:shadow-md"
                event={{
                  action: "click_top_theme_pillar",
                  location: p.eventLocation,
                  target: p.href,
                  link_type: "theme_pillar",
                  category_key: p.categoryKey,
                }}
              >
                <span className="text-2xl" aria-hidden>
                  {p.icon}
                </span>
                <span className="mt-2 block text-base font-bold text-stone-900">{p.title}</span>
                <p className="mt-1.5 text-xs text-stone-600 leading-relaxed">{p.desc}</p>
                <span className="mt-3 inline-block text-xs font-bold text-stone-700">開く →</span>
              </TrackedLink>
            </li>
          ))}
        </ul>
      </section>

      {/* 5. よく読まれている */}
      <section className="ds-card ds-card-pad">
        <h2 className="ds-page-serif text-xl font-bold text-stone-900 md:text-2xl">よく読まれている記事</h2>
        <p className="mt-2 text-sm text-stone-600 leading-relaxed">
          アクセス数ではなく、手動で「定番」として置いている一覧です。
        </p>
        <ol className="mt-5 list-decimal space-y-3 pl-5 text-sm text-stone-800">
          {popular.map((a) => (
            <li key={a.slug}>
              <TrackedLink
                href={`/articles/${a.slug}`}
                className="font-bold text-stone-900 underline decoration-stone-300 hover:decoration-stone-800"
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
      <section className="ds-card ds-card-pad">
        <h2 className="ds-page-serif text-xl font-bold text-stone-900 md:text-2xl">はじめての方へ</h2>
        <p className="mt-2 text-sm text-stone-600 leading-relaxed">
          迷ったらこの順でどうぞ。
        </p>
        <ul className="mt-6 grid gap-4 md:grid-cols-3">
          <li>
            <TrackedLink
              href="/welcome#recommended"
              className="block h-full ds-subcard p-5 transition hover:shadow-md"
              event={{
                action: "click_top_welcome_card",
                location: "top_welcome_cards",
                target: "/welcome#recommended",
                link_type: "welcome_card",
                label: "reading_order",
              }}
            >
              <div className="text-xs font-bold uppercase tracking-wide text-stone-500">Step 1</div>
              <div className="mt-2 text-base font-bold text-stone-900">読む順番を決める</div>
              <p className="mt-2 text-xs text-stone-600 leading-relaxed">
                体験記と解説記事のおすすめ順を「はじめての方へ」にまとめました。
              </p>
              <span className="mt-3 inline-block text-sm font-bold text-stone-700">開く →</span>
            </TrackedLink>
          </li>
          <li>
            <TrackedLink
              href="/simulator/cardloan"
              className="block h-full ds-subcard p-5 transition hover:shadow-md"
              event={{
                action: "click_top_welcome_card",
                location: "top_welcome_cards",
                target: "/simulator/cardloan",
                link_type: "welcome_card",
                label: "simulator",
              }}
            >
              <div className="text-xs font-bold uppercase tracking-wide text-stone-500">Step 2</div>
              <div className="mt-2 text-base font-bold text-stone-900">返済を数字で試す</div>
              <p className="mt-2 text-xs text-stone-600 leading-relaxed">
                借入額・金利・期間を変えて、月々と総額のイメージを掴みます。
              </p>
              <span className="mt-3 inline-block text-sm font-bold text-stone-700">シミュレーターへ →</span>
            </TrackedLink>
          </li>
          <li>
            <TrackedLink
              href="/articles#household"
              className="block h-full ds-subcard p-5 transition hover:shadow-md"
              event={{
                action: "click_top_welcome_card",
                location: "top_welcome_cards",
                target: "/articles#household",
                link_type: "welcome_card",
                label: "stories",
              }}
            >
              <div className="text-xs font-bold uppercase tracking-wide text-stone-500">Step 3</div>
              <div className="mt-2 text-base font-bold text-stone-900">体験記・家計の記事</div>
              <p className="mt-2 text-xs text-stone-600 leading-relaxed">
                家計カテゴリで体験記や家計の整理の記事に進めます。
              </p>
              <span className="mt-3 inline-block text-sm font-bold text-stone-700">記事一覧へ →</span>
            </TrackedLink>
          </li>
        </ul>
      </section>

      {/* 7. お問い合わせ */}
      <section className="ds-subcard p-6">
        <h2 className="ds-page-serif text-lg font-bold text-stone-900">ご相談・お問い合わせ</h2>
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
            <p className="text-xs font-bold text-stone-600">更新・発信（外部）</p>
            <div className="mt-3 flex flex-wrap gap-3">
              {noteUrl ? (
                <TrackedLink
                  href={noteUrl}
                  className="text-sm font-bold text-stone-800 underline decoration-stone-300 hover:decoration-stone-800"
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
                  className="text-sm font-bold text-stone-800 underline decoration-stone-300 hover:decoration-stone-800"
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
      <section className="ds-card ds-card-pad border-stone-200 bg-stone-50/60">
        <h2 className="ds-page-serif text-lg font-bold text-stone-900">このサイトについて</h2>
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
        <h2 className="text-sm font-bold text-stone-700">注意事項</h2>
        <ul className="mt-3 space-y-1.5 text-xs text-stone-500 leading-relaxed">
          <li>・本ツールは参考情報です。実際の返済条件は契約内容を優先してください。</li>
          <li>・表示は入力に基づく試算であり、将来の金利変動等は反映されません。</li>
        </ul>
      </section>
    </div>
  );
}
