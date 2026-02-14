export default function Page() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">FAQ</h1>

      <div className="rounded-xl border p-4">
        <h2 className="font-bold">Q. 繰上返済に対応していますか？</h2>
        <p className="mt-2 text-gray-700">現時点では未対応です。</p>
      </div>

      <div className="rounded-xl border p-4">
        <h2 className="font-bold">Q. 日割り計算や手数料は反映されますか？</h2>
        <p className="mt-2 text-gray-700">
          反映されません。元利均等の月次計算のみです。
        </p>
      </div>

      <div className="rounded-xl border p-4">
        <h2 className="font-bold">Q. 金融機関の返済予定表と少し違います</h2>
        <p className="mt-2 text-gray-700">
          端数処理、初回利息の起点、日割り等により差が出ます。本ツールは目安です。
        </p>
      </div>
    </div>
  );
}