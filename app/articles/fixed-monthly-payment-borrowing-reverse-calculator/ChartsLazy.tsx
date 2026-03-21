"use client";

import { clientOnlyChart } from "@/app/components/article/article-chart-dynamic";

export const PrincipalByPaymentBarChart = clientOnlyChart(() =>
  import("./ReverseCalcCharts").then((m) => ({ default: m.PrincipalByPaymentBarChart })),
);
export const InterestByPaymentBarChart = clientOnlyChart(() =>
  import("./ReverseCalcCharts").then((m) => ({ default: m.InterestByPaymentBarChart })),
);
