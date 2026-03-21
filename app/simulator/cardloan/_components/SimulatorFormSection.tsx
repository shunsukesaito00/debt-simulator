"use client";

import Link from "next/link";
import type { RepaymentMethod } from "@/lib/loan-calc";
import type { FormState } from "../_lib/simulatorMappers";

const REPAYMENT_LABELS: Record<RepaymentMethod, string> = {
  equal_payment: "元利均等（回数指定）",
  equal_principal: "元金均等（回数指定）",
  fixed_payment: "定額元利（金額指定）",
  fixed_principal: "定額元金（金額指定）",
};

export type SimulatorFormSectionProps = {
  form: FormState;
  updateForm: (patch: Partial<FormState>) => void;
  setForm: React.Dispatch<React.SetStateAction<FormState>>;
  addRateStep: () => void;
  removeRateStep: (i: number) => void;
  addBonus: () => void;
  removeBonus: (i: number) => void;
  addOneTime: () => void;
  removeOneTime: (i: number) => void;
  extraTab: "monthly" | "oneTime" | "bonus";
  setExtraTab: (t: "monthly" | "oneTime" | "bonus") => void;
  errorMessage: string | null;
};

export function SimulatorFormSection({
  form,
  updateForm,
  setForm,
  addRateStep,
  removeRateStep,
  addBonus,
  removeBonus,
  addOneTime,
  removeOneTime,
  extraTab,
  setExtraTab,
  errorMessage,
}: SimulatorFormSectionProps) {
  return (
    <div className="mt-5">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
        {/* 基本条件 */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3 min-h-12">
            <label className="w-24 shrink-0 text-base font-semibold text-stone-800">借入金額</label>
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
                  className="min-w-[4rem] w-20 ds-input px-3 py-2 text-base font-semibold"
                  value={form.principalMan || ""}
                  onChange={(e) => updateForm({ principalMan: Number(e.target.value) || 0 })}
                />
                <span className="text-base font-semibold text-stone-600">万</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 min-h-12">
            <div className="flex items-center gap-3">
              <label className="w-20 shrink-0 text-base font-semibold text-stone-800">返済開始</label>
              <div className="flex flex-1 items-center gap-1">
                <input
                  type="number"
                  min={2000}
                  max={2100}
                  className="w-16 ds-input px-2 py-2 text-base font-semibold"
                  value={form.startYear}
                  onChange={(e) => updateForm({ startYear: Number(e.target.value) || 2025 })}
                />
                <span className="text-base text-stone-600">年</span>
                <input
                  type="number"
                  min={1}
                  max={12}
                  className="w-12 ds-input px-2 py-2 text-base font-semibold"
                  value={form.startMonth}
                  onChange={(e) => updateForm({ startMonth: Number(e.target.value) || 1 })}
                />
                <span className="text-base text-stone-600">月</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <label className="w-20 shrink-0 text-base font-semibold text-stone-800">返済方式</label>
              <select
                className="flex-1 ds-input px-2 py-2 text-base font-semibold"
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
              <label className="w-24 shrink-0 text-base font-semibold text-stone-800">返済期間</label>
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
                    className="w-14 ds-input px-2 py-2 text-base font-semibold"
                    value={form.years || ""}
                    onChange={(e) => updateForm({ years: Number(e.target.value) || 1 })}
                  />
                  <span className="text-base font-semibold text-stone-600">年</span>
                </div>
              </div>
            </div>
          )}
          {form.method === "fixed_payment" && (
            <div className="flex items-center gap-3 min-h-12">
              <label className="w-24 shrink-0 text-base font-semibold text-stone-800">毎月返済額</label>
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
                    className="min-w-[5.5rem] w-24 ds-input px-3 py-2 text-base font-semibold"
                    value={form.monthlyPayment ?? ""}
                    onChange={(e) => updateForm({ monthlyPayment: e.target.value ? Number(e.target.value) : null })}
                  />
                  <span className="text-base font-semibold text-stone-600">円</span>
                </div>
              </div>
            </div>
          )}
          {form.method === "fixed_principal" && (
            <div className="flex items-center gap-3 min-h-12">
              <label className="w-24 shrink-0 text-base font-semibold text-stone-800">毎月元金</label>
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
                    className="min-w-[5.5rem] w-24 ds-input px-3 py-2 text-base font-semibold"
                    value={form.monthlyPrincipal ?? ""}
                    onChange={(e) => updateForm({ monthlyPrincipal: e.target.value ? Number(e.target.value) : null })}
                  />
                  <span className="text-sm font-bold text-stone-600">円</span>
                </div>
              </div>
            </div>
          )}
          {(form.method === "fixed_payment" || form.method === "fixed_principal") && (
            <p className="text-xs text-stone-600 rounded-lg bg-stone-50 border border-stone-100 px-3 py-2">
              <span className="font-bold text-stone-700">逆算モード：</span>「月々○円ならいくら借りられる？」を試せます。詳しくは<Link href="/articles/monthly-50000-how-much-can-borrow" className="font-bold text-stone-800 underline hover:no-underline">月5万でいくら借りられる</Link>や<Link href="/articles#repayment-planning" className="font-bold text-stone-800 underline hover:no-underline">逆算・返済計画</Link>の記事もご覧ください。
            </p>
          )}
        </div>

        <div className="space-y-2 pt-1 border-t border-stone-100">
          <div className="flex items-center gap-3 min-h-12">
            <label className="w-24 shrink-0 text-base font-semibold text-stone-800">金利</label>
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
              <span className="w-12 shrink-0 text-right text-base font-bold text-stone-900">
                {form.rateSteps[0]?.rate ?? 15}%
              </span>
            </div>
            <button type="button" onClick={addRateStep} className="shrink-0 text-sm font-bold text-stone-600 hover:underline">
              +追加
            </button>
          </div>
          <div className="space-y-1">
            {form.rateSteps.map((r, i) => (
              <div key={i} className="flex items-center gap-2 pl-6">
                <span className="text-sm text-stone-600">月</span>
                <input
                  type="number"
                  min={1}
                  className="w-14 ds-input px-2 py-1.5 text-sm"
                  value={r.fromMonth}
                  onChange={(e) =>
                    setForm((prev) => {
                      const next = [...prev.rateSteps];
                      next[i] = { ...next[i], fromMonth: Number(e.target.value) || 1 };
                      return { ...prev, rateSteps: next };
                    })
                  }
                />
                <span className="text-sm text-stone-600">〜</span>
                <input
                  type="number"
                  min={0}
                  step={0.1}
                  className="w-14 ds-input px-2 py-1.5 text-sm"
                  value={r.rate}
                  onChange={(e) =>
                    setForm((prev) => {
                      const next = [...prev.rateSteps];
                      next[i] = { ...next[i], rate: Number(e.target.value) || 0 };
                      return { ...prev, rateSteps: next };
                    })
                  }
                />
                <span className="text-sm text-stone-600">%</span>
                {form.rateSteps.length > 1 && (
                  <button type="button" onClick={() => removeRateStep(i)} className="text-sm text-red-600 hover:underline">
                    削除
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className={`space-y-3 pt-1 border-t border-stone-100 ${form.extraEnabled ? "rounded-xl bg-stone-50/80 p-4 -mx-1" : ""}`}>
          <div className="flex items-center gap-3 min-h-12">
            <span className="w-24 shrink-0 text-base font-semibold text-stone-800">追加返済</span>
            <button
              type="button"
              role="switch"
              aria-checked={form.extraEnabled}
              onClick={() => updateForm({ extraEnabled: !form.extraEnabled })}
              className={`relative inline-flex h-7 w-12 shrink-0 rounded-full transition-colors ${form.extraEnabled ? "bg-stone-800" : "bg-stone-200"}`}
            >
              <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${form.extraEnabled ? "translate-x-6" : "translate-x-1"} mt-1`} />
            </button>
            <span className="text-sm text-stone-600">{form.extraEnabled ? "ON" : "OFF"}</span>
          </div>
          {form.extraEnabled && (
            <div className="rounded-lg border border-stone-200 bg-stone-50 p-3">
              <p className="mb-2 text-xs text-stone-600">
                繰上返済には<strong className="text-stone-700">返済額軽減型</strong>（月々の返済額を下げる）と<strong className="text-stone-700">期間短縮型</strong>（期間を短くする）があります。本ツールでは追加で返す分が元金に充当され、完済が早まる「期間短縮型」の効果を試算します。詳しくは<Link href="/articles/early-repayment-100k-effect" className="font-bold text-stone-800 underline hover:no-underline">繰り上げ返済10万円の効果</Link>の記事もご覧ください。
              </p>
              <div className="flex gap-2 border-b border-stone-200 pb-2">
                {(["monthly", "oneTime", "bonus"] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setExtraTab(t)}
                    className={`rounded-lg px-3 py-1.5 text-sm font-bold ${extraTab === t ? "bg-stone-800 text-white" : "bg-white text-stone-600 hover:bg-stone-100"}`}
                  >
                    {t === "monthly" ? "毎月追加" : t === "oneTime" ? "単発追加" : "ボーナス追加"}
                  </button>
                ))}
              </div>
              {extraTab === "monthly" && (
                <div className="mt-3 flex items-center gap-3 min-h-12">
                  <label className="w-28 shrink-0 text-sm font-bold text-stone-800">毎月追加額</label>
                  <div className="flex min-w-0 flex-1 items-center gap-2">
                    <input
                      type="range"
                      min={0}
                      max={100000}
                      step={5000}
                      className="min-w-0 flex-1"
                      value={Math.min(100000, Math.max(0, form.monthlyExtraAmount || 0))}
                      onChange={(e) => updateForm({ monthlyExtraAmount: Number(e.target.value) })}
                    />
                    <div className="flex min-w-[7rem] shrink-0 items-center gap-0.5">
                      <input
                        type="number"
                        min={0}
                        max={100000}
                        inputMode="numeric"
                        className="min-w-[5.5rem] w-24 ds-input px-3 py-2 text-base font-semibold"
                        value={form.monthlyExtraAmount || ""}
                        onChange={(e) => updateForm({ monthlyExtraAmount: Number(e.target.value) || 0 })}
                      />
                      <span className="text-base font-semibold text-stone-600">円</span>
                    </div>
                  </div>
                </div>
              )}
              {extraTab === "oneTime" && (
                <div className="mt-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-stone-800">単発の追加返済</span>
                    <button type="button" onClick={addOneTime} className="text-sm font-bold text-stone-600 hover:underline">
                      +追加
                    </button>
                  </div>
                  {form.oneTimeExtras.map((o, i) => (
                    <div key={i} className="flex flex-wrap items-center gap-2">
                      <input
                        type="number"
                        min={form.startYear}
                        max={2100}
                        className="w-16 ds-input px-2 py-1.5 text-sm"
                        value={o.year}
                        onChange={(e) =>
                          setForm((prev) => {
                            const next = [...prev.oneTimeExtras];
                            next[i] = { ...next[i], year: Number(e.target.value) || form.startYear };
                            return { ...prev, oneTimeExtras: next };
                          })
                        }
                      />
                      <span className="text-sm text-stone-600">年</span>
                      <input
                        type="number"
                        min={1}
                        max={12}
                        className="w-12 ds-input px-2 py-1.5 text-sm"
                        value={o.month}
                        onChange={(e) =>
                          setForm((prev) => {
                            const next = [...prev.oneTimeExtras];
                            next[i] = { ...next[i], month: Number(e.target.value) || 1 };
                            return { ...prev, oneTimeExtras: next };
                          })
                        }
                      />
                      <span className="text-sm text-stone-600">月</span>
                      <input
                        type="number"
                        min={0}
                        max={2000000}
                        inputMode="numeric"
                        className="w-24 ds-input px-2 py-1.5 text-sm"
                        value={o.amount || ""}
                        onChange={(e) =>
                          setForm((prev) => {
                            const next = [...prev.oneTimeExtras];
                            next[i] = { ...next[i], amount: Number(e.target.value) || 0 };
                            return { ...prev, oneTimeExtras: next };
                          })
                        }
                      />
                      <span className="text-sm text-stone-600">円</span>
                      <button type="button" onClick={() => removeOneTime(i)} className="text-sm text-red-600 hover:underline">
                        削除
                      </button>
                    </div>
                  ))}
                </div>
              )}
              {extraTab === "bonus" && (
                <div className="mt-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-stone-800">ボーナス返済</span>
                    <button type="button" onClick={addBonus} className="text-sm font-bold text-stone-600 hover:underline">
                      +追加
                    </button>
                  </div>
                  {form.bonusPayments.map((b, i) => (
                    <div key={i} className="flex items-center gap-3 min-h-12">
                      <select
                        className="w-16 shrink-0 ds-input px-2 py-1.5 text-sm"
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
                            className="min-w-[5.5rem] w-24 ds-input px-3 py-2 text-base"
                            value={b.amount || ""}
                            onChange={(e) =>
                              setForm((prev) => {
                                const next = [...prev.bonusPayments];
                                next[i] = { ...next[i], amount: Number(e.target.value) || 0 };
                                return { ...prev, bonusPayments: next };
                              })
                            }
                          />
                          <span className="text-sm text-stone-600">円</span>
                        </div>
                      </div>
                      <button type="button" onClick={() => removeBonus(i)} className="shrink-0 text-sm text-red-600 hover:underline">
                        削除
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </form>

      {errorMessage != null && errorMessage !== "" && (
        <p className="mt-4 text-base font-medium text-red-600">{errorMessage}</p>
      )}
    </div>
  );
}
