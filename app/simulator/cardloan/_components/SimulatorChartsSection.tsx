"use client";

import type { CalcResult } from "@/lib/loan-calc";
import { formatNum } from "../_lib/simulatorMappers";

function RepaymentChart({ result, className }: { result: CalcResult; className?: string }) {
  if (!result.ok || result.schedule.length === 0) return null;

  const rows = result.schedule;
  const maxBalance = Math.max(...rows.map((r) => r.balance), 1);
  const maxPay = Math.max(...rows.map((r) => r.payment + r.bonus), 1);
  const maxY = Math.max(maxBalance, maxPay);
  const w = 600;
  const h = 260;
  const pad = { l: 52, r: 24, t: 8, b: 44 };
  const chartW = w - pad.l - pad.r;
  const chartH = h - pad.t - pad.b;

  const toX = (i: number) => pad.l + (i / Math.max(rows.length - 1, 1)) * chartW;
  const toYBalance = (v: number) => pad.t + chartH - (v / maxY) * chartH;
  const toYPay = (v: number) => pad.t + chartH - (v / maxY) * chartH;

  const balancePath = rows.map((r, i) => `${i === 0 ? "M" : "L"} ${toX(i)} ${toYBalance(r.balance)}`).join(" ");
  const payPath = rows.map((r, i) => `${i === 0 ? "M" : "L"} ${toX(i)} ${toYPay(r.payment + r.bonus)}`).join(" ");
  const balanceAreaPath = `${balancePath} L ${toX(rows.length - 1)} ${h - pad.b} L ${pad.l} ${h - pad.b} Z`;

  const first = rows[0];
  const last = rows[rows.length - 1];
  const fmt = (v: number) => (v >= 10000 ? `${Math.round(v / 10000)}万` : formatNum(v));

  return (
    <div className={`overflow-x-auto ${className ?? ""}`}>
      <svg viewBox={`0 0 ${w} ${h}`} className="min-w-[280px] w-full" preserveAspectRatio="xMidYMid meet">
        {[0.25, 0.5, 0.75].map((p) => (
          <line key={p} x1={pad.l} y1={pad.t + chartH * (1 - p)} x2={w - pad.r} y2={pad.t + chartH * (1 - p)} stroke="#e7e5e4" strokeWidth="0.5" strokeDasharray="2 2" />
        ))}
        <path d={balanceAreaPath} fill="rgba(59,130,246,0.12)" stroke="none" />
        <line x1={pad.l} y1={pad.t} x2={pad.l} y2={h - pad.b} stroke="#a8a29e" strokeWidth="1" />
        <line x1={pad.l} y1={h - pad.b} x2={w - pad.r} y2={h - pad.b} stroke="#a8a29e" strokeWidth="1" />
        <path d={balancePath} fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d={payPath} fill="none" stroke="#059669" strokeWidth="2" strokeDasharray="5 3" strokeLinecap="round" strokeLinejoin="round" />
        <text x={pad.l - 6} y={h - pad.b + 4} textAnchor="end" fontSize="11" fill="#57534e">0</text>
        <text x={pad.l - 6} y={pad.t + 4} textAnchor="end" fontSize="11" fill="#57534e">{fmt(maxY)}</text>
        <text x={pad.l} y={h - 8} textAnchor="start" fontSize="11" fill="#57534e">{first.year}/{first.month}</text>
        <text x={w - pad.r} y={h - 8} textAnchor="end" fontSize="11" fill="#57534e">{last.year}/{last.month}</text>
        <g transform={`translate(${w - pad.r - 100}, ${pad.t})`}>
          <line x1={0} y1={6} x2={14} y2={6} stroke="#2563eb" strokeWidth="2.5" />
          <text x={18} y={10} fontSize="12" fill="#44403c">残高</text>
          <line x1={52} y1={6} x2={66} y2={6} stroke="#059669" strokeWidth="2" strokeDasharray="5 3" />
          <text x={70} y={10} fontSize="12" fill="#44403c">支払</text>
        </g>
      </svg>
    </div>
  );
}

export type SimulatorChartsSectionProps = {
  result: CalcResult;
  activeTab: "A" | "B";
};

export function SimulatorChartsSection({ result, activeTab }: SimulatorChartsSectionProps) {
  return (
    <section className="flex min-h-0 flex-col rounded-xl border border-stone-200 bg-white p-5">
      <h2 className="text-base font-bold text-stone-900">推移グラフ（{activeTab}）</h2>
      <div className="mt-3 min-h-[260px] flex-1 w-full">
        {result.ok ? <RepaymentChart result={result} className="w-full" /> : <p className="text-sm text-stone-500 py-8">計算結果がありません</p>}
      </div>
    </section>
  );
}
