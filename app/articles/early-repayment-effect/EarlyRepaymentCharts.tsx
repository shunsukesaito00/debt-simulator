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

const interestData = [
  { case: "追加返済なし", value: 427396 },
  { case: "期間短縮型", value: 382080 },
  { case: "返済額軽減型", value: 392200 },
];

function formatYen(val: number) {
  return `¥${Math.round(val).toLocaleString()}`;
}

export function EarlyRepaymentInterestBarChart() {
  return (
    <div className="h-[260px] w-full min-w-0">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={interestData} margin={{ top: 8, right: 8, left: 8, bottom: 8 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e7e5e4" />
          <XAxis dataKey="case" tick={{ fontSize: 11 }} stroke={STONE_600} />
          <YAxis tick={{ fontSize: 11 }} stroke={STONE_600} tickFormatter={(v) => `${(v / 10000).toFixed(0)}万`} />
          <Tooltip formatter={(v) => (v != null ? [formatYen(Number(v)), "総利息"] : "")} contentStyle={{ fontSize: 12 }} />
          <Bar dataKey="value" fill={STONE_800} radius={[4, 4, 0, 0]} name="総利息" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

/** 効果の違いを要点カードで表示 */
export function EarlyRepaymentEffectCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="ds-subcard p-4">
        <div className="text-xs font-semibold text-stone-600">期間短縮型イメージ</div>
        <div className="mt-2 text-lg font-semibold text-stone-900">完済約5か月短縮</div>
        <p className="mt-1 text-sm text-stone-600">利息約4.5万円減</p>
      </div>
      <div className="ds-subcard p-4">
        <div className="text-xs font-semibold text-stone-600">返済額軽減型イメージ</div>
        <div className="mt-2 text-lg font-semibold text-stone-900">毎月約1,920円軽減</div>
        <p className="mt-1 text-sm text-stone-600">利息約3.5万円減</p>
      </div>
    </div>
  );
}
