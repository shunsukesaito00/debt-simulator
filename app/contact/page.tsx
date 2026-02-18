import Link from "next/link";

export const metadata = { title: "お問い合わせ" };

const GOOGLE_FORM_EMBED_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLScWadaWnfDBfgPON86hPFdVW7r2PBinahpKo2TH4qTpH51Vcg/viewform?embedded=true";

export default function Page() {
  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-soft md:p-8">
      <h1 className="text-2xl font-black">お問い合わせ</h1>

      <div className="mt-5 grid gap-4 text-sm text-gray-700 leading-relaxed">
        <p>
          ご意見・不具合報告は下記フォームからお願いします。返信が必要な場合はメールアドレスをご記入ください。
        </p>
        <p>
          技術的な不具合の詳細共有はGitHub Issuesも利用できます（任意）。
        </p>

        <div className="min-h-[900px] w-full overflow-hidden rounded-2xl border border-gray-200 bg-gray-50">
          <iframe
            src={GOOGLE_FORM_EMBED_URL}
            width="100%"
            height="1100"
            frameBorder="0"
            marginHeight={0}
            marginWidth={0}
            title="お問い合わせフォーム"
            className="min-h-[900px] w-full"
          >
            読み込んでいます…
          </iframe>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
          <div className="font-black text-gray-900">フォームが表示されない場合</div>
          <div className="mt-2">
            <Link
              href="https://forms.gle/aBARtVTxaKEMvQkr8"
              className="font-black underline"
              target="_blank"
              rel="noreferrer"
            >
              お問い合わせフォームを直接開く
            </Link>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
          <div className="font-black text-gray-900">技術的な不具合報告（任意）</div>
          <div className="mt-2">
            <Link
              href="https://github.com/shunsukesaito00/debt-simulator/issues"
              className="font-black underline"
              target="_blank"
              rel="noreferrer"
            >
              GitHub Issues（不具合報告 / 要望 / その他）
            </Link>
          </div>
        </div>

        <p className="text-xs text-gray-500">
          ※ 個別の契約条件・審査・借換等の相談は、金融機関または専門家へご相談ください。
        </p>
      </div>
    </div>
  );
}
