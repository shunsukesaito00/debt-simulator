/**
 * 借入返済シミュレーター 計算ロジック
 * calcSchedule に一本化。4方式共通の月次ループで Payment_base + Extra を適用。
 * 元利均等 / 元金均等 / 定額元利 / 定額元金 に対応
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

/** 追加返済イベント（毎月・単発・ボーナスを統一） */
export type ExtraPayment =
  | { type: "monthly"; amount: number; startYyyymm: number; endYyyymm?: number }
  | { type: "oneTime"; yyyymm: number; amount: number }
  | { type: "bonus"; month: number; amount: number };

export type CalcInput = {
  principal: number;
  startYear: number;
  startMonth: number;
  method: RepaymentMethod;
  rateSteps: RateStep[];
  /** @deprecated 後方互換。extraPayments が空時は bonusPayments を使用 */
  bonusPayments?: BonusPayment[];
  /** 追加返済イベント（毎月・単発・ボーナス統合） */
  extraPayments?: ExtraPayment[];
  /** 元利均等・元金均等: 返済回数（月数） */
  months?: number;
  /** 定額元利: 毎月返済額（円） */
  monthlyPayment?: number;
  /** 定額元金: 毎月元金（円） */
  monthlyPrincipal?: number;
  maxMonths?: number;
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

/** 利息（端数切捨て・一貫ルール） */
function calcInterest(balance: number, annualRatePercent: number): number {
  const r = (annualRatePercent / 100) / 12;
  return Math.floor(balance * r);
}

function toYearMonth(startYear: number, startMonth: number, rowIndex: number): { year: number; month: number } {
  const abs = startYear * 12 + (startMonth - 1) + rowIndex;
  return {
    year: Math.floor(abs / 12),
    month: (abs % 12) + 1,
  };
}

/** 追加返済イベントから当該月の合計額（同月複数は合算） */
function getExtraForMonth(
  extraPayments: ExtraPayment[],
  yyyymm: number
): number {
  if (extraPayments.length === 0) return 0;
  let sum = 0;
  const calMonth = (yyyymm % 100) || 12;
  for (const e of extraPayments) {
    if (e.type === "monthly") {
      if (yyyymm >= e.startYyyymm && (e.endYyyymm == null || yyyymm <= e.endYyyymm)) {
        sum += e.amount;
      }
    } else if (e.type === "oneTime") {
      if (yyyymm === e.yyyymm) sum += e.amount;
    } else if (e.type === "bonus") {
      if (calMonth === e.month) sum += e.amount;
    }
  }
  return sum;
}

/** 元利均等: A = B0 * r * (1+r)^N / ((1+r)^N - 1) */
function calcEqualPaymentAmount(
  principal: number,
  annualRatePercent: number,
  months: number
): number {
  if (months <= 0) return 0;
  const r = (annualRatePercent / 100) / 12;
  if (r === 0) return principal / months;
  const factor = Math.pow(1 + r, months);
  return (principal * r * factor) / (factor - 1);
}

/**
 * 月次ループの共通骨格
 * 1. 期首残高 B, 利息 I
 * 2. Payment_base（方式別）
 * 3. Extra = sum(events)
 * 4. Payment_total = min(Payment_base + Extra, I + B)  // 最終月過払い防止
 * 5. P = max(0, Payment_total - I), P_actual = min(P, B)
 * 6. B' = B - P_actual
 */
function calcSchedule(input: CalcInput): CalcResult {
  const maxMonths = input.maxMonths ?? 600;
  const { principal: B0, startYear, startMonth, method, rateSteps } = input;

  const extraPayments: ExtraPayment[] = input.extraPayments?.length
    ? [...input.extraPayments]
    : (input.bonusPayments ?? [])
        .filter((b) => b.amount > 0)
        .map((b) => ({ type: "bonus" as const, month: b.month, amount: b.amount }));

  if (B0 <= 0) return { ok: false, error: "借入金額は1円以上を入力してください。" };
  if (startMonth < 1 || startMonth > 12) return { ok: false, error: "開始月は1〜12の範囲で入力してください。" };
  if (rateSteps.length === 0) return { ok: false, error: "金利を1件以上設定してください。" };

  const schedule: ScheduleRow[] = [];
  let balance = B0;
  let totalPayment = 0;
  let totalInterest = 0;
  let totalBonus = 0;

  // 方式別の固定値（ループ外で設定）
  let equalPaymentAmount: number | null = null;  // 元利均等: 当初固定A
  let equalPrincipalAmount: number | null = null;  // 元金均等: G = B0/N
  let fixedPaymentAmount: number | null = null;  // 定額元利: A_fixed
  let fixedPrincipalAmount: number | null = null;  // 定額元金: G_fixed

  const totalMonths = method === "equal_payment" || method === "equal_principal" ? (input.months ?? 0) : 0;

  if (method === "equal_payment" || method === "equal_principal") {
    const months = input.months ?? 0;
    if (months <= 0) return { ok: false, error: "返済回数（月数）を指定してください。" };
    if (months > maxMonths) return { ok: false, error: `返済回数は${maxMonths}回以内で指定してください。` };
  }

  if (method === "equal_payment") {
    const annualRate = getRateAtMonth(rateSteps, 1);
    equalPaymentAmount = calcEqualPaymentAmount(B0, annualRate, totalMonths);
  }
  if (method === "equal_principal") {
    equalPrincipalAmount = B0 / totalMonths!;
  }
  if (method === "fixed_payment") {
    const pmt = input.monthlyPayment ?? 0;
    if (pmt <= 0) return { ok: false, error: "毎月返済額を指定してください。" };
    fixedPaymentAmount = pmt;
  }
  if (method === "fixed_principal") {
    const pr = input.monthlyPrincipal ?? 0;
    if (pr <= 0) return { ok: false, error: "毎月元金を指定してください。" };
    fixedPrincipalAmount = pr;
  }

  let lastRateForEqualPayment = getRateAtMonth(rateSteps, 1);
  let insolvencyCount = 0;  // 定額元利: 利息>返済が続いた回数

  for (let rowIndex = 0; balance > 0 && rowIndex < maxMonths; rowIndex++) {
    const annualRate = getRateAtMonth(rateSteps, rowIndex + 1);
    const interest = calcInterest(balance, annualRate);

    let paymentBase: number;
    switch (method) {
      case "equal_payment": {
        const remainingMonths = Math.max(1, totalMonths! - rowIndex);
        const rateChanged = lastRateForEqualPayment !== annualRate;
        if (rateChanged) {
          equalPaymentAmount = calcEqualPaymentAmount(balance, annualRate, remainingMonths);
          lastRateForEqualPayment = annualRate;
        }
        paymentBase = Math.round(equalPaymentAmount!);
        break;
      }
      case "equal_principal": {
        const G = Math.min(equalPrincipalAmount!, balance);
        paymentBase = Math.round(G) + interest;
        break;
      }
      case "fixed_payment":
        paymentBase = fixedPaymentAmount!;
        break;
      case "fixed_principal": {
        const G = Math.min(fixedPrincipalAmount!, balance);
        paymentBase = Math.round(G) + interest;
        break;
      }
      default:
        return { ok: false, error: "計算方式の設定が不正です。" };
    }

    const { year, month } = toYearMonth(startYear, startMonth, rowIndex);
    const yyyymm = year * 100 + month;
    const extra = getExtraForMonth(extraPayments, yyyymm);

    const paymentTotalRaw = paymentBase + extra;
    const paymentCap = interest + balance;  // 最終月過払い防止
    const paymentTotal = Math.min(paymentTotalRaw, paymentCap);

    const principalPaid = Math.max(0, paymentTotal - interest);
    const principalActual = Math.min(principalPaid, balance);

    // 定額元利: 完済不可検出（利息 > 返済が12回続く）
    if (method === "fixed_payment") {
      if (fixedPaymentAmount! + extra <= interest) {
        insolvencyCount++;
        if (insolvencyCount >= 12) {
          return {
            ok: false,
            error: "この条件では完済できません（利息＞返済額が続いています）。毎月返済額を増やすか、金利を確認してください。",
          };
        }
      } else {
        insolvencyCount = 0;
      }
    } else {
      insolvencyCount = 0;
    }

    balance = Math.max(0, balance - principalActual);
    const extraApplied = Math.min(extra, Math.max(0, paymentTotal - paymentBase));

    totalPayment += paymentTotal;
    totalInterest += interest;
    totalBonus += extraApplied;

    schedule.push({
      year,
      month,
      annualRatePercent: annualRate,
      payment: paymentTotal,
      interest,
      principal: principalActual,
      bonus: extraApplied,
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

/** 公開API（calcSchedule のエイリアス） */
export function calcLoan(input: CalcInput): CalcResult {
  return calcSchedule(input);
}
