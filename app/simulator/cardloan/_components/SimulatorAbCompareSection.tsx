"use client";

import type { CalcResult } from "@/lib/loan-calc";
import { formatYen } from "../_lib/simulatorMappers";

export type SimulatorAbCompareSectionProps = {
  resultA: CalcResult;
  resultB: CalcResult;
};

export function SimulatorAbCompareSection({ resultA, resultB }: SimulatorAbCompareSectionProps) {
  if (!resultA.ok || !resultB.ok) return null;

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-5">
      <h2 className="text-base font-bold text-gray-900">A/B 比較</h2>
      <div className="mt-3 overflow-x-auto">
        <table className="w-full min-w-[360px] text-sm">
          <thead>
            <tr className="border-b border-gray-200 text-left text-sm text-gray-600">
              <th className="py-2.5 pr-4"></th>
              <th className="py-2.5 pr-4">A</th>
              <th className="py-2.5 pr-4">B</th>
              <th className="py-2.5">差分</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-100">
              <td className="py-2.5 pr-4">総返済額</td>
              <td className="py-2.5 pr-4">{formatYen(resultA.totalPayment + resultA.totalBonus)}</td>
              <td className="py-2.5 pr-4">{formatYen(resultB.totalPayment + resultB.totalBonus)}</td>
              <td className="py-2.5">{formatYen((resultB.totalPayment + resultB.totalBonus) - (resultA.totalPayment + resultA.totalBonus))}</td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="py-2.5 pr-4">利息合計</td>
              <td className="py-2.5 pr-4">{formatYen(resultA.totalInterest)}</td>
              <td className="py-2.5 pr-4">{formatYen(resultB.totalInterest)}</td>
              <td className="py-2.5">{formatYen(resultB.totalInterest - resultA.totalInterest)}</td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="py-2.5 pr-4">完済回数</td>
              <td className="py-2.5 pr-4">{resultA.months}回</td>
              <td className="py-2.5 pr-4">{resultB.months}回</td>
              <td className="py-2.5">{resultB.months - resultA.months}回</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
