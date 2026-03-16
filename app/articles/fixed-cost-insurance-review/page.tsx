import type { Metadata } from "next";
import Link from "next/link";
import { ArticleFooter } from "@/app/components/ArticleFooter";
import { ArticlePagePremise, ArticleReadingPoints, ArticleEditorMemo } from "@/app/components/article";
import { getArticleBreadcrumbJsonLd, getArticleFaqJsonLd } from "@/lib/article-structured-data";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://debt-simulator-quzc.vercel.app";
const ARTICLE_URL = `${BASE}/articles/fixed-cost-insurance-review`;
const ARTICLE_TITLE = "保険見直しの考え方｜何を確認すべきか・削ってよいもの/ダメなもの";

export const metadata: Metadata = {
  title: ARTICLE_TITLE,
  description:
    "保険の見直しで確認すべきポイントと、削ってよい保障・慎重にすべき保障の考え方を整理します。重複保障や過剰保障の見直しの参考に。",
  alternates: { canonical: ARTICLE_URL },
  openGraph: {
    title: ARTICLE_TITLE,
    description:
      "保険の見直しで確認すべきポイントと、削ってよい保障・慎重にすべき保障の考え方を整理します。",
    url: ARTICLE_URL,
    type: "article",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: ARTICLE_TITLE,
  description:
    "保険の見直しで確認すべきポイントと、削ってよい保障・慎重にすべき保障の考え方を整理します。",
  url: ARTICLE_URL,
  datePublished: "2025-03-11",
  dateModified: "2025-03-11",
  author: { "@type": "Organization", name: "借入返済シミュレーター" },
  publisher: { "@type": "Organization", name: "借入返済シミュレーター" },
};

const faqItems = [
  {
    question: "保険は何から確認すればよいですか？",
    answer:
      "まずは「何の保障にいくら払っているか」を一覧にすることがおすすめです。生命保険・医療保険・がん保険・就業不能保険・火災保険など、契約ごとに月額（または年額）と保障内容を書き出し、重複や過剰な部分がないか確認します。",
  },
  {
    question: "削ってよい保険と削ってはいけない保険の違いは？",
    answer:
      "「削ってよい」のは、重複している保障（同じような補償が複数ある）、ライフステージで不要になった保障、過剰な金額の保障などです。「慎重にすべき」なのは、自分や家族の生活を支える最低限の死亡保障・医療保障・火災保険など、いざというときの備えになる部分です。判断に迷う場合は専門家に相談するのが安心です。",
  },
  {
    question: "重複保障とはどういう状態ですか？",
    answer:
      "同じような補償を複数の保険で持っている状態です。例として、会社の団体保険と個人の医療保険の両方で入院給付金が出る、複数の生命保険で死亡保障が重なっているなどです。必要な額を超えている部分は見直しの候補になります。",
  },
  {
    question: "保険の見直しで月額はどれくらい変わることがありますか？",
    answer:
      "契約内容によりますが、重複保障の整理や過剰な特約の見直しで、月額で数千円程度削減できるケースはあります。ただし、保障を減らすといざというときの備えが変わるので、内容を理解したうえで判断する必要があります。",
  },
  {
    question: "固定費全体の削減効果を試算したいです。",
    answer:
      "保険だけでなく、通信費・サブスクなども含めた「月いくら削減したら1年・3年・5年でいくらになるか」は、当サイトの固定費削減インパクト計算で試算できます。保険見直しで浮いた金額を入力すると、継続したときの効果を確認できます。",
  },
];

const breadcrumbJsonLd = getArticleBreadcrumbJsonLd(ARTICLE_URL, ARTICLE_TITLE);
const faqJsonLd = getArticleFaqJsonLd(faqItems);

const tocItems = [
  { id: "premise", label: "このページの前提" },
  { id: "conclusion", label: "結論｜内容を理解したうえで慎重に" },
  { id: "reading-points", label: "読み方のポイント" },
  { id: "what-to-check", label: "何を確認するか" },
  { id: "ok-to-reduce", label: "削ってよいもの・慎重にすべきもの" },
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

        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-soft md:p-8">
          <h1 className="text-2xl font-black text-gray-900 md:text-3xl">{ARTICLE_TITLE}</h1>

          <p className="mt-4 text-sm text-gray-600 leading-relaxed">
            保険は固定費のなかでも月額が大きくなりがちですが、安易に削るといざというときの備えが足りなくなるリスクがあります。このページでは、何を確認すべきか、削ってよい保障と慎重にすべき保障の考え方を整理します。
          </p>

          <section id="premise" className="mt-6">
            <ArticlePagePremise
              comparisonConditions={[
                "保険を「保障内容の理解」「重複・過剰の有無」「削ってよいもの／慎重にすべきもの」の観点で考える",
                "具体的な商品名や料金は扱わず、見直しの考え方と確認ポイントを中心に記載している",
              ]}
              reasonForConditions="保険は個人の状況により適切な内容が異なるため、判断の材料となる考え方に絞っています。具体的な見直しは契約内容を確認したうえで、必要に応じて専門家に相談することを推奨します。"
            />
          </section>

          <section className="mt-6 rounded-2xl border border-gray-200 bg-gray-50 p-4">
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
                結論｜内容を理解したうえで慎重に
              </h2>
              <p className="mt-3">
                保険見直しは、<strong>保障内容を理解したうえで、重複や過剰な部分から手をつける</strong>のがおすすめです。何にいくら払っているか一覧にし、「同じような補償が重なっていないか」「ライフステージで不要になった保障はないか」を確認すると、無理のない見直しができます。一方で、死亡保障・医療保障・火災保険など、いざというときの備えになる部分は安易に削らず、必要に応じて専門家の助言を得ることをおすすめします。
              </p>
            </section>

            <section id="reading-points">
              <ArticleReadingPoints
                points={[
                  {
                    label: "保障内容を把握する",
                    body: "契約している保険が「何に備えているか」「いくら出るか」を理解しないまま削ると、必要な保障まで減らしてしまうことがあります。まずは契約内容を確認しましょう。",
                  },
                  {
                    label: "重複保障を探す",
                    body: "会社の団体保険と個人の医療保険、複数の生命保険など、同じような補償が重なっていると、必要な額を超えて払っていることがあります。重複部分の整理は見直しの候補になります。",
                  },
                  {
                    label: "削りすぎに注意",
                    body: "月額を減らすことだけを優先すると、いざというときの備えが足りなくなることがあります。死亡保障・医療保障・火災保険など、最低限必要な部分は残す判断が重要です。",
                  },
                ]}
                misconceptions={[
                  "「保険は高いから全部見直した方がよい」と思いがちですが、必要な保障まで減らすとリスクが高まります。重複・過剰な部分から検討するのが安全です。",
                  "「自分で判断するのは難しい」と感じる場合は、保険の相談窓口やファイナンシャルプランナーなどに相談すると、状況に合わせた見直し案を検討できます。",
                ]}
              />
            </section>

            <section id="what-to-check">
              <h2 className="text-lg font-black text-gray-900 md:text-xl">何を確認するか</h2>
              <ul className="mt-3 list-disc pl-5 space-y-1">
                <li>契約している保険の一覧（生命保険・医療・がん・就業不能・火災など）と月額・年額</li>
                <li>各保険の保障内容（死亡時・入院時・手術時など、何にいくら出るか）</li>
                <li>会社の団体保険や共済など、他の保障との重複</li>
                <li>家族構成・住宅ローン・貯蓄の変化（必要な保障額が変わっていないか）</li>
              </ul>
              <p className="mt-3">
                固定費見直しの順番としては、
                <Link href="/articles/fixed-cost-checklist" className="font-bold text-gray-900 hover:underline">固定費見直しチェックリスト</Link>
                では、サブスク・通信費の次に「保険」を推奨しています。内容の理解が必要な分、通信費よりは手間がかかりますが、見直しで月額が数千円変わるケースもあります。
              </p>
            </section>

            <section id="ok-to-reduce">
              <h2 className="text-lg font-black text-gray-900 md:text-xl">削ってよいもの・慎重にすべきもの</h2>
              <p className="mt-3">
                <strong>削ってよい・見直しの候補になりやすいもの</strong>：同じような補償が複数ある重複保障、子どもが独立した後の教育保険の過剰な部分、ライフステージで不要になった特約など。必要な額を超えている部分を整理すると、月額を下げられることがあります。
              </p>
              <p className="mt-3">
                <strong>慎重にすべきもの</strong>：自分や家族の生活を支える死亡保障、大きな病気やケガに備える医療保障、火災保険など、いざというときの備えになる部分です。安易に減額すると、必要なときに足りなくなるリスクがあるため、内容を理解したうえで判断するか、専門家に相談するのがおすすめです。
              </p>
              <p className="mt-3">
                見直しで浮いた金額が1年・3年・5年でいくらになるかは、
                <Link href="/tools/fixed-cost-impact" className="font-bold text-gray-900 hover:underline">固定費削減インパクト計算</Link>
                で試算できます。
              </p>
              <div className="mt-6 rounded-2xl border border-gray-200 bg-gray-50 p-6">
                <h3 className="text-base font-black text-gray-900">固定費削減インパクトを計算する</h3>
                <p className="mt-2 text-sm text-gray-700">
                  毎月の削減額を続けたとき、1年・3年・5年で合計いくらになるかをすぐ確認できます。
                </p>
                <Link
                  href="/tools/fixed-cost-impact"
                  className="mt-4 inline-flex items-center justify-center rounded-2xl bg-gray-900 px-5 py-3 text-sm font-black text-white hover:opacity-90"
                >
                  固定費削減インパクトを計算する →
                </Link>
              </div>
            </section>

            <section id="editor-memo">
              <ArticleEditorMemo
                purpose="保険は安易に削るとリスクが高まるため、「何を確認すべきか」「削ってよいもの／慎重にすべきもの」の考え方を伝え、自分で判断する材料と専門家相談の必要性のバランスを取っています。"
                reasonAxis="具体的な商品名や「この保険は削ってよい」といった断定は避け、考え方と確認ポイントに絞っています。"
                memo="保険見直しは、契約の解約や変更により解約返戻金や保障内容が変わる場合があります。変更前に契約内容と約款を確認するよう促すとよいです。"
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
                <li>保険見直しは<strong>保障内容を理解したうえで</strong>、重複・過剰な部分から検討するのがおすすめです。</li>
                <li>削ってよいのは重複保障や不要になった特約など。死亡・医療・火災などいざというときの備えは慎重に判断します。</li>
                <li>判断に迷う場合は、保険の相談窓口やファイナンシャルプランナーなどに相談するのが安心です。</li>
                <li>見直しで浮いた金額の効果は
                  <Link href="/tools/fixed-cost-impact" className="font-bold text-gray-900 hover:underline">固定費削減インパクト計算</Link>
                  で確認できます。固定費全体の順番は
                  <Link href="/articles/fixed-cost-checklist" className="font-bold text-gray-900 hover:underline">固定費見直しチェックリスト</Link>
                  を参照してください。
                </li>
              </ul>
            </section>
          </div>

          <ArticleFooter articleSlug="fixed-cost-insurance-review" />
        </div>
      </article>
    </>
  );
}
