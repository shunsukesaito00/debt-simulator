"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const PERIOD_3 = "3年返済";
const PERIOD_5 = "5年返済";
const STONE_800 = "#292524";
const STONE_600 = "#57534e";
const GRAY_500 = "#6b7280";

/** 毎月返済額・総利息の比較（2本の棒グラフを縦に並べる） */
const monthlyData = [
  { period: PERIOD_3, value: 34665, label: "毎月返済額（円）" },
  { period: PERIOD_5, value: 23790, label: "毎月返済額（円）" },
];
const interestData = [
  { period: PERIOD_3, value: 247952, label: "総利息（円）" },
  { period: PERIOD_5, value: 427396, label: "総利息（円）" },
];

function formatYen(val: number) {
  return `¥${Math.round(val).toLocaleString()}`;
}

export function MonthlyAndInterestBarCharts() {
  return (
    <div className="grid gap-8">
      <div>
        <p className="mb-2 text-sm font-bold text-stone-700">毎月返済額の比較</p>
        <div className="h-[220px] w-full min-h-0 min-w-0">
          <ResponsiveContainer width="100%" height="100%" minWidth={0}>
            <BarChart data={monthlyData} margin={{ top: 8, right: 8, left: 8, bottom: 8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e7e5e4" />
              <XAxis dataKey="period" tick={{ fontSize: 12 }} stroke={STONE_600} />
              <YAxis tick={{ fontSize: 11 }} stroke={STONE_600} tickFormatter={(v) => `${(v / 10000).toFixed(0)}万`} />
              <Tooltip formatter={(v) => (v != null ? [formatYen(Number(v)), "毎月返済額"] : "")} contentStyle={{ fontSize: 12 }} />
              <Bar dataKey="value" fill={STONE_800} radius={[4, 4, 0, 0]} name="毎月返済額" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div>
        <p className="mb-2 text-sm font-bold text-stone-700">総利息の比較</p>
        <div className="h-[220px] w-full min-h-0 min-w-0">
          <ResponsiveContainer width="100%" height="100%" minWidth={0}>
            <BarChart data={interestData} margin={{ top: 8, right: 8, left: 8, bottom: 8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e7e5e4" />
              <XAxis dataKey="period" tick={{ fontSize: 12 }} stroke={STONE_600} />
              <YAxis tick={{ fontSize: 11 }} stroke={STONE_600} tickFormatter={(v) => `${(v / 10000).toFixed(0)}万`} />
              <Tooltip formatter={(v) => (v != null ? [formatYen(Number(v)), "総利息"] : "")} contentStyle={{ fontSize: 12 }} />
              <Bar dataKey="value" fill={STONE_600} radius={[4, 4, 0, 0]} name="総利息" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

/** 総支払額の内訳（積み上げ棒グラフ） */
const stackData = [
  { period: PERIOD_3, 元本: 1000000, 利息: 247952 },
  { period: PERIOD_5, 元本: 1000000, 利息: 427396 },
];

export function TotalPaymentStackedChart() {
  return (
    <div className="h-[260px] w-full min-h-0 min-w-0">
      <ResponsiveContainer width="100%" height="100%" minWidth={0}>
        <BarChart data={stackData} margin={{ top: 8, right: 8, left: 8, bottom: 8 }} layout="vertical" barCategoryGap="28%">
          <CartesianGrid strokeDasharray="3 3" stroke="#e7e5e4" />
          <XAxis type="number" tick={{ fontSize: 11 }} stroke={STONE_600} tickFormatter={(v) => `${(v / 10000).toFixed(0)}万`} />
          <YAxis type="category" dataKey="period" tick={{ fontSize: 12 }} stroke={STONE_600} width={72} />
          <Tooltip
            formatter={(v) => (v != null ? formatYen(Number(v)) : "")}
            contentStyle={{ fontSize: 12 }}
            labelFormatter={(l) => l}
          />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          <Bar dataKey="元本" stackId="a" fill={STONE_800} radius={[0, 0, 0, 0]} name="元本" />
          <Bar dataKey="利息" stackId="a" fill={GRAY_500} radius={[0, 4, 4, 0]} name="利息" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
