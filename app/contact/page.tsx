export const metadata = {
  title: "お問い合わせ | Debt Simulator",
  description:
    "返済シミュレーターに関するご意見・不具合報告・広告掲載のご相談は、こちらのフォームからご連絡ください。",
};

const CONTACT_FORM_EMBED_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLScWadaWnfDBfgPON86hPFdVW7r2PBinahpKo2TH4qTpH51Vcg/viewform?usp=header";

export default function ContactPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-black text-gray-900">お問い合わせ</h1>

      <p className="mt-3 text-sm leading-6 text-gray-700">
        本サイトへのご意見、不具合報告、改善要望、広告掲載のご相談は、下記フォームよりご連絡ください。
        <br />
        返信が必要な場合は、フォーム内で返信先メールアドレスをご入力ください（サイト上にメールアドレスは公開しません）。
      </p>

      <div className="mt-6 rounded-3xl border border-gray-200 bg-white shadow-soft">
        <div className="border-b border-gray-200 px-5 py-4">
          <div className="text-sm font-black text-gray-900">お問い合わせフォーム</div>
          <div className="mt-1 text-xs text-gray-500">
            目安：通常 3 営業日以内に返信します（内容により返信しない場合があります）。
          </div>
        </div>

        <div className="p-3">
          <iframe
            title="お問い合わせフォーム"
            src={CONTACT_FORM_EMBED_URL}
            width="100%"
            height={980}
            frameBorder="0"
            marginHeight={0}
            marginWidth={0}
            className="w-full rounded-2xl"
          >
            読み込んでいます…
          </iframe>
        </div>
      </div>

      <div className="mt-6 text-xs leading-5 text-gray-500">
        ※ 個人情報の取り扱いについては{" "}
        <a className="underline" href="/privacy">
          プライバシーポリシー
        </a>{" "}
        をご確認ください。
      </div>
    </main>
  );
}