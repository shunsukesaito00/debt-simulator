/**
 * 借入返済シミュレーター 計算ロジック
 * 元利均等 / 元金均等 / 定額元利 / 定額元金 に対応
 * 金利段階変更・ボーナス返済対応
 */

export type RepaymentMethod =
  | "equal_payment"   // 元利均等（回数指定）
  | "equal_principal" // 元金均等（回数指定）
  | "fixed_payment"  // 定額元利（金額指定）
  | "fixed_principal"; // 定額元金（金額指定）

export type RateStep = {
  fromMonth: number; // 何ヶ月目から（1始まり）
  annualRatePercent: number;
};

export type BonusPayment = {
  month: number; // 1-12（1月〜12月）
  amount: number;
};

export type CalcInput = {
  principal: number;
  startYear: number;
  startMonth: number;
  method: RepaymentMethod;
  rateSteps: RateStep[];
  bonusPayments: BonusPayment[];
  /** 元利均等・元金均等: 返済回数（月数） */
  months?: number;
  /** 定額元利: 毎月返済額（円） */
  monthlyPayment?: number;
  /** 定額元金: 毎月元金（円） */
  monthlyPrincipal?: number;
  maxMonths?: number; // 上限（無限ループ防止、デフォルト600=50年）
};

export type ScheduleRow = {
  year: number;
  month: number;
  annualRatePercent: number;
  payment: number;
  interest: number;
  principal: number;
  bonus: number;
  balance: number;
};

export type CalcResult = {
  ok: true;
  schedule: ScheduleRow[];
  totalPayment: number;
  totalInterest: number;
  totalBonus: number;
  months: number;
  finalYear: number;
  finalMonth: number;
} | {
  ok: false;
  error: string;
};

function getRateAtMonth(rateSteps: RateStep[], month1Based: number): number {
  if (rateSteps.length === 0) return 0;
  const sorted = [...rateSteps].sort((a, b) => a.fromMonth - b.fromMonth);
  let r = sorted[0].annualRatePercent;
  for (const s of sorted) {
    if (month1Based >= s.fromMonth) r = s.annualRatePercent;
  }
  return r;
}

function getBonusForRow(
  bonusPayments: BonusPayment[],
  startYear: number,
  startMonth: number,
  rowIndex: number
): number {
  if (bonusPayments.length === 0) return 0;
  const absMonth = startYear * 12 + (startMonth - 1) + rowIndex;
  const calMonth = (absMonth % 12) + 1;
  return bonusPayments
    .filter((b) => b.month === calMonth)
    .reduce((sum, b) => sum + b.amount, 0);
}

function toYearMonth(startYear: number, startMonth: number, rowIndex: number): { year: number; month: number } {
  const abs = startYear * 12 + (startMonth - 1) + rowIndex;
  return {
    year: Math.floor(abs / 12),
    month: (abs % 12) + 1,
  };
}

/** 利息（端数切捨て） */
function calcInterest(balance: number, annualRatePercent: number): number {
  const r = (annualRatePercent / 100) / 12;
  return Math.floor(balance * r);
}

export function calcLoan(input: CalcInput): CalcResult {
  const maxMonths = input.maxMonths ?? 600;
  const { principal, startYear, startMonth, method, rateSteps, bonusPayments } = input;

  if (principal <= 0) return { ok: false, error: "借入金額は1円以上を入力してください。" };
  if (startMonth < 1 || startMonth > 12) return { ok: false, error: "開始月は1〜12の範囲で入力してください。" };
  if (rateSteps.length === 0) return { ok: false, error: "金利を1件以上設定してください。" };

  const schedule: ScheduleRow[] = [];
  let balance = principal;
  let totalPayment = 0;
  let totalInterest = 0;
  let totalBonus = 0;

  // 定額系の場合は月額が決まっている
  let fixedMonthlyPayment: number | null = null;
  let fixedMonthlyPrincipal: number | null = null;

  if (method === "equal_payment" || method === "equal_principal") {
    const months = input.months ?? 0;
    if (months <= 0) return { ok: false, error: "返済回数（月数）を指定してください。" };
    if (months > maxMonths) return { ok: false, error: `返済回数は${maxMonths}回以内で指定してください。` };
  }

  if (method === "equal_payment") {
    const months = input.months!;
    const r = getRateAtMonth(rateSteps, 1);
    const monthlyRate = (r / 100) / 12;
    if (monthlyRate === 0) {
      fixedMonthlyPayment = principal / months;
    } else {
      const factor = Math.pow(1 + monthlyRate, months);
      fixedMonthlyPayment = (principal * monthlyRate * factor) / (factor - 1);
    }
  }

  if (method === "equal_principal") {
    fixedMonthlyPrincipal = principal / input.months!;
  }

  if (method === "fixed_payment") {
    const pmt = input.monthlyPayment ?? 0;
    if (pmt <= 0) return { ok: false, error: "毎月返済額を指定してください。" };
    fixedMonthlyPayment = pmt;
  }

  if (method === "fixed_principal") {
    const pr = input.monthlyPrincipal ?? 0;
    if (pr <= 0) return { ok: false, error: "毎月元金を指定してください。" };
    fixedMonthlyPrincipal = pr;
  }

  let rowIndex = 0;
  while (balance > 0 && rowIndex < maxMonths) {
    rowIndex++;
    const annualRate = getRateAtMonth(rateSteps, rowIndex);
    const interest = calcInterest(balance, annualRate);

    let payment: number;
    let principalPaid: number;

    if (method === "equal_payment" && fixedMonthlyPayment !== null) {
      payment = Math.round(fixedMonthlyPayment);
      principalPaid = payment - interest;
    } else if (method === "equal_principal" && fixedMonthlyPrincipal !== null) {
      principalPaid = Math.min(Math.round(fixedMonthlyPrincipal), balance);
      payment = principalPaid + interest;
    } else if (method === "fixed_payment" && fixedMonthlyPayment !== null) {
      payment = fixedMonthlyPayment;
      principalPaid = payment - interest;
    } else if (method === "fixed_principal" && fixedMonthlyPrincipal !== null) {
      principalPaid = Math.min(balance, fixedMonthlyPrincipal);
      payment = principalPaid + interest;
    } else {
      return { ok: false, error: "計算方式の設定が不正です。" };
    }

    const bonus = getBonusForRow(bonusPayments, startYear, startMonth, rowIndex - 1);

    if (principalPaid <= 0 && balance > 0) {
      return { ok: false, error: "毎月返済額が利息以下です。完済できません。返済額を増やすか、金利を確認してください。" };
    }

    const principalPaidActual = Math.min(principalPaid, balance);
    const bonusActual = Math.min(bonus, balance - principalPaidActual);
    const { year, month } = toYearMonth(startYear, startMonth, rowIndex - 1);

    balance = Math.max(0, balance - principalPaidActual - bonusActual);
    const actualPayment = principalPaidActual + interest;
    totalPayment += actualPayment;
    totalInterest += interest;
    totalBonus += bonusActual;

    schedule.push({
      year,
      month,
      annualRatePercent: annualRate,
      payment: actualPayment,
      interest,
      principal: principalPaidActual,
      bonus: bonusActual,
      balance,
    });
  }

  const last = schedule[schedule.length - 1];
  return {
    ok: true,
    schedule,
    totalPayment,
    totalInterest,
    totalBonus,
    months: schedule.length,
    finalYear: last?.year ?? startYear,
    finalMonth: last?.month ?? startMonth,
  };
}
