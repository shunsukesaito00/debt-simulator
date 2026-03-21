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

const STONE_800 = "#292524";
const STONE_600 = "#57534e";
const GRAY_500 = "#6b7280";

const interestData = [
  { method: "元利均等", value: 247952 },
  { method: "元金均等", value: 231250 },
  { method: "定額元利", value: 220284 },
  { method: "定額元金", value: 212500 },
];

const burdenData = [
  { method: "元利均等", 初回: 34665, 最終回: 34665 },
  { method: "元金均等", 初回: 40278, 最終回: 28125 },
  { method: "定額元利", 初回: 35000, 最終回: 35000 },
  { method: "定額元金", 初回: 42500, 最終回: 30375 },
];

function formatYen(val: number) {
  return `¥${Math.round(val).toLocaleString()}`;
}

export function TotalInterestBarChart() {
  return (
    <div className="h-[260px] w-full min-w-0">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={interestData} margin={{ top: 8, right: 8, left: 8, bottom: 8 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e7e5e4" />
          <XAxis dataKey="method" tick={{ fontSize: 11 }} stroke={STONE_600} />
          <YAxis tick={{ fontSize: 11 }} stroke={STONE_600} tickFormatter={(v) => `${(v / 10000).toFixed(0)}万`} />
          <Tooltip formatter={(v) => (v != null ? [formatYen(Number(v)), "総利息"] : "")} contentStyle={{ fontSize: 12 }} />
          <Bar dataKey="value" fill={STONE_800} radius={[4, 4, 0, 0]} name="総利息" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function RepaymentBurdenComparisonChart() {
  return (
    <div className="h-[260px] w-full min-w-0">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={burdenData} margin={{ top: 8, right: 8, left: 8, bottom: 8 }} barCategoryGap="12%">
          <CartesianGrid strokeDasharray="3 3" stroke="#e7e5e4" />
          <XAxis dataKey="method" tick={{ fontSize: 11 }} stroke={STONE_600} />
          <YAxis tick={{ fontSize: 11 }} stroke={STONE_600} tickFormatter={(v) => `${(v / 10000).toFixed(0)}万`} />
          <Tooltip
            formatter={(v) => (v != null ? formatYen(Number(v)) : "")}
            contentStyle={{ fontSize: 12 }}
            labelFormatter={(l) => l}
          />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          <Bar dataKey="初回" fill={STONE_800} radius={[4, 4, 0, 0]} name="初回返済額" />
          <Bar dataKey="最終回" fill={GRAY_500} radius={[4, 4, 0, 0]} name="最終回返済額" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
