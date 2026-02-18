/**
 * 回帰テスト: 追加返済OFF・bonusなしで現行と一致することを確認
 */
import { calcLoan, type CalcInput } from "./loan-calc";

const BASE_INPUT: CalcInput = {
  principal: 1_000_000,
  startYear: 2026,
  startMonth: 2,
  method: "equal_payment",
  rateSteps: [{ fromMonth: 1, annualRatePercent: 15 }],
  bonusPayments: [],
  extraPayments: [],
  months: 60,
};

describe("calcLoan 回帰テスト", () => {
  it("追加返済OFF・bonusなしで元利均等が正しく計算される", () => {
    const result = calcLoan(BASE_INPUT);
    expect(result.ok).toBe(true);
    if (!result.ok) return;

    expect(result.schedule.length).toBe(60);
    expect(result.months).toBe(60);
    expect(result.finalYear).toBe(2031);
    expect(result.finalMonth).toBe(1);
    expect(result.schedule[result.schedule.length - 1].balance).toBe(0);

    const first = result.schedule[0];
    expect(first.payment).toBeGreaterThan(first.interest);
    expect(first.principal).toBeGreaterThan(0);
    expect(first.bonus).toBe(0);

    const totalPrincipal = result.schedule.reduce((s, r) => s + r.principal, 0);
    expect(totalPrincipal).toBe(1_000_000);
  });

  it("追加返済OFF・bonusなしで元金均等が正しく計算される", () => {
    const input: CalcInput = { ...BASE_INPUT, method: "equal_principal" };
    const result = calcLoan(input);
    expect(result.ok).toBe(true);
    if (!result.ok) return;

    expect(result.schedule.length).toBe(60);
    const totalPrincipal = result.schedule.reduce((s, r) => s + r.principal, 0);
    expect(totalPrincipal).toBe(1_000_000);
    expect(result.schedule[result.schedule.length - 1].balance).toBe(0);
  });

  it("定額元利で利息>返済が12回続くと完済不可エラー", () => {
    const input: CalcInput = {
      ...BASE_INPUT,
      method: "fixed_payment",
      monthlyPayment: 5000,
      principal: 5_000_000,
    };
    const result = calcLoan(input);
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.error).toContain("完済できません");
  });
});
