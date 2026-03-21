import type { Metadata } from "next";
import Link from "next/link";
import { ArticleFooter } from "@/app/components/ArticleFooter";
import { ArticlePagePremise, ArticleReadingPoints, ArticleEditorMemo } from "@/app/components/article";
import { getArticleBreadcrumbJsonLd, getArticleFaqJsonLd } from "@/lib/article-structured-data";
import { ARTICLE_AUTHOR_JSON_LD, ARTICLE_PUBLISHER_JSON_LD } from "@/lib/site-author";
import { ArticlePageShell } from "@/app/components/ArticlePageShell";
import { articleUsesWideLayout } from "@/lib/article-layout";


const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://debt-simulator-quzc.vercel.app";
const ARTICLE_URL = `${BASE}/articles/borrow-500-monthly-payment`;
const ARTICLE_TITLE =
  "借金500万円の月々返済はいくら？年利15%で比較";

export const metadata: Metadata = {
  title: ARTICLE_TITLE,
  description:
    "借金500万円を年利15%で借りた場合、3年・5年・7年で月々の返済額と総利息がどう変わるかを整理します。",
  alternates: { canonical: ARTICLE_URL },
  openGraph: {
    title: ARTICLE_TITLE,
    description:
      "借金500万円を年利15%で借りた場合、3年・5年・7年で月々の返済額と総利息がどう変わるかを整理します。",
    url: ARTICLE_URL,
    type: "article",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: ARTICLE_TITLE,
  description:
    "借金500万円を年利15%で借りた場合、3年・5年・7年で月々の返済額と総利息がどう変わるかを整理します。",
  url: ARTICLE_URL,
  datePublished: "2026-03-16",
  dateModified: "2026-03-16",
  author: ARTICLE_AUTHOR_JSON_LD,
  publisher: ARTICLE_PUBLISHER_JSON_LD,
};

const faqItems = [
  {
    question: "借金500万円の月々返済額はいくらですか？",
    answer:
      "年利15%の場合、3年返済で約173,300円、5年返済で約118,950円、7年返済で約97,520円です。返済期間が長いほど月々の負担は減りますが、総利息は増えます。",
  },
  {
    question: "借金500万円の総利息はいくらになりますか？",
    answer:
      "年利15%の場合、3年返済で約123.9万円、5年返済で約213.7万円、7年返済で約319.2万円です。7年返済では元金の6割以上が利息になります。",
  },
  {
    question: "借金500万円を無理なく返すにはどうすればよいですか？",
    answer:
      "手取り収入の3分の1以下に月々返済額を収めるのが目安です。月17万円以上の返済が必要な3年返済は手取り50万円以上が必要になるため、5年・7年も含めて現実的な返済期間を検討しましょう。",
  },
  {
    question: "500万円の借金は返済可能ですか？",
    answer:
      "収入と支出のバランスによります。年利15%・5年返済で月々約11.9万円が必要です。手取り月収35万円以上あれば生活費を確保しながら返済できる計算ですが、余裕を持った計画が重要です。",
  },
  {
    question: "借金500万円と300万円では返済負担はどのくらい違いますか？",
    answer:
      "年利15%・5年返済の場合、300万円の月々返済は約71,370円、500万円は約118,950円で、差額は約47,580円です。総利息も300万円の約128万円に対し500万円は約214万円と大幅に増えます。",
  },
];

const breadcrumbJsonLd = getArticleBreadcrumbJsonLd(ARTICLE_URL, ARTICLE_TITLE);
const faqJsonLd = getArticleFaqJsonLd(faqItems);

const tocItems = [
  { id: "premise", label: "この記事の前提" },
  { id: "conclusion", label: "結論：500万円の月々返済額の目安" },
  { id: "reason", label: "なぜ500万円の返済は負担が大きいのか" },
  { id: "3years", label: "3年返済の場合の負担" },
  { id: "5years", label: "5年返済の場合の負担" },
  { id: "7years", label: "7年返済の場合の負担" },
  { id: "reading-points", label: "読みどころ整理" },
  { id: "compare-table", label: "3年・5年・7年の返済額と総利息の比較表" },
  { id: "judge", label: "借金500万円を返済するための判断ポイント" },
  { id: "category", label: "借入額別カテゴリ：500万円の位置づけ" },
  { id: "reverse", label: "逆算でも考えてみる" },
  { id: "simulator", label: "シミュレーターで自分の条件を試す" },
  { id: "editor-memo", label: "編集メモ" },
  { id: "notice", label: "注意" },
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

      
      <ArticlePageShell currentPageTitle={ARTICLE_TITLE} wide={articleUsesWideLayout("borrow-500-monthly-payment")}>
<div className="ds-card ds-card-pad">
          <h1 className="text-2xl font-semibold text-stone-900 md:text-3xl">{ARTICLE_TITLE}</h1>
          <p className="mt-4 text-sm text-stone-600 leading-relaxed">
            借金が500万円になると、月々の返済額は大きく、返済計画を慎重に考える必要があります。
          </p>

          <section id="premise" className="mt-6">
            <ArticlePagePremise
              comparisonConditions={[
                "借入500万円・年利15%・元利均等返済で統一して比較",
                "3年（36回）・5年（60回）・7年（84回）の3パターンで比較",
                "月々返済額・総支払額・総利息をそれぞれ算出",
              ]}
              reasonForConditions="年利15%はカードローンの代表的な金利帯です。500万円は高額借入のため、返済期間による月々の負担と総利息の差が非常に大きくなります。3年・5年・7年の比較で現実的な返済計画を検討できるよう整理しました。"
            />
          </section>

          <section className="mt-6 ds-subcard p-4">
            <h2 className="text-sm font-semibold text-stone-900">目次</h2>
            <ul className="mt-2 space-y-1.5 text-sm">
              {tocItems.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className="text-stone-700 hover:underline">{item.label}</a>
                </li>
              ))}
            </ul>
          </section>

          <div className="mt-8 space-y-10 text-sm text-stone-700 leading-relaxed">
            <p>
              借金500万円の返済は、毎月の負担が大きく、返済期間の選び方で生活への影響が大きく変わります。返済期間を短くすれば利息は抑えられますが月々の支払いが重くなり、長くすれば月々は楽になるものの利息が大幅に増えます。
            </p>
            <p>
              この記事では、500万円を年利15%で借りた場合の月々返済額・総利息を、3年・5年・7年の3パターンで比較します。自分の条件で試算したい場合は
              <Link href="/simulator/cardloan" className="font-bold text-stone-900 hover:underline">シミュレーター</Link>
              をご利用ください。
            </p>

            <section id="conclusion">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">結論：500万円の月々返済額の目安</h2>
              <p className="mt-3">
                先に結論です。500万円を年利15%で借りた場合、3年返済なら月々約173,300円、5年返済なら月々約118,950円、7年返済なら月々約97,520円です。総利息は3年で約123.9万円、5年で約213.7万円、7年で約319.2万円になります。
              </p>
              <p className="mt-3">
                月々の返済額を抑えようと7年返済を選ぶと、総利息は元金の6割以上に達します。どの期間を選ぶかは、月々の返済余力と利息負担のバランスで判断する必要があります。
              </p>
            </section>

            <section id="reason">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">なぜ500万円の返済は負担が大きいのか</h2>
              <p className="mt-3">
                借入額が大きくなるほど、毎月発生する利息も大きくなります。500万円を年利15%で借りると、初月の利息だけで約62,500円になります。
              </p>
              <p className="mt-3">
                返済初期は支払いの多くが利息に充てられるため、元金がなかなか減りません。返済期間が長いほどこの状態が続き、総利息が膨らみます。
              </p>
            </section>

            <section id="3years">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">3年返済の場合の負担</h2>
              <p className="mt-3">
                借入500万円・年利15%・3年返済の場合、月々返済額は約173,300円、総利息は約1,238,800円です。
              </p>
              <p className="mt-3">
                月17万円以上の返済は、手取り収入が50万円以上なければ生活費を圧迫します。ただし3年返済は総利息を最も抑えられるため、収入に余裕がある場合は最も合理的な選択肢です。
              </p>
            </section>

            <section id="5years">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">5年返済の場合の負担</h2>
              <p className="mt-3">
                借入500万円・年利15%・5年返済の場合、月々返済額は約118,950円、総利息は約2,137,000円です。
              </p>
              <p className="mt-3">
                3年返済に比べて月々の負担は約5.4万円軽くなりますが、総利息は約90万円増えます。手取り35万円前後であれば、5年返済が現実的な選択肢の一つになります。
              </p>
            </section>

            <section id="7years">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">7年返済の場合の負担</h2>
              <p className="mt-3">
                借入500万円・年利15%・7年返済の場合、月々返済額は約97,520円、総利息は約3,191,680円です。
              </p>
              <p className="mt-3">
                月々の支払いは10万円を切りますが、総利息は約319万円と元金500万円の6割以上になります。7年間の長期返済は利息負担が非常に大きいため、余裕ができたタイミングで繰り上げ返済を検討することが重要です。
              </p>
            </section>

            <section id="reading-points">
              <ArticleReadingPoints
                points={[
                  {
                    label: "返済期間で月々負担が大きく変わる",
                    body: "3年なら月17.3万円、7年なら月9.8万円と、返済期間の選び方で月々約7.6万円の差が生まれます。",
                  },
                  {
                    label: "長期返済は利息が膨らみやすい",
                    body: "3年の総利息が約124万円に対し、7年では約319万円。返済期間を4年延ばすだけで利息が約195万円増えます。",
                  },
                  {
                    label: "生活費とのバランスが重要",
                    body: "500万円は高額借入のため、月々の返済額が手取りに対して大きくなりがちです。無理のない範囲で返済期間を設定し、余裕があれば繰り上げ返済を活用しましょう。",
                  },
                ]}
                misconceptions={[
                  "「7年にすれば月10万円以下で楽」と考えがちですが、総利息は元金の6割以上になり、トータル約819万円を支払うことになります。",
                  "「3年と7年で利息はそこまで変わらない」は誤解です。総利息は約124万円と約319万円で、195万円もの差があります。",
                ]}
              />
            </section>

            <section id="compare-table">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">3年・5年・7年の返済額と総利息の比較表</h2>
              <p className="mt-3">3つの返済期間を並べて比較します。</p>
              <div className="mt-6 overflow-x-auto">
                <table className="w-full min-w-[520px] border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b-2 border-stone-200">
                      <th className="py-3 pr-4 font-semibold text-stone-900">返済期間</th>
                      <th className="py-3 pr-4 font-semibold text-stone-900">月々返済額</th>
                      <th className="py-3 pr-4 font-semibold text-stone-900">返済回数</th>
                      <th className="py-3 pr-4 font-semibold text-stone-900">総支払額</th>
                      <th className="py-3 pr-4 font-semibold text-stone-900">総利息</th>
                      <th className="py-3 font-semibold text-stone-900">備考</th>
                    </tr>
                  </thead>
                  <tbody className="text-stone-700">
                    <tr className="border-b border-stone-200">
                      <td className="py-3 pr-4">3年返済</td>
                      <td className="py-3 pr-4">約173,300円</td>
                      <td className="py-3 pr-4">36回</td>
                      <td className="py-3 pr-4">約6,238,800円</td>
                      <td className="py-3 pr-4">約1,238,800円</td>
                      <td className="py-3 text-xs">利息を最も抑えられるが月々負担大</td>
                    </tr>
                    <tr className="border-b border-stone-200">
                      <td className="py-3 pr-4">5年返済</td>
                      <td className="py-3 pr-4">約118,950円</td>
                      <td className="py-3 pr-4">60回</td>
                      <td className="py-3 pr-4">約7,137,000円</td>
                      <td className="py-3 pr-4">約2,137,000円</td>
                      <td className="py-3 text-xs">バランス型</td>
                    </tr>
                    <tr className="border-b border-stone-200">
                      <td className="py-3 pr-4">7年返済</td>
                      <td className="py-3 pr-4">約97,520円</td>
                      <td className="py-3 pr-4">84回</td>
                      <td className="py-3 pr-4">約8,191,680円</td>
                      <td className="py-3 pr-4">約3,191,680円</td>
                      <td className="py-3 text-xs">月々は楽だが利息が元金の6割超</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section id="judge">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">借金500万円を返済するための判断ポイント</h2>
              <p className="mt-3">
                500万円の返済では、月々の返済額が手取り収入の3分の1以下に収まるかが一つの目安です。3年返済は月17.3万円なので手取り52万円以上、5年返済は月11.9万円なので手取り36万円以上が必要な計算になります。
              </p>
              <p className="mt-3">
                返済期間を長くすることで月々の負担は減りますが、その分だけ利息が増えていきます。まずは5年程度で試算し、月々の返済が厳しければ7年に延ばしつつ、繰り上げ返済で利息を減らすことを検討するのが現実的です。
              </p>
            </section>

            <section id="category">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">借入額別カテゴリ：500万円の位置づけ</h2>
              <p className="mt-3">
                100万円・200万円・300万円との比較は、
                <Link href="/articles/loan-amount-guide" className="font-bold text-stone-900 hover:underline">借入額別に見る返済負担の違い｜100万・200万・300万で比較</Link>
                をご覧ください。
              </p>
              <p className="mt-3">
                300万円の返済については
                <Link href="/articles/borrow-300-monthly-payment" className="font-bold text-stone-900 hover:underline">借金300万円の月々返済はいくら？年利15%で3年・5年・月5万円返済を比較</Link>
                で詳しく解説しています。500万円は300万円と比べて月々の返済額・総利息ともに約1.67倍になるため、より慎重な返済計画が求められます。
              </p>
            </section>

            <section id="reverse">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">逆算でも考えてみる</h2>
              <p className="mt-3">
                「500万円を借りたらいくらか」ではなく「毎月いくら返せるか」から逆算する方法もあります。
              </p>
              <p className="mt-3">
                <Link href="/articles/loan-amount-guide" className="font-bold text-stone-900 hover:underline">借入額別の返済負担の違い</Link>
                や
                <Link href="/articles/monthly-50000-how-much-can-borrow" className="font-bold text-stone-900 hover:underline">月5万円ならいくらまで借りられるか</Link>
                も合わせてご確認ください。
              </p>
            </section>

            <section id="simulator">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">シミュレーターで自分の条件を試す</h2>
              <p className="mt-3">
                この記事では500万円・年利15%という条件で比較しましたが、実際の金利や返済条件は人によって異なります。自分の条件で試算したい場合はシミュレーターをご利用ください。
              </p>
              <p className="mt-3">
                借入額・金利・返済期間を入力するだけで、月々返済額・総支払額・総利息をすぐに確認できます。繰り上げ返済の効果も試算できます。
              </p>
              <div className="mt-6">
                <Link
                  href="/simulator/cardloan"
                  className="ds-btn ds-btn-primary"
                >
                  借入返済シミュレーターで試す →
                </Link>
              </div>
            </section>

            <section id="editor-memo">
              <ArticleEditorMemo
                purpose="借金500万円の月々返済額と総利息を、返済期間ごとに比較して判断材料を提供すること"
                reasonAxis="3年・5年・7年の3パターンで比較。返済期間を延ばすと月々は楽になるが利息は大幅に増えるという構造を明確にする。"
                memo="500万円は高額借入のため300万円以下の記事より「返済の現実性」と「手取り収入との関係」を意識した構成にしている。"
              />
            </section>

            <section id="notice">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">注意</h2>
              <p className="mt-3">
                本記事の計算結果は、年利15%・元利均等返済を前提とした概算です。実際の返済額は金融機関の条件、手数料、端数処理等によって異なる場合があります。
              </p>
              <p className="mt-3">
                正確な返済計画は、ご利用の金融機関の条件をご確認ください。
              </p>
            </section>

            <section id="faq">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">よくある質問</h2>
              <div className="mt-4 space-y-6">
                <div>
                  <h3 className="text-base font-semibold text-stone-900">借金500万円の月々返済額はいくらですか？</h3>
                  <p className="mt-2">
                    年利15%の場合、3年返済で約173,300円、5年返済で約118,950円、7年返済で約97,520円です。
                  </p>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-stone-900">借金500万円の総利息はいくらですか？</h3>
                  <p className="mt-2">
                    年利15%の場合、3年返済で約123.9万円、5年返済で約213.7万円、7年返済で約319.2万円です。
                  </p>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-stone-900">借金500万円を無理なく返すには？</h3>
                  <p className="mt-2">
                    手取り収入の3分の1以下に月々返済額を収めることが目安です。まず5年で試算し、厳しければ7年に延ばしつつ繰り上げ返済を活用するのが現実的です。
                  </p>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-stone-900">500万円の借金は返済可能ですか？</h3>
                  <p className="mt-2">
                    収入と支出のバランスによります。年利15%・5年返済で月々約11.9万円が必要です。手取り月収35万円以上あれば生活費を確保しながら返済できる計算ですが、余裕を持った計画が重要です。
                  </p>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-stone-900">借金500万円と300万円では返済負担はどのくらい違う？</h3>
                  <p className="mt-2">
                    年利15%・5年返済の場合、300万円は月々約71,370円、500万円は月々約118,950円で、差額は約47,580円です。総利息も300万円の約128万円に対し500万円は約214万円と大幅に増えます。
                  </p>
                </div>
              </div>
            </section>

            <section id="summary">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">まとめ</h2>
              <p className="mt-3">
                借金500万円を年利15%で返済する場合、3年返済なら月々約173,300円・総利息約123.9万円、5年返済なら月々約118,950円・総利息約213.7万円、7年返済なら月々約97,520円・総利息約319.2万円が目安です。
              </p>
              <p className="mt-3">
                500万円は高額借入のため、返済期間の選び方が生活に大きく影響します。自分の収入・支出に合わせた返済計画を立てるために、
                <Link href="/simulator/cardloan" className="font-bold text-stone-900 hover:underline">シミュレーター</Link>
                で試算してみてください。
              </p>
            </section>
          </div>

          <ArticleFooter articleSlug="borrow-500-monthly-payment" />
        </div>
      </ArticlePageShell>
    </>
  );
}
