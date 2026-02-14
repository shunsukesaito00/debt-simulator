export const metadata = { title: "使い方" };

export default function Page() {
  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-soft md:p-8">
      <h1 className="text-2xl font-black">使い方</h1>

      <div className="mt-5 grid gap-5 text-sm text-gray-700 leading-relaxed">
        <section>
          <h2 className="text-base font-black text-gray-900">1. 借入条件を入力</h2>
          <ul className="mt-2 list-disc pl-5 space-y-1">
            <li>借入金額（万円）</li>
            <li>返済開始年月</li>
            <li>返済方式（元利均等 / 元金均等 / 定額元利 / 定額元金）</li>
            <li>金利（年利%）。途中で変わる場合は段階追加が可能</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-black text-gray-900">2. ボーナス返済（任意）</h2>
          <p className="mt-2">
            ボーナス返済を使う場合、月（例：6月/12月）と1回あたり金額を指定します。
            ボーナス返済は「当月の通常返済とは別枠」で元金に充当される前提です。
          </p>
        </section>

        <section>
          <h2 className="text-base font-black text-gray-900">3. 結果の見方</h2>
          <ul className="mt-2 list-disc pl-5 space-y-1">
            <li>サマリー：合計返済、利息合計、完済回数、最終年月など</li>
            <li>グラフ：残高（左軸）、支払/利息（右軸）の推移</li>
            <li>表：月ごとの返済内訳（支払・利息・元金・残高）</li>
            <li>A/B比較：条件の差分（利息・総返済・期間）</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-black text-gray-900">4. CSV出力</h2>
          <p className="mt-2">
            返済表はCSVでダウンロードできます。家計簿やスプレッドシートでの分析に利用できます。
          </p>
        </section>
      </div>
    </div>
  );
}