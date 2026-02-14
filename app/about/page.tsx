export default function Page() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">運営者情報</h1>

      <div className="rounded-xl border p-4">
        <h2 className="font-bold">サイトの目的</h2>
        <p className="mt-2 text-gray-700">
          借入条件を変えたときの返済負担を比較できるようにする計算ツールです。
        </p>
      </div>

      <div className="rounded-xl border p-4">
        <h2 className="font-bold">運営者</h2>
        <p className="mt-2 text-gray-700">個人運営（日本）</p>
      </div>

      <div className="rounded-xl border p-4">
        <h2 className="font-bold">連絡先</h2>
        <p className="mt-2 text-gray-700">お問い合わせページをご利用ください。</p>
      </div>
    </div>
  );
}