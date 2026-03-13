"use client";

import type { CalcResult } from "@/lib/loan-calc";
import { formatYen } from "../_lib/simulatorMappers";
import { downloadScheduleCsv } from "../_lib/simulatorCsv";

export type SimulatorScheduleTableSectionProps = {
  result: CalcResult;
  activeTab: "A" | "B";
};

export function SimulatorScheduleTableSection({ result, activeTab }: SimulatorScheduleTableSectionProps) {
  if (!result.ok) return null;

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold text-gray-900">返済表（{activeTab}）</h2>
        <button
          type="button"
          onClick={() => downloadScheduleCsv(result, activeTab)}
          className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-bold text-gray-600 hover:bg-gray-50"
        >
          CSVダウンロード
        </button>
      </div>
      <div className="mt-3 overflow-x-auto">
        <table className="w-full min-w-[560px] text-sm">
          <thead>
            <tr className="border-b border-gray-200 text-left text-sm text-gray-600">
              <th className="py-2.5 pr-4">年月</th>
              <th className="py-2.5 pr-4">年利(%)</th>
              <th className="py-2.5 pr-4 text-right">支払</th>
              <th className="py-2.5 pr-4 text-right">利息</th>
              <th className="py-2.5 pr-4 text-right">元金</th>
              <th className="py-2.5 pr-4 text-right">追加返済</th>
              <th className="py-2.5 text-right">残高</th>
            </tr>
          </thead>
          <tbody>
            {result.schedule.map((r, i) => (
              <tr key={i} className="border-b border-gray-100">
                <td className="py-2.5 pr-4">{r.year}/{r.month}</td>
                <td className="py-2.5 pr-4">{r.annualRatePercent}</td>
                <td className="py-2.5 pr-4 text-right">{formatYen(r.payment)}</td>
                <td className="py-2.5 pr-4 text-right">{formatYen(r.interest)}</td>
                <td className="py-2.5 pr-4 text-right">{formatYen(r.principal)}</td>
                <td className="py-2.5 pr-4 text-right">{r.bonus > 0 ? formatYen(r.bonus) : "-"}</td>
                <td className="py-2.5 text-right">{formatYen(r.balance)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
