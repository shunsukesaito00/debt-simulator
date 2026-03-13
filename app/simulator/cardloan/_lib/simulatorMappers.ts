import type {
  CalcInput,
  ExtraPayment,
  RateStep,
  RepaymentMethod,
} from "@/lib/loan-calc";

/** シミュレーター画面のフォーム状態（A/B 各案） */
export type FormState = {
  principalMan: number;
  startYear: number;
  startMonth: number;
  method: RepaymentMethod;
  years: number;
  rateSteps: { fromMonth: number; rate: number }[];
  bonusPayments: { month: number; amount: number }[];
  monthlyPayment: number | null;
  monthlyPrincipal: number | null;
  extraEnabled: boolean;
  monthlyExtraAmount: number;
  oneTimeExtras: { year: number; month: number; amount: number }[];
};

export const DEFAULT_FORM: FormState = {
  principalMan: 100,
  startYear: new Date().getFullYear(),
  startMonth: new Date().getMonth() + 1,
  method: "equal_payment",
  years: 5,
  rateSteps: [{ fromMonth: 1, rate: 15 }],
  bonusPayments: [],
  monthlyPayment: null,
  monthlyPrincipal: null,
  extraEnabled: false,
  monthlyExtraAmount: 0,
  oneTimeExtras: [],
};

/**
 * フォーム状態を lib/loan-calc の CalcInput に変換する。
 * 計算呼び出しは page 側で行う。
 */
export function toCalcInput(form: FormState): CalcInput {
  const rateSteps: RateStep[] = form.rateSteps.map((r) => ({
    fromMonth: r.fromMonth,
    annualRatePercent: r.rate,
  }));

  const extraPayments: ExtraPayment[] = [];
  if (form.extraEnabled) {
    const startYyyymm = form.startYear * 100 + form.startMonth;
    if (form.monthlyExtraAmount > 0) {
      extraPayments.push({ type: "monthly", amount: form.monthlyExtraAmount, startYyyymm });
    }
    for (const o of form.oneTimeExtras.filter((x) => x.amount > 0)) {
      extraPayments.push({ type: "oneTime", yyyymm: o.year * 100 + o.month, amount: o.amount });
    }
    for (const b of form.bonusPayments.filter((x) => x.amount > 0)) {
      extraPayments.push({ type: "bonus", month: b.month, amount: b.amount });
    }
  }

  const base: CalcInput = {
    principal: form.principalMan * 10000,
    startYear: form.startYear,
    startMonth: form.startMonth,
    method: form.method,
    rateSteps,
    extraPayments,
  };

  if (form.method === "equal_payment" || form.method === "equal_principal") {
    return { ...base, months: Math.round(form.years * 12) };
  }
  if (form.method === "fixed_payment") {
    return { ...base, monthlyPayment: form.monthlyPayment ?? 0 };
  }
  return { ...base, monthlyPrincipal: form.monthlyPrincipal ?? 0 };
}

/** 借入額（万円）をバケット化（条件連動・計測用。生の金額は送らない） */
export function getPrincipalBucket(man: number): "<=120" | "121-250" | "251+" {
  if (man <= 120) return "<=120";
  if (man <= 250) return "121-250";
  return "251+";
}

/** 円表示用（Hydration 揃えのため固定フォーマット） */
export function formatYen(value: number): string {
  const n = Math.round(value);
  const s = n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return `¥${s}`;
}

/** 数値のカンマ区切り（グラフ軸など） */
export function formatNum(value: number): string {
  const n = Math.round(value);
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
