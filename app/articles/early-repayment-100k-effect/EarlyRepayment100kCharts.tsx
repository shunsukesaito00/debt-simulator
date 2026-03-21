"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const STONE_800 = "#292524";
const STONE_600 = "#57534e";
const GRAY_500 = "#6b7280";

/** 総利息比較（棒グラフ） */
const interestChartData = [
  { case: "繰り上げ返済なし", value: 854792 },
  { case: "10万円繰り上げ返済あり", value: 725246 },
];

/** 完済目安比較（棒グラフ） */
const monthsChartData = [
  { case: "繰り上げ返済なし", value: 60 },
  { case: "10万円繰り上げ返済あり", value: 56 },
];

function formatYen(val: number) {
  return `¥${Math.round(val).toLocaleString()}`;
}

export function InterestComparisonBarChart() {
  return (
    <div className="h-[260px] w-full min-w-0">
      <p className="mb-2 text-sm font-bold text-stone-700">総利息の比較</p>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={interestChartData} margin={{ top: 8, right: 8, left: 8, bottom: 8 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e7e5e4" />
          <XAxis dataKey="case" tick={{ fontSize: 11 }} stroke={STONE_600} />
          <YAxis tick={{ fontSize: 11 }} stroke={STONE_600} tickFormatter={(v) => `${(v / 10000).toFixed(0)}万`} />
          <Tooltip
            formatter={(v) => (v != null ? [formatYen(Number(v)), "総利息"] : "")}
            contentStyle={{ fontSize: 12 }}
          />
          <Bar dataKey="value" fill={STONE_800} radius={[4, 4, 0, 0]} name="総利息" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function MonthsComparisonBarChart() {
  return (
    <div className="h-[260px] w-full min-w-0">
      <p className="mb-2 text-sm font-bold text-stone-700">完済までの期間の比較</p>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={monthsChartData} margin={{ top: 8, right: 8, left: 8, bottom: 8 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e7e5e4" />
          <XAxis dataKey="case" tick={{ fontSize: 11 }} stroke={STONE_600} />
          <YAxis tick={{ fontSize: 11 }} stroke={STONE_600} tickFormatter={(v) => `${v}か月`} />
          <Tooltip formatter={(v) => (v != null ? [`${v}か月`, "完済目安"] : "")} contentStyle={{ fontSize: 12 }} />
          <Bar dataKey="value" fill={GRAY_500} radius={[4, 4, 0, 0]} name="完済目安" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function PaymentBreakdownCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="ds-subcard p-4">
        <div className="text-xs font-black text-stone-600">繰り上げ返済なし</div>
        <div className="mt-2 flex justify-between text-sm">
          <span className="text-stone-600">元本</span>
          <span className="font-bold text-stone-900">¥2,000,000</span>
        </div>
        <div className="mt-1 flex justify-between text-sm">
          <span className="text-stone-600">利息</span>
          <span className="font-bold text-stone-900">¥854,792</span>
        </div>
      </div>
      <div className="ds-subcard p-4">
        <div className="text-xs font-black text-stone-600">10万円繰り上げ返済あり</div>
        <div className="mt-2 flex justify-between text-sm">
          <span className="text-stone-600">元本</span>
          <span className="font-bold text-stone-900">¥2,000,000</span>
        </div>
        <div className="mt-1 flex justify-between text-sm">
          <span className="text-stone-600">利息</span>
          <span className="font-bold text-emerald-700">¥725,246</span>
        </div>
        <p className="mt-2 text-xs text-stone-600">利息約12.9万円減</p>
      </div>
    </div>
  );
}
