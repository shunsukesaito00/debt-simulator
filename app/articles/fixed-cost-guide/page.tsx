import type { Metadata } from "next";
import Link from "next/link";
import { ArticleFooter } from "@/app/components/ArticleFooter";
import { ArticlePagePremise, ArticleReadingPoints, ArticleEditorMemo } from "@/app/components/article";
import { getArticleBreadcrumbJsonLd, getArticleFaqJsonLd } from "@/lib/article-structured-data";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://debt-simulator-quzc.vercel.app";
const ARTICLE_URL = `${BASE}/articles/fixed-cost-guide`;
const ARTICLE_TITLE = "固定費見直しの進め方｜何から手をつけるか・改善効果の比較";

export const metadata: Metadata = {
  title: ARTICLE_TITLE,
  description:
    "通信費・サブスク・保険など、毎月の固定負担を見直したい方向けに、何から手をつけるべきかと改善効果を比較する考え方を整理します。",
  alternates: { canonical: ARTICLE_URL },
  openGraph: {
    title: ARTICLE_TITLE,
    description:
      "通信費・サブスク・保険など、毎月の固定負担を見直したい方向けに、何から手をつけるべきかと改善効果を比較する考え方を整理します。",
    url: ARTICLE_URL,
    type: "article",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: ARTICLE_TITLE,
  description:
    "通信費・サブスク・保険など、毎月の固定負担を見直したい方向けに、何から手をつけるべきかと改善効果を比較する考え方を整理します。",
  url: ARTICLE_URL,
  datePublished: "2025-03-11",
  dateModified: "2025-03-11",
  author: { "@type": "Organization", name: "借入返済シミュレーター" },
  publisher: { "@type": "Organization", name: "借入返済シミュレーター" },
};

const breadcrumbJsonLd = getArticleBreadcrumbJsonLd(ARTICLE_URL, ARTICLE_TITLE);

const faqItems = [
  {
    question: "固定費の見直しは何から始めればいいですか？",
    answer:
      "まずは通信費やサブスクなど、契約変更だけで済む項目から始めるのがおすすめです。手間が少なく、効果もすぐに確認しやすいためです。",
  },
  {
    question: "固定費見直しでどれくらい節約できますか？",
    answer:
      "項目や条件によりますが、通信費の見直しだけでも月3,000〜5,000円程度の改善が見込めるケースがあります。年間では数万円の差になります。",
  },
  {
    question: "固定費見直しに使えるツールはありますか？",
    answer:
      "当サイトの固定費削減インパクト計算ツールで、月額×継続月数の累計効果をすぐに確認できます。見直し前後の比較に便利です。",
  },
  {
    question: "保険の見直しは固定費削減に効果がありますか？",
    answer:
      "保険は毎月の支出に占める割合が大きい場合があり、補償内容を見直すだけで月数千円の削減につながることもあります。ただし必要な保障を削らないよう注意が必要です。",
  },
  {
    question: "少額の固定費削減でも意味はありますか？",
    answer:
      "固定費は一度見直すと毎月効果が続くため、月1,000円の改善でも年間12,000円、5年で60,000円の差になります。少額でも積み重ねの効果は大きいです。",
  },
];

const faqJsonLd = getArticleFaqJsonLd(faqItems);

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
            このカテゴリでは、毎月の固定負担を見直すための記事を、条件別に「いくら変わるか」が比較できる形で整理していきます。
          </p>

          <section id="premise" className="mt-6">
            <ArticlePagePremise
              comparisonConditions={[
                "このページは固定費見直しカテゴリの総合ガイド（親記事）として構成している",
                "各項目の改善効果は、個別記事やツールで条件を指定して比較する前提で整理している",
                "一般論ではなく、具体条件で「いくら変わるか」を確認できる構成を目指している",
              ]}
              reasonForConditions="固定費は項目が多く何から手をつけるか迷いやすいため、カテゴリ全体の見取り図として、優先順位と改善効果の比較方法を整理するページが必要だからです。"
            />
          </section>

          <section className="mt-8 space-y-6 text-sm text-gray-700 leading-relaxed">
            <section>
              <h2 className="text-lg font-black text-gray-900 md:text-xl">このカテゴリの役割</h2>
              <p className="mt-3">
                通信費・サブスク・保険など、毎月決まった支出は「固定費」としてまとめて見直すと、何から手をつけるべきか整理しやすくなります。一般論ではなく、具体条件で「月いくら変わるか」「年間でどれくらいの改善効果か」を比較できる記事を、順次追加していく方針です。
              </p>
            </section>

            <section>
              <h2 className="text-lg font-black text-gray-900 md:text-xl">何から手をつけるか</h2>
              <p className="mt-3">
                見直しの優先順位は、削減しやすさ・効果の大きさ・自分の状況によって変わります。このカテゴリでは、項目別に「どの程度の改善が見込めるか」を条件付きで示し、判断材料にしてもらえるようにします。
              </p>
            </section>

            <section id="reading-points">
              <ArticleReadingPoints
                points={[
                  {
                    label: "簡単に手をつけられる項目から始める",
                    body: "サブスクや通信費など、契約変更だけで済む項目は優先度が高いです。手間が少ないものから始めると続けやすくなります。",
                  },
                  {
                    label: "ツールで数字を比較してから判断する",
                    body: "「なんとなく節約」ではなく、固定費削減インパクト計算ツールで月額×継続月数の累計を確認すると、見直しの効果が実感しやすくなります。",
                  },
                  {
                    label: "理論だけでなく自分の条件で確認する",
                    body: "一般論での優先順位はあくまで参考です。自分の支出内訳に合わせて、どの項目が一番効果的かを個別に確認してください。",
                  },
                ]}
                misconceptions={[
                  "「固定費見直し＝我慢して切り詰める」と思われがちですが、プラン変更や乗り換えで生活の質を落とさず改善できるケースも多いです。",
                  "「少額の改善は意味がない」と感じがちですが、固定費は一度見直すと毎月効果が続くため、累計では大きな差になります。",
                ]}
              />
            </section>

            <section>
              <h2 className="text-lg font-black text-gray-900 md:text-xl">ツール・記事一覧</h2>
              <p className="mt-3">
                毎月の削減額を続けたとき、1年・3年・5年で合計いくらになるかは、
                <Link href="/tools/fixed-cost-impact" className="font-bold text-gray-900 hover:underline">固定費削減インパクト計算</Link>
                ですぐ確認できます。借入返済の月々負担を試算したい場合は、
                <Link href="/simulator/cardloan" className="font-bold text-gray-900 hover:underline">借入返済シミュレーター</Link>
                を、条件別の記事は
                <Link href="/articles" className="font-bold text-gray-900 hover:underline">記事一覧</Link>
                から探せます。
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link
                  href="/tools/fixed-cost-impact"
                  className="inline-flex items-center justify-center rounded-2xl bg-gray-900 px-5 py-2.5 text-sm font-black text-white hover:opacity-90"
                >
                  固定費削減インパクトを計算する →
                </Link>
                <Link
                  href="/simulator/cardloan"
                  className="inline-flex items-center justify-center rounded-2xl border border-gray-300 bg-white px-5 py-2.5 text-sm font-bold text-gray-700 hover:bg-gray-50"
                >
                  借入返済シミュレーター
                </Link>
                <Link
                  href="/articles"
                  className="inline-flex items-center justify-center rounded-2xl border border-gray-300 bg-white px-5 py-2.5 text-sm font-bold text-gray-700 hover:bg-gray-50"
                >
                  記事一覧を見る
                </Link>
              </div>
            </section>
            <section id="editor-memo">
              <ArticleEditorMemo
                purpose="固定費見直しカテゴリの全体像を整理し、何から手をつけるかの判断材料を提供するために書いています。"
                reasonAxis="個別の改善額を深掘りするのではなく、カテゴリ内の記事・ツールへの導線と優先順位の考え方を軸にしています。"
                memo="固定費見直しカテゴリのピラー記事として、チェックリスト記事や各改善効果記事（月3,000円・5,000円・1万円）への導線を担っています。"
              />
            </section>

            <section id="faq">
              <h2 className="text-lg font-black text-gray-900 md:text-xl">よくある質問</h2>
              <div className="mt-4 space-y-6">
                {faqItems.map((item, i) => (
                  <div key={i}>
                    <h3 className="text-base font-black text-gray-900">{item.question}</h3>
                    <p className="mt-2">{item.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          </section>

          <ArticleFooter articleSlug="fixed-cost-guide" />
        </div>
      </article>
    </>
  );
}
