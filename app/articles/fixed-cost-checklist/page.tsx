import type { Metadata } from "next";
import Link from "next/link";
import { ArticleFooter } from "@/app/components/ArticleFooter";
import { ArticleProse } from "@/app/components/article";
import { getArticleBreadcrumbJsonLd, getArticleFaqJsonLd } from "@/lib/article-structured-data";
import { ARTICLE_AUTHOR_JSON_LD, ARTICLE_PUBLISHER_JSON_LD } from "@/lib/site-author";
import { ArticlePageShell } from "@/app/components/ArticlePageShell";
import { articleUsesWideLayout } from "@/lib/article-layout";
import { TrackedLink } from "@/app/components/TrackedLink";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://debt-simulator-quzc.vercel.app";
const ARTICLE_URL = `${BASE}/articles/fixed-cost-checklist`;
const ARTICLE_TITLE = "固定費見直しチェックリスト｜何から削るか順番で解説";

export const metadata: Metadata = {
  title: ARTICLE_TITLE,
  description:
    "固定費を何から手をつけるか、見直しやすさ・削減額・生活への影響で整理したチェックリスト。サブスクから家賃まで、挫折しにくい順番と項目別の確認ポイントを解説します。",
  alternates: { canonical: ARTICLE_URL },
  openGraph: {
    title: ARTICLE_TITLE,
    description:
      "すぐ変えやすいものから始める固定費見直しの順番と、項目別のチェックポイント。削減額の試算ツールへの導線つき。",
    url: ARTICLE_URL,
    type: "article",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: ARTICLE_TITLE,
  description:
    "固定費見直しのチェックリスト。何から削るか順番と項目別のポイントを整理します。",
  url: ARTICLE_URL,
  datePublished: "2025-03-11",
  dateModified: "2026-03-22",
  author: ARTICLE_AUTHOR_JSON_LD,
  publisher: ARTICLE_PUBLISHER_JSON_LD,
};

const faqItems = [
  {
    question: "固定費見直しは何から始めるべきですか？",
    answer:
      "まずはサブスクからがおすすめです。解約や一時停止がしやすく、小さくても「減った」が実感しやすいので、次の通信費・保険へ進みやすくなります。",
  },
  {
    question: "固定費はどれくらい削れますか？",
    answer:
      "人によります。複数項目を組み合わせると、月5,000円〜1万円前後を目安にできるケースもあります。固定費削減インパクト計算で、1年・3年・5年の累計を試算できます。",
  },
  {
    question: "家賃や保険を先に見直すべきですか？",
    answer:
      "金額は大きい一方、転居や保障の理解が必要で時間がかかります。この記事の順（サブスク→通信→保険→電気・ガス等→家賃・車）は、着手しやすさと続けやすさを優先した並びです。",
  },
  {
    question: "固定費の見直しにはどれくらい時間がかかりますか？",
    answer:
      "サブスクの洗い出しは30分〜1時間程度のイメージです。通信は手続きで数日、保険は内容確認に1〜2週間かかることもあります。一度に全部やらず、順に進めれば十分です。",
  },
  {
    question: "チェックリストを終えたあとに何をすればいいですか？",
    answer:
      "1〜2か月後に、実際にいくら減ったか確認するのがおすすめです。浮いたお金を返済に回す場合は、借入返済シミュレーターで月々の余裕と返済の関係を試算するのも有効です。",
  },
];

const breadcrumbJsonLd = getArticleBreadcrumbJsonLd(ARTICLE_URL, ARTICLE_TITLE);
const faqJsonLd = getArticleFaqJsonLd(faqItems);

const tocItems = [
  { id: "intro", label: "導入" },
  { id: "conclusion", label: "結論｜何から始めるべきか" },
  { id: "checklist-table", label: "3分で使える固定費見直しチェックリスト" },
  { id: "items", label: "項目別の見直しポイント" },
  { id: "order-reason", label: "この順番にしている理由" },
  { id: "impact", label: "月5,000円・1万円改善の見え方" },
  { id: "cta-impact", label: "自分の条件で試算する" },
  { id: "repayment-note", label: "借入返済とつなげる（補足）" },
  { id: "faq", label: "よくある質問" },
  { id: "summary", label: "まとめ" },
  { id: "resources", label: "参考・相談先" },
];

/** 一覧表：着手の優先度は「小さくても続けやすい順」を重視 */
const checklistRows: {
  item: string;
  ease: string;
  amount: string;
  life: string;
  priority: string;
}[] = [
  {
    item: "サブスク",
    ease: "高",
    amount: "1件は小さくても、複数で積み上がりやすい",
    life: "小",
    priority: "1",
  },
  {
    item: "スマホ・通信費",
    ease: "高",
    amount: "中〜大（プラン次第）",
    life: "小",
    priority: "2",
  },
  {
    item: "保険",
    ease: "中",
    amount: "中〜大（見直し方次第）",
    life: "中",
    priority: "3",
  },
  {
    item: "電気・ガス・その他契約",
    ease: "中",
    amount: "中程度（継続しやすい）",
    life: "小〜中",
    priority: "4",
  },
  {
    item: "家賃・車などの大物",
    ease: "やや低",
    amount: "大になりやすい",
    life: "大",
    priority: "5",
  },
];

function ItemBlock({
  title,
  id,
  check,
  guide,
  skip,
}: {
  title: string;
  id: string;
  check: string[];
  guide: string;
  skip: string;
}) {
  return (
    <div id={id} className="scroll-mt-24">
      <h3 className="text-base font-semibold text-stone-900 md:text-lg">{title}</h3>
      <p className="mt-2 text-sm font-medium text-stone-700">確認すること</p>
      <ul className="mt-1.5 list-disc pl-5 space-y-1 text-stone-800">
        {check.map((c) => (
          <li key={c}>{c}</li>
        ))}
      </ul>
      <p className="mt-3 text-sm font-medium text-stone-700">判断の目安</p>
      <p className="mt-1 text-stone-700 leading-relaxed">{guide}</p>
      <p className="mt-3 text-sm font-medium text-stone-700">すぐやらなくていいケース</p>
      <p className="mt-1 text-stone-700 leading-relaxed">{skip}</p>
    </div>
  );
}

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      {faqJsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      )}

      <ArticlePageShell currentPageTitle={ARTICLE_TITLE} wide={articleUsesWideLayout("fixed-cost-checklist")}>
        <div className="ds-card ds-card-pad">
          <h1 className="text-2xl font-semibold text-stone-900 md:text-3xl">{ARTICLE_TITLE}</h1>

          <section id="intro" className="mt-5 text-base text-stone-700 leading-relaxed">
            <p>
              固定費は一度見直すと効果が続きやすい一方、「どこから手をつけるか」で止まりがちです。この記事では、
              <strong>挫折しにくい順番</strong>
              と、項目ごとの
              <strong>確認・判断・様子見でよいとき</strong>
              を一覧にしました。詳しい進め方は
              <Link href="/articles/fixed-cost-guide" className="font-semibold text-emerald-900 underline">
                固定費見直しの進め方
              </Link>
              とあわせてどうぞ。
            </p>
          </section>

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
            <section id="conclusion">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">結論｜何から始めるべきか</h2>
              <p className="mt-3">
                おすすめは、<strong>すぐ変えやすいものから</strong>です。金額だけが大きい順（家賃・保険など）ではなく、手続きの負担と生活への影響のバランスで並べています。
              </p>
              <ol className="mt-3 list-decimal pl-5 space-y-1 text-stone-800">
                <li>サブスク</li>
                <li>スマホ・通信費</li>
                <li>保険（内容を確認したうえで）</li>
                <li>電気・ガスなどの契約</li>
                <li>家賃・車などの大物</li>
              </ol>
            </section>

            <section id="checklist-table">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">3分で使える固定費見直しチェックリスト</h2>
              <p className="mt-3">
                下表は「金額ランキング」ではなく、<strong>何から手をつけるか</strong>の目安です。見直しやすさ・削減のなりやすさ・生活への影響を並べ、右端の数字が小さいほど先に検討しやすい順です。
              </p>

              <div className="not-prose mt-4 overflow-x-auto rounded-xl border border-stone-200 shadow-sm">
                <table className="w-full min-w-[640px] border-collapse text-sm md:text-base">
                  <caption className="sr-only">
                    固定費の項目ごとに、見直しやすさ・削減額のなりやすさ・生活への影響・優先して検討する順を示した表
                  </caption>
                  <thead>
                    <tr className="border-b border-stone-200 bg-stone-100">
                      <th scope="col" className="py-3 px-3 text-left font-semibold text-stone-900">
                        項目
                      </th>
                      <th scope="col" className="py-3 px-2 text-center font-semibold text-stone-900">
                        見直しやすさ
                      </th>
                      <th scope="col" className="py-3 px-2 text-center font-semibold text-stone-900">
                        削減額の目安
                      </th>
                      <th scope="col" className="py-3 px-2 text-center font-semibold text-stone-900">
                        生活への影響
                      </th>
                      <th scope="col" className="py-3 px-2 text-center font-semibold text-stone-900">
                        先にやる度
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {checklistRows.map((row) => (
                      <tr key={row.item} className="border-b border-stone-100 odd:bg-white even:bg-stone-50/60">
                        <th scope="row" className="py-3 px-3 text-left font-semibold text-stone-900">
                          {row.item}
                        </th>
                        <td className="py-3 px-2 text-center text-stone-800">{row.ease}</td>
                        <td className="py-3 px-2 text-center text-stone-800">{row.amount}</td>
                        <td className="py-3 px-2 text-center text-stone-800">{row.life}</td>
                        <td className="py-3 px-2 text-center font-bold tabular-nums text-emerald-900">{row.priority}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-xs text-stone-500">
                「先にやる度」は1が最優先の検討順です。家賃・車は金額は大きいですが、手続きや生活変化も大きいため後ろに置いています。
              </p>
            </section>

            <section id="items">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">項目別の見直しポイント</h2>

              <div className="mt-6 space-y-10">
                <ItemBlock
                  id="item-subs"
                  title="サブスク"
                  check={[
                    "使っていない・名前だけ残っている契約がないか",
                    "同じ用途のサービスが重複していないか",
                    "無料や安い代替で足りるものがないか",
                  ]}
                  guide="解約や一時停止が比較的簡単で、まず手を付けやすいです。一覧に出してから「本当に使っているか」を見ると抜けが減ります。"
                  skip="生活や仕事でそのサービスが不可欠なときは、解約よりプラン変更や頻度の見直しからでも構いません。"
                />

                <ItemBlock
                  id="item-mobile"
                  title="スマホ・通信費"
                  check={[
                    "データ量・通話が過剰になっていないか",
                    "格安プランやセット割に切り替えられる余地はないか",
                    "自宅回線（光・Wi-Fi）とスマホの重複や、まとめて安くなる条件がないか",
                  ]}
                  guide="一度変えると効果が続きやすく、スマホと自宅回線をセットで見ると削減額がまとまって見えやすいです。"
                  skip="引っ越し直後や契約縛りが厳しい時期は、更新月をメモして次のタイミングに回してよいです。"
                />

                <ItemBlock
                  id="item-insurance"
                  title="保険"
                  check={[
                    "保障内容を説明できるか（何にいくら入っているか）",
                    "同じような補償が複数に重なっていないか",
                  ]}
                  guide="削るというより「必要以上を減らす」イメージです。医療・生命・損害など、家族構成の変化があれば設計ごと見直す価値があります。"
                  skip="内容が複雑で不安が残るときは、無理に削らず相談窓口や専門家の助言を検討した方がよいです。"
                />

                <ItemBlock
                  id="item-utility"
                  title="電気・ガス・その他契約"
                  check={[
                    "契約プランや会社の乗り換え・見直し余地はないか",
                    "使っていないオプションが付いていないか",
                  ]}
                  guide="月単体では中くらいでも、継続効果があります。更新タイミングでまとめて見ると手間が少なく済みます。"
                  skip="設備の状態や地域によって選べる会社が限られる場合は、比較に時間をかけず一度保留してよいです。"
                />

                <ItemBlock
                  id="item-big"
                  title="家賃・車などの大物"
                  check={[
                    "転居・車の乗り換え・維持費を含めたトータルで無理がないか",
                  ]}
                  guide="効果は大きい一方、判断と準備に時間がかかります。上記で見直しの感覚がついたあとに検討すると、現実的に進めやすいです。"
                  skip="すぐに転居や売却が難しいときは、他の項目で浮かせた分を返済や貯蓄に回すだけでも十分意味があります。"
                />
              </div>
            </section>

            <section id="order-reason">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">この順番にしている理由</h2>
              <p className="mt-3">
                理由はシンプルで、<strong>いきなり大物から入ると止まりやすい</strong>からです。家賃や車は金額は大きいですが、転居や売却など動きが重く、検討の途中で疲れて終わることがあります。
              </p>
              <p className="mt-3">
                一方、サブスクや通信費は「今月から動かせる」ものが多く、小さくても<strong>減った実感</strong>が出やすいです。その成功体験があると、保険や光熱費など、少し手間のかかる項目にも手が伸びます。
              </p>
              <p className="mt-3">
                月額だけを追うと必要なものまで切りがちなので、生活への影響が小さいところから優先する考え方にしています。金額の大小だけで並べていません。
              </p>
            </section>

            <section id="impact">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">月5,000円・1万円改善の見え方</h2>
              <p className="mt-3">
                月5,000円は年間6万円、月1万円は年間12万円です。<strong>月額だと小さく見えても、年や数年で見ると差がはっきり</strong>します。モチベーションを維持するには、累計でイメージするのがおすすめです。
              </p>
            </section>

            <section id="cta-impact" className="not-prose">
              <div className="rounded-xl border-2 border-emerald-200/80 bg-emerald-50/50 p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-stone-900">自分の条件で試算する（主におすすめ）</h2>
                <p className="mt-2 text-base text-stone-700 leading-relaxed">
                  毎月いくら削減できたとしたとき、1年・3年・5年で合計いくらになるかを、その場で試せます。固定費見直しの「続いたときの効果」を数字で押さえるなら、まずこちらです。
                </p>
                <TrackedLink
                  href="/tools/fixed-cost-impact"
                  className="ds-btn ds-btn-primary mt-5 inline-flex"
                  event={{
                    action: "click_article_primary_cta",
                    location: "article_body",
                    target: "/tools/fixed-cost-impact",
                    link_type: "fixed_cost_impact",
                    source_article_slug: "fixed-cost-checklist",
                  }}
                >
                  固定費削減インパクトを計算する →
                </TrackedLink>
                <p className="mt-4 text-sm text-stone-600">
                  手順の全体像は
                  <Link href="/articles/fixed-cost-guide" className="font-semibold text-emerald-900 underline">
                    固定費見直しの進め方
                  </Link>
                  で補足しています（補助の導線）。
                </p>
              </div>
            </section>

            <section id="repayment-note">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">借入返済とつなげる（補足）</h2>
              <p className="mt-3">
                浮いたお金を返済に回す場合は、
                <Link href="/simulator/cardloan" className="font-semibold text-stone-900 underline">
                  借入返済シミュレーター
                </Link>
                で月々の返済や期間のイメージをつかむと、固定費削減の効果が全体の中でどう効くか見えやすくなります。こちらは補助的な導線です。
              </p>
            </section>

            <section id="faq">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">よくある質問</h2>
              <dl className="mt-4 space-y-5">
                {faqItems.map((f) => (
                  <div key={f.question}>
                    <dt className="font-bold text-stone-900">{f.question}</dt>
                    <dd className="mt-1.5 text-stone-700 leading-relaxed">{f.answer}</dd>
                  </div>
                ))}
              </dl>
            </section>

            <section id="summary">
              <h2 className="text-lg font-semibold text-stone-900 md:text-xl">まとめ</h2>
              <ul className="mt-3 list-disc pl-5 space-y-2 text-stone-800">
                <li>固定費は、<strong>始めやすさと続けやすさ</strong>で順番を決めると挫折しにくいです。</li>
                <li>まずはサブスク・通信のように手続きが軽いところから、必要なら保険・光熱・大物へ。</li>
                <li>効果は<strong>年間・複数年</strong>で見るとイメージしやすいです。</li>
                <li>削減額の累計は固定費削減インパクト計算、返済との関係は借入返済シミュレーターで確認できます。</li>
              </ul>
            </section>

            <section id="resources" className="not-prose">
              <h2 className="text-lg font-semibold text-stone-900">参考・相談先</h2>
              <p className="mt-3 text-base text-stone-700 leading-relaxed">
                借入や生活の判断で迷うときは、公的な相談窓口の利用も検討してください。一覧は次のページにまとめています。
              </p>
              <p className="mt-2">
                <Link href="/resources/consultation-guide" className="font-semibold text-emerald-900 underline">
                  相談先・公的支援の一覧へ →
                </Link>
              </p>
            </section>
          </ArticleProse>

          <ArticleFooter articleSlug="fixed-cost-checklist" showCta={false} />
        </div>
      </ArticlePageShell>
    </>
  );
}
