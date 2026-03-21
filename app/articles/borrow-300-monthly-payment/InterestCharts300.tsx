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

const LABEL_3 = "3年返済";
const LABEL_5 = "5年返済";
const LABEL_50K = "毎月5万円返済";
const STONE_800 = "#292524";
const STONE_600 = "#57534e";

const monthlyData = [
  { period: LABEL_3, value: 103995 },
  { period: LABEL_5, value: 71370 },
  { period: LABEL_50K, value: 50000 },
];
const interestData = [
  { period: LABEL_3, value: 743820 },
  { period: LABEL_5, value: 1282188 },
  { period: LABEL_50K, value: 2579838 },
];
const monthsData = [
  { period: LABEL_3, value: 36 },
  { period: LABEL_5, value: 60 },
  { period: LABEL_50K, value: 112 },
];

function formatYen(val: number) {
  return `¥${Math.round(val).toLocaleString()}`;
}

export function MonthlyPaymentBarChart300() {
  return (
    <div>
      <p className="mb-2 text-sm font-bold text-stone-700">毎月返済額の比較</p>
      <div className="h-[220px] min-h-[220px] w-full min-h-0 min-w-0">
        <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={220}>
          <BarChart data={monthlyData} margin={{ top: 8, right: 8, left: 8, bottom: 8 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e7e5e4" />
            <XAxis dataKey="period" tick={{ fontSize: 11 }} stroke={STONE_600} />
            <YAxis tick={{ fontSize: 11 }} stroke={STONE_600} tickFormatter={(v) => `${(v / 10000).toFixed(0)}万`} />
            <Tooltip formatter={(v) => (v != null ? [formatYen(Number(v)), "毎月返済額"] : "")} contentStyle={{ fontSize: 12 }} />
            <Bar dataKey="value" fill={STONE_800} radius={[4, 4, 0, 0]} name="毎月返済額" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function TotalInterestBarChart300() {
  return (
    <div>
      <p className="mb-2 text-sm font-bold text-stone-700">総利息の比較</p>
      <div className="h-[220px] min-h-[220px] w-full min-h-0 min-w-0">
        <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={220}>
          <BarChart data={interestData} margin={{ top: 8, right: 8, left: 8, bottom: 8 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e7e5e4" />
            <XAxis dataKey="period" tick={{ fontSize: 11 }} stroke={STONE_600} />
            <YAxis tick={{ fontSize: 11 }} stroke={STONE_600} tickFormatter={(v) => `${(v / 10000).toFixed(0)}万`} />
            <Tooltip formatter={(v) => (v != null ? [formatYen(Number(v)), "総利息"] : "")} contentStyle={{ fontSize: 12 }} />
            <Bar dataKey="value" fill={STONE_600} radius={[4, 4, 0, 0]} name="総利息" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function PayoffMonthsBarChart300() {
  return (
    <div>
      <p className="mb-2 text-sm font-bold text-stone-700">完済までの期間（か月）の比較</p>
      <div className="h-[220px] min-h-[220px] w-full min-h-0 min-w-0">
        <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={220}>
          <BarChart data={monthsData} margin={{ top: 8, right: 8, left: 8, bottom: 8 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e7e5e4" />
            <XAxis dataKey="period" tick={{ fontSize: 11 }} stroke={STONE_600} />
            <YAxis tick={{ fontSize: 11 }} stroke={STONE_600} tickFormatter={(v) => `${v}か月`} />
            <Tooltip formatter={(v) => (v != null ? [`${Number(v)}か月`, "完済目安"] : "")} contentStyle={{ fontSize: 12 }} />
            <Bar dataKey="value" fill={STONE_800} radius={[4, 4, 0, 0]} name="完済目安(か月)" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
