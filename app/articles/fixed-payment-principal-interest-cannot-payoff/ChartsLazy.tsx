"use client";

import { clientOnlyChart } from "@/app/components/article/article-chart-dynamic";

export const PayoffMonthsBarChart = clientOnlyChart(
  () => import("./FixedPaymentCharts").then((m) => ({ default: m.PayoffMonthsBarChart })),
  { skeletonClassName: "h-[240px] min-h-[240px] w-full min-h-0 min-w-0 rounded-lg bg-stone-100/90" },
);
export const TotalInterestBarChart = clientOnlyChart(
  () => import("./FixedPaymentCharts").then((m) => ({ default: m.TotalInterestBarChart })),
  { skeletonClassName: "h-[240px] min-h-[240px] w-full min-h-0 min-w-0 rounded-lg bg-stone-100/90" },
);
