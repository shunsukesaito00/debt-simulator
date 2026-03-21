import type { Metadata } from "next";
import Link from "next/link";
import { ArticleFooter } from "@/app/components/ArticleFooter";
import { ArticleReadingPoints, ArticleEditorMemo } from "@/app/components/article";
import { getArticleBreadcrumbJsonLd } from "@/lib/article-structured-data";
import { ARTICLE_AUTHOR_JSON_LD, ARTICLE_PUBLISHER_JSON_LD } from "@/lib/site-author";
import { ArticlePageShell } from "@/app/components/ArticlePageShell";
import { articleUsesWideLayout } from "@/lib/article-layout";


const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://debt-simulator-quzc.vercel.app";
const ARTICLE_URL = `${BASE}/articles/investment-loss-family-trust`;
const ARTICLE_TITLE =
  "投資で負けが膨らんだ私の体験｜取り返し、家族への信用、投資を止めたときまで";

export const metadata: Metadata = {
  title: ARTICLE_TITLE,
  description:
    "少しでも豊かになりたいと始めた投資が、現物株・信用・FX・海外FXへとエスカレードし、家族に助けを求めるまでの体験を、個人の記録としてまとめました。投資助言ではありません。",
  alternates: { canonical: ARTICLE_URL },
  openGraph: {
    title: ARTICLE_TITLE,
    description:
      "取り返しと「最後の入金」のループ、生活の支払いとキャッシングが重なった転機、そして今は家族への信用を取り返す側にいるまでの体験記です。",
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
  dateModified: "2026-03-19",
  author: ARTICLE_AUTHOR_JSON_LD,
  publisher: ARTICLE_PUBLISHER_JSON_LD,
};

const breadcrumbJsonLd = getArticleBreadcrumbJsonLd(ARTICLE_URL, ARTICLE_TITLE);

const tocItems = [
  { id: "notice", label: "この記事について" },
  { id: "start", label: "投資を始めたきっかけ" },
  { id: "stocks", label: "現物株で焦りが生まれた" },
  { id: "margin", label: "信用取引に切り替えた" },
  { id: "fx", label: "FXと海外の取引" },
  { id: "loop", label: "振り返りなしのループ" },
  { id: "turning", label: "転機になった週" },
  { id: "now", label: "今、取り返しているもの" },
  { id: "reading-points", label: "読み方のポイント" },
  { id: "tools", label: "数字で状況を整理する（任意）" },
  { id: "editor-memo", label: "編集メモ" },
];

export default function Page() {
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
          <h1 className="ds-page-serif text-2xl font-bold text-stone-900 md:text-3xl">{ARTICLE_TITLE}</h1>

          <p className="mt-4 text-sm text-stone-600 leading-relaxed">
            この記事は、運営者個人の体験を書いたものです。<strong>投資・借入の勧誘や助言ではありません。</strong>
            同じように金欠や返済で苦しい方の参考になれば幸いです。
          </p>

          <section id="notice" className="mt-6 ds-subcard p-4 border-l-4 border-stone-400">
            <h2 className="text-sm font-semibold text-stone-900">この記事について</h2>
            <ul className="mt-2 list-disc pl-5 text-sm text-stone-700 space-y-1">
              <li>銘柄・サービス名の推奨や、取引のやり方の指南は書いていません。</li>
              <li>金額は記憶と感覚に基づく概算です（生涯収支はおおよそ1,000万円を超える規模の負け、と自己認識しています）。</li>
              <li>体験の事実関係は個人の記録であり、一般論として「こうあるべき」とは言えません。</li>
            </ul>
          </section>

          <section className="mt-6 ds-subcard p-4">
            <h2 className="text-sm font-semibold text-stone-900">目次</h2>
            <ul className="mt-2 space-y-1.5 text-sm">
              {tocItems.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className="text-stone-700 hover:underline">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <div className="mt-8 space-y-10 text-sm text-stone-700 leading-relaxed">
            <section id="start">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">投資を始めたきっかけ</h2>
              <p className="mt-3">
                私が投資を始めた理由は、派手な野心ではありませんでした。
                <strong>少しでも今より豊かな生活ができればいいな</strong>、という程度の動機でした。
              </p>
            </section>

            <section id="stocks">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">現物株で焦りが生まれた</h2>
              <p className="mt-3">
                最初は株式の現物投資から始めました。素人ながら、SNSで話題になっている銘柄などを売買していました。
                話題に乗る形は、いわゆる後乗りになりやすく、負けが重なりました。
              </p>
              <p className="mt-3">
                手持ちの資金がおおよそ100万円程度から、50万円程度まで減ったタイミングで、強い焦りを覚えました。
              </p>
            </section>

            <section id="margin">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">信用取引に切り替えた</h2>
              <p className="mt-3">
                焦った私は、<strong>信用取引で取り返そう</strong>としました。投資対象の銘柄は変えず、そのまま信用取引に切り替えたのです。
                レバレッジは最大でおおよそ3.3倍程度。やり方は現物のときと大きく変わらないつもりでした。
              </p>
              <p className="mt-3">
                結果として、速いペースで資金が溶けました。
              </p>
            </section>

            <section id="fx">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">FXと海外の取引</h2>
              <p className="mt-3">
                資金が尽きたあと、私はFXに移りました。レバレッジはおおよそ25倍。とにかく給料のほとんどを入金し、
                少し増えては大きくやられる、を繰り返しました。
              </p>
              <p className="mt-3">
                そこでも勝ち切れず、海外の業者で取引しました。非常に高いレバレッジが謳われるタイプでした。
                当然のように負けました。
              </p>
            </section>

            <section id="loop">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">振り返りなしのループ</h2>
              <p className="mt-3">
                取引の振り返りはほとんど行いませんでした。頭の中では、<strong>次はいける</strong>、
                <strong>最後の入金</strong>、そして<strong>いつもの「あと1回」入金</strong>が繰り返されていました。
              </p>
              <p className="mt-3">
                取り返すには勝つしかない。最終的に勝って取り返すから、もう少し借りよう——そんな物語で、自分を説得していました。
              </p>
              <p className="mt-3">
                口座には「戻すべき目標残高」があり、一度近づくと安心し、離れると落差が大きく感じました。
                そのたびに入金と借り方を重ね、おおよそ1年くらい、似たパターンが続いたと思います。
              </p>
            </section>

            <section id="turning">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">転機になった週</h2>
              <p className="mt-3">
                転機は、ライフイベントで大きな出費が重なったときでした。あわせて、クレジットカードのキャッシングの引き落とし日と生活の支払いが重なり、
                口座の中では「あと一押し」だったのに、銀行口座の現実は別のカレンダーで動いていました。
              </p>
              <p className="mt-3">
                借入れをしても足りない金額になり、私は<strong>妻と両親に助けを求めました</strong>。そこから今に至ります。
              </p>
            </section>

            <section id="now">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">今、取り返しているもの</h2>
              <p className="mt-3">
                昔、私が取り返そうとしていたのは、口座の数字でした。今、取り返したいのは、<strong>妻や両親への信用</strong>です。
                金額は時間をかければ減らしていけるかもしれません。でも信頼のほうは、別のカレンダーで動くと感じています。
              </p>
              <p className="mt-3">
                投資は止めています。それを「最初に決めた」とは言えません。<strong>もうそれしか手段がなかった</strong>のです。
                勝負で穴を埋める選択肢がなくなったあとで、初めて信用のほうに顔を向けられた、という感覚に近いです。
              </p>
            </section>

            <section id="reading-points">
              <ArticleReadingPoints
                title="読み方のポイント"
                points={[
                  {
                    label: "体験記です",
                    body: "正解ルートや投資手法の推奨は書いていません。私の通った道の記録として読んでください。",
                  },
                  {
                    label: "口座と生活は別カレンダー",
                    body: "口座上の目標と、引き落とし日・生活費の山がズレると、返せているように見えても詰みやすい、というのが私の教訓でした。",
                  },
                  {
                    label: "関連リンク",
                    body: "相談が怖いときは、恥だけでなく「物語を壊したくない」怖さもあると思います。話す材料を数字で整理するのも一案です。",
                  },
                ]}
                misconceptions={[
                  "私も「今は払えているから大丈夫」と思いがちでした。でもキャッシングや借入で場を繋いでいると、その「大丈夫」は短い場合があります。",
                  "「最後の入金」は自制の結果ではなく、私には恐怖のあいだをつなぐ言い訳に近かったです。",
                ]}
              />
            </section>

            <section id="tools">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">数字で状況を整理する（任意）</h2>
              <p className="mt-3">
                私がこのサイトでシミュレーターを作ったのは、返済や固定費の「見え方」を、条件ごとに試したかったからです。
                投資の話とは別に、借入の返済や固定費の削減効果を数字で押さえたい方は、次のツールも参考にしてください。
              </p>
              <ul className="mt-3 list-disc pl-5 space-y-1">
                <li>
                  <Link href="/simulator/cardloan" className="font-bold text-stone-900 hover:underline">
                    借入返済シミュレーター
                  </Link>
                  … 月々・総利息・完済時期などを条件別に試せます。
                </li>
                <li>
                  <Link href="/tools/fixed-cost-impact" className="font-bold text-stone-900 hover:underline">
                    固定費削減インパクト計算
                  </Link>
                  … 月いくら削ると、1年・3年・5年でどれだけ積み上がるかの目安です。
                </li>
                <li>
                  <Link href="/about" className="font-bold text-stone-900 hover:underline">
                    運営者情報
                  </Link>
                  … サイトを作った背景の補足です。
                </li>
              </ul>
            </section>

            <section id="editor-memo">
              <ArticleEditorMemo
                purpose="金欠で返済は回っているのに将来が不安な方や、相談できず止まっている方に、私と同じ型がいるかもしれないと伝えたかったです。"
                reasonAxis="投資助言ではなく、レバが上がり「最後の入金」が続く心理と、生活の締切が重なる瞬間に焦点を当てています。"
                memo="読んだあとに何か一つでもメモ（引き落とし日、生活の山、いまの不安）が残れば十分だと思っています。"
              />
            </section>
          </div>

          <ArticleFooter articleSlug="investment-loss-family-trust" />
        </div>
      </ArticlePageShell>
    </>
  );
}
