"use client";

import type { CalcResult } from "@/lib/loan-calc";
import { formatYen } from "../_lib/simulatorMappers";

function repaymentBurdenPercent(firstPayment: number, takeHomeMonthly: number): string {
  if (takeHomeMonthly <= 0) return "—";
  const pct = (firstPayment / takeHomeMonthly) * 100;
  return `${Math.round(pct * 10) / 10}%`;
}

export type SimulatorSummarySectionProps = {
  result: CalcResult;
  resultA: CalcResult;
  resultB: CalcResult;
  activeTab: "A" | "B";
  /** 手取り月収（円）。設定時のみ負担率を表示 */
  takeHomeMonthly: number | null;
};

export function SimulatorSummarySection({
  result,
  resultA,
  resultB,
  activeTab,
  takeHomeMonthly,
}: SimulatorSummarySectionProps) {
  return (
    <section className="flex min-h-0 flex-col rounded-ds border border-stone-200/70 bg-white/90 p-5 shadow-sm">
      <h2 className="text-lg font-semibold text-stone-900">選択中プラン（{activeTab}）のサマリー</h2>
      {result.ok && (
        <div className="mt-4 grid grid-cols-2 gap-4 rounded-ds border border-emerald-200/60 bg-emerald-50/40 p-6">
          <div>
            <div className="ds-label">毎月返済額</div>
            <div className="mt-1 text-2xl font-bold text-stone-900 md:text-3xl">{formatYen(result.schedule[0]?.payment ?? 0)}</div>
          </div>
          <div>
            <div className="ds-label">総返済額</div>
            <div className="mt-1 text-2xl font-bold text-stone-900 md:text-3xl">{formatYen(result.totalPayment + result.totalBonus)}</div>
          </div>
          <div>
            <div className="ds-label">利息合計</div>
            <div className="mt-1 text-xl font-bold text-amber-800 md:text-2xl">{formatYen(result.totalInterest)}</div>
          </div>
          <div>
            <div className="ds-label">完済</div>
            <div className="mt-1 text-lg font-bold text-stone-900 md:text-xl">{result.finalYear}年{result.finalMonth}月（{result.months}回）</div>
          </div>
        </div>
      )}
      <div className="mt-4 grid flex-1 grid-cols-3 gap-3 text-sm">
        <div className="text-xs font-medium text-stone-500">項目</div>
        <div className={`text-xs font-semibold ${activeTab === "A" ? "text-emerald-950" : "text-stone-500"}`}>A</div>
        <div className={`text-xs font-semibold ${activeTab === "B" ? "text-emerald-950" : "text-stone-500"}`}>B</div>
        <div className="text-xs text-stone-500">毎月返済額</div>
        <div>{resultA.ok ? formatYen(resultA.schedule[0]?.payment ?? 0) : "-"}</div>
        <div>{resultB.ok ? formatYen(resultB.schedule[0]?.payment ?? 0) : "-"}</div>
        <div className="text-xs text-stone-500">総返済額</div>
        <div>{resultA.ok ? formatYen(resultA.totalPayment + resultA.totalBonus) : "-"}</div>
        <div>{resultB.ok ? formatYen(resultB.totalPayment + resultB.totalBonus) : "-"}</div>
        <div className="text-xs text-stone-500">利息合計</div>
        <div>{resultA.ok ? formatYen(resultA.totalInterest) : "-"}</div>
        <div>{resultB.ok ? formatYen(resultB.totalInterest) : "-"}</div>
        <div className="text-xs text-stone-500">完済</div>
        <div>{resultA.ok ? `${resultA.finalYear}年${resultA.finalMonth}月（${resultA.months}回）` : "-"}</div>
        <div>{resultB.ok ? `${resultB.finalYear}年${resultB.finalMonth}月（${resultB.months}回）` : "-"}</div>
        {takeHomeMonthly != null && takeHomeMonthly > 0 && (
          <>
            <div className="text-xs text-stone-500">返済負担率（参考）</div>
            <div className="text-emerald-900">
              {resultA.ok
                ? repaymentBurdenPercent(resultA.schedule[0]?.payment ?? 0, takeHomeMonthly)
                : "-"}
            </div>
            <div className="text-emerald-900">
              {resultB.ok
                ? repaymentBurdenPercent(resultB.schedule[0]?.payment ?? 0, takeHomeMonthly)
                : "-"}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
