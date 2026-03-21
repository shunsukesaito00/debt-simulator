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

const SLUG = "equal-principal-first-payment-higher" as const;

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://debt-simulator-quzc.vercel.app";
const ARTICLE_URL = `${BASE}/articles/${SLUG}`;
const ARTICLE_TITLE = "元金均等返済で初回の返済額が高いのはなぜ？元利均等との違いをわかりやすく解説";

export const metadata: Metadata = {
  title: ARTICLE_TITLE,
  description:
    "元金均等返済では初回の返済額が元利均等返済より大きくなりやすい理由を、利息の計算と元本の据え置き方から整理します。100万円・年利15%・36回の数値例つき。",
  alternates: { canonical: ARTICLE_URL },
  openGraph: {
    title: ARTICLE_TITLE,
    description:
      "元金均等返済では初回の返済額が元利均等返済より大きくなりやすい理由を、利息の計算と元本の据え置き方から整理します。100万円・年利15%・36回の数値例つき。",
    url: ARTICLE_URL,
    type: "article",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: ARTICLE_TITLE,
  description:
    "元金均等返済では初回の返済額が元利均等返済より大きくなりやすい理由を、利息の計算と元本の据え置き方から整理します。100万円・年利15%・36回の数値例つき。",
  url: ARTICLE_URL,
  datePublished: "2026-03-19",
  dateModified: "2026-03-19",
  author: ARTICLE_AUTHOR_JSON_LD,
  publisher: ARTICLE_PUBLISHER_JSON_LD,
};

const faqItems = [
  {
    question: "元金均等返済の初回だけ返済額が高いのですか？",
    answer:
      "元金均等返済では、毎月の元本返済額を一定にするため、残高が大きいうちは利息も大きく、返済総額（元本＋利息）も大きくなります。後半にかけて返済総額は下がっていきます。",
  },
  {
    question: "元利均等返済の方が毎月の負担は軽いですか？",
    answer:
      "同じ期間で完済する前提では、初月の支払い総額は元利均等返済の方が低くなりやすいです。ただし総利息は元金均等返済の方が少なくなることが多く、トレードオフがあります。",
  },
  {
    question: "なぜ元金均等は初回の支払いが重くなるのですか？",
    answer:
      "初月は借入残高が最大なので、その残高に対する利息が最大になります。元金均等ではその上に、元本を期間で割った一定額を毎月返すため、初月の「利息＋元本」の合計が大きくなります。",
  },
  {
    question: "カードローンでも元金均等はありますか？",
    answer:
      "商品によります。カードローンやリボ払いでは定額元利（毎月の支払額が一定）が多い一方、住宅ローンなどでは元利均等・元金均等の選択があることがあります。契約書や説明資料で確認してください。",
  },
  {
    question: "どちらの返済方式を選ぶべきですか？",
    answer:
      "毎月のキャッシュフローで無理なく払えるか、総利息を抑えたいか、完済までの期間はどうしたいかで変わります。迷った場合は返済シミュレーターで複数パターンを比較すると整理しやすいです。",
  },
];

const breadcrumbJsonLd = getArticleBreadcrumbJsonLd(ARTICLE_URL, ARTICLE_TITLE);
const faqJsonLd = getArticleFaqJsonLd(faqItems);

const tocItems = [
  { id: "conclusion", label: "結論｜初回が高いのは「残高が最大の月に元本をたくさん返す」から" },
  { id: "compare", label: "元利均等と元金均等の仕組みの違い" },
  { id: "numbers", label: "数値例｜100万円・年利15%・36回返済" },
  { id: "reading-points", label: "読みどころ整理" },
  { id: "simulator", label: "自分の条件で比較するならシミュレーター" },
  { id: "notice", label: "注意点" },
  { id: "faq", label: "よくある質問" },
  { id: "summary", label: "まとめ" },
];

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      {faqJsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      )}

      <ArticlePageShell currentPageTitle={ARTICLE_TITLE} wide={articleUsesWideLayout(SLUG)}>
        <div className="ds-card ds-card-pad">
          <h1 className="text-2xl font-semibold text-stone-900 md:text-3xl">{ARTICLE_TITLE}</h1>
          <p className="mt-4 text-base text-stone-600 leading-relaxed">
            本記事の数値は、借入額100万円・年利15%・36回返済の一般的な概算例です。実際の商品では端数処理や日割りなどで異なる場合があります。
          </p>

          <ArticleStandardBlocks slug={SLUG} />

          <ArticlePagePremise
            comparisonConditions={[
              "借入額100万円・年利15%（月利は年利÷12のシンプルな考え方）",
              "完済までの回数は36回（約3年）でそろえる",
              "元利均等返済と元金均等返済を比較する",
            ]}
            reasonForConditions="初回の負担差をはっきり見せるため、期間を同じにしたうえで、代表的な2方式を並べています。"
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
              「元金均等返済にしたら、最初の返済だけ金額が高かった」——そんな経験をした方は少なくありません。一方で元利均等返済では、毎月の支払い総額が一定に近い形で推移しやすいです。
            </p>
            <p>
              この記事では、
              <strong className="font-semibold text-stone-900">なぜ元金均等返済の初回（返済初期）の支払いが重くなりやすいのか</strong>
              を、利息の計算と「毎月いくら元本を返すか」の決め方から整理します。
            </p>

            <section id="conclusion">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">
                結論｜初回が高いのは「残高が最大の月に元本をたくさん返す」から
              </h2>
              <p className="mt-3">
                元金均等返済は、返済期間で割った<strong className="font-semibold text-stone-900">元本を毎月ほぼ同じ額</strong>
                返していく方式です。最初の月は借入残高がいちばん大きいので、その残高に対する<strong className="font-semibold text-stone-900">利息もいちばん大きく</strong>
                なります。
              </p>
              <p className="mt-3">
                その結果、初月の支払いは「大きな残高に対する利息」＋「元本返済分」となり、元利均等返済（毎月の支払い総額を平準化する考え方）と比べると、
                <strong className="font-semibold text-stone-900">返済初期の一回あたりの支払いが高く出やすい</strong>、という整理になります。
              </p>
            </section>

            <section id="compare">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">元利均等と元金均等の仕組みの違い</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                <li>
                  <strong className="font-semibold text-stone-900">元利均等返済</strong>
                  ：毎月の返済額（元本＋利息の合計）を平準化しやすいように設計される方式。返済初期は利息の占める割合が大きく、後半にかけて元本返済の割合が増えていきます。
                </li>
                <li>
                  <strong className="font-semibold text-stone-900">元金均等返済</strong>
                  ：元本を期間で割った額を毎月返し、利息はその時点の残高に対して計算する方式。元本部分は毎月ほぼ一定ですが、利息は残高減少に伴い下がっていきます。
                </li>
              </ul>
              <p className="mt-3">
                ポイントは、元金均等では<strong className="font-semibold text-stone-900">「元本を早い段階でしっかり減らす」</strong>
                方向になりやすい一方、
                <strong className="font-semibold text-stone-900">残高が大きい月ほど利息が重い</strong>ため、初月の支払い総額が膨らみやすいことです。
              </p>
            </section>

            <section id="numbers">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">数値例｜100万円・年利15%・36回返済</h2>
              <p className="mt-3">
                月利を年利15%÷12＝1.25%として試算すると、元利均等返済の毎月返済額はおおよそ
                <strong className="font-semibold text-stone-900"> 34,665円</strong>
                （36回一定のイメージ）です。
              </p>
              <p className="mt-3">
                一方、元金均等返済では元本を36等分し、毎月約
                <strong className="font-semibold text-stone-900">27,778円</strong>
                を元本として返します。初月の利息は残高100万円に対して約
                <strong className="font-semibold text-stone-900">12,500円</strong>
                なので、初回の支払い総額はおよそ
                <strong className="font-semibold text-stone-900"> 40,278円</strong>
                となり、元利均等の初月より<strong className="font-semibold text-stone-900">約5,600円高い</strong>イメージになります。
              </p>
              <p className="mt-3">
                最終回付近では残差が小さくなるため、元金均等返済の支払い総額は下がっていき、最終回はおよそ
                <strong className="font-semibold text-stone-900"> 28,125円</strong>
                程度まで下がるイメージです（概算）。
              </p>

              <div className="mt-6 overflow-x-auto rounded-lg border border-stone-200">
                <table className="min-w-[280px] w-full text-sm">
                  <caption className="sr-only">元利均等と元金均等の初回・最終回の目安</caption>
                  <thead className="bg-stone-50 text-left">
                    <tr>
                      <th scope="col" className="px-3 py-2 font-semibold text-stone-900">
                        方式
                      </th>
                      <th scope="col" className="px-3 py-2 font-semibold text-stone-900">
                        初回の支払い総額（目安）
                      </th>
                      <th scope="col" className="px-3 py-2 font-semibold text-stone-900">
                        備考
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    <tr>
                      <td className="px-3 py-2">元利均等返済</td>
                      <td className="px-3 py-2">約34,665円（36回とも同額のイメージ）</td>
                      <td className="px-3 py-2">毎月の負担が平らになりやすい</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">元金均等返済</td>
                      <td className="px-3 py-2">約40,278円</td>
                      <td className="px-3 py-2">初月は高く、後半にかけて下がる</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section id="reading-points">
              <ArticleReadingPoints
                title="読みどころ整理"
                points={[
                  {
                    label: "初回が重いのは「残高×金利」が最大だから",
                    body: "元金均等は毎月の元本返済額をそろえるため、最初の月は利息も最大になり、支払い総額が膨らみやすいです。",
                  },
                  {
                    label: "総利息と毎月負担はトレードオフになりやすい",
                    body: "同じ期間で完済する前提では、元金均等は総利息を抑えやすい一方、返済初期のキャッシュ負担は重くなりやすい傾向があります。",
                  },
                  {
                    label: "契約条件が最優先",
                    body: "端数処理・日割り・手数料などで表示は変わるため、記事の数値は目安として、契約と明細で確認してください。",
                  },
                ]}
              />
            </section>

            <section id="simulator">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">自分の条件で比較するならシミュレーター</h2>
              <p className="mt-3">
                返済方式の違いは、金額・金利・期間が変わると印象も変わります。本サイトの
                <Link href="/simulator/cardloan" className="font-bold text-stone-900 hover:underline">
                  借入返済シミュレーター
                </Link>
                では、元利均等・元金均等などの前提で毎月の支払いや利息のイメージを比較できます。
              </p>
              <p className="mt-3">
                あわせて
                <Link href="/articles/repayment-method-difference" className="font-bold text-stone-900 hover:underline">
                  4つの返済方式の比較記事
                </Link>
                も参照してください。
              </p>
            </section>

            <section id="notice">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">注意点</h2>
              <p className="mt-3">
                本記事は教育・整理を目的とした概算です。実際の借入では、金利の種類（固定・変動）、手数料、遅延損害金、ボーナス併用、繰り上げ返済の取り扱いなどで結果が変わります。
              </p>
              <p className="mt-3">重要な判断は契約書・貸金業者の説明・必要に応じて専門家の助言を優先してください。</p>
            </section>

            <section id="faq">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">よくある質問</h2>
              <div className="mt-4 space-y-6">
                {faqItems.map((f) => (
                  <div key={f.question}>
                    <h3 className="text-base font-semibold text-stone-900">{f.question}</h3>
                    <p className="mt-2">{f.answer}</p>
                  </div>
                ))}
              </div>
            </section>

            <section id="summary">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">まとめ</h2>
              <p className="mt-3">
                元金均等返済で初回の返済額が高くなりやすいのは、
                <strong className="font-semibold text-stone-900">借入直後は残高が最大で、その月の利息負担も最大だから</strong>
                です。元本を毎月ほぼ均等に返す設計と相まって、初月の「元本＋利息」の合計が、元利均等返済の初月より大きく出やすい、という理解ができます。
              </p>
              <p className="mt-3">
                総利息の抑え方と、毎月の負担の平準化はトレードオフになりやすいので、
                <Link href="/simulator/cardloan" className="font-bold text-stone-900 hover:underline">
                  シミュレーター
                </Link>
                で自分の条件を試すと判断材料が増えます。
              </p>
            </section>
          </ArticleProse>

          <ArticleEditorMemo
            purpose="「元金均等は初回だけ高い」という体感を、残高・利息・元本の返し方の関係で説明すること"
            reasonAxis="元利均等と同じ期間（36回）で並べ、初回の支払い総額の差を数値で見せる。"
            memo="元金均等で初回返済が高くなる理由を扱う短めの解説記事。"
          />

          <ArticleFooter articleSlug={SLUG} />
        </div>
      </ArticlePageShell>
    </>
  );
}
