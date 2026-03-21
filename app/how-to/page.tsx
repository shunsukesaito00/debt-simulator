import type { Metadata } from "next";
import { SupplementPageFooterHowTo } from "@/app/components/SupplementPageFooter";
import { ARTICLE_PUBLISHER_JSON_LD } from "@/lib/site-author";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://debt-simulator-quzc.vercel.app";

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "借入返済シミュレーターと条件別記事の使い方",
  description:
    "借入金額・返済方式・金利を入力し、ボーナス返済や追加返済を任意で設定して返済表やグラフで結果を確認する手順。CSV出力の案内を含む。",
  totalTime: "PT10M",
  isAccessibleForFree: true,
  publisher: ARTICLE_PUBLISHER_JSON_LD,
  step: [
    {
      "@type": "HowToStep",
      name: "借入条件を入力する",
      text: "借入金額（万円）、返済開始年月、返済方式（元利均等・元金均等・定額元利・定額元金）、金利（年利％。途中で変わる場合は段階追加）を入力します。",
    },
    {
      "@type": "HowToStep",
      name: "ボーナス返済を設定する（任意）",
      text: "利用する場合は、ボーナス月と1回あたりの金額を指定します。当月の通常返済とは別枠で元本に充当される前提です。",
    },
    {
      "@type": "HowToStep",
      name: "結果を確認する",
      text: "サマリーで合計返済・利息合計・完済回数を確認し、グラフで残高と支払の推移、表で月ごとの内訳を見ます。手取り月収を任意入力すると、初月返済額に対する返済負担率（参考）を表示します。A/B比較で条件の差分も確認できます。",
    },
    {
      "@type": "HowToStep",
      name: "CSVで出力する（任意）",
      text: "返済表をCSVでダウンロードし、家計簿やスプレッドシートで分析できます。",
    },
  ],
};

export const metadata: Metadata = {
  title: "使い方",
  description:
    "借入返済シミュレーターと条件別記事の使い方。借入条件の入力、ボーナス返済、結果の見方、記事とシミュの往復で判断に役立てる方法を説明します。",
  alternates: { canonical: `${BASE}/how-to` },
  openGraph: { title: "使い方", description: "借入返済シミュレーターと条件別記事の使い方。", url: `${BASE}/how-to`, type: "website" },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />
    <div className="ds-page-width">
      <div className="ds-surface-soft ds-card-pad">
      <h1 className="text-2xl font-semibold">使い方</h1>
      <p className="mt-3 text-base text-stone-700 leading-relaxed">
        このサイトでは、毎月の固定負担を条件別に比較・試算するために、借入返済シミュレーターと条件別の記事を用意しています。記事で条件の違いを理解し、シミュレーターで自分の数字を試算して、往復しながら判断に役立てる想定です。
      </p>
      <p className="mt-2 rounded-xl border border-stone-200 bg-stone-50 px-4 py-2 text-sm text-stone-600 leading-relaxed">
        すべての計算はお使いのブラウザ内だけで行われます。入力したデータが外部に送信されることはありません。
      </p>

      <div className="mt-5 grid gap-5 text-base text-stone-700 leading-relaxed">
        <section>
          <h2 className="text-base font-semibold text-stone-900">1. 借入条件を入力</h2>
          <ul className="mt-2 list-disc pl-5 space-y-1">
            <li>借入金額（万円）</li>
            <li>返済開始年月</li>
            <li>返済方式（元利均等 / 元金均等 / 定額元利 / 定額元金）</li>
            <li>金利（年利%）。途中で変わる場合は段階追加が可能</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-semibold text-stone-900">2. ボーナス返済（任意）</h2>
          <p className="mt-2">
            ボーナス返済を使う場合、月（例：6月/12月）と1回あたり金額を指定します。
            ボーナス返済は「当月の通常返済とは別枠」で元金に充当される前提です。
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-stone-900">3. 結果の見方</h2>
          <ul className="mt-2 list-disc pl-5 space-y-1">
            <li>サマリー：合計返済、利息合計、完済回数、最終年月など</li>
            <li>グラフ：残高（左軸）、支払/利息（右軸）の推移</li>
            <li>表：月ごとの返済内訳（支払・利息・元金・残高）</li>
            <li>A/B比較：条件の差分（利息・総返済・期間）</li>
            <li>
              手取り月収（任意）：入力するとサマリーに返済負担率（参考）を表示。審査や適正負担の判断を示すものではありません。
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-semibold text-stone-900">4. CSV出力</h2>
          <p className="mt-2">
            返済表はCSVでダウンロードできます。家計簿やスプレッドシートでの分析に利用できます。
          </p>
        </section>

        <SupplementPageFooterHowTo />
      </div>
      </div>
    </div>
    </>
  );
}