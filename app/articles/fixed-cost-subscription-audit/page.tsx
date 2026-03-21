import type { Metadata } from "next";
import Link from "next/link";
import { ArticleFooter } from "@/app/components/ArticleFooter";
import { ArticlePagePremise, ArticleReadingPoints, ArticleEditorMemo } from "@/app/components/article";
import { getArticleBreadcrumbJsonLd, getArticleFaqJsonLd } from "@/lib/article-structured-data";
import { ARTICLE_AUTHOR_JSON_LD, ARTICLE_PUBLISHER_JSON_LD } from "@/lib/site-author";
import { ArticlePageShell } from "@/app/components/ArticlePageShell";
import { articleUsesWideLayout } from "@/lib/article-layout";


const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://debt-simulator-quzc.vercel.app";
const ARTICLE_URL = `${BASE}/articles/fixed-cost-subscription-audit`;
const ARTICLE_TITLE = "サブスク整理の進め方｜見落としやすい月額課金を洗い出す方法";

export const metadata: Metadata = {
  title: ARTICLE_TITLE,
  description:
    "サブスク・月額課金を見直したい方向けに、見落としがちな契約の洗い出し方と、やめる・減らすときの判断のポイントを整理します。",
  alternates: { canonical: ARTICLE_URL },
  openGraph: {
    title: ARTICLE_TITLE,
    description:
      "サブスク・月額課金を見直したい方向けに、見落としがちな契約の洗い出し方と、やめる・減らすときの判断のポイントを整理します。",
    url: ARTICLE_URL,
    type: "article",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: ARTICLE_TITLE,
  description:
    "サブスク・月額課金を見直したい方向けに、見落としがちな契約の洗い出し方と、やめる・減らすときの判断のポイントを整理します。",
  url: ARTICLE_URL,
  datePublished: "2025-03-11",
  dateModified: "2025-03-11",
  author: ARTICLE_AUTHOR_JSON_LD,
  publisher: ARTICLE_PUBLISHER_JSON_LD,
};

const faqItems = [
  {
    question: "サブスクはどこから確認すればよいですか？",
    answer:
      "クレジットカード・デビットカードの明細、スマホのサブスク管理画面（iOSの「設定」→「Apple ID」→「サブスクリプション」、Androidは「Google プレイ」の定期購入など）、銀行口座の引き落とし明細を確認すると、月額課金の一覧が洗い出しやすくなります。",
  },
  {
    question: "見落としがちな月額課金にはどんなものがありますか？",
    answer:
      "一度登録したきり忘れているもの（音楽・動画・ストレージ・ゲームの課金）、無料トライアル終了後の自動課金、アプリ内課金の定期購入、新聞・雑誌の電子版、クラウドサービスやドメインの年間契約を月換算したものなどが挙げられます。",
  },
  {
    question: "やめるか迷っているサブスクはどう判断すればよいですか？",
    answer:
      "「直近1〜3か月で実際に使ったか」を基準にすると判断しやすくなります。使っていないものは一時停止や解約を検討し、たまにしか使わないものは「必要なときだけ契約する」形に変えられないか検討するのがおすすめです。",
  },
  {
    question: "サブスクを整理すると月いくらくらい削れることがありますか？",
    answer:
      "契約数や内容によりますが、使っていないものを2〜3個解約するだけで月2,000円〜5,000円程度削減できるケースはよくあります。複数契約していると合計が意外と大きくなっていることがあるので、一覧にして確認する価値があります。",
  },
  {
    question: "固定費全体の削減効果を試算したいです。",
    answer:
      "サブスクだけでなく、通信費・保険なども含めた「月いくら削減したら1年・3年・5年でいくらになるか」は、当サイトの固定費削減インパクト計算で試算できます。サブスクで浮いた金額を入力すると、継続したときの効果を確認できます。",
  },
];

const breadcrumbJsonLd = getArticleBreadcrumbJsonLd(ARTICLE_URL, ARTICLE_TITLE);
const faqJsonLd = getArticleFaqJsonLd(faqItems);

const tocItems = [
  { id: "premise", label: "このページの前提" },
  { id: "conclusion", label: "結論｜まず洗い出してから判断する" },
  { id: "reading-points", label: "読み方のポイント" },
  { id: "how-to-list", label: "洗い出し方" },
  { id: "easy-to-miss", label: "見落としがちな月額課金" },
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

      
      <ArticlePageShell currentPageTitle={ARTICLE_TITLE} wide={articleUsesWideLayout("fixed-cost-subscription-audit")}>
<div className="ds-card ds-card-pad">
          <h1 className="text-2xl font-black text-stone-900 md:text-3xl">{ARTICLE_TITLE}</h1>

          <p className="mt-4 text-sm text-stone-600 leading-relaxed">
            サブスクや月額課金は、気づかないうちに契約が増え、合計額が大きくなっていることがあります。このページでは、見落としがちな契約の洗い出し方と、やめる・減らすときの判断のポイントを整理します。
          </p>

          <section id="premise" className="mt-6">
            <ArticlePagePremise
              comparisonConditions={[
                "サブスク・月額課金を「洗い出す → 使っているか確認 → 解約・見直しを検討」の流れで考える",
                "具体的なサービス名や料金は変動するため、進め方と確認ポイントを中心に記載している",
              ]}
              reasonForConditions="読者が自分で契約を一覧化し、何を残して何をやめるか判断できるようにするためです。"
            />
          </section>

          <section className="mt-6 ds-subcard p-4">
            <h2 className="text-sm font-black text-stone-900">目次</h2>
            <ul className="mt-2 space-y-1.5 text-sm">
              {tocItems.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className="text-stone-700 hover:underline">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <div className="mt-8 space-y-10 text-sm text-stone-700 leading-relaxed">
            <section id="conclusion">
              <h2 className="text-lg font-black text-stone-900 md:text-xl">
                結論｜まず洗い出してから判断する
              </h2>
              <p className="mt-3">
                サブスク整理は、<strong>まず「何にいくら払っているか」を洗い出す</strong>ところから始めると進めやすくなります。見落としがちな月額課金を一覧にしたうえで、「直近で実際に使ったか」を基準にやめる・減らすものを決めると、無理のない整理ができます。固定費見直しのなかでは手軽に着手しやすいので、
                <Link href="/articles/fixed-cost-checklist" className="font-bold text-stone-900 hover:underline">固定費見直しチェックリスト</Link>
                では最初の項目として推奨しています。
              </p>
            </section>

            <section id="reading-points">
              <ArticleReadingPoints
                points={[
                  {
                    label: "支払い方法ごとに確認する",
                    body: "クレジットカード・デビットカード・キャリア決済・銀行引き落としなど、支払い方法が分かれていると見落としが出やすいです。それぞれの明細や管理画面を確認します。",
                  },
                  {
                    label: "「直近で使ったか」で判断する",
                    body: "使っていないものは解約や一時停止を検討し、たまにしか使わないものは必要なときだけ契約する形に変えられないか検討すると、無駄を減らしつつ必要なものは残せます。",
                  },
                  {
                    label: "無料トライアルの自動課金に注意",
                    body: "トライアル終了後に自動で有料になる契約は、カレンダーにリマインドを入れるか、使わないなら終了前に解約すると、意図しない課金を防げます。",
                  },
                ]}
                misconceptions={[
                  "「全部やめれば一番削れる」と思いがちですが、本当に使っているものまでやめるとストレスになり、また契約し直すこともあります。使っているものは残し、使っていないものから手をつけるのがおすすめです。",
                  "「サブスクは月額が小さいから影響は小さい」と感じがちですが、複数契約していると合計で月数千円になることがあり、1年で考えると数万円の差になることもあります。",
                ]}
              />
            </section>

            <section id="how-to-list">
              <h2 className="text-lg font-black text-stone-900 md:text-xl">洗い出し方</h2>
              <ul className="mt-3 list-disc pl-5 space-y-1">
                <li>クレジットカード・デビットカードの利用明細で「月額」「定期」とわかるものを書き出す</li>
                <li>スマホのサブスク管理（Apple IDのサブスクリプション、Google プレイの定期購入など）を確認する</li>
                <li>銀行口座・電子マネーの定期的な引き落としを確認する</li>
                <li>請求書がメールで届いているサービスを「サブスク」フォルダで検索する</li>
              </ul>
              <p className="mt-3">
                一覧にしたら、月額と「直近1〜3か月で使ったか」をメモしておくと、やめるか残すかの判断がしやすくなります。
              </p>
            </section>

            <section id="easy-to-miss">
              <h2 className="text-lg font-black text-stone-900 md:text-xl">見落としがちな月額課金</h2>
              <p className="mt-3">
                音楽・動画・ストレージ・ゲームの課金、無料トライアル後の自動課金、アプリ内の定期購入、新聞・雑誌の電子版、クラウドサービスやドメインの年間契約（月換算）などは、契約したことを忘れがちです。請求元名がサービス名と違う場合もあるので、不明な引き落としは請求元に問い合わせて確認するのも有効です。
              </p>
              <p className="mt-3">
                整理で浮いた金額が、1年・3年・5年でいくらになるかは
                <Link href="/tools/fixed-cost-impact" className="font-bold text-stone-900 hover:underline">固定費削減インパクト計算</Link>
                で試算できます。
              </p>
              <div className="mt-6 ds-subcard p-6">
                <h3 className="text-base font-black text-stone-900">固定費削減インパクトを計算する</h3>
                <p className="mt-2 text-sm text-stone-700">
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
                purpose="固定費見直しの「最初の一歩」としてサブスク整理を推奨しているため、洗い出し方と判断のポイントに絞って書いています。"
                reasonAxis="サービスごとの料金は変動が大きいため、進め方と見落としがちなパターンを中心にしています。"
                memo="解約手続きはサービスごとに異なります。アプリ内で解約できるもの、Webで解約するもの、問い合わせが必要なものがあるので、各サービスのヘルプを確認するよう促すとよいです。"
              />
            </section>

            <section id="faq">
              <h2 className="text-lg font-black text-stone-900 md:text-xl">よくある質問</h2>
              <dl className="mt-4 space-y-4">
                {faqItems.map((item, i) => (
                  <div key={i}>
                    <dt className="font-bold text-stone-900">{item.question}</dt>
                    <dd className="mt-1 text-stone-700">{item.answer}</dd>
                  </div>
                ))}
              </dl>
            </section>

            <section id="summary">
              <h2 className="text-lg font-black text-stone-900 md:text-xl">まとめ</h2>
              <ul className="mt-3 list-disc pl-5 space-y-1">
                <li>サブスク整理は<strong>まず契約を洗い出す</strong>ところから。カード明細・スマホのサブスク管理・銀行引き落としを確認します。</li>
                <li>見落としがちな月額課金（無料トライアル後の自動課金、アプリ内課金など）を一覧にすると、やめるか残すかの判断がしやすくなります。</li>
                <li>「直近で使ったか」を基準に、使っていないものから解約・一時停止を検討するのがおすすめです。</li>
                <li>削減額の効果は
                  <Link href="/tools/fixed-cost-impact" className="font-bold text-stone-900 hover:underline">固定費削減インパクト計算</Link>
                  で確認できます。固定費全体の順番は
                  <Link href="/articles/fixed-cost-checklist" className="font-bold text-stone-900 hover:underline">固定費見直しチェックリスト</Link>
                  を参照してください。
                </li>
              </ul>
            </section>
          </div>

          <ArticleFooter articleSlug="fixed-cost-subscription-audit" />
        </div>
      </ArticlePageShell>
    </>
  );
}
