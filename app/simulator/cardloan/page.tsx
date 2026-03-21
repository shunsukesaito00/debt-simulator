"use client";

import { SimulatorFormSection } from "./_components/SimulatorFormSection";
import { SimulatorSummarySection } from "./_components/SimulatorSummarySection";
import { SimulatorChartsSection } from "./_components/SimulatorChartsSection";
import { SimulatorScheduleTableSection } from "./_components/SimulatorScheduleTableSection";
import { SimulatorAbCompareSection } from "./_components/SimulatorAbCompareSection";
import { SimulatorRelatedArticlesSection } from "./_components/SimulatorRelatedArticlesSection";
import { SimulatorRepaymentImprovementSection } from "./_components/SimulatorRepaymentImprovementSection";
import { SimulatorDisclaimerSection } from "./_components/SimulatorDisclaimerSection";
import { useSimulatorCardloanState } from "./_lib/useSimulatorCardloanState";

export default function Page() {
  const {
    takeHomeMonthly,
    setTakeHomeMonthly,
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
  } = useSimulatorCardloanState();

  return (
    <div className="grid gap-5">
      <section className="ds-surface-soft ds-card-pad">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-stone-900 md:text-3xl">カードローン返済シミュレーター</h1>
            <p className="ds-meta mt-1 text-stone-500">入力値はサーバーに送信されません。ブラウザ内だけで計算しています。</p>
            <p className="mt-1.5 text-sm text-stone-600">4つの返済方式・A/B比較・入力に連動したおすすめ記事で、条件の違いをすぐ比較できます。</p>
            <p className="mt-3 text-sm text-stone-600 leading-relaxed">
              返済の見え方って、どの前提で数字を見ているかで変わってしまうんですよね。
              この画面は、条件を切り替えて自分の状況に近い形で確かめられるように作っています。
            </p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setActiveTab("A")}
              className={`ds-btn px-4 py-2 text-base font-semibold ${activeTab === "A" ? "ds-btn-primary" : "ds-btn-secondary"}`}
            >
              A
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("B")}
              className={`ds-btn px-4 py-2 text-base font-semibold ${activeTab === "B" ? "ds-btn-primary" : "ds-btn-secondary"}`}
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
          takeHomeMonthly={takeHomeMonthly}
          setTakeHomeMonthly={setTakeHomeMonthly}
        />
      </section>

      {(resultA.ok || resultB.ok) && (
        <section className="ds-surface-soft ds-card-pad space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <SimulatorSummarySection
              result={result}
              resultA={resultA}
              resultB={resultB}
              activeTab={activeTab}
              takeHomeMonthly={takeHomeMonthly}
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

      <p className="mt-6 text-sm text-stone-600 leading-relaxed">
        気になる条件が見つかったら、関連記事で考え方を整理し、自分の条件で再度試算してください。条件別の記事とあわせて確認すると、返済負担の違いがよりわかりやすくなります。
      </p>

      <SimulatorDisclaimerSection />
    </div>
  );
}
