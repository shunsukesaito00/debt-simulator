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

const SLUG = "story-family-confession" as const;
const metaArticle = getArticle(SLUG)!;

const BASE = getSiteBaseUrl();
const ARTICLE_URL = `${BASE}/articles/${SLUG}`;
const ARTICLE_TITLE = "家族に借金を打ち明けられなかった理由と、打ち明けて気づいたこと";
const publishedAt = metaArticle.publishedAt ?? "2025-01-01";
const modified = getArticleLastModifiedIso(metaArticle) ?? publishedAt;

export const metadata: Metadata = {
  title: ARTICLE_TITLE,
  description:
    "離婚や失望が怖くて借金を隠していた。打ち明けて分かったのは、言わないほど事態と関係への負担が重くなることでした。個人の体験記です。",
  alternates: { canonical: ARTICLE_URL },
  openGraph: {
    title: ARTICLE_TITLE,
    description:
      "自己防衛で黙っていたことが状況を悪化させた。家族に打ち明けたあとに残った後悔と、現実を共有して前に進む話です。",
    url: ARTICLE_URL,
    type: "article",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: ARTICLE_TITLE,
  description:
    "借金を家族に打ち明けられなかった理由と、打ち明けたあとに気づいたことの個人記録。投資助言・借入勧誘ではありません。",
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
  { id: "reasons", label: "家族に借金を打ち明けられなかった理由" },
  { id: "self-defense", label: "打ち明けなかったのは、相手のためではなく自分のためだった" },
  { id: "after-confession", label: "打ち明けたときに気づいたこと" },
  { id: "hiding-worsens", label: "言わない判断が、事態を悪くした" },
  { id: "not-easy", label: "打ち明けることは、楽になることではなかった" },
  { id: "for-readers", label: "同じ状況の人へ伝えたいこと" },
  { id: "closing", label: "最後に" },
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
                借金があることを、家族に打ち明けるのは本当に怖かったです。
              </p>
              <p>
                返済そのものも苦しかったですが、それ以上に怖かったのは、打ち明けた瞬間に人間関係が壊れるかもしれないということでした。
              </p>
              <p>
                私は、借金のことを長く隠していました。
                <br />
                「今はまだ言わなくていい」
                <br />
                「もう少し自分で何とかしてから言おう」
                <br />
                「これ以上悪くならなければ、話さずに済むかもしれない」
                <br />
                そんなふうに考えていました。
              </p>
              <p>
                でも今振り返ると、その判断は自分を守るためのものに見えて、実際には事態をもっと悪い方向に進める判断でした。
              </p>
              <p>
                この記事では、私がなぜ家族に借金を打ち明けられなかったのか、そして実際に打ち明けたときに何に気づいたのかを書きます。
              </p>
            </section>

            <section id="notice" className="ds-subcard p-4 border-l-4 border-stone-400 not-prose">
              <h2 className="text-base font-semibold text-stone-900">この記事について</h2>
              <ul className="mt-2 list-disc pl-5 text-base text-stone-700 space-y-1">
                <li>個人の体験です。家族関係や相談の「正解」を示すものではありません。</li>
                <li>
                  <strong>投資助言・借入勧誘・法律相談ではありません。</strong>
                </li>
                <li>つらいときは一人で抱え込まず、公的相談窓口の利用も検討してください。</li>
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

            <section id="reasons">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">家族に借金を打ち明けられなかった理由</h2>
              <p className="mt-3">
                いちばん大きかったのは、妻から離婚されるのが怖かったことです。
              </p>
              <p className="mt-3">
                借金の金額そのものももちろん重かったですが、それ以上に、自分が隠していたこと、信用を失うこと、その結果として「一緒にはやっていけない」と言われることが怖かったです。
              </p>
              <p className="mt-3">
                借金があることだけでも十分つらいのに、そこに「家庭まで失うかもしれない」という恐怖が重なると、頭の中では“言わない方がまだ安全”という判断になっていきました。
              </p>
              <p className="mt-3">
                もうひとつは、家族から落胆されるのが怖かったことです。
              </p>
              <p className="mt-3">
                親や身近な家族に対して、自分はもっとちゃんとしていると思われたい気持ちがありました。
                少なくとも、お金のことでここまで崩れている姿は見せたくありませんでした。
              </p>
              <p className="mt-3">
                「なんでそんなことをしたのか」
                <br />
                「どうしてもっと早く相談しなかったのか」
                <br />
                そう思われるのが怖かったですし、実際に口に出されなくても、失望された空気を感じるのが怖かったです。
              </p>
              <p className="mt-3">
                だから私は、借金のことを隠したまま、自分だけで何とかしようとしました。
              </p>
            </section>

            <section id="self-defense">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">
                打ち明けなかったのは、相手のためではなく自分のためだった
              </h2>
              <p className="mt-3">
                当時の自分は、どこかで「言わないのは家族に心配をかけないためだ」と思いたかったです。
              </p>
              <p className="mt-3">
                でも今ならはっきり分かります。
                あれは家族のためというより、自分が責められたくない、自分が見捨てられたくない、自分が失望されたくない、という自己防衛でした。
              </p>
              <p className="mt-3">
                もちろん、その気持ち自体は自然なものだと思います。
                借金を抱えているとき、人に知られるのは本当に苦しいです。
                ただ、その自己防衛の判断が、結果として状況をさらに悪くしました。
              </p>
              <p className="mt-3">
                言わないまま時間が過ぎると、借金は減るどころか、むしろ増えていきました。
                返済に追われるなかで、生活費や他の支払いとのバランスも崩れ、問題は「自分ひとりが苦しい」で済む規模ではなくなっていきました。
              </p>
            </section>

            <section id="after-confession">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">打ち明けたときに気づいたこと</h2>
              <p className="mt-3">
                実際に家族に打ち明けたとき、強く感じたことがあります。
              </p>
              <p className="mt-3">
                それは、もう少し早く打ち明けていれば、もっとマシな状況だったということです。
              </p>
              <p className="mt-3">
                もちろん、早く言ったからといって、借金が消えるわけではありません。
                怒られない保証もありません。
                傷つかないわけでもありません。
              </p>
              <p className="mt-3">
                でも、少なくとも、ここまで膨らむ前に状況を共有できていれば、
              </p>
              <ul className="mt-2 list-disc pl-5 space-y-2 text-stone-800">
                <li>借金の総額はもっと小さかったかもしれない</li>
                <li>返済方法の選択肢ももう少しあったかもしれない</li>
                <li>生活全体への影響も今より小さくできたかもしれない</li>
                <li>周りの人にまで重い負担をかける額にはならなかったかもしれない</li>
              </ul>
              <p className="mt-3">そう思いました。</p>
              <p className="mt-3">
                打ち明けた瞬間は、やはり怖かったです。
                でも、それ以上に後から重く残ったのは、なぜもっと早く言わなかったのかという後悔でした。
              </p>
            </section>

            <section id="hiding-worsens">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">言わない判断が、事態を悪くした</h2>
              <p className="mt-3">
                借金を隠していた間、私は「今はまだ大丈夫」「次で立て直せる」「もう少ししたら落ち着く」と考えていました。
              </p>
              <p className="mt-3">
                でも現実には、その“もう少し”の間に状況は悪化していました。
              </p>
              <p className="mt-3">
                言わないことで問題が止まるわけではありません。
                むしろ、見えないところで進行していきます。
              </p>
              <p className="mt-3">
                しかも厄介なのは、隠している間は、自分の中で状況を小さく見積もりやすいことです。
                誰にも言わないと、現実を他人の視点で見直す機会がありません。
                その結果、判断がどんどん内向きになり、「まだ言わなくていい理由」を自分で作り続けてしまいます。
              </p>
              <p className="mt-3">
                私もそうでした。
              </p>
              <p className="mt-3">
                本当は早い段階で共有して、生活全体の問題として見直すべきだったのに、自己防衛で黙っていたことで、結果的に周りの人にまで影響を与える額になってしまっていました。
              </p>
              <p className="mt-3">
                これはかなり重い後悔です。
              </p>
            </section>

            <section id="not-easy">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">
                打ち明けることは、楽になることではなかった
              </h2>
              <p className="mt-3">
                正直に言うと、打ち明けたからすぐに楽になったわけではありません。
              </p>
              <p className="mt-3">
                恥ずかしさもありました。
                申し訳なさもありました。
                相手の反応を見るのもつらかったです。
              </p>
              <p className="mt-3">
                ただ、それでもひとつだけはっきりしているのは、隠し続けるよりは前に進めたということです。
              </p>
              <p className="mt-3">
                隠している間は、問題はずっと曖昧なままでした。
                でも打ち明けると、少なくとも「何が起きているか」が共有されます。
                そこから初めて、返済のこと、生活のこと、今後どうするかを現実として考えられるようになります。
              </p>
              <p className="mt-3">
                つまり、打ち明けることは気持ちよくなるためではなく、現実を動かし始めるために必要な行動だったのだと思います。
              </p>
            </section>

            <section id="for-readers">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">同じ状況の人へ伝えたいこと</h2>
              <p className="mt-3">
                もし今、
              </p>
              <ul className="mt-2 list-disc pl-5 space-y-2 text-stone-800">
                <li>借金を家族に言えていない</li>
                <li>妻や夫に知られたら関係が壊れるのが怖い</li>
                <li>親に失望されるのが怖い</li>
                <li>まだ自分で何とかできるかもしれないと思っている</li>
              </ul>
              <p className="mt-3">
                という状況にいるなら、この記事を読んで少しだけ立ち止まってほしいです。
              </p>
              <p className="mt-3">
                私が今いちばん強く思うのは、もっと早く打ち明けるべきだったということです。
              </p>
              <p className="mt-3">
                怖いのは当然です。
                言いにくいのも当然です。
                できれば言わずに済ませたいと思うのも自然です。
              </p>
              <p className="mt-3">
                でも、言わずにいることで事態がよくなることは、少なくとも私にはありませんでした。
                むしろ、時間がたつほど、金額も、関係へのダメージも、重くなっていきました。
              </p>
              <p className="mt-3">
                だからこそ、同じような状況の人がいるなら、完璧に整理できていなくてもいいので、少しでも早く打ち明けた方がいいと思います。
              </p>
              <p className="mt-3">
                それは楽をするためではありません。
                これ以上悪くしないためです。
              </p>
            </section>

            <section id="closing">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">最後に</h2>
              <p className="mt-3">
                借金を打ち明けるのは、本当に勇気がいります。
                私もずっと避けていました。
              </p>
              <p className="mt-3">
                でも今振り返ると、いちばん苦しかったのは借金の金額そのものだけではなく、黙っていることで問題を膨らませ、自分の大切な人たちまで巻き込む形にしてしまったことでした。
              </p>
              <p className="mt-3">
                借金は、お金の問題であると同時に、信頼の問題にもなります。
                だからこそ、隠したまま一人で抱え込むほど、後で失うものが大きくなりやすいです。
              </p>
              <p className="mt-3">
                この記事が、同じように言い出せずにいる人にとって、少しでも早く現実に向き合うきっかけになればと思います。
              </p>
            </section>

            <section id="simulator" className="rounded-xl border border-stone-200/80 bg-stone-50/80 p-5 not-prose">
              <h2 className="text-lg font-semibold text-stone-900">自分の条件で試算する</h2>
              <p className="mt-2 text-base text-stone-700 leading-relaxed">
                状況を共有したあと、返済額や総支払額を数字で整理したいときは、借入返済シミュレーターが役立ちます。
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
                借入・家族・生活の判断は状況によります。一人で抱え込まず、
                <Link href="/resources/consultation-guide" className="font-semibold text-emerald-900 underline">
                  相談先・公的支援の一覧
                </Link>
                もあわせて確認してください。
              </p>
            </section>

            <section id="editor-memo">
              <ArticleEditorMemo
                purpose="言えずにいる方の、判断材料のひとつになれば幸いです。"
                reasonAxis="打ち明けの恐怖と、隠すことで膨らむ現実の両方に触れています。"
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
