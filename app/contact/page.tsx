import Link from "next/link";
import type { Metadata } from "next";
import { getSiteBaseUrl, SITE_NAME } from "@/lib/site-config";

const BASE = getSiteBaseUrl();

export const metadata: Metadata = {
  title: "お問い合わせ",
  description: `${SITE_NAME}へのご意見・ご感想は下記フォームからお願いします。`,
  alternates: { canonical: `${BASE}/contact` },
  openGraph: {
    title: "お問い合わせ",
    description: `${SITE_NAME}へのお問い合わせ。`,
    url: `${BASE}/contact`,
    type: "website",
  },
};

const GOOGLE_FORM_EMBED_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLScWadaWnfDBfgPON86hPFdVW7r2PBinahpKo2TH4qTpH51Vcg/viewform?embedded=true";

export default function Page() {
  return (
    <div className="ds-page-width">
    <div className="ds-surface-soft ds-card-pad">
      <h1 className="text-2xl font-semibold">お問い合わせ</h1>

      <div className="mt-5 grid gap-4 text-base text-stone-700 leading-relaxed">
        <p>
          ご意見・ご感想・サイトに関するお問い合わせは下記フォームからお願いします。返信が必要な場合はメールアドレスをご記入ください。
        </p>

        <div className="ds-subcard min-h-[900px] w-full overflow-hidden p-0">
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

        <div className="ds-subcard p-4">
          <div className="font-semibold text-stone-900">フォームが表示されない場合</div>
          <div className="mt-2">
            <Link
              href="https://forms.gle/aBARtVTxaKEMvQkr8"
              className="font-semibold underline"
              target="_blank"
              rel="noreferrer"
            >
              お問い合わせフォームを直接開く
            </Link>
          </div>
        </div>

        <p className="text-xs text-stone-500 leading-relaxed">
          ※ 個別の契約条件・審査・借換等の相談は、金融機関または専門家へご相談ください。
        </p>
      </div>
    </div>
    </div>
  );
}
