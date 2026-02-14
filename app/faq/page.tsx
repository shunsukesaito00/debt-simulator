import Link from "next/link";

export const metadata = { title: "FAQ" };

export default function Page() {
  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-soft md:p-8">
      <h1 className="text-2xl font-black">FAQ</h1>

      <div className="mt-5 grid gap-4 text-sm text-gray-700 leading-relaxed">
        <div className="rounded-2xl border border-gray-200 p-4">
          <div className="font-black text-gray-900">Q. これって公式の計算ですか？</div>
          <div className="mt-2">
            A. いいえ。一般的な月次モデルでの試算です。契約内容（金融機関の約定）が正です。
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 p-4">
          <div className="font-black text-gray-900">Q. 金利が途中で変わる場合は？</div>
          <div className="mt-2">
            A. 段階変更として入力できます。元利均等は厳密には返済額の再計算が必要になるため、
            本ツールは目安の近似になります（詳しくは <Link href="/logic" className="font-black underline">計算ロジック</Link>）。
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 p-4">
          <div className="font-black text-gray-900">Q. 入力したデータは保存されますか？</div>
          <div className="mt-2">
            A. 端末内（ブラウザのローカルストレージ）に保存される場合があります。サーバーへ送信はしません。
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 p-4">
          <div className="font-black text-gray-900">Q. お問い合わせ先は？</div>
          <div className="mt-2">
            A. <Link href="/contact" className="font-black underline">お問い合わせ</Link>をご確認ください。
          </div>
        </div>
      </div>
    </div>
  );
}