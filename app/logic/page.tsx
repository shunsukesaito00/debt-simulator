export const metadata = { title: "計算ロジック" };

export default function Page() {
  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-soft md:p-8">
      <h1 className="text-2xl font-black">計算ロジック</h1>

      <div className="mt-5 grid gap-5 text-sm text-gray-700 leading-relaxed">
        <section>
          <h2 className="text-base font-black text-gray-900">前提</h2>
          <ul className="mt-2 list-disc pl-5 space-y-1">
            <li>月次計算（年利% → 月利 = 年利/12）</li>
            <li>利息 = 当月期首残高 × 月利（端数処理あり）</li>
            <li>支払 = 利息 + 元金（ボーナス返済は別枠で元金に加算）</li>
            <li>返済は残高が0になるまで継続（上限月数を設けています）</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-black text-gray-900">端数処理</h2>
          <p className="mt-2">
            利息計算の端数は切り捨て（円未満）で行っています。金融機関の約定（四捨五入・切り上げ等）とは異なる場合があります。
          </p>
        </section>

        <section>
          <h2 className="text-base font-black text-gray-900">最終月の調整</h2>
          <p className="mt-2">
            最終月は過払いにならないよう、支払額を調整しています。通常返済＋追加返済の合計が残高＋利息を超える場合は、超過分を減額して残高0で完済する形で計算しています。
          </p>
        </section>

        <section>
          <h2 className="text-base font-black text-gray-900">返済方式</h2>
          <div className="mt-2 grid gap-3">
            <div>
              <div className="font-black text-gray-900">元利均等（回数指定）</div>
              <div>
                初期月利で毎月返済額（定額）を計算し、各月は「返済額−利息＝元金」で残高を減らします。
                途中で金利が変わる場合、厳密には返済額の再計算が必要ですが、本ツールは“目安”としての近似です。
              </div>
            </div>
            <div>
              <div className="font-black text-gray-900">元金均等（回数指定）</div>
              <div>
                元金を毎月一定で返済し、利息は残高に応じて逓減します。返済初期の支払が大きくなりやすい特徴があります。
              </div>
            </div>
            <div>
              <div className="font-black text-gray-900">定額元利（金額指定）</div>
              <div>
                毎月返済額を固定し、利息を差し引いた残りが元金になります。返済額が利息以下の場合、完済不能となるためエラー表示します。
              </div>
            </div>
            <div>
              <div className="font-black text-gray-900">定額元金（金額指定）</div>
              <div>
                毎月元金を固定し、利息を上乗せして支払います。元金が大きいほど完済が早まります。
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-base font-black text-gray-900">免責</h2>
          <p className="mt-2">
            実際の返済計算は金融機関の約定（返済日、日割り、端数処理、手数料等）に依存します。
            本ツールは意思決定の参考情報であり、正確性を保証するものではありません。
          </p>
        </section>
      </div>
    </div>
  );
}