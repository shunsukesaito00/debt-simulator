// app/faq/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ",
  description: "カードローン返済シミュレーターのよくある質問と回答です。",
};

const faqs: { q: string; a: string }[] = [
  {
    q: "結果は実際の返済額と一致しますか？",
    a: "一致を保証しません。実際の返済は契約上の計算方法（端数処理、約定返済日、手数料、遅延損害金等）に依存します。本ツールは目安としてご利用ください。",
  },
  {
    q: "毎月返済額が利息以下だとどうなりますか？",
    a: "元金が減らず完済できないため、ツールはエラー表示します。返済額を増やす、金利を下げる（借換等）、元金を減らすなどの見直しが必要です。",
  },
  {
    q: "ボーナス返済はどう計算していますか？",
    a: "指定月に追加返済として扱い、主に元金の追加返済に充当される想定で計算しています。契約上の取扱いは金融機関により異なります。",
  },
  {
    q: "繰上返済（随時返済）に対応していますか？",
    a: "現時点では、定期のボーナス返済以外の任意の繰上返済（任意タイミング/任意金額）は未対応です。",
  },
  {
    q: "金利が途中で変わる場合に対応できますか？",
    a: "できます。金利ステップ（段階変更）で「月N〜年利X%」を追加して設定してください。",
  },
  {
    q: "A/B比較は何が便利ですか？",
    a: "金利だけを変える、毎月返済額だけを変える、ボーナス返済の有無を比べる等が簡単にできます。差分（A−B）で「どれだけ総返済や利息が変わるか」を確認できます。",
  },
  {
    q: "CSVは何が出力されますか？",
    a: "回数、年月、年利、支払、利息、元金、ボーナス、残高を月次で出力します。Excel/スプレッドシートでの再計算や分析に使えます。",
  },
  {
    q: "スマホで表が見づらいです",
    a: "返済表は横に広いので、スマホでは横スクロールが前提です。必要に応じてCSVに出力して閲覧するのが確実です。",
  },
  {
    q: "保存や共有リンクは安全ですか？",
    a: "入力内容の一部はブラウザのローカル保存（LocalStorage）やURLパラメータに反映されます。共有リンクを第三者に送ると条件が共有されるため、個人情報を入力しないでください。",
  },
  {
    q: "このサイトは特定の金融機関を勧めますか？",
    a: "勧めません。本サイトは返済計画の検討を補助するツールであり、特定の金融商品や事業者の推奨・斡旋を目的としません。",
  },
];

export default function Page() {
  return (
    <div className="grid gap-6">
      <header className="rounded-3xl border border-gray-200 bg-white p-6">
        <h1 className="text-2xl font-black">FAQ</h1>
        <p className="mt-2 text-sm text-gray-600">
          よくある質問をまとめました。該当しない場合は「お問い合わせ」からご連絡ください。
        </p>
      </header>

      <section className="grid gap-4">
        {faqs.map((f, i) => (
          <div key={i} className="rounded-3xl border border-gray-200 bg-white p-6">
            <div className="text-sm font-black text-gray-900">Q. {f.q}</div>
            <div className="mt-3 text-sm leading-relaxed text-gray-700">A. {f.a}</div>
          </div>
        ))}
      </section>
    </div>
  );
}