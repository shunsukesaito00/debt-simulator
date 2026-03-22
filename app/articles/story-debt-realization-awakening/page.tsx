import type { Metadata } from "next";
import Link from "next/link";
import { ArticleFooter } from "@/app/components/ArticleFooter";
import { ArticleFurtherReading, ArticleProse } from "@/app/components/article";
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
const ARTICLE_TITLE = "後から冷静に考えて初めて実感した借金額の大きさ｜一覧にして分かった重さ";
const publishedAt = metaArticle.publishedAt ?? "2025-01-01";
const modified = getArticleLastModifiedIso(metaArticle) ?? publishedAt;

export const metadata: Metadata = {
  title: ARTICLE_TITLE,
  description:
    "借金があることは分かっていても、総額の重さはその場では実感できなかった。引き落としと明細に追われる日々のあと、一覧にして初めて輪郭が見えた個人の体験記。投資助言・借入勧誘ではありません。",
  alternates: { canonical: ARTICLE_URL },
  openGraph: {
    title: ARTICLE_TITLE,
    description:
      "目の前の資金繰りに頭がいっぱいで全体が見えなかった。後から冷静に並べたとき、初めて借金額の大きさが現実としてのしかかってきた話です。",
    url: ARTICLE_URL,
    type: "article",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: ARTICLE_TITLE,
  description:
    "借金の総額を後から一覧化して初めて実感した個人の体験記。投資助言・借入勧誘ではありません。",
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
  { id: "tunnel-vision", label: "そのときは、数字より「今月を回すこと」しか見えていなかった" },
  { id: "avoidance", label: "その場では、借金の大きさを直視できていなかった" },
  { id: "after-list", label: "後から一覧にして、初めて重さが分かった" },
  { id: "why-not-then", label: "なぜその場で実感できなかったのか" },
  { id: "time-not-amount", label: "いちばんきつかったのは、額そのものより時間の長さだった" },
  { id: "regret-earlier", label: "もっと早く全体を見ていれば、と思った" },
  { id: "now-numbers", label: "今は、感覚ではなく数字で見るようにしている" },
  { id: "for-readers", label: "同じような状況の人へ" },
  { id: "simulator", label: "自分の条件で試算する" },
  { id: "resources", label: "参考・相談先" },
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
                借金があること自体は、当時の自分も分かっていました。カードの請求もある。キャッシング残高もある。株式投資やFXで減らした分を埋めようとして、生活のお金まで崩れている感覚もある。だから、「まずい状態に入っている」という自覚はありました。
              </p>
              <p>
                でも、その<strong>重さを本当に実感していたか</strong>というと、していなかったと思います。
              </p>
              <p>
                当時の自分は、毎月の支払いと、その場その場の資金繰りに頭がいっぱいで、全体をちゃんと見ていませんでした。今月の引き落としをどうするか。給料日までどうつなぐか。このカードの支払いは何とかなるか。そういう目の前のことばかり考えていて、借金全体がどれだけ大きくなっているかを、冷静に受け止める余裕がありませんでした。
              </p>
              <p>
                本当に「重い」と実感したのは、その最中ではなく、<strong>後から冷静に並べて見たとき</strong>でした。
              </p>
              <p>
                この記事は「いつ借金があると気づいたか」ではなく、<strong>後から整理して、初めて借金額の大きさを実感した</strong>という話です。
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

            <section id="tunnel-vision" className="space-y-4">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">
                そのときは、数字より「今月を回すこと」しか見えていなかった
              </h2>
              <p>
                借金が増えていた頃は、毎日何かしらの支払いのことを考えていました。
              </p>
              <ul className="list-disc pl-5 space-y-2 text-stone-800">
                <li>今月のカード請求はいくらか</li>
                <li>引き落とし日までに口座へいくら残しておく必要があるか</li>
                <li>生活費をどこまで削れば足りるか</li>
                <li>次の給料日まで何とか持つか</li>
              </ul>
              <p>
                こういうことばかり考えていたので、頭の中では借金がひとつの大きな塊ではなく、細かい支払いの集まりになっていました。
              </p>
              <p>
                カードの残高。キャッシング。
                <Link href="/articles/story-revolving-spiral" className="font-semibold text-emerald-900 underline">
                  リボ払い
                </Link>
                。生活費の不足。投資で減った資金。本当は全部つながっていたのに、そのときの自分は、別々の問題として処理していました。
              </p>
              <p>
                だから「かなり危ない」とは思っていても、「全部合わせるとどれくらいなのか」「このままだと生活全体にどれだけ影響するのか」というところまでは、ちゃんと見ていませんでした。
              </p>
            </section>

            <section id="avoidance" className="space-y-4">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">
                その場では、借金の大きさを直視できていなかった
              </h2>
              <p>
                今振り返ると、当時の自分は借金を直視していなかったのだと思います。見ていなかった、というより、正確に見たくなかったに近いです。
              </p>
              <p>
                金額をはっきり出したら、もう「まだ何とかなる」と思えなくなる。支払いをひとつずつ見ているうちは動けるけれど、総額で見たら気持ちが止まりそうだった。そういう逃げの感覚が、かなりありました。
              </p>
              <p>
                だから、明細は見ても、都合の悪いところは頭の中で少しぼかしていました。残高を見ても、「今月を越えれば少し整理できるかもしれない」と考えていました。危機感はあるのに、現実の輪郭だけははっきりさせない。そんな状態だったと思います。
              </p>
            </section>

            <section id="after-list" className="space-y-4">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">後から一覧にして、初めて重さが分かった</h2>
              <p>
                あとになって、借入や支払いをまとめて整理したとき、初めて自分の中で感覚が変わりました。
              </p>
              <ul className="list-disc pl-5 space-y-2 text-stone-800">
                <li>どこからいくら借りているのか</li>
                <li>毎月いくら返しているのか</li>
                <li>利息や手数料を含めるとどれくらいになるのか</li>
                <li>生活費と返済を合わせると、毎月どれだけ出ていくのか</li>
              </ul>
              <p>
                こうして並べてみると、それまで「何となく苦しい」だったものが、はっきりした形になりました。
              </p>
              <p>
                そのときの感覚は、驚きというより、静かに重さがのしかかってくる感じでした。
              </p>
              <p>
                借金があるのは知っていた。苦しいのも知っていた。でも、それが生活を建て直すにはかなり時間がかかる大きさだと、そこでようやく現実として入ってきました。
              </p>
              <p>
                つまり、借金に気づいていなかったわけではありません。<strong>借金額の大きさを、本当の意味で実感していなかった</strong>のだと思います。
              </p>
            </section>

            <section id="why-not-then" className="space-y-4">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">なぜその場で実感できなかったのか</h2>
              <p>
                今なら、その理由も少し分かります。
              </p>
              <p>
                ひとつは、借金が一度にできたわけではなかったことです。少しずつ増えていったので、危機感も少しずつしか上がりませんでした。
              </p>
              <p>
                もうひとつは、毎月どこかでは払えていたことです。ギリギリでも引き落としが通ると、その瞬間だけは「まだ終わっていない」と感じてしまいます。
              </p>
              <p>
                さらに、自分の中にはずっと「どこかで立て直せるかもしれない」「一度整えれば流れを戻せるかもしれない」という期待も残っていました。この期待があるうちは、数字を冷静に見るより先に、希望の方に寄ってしまいます。
              </p>
              <p>
                でも現実には、希望だけで借金は軽くなりませんでした。後から振り返って初めて、あの頃の自分は金額そのものより<strong>「今月をやり過ごすこと」に支配されていた</strong>のだと分かりました。
              </p>
            </section>

            <section id="time-not-amount" className="space-y-4">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">
                いちばんきつかったのは、額そのものより時間の長さだった
              </h2>
              <p>
                借金額を整理してみて、つらかったのは金額だけではありませんでした。むしろ重かったのは、これを返していくにはかなり長い時間がかかると分かったことでした。
              </p>
              <p>
                大きい金額そのものも苦しいです。でも、現実にはそれを一度に返すことはできません。そうすると問題は、
              </p>
              <ul className="list-disc pl-5 space-y-2 text-stone-800">
                <li>何か月、何年かかるのか</li>
                <li>その間、生活をどう維持するのか</li>
                <li>何を諦めて、何を守るのか</li>
              </ul>
              <p>
                という話になります。
              </p>
              <p>
                当時の自分は、借金を「今つらい問題」として見ていました。でも冷静に整理したとき、それは「しばらく生活全体に影響し続ける問題」だと分かりました。この気づきはかなり重かったです。
              </p>
            </section>

            <section id="regret-earlier" className="space-y-4">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">もっと早く全体を見ていれば、と思った</h2>
              <p>
                後から整理していちばん強く残ったのは、もっと早く全部を並べて見ていればよかったということでした。
              </p>
              <p>
                もちろん、早く見たからといって借金が消えるわけではありません。でも、少なくとも
              </p>
              <ul className="list-disc pl-5 space-y-2 text-stone-800">
                <li>現実逃避の時間は短くできたかもしれない</li>
                <li>支払いの優先順位をもっと早く整理できたかもしれない</li>
                <li>家族に相談するタイミングも変えられたかもしれない</li>
                <li>生活を立て直すための動き出しが少し早まったかもしれない</li>
              </ul>
              <p>
                とは思います。
              </p>
              <p>
                感情が追いつかないうちは、数字を見るのは本当にしんどいです。でも、見ないままの不安は、ずっと曖昧に重く残ります。あとから冷静に考えると、あの頃の自分に必要だったのは、根性でも楽観でもなく、まず全体像を出すことだったと思います。
              </p>
            </section>

            <section id="now-numbers" className="space-y-4">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">
                今は、感覚ではなく数字で見るようにしている
              </h2>
              <p>
                借金額の大きさを後から実感した経験があってから、今はできるだけ感覚だけで判断しないようにしています。
              </p>
              <ul className="list-disc pl-5 space-y-2 text-stone-800">
                <li>残高はいくらか</li>
                <li>毎月の返済はいくらか</li>
                <li>金利や手数料はどうなっているか</li>
                <li>完済までどれくらいかかるか</li>
                <li>生活費と両立できるか</li>
              </ul>
              <p>
                こういうことを、面倒でも数字にして見るようにしています。
              </p>
              <p>
                きれいに割り切れるわけではありません。落ち込む日もあります。でも少なくとも、昔よりは「何が起きているか分からない不安」には振り回されにくくなりました。
              </p>
            </section>

            <section id="for-readers" className="space-y-4">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">同じような状況の人へ</h2>
              <p>
                もし今、
              </p>
              <ul className="list-disc pl-5 space-y-2 text-stone-800">
                <li>借金はあるが、全体の金額をちゃんと並べていない</li>
                <li>毎月の支払いに追われて、総額を見る余裕がない</li>
                <li>何となくまずいと思いながら、細かい支払いだけを見ている</li>
              </ul>
              <p>
                という状態なら、一度だけでも全体を整理してみた方がいいと思います。
              </p>
              <p>
                その作業は、気持ちのいいものではありません。私も本当に見たくありませんでした。
              </p>
              <p>
                でも、後から冷静に考えると、見ないままでいる時間が長いほど、現実とのズレも大きくなります。借金そのものに苦しむ前に、借金の輪郭が見えていないことで苦しくなることもあります。
              </p>
              <p>
                だからこそ、早い段階で金額の大きさを現実としてつかむことが大事だったと思っています。
              </p>
            </section>

            <section id="simulator" className="rounded-xl border border-stone-200/80 bg-stone-50/80 p-5 not-prose">
              <h2 className="text-lg font-semibold text-stone-900">自分の条件で試算する</h2>
              <p className="mt-2 text-base text-stone-700 leading-relaxed">
                借入額、金利、返済額を入れて整理すると、感覚だけでは見えなかったものが見えやすくなります。月々の返済額、総利息、完済までの期間を数字で見ると、「何となく重い」が少し具体的になります。
              </p>
              <p className="mt-3 text-base text-stone-700 leading-relaxed">
                運営者プロフィールにあるとおり、私は株式投資・FXの失敗をきっかけに、最大で約300万円規模の借金を経験しました。一覧にしたあと必要になったのは、このサイトのシミュレーターのように、条件を数字に落として眺める作業でした。
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
                借入や返済の判断は、人によって条件がかなり違います。苦しいときは、一人で抱え込まず、公的な相談窓口や専門家の情報もあわせて確認してください。
              </p>
              <p className="mt-3">
                <Link href="/resources/consultation-guide" className="font-semibold text-emerald-900 underline">
                  相談先・公的支援の一覧
                </Link>
                を先に開いておくと整理しやすいです。ページ末尾の「参考・相談先（公的情報）」にも、金融庁・日本貸金業協会・法テラス・日本クレジットカウンセリング協会などへの案内があります。
              </p>
            </section>
          </ArticleProse>

          <ArticleFooter articleSlug={SLUG} showCta={false} />
        </div>
      </ArticlePageShell>
    </>
  );
}
