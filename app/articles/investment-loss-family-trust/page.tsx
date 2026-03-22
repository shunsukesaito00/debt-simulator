import type { Metadata } from "next";
import Link from "next/link";
import { ArticleFooter } from "@/app/components/ArticleFooter";
import { ArticleFurtherReading, ArticleProse } from "@/app/components/article";
import { getArticleBreadcrumbJsonLd } from "@/lib/article-structured-data";
import { ARTICLE_AUTHOR_JSON_LD, ARTICLE_PUBLISHER_JSON_LD } from "@/lib/site-author";
import { ArticlePageShell } from "@/app/components/ArticlePageShell";
import { articleUsesWideLayout } from "@/lib/article-layout";
import { getArticle } from "@/lib/articles";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://debt-simulator-quzc.vercel.app";
const ARTICLE_URL = `${BASE}/articles/investment-loss-family-trust`;
const ARTICLE_TITLE = "投資で負けが膨らんだ私の体験｜取り返したかったのはお金、失った実感は家族への信用";

export const metadata: Metadata = {
  title: ARTICLE_TITLE,
  description:
    "口座の数字を取り返したい一心から現物株・信用・FXへ進み、家族に助けを求めるまでの体験記。焦りと生活の締切、そして取り返している家族への信用について。投資助言ではありません。",
  alternates: { canonical: ARTICLE_URL },
  openGraph: {
    title: ARTICLE_TITLE,
    description:
      "損失を取り返そうとする焦りは取引の種類を変えても消えず、口座と生活は別のペースで進む。家族に助けを求めた転機と、いま取り返している信用の話です。",
    url: ARTICLE_URL,
    type: "article",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: ARTICLE_TITLE,
  description:
    "投資の失敗と借入が重なった個人の体験記。投資助言や商品の推奨は含みません。",
  url: ARTICLE_URL,
  datePublished: "2026-03-19",
  dateModified: "2026-03-22",
  author: ARTICLE_AUTHOR_JSON_LD,
  publisher: ARTICLE_PUBLISHER_JSON_LD,
};

const breadcrumbJsonLd = getArticleBreadcrumbJsonLd(ARTICLE_URL, ARTICLE_TITLE);

const tocItems = [
  { id: "intro", label: "はじめに" },
  { id: "about", label: "この記事について" },
  { id: "start", label: "投資を始めたきっかけ" },
  { id: "stocks", label: "現物株で焦りが生まれた" },
  { id: "margin", label: "信用取引に切り替えた" },
  { id: "fx", label: "FXと海外の取引へ進んだ" },
  { id: "loop", label: "振り返りなしのループ" },
  { id: "turning", label: "転機になった週" },
  { id: "now", label: "今、取り返しているもの" },
  { id: "lessons", label: "この体験から残ったこと" },
  { id: "tools", label: "数字で整理したい人へ" },
  { id: "afterword", label: "あとがき" },
];

export default function Page() {
  const article = getArticle("investment-loss-family-trust");
  const furtherReadingItems =
    article?.relatedLinks?.map((l) => ({ href: l.href, label: l.label })) ?? [];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <ArticlePageShell
        currentPageTitle={ARTICLE_TITLE}
        wide={articleUsesWideLayout("investment-loss-family-trust")}
        publishedAt="2026-03-19"
        category="story"
      >
        <div className="ds-card ds-card-pad">
          <h1 className="ds-page-serif text-2xl font-bold text-stone-900 md:text-3xl">
            投資で負けが膨らんだ私の体験
          </h1>
          <p className="mt-3 text-lg font-medium text-stone-800 leading-relaxed md:text-xl">
            取り返したかったのはお金で、失ったと実感したのは家族への信用だった
          </p>

          <ArticleProse className="mt-8 space-y-10">
            <section id="intro" className="space-y-4">
              <p>私が取り返したかったのは、ずっと口座の数字でした。</p>
              <p>
                減った分を戻したい。せめて元に戻したい。
                <br />
                その気持ちから、現物株から信用取引へ、さらにFXや高いレバレッジの取引へと進みました。
              </p>
              <p>
                でも、最後に強く失ったと感じたのは、お金だけではありませんでした。
                妻や両親に助けを求めることになったとき、取り返したいのは口座残高ではなく、家族からの信用だとようやく分かりました。
              </p>
              <p>
                これは投資で成功した話ではありません。
                止まらなくなったとき、何が少しずつ壊れていったかの記録です。
              </p>
            </section>

            <section id="about" className="ds-subcard p-4 border-l-4 border-stone-400 not-prose">
              <h2 className="text-base font-semibold text-stone-900">この記事について</h2>
              <p className="mt-2 text-base text-stone-700 leading-relaxed">
                投資や借入を勧めるつもりはありません。同じように金欠や返済、先が見えない不安で苦しい人に、「こういう崩れ方もある」という共有です。
              </p>
              <ul className="mt-3 list-disc pl-5 text-base text-stone-700 space-y-1">
                <li>銘柄やサービスの推奨、取引のやり方の指南は書いていません。</li>
                <li>金額は記憶に基づく概算です（生涯の収支は、おおよそ1,000万円を超える負けだったと自分では思っています）。</li>
                <li>個人の記録であり、誰にでも当てはまる正解を示すものではありません。</li>
              </ul>
              <p className="mt-3 text-base font-medium text-stone-800">この記事で伝えたいこと（要点）</p>
              <ul className="mt-2 list-disc pl-5 text-base text-stone-800 space-y-1">
                <li>損失を取り返そうとする焦りは、取引の種類を変えても消えなかったこと</li>
                <li>口座の数字と、生活の支払いの締切は別のペースで進むこと</li>
                <li>最後につらいのはお金だけでなく、家族との信頼も失いかねないこと</li>
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

            <section id="start">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">投資を始めたきっかけ</h2>
              <p className="mt-3">
                投資を始めた理由は、特別に大きな野心があったからではありません。
                少しでも今より生活が良くなればいい、そのくらいの気持ちでした。
              </p>
              <p className="mt-3">
                最初は現物株から入りました。
                SNSで話題の銘柄を見て、自分でも売買するようになりました。今振り返ると、話題に乗るだけの後追いが多かったと思います。
              </p>
              <p className="mt-3">大きく勝てたわけではなく、少しずつ負けが重なっていきました。</p>
            </section>

            <section id="stocks">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">現物株で焦りが生まれた</h2>
              <p className="mt-3">
                手元の資金は、おおよそ100万円から始まり、半分近くまで減りました。
                そのあたりから、気持ちが変わりました。
              </p>
              <p className="mt-3">
                それまでは「少し増えたらいい」と思っていたのが、いつの間にか「減った分を戻さないといけない」に変わっていきました。
                自分の中では、その変化がかなり大きかったです。
              </p>
              <p className="mt-3">
                生活のために始めたはずなのに、頭の中は生活より、減ったお金をどう戻すかの方へ寄っていきました。
              </p>
            </section>

            <section id="margin">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">信用取引に切り替えた</h2>
              <p className="mt-3">
                焦った私は、現物株と同じ感覚のまま信用取引に切り替えました。
                銘柄を大きく変えたわけではありません。レバレッジをかければ取り返すのも早くなるのではないか、と考えたのです。
              </p>
              <p className="mt-3">
                最大でおおよそ3.3倍だったと思います。
                当時は、そこまで危ない道に進んでいる実感は薄く、現物のときより少し強くしただけ、くらいに思っていました。
              </p>
              <p className="mt-3">
                結果は逆でした。
                損が出るスピードだけが速くなり、資金はさらに削られていきました。
              </p>
            </section>

            <section id="fx">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">FXと海外の取引へ進んだ</h2>
              <p className="mt-3">
                資金が尽きたあと、私はFXに移りました。
                レバレッジはおおよそ25倍。給料が入るたびに入金し、少し戻ったと思ったら大きく負ける、の繰り返しでした。
              </p>
              <p className="mt-3">
                それでも勝ち切れず、今度は海外の業者も使いました。
                高いレバレッジが前面に出ているタイプの取引です。今なら危うさが分かりますが、当時は「ここで取り返せるかもしれない」という期待の方が勝っていました。
              </p>
              <p className="mt-3">当然のように、そこでもさらに負けました。</p>
            </section>

            <section id="loop">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">振り返りなしのループ</h2>
              <p className="mt-3">
                今思うと、いちばんまずかったのは負け方そのものより、振り返りをほとんどしなかったことです。
              </p>
              <p className="mt-3">
                なぜ負けたのか。何を根拠に入ったのか。次に何を変えるべきか。
              </p>
              <p className="mt-3">
                そういう整理をほぼしないまま、頭の中では同じ言葉が回っていました。
              </p>
              <p className="mt-3">
                「次はいける」「最後の入金にしよう」「あと一回だけ」——
                いつも決めきれない「最後の入金」を繰り返すような感覚でした。
              </p>
              <p className="mt-3">
                そのたびに、自分の中で物語を作っていました。
                取り返すには勝つしかない、最後に勝てば全部戻る、今は苦しいがあと少し耐えれば大丈夫だ、と。
              </p>
              <p className="mt-3">
                口座には、自分なりの「戻すべき残高」がありました。
                そこに近づくと安心し、離れると落ち着かない。その落差を埋めるために、入金や借入を重ねていたのだと思います。
              </p>
              <p className="mt-3">同じようなことを、おおよそ1年ほど繰り返していた感覚があります。</p>
            </section>

            <section id="turning">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">転機になった週</h2>
              <p className="mt-3">
                流れが止まったのは、投資で冷静になれたからではありませんでした。
              </p>
              <p className="mt-3">
                ライフイベントで出費が重なった時期に、クレジットカードのキャッシングの引き落としと、生活の支払いが重なりました。
                取引口座では「あと少しで戻せる」という感覚が残っていても、生活用の口座では引き落とし日がそうした感覚を待ってくれませんでした。
              </p>
              <p className="mt-3">
                ここで初めて、投資の見込みと家計の支払いは、同じペースでは進んでいないのだと痛感しました。
              </p>
              <p className="mt-3">
                取引口座の中でどれだけ取り返したいと思っていても、家賃や生活費、引き落とし日は待ってくれません。
                その現実から、もう目をそらせない段階に来ていました。
              </p>
              <p className="mt-3">
                借りても足りない金額になり、妻と両親に助けを求めました。
                そのとき強く残ったのは、「ここまで来てしまった」という後悔と、自分のお金の問題を家族に背負わせてしまった重さでした。
              </p>
            </section>

            <section id="now">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">今、取り返しているもの</h2>
              <p className="mt-3">昔の私は、口座の数字を取り返したいと思っていました。</p>
              <p className="mt-3">今、取り返したいのは、妻や両親への信用です。</p>
              <p className="mt-3">
                お金は、時間をかければ少しずつ減らしていけるかもしれません。
                でも信頼は、返済のように月いくらと割り切れて、順番どおりに戻るものではないと感じています。
              </p>
              <p className="mt-3">
                私は今、投資を止めています。
                立派に決めたからではありません。もう、それ以外に手がなかったからです。
              </p>
              <p className="mt-3">
                勝負で穴を埋める選択肢がなくなってから、ようやく「どう返すか」「暮らしをどう立て直すか」を考え始めました。
                情けない話ですが、私にとってはそこが再出発の入り口でした。
              </p>
            </section>

            <section id="lessons" className="space-y-6">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">この体験から残ったこと</h2>
              <p>この体験を通して、自分の中に残ったのは大きく次の3つです。</p>

              <div>
                <h3 className="text-base font-semibold text-stone-900 md:text-lg">
                  1. 損失を取り返すためのレバレッジは、焦りを増幅しやすい
                </h3>
                <p className="mt-2">
                  現物でうまくいかなかった判断が、信用やFXに移ったからといって急によくなるわけではありませんでした。
                  焦っているときにレバレッジをかけると、失敗の速さだけが目立ちやすかったです。
                </p>
              </div>

              <div>
                <h3 className="text-base font-semibold text-stone-900 md:text-lg">
                  2. 生活の締切は、取引口座の都合を待ってくれない
                </h3>
                <p className="mt-2">
                  「今はまだ回っている」と思っていても、それが借入やキャッシングでつないだ一時しのぎなら、急に苦しくなることがあります。
                  引き落としや生活費が重なる時期は、口座の中の希望より、実際の残高と支払いの方が先に来ます。
                </p>
              </div>

              <div>
                <h3 className="text-base font-semibold text-stone-900 md:text-lg">
                  3. 最後に重く残るのは、お金だけではない
                </h3>
                <p className="mt-2">
                  自分ひとりの問題だと思っていたものが、家族に助けを求めた瞬間に、信頼の問題にもなりました。
                  だから今は、残高だけでなく、家族への向き合い方も含めて立て直しているつもりです。
                </p>
              </div>
            </section>

            <section id="tools">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">数字で整理したい人へ</h2>
              <p className="mt-3">
                感情が苦しいときほど、頭の中だけで考えると話が大きくなりやすいです。
                このサイトに返済や固定費のツールを置いているのは、正解を出すためではなく、まず見え方を整理するためです。
              </p>
              <ul className="mt-3 list-disc pl-5 space-y-1">
                <li>
                  借入返済の条件を整理したいときは、
                  <Link href="/simulator/cardloan" className="font-bold text-stone-900 hover:underline">
                    借入返済シミュレーター
                  </Link>
                </li>
                <li>
                  固定費を少し下げたときの変化を見たいときは、
                  <Link href="/tools/fixed-cost-impact" className="font-bold text-stone-900 hover:underline">
                    固定費削減インパクト計算
                  </Link>
                </li>
              </ul>
              <p className="mt-3">
                <Link href="/about" className="font-bold text-stone-900 hover:underline">
                  運営者情報
                </Link>
                では、サイトを作った背景の補足も書いています。
              </p>
            </section>

            <section
              id="afterword"
              className="rounded-xl border border-stone-200/80 bg-stone-50/70 px-4 py-5 text-stone-800 not-prose"
            >
              <h2 className="text-base font-semibold text-stone-900">あとがき</h2>
              <p className="mt-3 text-base leading-relaxed">
                返済はなんとか回っているのに先が不安な方、相談できず止まっている方のなかにも、私と同じような流れの人がいるかもしれないと思って書きました。
                投資のやり方の話ではなく、レバレッジが上がり「最後の入金」が続くときの心理と、生活の支払いが重なる瞬間に焦点を当てています。
              </p>
              <p className="mt-3 text-base leading-relaxed">
                読んだあと、引き落とし日や生活の山、いまの不安など、一つでもメモが残れば十分だと思っています。
              </p>
            </section>
          </ArticleProse>

          <ArticleFooter articleSlug="investment-loss-family-trust" />
        </div>
      </ArticlePageShell>
    </>
  );
}
