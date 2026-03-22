import type { Metadata } from "next";
import Link from "next/link";
import { ArticleFooter } from "@/app/components/ArticleFooter";
import { ArticleEditorMemo, ArticleFurtherReading, ArticleProse } from "@/app/components/article";
import { ArticlePageShell } from "@/app/components/ArticlePageShell";
import { getArticleBreadcrumbJsonLd } from "@/lib/article-structured-data";
import { ARTICLE_AUTHOR_JSON_LD, ARTICLE_PUBLISHER_JSON_LD } from "@/lib/site-author";
import { getArticle, getArticleLastModifiedIso, CATEGORY_LABELS } from "@/lib/articles";
import { getSiteBaseUrl } from "@/lib/site-config";
import { TrackedLink } from "@/app/components/TrackedLink";

const SLUG = "story-revolving-spiral" as const;
const metaArticle = getArticle(SLUG)!;

const BASE = getSiteBaseUrl();
const ARTICLE_URL = `${BASE}/articles/${SLUG}`;
const ARTICLE_TITLE = "リボ払いが膨らんだ経緯｜最低返済だけで積み上がる怖さ";
const publishedAt = metaArticle.publishedAt ?? "2025-01-01";
const modified = getArticleLastModifiedIso(metaArticle) ?? publishedAt;

