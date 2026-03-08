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
  { period: "3年返済", value: 1442000 },
  { period: "5年返済", value: 2101000 },
  { period: "7年返済", value: 2553000 },
];

const interestData = [
  { period: "3年返済", value: 358000 },
  { period: "5年返済", value: 899000 },
  { period: "7年返済", value: 1647000 },
];

const stackData = [
  { period: "3年返済", 元本: 1442000, 利息: 358000 },
  { period: "5年返済", 元本: 2101000, 利息: 899000 },
  { period: "7年返済", 元本: 2553000, 利息: 1647000 },
];

function formatYen(val: number) {
  return `¥${Math.round(val).toLocaleString()}`;
}

export function PrincipalBarChart() {
  return (
    <div className="h-[240px] w-full min-w-0">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={principalData} margin={{ top: 8, right: 8, left: 8, bottom: 8 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="period" tick={{ fontSize: 11 }} stroke={GRAY_600} />
          <YAxis tick={{ fontSize: 11 }} stroke={GRAY_600} tickFormatter={(v) => `${(v / 10000).toFixed(0)}万`} />
          <Tooltip formatter={(v) => (v != null ? [formatYen(Number(v)), "借入額目安"] : "")} contentStyle={{ fontSize: 12 }} />
          <Bar dataKey="value" fill={GRAY_900} radius={[4, 4, 0, 0]} name="借入額目安" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function TotalInterestBarChart() {
  return (
    <div className="h-[240px] w-full min-w-0">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={interestData} margin={{ top: 8, right: 8, left: 8, bottom: 8 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="period" tick={{ fontSize: 11 }} stroke={GRAY_600} />
          <YAxis tick={{ fontSize: 11 }} stroke={GRAY_600} tickFormatter={(v) => `${(v / 10000).toFixed(0)}万`} />
          <Tooltip formatter={(v) => (v != null ? [formatYen(Number(v)), "総利息"] : "")} contentStyle={{ fontSize: 12 }} />
          <Bar dataKey="value" fill={GRAY_600} radius={[4, 4, 0, 0]} name="総利息" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function TotalPaymentStackedChart() {
  return (
    <div className="h-[260px] w-full min-w-0">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={stackData} margin={{ top: 8, right: 8, left: 8, bottom: 8 }} layout="vertical" barCategoryGap="28%">
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis type="number" tick={{ fontSize: 11 }} stroke={GRAY_600} tickFormatter={(v) => `${(v / 10000).toFixed(0)}万`} />
          <YAxis type="category" dataKey="period" tick={{ fontSize: 12 }} stroke={GRAY_600} width={72} />
          <Tooltip
            formatter={(v) => (v != null ? formatYen(Number(v)) : "")}
            contentStyle={{ fontSize: 12 }}
            labelFormatter={(l) => l}
          />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          <Bar dataKey="元本" stackId="a" fill={GRAY_900} radius={[0, 0, 0, 0]} name="元本" />
          <Bar dataKey="利息" stackId="a" fill={GRAY_500} radius={[0, 4, 4, 0]} name="利息" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
