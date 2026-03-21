"use client";

import { clientOnlyChart } from "@/app/components/article/article-chart-dynamic";

export const InterestComparisonBarChart = clientOnlyChart(
  () => import("./EarlyRepayment100kCharts").then((m) => ({ default: m.InterestComparisonBarChart })),
  { skeletonClassName: "h-[260px] min-h-[260px] w-full min-h-0 min-w-0 rounded-lg bg-stone-100/90" },
);
export const MonthsComparisonBarChart = clientOnlyChart(
  () => import("./EarlyRepayment100kCharts").then((m) => ({ default: m.MonthsComparisonBarChart })),
  { skeletonClassName: "h-[260px] min-h-[260px] w-full min-h-0 min-w-0 rounded-lg bg-stone-100/90" },
);
