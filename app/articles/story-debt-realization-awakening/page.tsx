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

const SLUG = "story-debt-realization-awakening" as const;
const metaArticle = getArticle(SLUG)!;

const BASE = getSiteBaseUrl();
const ARTICLE_URL = `${BASE}/articles/${SLUG}`;
const ARTICLE_TITLE = "借金に気づいたときの話｜明細を見て初めて分かった金額";
const publishedAt = metaArticle.publishedAt ?? "2025-01-01";
const modified = getArticleLastModifiedIso(metaArticle) ?? publishedAt;

export const metadata: Metadata = {
  title: ARTICLE_TITLE,
  description:
    "「借金がある」は分かっていても、総額は分かっていなかった。通帳と明細を並べて初めて重さを数字で認識した個人の記録。投資助言・借入勧誘ではありません。",
  alternates: { canonical: ARTICLE_URL },
  openGraph: {
    title: ARTICLE_TITLE,
    description:
      "別々の支払いが頭の中で分断されていた。引き落とし前に明細を並べ、逃げ場のなさを数字で知った日の話です。",
    url: ARTICLE_URL,
    type: "article",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: ARTICLE_TITLE,
  description:
    "借金の全体像を数字で初めて認識した個人の体験記。投資助言・借入勧誘ではありません。",
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
  { id: "slight-discomfort", label: "最初は「少し苦しい」くらいの感覚だった" },
  { id: "causes", label: "借金が増えた原因は、ひとつではなかった" },
  { id: "before-awareness", label: "気づく前は、全体を見ないまま回していた" },
  { id: "realization-day", label: "明細を並べた日に、ようやく現実が見えた" },
  { id: "no-escape", label: "いちばんきつかったのは、総額より「逃げ場のなさ」だった" },
  { id: "why-late", label: "なぜもっと早く気づけなかったのか" },
  { id: "first-steps", label: "そこから最初にやったこと" },
  { id: "turning-point", label: "今振り返ると、気づいた日は「終わり」ではなく「始まり」だった" },
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
          <h1 className="ds-page-serif mt-2 text-2xl font-bold text-stone-900 md:text-3xl">{ARTICLE_TITLE}</h1>

          <ArticleProse className="mt-6 space-y-10">
            <section id="intro" className="space-y-4">
              <p>
                「借金がある」とは、なんとなく分かっていました。
                でも、いくらあるのかを本当に分かっていたかというと、分かっていませんでした。
              </p>
              <p>
                カードの請求、キャッシング、投資で減った分を埋めるために使ったお金。
                それぞれは頭の中で別の箱に入っていて、私はずっと「今月を回せているなら、まだ何とかなる」と思っていました。
              </p>
              <p>
                実際に危機感が出たのは、ある月の引き落とし前に、通帳残高とカード明細をまとめて見たときです。
                そのとき初めて、自分が抱えている金額が、想像していたよりずっと重いことを理解しました。
              </p>
              <p>
                これは、借金に気づいた“瞬間”というより、見ないままにしていた現実を、数字でようやく認識したときの話です。
              </p>
            </section>

            <section id="notice" className="ds-subcard p-4 border-l-4 border-stone-400 not-prose">
              <h2 className="text-base font-semibold text-stone-900">この記事について</h2>
              <ul className="mt-2 list-disc pl-5 text-base text-stone-700 space-y-1">
                <li>個人の体験です。正解の手順や契約判断を示すものではありません。</li>
                <li>
                  <strong>投資助言・借入勧誘・法律・税務の判断はしません。</strong>
                </li>
                <li>手続き・条件は各金融機関・公的窓口の説明を優先してください。</li>
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
              <p>この体験から残ったのは、主に3つです。</p>
              <ul className="list-disc pl-5 space-y-2 text-stone-800">
                <li>借金は、1回で大きく増えるより、別々の支払いが積み重なって見えなくなることがある</li>
                <li>「毎月払えている」ことと、「全体を把握できている」ことは別だった</li>
                <li>苦しくなったあとに必要だったのは、気合いより先に、明細と残高を全部並べることだった</li>
              </ul>
              <p>
                この記事は、正解の手順を示すものではありません。
                ただ、私のように「なんとなく苦しい」のに全体が見えていない人には、ひとつの参考になるかもしれません。
              </p>
            </section>

            <section id="slight-discomfort">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">
                最初は「少し苦しい」くらいの感覚だった
              </h2>
              <p className="mt-3">
                借金に気づく前から、生活は少しずつ苦しくなっていました。
                でもその頃の感覚は、「もう終わりだ」というほどではありませんでした。
              </p>
              <ul className="mt-3 list-disc pl-5 space-y-2 text-stone-800">
                <li>カードの引き落としが少し重い</li>
                <li>ボーナスが入ったら調整できる気がする</li>
                <li>給料日が来ればいったん立て直せる</li>
                <li>今月だけしのげば、来月はもう少しましになるかもしれない</li>
              </ul>
              <p className="mt-3">そんなふうに考えていました。</p>
              <p className="mt-3">
                今思うと、その時点でかなり危ない見方でした。
                でも当時の私は、総額ではなく今月いくら出ていくかしか見ていませんでした。
              </p>
            </section>

            <section id="causes">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">借金が増えた原因は、ひとつではなかった</h2>
              <p className="mt-3">
                私の場合、借金が増えた理由はひとつではありませんでした。
              </p>
              <p className="mt-3">
                最初に大きかったのは、投資で減った分を取り返そうとして、手元資金を崩したことです。
                さらに、生活費やカード払いを補うために、キャッシングや
                <Link href="/articles/story-revolving-spiral" className="font-semibold text-emerald-900 underline">
                  リボ払い
                </Link>
                のような“その月をしのぐ手段”を使う場面が増えました。
              </p>
              <p className="mt-3">ここで厄介だったのは、それぞれが別の顔をしていたことです。</p>
              <ul className="mt-3 list-disc pl-5 space-y-2 text-stone-800">
                <li>投資の損失は「そのうち戻したいお金」</li>
                <li>カード払いは「買い物の支払い」</li>
                <li>キャッシングは「一時的な穴埋め」</li>
                <li>リボ払いは「今月の負担を軽くする手段」</li>
              </ul>
              <p className="mt-3">
                頭の中では別々に管理しているつもりでした。
                でも実際には、全部まとめて自分の返済負担になっていました。
              </p>
            </section>

            <section id="before-awareness">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">気づく前は、全体を見ないまま回していた</h2>
              <p className="mt-3">
                いちばんまずかったのは、全体を見ないまま生活を回していたことです。
              </p>
              <p className="mt-3">
                通帳は見る。
                <br />
                カードの請求額も見る。
                <br />
                でも、それは「今月落ちる金額」を確認しているだけでした。
              </p>
              <p className="mt-3">
                借入残高はいくらか。
                <br />
                手数料や利息を含めて、合計でいくら返すことになるのか。
                <br />
                複数の支払いを合わせたら毎月どれくらい出ていくのか。
              </p>
              <p className="mt-3">
                そのあたりを、私はちゃんと数字で並べていませんでした。
              </p>
              <p className="mt-3">
                当時の感覚としては、見ていないというより、見るのが怖かったのだと思います。
                なんとなく重いことは分かっている。
                でも、はっきりした数字を見たら、今までの「まだ何とかなる」が崩れる気がしていました。
              </p>
            </section>

            <section id="realization-day">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">明細を並べた日に、ようやく現実が見えた</h2>
              <p className="mt-3">
                はっきり意識したきっかけは、ある月の引き落とし前でした。
              </p>
              <p className="mt-3">
                口座残高が思ったより少なく、
                「このままだと足りないかもしれない」と感じて、カード明細と借入残高を一度まとめて確認しました。
              </p>
              <p className="mt-3">そのとき初めて、</p>
              <ul className="mt-2 list-disc pl-5 space-y-2 text-stone-800">
                <li>このカードでいくら残っているか</li>
                <li>キャッシング残高がどれくらいあるか</li>
                <li>リボ払いがどれだけ残っているか</li>
                <li>毎月の支払いがいくつ重なっているか</li>
              </ul>
              <p className="mt-3">を全部、同じ目線で見ることになりました。</p>
              <p className="mt-3">
                その瞬間の感覚は、「驚いた」というより、固まったに近かったです。
              </p>
              <p className="mt-3">
                薄々まずいとは思っていたのに、実際の合計を見ると、自分の中の想像を超えていました。
                そこでやっと、「苦しい」の正体が感情ではなく金額になりました。
              </p>
            </section>

            <section id="no-escape">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">
                いちばんきつかったのは、総額より“逃げ場のなさ”だった
              </h2>
              <p className="mt-3">
                金額を見た瞬間にショックはありました。
                でも、あとから振り返ると、本当にきつかったのは総額そのものより、逃げ場がない感じだったと思います。
              </p>
              <p className="mt-3">
                来月の給料だけでは埋まらない。
                <br />
                ボーナスが入っても、一気に軽くなるわけではない。
                <br />
                何かを少し節約したくらいで消える金額でもない。
              </p>
              <p className="mt-3">
                そう分かったときに、初めて「これは気分の問題ではなく、構造の問題なんだ」と思いました。
              </p>
              <p className="mt-3">
                それまでは、頑張ればどうにかなる気がしていました。
                でも数字を並べたあとは、頑張る方向を変えないと無理だと分かりました。
              </p>
            </section>

            <section id="why-late">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">なぜもっと早く気づけなかったのか</h2>
              <p className="mt-3">
                今なら、「もっと早く合計を見ればよかった」と思います。
                でも当時できなかったのにも理由がありました。
              </p>
              <p className="mt-3">
                ひとつは、借金が一気に増えた感じではなかったことです。
                少しずつ、別々の理由で膨らんだので、危機感が分散しました。
              </p>
              <p className="mt-3">
                もうひとつは、毎月どこかでは支払いができていたことです。
                払えているうちは、「まだ終わっていない」と思いやすいです。
              </p>
              <p className="mt-3">
                さらに、投資で減った分については、どこかで取り返せるかもしれないという感覚も残っていました。
                この希望が、現実の把握を遅らせました。
              </p>
              <p className="mt-3">
                要するに私は、
                <br />
                借金があることには気づいていたけれど、借金の重さには気づいていなかったのだと思います。
              </p>
            </section>

            <section id="first-steps">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">そこから最初にやったこと</h2>
              <p className="mt-3">
                借金の全体像が見えたあと、すぐに前向きになれたわけではありません。
                むしろ、最初はかなり動けませんでした。
              </p>
              <p className="mt-3">
                ただ、ひとつだけ変わったのは、
                「何となく不安」ではなく「何にいくらあるか」を見ようとしたことです。
              </p>
              <ul className="mt-3 list-disc pl-5 space-y-2 text-stone-800">
                <li>残高を分けて書く</li>
                <li>毎月の返済額を並べる</li>
                <li>利率や手数料を確認する</li>
                <li>生活費と返済を同じ表の上で見る</li>
              </ul>
              <p className="mt-3">
                この作業は気持ちのいいものではなかったですが、ここをやらないと何も始まらないと感じました。
              </p>
              <p className="mt-3">
                今思えば、再出発の最初の一歩は、反省より先に一覧化だったと思います。
              </p>
            </section>

            <section id="turning-point">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">
                今振り返ると、気づいた日は“終わり”ではなく“始まり”だった
              </h2>
              <p className="mt-3">
                その日、明細を見て金額を知ったときは、かなり落ち込みました。
                正直、もっと早く見ていればという後悔もありました。
              </p>
              <p className="mt-3">
                でも、今振り返ると、あの日は全部が終わった日ではなく、曖昧だったものがようやく始まった日だったと思っています。
              </p>
              <p className="mt-3">
                見えていない不安は大きくなりやすいです。
                逆に、見えてしまった現実はしんどいですが、少なくとも整理の入口には立てます。
              </p>
              <p className="mt-3">
                私はそこから、返済や生活費を数字で見るようになりました。
                まだ途中ですが、少なくとも今は「何が起きているか分からない苦しさ」からは少し離れています。
              </p>
            </section>

            <section id="for-readers">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">同じような状況の人へ</h2>
              <p className="mt-3">もし今、</p>
              <ul className="mt-2 list-disc pl-5 space-y-2 text-stone-800">
                <li>毎月なんとか払っている</li>
                <li>でも全体の残高ははっきり見ていない</li>
                <li>なんとなく苦しいが、正確には把握していない</li>
              </ul>
              <p className="mt-3">
                という状態なら、まずは一度、明細と残高を全部並べてみる方がいいと思います。
              </p>
              <p className="mt-3">
                見るのは怖いです。
                <br />
                私もそうでした。
              </p>
              <p className="mt-3">
                でも、見ないままの不安は長引きやすいです。
                数字にして初めて、相談するにも、返済計画を考えるにも、生活費を見直すにも、スタート地点ができます。
              </p>
            </section>

            <section id="simulator" className="rounded-xl border border-stone-200/80 bg-stone-50/80 p-5 not-prose">
              <h2 className="text-lg font-semibold text-stone-900">自分の条件で試算する</h2>
              <p className="mt-2 text-base text-stone-700 leading-relaxed">
                私がこのサイトで返済シミュレーターを置いているのは、「頑張れば何とかなる」という話をしたいからではありません。
                借入額、金利、返済額を数字にすると、ようやく判断の材料がそろうからです。
              </p>
              <p className="mt-3 text-base text-stone-700 leading-relaxed">
                明細を見て重さに気づいたあと、次に必要になるのは、
                「この条件だと月々いくらか」「総額はいくらになるか」「完済までどれくらいか」を整理することでした。
              </p>
              <p className="mt-3 text-base text-stone-700 leading-relaxed">
                感情だけではなく、数字でも状況を見たいときは、返済シミュレーターを使ってみてください。
                ページ末尾にも、同じシミュレーターと相談先一覧への導線を置いています。
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
                借入や返済の判断は、契約内容や状況によって変わります。
                つらいときは、一人で抱え込まず、公的な相談窓口や専門家の情報も確認してください。
              </p>
              <p className="mt-3">
                <Link href="/resources/consultation-guide" className="font-semibold text-emerald-900 underline">
                  相談先・公的支援の一覧
                </Link>
                を先に開いておくと整理しやすいです。
                ページ末尾の「参考・相談先（公的情報）」には、金融庁・日本貸金業協会・法テラス・日本クレジットカウンセリング協会などへの案内もあります。
              </p>
            </section>

            <section id="editor-memo">
              <ArticleEditorMemo
                purpose="「なんとなく苦しい」のに全体が見えない方の、判断材料のひとつになれば幸いです。"
                reasonAxis="借金の“有無”ではなく、明細と残高で重さを数字として初めて認識した瞬間に焦点を当てています。"
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
