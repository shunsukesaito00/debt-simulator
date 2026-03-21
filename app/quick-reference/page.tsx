import type { Metadata } from "next";
import Link from "next/link";
import { calcLoan } from "@/lib/loan-calc";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://debt-simulator-quzc.vercel.app";

export const metadata: Metadata = {
  title: "返済額の早見表｜借入100万・200万・300万・年利15%・3年/5年",
  description:
    "借入額100万円・200万円・300万円を年利15%で3年返済・5年返済した場合の月々返済額・総利息の早見表です。シミュレーターで自分の条件を試せます。",
  alternates: { canonical: `${BASE}/quick-reference` },
  openGraph: {
    title: "返済額の早見表｜借入100万・200万・300万・年利15%・3年/5年",
    description: "借入額100万・200万・300万円を年利15%で3年/5年返済した場合の月々返済額・総利息の早見表。",
    url: `${BASE}/quick-reference`,
    type: "website",
  },
};

function formatYen(n: number): string {
  const v = Math.round(n);
  return "¥" + v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const PRINCIPALS = [100, 200, 300] as const; // 万円
const YEARS_LIST = [3, 5] as const;
const RATE = 15;

export default function QuickReferencePage() {
  const startYear = new Date().getFullYear();
  const rows = PRINCIPALS.map((man) => {
    const principal = man * 10000;
    const cells: { years: number; monthly: number; totalInterest: number; months: number }[] = [];
    for (const years of YEARS_LIST) {
      const res = calcLoan({
        principal,
        startYear,
        startMonth: 1,
        method: "equal_payment",
        rateSteps: [{ fromMonth: 1, annualRatePercent: RATE }],
        months: years * 12,
      });
      if (res.ok) {
        const monthly = res.schedule[0]?.payment ?? 0;
        cells.push({
          years,
          monthly,
          totalInterest: res.totalInterest,
          months: res.months,
        });
      }
    }
    return { man, cells };
  });

  return (
    <div className="mx-auto max-w-3xl">
      <nav className="mb-4 text-sm text-stone-600" aria-label="パンくず">
        <ol className="flex flex-wrap items-center gap-1">
          <li>
            <Link href="/" className="hover:underline">
              トップ
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li className="font-bold text-stone-900" aria-current="page">
            返済額の早見表
          </li>
        </ol>
      </nav>

      <div className="ds-card ds-card-pad">
        <h1 className="text-2xl font-black text-stone-900 md:text-3xl">
          返済額の早見表（年利15%・元利均等）
        </h1>
        <p className="mt-3 text-sm text-stone-600 leading-relaxed">
          借入額100万・200万・300万円を3年返済・5年返済した場合の月々返済額と総利息の目安です。実際の条件は
          <Link href="/simulator/cardloan" className="font-bold text-stone-800 underline hover:no-underline">
            シミュレーター
          </Link>
          で試してください。
        </p>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[400px] text-sm">
            <thead>
              <tr className="border-b-2 border-stone-200 text-left">
                <th className="py-3 pr-4 font-black text-stone-900">借入額</th>
                <th className="py-3 pr-4 font-black text-stone-900">3年返済</th>
                <th className="py-3 pr-4 font-black text-stone-900">3年 総利息</th>
                <th className="py-3 pr-4 font-black text-stone-900">5年返済</th>
                <th className="py-3 font-black text-stone-900">5年 総利息</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(({ man, cells }) => {
                const c3 = cells.find((c) => c.years === 3);
                const c5 = cells.find((c) => c.years === 5);
                return (
                  <tr key={man} className="border-b border-stone-100">
                    <td className="py-3 pr-4 font-bold text-stone-900">{man}万円</td>
                    <td className="py-3 pr-4 text-stone-700">{c3 ? formatYen(c3.monthly) : "-"}</td>
                    <td className="py-3 pr-4 text-stone-700">{c3 ? formatYen(c3.totalInterest) : "-"}</td>
                    <td className="py-3 pr-4 text-stone-700">{c5 ? formatYen(c5.monthly) : "-"}</td>
                    <td className="py-3 text-stone-700">{c5 ? formatYen(c5.totalInterest) : "-"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <p className="mt-6 text-xs text-stone-500">
          試算は元利均等・端数処理は当サイトシミュレーターと同じ前提です。金利・返済方式を変えた比較は
          <Link href="/simulator/cardloan" className="font-bold text-stone-700 underline hover:no-underline">
            シミュレーター
          </Link>
          でできます。
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/simulator/cardloan" className="ds-btn ds-btn-primary">
            シミュレーターで試す →
          </Link>
          <Link href="/articles" className="ds-btn ds-btn-secondary">
            条件別の記事一覧
          </Link>
        </div>
      </div>
    </div>
  );
}
