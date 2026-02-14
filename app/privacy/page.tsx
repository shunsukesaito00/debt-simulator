export const metadata = {
  title: "プライバシーポリシー | Debt Simulator",
  description: "個人情報の取り扱い、Cookie、広告配信などについての方針を説明します。",
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-black text-gray-900">プライバシーポリシー</h1>

      <section className="mt-6 rounded-3xl border border-gray-200 bg-white p-6 shadow-soft">
        <h2 className="text-lg font-black text-gray-900">取得する情報</h2>
        <p className="mt-3 text-sm leading-7 text-gray-700">
          お問い合わせフォームから送信された内容（お名前（任意）、返信先メールアドレス、問い合わせ内容等）を取得する場合があります。
          これらはサイト上に公開されません。
        </p>
      </section>

      <section className="mt-6 rounded-3xl border border-gray-200 bg-white p-6 shadow-soft">
        <h2 className="text-lg font-black text-gray-900">利用目的</h2>
        <ul className="mt-3 list-disc pl-5 text-sm leading-7 text-gray-700">
          <li>お問い合わせへの対応</li>
          <li>不具合調査および改善のための連絡</li>
          <li>サービス品質向上のための分析（個人を特定しない範囲）</li>
        </ul>
      </section>

      <section className="mt-6 rounded-3xl border border-gray-200 bg-white p-6 shadow-soft">
        <h2 className="text-lg font-black text-gray-900">第三者提供</h2>
        <p className="mt-3 text-sm leading-7 text-gray-700">
          法令に基づく場合を除き、本人の同意なく個人情報を第三者に提供しません。
        </p>
      </section>

      <section className="mt-6 rounded-3xl border border-gray-200 bg-white p-6 shadow-soft">
        <h2 className="text-lg font-black text-gray-900">Cookie / アクセス解析</h2>
        <p className="mt-3 text-sm leading-7 text-gray-700">
          本サイトでは利便性向上やアクセス解析のために Cookie を利用する場合があります。
          ブラウザ設定により Cookie を無効化できますが、一部機能に影響が出る場合があります。
        </p>
      </section>

      <section className="mt-6 rounded-3xl border border-gray-200 bg-white p-6 shadow-soft">
        <h2 className="text-lg font-black text-gray-900">広告配信</h2>
        <p className="mt-3 text-sm leading-7 text-gray-700">
          本サイトでは、第三者配信の広告サービス（Google AdSense 等）を利用する場合があります。
          これらの広告配信事業者は、ユーザーの興味に応じた広告を表示するため Cookie を使用することがあります。
        </p>
      </section>

      <section className="mt-6 rounded-3xl border border-gray-200 bg-white p-6 shadow-soft">
        <h2 className="text-lg font-black text-gray-900">お問い合わせ</h2>
        <p className="mt-3 text-sm leading-7 text-gray-700">
          本ポリシーに関するお問い合わせは{" "}
          <a className="underline" href="/contact">
            お問い合わせフォーム
          </a>{" "}
          よりご連絡ください。
        </p>
      </section>

      <div className="mt-8 text-xs text-gray-500">制定日：2026-02-14</div>
    </main>
  );
}