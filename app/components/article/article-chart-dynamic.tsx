"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";

function ChartSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={className ?? "h-[220px] min-h-[220px] w-full min-h-0 min-w-0 rounded-lg bg-stone-100/90"}
      aria-hidden
    />
  );
}

/**
 * 記事内 Recharts をクライアントのみ描画（ビルド時の width(-1) 警告回避）。
 * 呼び出し側は **"use client"** の `ChartsLazy.tsx` からのみ使うこと。
 */
export function clientOnlyChart(
  importFn: () => Promise<{ default: ComponentType<unknown> }>,
  options?: { skeletonClassName?: string },
) {
  return dynamic(importFn, {
    ssr: false,
    loading: () => <ChartSkeleton className={options?.skeletonClassName} />,
  });
}
