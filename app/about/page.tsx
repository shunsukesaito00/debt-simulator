// app/about/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "運営者情報",
  description: "本サイト（カードローン返済シミュレーター）の運営方針、目的、問い合わせ導線などを掲載します。",
};

export default function Page() {
  return (
    <div className="grid gap-6">
      <header className="rounded-3xl border border-gray-200 bg-white p-6">
        <h1 className="text-2xl font-black">運営者情報</h1>
        <p className="mt-2 text-sm text-gray-600">
          本ページは、サイトの目的・責任範囲・更新方針を明確にするために掲載しています。
        </p>
      </header>

      <section className="rounded-3xl border border-gray-200 bg-white p-6">
        <h2 className="text-lg font-black">サイト概要</h2>
        <div className="mt-3 space-y-3 text-sm leading-relaxed text-gray-700">
          <p>
            本サイトは、カードローン等の借入について「返済額・利息・完済時期」を概算できるシミュレーターを提供します。
            返済計画の検討を補助することが目的であり、特定の金融商品を推奨するものではありません。
          </p>
          <p>
            入力した条件に基づき、月次の利息・元金・残高を計算し、返済表・サマリー・CSV出力を表示します。
            金利の段階変更（例：途中で金利が変わる）や、ボーナス返済（任意）にも対応しています。
          </p>
        </div>
      </section>

      <section className="rounded-3xl border border-gray-200 bg-white p-6">
        <h2 className="text-lg font-black">免責と注意</h2>
        <div className="mt-3 space-y-3 text-sm leading-relaxed text-gray-700">
          <p>
            本サイトの計算結果は参考情報です。実際の返済条件は、契約書面・約款・各社の公式情報に基づきます。
            年利、手数料、遅延損害金、約定返済日、端数処理、返済方式の定義は金融機関ごとに異なる場合があります。
          </p>
          <p>
            重要な判断（借入、借換、繰上返済など）を行う前に、必ず契約内容の確認および必要に応じて専門家へ相談してください。
          </p>
        </div>
      </section>

      <section className="rounded-3xl border border-gray-200 bg-white p-6">
        <h2 className="text-lg font-black">更新方針</h2>
        <div className="mt-3 space-y-2 text-sm leading-relaxed text-gray-700">
          <p>・計算の不整合やUIの不具合は優先して修正します。</p>
          <p>・仕様変更（計算方法、入力項目の追加等）がある場合は、関連ページ（使い方/ロジック/FAQ）も同時に更新します。</p>
        </div>
      </section>

      <section className="rounded-3xl border border-gray-200 bg-white p-6">
        <h2 className="text-lg font-black">お問い合わせ</h2>
        <div className="mt-3 text-sm leading-relaxed text-gray-700">
          <p>
            ご連絡は <a className="font-bold underline" href="/contact">お問い合わせ</a> よりお願いいたします。
            （不具合報告の場合は「入力条件」「期待する結果」「実際の表示」を添えてください。）
          </p>
        </div>
      </section>
    </div>
  );
}