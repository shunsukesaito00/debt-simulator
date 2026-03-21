import type { Metadata } from "next";
import Link from "next/link";
import { getSiteBaseUrl, SITE_NAME } from "@/lib/site-config";

const BASE = getSiteBaseUrl();
const URL = `${BASE}/stories/submit`;

const FORM_URL = (process.env.NEXT_PUBLIC_STORIES_FORM_URL ?? "").trim();

export const metadata: Metadata = {
  title: "体験談・感想の送信",
  description: `${SITE_NAME}への体験談・感想の送信フォームです。`,
  alternates: { canonical: URL },
  openGraph: { title: "体験談・感想の送信", url: URL, type: "website" },
};

export default function Page() {
  return (
    <div className="ds-page-width">
      <div className="ds-card ds-card-pad">
        <h1 className="ds-page-serif text-2xl font-bold text-stone-900 md:text-3xl">体験談・感想の送信</h1>
        <p className="mt-4 text-base text-stone-700 leading-relaxed">
          借金・返済・家計の体験を匿名で共有したい方は、下記フォームからお送りください。掲載の可否・編集は運営側の判断とし、必ず掲載されるわけではありません。
        </p>
        <ul className="mt-4 list-disc pl-5 text-base text-stone-600 space-y-1 leading-relaxed">
          <li>個人が特定される情報は書かないでください。</li>
          <li>誹謗中傷・違法行為の助長となる内容は掲載しません。</li>
          <li>返信はできない場合があります。</li>
        </ul>

        {FORM_URL ? (
          <div className="mt-8 min-h-[24rem] overflow-hidden rounded-lg border border-stone-200">
            <iframe title="体験談送信フォーム" src={FORM_URL} className="h-[32rem] w-full" />
          </div>
        ) : (
          <div className="mt-8 ds-subcard p-6 text-base text-stone-700 leading-relaxed">
            <p>
              送信フォームの準備が整い次第、こちらに表示します。お急ぎの場合は{" "}
              <Link href="/contact" className="font-semibold text-emerald-900 underline">
                お問い合わせ
              </Link>
              からご連絡ください。
            </p>
          </div>
        )}

        <p className="mt-8 text-sm">
          <Link href="/articles#story" className="font-semibold text-emerald-900 underline">
            体験記・返済日記の一覧へ →
          </Link>
        </p>
      </div>
    </div>
  );
}
