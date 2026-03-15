import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "固定費削減インパクト計算",
  description:
    "毎月の削減額を続けたとき、1年・3年・5年で合計いくらになるかをすぐ確認できるツールです。通信費・サブスク・保険などの見直し効果を数字で把握できます。",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
