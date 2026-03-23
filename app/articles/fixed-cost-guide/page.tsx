import type { Metadata } from "next";
import Link from "next/link";
import { ArticleFooter } from "@/app/components/ArticleFooter";
import { ArticleProse } from "@/app/components/article";
import { getArticleBreadcrumbJsonLd, getArticleFaqJsonLd } from "@/lib/article-structured-data";
import { ARTICLE_AUTHOR_JSON_LD, ARTICLE_PUBLISHER_JSON_LD } from "@/lib/site-author";
import { ArticlePageShell } from "@/app/components/ArticlePageShell";
import { articleUsesWideLayout } from "@/lib/article-layout";


const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://debt-simulator-quzc.vercel.app";
const ARTICLE_URL = `${BASE}/articles/fixed-cost-guide`;
const ARTICLE_TITLE = "固定費見直しの進め方｜何から手をつけるか、順番と効果をまとめて整理";

export const metadata: Metadata = {
  title: ARTICLE_TITLE,
  description:
    "固定費見直しは何からやるべきか。サブスク・通信費・保険・光熱費・家賃や車まで、着手しやすい順番と効果を3分で整理できる実用ガイドです。",
  alternates: { canonical: ARTICLE_URL },
  openGraph: {
    title: ARTICLE_TITLE,
    description:
      "固定費見直しを何から始めるか迷う人向けに、順番・判断基準・月5,000円/1万円改善の見え方をまとめました。",
    url: ARTICLE_URL,
    type: "article",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: ARTICLE_TITLE,
  description:
    "固定費見直しの順番と効果を、項目別のチェックポイントとあわせて整理した実用ガイドです。",
  url: ARTICLE_URL,
  datePublished: "2025-03-11",
  dateModified: "2026-03-21",
  author: ARTICLE_AUTHOR_JSON_LD,
  publisher: ARTICLE_PUBLISHER_JSON_LD,
};

const breadcrumbJsonLd = getArticleBreadcrumbJsonLd(ARTICLE_URL, ARTICLE_TITLE);

const faqItems = [
  {
    question: "固定費の見直しは何から始めればいいですか？",
    answer:
      "まずはサブスク、次にスマホ・通信費がおすすめです。着手しやすく生活への影響が比較的小さいため、途中で止まりにくくなります。",
  },
  {
    question: "固定費見直しでどれくらい節約できますか？",
    answer:
      "人によりますが、月5,000円の改善で年間6万円、月1万円で年間12万円の差になります。固定費は一度下げると効果が続くのが特徴です。",
  },
  {
    question: "固定費はなぜ変動費より先に見るのですか？",
    answer:
      "固定費は一度見直すと毎月自動的に効きやすいからです。食費のように毎回我慢を続ける必要がないため、改善を維持しやすくなります。",
  },
  {
    question: "保険は先に見直した方がいいですか？",
    answer:
      "保険は削減額が大きくなりやすい一方、必要保障まで削るリスクがあります。サブスク・通信費の次に、保障内容を確認しながら進めるのが安全です。",
  },
  {
    question: "固定費見直しに使えるツールはありますか？",
    answer:
      "当サイトの固定費削減インパクト計算で、月3,000円・5,000円・1万円の改善が1年・3年・5年でどれくらい効くかを試算できます。",
  },
];

const faqJsonLd = getArticleFaqJsonLd(faqItems);

export default function Page() {
  const checklistRows: {
    item: string;
    ease: string;
    amount: string;
    impact: string;
    priority: string;
  }[] = [
    { item: "サブスク", ease: "高い", amount: "小〜中", impact: "小さい", priority: "高い" },
    { item: "スマホ・通信費", ease: "高い", amount: "中", impact: "小〜中", priority: "高い" },
    { item: "保険", ease: "中", amount: "中〜大", impact: "中", priority: "高い" },
    { item: "電気・ガス", ease: "中", amount: "小〜中", impact: "小", priority: "中" },
    { item: "家賃", ease: "低い", amount: "大", impact: "大きい", priority: "中" },
    { item: "車", ease: "低い", amount: "大", impact: "大きい", priority: "中" },
  ];

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

      
      <ArticlePageShell currentPageTitle={ARTICLE_TITLE} wide={articleUsesWideLayout("fixed-cost-guide")}>
        <div className="ds-card ds-card-pad">
          <h1 className="text-2xl font-semibold text-stone-900 md:text-3xl">{ARTICLE_TITLE}</h1>

          <ArticleProse className="mt-8 space-y-6">
            <section id="intro">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">導入</h2>
              <p className="mt-3">
                固定費を見直したいと思っても、最初に迷いやすいのは「結局、何から手をつければいいのか」だと思います。
                家計の見直しは変動費より固定費から入る方が、改善効果が続きやすいです。
              </p>
              <p className="mt-3">
                ただし、固定費なら何でも先にやればいいわけではありません。削減額だけでなく、動かしやすさと生活への影響を合わせて見ることが大事です。
                この記事では、何からやるか、どの順番なら続きやすいか、月5,000円・1万円の改善でどれくらい違うかをまとめます。
              </p>
            </section>

            <section id="conclusion">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">先に結論｜固定費見直しはこの順番がやりやすい</h2>
              <ol className="mt-3 list-decimal pl-5 space-y-1 text-stone-800">
                <li>サブスク</li>
                <li>スマホ・通信費</li>
                <li>保険</li>
                <li>電気・ガスなどの契約</li>
                <li>家賃・車などの大物</li>
              </ol>
              <p className="mt-3">
                「すぐ動けるもの」から始めて、「見直しに時間や条件が必要なもの」を後ろに回す方が、途中で止まりにくいです。
                最初の1回で全部決めるより、負担が軽いところから整えていく方が継続しやすくなります。
              </p>
            </section>

            <section id="basics">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">固定費見直しの基本｜なぜ変動費より先なのか</h2>
              <p className="mt-3">
                固定費を先に見るべき理由は、一度の見直しが毎月効くからです。たとえばスマホ料金を月2,000円下げられれば、その後も自動的に改善が続きます。
                先に固定費を整えると、変動費の節約が根性頼みになりにくく、家計改善を現実的に進めやすくなります。
              </p>
            </section>

            <section id="checklist-table">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">3分で使える固定費見直しチェックリスト</h2>
              <div className="not-prose mt-4 overflow-x-auto rounded-xl border border-stone-200 shadow-sm">
                <table className="w-full min-w-[640px] border-collapse text-sm md:text-base">
                  <thead>
                    <tr className="border-b border-stone-200 bg-stone-100">
                      <th scope="col" className="py-3 px-3 text-left font-semibold text-stone-900">項目</th>
                      <th scope="col" className="py-3 px-2 text-center font-semibold text-stone-900">見直しやすさ</th>
                      <th scope="col" className="py-3 px-2 text-center font-semibold text-stone-900">削減額の大きさ</th>
                      <th scope="col" className="py-3 px-2 text-center font-semibold text-stone-900">生活への影響</th>
                      <th scope="col" className="py-3 px-2 text-center font-semibold text-stone-900">先にやるべき度</th>
                    </tr>
                  </thead>
                  <tbody>
                    {checklistRows.map((row) => (
                      <tr key={row.item} className="border-b border-stone-100 odd:bg-white even:bg-stone-50/60">
                        <th scope="row" className="py-3 px-3 text-left font-semibold text-stone-900">{row.item}</th>
                        <td className="py-3 px-2 text-center text-stone-800">{row.ease}</td>
                        <td className="py-3 px-2 text-center text-stone-800">{row.amount}</td>
                        <td className="py-3 px-2 text-center text-stone-800">{row.impact}</td>
                        <td className="py-3 px-2 text-center text-stone-800">{row.priority}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-3">
                ポイントは「金額が大きい＝最初にやるべき」ではないことです。家賃や車は効果が大きい一方で動かしにくく、サブスクやスマホは小さくても今週中に動けることが多いです。
              </p>
            </section>

            <section id="item-subs">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">1. サブスク｜最初にやるべき理由</h2>
              <p className="mt-3">サブスクは判断がシンプルで、生活へのダメージが小さいため、固定費見直しの最初の一手として優秀です。</p>
              <h3 className="mt-4 text-base font-semibold text-stone-900">確認すること</h3>
              <ul className="mt-2 list-disc pl-5 space-y-1 text-stone-800">
                <li>今契約している月額課金を全部書き出す</li>
                <li>3か月以上使っていないものがないか見る</li>
                <li>無料期間から自動更新されたものがないか確認する</li>
              </ul>
              <h3 className="mt-4 text-base font-semibold text-stone-900">判断の目安</h3>
              <ul className="mt-2 list-disc pl-5 space-y-1 text-stone-800">
                <li>使っていないなら解約候補</li>
                <li>使っていても代替があるなら整理候補</li>
                <li>月500円でも複数重なると重い</li>
              </ul>
              <h3 className="mt-4 text-base font-semibold text-stone-900">急がなくていいケース</h3>
              <ul className="mt-2 list-disc pl-5 space-y-1 text-stone-800">
                <li>毎日使っていて、生活の満足度が高いもの</li>
                <li>家族共有で実際に使われているもの</li>
              </ul>
            </section>

            <section id="item-mobile">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">2. スマホ・通信費｜効果と手間のバランスが良い</h2>
              <p className="mt-3">通信費は固定費の中でも見直しの効果が出やすく、手間とのバランスが良い項目です。</p>
              <h3 className="mt-4 text-base font-semibold text-stone-900">確認すること</h3>
              <ul className="mt-2 list-disc pl-5 space-y-1 text-stone-800">
                <li>現在のプラン名</li>
                <li>直近3か月のデータ使用量</li>
                <li>通話オプションの有無</li>
                <li>光回線や家族割のセット内容</li>
              </ul>
              <h3 className="mt-4 text-base font-semibold text-stone-900">判断の目安</h3>
              <ul className="mt-2 list-disc pl-5 space-y-1 text-stone-800">
                <li>データ使用量が少ないのに大容量プランなら見直し候補</li>
                <li>通話をほぼ使わないのに通話定額が付いているなら削減候補</li>
                <li>セット割込みでも割高なら、乗り換え比較の価値あり</li>
              </ul>
              <h3 className="mt-4 text-base font-semibold text-stone-900">急がなくていいケース</h3>
              <ul className="mt-2 list-disc pl-5 space-y-1 text-stone-800">
                <li>仕事上、通信品質を優先したい</li>
                <li>家族全体のセット割で単独最適化しにくい</li>
              </ul>
            </section>

            <section id="item-insurance">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">3. 保険｜削減額は大きいが、切り方を間違えやすい</h2>
              <p className="mt-3">保険は効果が大きい一方で、必要な保障まで削ると逆に困るため、慎重な確認が必要です。</p>
              <h3 className="mt-4 text-base font-semibold text-stone-900">確認すること</h3>
              <ul className="mt-2 list-disc pl-5 space-y-1 text-stone-800">
                <li>何のための保険か</li>
                <li>掛け捨てか貯蓄型か</li>
                <li>月額保険料はいくらか</li>
                <li>保障額は今の家族構成に合っているか</li>
              </ul>
              <h3 className="mt-4 text-base font-semibold text-stone-900">判断の目安</h3>
              <ul className="mt-2 list-disc pl-5 space-y-1 text-stone-800">
                <li>独身・扶養なしで生命保険が重いなら見直し候補</li>
                <li>子どもの独立後も大きな死亡保障が残っているなら見直し候補</li>
                <li>医療保険・特約が多く、内容を説明できないなら要確認</li>
              </ul>
              <h3 className="mt-4 text-base font-semibold text-stone-900">急がなくていいケース</h3>
              <ul className="mt-2 list-disc pl-5 space-y-1 text-stone-800">
                <li>家族の生活保障として明確な役割がある</li>
                <li>住宅ローン団信や会社の保障との兼ね合いが未確認</li>
              </ul>
            </section>

            <section id="item-utility">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">4. 電気・ガスなどの契約｜効果は中くらい、難易度も中くらい</h2>
              <h3 className="mt-4 text-base font-semibold text-stone-900">確認すること</h3>
              <ul className="mt-2 list-disc pl-5 space-y-1 text-stone-800">
                <li>契約会社と料金プラン</li>
                <li>直近数か月の使用量</li>
                <li>セット割やポイント還元の有無</li>
              </ul>
              <h3 className="mt-4 text-base font-semibold text-stone-900">判断の目安</h3>
              <ul className="mt-2 list-disc pl-5 space-y-1 text-stone-800">
                <li>旧プランのままで比較したことがない</li>
                <li>在宅時間や家族構成が変わった</li>
                <li>オール電化や夜間プランとの相性が変わった</li>
              </ul>
              <h3 className="mt-4 text-base font-semibold text-stone-900">急がなくていいケース</h3>
              <ul className="mt-2 list-disc pl-5 space-y-1 text-stone-800">
                <li>使用量が少なく、差額がかなり小さい</li>
                <li>契約変更の手間に対してメリットが薄い</li>
              </ul>
            </section>

            <section id="item-big">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">5. 家賃・車などの大物｜大きいが、最後に考える方が現実的</h2>
              <h3 className="mt-4 text-base font-semibold text-stone-900">確認すること</h3>
              <ul className="mt-2 list-disc pl-5 space-y-1 text-stone-800">
                <li>家賃が手取りに対して重すぎないか</li>
                <li>車が生活・通勤に本当に必須か</li>
                <li>維持費込みで月いくらかかっているか</li>
              </ul>
              <h3 className="mt-4 text-base font-semibold text-stone-900">判断の目安</h3>
              <ul className="mt-2 list-disc pl-5 space-y-1 text-stone-800">
                <li>手取りに対して住居費が高く、他費目を圧迫している</li>
                <li>車の維持費が家計赤字の原因になっている</li>
                <li>生活条件を変えれば選択肢がある</li>
              </ul>
              <h3 className="mt-4 text-base font-semibold text-stone-900">急がなくていいケース</h3>
              <ul className="mt-2 list-disc pl-5 space-y-1 text-stone-800">
                <li>家族事情や通勤事情で代替がない</li>
                <li>すぐ動くと引っ越し費用や違約金が重い</li>
              </ul>
              <p className="mt-3">今月やる必要はなくても、半年〜1年単位で再検討する価値はあります。</p>
            </section>

            <section id="order-reason">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">この順番にしている理由</h2>
              <p className="mt-3">
                最初から一番重いものに手を出すと疲れやすいため、順番は「今週できるもの」「今月中に比較できるもの」「数か月単位で再設計するもの」に分ける方が現実的です。
              </p>
            </section>

            <section id="impact">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">月5,000円・1万円改善するとどう変わるか</h2>
              <ul className="mt-3 list-disc pl-5 space-y-1 text-stone-800">
                <li>月5,000円改善: 年6万円</li>
                <li>月1万円改善: 年12万円</li>
              </ul>
              <p className="mt-3">単月では小さく見えても、1年単位では差が大きくなります。</p>
            </section>

            <section id="who-should-start">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">こんな人は固定費見直しを先にやった方がいい</h2>
              <ul className="mt-3 list-disc pl-5 space-y-1 text-stone-800">
                <li>毎月の赤字が続いている</li>
                <li>貯金できない理由が何となくしか分からない</li>
                <li>節約を頑張っても苦しい</li>
                <li>家計簿が続かない</li>
                <li>返済があり、毎月の余裕を少しでも作りたい</li>
              </ul>
            </section>

            <section id="simulate">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">自分の条件で試算する</h2>
              <p className="mt-3">
                固定費を月3,000円、5,000円、1万円下げたときに、返済や家計にどれくらい影響が出るかは条件で変わります。
                まずは
                <Link href="/tools/fixed-cost-impact" className="font-bold text-stone-900 hover:underline"> 固定費削減インパクト計算 </Link>
                で数字を確認してください。
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link href="/tools/fixed-cost-impact" className="ds-btn ds-btn-primary">固定費削減インパクトを計算する →</Link>
                <Link href="/articles/fixed-cost-checklist" className="ds-btn ds-btn-secondary">固定費見直しチェックリストを見る</Link>
              </div>
            </section>

            <section id="summary">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">まとめ</h2>
              <ul className="mt-3 list-disc pl-5 space-y-1 text-stone-800">
                <li>まずサブスク、次にスマホ・通信費、次に保険の順が進めやすい</li>
                <li>余力があれば電気・ガス、家賃・車は最後に検討する</li>
                <li>金額の大小だけでなく、今の自分が動ける順で積み上げるのが続けるコツ</li>
              </ul>
            </section>

            <section id="faq">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">よくある質問</h2>
              <div className="mt-4 space-y-6">
                {faqItems.map((item, i) => (
                  <div key={i}>
                    <h3 className="text-base font-semibold text-stone-900">{item.question}</h3>
                    <p className="mt-2">{item.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          </ArticleProse>

          <ArticleFooter articleSlug="fixed-cost-guide" showCta={false} />
        </div>
      </ArticlePageShell>
    </>
  );
}
