export const metadata = { title: "プライバシーポリシー" };

export default function Page() {
  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-soft md:p-8">
      <h1 className="text-2xl font-black">プライバシーポリシー</h1>

      <div className="mt-5 grid gap-5 text-sm text-gray-700 leading-relaxed">
        <section>
          <h2 className="text-base font-black text-gray-900">取得する情報</h2>
          <p className="mt-2">
            当サイトは、入力された借入条件等をサーバーへ送信しません。端末内で計算します。
            ただし、利便性のために端末内（ブラウザのローカルストレージ）へ設定が保存される場合があります。
          </p>
        </section>

        <section>
          <h2 className="text-base font-black text-gray-900">広告について</h2>
          <p className="mt-2">
            当サイトは、第三者配信の広告サービスを利用する場合があります。広告配信事業者は、ユーザーの興味に応じた広告を表示するため、
            Cookie 等を使用することがあります。利用する場合は、当該広告配信事業者のポリシーに従います。
          </p>
        </section>

        <section>
          <h2 className="text-base font-black text-gray-900">アクセス解析について</h2>
          <p className="mt-2">
            当サイトは、利用状況把握のためアクセス解析ツールを導入する場合があります。
            導入する場合、解析ツールが Cookie 等を用いてトラフィックデータを収集することがあります。
          </p>
        </section>

        <section>
          <h2 className="text-base font-black text-gray-900">免責</h2>
          <p className="mt-2">
            当サイトの内容は予告なく変更されることがあります。
          </p>
        </section>
      </div>
    </div>
  );
}