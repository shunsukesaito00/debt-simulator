"use client";

import { useCallback, useMemo, useState } from "react";
import Link from "next/link";
import { calcLoan } from "@/lib/loan-calc";
import { trackEvent } from "@/lib/analytics";
import { toCalcInput, DEFAULT_FORM, type FormState } from "./_lib/simulatorMappers";
import { SimulatorFormSection } from "./_components/SimulatorFormSection";
import { SimulatorSummarySection } from "./_components/SimulatorSummarySection";
import { SimulatorChartsSection } from "./_components/SimulatorChartsSection";
import { SimulatorScheduleTableSection } from "./_components/SimulatorScheduleTableSection";
import { SimulatorAbCompareSection } from "./_components/SimulatorAbCompareSection";
import { SimulatorRelatedArticlesSection } from "./_components/SimulatorRelatedArticlesSection";
import { SimulatorRepaymentImprovementSection } from "./_components/SimulatorRepaymentImprovementSection";

export default function Page() {
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

  const addOneTime = useCallback(() => {
    setForm((prev) => ({
      ...prev,
      oneTimeExtras: [...prev.oneTimeExtras, { year: form.startYear, month: form.startMonth, amount: 100000 }],
    }));
  }, [form.startYear, form.startMonth, setForm]);

  const removeOneTime = useCallback(
    (i: number) => setForm((prev) => ({ ...prev, oneTimeExtras: prev.oneTimeExtras.filter((_, j) => j !== i) })),
    [setForm]
  );

  const errorMessage = result.ok === false ? result.error : null;

  return (
    <div className="grid gap-5">
      <section className="ds-card ds-card-pad">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h1 className="text-2xl font-black text-gray-900 md:text-3xl">カードローン返済シミュレーター</h1>
            <p className="mt-1 text-xs text-gray-500">入力値はサーバーに送信されません。ブラウザ内だけで計算しています。</p>
            <p className="mt-1.5 text-sm text-gray-600">4つの返済方式・A/B比較・入力に連動したおすすめ記事で、条件の違いをすぐ比較できます。</p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setActiveTab("A")}
              className={`ds-btn px-4 py-2 text-base font-bold ${activeTab === "A" ? "ds-btn-primary" : "ds-btn-secondary"}`}
            >
              A
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("B")}
              className={`ds-btn px-4 py-2 text-base font-bold ${activeTab === "B" ? "ds-btn-primary" : "ds-btn-secondary"}`}
            >
              B
            </button>
          </div>
        </div>

        <SimulatorFormSection
          form={form}
          updateForm={updateForm}
          setForm={setForm}
          addRateStep={addRateStep}
          removeRateStep={removeRateStep}
          addBonus={addBonus}
          removeBonus={removeBonus}
          addOneTime={addOneTime}
          removeOneTime={removeOneTime}
          extraTab={extraTab}
          setExtraTab={setExtraTab}
          errorMessage={errorMessage}
        />
      </section>

      {(resultA.ok || resultB.ok) && (
        <section className="ds-card ds-card-pad space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <SimulatorSummarySection
              result={result}
              resultA={resultA}
              resultB={resultB}
              activeTab={activeTab}
            />
            <SimulatorChartsSection result={result} activeTab={activeTab} />
          </div>

          {result.ok && <SimulatorScheduleTableSection result={result} activeTab={activeTab} />}

          {resultA.ok && resultB.ok && (
            <SimulatorAbCompareSection resultA={resultA} resultB={resultB} />
          )}
        </section>
      )}

      <SimulatorRelatedArticlesSection
        principalMan={form.principalMan}
        method={form.method}
        extraEnabled={form.extraEnabled}
        years={form.years}
        monthlyPayment={form.monthlyPayment}
        monthlyPrincipal={form.monthlyPrincipal}
      />

      <SimulatorRepaymentImprovementSection />

      <p className="mt-6 text-sm text-gray-600 leading-relaxed">
        気になる条件が見つかったら、関連記事で考え方を整理し、自分の条件で再度試算してください。条件別の記事とあわせて確認すると、返済負担の違いがよりわかりやすくなります。
      </p>

      <section className="ds-subcard mt-6 p-5">
        <div className="text-sm font-bold text-gray-700">注意点</div>
        <ul className="mt-2 list-disc pl-5 text-xs text-gray-600 leading-relaxed space-y-1">
          <li>本ツールは参考情報です。契約内容（利率、返済日、手数料等）を優先してください。</li>
          <li>計算は一般的な月次の近似です。金融機関の計算と差が出る場合があります。</li>
        </ul>
        <div className="mt-4 flex flex-wrap gap-4 text-sm">
          <Link
            href="/logic"
            className="font-bold text-gray-700 hover:underline"
            onClick={() =>
              trackEvent({
                action: "click_simulator_support_link",
                location: "simulator_footer",
                target: "/logic",
                link_type: "support_link",
              })
            }
          >
            計算ロジック
          </Link>
          <Link
            href="/faq"
            className="font-bold text-gray-700 hover:underline"
            onClick={() =>
              trackEvent({
                action: "click_simulator_support_link",
                location: "simulator_footer",
                target: "/faq",
                link_type: "support_link",
              })
            }
          >
            FAQ
          </Link>
          <Link
            href="/how-to"
            className="font-bold text-gray-700 hover:underline"
            onClick={() =>
              trackEvent({
                action: "click_simulator_support_link",
                location: "simulator_footer",
                target: "/how-to",
                link_type: "support_link",
              })
            }
          >
            使い方
          </Link>
        </div>
      </section>
    </div>
  );
}
