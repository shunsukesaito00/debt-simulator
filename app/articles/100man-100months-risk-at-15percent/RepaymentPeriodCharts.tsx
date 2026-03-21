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

const monthlyData = [
  { label: "36ヶ月返済", value: 34665 },
  { label: "60ヶ月返済", value: 23790 },
  { label: "100ヶ月返済", value: 16135 },
];

const interestData = [
  { label: "36ヶ月返済", value: 247952 },
  { label: "60ヶ月返済", value: 427396 },
  { label: "100ヶ月返済", value: 613500 },
];

const stackData = [
  { label: "36ヶ月返済", 元本: 1000000, 利息: 247952 },
  { label: "60ヶ月返済", 元本: 1000000, 利息: 427396 },
  { label: "100ヶ月返済", 元本: 1000000, 利息: 613500 },
];

function formatYen(val: number) {
  return `¥${Math.round(val).toLocaleString()}`;
}

export function MonthlyPaymentBarChart() {
  return (
    <div className="h-[260px] w-full min-h-0 min-w-0">
      <ResponsiveContainer width="100%" height="100%" minWidth={0}>
        <BarChart data={monthlyData} margin={{ top: 8, right: 8, left: 8, bottom: 8 }} barCategoryGap="12%">
          <CartesianGrid strokeDasharray="3 3" stroke="#e7e5e4" />
          <XAxis dataKey="label" tick={{ fontSize: 11 }} stroke={STONE_600} />
          <YAxis tick={{ fontSize: 11 }} stroke={STONE_600} tickFormatter={(v) => `${(v / 10000).toFixed(1)}万`} />
          <Tooltip
            formatter={(v) => (v != null ? [formatYen(Number(v)), "毎月返済額"] : "")}
            contentStyle={{ fontSize: 12 }}
            labelFormatter={(l) => l}
          />
          <Bar dataKey="value" fill={STONE_800} radius={[4, 4, 0, 0]} name="毎月返済額" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function TotalInterestBarChart() {
  return (
    <div className="h-[260px] w-full min-h-0 min-w-0">
      <ResponsiveContainer width="100%" height="100%" minWidth={0}>
        <BarChart data={interestData} margin={{ top: 8, right: 8, left: 8, bottom: 8 }} barCategoryGap="12%">
          <CartesianGrid strokeDasharray="3 3" stroke="#e7e5e4" />
          <XAxis dataKey="label" tick={{ fontSize: 11 }} stroke={STONE_600} />
          <YAxis tick={{ fontSize: 11 }} stroke={STONE_600} tickFormatter={(v) => `${(v / 10000).toFixed(0)}万`} />
          <Tooltip
            formatter={(v) => (v != null ? [formatYen(Number(v)), "総利息"] : "")}
            contentStyle={{ fontSize: 12 }}
            labelFormatter={(l) => l}
          />
          <Bar dataKey="value" fill={STONE_600} radius={[4, 4, 0, 0]} name="総利息" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function TotalPaymentStackedChart() {
  return (
    <div className="h-[260px] w-full min-h-0 min-w-0">
      <ResponsiveContainer width="100%" height="100%" minWidth={0}>
        <BarChart data={stackData} margin={{ top: 8, right: 8, left: 8, bottom: 8 }} layout="vertical" barCategoryGap="28%">
          <CartesianGrid strokeDasharray="3 3" stroke="#e7e5e4" />
          <XAxis type="number" tick={{ fontSize: 11 }} stroke={STONE_600} tickFormatter={(v) => `${(v / 10000).toFixed(0)}万`} />
          <YAxis type="category" dataKey="label" tick={{ fontSize: 12 }} stroke={STONE_600} width={88} />
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
