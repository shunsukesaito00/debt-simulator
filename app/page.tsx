// app/page.tsx
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="grid gap-8">
      <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-soft md:p-10">
        <h1 className="text-3xl font-black text-gray-900 md:text-4xl">返済シミュレーター</h1>
        <p className="mt-3 text-sm leading-relaxed text-gray-600 md:text-base">
          借入額・金利・期間などを入力して、毎月の返済額と総返済額の目安を確認できます。
          実際の条件は金融機関・契約内容により異なるため、最終判断は必ず公式情報をご確認ください。
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/simulator/cardloan"
            className="rounded-2xl bg-gray-900 px-5 py-3 text-sm font-black text-white hover:opacity-90"
          >
            カードローン計算へ
          </Link>
          <Link
            href="/how-to"
            className="rounded-2xl border border-gray-200 bg-white px-5 py-3 text-sm font-black text-gray-700 hover:bg-gray-50"
          >
            使い方を見る
          </Link>
        </div>
      </section>

      <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-soft md:p-10">
        <h2 className="text-xl font-black text-gray-900">できること</h2>
        <ul className="mt-4 grid list-disc gap-2 pl-5 text-sm text-gray-700">
          <li>毎月返済額（概算）の算出</li>
          <li>総返済額・利息合計の確認</li>
          <li>条件（借入額 / 金利 / 返済方式など）を変えた比較</li>
          <li>返済表（年月付き）、CSVダウンロード、共有リンク</li>
        </ul>
      </section>
    </div>
  );
}