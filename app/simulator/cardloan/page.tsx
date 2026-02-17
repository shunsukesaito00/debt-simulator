"use client";

import { useCallback, useMemo, useState } from "react";
import Link from "next/link";
import {
  calcLoan,
  type BonusPayment,
  type CalcInput,
  type CalcResult,
  type RateStep,
  type RepaymentMethod,
} from "@/lib/loan-calc";

const REPAYMENT_LABELS: Record<RepaymentMethod, string> = {
  equal_payment: "元利均等（回数指定）",
  equal_principal: "元金均等（回数指定）",
  fixed_payment: "定額元利（金額指定）",
  fixed_principal: "定額元金（金額指定）",
};

/** サーバー/クライアントで同じ出力になるよう固定フォーマット（Hydration エラー回避） */
function formatYen(value: number) {
  const n = Math.round(value);
  const s = n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return `¥${s}`;
}

function formatNum(value: number) {
  const n = Math.round(value);
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function toCalcInput(form: FormState): CalcInput {
  const rateSteps: RateStep[] = form.rateSteps.map((r) => ({
    fromMonth: r.fromMonth,
    annualRatePercent: r.rate,
  }));
  const bonusPayments: BonusPayment[] = form.bonusPayments
    .filter((b) => b.amount > 0)
    .map((b) => ({ month: b.month, amount: b.amount }));

  const base: CalcInput = {
    principal: form.principalMan * 10000,
    startYear: form.startYear,
    startMonth: form.startMonth,
    method: form.method,
    rateSteps,
    bonusPayments,
  };

  if (form.method === "equal_payment" || form.method === "equal_principal") {
    return { ...base, months: Math.round(form.years * 12) };
  }
  if (form.method === "fixed_payment") {
    return { ...base, monthlyPayment: form.monthlyPayment ?? 0 };
  }
  return { ...base, monthlyPrincipal: form.monthlyPrincipal ?? 0 };
}

type FormState = {
  principalMan: number;
  startYear: number;
  startMonth: number;
  method: RepaymentMethod;
  years: number;
  rateSteps: { fromMonth: number; rate: number }[];
  bonusPayments: { month: number; amount: number }[];
  monthlyPayment: number | null;
  monthlyPrincipal: number | null;
};

const DEFAULT_FORM: FormState = {
  principalMan: 100,
  startYear: new Date().getFullYear(),
  startMonth: new Date().getMonth() + 1,
  method: "equal_payment",
  years: 5,
  rateSteps: [{ fromMonth: 1, rate: 15 }],
  bonusPayments: [],
  monthlyPayment: null,
  monthlyPrincipal: null,
};

function RepaymentChart({ result, className }: { result: CalcResult; className?: string }) {
  if (!result.ok || result.schedule.length === 0) return null;

  const rows = result.schedule;
  const maxBalance = Math.max(...rows.map((r) => r.balance), 1);
  const maxPay = Math.max(...rows.map((r) => r.payment + r.bonus), 1);
  const maxY = Math.max(maxBalance, maxPay);
  const w = 600;
  const h = 260;
  const pad = { l: 52, r: 24, t: 8, b: 44 };
  const chartW = w - pad.l - pad.r;
  const chartH = h - pad.t - pad.b;

  const toX = (i: number) => pad.l + (i / Math.max(rows.length - 1, 1)) * chartW;
  const toYBalance = (v: number) => pad.t + chartH - (v / maxY) * chartH;
  const toYPay = (v: number) => pad.t + chartH - (v / maxY) * chartH;

  const balancePath = rows.map((r, i) => `${i === 0 ? "M" : "L"} ${toX(i)} ${toYBalance(r.balance)}`).join(" ");
  const payPath = rows.map((r, i) => `${i === 0 ? "M" : "L"} ${toX(i)} ${toYPay(r.payment + r.bonus)}`).join(" ");
  const balanceAreaPath = `${balancePath} L ${toX(rows.length - 1)} ${h - pad.b} L ${pad.l} ${h - pad.b} Z`;

  const first = rows[0];
  const last = rows[rows.length - 1];
  const fmt = (v: number) => (v >= 10000 ? `${Math.round(v / 10000)}万` : formatNum(v));

  return (
    <div className={`overflow-x-auto ${className ?? ""}`}>
      <svg viewBox={`0 0 ${w} ${h}`} className="min-w-[280px] w-full" preserveAspectRatio="xMidYMid meet">
        {/* グリッド線 */}
        {[0.25, 0.5, 0.75].map((p) => (
          <line key={p} x1={pad.l} y1={pad.t + chartH * (1 - p)} x2={w - pad.r} y2={pad.t + chartH * (1 - p)} stroke="#e5e7eb" strokeWidth="0.5" strokeDasharray="2 2" />
        ))}
        {/* 残高エリア（薄い青） */}
        <path d={balanceAreaPath} fill="rgba(59,130,246,0.12)" stroke="none" />
        {/* 軸 */}
        <line x1={pad.l} y1={pad.t} x2={pad.l} y2={h - pad.b} stroke="#9ca3af" strokeWidth="1" />
        <line x1={pad.l} y1={h - pad.b} x2={w - pad.r} y2={h - pad.b} stroke="#9ca3af" strokeWidth="1" />
        {/* 線 */}
        <path d={balancePath} fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d={payPath} fill="none" stroke="#059669" strokeWidth="2" strokeDasharray="5 3" strokeLinecap="round" strokeLinejoin="round" />
        {/* Y軸ラベル */}
        <text x={pad.l - 6} y={h - pad.b + 4} textAnchor="end" fontSize="11" fill="#6b7280">0</text>
        <text x={pad.l - 6} y={pad.t + 4} textAnchor="end" fontSize="11" fill="#6b7280">{fmt(maxY)}</text>
        {/* X軸ラベル */}
        <text x={pad.l} y={h - 8} textAnchor="start" fontSize="11" fill="#6b7280">{first.year}/{first.month}</text>
        <text x={w - pad.r} y={h - 8} textAnchor="end" fontSize="11" fill="#6b7280">{last.year}/{last.month}</text>
        {/* 凡例 */}
        <g transform={`translate(${w - pad.r - 100}, ${pad.t})`}>
          <line x1={0} y1={6} x2={14} y2={6} stroke="#2563eb" strokeWidth="2.5" />
          <text x={18} y={10} fontSize="12" fill="#374151">残高</text>
          <line x1={52} y1={6} x2={66} y2={6} stroke="#059669" strokeWidth="2" strokeDasharray="5 3" />
          <text x={70} y={10} fontSize="12" fill="#374151">支払</text>
        </g>
      </svg>
    </div>
  );
}

function downloadCsv(result: CalcResult, label: string) {
  if (!result.ok) return;
  const headers = ["年月", "年利(%)", "支払", "利息", "元金", "ボーナス返済", "残高"];
  const rows = result.schedule.map((r) =>
    [`${r.year}/${r.month}`, r.annualRatePercent, r.payment, r.interest, r.principal, r.bonus, r.balance].join(",")
  );
  const csv = [headers.join(","), ...rows].join("\n");
  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `返済表_${label}_${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function Page() {
  const [formA, setFormA] = useState<FormState>(DEFAULT_FORM);
  const [formB, setFormB] = useState<FormState>({ ...DEFAULT_FORM, principalMan: 80 });
  const [activeTab, setActiveTab] = useState<"A" | "B">("A");

  const resultA = useMemo(() => calcLoan(toCalcInput(formA)), [formA]);
  const resultB = useMemo(() => calcLoan(toCalcInput(formB)), [formB]);

  const result = activeTab === "A" ? resultA : resultB;
  const form = activeTab === "A" ? formA : formB;
  const setForm = activeTab === "A" ? setFormA : setFormB;

  const updateForm = useCallback(
    (patch: Partial<FormState>) => setForm((prev) => ({ ...prev, ...patch })),
    [setForm]
  );

  const addRateStep = useCallback(() => {
    const last = form.rateSteps[form.rateSteps.length - 1];
    setForm((prev) => ({
      ...prev,
      rateSteps: [...prev.rateSteps, { fromMonth: (last?.fromMonth ?? 1) + 12, rate: last?.rate ?? 15 }],
    }));
  }, [form.rateSteps, setForm]);

  const removeRateStep = useCallback(
    (i: number) => setForm((prev) => ({ ...prev, rateSteps: prev.rateSteps.filter((_, j) => j !== i) })),
    [setForm]
  );

  const addBonus = useCallback(() => {
    setForm((prev) => ({
      ...prev,
      bonusPayments: [...prev.bonusPayments, { month: 6, amount: 100000 }],
    }));
  }, [setForm]);

  const removeBonus = useCallback(
    (i: number) => setForm((prev) => ({ ...prev, bonusPayments: prev.bonusPayments.filter((_, j) => j !== i) })),
    [setForm]
  );

  return (
    <div className="grid gap-5">
      <section className="rounded-xl border border-gray-200 bg-white p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h1 className="text-2xl font-bold md:text-3xl">カードローン返済シミュレーター</h1>
          <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setActiveTab("A")}
            className={`rounded-xl px-4 py-2 text-base font-bold ${activeTab === "A" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
          >
            A
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("B")}
            className={`rounded-xl px-4 py-2 text-base font-bold ${activeTab === "B" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
          >
            B
          </button>
          </div>
        </div>

        <form className="mt-4 space-y-3" onSubmit={(e) => e.preventDefault()}>
          {/* 項目名・スライダー・数値を同行・スライダー右端 */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3 min-h-12">
              <label className="w-24 shrink-0 text-base font-bold text-gray-800">借入金額</label>
              <div className="flex min-w-0 flex-1 items-center gap-2">
                <input
                  type="range"
                  min={10}
                  max={500}
                  step={5}
                  className="min-w-0 flex-1"
                  value={Math.min(500, Math.max(10, form.principalMan || 10))}
                  onChange={(e) => updateForm({ principalMan: Number(e.target.value) })}
                />
                <div className="flex min-w-[5rem] shrink-0 items-center gap-1">
                  <input
                    type="number"
                    inputMode="decimal"
                    min={1}
                    className="min-w-[4rem] w-20 rounded-xl border-2 border-gray-200 px-3 py-2 text-base font-bold outline-none focus:border-gray-900"
                    value={form.principalMan || ""}
                    onChange={(e) => updateForm({ principalMan: Number(e.target.value) || 0 })}
                  />
                  <span className="text-base font-bold text-gray-600">万</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 min-h-12">
              <div className="flex items-center gap-3">
                <label className="w-20 shrink-0 text-base font-bold text-gray-800">返済開始</label>
                <div className="flex flex-1 items-center gap-1">
                  <input
                    type="number"
                    min={2000}
                    max={2100}
                    className="w-16 rounded-lg border-2 border-gray-200 px-2 py-2 text-base font-bold outline-none focus:border-gray-900"
                    value={form.startYear}
                    onChange={(e) => updateForm({ startYear: Number(e.target.value) || 2025 })}
                  />
                  <span className="text-base text-gray-600">年</span>
                  <input
                    type="number"
                    min={1}
                    max={12}
                    className="w-12 rounded-lg border-2 border-gray-200 px-2 py-2 text-base font-bold outline-none focus:border-gray-900"
                    value={form.startMonth}
                    onChange={(e) => updateForm({ startMonth: Number(e.target.value) || 1 })}
                  />
                  <span className="text-base text-gray-600">月</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <label className="w-20 shrink-0 text-base font-bold text-gray-800">返済方式</label>
                <select
                  className="flex-1 rounded-lg border-2 border-gray-200 px-2 py-2 text-base font-bold outline-none focus:border-gray-900"
                value={form.method}
                onChange={(e) => {
                  const m = e.target.value as RepaymentMethod;
                  if (m === "fixed_payment" && form.monthlyPayment == null) {
                    updateForm({ method: m, monthlyPayment: 25000 });
                  } else if (m === "fixed_principal" && form.monthlyPrincipal == null) {
                    updateForm({ method: m, monthlyPrincipal: 20000 });
                  } else {
                    updateForm({ method: m });
                  }
                }}
              >
                {Object.entries(REPAYMENT_LABELS).map(([k, v]) => (
                  <option key={k} value={k}>{v}</option>
                ))}
                </select>
              </div>
            </div>
            {(form.method === "equal_payment" || form.method === "equal_principal") && (
            <div className="flex items-center gap-3 min-h-12">
              <label className="w-24 shrink-0 text-base font-bold text-gray-800">返済期間</label>
              <div className="flex min-w-0 flex-1 items-center gap-2">
                <input
                  type="range"
                  min={1}
                  max={30}
                  step={1}
                  className="min-w-0 flex-1"
                    value={Math.min(30, Math.max(1, form.years || 5))}
onChange={(e) => updateForm({ years: Number(e.target.value) })}
                />
                <div className="flex w-16 shrink-0 items-center gap-0.5">
                  <input
                    type="number"
                    inputMode="decimal"
                    min={0.5}
                    step={0.5}
                    className="w-14 rounded-xl border-2 border-gray-200 px-2 py-2 text-base font-bold outline-none focus:border-gray-900"
                    value={form.years || ""}
                    onChange={(e) => updateForm({ years: Number(e.target.value) || 1 })}
                  />
<span className="text-base font-bold text-gray-600">年</span>
                </div>
              </div>
            </div>
            )}
            {form.method === "fixed_payment" && (
            <div className="flex items-center gap-3 min-h-12">
              <label className="w-24 shrink-0 text-base font-bold text-gray-800">毎月返済額</label>
              <div className="flex min-w-0 flex-1 items-center gap-2">
                <input
                  type="range"
                  min={5000}
                  max={100000}
                  step={5000}
                  className="min-w-0 flex-1"
                    value={Math.min(100000, Math.max(5000, form.monthlyPayment ?? 25000))}
onChange={(e) => updateForm({ monthlyPayment: Number(e.target.value) })}
                />
                <div className="flex min-w-[7rem] shrink-0 items-center gap-0.5">
                  <input
                    type="number"
                    inputMode="numeric"
                    min={1}
                    className="min-w-[5.5rem] w-24 rounded-xl border-2 border-gray-200 px-3 py-2 text-base font-bold outline-none focus:border-gray-900"
                    value={form.monthlyPayment ?? ""}
                    onChange={(e) => updateForm({ monthlyPayment: e.target.value ? Number(e.target.value) : null })}
                  />
                  <span className="text-base font-bold text-gray-600">円</span>
                </div>
              </div>
            </div>
            )}
            {form.method === "fixed_principal" && (
            <div className="flex items-center gap-3 min-h-12">
              <label className="w-24 shrink-0 text-base font-bold text-gray-800">毎月元金</label>
              <div className="flex min-w-0 flex-1 items-center gap-2">
                <input
                  type="range"
                  min={5000}
                  max={100000}
                  step={5000}
                  className="min-w-0 flex-1"
                    value={Math.min(100000, Math.max(5000, form.monthlyPrincipal ?? 20000))}
onChange={(e) => updateForm({ monthlyPrincipal: Number(e.target.value) })}
                />
                <div className="flex min-w-[7rem] shrink-0 items-center gap-0.5">
                  <input
                    type="number"
                    inputMode="numeric"
                    min={1}
                    className="min-w-[5.5rem] w-24 rounded-xl border-2 border-gray-200 px-3 py-2 text-base font-bold outline-none focus:border-gray-900"
                    value={form.monthlyPrincipal ?? ""}
                    onChange={(e) => updateForm({ monthlyPrincipal: e.target.value ? Number(e.target.value) : null })}
                  />
                  <span className="text-sm font-bold text-gray-600">円</span>
                </div>
              </div>
            </div>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-3 min-h-12">
              <label className="w-24 shrink-0 text-base font-bold text-gray-800">金利</label>
              <div className="flex min-w-0 flex-1 items-center gap-2">
                <input
                  type="range"
                  min={1}
                  max={20}
                  step={0.5}
                  className="min-w-0 flex-1"
                    value={Math.min(20, Math.max(1, form.rateSteps[0]?.rate ?? 15))}
                    onChange={(e) =>
                      setForm((prev) => {
                        const next = [...prev.rateSteps];
                        if (next[0]) next[0] = { ...next[0], rate: Number(e.target.value) };
return { ...prev, rateSteps: next };
                    })
                  }
                />
                <span className="w-12 shrink-0 text-right text-base font-bold text-gray-900">
{form.rateSteps[0]?.rate ?? 15}%
                </span>
              </div>
              <button type="button" onClick={addRateStep} className="shrink-0 text-sm font-bold text-gray-600 hover:underline">
                +追加
              </button>
            </div>
            <div className="space-y-1">
              {form.rateSteps.map((r, i) => (
                <div key={i} className="flex items-center gap-2 pl-6">
                  <span className="text-sm text-gray-600">月</span>
                  <input
                    type="number"
                    min={1}
                    className="w-14 rounded-lg border-2 border-gray-200 px-2 py-1.5 text-sm outline-none focus:border-gray-900"
                    value={r.fromMonth}
                    onChange={(e) =>
                      setForm((prev) => {
                        const next = [...prev.rateSteps];
                        next[i] = { ...next[i], fromMonth: Number(e.target.value) || 1 };
                        return { ...prev, rateSteps: next };
                      })
                    }
                  />
                  <span className="text-sm text-gray-600">〜</span>
                  <input
                    type="number"
                    min={0}
                    step={0.1}
                    className="w-14 rounded-lg border-2 border-gray-200 px-2 py-1.5 text-sm outline-none focus:border-gray-900"
                    value={r.rate}
                    onChange={(e) =>
                      setForm((prev) => {
                        const next = [...prev.rateSteps];
                        next[i] = { ...next[i], rate: Number(e.target.value) || 0 };
                        return { ...prev, rateSteps: next };
                      })
                    }
                  />
                  <span className="text-sm text-gray-600">%</span>
                  {form.rateSteps.length > 1 && (
                    <button type="button" onClick={() => removeRateStep(i)} className="text-sm text-red-600 hover:underline">
                      削除
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-3 min-h-12">
              <span className="w-24 shrink-0 text-base font-bold text-gray-800">ボーナス</span>
              <button type="button" onClick={addBonus} className="text-sm font-bold text-gray-600 hover:underline">
                +追加
              </button>
            </div>
            {form.bonusPayments.map((b, i) => (
              <div key={i} className="flex items-center gap-3 min-h-12 pl-6">
                <select
                  className="w-16 shrink-0 rounded-lg border-2 border-gray-200 px-2 py-1.5 text-sm outline-none focus:border-gray-900"
                  value={b.month}
                  onChange={(e) =>
                    setForm((prev) => {
                      const next = [...prev.bonusPayments];
                      next[i] = { ...next[i], month: Number(e.target.value) };
                      return { ...prev, bonusPayments: next };
                    })
                  }
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((m) => (
                    <option key={m} value={m}>{m}月</option>
                  ))}
                </select>
                <div className="flex min-w-0 flex-1 items-center gap-2">
                  <input
                    type="range"
                    min={0}
                    max={2000000}
                    step={10000}
                    className="min-w-0 flex-1"
                    value={Math.min(2000000, Math.max(0, b.amount || 0))}
                      onChange={(e) =>
                        setForm((prev) => {
                          const next = [...prev.bonusPayments];
                          next[i] = { ...next[i], amount: Number(e.target.value) };
                          return { ...prev, bonusPayments: next };
                        })
                      }
                    />
                  <div className="flex min-w-[7rem] shrink-0 items-center gap-0.5">
                    <input
                      type="number"
                      min={0}
                      max={2000000}
                      inputMode="numeric"
                      placeholder="0"
                      className="min-w-[5.5rem] w-24 rounded-xl border-2 border-gray-200 px-3 py-2 text-base outline-none focus:border-gray-900"
                      value={b.amount || ""}
                      onChange={(e) =>
                        setForm((prev) => {
                          const next = [...prev.bonusPayments];
                          next[i] = { ...next[i], amount: Number(e.target.value) || 0 };
                          return { ...prev, bonusPayments: next };
                        })
                      }
                    />
                    <span className="text-sm text-gray-600">円</span>
                  </div>
                </div>
                <button type="button" onClick={() => removeBonus(i)} className="shrink-0 text-sm text-red-600 hover:underline">
                  削除
                </button>
              </div>
            ))}
          </div>
        </form>

        {result.ok === false && (
          <p className="mt-4 text-base font-medium text-red-600">{result.error}</p>
        )}
      </section>

      {result.ok && (
        <>
          <div className="grid gap-4 md:grid-cols-2">
            <section className="flex min-h-0 flex-col rounded-xl border border-gray-200 bg-white p-5">
              <h2 className="text-base font-bold text-gray-900">サマリー（{activeTab}）</h2>
              <div className="mt-4 grid flex-1 grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <div className="text-sm text-gray-500">毎月返済額</div>
                  <div className="text-xl font-bold">{formatYen(result.schedule[0]?.payment ?? 0)}</div>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="text-sm text-gray-500">総返済額</div>
                  <div className="text-xl font-bold">{formatYen(result.totalPayment + result.totalBonus)}</div>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="text-sm text-gray-500">利息合計</div>
                  <div className="text-xl font-bold">{formatYen(result.totalInterest)}</div>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="text-sm text-gray-500">完済</div>
                  <div className="text-xl font-bold">{result.finalYear}年{result.finalMonth}月（{result.months}回）</div>
                </div>
              </div>
            </section>
            <section className="flex min-h-0 flex-col rounded-xl border border-gray-200 bg-white p-5">
              <h2 className="text-base font-bold text-gray-900">推移グラフ</h2>
              <div className="mt-3 min-h-[260px] flex-1 w-full">
                <RepaymentChart result={result} className="w-full" />
              </div>
            </section>
          </div>

          <section className="rounded-xl border border-gray-200 bg-white p-5">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-gray-900">返済表</h2>
              <button
                type="button"
                onClick={() => downloadCsv(result, activeTab)}
                className="rounded-xl bg-gray-900 px-5 py-2.5 text-sm font-bold text-white hover:opacity-90"
              >
                CSVダウンロード
              </button>
            </div>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full min-w-[560px] text-sm">
                <thead>
                  <tr className="border-b border-gray-200 text-left text-sm text-gray-600">
                    <th className="py-2.5 pr-4">年月</th>
                    <th className="py-2.5 pr-4">年利(%)</th>
                    <th className="py-2.5 pr-4 text-right">支払</th>
                    <th className="py-2.5 pr-4 text-right">利息</th>
                    <th className="py-2.5 pr-4 text-right">元金</th>
                    <th className="py-2.5 pr-4 text-right">ボーナス</th>
                    <th className="py-2.5 text-right">残高</th>
                  </tr>
                </thead>
                <tbody>
                  {result.schedule.map((r, i) => (
                    <tr key={i} className="border-b border-gray-100">
                      <td className="py-2.5 pr-4">{r.year}/{r.month}</td>
                      <td className="py-2.5 pr-4">{r.annualRatePercent}</td>
                      <td className="py-2.5 pr-4 text-right">{formatYen(r.payment)}</td>
                      <td className="py-2.5 pr-4 text-right">{formatYen(r.interest)}</td>
                      <td className="py-2.5 pr-4 text-right">{formatYen(r.principal)}</td>
                      <td className="py-2.5 pr-4 text-right">{r.bonus > 0 ? formatYen(r.bonus) : "-"}</td>
                      <td className="py-2.5 text-right">{formatYen(r.balance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {resultA.ok && resultB.ok && (
            <section className="rounded-xl border border-gray-200 bg-white p-5">
              <h2 className="text-base font-bold text-gray-900">A/B 比較</h2>
              <div className="mt-3 overflow-x-auto">
                <table className="w-full min-w-[360px] text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 text-left text-sm text-gray-600">
                      <th className="py-2.5 pr-4"></th>
                      <th className="py-2.5 pr-4">A</th>
                      <th className="py-2.5 pr-4">B</th>
                      <th className="py-2.5">差分</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100">
                      <td className="py-2.5 pr-4">総返済額</td>
                      <td className="py-2.5 pr-4">{formatYen(resultA.totalPayment + resultA.totalBonus)}</td>
                      <td className="py-2.5 pr-4">{formatYen(resultB.totalPayment + resultB.totalBonus)}</td>
                      <td className="py-2.5">{formatYen((resultB.totalPayment + resultB.totalBonus) - (resultA.totalPayment + resultA.totalBonus))}</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-2.5 pr-4">利息合計</td>
                      <td className="py-2.5 pr-4">{formatYen(resultA.totalInterest)}</td>
                      <td className="py-2.5 pr-4">{formatYen(resultB.totalInterest)}</td>
                      <td className="py-2.5">{formatYen(resultB.totalInterest - resultA.totalInterest)}</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-2.5 pr-4">完済回数</td>
                      <td className="py-2.5 pr-4">{resultA.months}回</td>
                      <td className="py-2.5 pr-4">{resultB.months}回</td>
                      <td className="py-2.5">{resultB.months - resultA.months}回</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          )}
        </>
      )}

      <section className="rounded-xl border border-gray-200 bg-white p-5">
        <div className="text-base font-bold text-gray-900">注意点</div>
        <ul className="mt-3 list-disc pl-5 text-sm text-gray-700 space-y-1">
          <li>本ツールは参考情報です。契約内容（利率、返済日、手数料等）を優先してください。</li>
          <li>計算は一般的な月次の近似です。金融機関の計算と差が出る場合があります。</li>
        </ul>
        <div className="mt-3 flex flex-wrap gap-3">
          <Link href="/logic" className="text-base font-bold text-gray-700 hover:underline">計算ロジック</Link>
          <Link href="/faq" className="text-base font-bold text-gray-700 hover:underline">FAQ</Link>
          <Link href="/how-to" className="text-base font-bold text-gray-700 hover:underline">使い方</Link>
        </div>
      </section>
    </div>
  );
}
