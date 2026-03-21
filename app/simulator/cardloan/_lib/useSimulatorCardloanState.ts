"use client";

import { useCallback, useMemo, useState } from "react";
import { calcLoan } from "@/lib/loan-calc";
import { toCalcInput, DEFAULT_FORM, type FormState } from "./simulatorMappers";

/**
 * カードローンシミュレーター画面のフォーム状態・派生計算・更新ハンドラ。
 */
export function useSimulatorCardloanState() {
  /** 手取り月収（任意）。入力時のみサマリーに返済負担率（参考）を表示 */
  const [takeHomeMonthly, setTakeHomeMonthly] = useState<number | null>(null);

  const [formA, setFormA] = useState<FormState>(DEFAULT_FORM);
  const [formB, setFormB] = useState<FormState>({
    ...DEFAULT_FORM,
    principalMan: 100,
    extraEnabled: true,
    monthlyExtraAmount: 5000,
  });
  const [activeTab, setActiveTab] = useState<"A" | "B">("A");
  const [extraTab, setExtraTab] = useState<"monthly" | "oneTime" | "bonus">("monthly");

  const resultA = useMemo(() => calcLoan(toCalcInput(formA)), [formA]);
  const resultB = useMemo(() => calcLoan(toCalcInput(formB)), [formB]);

  const result = activeTab === "A" ? resultA : resultB;
  const form = activeTab === "A" ? formA : formB;
  const setForm = activeTab === "A" ? setFormA : setFormB;

  const updateForm = useCallback(
    (patch: Partial<FormState>) => setForm((prev) => ({ ...prev, ...patch })),
    [setForm],
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
    [setForm],
  );

  const addBonus = useCallback(() => {
    setForm((prev) => ({
      ...prev,
      bonusPayments: [...prev.bonusPayments, { month: 6, amount: 100000 }],
    }));
  }, [setForm]);

  const removeBonus = useCallback(
    (i: number) => setForm((prev) => ({ ...prev, bonusPayments: prev.bonusPayments.filter((_, j) => j !== i) })),
    [setForm],
  );

  const addOneTime = useCallback(() => {
    setForm((prev) => ({
      ...prev,
      oneTimeExtras: [...prev.oneTimeExtras, { year: form.startYear, month: form.startMonth, amount: 100000 }],
    }));
  }, [form.startYear, form.startMonth, setForm]);

  const removeOneTime = useCallback(
    (i: number) => setForm((prev) => ({ ...prev, oneTimeExtras: prev.oneTimeExtras.filter((_, j) => j !== i) })),
    [setForm],
  );

  const errorMessage = result.ok === false ? result.error : null;

  return {
    takeHomeMonthly,
    setTakeHomeMonthly,
    formA,
    formB,
    activeTab,
    setActiveTab,
    extraTab,
    setExtraTab,
    resultA,
    resultB,
    result,
    form,
    setForm,
    updateForm,
    addRateStep,
    removeRateStep,
    addBonus,
    removeBonus,
    addOneTime,
    removeOneTime,
    errorMessage,
  };
}
