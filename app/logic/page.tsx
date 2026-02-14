// app/logic/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "計算ロジック",
  description: "本ツールの利息計算、返済方式、金利ステップ、ボーナス返済の扱いを説明します。",
};

export default function Page() {
  return (
    <div className="grid gap-6">
      <header className="rounded-3xl border border-gray-200 bg-white p-6">
        <h1 className="text-2xl font-black">計算ロジック</h1>
        <p className="mt-2 text-sm text-gray-600">
          本ページは「このツールがどう計算しているか」を明示するための説明です。契約上の算定方法は各社で異なり得ます。
        </p>
      </header>

      <section className="rounded-3xl border border-gray-200 bg-white p-6">
        <h2 className="text-lg font-black">1. 月利と利息</h2>
        <div className="mt-3 space-y-3 text-sm leading-relaxed text-gray-700">
          <p>
            年利（%）を月利に換算して利息を計算します。概念的には
            <span className="font-bold"> 月利 = 年利 / 12 </span>（%換算は小数で扱う）です。
          </p>
          <p>
            月次の利息は概ね <span className="font-bold">利息 = 残高 × 月利</span> の形で算出します。
            端数処理（切捨/四捨五入など）は金融機関ごとに異なるため、本ツールでは一般的な単純化を採用しています。
          </p>
        </div>
      </section>

      <section className="rounded-3xl border border-gray-200 bg-white p-6">
        <h2 className="text-lg font-black">2. 返済方式</h2>
        <div className="mt-3 space-y-4 text-sm leading-relaxed text-gray-700">
          <div>
            <div className="font-black">元利均等（回数）</div>
            <p className="mt-1">
              返済回数を固定し、毎月の支払額（元金＋利息）を一定にする方式です。
              金利が一定の場合は、標準的な元利均等の計算式で毎月返済額を決めます。
            </p>
          </div>

          <div>
            <div className="font-black">元金均等（回数）</div>
            <p className="mt-1">
              毎月返済する元金を一定にする方式です。序盤は利息が多く支払額が大きく、元金が減るにつれて支払額が小さくなる傾向があります。
            </p>
          </div>

          <div>
            <div className="font-black">定額元利（金額）</div>
            <p className="mt-1">
              毎月の返済額（元金＋利息）を金額指定します。返済額が利息以下だと元金が減らず完済できないため、ツールはエラー表示します。
            </p>
          </div>

          <div>
            <div className="font-black">定額元金（金額）</div>
            <p className="mt-1">
              毎月返済する元金を金額指定します。利息は残高に応じて変動するため、支払額（元金＋利息）は月ごとに変わります。
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-gray-200 bg-white p-6">
        <h2 className="text-lg font-black">3. 金利ステップ（段階変更）</h2>
        <div className="mt-3 space-y-3 text-sm leading-relaxed text-gray-700">
          <p>
            「月N〜 年利X%」のように、返済開始後の月数に応じて年利を切り替えられます。
            例：優遇金利が終了して金利が上がる、借換で金利が下がる、など。
          </p>
          <p>
            ツールは各月ごとに、その月に該当する年利を選んで利息計算に使用します。
          </p>
        </div>
      </section>

      <section className="rounded-3xl border border-gray-200 bg-white p-6">
        <h2 className="text-lg font-black">4. ボーナス返済</h2>
        <div className="mt-3 space-y-3 text-sm leading-relaxed text-gray-700">
          <p>
            指定した月に追加返済を行います。本ツールでは、ボーナス返済は主に<span className="font-bold">元金の追加返済</span>として扱います。
          </p>
          <p>
            実際の契約では、任意返済の充当順序（利息→元金、手数料の有無など）が異なる場合があります。
            正確な扱いは契約内容をご確認ください。
          </p>
        </div>
      </section>
    </div>
  );
}