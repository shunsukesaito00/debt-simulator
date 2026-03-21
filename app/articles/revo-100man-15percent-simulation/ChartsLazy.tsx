"use client";

import { clientOnlyChart } from "@/app/components/article/article-chart-dynamic";

export const PayoffMonthsBarChart = clientOnlyChart(() =>
  import("./Revo100manCharts").then((m) => ({ default: m.PayoffMonthsBarChart })),
);
export const TotalInterestBarChart = clientOnlyChart(() =>
  import("./Revo100manCharts").then((m) => ({ default: m.TotalInterestBarChart })),
);
export const TotalPaymentStackedChart = clientOnlyChart(
  () => import("./Revo100manCharts").then((m) => ({ default: m.TotalPaymentStackedChart })),
  { skeletonClassName: "h-[260px] min-h-[260px] w-full min-h-0 min-w-0 rounded-lg bg-stone-100/90" },
);
