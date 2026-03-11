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
const GRAY_900 = "#111827";
const GRAY_600 = "#4b5563";
const GRAY_500 = "#6b7280";

const monthlyData = [
  { period: PERIOD_3, value: 103994 },
  { period: PERIOD_5, value: 71370 },
];
const interestData = [
  { period: PERIOD_3, value: 743766 },
  { period: PERIOD_5, value: 1282188 },
];

function formatYen(val: number) {
  return `¥${Math.round(val).toLocaleString()}`;
}

export function MonthlyAndInterestBarCharts300() {
  return (
    <div className="grid gap-8">
      <div>
        <p className="mb-2 text-sm font-bold text-gray-700">毎月返済額の比較</p>
        <div className="h-[220px] w-full min-w-0">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData} margin={{ top: 8, right: 8, left: 8, bottom: 8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="period" tick={{ fontSize: 12 }} stroke={GRAY_600} />
              <YAxis tick={{ fontSize: 11 }} stroke={GRAY_600} tickFormatter={(v) => `${(v / 10000).toFixed(0)}万`} />
              <Tooltip formatter={(v) => (v != null ? [formatYen(Number(v)), "毎月返済額"] : "")} contentStyle={{ fontSize: 12 }} />
              <Bar dataKey="value" fill={GRAY_900} radius={[4, 4, 0, 0]} name="毎月返済額" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div>
        <p className="mb-2 text-sm font-bold text-gray-700">総利息の比較</p>
        <div className="h-[220px] w-full min-w-0">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={interestData} margin={{ top: 8, right: 8, left: 8, bottom: 8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="period" tick={{ fontSize: 12 }} stroke={GRAY_600} />
              <YAxis tick={{ fontSize: 11 }} stroke={GRAY_600} tickFormatter={(v) => `${(v / 10000).toFixed(0)}万`} />
              <Tooltip formatter={(v) => (v != null ? [formatYen(Number(v)), "総利息"] : "")} contentStyle={{ fontSize: 12 }} />
              <Bar dataKey="value" fill={GRAY_600} radius={[4, 4, 0, 0]} name="総利息" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

const stackData = [
  { period: PERIOD_3, 元本: 3000000, 利息: 743766 },
  { period: PERIOD_5, 元本: 3000000, 利息: 1282188 },
];

export function TotalPaymentStackedChart300() {
  return (
    <div className="h-[260px] w-full min-w-0">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={stackData} margin={{ top: 8, right: 8, left: 8, bottom: 8 }} layout="vertical" barCategoryGap="28%">
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis type="number" tick={{ fontSize: 11 }} stroke={GRAY_600} tickFormatter={(v) => `${(v / 10000).toFixed(0)}万`} />
          <YAxis type="category" dataKey="period" tick={{ fontSize: 12 }} stroke={GRAY_600} width={72} />
          <Tooltip formatter={(v) => (v != null ? formatYen(Number(v)) : "")} contentStyle={{ fontSize: 12 }} labelFormatter={(l) => l} />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          <Bar dataKey="元本" stackId="a" fill={GRAY_900} radius={[0, 0, 0, 0]} name="元本" />
          <Bar dataKey="利息" stackId="a" fill={GRAY_500} radius={[0, 4, 4, 0]} name="利息" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
