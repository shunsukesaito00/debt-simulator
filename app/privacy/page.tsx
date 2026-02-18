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
          <h2 className="text-base font-black text-gray-900">広告について（第三者配信）</h2>
          <p className="mt-2">
            当サイトでは、第三者配信の広告サービス（Google アドセンス等）を利用しています。
            これらの広告配信事業者は、ユーザーの興味に応じた広告を表示するため、Cookie を使用することがあります。
            Cookie により、広告の配信や表示回数の計測、アクセス解析が行われる可能性があります。
          </p>
          <p className="mt-2">
            ユーザーは、ブラウザの設定で Cookie を無効化したり、管理したりできます。
            また、Google の広告設定（<code className="rounded bg-gray-100 px-1">https://adssettings.google.com/</code>）で、
            パーソナライズ広告を無効にすることもできます。
          </p>
        </section>

        <section>
          <h2 className="text-base font-black text-gray-900">アクセス解析について</h2>
          <p className="mt-2">
            当サイトでは、利用状況把握のためアクセス解析ツール（Google Analytics 等）を使用する場合があります。
            解析ツールは Cookie を用いてトラフィックデータを収集することがあります。
            収集するデータは匿名化され、個人を特定するものではありません。
          </p>
        </section>

        <section>
          <h2 className="text-base font-black text-gray-900">お問い合わせで取得する個人情報</h2>
          <p className="mt-2">
            お問い合わせフォーム（Google フォーム等）を通じて、メールアドレスやお名前などの個人情報を取得いただく場合があります。
            取得した個人情報は、お問い合わせへの返信および対応の目的のみに使用し、第三者に提供しません。
            保管期間は、対応完了後おおむね1年以内を目安とし、必要に応じて適切に削除します。
          </p>
        </section>

        <section>
          <h2 className="text-base font-black text-gray-900">Cookie の管理</h2>
          <p className="mt-2">
            ユーザーは、ご使用のブラウザの設定で Cookie を無効化したり、削除したりすることができます。
            Cookie を無効にした場合、広告のパーソナライズや一部機能が正しく動作しない場合があります。
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