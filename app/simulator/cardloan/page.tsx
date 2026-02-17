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

function formatYen(value: number) {
  return new Intl.NumberFormat("ja-JP", {
    style: "currency",
    currency: "JPY",
    maximumFractionDigits: 0,
  }).format(Math.round(value));
}

function formatNum(value: number) {
  return new Intl.NumberFormat("ja-JP", { maximumFractionDigits: 0 }).format(Math.round(value));
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

function RepaymentChart({ result }: { result: CalcResult }) {
  if (!result.ok || result.schedule.length === 0) return null;

  const rows = result.schedule;
  const maxBalance = Math.max(...rows.map((r) => r.balance), 1);
  const maxPay = Math.max(...rows.map((r) => r.payment + r.bonus), 1);
  const w = 600;
  const h = 220;
  const pad = { l: 40, r: 40, t: 20, b: 30 };
  const chartW = w - pad.l - pad.r;
  const chartH = h - pad.t - pad.b;

  const toX = (i: number) => pad.l + (i / Math.max(rows.length - 1, 1)) * chartW;
  const toYBalance = (v: number) => pad.t + chartH - (v / maxBalance) * chartH;
  const toYPay = (v: number) => pad.t + chartH - (v / maxPay) * chartH;

  const balancePath = rows.map((r, i) => `${i === 0 ? "M" : "L"} ${toX(i)} ${toYBalance(r.balance)}`).join(" ");
  const payPath = rows.map((r, i) => `${i === 0 ? "M" : "L"} ${toX(i)} ${toYPay(r.payment + r.bonus)}`).join(" ");

  return (
    <div className="overflow-x-auto">
      <svg viewBox={`0 0 ${w} ${h}`} className="min-w-[320px] max-w-full" preserveAspectRatio="xMidYMid meet">
        <line x1={pad.l} y1={pad.t} x2={pad.l} y2={h - pad.b} stroke="#e5e7eb" strokeWidth="1" />
        <line x1={pad.l} y1={h - pad.b} x2={w - pad.r} y2={h - pad.b} stroke="#e5e7eb" strokeWidth="1" />
        <path d={balancePath} fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d={payPath} fill="none" stroke="#10b981" strokeWidth="1.5" strokeDasharray="4 2" strokeLinecap="round" strokeLinejoin="round" />
        <text x={pad.l - 5} y={pad.t + 12} textAnchor="end" fontSize="10" fill="#6b7280">残高</text>
        <text x={w - pad.r + 5} y={pad.t + 12} textAnchor="start" fontSize="10" fill="#6b7280">支払</text>
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
    <div className="grid gap-6">
      <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-soft md:p-8">
        <h1 className="text-2xl font-black md:text-4xl">カードローン返済シミュレーター</h1>
        <p className="mt-3 text-sm text-gray-700 leading-relaxed">
          借入（カードローン等）の返済を、金利・返済方式・ボーナス返済を加味して試算できます。
          返済表・グラフ・A/B比較・CSV出力に対応しています。
        </p>

        <div className="mt-6 flex gap-2">
          <button
            type="button"
            onClick={() => setActiveTab("A")}
            className={`rounded-2xl px-4 py-2 text-sm font-black ${activeTab === "A" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
          >
            A
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("B")}
            className={`rounded-2xl px-4 py-2 text-sm font-black ${activeTab === "B" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
          >
            B
          </button>
        </div>

        <form className="mt-6 grid gap-6" onSubmit={(e) => e.preventDefault()}>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-1">
              <label className="block text-xs font-black text-gray-700">借入金額（万円）</label>
              <input
                type="number"
                inputMode="decimal"
                min={1}
                className="w-full rounded-2xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900/20"
                value={form.principalMan}
                onChange={(e) => updateForm({ principalMan: Number(e.target.value) || 0 })}
              />
            </div>
            <div className="space-y-1">
              <label className="block text-xs font-black text-gray-700">返済開始年月</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  min={2000}
                  max={2100}
                  className="w-24 rounded-2xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900/20"
                  value={form.startYear}
                  onChange={(e) => updateForm({ startYear: Number(e.target.value) || 2025 })}
                />
                <span className="flex items-center text-sm text-gray-500">年</span>
                <input
                  type="number"
                  min={1}
                  max={12}
                  className="w-16 rounded-2xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900/20"
                  value={form.startMonth}
                  onChange={(e) => updateForm({ startMonth: Number(e.target.value) || 1 })}
                />
                <span className="flex items-center text-sm text-gray-500">月</span>
              </div>
            </div>
            <div className="space-y-1">
              <label className="block text-xs font-black text-gray-700">返済方式</label>
              <select
                className="w-full rounded-2xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900/20"
                value={form.method}
                onChange={(e) => updateForm({ method: e.target.value as RepaymentMethod })}
              >
                {Object.entries(REPAYMENT_LABELS).map(([k, v]) => (
                  <option key={k} value={k}>{v}</option>
                ))}
              </select>
            </div>
            {(form.method === "equal_payment" || form.method === "equal_principal") && (
              <div className="space-y-1">
                <label className="block text-xs font-black text-gray-700">返済期間（年）</label>
                <input
                  type="number"
                  inputMode="decimal"
                  min={0.5}
                  step={0.5}
                  className="w-full rounded-2xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900/20"
                  value={form.years}
                  onChange={(e) => updateForm({ years: Number(e.target.value) || 1 })}
                />
              </div>
            )}
            {form.method === "fixed_payment" && (
              <div className="space-y-1">
                <label className="block text-xs font-black text-gray-700">毎月返済額（円）</label>
                <input
                  type="number"
                  inputMode="numeric"
                  min={1}
                  className="w-full rounded-2xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900/20"
                  value={form.monthlyPayment ?? ""}
                  placeholder="例: 25000"
                  onChange={(e) => updateForm({ monthlyPayment: e.target.value ? Number(e.target.value) : null })}
                />
              </div>
            )}
            {form.method === "fixed_principal" && (
              <div className="space-y-1">
                <label className="block text-xs font-black text-gray-700">毎月元金（円）</label>
                <input
                  type="number"
                  inputMode="numeric"
                  min={1}
                  className="w-full rounded-2xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900/20"
                  value={form.monthlyPrincipal ?? ""}
                  placeholder="例: 20000"
                  onChange={(e) => updateForm({ monthlyPrincipal: e.target.value ? Number(e.target.value) : null })}
                />
              </div>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label className="block text-xs font-black text-gray-700">金利（段階変更）</label>
              <button type="button" onClick={addRateStep} className="text-xs font-black text-gray-600 hover:underline">
                + 追加
              </button>
            </div>
            <div className="mt-2 space-y-2">
              {form.rateSteps.map((r, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">月</span>
                  <input
                    type="number"
                    min={1}
                    className="w-20 rounded-xl border border-gray-200 px-2 py-1.5 text-sm"
                    value={r.fromMonth}
                    onChange={(e) =>
                      setForm((prev) => {
                        const next = [...prev.rateSteps];
                        next[i] = { ...next[i], fromMonth: Number(e.target.value) || 1 };
                        return { ...prev, rateSteps: next };
                      })
                    }
                  />
                  <span className="text-xs text-gray-500">〜 年利</span>
                  <input
                    type="number"
                    min={0}
                    step={0.1}
                    className="w-20 rounded-xl border border-gray-200 px-2 py-1.5 text-sm"
                    value={r.rate}
                    onChange={(e) =>
                      setForm((prev) => {
                        const next = [...prev.rateSteps];
                        next[i] = { ...next[i], rate: Number(e.target.value) || 0 };
                        return { ...prev, rateSteps: next };
                      })
                    }
                  />
                  <span className="text-xs text-gray-500">%</span>
                  {form.rateSteps.length > 1 && (
                    <button type="button" onClick={() => removeRateStep(i)} className="text-xs text-red-600 hover:underline">
                      削除
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label className="block text-xs font-black text-gray-700">ボーナス返済（月指定・円）</label>
              <button type="button" onClick={addBonus} className="text-xs font-black text-gray-600 hover:underline">
                + 追加
              </button>
            </div>
            <div className="mt-2 space-y-2">
              {form.bonusPayments.map((b, i) => (
                <div key={i} className="flex items-center gap-2">
                  <select
                    className="rounded-xl border border-gray-200 px-2 py-1.5 text-sm"
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
                  <input
                    type="number"
                    min={0}
                    className="w-28 rounded-xl border border-gray-200 px-2 py-1.5 text-sm"
                    value={b.amount || ""}
                    placeholder="金額"
                    onChange={(e) =>
                      setForm((prev) => {
                        const next = [...prev.bonusPayments];
                        next[i] = { ...next[i], amount: Number(e.target.value) || 0 };
                        return { ...prev, bonusPayments: next };
                      })
                    }
                  />
                  <span className="text-xs text-gray-500">円</span>
                  <button type="button" onClick={() => removeBonus(i)} className="text-xs text-red-600 hover:underline">
                    削除
                  </button>
                </div>
              ))}
            </div>
          </div>
        </form>

        {result.ok === false && (
          <p className="mt-4 text-sm font-medium text-red-600">{result.error}</p>
        )}
      </section>

      {result.ok && (
        <>
          <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-soft md:p-8">
            <h2 className="text-lg font-black text-gray-900">サマリー（{activeTab}）</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 md:grid-cols-4 text-sm">
              <div className="rounded-2xl bg-gray-50 p-4">
                <div className="text-xs text-gray-600">毎月返済額（概算）</div>
                <div className="mt-1 text-base font-black">{formatYen(result.schedule[0]?.payment ?? 0)}</div>
              </div>
              <div className="rounded-2xl bg-gray-50 p-4">
                <div className="text-xs text-gray-600">総返済額</div>
                <div className="mt-1 text-base font-black">{formatYen(result.totalPayment + result.totalBonus)}</div>
              </div>
              <div className="rounded-2xl bg-gray-50 p-4">
                <div className="text-xs text-gray-600">利息合計</div>
                <div className="mt-1 text-base font-black">{formatYen(result.totalInterest)}</div>
              </div>
              <div className="rounded-2xl bg-gray-50 p-4">
                <div className="text-xs text-gray-600">完済</div>
                <div className="mt-1 text-base font-black">{result.finalYear}年{result.finalMonth}月（{result.months}回）</div>
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-soft md:p-8">
            <h2 className="text-lg font-black text-gray-900">推移グラフ</h2>
            <p className="mt-1 text-xs text-gray-500">青: 残高 / 緑: 支払（通常+ボーナス）</p>
            <div className="mt-4">
              <RepaymentChart result={result} />
            </div>
          </section>

          <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-soft md:p-8">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-black text-gray-900">返済表</h2>
              <button
                type="button"
                onClick={() => downloadCsv(result, activeTab)}
                className="rounded-2xl bg-gray-900 px-4 py-2 text-xs font-black text-white hover:opacity-90"
              >
                CSVダウンロード
              </button>
            </div>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[600px] text-sm">
                <thead>
                  <tr className="border-b border-gray-200 text-left text-xs text-gray-600">
                    <th className="py-2 pr-4">年月</th>
                    <th className="py-2 pr-4">年利(%)</th>
                    <th className="py-2 pr-4 text-right">支払</th>
                    <th className="py-2 pr-4 text-right">利息</th>
                    <th className="py-2 pr-4 text-right">元金</th>
                    <th className="py-2 pr-4 text-right">ボーナス</th>
                    <th className="py-2 text-right">残高</th>
                  </tr>
                </thead>
                <tbody>
                  {result.schedule.map((r, i) => (
                    <tr key={i} className="border-b border-gray-100">
                      <td className="py-2 pr-4">{r.year}/{r.month}</td>
                      <td className="py-2 pr-4">{r.annualRatePercent}</td>
                      <td className="py-2 pr-4 text-right">{formatYen(r.payment)}</td>
                      <td className="py-2 pr-4 text-right">{formatYen(r.interest)}</td>
                      <td className="py-2 pr-4 text-right">{formatYen(r.principal)}</td>
                      <td className="py-2 pr-4 text-right">{r.bonus > 0 ? formatYen(r.bonus) : "-"}</td>
                      <td className="py-2 text-right">{formatYen(r.balance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {resultA.ok && resultB.ok && (
            <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-soft md:p-8">
              <h2 className="text-lg font-black text-gray-900">A/B 比較</h2>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full min-w-[400px] text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 text-left text-xs text-gray-600">
                      <th className="py-2 pr-4"></th>
                      <th className="py-2 pr-4">A</th>
                      <th className="py-2 pr-4">B</th>
                      <th className="py-2">差分</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100">
                      <td className="py-2 pr-4">総返済額</td>
                      <td className="py-2 pr-4">{formatYen(resultA.totalPayment + resultA.totalBonus)}</td>
                      <td className="py-2 pr-4">{formatYen(resultB.totalPayment + resultB.totalBonus)}</td>
                      <td className="py-2">{formatYen((resultB.totalPayment + resultB.totalBonus) - (resultA.totalPayment + resultA.totalBonus))}</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-2 pr-4">利息合計</td>
                      <td className="py-2 pr-4">{formatYen(resultA.totalInterest)}</td>
                      <td className="py-2 pr-4">{formatYen(resultB.totalInterest)}</td>
                      <td className="py-2">{formatYen(resultB.totalInterest - resultA.totalInterest)}</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-2 pr-4">完済回数</td>
                      <td className="py-2 pr-4">{resultA.months}回</td>
                      <td className="py-2 pr-4">{resultB.months}回</td>
                      <td className="py-2">{resultB.months - resultA.months}回</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          )}
        </>
      )}

      <section className="rounded-3xl border border-gray-200 bg-white p-6">
        <div className="text-sm font-black text-gray-900">注意点</div>
        <ul className="mt-3 list-disc pl-5 text-sm text-gray-700 space-y-1">
          <li>本ツールは参考情報です。契約内容（利率、返済日、手数料等）を優先してください。</li>
          <li>計算は一般的な月次の近似です。金融機関の計算と差が出る場合があります。</li>
        </ul>
        <div className="mt-4 flex gap-3">
          <Link href="/logic" className="text-sm font-black text-gray-800 hover:underline">計算ロジック</Link>
          <Link href="/faq" className="text-sm font-black text-gray-800 hover:underline">FAQ</Link>
          <Link href="/how-to" className="text-sm font-black text-gray-800 hover:underline">使い方</Link>
        </div>
      </section>
    </div>
  );
}
