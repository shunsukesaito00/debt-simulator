export const metadata = {
  title: "運営者情報 | Debt Simulator",
  description: "Debt Simulator の運営者情報・目的・連絡方法について掲載します。",
};

export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-black text-gray-900">運営者情報</h1>

      <section className="mt-6 rounded-3xl border border-gray-200 bg-white p-6 shadow-soft">
        <h2 className="text-lg font-black text-gray-900">サイトについて</h2>
        <p className="mt-3 text-sm leading-7 text-gray-700">
          Debt Simulator は、借入額・金利・期間などを入力して、毎月返済額や総返済額の目安を確認できる
          返済シミュレーターです。比較や検討の補助を目的としており、最終的な返済条件は各社の契約内容をご確認ください。
        </p>
      </section>

      <section className="mt-6 rounded-3xl border border-gray-200 bg-white p-6 shadow-soft">
        <h2 className="text-lg font-black text-gray-900">運営者</h2>
        <div className="mt-3 text-sm leading-7 text-gray-700">
          <p>運営形態：個人</p>
          <p>
            連絡方法：{" "}
            <a className="underline" href="/contact">
              お問い合わせフォーム
            </a>
          </p>
          <p>対応時間：原則 3 営業日以内（内容により返信しない場合があります）</p>
        </div>
      </section>

      <section className="mt-6 rounded-3xl border border-gray-200 bg-white p-6 shadow-soft">
        <h2 className="text-lg font-black text-gray-900">収益化について</h2>
        <p className="mt-3 text-sm leading-7 text-gray-700">
          本サイトでは、運営コストの補填のため広告（Google AdSense 等）を利用する場合があります。
        </p>
      </section>
    </main>
  );
}