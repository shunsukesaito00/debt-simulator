"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

function formatYen(n: number): string {
  if (n >= 10000) return `${(n / 10000).toFixed(1)}万円`;
  return `${n.toLocaleString()}円`;
}

export default function FixedCostImpactPage() {
  const [monthlyReduction, setMonthlyReduction] = useState(5000);
  const [customMonths, setCustomMonths] = useState<number | "">(12);

  const monthly = Math.max(0, Number.isFinite(monthlyReduction) ? monthlyReduction : 0);
  const months = customMonths === "" ? null : Math.max(0, Math.min(600, Math.floor(Number(customMonths))));

  const results = useMemo(() => {
    const oneYear = monthly * 12;
    const threeYears = monthly * 36;
    const fiveYears = monthly * 60;
    const custom = months != null && months > 0 ? monthly * months : null;
    return { oneYear, threeYears, fiveYears, custom, months };
  }, [monthly, months]);

  return (
    <div className="mx-auto max-w-2xl">
      <nav className="mb-4 text-sm text-gray-600" aria-label="パンくず">
        <ol className="flex flex-wrap items-center gap-1">
          <li>
            <Link href="/" className="font-medium text-gray-800 hover:underline">
              トップ
            </Link>
          </li>
          <li aria-hidden className="text-gray-400">
            /
          </li>
          <li>
            <Link href="/articles" className="font-medium text-gray-800 hover:underline">
              知っておきたいこと
            </Link>
          </li>
          <li aria-hidden className="text-gray-400">
            /
          </li>
          <li className="font-bold text-gray-900" aria-current="page">
            固定費削減インパクト計算
          </li>
        </ol>
      </nav>

      <div className="ds-card ds-card-pad">
        <h1 className="ds-h1">固定費削減インパクト計算</h1>
        <p className="mt-2 text-xs text-gray-500">
          入力値は送信されません。ブラウザ内だけで計算しています。
        </p>
        <p className="mt-2 text-sm text-slate-600 leading-relaxed">
          毎月の削減額を続けたとき、1年・3年・5年で合計いくらになるかをすぐ確認できます。通信費・サブスク・保険などの見直し効果を数字で把握するためのツールです。
        </p>

        <section className="ds-subcard mt-6 p-5">
          <h2 className="text-base font-black text-slate-900">入力</h2>
          <div className="mt-4 space-y-4">
            <div>
              <label htmlFor="monthly" className="block text-sm font-bold text-gray-800">
                毎月の削減額（円）
              </label>
              <input
                id="monthly"
                type="number"
                min={0}
                step={500}
                value={monthlyReduction}
                onChange={(e) => setMonthlyReduction(Number(e.target.value) || 0)}
                className="mt-1.5 w-full max-w-[12rem] rounded-xl border-2 border-gray-200 px-4 py-2.5 text-base font-bold text-gray-900 outline-none focus:border-gray-900"
              />
            </div>
            <div>
              <label htmlFor="months" className="block text-sm font-bold text-gray-800">
                継続月数（任意・指定した期間の合計も表示）
              </label>
              <input
                id="months"
                type="number"
                min={1}
                max={600}
                placeholder="例: 24"
                value={customMonths === "" ? "" : customMonths}
                onChange={(e) => {
                  const v = e.target.value;
                  setCustomMonths(v === "" ? "" : Math.max(0, Math.min(600, Math.floor(Number(v)) || 0)));
                }}
                className="mt-1.5 w-full max-w-[10rem] rounded-xl border-2 border-gray-200 px-4 py-2.5 text-base font-bold text-gray-900 outline-none focus:border-gray-900"
              />
              <p className="mt-1 text-xs text-gray-500">未入力の場合は1年・3年・5年のみ表示します。</p>
            </div>
          </div>
        </section>

        <section className="ds-subcard mt-6 p-5">
          <h2 className="text-base font-black text-slate-900">削減効果の目安</h2>
          <p className="mt-1 text-sm text-slate-600">
            毎月{formatYen(monthly)}の削減を続けた場合の累計です。
          </p>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[280px] text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-left text-gray-600">
                  <th className="py-2.5 pr-4 font-bold">期間</th>
                  <th className="py-2.5 text-right font-bold">累計削減額</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-2.5 pr-4">1年（12か月）</td>
                  <td className="py-2.5 text-right font-bold text-gray-900">{formatYen(results.oneYear)}</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2.5 pr-4">3年（36か月）</td>
                  <td className="py-2.5 text-right font-bold text-gray-900">{formatYen(results.threeYears)}</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2.5 pr-4">5年（60か月）</td>
                  <td className="py-2.5 text-right font-bold text-gray-900">{formatYen(results.fiveYears)}</td>
                </tr>
                {results.custom != null && results.months != null && results.months > 0 && (
                  <tr className="border-b border-gray-100 bg-gray-50/50">
                    <td className="py-2.5 pr-4">{results.months}か月</td>
                    <td className="py-2.5 text-right font-bold text-gray-900">{formatYen(results.custom)}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <section className="ds-subcard mt-6 p-5">
          <h2 className="text-sm font-bold text-slate-700">計算の考え方</h2>
          <p className="mt-2 text-xs text-slate-600 leading-relaxed">
            毎月の削減額 × 継続月数で累計を出しています。実際の支出は収入やライフイベントで変動するため、あくまで目安としてご利用ください。
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link href="/articles/fixed-cost-guide" className="ds-btn ds-btn-primary">
              固定費見直しの進め方
            </Link>
            <Link href="/simulator/cardloan" className="ds-btn ds-btn-secondary">
              借入返済シミュレーター
            </Link>
            <Link href="/articles" className="ds-btn ds-btn-secondary">
              記事一覧
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
