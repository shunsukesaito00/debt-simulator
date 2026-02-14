// app/how-to/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "使い方",
  description: "カードローン返済シミュレーターの入力項目と結果の読み方を説明します。",
};

export default function Page() {
  return (
    <div className="grid gap-6">
      <header className="rounded-3xl border border-gray-200 bg-white p-6">
        <h1 className="text-2xl font-black">使い方</h1>
        <p className="mt-2 text-sm text-gray-600">
          返済計画の検討に必要な「入力」「結果の読み方」「よくある誤解」を、ツール仕様に沿って説明します。
        </p>
      </header>

      <section className="rounded-3xl border border-gray-200 bg-white p-6">
        <h2 className="text-lg font-black">1. 入力する項目</h2>
        <div className="mt-3 space-y-3 text-sm leading-relaxed text-gray-700">
          <p><span className="font-bold">借入金額</span>：借入元金（万円単位）を入力します。</p>
          <p><span className="font-bold">返済開始年月</span>：返済表の年月表示・完済年月の算出に使います。</p>
          <p><span className="font-bold">返済方式</span>：選択した方式により、毎月の支払額や元金の減り方が変わります（詳細は「計算ロジック」参照）。</p>
          <p><span className="font-bold">金利（段階変更）</span>：月N以降の年利%を設定できます。途中で金利が変わるケース（優遇終了など）を再現できます。</p>
          <p><span className="font-bold">ボーナス返済</span>：指定月に追加で返済します（元金に充当される想定）。</p>
        </div>
      </section>

      <section className="rounded-3xl border border-gray-200 bg-white p-6">
        <h2 className="text-lg font-black">2. 結果の見方</h2>
        <div className="mt-3 space-y-3 text-sm leading-relaxed text-gray-700">
          <p><span className="font-bold">合計返済</span>：毎月返済＋ボーナス返済の総額です。</p>
          <p><span className="font-bold">利息合計</span>：各月の利息の合計です。金利が高いほど・元金の減りが遅いほど増えます。</p>
          <p><span className="font-bold">完済まで（回）</span>：完済するまでの月数です。最後に残高が0になる月を完済月として表示します。</p>
          <p><span className="font-bold">返済表</span>：年月、支払、利息、元金、ボーナス、残高を月次で確認できます。</p>
          <p><span className="font-bold">CSV</span>：返済表をCSVとして保存し、Excel/スプレッドシートで確認できます。</p>
        </div>
      </section>

      <section className="rounded-3xl border border-gray-200 bg-white p-6">
        <h2 className="text-lg font-black">3. A/B比較の使い方</h2>
        <div className="mt-3 space-y-3 text-sm leading-relaxed text-gray-700">
          <p>
            A（本命）とB（比較用）に条件を入れ、合計返済・利息・完済月数の差分を確認できます。
            例：<span className="font-bold">金利だけ変える</span>、<span className="font-bold">毎月返済額だけ変える</span>、<span className="font-bold">ボーナス返済を入れる/外す</span>など。
          </p>
          <p>
            差分表示は「A − B」です。マイナスの場合、Aの方が合計返済や利息が少ない（有利）という意味になります。
          </p>
        </div>
      </section>

      <section className="rounded-3xl border border-gray-200 bg-white p-6">
        <h2 className="text-lg font-black">4. 注意（よくある入力ミス）</h2>
        <div className="mt-3 space-y-2 text-sm leading-relaxed text-gray-700">
          <p>・毎月返済額が利息以下だと、理論上元金が減らず完済できません（ツールはエラー表示します）。</p>
          <p>・ボーナス返済は「追加返済」として扱います。契約上の取扱い（任意返済の順序等）は金融機関で異なります。</p>
          <p>・端数処理（円未満、利息の丸め）は厳密には金融機関の規定に依存します。本ツールは実務でよくある単純化で計算します。</p>
        </div>
      </section>
    </div>
  );
}