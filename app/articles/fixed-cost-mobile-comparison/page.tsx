import type { Metadata } from "next";
import Link from "next/link";
import { ArticleFooter } from "@/app/components/ArticleFooter";
import { ArticleProse } from "@/app/components/article";
import { getArticleBreadcrumbJsonLd, getArticleFaqJsonLd } from "@/lib/article-structured-data";
import { ARTICLE_AUTHOR_JSON_LD, ARTICLE_PUBLISHER_JSON_LD } from "@/lib/site-author";
import { ArticlePageShell } from "@/app/components/ArticlePageShell";
import { articleUsesWideLayout } from "@/lib/article-layout";


const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://debt-simulator-quzc.vercel.app";
const ARTICLE_URL = `${BASE}/articles/fixed-cost-mobile-comparison`;
const ARTICLE_TITLE = "スマホ料金プラン見直しの考え方｜格安プランに変えるとどれくらい変わる？";

export const metadata: Metadata = {
  title: ARTICLE_TITLE,
  description:
    "スマホ料金の見直しを、使用量確認から失敗しにくい手順まで実用的に整理。格安プランへの変更でどれくらい変わるかの目安と注意点をまとめます。",
  alternates: { canonical: ARTICLE_URL },
  openGraph: {
    title: ARTICLE_TITLE,
    description:
      "スマホ料金見直しは使用量確認から。格安プラン比較の考え方、失敗しやすい点、削減額の目安をまとめました。",
    url: ARTICLE_URL,
    type: "article",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: ARTICLE_TITLE,
  description:
    "スマホ料金プラン見直しの考え方と、格安プランへ変える際の確認ポイントを整理した実用ガイド。",
  url: ARTICLE_URL,
  datePublished: "2025-03-11",
  dateModified: "2026-03-21",
  author: ARTICLE_AUTHOR_JSON_LD,
  publisher: ARTICLE_PUBLISHER_JSON_LD,
};

const faqItems = [
  {
    question: "スマホ料金見直しで最初にやるべきことは何ですか？",
    answer:
      "過去3か月程度のデータ使用量と通話量を確認することです。ここを見ないまま変更すると、安くなっても不便になったり、逆に過大プランのままになりやすくなります。",
  },
  {
    question: "格安プランに変えるとどれくらい変わりますか？",
    answer:
      "使い方次第ですが、月1,000円〜3,000円の改善余地が出るケースは珍しくありません。大容量プランのまま使っていない人ほど差が出やすいです。",
  },
  {
    question: "セット割がある場合でも乗り換えた方がいいですか？",
    answer:
      "スマホ単体では安く見えても、光回線や家族契約の割引を外すと逆転することがあります。家計全体で比較するのが安全です。",
  },
  {
    question: "すぐに見直さなくてもいいケースはありますか？",
    answer:
      "仕事で通信品質や店頭サポートを優先したい場合、家族全体で最適化されている場合、削減額が手間に見合わない場合は急がなくて大丈夫です。",
  },
  {
    question: "固定費全体でどれくらい削れるか知りたいです。",
    answer:
      "通信費だけでなく、サブスク・保険・光熱費なども含めた「月いくら削減したら1年・3年・5年でいくらになるか」は、当サイトの固定費削減インパクト計算で試算できます。スマホ見直しで浮いた金額を入力すると、継続したときの効果を確認できます。",
  },
];

const breadcrumbJsonLd = getArticleBreadcrumbJsonLd(ARTICLE_URL, ARTICLE_TITLE);
const faqJsonLd = getArticleFaqJsonLd(faqItems);

const tocItems = [
  { id: "intro", label: "導入" },
  { id: "conclusion", label: "先に結論｜スマホ料金見直しは使用量確認から" },
  { id: "first-check", label: "スマホ料金見直しで最初に確認すること" },
  { id: "who-benefits", label: "どんな人がスマホ料金を下げやすいか" },
  { id: "how-much", label: "格安プランに変えるとどれくらい変わる？" },
  { id: "steps", label: "スマホ料金見直しの手順" },
  { id: "failures", label: "失敗しやすいパターン" },
  { id: "not-urgent", label: "今すぐ変えなくてもいいケース" },
  { id: "impact", label: "月5,000円改善のうち、スマホ料金は現実的" },
  { id: "simulate", label: "自分の条件で試算する" },
  { id: "faq", label: "よくある質問" },
  { id: "summary", label: "まとめ" },
];

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      <ArticlePageShell currentPageTitle={ARTICLE_TITLE} wide={articleUsesWideLayout("fixed-cost-mobile-comparison")}>
        <div className="ds-card ds-card-pad">
          <h1 className="text-2xl font-semibold text-stone-900 md:text-3xl">{ARTICLE_TITLE}</h1>

          <section className="mt-6 ds-subcard p-4 not-prose">
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

          <ArticleProse className="mt-8 space-y-10">
            <section id="intro">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">導入</h2>
              <p className="mt-3">
                スマホ代は、固定費の中でも見直しやすく、効果が出やすい費目です。食費の節約は毎月がんばり続ける必要がありますが、スマホ料金は一度プランを見直せば、その後も毎月自動的に効きやすいのが強みです。
              </p>
              <p className="mt-3">
                ただし、「とにかく格安SIMに変えればいい」という話ではありません。データ使用量、通話オプション、セット割、乗り換えで失うものを整理してから判断した方が失敗しにくくなります。
              </p>
            </section>

            <section id="conclusion">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">
                先に結論｜スマホ料金見直しは「使用量確認」から始める
              </h2>
              <p className="mt-3">
                最初にやるべきことはひとつです。<strong>過去3か月くらいのデータ使用量と通話量を確認すること</strong>です。ここを見ずに変更すると、不便になったり、必要以上に高いプランを続けたりしやすくなります。
              </p>
              <p className="mt-3">
                契約容量と実際の使用量はズレやすいので、まず利用実態を把握してから比較するのが基本です。
              </p>
            </section>

            <section id="first-check">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">スマホ料金見直しで最初に確認すること</h2>
              <p className="mt-3">見直し前に、次の4点を先に確認すると判断しやすくなります。</p>
              <h3 className="mt-4 text-base font-semibold text-stone-900">1. 今のデータ使用量</h3>
              <p className="mt-2">
                通信会社のマイページやアプリで、直近3か月の使用量を確認します。メールや文字中心なら月1GB以内、Wi-Fi中心なら月3GB前後で収まる人も多く、過大プランの見直し余地が出ます。
              </p>
              <h3 className="mt-4 text-base font-semibold text-stone-900">2. 通話オプション</h3>
              <p className="mt-2">
                通話し放題や5分かけ放題を付けたまま、実際はほとんど使っていないケースがあります。通常通話が多いか、アプリ通話中心かを確認します。
              </p>
              <h3 className="mt-4 text-base font-semibold text-stone-900">3. セット割・家族割</h3>
              <p className="mt-2">
                スマホ単体では安く見えても、固定回線や家族割を外すと逆に高くなる場合があります。家計全体で比較するのが安全です。
              </p>
              <h3 className="mt-4 text-base font-semibold text-stone-900">4. 乗り換えで失うもの</h3>
              <p className="mt-2">
                キャリアメール、店頭サポート、一部決済や留守番電話は条件が変わることがあります。オンライン専用プランでは初期設定を自分で行う前提になる場合もあります。
              </p>
            </section>

            <section id="who-benefits">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">どんな人がスマホ料金を下げやすいか</h2>
              <ul className="mt-3 list-disc pl-5 space-y-1 text-stone-800">
                <li>大容量プランを長くそのまま使っている</li>
                <li>直近3か月のデータ使用量が毎月かなり余っている</li>
                <li>通話定額を付けているのに、実際はほとんど電話しない</li>
                <li>自宅ではWi-Fi中心で、外ではあまり使わない</li>
                <li>家族全体ではなく、自分だけ高いプランのまま</li>
              </ul>
              <p className="mt-3">
                このタイプは、容量の適正化だけでも差が出ることがあります。さらにサブブランドやMVNOまで比較すると、月額が大きく変わるケースがあります。
              </p>
            </section>

            <section id="how-much">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">格安プランに変えるとどれくらい変わる？</h2>
              <p className="mt-3">
                正確には使い方次第ですが、次の3パターンで考えると整理しやすいです。
              </p>
              <ul className="mt-3 list-disc pl-5 space-y-1 text-stone-800">
                <li>大容量プランから中容量プランへ</li>
                <li>メインブランドからオンライン専用・サブブランドへ</li>
                <li>3GB前後の低容量へ最適化</li>
              </ul>
              <p className="mt-3">
                言い方としては「月1,000〜3,000円の改善余地が出ることがある」くらいが自然です。断定せず、使用量と契約条件で差が出ることを明記する方が信頼されます。
              </p>
            </section>

            <section id="steps">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">スマホ料金見直しの手順</h2>
              <ol className="mt-3 list-decimal pl-5 space-y-2 text-stone-800">
                <li>使用量を確認する（過去3か月のデータ・通話量）</li>
                <li>今のプラン内容を確認する（容量、通話、端末分割、割引条件）</li>
                <li>同じ会社内のプラン変更を先に比較する</li>
                <li>サブブランド・MVNOも含めて比較する</li>
                <li>乗り換え時の注意点を確認する（MNP、メール、端末対応など）</li>
              </ol>
              <p className="mt-3">
                まずは同一会社内で比較し、次に外部比較へ進む順番が失敗しにくいです。旧プランに戻せないケースもあるため、現契約は記録してから比較します。
              </p>
            </section>

            <section id="failures">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">スマホ料金見直しで失敗しやすいパターン</h2>
              <ul className="mt-3 list-disc pl-5 space-y-2 text-stone-800">
                <li>安さだけで決める（割引条件や通話料を見落とす）</li>
                <li>データ使用量を見ずに下げる（追加料金とストレスが増える）</li>
                <li>セット割の損得を見ない（家計全体で逆転する）</li>
                <li>サポート前提なのにオンライン専用へ行く（手間が増える）</li>
              </ul>
            </section>

            <section id="not-urgent">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">こんな人は、今すぐ変えなくてもいい</h2>
              <ul className="mt-3 list-disc pl-5 space-y-1 text-stone-800">
                <li>仕事で通信品質やサポートを優先したい</li>
                <li>家族全体のセット割で最適化されている</li>
                <li>使用量とプランがかなり合っている</li>
                <li>乗り換えの手間に対して削減額が小さい</li>
              </ul>
            </section>

            <section id="impact">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">月5,000円改善のうち、スマホ料金はかなり現実的</h2>
              <p className="mt-3">
                固定費改善で月5,000円を目指すとき、スマホ料金は有力です。1人で月1,000〜3,000円、家族全体ならさらに差が出ることがあります。固定費全体では
                <Link href="/articles/fixed-cost-checklist" className="font-bold text-stone-900 hover:underline"> サブスクの次にスマホ </Link>
                の順で着手すると動きやすくなります。
              </p>
            </section>

            <section id="simulate">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">自分の条件で試算する</h2>
              <p className="mt-3">
                スマホ料金を月1,500円下げると年間18,000円、月3,000円なら年間36,000円です。単月では小さく見えても、固定費なので毎月積み上がります。
                削減額を1年・3年・5年で確認するなら
                <Link href="/tools/fixed-cost-impact" className="font-bold text-stone-900 hover:underline"> 固定費削減インパクト計算 </Link>
                が使えます。
              </p>
              <div className="mt-5 flex flex-wrap gap-3 not-prose">
                <Link href="/tools/fixed-cost-impact" className="ds-btn ds-btn-primary">固定費削減インパクトを計算する →</Link>
                <Link href="/articles/fixed-cost-guide" className="ds-btn ds-btn-secondary">固定費見直しの進め方へ戻る</Link>
              </div>
            </section>

            <section id="faq">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">よくある質問</h2>
              <dl className="mt-4 space-y-4">
                {faqItems.map((item, i) => (
                  <div key={i}>
                    <dt className="font-bold text-stone-900">{item.question}</dt>
                    <dd className="mt-1 text-stone-700">{item.answer}</dd>
                  </div>
                ))}
              </dl>
            </section>

            <section id="summary">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">まとめ</h2>
              <ul className="mt-3 list-disc pl-5 space-y-1">
                <li>まず使用量と通話量を確認する</li>
                <li>次に今のプラン内容と割引条件を確認する</li>
                <li>同一会社内 → サブブランド → MVNOの順で比較する</li>
                <li>安さだけでなく、手間・サポート・セット割も一緒に見る</li>
              </ul>
            </section>
          </ArticleProse>

          <ArticleFooter articleSlug="fixed-cost-mobile-comparison" showCta={false} />
        </div>
      </ArticlePageShell>
    </>
  );
}
