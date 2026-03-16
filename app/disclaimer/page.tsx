import type { Metadata } from "next";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://debt-simulator-quzc.vercel.app";

export const metadata: Metadata = {
  title: "免責事項",
  description:
    "借入返済シミュレーターの免責事項。シミュレーション結果は参考情報であり、実際の返済条件は契約内容をご確認ください。",
  alternates: { canonical: `${BASE}/disclaimer` },
  openGraph: { title: "免責事項", description: "借入返済シミュレーターの免責事項。", url: `${BASE}/disclaimer`, type: "website" },
};

export default function Page() {
  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-soft md:p-8">
      <h1 className="text-2xl font-black">免責事項</h1>

      <div className="mt-5 grid gap-4 text-sm text-gray-700 leading-relaxed">
        <p>
          当サイトのシミュレーション結果は参考情報です。正確性・完全性を保証するものではありません。
          実際の返済条件は契約内容（金融機関の約定）をご確認ください。
        </p>
        <p>
          当サイトの利用により生じた損害等について、当サイトは一切の責任を負いません。
        </p>
        <p>
          投資・借入・借換等の判断は、ご自身の責任で行ってください。必要に応じて金融機関または専門家へご相談ください。
        </p>
      </div>
    </div>
  );
}