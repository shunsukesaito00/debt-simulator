"use client";

import { clientOnlyChart } from "@/app/components/article/article-chart-dynamic";

export const MonthlyAndInterestBarCharts200 = clientOnlyChart(() =>
  import("./InterestCharts200").then((m) => ({ default: m.MonthlyAndInterestBarCharts200 })),
);
export const TotalPaymentStackedChart200 = clientOnlyChart(
  () => import("./InterestCharts200").then((m) => ({ default: m.TotalPaymentStackedChart200 })),
  { skeletonClassName: "h-[260px] min-h-[260px] w-full min-h-0 min-w-0 rounded-lg bg-stone-100/90" },
);
