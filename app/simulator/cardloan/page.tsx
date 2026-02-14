"use client";

import { useEffect, useMemo, useState } from "react";
import { AdSlot } from "@/app/components/AdSlot";

type RepaymentMethod =
  | "annuity_months"
  | "equal_principal_months"
  | "fixed_payment"
  | "fixed_principal";

type ViewMode = "summary" | "chart" | "table" | "compare";

type RateStep = { fromMonth: number; annualRatePct: number };

type Scenario = {
  name: "A" | "B";
  amountMan: number;

  startYear: number;
  startMonth: number;

  method: RepaymentMethod;

  years: number; // 回数指定方式のとき
  monthlyPaymentYen: number; // fixed_payment
  monthlyPrincipalYen: number; // fixed_principal

  rateSteps: RateStep[];

  // ボーナス返済
  bonusEnabled: boolean;
  bonusPaymentYen: number;
  bonusMonths: number[]; // 1-12
};

type Row = {
  monthIndex: number;
  year: number;
  month: number;
  annualRatePct: number;
  payment: number;
  principal: number;
  interest: number;
  bonusPayment: number;
  balance: number;
};

type SimOk = {
  ok: true;
  rows: Row[];
  payoffMonths: number;
  totalPayment: number;
  totalInterest: number;
  lastYm: string;
  annuityPayment: number | null;
};
type SimNg = { ok: false; reason: string };
type SimResult = SimOk | SimNg | null;

const LS_KEY = "debt_simulator_ui_final_v1";

function yen(n: number) {
  return Math.round(n).toLocaleString("ja-JP");
}
function pad2(n: number) {
  return String(n).padStart(2, "0");
}
function ymStr(y: number, m: number) {
  return `${y}/${pad2(m)}`;
}
function clampInt(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, Math.trunc(n)));
}
function parseIntLoose(s: string) {
  const digits = s.replace(/[^\d]/g, "");
  return digits ? Math.min(Number(digits), Number.MAX_SAFE_INTEGER) : 0;
}
function addMonths(startYear: number, startMonth: number, offsetMonths: number) {
  const total = startYear * 12 + (startMonth - 1) + offsetMonths;
  const y = Math.floor(total / 12);
  const m = (total % 12) + 1;
  return { year: y, month: m };
}
function getRatePctForMonth(rateSteps: RateStep[], monthIndex: number): number {
  const sorted = [...rateSteps].sort((a, b) => a.fromMonth - b.fromMonth);
  let rate = sorted[0]?.annualRatePct ?? 0;
  for (const step of sorted) if (monthIndex >= step.fromMonth) rate = step.annualRatePct;
  return rate;
}

function simulate(s: Scenario): SimResult {
  const amountYen = Math.round(s.amountMan * 10_000);
  if (amountYen <= 0) return null;

  const n = clampInt(s.years * 12, 1, 1200);
  let balance = amountYen;

  const rows: Row[] = [];
  let totalPayment = 0;
  let totalInterest = 0;

  const r0 = (getRatePctForMonth(s.rateSteps, 1) / 100) / 12;
  const annuityPayment =
    s.method === "annuity_months"
      ? Math.ceil((balance * r0) / (1 - Math.pow(1 + r0, -n)))
      : 0;

  const equalPrincipal =
    s.method === "equal_principal_months" ? Math.ceil(balance / n) : 0;

  for (let i = 1; i <= 1200; i++) {
    if (balance <= 0) break;

    const { year, month } = addMonths(s.startYear, s.startMonth, i - 1);
    const ratePct = getRatePctForMonth(s.rateSteps, i);
    const r = (ratePct / 100) / 12;

    const interest = Math.floor(balance * r);

    let payment = 0;
    let principal = 0;

    if (s.method === "annuity_months") {
      payment = annuityPayment;
      const need = balance + interest;
      payment = Math.min(payment, need);
      principal = payment - interest;
      if (principal <= 0)
        return { ok: false, reason: "返済条件が成立しません（毎月返済が利息以下）。" };
    } else if (s.method === "equal_principal_months") {
      principal = Math.min(equalPrincipal, balance);
      payment = principal + interest;
    } else if (s.method === "fixed_payment") {
      payment = Math.max(0, Math.round(s.monthlyPaymentYen));
      if (payment <= interest)
        return { ok: false, reason: "完済できません（毎月返済額が利息以下）。" };
      const need = balance + interest;
      payment = Math.min(payment, need);
      principal = payment - interest;
    } else {
      principal = Math.max(0, Math.round(s.monthlyPrincipalYen));
      principal = Math.min(principal, balance);
      payment = principal + interest;
    }

    const isBonusMonth = s.bonusEnabled && s.bonusMonths.includes(month);
    const bonusPayment = isBonusMonth ? Math.max(0, Math.round(s.bonusPaymentYen)) : 0;
    const bonusPrincipal = Math.min(bonusPayment, Math.max(0, balance - principal));

    balance = Math.max(0, balance - (principal + bonusPrincipal));

    rows.push({
      monthIndex: i,
      year,
      month,
      annualRatePct: ratePct,
      payment,
      principal,
      interest,
      bonusPayment,
      balance,
    });

    totalPayment += payment + bonusPayment;
    totalInterest += interest;
  }

  const payoffMonths = rows.length;
  const last = rows[rows.length - 1];
  const lastYm = last ? ymStr(last.year, last.month) : ymStr(s.startYear, s.startMonth);

  return {
    ok: true,
    rows,
    payoffMonths,
    totalPayment,
    totalInterest,
    lastYm,
    annuityPayment: s.method === "annuity_months" ? annuityPayment : null,
  };
}

