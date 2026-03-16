import type { Metadata } from "next";
import Link from "next/link";
import { ArticleFooter } from "@/app/components/ArticleFooter";
import { ArticlePagePremise, ArticleReadingPoints, ArticleEditorMemo } from "@/app/components/article";
import { getArticleBreadcrumbJsonLd, getArticleFaqJsonLd } from "@/lib/article-structured-data";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://debt-simulator-quzc.vercel.app";
const ARTICLE_URL = `${BASE}/articles/fixed-cost-checklist`;
const ARTICLE_TITLE = "固定費見直しチェックリスト｜何から削るか順番で解説";

export const metadata: Metadata = {
  title: ARTICLE_TITLE,
  description:
    "固定費を見直したい人向けに、何から手をつけるべきかを順番で整理したチェックリストです。見直しやすさ・削減額・生活への影響の3軸で比較し、取り組み順を解説します。",
  alternates: { canonical: ARTICLE_URL },
  openGraph: {
    title: ARTICLE_TITLE,
    description:
      "固定費を見直したい人向けに、何から手をつけるべきかを順番で整理したチェックリストです。見直しやすさ・削減額・生活への影響の3軸で比較します。",
    url: ARTICLE_URL,
    type: "article",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: ARTICLE_TITLE,
  description:
    "固定費を見直したい人向けに、何から手をつけるべきかを順番で整理したチェックリストです。見直しやすさ・削減額・生活への影響の3軸で比較します。",
  url: ARTICLE_URL,
  datePublished: "2025-03-11",
  dateModified: "2025-03-11",
  author: { "@type": "Organization", name: "借入返済シミュレーター" },
  publisher: { "@type": "Organization", name: "借入返済シミュレーター" },
};

const faqItems = [
  {
    question: "固定費見直しは何から始めるべきですか？",
    answer:
      "このページでは、すぐ変えやすい「サブスク」から始めることをおすすめしています。使っていないものの解約や一時停止は手軽にでき、小さくても改善を実感しやすいため、その後の通信費・保険などの見直しにもつなげやすくなります。",
  },
  {
    question: "固定費はどれくらい削れますか？",
    answer:
      "人によって異なりますが、サブスク・通信費・保険・光熱費などを総合的に見直すと、月5,000円〜1万円程度の削減が見込めるケースも少なくありません。削減額は固定費削減インパクト計算で、1年・3年・5年でいくらになるかを確認できます。",
  },
  {
    question: "家賃や保険を先に見直すべきですか？",
    answer:
      "金額は大きいですが、家賃は転居、保険は保障内容の理解が必要で、すぐには変えにくいです。このページでは、挫折しにくい順番として「サブスク → 通信費 → 保険 → 電気・ガス等 → 家賃・車」の順を推奨しています。まず着手しやすい項目で成功体験を積んでから、家賃・保険などの大物に進むと続けやすくなります。",
  },
  {
    question: "固定費の見直しにはどれくらい時間がかかりますか？",
    answer:
      "サブスクの整理なら30分〜1時間程度で一通り確認できます。通信費のプラン変更は手続き含めて数日、保険の見直しは内容確認に1〜2週間かかることもあります。一度にすべてやる必要はなく、着手しやすいものから順番に進めるのがおすすめです。",
  },
  {
    question: "チェックリストを一通り終えたら次は何をすればいいですか？",
    answer:
      "見直し後は、実際にいくら改善できたかを1〜2か月後に確認するのがおすすめです。改善額の累計は固定費削減インパクト計算で試算できます。また、浮いたお金を返済や貯蓄に回す場合は、借入返済シミュレーターで具体的な効果を確認するのも有効です。",
  },
];

const breadcrumbJsonLd = getArticleBreadcrumbJsonLd(ARTICLE_URL, ARTICLE_TITLE);
const faqJsonLd = getArticleFaqJsonLd(faqItems);

const tocItems = [
  { id: "premise", label: "このページの前提" },
  { id: "conclusion", label: "結論｜固定費見直しは「すぐ変えやすいもの」から始める" },
  { id: "reading-points", label: "読み方のポイント" },
  { id: "checklist", label: "固定費見直しチェックリスト" },
  { id: "order-reason", label: "順番でやる理由" },
  { id: "impact-view", label: "月5,000円・1万円改善の見え方" },
  { id: "loan-link", label: "借入返済とつなげる補足" },
  { id: "editor-memo", label: "編集メモ" },
  { id: "faq", label: "よくある質問" },
  { id: "summary", label: "まとめ" },
];

/** 取り組み順の判断表の行 */
const comparisonRows = [
  { item: "サブスク", ease: "◎", amount: "△", life: "小", priority: "1" },
  { item: "スマホ・通信費", ease: "◎", amount: "○", life: "小", priority: "2" },
  { item: "保険", ease: "○", amount: "○", life: "中", priority: "3" },
  { item: "電気・ガス", ease: "○", amount: "△", life: "小", priority: "4" },
  { item: "家賃・車", ease: "△", amount: "◎", life: "大", priority: "5" },
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
            固定費を見直したい人は多い一方で、「どこから削るべきか」がわからず手が止まりがちです。一度見直せば効果が続きやすいのが固定費の強みですが、金額が大きいものから順に切ればよいわけではありません。このページでは、<strong>何から・どういう順番で</strong>見直すかを整理したチェックリスト形式で解説します。
          </p>

          <section id="premise" className="mt-6">
            <ArticlePagePremise
            comparisonConditions={[
              "固定費を「見直しやすさ」「削減額の大きさ」「生活への影響」の3軸で考える",
              "「最も金額が大きいもの」からではなく、「取り組みやすく効果が続くもの」から始める前提で並べている",
            ]}
            reasonForConditions="読者が最初に挫折しない方が、実際の改善につながるためです。いきなり家賃や車から手をつけると止まりやすいので、まず着手しやすい項目で成功体験を積んでから大物に進む順番を重視しています。"
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
                結論｜固定費見直しは「すぐ変えやすいもの」から始める
              </h2>
              <p className="mt-3">
                結論から言うと、固定費見直しは<strong>すぐ変えやすいものから始める</strong>のがおすすめです。おすすめの順番は次のとおりです。
              </p>
              <ol className="mt-3 list-decimal pl-5 space-y-1">
                <li>サブスク（使っていない・重複しているものの解約）</li>
                <li>スマホ・通信費（プラン見直し・格安への切替）</li>
                <li>保険（内容確認・重複保障の整理）</li>
                <li>電気・ガスなどの契約（会社・プラン・オプション見直し）</li>
                <li>家賃や車などの大物（効果は大きいが、すぐ動きにくい）</li>
              </ol>
              <p className="mt-3">
                この順番にしている理由は、効果の大きさだけでなく、<strong>見直しの難易度と生活への影響のバランス</strong>が違うからです。最初から家賃や車に手をつけると負荷が高く、途中で止まりがちです。サブスクや通信費なら「今月から変えられる」ものが多く、小さくても改善を実感しやすいため、続けやすくなります。
              </p>
            </section>

            <section id="reading-points">
              <ArticleReadingPoints
                points={[
                  {
                    label: "月額の大きさだけで判断しない",
                    body: "家賃や保険は月額が大きいですが、すぐ変えにくく、生活への影響も大きいです。まずは「すぐやめられるか」「一度見直したあと継続しやすいか」を基準に並べています。",
                  },
                  {
                    label: "すぐやめられるか・継続しやすいか",
                    body: "解約やプラン変更が手軽なものから手をつけると、挫折しにくく、実際に削減が続きやすくなります。",
                  },
                  {
                    label: "生活満足度を下げすぎないか",
                    body: "削減額だけを追うと、必要なものまで切ってしまい、後から戻すことになりがちです。生活への影響が小さいものから優先する考え方で整理しています。",
                  },
                  {
                    label: "改善額は年間で見るとわかりやすい",
                    body: "月3,000円の削減でも、1年で36,000円になります。月額だと小さく見えがちなので、年間・複数年で見ると効果のイメージがつきやすくなります。",
                  },
                ]}
                misconceptions={[
                  "「固定費は金額が大きい順に削る」と思いがちですが、それだと家賃・保険から手をつけて止まりやすく、実際の改善につながりにくいことがあります。",
                  "「削れる金額が少ないから意味がない」と感じがちですが、固定費削減は継続しやすさが重要で、小さくても続く方が総額では大きくなります。",
                ]}
              />
            </section>

            <section id="checklist">
              <h2 className="text-lg font-black text-gray-900 md:text-xl">固定費見直しチェックリスト</h2>
              <p className="mt-3">
                以下は、<strong>取り組み順の判断</strong>をしやすくするための一覧です。金額順のランキングではなく、「何から手をつけるか」の目安として使ってください。詳しい進め方は
                <Link href="/articles/fixed-cost-guide" className="font-bold text-gray-900 hover:underline">固定費見直しの進め方</Link>
                でも整理しています。
              </p>

              <div className="mt-4 overflow-x-auto">
                <table className="w-full min-w-[420px] border-collapse text-sm">
                  <thead>
                    <tr className="border-b-2 border-gray-300 bg-gray-100">
                      <th className="py-2 px-3 text-left font-black text-gray-900">項目</th>
                      <th className="py-2 px-3 text-center font-black text-gray-900">見直しやすさ</th>
                      <th className="py-2 px-3 text-center font-black text-gray-900">削減額の大きさ</th>
                      <th className="py-2 px-3 text-center font-black text-gray-900">生活への影響</th>
                      <th className="py-2 px-3 text-center font-black text-gray-900">先にやるべき度</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonRows.map((row, i) => (
                      <tr key={i} className="border-b border-gray-200">
                        <td className="py-2 px-3 font-bold text-gray-800">{row.item}</td>
                        <td className="py-2 px-3 text-center text-gray-700">{row.ease}</td>
                        <td className="py-2 px-3 text-center text-gray-700">{row.amount}</td>
                        <td className="py-2 px-3 text-center text-gray-700">{row.life}</td>
                        <td className="py-2 px-3 text-center font-bold text-gray-900">{row.priority}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-2 text-xs text-gray-500">
                ◎＝高い／大、○＝中程度、△＝低い／小。先にやるべき度は、このページの「着手しやすさ＋続けやすさ」を重視した順番です。
              </p>

              <div className="mt-8 space-y-8">
                <div>
                  <h3 className="text-base font-black text-gray-900">A. サブスク</h3>
                  <ul className="mt-2 list-disc pl-5 space-y-1">
                    <li>使っていないものがないか</li>
                    <li>何となく続けているものがないか</li>
                    <li>代替できるもの（無料や安いサービス）がないか</li>
                  </ul>
                  <p className="mt-2">
                    解約や一時停止が比較的簡単で、<strong>まず着手しやすい</strong>のがサブスクです。複数契約していると月額の合計が意外と大きくなっていることがあるので、一覧にして「本当に使っているか」から確認するのがおすすめです。
                  </p>
                </div>

                <div>
                  <h3 className="text-base font-black text-gray-900">B. スマホ・通信費</h3>
                  <ul className="mt-2 list-disc pl-5 space-y-1">
                    <li>現在の料金プランが過剰でないか（データ量・通話）</li>
                    <li>格安プランへの切替余地</li>
                    <li>自宅回線（光・Wi-Fi）との重複やセット割の見直し</li>
                  </ul>
                  <p className="mt-2">
                    契約変更は手続きが必要ですが、一度見直すと<strong>効果が出やすく、継続しやすい</strong>です。スマホと自宅回線をセットで見直すと、削減額がまとまって見えやすくなります。
                  </p>
                </div>

                <div>
                  <h3 className="text-base font-black text-gray-900">C. 保険</h3>
                  <ul className="mt-2 list-disc pl-5 space-y-1">
                    <li>内容を理解しないまま入っていないか</li>
                    <li>重複保障がないか（同じような補償が複数）</li>
                  </ul>
                  <p className="mt-2">
                    保険は<strong>安易に削るのではなく、保障内容を確認したうえで慎重に</strong>見直す必要があります。必要以上の保障を減らすことで月額を下げられる一方、削りすぎるといざというときに困るので、自分で判断しづらい場合は相談窓口や専門家の助言も検討してください。
                  </p>
                </div>

                <div>
                  <h3 className="text-base font-black text-gray-900">D. 電気・ガス・その他契約</h3>
                  <ul className="mt-2 list-disc pl-5 space-y-1">
                    <li>契約会社やプランの見直し（乗り換え・従量制など）</li>
                    <li>使っていないオプションの解約</li>
                  </ul>
                  <p className="mt-2">
                    単品の月額は中くらいでも、<strong>一度見直すと継続効果がある</strong>分野です。契約更新タイミングでまとめて見直すと手間が少なく済みます。
                  </p>
                </div>

                <div>
                  <h3 className="text-base font-black text-gray-900">E. 家賃・車などの大物</h3>
                  <p className="mt-2">
                    効果は大きいですが、<strong>すぐ動きにくく、難易度が高い</strong>ため、最初の一手としては負荷が重くなりがちです。転居・車の乗り換えや維持費の見直しは、上記のサブスク・通信費・保険などで「見直しの感覚」をつかんでから取り組むと、現実的に続きやすくなります。長期では非常に効く可能性があるので、タイミングが来たら検討するのがおすすめです。
                  </p>
                </div>
              </div>
            </section>

            <section id="order-reason">
              <h2 className="text-lg font-black text-gray-900 md:text-xl">順番でやる理由</h2>
              <p className="mt-3">
                固定費見直しは、<strong>いきなり大物から入ると止まりやすい</strong>傾向があります。家賃や車は変更のハードルが高く、検討しているうちに疲れてやめてしまうことも少なくありません。一方で、小さくてもすぐ改善できるものから始めると、「今月から変わった」と実感しやすく、次の項目にも手が伸びやすくなります。このページでは、読者が挫折しにくい順番を重視して並べています。
              </p>
            </section>

            <section id="impact-view">
              <h2 className="text-lg font-black text-gray-900 md:text-xl">月5,000円・1万円改善の見え方</h2>
              <p className="mt-3">
                固定費削減は、月額で見ると「数千円」と小さく感じがちです。しかし<strong>年間で見ると差が大きい</strong>です。月5,000円の削減なら1年で6万円、月1万円なら12万円になります。3年・5年続けたときの合計をイメージすると、見直しのモチベーションにもつながります。
              </p>
              <p className="mt-3">
                自分の「月いくら削減したら、1年・3年・5年でいくらになるか」は、
                <Link href="/tools/fixed-cost-impact" className="font-bold text-gray-900 hover:underline">固定費削減インパクト計算</Link>
                でその場で試算できます。数字で確認すると理解しやすいので、チェックリストで見直し項目を洗い出したあとに、ぜひ試してみてください。
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

            <section id="loan-link">
              <h2 className="text-lg font-black text-gray-900 md:text-xl">借入返済とつなげる補足</h2>
              <p className="mt-3">
                固定費を見直して浮いたお金は、借入の返済や貯蓄にも回せます。生活改善と返済改善は別の話ではなく、<strong>つながっている</strong>と考えてよいです。無理のない月々の負担を考える視点として、
                <Link href="/simulator/cardloan" className="font-bold text-gray-900 hover:underline">借入返済シミュレーター</Link>
                で「月いくら返済できるか」「返済期間をどうするか」を試すと、固定費削減で浮いた分をどう使うかの判断材料になります。このページの主役はあくまで固定費見直しですが、返済中の方はシミュレーターとあわせて考えると、全体の負担の見え方が変わります。
              </p>
            </section>

            <section id="editor-memo">
              <ArticleEditorMemo
                purpose="「何が一番削れるか」ではなく、「何から始めれば改善が続くか」を判断してほしい、という意図でこの順番にしています。"
                reasonAxis="金額の大きさだけでなく、着手しやすさと続けやすさを優先して並べています。固定費見直しは最初の成功体験がないと継続しにくいため、最初の1〜2項目を終えてから大物固定費に進む方が現実的だと考えています。"
                memo="最初の1〜2項目（サブスク・通信費あたり）を終えてから、保険・光熱費・家賃・車に進む流れを想定しています。"
              />
            </section>

            <section id="faq">
              <h2 className="text-lg font-black text-gray-900 md:text-xl">よくある質問</h2>
              <dl className="mt-4 space-y-4">
                <div>
                  <dt className="font-bold text-gray-900">固定費見直しは何から始めるべきですか？</dt>
                  <dd className="mt-1 text-gray-700">
                    このページでは、すぐ変えやすい「サブスク」から始めることをおすすめしています。使っていないものの解約や一時停止は手軽にでき、小さくても改善を実感しやすいため、その後の通信費・保険などの見直しにもつなげやすくなります。
                  </dd>
                </div>
                <div>
                  <dt className="font-bold text-gray-900">固定費はどれくらい削れますか？</dt>
                  <dd className="mt-1 text-gray-700">
                    人によって異なりますが、サブスク・通信費・保険・光熱費などを総合的に見直すと、月5,000円〜1万円程度の削減が見込めるケースも少なくありません。削減額は
                    <Link href="/tools/fixed-cost-impact" className="font-bold text-gray-900 hover:underline">固定費削減インパクト計算</Link>
                    で、1年・3年・5年でいくらになるかを確認できます。
                  </dd>
                </div>
                <div>
                  <dt className="font-bold text-gray-900">家賃や保険を先に見直すべきですか？</dt>
                  <dd className="mt-1 text-gray-700">
                    金額は大きいですが、家賃は転居、保険は保障内容の理解が必要で、すぐには変えにくいです。このページでは、挫折しにくい順番として「サブスク → 通信費 → 保険 → 電気・ガス等 → 家賃・車」の順を推奨しています。まず着手しやすい項目で成功体験を積んでから、家賃・保険などの大物に進むと続けやすくなります。
                  </dd>
                </div>
                <div>
                  <dt className="font-bold text-gray-900">固定費の見直しにはどれくらい時間がかかりますか？</dt>
                  <dd className="mt-1 text-gray-700">
                    サブスクの整理なら30分〜1時間程度で一通り確認できます。通信費のプラン変更は手続き含めて数日、保険の見直しは内容確認に1〜2週間かかることもあります。一度にすべてやる必要はなく、着手しやすいものから順番に進めるのがおすすめです。
                  </dd>
                </div>
                <div>
                  <dt className="font-bold text-gray-900">チェックリストを一通り終えたら次は何をすればいいですか？</dt>
                  <dd className="mt-1 text-gray-700">
                    見直し後は、実際にいくら改善できたかを1〜2か月後に確認するのがおすすめです。改善額の累計は固定費削減インパクト計算で試算できます。また、浮いたお金を返済や貯蓄に回す場合は、借入返済シミュレーターで具体的な効果を確認するのも有効です。
                  </dd>
                </div>
              </dl>
            </section>

            <section id="summary">
              <h2 className="text-lg font-black text-gray-900 md:text-xl">まとめ</h2>
              <ul className="mt-3 list-disc pl-5 space-y-1">
                <li>固定費見直しは、金額だけでなく<strong>始めやすさ・続けやすさ</strong>で順番を決めるのがおすすめです。</li>
                <li>最初はサブスクや通信費など、着手しやすいものから始めると、挫折しにくく改善が続きやすいです。</li>
                <li>効果は月額より<strong>年間で見ると</strong>大きいので、イメージしづらいときは年間・複数年で考えてみてください。</li>
                <li>自分の改善額は
                  <Link href="/tools/fixed-cost-impact" className="font-bold text-gray-900 hover:underline">固定費削減インパクト計算</Link>
                  で確認できます。
                </li>
                <li>借入返済など他の固定負担も含めて考えたい方は、
                  <Link href="/simulator/cardloan" className="font-bold text-gray-900 hover:underline">借入返済シミュレーター</Link>
                  や
                  <Link href="/articles" className="font-bold text-gray-900 hover:underline">記事一覧</Link>
                  の関連記事もあわせてご覧ください。
                </li>
              </ul>
            </section>
          </div>

          <ArticleFooter articleSlug="fixed-cost-checklist" />
        </div>
      </article>
    </>
  );
}
