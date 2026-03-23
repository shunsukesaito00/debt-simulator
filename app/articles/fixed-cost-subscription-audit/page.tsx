import type { Metadata } from "next";
import Link from "next/link";
import { ArticleFooter } from "@/app/components/ArticleFooter";
import { ArticleProse } from "@/app/components/article";
import { getArticleBreadcrumbJsonLd, getArticleFaqJsonLd } from "@/lib/article-structured-data";
import { ARTICLE_AUTHOR_JSON_LD, ARTICLE_PUBLISHER_JSON_LD } from "@/lib/site-author";
import { ArticlePageShell } from "@/app/components/ArticlePageShell";
import { articleUsesWideLayout } from "@/lib/article-layout";


const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://debt-simulator-quzc.vercel.app";
const ARTICLE_URL = `${BASE}/articles/fixed-cost-subscription-audit`;
const ARTICLE_TITLE = "サブスク整理の進め方｜見落としやすい月額課金を洗い出す方法";

export const metadata: Metadata = {
  title: ARTICLE_TITLE,
  description:
    "サブスク整理は固定費見直しの初手に最適。見落としやすい月額課金の洗い出し方、解約判断、失敗しやすいポイントまで実用的にまとめます。",
  alternates: { canonical: ARTICLE_URL },
  openGraph: {
    title: ARTICLE_TITLE,
    description:
      "サブスク整理を始めるなら、まず全件を書き出す。支払明細の見方、解約時の注意、今週中に進める手順を解説します。",
    url: ARTICLE_URL,
    type: "article",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: ARTICLE_TITLE,
  description:
    "見落としやすい月額課金を洗い出し、解約・保留・継続を整理するサブスク見直しガイド。",
  url: ARTICLE_URL,
  datePublished: "2025-03-11",
  dateModified: "2026-03-21",
  author: ARTICLE_AUTHOR_JSON_LD,
  publisher: ARTICLE_PUBLISHER_JSON_LD,
};

const faqItems = [
  {
    question: "サブスク整理で最初にやるべきことは何ですか？",
    answer:
      "節約テクニックより先に、今払っている月額課金を全部書き出すことです。記憶ではなく、カード明細・口座明細・アプリストアの定期購入画面から確認するのが確実です。",
  },
  {
    question: "どのサブスクから解約すると進めやすいですか？",
    answer:
      "無料体験から自動更新されたもの、3か月以上使っていないもの、類似サービスが重複しているものから始めると負担が少なく進みます。",
  },
  {
    question: "使っているサブスクも見直し対象ですか？",
    answer:
      "はい。基準は「使っているか」だけでなく「今月も払う価値があるか」です。使っていても、価格に見合っていないなら見直し候補になります。",
  },
  {
    question: "解約したのに請求が続くときはどうすればいいですか？",
    answer:
      "翌月の明細で実際に止まっているか確認してください。止まっていなければ、解約完了メールや管理画面の状態を確認し、決済事業者・提供元へ問い合わせます。",
  },
  {
    question: "固定費全体の削減効果を試算したいです。",
    answer:
      "サブスクだけでなく、通信費・保険なども含めた「月いくら削減したら1年・3年・5年でいくらになるか」は、当サイトの固定費削減インパクト計算で試算できます。サブスクで浮いた金額を入力すると、継続したときの効果を確認できます。",
  },
];

const breadcrumbJsonLd = getArticleBreadcrumbJsonLd(ARTICLE_URL, ARTICLE_TITLE);
const faqJsonLd = getArticleFaqJsonLd(faqItems);

const tocItems = [
  { id: "intro", label: "導入" },
  { id: "conclusion", label: "先に結論｜全部書き出してから判断する" },
  { id: "why-hard", label: "サブスクが家計を圧迫しやすい理由" },
  { id: "first-check", label: "最初に確認すること" },
  { id: "easy-cut", label: "まず切りやすいサブスク" },
  { id: "keep", label: "切らなくてよいサブスク" },
  { id: "steps", label: "サブスク整理の手順" },
  { id: "mistakes", label: "失敗しやすいパターン" },
  { id: "impact", label: "月3,000円の整理でも年間では大きい" },
  { id: "who", label: "こんな人はサブスク整理を先に" },
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

      <ArticlePageShell currentPageTitle={ARTICLE_TITLE} wide={articleUsesWideLayout("fixed-cost-subscription-audit")}>
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
                サブスクは、固定費の中でもいちばん着手しやすい見直し先です。使っていないものを止めるだけで、毎月の支出が下がるからです。
              </p>
              <p className="mt-3">
                一方で、1件ごとの金額が小さいため見落としやすく、無料体験からの自動移行や自動更新で気づかない請求が続くこともあります。
              </p>
            </section>

            <section id="conclusion">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">
                先に結論｜サブスク整理は「全部書き出す」から始める
              </h2>
              <p className="mt-3">
                サブスク整理で最初にやるべきことは、節約テクニック探しではありません。<strong>今払っている月額課金を全部書き出すこと</strong>です。
                把握できていないものは、止める判断も残す判断もできません。
              </p>
              <p className="mt-3">
                固定費全体の順番としては、
                <Link href="/articles/fixed-cost-checklist" className="font-bold text-stone-900 hover:underline">固定費見直しチェックリスト</Link>
                でもサブスクを初手にしています。
              </p>
            </section>

            <section id="why-hard">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">サブスクが家計を圧迫しやすい理由</h2>
              <p className="mt-3">
                サブスクが怖いのは高額だからではなく、<strong>小さい支払いが家計の死角に入りやすい</strong>からです。月500円、980円でも、重なると毎月数千円から1万円前後になることがあります。
              </p>
              <p className="mt-3">
                物が残らない支出なので実感が薄く、解約したつもりで請求が続くケースも起こりやすくなります。
              </p>
            </section>

            <section id="first-check">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">サブスク整理で最初に確認すること</h2>
              <h3 className="mt-4 text-base font-semibold text-stone-900">1. 支払明細を3か月分見る</h3>
              <p className="mt-2">記憶ではなく、クレジットカードや口座の明細を見ます。アプリ経由、クレカ直課金、キャリア決済など、引き落とし経路が分かれるためです。</p>
              <h3 className="mt-4 text-base font-semibold text-stone-900">2. サービス名と金額を一覧にする</h3>
              <ul className="mt-2 list-disc pl-5 space-y-1 text-stone-800">
                <li>動画・音楽・電子書籍</li>
                <li>AI・ソフトウェア</li>
                <li>クラウド保存</li>
                <li>学習・資格</li>
                <li>ジム・レンタル・定期購入</li>
              </ul>
              <h3 className="mt-4 text-base font-semibold text-stone-900">3. 「使っているか」ではなく「今月も払う価値」で見る</h3>
              <h3 className="mt-4 text-base font-semibold text-stone-900">4. 解約条件を確認する</h3>
            </section>

            <section id="easy-cut">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">まず切りやすいサブスク</h2>
              <ul className="mt-3 list-disc pl-5 space-y-1 text-stone-800">
                <li>無料体験から自動更新されたもの</li>
                <li>3か月以上ほぼ使っていないもの</li>
                <li>類似サービスが重複しているもの</li>
                <li>家族が誰も使っていないもの</li>
              </ul>
            </section>

            <section id="keep">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">切らなくてよいサブスク</h2>
              <ul className="mt-3 list-disc pl-5 space-y-1 text-stone-800">
                <li>生活満足度が高く、利用頻度も高いもの</li>
                <li>代替コストの方が高いもの</li>
                <li>解約コストや再契約コストが高いもの</li>
              </ul>
            </section>

            <section id="steps">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">サブスク整理の手順</h2>
              <ol className="mt-3 list-decimal pl-5 space-y-2 text-stone-800">
                <li>明細から全部拾う（クレカ、銀行、App Store、Google Play、キャリア決済）</li>
                <li>一覧表を作る（サービス名、月額、支払方法、最終利用、解約方法、継続判断）</li>
                <li>3分類する（残す、保留、解約候補）</li>
                <li>解約候補から今週中に3件だけ動く</li>
                <li>翌月の明細で本当に止まったか確認する</li>
              </ol>
            </section>

            <section id="mistakes">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">サブスク整理で失敗しやすいパターン</h2>
              <ul className="mt-3 list-disc pl-5 space-y-2 text-stone-800">
                <li>「使っていないものだけ」を探して終わる</li>
                <li>アプリだけ見て、明細を見ない</li>
                <li>解約方法を確認せず後回しにする</li>
                <li>節約だけで判断して、必要なものまで切る</li>
              </ul>
            </section>

            <section id="impact">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">月3,000円の整理でも年間では大きい</h2>
              <ul className="mt-3 list-disc pl-5 space-y-1 text-stone-800">
                <li>月1,000円削減: 年12,000円</li>
                <li>月3,000円削減: 年36,000円</li>
                <li>月5,000円削減: 年60,000円</li>
              </ul>
              <p className="mt-3">
                固定費は一度整理すると翌月以降も効きやすいのが強みです。
              </p>
            </section>

            <section id="who">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">こんな人はサブスク整理を先にやった方がいい</h2>
              <ul className="mt-3 list-disc pl-5 space-y-1 text-stone-800">
                <li>固定費を何から見直すか迷っている</li>
                <li>家計簿は続かないが、まず1つ成果が欲しい</li>
                <li>赤字ではないが、毎月余らない</li>
                <li>クレカ明細に思い出せない請求がある</li>
              </ul>
            </section>

            <section id="simulate">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">自分の条件で試算する</h2>
              <p className="mt-3">
                サブスクで月2,000円、スマホで月1,500円見直せれば、月3,500円です。年間では42,000円になります。
                固定費全体の効果は
                <Link href="/tools/fixed-cost-impact" className="font-bold text-stone-900 hover:underline"> 固定費削減インパクト計算 </Link>
                で確認できます。
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
                <li>まず支払明細から全部拾う</li>
                <li>サービス名・金額・支払方法を一覧化する</li>
                <li>残す・保留・解約候補に分ける</li>
                <li>今週3件だけ解約して、翌月明細で停止を確認する</li>
              </ul>
            </section>
          </ArticleProse>

          <ArticleFooter articleSlug="fixed-cost-subscription-audit" showCta={false} />
        </div>
      </ArticlePageShell>
    </>
  );
}
