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

const GRAY_900 = "#111827";
const GRAY_600 = "#4b5563";
const GRAY_500 = "#6b7280";

const principalData = [
  { label: "毎月3万円", 三年: 865000, 五年: 1261000 },
  { label: "毎月5万円", 三年: 1442000, 五年: 2101000 },
  { label: "毎月7万円", 三年: 2019000, 五年: 2942000 },
];

const interestData = [
  { label: "毎月3万円", 三年: 215000, 五年: 539000 },
  { label: "毎月5万円", 三年: 358000, 五年: 899000 },
  { label: "毎月7万円", 三年: 501000, 五年: 1258000 },
];

function formatYen(val: number) {
  return `¥${Math.round(val).toLocaleString()}`;
}

export function PrincipalByPaymentBarChart() {
  return (
    <div className="h-[260px] w-full min-w-0">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={principalData} margin={{ top: 8, right: 8, left: 8, bottom: 8 }} barCategoryGap="12%">
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="label" tick={{ fontSize: 11 }} stroke={GRAY_600} />
          <YAxis tick={{ fontSize: 11 }} stroke={GRAY_600} tickFormatter={(v) => `${(v / 10000).toFixed(0)}万`} />
          <Tooltip
            formatter={(v) => (v != null ? formatYen(Number(v)) : "")}
            contentStyle={{ fontSize: 12 }}
            labelFormatter={(l) => l}
          />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          <Bar dataKey="三年" fill={GRAY_900} radius={[4, 4, 0, 0]} name="3年返済の借入額目安" />
          <Bar dataKey="五年" fill={GRAY_500} radius={[4, 4, 0, 0]} name="5年返済の借入額目安" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function InterestByPaymentBarChart() {
  return (
    <div className="h-[260px] w-full min-w-0">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={interestData} margin={{ top: 8, right: 8, left: 8, bottom: 8 }} barCategoryGap="12%">
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="label" tick={{ fontSize: 11 }} stroke={GRAY_600} />
          <YAxis tick={{ fontSize: 11 }} stroke={GRAY_600} tickFormatter={(v) => `${(v / 10000).toFixed(0)}万`} />
          <Tooltip
            formatter={(v) => (v != null ? formatYen(Number(v)) : "")}
            contentStyle={{ fontSize: 12 }}
            labelFormatter={(l) => l}
          />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          <Bar dataKey="三年" fill={GRAY_900} radius={[4, 4, 0, 0]} name="3年返済の総利息" />
          <Bar dataKey="五年" fill={GRAY_500} radius={[4, 4, 0, 0]} name="5年返済の総利息" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

/** 借入額目安と総利息のバランスを要点カードで表示 */
export function BalanceCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
        <div className="text-xs font-black text-gray-600">借入額目安を増やすには</div>
        <p className="mt-2 text-sm text-gray-700">
          月々返済額を上げるか、返済年数を延ばすと借入額の目安は増えます。ただし返済年数を延ばすほど総利息も増えます。
        </p>
      </div>
      <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
        <div className="text-xs font-black text-gray-600">返済年数を延ばすと</div>
        <p className="mt-2 text-sm text-gray-700">
          毎月の負担は同じでも、総支払額は重くなります。借入額だけでなく総利息・総支払額まで見て判断することが重要です。
        </p>
      </div>
    </div>
  );
}