export const metadata: Metadata = {
  title: ARTICLE_TITLE,
  description:
    "最低返済だけで回していたら、返しているのに残高が減らない感覚があった。リボ払いをどう使い始め、なぜ膨らませてしまったかの個人の記録。契約は各社の説明を優先してください。",
  alternates: { canonical: ARTICLE_URL },
  openGraph: {
    title: ARTICLE_TITLE,
    description:
      "最低返済の「楽さ」が見せない総額の重さ。明細と生活の支出が重なったときの体験と、数字で整理し直した話です。",
    url: ARTICLE_URL,
    type: "article",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: ARTICLE_TITLE,
  description:
    "リボ払いで最低返済だけを続け、利息が積み上がった個人の体験記。投資助言・借入勧誘ではありません。",
  url: ARTICLE_URL,
  datePublished: publishedAt,
  dateModified: modified,
  author: ARTICLE_AUTHOR_JSON_LD,
  publisher: ARTICLE_PUBLISHER_JSON_LD,
};

const breadcrumbJsonLd = getArticleBreadcrumbJsonLd(ARTICLE_URL, ARTICLE_TITLE);

const tocItems = [
  { id: "intro", label: "導入" },
  { id: "notice", label: "この記事について" },
  { id: "message", label: "この記事で伝えたいこと" },
  { id: "start-feeling", label: "リボ払いを使い始めたときの感覚" },
  { id: "minimum-only", label: "最低返済だけで済ませていた時期" },
  { id: "not-shrinking", label: "返しているのに減らないと感じた瞬間" },
  { id: "statement-blind", label: "明細を見ても重さが分かっていなかった" },
  { id: "expenses-piled", label: "支出が重なってリボが膨らんだ" },
  { id: "looking-back", label: "今振り返ると何が危なかったか" },
  { id: "numbers", label: "数字で整理すると見え方が変わった" },
  { id: "for-readers", label: "同じような状況の人へ" },
  { id: "simulator", label: "自分の条件で試算する" },
  { id: "resources", label: "参考・相談先" },
  { id: "editor-memo", label: "編集メモ" },
];

export default function Page() {
  const article = getArticle(SLUG);
  const furtherReadingItems =
    article?.relatedLinks?.map((l) => ({ href: l.href, label: l.label })) ?? [];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <ArticlePageShell currentPageTitle={ARTICLE_TITLE} publishedAt={publishedAt} category={metaArticle.category}>
        <div className="ds-card ds-card-pad">
          <p className="text-xs font-semibold text-stone-500">{CATEGORY_LABELS[metaArticle.category]}</p>
          <h1 className="ds-page-serif mt-2 text-2xl font-bold text-stone-900 md:text-3xl">
            リボ払いが膨らんだ経緯｜最低返済だけで積み上がる怖さ
          </h1>

          <ArticleProse className="mt-6 space-y-10">
            <section id="intro" className="space-y-4">
              <p>
                リボ払いを使っていた頃、私は「毎月ちゃんと払っているから、まだ大丈夫だ」と思っていました。
              </p>
              <p>
                実際には、払っていたのは主に“今月をやり過ごすための金額”で、残高そのものは思ったほど減っていませんでした。
                そのことをちゃんと理解しないまま、最低返済だけで回し続けて、気づいたときには総額がかなり重くなっていました。
              </p>
              <p>
                この記事は、私がリボ払いをどう使い始めて、なぜ膨らませてしまったのか、その流れを振り返って整理した記録です。
                誰にでも当てはまる正解ではありませんが、「返しているのに減らない感覚」がある人の参考にはなるかもしれません。
              </p>
            </section>

            <section id="notice" className="ds-subcard p-4 border-l-4 border-stone-400 not-prose">
              <h2 className="text-base font-semibold text-stone-900">この記事について</h2>
              <ul className="mt-2 list-disc pl-5 text-base text-stone-700 space-y-1">
                <li>個人の体験です。契約条件・手数料の計算はカード会社の説明を優先してください。</li>
                <li>
                  <strong>投資助言・借入勧誘・法律・税務の判断はしません。</strong>
                </li>
                <li>金額や期間の感覚は記憶に基づくものです。</li>
              </ul>
            </section>

            {furtherReadingItems.length > 0 ? (
              <div className="not-prose">
                <ArticleFurtherReading items={furtherReadingItems} />
              </div>
            ) : null}

            <section className="ds-subcard p-4 not-prose">
              <h2 className="text-base font-semibold text-stone-900">目次</h2>
              <ul className="mt-2 space-y-1.5 text-base leading-relaxed">
                {tocItems.map((item) => (
                  <li key={item.id}>
                    <a href={`#${item.id}`} className="text-stone-700 hover:underline">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </section>

            <section id="message" className="space-y-4">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">この記事で伝えたいこと</h2>
              <p>この体験から残ったことは、主に3つあります。</p>
              <ul className="list-disc pl-5 space-y-2 text-stone-800">
                <li>最低返済は、その月をしのぎやすく見えるぶん、全体の重さを見えにくくすること</li>
                <li>返済しているつもりでも、元金があまり減っていないことがあること</li>
                <li>苦しくなる前に見るべきなのは「今月いくら払えるか」だけでなく、「総額」と「完済までの時間」だったこと</li>
              </ul>
            </section>

            <section id="start-feeling">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">リボ払いを使い始めたときの感覚</h2>
              <p className="mt-3">
                最初から「危ないものを使っている」という感覚は強くありませんでした。
                むしろ、毎月の支払いを均してくれる便利な仕組みのように見えていました。
              </p>
              <p className="mt-3">
                一括で払うのが少しきつい月でも、毎月の支払い額がある程度そろって見えるので、家計が急に崩れないような安心感がありました。
                当時の私は、その“安心感”の方を先に受け取ってしまっていたと思います。
              </p>
            </section>

            <section id="minimum-only">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">最低返済だけで済ませていた時期</h2>
              <p className="mt-3">
                使い始めてからしばらくは、毎月の請求額だけを見ていました。
                「今月もこの額なら払える」と思えることが、当時はかなり大きかったです。
              </p>
              <p className="mt-3">
                問題は、その見方だと“今月の負担”しか見えていないことでした。
                最低返済だけで回していると、その月はしのげても、残高全体や手数料の重さが頭に入りにくくなります。
              </p>
              <p className="mt-3">
                当時の私は、まさにその状態でした。
                払っているから問題は進んでいる、少しずつでも減っているはずだ、という感覚でいました。
              </p>
            </section>

            <section id="not-shrinking">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">返しているのに減らないと感じた瞬間</h2>
              <p className="mt-3">
                違和感が出たのは、しばらく返済しているはずなのに、思ったほど残高が減っていないと感じたときです。
              </p>
              <p className="mt-3">
                「毎月払っているのに、なぜまだこんなに残っているんだろう」
                <br />
                そう思って明細を見るようになりましたが、その時点でも私は、元金と手数料の関係を十分に理解できていませんでした。
              </p>
              <p className="mt-3">
                返済している実感はある。
                <br />
                でも全体は軽くなっていない。
                <br />
                このズレが、あとから振り返るとかなり危なかったです。
              </p>
            </section>

            <section id="statement-blind">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">明細を見ても重さが分かっていなかった</h2>
              <p className="mt-3">
                当時の私は、明細を見れば状況を把握できているつもりでした。
                でも実際には、見ていたのは主に請求額で、総額や完済までの長さをちゃんと見ていませんでした。
              </p>
              <p className="mt-3">
                言い換えると、私は「払えるかどうか」は見ていたけれど、「いつ終わるのか」「全部でいくら払うのか」を見ていませんでした。
              </p>
              <p className="mt-3">
                この見方だと、月々の額が低い限り、危機感が遅れます。
                リボ払いの怖さは、支払いがゼロになることではなく、負担の重さが分かりにくいまま長引きやすいことだと今は感じています。
              </p>
            </section>

            <section id="expenses-piled">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">支出が重なってリボが膨らんだ</h2>
              <p className="mt-3">
                さらに苦しくなったのは、他の支出が重なったときでした。
              </p>
              <p className="mt-3">
                生活費、急な出費、タイミングの悪い支払い。
                そういうものが重なると、「今月だけは少し楽にしたい」という気持ちが強くなります。
                そのときに最低返済という仕組みがあると、目の前の苦しさを少し先へ送れてしまいます。
              </p>
              <p className="mt-3">
                当時の私は、その“少し先送りできる感じ”に助けられているつもりでした。
                でも実際には、負担そのものが消えたわけではなく、見えにくい形で積み上がっていました。
              </p>
            </section>

            <section id="looking-back">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">今振り返ると何が危なかったか</h2>
              <p className="mt-3">
                今振り返っていちばん危なかったのは、リボ払いそのものより、私の見方でした。
              </p>
              <ul className="mt-3 list-disc pl-5 space-y-2 text-stone-800">
                <li>月々の支払い額だけを見ていたこと</li>
                <li>総額と完済時期を見ていなかったこと</li>
                <li>「今月を乗り切る」を何度も繰り返したこと</li>
                <li>払っているから進んでいると思っていたこと</li>
              </ul>
              <p className="mt-3">
                このあたりが重なると、家計の苦しさが表に出る頃には、すでに調整しづらい状態になりやすいです。
              </p>
            </section>

            <section id="numbers">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">数字で整理すると見え方が変わった</h2>
              <p className="mt-3">
                あとになって感じたのは、感情だけで考えていると「何となく大変」という状態から抜けにくいことでした。
              </p>
              <p className="mt-3">
                一方で、借入額、金利、毎月の返済額、完済までの年数、総支払額を数字にすると、ようやく状況の輪郭が見えてきます。
                当時の私に足りなかったのは、頑張りや根性より、先に数字を並べて見ることだったと思います。
              </p>
              <p className="mt-3">
                このサイトで返済シミュレーターや関連記事を置いているのも、そのためです。
                安心させるためではなく、まず「見え方をはっきりさせる」ためにあります。
              </p>
            </section>

            <section id="for-readers">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">同じような状況の人へ</h2>
              <p className="mt-3">
                もし今、リボ払いを使っていて、
              </p>
              <ul className="mt-2 list-disc pl-5 space-y-2 text-stone-800">
                <li>毎月払っているのに減っている感じがしない</li>
                <li>明細は見ているけれど、全体の重さが分からない</li>
                <li>目の前の支払いをしのぐので精一杯</li>
              </ul>
              <p className="mt-3">
                という状態なら、まずは自分を責める前に、条件を数字で見直した方がいいと思います。
              </p>
              <p className="mt-3">
                気合いで解決するというより、見えにくいものを見えるようにする方が先です。
              </p>
            </section>

            <section id="simulator" className="rounded-xl border border-stone-200/80 bg-stone-50/80 p-5 not-prose">
              <h2 className="text-lg font-semibold text-stone-900">自分の条件で試算する</h2>
              <p className="mt-2 text-base text-stone-700 leading-relaxed">
                借入額・金利・返済額を入れて、月々の負担や総支払額を見直したい場合は、返済シミュレーターを使うと整理しやすいです。
              </p>
              <p className="mt-3 text-base text-stone-700 leading-relaxed">
                また、
                <Link href="/articles/revo-100-interest" className="font-semibold text-stone-900 underline underline-offset-2 hover:text-emerald-900">
                  リボ払い100万円の利息
                </Link>
                の記事のように、返済額の差で総額がどう変わるかを見ると、最低返済のまま進めた場合の重さもイメージしやすくなります。
              </p>
              <TrackedLink
                href="/simulator/cardloan"
                className="ds-btn ds-btn-primary mt-4 inline-flex"
                event={{
                  action: "click_article_simulator_cta",
                  location: "article_body",
                  target: "/simulator/cardloan",
                  link_type: "simulator_cta",
                  source_article_slug: SLUG,
                }}
              >
                借入返済シミュレーターで試す →
              </TrackedLink>
            </section>

            <section id="resources" className="space-y-3">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">参考・相談先</h2>
              <p className="mt-3">
                借入・返済・生活の判断は、公的な相談窓口や公的資料もあわせて確認してください。
                この記事はあくまで個人の体験整理であり、契約判断や法的判断の代わりにはなりません。
              </p>
              <p className="mt-3">
                金融庁・日本貸金業協会・法テラス・日本クレジットカウンセリング協会などの案内は、
                <Link href="/resources/consultation-guide" className="font-semibold text-emerald-900 underline">
                  相談先・公的支援の一覧
                </Link>
                にまとめています。ページ末尾にも同じ内容を載せています。
              </p>
            </section>

            <section id="editor-memo">
              <ArticleEditorMemo
                purpose="「返しているのに減らない」感覚に近い方の、判断材料のひとつになれば幸いです。"
                reasonAxis="最低返済の心理的な楽さと、総額・完済時期の見落としに焦点を当てています。"
                memo="気づきがあれば内容を更新していきます。"
              />
            </section>
          </ArticleProse>

          <ArticleFooter articleSlug={SLUG} showCta={false} />
        </div>
      </ArticlePageShell>
    </>
  );
}
