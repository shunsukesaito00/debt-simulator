"use client";

import { clientOnlyChart } from "@/app/components/article/article-chart-dynamic";

export const MonthlyAndInterestBarCharts = clientOnlyChart(() =>
  import("./InterestCharts").then((m) => ({ default: m.MonthlyAndInterestBarCharts })),
);
export const TotalPaymentStackedChart = clientOnlyChart(
  () => import("./InterestCharts").then((m) => ({ default: m.TotalPaymentStackedChart })),
  { skeletonClassName: "h-[260px] min-h-[260px] w-full min-h-0 min-w-0 rounded-lg bg-stone-100/90" },
);
