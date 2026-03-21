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

const LABEL_30K = "毎月3万円";
const LABEL_50K = "毎月5万円";
const STONE_800 = "#292524";
const STONE_600 = "#57534e";
const GRAY_500 = "#6b7280";

const monthsData = [
  { label: LABEL_30K, value: 50 },
  { label: LABEL_50K, value: 24 },
];
const interestData = [
  { label: LABEL_30K, value: 475166 },
  { label: LABEL_50K, value: 185022 },
];

function formatYen(val: number) {
  return `¥${Math.round(val).toLocaleString()}`;
}

export function RevoMonthsAndInterestBarCharts() {
  return (
    <div className="grid gap-8">
      <div>
        <p className="mb-2 text-sm font-bold text-stone-700">完済までの期間の比較</p>
        <div className="h-[220px] w-full min-w-0">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthsData} margin={{ top: 8, right: 8, left: 8, bottom: 8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e7e5e4" />
              <XAxis dataKey="label" tick={{ fontSize: 12 }} stroke={STONE_600} />
              <YAxis tick={{ fontSize: 11 }} stroke={STONE_600} tickFormatter={(v) => `${v}か月`} />
              <Tooltip formatter={(v) => (v != null ? [`${Number(v)}か月`, "完済までの期間"] : "")} contentStyle={{ fontSize: 12 }} />
              <Bar dataKey="value" fill={STONE_800} radius={[4, 4, 0, 0]} name="完済までの期間" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div>
        <p className="mb-2 text-sm font-bold text-stone-700">総利息の比較</p>
        <div className="h-[220px] w-full min-w-0">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={interestData} margin={{ top: 8, right: 8, left: 8, bottom: 8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e7e5e4" />
              <XAxis dataKey="label" tick={{ fontSize: 12 }} stroke={STONE_600} />
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

const stackData = [
  { label: LABEL_30K, 元本: 1000000, 利息: 475166 },
  { label: LABEL_50K, 元本: 1000000, 利息: 185022 },
];

export function RevoTotalPaymentStackedChart() {
  return (
    <div className="h-[260px] w-full min-w-0">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={stackData} margin={{ top: 8, right: 8, left: 8, bottom: 8 }} layout="vertical" barCategoryGap="28%">
          <CartesianGrid strokeDasharray="3 3" stroke="#e7e5e4" />
          <XAxis type="number" tick={{ fontSize: 11 }} stroke={STONE_600} tickFormatter={(v) => `${(v / 10000).toFixed(0)}万`} />
          <YAxis type="category" dataKey="label" tick={{ fontSize: 12 }} stroke={STONE_600} width={80} />
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
