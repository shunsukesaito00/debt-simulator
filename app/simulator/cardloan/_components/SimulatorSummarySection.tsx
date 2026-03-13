"use client";

import type { CalcResult } from "@/lib/loan-calc";
import { formatYen } from "../_lib/simulatorMappers";

export type SimulatorSummarySectionProps = {
  result: CalcResult;
  resultA: CalcResult;
  resultB: CalcResult;
  activeTab: "A" | "B";
};

export function SimulatorSummarySection({
  result,
  resultA,
  resultB,
  activeTab,
}: SimulatorSummarySectionProps) {
  return (
    <section className="flex min-h-0 flex-col rounded-xl border border-gray-200 bg-white p-5">
      <h2 className="text-lg font-black text-gray-900">サマリー（A/B 比較）</h2>
      {result.ok && (
        <div className="mt-4 grid grid-cols-2 gap-4 rounded-2xl border-2 border-gray-900/15 bg-gray-50 p-6 shadow-sm">
          <div>
            <div className="text-xs font-bold uppercase tracking-wide text-gray-500">毎月返済額</div>
            <div className="mt-1 text-2xl font-black text-gray-900 md:text-3xl">{formatYen(result.schedule[0]?.payment ?? 0)}</div>
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wide text-gray-500">総返済額</div>
            <div className="mt-1 text-2xl font-black text-gray-900 md:text-3xl">{formatYen(result.totalPayment + result.totalBonus)}</div>
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wide text-gray-500">利息合計</div>
            <div className="mt-1 text-xl font-black text-amber-700 md:text-2xl">{formatYen(result.totalInterest)}</div>
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wide text-gray-500">完済</div>
            <div className="mt-1 text-lg font-black text-gray-900 md:text-xl">{result.finalYear}年{result.finalMonth}月（{result.months}回）</div>
          </div>
        </div>
      )}
      <div className="mt-4 grid flex-1 grid-cols-3 gap-3 text-sm">
        <div className="text-xs text-gray-500 font-medium">項目</div>
        <div className={`text-xs font-bold ${activeTab === "A" ? "text-gray-900" : "text-gray-500"}`}>A</div>
        <div className={`text-xs font-bold ${activeTab === "B" ? "text-gray-900" : "text-gray-500"}`}>B</div>
        <div className="text-xs text-gray-500">毎月返済額</div>
        <div>{resultA.ok ? formatYen(resultA.schedule[0]?.payment ?? 0) : "-"}</div>
        <div>{resultB.ok ? formatYen(resultB.schedule[0]?.payment ?? 0) : "-"}</div>
        <div className="text-xs text-gray-500">総返済額</div>
        <div>{resultA.ok ? formatYen(resultA.totalPayment + resultA.totalBonus) : "-"}</div>
        <div>{resultB.ok ? formatYen(resultB.totalPayment + resultB.totalBonus) : "-"}</div>
        <div className="text-xs text-gray-500">利息合計</div>
        <div>{resultA.ok ? formatYen(resultA.totalInterest) : "-"}</div>
        <div>{resultB.ok ? formatYen(resultB.totalInterest) : "-"}</div>
        <div className="text-xs text-gray-500">完済</div>
        <div>{resultA.ok ? `${resultA.finalYear}年${resultA.finalMonth}月（${resultA.months}回）` : "-"}</div>
        <div>{resultB.ok ? `${resultB.finalYear}年${resultB.finalMonth}月（${resultB.months}回）` : "-"}</div>
        {resultA.ok && resultB.ok && (
          <>
            <div className="text-xs text-gray-500 pt-2 border-t border-gray-100">差分（B−A）</div>
            <div className="pt-2 border-t border-gray-100" />
            <div className="pt-2 border-t border-gray-100" />
            <div className="text-xs text-gray-500">総返済額</div>
            <div className={`col-span-2 font-bold ${(resultB.totalPayment + resultB.totalBonus) - (resultA.totalPayment + resultA.totalBonus) <= 0 ? "text-emerald-600" : "text-amber-600"}`}>
              {formatYen((resultB.totalPayment + resultB.totalBonus) - (resultA.totalPayment + resultA.totalBonus))}
            </div>
            <div className="text-xs text-gray-500">利息</div>
            <div className={`col-span-2 font-bold ${resultB.totalInterest - resultA.totalInterest <= 0 ? "text-emerald-600" : "text-amber-600"}`}>
              {formatYen(resultB.totalInterest - resultA.totalInterest)}
            </div>
            <div className="text-xs text-gray-500">完済月数</div>
            <div className={`col-span-2 font-bold ${resultB.months - resultA.months <= 0 ? "text-emerald-600" : "text-amber-600"}`}>
              {resultB.months <= resultA.months
                ? `${resultA.months - resultB.months}ヶ月短縮`
                : `${resultB.months - resultA.months}ヶ月延長`}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
