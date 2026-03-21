"use client";

import { clientOnlyChart } from "@/app/components/article/article-chart-dynamic";

export const RevoMonthsAndInterestBarCharts = clientOnlyChart(() =>
  import("./RevoCharts").then((m) => ({ default: m.RevoMonthsAndInterestBarCharts })),
);
export const RevoTotalPaymentStackedChart = clientOnlyChart(
  () => import("./RevoCharts").then((m) => ({ default: m.RevoTotalPaymentStackedChart })),
  { skeletonClassName: "h-[260px] min-h-[260px] w-full min-h-0 min-w-0 rounded-lg bg-stone-100/90" },
);
