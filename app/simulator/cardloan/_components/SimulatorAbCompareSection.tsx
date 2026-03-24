"use client";

import type { CalcResult } from "@/lib/loan-calc";
import { formatYen } from "../_lib/simulatorMappers";

export type SimulatorAbCompareSectionProps = {
  resultA: CalcResult;
  resultB: CalcResult;
};

export function SimulatorAbCompareSection({ resultA, resultB }: SimulatorAbCompareSectionProps) {
  if (!resultA.ok || !resultB.ok) return null;

  const totalDiff = (resultB.totalPayment + resultB.totalBonus) - (resultA.totalPayment + resultA.totalBonus);
  const interestDiff = resultB.totalInterest - resultA.totalInterest;
  const monthDiff = resultB.months - resultA.months;

  const totalText = totalDiff < 0 ? `${formatYen(Math.abs(totalDiff))}減った` : totalDiff > 0 ? `${formatYen(totalDiff)}増えた` : "変化なし";
  const interestText = interestDiff < 0 ? `${formatYen(Math.abs(interestDiff))}減った` : interestDiff > 0 ? `${formatYen(interestDiff)}増えた` : "変化なし";
  const monthText = monthDiff < 0 ? `${Math.abs(monthDiff)}ヶ月短くなった` : monthDiff > 0 ? `${monthDiff}ヶ月長くなった` : "変化なし";

  const totalTone = totalDiff <= 0 ? "text-emerald-700" : "text-amber-700";
  const interestTone = interestDiff <= 0 ? "text-emerald-700" : "text-amber-700";
  const monthTone = monthDiff <= 0 ? "text-emerald-700" : "text-amber-700";

  return (
    <section className="rounded-xl border border-stone-200 bg-white p-5">
      <h2 className="text-base font-bold text-stone-900">A/B 比較（B は A と比べてどう変わるか）</h2>
      <div className="mt-3 overflow-x-auto">
        <table className="w-full min-w-[360px] text-sm">
          <thead>
            <tr className="border-b border-stone-200 text-left text-sm text-stone-600">
              <th className="py-2.5 pr-4"></th>
              <th className="py-2.5 pr-4">A</th>
              <th className="py-2.5 pr-4">B</th>
              <th className="py-2.5">差分</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-stone-100">
              <td className="py-2.5 pr-4">総返済額</td>
              <td className="py-2.5 pr-4">{formatYen(resultA.totalPayment + resultA.totalBonus)}</td>
              <td className="py-2.5 pr-4">{formatYen(resultB.totalPayment + resultB.totalBonus)}</td>
              <td className={`py-2.5 font-semibold ${totalTone}`}>{totalText}</td>
            </tr>
            <tr className="border-b border-stone-100">
              <td className="py-2.5 pr-4">利息合計</td>
              <td className="py-2.5 pr-4">{formatYen(resultA.totalInterest)}</td>
              <td className="py-2.5 pr-4">{formatYen(resultB.totalInterest)}</td>
              <td className={`py-2.5 font-semibold ${interestTone}`}>{interestText}</td>
            </tr>
            <tr className="border-b border-stone-100">
              <td className="py-2.5 pr-4">完済回数</td>
              <td className="py-2.5 pr-4">{resultA.months}回</td>
              <td className="py-2.5 pr-4">{resultB.months}回</td>
              <td className={`py-2.5 font-semibold ${monthTone}`}>{monthText}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