function downloadCSV(filename: string, csvText: string) {
  const blob = new Blob([csvText], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function Card({
  title,
  sub,
  children,
}: {
  title: React.ReactNode;
  sub?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-3xl border border-gray-200 bg-white shadow-soft">
      <div className="border-b border-gray-200 px-4 py-4 md:px-6">
        <div className="text-base font-black text-gray-900 md:text-lg">{title}</div>
        {sub && <div className="mt-1 text-xs text-gray-500">{sub}</div>}
      </div>
      <div className="px-4 py-4 md:px-6 md:py-6">{children}</div>
    </section>
  );
}

function Stat({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4">
      <div className="text-xs font-black text-gray-500">{label}</div>
      <div className="mt-1 text-lg font-black text-gray-900">{value}</div>
      {hint && <div className="mt-1 text-xs text-gray-500">{hint}</div>}
    </div>
  );
}

function Seg({
  items,
  value,
  onChange,
}: {
  items: { key: string; label: string }[];
  value: string;
  onChange: (k: string) => void;
}) {
  return (
    <div className="inline-flex flex-wrap gap-2 rounded-2xl bg-gray-100 p-2">
      {items.map((it) => {
        const active = it.key === value;
        return (
          <button
            key={it.key}
            type="button"
            onClick={() => onChange(it.key)}
            className={`rounded-xl px-4 py-2 text-sm font-black transition ${
              active
                ? "bg-gray-900 text-white"
                : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
            }`}
          >
            {it.label}
          </button>
        );
      })}
    </div>
  );
}

function NumInput({
  label,
  value,
  onChange,
  suffix,
  placeholder,
  wide,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  suffix?: string;
  placeholder?: string;
  wide?: boolean;
}) {
  const [txt, setTxt] = useState(value ? String(value) : "");
  const [f, setF] = useState(false);

  useEffect(() => {
    if (!f) setTxt(value ? String(value) : "");
  }, [value, f]);

  return (
    <label className="grid gap-2">
      <div className="text-sm font-black text-gray-900">{label}</div>
      <div className="flex items-center gap-2">
        <input
          className={`rounded-2xl border border-gray-300 bg-white px-4 py-3 text-base outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 ${
            wide ? "w-full" : "w-full"
          }`}
          inputMode="numeric"
          placeholder={placeholder}
          value={txt}
          onFocus={() => setF(true)}
          onBlur={() => {
            setF(false);
            const v = parseIntLoose(txt);
            setTxt(v ? String(v) : "");
            onChange(v);
          }}
          onChange={(e) => {
            const raw = e.target.value;
            setTxt(raw);
            onChange(parseIntLoose(raw));
          }}
        />
        {suffix && <span className="whitespace-nowrap font-black text-gray-900">{suffix}</span>}
      </div>
    </label>
  );
}

function Select({
  label,
  value,
  onChange,
  children,
}: {
  label: string;
  value: number | string;
  onChange: (v: string) => void;
  children: React.ReactNode;
}) {
  return (
    <label className="grid gap-2">
      <div className="text-sm font-black text-gray-900">{label}</div>
      <select
        className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm font-black outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {children}
      </select>
    </label>
  );
}

function LineChart({ rows, amountYen }: { rows: Row[]; amountYen: number }) {
  const w = 1040;
  const h = 340;
  const padL = 70;
  const padR = 56;
  const padT = 16;
  const padB = 52;

  const balance = [amountYen, ...rows.map((r) => r.balance)];
  const interest = [0, ...rows.map((r) => r.interest)];
  const pay = [0, ...rows.map((r) => r.payment + r.bonusPayment)];

  const n = balance.length;
  const leftMax = Math.max(...balance, 1);
  const rightMax = Math.max(...interest, ...pay, 1);

  const plotW = w - padL - padR;
  const plotH = h - padT - padB;

  const x = (i: number) => padL + plotW * (n <= 1 ? 0 : i / (n - 1));
  const yL = (v: number) => padT + plotH * (1 - v / leftMax);
  const yR = (v: number) => padT + plotH * (1 - v / rightMax);
  const poly = (series: number[], yFn: (v: number) => number) =>
    series.map((v, i) => `${x(i)},${yFn(v)}`).join(" ");

  const ticks = 5;
  const gridLines = Array.from({ length: ticks + 1 }, (_, i) => i);

  return (
    <div className="overflow-x-auto rounded-3xl border border-gray-200 bg-white p-4">
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
        <div className="font-black text-gray-900">推移（残高 / 支払 / 利息）</div>
        <div className="flex flex-wrap gap-3 text-xs text-gray-600">
          <span className="inline-flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-gray-900" /> 残高（左軸）
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-gray-600" /> 支払（右軸）
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-gray-300" /> 利息（右軸）
          </span>
        </div>
      </div>

      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
        {gridLines.map((i) => {
          const y = padT + (plotH * i) / ticks;
          return <line key={i} x1={padL} y1={y} x2={w - padR} y2={y} stroke="#e5e7eb" />;
        })}

        <line x1={padL} y1={padT} x2={padL} y2={h - padB} stroke="#d1d5db" />
        <line x1={w - padR} y1={padT} x2={w - padR} y2={h - padB} stroke="#d1d5db" />
        <line x1={padL} y1={h - padB} x2={w - padR} y2={h - padB} stroke="#d1d5db" />

        <polyline points={poly(balance, yL)} fill="none" stroke="#111827" strokeWidth="2.6" />
        <polyline points={poly(pay, yR)} fill="none" stroke="#4b5563" strokeWidth="2.2" />
        <polyline points={poly(interest, yR)} fill="none" stroke="#d1d5db" strokeWidth="2.2" />

        <text x={10} y={padT + 12} fontSize="12" fill="#6b7280">
          左：{yen(leftMax)}円
        </text>
        <text x={w - 10} y={padT + 12} fontSize="12" fill="#6b7280" textAnchor="end">
          右：{yen(rightMax)}円
        </text>
      </svg>

      <div className="mt-2 text-xs text-gray-500">
        ※ スマホは横スクロール。残高=左軸、支払/利息=右軸です。
      </div>
    </div>
  );
}

function encodeShare(A: Scenario, B: Scenario) {
  const p = new URLSearchParams();
  const put = (prefix: "a" | "b", s: Scenario) => {
    p.set(`${prefix}_amountMan`, String(s.amountMan));
    p.set(`${prefix}_sy`, String(s.startYear));
    p.set(`${prefix}_sm`, String(s.startMonth));
    p.set(`${prefix}_method`, s.method);
    p.set(`${prefix}_years`, String(s.years));
    p.set(`${prefix}_mp`, String(s.monthlyPaymentYen));
    p.set(`${prefix}_mpri`, String(s.monthlyPrincipalYen));
    p.set(`${prefix}_steps`, s.rateSteps.map((x) => `${x.fromMonth}:${x.annualRatePct}`).join(","));
    p.set(`${prefix}_bonusEn`, s.bonusEnabled ? "1" : "0");
    p.set(`${prefix}_bonusPay`, String(s.bonusPaymentYen));
    p.set(`${prefix}_bonusMonths`, s.bonusMonths.join(","));
  };
  put("a", A);
  put("b", B);
  return p.toString();
}

function decodeShare(baseA: Scenario, baseB: Scenario) {
  const sp = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "");
  const parseScenario = (prefix: "a" | "b", base: Scenario): Scenario => {
    const get = (k: string) => sp.get(`${prefix}_${k}`);
    const num = (k: string, d: number) => {
      const v = get(k);
      const n = v === null ? NaN : Number(v);
      return Number.isFinite(n) ? n : d;
    };
    const str = (k: string, d: string) => (get(k) ?? d);

    const stepsRaw = str("steps", "");
    const steps: RateStep[] = stepsRaw
      ? stepsRaw
          .split(",")
          .map((seg) => {
            const [a, b] = seg.split(":");
            const fm = Number(a);
            const rp = Number(b);
            if (!Number.isFinite(fm) || !Number.isFinite(rp)) return null;
            return { fromMonth: clampInt(fm, 1, 1200), annualRatePct: rp };
          })
          .filter((x): x is RateStep => !!x)
      : base.rateSteps;

    const bonusMonthsRaw = str("bonusMonths", "");
    const bonusMonths = bonusMonthsRaw
      ? Array.from(
          new Set(
            bonusMonthsRaw
              .split(",")
              .map((x) => Number(x))
              .filter((x) => Number.isFinite(x))
              .map((x) => clampInt(x, 1, 12)),
          ),
        ).sort((a, b) => a - b)
      : base.bonusMonths;

    const method = str("method", base.method) as RepaymentMethod;
    const methodSafe: RepaymentMethod =
      (["annuity_months", "equal_principal_months", "fixed_payment", "fixed_principal"] as const).includes(method as any)
        ? method
        : base.method;

    return {
      ...base,
      amountMan: clampInt(num("amountMan", base.amountMan), 1, 100000),
      startYear: clampInt(num("sy", base.startYear), 1900, 3000),
      startMonth: clampInt(num("sm", base.startMonth), 1, 12),
      method: methodSafe,
      years: clampInt(num("years", base.years), 1, 50),
      monthlyPaymentYen: Math.max(0, Math.round(num("mp", base.monthlyPaymentYen))),
      monthlyPrincipalYen: Math.max(0, Math.round(num("mpri", base.monthlyPrincipalYen))),
      rateSteps: steps.length ? steps : base.rateSteps,
      bonusEnabled: str("bonusEn", base.bonusEnabled ? "1" : "0") === "1",
      bonusPaymentYen: Math.max(0, Math.round(num("bonusPay", base.bonusPaymentYen))),
      bonusMonths,
    };
  };

  const hasA = Array.from(sp.keys()).some((k) => k.startsWith("a_"));
  const hasB = Array.from(sp.keys()).some((k) => k.startsWith("b_"));

  return {
    A: hasA ? parseScenario("a", baseA) : baseA,
    B: hasB ? parseScenario("b", baseB) : baseB,
  };
}

function csvFromResult(res: SimResult) {
  if (!res || !res.ok) return "";
  const header = ["回", "年月", "年利(%)", "支払", "利息", "元金", "ボーナス", "残高"].join(",");
  const lines = res.rows.map((r) =>
    [r.monthIndex, ymStr(r.year, r.month), r.annualRatePct, r.payment, r.interest, r.principal, r.bonusPayment, r.balance].join(","),
  );
  return [header, ...lines].join("\n");
}

export default function Page() {
  const now = new Date();

  const baseA: Scenario = {
    name: "A",
    amountMan: 200,
    startYear: now.getFullYear(),
    startMonth: now.getMonth() + 1,
    method: "fixed_principal",
    years: 5,
    monthlyPaymentYen: 5000,
    monthlyPrincipalYen: 5000,
    rateSteps: [{ fromMonth: 1, annualRatePct: 16 }],
    bonusEnabled: false,
    bonusPaymentYen: 0,
    bonusMonths: [6, 12],
  };

  const baseB: Scenario = {
    ...baseA,
    name: "B",
    method: "fixed_payment",
    monthlyPaymentYen: 30000,
    monthlyPrincipalYen: 0,
  };

  const [A, setA] = useState<Scenario>(baseA);
  const [B, setB] = useState<Scenario>(baseB);
  const [view, setView] = useState<ViewMode>("summary");
  const [tableLimit, setTableLimit] = useState(60);

  useEffect(() => {
    const ls = typeof window !== "undefined" ? window.localStorage.getItem(LS_KEY) : null;
    if (ls) {
      try {
        const parsed = JSON.parse(ls) as { A?: Scenario; B?: Scenario };
        if (parsed.A) setA(parsed.A);
        if (parsed.B) setB(parsed.B);
      } catch {}
    }
    const decoded = decodeShare(baseA, baseB);
    setA(decoded.A);
    setB(decoded.B);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(LS_KEY, JSON.stringify({ A, B }));
  }, [A, B]);

  const resA = useMemo(() => simulate(A), [A]);
  const resB = useMemo(() => simulate(B), [B]);

  const amountYenA = A.amountMan * 10_000;
  const amountYenB = B.amountMan * 10_000;

  const csvA = useMemo(() => csvFromResult(resA), [resA]);
  const csvB = useMemo(() => csvFromResult(resB), [resB]);

  const shareUrl = useMemo(() => {
    if (typeof window === "undefined") return "";
    const qs = encodeShare(A, B);
    return `${window.location.origin}${window.location.pathname}?${qs}`;
  }, [A, B]);

  const compare = useMemo(() => {
    if (!resA || !resB || !resA.ok || !resB.ok) return null;
    return {
      dPay: resA.totalPayment - resB.totalPayment,
      dInt: resA.totalInterest - resB.totalInterest,
      dMonths: resA.payoffMonths - resB.payoffMonths,
    };
  }, [resA, resB]);

  const fmtSignedYen = (n: number) => `${n >= 0 ? "+" : "-"}${yen(Math.abs(n))}`;

  const methodItems = [
    { key: "annuity_months", label: "元利均等（回数）" },
    { key: "equal_principal_months", label: "元金均等（回数）" },
    { key: "fixed_payment", label: "定額元利（金額）" },
    { key: "fixed_principal", label: "定額元金（金額）" },
  ] as const;

  const yearsOptions = [1, 2, 3, 5, 7, 10, 15, 20];

  const renderScenarioForm = (s: Scenario, setS: (u: (p: Scenario) => Scenario) => void, advanced: boolean) => {
    return (
      <div className="grid gap-5">
        <div className="grid gap-4 md:grid-cols-3">
          <NumInput
            label="借入金額"
            value={s.amountMan}
            onChange={(v) => setS((p) => ({ ...p, amountMan: clampInt(v, 1, 100000) }))}
            suffix="万"
            placeholder="例：200"
            wide
          />

          <Select
            label="返済開始年"
            value={s.startYear}
            onChange={(v) => setS((p) => ({ ...p, startYear: Number(v) }))}
          >
            {Array.from({ length: 21 }, (_, i) => now.getFullYear() - 5 + i).map((y) => (
              <option key={y} value={y}>
                {y}年
              </option>
            ))}
          </Select>

          <Select
            label="返済開始月"
            value={s.startMonth}
            onChange={(v) => setS((p) => ({ ...p, startMonth: Number(v) }))}
          >
            {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
              <option key={m} value={m}>
                {m}月
              </option>
            ))}
          </Select>
        </div>

        <div>
          <div className="mb-2 text-sm font-black text-gray-900">返済方式</div>
          <Seg
            items={methodItems.map((x) => ({ key: x.key, label: x.label }))}
            value={s.method}
            onChange={(k) => setS((p) => ({ ...p, method: k as RepaymentMethod }))}
          />
        </div>

        {(s.method === "annuity_months" || s.method === "equal_principal_months") && (
          <div className="grid gap-3">
            <div className="text-sm font-black text-gray-900">返済期間</div>
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
              <select
                className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm font-black outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 md:max-w-[320px]"
                value={s.years}
                onChange={(e) => setS((p) => ({ ...p, years: Number(e.target.value) }))}
              >
                {yearsOptions.map((y) => (
                  <option key={y} value={y}>
                    {y}年（{y * 12}回）
                  </option>
                ))}
              </select>
              <div className="text-xs text-gray-500">※ 回数指定方式のときのみ使用</div>
            </div>
          </div>
        )}

        {s.method === "fixed_payment" && (
          <NumInput
            label="毎月返済額（定額元利）"
            value={s.monthlyPaymentYen}
            onChange={(v) => setS((p) => ({ ...p, monthlyPaymentYen: Math.max(0, v) }))}
            suffix="円"
            placeholder="例：30000"
            wide
          />
        )}

        {s.method === "fixed_principal" && (
          <NumInput
            label="毎月元金額（定額元金）"
            value={s.monthlyPrincipalYen}
            onChange={(v) => setS((p) => ({ ...p, monthlyPrincipalYen: Math.max(0, v) }))}
            suffix="円"
            placeholder="例：5000"
            wide
          />
        )}

        <div className="rounded-3xl border border-gray-200 bg-gray-50 p-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div className="text-sm font-black text-gray-900">金利（段階変更）</div>
            {advanced && (
              <button
                type="button"
                onClick={() =>
                  setS((p) => {
                    const last = p.rateSteps.slice().sort((a, b) => a.fromMonth - b.fromMonth).at(-1);
                    const nextFrom = clampInt((last?.fromMonth ?? 1) + 12, 1, 1200);
                    return {
                      ...p,
                      rateSteps: [...p.rateSteps, { fromMonth: nextFrom, annualRatePct: last?.annualRatePct ?? 16 }].sort(
                        (a, b) => a.fromMonth - b.fromMonth,
                      ),
                    };
                  })
                }
                className="rounded-2xl border border-gray-200 bg-white px-3 py-2 text-xs font-black text-gray-700 hover:bg-gray-50"
              >
                ステップ追加（+12ヶ月）
              </button>
            )}
          </div>

          <div className="grid gap-3">
            {s.rateSteps
              .slice()
              .sort((a, b) => a.fromMonth - b.fromMonth)
              .map((st, i) => (
                <div key={i} className="flex flex-wrap items-center gap-2">
                  <div className="text-xs font-black text-gray-600">月{st.fromMonth}〜</div>
                  <input
                    type="number"
                    step="0.1"
                    value={st.annualRatePct}
                    onChange={(e) => {
                      const v = Number(e.target.value);
                      setS((p) => ({
                        ...p,
                        rateSteps: p.rateSteps.map((x, idx) => (idx === i ? { ...x, annualRatePct: v } : x)),
                      }));
                    }}
                    className="w-[150px] rounded-2xl border border-gray-300 bg-white px-4 py-2 text-sm font-black outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10"
                  />
                  <div className="text-sm font-black text-gray-900">%</div>

                  {advanced && s.rateSteps.length > 1 && (
                    <button
                      type="button"
                      onClick={() => setS((p) => ({ ...p, rateSteps: p.rateSteps.filter((_, idx) => idx !== i) }))}
                      className="rounded-2xl border border-gray-200 bg-white px-3 py-2 text-xs font-black text-gray-600 hover:bg-gray-50"
                    >
                      削除
                    </button>
                  )}
                </div>
              ))}
          </div>
        </div>

        <div className="rounded-3xl border border-gray-200 bg-gray-50 p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="text-sm font-black text-gray-900">ボーナス返済</div>
            <label className="inline-flex items-center gap-2 text-sm font-black text-gray-700">
              <input
                type="checkbox"
                checked={s.bonusEnabled}
                onChange={(e) => setS((p) => ({ ...p, bonusEnabled: e.target.checked }))}
              />
              使う
            </label>
          </div>

          {s.bonusEnabled && (
            <div className="mt-4 grid gap-4">
              <NumInput
                label="ボーナス返済金額（1回あたり）"
                value={s.bonusPaymentYen}
                onChange={(v) => setS((p) => ({ ...p, bonusPaymentYen: Math.max(0, v) }))}
                suffix="円"
                placeholder="例：100000"
                wide
              />
              <div className="grid gap-2">
                <div className="text-sm font-black text-gray-900">ボーナス月</div>
                <div className="flex flex-wrap gap-3">
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => {
                    const on = s.bonusMonths.includes(m);
                    return (
                      <button
                        key={m}
                        type="button"
                        onClick={() =>
                          setS((p) => {
                            const has = p.bonusMonths.includes(m);
                            const next = has ? p.bonusMonths.filter((x) => x !== m) : [...p.bonusMonths, m];
                            return { ...p, bonusMonths: next.sort((a, b) => a - b) };
                          })
                        }
                        className={`rounded-2xl px-3 py-2 text-xs font-black border ${
                          on
                            ? "border-gray-900 bg-gray-900 text-white"
                            : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        {m}月
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const SummaryBlock = ({ title, res, amountYen, csv }: { title: string; res: SimResult; amountYen: number; csv: string }) => {
    if (!res) return <div className="text-sm text-gray-500">入力値を確認してください。</div>;
    if (!res.ok) return <div className="text-sm font-black text-red-700">{res.reason}</div>;

    return (
      <div className="grid gap-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="text-sm font-black text-gray-900">{title}</div>
          <button
            type="button"
            onClick={() => downloadCSV(`repayment_${title}.csv`, csv)}
            className="rounded-2xl border border-gray-200 bg-white px-3 py-2 text-xs font-black text-gray-700 hover:bg-gray-50"
          >
            CSV
          </button>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <Stat label="借入元金" value={`${yen(amountYen)} 円`} />
          <Stat label="合計返済" value={`${yen(res.totalPayment)} 円`} />
          <Stat label="利息合計" value={`${yen(res.totalInterest)} 円`} />
          <Stat label="完済まで" value={`${res.payoffMonths} 回`} hint={`最終：${res.lastYm}`} />
          {res.annuityPayment !== null && <Stat label="毎月返済（元利均等）" value={`${yen(res.annuityPayment)} 円`} />}
        </div>
      </div>
    );
  };

  return (
    <div className="grid gap-6">
      <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-soft md:p-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-2xl font-black text-gray-900 md:text-4xl">カードローン返済シミュレーター</h1>
            <p className="mt-2 text-sm text-gray-600">
              2条件の比較、CSV出力、共有リンク、返済表、グラフ表示に対応しています。
            </p>
          </div>
          <button
            type="button"
            onClick={async () => {
              const qs = encodeShare(A, B);
              const url =
                typeof window !== "undefined"
                  ? `${window.location.origin}${window.location.pathname}?${qs}`
                  : "";
              try {
                await navigator.clipboard.writeText(url);
                alert("共有リンクをコピーしました。");
              } catch {
                prompt("コピーできない場合は手動でコピーしてください。", url);
              }
            }}
            className="rounded-2xl bg-gray-900 px-4 py-3 text-sm font-black text-white hover:opacity-90"
          >
            共有リンクをコピー
          </button>
        </div>

        <div className="mt-4">
          <Seg
            items={[
              { key: "summary", label: "サマリー" },
              { key: "chart", label: "グラフ" },
              { key: "table", label: "表" },
              { key: "compare", label: "比較" },
            ]}
            value={view}
            onChange={(k) => setView(k as ViewMode)}
          />
        </div>
      </div>

      {/* 審査中は非表示（NEXT_PUBLIC_SHOW_ADS=0）。将来ONにしたらここに広告が入る */}
      <AdSlot className="my-1" />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card title="入力（A）" sub="メインの条件を入力します。">
          {renderScenarioForm(A, (u) => setA(u), true)}
        </Card>
        <Card title="入力（B）" sub="比較用の条件を入力します。">
          {renderScenarioForm(B, (u) => setB(u), false)}
        </Card>
      </div>

      <AdSlot className="my-1" />

      {view === "summary" && (
        <div className="grid gap-6 lg:grid-cols-2">
          <Card title="結果（A）">
            <SummaryBlock title="A" res={resA} amountYen={amountYenA} csv={csvA} />
          </Card>
          <Card title="結果（B）">
            <SummaryBlock title="B" res={resB} amountYen={amountYenB} csv={csvB} />
          </Card>
        </div>
      )}

      {view === "compare" && (
        <Card title="A/B比較（差分：A - B）" sub="マイナスならAが少ない/早いです。">
          {compare ? (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <Stat
                label="合計返済差"
                value={`${fmtSignedYen(compare.dPay)} 円`}
                hint={compare.dPay < 0 ? "Aが少ない" : "Bが少ない"}
              />
              <Stat
                label="利息差"
                value={`${fmtSignedYen(compare.dInt)} 円`}
                hint={compare.dInt < 0 ? "Aが少ない" : "Bが少ない"}
              />
              <Stat
                label="完済月数差"
                value={`${compare.dMonths >= 0 ? "+" : ""}${compare.dMonths} ヶ月`}
                hint={compare.dMonths < 0 ? "Aが早い" : "Bが早い"}
              />
            </div>
          ) : (
            <div className="text-sm text-gray-500">A/Bいずれかの計算が成立していません（入力条件を確認してください）。</div>
          )}
        </Card>
      )}

      {view === "chart" && (
        <div className="grid gap-6 lg:grid-cols-2">
          <Card title="グラフ（A）" sub="残高 / 支払 / 利息（線）">
            {resA && resA.ok ? (
              <LineChart rows={resA.rows} amountYen={amountYenA} />
            ) : (
              <div className="text-sm text-gray-500">Aの結果がありません。</div>
            )}
          </Card>
          <Card title="グラフ（B）" sub="残高 / 支払 / 利息（線）">
            {resB && resB.ok ? (
              <LineChart rows={resB.rows} amountYen={amountYenB} />
            ) : (
              <div className="text-sm text-gray-500">Bの結果がありません。</div>
            )}
          </Card>
        </div>
      )}

      {view === "table" && (
        <Card title="返済表（A）" sub="スマホは横スクロール。年月は YYYY/MM 表示です。">
          {resA && resA.ok ? (
            <>
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <div className="text-xs text-gray-500">
                  表示：{Math.min(tableLimit, resA.rows.length)} / {resA.rows.length}
                </div>
                <button
                  type="button"
                  onClick={() => setTableLimit((v) => Math.min(resA.rows.length, v + 60))}
                  disabled={tableLimit >= resA.rows.length}
                  className="rounded-2xl border border-gray-200 bg-white px-3 py-2 text-xs font-black text-gray-700 disabled:opacity-50"
                >
                  +60
                </button>
                <button
                  type="button"
                  onClick={() => setTableLimit(resA.rows.length)}
                  disabled={tableLimit >= resA.rows.length}
                  className="rounded-2xl border border-gray-200 bg-white px-3 py-2 text-xs font-black text-gray-700 disabled:opacity-50"
                >
                  全て
                </button>
                <button
                  type="button"
                  onClick={() => setTableLimit(60)}
                  className="rounded-2xl border border-gray-200 bg-white px-3 py-2 text-xs font-black text-gray-700"
                >
                  先頭
                </button>
                <button
                  type="button"
                  onClick={() => downloadCSV("repayment_A.csv", csvA)}
                  className="ml-auto rounded-2xl bg-gray-900 px-3 py-2 text-xs font-black text-white hover:opacity-90"
                >
                  CSV
                </button>
              </div>

              <div className="overflow-x-auto rounded-3xl border border-gray-200 bg-white">
                <table className="min-w-[980px] w-full border-collapse text-sm">
                  <thead className="bg-gray-900 text-white">
                    <tr>
                      {["回", "年月", "年利%", "支払", "利息", "元金", "ボーナス", "残高"].map((h) => (
                        <th key={h} className="whitespace-nowrap border-b border-gray-800 px-4 py-3 text-right font-black">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {resA.rows.slice(0, tableLimit).map((r) => (
                      <tr key={r.monthIndex} className="odd:bg-white even:bg-gray-50">
                        <td className="whitespace-nowrap border-b border-gray-100 px-4 py-3 text-right">{r.monthIndex}</td>
                        <td className="whitespace-nowrap border-b border-gray-100 px-4 py-3 text-right font-black text-gray-700">
                          {ymStr(r.year, r.month)}
                        </td>
                        <td className="whitespace-nowrap border-b border-gray-100 px-4 py-3 text-right">{r.annualRatePct.toFixed(2)}</td>
                        <td className="whitespace-nowrap border-b border-gray-100 px-4 py-3 text-right">{yen(r.payment + r.bonusPayment)}円</td>
                        <td className="whitespace-nowrap border-b border-gray-100 px-4 py-3 text-right">{yen(r.interest)}円</td>
                        <td className="whitespace-nowrap border-b border-gray-100 px-4 py-3 text-right">{yen(r.principal)}円</td>
                        <td className="whitespace-nowrap border-b border-gray-100 px-4 py-3 text-right">{yen(r.bonusPayment)}円</td>
                        <td className="whitespace-nowrap border-b border-gray-100 px-4 py-3 text-right font-black">{yen(r.balance)}円</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <div className="text-sm text-gray-500">Aの結果がありません。</div>
          )}
        </Card>
      )}

      <AdSlot className="my-1" />

      <div className="text-xs text-gray-500">
        ※ 本ツールは参考情報です。最終的な返済条件は契約内容をご確認ください。
      </div>
    </div>
  );
}