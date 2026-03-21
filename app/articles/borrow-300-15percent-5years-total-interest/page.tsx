import type { Metadata } from "next";
import Link from "next/link";
import { ArticleFooter } from "@/app/components/ArticleFooter";
import {
  ArticlePagePremise,
  ArticleReadingPoints,
  ArticleEditorMemo,
  ArticleStandardBlocks,
  ArticleProse,
} from "@/app/components/article";
import { getArticleBreadcrumbJsonLd, getArticleFaqJsonLd } from "@/lib/article-structured-data";
import { ARTICLE_AUTHOR_JSON_LD, ARTICLE_PUBLISHER_JSON_LD } from "@/lib/site-author";
import { ArticlePageShell } from "@/app/components/ArticlePageShell";
import { articleUsesWideLayout } from "@/lib/article-layout";

const SLUG = "borrow-300-15percent-5years-total-interest" as const;

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://debt-simulator-quzc.vercel.app";
const ARTICLE_URL = `${BASE}/articles/${SLUG}`;
const ARTICLE_TITLE = "借金300万円・金利15%で5年返済すると総利息はいくら？元利均等の目安";

export const metadata: Metadata = {
  title: ARTICLE_TITLE,
  description:
    "借金300万円を年利15%で5年（60回）・元利均等返済した場合の総利息・月々返済額・総支払額の目安を、当サイトの計算ロジックに基づき整理します。3年・7年との比較も。",
  alternates: { canonical: ARTICLE_URL },
  openGraph: {
    title: ARTICLE_TITLE,
    description:
      "借金300万円を年利15%で5年返済した場合の総利息と月々の返済額の目安。元利均等・途中金利変更なしの試算例です。",
    url: ARTICLE_URL,
    type: "article",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: ARTICLE_TITLE,
  description:
    "借金300万円を年利15%で5年（60回）・元利均等返済した場合の総利息・月々返済額・総支払額の目安を整理します。",
  url: ARTICLE_URL,
  datePublished: "2026-03-21",
  dateModified: "2026-03-21",
  author: ARTICLE_AUTHOR_JSON_LD,
  publisher: ARTICLE_PUBLISHER_JSON_LD,
};

const faqItems = [
  {
    question: "借金300万円・年利15%・5年返済の総利息の目安は？",
    answer:
      "元利均等返済・途中金利変更なし・利息端数切り捨ての試算では、総利息は約128.2万円（1,282,135円）、総支払額は約428.2万円が目安です。",
  },
  {
    question: "月々の返済額はいくらくらいですか？",
    answer:
      "初月の目安は約71,370円です。元利均等では毎月の返済額は原則一定ですが、最終月のみ端数調整で変わる場合があります。",
  },
  {
    question: "5年より短い期間にすると総利息はどう変わりますか？",
    answer:
      "同じ300万円・年利15%でも、3年（36回）にすると総利息は約74.4万円まで下がる目安です。月々の負担は増えますが、トータルの利息は抑えやすくなります。",
  },
  {
    question: "自分の条件で試すには？",
    answer:
      "借入返済シミュレーターで「元利均等」「借入額300万円」「返済期間5年」「年利15%」を設定すると、同様のイメージを確認できます。",
  },
];

const breadcrumbJsonLd = getArticleBreadcrumbJsonLd(ARTICLE_URL, ARTICLE_TITLE);
const faqJsonLd = getArticleFaqJsonLd(faqItems);

const tocItems = [
  { id: "conclusion", label: "結論｜5年返済の総利息は約128.2万円が目安" },
  { id: "numbers", label: "5年（60回）返済の内訳" },
  { id: "compare", label: "3年・5年・7年にしたときの違い（300万円・15%）" },
  { id: "reading-points", label: "読みどころ整理" },
  { id: "simulator", label: "シミュレーターで確認する" },
  { id: "notice", label: "注意点" },
  { id: "faq", label: "よくある質問" },
  { id: "summary", label: "まとめ" },
];

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      {faqJsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />}

      <ArticlePageShell currentPageTitle={ARTICLE_TITLE} wide={articleUsesWideLayout(SLUG)}>
        <div className="ds-card ds-card-pad">
          <h1 className="text-2xl font-semibold text-stone-900 md:text-3xl">{ARTICLE_TITLE}</h1>
          <p className="mt-4 text-base text-stone-600 leading-relaxed">
            以下の数値は、当サイトの返済計算ロジック（元利均等・月次・利息は円未満切り捨て）による試算例です。実際の契約では日割り・端数ルール等で異なる場合があります。
          </p>

          <ArticleStandardBlocks slug={SLUG} />

          <ArticlePagePremise
            comparisonConditions={[
              "借入額300万円・年利15%（途中金利変更なし）",
              "返済方式は元利均等返済（回数指定）",
              "返済期間は5年＝60回払い",
            ]}
            reasonForConditions="「300万円・15%・5年」という検索クエリに答えるため、借入額・金利・期間を固定して総利息と月々の目安を示します。"
          />

          <section className="mt-6 ds-subcard p-4">
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
            <p>
              借金300万円を年利15%で返していく場合、「5年で返すと総利息はいくらになるのか」は、返済計画を立てるうえで押さえておきたいポイントです。ここでは
              <strong className="text-stone-900">元利均等返済</strong>
              で5年（60回）にしたときの
              <strong className="text-stone-900">総利息・月々の返済額・総支払額</strong>
              を、具体的な目安として整理します。
            </p>

            <section id="conclusion">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">結論｜5年返済の総利息は約128.2万円が目安</h2>
              <p className="mt-3">
                借入300万円・年利15%・元利均等・5年（60回）返済の試算では、
                <strong className="text-stone-900">総利息は約1,282,135円（約128.2万円）</strong>、
                <strong className="text-stone-900">総支払額は約4,282,135円（約428.2万円）</strong>
                が目安です。初月の返済額の目安は
                <strong className="text-stone-900">約71,370円</strong>
                です。
              </p>
            </section>

            <section id="numbers">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">5年（60回）返済の内訳</h2>
              <div className="mt-6 overflow-x-auto">
                <table className="w-full min-w-[280px] border-collapse text-left">
                  <thead>
                    <tr className="border-b-2 border-stone-200">
                      <th className="py-3 pr-4 font-semibold text-stone-900">項目</th>
                      <th className="py-3 font-semibold text-stone-900">目安</th>
                    </tr>
                  </thead>
                  <tbody className="text-stone-700">
                    <tr className="border-b border-stone-200">
                      <td className="py-3 pr-4">借入額</td>
                      <td className="py-3">3,000,000円</td>
                    </tr>
                    <tr className="border-b border-stone-200">
                      <td className="py-3 pr-4">年利</td>
                      <td className="py-3">15%</td>
                    </tr>
                    <tr className="border-b border-stone-200">
                      <td className="py-3 pr-4">返済期間</td>
                      <td className="py-3">5年（60回）</td>
                    </tr>
                    <tr className="border-b border-stone-200">
                      <td className="py-3 pr-4">初月の返済額（目安）</td>
                      <td className="py-3">約71,370円</td>
                    </tr>
                    <tr className="border-b border-stone-200">
                      <td className="py-3 pr-4">総利息</td>
                      <td className="py-3">約1,282,135円（約128.2万円）</td>
                    </tr>
                    <tr className="border-b border-stone-200">
                      <td className="py-3 pr-4">総支払額</td>
                      <td className="py-3">約4,282,135円</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section id="compare">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">3年・5年・7年にしたときの違い（300万円・15%）</h2>
              <p className="mt-3">
                同じ借入額・金利でも、返済期間が長いほど月々の負担は下がりやすい一方、
                <strong className="text-stone-900">総利息は増えやすい</strong>です。
              </p>
              <div className="mt-6 overflow-x-auto">
                <table className="w-full min-w-[360px] border-collapse text-left">
                  <thead>
                    <tr className="border-b-2 border-stone-200">
                      <th className="py-3 pr-4 font-semibold text-stone-900">返済期間</th>
                      <th className="py-3 pr-4 font-semibold text-stone-900">初月返済（目安）</th>
                      <th className="py-3 font-semibold text-stone-900">総利息（目安）</th>
                    </tr>
                  </thead>
                  <tbody className="text-stone-700">
                    <tr className="border-b border-stone-200">
                      <td className="py-3 pr-4">3年（36回）</td>
                      <td className="py-3 pr-4">約103,996円</td>
                      <td className="py-3">約743,835円（約74.4万円）</td>
                    </tr>
                    <tr className="border-b border-stone-200">
                      <td className="py-3 pr-4">5年（60回）</td>
                      <td className="py-3 pr-4">約71,370円</td>
                      <td className="py-3">約1,282,135円（約128.2万円）</td>
                    </tr>
                    <tr className="border-b border-stone-200">
                      <td className="py-3 pr-4">7年（84回）</td>
                      <td className="py-3 pr-4">約57,890円</td>
                      <td className="py-3">約1,862,727円（約186.3万円）</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-3">
                5年は、月々の負担と総利息のバランスを取りたい場合に選ばれやすい期間のひとつです。期間の延長で総利息がどう伸びるかは、
                <Link href="/articles/repayment-term-longer-total-interest" className="font-bold text-stone-900 hover:underline">
                  返済期間と総利息の関係
                </Link>
                の記事でも整理しています。
              </p>
            </section>

            <section id="reading-points">
              <ArticleReadingPoints
                points={[
                  {
                    label: "5年返済の総利息は約128.2万円が目安",
                    body: "300万円・年利15%・元利均等・60回の試算です。契約の端数処理と完全一致するとは限りません。",
                  },
                  {
                    label: "月々は約7.1万円前後（初月目安）",
                    body: "元利均等では毎月の返済額は概ね一定です。完済までのキャッシュフローをイメージしやすいです。",
                  },
                  {
                    label: "期間を短くすると総利息は下がる",
                    body: "3年にすると総利息は約74.4万円まで下がる目安ですが、月々の返済は重くなります。",
                  },
                ]}
                misconceptions={[
                  "「5年なら利息は軽い」と決めつけないこと。借入額が300万円と大きいと、総利息は100万円を超える目安になります。",
                  "実際の商品は元利均等以外の方式や、金利の変動がある場合があります。契約書の条件を優先してください。",
                ]}
              />
            </section>

            <section id="simulator">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">シミュレーターで確認する</h2>
              <p className="mt-3">
                <Link href="/simulator/cardloan" className="font-bold text-stone-900 hover:underline">
                  借入返済シミュレーター
                </Link>
                で「借入額300万円」「返済方式：元利均等」「返済期間5年」「金利15%」を入力すると、返済表や総利息を自分の前提で確認できます。A/Bで期間だけ変えて比較するのもおすすめです。
              </p>
              <div className="mt-6">
                <Link href="/simulator/cardloan" className="ds-btn ds-btn-primary">
                  借入返済シミュレーターで試す →
                </Link>
              </div>
            </section>

            <section id="notice">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">注意点</h2>
              <p className="mt-3">
                本記事の数値は、当サイトの計算ロジックに基づく参考値です。金融機関の約定日・日割り利息・手数料・遅延損害金などは含めていません。借り換えや返済条件の変更を検討する場合は、必ず契約内容や各社の試算を確認してください。
              </p>
            </section>

            <section id="editor-memo">
              <ArticleEditorMemo
                purpose="「借金300万 金利15% 5年 総利息」という具体的クエリに答え、元利均等の目安を一画面で示す記事です。"
                reasonAxis="GROWTH_STRATEGY 3.2 のテーマに対応。300万記事（borrow-300-monthly-payment）と期間比較記事（repayment-term-longer）への内部リンクでクラスターを補強します。"
                memo="数値は lib/loan-calc の元利均等・60回・年利15%で再計算可能です。"
              />
            </section>

            <section id="faq">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">よくある質問</h2>
              <div className="mt-4 space-y-6">
                {faqItems.map((f) => (
                  <div key={f.question}>
                    <h3 className="text-base font-semibold text-stone-900">{f.question}</h3>
                    <p className="mt-2 text-stone-700">{f.answer}</p>
                  </div>
                ))}
              </div>
            </section>

            <section id="summary">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">まとめ</h2>
              <p className="mt-3">
                借金300万円を年利15%で5年・元利均等返済する場合の総利息は、試算上
                <strong className="text-stone-900">約128.2万円</strong>
                、総支払額は
                <strong className="text-stone-900">約428.2万円</strong>
                が目安です。期間を3年に短縮すると総利息は下がりますが月々は重く、7年に伸ばすと月々は軽くなりやすい一方で総利息は増えます。
                <Link href="/simulator/cardloan" className="font-bold text-stone-900 hover:underline">
                  シミュレーター
                </Link>
                で自分の条件に合わせて確認してください。
              </p>
            </section>
          </ArticleProse>

          <ArticleFooter articleSlug={SLUG} />
        </div>
      </ArticlePageShell>
    </>
  );
}
