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

const GRAY_900 = "#111827";
const GRAY_600 = "#4b5563";

/** 毎月1万円は完済不可に近い旨の注意カード */
export function CannotPayoffWarningCard() {
  return (
    <div className="rounded-2xl border-2 border-amber-200 bg-amber-50 p-4">
      <div className="text-xs font-black text-amber-800">毎月1万円のケース</div>
      <div className="mt-2 text-base font-black text-gray-900">完済不可に近い</div>
      <p className="mt-1 text-sm text-gray-700">
        返済額が初月利息（約12,500円）を下回るため、元本が減らず完済できない条件に近いです。
      </p>
    </div>
  );
}

const monthsData = [
  { label: "毎月1万5千円", value: 154 },
  { label: "毎月3万円", value: 50 },
];

export function PayoffMonthsBarChart() {
  return (
    <div className="h-[240px] w-full min-w-0">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={monthsData} margin={{ top: 8, right: 8, left: 8, bottom: 8 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="label" tick={{ fontSize: 11 }} stroke={GRAY_600} />
          <YAxis tick={{ fontSize: 11 }} stroke={GRAY_600} tickFormatter={(v) => `${v}か月`} />
          <Tooltip formatter={(v) => (v != null ? [`${Number(v)}か月`, "完済目安"] : "")} contentStyle={{ fontSize: 12 }} />
          <Bar dataKey="value" fill={GRAY_900} radius={[4, 4, 0, 0]} name="完済目安" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

const interestData = [
  { label: "毎月1万5千円", value: 1310000 },
  { label: "毎月3万円", value: 475166 },
];

function formatYen(val: number) {
  return `¥${Math.round(val).toLocaleString()}`;
}

export function TotalInterestBarChart() {
  return (
    <div className="h-[240px] w-full min-w-0">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={interestData} margin={{ top: 8, right: 8, left: 8, bottom: 8 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="label" tick={{ fontSize: 11 }} stroke={GRAY_600} />
          <YAxis tick={{ fontSize: 11 }} stroke={GRAY_600} tickFormatter={(v) => `${(v / 10000).toFixed(0)}万`} />
          <Tooltip formatter={(v) => (v != null ? [formatYen(Number(v)), "総利息"] : "")} contentStyle={{ fontSize: 12 }} />
          <Bar dataKey="value" fill={GRAY_600} radius={[4, 4, 0, 0]} name="総利息" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
