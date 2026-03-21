import type { Metadata } from "next";
import Link from "next/link";
import { getSiteBaseUrl, SITE_NAME } from "@/lib/site-config";

const BASE = getSiteBaseUrl();
const URL = `${BASE}/resources/consultation-guide`;

export const metadata: Metadata = {
  title: "相談先・公的支援の一覧｜借金・返済で困ったとき",
  description:
    "金融庁・貸金業協会・法テラス・消費生活センターなど、公的な相談先へのリンクと注意点をまとめました。",
  alternates: { canonical: URL },
  openGraph: {
    title: "相談先・公的支援の一覧",
    description: "借金・返済で困ったときに役立つ公的相談先の入口です。",
    url: URL,
    type: "website",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "まずどこに相談すればよいですか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "契約内容・取引先によって適切な窓口は異なります。消費生活センター（188）や、日本貸金業協会の相談窓口、法テラス（条件あり）など、公的な相談先を確認してください。",
      },
    },
  ],
};

export default function Page() {
  return (
    <div className="ds-page-width">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <div className="ds-card ds-card-pad">
        <p className="text-sm font-semibold text-stone-600">リソース</p>
        <h1 className="ds-page-serif mt-2 text-2xl font-bold text-stone-900 md:text-3xl">相談先・公的支援の一覧</h1>
        <p className="mt-4 text-base text-stone-700 leading-relaxed">
          {SITE_NAME}は、借入の勧誘や法律・税務の専門的な判断を行うサイトではありません。
        </p>

        <section className="mt-8 space-y-4 text-base text-stone-700 leading-relaxed">
          <h2 className="ds-page-serif text-lg font-bold text-stone-900">はじめに（重要）</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>契約内容・金利・返済条件は、各金融機関の説明書面・公式サイトを最優先してください。</li>
            <li>債務整理や破産などの法的判断は、専門家に相談してください。</li>
          </ul>
        </section>

        <section className="mt-10 space-y-3 text-base leading-relaxed">
          <h2 className="ds-page-serif text-lg font-bold text-stone-900">主な相談先・参考（外部）</h2>
          <ul className="space-y-3">
            <li>
              <a href="https://www.fsa.go.jp/" className="font-semibold text-emerald-900 underline" target="_blank" rel="noopener noreferrer">
                金融庁
              </a>
            </li>
            <li>
              <a href="https://www.j-fsa.or.jp/" className="font-semibold text-emerald-900 underline" target="_blank" rel="noopener noreferrer">
                日本貸金業協会
              </a>
            </li>
            <li>
              <a href="https://www.houterasu.or.jp/" className="font-semibold text-emerald-900 underline" target="_blank" rel="noopener noreferrer">
                法テラス（日本司法支援センター）
              </a>
            </li>
            <li>
              <span className="font-semibold text-stone-900">消費生活センター（188）</span>
            </li>
            <li>
              <a href="https://www.jcca.jp/" className="font-semibold text-emerald-900 underline" target="_blank" rel="noopener noreferrer">
                日本クレジットカウンセリング協会
              </a>
            </li>
            <li>
              <a href="https://www.nta.go.jp/" className="font-semibold text-emerald-900 underline" target="_blank" rel="noopener noreferrer">
                国税庁
              </a>
            </li>
          </ul>
        </section>

        <p className="mt-10 text-sm">
          <Link href="/articles" className="font-semibold text-emerald-900 underline">
            記事一覧へ戻る →
          </Link>
        </p>
      </div>
    </div>
  );
}
