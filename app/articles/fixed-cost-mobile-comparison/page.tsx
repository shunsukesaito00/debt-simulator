import type { Metadata } from "next";
import Link from "next/link";
import { ArticleFooter } from "@/app/components/ArticleFooter";
import { ArticlePagePremise, ArticleReadingPoints, ArticleEditorMemo } from "@/app/components/article";
import { getArticleBreadcrumbJsonLd, getArticleFaqJsonLd } from "@/lib/article-structured-data";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://debt-simulator-quzc.vercel.app";
const ARTICLE_URL = `${BASE}/articles/fixed-cost-mobile-comparison`;
const ARTICLE_TITLE = "スマホ料金プラン見直しの考え方｜格安プランに変えるとどれくらい変わる？";

export const metadata: Metadata = {
  title: ARTICLE_TITLE,
  description:
    "スマホ・通信費の見直しで、格安プランへの乗り換えやデータ量・オプションの見直しでどれくらい変わるかを整理します。固定費チェックリストの「通信費」を深掘りする記事です。",
  alternates: { canonical: ARTICLE_URL },
  openGraph: {
    title: ARTICLE_TITLE,
    description:
      "スマホ・通信費の見直しで、格安プランへの乗り換えやデータ量・オプションの見直しでどれくらい変わるかを整理します。",
    url: ARTICLE_URL,
    type: "article",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: ARTICLE_TITLE,
  description:
    "スマホ・通信費の見直しで、格安プランへの乗り換えやデータ量・オプションの見直しでどれくらい変わるかを整理します。",
  url: ARTICLE_URL,
  datePublished: "2025-03-11",
  dateModified: "2025-03-11",
  author: { "@type": "Organization", name: "借入返済シミュレーター" },
  publisher: { "@type": "Organization", name: "借入返済シミュレーター" },
};

const faqItems = [
  {
    question: "格安プランに変えると月いくらくらい変わりますか？",
    answer:
      "契約内容や利用量によりますが、大手キャリアから格安SIM（MVNO）に乗り換えると、月額2,000円〜5,000円程度の削減になるケースが多くあります。データ量を適正化し、使っていないオプションを外すだけでも月1,000円前後の削減になることがあります。",
  },
  {
    question: "格安プランは通信品質が落ちますか？",
    answer:
      "格安プラン（MVNO）は大手キャリアの回線を借りて提供しているため、同じエリアでは基本的に同じ回線を使います。混雑時には大手契約者が優先される場合がありますが、日常利用では体感差が小さいことが多いです。利用エリアや用途に合わせてプランを選ぶとよいです。",
  },
  {
    question: "スマホ料金の見直しは何から確認すべきですか？",
    answer:
      "まずは「データ量」「通話オプション」「機種代金・分割」の3点を確認するのがおすすめです。データをあまり使っていないなら少なめのプランに、通話をほとんどしないなら通話オプションの見直しで削減できることがあります。機種代金の分割残高も含めて月額を把握すると見直しの余地が見えやすくなります。",
  },
  {
    question: "家族でまとめて見直すメリットはありますか？",
    answer:
      "家族プランやセット割にすると、1回線あたりの単価が下がることがあります。また、格安プランでも家族割や複数回線割引を用意している場合があるので、まとめて見直すと総額でかなり変わるケースがあります。",
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
  { id: "premise", label: "このページの前提" },
  { id: "conclusion", label: "結論｜スマホ料金は見直しの効果が出やすい" },
  { id: "reading-points", label: "読み方のポイント" },
  { id: "what-to-check", label: "何を確認するか" },
  { id: "rough-amount", label: "どれくらい変わるか（目安）" },
  { id: "editor-memo", label: "編集メモ" },
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

      <article className="mx-auto max-w-3xl">
        <nav className="mb-4 text-sm text-gray-600" aria-label="パンくず">
          <ol className="flex flex-wrap items-center gap-1">
            <li><Link href="/" className="hover:underline">トップ</Link></li>
            <li aria-hidden>/</li>
            <li><Link href="/articles" className="hover:underline">知っておきたいこと</Link></li>
            <li aria-hidden>/</li>
            <li className="font-bold text-gray-900" aria-current="page">{ARTICLE_TITLE}</li>
          </ol>
        </nav>

        <div className="ds-card ds-card-pad">
          <h1 className="text-2xl font-black text-gray-900 md:text-3xl">{ARTICLE_TITLE}</h1>

          <p className="mt-4 text-sm text-gray-600 leading-relaxed">
            スマホ料金は固定費のなかでも「見直しの効果が出やすく、一度変えれば継続しやすい」項目の一つです。格安プランへの乗り換えや、データ量・オプションの見直しで、月々どれくらい変わる可能性があるかを整理します。
          </p>

          <section id="premise" className="mt-6">
            <ArticlePagePremise
              comparisonConditions={[
                "スマホ・通信費を「大手キャリア vs 格安プラン」「データ量・オプションの適正化」の観点で考える",
                "実際の削減額は契約内容・利用量・家族割の有無などで異なるため、あくまで目安として記載している",
              ]}
              reasonForConditions="読者が「自分も見直せるか」を判断する材料にしてもらうためです。具体的な料金はキャリア・プランにより変わるため、考え方と確認ポイントを中心に解説しています。"
            />
          </section>

          <section className="mt-6 ds-subcard p-4">
            <h2 className="text-sm font-black text-gray-900">目次</h2>
            <ul className="mt-2 space-y-1.5 text-sm">
              {tocItems.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className="text-gray-700 hover:underline">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <div className="mt-8 space-y-10 text-sm text-gray-700 leading-relaxed">
            <section id="conclusion">
              <h2 className="text-lg font-black text-gray-900 md:text-xl">
                結論｜スマホ料金は見直しの効果が出やすい
              </h2>
              <p className="mt-3">
                結論として、スマホ料金は<strong>固定費のなかでも見直しの効果が出やすく、一度見直すと毎月の負担が続けて減る</strong>分野です。大手キャリアから格安プラン（MVNO）への乗り換え、データ量や通話オプションの見直し、使っていないオプションの解約などで、月額が数千円単位で変わるケースも少なくありません。
              </p>
            </section>

            <section id="reading-points">
              <ArticleReadingPoints
                points={[
                  {
                    label: "データ量は「実際の使用量」で選ぶ",
                    body: "「多めが安心」で大きいプランにしていると、使っていない分だけ月額が高くなります。直近の利用量を確認し、適正なプランにすると削減できることがあります。",
                  },
                  {
                    label: "通話オプションを見直す",
                    body: "通話をほとんどしないなら、通話定額オプションを外すだけで月額が下がることがあります。かけたいときだけ従量で支払う形にすると、トータルで安くなる場合があります。",
                  },
                  {
                    label: "機種代金・分割残高を把握する",
                    body: "月額には「通信料」と「機種代金の分割」が含まれることがあります。分割残高が残っている間は月額が高く見えるので、いつまでいくらかかるかを確認すると、見直しのタイミングが判断しやすくなります。",
                  },
                ]}
                misconceptions={[
                  "「格安は品質が悪い」と思いがちですが、多くの格安プランは大手の回線を利用しており、日常利用では体感差が小さいことが多いです。",
                  "「今の契約を変えるのは面倒」と感じがちですが、MNP（番号そのまま乗り換え）やオンライン手続きで、比較的スムーズに乗り換えられるケースが増えています。",
                ]}
              />
            </section>

            <section id="what-to-check">
              <h2 className="text-lg font-black text-gray-900 md:text-xl">何を確認するか</h2>
              <ul className="mt-3 list-disc pl-5 space-y-1">
                <li>現在の月額（通信料＋オプション＋機種代金の合計）</li>
                <li>データの月間使用量（設定アプリや請求書で確認）</li>
                <li>通話の利用頻度（定額オプションが必要か）</li>
                <li>家族割・セット割の有無（変更で変わるか）</li>
              </ul>
              <p className="mt-3">
                固定費全体の見直し順番としては、
                <Link href="/articles/fixed-cost-checklist" className="font-bold text-gray-900 hover:underline">固定費見直しチェックリスト</Link>
                では「サブスクの次に通信費」を推奨しています。手続きはサブスクより少し手間ですが、一度見直すと効果が続きやすいです。
              </p>
            </section>

            <section id="rough-amount">
              <h2 className="text-lg font-black text-gray-900 md:text-xl">どれくらい変わるか（目安）</h2>
              <p className="mt-3">
                大手キャリアの単体プランから格安プランに乗り換えた場合、月額2,000円〜5,000円程度の削減になることが多いです。データ量を適正化したり、通話オプションを外したりするだけでも、月1,000円前後の削減になるケースがあります。月3,000円の削減なら1年で36,000円なので、継続すると差は大きくなります。
              </p>
              <p className="mt-3">
                削減額を「1年・3年・5年でいくらになるか」で確認したい場合は、
                <Link href="/tools/fixed-cost-impact" className="font-bold text-gray-900 hover:underline">固定費削減インパクト計算</Link>
                で試算できます。
              </p>
              <div className="mt-6 ds-subcard p-6">
                <h3 className="text-base font-black text-gray-900">固定費削減インパクトを計算する</h3>
                <p className="mt-2 text-sm text-gray-700">
                  毎月の削減額を続けたとき、1年・3年・5年で合計いくらになるかをすぐ確認できます。
                </p>
                <Link
                  href="/tools/fixed-cost-impact"
                  className="ds-btn ds-btn-primary mt-4"
                >
                  固定費削減インパクトを計算する →
                </Link>
              </div>
            </section>

            <section id="editor-memo">
              <ArticleEditorMemo
                purpose="固定費チェックリストの「スマホ・通信費」を深掘りし、何を確認すればよいか・どれくらい変わる可能性があるかを判断材料として伝えることを目的にしています。"
                reasonAxis="具体的なキャリア名・プラン名は変動が大きいため、考え方と確認ポイントに絞っています。実際の料金比較は各社サイトや比較サービスで確認するのが確実です。"
                memo="格安プランへの乗り換えは、機種の縛りやMNP手続きのタイミングに注意が必要です。解約金がかかる場合は、解約金と削減額を比較してから判断するのがおすすめです。"
              />
            </section>

            <section id="faq">
              <h2 className="text-lg font-black text-gray-900 md:text-xl">よくある質問</h2>
              <dl className="mt-4 space-y-4">
                {faqItems.map((item, i) => (
                  <div key={i}>
                    <dt className="font-bold text-gray-900">{item.question}</dt>
                    <dd className="mt-1 text-gray-700">{item.answer}</dd>
                  </div>
                ))}
              </dl>
            </section>

            <section id="summary">
              <h2 className="text-lg font-black text-gray-900 md:text-xl">まとめ</h2>
              <ul className="mt-3 list-disc pl-5 space-y-1">
                <li>スマホ料金は固定費のなかでも<strong>見直しの効果が出やすく、継続しやすい</strong>項目です。</li>
                <li>データ量・通話オプションの適正化、格安プランへの乗り換えで、月額が数千円単位で変わるケースがあります。</li>
                <li>削減額の目安は契約内容により異なります。1年・3年・5年での効果は
                  <Link href="/tools/fixed-cost-impact" className="font-bold text-gray-900 hover:underline">固定費削減インパクト計算</Link>
                  で確認できます。
                </li>
                <li>固定費全体の見直し順や他の項目は
                  <Link href="/articles/fixed-cost-checklist" className="font-bold text-gray-900 hover:underline">固定費見直しチェックリスト</Link>
                  を参照してください。
                </li>
              </ul>
            </section>
          </div>

          <ArticleFooter articleSlug="fixed-cost-mobile-comparison" />
        </div>
      </article>
    </>
  );
}
