import type { Metadata } from "next";
import Link from "next/link";
import { articlesList } from "@/lib/articles";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://debt-simulator-quzc.vercel.app";

export const metadata: Metadata = {
  title: "知っておきたいこと｜借入返済の知識とシミュレーション記事一覧",
  description:
    "借入返済、利息、返済期間、返済計画に関する解説記事一覧です。借入返済シミュレーターとあわせてご活用ください。",
  alternates: { canonical: `${BASE}/articles` },
};

export default function ArticlesListPage() {
  return (
    <div className="mx-auto max-w-3xl">
      {/* パンくず */}
      <nav className="mb-4 text-sm text-gray-600" aria-label="パンくず">
        <ol className="flex flex-wrap items-center gap-1">
          <li>
            <Link href="/" className="hover:underline">
              トップ
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li className="font-bold text-gray-900" aria-current="page">
            知っておきたいこと
          </li>
        </ol>
      </nav>

      <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-soft md:p-8">
        <h1 className="text-2xl font-black text-gray-900 md:text-3xl">知っておきたいこと</h1>
        <p className="mt-4 text-sm text-gray-700 leading-relaxed">
          借入返済やカードローンの利息は、返済期間や金利によって大きく変わります。このページでは、返済額・利息・返済計画の立て方に関する記事をまとめています。気になるテーマからご覧ください。
        </p>

        <ul className="mt-8 grid gap-5">
          {articlesList.map((article) => (
            <li key={article.slug}>
              <Link
                href={`/articles/${article.slug}`}
                className="block rounded-2xl border border-gray-200 bg-white p-5 shadow-soft transition hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gray-900/10"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-lg font-black text-gray-900">{article.title}</h2>
                  {article.badge && (
                    <span className="rounded-full bg-gray-900 px-2.5 py-0.5 text-xs font-bold text-white">
                      {article.badge}
                    </span>
                  )}
                </div>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">{article.summary}</p>
                <span className="mt-3 inline-block text-sm font-bold text-gray-700">記事を読む →</span>
              </Link>
            </li>
          ))}
        </ul>

        {/* 一覧下部 CTA */}
        <section className="mt-10 rounded-2xl border border-gray-200 bg-gray-50 p-6">
          <h2 className="text-base font-black text-gray-900">自分の条件で試算する</h2>
          <p className="mt-2 text-sm text-gray-700 leading-relaxed">
            借入額・金利・返済期間を入力して、月々の返済額や総利息をシミュレーションできます。
          </p>
          <Link
            href="/simulator/cardloan"
            className="mt-4 inline-flex items-center justify-center rounded-2xl bg-gray-900 px-5 py-3 text-sm font-black text-white hover:opacity-90"
          >
            自分の条件で返済額を試算する →
          </Link>
        </section>
      </div>
    </div>
  );
}
