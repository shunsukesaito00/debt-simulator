export const metadata = {
  title: "お問い合わせ | 借金返済シミュレーター",
};

export default function ContactPage() {
  return (
    <main style={{ maxWidth: 860, margin: "40px auto", padding: "0 16px", lineHeight: 1.8 }}>
      <h1>お問い合わせ</h1>

      <p>ご意見・ご質問は、以下の方法でご連絡ください。</p>

      <h2>連絡方法</h2>
      <ul>
        <li>メール：<b>your-email@example.com</b>（後で差し替えてOK）</li>
        <li>または Googleフォーム等へのリンクでもOKです</li>
      </ul>

      <p style={{ marginTop: 24, fontSize: 14, opacity: 0.8 }}>
        ※ 個人情報の入力は最小限にしてください。
      </p>
    </main>
  );
}