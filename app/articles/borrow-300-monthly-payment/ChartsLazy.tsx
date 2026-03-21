"use client";

import { clientOnlyChart } from "@/app/components/article/article-chart-dynamic";

export const MonthlyPaymentBarChart300 = clientOnlyChart(() =>
  import("./InterestCharts300").then((m) => ({ default: m.MonthlyPaymentBarChart300 })),
);
export const TotalInterestBarChart300 = clientOnlyChart(() =>
  import("./InterestCharts300").then((m) => ({ default: m.TotalInterestBarChart300 })),
);
export const PayoffMonthsBarChart300 = clientOnlyChart(() =>
  import("./InterestCharts300").then((m) => ({ default: m.PayoffMonthsBarChart300 })),
);
