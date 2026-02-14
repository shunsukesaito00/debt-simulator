export default function Page() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">使い方</h1>
      <p className="text-gray-700">
        借入額・年利・返済期間を入力すると、元利均等方式で毎月返済額と総返済額の目安を表示します。
      </p>

      <div className="rounded-xl border p-4">
        <h2 className="font-bold">入力項目</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-gray-700">
          <li>借入額：元本</li>
          <li>年利（%）：例 15.0</li>
          <li>返済期間（ヶ月）：例 36</li>
        </ul>
      </div>

      <div className="rounded-xl border p-4">
        <h2 className="font-bold">注意点</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-gray-700">
          <li>端数処理、日割り、手数料等は反映していません。</li>
          <li>結果は目安です。最終条件は金融機関の提示をご確認ください。</li>
        </ul>
      </div>
    </div>
  );
}