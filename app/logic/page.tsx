export default function Page() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">計算ロジック（元利均等）</h1>
      <p className="text-gray-700">
        年利を月利に換算し、元利均等返済の一般式で毎月返済額を計算します。
      </p>

      <div className="rounded-xl border p-4">
        <h2 className="font-bold">定義</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-gray-700">
          <li>P：元本（借入額）</li>
          <li>r：月利（(年利/100)/12）</li>
          <li>n：返済回数（ヶ月）</li>
          <li>A：毎月返済額</li>
        </ul>
      </div>

      <div className="rounded-xl border p-4">
        <h2 className="font-bold">式</h2>
        <div className="mt-2 rounded-lg bg-gray-50 p-3 font-mono text-sm">
          A = P * r * (1 + r)^n / ((1 + r)^n - 1)
        </div>
      </div>

      <div className="rounded-xl border p-4">
        <h2 className="font-bold">総返済額・利息</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-gray-700">
          <li>総返済額：A * n</li>
          <li>利息合計：(A * n) - P</li>
        </ul>
      </div>
    </div>
  );
}