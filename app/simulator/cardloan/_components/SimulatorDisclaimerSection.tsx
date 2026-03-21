"use client";

import Link from "next/link";
import { trackEvent } from "@/lib/analytics";

export function SimulatorDisclaimerSection() {
  return (
    <section className="mt-6 rounded-xl border border-stone-200/55 bg-white/60 p-5 shadow-sm">
      <div className="text-sm font-semibold text-stone-700">注意点</div>
      <ul className="mt-2 list-disc pl-5 text-xs text-stone-600 leading-relaxed space-y-1">
        <li>本ツールは参考情報です。契約内容（利率、返済日、手数料等）を優先してください。</li>
        <li>計算は一般的な月次の近似です。金融機関の計算と差が出る場合があります。</li>
        <li>
          手取り月収を入力したときの「返済負担率」は、初月の返済額÷手取りの簡易比率です。審査基準や適正な返済能力の判断を示すものではありません。
        </li>
        <li>
          「無利息期間」は先頭Nヶ月の利息を0として試算する簡易モデルです。元利均等の毎月返済額の再計算や、実際のキャンペーン条件（対象・手数料等）は反映していません。
        </li>
      </ul>
      <div className="mt-4 flex flex-wrap gap-4 text-sm">
        <Link
          href="/logic"
          className="font-semibold text-emerald-900 hover:underline"
          onClick={() =>
            trackEvent({
              action: "click_simulator_support_link",
              location: "simulator_footer",
              target: "/logic",
              link_type: "support_link",
            })
          }
        >
          計算ロジック
        </Link>
        <Link
          href="/faq"
          className="font-semibold text-emerald-900 hover:underline"
          onClick={() =>
            trackEvent({
              action: "click_simulator_support_link",
              location: "simulator_footer",
              target: "/faq",
              link_type: "support_link",
            })
          }
        >
          FAQ
        </Link>
        <Link
          href="/how-to"
          className="font-semibold text-emerald-900 hover:underline"
          onClick={() =>
            trackEvent({
              action: "click_simulator_support_link",
              location: "simulator_footer",
              target: "/how-to",
              link_type: "support_link",
            })
          }
        >
          使い方
        </Link>
      </div>
    </section>
  );
}
