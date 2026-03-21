"use client";

import { clientOnlyChart } from "@/app/components/article/article-chart-dynamic";

export const TotalInterestBarChart = clientOnlyChart(() =>
  import("./RepaymentMethodCharts").then((m) => ({ default: m.TotalInterestBarChart })),
);
export const RepaymentBurdenComparisonChart = clientOnlyChart(() =>
  import("./RepaymentMethodCharts").then((m) => ({ default: m.RepaymentBurdenComparisonChart })),
);
