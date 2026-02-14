import Link from "next/link";
import { AdSlot } from "./components/AdSlot";

export default function HomePage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-extrabold">返済シミュレーター</h1>
        <p className="text-gray-700">
          借入額・金利・期間を入力して、毎月返済額と総返済額の目安を確認できます（元利均等）。
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <Link
          href="/simulator/cardloan"
          className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-gray-50"
        >
          カードローン計算へ
        </Link>
        <Link
          href="/how-to"
          className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-gray-50"
        >
          使い方を見る
        </Link>
      </div>

      {/* 審査中は表示されない（NEXT_PUBLIC_SHOW_ADS=0） */}
      <AdSlot />

      <section className="rounded-xl border p-4">
        <h2 className="font-bold">できること</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-gray-700">
          <li>毎月返済額（概算）の算出</li>
          <li>総返済額・利息合計の確認</li>
          <li>条件（借入額/金利/期間）を変えた比較</li>
        </ul>
      </section>
    </div>
  );
}