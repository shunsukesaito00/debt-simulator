import Link from "next/link";

export default function Home() {
  return (
    <div className="grid gap-6">
      <section className="rounded-3xl border border-gray-200 bg-white p-5 shadow-soft md:p-8">
        <h1 className="text-2xl font-black text-gray-900 md:text-4xl">
          借金返済シミュレーター
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          借入額・金利・返済条件から、完済までの期間、利息合計、返済表、推移グラフを試算します。
          （A/B比較・保存・共有リンク対応）
        </p>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/simulator/cardloan"
            className="rounded-2xl bg-gray-900 px-5 py-3 text-center text-sm font-black text-white hover:opacity-90"
          >
            シミュレーターを開く
          </Link>
          <div className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-xs text-gray-600">
            広告を入れてもUIが崩れにくいレイアウトで設計しています。
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-soft">
          <div className="text-sm font-black text-gray-900">入力が速い</div>
          <p className="mt-2 text-xs text-gray-600">
            万単位の入力を前提に、タイピング中心のUIでストレスを減らします。
          </p>
        </div>
        <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-soft">
          <div className="text-sm font-black text-gray-900">グラフで把握</div>
          <p className="mt-2 text-xs text-gray-600">
            残高 / 支払 / 利息を線で表示し、全体像を即理解できます。
          </p>
        </div>
        <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-soft">
          <div className="text-sm font-black text-gray-900">比較で意思決定</div>
          <p className="mt-2 text-xs text-gray-600">
            返済方式や金利条件をA/Bで比較し、差分を数値で提示します。
          </p>
        </div>
      </section>
    </div>
  );
}