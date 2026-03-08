// app/page.tsx
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "トップ",
  description:
    "カードローン等の借入返済を、金利・返済方式・ボーナス返済を加味して試算できます。サマリー/グラフ/返済表/比較/CSVに対応。",
};

function Card({
  title,
  desc,
  href,
  cta = "開く",
}: {
  title: string;
  desc: string;
  href: string;
  cta?: string;
}) {
  return (
    <Link
      href={href}
      className="block rounded-3xl border border-gray-200 bg-white p-5 shadow-soft transition hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gray-900/10"
    >
      <div className="text-lg font-black text-gray-900">{title}</div>
      <div className="mt-2 text-sm text-gray-600 leading-relaxed">{desc}</div>
      <div className="mt-4 inline-flex items-center gap-2 rounded-2xl bg-gray-900 px-4 py-2 text-sm font-black text-white">
        {cta} <span aria-hidden>→</span>
      </div>
    </Link>
  );
}

export default function Page() {
  return (
    <div className="grid gap-10">
      {/* Hero */}
      <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-soft md:p-10">
        <div className="max-w-3xl">
          <h1 className="text-3xl font-black tracking-tight text-gray-900 md:text-5xl">
            借入返済シミュレーター
          </h1>
          <p className="mt-4 text-base text-gray-700 leading-relaxed md:text-lg">
            カードローン等の返済を、金利・返済方式・ボーナス返済を加味して試算できます。
            サマリー／グラフ／返済表／比較／CSVに対応しています。
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/simulator/cardloan"
              className="inline-flex items-center justify-center rounded-2xl bg-gray-900 px-5 py-3 text-sm font-black text-white hover:opacity-90"
            >
              カードローン返済を試算する →
            </Link>
            <Link
              href="/how-to"
              className="inline-flex items-center justify-center rounded-2xl border border-gray-200 bg-white px-5 py-3 text-sm font-black text-gray-800 hover:bg-gray-50"
            >
              使い方を見る
            </Link>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
              <div className="text-xs font-black text-gray-600">比較</div>
              <div className="mt-1 text-sm font-black text-gray-900">A/Bで条件差を確認</div>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
              <div className="text-xs font-black text-gray-600">可視化</div>
              <div className="mt-1 text-sm font-black text-gray-900">グラフと返済表</div>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
              <div className="text-xs font-black text-gray-600">出力</div>
              <div className="mt-1 text-sm font-black text-gray-900">CSVダウンロード</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main cards */}
      <section className="grid gap-5 md:grid-cols-2">
        <Card
          title="カードローン返済シミュレーター"
          desc="金利・返済方式・ボーナス返済を入力して、完済までの推移（残高/利息/支払）を確認できます。A/B比較、CSV出力に対応。"
          href="/simulator/cardloan"
          cta="シミュレーターへ"
        />
        <Card
          title="FAQ（よくある質問）"
          desc="金利、元利均等/元金均等、ボーナス返済、繰上返済の考え方など、よくある疑問をまとめています。"
          href="/faq"
          cta="FAQへ"
        />
      </section>

      {/* 知っておきたいこと（記事一覧） */}
      <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-soft md:p-8">
        <h2 className="text-xl font-black text-gray-900">知っておきたいこと</h2>
        <p className="mt-2 text-sm text-gray-700 leading-relaxed">
          借入返済、利息、返済方式、リボ払い、繰り上げ返済など、返済計画に役立つ記事をカテゴリ別にまとめています。シミュレーターとあわせてご活用ください。
        </p>
        <ul className="mt-4 space-y-3">
          <li>
            <Link href="/articles#loan-amount" className="block rounded-2xl border border-gray-200 bg-white p-4 transition hover:bg-gray-50">
              <span className="text-sm font-bold text-gray-900">借入額別で調べる</span>
              <p className="mt-1 text-xs text-gray-600">借入100万・200万・300万で返済負担がどう変わるかを見る</p>
            </Link>
          </li>
          <li>
            <Link href="/articles#repayment-method" className="block rounded-2xl border border-gray-200 bg-white p-4 transition hover:bg-gray-50">
              <span className="text-sm font-bold text-gray-900">返済方式を比較する</span>
              <p className="mt-1 text-xs text-gray-600">元利均等・元金均等・定額元利・定額元金の違いを整理する</p>
            </Link>
          </li>
          <li>
            <Link href="/articles#revolving" className="block rounded-2xl border border-gray-200 bg-white p-4 transition hover:bg-gray-50">
              <span className="text-sm font-bold text-gray-900">リボ払いを理解する</span>
              <p className="mt-1 text-xs text-gray-600">リボ払いの利息や完済期間の重さを確認する</p>
            </Link>
          </li>
          <li>
            <Link href="/articles#repayment-improvement" className="block rounded-2xl border border-gray-200 bg-white p-4 transition hover:bg-gray-50">
              <span className="text-sm font-bold text-gray-900">返済改善を知る</span>
              <p className="mt-1 text-xs text-gray-600">繰り上げ返済や追加返済の効果を見る</p>
            </Link>
          </li>
          <li>
            <Link href="/articles#repayment-planning" className="block rounded-2xl border border-gray-200 bg-white p-4 transition hover:bg-gray-50">
              <span className="text-sm font-bold text-gray-900">逆算・返済計画</span>
              <p className="mt-1 text-xs text-gray-600">毎月返せる額から借入額・返済期間を考える</p>
            </Link>
          </li>
        </ul>
        <Link
          href="/articles"
          className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-gray-900 px-5 py-3 text-sm font-black text-white hover:opacity-90"
        >
          記事一覧を見る <span aria-hidden>→</span>
        </Link>
      </section>

      {/* Trust / notes */}
      <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-soft">
        <h2 className="text-lg font-black text-gray-900">注意事項</h2>
        <ul className="mt-3 grid gap-2 text-sm text-gray-700 leading-relaxed">
          <li>・本ツールは参考情報です。実際の返済条件は契約内容（適用金利、端数処理、約定日等）を優先してください。</li>
          <li>・表示結果は入力値に基づく試算であり、将来の金利変動や手数料等は反映されません（入力で調整してください）。</li>
          <li>・ご不明点は「お問い合わせ」ページからご連絡ください。</li>
        </ul>

        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/about"
            className="rounded-2xl border border-gray-200 bg-white px-4 py-2 text-sm font-black text-gray-800 hover:bg-gray-50"
          >
            このサイトについて
          </Link>
          <Link
            href="/how-to"
            className="rounded-2xl border border-gray-200 bg-white px-4 py-2 text-sm font-black text-gray-800 hover:bg-gray-50"
          >
            使い方
          </Link>
          <Link
            href="/logic"
            className="rounded-2xl border border-gray-200 bg-white px-4 py-2 text-sm font-black text-gray-800 hover:bg-gray-50"
          >
            計算ロジック
          </Link>
          <Link
            href="/privacy"
            className="rounded-2xl border border-gray-200 bg-white px-4 py-2 text-sm font-black text-gray-800 hover:bg-gray-50"
          >
            プライバシーポリシー
          </Link>
          <Link
            href="/contact"
            className="rounded-2xl border border-gray-200 bg-white px-4 py-2 text-sm font-black text-gray-800 hover:bg-gray-50"
          >
            お問い合わせ
          </Link>
        </div>
      </section>
    </div>
  );
}