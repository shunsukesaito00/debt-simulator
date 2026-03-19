import type { Metadata } from "next";
import Link from "next/link";
import { ArticleFooter } from "@/app/components/ArticleFooter";
import { ArticlePagePremise, ArticleReadingPoints, ArticleEditorMemo } from "@/app/components/article";
import { getArticleBreadcrumbJsonLd, getArticleFaqJsonLd } from "@/lib/article-structured-data";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://debt-simulator-quzc.vercel.app";
const ARTICLE_URL = `${BASE}/articles/fixed-cost-utility-switch`;
const ARTICLE_TITLE = "電気・ガス乗り換えの効果は？契約見直しで月いくら変わるか";

export const metadata: Metadata = {
  title: ARTICLE_TITLE,
  description:
    "電気・ガスなどの光熱系契約を見直すと、月々の支払いがどれくらい変わる可能性があるかを整理します。乗り換えやプラン変更の判断材料に。",
  alternates: { canonical: ARTICLE_URL },
  openGraph: {
    title: ARTICLE_TITLE,
    description:
      "電気・ガスなどの光熱系契約を見直すと、月々の支払いがどれくらい変わる可能性があるかを整理します。",
    url: ARTICLE_URL,
    type: "article",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: ARTICLE_TITLE,
  description:
    "電気・ガスなどの光熱系契約を見直すと、月々の支払いがどれくらい変わる可能性があるかを整理します。",
  url: ARTICLE_URL,
  datePublished: "2025-03-11",
  dateModified: "2025-03-11",
  author: { "@type": "Organization", name: "借入返済シミュレーター" },
  publisher: { "@type": "Organization", name: "借入返済シミュレーター" },
};

const faqItems = [
  {
    question: "電気・ガスの乗り換えで月いくらくらい変わることがありますか？",
    answer:
      "使用量・地域・契約プランによりますが、現在の契約から最安プランや割引の多いプランに乗り換えると、月額で数百円〜2,000円程度の差が出るケースがあります。電気とガスをセットで見直すと、セット割引でさらに安くなる場合もあります。",
  },
  {
    question: "乗り換えは面倒ではありませんか？",
    answer:
      "電気・ガスは「切り替え」を申し込むと、供給停止なしで業者が変わる仕組みです。申込はWebや電話ででき、工事が不要な場合がほとんどです。ただし、契約期間の縛りや違約金がある場合は、解約時期を確認してから手続きするのがおすすめです。",
  },
  {
    question: "何を比較すればよいですか？",
    answer:
      "現在の契約の「基本料金」「従量単価」「割引の有無」「契約期間」を把握し、他社・他プランと比較します。使用量によってお得なプランが変わるので、自分の直近の使用量（kWh・m³）を元にシミュレーションできる比較サイトや各社の試算ツールを使うとわかりやすいです。",
  },
  {
    question: "電気だけ、ガスだけの見直しでも効果はありますか？",
    answer:
      "はい。電気だけ、ガスだけの見直しでも、月数百円〜千円程度の差が出ることはあります。両方見直すと効果がまとまって大きくなり、セット割引が使える場合もあります。",
  },
  {
    question: "固定費全体の削減効果を試算したいです。",
    answer:
      "光熱費だけでなく、通信費・サブスクなども含めた「月いくら削減したら1年・3年・5年でいくらになるか」は、当サイトの固定費削減インパクト計算で試算できます。光熱費で浮いた金額を入力すると、継続したときの効果を確認できます。",
  },
];

const breadcrumbJsonLd = getArticleBreadcrumbJsonLd(ARTICLE_URL, ARTICLE_TITLE);
const faqJsonLd = getArticleFaqJsonLd(faqItems);

const tocItems = [
  { id: "premise", label: "このページの前提" },
  { id: "conclusion", label: "結論｜一度見直すと効果が続きやすい" },
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
            電気・ガスなどの光熱費は、契約を見直すと月々の支払いが変わる可能性があります。乗り換えやプラン変更でどれくらい変わるか、何を確認すればよいかを整理します。
          </p>

          <section id="premise" className="mt-6">
            <ArticlePagePremise
              comparisonConditions={[
                "電気・ガスを「現在の契約内容」「他社・他プランとの比較」「乗り換えの手間と効果」の観点で考える",
                "実際の料金は地域・使用量・契約内容により異なるため、考え方と目安を中心に記載している",
              ]}
              reasonForConditions="読者が「自分も見直せるか」を判断する材料にしてもらうためです。具体的な料金は各社・各プランで異なるため、比較の進め方と確認ポイントを解説しています。"
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
                結論｜一度見直すと効果が続きやすい
              </h2>
              <p className="mt-3">
                電気・ガスは<strong>一度契約を見直すと、毎月の支払いが続けて変わる</strong>分野です。乗り換えは供給停止なしで申込だけで完了することが多く、契約期間の縛りにさえ注意すれば、比較的スムーズに変更できます。固定費見直しのなかでは、
                <Link href="/articles/fixed-cost-checklist" className="font-bold text-gray-900 hover:underline">固定費見直しチェックリスト</Link>
                ではサブスク・通信費・保険の次に「電気・ガス」を推奨しています。
              </p>
            </section>

            <section id="reading-points">
              <ArticleReadingPoints
                points={[
                  {
                    label: "現在の契約内容を把握する",
                    body: "基本料金・従量単価・割引の有無・契約期間を確認すると、他社と比較しやすくなります。請求書やWebの利用明細で確認できます。",
                  },
                  {
                    label: "使用量ベースで比較する",
                    body: "使用量によってお得なプランが変わるため、直近の使用量（kWh・m³）を元にシミュレーションすると、自分に合ったプランが選びやすくなります。",
                  },
                  {
                    label: "契約期間の縛りを確認する",
                    body: "違約金や解約料がかかる期間がある場合は、解約時期を考慮してから乗り換えを検討すると、トータルでお得になるか判断しやすくなります。",
                  },
                ]}
                misconceptions={[
                  "「乗り換えると停まるのでは」と思いがちですが、電気・ガスは切り替え申込で供給が止まらずに業者が変わる仕組みです。",
                  "「光熱費の差は小さい」と感じがちですが、月数百円〜千円程度の差が1年続くと数千円〜数万円の差になり、固定費削減の積み重ねになります。",
                ]}
              />
            </section>

            <section id="what-to-check">
              <h2 className="text-lg font-black text-gray-900 md:text-xl">何を確認するか</h2>
              <ul className="mt-3 list-disc pl-5 space-y-1">
                <li>現在の基本料金・従量単価・割引の有無</li>
                <li>直近の使用量（電気はkWh、ガスはm³）</li>
                <li>契約期間の縛り・違約金の有無</li>
                <li>電気とガスをセットにした場合の割引（セット割）</li>
              </ul>
              <p className="mt-3">
                比較サイトや各社の公式サイトにある「料金シミュレーション」に、使用量を入力すると、月額の目安が比較しやすくなります。
              </p>
            </section>

            <section id="rough-amount">
              <h2 className="text-lg font-black text-gray-900 md:text-xl">どれくらい変わるか（目安）</h2>
              <p className="mt-3">
                使用量・地域・契約内容によりますが、現在の契約から最安プランや割引の多いプランに乗り換えると、月額で数百円〜2,000円程度の差が出るケースがあります。電気とガスをセットで見直すと、セット割でさらに安くなる場合もあります。月1,000円の削減なら1年で12,000円なので、継続すると差は大きくなります。
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
                purpose="固定費チェックリストの「電気・ガス」を深掘りし、乗り換えの効果と確認ポイントを判断材料として伝えることを目的にしています。"
                reasonAxis="具体的な会社名・プラン名は地域や時期で変動するため、考え方と確認ポイントに絞っています。実際の比較は各社サイトや比較サイトで行うのが確実です。"
                memo="電気は小売自由化、ガスは地域により自由化の進み方が異なります。お住まいの地域で選択できるプランが異なるため、地域に応じた比較が必要です。"
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
                <li>電気・ガスは<strong>一度見直すと毎月の支払いが続けて変わる</strong>分野です。乗り換えは供給停止なしで申込だけで完了することが多いです。</li>
                <li>現在の契約内容と使用量を把握し、他社・他プランと比較すると、月数百円〜2,000円程度の差が出るケースがあります。</li>
                <li>契約期間の縛りや違約金を確認してから乗り換えを検討するのがおすすめです。</li>
                <li>削減額の効果は
                  <Link href="/tools/fixed-cost-impact" className="font-bold text-gray-900 hover:underline">固定費削減インパクト計算</Link>
                  で確認できます。固定費全体の順番は
                  <Link href="/articles/fixed-cost-checklist" className="font-bold text-gray-900 hover:underline">固定費見直しチェックリスト</Link>
                  を参照してください。
                </li>
              </ul>
            </section>
          </div>

          <ArticleFooter articleSlug="fixed-cost-utility-switch" />
        </div>
      </article>
    </>
  );
}
